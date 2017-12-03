import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';

import { RestangularModule } from 'ngx-restangular'
import { SimpleGlobal } from 'ng2-simple-global';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' },
  { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule' },
  { path: 'safe', loadChildren: 'app/pages/safe/safe.module#SafeModule' },
];

export function RestangularConfigFactory (RestangularProvider) {
  RestangularProvider.setBaseUrl('');
  
  RestangularProvider.addErrorInterceptor((response, subject, responseHandler, router) => {
    if(response.status == 401){
      if(response.request.url.indexOf('login') < 0){
        window.location.href = '#/login';
      }
    }
  });

  RestangularProvider.addResponseInterceptor((data, operation, what, url, response)=> {
       if(data && data.token && data.token != ""){
         RestangularProvider.setDefaultHeaders({'Authorization': data.token, 'Accept': 'application/json;charset=UTF-8'});

         var exp = new Date();
         exp.setTime(exp.getTime() + 30 * 60 * 1000);
         document.cookie = 'token=' + data.token + ';expires=' + exp.toUTCString();

       }
       return data;
  });

  var getSession = function(name){
    let bearerToken = '';
    if(document.cookie.length > 0){
      let sindex = document.cookie.indexOf(name + "=");
      if(sindex > -1){
        sindex = sindex + 6;
        let eindex = document.cookie.indexOf(";" , sindex);
        if(eindex == -1) eindex = document.cookie.length;

        bearerToken = document.cookie.substring(sindex, eindex);
      }
    }
    return bearerToken;
  }

  RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
    let bearerToken = getSession('token');
      
    return {
      headers: Object.assign({}, headers, {Authorization: bearerToken})
    };
  });

}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  providers: [SimpleGlobal, {
    provide: LocationStrategy, useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
