import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { SiBankcardPage } from './si-bankcard';
import { SbAddcardPage } from './sb-addcard/sb-addcard';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
    imports: [IonicModule,MultiPickerModule],
    declarations: [SiBankcardPage,SbAddcardPage],
    entryComponents: [SiBankcardPage,SbAddcardPage],
    providers: [],
    exports: [IonicModule]
})
export class SiBankcardModule {}
