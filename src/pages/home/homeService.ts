import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/HttpService";
import { APP_SERVE_URL,APP_SERVE_URL2 } from "../../assets/config/config";
@Injectable()
export class HomeService {
  constructor(public httpService: HttpService) {
	}
	//获取期货列表
	getFutures(){
		return this.httpService.get(APP_SERVE_URL+'Futureses/Recommend').map((res: Response) =>  res.json());
	}
	//获取轮播图
	getBanner(){
		return this.httpService.get(APP_SERVE_URL+'Banners').map((res: Response) =>  res.json());
	}
	//获取文本资源
	getText(id){
		return this.httpService.get(APP_SERVE_URL+'NoviceCourses?id='+id).map((res: Response) =>  res.json());
	}
	getIdText(id){
		return this.httpService.get(APP_SERVE_URL+'Problems/'+id).map((res: Response) =>  res.json());
	}
	getConText(id){
		return this.httpService.get(APP_SERVE_URL+'ConstantTexts/'+id).map((res: Response) =>  res.json());
	}
	//获取资讯
	getNews(){
		return this.httpService.get(APP_SERVE_URL+'Newses/HotNews').map((res: Response) =>  res.json());
	}
	//获取新手学堂列表
	getNoviceList(){
		return this.httpService.get(APP_SERVE_URL+'NoviceCourses').map((res: Response) =>  res.json());
	}
	//上架接口屏蔽
	showModule(){
		return this.httpService.get(APP_SERVE_URL2+'Start/IsShield').map((res: Response) =>  res.json());
	}
	//获取指数
	getExponentList(){
		return this.httpService.get(APP_SERVE_URL+'Stocks/ExponentList').map((res: Response) =>  res.json());
	}
	//获取申购列表
    getPurchaseSubscribes(){
        return this.httpService.get(APP_SERVE_URL+'PurchaseSubscribes').map((res: Response) =>  res.json());
    }
	//获取询价排行榜
    getIncomeRankings(){
        return this.httpService.get(APP_SERVE_URL+'IncomeRankings').map((res: Response) =>  res.json());
	}
	//获取常见问题列表
	getProblemsList(){
		return this.httpService.get(APP_SERVE_URL+'Problems').map((res: Response) =>  res.json());
	}
}