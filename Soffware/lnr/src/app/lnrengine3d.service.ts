import * as THREE from 'three'
import { Vector3 } from 'three'
import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { LoadableObject, LoadedObject, NotLoadedObject } from 'threeobject'
import { Observable } from 'rxjs'

@Injectable({providedIn: 'root'})
export class LnrEngine3dService implements OnDestroy {

  private readonly zero: Vector3 = new Vector3(0, 0, 0)
  
  private renderer: THREE.WebGLRenderer
  private camera: THREE.PerspectiveCamera
  private scene: THREE.Scene
  private frameId: number = null

  private meshes = []

  private materialBlue: THREE.Material
  private materialWhite: THREE.Material
  private materialAnthracite: THREE.Material
  private materialSilver: THREE.Material
  private materialGold: THREE.Material
  private materialWood: THREE.Material
  private materialXray: THREE.Material

  private groupStaticBaseSilver: LoadableObject
  private groupStaticBaseGold: LoadableObject
  private groupStaticBaseAnthracite: LoadableObject
  private groupStaticBaseBlue: LoadableObject
  groupStaticCoverBlue: LoadableObject
  groupStaticCoverSilver: LoadableObject
  groupCarriageSilver: LoadableObject
  groupCarriageBlue: LoadableObject
  groupCarriageGold: LoadableObject
  groupCarriageAnthracite: LoadableObject
  groupServoArmGold: LoadableObject
  groupServoArmSilver: LoadableObject
  groupServoArmAnthracite: LoadableObject
  groupServoArmBlue: LoadableObject
  groupRotationWhite: LoadableObject
  groupRotationWood: LoadableObject
  groupRotationBlue: LoadableObject
  groupRotationSilver: LoadableObject
  groupExtensionArm: LoadableObject
  
  public constructor(private ngZone: NgZone) {
    const baseUrl = document.getElementsByTagName('base')[0].href
    console.info(LnrEngine3dService.name, "c'tor", "base url", baseUrl)
  }

  ngOnDestroy() {
    console.info(LnrEngine3dService.name, "ngOnDestroy")
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId)
    }
    this.frameId = null
    this.meshes.forEach(m => this.scene.remove(m))
    this.materialBlue.dispose()
    this.materialWhite.dispose()
    this.materialAnthracite.dispose()
    this.materialSilver.dispose()
    this.materialGold.dispose()
    this.materialWood.dispose()
    this.materialXray.dispose()
    this.groupStaticCoverBlue.dispose()
    this.groupStaticCoverSilver.dispose()
    this.groupStaticBaseSilver.dispose()
    this.groupStaticBaseGold.dispose()
    this.groupStaticBaseAnthracite.dispose()
    this.groupStaticBaseBlue.dispose()
    this.groupCarriageSilver.dispose()
    this.groupCarriageBlue.dispose()
    this.groupCarriageGold.dispose()
    this.groupCarriageAnthracite.dispose()
    this.groupServoArmGold.dispose()
    this.groupServoArmSilver.dispose()
    this.groupServoArmAnthracite.dispose()
    this.groupServoArmBlue.dispose()
    this.groupRotationWhite.dispose()
    this.groupRotationWood.dispose()
    this.groupRotationBlue.dispose()
    this.groupRotationSilver.dispose()
    this.groupExtensionArm.dispose()
  }

  createScene(canvas: ElementRef<HTMLCanvasElement>, width: number, height: number) {
    console.info(LnrEngine3dService.name, "createScene")

    const w = width
    const h = height
    console.debug(w, h)

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas.nativeElement,
      alpha: true,     // transparent background
      antialias: true, // smooth edges
    });
    this.renderer.setSize(w, h)
 
    // create the scene
    this.scene = new THREE.Scene() 
 
    this.camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 800)
    this.camera.position.set(100, 150, 100)
    this.scene.add(this.camera)

    const controls = new OrbitControls(this.camera, this.renderer.domElement)
    controls.minDistance = 50
    controls.maxDistance = 500
    
    const light = new THREE.PointLight(0xffffff, 10, 0, 0)
    light.position.set(300, -700, 0)
    this.scene.add(light)
    
    const light2 = new THREE.PointLight(0xffffff, 10, 0, 0)
    light2.position.set(0, 500, 300)
    this.scene.add(light2)

    var hemiLight = new THREE.HemisphereLight()
    this.scene.add(hemiLight);

    this.materialBlue = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0,0,255),
      roughness: 0.5,
      metalness: 0,
    })   
    this.materialWhite = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      metalness: 0,
    })
    this.materialAnthracite = new THREE.MeshStandardMaterial({
      color: 0x383E42,
      roughness: 0.5,
      metalness: 0,
    })
    this.materialSilver = new THREE.MeshStandardMaterial({
      color: 0xAAA9AD,
      roughness: 0.5,
      metalness: 1.0,
    })
    this.materialGold = new THREE.MeshStandardMaterial({
      color: 0xFFD700,
      roughness: 0.5,
      metalness: 1.0,
    })
    this.materialWood = new THREE.MeshStandardMaterial({
      color: 0xBA8C63,
      roughness: 0.5,
      metalness: 0,
    })
    this.materialXray = new THREE.MeshPhysicalMaterial({
      color: 0x0000FF,
      metalness: 0,
      roughness: 0,
      alphaTest: 0.5,
      depthWrite: false,
      transmission: 0.6,
      opacity: 0.5,
      transparent: true,
    })

    this.loadInvisibleAndAdd(this.zero, this.materialBlue, 'assets/LnR-VirmsGroupStaticCoverBlue.obj').subscribe({
      next: obj => this.groupStaticCoverBlue = obj
    })
    this.loadInvisibleAndAdd(this.zero, this.materialSilver, 'assets/LnR-VirmsGroupStaticCoverSilver.obj').subscribe({
      next: obj => this.groupStaticCoverSilver = obj
    })
    this.loadAndAdd(this.zero, this.materialSilver, 'assets/LnR-VirmsGroupStaticBaseSilver.obj').subscribe({
      next: obj => this.groupStaticBaseSilver = obj
    })
    this.loadAndAdd(this.zero, this.materialGold, 'assets/LnR-VirmsGroupStaticBaseGold.obj').subscribe({
      next: obj => this.groupStaticBaseGold = obj
    })
    this.loadAndAdd(this.zero, this.materialAnthracite, 'assets/LnR-VirmsGroupStaticBaseAnthracite.obj').subscribe({
      next: obj => this.groupStaticBaseAnthracite = obj
    })
    this.loadAndAdd(this.zero, this.materialBlue, 'assets/LnR-VirmsGroupStaticBaseBlue.obj').subscribe({
      next: obj => this.groupStaticBaseBlue = obj
    })
    this.loadAndAdd(this.zero, this.materialSilver, 'assets/LnR-VirmsGroupCarriageSilver.obj').subscribe({
      next: obj => this.groupCarriageSilver = obj
    })
    this.loadAndAdd(this.zero, this.materialBlue, 'assets/LnR-VirmsGroupCarriageBlue.obj').subscribe({
      next: obj => this.groupCarriageBlue = obj
    })
    this.loadAndAdd(this.zero, this.materialGold, 'assets/LnR-VirmsGroupCarriageGold.obj').subscribe({
      next: obj => this.groupCarriageGold = obj
    })
    this.loadAndAdd(this.zero, this.materialAnthracite, 'assets/LnR-VirmsGroupCarriageAnthracite.obj').subscribe({
      next: obj => this.groupCarriageAnthracite = obj
    })
    this.loadAndAdd(new Vector3(10.14, -46.93, 0), this.materialGold, 'assets/LnR-VirmsGroupServoArmGold.obj').subscribe({
      next: obj => this.groupServoArmGold = obj
    })
    this.loadAndAdd(new Vector3(10.14, -46.93, 0), this.materialSilver, 'assets/LnR-VirmsGroupServoArmSilver.obj').subscribe({
      next: obj => this.groupServoArmSilver = obj
    })
    this.loadAndAdd(new Vector3(10.14, -46.93, 0), this.materialAnthracite, 'assets/LnR-VirmsGroupServoArmAnthracite.obj').subscribe({
      next: obj => this.groupServoArmAnthracite = obj
    })
    this.loadAndAdd(new Vector3(10.14, -46.93, 0), this.materialBlue, 'assets/LnR-VirmsGroupServoArmBlue.obj').subscribe({
      next: obj => this.groupServoArmBlue = obj
    })
    this.loadAndAdd(new Vector3(8.43, 0, -19), this.materialWhite, 'assets/LnR-VirmsGroupRotationWhite.obj').subscribe({
      next: obj => this.groupRotationWhite = obj
    })
    this.loadAndAdd(new Vector3(8.43, 0, -19), this.materialWood, 'assets/LnR-VirmsGroupRotationWood.obj').subscribe({
      next: obj => this.groupRotationWood = obj
    })
    this.loadAndAdd(new Vector3(8.43, 0, -19), this.materialBlue, 'assets/LnR-VirmsGroupRotationBlue.obj').subscribe({
      next: obj => this.groupRotationBlue = obj
    })
    this.loadAndAdd(new Vector3(8.43, 0, -19), this.materialSilver, 'assets/LnR-VirmsGroupRotationSilver.obj').subscribe({
      next: obj => this.groupRotationSilver = obj
    })
    this.loadAndAdd(new Vector3(0.65, 2.41, 0), this.materialBlue, 'assets/LnR-VirmsGroupExtensionArm.obj').subscribe({
      next: obj => this.groupExtensionArm = obj
    })
  }

  private loadInvisibleAndAdd(origin: Vector3, material: THREE.Material, asset: string) : Observable<LoadableObject> {
    return new Observable<LoadableObject>(subscriber => {
      var model = LoadedObject.createFromSketchup(origin, this.zero, material)
      model.loadInvisible(asset).subscribe({
        next: object3d => {
          this.scene.add(object3d)
          subscriber.next(model)
        },
        error: () => {
          console.warn(LnrEngine3dService.name, "loadAndAdd", asset, "not shown.")
          subscriber.next(new NotLoadedObject())
        }
      })
    })
  }

  private loadAndAdd(origin: Vector3, material: THREE.Material, asset: string) : Observable<LoadableObject> {
    return new Observable<LoadableObject>(subscriber => {
      var model = LoadedObject.createFromSketchup(origin, this.zero, material)
      model.load(asset).subscribe({
        next: object3d => {
          this.scene.add(object3d)
          subscriber.next(model)
        },
        error: () => {
          console.warn(LnrEngine3dService.name, "loadAndAdd", asset, "not shown.")
          subscriber.next(new NotLoadedObject())
        }
      })
    })
  }

  animate() {
    console.debug(LnrEngine3dService.name, "animate")

    // Run outside angular zones, because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render()
      }
      else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render()
        })
      }
      window.addEventListener('resize', () => {
        this.resize()
      })
    })
  }

  private render() {
    this.frameId = requestAnimationFrame(() => {
      this.render()
    })
    this.renderer.render(this.scene, this.camera)
  }

  private resize() {
    const size = LnrEngine3dService.calcContentSize()
   
    this.camera.aspect = size.width / size.height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(size.width, size.height)
  }

  static calcContentSize() : {width: number; height: number} {

    const sideNavWidth = window.innerWidth > 620 
                         ? window.innerWidth * 0.2 + 14
                         : 18
    const contentWidth = window.innerWidth - sideNavWidth

    const footerHeight = window.innerWidth > 620 
                         ? window.innerHeight * 0.1
                         :  window.innerHeight * 0.3
    const contentHeight = window.innerHeight - footerHeight

    return { width: contentWidth, height: contentHeight}
  }

  setTransparent(transparent: boolean) {
    console.info(LnrEngine3dService.name, "setTransparent", transparent)
    if (transparent) {
      this.groupStaticCoverBlue.setMaterial(this.materialXray)
      this.groupStaticCoverSilver.setMaterial(this.materialXray)
      this.groupStaticBaseSilver.setMaterial(this.materialXray)
      this.groupStaticBaseGold.setMaterial(this.materialXray)
      this.groupStaticBaseAnthracite.setMaterial(this.materialXray)
      this.groupStaticBaseBlue.setMaterial(this.materialXray)
      this.groupCarriageSilver.setMaterial(this.materialXray)
      this.groupCarriageBlue.setMaterial(this.materialXray)
      this.groupCarriageGold.setMaterial(this.materialXray)
      this.groupCarriageAnthracite.setMaterial(this.materialXray)
      this.groupServoArmGold.setMaterial(this.materialXray)
      this.groupServoArmSilver.setMaterial(this.materialXray)
      this.groupServoArmAnthracite.setMaterial(this.materialXray)
      this.groupServoArmBlue.setMaterial(this.materialXray)
      this.groupRotationWhite.setMaterial(this.materialXray)
      this.groupRotationWood.setMaterial(this.materialXray)
      this.groupRotationBlue.setMaterial(this.materialXray)
      this.groupRotationSilver.setMaterial(this.materialXray)
      this.groupExtensionArm.setMaterial(this.materialXray)
    }
    else {
      this.groupStaticCoverBlue.setMaterial(this.materialBlue)
      this.groupStaticCoverSilver.setMaterial(this.materialSilver)
      this.groupStaticBaseSilver.setMaterial(this.materialSilver)
      this.groupStaticBaseGold.setMaterial(this.materialGold)
      this.groupStaticBaseAnthracite.setMaterial(this.materialAnthracite)
      this.groupStaticBaseBlue.setMaterial(this.materialBlue)
      this.groupCarriageSilver.setMaterial(this.materialSilver)
      this.groupCarriageBlue.setMaterial(this.materialBlue)
      this.groupCarriageGold.setMaterial(this.materialGold)
      this.groupCarriageAnthracite.setMaterial(this.materialAnthracite)
      this.groupServoArmGold.setMaterial(this.materialGold)
      this.groupServoArmSilver.setMaterial(this.materialSilver)
      this.groupServoArmAnthracite.setMaterial(this.materialAnthracite)
      this.groupServoArmBlue.setMaterial(this.materialBlue)
      this.groupRotationWhite.setMaterial(this.materialWhite)
      this.groupRotationWood.setMaterial(this.materialWood)
      this.groupRotationBlue.setMaterial(this.materialBlue)
      this.groupRotationSilver.setMaterial(this.materialSilver)
      this.groupExtensionArm.setMaterial(this.materialBlue)
    }
  
  }

}
