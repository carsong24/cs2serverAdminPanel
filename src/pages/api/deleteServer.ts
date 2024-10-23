import { NextApiRequest, NextApiResponse } from "next";
const { GameDig } = require('gamedig');
import { PrismaClient } from '@prisma/client'
import { parseCS2Status } from "./getPlayers";
const { RCON } = require('@fabricio-191/valve-server-query');

const prisma = new PrismaClient()

export default async function addServer(req: NextApiRequest, res: NextApiResponse) {


    const { id } = JSON.parse(req.body)

    try {

        const deleteServer = await prisma.servers.delete({
            where: {
              server_id: id,
            },
          })


        return res.status(200).json({success: true})
    } catch (err) {
        console.log(err, "err")
        return res.status(500).json({success: false, err})
    }
}


            
            
            