import React, { useEffect } from "react";
import { requestObsData } from "../service";
import { getRandomNum, delay, broadcastMove } from "../utils";

const NUM_OF_OBSTACLE_TYPES = 3;

const requestData = async () => {
  // await delay(1000);
  // let data = [];
  // for (let i = 0; i < 5; i++) {
  //   const item = getRandomNum(0, NUM_OF_OBSTACLE_TYPES - 1);
  //   data.push(item);
  // }

  const data = await requestObsData();
  // console.log("requestObsData ", requestObsData);
  // const data = requestObsData();
  postMessageGameFrame({
    type: "FROM_PARENT",
    payload: data,
  });
};

const style = {
  borderStyle: "none",
  width: "100%",
  height: "100%",
};

const GAME_FRAME_ID = "GAME_FRAME_ID";

function postMessageGameFrame(msg) {
  document.getElementById(GAME_FRAME_ID).contentWindow.postMessage({
    type: msg.type,
    payload: msg.payload,
  });
}

const useEventListener = (callback) => {
  useEffect(() => {
    window.addEventListener("message", callback);
  }, []);
};

const GameFrame = ({ addScore }) => {
  useEventListener(function (message) {
    if (message.data.type == "GAME_TO_APP") {
      console.log("message.data.payload ", message.data.payload);

      if (message.data.payload === "KEY_UP") {
        broadcastMove(message.data.payload);
      }

      if (message.data.payload === "KEY_DOWN") {
        broadcastMove(message.data.payload);
      }

      if (message.data.payload === "REQUEST_OBSTACLE_TYPE") {
        requestData();
      }
    }

    if (message.data.type === "CRASHED") {
      addScore(message.data.payload);
      console.log("collect score : ", message.data.payload);
    }
  });

  return (
    <div style={{ width: "100%", height: "100%", background: "white" }}>
      {/* <button onClick={handleClick}>SEND EVENT TO GAME </button> */}
      <iframe
        // name="iframe1"
        // id="iframe1"
        name={GAME_FRAME_ID}
        id={GAME_FRAME_ID}
        scrolling="no"
        frameborder="0"
        border="0"
        cellspacing="0"
        style={style}
        src="/t-rex"
      ></iframe>
    </div>
  );
};

export default React.memo(GameFrame);
