// utils.js
let clients = [];

function sendSSEMessage(clientId, message) { // send message to specific client
  const client = clients.find(c => c.id === clientId)
  if(client) {
    client.res.write(`data: ${JSON.stringify(message)}\n\n`);
  }
  // clients.forEach(client => {
  //   client.res.write(`data: ${JSON.stringify(message)}\n\n`);
  // });
}

function addClient(client) {
  clients.push(client);
}

function removeClient(clientId) {
  clients = clients.filter(c => c.id !== clientId);
}

module.exports = { sendSSEMessage, addClient, removeClient };
