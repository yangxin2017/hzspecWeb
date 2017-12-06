import { Component, OnInit } from '@angular/core';

import echarts from 'echarts/dist/echarts.min';

@Component({
  selector: 'app-e2',
  templateUrl: './e2.component.html',
  styleUrls: ['./e2.component.scss']
})
export class E2Component implements OnInit {
	private chmod:any;

	constructor() { }

	ngOnInit() {
		this.initChart();
	}

	private initChart(){
		var value = [100, 55];
		var dw = 'B';

		let c11 = 'rgba(166, 217, 10, 1)';
		let c1 = new echarts.graphic.LinearGradient(
			0, 0, 0, 1,
			[
				{offset: 0, color: 'rgba(166, 217, 10, 0.3)'},
				{offset: 0.5, color: 'rgba(166, 217, 10, 0.1)'},
				{offset: 1, color: 'rgba(166, 217, 10, 0.0)'}
			]
		);
		let c22 = 'rgba(217, 103, 10, 1)';
		let c2 = new echarts.graphic.LinearGradient(
			0, 0, 0, 1,
			[
				{offset: 0, color: 'rgba(217, 103, 10, 0.3)'},
				{offset: 0.5, color: 'rgba(217, 103, 10, 0.1)'},
				{offset: 1, color: 'rgba(217, 103, 10, 0.0)'}
			]
		);
		let c33 = 'rgba(217, 10, 44, 1)';
		let c3 = new echarts.graphic.LinearGradient(
			0, 0, 0, 1,
			[
				{offset: 0, color: 'rgba(217, 10, 44, 0.3)'},
				{offset: 0.5, color: 'rgba(217, 10, 44, 0.1)'},
				{offset: 1, color: 'rgba(217, 10, 44, 0.0)'}
			]
		);

		let dom = document.getElementById("e2chart");
	  
		this.chmod = echarts.init(dom);
		let option = {
			grid: {
				left: '0',
				right: '0',
				bottom: '0',
				top: '5',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					show: true,
					axisLabel: {textStyle: {color: '#fff', fontSize: 14}},
					axisTick:  {show:false},
					splitLine:  {lineStyle: {color: '#7DAFDB'}, show:true},
					axisLine: {lineStyle: {color: '#7DAFDB'}},
					data: ['上周', '本周']
				}
			],
			yAxis: [
				{
					type: 'value',
					show: true,
					axisLabel: {show:false},
					axisTick:  {show:false},
					splitLine:  {show:false},
					axisLine: {lineStyle: {color: '#7DAFDB'}}
				}
			],
			series: [
				{
					type: 'bar',
					stack: '月份',
					barGap: 0.1,
					barCategoryGap: 0.01,
					itemStyle: {
						normal: {
							color: function(params) {
								// build a color map as your need.
								if(params.value < 30){
									return c1;
								}else if(params.value < 60){
									return c2;
								}else{
									return c3;
								}
							},
							label: {
								show: true,
								position: 'insideTop',
								formatter: '{c}' + dw,
								color: '#AFC6DA',
								fontSize: 40
							}
						}
					},
					data: value
				},
				{
					type: 'bar',
					stack: '月份',
					silent: true,
					data: [0, 0],
					itemStyle: {
						normal: {
							color: function(param){
								let v = param.dataIndex;
								if(value[v] < 30){
									return c11;
								}else if(value[v] < 60){
									return c22;
								}else{
									return c33;
								}
							},
							shadowColor: 'rgba(0, 0, 0, 0.3)',
							shadowBlur: 10,
							shadowOffsetX: -4
						}
					},
					barMinHeight: 4
				}
			]
		};
		this.chmod.setOption(option);
	}

}
