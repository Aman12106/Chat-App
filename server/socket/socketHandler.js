
// socket.id -> userId
const onlineUsers = new Map();
// userId -> Set of socket.id (a user can be connected from multiple tabs/devices)
const userSockets = new Map();

const broadcastOnlineUsers = (io) => {
    io.emit('online-users', Array.from(userSockets.keys()));
};

const sockethandler = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected');
        console.log(socket.id);


        socket.on('join', (userId) => {
            socket.join(userId);
            onlineUsers.set(socket.id, userId);

            if (!userSockets.has(userId)) {
                userSockets.set(userId, new Set());
            }
            userSockets.get(userId).add(socket.id);

            console.log(`User ${userId} joined room ${socket.id}`);
            broadcastOnlineUsers(io);
        });


        socket.on('message', (data) => {
            console.log('Message received:', data);
            io.emit('message', data);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');

            const userId = onlineUsers.get(socket.id);
            onlineUsers.delete(socket.id);

            if (userId && userSockets.has(userId)) {
                const sockets = userSockets.get(userId);
                sockets.delete(socket.id);
                if (sockets.size === 0) {
                    userSockets.delete(userId);
                }
            }

            broadcastOnlineUsers(io);
        });
    })}

    export { sockethandler };
