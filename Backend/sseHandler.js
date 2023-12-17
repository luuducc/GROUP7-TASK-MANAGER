// sseHandler.js
const { addClient, removeClient, sendSSEMessage } = require('./utils');
const Task = require('./models/Task');
const cron = require('node-cron');

const setupCronJob = (clientId, userId) => {
  cron.schedule("* * * * *", async () => { // schedule every 1 minute
    try {
      // console.log("start cron")
      const tasks = await Task.find({user: userId})
      // console.log("get task done.")
      const today = new Date();
      tasks.forEach(task => {
        const { completed} = task
        // console.log("logic")
        if(!completed) { // if job incomplete
          // console.log("check complete done")
          const {expiredDate} = task;
          const timeDiff = expiredDate.getTime() - today.getTime();

          if(timeDiff > 0) { // not expired yet
            // console.log('check time diff done')
            console.log("this jos is incomplete:", task.title)
            const {customNoti} = task
            const { value: timeUntilExpiration } = customNoti // rename in ES6
            
            const minutesUntilExpiration = timeDiff / (1000 * 60)
            const hoursUntilExpiration = minutesUntilExpiration / 60
            const daysUntilExpiration = Math.ceil(timeDiff / (1000*3600*24));

            switch(customNoti.time) {
              case "day":   
                if(daysUntilExpiration <= timeUntilExpiration) {
                  sendSSEMessage(clientId, {
                    name: task.title,
                    daysUntilExpiration,
                    message: `the time left is ${daysUntilExpiration} day`
                  })
                }
                break
              case "hour" :
                if(hoursUntilExpiration <= timeUntilExpiration) {
                  sendSSEMessage(clientId, {
                    name: task.title,
                    hoursUntilExpiration,
                    message: `the time left is ${hoursUntilExpiration} hours`
                  })
                }
                break
              case "minute" :
                if(hoursUntilExpiration <= timeUntilExpiration) {
                  sendSSEMessage(clientId, {
                    name: task.title,
                    minutesUntilExpiration,
                    message: `the time left is ${minutesUntilExpiration} minute`
                  })
                }
                break
              default: 
                break
            } 
            
          } else {
            if(task.expired === false) { // just notify once
              console.log('this task has been expired', task.title)
              sendSSEMessage(clientId, "The job has been expired!!!")
              task.expired = true
            } else {
              // donothing
            }
          }
          
        }
        
      })   
    } catch (error) {
      console.error("Error: " + error.message)
    }
  })
}

const setupSSEEndpoint = (app) => {
  app.get('/events/:userId', (req, res) => { // wait for the client to connect to this endpoint
    console.log("ket noi dc events")
    const {userId} = req.params // get the userId
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const clientId = Date.now()
    res.flushHeaders()

    addClient( {id: clientId, res}) // clientId is different from userId, each tab is a different client

    req.on("close", () => {
      removeClient(clientId)
    })

    // setup cron job
    setupCronJob(clientId, userId)
  })
}



module.exports = { setupSSEEndpoint, setupCronJob }