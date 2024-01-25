/* importing mongoose */
const mongoose = require('mongoose')

/* Get the connection string from the process.env as we load the dotenv file inthe index .js earlier (see index.js top lines) */
const connectionString = process.env.DATABASE

/* connect to mongodb using Mongoose */ /* It is a promise based */
mongoose.connect(connectionString).then((res)=>{
    console.log("MongoDb connected Successfully");
}).catch((err)=>{
    console.log(`MongoDb connection failed due to : ${err}`);
})