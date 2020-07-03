import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {
  @Input('totalconfirmed')
  totalconfirmed;
  @Input('totalrecovered')
  totalrecovered;
  @Input('totaldeaths')
  totaldeaths;
  @Input('totalactive')
  totalactive;

  constructor() { }

  ngOnInit(): void {
  }

}
