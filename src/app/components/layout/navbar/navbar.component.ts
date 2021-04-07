import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('themeLink', { read: ElementRef }) themeLink: ElementRef | undefined;

  bodyClass: DOMTokenList;
  tmp: any;
  theme: any;
  themeMap: any = {
    dark: "light",
    light: "solar",
    solar: "dark",
  };

  constructor(private _sanitizer: DomSanitizer) {
    this.bodyClass = document.body.classList;
  }

  ngOnInit(): void {
    this.theme = localStorage.getItem('theme');
    if (!this.theme) {
      this.theme = Object.keys(this.themeMap)[0]
      localStorage.setItem('theme', this.theme);
    }
    this.bodyClass.add(this.theme);
    this.assignActionToLink();
  }

  toggleTheme() {
    let current = localStorage.getItem('theme') || '';
    if (this.themeMap[current]) {
      var next = this.themeMap[current];
    } else {
      var next = this.themeMap.dark;
    }
    this.bodyClass.replace(current, next);
    localStorage.setItem('theme', next);
  }

  assignActionToLink() {
    setTimeout(() => {
      fromEvent<any>(this.themeLink?.nativeElement, 'click')
        .subscribe(() => this.toggleTheme());
    }, 200);
  }
}
