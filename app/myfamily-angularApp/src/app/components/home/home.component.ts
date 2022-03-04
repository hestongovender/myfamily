import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Tile } from 'src/app/models/tile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tiles: Tile[] = [
    {link: '/familytree', text: 'Family Tree', cols: 3, rows: 2, color: '#C150CC'},
    {link: '/familycalendar', text: 'Family Calendar', cols: 1, rows: 6, color: '#8E52FF'},
    {link: '/familyhealth', text: 'Family Health', cols: 1, rows: 4, color: '#AD7DFF'},
    {link: '/familywealth', text: 'Family Wealth', cols: 2, rows: 4, color: '#FFF5BD'},
    {link: '/familygames', text: 'Family Games', cols: 4, rows: 2, color: '#CCAD50'},
  ];

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  onClick(link) {
    this.router.navigate([link]);
  }
}
