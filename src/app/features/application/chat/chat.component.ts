import { AfterViewChecked, Component, Renderer2 } from '@angular/core';

import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { LightGallery } from 'lightgallery/lightgallery';
import { CommonService, routes, SidebarService } from '../../../core/core.index';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    imports: [CommonModule,RouterLink]
})
export class ChatComponent implements AfterViewChecked {
  public base = '';
  public page = '';
  public last = '';
  public routes = routes;
  private lightGallery!: LightGallery;
  private needRefresh = false;
  settings = {
    counter: false,
    plugins: [lgZoom, lgVideo],
  };
  ngAfterViewChecked(): void {
    if (this.needRefresh) {
      this.lightGallery.refresh();
      this.needRefresh = false;
    }
  }
  onInit = (detail: { instance: LightGallery }): void => {
    this.lightGallery = detail.instance;
  };


  public showSearch = false;
  search2 = false;
  userInfo = false;
  mobChat1 = false;
  isemoji:boolean[]=[false];

  emoji(index:number):void{
    this.isemoji[index]=!this.isemoji[index]
  }
  closeButton() {
    this.showSearch = false;
  }
  showSearch2() {
    this.search2 = !this.search2;
  }
  hideSearch2() {
    this.search2 = false;
  }
  hideUserDetail() {
    this.userInfo = false;
    const isResponsive = window.matchMedia('(max-width: 992px)').matches;
    if (isResponsive) {
      this.mobChat1 = false;
    }
  }
  showUserDetail() {
    this.userInfo = true;
    const isResponsive = window.matchMedia('(max-width: 992px)').matches;
    if (isResponsive) {
      this.mobChat1 = true;
    }
  }
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === 'Space') {
      // Handle the key press here, e.g., trigger the same action as the click event
      this.hideSearch2();
    }
  }
  displayEmojiBtn = false;
  displayEmojiBtn2 = false;
  displayEmoji() {
    this.displayEmojiBtn = !this.displayEmojiBtn;
  }
  displayEmoji2() {
    this.displayEmojiBtn2 = !this.displayEmojiBtn2;
  }
  constructor(private common: CommonService, private renderer: Renderer2,private sidebar:SidebarService) {
    this.common.base.subscribe((base: string) => {
      this.base = base;
    });
    this.common.page.subscribe((page: string) => {
      this.page = page;
    });
    this.common.last.subscribe((last: string) => {
      this.last = last;
    });
    if (this.page == 'chat') {
      this.renderer.addClass(document.body, 'chat-page-custom');
    }
  }
  isCollapsed: boolean = false;
  toggleCollapse() {
    this.sidebar.toggleCollapse();
    this.isCollapsed = !this.isCollapsed;
  }
}
