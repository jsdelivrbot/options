import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { HomePage } from './home';
import { HomeService } from './homeService';
import { PromotionPage } from '../my/promotion/promotion';
import { NoviceWelfarePage } from './novice-welfare/novice-welfare';
import { NoviceSchoolPage } from './novice-school/novice-school';
import { NoviceDetailPage } from './novice-detail/novice-detail';
import { CustomerServicePage } from './customer-service/customer-service';
import { ProductPage } from '../trade/product/product';
import { SocketService } from '../../providers/SocketService';
import { ThumbnailModule } from '../../component/thumbnail/thumbnail.moudle';
import { NewsNoticeComponent } from '../news/news-notice/news-notice';
import { NewsGoldComponent } from '../news/news-gold/news-gold';
import { AdvertisePage } from './advertise/advertise';
import { NewsDetailPage } from '../news/news-detail/news-detail';
import {TrackService} from '../track/trackService';
import { myService } from "../my/myService";
import {nameHide} from"../../pipes/nameHide";
@NgModule({
	imports: [IonicModule,ThumbnailModule],
	declarations: [HomePage,NoviceWelfarePage,NoviceSchoolPage,AdvertisePage,nameHide,NoviceDetailPage,CustomerServicePage],
	entryComponents: [HomePage,PromotionPage,NoviceWelfarePage,AdvertisePage,NoviceSchoolPage,NoviceDetailPage,CustomerServicePage,ProductPage,NewsNoticeComponent,NewsGoldComponent,NewsDetailPage],
	providers: [HomeService,SocketService,TrackService,myService],
	exports: [IonicModule]
})
export class HomeModule {
}

