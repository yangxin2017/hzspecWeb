import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimpleGlobal } from 'ng2-simple-global';

import SockJS from 'sockjs-client/dist/sockjs.min';
import Stomp from 'stompjs/lib/stomp.min';

@Component({
  selector: 'app-e1',
  templateUrl: './e1.component.html',
  styleUrls: ['./e1.component.scss']
})
export class E1Component implements OnInit, OnDestroy {
	public RouterStatus:any = {
      online: 0,
      offlineSpan: 0,
      offlineMinute: 0,
      offTime: ''
  };
  public currentLLNumber = '--';
  public stompClient:any = null;


  constructor(
		private sg:SimpleGlobal
	) {
		let apMac:string = this.sg['apMac'];

		this.initWebSocket(apMac);

	}

  ngOnInit() {
  }
	ngOnDestroy(){
    console.log('close');
    this.disconnect();
  }
  disconnect() {
      if (this.stompClient != null) {
          this.stompClient.disconnect();
      }
  }

	initWebSocket(apmac){
      console.log('open');

      var socket = new SockJS('http://60.205.212.99/dolphin/initWebSocket/');
      this.stompClient = Stomp.Stomp.over(socket);
      this.stompClient.connect({}, (frame) => {
          
          this.stompClient.send("/ws/ap/status/" + apmac, {}, JSON.stringify({"hello":"world"}));
          this.stompClient.subscribe('/wsx/ap/status/' + apmac, (response) => {
              let arr = response.body.split(',');
              console.log(response.body);
              if(arr.length >= 2){
                  this.RouterStatus.online = arr[0];
                  this.RouterStatus.offlineMinute = ((arr[1] / 60) % 60).toFixed(0);
                  this.RouterStatus.offlineSpan = (arr[1] / 60 / 60).toFixed(0);
                  this.RouterStatus.offTime = arr[2];
              }
          });
          //实时流量
          this.stompClient.send("/ws/ap/rate/" + apmac, {}, JSON.stringify({"hello":"world"}));
          this.stompClient.subscribe('/wsx/ap/rate/' + apmac, (response) => {
              console.log(response.body);
              let val = parseInt(response.body) + '';
              this.currentLLNumber = val;
          });
      });
  }

}
