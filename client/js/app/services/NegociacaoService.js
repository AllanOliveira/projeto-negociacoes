class NegociacaoService{

    constructor(){
       this._http = new HttpService(); 
    }

    obtemNegociacoesDaSemana(){
        return new Promise((resolve,reject)=>{

            this._http.get('negociacoes/semana')
                      .then((arrayObjeto) =>
                        resolve(
                            arrayObjeto.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)))
                        ).catch(erro => reject(erro));
        });
        
    }

    obtemNegociacoesDaSemanaAnterior(){
        
        return new Promise((resolve,reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open('GET','negociacoes/anterior');
            xhr.onreadystatechange = () =>{
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText)
                                    .map((objeto) => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));
                        
                    }else{
                        reject("Erro ao buscar do servidor!!");
                    }
                }
    
            }
            xhr.send();
        });
        
    }

    obtemNegociacoesDaSemanaRetrasada(){
        
        return new Promise((resolve,reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open('GET','negociacoes/retrasada');
            xhr.onreadystatechange = () =>{
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText)
                                    .map((objeto) => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)));
                        
                    }else{
                        reject("Erro ao buscar do servidor!!");
                    }
                }
    
            }
            xhr.send();
        });
        
    }
}