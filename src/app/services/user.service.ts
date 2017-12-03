import { Injectable } from '@angular/core';

import { Restangular } from 'ngx-restangular';

@Injectable()
export class UserService {
    constructor(
        private rest:Restangular
    ){}

    public UserLogin(config, callback){
        this.rest.all("gateway").customPOST(undefined, "usercenter/usercenter/v1/users/login", {userId: config.email, password: config.password}).subscribe(res=>{
            callback(res);
        }, (res)=>{
            callback('error');
		});
    }
} 