;
(function(w) {
    "use strict"
    //通过id获取元素的方法
    var $$ = function(id) {
        return document.getElementById(id);
    };


    var upload = {};
    //创建上传插件实例
    upload.create = function(config) {
        var inputId = config.id;
        var url = config.url;

        var fileInput = $$(inputId);

        fileInput.onchange = function(e) {
            e.preventDefault();
            var reader = new FileReader();
            reader.readAsBinaryString(fileInput.files[0]);
            reader.onloadend = function() {
                upload.ajax(reader.result, url);
            };
        };
    };
    //异步上传的方法
    upload.ajax = function(data, url) {
        var xhr = new XMLHttpRequest(),
            method = "GET";

        xhr.open(method, url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                console.log(xhr.responseText);
            }
        };
        xhr.sendAsBinary(data);
    };

    w.upload = upload;
})(window);
