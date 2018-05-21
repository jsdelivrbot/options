/**
 * Created by siyongkang on 2017/8/4
 */
import {Injectable} from '@angular/core';
import {
  Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs, RequestMethod
} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs";
import {GlobalData} from "./GlobalData";
import {NativeService} from "./NativeService";
import {AlertController,Events} from "ionic-angular";
import { APP_SERVE_URL } from "../assets/config/config";
import {Storage} from '@ionic/storage';
@Injectable()
export class HttpService {

  constructor(public http: Http,
              private globalData: GlobalData,
			  private nativeService: NativeService,
			  private storage: Storage,
			  private events: Events,
              private alertCtrl: AlertController) {
  }

  public request(url: string, options: RequestOptionsArgs): Observable<Response> {
    //  console.log('header刷新token',this.globalData.refreshToken)
    if (options.headers) {
      options.headers['Authorization'] = 'Bearer '+this.globalData.token;
    } else {
      options.headers = new Headers({
        ['Authorization'] :'Bearer '+this.globalData.token
      });
    }
    return Observable.create((observer) => {
      this.nativeService.showLoading();
      // console.log('%c 请求前 %c', 'color:blue', '', 'url', url, 'options', options);
      this.http.request(url, options).subscribe(res => {
        this.nativeService.hideLoading();
		// console.log('%c 请求成功 %c', 'color:green', '', 'url', url, 'options', options, 'res', res);
        observer.next(res);
      }, err => {
			  this.requestFailed(url, options, err ,observer);//处理请求失败
  			this.events.subscribe('401right',(res)=>{
  				observer.next(res);
  			})
  			this.events.subscribe('401error',()=>{
  				observer.error(err);
  			})
      });
    });
  }

  public get(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Get,
      search: HttpService.buildURLSearchParams(paramMap)
    }));
  }

  // 默认Content-Type为application/json;
  public post(url: string, body: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      body: body
    }));
  }

  public postFormData(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      search: HttpService.buildURLSearchParams(paramMap).toString(),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json;charset=utf-8',
        'Authorization': this.globalData.token
      })
    }));
  }

  public put(url: string, body: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Put,
      body: body
    }));
  }

  public delete(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Delete,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }

  public patch(url: string, body: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Patch,
      body: body
    }));
  }

  public head(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Head,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }

  public options(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Options,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }

  /**
   * 将对象转为查询参数
   * @param paramMap
   * @returns {URLSearchParams}
   */
  private static buildURLSearchParams(paramMap): URLSearchParams {
    let params = new URLSearchParams();
    if (!paramMap) {
      return params;
    }
    for (let key in paramMap) {
      let val = paramMap[key];
      if (val instanceof Date) {
        // val = Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
      }
      params.set(key, val);
    }
    return params;
  }

  /**
   * 处理请求失败事件
   * @param url
   * @param options
   * @param err
   */
  private requestFailed(url: string, options: RequestOptionsArgs, err,observer) {
    this.nativeService.hideLoading();
    console.log('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'err', err);
    let msg = '请求发生异常',status = err.status;
    if (!this.nativeService.isConnecting()) {
    msg = '请求失败，请连接网络';
    this.alertCtrl.create({
      title: msg,
      subTitle: '',
      buttons: [{text: '确定'}]
    }).present();
	}
	else if (status === 401) {//刷新token
		this.globalData.showLoading=false;
		this.get(APP_SERVE_URL+'Start/RefreshToken?refreshToken='+this.globalData.refreshToken)
		.map((res: Response) =>  res.json())
        .subscribe(res => {
		  	console.log('进入刷新token',res)
            if(res.success=='true'){
            	console.log('进入true刷新token',res)
				this.globalData.token=res.data.accessToken;
				this.globalData.refreshToken=res.data.refreshToken;
				this.storage.set('userInfo',{
					token:res.data.accessToken,
					refreshToken:res.data.refreshToken,
				});
				options.headers= new Headers({
					  ['Authorization'] :'Bearer '+this.globalData.token
					});
				this.globalData.showLoading=false;
				this.request(url,options)
				.subscribe(res => {
					this.events.publish('401right',res)
				})
			}else{
				this.events.publish('user:logout');
				this.globalData.token=null;
				this.globalData.refreshToken=null;
				this.globalData.userId=null;
				this.globalData.funds =0.00;
				this.globalData.capital =0.00;
				this.globalData.authState =null;
				this.globalData.account =null;
				this.globalData.isMentionPassword =null;
				this.globalData.isBankCard  =null;
				this.globalData.cardCount=null;
				this.globalData.realName=null;
				this.globalData.simulateAccount=null;
				this.storage.set('userInfo',null);
				this.alertCtrl.create({
					title: res.errorMsg,
					subTitle: '',
					buttons: [{
						text: '确定',
						handler: () => {
							this.events.publish('user:reLogin');
						}
					}]
				}).present();
				this.events.publish('401error')
			}
		});
	  } 
	  else {
		if (status === 0) {
			msg = '请求失败，请求响应出错';
		} else if (status === 404) {
			msg = '请求失败，未找到请求地址';
		} else if (status === 500) {
			msg = '请求失败，服务器出错，请稍后再试';
		}
			this.alertCtrl.create({
				title: msg,
				subTitle: status,
				buttons: [{text: '确定'}]
				}).present();
		}
  }

}
