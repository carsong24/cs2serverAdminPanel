import { NextApiRequest, NextApiResponse } from "next";
const {Server, RCON } = require('@fabricio-191/valve-server-query');


export default async function csComp(req: NextApiRequest, res: NextApiResponse) {
    
    try {

        const serv = await Server({
            ip: process.env.RCON_HOST,
            port: 27015,
            timeout: 3000,
          })

        //@ts-ignore
        const serverData = await serv.getInfo().then((res) => {
            if (res) {
              return res  
            }
        })

        const newData = {
            map: serverData?.map,
            players: serverData?.players,
            serverName: serverData?.name,
            vacEnabled: serverData?.VAC
        }

        console.log(newData)

        return res.status(200).json({success: true, data: newData})
    
    } catch (err) {
        console.log(err, "err")
        return res.status(500).json({success: false, err})
    }
}
            
            
            
            