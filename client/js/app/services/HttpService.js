'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, HttpService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('HttpService', HttpService = function () {
                function HttpService() {
                    _classCallCheck(this, HttpService);
                }

                _createClass(HttpService, [{
                    key: '_handlerErrors',
                    value: function _handlerErrors(resp) {
                        if (!resp.ok) throw new Error(resp.statusText);
                        return resp;
                    }
                }, {
                    key: 'get',
                    value: function get(url) {
                        var _this = this;

                        return fetch(url).then(function (resp) {
                            return _this._handlerErrors(resp);
                        }).then(function (resp) {
                            return resp.json();
                        });
                    }
                }, {
                    key: 'post',
                    value: function post(url, dado) {
                        var _this2 = this;

                        return fetch(url, {
                            headers: { 'Content-Type': 'application/json' },
                            method: 'post',
                            body: JSON.stringify(dado)
                        }).then(function (res) {
                            return _this2._handleErrors(res);
                        });
                    }
                }, {
                    key: 'old_get',
                    value: function old_get(url) {
                        return new Promise(function (resolve, reject) {
                            var xhr = new XMLHttpRequest();
                            xhr.open('GET', url);
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState == 4) {
                                    if (xhr.status == 200) {
                                        resolve(JSON.parse(xhr.responseText));
                                    } else {
                                        reject("Erro ao buscar do servidor!!");
                                    }
                                }
                            };
                            xhr.send();
                        });
                    }
                }, {
                    key: 'old_post',
                    value: function old_post(url, dado) {

                        return new Promise(function (resolve, reject) {

                            var xhr = new XMLHttpRequest();
                            xhr.open("POST", url, true);
                            xhr.setRequestHeader("Content-type", "application/json");
                            xhr.onreadystatechange = function () {

                                if (xhr.readyState == 4) {

                                    if (xhr.status == 200) {

                                        resolve(JSON.parse(xhr.responseText));
                                    } else {

                                        reject(xhr.responseText);
                                    }
                                }
                            };
                            xhr.send(JSON.stringfy(dado));
                        });
                    }
                }]);

                return HttpService;
            }());

            _export('HttpService', HttpService);
        }
    };
});
//# sourceMappingURL=HttpService.js.map