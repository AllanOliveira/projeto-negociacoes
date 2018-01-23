export class HttpService{

    _handlerErrors(resp){
        if(!resp.ok) throw new Error(resp.statusText);
        return resp;
    }

    get(url){
        return fetch(url)
            .then(resp => this._handlerErrors(resp))
            .then(resp => resp.json())
    }


    post(url, dado) {
        
        return fetch(url, {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify(dado)
        })
        .then(res => this._handleErrors(res));
    }
    
    old_get(url){
        return new Promise((resolve,reject)=>{
            let xhr = new XMLHttpRequest();
            xhr.open('GET',url);
            xhr.onreadystatechange = () =>{
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.responseText)); 
                    }else{
                        reject("Erro ao buscar do servidor!!");
                    }
                }
    
            }
            xhr.send();
        });
    }

    old_post(url, dado) {
        
            return new Promise((resolve, reject) => {
        
                let xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.onreadystatechange = () => {
        
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
        
}