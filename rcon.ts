
const {RCON} = require('@fabricio-191/valve-server-query');




 const rcon = RCON({
    ip: '192.168.1.245',
    port: 27015, //RCON port
    password: 'mink',
    timeout: 5000,
    debug: true,
    enableWarns: true,
  });


  export { rcon }

