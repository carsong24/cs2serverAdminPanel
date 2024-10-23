import { NextApiRequest, NextApiResponse } from "next";
const { GameDig } = require('gamedig');
import { PrismaClient } from '@prisma/client'
import { parseCS2Status } from "./getPlayers";
const { RCON } = require('@fabricio-191/valve-server-query');

const prisma = new PrismaClient()

export default async function getServers(req: NextApiRequest, res: NextApiResponse) {

    try {

        const servers = await prisma.servers.findMany()

        const serverList = []

        for (const server of servers) {

            const serverPlayers = await getServerPlayers(server?.ip_address, server?.port, "mink")
            const serverStatus = await getServerStatus(server?.ip_address, server?.port) as {map: string, serverName: string, vacEnabled: boolean}

            if (serverStatus?.serverName != server?.server_name) {
                await prisma.servers.update({
                    where: {
                        server_id: server?.server_id,
                    },
                    data: {
                        server_name: serverStatus?.serverName
                    }
                })
            }
            if (serverStatus?.map != server?.map) {
                await prisma.servers.update({
                    where: {
                        server_id: server?.server_id,
                    },
                    data: {
                        map: serverStatus?.map
                    }
                })
            }
            
            serverList.push({server: server, players: serverPlayers, status: serverStatus})
        }
        await prisma.$disconnect()
        return res.status(200).json(serverList)
    } catch (err) {
        console.log(err, "err")
        return res.status(500).json({success: false, err})
    }
}

const getServerStatus = async (host: string, port: number) => {

    try {
        const gameData = await GameDig.query({
            type: 'counterstrike2',
            host: host,
            port: port
        })

        const newData = {
            map: gameData?.map,
            serverName: gameData?.name,
            vacEnabled: true
        }

        return newData
    } catch (err) {
        console.log(err, "err 1")
        return err
    }

}

const getServerPlayers = async (host: string, port: number, rcon_pass: string) => {
    
    try {

        const rcon = RCON({
            ip: host,
            port: port,
            password: rcon_pass,
            timeout: 1000,
          })

        const serv = await rcon
        const data = await serv.exec(`status`).then((res: any) => {return res})

        const players = parseCS2Status(data)

        await serv.destroy()

        return players
    } catch (err) {
        console.log(err, "err 2")
        return err
    }
}

// const parseCS2PublicIP = (statusOutput: string) => {
//     const lines = statusOutput.split('\n');
  
//     let publicIp = null;
//     lines.forEach(line => {
//       if (line.includes('udp/ip')) {
//         const udpRegex = /public\s([\d\.]+):\d+/;
//         const match = line.match(udpRegex);
  
//         if (match) {
//           publicIp = match[1];
//         }
//       }
//     });
  
//     return publicIp;
//   }
            
            
            
            