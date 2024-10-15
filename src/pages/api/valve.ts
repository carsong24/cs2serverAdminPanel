import { NextApiRequest, NextApiResponse } from "next";
import { rcon } from "../../../rcon";


export default async function csComp(req: NextApiRequest, res: NextApiResponse) {

    const { command } = req.query
    
    try {
           const serv = await rcon
           serv.reconnect()
           //TODO - Fix this type error
           //@ts-ignore
            const response = await serv.exec(`${command}`).then((res) => {
                console.log(res)
                serv.reconnect()
            }) 
    
    } catch (err) {
        console.log(err)
    }

    return res.status(200).json({message: "always return"})
}



