import { NgModule } from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { MoneyDetailPage } from './money-detail';
import { MdAllComponent } from './md-all/md-all';
import { MdRrechargedrawComponent } from './md-rechargedraw/md-rechargedraw';
import { MdSpreadrewardComponent } from './md-spreadreward/md-spreadreward';
import { MdTradedetailComponent } from './md-tradedetail/md-tradedetail';
import { myService } from "../myService";
@NgModule({
    imports: [IonicModule],
    declarations: [MoneyDetailPage,MdAllComponent,MdRrechargedrawComponent,MdSpreadrewardComponent,MdTradedetailComponent],
    entryComponents: [MoneyDetailPage,MdAllComponent,MdRrechargedrawComponent,MdSpreadrewardComponent,MdTradedetailComponent],
    providers: [myService],
    exports: [IonicModule]
})
export class MoneyDetailModule {
}
