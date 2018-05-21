import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { LoginPage } from './login';
import { RegisterPage } from './register/register';
import { FverifyPage } from './find-verify/fverify';
import { FresetPage } from './find-reset/freset';
import { LoginService } from './LoginService';
import { NoviceDetailPage } from '../home/novice-detail/novice-detail';
@NgModule({
	imports: [IonicModule],
	declarations: [LoginPage,RegisterPage,FverifyPage,FresetPage],
	entryComponents: [LoginPage,RegisterPage,FverifyPage,FresetPage,NoviceDetailPage],
	providers: [LoginService],
	exports: [IonicModule]
})
export class LoginModule {
}

