import { Injectable } from '@angular/core';
import { $WebSocket,WebSocketSendMode } from 'angular2-websocket/angular2-websocket';
import {Events,AlertController} from "ionic-angular";
import { load } from "protobufjs";
import {Subject} from 'rxjs';
@Injectable()
export class SocketService {
    public _socket;
    public _tradeSocket;
    public _liveSocket;
    
    private OrderInfo:any;
	private SocketRequest:any;
	private SocketRespone:any;
	private OMSMessage:any;
    private Reply:any;
    private socketDec1:any;//反序列化后的数据
	private socketDec2:any;//反序列化后的数据
	private socketDec3:any;//反序列化后的数据
    private socketDecDate:any;//反序列化后的数据
    constructor(
        private events:Events,
        private alertCtrl: AlertController
    ){
        // let _that=this;
        // load("assets/proto/TradeSer.proto", function(err, root) {
		// 	if (err)
		// 	  console.log('err',err)
		// 	// example code
		// 	_that.OrderInfo = root.lookupType("TradeSer.OrderInfo");
		// 	_that.SocketRequest = root.lookupType("TradeSer.SocketRequest");
		// 	_that.SocketRespone = root.lookupType("TradeSer.SocketRespone");
		// 	_that.Reply = root.lookupType("TradeSer.Reply");
		// 	_that.OMSMessage = root.lookupType("TradeSer.OMSMessage");
		// });
    }
    get liveSocket(){
        return this._liveSocket;
    }
    set liveSocket(url){
        this._liveSocket = new $WebSocket(url,null,JSON.parse('{"reconnectIfNotNormalClose": "true"}'));
        this._liveSocket.setSend4Mode(WebSocketSendMode.Direct);
        this._liveSocket.onMessage(
			(msg: MessageEvent)=> {
                this.events.publish('liveSocketData:live',msg);
                this.events.publish('liveSocketData:record',msg);
            }
        )
    }

    get socket(){
        return this._socket;
    }
    set socket(url) {
        this._socket = new $WebSocket(url,null,JSON.parse('{"reconnectIfNotNormalClose": "true"}'));
        this._socket.setSend4Mode(WebSocketSendMode.Direct);
        this._socket.onMessage(
			(msg: MessageEvent)=> {
                // this.events.publish('quotesSocketData:product',msg);
                // this.events.publish('quotesSocketData:positons',msg);
                this.events.publish('homeSocket',msg);
            }
        )
    }
    get tradeSocket(){
        return this._tradeSocket;
    }
    set tradeSocket(url) {
        this._tradeSocket = new $WebSocket(url,null,JSON.parse('{"reconnectIfNotNormalClose": "true"}'),'arraybuffer');
        this._tradeSocket.onMessage(
			(msg: MessageEvent)=> {
                this.events.publish('tradeSocketData:purchase',msg)
                this.events.publish('tradeSocketData:positions',msg)
                this.events.publish('tradeSocketData:delegation',msg)
            }
        )
    }
}