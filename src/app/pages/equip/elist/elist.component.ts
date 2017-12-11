import { Component, OnInit } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';
import { EquipService } from '../../../services/equip.service';

import timeago from 'timeago.js';
import * as _ from 'lodash';
import echarts from 'echarts/dist/echarts.min';
import * as moment from 'moment';

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

      this.allEquips = res.result;
      this.initCount();

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

  changeType(tp){
    this.pageType = tp;
    if(this.pageType == 'yes'){
      this.data = _.filter(this.allEquips, (d)=>{
        return d.status != '10';
      });
    }else{
      this.data = _.filter(this.allEquips, (d)=>{
        return d.status == '10';
      });
    }
  }

  public allCount:number = 0;
  public blackCount:number = 0;
  public okCount:number = 0;
  public readyCount:number = 0;
  initCount(){
    this.allCount = this.allEquips.length;

    let okrev = _.filter(this.allEquips, (d)=>{return d.status != '10';});
    let readrev = _.filter(this.allEquips, (d)=>{return d.status == '10';});
    let blackrev = _.filter(this.allEquips, (d)=>{return d.status == '30';});

    this.blackCount = blackrev.length;
    this.okCount = okrev.length - this.blackCount;
    this.readyCount = readrev.length;
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
      document.body.style.cursor = 'wait';
      let mac = equ.deviceMacAddr;

      this.eserv.GetEquLLTop10(mac, res=>{
        let result = _.map(res, (d:any)=>{
          return {key: d.key, value: (d.value / 1000 / 1000).toFixed(2)};
        });
        equ.list = result;
        document.body.style.cursor = 'auto';
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
  public isShowDialog:boolean = false;

  showDialog(){
    this.isShowDialog = true;
    document.getElementById('outService').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    new PerfectScrollbar('#serviceScroll', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
  }
  hideDialog(){
    this.isShowDialog = false;
    //document.getElementById('outService').style.display = 'none';
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


  public isShowDialogEquip:boolean = false;
  public currentEquip:any = {alias: ''};
  hideEquipDialog(){
    this.isShowDialogEquip = false;
    document.getElementById('overlay').style.display = 'none';
  }
  showEquipDialog(equip){
    this.isShowDialogEquip = true;
    this.currentEquip = equip;
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('modifyEquipName').style.display = 'block';
  }
  confirmEquipName(name){
    this.currentEquip.alias = name;
    this.eserv.UpdateEquipName(this.currentEquip, res=>{});
    this.hideEquipDialog();
  }

  public isShowDialogSafe:boolean = false;
  hideSafeDialog(){
    this.isShowDialogSafe = false;
    document.getElementById('overlay').style.display = 'none';
  }
  showsafedialog(){
    this.isShowDialogSafe = true;
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('safeJS').style.display = 'block';
    this.initAlertCount();
  }
  initAlertCount(){
    let chMod = echarts.init(document.getElementById('safeTipChart'));
    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            data:['攻击次数','报警数量']
        },
        xAxis: [
            {
                type: 'category',
                data: ['周一','周二','周三','周四','周五','周六','周日'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '攻击次数',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '报警数量',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name:'攻击次数',
                type:'bar',
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
            },
            {
                name:'报警数量',
                type:'line',
                yAxisIndex: 1,
                data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3]
            }
        ]
    };
    chMod.setOption(option);
  }

  public isShowDialoghistory:boolean = false;
  hidehistoryDialog(){
    this.isShowDialoghistory = false;
    document.getElementById('overlay').style.display = 'none';
  }
  showhistorydialog(){
    this.isShowDialoghistory = true;
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('alerthistory').style.display = 'block';

    let s1:Date = new Date();
    let s2:Date = new Date();
    s1.setDate(s1.getDate() - 1);
    this.stime = this.getTimeStr(s1);
    this.etime = this.getTimeStr(s2);
      
    this.getAlertsList();
  }

  public curtime:string = '1tian';
  public stime:string = '';
  public etime:string = '';
  public pdatas:any = [];

  getDataByType(tp:string){
    let s1:Date = new Date();
    let s2:Date = new Date();

    if(this.curtime != tp){
      this.curtime = tp;

      if(tp == '10fen'){
          s1.setMinutes(s1.getMinutes() - 10);
      }else if(tp == '30fen'){
          s1.setMinutes(s1.getMinutes() - 20);
      }else if(tp == '1shi'){
          s1.setHours(s1.getHours() - 1);
      }else if(tp == '1tian'){
          s1.setDate(s1.getDate() - 1);
      }else if(tp == '7tian'){
          s1.setDate(s1.getDate() - 7);
      }else if(tp == '1yue'){
          s1.setMonth(s1.getMonth() - 1);
      }else if(tp == '3yue'){
          s1.setMonth(s1.getMonth() - 3);
      }else if(tp == '6yue'){
          s1.setMonth(s1.getMonth() - 6);
      }else if(tp == '1nian'){
          s1.setFullYear(s1.getFullYear() - 1);
      }
      this.stime = this.getTimeStr(s1);
      this.etime = this.getTimeStr(s2);

      this.getAlertsList();
    }
  }

  getTimeStr(date:Date){
      let str = moment(date).format('YYYY-MM-DD HH:mm:ss');
      str = str.replace(' ', 'T');
      str = str + '.0Z';
      return str;
  }

  getAlertsList(){
      this.getCategory();
      this.getPackets();
  }

  getPackets(){
      this.eserv.getAllForPacks({
        createTimeBegin: this.stime,
        createTimeEnd: this.etime,
        pageNum: 1,
        pageSize: 10
      }, res=>{
        if(res.result){
            this.pdatas = res.result;
            for(let k in this.data){
              this.pdatas[k].wid = this.pdatas[k].uid + '_' + k; 
            }
        }else{
            this.pdatas = [];
        }

        new PerfectScrollbar('#packtsScroll', {
          wheelSpeed: 2,
          wheelPropagation: true,
          minScrollbarLength: 20
        });

      });
  }

  getCategory(){
      let finalRes = [];

      this.eserv.getAll({
          beginningDatetime: this.stime,
          endingDatetime: this.etime,
          pageNum: 1,
          pageSize: 100
      }, res=>{
         this.eserv.getCategory(rescate=>{
            for(let ca of rescate){
                let arr = _.filter(res.result, (d)=>{return d.sigName == ca.sigName});
                finalRes.push({
                    name: ca.sigName,
                    value: arr
                });
            }

            this.initChart(finalRes);
        });
    });
  }

  initChart(fdata){
    let lengs = [];
    let adatas = [];

    let inx = 1;
    for(let d of fdata){
        lengs.push(d.name);
        let tds = [];
        for(let t of d.value){
            tds.push([t.timestamp, inx]);
        }
        inx ++;

        adatas.push({
            name: d.name,
            type:'line',
            showSymbol: false,
            stack: '总量',
            areaStyle: {normal: {}},
            lineStyle: {normal: {opacity: 0}},
            data: tds
        });
    }

    let mchart = echarts.init(document.getElementById('chart_history'));
    let option = {
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: lengs
        },
        grid: {
            left: '10',
            right: '10',
            bottom: '10',
            containLabel: true
        },
        xAxis : [
            {
                type : 'time',
                boundaryGap : false
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        color: ['#1AC7E9', '#E2606D', '#FFA535', '#996DDC', '#1AB29B'],
        series : adatas
    };
    mchart.setOption(option);

  }

}
