import { Component, OnInit } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';

import { EquipService } from '../../../services/equip.service';
import * as _ from 'lodash';

import echarts from 'echarts/dist/echarts.min';

@Component({
  selector: 'app-nsjtj',
  templateUrl: './nsjtj.component.html',
  styleUrls: ['./nsjtj.component.scss'],
  providers: [EquipService]
})
export class NsjtjComponent implements OnInit {
	private chmod:any;
	public interval:string = 'WEEK';

	constructor(
		private sg:SimpleGlobal,
		private eserv:EquipService
	) { }

	ngOnInit() {
		let mac = this.sg['apMac'];
		this.initData(mac);
	}

	changeSel(interval){
		this.interval = interval;
		let mac = this.sg['apMac'];
		this.initData(mac);
	}

	inArray(key, arr){
		let has = false;
		for(let k of arr){
			if(key == k){
				has = true;
				break;
			}
		}
		return has;
	}

	initData(mac){
        let se = [];
        let xz = [];

        let d1 = [];
        let d2 = [];
        this.eserv.get2_2AlertData(mac, this.interval, res=>{

            for(let val of res){
                
                if(val.k == 'pre'){
                    
                    let dat = [];
                    val.v.forEach(ele=>{
                        if(!this.inArray(ele.k, xz)){
                            xz.push(ele.k);
                        }
                        dat.push(ele.v);
                    });
                    d1 = dat;
                }else{
                    let dat = [];
                    val.v.forEach(ele=>{
                        if(!this.inArray(ele.k, xz)){
                            xz.push(ele.k);
                        }
                        dat.push(ele.v);
                    });
                    d2 = dat;
                }
            }
            for(let k in xz){
                se.push({
                    name: xz[k],
                    type: 'bar',
                    data: [d1[k], d2[k]],
                    barWidth: 20
                });
            }
            let realXz = ['昨日', '本日'];
            if(this.interval == 'WEEK'){
                realXz = ['上周', '本周'];
            }else if(this.interval == 'MONTH'){
                realXz = ['上月', '本月'];
            }
            this.initChart(xz, se, realXz);
        });
	}

	private initChart(xz, se, relXz){
		let dom = document.getElementById("sjtjchart");
	  
		this.chmod = echarts.init(dom);
		let option = {
			legend: {
				data:xz,
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
					data : relXz,
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
			series : se
		};
		this.chmod.setOption(option);
	}

}
