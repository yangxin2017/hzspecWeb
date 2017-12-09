import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';

import { EquipService } from '../../../services/equip.service';
import * as _ from 'lodash';
import SockJS from 'sockjs-client/dist/sockjs.min';
import Stomp from 'stompjs/lib/stomp.min';
import * as moment from 'moment';

@Component({
  selector: 'app-ninfor',
  templateUrl: './ninfor.component.html',
  styleUrls: ['./ninfor.component.scss'],
  providers: [EquipService]
})
export class NinforComponent implements OnInit, OnDestroy {
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

  public RouterStatus:any = {
      online: 0,
      offlineSpan: 0,
      offlineMinute: 0,
      offTime: ''
  };
  public currentLLNumber = 0;
  public stompClient:any = null;

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

    this.initWebSocket(apMac);
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    console.log('close');
    this.disconnect();
  }
  disconnect() {
      if (this.stompClient != null) {
          this.stompClient.disconnect();
      }
  }

  initWebSocket(apmac){
      console.log('open');

      var socket = new SockJS('http://60.205.212.99/dolphin/initWebSocket/');
      this.stompClient = Stomp.Stomp.over(socket);
      this.stompClient.connect({}, (frame) => {
          
          this.stompClient.send("/ws/ap/status/" + apmac, {}, JSON.stringify({"hello":"world"}));
          this.stompClient.subscribe('/wsx/ap/status/' + apmac, (response) => {
              let arr = response.body.split(',');
              console.log(response.body);
              if(arr.length >= 2){
                  this.RouterStatus.online = arr[0];
                  this.RouterStatus.offlineMinute = ((arr[1] / 60) % 60).toFixed(0);
                  this.RouterStatus.offlineSpan = (arr[1] / 60 / 60).toFixed(0);
                  this.RouterStatus.offTime = arr[2];
              }
          });
          //实时流量
          /*this.stompClient.send("/ws/ap/rate/" + apmac, {}, JSON.stringify({"hello":"world"}));
          this.stompClient.subscribe('/wsx/ap/rate/' + apmac, (response) => {
              console.log(response.body);
              let val = parseInt(response.body);
              this.currentLLNumber = val;
          });*/
      });
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
