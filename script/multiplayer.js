function createsession() {
    // Creates peer object
    var peer = new Peer();

    // Peer object assigned to random, unique ID when made. 
    peer.on('open', function(id) {
        console.log('My peer id is: ' + id);
    })
    return id;
}

function connection() {
    // Start connection
    var conn = peer.connect('dest-peer-id');

    // Receive connection
    peer.on('connection', function(conn){})
}

function data() {
    conn.on('open', function() {
        // Receive data
        conn.on('data', function(data) {
            console.log('Received', data);
        });
    
        // Send data
        conn.send('Test');
    });
}


// Examples of data types to send:
conn.send({
	strings: 'hi!',
	numbers: 150,
	arrays: [1,2,3],
	evenBinary: new Blob([1,2,3]),
    andMore: {bool: true}
  });
