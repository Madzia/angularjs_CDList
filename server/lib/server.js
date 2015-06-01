var socketio = require('socket.io');

exports.listen = function( server, Manager ) {
  var io = socketio.listen(server);

  Manager.findAllUsers(function ( err, data ) {
    if(!err){
      if(data.length === 0){
        Manager.addUser({'login': 'madzia26', 'password': 'qwertyuiop', 'id': new Date().getTime() }, function ( err, data ) {
          if(!err){
            console.log('first user added');
          }
        });
      }
    }
  });


  io.sockets.on('connection', function ( client ) {
    'use strict';
    console.log('socket.io connected');
    console.log(client.id);

    //init
    client.on('init', function () {
      Manager.findAllUsers(function ( err, data ) {
        if(!err){
          var res = {
            'users': [],
            'categories': []
          };
          for(var i = 0; i < data.length; i++){
            res.users.push({'login': data[i].login, "id": data[i].id});
          }
          Manager.findAllCategories( function ( err, data) {
            if(!err){
              res.categories = data;
              Manager.findAllCds( function ( err, data) {
                if(!err){
                  res.cds = data;
                  client.emit('init', res);
                  console.log('init');
                }
              });
            }
          });
        }
      });
    });

    //users
    client.on('addUser', function ( user ) {
      Manager.addUser(user, function ( err, data ) {
        if(!err){
          // var token = new Date().getTime();
          // User.signin(data.login, data.id, token);
          client.emit('add', {'coll': 'users', 'data': {'login': data.login, 'id': data.id} });
          client.broadcast.emit('add', {'coll': 'users', 'data': {'login': data.login, 'id': data.id} });
          client.emit('auth', {'login': data.login, 'id': data.id });
        }
      });
    });

    //categories
    client.on('addCategory', function ( data ) {
      if( data.user.id === data.data.owner ) {
        var category = { 'name': data.data.name, 'owner': data.data.owner };
        Manager.addCategory(category, function ( err, data ) {
          if(!err){
            client.emit('add', {'coll': 'categories', 'data': category });
            client.broadcast.emit('add', {'coll': 'categories', 'data': category });
          }
        });
      }
    });

    client.on('editCategory', function ( data ) {
      if( data.user.id === data.data.owner ) {
        var category = data.data;
        Manager.editCategory(category, function ( err, data ) {
          if(!err){
            client.emit('update', {'coll': 'categories', 'data': category });
            client.broadcast.emit('update', {'coll': 'categories', 'data': category });
          }
        });
      }
    });

    client.on('rmCategory', function ( data ) {
      if( data.user.id === data.data.owner ) {
        var category = data.data;
        Manager.rmCategory(category, function ( err, data ) {
          if(!err){
            client.emit('remove', {'coll': 'categories', 'data': category });
            client.broadcast.emit('remove', {'coll': 'categories', 'data': category });
          }
        });
      }
    });

    //cds
    client.on('addCd', function ( data ) {
      if( data.user.id === data.data.owner ) {
        var cd = { 'name': data.data.name, 'owner': data.data.owner,
          'category': data.data.category, 'url': data.data.url };
        Manager.addCd(cd, function ( err, data ) {
          if(!err){
            client.emit('add', {'coll': 'cds', 'data': cd });
            client.broadcast.emit('add', {'coll': 'cds', 'data': cd });
          }
        });
      }
    });

    client.on('editCd', function ( data ) {
      if( data.user.id === data.data.owner ) {
        var cd = data.data;
        Manager.editCd(cd, function ( err, data ) {
          if(!err){
            client.emit('update', {'coll': 'cds', 'data': cd });
            client.broadcast.emit('update', {'coll': 'cds', 'data': cd });
          }
        });
      }
    });

    client.on('rmCd', function ( data ) {
      if( data.user.id === data.data.owner ) {
        var cd = data.data;
        Manager.rmCd(cd, function ( err, data ) {
          if(!err){
            client.emit('remove', {'coll': 'cds', 'data': cd });
            client.broadcast.emit('remove', {'coll': 'cds', 'data': cd });
          }
        });
      }
    });
  });
};
