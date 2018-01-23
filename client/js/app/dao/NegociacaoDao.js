'use strict';

System.register(['../models/Negociacao'], function (_export, _context) {
    "use strict";

    var Negociacao, _createClass, NegociacaoDao;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
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

            _export('NegociacaoDao', NegociacaoDao = function () {
                function NegociacaoDao(connection) {
                    _classCallCheck(this, NegociacaoDao);

                    this._store = 'negociacao';
                    this._connection = connection;
                }

                _createClass(NegociacaoDao, [{
                    key: 'adiciona',
                    value: function adiciona(negociacao) {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            var request = _this._connection.transaction([_this._store], 'readwrite').objectStore(_this._store).add(negociacao);

                            request.onsuccess = function (e) {
                                return resolve(e);
                            };
                            request.onerror = function (e) {
                                return reject(e.target.error);
                            };
                        });
                    }
                }, {
                    key: 'listaTodos',
                    value: function listaTodos() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            var cursor = _this2._connection.transaction([_this2._store], 'readwrite').objectStore(_this2._store).openCursor();

                            var negociacoes = [];
                            cursor.onsuccess = function (e) {
                                if (_this2._processaResultadoCursor(e.target.result, negociacoes)) {
                                    resolve(negociacoes);
                                }
                            };
                        });
                    }
                }, {
                    key: '_processaResultadoCursor',
                    value: function _processaResultadoCursor(resultado, negociacoes) {
                        if (resultado) {
                            var negociacao = this._processaItem(resultado.value);
                            negociacoes.push(negociacao);
                            resultado.continue();
                            return false;
                        }
                        return true;
                    }
                }, {
                    key: '_processaItem',
                    value: function _processaItem(item) {
                        return new Negociacao(item._data, item._quantidade, item._valor);
                    }
                }, {
                    key: 'apagaTodas',
                    value: function apagaTodas() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {

                            var request = _this3._connection.transaction([_this3._store], 'readwrite').objectStore(_this3._store).clear();

                            request.onsuccess = function (e) {
                                return resolve("Negociações removidas com sucesso!");
                            };
                            request.onerror = function (e) {
                                return reject("Não foi possível remover as negociações!");
                            };
                        });
                    }
                }]);

                return NegociacaoDao;
            }());

            _export('NegociacaoDao', NegociacaoDao);
        }
    };
});
//# sourceMappingURL=NegociacaoDao.js.map