import { Component, OnInit } from '@angular/core';

import echarts from 'echarts/dist/echarts.min';
import { SimpleGlobal } from 'ng2-simple-global';
import { EquipService } from '../../../services/equip.service';

@Component({
  selector: 'app-e2',
  templateUrl: './e2.component.html',
  styleUrls: ['./e2.component.scss'],
  providers: [EquipService]
})
export class E2Component implements OnInit {
	private chmod:any;

	public netInfor = {
        dr: [0, 'KB'],
        qr: [0, 'KB'],
        sz: [0, 'KB'],
        sy: [0, 'KB']
    };

	constructor(
		private eserv:EquipService,
		private sg:SimpleGlobal
	) { }

	ngOnInit() {
		this.initData();
	}

	getllNumber(num){
        let dw = 'B';
        if(num / 1024 > 1){
            dw = 'KB';
            num = num / 1024;
            if(num / 1024 > 1){
                dw = 'MB';
                num = num / 1024;
                if(num / 1024 > 1){
                    dw = 'GB';
                    num = num / 1024;
                }
            }
        }
        num = num.toFixed(2);
        return [num, dw];
    }

	initData(){
		let apmac = this.sg['apMac'];

		this.eserv.getNetCount(apmac, res=>{
            if(res.length >= 2){
                let d1 = res[0].value;
                let d7 = res[1].value;

                this.netInfor.dr = this.getllNumber(d1);
                this.netInfor.qr = this.getllNumber(d7);

				this.initChart();
            }
        });
	}

	private initChart(){
		var value = [this.netInfor.dr[0], this.netInfor.qr[0]];
		var dw = this.netInfor.dr[1];

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
