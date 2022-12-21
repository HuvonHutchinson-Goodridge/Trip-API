const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('Uncaught Rejection!!!!, Shutting Down')
    process.exit(1);

})

dotenv.config({ path: './config.env' })

const app = require('./app');


mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => {
    console.log('DB connection successful');
}).catch(err => console.log(err));
/*console.log(process.env)*/

const port = 3000 || process.env.PORT;
const server = app.listen(port, () => {
    console.log(`App running on port ${port} `)
})

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('Unhandled Rejection!!!!, Shutting Down')
    server.close(() => {
        process.exit(1)
    })

})


