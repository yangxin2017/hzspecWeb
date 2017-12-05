import { Component, OnInit } from '@angular/core';

import echarts from 'echarts/dist/echarts.min';

@Component({
  selector: 'app-nsjtj',
  templateUrl: './nsjtj.component.html',
  styleUrls: ['./nsjtj.component.scss']
})
export class NsjtjComponent implements OnInit {
	private chmod:any;

	constructor() { }

	ngOnInit() {
		this.initChart();
	}

	private initChart(){
		let dom = document.getElementById("sjtjchart");
	  
		this.chmod = echarts.init(dom);
		let option = {
			legend: {
				data:['电脑','移动终端','智能设备','摄像头','其他'],
				right: 0,
				itemWidth: 10,
				itemHeight: 10
			},
			grid: {
				left: '0',
				right: '0',
				bottom: '0',
				top: '20',
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					data : ['上周','本周'],
					axisTick: {show: false},
					splitLine: {lineStyle: {color: '#CBE4F9'}},
					axisLine: {lineStyle: {color: '#2084DA'}},
					axisLabel: {color: '#333'}
				}
			],
			yAxis : [
				{
					type : 'value',
					axisTick: {show: false},
					splitLine: {lineStyle: {color: '#CBE4F9'}},
					axisLine: {lineStyle: {color: '#2084DA'}},
					axisLabel: {color: '#333'}
				}
			],
			colors: ['#76C1F0', '#FCBD62', '#CDE640', '#EE62A4', '#781798'],
			series : [
				{
					name:'电脑',
					type:'bar',
					data:[320, 332]
				},
				{
					name:'移动终端',
					type:'bar',
					data:[120, 132]
				},
				{
					name:'智能设备',
					type:'bar',
					data:[220, 182]
				},
				{
					name:'摄像头',
					type:'bar',
					data:[150, 232]
				},
				{
					name:'其他',
					type:'bar',
					data:[862, 1018]
				}
			]
		};
		this.chmod.setOption(option);
	}

}
