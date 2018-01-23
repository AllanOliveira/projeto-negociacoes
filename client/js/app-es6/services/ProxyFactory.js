export class ProxyFactory{

    static create(modelo,propriedades,acao){
        
        return new Proxy(modelo,{
            get(target,prop,receiver){

                if(propriedades.includes(prop)
                    && typeof(target[prop]) == typeof(Function)){
                    
                    return function(){
                        let retorno = Reflect.apply(target[prop],target,arguments);
                        acao(target);
                        return retorno;
                    }
                }

                return Reflect.get(target,prop,receiver);;
            },
            set(target,prop,values,receiver){
                
                let retorno = Reflect.set(target,prop,values,receiver);
                
                if(propriedades.includes(prop))
                    acao(target);                    
                
                return retorno;
            }
        });
    }
}