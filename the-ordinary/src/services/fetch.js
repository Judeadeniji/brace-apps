function fetch(url, options = {}) {
  return new Promise(function (resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.open(options?.method || 'GET', url);

    // Set request headers
    if (options?.headers) {
      Object.keys(options.headers).forEach(function (header) {
        xhttp.setRequestHeader(header, options.headers[header]);
      });
    }

    // Handle response
    xhttp.onload = function () {
      resolve({
        status: xhttp.status,
        statusText: xhttp.statusText,
        json: function () {
          return Promise.resolve(JSON.parse(xhttp.responseText));
        },
        text: function () {
          return Promise.resolve(xhttp.responseText);
        }
      });
    };

    // Handle network errors
    xhttp.onerror = function () {
      reject(new Error('Network Error'));
    };

    // Send the request
    xhttp.send(options?.body);
  });
};

export default fetch;