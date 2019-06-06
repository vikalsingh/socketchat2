var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/chat.html');
});


users=[];
io.on('connection', function(socket){
	console.log("A user connected");

	socket.on('setUsername', function(data){
		console.log(data);

		if(users.indexOf(data) > -1){
			socket.emit('userExists', data+' username is taken! Try some other username.');
		} else {
			users.push(data);
			console.log("all users ", users);
			socket.emit('userSet', {username: data});
		}
	});

	socket.on('msg', function(data){
		// send message to everyone
		io.sockets.emit('newmsg', data);
	})

});

http.listen(8000, function(){
	console.log("listing on port 8000");
});