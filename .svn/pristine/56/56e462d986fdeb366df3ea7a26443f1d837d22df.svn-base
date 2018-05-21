import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/HttpService";
import { APP_SERVE_URL } from "../../providers/Constants";
@Injectable()
export class newsService {
    constructor(public httpService: HttpService) {
    }
    //获取news
	getNews(pageIndex,pageSize,classId){
		return this.httpService.get(APP_SERVE_URL+'Newses?pageIndex='+pageIndex+'&pageSize='+pageSize+'&classId='+classId).map((res: Response) =>  res.json());
    }
    //获取消息详情
    getNewsDetail(id){
        return this.httpService.get(APP_SERVE_URL+'Newses/'+id).map((res: Response) =>  res.json());
    }
}