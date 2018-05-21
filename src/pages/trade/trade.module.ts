import { NgModule } from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { TradePage } from './trade';
import { SubscriptionPage } from './subscription/subscription';
import { TradeService } from './tradeService';
import { ProductPage } from './product/product';
import { PurchasePage } from './purchase/purchase';
import { CouponModalComponent } from './purchase/coupon-modal/coupon-modal';
import { RechargePage } from "../my/recharge/recharge";
import { PositionsPage } from "./order/positions/positions";
import { DelegationPage } from "./order/delegation/delegation";
import { BackPage } from "./order/back/back";
import { EffectivePage } from "./order/effective/effective";
import { RefusePage } from "./order/refuse/refuse";
import { SettlementPage } from "./order/settlement/settlement";
import { CouponPage } from "../my/coupon/coupon";
import { NoviceDetailPage } from "../home/novice-detail/novice-detail";
import {SearchModalPage} from './subscription/searchModal/searchModal';
import {InquiryModalPage} from './subscription/inquiryModal/inquiryModal';
import { SiPayPage } from '../my/self-info/si-pay/si-pay';
import { LoginPage } from '../login/login';
import { SiIdentifyPage } from '../my/self-info/si-identify/si-identify';
@NgModule({
    imports: [IonicModule],
    declarations: [TradePage,BackPage,EffectivePage,RefusePage,ProductPage,PurchasePage,SearchModalPage,InquiryModalPage,SubscriptionPage,PositionsPage,SettlementPage,CouponModalComponent,DelegationPage],
    entryComponents: [TradePage,BackPage,ProductPage,EffectivePage,SiPayPage,LoginPage,SiIdentifyPage,RefusePage,RechargePage,PurchasePage,SearchModalPage,InquiryModalPage,SubscriptionPage,PositionsPage,SettlementPage,CouponPage,DelegationPage,CouponModalComponent,NoviceDetailPage],
    providers: [TradeService],
    exports: [IonicModule]
})
export class TradeModule {}
