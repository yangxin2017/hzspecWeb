import { Component, OnInit } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';

import { EquipService } from '../../../services/equip.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-ninfor',
  templateUrl: './ninfor.component.html',
  styleUrls: ['./ninfor.component.scss'],
  providers: [EquipService]
})
export class NinforComponent implements OnInit {
  private routerInfor:any = {
    wip: '',
    nip: '',
    yytop10: [],
    sbtop10: [],
    ports: [],
    devcount: 0,
    alertcount: 0,
    alias: '',
    mac: ''
  };

  constructor(
    private eserv:EquipService,
    private sg:SimpleGlobal
  ) { 
    let apMac:string = this.sg['apMac'];
    
    this.eserv.getAllData(apMac, res=>{
      this.routerInfor.wip = res.user.ip;
      this.routerInfor.nip = res.user.innerIpShow;
      this.routerInfor.devcount = res.deviceAmount;
      this.routerInfor.alertcount = res.deviceAlertAmount;
      this.routerInfor.alias = res.user.alias;
      this.routerInfor.mac = res.user.apMacAddr;
      this.routerInfor.ports = _.take(res.ports, 5);
    });
  }

  ngOnInit() {
  }

  //应用流量排名
  getLLList(mac){
    if(this.routerInfor.yytop10.length <= 0){
      this.eserv.GetAppLLTop10(mac, res=>{
        if(res && res.length > 0){
          let result = _.map(res, (d:any)=>{
            return {key: d.key, value: (d.value / 1000 / 1000).toFixed(2)};
          });
          this.routerInfor.yytop10 = result;
        }
      });
    }

    if(this.routerInfor.sbtop10.length <= 0){
      this.eserv.GetEquLLTop10(mac, res=>{
        let result = _.map(res, (d:any)=>{
          return {key: d.key, value: (d.value / 1000 / 1000).toFixed(2)};
        });
        result = _.take(result, 10);
        this.routerInfor.sbtop10 = result;
      });
    }
  }

}
