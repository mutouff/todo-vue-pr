import request from "../utils/axios"

// 登录
export function login(data) {
  return request({
    url: `/login`,
    method: "post",
    data
  });
}