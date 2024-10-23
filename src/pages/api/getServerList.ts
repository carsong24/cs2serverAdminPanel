import { NextApiRequest, NextApiResponse } from "next";
const { RCON, MasterServer } = require('@fabricio-191/valve-server-query');
const { GameDig } = require('gamedig');

export default async function getServerList(req: NextApiRequest, res: NextApiResponse) {

    try {

        const filter = new MasterServer.Filter().addFlag('secure').add('appid', 730)

        const datamain: string[] = []

        const data_east = await MasterServer({
            quantity: 1000,
            region: 'US_EAST',
            timeout: 3000,
            filter,
        })

        data_east.forEach((item: string) => {
            datamain.push(item)
        })

        const data_west = await MasterServer({
            quantity: 1000,
            region: 'US_WEST',
            timeout: 3000,
            filter,
        })

        data_west.forEach((item: string) => {
            datamain.push(item)
        })

        const serverInfo = []

        for (const serv of datamain) {

            const ip = serv.split(':')

            const serverDetails = await getServerStatus(ip[0], +ip[1])

            serverInfo.push(serverDetails)

        }

        return res.status(200).json({success: true, data: serverInfo})
    } catch (err) {
        console.log(err, "err")
        return res.status(500).json({success: false, err})
    }
}


const getServerStatus = async (host: string, port: number) => {

    try {
        const gameData = await GameDig.query({
            type: 'counterstrike2',
            host: host,
            port: port
        })

        let newData = {}

        if (!gameData) {
            newData = {}
        } else {
            newData = {
                map: gameData?.map,
                serverName: gameData?.name,
                vacEnabled: gameData?.raw?.tags.includes('secure'),
                playerCount: gameData?.numplayers - gameData?.bots?.length,
                players: gameData?.raw?.players
            }  
        }

        return newData
    } catch (err) {
        console.log(err, "err 1")
        return err
    }

}



