import Shape from './Shape';
import Vector from './Vector';
import App from './index';

const PI2 = Math.PI * 2;

export default class Circle extends Shape {
  endRadius: number;
  startRadius: number;
  color: string;

  constructor(position: Vector) {
    super(position);

    this.startRadius = 10;
    this.endRadius = 10;
    this.color = 'rgba(0, 0, 0)';
  }

  update(delta: number) {
    const distance = Math.max(App.instance.mousePosition.distance(this.position), 10);
    this.endRadius = 1000 / distance;
    this.startRadius = this.startRadius - (this.startRadius - this.endRadius) * 0.1;
  }

  render(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.position.x, this.position.y, this.startRadius, 0, PI2);
    context.fill();
  }
}
