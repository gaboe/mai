class Fifo<T> {
  size: number;
  items: T[];
  constructor(size: number) {
    this.size = size;
    this.items = [];
  }

  pop(item: T) {
    if (this.items.length >= this.size) {
      this.items.shift();
    }
    this.items.push(item);
  }
}

export { Fifo };
