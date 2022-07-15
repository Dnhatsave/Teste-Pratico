import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PairService } from '../services/pair.services';
import { CodesDTO } from './models/codes.DTO';
import { ConvertBaseDTO } from './models/convert-base.DTO';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  formData: FormGroup;
  items : ConvertBaseDTO[];
  codes: CodesDTO[];
  colunas: string[];
  base: string;
  target: string;
  convertido: number;
  rate: number;
  valorr: number;
  moeda: string = 'MZN';
  constructor(
    public pairService: PairService
  ) {}

  ngOnInit(): void {
    this.formData = new FormGroup({
      base_code: new FormControl('MZN', [Validators.required] ),
      target_code: new FormControl('USD',[Validators.required]),
      valor: new FormControl(null)
    });

    this.base = this.formData.value.base_code;
    this.target = this.formData.value.target_code;
  }

  ionViewWillEnter() {
    this.pairService.getCodes() 
    .subscribe(response => {
      //Pegar a primeira coluna do Array
      const arrayColumn = (arr, n) => arr.map((x) => x[n]);
      this.codes = response['supported_codes'];
      this.colunas = arrayColumn(this.codes,0);
    }, 
    error=> {
    });

    this.getUpdates();
  }

  exchange(){
    this.pairService.exchange(this.formData.value.base_code, this.formData.value.target_code)
    .subscribe(response => {
      this.items = response;
      this.rate = response['conversion_rate'];
      this.convertido = this.formData.value.valor * this.rate;
    }, 
    error=> {
      console.log( error);
    })
  }

  getUpdates(){
    this.pairService.challenge(this.moeda).subscribe(
      response => {
        this.items = response;
        console.log(this.items);
      }
    )
  }

  updateBaseCode(){
  }

  updateTargetCode(){

  }


}
