import { NextApiRequest, NextApiResponse } from "next";
const { GameDig } = require('gamedig');


export default async function getStatus(req: NextApiRequest, res: NextApiResponse) {
    
    try {
        const gameData = await GameDig.query({
            type: 'counterstrike2',
            host: process.env.RCON_HOST,
            port: 27015
        })

        const newData = {
            map: gameData?.map,
            serverName: gameData?.name,
            vacEnabled: true
        }

        return res.status(200).json(newData)
    } catch (err) {
        console.log(err, "err")
        return res.status(500).json({success: false, err})
    }
}
            
            
            
            