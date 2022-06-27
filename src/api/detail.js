import httpService from '@/utils/httpService'
import config from '../../config/index'

//热点详情
export function getDetail(params) {
    return httpService({
        url: "/RwTcHotEventList/getDetail",
        method: "GET",
        params: params
    })
}

//舆情分析
export function getAnalysisList(params) {
    return httpService({
        url: "/RwTcHotEventAnalysis/getEchartsData",
        method: "GET",
        params: params
    })
}

//相关报道
export function getRelArticle(params) {
    return httpService({
        url: "/RwTcHotEventList/relArticle",
        method: "GET",
        params: params
    })
}

//企业卡片
export function getEntCard(params) {
    return httpService({
        url: "/RwTcHotEventList/getEntCard",
        method: "GET",
        params: params
    })
}

// 热点列表查询
export function getHotlist(params) {
    return httpService({
        url: "/HotEventList/list",
        method: "GET",
        params: params
    })
}

export function getRelHotEvent(params) {
    return httpService({
        url: "/RwTcHotEventList/getRelHotEvent",
        method: "GET",
        params: params
    })
}

// 导出excel
export function exportHotEventInfo(params) {
    console.log(config.BASE_URL + '/exportExcelHotEvent/exportHotEventInfo?eventId=' + params.eventId);
    return httpService({
        url: '/exportExcelHotEvent/exportHotEventInfo?eventId=' + params.eventId,
        method: 'get',
        responseType: 'blob',
        // params
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => {
        const a = document.createElement('a');
        const blob = new Blob([res], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        a.download = '导出热点详情数据.xls'
        a.setAttribute('href', url);
        a.click();
    })
}

// 导出word
export function wordGenerate(params) {

    //通过FormData构造函数创建一个空对象
    var formdata = new FormData();
    //可以通过append()方法来追加数据
    let ret = ''
    for (let it in params) {
        formdata.append(it, params[it]);

        // ret += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
    }
    params = ret
    return httpService({
        url: '/WordExport/wordGenerate',
        method: 'post',
        responseType: 'blob',
        data: formdata,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((res) => {
        const a = document.createElement('a');
        const blob = new Blob([res], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        a.download = '热点事件报告.doc';
        a.setAttribute('href', url);
        a.click();
    })
}

//关注
export function addAttention(params) {
    return httpService({
      url: '/Attention/addAttention',
      method: 'post',
      data:params
    })
  }
  
  //取消关注
  export function cancelAttention(params) {
    return httpService({
      url: '/Attention/cancelAttention',
      method: 'post',
      data:params
    })
  }