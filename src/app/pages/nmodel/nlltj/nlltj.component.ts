import { Component, OnInit } from '@angular/core';

import echarts from 'echarts/dist/echarts.min';

@Component({
  selector: 'app-nlltj',
  templateUrl: './nlltj.component.html',
  styleUrls: ['./nlltj.component.scss']
})
export class NlltjComponent implements OnInit {
	private chmod:any; 
	
	constructor() { }

	ngOnInit() {
		this.initChart();
	}

	initChart(){
		let dom = document.getElementById("lltjchart");
	  
		this.chmod = echarts.init(dom);
		let option = {
			color: ['#1C6922', '#3850A8', '#ECA50D', '#5C248B', '#800830'],
			series : [
				{
					type: 'pie',
					radius : '100%',
					center: ['50%', '50%'],
					data:[
						{value:335, name:'直接访问'},
						{value:310, name:'邮件营销'},
						{value:234, name:'联盟广告'},
						{value:135, name:'视频广告'},
						{value:1548, name:'搜索引擎'}
					],
					label: {
						normal: {show: false}
					},
					itemStyle: {
						normal: {
							borderWidth: 12
						}
					}
				},
				{
					type: 'pie',
					radius : '97%',
					center: ['50%', '50%'],
					data:[
						{value:335, name:'直接访问', itemStyle: {normal: {color: '#BFDDC2'}}},
						{value:310, name:'邮件营销', itemStyle: {normal: {color: '#A8BEDC'}}},
						{value:234, name:'联盟广告', itemStyle: {normal: {color: '#F8CF6D'}}},
						{value:135, name:'视频广告', itemStyle: {normal: {color: '#9F86DD'}}},
						{value:1548, name:'搜索引擎', itemStyle: {normal: {color: '#E5A5C3'}}}
					],
					label: {
						normal: {show: false}
					}
				}
			]
		};
		this.chmod.setOption(option);
	}

}
