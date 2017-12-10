import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bodyClick(){
    let ps:any = document.querySelectorAll(".dvls-panel");
    console.log(ps);
    for(let i=0;i<ps.length;i++){
      ps[i].style.display = 'none';
    }
  }

}
