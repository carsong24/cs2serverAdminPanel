
const {Server, RCON } = require('@fabricio-191/valve-server-query');

 const rcon = RCON({
    ip: process.env.RCON_HOST,
    port: process.env.RCON_PORT ? +process.env.RCON_PORT : 27015, // RCON port - Default 27015
    password: process.env.RCON_PASS,
    timeout: 5000,
    debug: true,
    enableWarns: true,
  });

  const serverMain = Server({
    ip: process.env.RCON_HOST,
    port: 27015
  })


  export { rcon, serverMain }

