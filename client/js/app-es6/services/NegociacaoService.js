import {HttpService} from './HttpService';
import {Negociacao} from '../models/Negociacao';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {ConnectionFactory} from './ConnectionFactory';

export class NegociacaoService{

    constructor(){
       this._http = new HttpService(); 
    }

    cadastra(negociacao){
        return ConnectionFactory
                    .getConnection()
                    .then(connection => new NegociacaoDao(connection))
                    .then(dao => dao.adiciona(negociacao))
                    .then(() => 'Negociação cadastrada com sucesso!')
                    .catch(erro => {throw new Error("Não foi possível adicionar a negociação") });

    }

    lista(){
        return ConnectionFactory
                .getConnection()
                .then(connection => new NegociacaoDao(connection))
                .then(dao => dao.listaTodos())
                .catch(erro => {throw new Error("Não foi possível buscar todas as negociações!") });
    }

    importarNegociacoes(negociacoesAtuais){
        return this.obtemNegociacoes()
                   .then(negociacoes => 
                        negociacoes.filter( negociacao => 
                            !negociacoesAtuais.some(
                                negociacaoExistente => negociacao.isEquals(negociacaoExistente)
                            )
                        ))
                   .catch(erro => {
                        console.log(erro)
                        throw new Error("Não foi possível importar todas as negociações!");
                   });
    }

    apagaTodas(){
        return ConnectionFactory
                    .getConnection()
                    .then(connection => new NegociacaoDao(connection))
                    .then(dao => dao.apagaTodas())
                    .catch(erro => {throw new Error("Não foi possível buscar todas as negociações!") });
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
            this._http.get('negociacoes/anterior')
                      .then((arrayObjeto) =>
                        resolve(
                            arrayObjeto.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)))
                        ).catch(erro => reject(erro));
        });
    }

    obtemNegociacoesDaSemanaRetrasada(){
        return new Promise((resolve,reject)=>{
            this._http.get('negociacoes/retrasada')
                      .then((arrayObjeto) =>
                        resolve(
                            arrayObjeto.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade,objeto.valor)))
                        ).catch(erro => reject(erro));
        });
    }

    obtemNegociacoes(){
        return new Promise((resolve,reject) => {
            Promise.all([this.obtemNegociacoesDaSemana(),
                        this.obtemNegociacoesDaSemanaAnterior(),
                        this.obtemNegociacoesDaSemanaRetrasada()])
                    .then(arrayPromisses => {
                        resolve(arrayPromisses.reduce((arrayNovo,elemento) => arrayNovo.concat(elemento),[]));
                    })
                    .catch(erro => reject(erro));
        })   
    }
}