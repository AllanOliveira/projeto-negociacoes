import {Negociacao} from '../models/Negociacao';

export class NegociacaoDao{

    constructor(connection){
        this._store = 'negociacao';
        this._connection = connection;
    }

    adiciona(negociacao){
        return new Promise((resolve,reject) =>{                
            let request =this._connection.transaction([this._store],'readwrite')
                                    .objectStore(this._store)
                                    .add(negociacao);

            request.onsuccess = e => resolve(e);
            request.onerror = e => reject(e.target.error);
        });
    }

    listaTodos(){
        return new Promise((resolve,reject) =>{
            let cursor = this._connection.transaction([this._store],'readwrite')
                                         .objectStore(this._store)
                                         .openCursor()

            let negociacoes = [];
            cursor.onsuccess = e => {
                if(this._processaResultadoCursor(e.target.result,negociacoes)){
                    resolve(negociacoes);
                }
            }
        })
    }

    _processaResultadoCursor(resultado,negociacoes){
        if(resultado){
            let negociacao = this._processaItem(resultado.value);
            negociacoes.push(negociacao);
            resultado.continue();
            return false;
        }
        return true;
    }

    _processaItem(item){
        return new Negociacao(item._data,item._quantidade,item._valor);
    }

    apagaTodas(){
        return new Promise((resolve,reject) => {
            
            let request = this._connection.transaction([this._store],'readwrite')
                                    .objectStore(this._store)
                                    .clear();

            request.onsuccess = e => resolve("Negociações removidas com sucesso!");
            request.onerror = e => reject("Não foi possível remover as negociações!");    
        });
    }
}