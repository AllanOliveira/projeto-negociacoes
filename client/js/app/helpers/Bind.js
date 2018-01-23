'use strict';

System.register(['../services/ProxyFactory'], function (_export, _context) {
    "use strict";

    var ProxyFactory, Bind;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_servicesProxyFactory) {
            ProxyFactory = _servicesProxyFactory.ProxyFactory;
        }],
        execute: function () {
            _export('Bind', Bind =

            //associa o modelo a view
            function Bind(modelo, view) {
                _classCallCheck(this, Bind);

                for (var _len = arguments.length, propriedades = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                    propriedades[_key - 2] = arguments[_key];
                }

                var proxy = ProxyFactory.create(modelo, propriedades, function (modelo) {
                    return view.update(modelo);
                });
                view.update(modelo);
                return proxy;
            });

            _export('Bind', Bind);
        }
    };
});
//# sourceMappingURL=Bind.js.map