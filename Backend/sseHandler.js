// sseHandler.js
const { addClient, removeClient, sendSSEMessage } = require('./utils');
const Task = require('./models/Task');
const cron = require('node-cron');

const setupSSEEndpoint = (app) => {
  app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const clientId = Date.now()
    res.flushHeaders()

    addClient( {id: clientId, res})

    req.on("close", () => {
      removeClient(clientId)
    })
  })
}

const setupCronJob = () => {
  cron.schedule("*/5 * * * *", async () => { // schedule every 5 minutes
    try {
      const tasks = await Task.find()
      const today = new Date();
      tasks.forEach(task => {
        const { expiredDate, customNoti } = task;
        const { value: timeUntilExpiration } = customNoti
        const timeDiff = expiredDate.getTime() - today.getTime();
        const minutesUntilExpiration = timeDiff / (1000 * 60)
        const hoursUntilExpiration = minutesUntilExpiration / 60
        const daysUntilExpiration = Math.ceil(timeDiff / (1000*3600*24));

        // console.log({ daysUntilExpiration, customNoti, timeUntilExpiration })

        switch(customNoti.time) {
          case "day":   
            if(daysUntilExpiration <= timeUntilExpiration) {
              sendSSEMessage({
                name: task.title,
                daysUntilExpiration,
                message: `the time left is ${daysUntilExpiration} day`
              })
            }
            break
          case "hour" :
            if(hoursUntilExpiration <= timeUntilExpiration) {
              sendSSEMessage({
                name: task.title,
                hoursUntilExpiration,
                message: `the time left is ${hoursUntilExpiration} hours`
              })
            }
            break
          case "minute" :
            if(hoursUntilExpiration <= timeUntilExpiration) {
              sendSSEMessage({
                name: task.title,
                minutesUntilExpiration,
                message: `the time left is ${minutesUntilExpiration} minute`
              })
            }
            break
          default: 
            break
        }
        
      })   
    } catch (error) {
      console.error("Error: " + error.message)
    }
  })
}

module.exports = { setupSSEEndpoint, setupCronJob }