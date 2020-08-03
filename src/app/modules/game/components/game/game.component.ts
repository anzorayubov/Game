import {Component, OnInit} from '@angular/core';
import {Item} from '../../models/item';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  items: Item[] = [
    {
      value: 2,
      col: 1,
      row: 1
    },
    {
      value: 4,
      col: 3,
      row: 1
    },
    {
      value: 8,
      col: 1,
      row: 3
    },
    {
      value: 16,
      col: 2,
      row: 2
    },
    {
      value: 32,
      col: 1,
      row: 1
    },
    {
      value: 64,
      col: 4,
      row: 1
    },
    {
      value: 128,
      col: 4,
      row: 2
    },
    {
      value: 256,
      col: 4,
      row: 3
    },
    {
      value: 512,
      col: 4,
      row: 4
    },
    {
      value: 1024,
      col: 2,
      row: 1
    },
    {
      value: 2048,
      col: 2,
      row: 4
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  getStyles(item: Item): { [p: string]: string } {
    const top = (item.row * 110 - 100) + 'px';
    const left = (item.col * 110 - 100) + 'px';

    return {
      top,
      left,
      'background-color': 'brown'
    };
  }
}
