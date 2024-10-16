import { NextApiRequest, NextApiResponse } from "next";
import { serverMain } from "../../../rcon";


export default async function csComp(req: NextApiRequest, res: NextApiResponse) {
    
    try {
        const servInfo = await serverMain

        //@ts-ignore
        const serverData = await servInfo.getInfo().then((res) => {
            return res
        })

        console.log(serverData)

        const newData = {
            map: serverData?.map,
            players: serverData?.players,
            serverName: serverData?.name,
            vacEnabled: serverData?.VAC
        }

        return res.status(200).json({success: true, data: newData})
    
    } catch (err) {
        console.log(err, "err")
        return res.status(500).json({success: false, err})
    }
}
            
            
            
            