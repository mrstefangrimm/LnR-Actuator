import { Component, Output, EventEmitter  } from '@angular/core'
import { NgIf } from '@angular/common'

@Component({
  selector: 'lib-overlaybutton',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="menu">
      <span class="menu-circle"></span>
      <div class="menu-button"
           (click)="onButtonClick()">
        <span class="menu-icon"
              *ngIf="!open">
          <span class="menu-line"></span>
          <span class="menu-line menu-line-2"></span>
          <span class="menu-line menu-line-3"></span>
        </span>
        <span class="menu-icon"
              *ngIf="open">
          <span class="menu-line menu-open-1"></span>
          <span class="menu-line menu-line-2 menu-open-2"></span>
          <span class="menu-line menu-line-3 menu-open-3"></span>
        </span>
      </div>
    </div>
  `,
  styles: `
    /* menu has been copied from https://codepad.co/snippet/overlay-menu */
    .menu {
      position: absolute;
      top: 20px;
      left: 20px;
      height: 23px;
      width: 23px;
    }
    .menu-circle {
      background-color: #fff;
      width: 100%;
      height: 100%;
      position: absolute;
      border-radius: 50%;
      transform: scale(1);
      z-index: 1000;
      transition: transform 0.3s ease-in-out;
    }
    .menu-button {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1002;
    }
    .menu-icon {
      position: absolute;
      width: 20px;
      height: 14px;
      margin: auto;
      left: 0;
      top: 0;
      right: 0;
      bottom: 1px;
    }
    .menu-line {
      background-color: #333;
      height: 2px;
      width: 100%;
      border-radius: 2px;
      position: absolute;
      left: 0;
      transition: all 0.25s ease-in-out;
    }
    .menu-line-2 {
      top: 0;
      bottom: 0;
      margin: auto;
    }
    .menu-line-3 {
      bottom: 0;
    }
    .menu-open-1 {
      transform: translateX(-7px) translateY(6px) rotate(-90deg);
    }
    .menu-open-2 {
      transform: rotate(-90deg);
    }
    .menu-open-3 {
      transform: translateX(+7px) translateY(-6px) rotate(-90deg);
    }
  `,
  })
export class OverlaybuttonComponent {

  @Output() notify: EventEmitter<OverlaybuttonClickArgs> = new EventEmitter<OverlaybuttonClickArgs>();

  open: boolean = false

  onButtonClick() : void {
    this.open = !this.open

    this.notify.emit(new OverlaybuttonClickArgs(this.open))
  }
}

export class OverlaybuttonClickArgs {
  constructor(public open: boolean) {    
  }
}
