import { Component, ViewChild, ElementRef, OnInit, OnDestroy, AfterViewInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LnrEngine3dService } from './lnrengine3d.service'
import { LnrService } from './lnr.service'
import { Vector3 } from 'three'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('rendererCanvas', { static: true })
  rendererCanvas: ElementRef<HTMLCanvasElement>

  constructor(
    public context: LnrService,
    private readonly engine3d: LnrEngine3dService) {
    console.info(AppComponent.name, "c'tor")  
  }

  ngOnInit(): void {
    console.info(AppComponent.name, "ngOnInit")

    console.debug(AppComponent.name, window.innerWidth, window.innerHeight)

    const size = LnrEngine3dService.calcContentSize()  
    this.engine3d.createScene(this.rendererCanvas, size.width, size.height)
    this.engine3d.animate()
  }

  ngAfterViewInit(): void {
    console.info(AppComponent.name, "ngAfterViewInit")
  }

  ngOnDestroy(): void {
    console.info(AppComponent.name, "ngOnDestroy")
    this.engine3d.ngOnDestroy()
  }
 
  onLngChanged(event) {
    console.debug(event.value)

    const alpha = event.value / 255 * Math.PI

    const magicNum = -49.2
    const magicAng = 0.307
    const c2 = 52 * 52
    const x = Math.sin(alpha) * 26
    const a = x - 10.13
    const b = Math.sqrt(c2 - a * a)
    const lng = magicNum + b + Math.cos(alpha) * -26
    const beta = magicAng - Math.asin(a / 52)

    this.engine3d.groupCarriageBlue.setLng(lng)
    this.engine3d.groupCarriageSilver.setLng(lng)
    this.engine3d.groupCarriageGold.setLng(lng)
    this.engine3d.groupCarriageAnthracite.setLng(lng)
    this.engine3d.groupRotationWhite.setLng(lng)
    this.engine3d.groupRotationWood.setLng(lng)
    this.engine3d.groupRotationBlue.setLng(lng)
    this.engine3d.groupRotationSilver.setLng(lng)
    this.engine3d.groupExtensionArm.setLng(lng)

    const rtnServoArm = (event.value - 127) / 80
    this.engine3d.groupServoArmGold.rotate(-rtnServoArm, new Vector3(0, 0, 1))
    this.engine3d.groupServoArmSilver.rotate(-rtnServoArm, new Vector3(0, 0, 1))
    this.engine3d.groupServoArmAnthracite.rotate(-rtnServoArm, new Vector3(0, 0, 1))
    this.engine3d.groupServoArmBlue.rotate(-rtnServoArm, new Vector3(0, 0, 1))

    this.engine3d.groupExtensionArm.rotate(beta, new Vector3(0, 0, 1))
  }

  onRtnChanged(event) {
    console.debug(event.value)

    const rtn = (event.value - 127) / 80
    this.engine3d.groupRotationWhite.setRtn(rtn)
    this.engine3d.groupRotationWood.setRtn(rtn)
    this.engine3d.groupRotationBlue.setRtn(rtn)
    this.engine3d.groupRotationSilver.setRtn(rtn)
  }

  onTransparentChecked() {
    const checked = !this.context.showAsTransparent
    console.info(AppComponent.name, "onTransparentChecked", checked)
    this.engine3d.setTransparent(checked)
    this.context.showAsTransparent = checked
  }

  onCoverChecked() {
    const checked = !this.context.showCover
    console.info(AppComponent.name, "onCoverChecked", checked)
    this.engine3d.groupStaticCoverBlue.setVisible(checked)
    this.engine3d.groupStaticCoverSilver.setVisible(checked)
    this.context.showCover = checked
  }
}
