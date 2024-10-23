import { NextApiRequest, NextApiResponse } from "next";
const { GameDig } = require('gamedig');
import { PrismaClient } from '@prisma/client'
import { parseCS2Status } from "./getPlayers";
const { RCON } = require('@fabricio-191/valve-server-query');

const prisma = new PrismaClient()

export default async function addServer(req: NextApiRequest, res: NextApiResponse) {


    //@ts-ignore
    const { server } = JSON.parse(req.body) as unknown

    const data = server as {name: string, ip: string, port: number, pass: string}

    try {

        const server = await prisma.servers.create({
            data: {
                server_name: data.name,
                ip_address: data.ip,
                port: +data.port,
                rcon_pass: data.pass,
                map: "de_dust2",
                max_players: 64,
                status: "Offline",
                game_mode: "comp"
            }
        })


        return res.status(200).json({success: true, server: server})
    } catch (err) {
        console.log(err, "err")
        return res.status(500).json({success: false, err})
    }
}


            
            
            