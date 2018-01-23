const stores = ['negociacao'];
const version = 1;
const dbName = 'BancoPanamericano';

let connection;
let close = null;
    
export class ConnectionFactory{

    constructor(){
        throw new Error('Não eh possivel criar instancias de ConnectionFactory')
    }

    static getConnection(){

        return new Promise((resolve,reject)=>{
            let openRequest = indexedDB.open(dbName,version);
            openRequest.onupgradeneeded = e => ConnectionFactory._createStores(e.target.result);
            openRequest.onsuccess = e => {
                if(!connection) {
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function(){
                        throw new Error('Não eh possível fechar a conexão manualmente!');
                    }
                }
                resolve(connection);
            }
            openRequest.onerror = e => reject(e.target.error);
        });
    }

    static _createStores(connection){
        stores.forEach(
            (store) => {
                if(connection.objectStoreNames.contains(store)) 
                    connection.deleteObjectStore(store);

                connection.createObjectStore(store,{autoIncrement : true});
            }
        );
    }

    static closeConnection(){
        close();
    }
}