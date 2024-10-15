
const { RCON } = require('@fabricio-191/valve-server-query');

 const rcon = RCON({
    ip: '1.1.1.1',
    port: 27015, //RCON port
    password: '123456',
    timeout: 5000,
    debug: true,
    enableWarns: true,
  });


  export { rcon }

