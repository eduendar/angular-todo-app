import { DOCUMENT } from '@angular/common';
import { Component, inject, Renderer2 } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-todo-app';
  
  dynamic incjection ist mit v15 reingekommen, da haben sie vielleich die klassische Art erwartet
  
  private document: Document = inject(DOCUMENT);
  private renderer: Renderer2 = inject(Renderer2);

  onDarkModeSwitched({ checked }: MatSlideToggleChange) {
    const hostClass = checked ? 'theme-dark' : 'theme-light';
    this.renderer.setAttribute(this.document.body, 'class', hostClass);
 }
}
