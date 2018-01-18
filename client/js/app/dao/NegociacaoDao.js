class NegociacaoDao{

    constructor(){
        this._store = 'negociacao';
        this._connectionPromisse = ConnectionFactory.getConnection();
    }

    adiciona(negociacao){

        this._connectionPromisse.then(connection => {
            return new Promise((resolve,reject) => {
                
                let request = connection
                                  .transaction([this._store],'readwrite')
                                  .objectStore(this._store)
                                  .add(negociacao);
                
                request.onsuccess = e => resolve(e);
                request.onerror = e => reject(e.target.error);
            });
        });
    }
}