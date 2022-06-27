import Analysis from "../utils/Analysis";
import {getShareToken} from "../api/api";


const dailyMixin = {
    methods: {
        gotoWeb(item,it) {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop) {
                sessionStorage.setItem("scrollTop", '' + scrollTop);
            }
            Analysis.push('enterPage', {
                remark: this.$route.meta.title + '-' + this.$route.query.taskId,
                name: it.url,
                sign: 0
            });
            if(item.BkName==='热点舆情'){
                const getTokenList = {
                    type: "template",
                    content: {
                        templateId: "hotevent-dailyReport",
                        params: {
                            eventId: it.hotEvtId,
                        },
                    },
                };
                let shareToken = "";
                getShareToken(getTokenList)
                        .then((res) => {
                            shareToken = res.data.uuid;
                        })
                        .finally(() => {
                            this.$router.push({
                                path: "/detail",
                                query: {
                                    eventId: it.hotEvtId,
                                    shareToken: shareToken,
                                },
                            });
                        });
            }else {
                if (it.url.indexOf('http') === -1) {
                    window.location.href = 'https://' + it.url
                } else {
                    window.location.href = it.url
                }
            }
        },
        intoPrevScrollTop() {
            let scrollTop = sessionStorage.getItem("scrollTop");
            if (scrollTop) {
                this.$nextTick(() => {
                    document.documentElement.scrollTo({top: parseInt(scrollTop), y: 0})
                    document.body.scrollTo({top: parseInt(scrollTop), y: 0})
                })
            }
        }
    }
}
export default dailyMixin;
