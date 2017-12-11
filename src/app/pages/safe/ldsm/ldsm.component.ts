import { Component, OnInit } from '@angular/core';

import { SimpleGlobal } from 'ng2-simple-global';
import { EquipService } from '../../../services/equip.service';
@Component({
  selector: 'app-ldsm',
  templateUrl: './ldsm.component.html',
  styleUrls: ['./ldsm.component.scss'],
  providers: [EquipService]
})
export class LdsmComponent implements OnInit {
  public data:any = [];

  constructor(
    private sg:SimpleGlobal,
    private eserv:EquipService
  ) { }

  ngOnInit() {
    new PerfectScrollbar('#ldsmScroll', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
    let mac = this.sg['apMac'];
    this.initData(mac);
  }

  initData(apmac){
    this.eserv.getRes(apmac, (res)=>{
      if(res.portInfo){
        this.data = res.portInfo;
        for(let td of this.data){
          if(td.keyinfo.type == 'outdated web server')
            td.status = 2;
          else if(td.keyinfo.type == 'hard coded encryption key')
            td.status = 3;
          else 
            td.status = 1;
        }
      }
    });
  }

}
