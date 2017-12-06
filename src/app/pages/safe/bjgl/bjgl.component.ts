import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bjgl',
  templateUrl: './bjgl.component.html',
  styleUrls: ['./bjgl.component.scss']
})
export class BjglComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    new PerfectScrollbar('#bjglScroll', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
  }

}
