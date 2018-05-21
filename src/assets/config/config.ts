let _ip='www.xinj5.top';
/*----------------------------------------后台Api地址----------------------------------------*/
export const APP_SERVE_URL = 'http://'+_ip+':7001/api/v1/';  //测试地址 http://www.xinj5.top:7000/api/v1/    http://www.xinj0.top:7001/api/v1/
export const SOCKET_SERVE_URL_Home = 'ws://'+_ip+':7501/';//首页  测试 ws://47.97.60.28:4643/    ws://www.xinj0.top:7501/
/*----------------------------------------websocket地址----------------------------------------*/
export const APP_PAY = '';
export const SOCKET_SERVE_URL_Quotes = 'ws://47.97.60.28:4649/';//行情

export const SOCKET_SERVE_URL_Live = 'ws://47.97.60.28:4641/';//直播

export const SOCKET_SERVE_URL_Trade = 'ws://47.97.60.28:5001/';//交易  //47.97.60.28  本地192.168.1.11

export const APP_SERVE_URL2 = 'http://47.97.60.28:7000/api/v2/';

/*----------------------------------------图片地址ip-----------------------------------------*/
export const IMAGE_IP='http://md-resource.oss-cn-hangzhou.aliyuncs.com/';
/*----------------------------------------文件服务器地址----------------------------------------*/
export const FILE_SERVE_URL = 'http://172.16.19.86/kit_file_server/';//文件服务:测试环境

/*----------------------------------------app版本升级服务地址----------------------------------------*/
export const APP_VERSION_SERVE_URL = 'http://172.16.19.86:8111/api/';//app版本升级服务;测试环境,查询app最新版本号,更新日志等信息.

export const IS_DEBUG = true;//是否开发(调试)模式

export const DEFAULT_AVATAR = './assets/img/avatar.png';//用户默认头像
export const PAGE_SIZE = 5;//默认分页大小
export const IMAGE_SIZE = 1024;//拍照/从相册选择照片压缩大小
export const QUALITY_SIZE = 94;//图像压缩质量，范围为0 - 100
export const REQUEST_TIMEOUT = 12000;//请求超时时间,单位为毫秒


export const ENABLE_FUNDEBUG = false;//是否启用fundebug日志监控
export const FUNDEBUG_API_KEY = '3701a358f79b7daa39592255bde6c3c8772efad642883e42dbb65f3f8ffbae11';//去https://fundebug.com/申请key

export const APK_DOWNLOAD = 'http://md-resource.oss-cn-hangzhou.aliyuncs.com/download/qiquan.apk';//android apk下载完整地址,用于android本地升级
export const APP_DOWNLOAD = 'http://47.97.60.28:8005/#/download';//app网页下载地址,用于ios升级或android本地升级失败





