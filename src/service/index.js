import axios from "axios";
import { getAvaliableServers } from "../utils";
const address = "0x95DC247313EE125ad7b42d58aCc5f86e5FD277B6";

const requestObsDataFactory = () => {
  let i = 0;

  return {
    requestObsData: async () => {
      const servers = getAvaliableServers();
      const host = servers[i % 2].host;
      i++;

      const data = await axios.get(`${host}/obstacles`).then((res) => {
        return res.data;
      });

      return data;
    },
  };
};

const requestValidation = () => {};

export const requestObsData = requestObsDataFactory().requestObsData;

export const requestValidations = async (id, score) => {
  const servers = getAvaliableServers();
  const requests = servers.map((server) => {
    const idParam = `?id=${id}`;
    const scoreParam = `&score=${score}`;
    const addressParam = `&address=${address}`;
    const queryParams = idParam + scoreParam + addressParam;

    console.log("queryParams ", queryParams);
    return axios.get(`${server.host}/request-signature${queryParams}`, {
      id,
      score: score || 0,
      winner: "0x95DC247313EE125ad7b42d58aCc5f86e5FD277B6",
    });
    // return axios.get(`${server.host}/request-signature/?id=${id}&score=${score}&${winnerParam}`);
    // return axios.get(`request-signature/?id=${id}&score=${score}`);
  });

  const signatures = await Promise.all([...requests]).then(function (v) {
    console.log("REQUEST RESPONSE");

    const values = v.map((v) => v.data);
    console.log("unsorted values ", values);

    const sortedValues = values.sort(function (a, b) {
      return a.serverIndex - b.serverIndex;
    });

    console.log("sorted values ", sortedValues);

    return sortedValues;
  });

  return signatures;
};
