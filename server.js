var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var ipaddress   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;

console.log("Server is working I [ "+ipaddress+":"+port+" ] !!!");
server.listen(port,ipaddress);

app.use(function (req, res, next) {
	
   console.log("New Request Income !!!");
    var origin = req.headers.origin;  

     if(origin !== undefined){ 
     console.log('"NEW CLIENT FROM : '+origin);
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, HEAD , PUT ,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
	}
	
    return next();
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	console.log("new client !!!");
  socket.emit('message', { command: 'ok 1' });
  socket.emit('dashboard', {  command: 'ok 2' , data : [
	 {title:'capteur 1' ,on:true } ,
                      {title:'capteur 2' ,on:true } 
	] });
socket.emit('message', { command: 'ok 3' });
  socket.emit('dashboard', {  command: 'ok 4'});

  console.log("sending MSGs");

  socket.on('message', function (data) {
    console.log("\n\nReceived from client : "); 
    console.log(data);
	
  });
});
