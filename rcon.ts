
const {RCON} = require('@fabricio-191/valve-server-query');




 const rcon = RCON({
    ip: '107.192.217.68',
    port: 27015, //RCON port
    password: 'mink',
    timeout: 5000,
    debug: true,
    enableWarns: true,
  });


  export { rcon }

