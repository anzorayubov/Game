export interface Item {
  value: number;
  row: number;
  col: number;
  // must be deleted on next tick if true
  isOnDelete?: boolean;
}
