import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-serv',
  templateUrl: './serv.component.html',
  styleUrls: ['./serv.component.scss']
})
export class ServComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    new PerfectScrollbar('#servScroll', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
    new PerfectScrollbar('#servnetScroll', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
  }

}
