import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/HttpService";
import { APP_SERVE_URL,APP_SERVE_URL2 } from "../../providers/Constants";
@Injectable()
export class TrackService {
  constructor(public httpService: HttpService) {
	}
	//获取跟单列表
	getTracks(){
		return this.httpService.get(APP_SERVE_URL2+'Follows').map((res: Response) =>  res.json());
	}
	//获取跟单详情
	getTrackDetail(id){
		return this.httpService.get(APP_SERVE_URL2+'Follows/'+id).map((res: Response) =>  res.json());
	}
}
