
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LnrService } from './lnr.service';
import { LnrEngine3dService } from './lnrengine3d.service';
import {beforeEach, describe, expect, it, vi } from "vitest";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideZonelessChangeDetection(),
        LnrService,
        {
          provide: LnrEngine3dService, useValue: {
            createScene: vi.fn(),
            animate: vi.fn(),
            setTransparent: vi.fn(),
            ngOnDestroy: vi.fn(),
          }
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render "Longitudinal motion:" label', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const labels = Array.from(compiled.querySelectorAll('p'));
    expect(labels.some(p => p.textContent?.includes('Longitudinal motion:'))).toBe(true);
  });

  it('should render "Rotational motion:" label', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const labels = Array.from(compiled.querySelectorAll('p'));
    expect(labels.some(p => p.textContent?.includes('Rotational motion:'))).toBe(true);
  });

  it('should render the longitudinal slider with correct attributes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const slider = compiled.querySelector('#Longitudinal') as HTMLInputElement;
    expect(slider).toBeTruthy();
    expect(slider.type).toBe('range');
    expect(slider.min).toBe('0');
    expect(slider.max).toBe('255');
    expect(slider.value).toBe('127');
  });

  it('should render the rotational slider with correct attributes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const slider = compiled.querySelector('#Rotational') as HTMLInputElement;
    expect(slider).toBeTruthy();
    expect(slider.type).toBe('range');
    expect(slider.min).toBe('0');
    expect(slider.max).toBe('255');
    expect(slider.value).toBe('127');
  });
});
