import { useEffect, useState } from "react";
import { getAvaliableServers } from "../utils";
import AliveCheck from "./AliveCheck";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3001";

const ServerList = () => {
  const [socketConns, setSocketConns] = useState();

  useEffect(() => {
    const servers = getAvaliableServers();
    // console.log("servers ", servers);
    const socketConns = servers.map((server) => {
      const socket = socketIOClient(server.host);
      return {
        socket,
        ...server,
      };
    });

    setSocketConns(socketConns);
  }, []);

  return (
    <div
      style={{
        height: "100%",
        padding: 20,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {socketConns?.map((socketProps) => {
        return <AliveCheck {...socketProps} />;
      })}
    </div>
  );
};

export default ServerList;
