import { NextApiRequest, NextApiResponse } from "next";
const { RCON } = require('@fabricio-191/valve-server-query');

export default async function csComp(req: NextApiRequest, res: NextApiResponse) {

    const { command } = req.query
    
    try {

        const rcon = RCON({
            ip: process.env.RCON_HOST,
            port: process.env.RCON_PORT ? +process.env.RCON_PORT : 27015,
            password: process.env.RCON_PASS,
            timeout: 5000,
            debug: true,
            enableWarns: true,
          })

        const serv = await rcon
        const data = await serv.exec(`${command}`).then((res: any) => {return res})

        return res.status(200).json({success: true, data: data})
    } catch (err) {
        console.log(err, "err")
        return res.status(500).json({success: false, err})
    }
}



