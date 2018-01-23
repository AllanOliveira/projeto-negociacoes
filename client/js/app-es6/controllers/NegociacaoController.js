import {Negociacao} from '../models/Negociacao';
import {ListaNegociacoes} from '../models/ListaNegociacoes';
import {Mensagem} from '../models/Mensagem';
import {NegociacaoService} from '../services/NegociacaoService';
import {NegociacoesView} from '../views/NegociacoesView';
import {Bind} from '../helpers/Bind';
import {DateHelper} from '../helpers/DateHelper';
import {MensagemView} from '../views/MensagemView';

class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._ordemAtual = '';

        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
                                          new NegociacoesView($('#negociacoesView')),
                                          "adiciona","esvazia","ordenar","reverse");

        this._mensagem = new Bind(new Mensagem(),
                                  new MensagemView($('#mensagemView')),
                                  "texto");

        this._service = new NegociacaoService();

        this._init();
    }

    _init(){
        this._buscaNegociacoes();
        setInterval( () => { this.importarNegociacoes(); },3000);
    }

    adiciona(event){
        event.preventDefault();
        let negociacao = this._criaNegociacao();
        
        this._service
            .cadastra(negociacao)
            .then( mensagem => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = mensagem;
                this._limpaFormulario();
            })
            .catch( erro => this._mensagem.texto = "Erro ao adicionar a negociação! - "+e);       
    }

    importarNegociacoes(){
        this._service
            .importarNegociacoes(this._listaNegociacoes.negociacoes)
            .then(negociacoes => 
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch( erro => this._mensagem.texto = erro)
    }

    apaga(){
        this._service
            .apagaTodas()
            .then( msg => {
                    this._listaNegociacoes.esvazia();
                    this._mensagem.texto = msg;})
            .catch(msg => this._mensagem.texto = msg);
    }

    ordenar(coluna){
        if(this._ordemAtual == coluna)
            return this._listaNegociacoes.reverse();
        
        this._listaNegociacoes.ordenar((a,b) => a[coluna] - b[coluna]);

        this._ordemAtual = coluna;
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = '0.0';
        this._inputData.focus();
    }

    _criaNegociacao(){
         return new Negociacao(DateHelper.textoParaData(this._inputData.value),
                               parseInt(this._inputQuantidade.value),
                               parseFloat(this._inputValor.value));
    }

    _buscaNegociacoes(){
        
        this._service
            .lista()
            .then( negociacoes => 
                    negociacoes.forEach( 
                        negociacao => this._listaNegociacoes.adiciona(negociacao)))
            .catch(erro => {
                console.log(erro);
                this._mensagem.texto = erro;
            });
    }

}

let negociacaoController = new NegociacaoController();

export function currentInstance(){
    return negociacaoController;
}
