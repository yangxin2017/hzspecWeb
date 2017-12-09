import { Component, OnInit } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';

import echarts from 'echarts/dist/echarts.min';
import { EquipService } from '../../../services/equip.service';

@Component({
  selector: 'app-e4',
  templateUrl: './e4.component.html',
  styleUrls: ['./e4.component.scss'],
  providers: [EquipService]
})
export class E4Component implements OnInit {
	private chmod:any;
	public interval:string = 'WEEK';

	public alertCounts = {
        sz: 0,
        bz: 0
    };

	constructor(
		private eserv:EquipService,
		private sg:SimpleGlobal
	) { }

	ngOnInit() {
		let apmac = this.sg['apMac'];
		this.eserv.getTwoweekAlert(apmac, res=>{
            if(res.length == 2){
                if(res[0].k == 'pre'){
                    this.alertCounts.sz = res[0].v;
                    this.alertCounts.bz = res[1].v;
                }
                if(res[0].k == 'cur'){
                    this.alertCounts.bz = res[0].v;
                    this.alertCounts.sz = res[1].v;
                }
            }
        });
		this.initChart();
	}

	private initChart(){
		var value = [this.alertCounts.sz, this.alertCounts.bz];
		var dw = '';

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

		let dom = document.getElementById("e4chart");
	  
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
					data: value
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
								formatter: (param, t, c)=>{
									if(param.value == 0){
										return '';
									}
									return param.value + dw;
								},
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
