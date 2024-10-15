import { NextApiRequest, NextApiResponse } from "next";
import { rcon } from "../../../rcon";


export default async function csComp(req: NextApiRequest, res: NextApiResponse) {

    const { command } = req.query
    
    try {
           const serv = await rcon
           serv.reconnect()
            //@ts-ignore
            const response = await serv.exec(`${command}`).then(test => {
                console.log(test)
                serv.reconnect()
            }) 
    
    } catch (err) {
        console.log(err, "HERE")
    }

    

    return res.status(200).json({message: "testing"})
}



