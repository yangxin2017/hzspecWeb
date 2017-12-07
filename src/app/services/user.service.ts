import { Injectable } from '@angular/core';

import { Restangular } from 'ngx-restangular';

@Injectable()
export class UserService {
    constructor(
        private rest:Restangular
    ){}

    public UserLogin(config, callback){
        var param = {userId: config.email, password: config.password}
        this.rest.all("usercenter").customPOST(undefined, "v1/users/login", param).subscribe(res=>{
            callback(res);
        }, (res)=>{
            callback('error');
		});
    }
} 