const wx = require('weixin-js-sdk');
function getEnvironment(callback) {
    let ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
        wx.miniProgram.getEnv((res)=>{
            if (res.miniprogram) {
                // 微信小程序里
                callback && callback("miniProgram")
            } else {
                // 微信浏览器中
                callback && callback("wxBrowse")
            }
        })
    }else{
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
            callback && callback("android")
        } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
            callback && callback("android")
        } else { //pc
            callback && callback("browse")
        }
    }
}
export const Utils = {
    getEnvironment: getEnvironment,
}
