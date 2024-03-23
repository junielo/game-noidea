import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameEngine } from './game_util/game.engine';
import { IGameObject } from './dimensions/game-object';
import { CircleMovements } from './animation_controller/circle-movements';
import { Circle } from './game_object/circle';
import { CopyPositionConstraint } from './constraints/copy-position';

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

  @HostListener('document:keydown', ['$event'])
  handleKeydownEvent(event: KeyboardEvent) {
    this.onKeydown(event);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyupEvent(event: KeyboardEvent) {
    this.onKeyup(event);
  }

  setupScene() {
    this.mainPlayer = this.gameFactory.createCircle("Player", { x: 0, y: 0 }, 2.1)
    this.gameFactory.addAnimControls(new CircleMovements(this.mainPlayer as Circle));
    this.mainPlayer.setBGColor('blue');

    this.gameFactory.addAnimControls(new CopyPositionConstraint(this.mainPlayer, this.gameFactory.camera));

    this.gameFactory.createCircle("dummy", { x: 30, y: 30 }, 5);
    this.gameFactory.createCircle("dummy", { x: -30, y: -30 }, 5);
    this.gameFactory.createCircle("dummy", { x: -30, y: 30 }, 5);
    this.gameFactory.createCircle("dummy", { x: 30, y: -30 }, 5);
  }
}
