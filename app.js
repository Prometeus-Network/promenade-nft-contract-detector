require('dotenv').config()
const mongoose = require('mongoose')
require('./models/nftcontract')
const Utils = require('./services/utils')
const TrackContractDeployment = require('./services/contractDeploymentTracker')
const healthcheck = require('./healthcheck')

const connect = () => {
  const uri = process.env.DB_URL
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    console.log('nft contract tracker has been started')
    console.log('tracking contract deployment')
    TrackContractDeployment()
    console.log('tracking names and symbols')
    Utils.trackNameAndSymbol()
    healthcheck()
  })
}

connect()
