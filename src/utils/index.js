import socketIOClient from "socket.io-client";

export function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function delay(t) {
  return new Promise((r) => {
    setTimeout(r, t);
  });
}

export const getAvaliableServers = () => {
  const SERVERS = [
    {
      host: "http://127.0.0.1:3001",
      name: "server 1",
      id: 1,
      address: "0x11C7656EC7ab88b098defB751B7401B5f6d8976F",
    },
    {
      host: "http://127.0.0.1:3002",
      name: "server 2",
      id: 2,
      address: "0x21C7656EC7ab88b098defB751B7401B5f6d8976F",
    },
    {
      host: "http://127.0.0.1:3003",
      name: "server 2",
      id: 3,
      address: "0x31C7656EC7ab88b098defB751B7401B5f6d8976F",
    },
  ];
  return SERVERS;
};

const broadcastMoveFactory = () => {
  const hosts = getAvaliableServers().map((i) => i.host);
  const sockets = hosts.map((host) => {
    const socket = socketIOClient(host);
    return socket;
  });

  return {
    broadcastMove: (KEY_TYPE) => {
      sockets.map((socket) => {
        console.log("KEY_EVENT ", KEY_TYPE);
        socket.emit("KEY_EVENT", KEY_TYPE);
      });
    },
  };
};

export const broadcastMove = broadcastMoveFactory().broadcastMove;
