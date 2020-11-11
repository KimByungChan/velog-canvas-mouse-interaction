import Shape from './Shape';
import Vector from './Vector';
import Circle from './Circle';

export default class App {
  static instance: App;

  width: number = window.innerWidth;
  height: number = window.innerHeight;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  delta: number = 0;
  startTime: number;
  frameRequestHandle: number;
  shapes: Array<Shape> = [];
  mousePosition: Vector = new Vector(0, 0);

  constructor() {
    App.instance = this;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.addEventListener('mousemove', this.onMouseMove);

    this.context = this.canvas.getContext('2d')!;
    this.startTime = Date.now();
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);

    const column = 10;
    const row = 10;

    const columnWidth = this.width / column;
    const columnHeight = this.width / column;

    for (let y = 0; y < row; y++) {
      for (let x = 0; x < column; x++) {
        const position = new Vector(columnWidth * x + columnWidth * 0.5, columnHeight * y + columnHeight * 0.5);
        this.shapes.push(new Circle(position));
      }
    }

    document.body.appendChild(this.canvas);
  }

  onMouseMove = (e: MouseEvent) => {
    this.mousePosition = new Vector(e.clientX, e.clientY);
  }

  frameRequest = () => {
    this.frameRequestHandle = window.requestAnimationFrame(this.frameRequest);
    const currentTime = Date.now();
    this.delta = (currentTime - this.startTime) * 0.001;
    this.startTime = currentTime;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].update(this.delta);
      this.shapes[i].render(this.context);
    }
  }
}

window.addEventListener('load', () => {
  new App();
});
