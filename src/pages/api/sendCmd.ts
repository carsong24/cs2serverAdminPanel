import { NextApiRequest, NextApiResponse } from "next";
const { RCON } = require('@fabricio-191/valve-server-query');

export default async function csComp(req: NextApiRequest, res: NextApiResponse) {

    const { cmd, server } = JSON.parse(req.body)

    try {

        const rcon = RCON({
            ip: server?.ip_address,
            port: server?.port,
            password: server?.rcon_pass,
            timeout: 5000,
            debug: true,
            enableWarns: true,
          })

        const serv = await rcon
        const data = await serv.exec(`${cmd}`).then((res: any) => {return res})

        await serv.destroy()

        return res.status(200).json({success: true, data: data})
    } catch (err) {
        console.log(err, "err")
        return res.status(500).json({success: false, err})
    }
}



