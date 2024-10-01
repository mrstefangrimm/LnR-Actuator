import { Injectable } from "@angular/core"

@Injectable({ providedIn: 'root' })
export class LnrService {

  showAsTransparent = false
  showCover = false
  visiblitiesOpen: boolean = false

  constructor() {
    console.info(LnrService.name, "c'tor")
  }

}
