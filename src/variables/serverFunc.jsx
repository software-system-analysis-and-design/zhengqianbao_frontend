export function handleResponse(response) {
  // console.log(response)
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        //logout();
        //location.reload(true);
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
