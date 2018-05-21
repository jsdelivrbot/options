import { NgModule } from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {TrackPage} from './track';
import {TrackMinePage} from './track-mine/track-mine';
import {TrackDetailPage} from './track-detail/track-detail';
import {TrackService} from './trackService';
import { LoginPage } from '../login/login';
@NgModule({
    imports: [IonicModule],
    declarations: [TrackPage,TrackMinePage,TrackDetailPage],
    entryComponents: [TrackPage,TrackMinePage,TrackDetailPage,LoginPage],
    providers: [TrackService],
    exports: [IonicModule]
})
export class TrackModule {}
