import { NgModule } from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {LivePage} from './live';
import {LiveDetailPage} from './live-detail/live-detail';
import {RecordDetailPage} from './record-detail/record-detail';
import {nameReplace} from"../../pipes/nameReplace";
import { LiveService } from './liveService';
import { SocketService } from '../../providers/SocketService';
@NgModule({
    imports: [IonicModule],
    declarations: [LivePage,LiveDetailPage,nameReplace,RecordDetailPage],
    entryComponents: [LivePage,LiveDetailPage,RecordDetailPage],
    providers: [LiveService,SocketService],
    exports: [IonicModule]
})
export class LiveModule {}
