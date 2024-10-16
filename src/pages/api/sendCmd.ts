import { NextApiRequest, NextApiResponse } from "next";
import { rcon, serverMain } from "../../../rcon";


export default async function csComp(req: NextApiRequest, res: NextApiResponse) {

    const { command } = req.query
    
    try {
            const serv = await rcon
            serv.reconnect()
           //TODO - Fix this type error
           //@ts-ignore
            const data = await serv.exec(`${command}`).then((res) => {
                return res
            })

            return res.status(200).json({success: true, data: data})
    
    } catch (err) {
        console.log(err, "err")
        return res.status(500).json({success: false, err})
    }
}



