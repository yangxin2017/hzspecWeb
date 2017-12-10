import { Component, OnInit } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';
import { EquipService } from '../../../services/equip.service';

import timeago from 'timeago.js';
import * as _ from 'lodash';

@Component({
  selector: 'app-elist',
  templateUrl: './elist.component.html',
  styleUrls: ['./elist.component.scss'],
  providers: [EquipService]
})
export class ElistComponent implements OnInit {
  public data:any;
  public allEquips:any;
  public pageType:string = 'yes';

  public pageNum:number = 1;
  public pageSize:number = 20;
  public totalPageCount:number = 0;

  private apMac:string = '';

  constructor(
    private eserv:EquipService,
		private sg:SimpleGlobal
  ) { 
    let apmac = this.sg['apMac'];
    this.apMac = apmac;
    let timeagoInstance = timeago();

    eserv.getAllByMac({apMacAddress: apmac, pageNum: this.pageNum, pageSize: this.pageSize}, (res)=>{
      this.totalPageCount = res.totalPageCount;
      let dat = [];

      res.result = _.orderBy(res.result, ['deviceType'], ['desc']);
      res.result = _.filter(res.result, (d)=>{return d.deviceMacAddr != apmac});

      res.result.forEach(d=>{
        d.timeAdded = timeagoInstance.format(d.timeAdded, 'zh_CN');
        d.tname = '其他';
        d.ename = 'other';
        if(d.deviceType == 1){
            d.tname = '电脑';
            d.ename = 'computer';
        }else if(d.deviceType == 2){
            d.tname = '手机';
            d.ename = 'phone';
        }else if(d.deviceType == 3){
            d.tname = '智能设备';
            d.ename = 'znsb';
        }else if(d.deviceType == 4){
            d.tname = '摄像头';
            d.ename = 'video';
        }

        if(d.status == '20'){
          d.status_str = '_white';
        }else if(d.status == '40'){
          d.status_str = '_xs';
        }else if(d.status == '9-17'){
          d.status_str = '_ls';
        }else if(d.status == '30'){
          d.status_str = '_black';
        }

        d.list = [];

        d.deviceServices_short = _.take(d.deviceServices, 5);

      });

      this.allEquips = res.result

      if(this.pageType == 'yes'){
        this.data = _.filter(res.result, (d)=>{
          return d.status != '10';
        });
      }else{
        this.data = _.filter(res.result, (d)=>{
          return d.status == '10';
        });
      }

    });

  }

  ngOnInit() {
    new PerfectScrollbar('#equipScroll', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
  }

  authDev(devid:string, auth:string){
    this.eserv.authDevice(devid, auth, (res)=>{});
    this.data.forEach(element => {
      if(element.id == devid){
        element.status = auth;
      }
    });
  }

  //TOP10
  getEquLL(equ, event){
    event.stopPropagation();
    if(!equ.list || equ.list.length == 0){
      let mac = equ.deviceMacAddr;

      this.eserv.GetEquLLTop10(mac, res=>{
        let result = _.map(res, (d:any)=>{
          return {key: d.key, value: (d.value / 1000 / 1000).toFixed(2)};
        });
        equ.list = result;
        /*let tdata = _.map(this.data, (d:any)=>{
          if(d.deviceMacAddr == mac){
            return equ;
          }else{
            return d;
          }
        });
        this.data = tdata;*/
      });

    }
  }

  //PORTS
  public deviceId:string = '';
  public listEquipServices:any = [];
  public titles:any = null;

  showDialog(){
    document.getElementById('outService').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    new PerfectScrollbar('#serviceScroll', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
  }
  hideDialog(){
    document.getElementById('outService').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  }

  getEquipServ(devMac:string){
    this.deviceId = devMac;

    this.listEquipServices = [];
    this.eserv.getAllByMac({apMacAddress: this.apMac, pageNum: 1, pageSize: 20}, res=>{
      
      let okres = _.filter(res.result, function(o){return o.status != '10'});
      okres.forEach(ele=>{
        for(let md of ele.deviceServices){
          md.ip = ele.ip;
        }
        
        //this.listEquipServices = _.merge(this.listEquipServices, ele.deviceServices);
      });
      this.titles = okres;

      let tmps = _.filter(this.titles, ['deviceMacAddr', devMac]);
      this.listEquipServices = [];
      tmps.forEach(ele=>{
        this.listEquipServices = _.merge(this.listEquipServices, ele.deviceServices);
      });

    });
    this.showDialog();
  }

  filterServices(devMac:string){
    this.deviceId = devMac;

    if(devMac == 'null'){
      let okres = this.titles;
      this.listEquipServices = [];
      okres.forEach(ele=>{
        this.listEquipServices = _.merge(this.listEquipServices, ele.deviceServices);
      });
    }else{
      let okres = _.filter(this.titles, ['deviceMacAddr', devMac]);
      this.listEquipServices = [];
      okres.forEach(ele=>{
        this.listEquipServices = _.merge(this.listEquipServices, ele.deviceServices);
      });
    }
  }

}
