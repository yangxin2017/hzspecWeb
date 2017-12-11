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

	public getAllByMac(config, callback){
		this.rest.all("ext").customGET("v1/devices", config).subscribe(res=>{
			console.log(res);
			callback(res);
		}, ()=>{
			console.log("Internal Server Error!");
		});
	}

	public authDevice(devid:string, authtype:string, callback){
		this.rest.all("squirrel").customPOST({id: devid, status: authtype}, "v1/devices/add_device_authority").subscribe(res=>{
			callback(res);
		})
	}

	public getRes(apMac, callback){
        this.rest.all("ext").customGET("v1/vscan?apMacAddr=" + apMac).subscribe(res=>{
			callback(res);
		}, ()=>{
			console.log("Internal Server Error!");
		});
	}
	
	public getRoutes(email, pagenum, pagesize, callback){
		this.rest.all("squirrel").customGET("v1/devices/aps/overview?emailAddr=" + email + "&pageNum=" + pagenum + "&pageSize=" + pagesize).subscribe(res=>{
			callback(res);
		}, ()=>{
			console.log("Internal Server Error!");
		});
	}

	public UpdateRouterName(user:any, callback){
		let param = {
			"alias": user.alias,
			"emailAddr": user.emailAddr,
			"id": user.id,
			"phoneNumber": user.phoneNumber,
			"userId": user.userId
		};
		this.rest.all("squirrel").customPOST(param, "v1/users/update").subscribe(res=>{
			callback(res);
		});
	}

	public UpdateEquipName(equip:any, callback){
		let param = {
			"alias": equip.alias,
			"apMacAddr": equip.apMacAddr,
			"createTime": equip.createTime,
			"deviceMacAddr": equip.deviceMacAddr,
			"deviceType": equip.deviceType,
			"hostName": equip.hostName,
			"id": equip.id,
			"ip": equip.ip,
			"lastStatusTime": equip.lastStatusTime,
			"os": equip.os,
			"status": equip.status,
			"timeAdded": equip.createTime,
			"updateTime": equip.updateTime,
			"userId": equip.userId,
			"vendor": equip.vendor
		};
		this.rest.all("squirrel").customPOST(param, "v1/devices/update").subscribe(res=>{
			callback(res);
		});
	}

	public getAll(config, callback){
		var ncf = {};
		for(let key in config){
			if(config[key] != ""){
				ncf[key] = config[key];
			}
		}
		this.rest.all("alert").customGET("v1/alerts", ncf).subscribe(res=>{
			callback(res);
			console.log(res);
		}, ()=>{
			console.log("Internal Server Error!");
		});
	}
	public getAllForPacks(config, callback){
		var ncf = {};
		for(let key in config){
			if(config[key] != "" && config[key]){
				ncf[key] = config[key];
			}
		}
		this.rest.all("dolphin").customGET("/v1/packet_summarys", ncf).subscribe(res=>{
			callback(res);
		}, ()=>{
			console.log("Internal Server Error!");
		});
	}

	public getCategory(callback){
		this.rest.all("alert").customGET("v1/alerts/statistics").subscribe(res=>{
			callback(res);
		}, ()=>{
			console.log("Internal Server Error!");
		});
	}
} 