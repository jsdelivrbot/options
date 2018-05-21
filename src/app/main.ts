import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import {enableProdMode} from '@angular/core';
enableProdMode();
sessionStorage.dpr=window.devicePixelRatio<=2?2:3;//获取屏幕分辨比
platformBrowserDynamic().bootstrapModule(AppModule);
