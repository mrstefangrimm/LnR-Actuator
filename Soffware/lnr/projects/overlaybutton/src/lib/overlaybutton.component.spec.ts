import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlaybuttonComponent } from './overlaybutton.component';

describe('OverlaybuttonComponent', () => {
  let component: OverlaybuttonComponent;
  let fixture: ComponentFixture<OverlaybuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlaybuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverlaybuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
