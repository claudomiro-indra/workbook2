import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import {DateUtil} from '../util/DateUtil';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workbook';

  dataJaEscolhida = false;

  local: string = "JPA";

  posicao = '';

  posicoes: any = [
    {
      codigo: 'JPA-513',
      extenso: '513'
    },
    {
      codigo: 'JPA-515',
      extenso: '515'
    },
    {
      codigo: 'JPA-517',
      extenso: '517'
    },
  ];

  locais: any = [
    {
      nome: 'Itaim-Bibi',
      sigla: 'SPI',
      posicoes: []
    },
    {
      nome: 'Pinheiros',
      sigla: 'SPP'
    },
    {
      nome: 'João Pessoa (5º Andar)',
      sigla: 'JPA5',
      andar: 5,
      posicoes: [513, 515, 517]
    },
    {
      nome: 'João Pessoa (8º Andar)',
      sigla: 'JPA8',
      andar: 8,
      posicoes: [855, 861, 865]
    }
  ];

  formGroup: FormGroup;

  dataInicial ;

  constructor(private formBuilder: FormBuilder) {
    console.log("10:45");
    this.formGroup = this.formBuilder.group(this.locais);
    const now = moment;

    this.dataInicial = now;
    if(DateUtil.ehHojeFimDeSemana()) {
      this.dataInicial = DateUtil.proximaSegunda();
    }
    console.log("this.dataInicial=", this.dataInicial);
  }

  dataMudou(evento:any) {
    this.dataJaEscolhida = true;
    const novaData = evento.value;
    if(moment().diff(novaData, 'days') > 0) {
      alert("Esta data está no passado.");
      return;
    }
    if(DateUtil.ehFimDeSemana(novaData)) {
      alert("A empresa estará fechada nesse dia.");
      this.posicoes = []
      return;
    }
    this.locais.push({
      nome: 'Curitiba',
      sigla: 'CWB'
    });
  }

    localMudou(evento:any) {
      const novoValor = evento.value;
      this.posicoes = [];
      for(var i = 0; i < this.locais.length; i++) {
        console.log(`looping this.locais[i]=`, this.locais[i]);
        const localLoop = this.locais[i];
        console.log("localLoop=", localLoop);
        if(localLoop.sigla === novoValor) {
          for(var j = 0; j < localLoop.posicoes.length; j++) {
            var posicaoLoop = localLoop.posicoes[j];
            this.posicoes.push({codigo: localLoop.sigla +'-'+ posicaoLoop, extenso: posicaoLoop});
          }
        }
      }
  };
}
