declare var Wechat: any;  // 此处声明plugin.xml中clobbers对应的值  

export interface WechatPayParam {  
  partnerid: string;  
  prepayid: string;  
  noncestr: string;  
  timestamp: string;  
  sign: string;  
}  

export class WechatPlugin {  

  public static isInstalled() {  
    return new Promise((resolve, reject) => {  
      Wechat.isInstalled(result => {  
        resolve(result);  
      }, error => {  
        reject(error);  
      });  
    });  
  }  

  public static sendPaymentRequest(params: WechatPayParam) {  
    return new Promise((resolve, reject) => {  
      Wechat.sendPaymentRequest(params, result => {  
        resolve(result);  
      }, error => {  
        reject(error);  
      });  
    });  
  }  
} 