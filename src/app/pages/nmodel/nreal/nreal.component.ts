import { Component, OnInit } from '@angular/core';

import echarts from 'echarts/dist/echarts.min';

@Component({
  selector: 'app-nreal',
  templateUrl: './nreal.component.html',
  styleUrls: ['./nreal.component.scss']
})
export class NrealComponent implements OnInit {
	private chmod:any; 

  	constructor() { }

	ngOnInit() {
		this.initChart();
	}

  	initChart(){
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
					type : 'category',
					boundaryGap : false,
					show: false,
					data : ['周一','周二','周三','周四','周五','周六','周日'],
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
					data:[0, 0, 0, 134, 90, 230, 0]
				},
				{
					type:'line',
					showSymbol: false,
					areaStyle: {normal: {opacity: 0.2}},
					lineStyle: {normal: {width: 3}},
					data:[0, 0, 0, 0, 290, 330, 0]
				}
			]
		};
		this.chmod.setOption(option);

	}

}
