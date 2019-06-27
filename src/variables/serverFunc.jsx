export function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        alert("状态码: " + response.status + "退出登录");
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return JSON.parse(text);
  });
}

export function parseParams(data) {
  try {
    var tempArr = [];
    for (var i in data) {
      var key = encodeURIComponent(i);
      var value = encodeURIComponent(data[i]);
      tempArr.push(key + "=" + value);
    }
    var urlParamsStr = tempArr.join("&");
    return urlParamsStr;
  } catch (err) {
    return "";
  }
}

export const apiUrl = "https://littlefish33.cn:8080/user";
