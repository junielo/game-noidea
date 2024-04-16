import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameEngine } from './game_util/game.engine';
import { IGameObject } from './dimensions/game-object';
import { PlayerMovements } from './animation_controller/player-movements';
import { Circle } from './game_object/circle';
import { CopyPositionConstraint } from './constraints/copy-position';
import { DelayCopyPosition } from './animation_controller/delay-copyposition';
import { Time } from './game_util/time-util';
import { PhysicsMovement } from './animation_controller/physics-movement';
import { BasicBoxCollision } from './game_collisions/basic-box-collision';

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

  fpsCount = Time.fpsCount;

  ngAfterViewInit(): void {
    Time.setPreviousTime(performance.now());
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

  override setupScene() {
    Time.isViewTime = true;
    this.mainPlayer = this.gameFactory.createCircle("Player", { x: 0, y: 0 }, 2.1);
    this.mainPlayer.setBGColor('blue');
    
    this.gameFactory.addGameControls(new PhysicsMovement(this.mainPlayer, 30, 10, 60));
    this.gameFactory.addGameControls(
      this.gameFactory.addGameCollision(new BasicBoxCollision(this.mainPlayer))
    )

    this.gameFactory.addGameControls(new CopyPositionConstraint(this.mainPlayer, this.gameFactory.camera));
    this.gameFactory.addGameControls(new DelayCopyPosition(this.gameFactory.camera, 1500));

    this.gameFactory.addGameControls(
      this.gameFactory.addGameCollision(
        new BasicBoxCollision(this.gameFactory.createRectangle("dummy1", { x: 20, y: 20 }, 6, 6)))
    )
    this.gameFactory.addGameControls(
      this.gameFactory.addGameCollision(
        new BasicBoxCollision(this.gameFactory.createRectangle("dummy2", { x: -20, y: -20 }, 6, 6)))
    )
    this.gameFactory.addGameControls(
      this.gameFactory.addGameCollision(
        new BasicBoxCollision(this.gameFactory.createRectangle("dummy3", { x: -20, y: 20 }, 6, 6)))
    )
    this.gameFactory.addGameControls(
      this.gameFactory.addGameCollision(
        new BasicBoxCollision(this.gameFactory.createRectangle("dummy4", { x: 20, y: -20 }, 6, 6)))
    )
  }
}
