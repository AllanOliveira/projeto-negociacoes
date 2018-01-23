import {ProxyFactory} from '../services/ProxyFactory';
export class Bind{

    //associa o modelo a view
    constructor(modelo,view,...propriedades){
        let proxy = ProxyFactory.create(modelo, propriedades, modelo => view.update(modelo));
        view.update(modelo);
        return proxy;
    }
}