var mysql = require('mysql')
// Let’s make node/socketio listen on port 3000
var io = require('socket.io').listen(8000)
// Define our db creds
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'chart'
})
 
// Log any errors connected to the db
db.connect(function(err){
    if (err) console.log(err)
})
 
// Define/initialize our global vars
var notes = []

var socketCount = 0
var i = 1



io.sockets.on('connection', function(socket){

    // Socket has connected, increase socket count
    socketCount--
    // Let all sockets know how many are connected
    io.sockets.emit('users connected', socketCount)
 

    // io.sockets.emit('data3',"data3"); 


    socket.on('tabledata', function(product){
        console.log("aaa");
        console.log(product);
        if(product!=null){  
            product.date +=":00";
            query1 = "INSERT INTO data (date, L, V) VALUES ('"+product.date+"', '"+product.lvalue+"', '"+product.vvalue+"')";
            var query = 'SELECT * FROM data WHERE id=' + i;    
            db.query(query1)
        }
    })

    socket.on('disconnect', function() {
        // Decrease the socket count on a disconnect, emit
        socketCount--
        io.sockets.emit('users connected', socketCount)
    })     
})
   





// Get data from database per 2 seconds and broadcast to front-end using socket.io

var timer = setInterval(function(){   

    var query1 = "SELECT * FROM data ORDER BY id DESC LIMIT 1"
    var query = 'SELECT * FROM data WHERE id=' + i;    
    db.query(query1)
    .on('result', function(data){    
        // Push data to array
        notes.push(data)        
    })
    .on('end', function(){        
        // broadcast data using socket.io
        io.emit('data', notes)               
        // console.log(notes)
    })
    // Pop data from array
    notes.pop()
    i++;        
}, 10000);
        