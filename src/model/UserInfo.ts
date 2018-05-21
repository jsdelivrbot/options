export interface UserInfo {
    userId: string;//用户id
    account: string;//账户（手机号）
    nickname: string;//昵称
    portrait: string;//头像
    avatarPath: string;//头像path
    avatarId:string;//头像id
    token: string;//令牌
    refreshToken: string;//刷新token
    childAccountNo: number;//子账户
    
    funds: number;//账户余额
    authState: boolean;//实名认证状态
    isMentionPassword: boolean;//是否设置提现密码 
    isBankCard: boolean;//是否绑定银行卡
}
export interface Coupon {
    id : number;//优惠券id
    couponName : string;//优惠券名称 ,
    remark : string;//备注 
    validStartTime: string;//有效期开始时间 ,
    validEndTime : string;// 有效期结束时间 ,
    couponType : number;//优惠券类型，1为现金券，2为折扣券 ,
    faceValue : number;//面值
}
