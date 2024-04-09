// Function to start the Peer connection with a custom ID
function startPeer(id) {
    // Create a new Peer object with the provided ID
    const peer = new Peer(id);
    
    // When a connection is established with another peer
    peer.on('connection', (conn) => {
        console.log('Connected to peer' + id);
        
        // Listen for messages from the other peer
        conn.on('data', (data) => {
        console.log('Received:', data);
        });
    });
    }

        // Function to send a message to the other peer
        function sendMessage() {
            const message = prompt('Enter message:');
            conn.send(message);
            }
            
            // Example usage: sending messages to the other peer via console
            console.log('Type "sendMessage()" in the console to send a message to the other peer.');
            console.log('Type "conn.close()" to disconnect.');

// Example usage: start the Peer connection with a custom ID
// Replace 'your_custom_id' with your desired ID
startPeer('1533-1535-4262');