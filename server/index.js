const server = require('./server')


server.listen(process.env.PORT || 3000, () => console.log(`\nExpress departing now from port 3000!\n`));
