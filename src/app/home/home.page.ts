import { Component } from '@angular/core';
import { PairService } from '../services/pair.services';
import { CodesDTO } from './models/codes.DTO';
import { ConvertBaseDTO } from './models/convert-base.DTO';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items : ConvertBaseDTO[];
  codes: CodesDTO[];
  base_code:string = 'USD';
  target_code:string ='MZN';
  constructor(
    public pairService: PairService
  ) {}

  ionViewWillEnter() {
    this.pairService.getCodes() 
    .subscribe(response => {
      this.codes = response['supported_codes'];
      console.log(this.codes);
    }, 
    error=> {
      console.log( error);
    });
  }

  exchange(){
    this.pairService.exchange(this.base_code, this.target_code)
    .subscribe(response => {
      this.items = response;
      console.log(this.items);
    }, 
    error=> {
      console.log( error);
    })
  }

}
