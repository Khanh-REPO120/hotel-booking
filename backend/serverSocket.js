let users = [];

export const SocketServer = socket => {
    // Connect and Disconnect Socket
    socket.on('johnUser', id => {
        users.push({id, socketID : socket.id})
        // console.log({users})
    })
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketID !== socket.id)
        // console.log({users})
    })
    // Message Socket
    socket.on("createMessage", message => {
        const user = users.filter(user => user.id === message.recipient)
        user.forEach((item) => {
            item && socket.to(`${item.socketID}`).emit("createMessageToClient", message)
        })
    })
}
