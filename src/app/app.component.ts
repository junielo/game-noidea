import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameEngine } from './game_util/game.engine';
import { IGameObject } from './dimensions/game-object';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent extends GameEngine implements AfterViewInit {

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  mainPlayer: IGameObject | null = null;
  keyPress: string = '';
  keyDownCnt: number = 0;
  walkSpeed: number = 1;

  ngAfterViewInit(): void {
    this.setupScene();
    this.setCanvasRef(this.canvasRef);
  }

  @HostListener('window:resize')
  onResize() {
    this.scaleCanvas();
  }

  override animate(canvas: CanvasRenderingContext2D): void {
    if (this.keyPress === 'w') {
      this.mainPlayer?.moveUp(this.walkSpeed);
    } else if (this.keyPress === 's') {
      this.mainPlayer?.moveDown(this.walkSpeed);
    } else if (this.keyPress === 'a') {
      this.mainPlayer?.moveLeft(this.walkSpeed);
    } else if (this.keyPress === 'd') {
      this.mainPlayer?.moveRight(this.walkSpeed);
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydownEvent(event: KeyboardEvent) {
    // Handle the key press event here
    this.keyPress = event.key;
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyupEvent(event: KeyboardEvent) {
    // Handle the key press event here
    if (this.keyPress === event.key) this.keyPress = ''
  }

  setupScene() {
    this.mainPlayer = this.gameFactory.createCircle("Player", { x: 0, y: 0 }, 2.1)
    this.mainPlayer.setBGColor('blue');
    this.mainPlayer.children?.push(this.gameFactory.camera);

    this.gameFactory.createCircle("dummy", { x: 30, y: 30 }, 5);
    this.gameFactory.createCircle("dummy", { x: -30, y: -30 }, 5);
    this.gameFactory.createCircle("dummy", { x: -30, y: 30 }, 5);
    this.gameFactory.createCircle("dummy", { x: 30, y: -30 }, 5);
  }
}
