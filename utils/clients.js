const clients = [];

// Join user to chat
function clientJoin(id, username) {
  const client = { id, username };

  clients.push(client);

  return client;
}

function getClients() {
  return clients;
}

module.exports = { clientJoin, getClients };
