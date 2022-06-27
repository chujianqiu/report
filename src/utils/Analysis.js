import httpService from "./httpService";
import moment from "moment/moment";

let params = {
    "userId": "",
    "deviceId": getUUID(),
    "pageName": "",
    "startTime": "",
    "endTime": "",
    "pageStayTime": "",
    "params": "",
    "inputTime": "",
    "sysHeader": "",
    "remark": "",
    "deviceType": "",
    "pageType": "",
    "prevPageName": "",
    "appStartTime": "",
    "lastAppStartTime": "",
    "phoneModel": "",
    "clientIp": "",
    "networkType": "",
    "versionNumber": "",
    "systemVersion": "",
    "mac": "",
    "channel": "",
    "realClientIp": ""
}
getSysInfo();

function getUUID() {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = createUUID();
        localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
}

function createUUID() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }

    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}
function getSysInfo() {
    // params.networkType = navigator.connection.effectiveType
    // params.systemVersion = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/)[1].replace(/_/g,".");

    // 获取系统网络环境
    params.networkType = navigator.connection && navigator.connection.effectiveType;

    // 获取系统版本和版本号
    if (navigator.userAgent.indexOf('iPhone') > -1) {
        params.systemVersion = 'ios';
        params.versionNumber = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/)[1].replace(/_/g, ".");
    } else {
        params.systemVersion = 'android';
    }

}
function send(params) {
    return httpService({
        "url": "/appLog/addPostAppUserBehavoirAnalysisLogs",
        method: 'post',
        data: params,
    })
}
const Analysis = {
    push(type, option) {
        params.startTime = moment().format('YYYY-MM-DD HH:mm:ss')
        if (type == 'enterPage') {
            params.pageName = option.name;
            params.remark = option.remark;
            if (!option.sign && params.systemVersion == 'ios') {
                var List = []
                if (!localStorage.getItem('Length') || localStorage.getItem('Length') >= 4) {
                    if (localStorage.getItem('Length') >= 4) {
                        send({
                            list: JSON.parse(localStorage.getItem('List'))
                        }).then((res) => {
                            if (res.code == 'success') {
                                localStorage.removeItem('List')
                                localStorage.removeItem('Length')
                            }
                        })
                    }
                    else {
                        localStorage.setItem('Length', 0)
                        List = [params]
                        localStorage.setItem('List', JSON.stringify(List))
                    }
                }
                else {
                    var length = Number(localStorage.getItem('Length'))
                    var obj = JSON.parse(localStorage.getItem('List'))
                    obj[++length] = params
                    localStorage.setItem('List', JSON.stringify(obj))
                    localStorage.setItem('Length', length)
                }
            }
            else {
                send({
                    list: [params]
                })
            }

        }
    }


}
export default Analysis;
