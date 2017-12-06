import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ldsm',
  templateUrl: './ldsm.component.html',
  styleUrls: ['./ldsm.component.scss']
})
export class LdsmComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    new PerfectScrollbar('#ldsmScroll', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
  }

}
