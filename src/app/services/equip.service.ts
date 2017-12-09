import { Injectable } from '@angular/core';

import { Restangular } from 'ngx-restangular';

@Injectable()
export class EquipService {
    constructor(
        private rest:Restangular
    ){}

    public getAllData(apMac:string, callback){
		let param = {
			apMacAddr: apMac
		};
		this.rest.all("squirrel").customGET("v1/devices/ap/overview", param).subscribe(res=>{
			callback(res);
		});
	}

    public getAllRouter(userId, callback){
		this.rest.all("squirrel").customGET("v1/users/fetch_user_by_id", {userId: userId}).subscribe(res=>{
			callback(res);
		}, ()=>{
			console.log("Internal Server Error!");
		});
	}

    public GetAppLLTop10(mac:string, callback){
		this.rest.all("dolphin").customGET("v1/packet_summarys/mac/top?apMacAddr=" + mac + "&count=10").subscribe(res=>{
			callback(res);
		});
	}
	public GetEquLLTop10(mac:string, callback){
		this.rest.all("dolphin").customGET("v1/packet_summarys/admin/ip/top?apMacAddr=" + mac + "&count=10").subscribe(res=>{
			callback(res);
		});
	}

    public getCategoryByAp(apmac, callback){
		this.rest.all("alert").customGET("v1/alerts/ap/statistics?apMacAddr=" + apmac).subscribe(res=>{
			callback(res);
		}, ()=>{
			console.log("Internal Server Error!");
		});
	}

    public get2_2AlertData(mac:string, interval:string, callback){
        let param = {
            apMacAddr: mac,
            "interval": interval
        };
        this.rest.all("alert").customPOST(param, "v1/alerts/statistic/2-2").subscribe(res=>{
			callback(res);
		}, ()=>{
			console.log("Internal Server Error!");
		});
    }

	public getEquipCount(apMac:string, callback){
        this.rest.all("squirrel").customGET("v1/devices/overview?apMacAddress=" + apMac).subscribe(res=>{
			callback(res);
		}, ()=>{
			console.log("Internal Server Error!");
		});
    }

	public getTwoweekAlert(mac:string, callback){
        let param = {
            apMacAddr: mac
        };
        this.rest.all("alert").customPOST(null, "v1/alerts/device/2week/total?apMacAddr=" + mac).subscribe(res=>{
			callback(res);
		}, ()=>{
			console.log("Internal Server Error!");
		});
    }

	public getNetCount(mac:string, callback){
        this.rest.all("dolphin").customGET("v1/packet_summarys/total1?macAddr=" + mac).subscribe(res=>{
			callback(res);
		}, ()=>{
			console.log("Internal Server Error!");
		});
    }
} 