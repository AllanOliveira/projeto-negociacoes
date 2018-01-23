export class ListaNegociacoes{

    constructor(callback){
        this._negociacoes = [];
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
    }

    get negociacoes(){
        return [].concat(this._negociacoes);
    }

    esvazia(){
        this._negociacoes = [];
    }

    ordenar(criterio){
        this._negociacoes.sort(criterio);
    }

    reverse(){
        this._negociacoes.reverse();
    }
}