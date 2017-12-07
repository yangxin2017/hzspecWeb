import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleGlobal } from 'ng2-simple-global';

@Component({
  selector: 'app-nhead',
  templateUrl: './nhead.component.html',
  styleUrls: ['./nhead.component.scss']
})
export class NheadComponent implements OnInit {
  private currentUrl:string = 'dashboard';

  constructor(
    private router:Router,
    private sg:SimpleGlobal
  ) { 
    let url = router.url;
    if(url.indexOf('dashboard') > -1){
      this.currentUrl = 'dashboard';
    }else if(url.indexOf('equip') > -1){
      this.currentUrl = 'equip';
    }else if(url.indexOf('safe') > -1){
      this.currentUrl = 'safe';
    }else if(url.indexOf('setting') > -1){
      this.currentUrl = 'setting';
    }

    let userId = this.getSession('userId');
    let apMac = this.getSession('apMac');

    if(!userId || !apMac){
      this.router.navigate(['/login/']);
    }else{
      this.sg['userId'] = userId;
      this.sg['apMac'] = apMac;
    }
  }

  ngOnInit() {
  }

  getSession (name){
      let bearerToken = '';
      if(document.cookie.length > 0){
          let sindex = document.cookie.indexOf(name + "=");
          if(sindex > -1){
              sindex = sindex + name.length + 1;
              let eindex = document.cookie.indexOf(";" , sindex);
              if(eindex == -1) eindex = document.cookie.length;

              bearerToken = document.cookie.substring(sindex, eindex);
          }
      }
      return bearerToken;
  }

}
