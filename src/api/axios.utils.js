import axios from "axios";
import baseURL from "./baseURL";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const api = {
  async get(url, params) {
    try {
      let result = await axios({
        method: "get",
        baseURL,
        url,
        params,
      });
      return result;
    } catch (error) {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
        return error.request;
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log("Error", error.message);
        return error.message;
      }
    }
  },
  async postMessage(url, data) {
    try {
      let result = await axios({
        method: "post",
        baseURL,
        url,
        data,
        // withCredentials: true,
      });
      return result;
    } catch (error) {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
        return error.request;
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log("Error", error.message);
        return error.message;
      }
    }
  },
};

export default api;
