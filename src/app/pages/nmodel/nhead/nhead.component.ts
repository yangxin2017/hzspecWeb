import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nhead',
  templateUrl: './nhead.component.html',
  styleUrls: ['./nhead.component.scss']
})
export class NheadComponent implements OnInit {
  private currentUrl:string = 'dashboard';

  constructor(
    private router:Router
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
  }

  ngOnInit() {
  }

}
