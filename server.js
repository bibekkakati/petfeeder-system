const app = require("./app");
const server = require("http").createServer();
const WS_SERVER = require("ws").Server;
const handleMessage = require("./wsf/message");
const CredentialStore = require("./store/CredentialStore");
const ConnectionStore = require("./store/ConnectionStore");

server.on("request", app);

const wss = new WS_SERVER({
	server: server,
	verifyClient: (info, callback) => {
		let data = info.req.url;
		data = data.slice(1).split(":");
		if (CredentialStore.verify(data[0], data[1])) {
			callback(true);
		} else callback(false);
	},
});

const noop = () => {};

const heartbeat = () => {
	this.isAlive = true;
};

wss.on("connection", (socket) => {
	socket.isAlive = true;
	socket.on("pong", heartbeat);
	socket.on("message", (incomingMessage) => {
		socket.id = handleMessage(socket, incomingMessage);
	});
});

const interval = setInterval(() => {
	wss.clients.forEach((socket) => {
		if (socket.isAlive === false) {
			if (typeof socket.id !== undefined)
				ConnectionStore.clear(socket.id);
			return socket.terminate();
		}
		socket.isAlive = false;
		socket.ping(noop);
	});
}, 30000);

wss.on("close", () => {
	clearInterval(interval);
});

server.listen(5000, () => console.log("Server is listening at port 5000"));
