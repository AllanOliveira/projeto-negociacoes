'use strict';

System.register(['./HttpService', '../models/Negociacao', '../dao/NegociacaoDao', './ConnectionFactory'], function (_export, _context) {
    "use strict";

    var HttpService, Negociacao, NegociacaoDao, ConnectionFactory, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_daoNegociacaoDao) {
            NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
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

            _export('NegociacaoService', NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: 'cadastra',
                    value: function cadastra(negociacao) {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.adiciona(negociacao);
                        }).then(function () {
                            return 'Negociação cadastrada com sucesso!';
                        }).catch(function (erro) {
                            throw new Error("Não foi possível adicionar a negociação");
                        });
                    }
                }, {
                    key: 'lista',
                    value: function lista() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.listaTodos();
                        }).catch(function (erro) {
                            throw new Error("Não foi possível buscar todas as negociações!");
                        });
                    }
                }, {
                    key: 'importarNegociacoes',
                    value: function importarNegociacoes(negociacoesAtuais) {
                        return this.obtemNegociacoes().then(function (negociacoes) {
                            return negociacoes.filter(function (negociacao) {
                                return !negociacoesAtuais.some(function (negociacaoExistente) {
                                    return negociacao.isEquals(negociacaoExistente);
                                });
                            });
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error("Não foi possível importar todas as negociações!");
                        });
                    }
                }, {
                    key: 'apagaTodas',
                    value: function apagaTodas() {
                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.apagaTodas();
                        }).catch(function (erro) {
                            throw new Error("Não foi possível buscar todas as negociações!");
                        });
                    }
                }, {
                    key: 'obtemNegociacoesDaSemana',
                    value: function obtemNegociacoesDaSemana() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {
                            _this._http.get('negociacoes/semana').then(function (arrayObjeto) {
                                return resolve(arrayObjeto.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (erro) {
                                return reject(erro);
                            });
                        });
                    }
                }, {
                    key: 'obtemNegociacoesDaSemanaAnterior',
                    value: function obtemNegociacoesDaSemanaAnterior() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {
                            _this2._http.get('negociacoes/anterior').then(function (arrayObjeto) {
                                return resolve(arrayObjeto.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (erro) {
                                return reject(erro);
                            });
                        });
                    }
                }, {
                    key: 'obtemNegociacoesDaSemanaRetrasada',
                    value: function obtemNegociacoesDaSemanaRetrasada() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {
                            _this3._http.get('negociacoes/retrasada').then(function (arrayObjeto) {
                                return resolve(arrayObjeto.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (erro) {
                                return reject(erro);
                            });
                        });
                    }
                }, {
                    key: 'obtemNegociacoes',
                    value: function obtemNegociacoes() {
                        var _this4 = this;

                        return new Promise(function (resolve, reject) {
                            Promise.all([_this4.obtemNegociacoesDaSemana(), _this4.obtemNegociacoesDaSemanaAnterior(), _this4.obtemNegociacoesDaSemanaRetrasada()]).then(function (arrayPromisses) {
                                resolve(arrayPromisses.reduce(function (arrayNovo, elemento) {
                                    return arrayNovo.concat(elemento);
                                }, []));
                            }).catch(function (erro) {
                                return reject(erro);
                            });
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map