import { Component, OnInit } from '@angular/core';

import echarts from 'echarts/dist/echarts.min';

@Component({
  selector: 'app-nlbtj',
  templateUrl: './nlbtj.component.html',
  styleUrls: ['./nlbtj.component.scss']
})
export class NlbtjComponent implements OnInit {
	private chmod:any;

	constructor() { }

	ngOnInit() {
		this.initChart();
	}

	private initChart(){
		let dom = document.getElementById("lbtjchart");
	  
		this.chmod = echarts.init(dom);
		let option = {
			color: ['#76C1F0', '#FCBD62', '#CDE640', '#B4AFB3', '#EE62A4', '#781798'],
			legend: {
				orient: 'vertical',
				align: 'left',
				right: 40,
				itemWidth: 7,
				itemHeight: 7,
				borderRadius: 7,
				data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
			},
			series: [
				{
					name:'访问来源',
					type:'pie',
					radius: ['50%', '100%'],
					avoidLabelOverlap: false,
					label: {
						normal: {
							show: false,
							position: 'center'
						},
						emphasis: {
							show: false,
							textStyle: {
								fontSize: '30',
								fontWeight: 'bold'
							}
						}
					},
					labelLine: {
						normal: {
							show: false
						}
					},
					data:[
						{value:335, name:'直接访问'},
						{value:310, name:'邮件营销'},
						{value:234, name:'联盟广告'},
						{value:135, name:'视频广告'},
						{value:1548, name:'搜索引擎'}
					]
				}
			]
		};
		this.chmod.setOption(option);
	}

}
