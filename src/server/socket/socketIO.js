var socketio = require('socket.io');

var clients = {};

function init(http) {
  var io = socketio(http);
  io.on('connection', function(client){
    client.customAttr = {};
    client.customAttr.auth = false;
    client.on('auth', function(data){
      client.customAttr.u_name = data.u_name;
      client.customAttr.token = data.token;
      client.customAttr.auth = true;
      clients[client.customAttr.u_name] = client;
    });
    setTimeout(function(){
      if (!client.customAttr.auth) {
        client.disconnect('unauthorized');
      }
    }, 5000);
    client.on('disconnect', function(){
      delete clients[client.customAttr.u_name];
    });

    client.on('text_msg', function(data){
      data.u_name = client.customAttr.u_name;
      io.emit('text_msg', data);
    });
    client.on('enable_map', function(data){
      if(data.enable) {
        client.customAttr.enable_map = true;
      }
      else {
        client.customAttr.enable_map = false;
      }
    });
    client.on('map_msg', function(data){
      client.customAttr.lat = data.lat;
      client.customAttr.lng = data.lng;
      client.customAttr.update_time = Date.now();
    });
  });
  startBroadcastMap();
}

function startBroadcastMap() {
  setInterval(function(){
    let mapUsers = [];
    for (var key in clients) {
      if (clients.hasOwnProperty(key)) {
        let value = clients[key];
        if(value.customAttr.enable_map) {
          mapUsers.push({
            u_name: value.customAttr.u_name,
            lat: value.customAttr.lat,
            lng: value.customAttr.lng,
            update_time: value.customAttr.update_time
          });
        }
      }
    }
    mapUsers.forEach(function(element) {
      clients[element.u_name].emit('map_msg', mapUsers); 
    });
  }, 2 * 1000);
}

module.exports = {
  init: init,
  clients: clients
}