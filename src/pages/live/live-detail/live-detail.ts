import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Events,Content,Keyboard,ModalController  } from 'ionic-angular';
import { NativeService } from '../../../providers/NativeService';
import { LiveService } from '../liveService';
import { IMAGE_IP } from '../../../assets/config/config';
import { GlobalData } from '../../../providers/GlobalData';
import { SocketService } from '../../../providers/SocketService';
import { LoginPage } from '../../login/login';
import {SOCKET_SERVE_URL_Live} from '../../../assets/config/config' ;
declare let screen;
/**
 * Generated class for the TradePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-live-detail',
    templateUrl: 'live-detail.html',
})
export class LiveDetailPage {
    private name:string="名字名字名字名字名字名字";
    private dpr:string=sessionStorage.dpr;
    private touchState:boolean=false;
    private player:any;
    private id:number;
    // private videoData:any=[];
    private imgIp:string=IMAGE_IP;
    private isMobile:boolean;
    private input_cont:string;
    private commentData:any=[];
    private livingData:any=[];
    private liveUrl:any;
    @ViewChild('comment')
    commentDiv: ElementRef;
    @ViewChild('foot')
    footDiv: ElementRef;
    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private events: Events,
        private keyboard: Keyboard,
        private globalData: GlobalData,
        private liveService: LiveService,
        private nativeService: NativeService,
        private alertCtrl: AlertController,
        private ws: SocketService,
        private modalCtrl: ModalController,
    ) {
    }
    //首次加载页面
    ionViewDidLoad() {
        this.ws.liveSocket=SOCKET_SERVE_URL_Live+'Chat?name=client';
        this.getLiving();
        this.isMobile=this.nativeService.isMobile();
        //设置滚动框高度
        this.commentDiv.nativeElement.style.height=screen.availHeight-this.commentDiv.nativeElement.offsetTop-this.footDiv.nativeElement.offsetHeight+'px';
        window.addEventListener('native.keyboardshow',(e:any) =>{
            document.getElementById('set_input').style.bottom=e.keyboardHeight+this.footDiv.nativeElement.offsetHeight+'px';
    　  });
        window.addEventListener('native.keyboardhide',(e:any) =>{
            document.getElementById('set_input').style.bottom=0+'px';
    　  });
    }
     //即将离开页面
	ionViewWillLeave(){
        this.nativeService.statusBarStyleDefault(false);
        this.events.unsubscribe('liveSocketData:live');
        this.ws.liveSocket.close(true,false);
	}
	//每次进入页面
	ionViewWillEnter(){
        this.nativeService.statusBarStyleDefault(true);
        this.events.subscribe('liveSocketData:live',(msg)=>{
            console.log('msg',JSON.parse(msg.data))
            let temp:any=JSON.parse(msg.data);
            if(temp.accountNo==this.globalData.childAccountNo)return;
            this.commentData.push(temp);
            if(!this.touchState){
                this.commentDiv.nativeElement.scrollTo(0,this.commentDiv.nativeElement.scrollHeight,0)
            }
        })
	}
    touchS(){
        this.touchState=true;
    }
    touchE(){
        setTimeout(()=>{
            this.touchState=false;
        },3000)
    }
    //发送消息
    send(){
        if(this.globalData.childAccountNo){
            let temp='{"MsgType":"HbMsg","Content":{"AccountNo":"'+this.globalData.childAccountNo+'","LiveId":"5","Content":"'+this.input_cont+'"},"Extra":""}';
            this.commentData.push({
                id: 1,
                accountNo: this.globalData.childAccountNo,
                liveId: 5,
                content: this.input_cont,
                nickname: this.globalData.nickname
            });
            if(!this.touchState){
                this.commentDiv.nativeElement.scrollTo(0,this.commentDiv.nativeElement.scrollHeight,0)
            }
            this.ws.liveSocket.send(temp)
            this.input_cont=null;
        }else{
            this.modalCtrl.create(LoginPage).present();
        }
        this.keyboard.close();
    }
   //返回
    goBack(){
        this.navCtrl.pop();
    }
     getLiving(){
        this.liveService.getLiving(5)
        .subscribe(res => {
			if(res.success=='true'){
                this.liveUrl=res.data.url;
                this.livingData=res.data;
			}else{
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{text: '确定'}]
					}).present();
			}
		});
    }
}
