class NegociacaoController{

    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(),
                                          new NegociacoesView($('#negociacoesView')),
                                          "adiciona","esvazia");

        this._mensagem = new Bind(new Mensagem(),
                                  new MensagemView($('#mensagemView')),
                                  "texto");                                
       
    }

    adiciona(event){
        event.preventDefault();
        let negociacao = this._criaNegociacao();
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto="Negociação importada com sucesso!!"
        this._limpaFormulario();
    }

    importarNegociacoes(){
        let service = new NegociacaoService();
        
        Promise.all([service.obtemNegociacoesDaSemana(),
                     service.obtemNegociacoesDaSemanaAnterior(),
                     service.obtemNegociacoesDaSemanaRetrasada()])
               .then(arrayPromisses => {
                     arrayPromisses.reduce((arrayNovo,elemento) => arrayNovo.concat(elemento),[])
                                   .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                })
               .catch( erro => this._mensagem.texto=erro);
    }

    apaga(){
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso!!";
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = '0.0';
        this._inputData.focus();
    }

    _criaNegociacao(){
         return new Negociacao(DateHelper.textoParaData(this._inputData.value),
                              this._inputQuantidade.value,
                              this._inputValor.value);
    }
}
