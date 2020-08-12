import {Injectable} from '@angular/core';
import {Item} from "../models/item";

@Injectable({
  providedIn: 'root'
})

export class GameService {

  private size = 4; // 4x4
  private availableCells: number[] = [];

  private get emptyCells() {
    const notEmptyCells = this.notEmptyCells
    return this.availableCells.filter(position => !notEmptyCells.includes(position))
  }

  private get notEmptyCells() {
    return this.items.map(item => item.row * 10 + item.col);
  }

  items: Item[] = [
    // {
    //   value: 2,
    //   col: 1,
    //   row: 1
    // },
    // {
    //   value: 4,
    //   col: 3,
    //   row: 1
    // },
    // {
    //   value: 8,
    //   col: 1,
    //   row: 3
    // },
    // {
    //   value: 16,
    //   col: 2,
    //   row: 2
    // },
    // {
    //   value: 32,
    //   col: 1,
    //   row: 1
    // },
    // {
    //   value: 64,
    //   col: 4,
    //   row: 1
    // },
    // {
    //   value: 128,
    //   col: 4,
    //   row: 2
    // },
    // {
    //   value: 256,
    //   col: 4,
    //   row: 3
    // },
    // {
    //   value: 512,
    //   col: 4,
    //   row: 4
    // },
    // {
    //   value: 1024,
    //   col: 2,
    //   row: 1
    // },
    // {
    //   value: 2048,
    //   col: 2,
    //   row: 4
    // }
  ];

  constructor() {

    this.generateAvailableCells()
    this.generateItem()
  }

  left() {
    this.move()
  }

  up() {
    this.move()
  }

  right() {
    this.move(true)
  }

  down() {
    this.move()
  }

  private move(reverse = false) {
    this.clearDeletedItems()

    // left
    const mergedItems: Item[] = [];

    for (let row = 1; row <= this.size; row++) {
      const rowItems = this.items
        .filter(item => item.row === row)
        .sort((a, b) => a.col - b.col)

      if (reverse) {
        rowItems.reverse()
      }

      let col = reverse ? this.size : 1
      let merged = false
      let prevItem = null

      for (let i = 0; i < rowItems.length; i++) {
        const item = rowItems[i]
        if (prevItem) {
          if (merged) {
            merged = false
          } else if (item.value === prevItem.value) {
            reverse ? col++ : col--
            prevItem.isOnDelete = true
            item.isOnDelete = true
            mergedItems.push(({
              value: item.value * 2,
              col,
              row
            }))

            merged = true
          }

        }

        item.col = col
        reverse ? col-- : col++
        prevItem = item

      }

    }

    this.items = [...this.items, ...mergedItems];


    this.generateItem()
  }

  private clearDeletedItems() {
    this.items = this.items.filter(item => !item.isOnDelete)
  }

  private generateItem(length = 2) {
    const positions = this.emptyCells
      .sort(() => Math.random() - 0.5)
      .slice(0, length)

    this.items = [
      ...this.items,
      ...positions.map<Item>(position => ({
        value: 2,
        col: position % 10,
        row: (position - position % 10) / 10
      }))
    ];

  }

  private generateAvailableCells() {
    for (let row = 1; row <= this.size; row++) {
      for (let col = 1; col <= this.size; col++) {
        this.availableCells.push(row * 10 + col)
      }
    }
  }

}
