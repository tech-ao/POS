import { Component } from '@angular/core';
import { NavigationStart, Router, Event as RouterEvent, RouterLink } from '@angular/router';
import { CommonService, routes, SidebarService } from '../../../core/core.index';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [FormsModule,RouterLink,CommonModule],
})
export class HeaderComponent  {
  routes = routes;
  inputValue = '';
  activePath = '';
  showSearch = false;
  public changeLayout = '1';
  public darkTheme = false;
  public logoPath = '';
  public miniSidebar = false;
  elem = document.documentElement;
  public addClass = false;
  base = '';
  page = '';
  last = '';

  constructor(
    private Router: Router,
    private common: CommonService,
    private sidebar: SidebarService,
    
  ) {
    this.activePath = this.Router.url.split('/')[2];
    this.Router.events.subscribe((data: RouterEvent) => {
      if (data instanceof NavigationStart) {
        this.activePath = data.url.split('/')[2];
      }
    });
    this.sidebar.sideBarPosition.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    this.common.base.subscribe((base: string) => {
      this.base = base;
    });
    this.common.page.subscribe((page: string) => {
      this.page = page;
    });
    this.common.last.subscribe((last: string) => {
      this.last = last;
    });
  }





  public toggleSidebar(): void {
    this.sidebar.switchSideMenuPosition();
  }

  public togglesMobileSideBar(): void {
    this.sidebar.switchMobileSideBarPosition();
  }

  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sidebar.expandSideBar.next(true);
    } else {
      this.sidebar.expandSideBar.next(false);
    }
  }

  fullscreen() {
    if (!document.fullscreenElement) {
      this.elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  evaluate(expression: string): string {
    try {
      return new Function('return ' + expression)();
    } catch {
      return 'Error';
    }
  }

  clearCal(): string {
    return '';
  }

  backspacemain(value: string): string {
    return value.slice(0, -1);
  }
  onKeyPress(event: KeyboardEvent) {
    const validKeys = /[0-9+\-*/%.]/;
    
    if (validKeys.test(event.key)) {
      this.inputValue += event.key;
    } else if (event.key === 'Backspace' || event.key === 'Delete') {
      this.inputValue = this.backspacemain(this.inputValue);
    } else if (event.key === 'Enter') {
      this.solve();
    } else if (event.key.toLowerCase() === 'c') {
      this.clear();
    }
  }

  solve(): void {
    this.inputValue = this.evaluate(this.inputValue);
  }

  clear(): void {
    this.inputValue = this.clearCal();
  }

  backspace(): void {
    this.inputValue = this.backspacemain(this.inputValue);
  }

  addValue(val: string): void {
    this.inputValue += val;
  }
}
