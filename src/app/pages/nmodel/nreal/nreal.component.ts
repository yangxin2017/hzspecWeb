import { Component, OnInit, OnDestroy } from '@angular/core';

import echarts from 'echarts/dist/echarts.min';

import SockJS from 'sockjs-client/dist/sockjs.min';
import Stomp from 'stompjs/lib/stomp.min';
import * as moment from 'moment';

@Component({
  selector: 'app-nreal',
  templateUrl: './nreal.component.html',
  styleUrls: ['./nreal.component.scss']
})
export class NrealComponent implements OnInit {
	private chmod:any; 
	
	public stompClient:any = null;
	public socketInArr = [];
	public socketOutArr = [];

	public currentIn = '--';
	public currentOut = '--';

  	constructor() { }

	ngOnInit() {
		console.log('open 2');
		this.initWebSocketForLL('-');
	}
	ngOnDestroy(){
		console.log('close 2');
		this.disconnect();
	}
	disconnect() {
		if (this.stompClient != null) {
			this.stompClient.disconnect();
		}
	}

	initWebSocketForLL(apmac){
		let st:string = moment().format('YYYY-MM-DD HH:mm:ss');
		let et:string = moment().add(-30, 'minutes').format('YYYY-MM-DD HH:mm:ss');

		let paramIn:any = {
			"ioFlag": "",
			"createTimeBegin": st,
			"createTimeEnd": et
		};
		let paramOut:any = {
			"ioFlag": "",
			"createTimeBegin": st,
			"createTimeEnd": et
		};
		let url1 = "/ws/ap/ts/";
		let url2 = "/wsx/ap/ts/";

		paramIn = {
			"ioFlag": "IN",
			"createTimeBegin": st,
			"createTimeEnd": et
		};
		paramOut = {
			"ioFlag": "OUT",
			"createTimeBegin": st,
			"createTimeEnd": et
		};

		url1 = "/ws/ap/ts/" + apmac;
		url2 = "/wsx/ap/ts/" + apmac;

		this.initSocketDetail(apmac, st, et, url1, url2, paramIn, paramOut);
	}

	initSocketDetail(apmac, st, et, url1, url2, pi, po){
		var socket = new SockJS('http://60.205.212.99/dolphin/initWebSocket/');
		this.stompClient = Stomp.Stomp.over(socket);
		this.stompClient.connect({}, (frame) => {
			//IN
			this.stompClient.send(url1 + "IN", {}, JSON.stringify(pi));
			this.stompClient.subscribe(url2 + "IN", (response) => {
				let json = JSON.parse(response.body);
				if(json){
					json.data.forEach(ele1=>{
						this.socketInArr.push([ele1.time, ele1.value]);
						this.currentIn = ele1.value;
					});

					if(!this.chmod){
						this.initChart(this.socketInArr, this.socketOutArr);
					}else{
						this.chmod.setOption({
							series: [{
								data: this.socketInArr
							},
							{
								data: this.socketOutArr
							}]
						});
					}
				}
			});
			//OUT
			this.stompClient.send(url1 + "OUT", {}, JSON.stringify(po));
			this.stompClient.subscribe(url2 + 'OUT', (response) => {
				let json = JSON.parse(response.body);
				if(json){
					json.data.forEach(ele1=>{
						this.socketOutArr.push([ele1.time, ele1.value]);
						this.currentOut = ele1.value;
					});

					if(!this.chmod){
						this.initChart(this.socketInArr, this.socketOutArr);
					}else{
						this.chmod.setOption({
							series: [{
								data: this.socketInArr
							},
							{
								data: this.socketOutArr
							}]
						});
					}
				}
			});

		});
	}

  	initChart(dIn, dOut){
	  let dom = document.getElementById("realchart");
	  
	  this.chmod = echarts.init(dom);

	  let option = {
			grid: {
				left: '0',
				right: '0',
				bottom: '0',
				top: '0',
				containLabel: true
			},
			xAxis : [
				{
					type : 'time',
					boundaryGap : false,
					show: false,
					axisTick: {show:false}
				}
			],
			yAxis : [
				{
					type : 'value',
					axisLabel: {
						inside: true, verticalAlign: "top", fontSize: 12, color: '#b7b7b7',
						formatter: (val, inx)=>{
							if(val != 0){
								return val + "KB/S";
							}
							return "";
						}
					},
					splitLine: {lineStyle: {color: '#d3d3d3'}},
					axisLine: {show:false},
					axisTick: {show:false}
				}
			],
			color: ["#22780F", "#1E5CAF"],
			series : [
				{
					type:'line',
					showSymbol: false,
					areaStyle: {normal: {opacity: 0.2}},
					lineStyle: {normal: {width: 3}},
					data: dIn
				},
				{
					type:'line',
					showSymbol: false,
					areaStyle: {normal: {opacity: 0.2}},
					lineStyle: {normal: {width: 3}},
					data: dOut
				}
			]
		};
		this.chmod.setOption(option);

	}

}
