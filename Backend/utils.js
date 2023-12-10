// utils.js
let clients = [];

function sendSSEMessage(message) {
  clients.forEach(client => {
    client.res.write(`data: ${JSON.stringify(message)}\n\n`);
  });
}

function addClient(client) {
  clients.push(client);
}

function removeClient(clientId) {
  clients = clients.filter(c => c.id !== clientId);
}

module.exports = { sendSSEMessage, addClient, removeClient };
