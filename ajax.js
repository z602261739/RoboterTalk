function ajax(options) {
    var xhr = new XMLHttpRequest();

    var url = options.url;
    var isAsync = typeof (options.isAsync) === 'undefined' ? true : options.isAsync;
    var success = typeof (options.success) === 'function' ? options.success : function () { };
    var headers = options.headers;

    // 判断传的数据是否为对象
    var data = '';
    if (typeof (options.data) === 'object') {
        for (var prop in options.data) {
            data += prop + '=' + options.data[prop] + '&';
        }
        data = data.slice(0, data.length - 1);
    } else {
        data = options.data;
    }

    // 判断请求方式
    var method = '';
    if (options.method) {
        method = options.method.toUpperCase();
    } else {
        method = 'GET'
    }

    // 监听网络请求状态
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                success(JSON.parse(xhr.responseText));
            }
        }
    }
    if (method === 'GET') {
        // 建立连接
        xhr.open(method, url + '?' + data, isAsync);
        // 发送数据
        xhr.send();
    } else{
        xhr.open(method, url, isAsync);
        

        // 判断请求头是否存在
        if (headers) {
            for (var prop in headers) {
                if (headers.hasOwnProperty(prop)) {
                    xhr.setRequestHeader(prop, headers[prop]);
                }
            }
            if (!headers['Content-type']) {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencode');
            }
        } else {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencode');
        }
        

        xhr.send(data);
    }
}