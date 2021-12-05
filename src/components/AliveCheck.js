import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { getAvaliableServers } from "../utils";
import Card from "./Card";

let pingTime;
const getPingTime = (socket) => {
  pingTime = new Date();
  socket.emit("my-ping", pingTime);
};

function AliveCheck({ socket, host, address }) {
  const [pingDuration, setPingDuration] = useState(0);
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    const terminateInterval = setInterval(() => {
      getPingTime(socket);
    }, 1000);

    socket.on("my-pong", (arg) => {
      let pongTime = new Date();
      // console.log("pongTime ", pongTime);
      // console.log("diff : ", pongTime - pingTime);
      setConnected(true);
      setPingDuration(pongTime - pingTime);
    });

    socket.on("connect_error", function (err) {
      // handle server error here
      // console.log("Error connecting to server");
      setConnected(false);
    });

    return () => {
      terminateInterval();
      socket.disconnect();
    };
  }, [socket]);

  return (
    <span style={{ margin: 10 }}>
      <Card
        connected={socket.connected.toString()}
        host={host}
        ping={pingDuration}
        address={address}
      />
    </span>
  );
}

export default AliveCheck;
