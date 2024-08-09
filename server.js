const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('connect_pixhawk', () => {
        console.log('Connect command received');
        io.emit('connect_pixhawk');
    });

    socket.on('disconnect_pixhawk', () => {
        console.log('Disconnect command received');
        io.emit('disconnect_pixhawk');
    });

    socket.on('arm_pixhawk', () => {
        console.log('Arm command received');
        io.emit('arm_pixhawk');
    });

    socket.on('disarm_pixhawk', () => {
        console.log('Disarm command received');
        io.emit('disarm_pixhawk');
    });

    socket.on('auto_pixhawk', () => {
        console.log('Auto mode command received');
        io.emit('auto_pixhawk');
    });

    socket.on('rtl_pixhawk', () => {
        console.log('RTL mode command received');
        io.emit('rtl_pixhawk');
    });

    socket.on('pixhawk_status', (data) => {
        console.log('Pixhawk status:', data);
        io.emit('pixhawk_status', data);
    });

    socket.on('pixhawk_data', (data) => {
        console.log('Pixhawk data:', data);
        io.emit('pixhawk_data', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});