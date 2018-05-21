import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {HttpService} from "../../providers/HttpService";
import { APP_SERVE_URL,APP_SERVE_URL2 } from "../../assets/config/config";
import {GlobalData} from '../../providers/GlobalData';
@Injectable()
export class LiveService {
  constructor(public httpService: HttpService,public globalData: GlobalData) {
	}
	//获取视频列表
	getVideoList(pageIndex,pageSize){
		return this.httpService.get(APP_SERVE_URL+'Videos?pageIndex='+pageIndex+'&pageSize='+pageSize).map((res: Response) =>  res.json());
	}
	//获取视频详情
	getVideo(id){
		return this.httpService.get(APP_SERVE_URL+'Videos/'+id).map((res: Response) =>  res.json());
    }
	//获取直播地址
	getLiving(id){
		return this.httpService.get(APP_SERVE_URL2+'lives/'+id).map((res: Response) =>  res.json());
    }
	//获取留言板
	getMessage(pageIndex,pageSize,videoId){
			return this.httpService.get(APP_SERVE_URL+'VideoComments?pageIndex='+pageIndex+'&pageSize='+pageSize+'&videoId='+videoId).map((res: Response) =>  res.json());
	}
	//发表评论
	PostComment(videoId,Content){
			return this.httpService.post(APP_SERVE_URL+'VideoComments',{
				AccountNo:this.globalData.childAccountNo,
				VideoId:videoId,
				Content:Content
			}).map((res: Response) =>  res.json());
	}
}
