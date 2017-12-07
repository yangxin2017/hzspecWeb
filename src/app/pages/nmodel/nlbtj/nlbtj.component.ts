import { Component, OnInit } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';

import { EquipService } from '../../../services/equip.service';

import echarts from 'echarts/dist/echarts.min';

@Component({
  selector: 'app-nlbtj',
  templateUrl: './nlbtj.component.html',
  styleUrls: ['./nlbtj.component.scss'],
  providers: [EquipService]
})
export class NlbtjComponent implements OnInit {
	private chmod:any;

	constructor(
		private sg:SimpleGlobal,
		private dserv:EquipService
	) { }

	ngOnInit() {
		let apmac = this.sg['apMac'];
		this.dserv.getCategoryByAp(apmac, res=>{
			let datas = [];
            res.forEach(ele=>{
                datas.push({
                    name: ele.sigName,
                    value: ele.amount
                })
            });
            this.initChart(datas);
        });
	}

	private initChart(datas){
		let lengs = [];
        datas.forEach((ele)=>{
            lengs.push(ele.name);
        });

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
				data: lengs
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
					data: datas
				}
			]
		};
		this.chmod.setOption(option);
	}

}
