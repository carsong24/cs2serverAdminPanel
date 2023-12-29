import { NextApiRequest, NextApiResponse } from "next";
import { rcon } from "../../../rcon";
import { getToken } from "next-auth/jwt";

const {RCON} = require('@fabricio-191/valve-server-query');


export default async function csComp(req: NextApiRequest, res: NextApiResponse) {

    const { command } = req.query
    
    try {
        const token = await getToken({ req })
        if (token) {
           const serv = await rcon
           serv.reconnect()
            //@ts-ignore
            const response = await serv.exec(`${command}`).then(test => {
                console.log(test)
                serv.reconnect()
            }) 
        }

    
    } catch (err) {
        console.log(err, "HERE")
    }

    

    return res.status(200).json({message: "testing"})
}



