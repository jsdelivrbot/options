import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';
import { MyApp } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TradeModule } from '../pages/trade/trade.module';
import { NewsModule } from '../pages/news/news.module';
import { MyModule } from '../pages/my/my.module';
import { HomeModule } from '../pages/home/home.module';
import { TabsModule } from '../pages/tabs/tabs.module';
import { LoginModule } from '../pages/login/login.module';
import { LiveModule } from '../pages/live/live.module';
import { TrackModule } from '../pages/track/track.module';
import { ComponentModule } from '../component/component.moudle';

// import {ImagePicker} from '@ionic-native/image-picker';
// import {Camera} from '@ionic-native/camera';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import {AppVersion} from '@ionic-native/app-version';
import {Toast} from '@ionic-native/toast';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {FileTransfer} from '@ionic-native/file-transfer';
import {Network} from '@ionic-native/network';
import {AppMinimize} from '@ionic-native/app-minimize';
import {JPush} from "../../typings/modules/jpush/index";
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import {FileOpener} from '@ionic-native/file-opener';
import {Helper} from "../providers/Helper";
import {HttpModule} from "@angular/http";
import {NativeService} from "../providers/NativeService";
import {HttpService} from "../providers/HttpService";
import {GlobalData} from "../providers/GlobalData";

@NgModule({
	declarations: [MyApp],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpModule,
		ComponentModule,
		IonicModule.forRoot(MyApp, 
			{
				mode:'ios',
				backButtonText: '',
				tabsHideOnSubPages:true
		}),
		IonicStorageModule.forRoot(
			{
				name: 'options',
			}
		),
		TradeModule,
		NewsModule,
		MyModule,
		HomeModule,
		TabsModule,
		LoginModule,
		TrackModule,
		LiveModule
	],
	bootstrap: [IonicApp],
	entryComponents: [MyApp],
	providers: [
		StatusBar,
        SplashScreen,
        AppVersion,
        Toast,
        InAppBrowser,
        FileTransfer,
        File,
        Network,
		AppMinimize,
		HttpService,
        JPush,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
		NativeService,
		FileOpener,
        Helper,
		GlobalData,
		ScreenOrientation,
		// ImagePicker,
		// Camera,
	]
})
export class AppModule {}
