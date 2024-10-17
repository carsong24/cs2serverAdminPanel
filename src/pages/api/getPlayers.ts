import { NextApiRequest, NextApiResponse } from "next";
const { RCON } = require('@fabricio-191/valve-server-query');


export default async function getPlayers(req: NextApiRequest, res: NextApiResponse) {
    
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
        const data = await serv.exec(`status`).then((res: any) => {return res})


        console.log(data)

        const players = parseCS2Status(data)

        return res.status(200).json(players)
    } catch (err) {
        console.log(err, "err")
        return res.status(500).json({success: false, err})
    }
}


export const parseCS2Status = (statusOutput: string) => {

    const lines = statusOutput.split('\n');

    const players: any = [];

    let inPlayerSection = false;

    lines.forEach(line => {
      if (line.includes('---------players--------')) {
        inPlayerSection = true;
        return;
      }
  
      if (line.includes('#end')) {
        inPlayerSection = false;
      }

      if (inPlayerSection && line.match(/^\s*\d+/)) {
        const playerRegex = /^\s*(\d+)\s+(\S+)\s+(\d+)\s+(\d+)\s+(\S+)\s+(\d+)\s+([\d\.]+:\d+)\s+'(.*?)'/;
        const match = line.match(playerRegex);
  
        if (match) {
          const player = {
            id: match[1],
            time: match[2],
            ping: match[3],
            loss: match[4],
            state: match[5],
            rate: match[6],
            adr: match[7],
            name: match[8]
          };
          players.push(player);
        }
      }
    });
  
    return players;
  }



