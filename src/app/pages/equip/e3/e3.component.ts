import { Component, OnInit } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';

import { EquipService } from '../../../services/equip.service';

@Component({
  selector: 'app-e3',
  templateUrl: './e3.component.html',
  styleUrls: ['./e3.component.scss'],
  providers: [EquipService]
})
export class E3Component implements OnInit {
  public equipCount = {
      total: 0,
      dn: 0,
      sj: 0,
      qt: 0,
      sxt: 0,
      znsb: 0
  };

  constructor(
    private eserv:EquipService,
    private sg:SimpleGlobal
  ) { 
    let apmac = this.sg['apMac'];
    this.eserv.getEquipCount(apmac, res=>{
        for(var m of res){
            if(m.type == 1){
                this.equipCount.dn = m.amount;
            }else if(m.type == 2){
                this.equipCount.sj = m.amount;
            }else if(m.type == 3){
                this.equipCount.qt = m.amount;
            }else if(m.type == 4){
                this.equipCount.sxt = m.amount;
            }
            this.equipCount.total += m.amount;
        }   
    });
  }

  ngOnInit() {
  }

}
