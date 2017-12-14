import { Component, OnInit } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';
import { EquipService } from '../../../services/equip.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.scss'],
  providers: [EquipService]
})
export class RouterComponent implements OnInit {
  public pageNum:number = 1;
  public pageSize:number = 10;

  public data:any = [];

  constructor(
    private sg:SimpleGlobal,
    private eserv:EquipService
  ) { 
    let email = this.sg['userId'];
    this.eserv.getRoutes(email, this.pageNum, this.pageSize, (res)=>{
      
      for(let rr of res.result){
        let rview = rr.apOverview;
        let rinfo:any = {};
        rinfo.wip = rview.user.ip;
        rinfo.nip = rview.user.innerIpShow;
        rinfo.devcount = rview.deviceAmount;
        rinfo.alertcount = rview.deviceAlertAmount;
        rinfo.alias = rview.user.alias;
        rinfo.mac = rview.user.apMacAddr;
        rinfo.ports = _.take(rview.ports, 5);
        //update
        rinfo.id = rview.user.id;
        rinfo.emailAddr = rview.user.emailAddr;
        rinfo.phoneNumber = rview.user.phoneNumber;
        rinfo.userId = rview.user.userId;

        this.data.push(rinfo);
      }
    });

  }

  ngOnInit() {
    new PerfectScrollbar('#routerScroll', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
  }

  //应用流量排名
  getLLList(mac, rif){
    if(!rif.yytop10 || rif.yytop10.length <= 0){
      document.body.style.cursor = 'wait';
      this.eserv.GetAppLLTop10(mac, res=>{
        if(res && res.length > 0){
          let result = _.map(res, (d:any)=>{
            return {key: d.key, value: (d.value / 1000 / 1000).toFixed(2)};
          });
          rif.yytop10 = result;
        }
        document.body.style.cursor = 'auto';
      });
    }

    if(!rif.sbtop10 || rif.sbtop10.length <= 0){
      this.eserv.GetEquLLTop10(mac, res=>{
        let result = _.map(res, (d:any)=>{
          return {key: d.key, value: (d.value / 1000 / 1000).toFixed(2)};
        });
        result = _.take(result, 10);
        rif.sbtop10 = result;
      });
    }
  }

  public currentRouter:any = {alias: ''};
  public isShowDialog:boolean = false;
  showDialog(router){
    this.currentRouter = router;
    this.isShowDialog = true;
    document.getElementById('modifyAllRouterName').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
  }
  hideDialog(){
    this.isShowDialog = false;
    document.getElementById('overlay').style.display = 'none';
  }
  public inputerr:boolean = false;
  confirmEquipName(val){
    if(val == ''){
      this.inputerr = true;
    }else{
      this.inputerr = false;
      this.currentRouter.alias = val;
      
      this.eserv.UpdateRouterName(this.currentRouter, res=>{});
      this.hideDialog();
    }
  }

}
