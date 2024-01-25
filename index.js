/* import dotenv */

require('dotenv').config()

/* import express */
const express = require('express')

/* import cors */
const cors = require('cors')

/* importing the router we have just created */
const router = require('./routes/router')

/* importing connection file of mongodb */
require('./database/connections')

/* create server */
const projectFairServer = express()

/* use of cors by server */
projectFairServer.use(cors())

/* Returns a middleware that only parses json and converts it into javascript object */
projectFairServer.use(express.json())

/* use router in the server */
projectFairServer.use(router)

/* projectFairServer should use the upl;oad folder */
/* first arguent to specify the name so how the othe apps (frontend) can use it or call it */
/* second args is to exporting the folder to use it */
projectFairServer.use('/uploads', express.static('./uploads'))

/* customizing the port */
const PORT = 4000 || process.env.PORT /* The default set by us is 4000 incase if it is being used by some other process then it automatically takes another port */

/* Run server */
projectFairServer.listen(PORT, ()=>{
    console.log(`ProjectFairServer started running at http://localhost:${PORT} and waiting for the request....`);
})

// /* get http request */
// projectFairServer.get('/', (req, res)=>{
//     res.send(`ProjectFairServer started running at http://localhost:${PORT} and waiting for the request....`)
// })

// /* post request */
// projectFairServer.post('/', (req, res)=>{
//     res.send("THis is Fucking Bull Shit. Do you want some of it ??")
// })