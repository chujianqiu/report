<template>
  <div v-if="list.blocks.length>0" class="bg">
    <div>
      <div class="top">
        <div class="top-one">
          <div class="top-desc">因为专注 · 所以专业</div>
          <div class="period-wrp">
            <div class="period-box">
              <div class="period-date">
                {{ systemTime }}
              </div>
              <div class="period-title-wrp">
                <div class="period-title">
                  {{ newTitle }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="reportType==='day'" class="bg-wrp">
          <img src="../views/static/images/daily_title.png">
        </div>
        <div v-show="reportType==='week'" class="bg-wrp">
          <img src="../views/static/images/weekly_title.png">
        </div>
      </div>
      <div class="daily-list-wrp">
        <div class="daily-card daily-card-padding">
          <div v-show="reportType==='day'" class="first-item">24小时要闻速递</div>
          <div v-show="reportType==='week'" class="first-item">一周要闻速递</div>
          <template v-for="(item,index) in list.ywsd">
            <div :key="index" class="fast-item" :class="item.bkName==='热点舆情'?'hot':''"  @click="gotoWeb(item.url)">
              <span class="tag"
                    :class="item.bkName==='突发事件'?'tufa-tag':item.bkName==='重点企业'?'zhongdian-tag':item.bkName==='重点风险企业'?'zhongdian-tag':item.bkName==='热点舆情'?'redian-tag':'changcheng-tag'">
                {{ item.bkName }}
              </span>
              {{ item.articleTitle }}
            </div>
          </template>
        </div>
        <div v-for="(item,key) in list.blocks" :key="key" v-show="item.BkData.length>0"
             class="daily-card daily-card-padding">
          <html-template :item="item" :reportType="reportType" :index="key"/>
        </div>
      </div>
      <!--   往期报告   -->
      <template v-if="list.threeReports.length>0">
        <div class="prev-wrp">
          <div class="prev-title">
            <img src="../views/static/images/prev_title.png">
          </div>
          <div class="prev-list">
            <div v-for="(item,index) in list.threeReports" :key="'item'+index" class="prev-item"
                 @click="goto(item.url)">
              <div class="prev-item-inner">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {Utils} from "../utils/Utils";
import {wxShareHome} from "../utils/wxShareHome";
import Analysis from "../utils/Analysis";
import dailyMixin from "../mixins/dailyMixin";
import axios from "axios";
import HtmlTemplate from "../components/HtmlView";
import html2canvas from "html2canvas";


export default {
  name: 'HtmlView',
  mixins: [dailyMixin],
  components: {
    HtmlTemplate
  },
  data() {
    return {
      list: {
        blocks: [],
        ywsd: [],
        threeReports: []
      },
      systemTime: '',
      reportType: '',
      orgName: '',
      abstracts: '',
      title: '',
      allPng: '',
      elementList: []
    }
  },
  computed: {
    newTitle: function () {
      const header = this.title === '' ? '第零期' : this.title === null ? '第零期' : this.title
      const startIndex = header.indexOf('第')
      const endIndex = header.indexOf('期')
      return header.slice(startIndex, endIndex + 1)
    }
  },
  methods: {
    goto(url) {
      window.location.href = url
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    btn(value) {
      let element = document.querySelector(".bg");
      let elementList = document.querySelectorAll('.card-body')
      let moreBtn = document.querySelectorAll('.more-btn')
      for (let k = 0; k < moreBtn.length; k++) {
        moreBtn[k].innerHTML = '收起'
      }
      for (let i = 0; i < elementList.length; i++) {
        if (elementList[i].style.display === 'none') {
          elementList[i].style.display = 'block'
          this.elementList.push(elementList[i])
        }
      }
      setTimeout(() => {
        html2canvas(element, {
          allowTaint: true, // 默认值 false 是否允许跨域图像污染画布
          useCORS: true, //  默认值 false 是否尝试使用CORS从服务器加载图像
          scale: 2, //  默认值 window.devicePixelRatio 用于渲染的比例。默认为浏览器设备像素比率。
          windowHeight: element.scrollHeight,
          height: element.scrollHeight,
        })
            .then((canvas) => {
              let newImg = new Image();
              newImg.setAttribute("crossOrigin", "Anonymous");
              newImg.src = canvas.toDataURL("image/png");
              if (value != "a") {
                let a = document.createElement("a");
                document.body.appendChild(a);
                a.href = newImg.src;
                a.download = "一图知企业";
                a.click();
                document.body.removeChild(a);
              } else {
                this.allPng = newImg.src;
              }
            })
            .finally(() => {
              for (let i = 0; i < this.elementList.length; i++) {
                this.elementList[i].style.display = 'none'
              }
              for (let k = 0; k < moreBtn.length; k++) {
                moreBtn[k].innerHTML = '查看更多'
              }
            });
      }, 200);
    },
    getList() {
      const myDate = new Date()
      const year = myDate.getFullYear()
      const month = myDate.getMonth() + 1
      const date = myDate.getDate()
      this.systemTime = ' ' + year + '/' + month + '/' + date
      const currentPath = window.document.location.href
      localStorage.setItem('url', currentPath)
      const parseQueryString = (currentPath) => {
        const Url = currentPath.split('?')[1]
        const newUrl = Url.split('&')
        let object = {}
        for (let i = 0; i < newUrl.length; i++) {
          object[newUrl[i].split('=')[0]] = newUrl[i].split('=')[1]
        }
        return object
      }
      const query = parseQueryString(currentPath).taskId
      axios.post(`https://cloud.amardata.com/operateflowApi/compreevt/${query}/reportDetail`).then(res => {
        if (res.data.code === 200 && Object.keys(res.data).length !== 0) {
          this.list.blocks = res.data.data.blocks
          this.list.ywsd = res.data.data.ywsd.BkData
          this.title = res.data.data.title
          this.abstracts = res.data.data.abstracts
          this.list.threeReports = res.data.data.threeReports
          this.reportType = res.data.data.reportType
          let shareUrl = window.location.href
          Utils.getEnvironment(() => {
            wxShareHome({
              url: shareUrl,
              title: res.data.data.title,
              desc: res.data.data.abstracts,
              imgUrl: 'https://cdn.amardata.com/voiceexpress/images/bm.png'
            })
          })
        }
      })
    }
  },
  mounted() {
    this.getList()
  },
  created() {
    Analysis.push('enterPage', {
      remark: this.$route.query.taskId,
      name: this.$route.meta.title,
      sign: 1
    });
  }
}
</script>

<style scoped lang="less">
.bg {
  //background: #0E47C8 url("https://cdn.amardata.com/voiceexpressh5/images/bg.png") no-repeat left top;
  background: #0E47C8 url(../views/static/images/bg.png) no-repeat left top;
  overflow: hidden;
  max-width: 640px;
  margin: 0 auto;
  background-size: 100% auto;
}

.top {
  box-sizing: border-box;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-size: 282px auto;
}

.top > div {
  padding: 0 24px;
}

.top-desc {
  padding: 30px 0px;
  opacity: 0.65;
  font-size: 12px;
}

.top-one {
  height: 90px;
  display: flex;
  justify-content: space-between;
}

.top-three {
  font-size: 16px;
  letter-spacing: 2.6px;
}

.bg-wrp {
  flex: 1;

  img {
    width: 92%;
  }
}

.period-wrp {
  padding-left: 20px;
  padding-top: 30px;
  position: relative;
}

.period-box {
  color: #ffffff;
  height: 30px;
  line-height: 15px;
  padding: 0 13px;
  text-align: right;
}

.period-wrp:after {
  display: inline-block;
  content: " ";
  width: 16px;
  height: 100%;
  border-radius: 9px;
  //background: url("https://cdn.amardata.com/voiceexpressh5/images/trun.png") no-repeat;
  background: url(../views/static/images/trun.png) no-repeat;
  position: absolute;
  top: 32px;
  left: 92%;
  background-size: 17px 30px;
}

.period-title {
  font-size: 13px;
  opacity: 0.85;
}

.period-date {
  font-size: 10px;
  opacity: 0.85;
}

.prev-title {
  text-align: center;
  padding: 5px 0;
}

.prev-wrp {
  padding: 20px;
}

.prev-title img {
  width: 224px;
  height: 23px;
}

.prev-item {
  padding: 4px;
  margin: 15px 0;
}

.prev-item-inner {
  border-radius: 5px;
  //background: url("https://cdn.amardata.com/voiceexpressh5/images/prev-item-bg.png");
  background: url(../views/static/images/prev-item-bg.png);
  color: #ffffff;
  padding: 10px 0 10px 26px;
  position: relative;
  text-align: left;
  font-size: 13px;
  background-size: 100% 100%;
}

.prev-item-more {
  padding: 0 125px;
  text-align: center;
  font-size: 13px;

  img {
    width: 100%;
  }

  span {
    opacity: 0.65;
    color: #ffffff;
  }
}

.daily-list-wrp {
  padding: 0 15px;
}

.daily-list-wrp .daily-card-padding {
  padding-top: 30px;
  margin-top: 30px;
}

.daily-card {
  background-color: #ffffff;
  border-radius: 5px;
  padding: 15px;
  margin: 15px 0;
  position: relative;

  .card-title {
    position: absolute;
    left: 50%;
    top: -13px;
    margin-left: -81px;
    text-align: center;
    width: 172px;
    height: 38px;
    line-height: 38px;
    color: #FFFFFF;
    font-size: 16px;
    //background: url("https://cdn.amardata.com/voiceexpress/images/model_title.png") no-repeat center center;
    background: url(../views/static/images/model_title.png) no-repeat center center;
    background-size: 172px 38px;
  }

  .first-item {
    position: absolute;
    left: 0;
    top: -15px;
    text-align: center;
    width: 100%;
    height: 38px;
    line-height: 38px;
    color: #FFFFFF;
    font-size: 16px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    //background: url("https://cdn.amardata.com/voiceexpressh5/images/first-item-bg.png") no-repeat center center;
    background: url(../views/static/images/first-item-bg.png) no-repeat center center;
  }

  .tag {
    display: inline-block;
    padding: 1px 8px;
    font-size: 11px;
    font-weight: 400;
    margin: 2px;
    line-height: 16px;
  }


  .primary-tag {
    color: #3377FF;
    background-color: #E5EEFF;
  }

  .warning-tag {
    color: #FF9933;
    background-color: #FFF0E1;
  }

  .danger-tag {
    color: #EB5139;
    background-color: #FCE5E2;
  }

  .title {
    font-size: 15px;
    font-weight: 500;
    color: #333348;
    line-height: 21px;

    .remark-type {
      color: #3377FF;
    }
  }

  .context {
    font-size: 12px;
    font-weight: 400;
    color: rgba(51, 51, 72, 0.65);
    line-height: 18px;
  }

  .label {
    color: rgba(51, 58, 72, 0.45);
    font-size: 12px;
  }

  .value {
    font-size: 12px;
    font-weight: 400;
    color: #333348;
    line-height: 14px;
    margin-right: 20px;
  }

  .ent-tag {
    font-size: 11px;
    font-weight: 400;
    color: rgba(51, 58, 72, 0.85);
    line-height: 13px;
    background: #EDF1FA;
    display: inline-block;
    padding: 2px 8px;
  }
}

.card-body {
  padding: 20px 0;
  border-bottom: 1px solid rgba(51, 58, 72, 0.15);
}

.site-wrp {
  padding: 5px 0;
}

.tufa-tag {
  border: 1px solid #FFBF3D;
  background: #FFffff;
  color: #FFBF3D;
}

.zhongdian-tag {
  border: 1px solid #FF9933;
  background: #ffffff;
  color: #FF9933;
}

.redian-tag {
  border: 1px solid #EB5139;
  background: #ffffff;
  color: #EB5139;
}

.changcheng-tag {
  border: 1px solid #C7A153;
  background: #ffffff;
  color: #C7A153;
}

.site-wrp .ent-tag {
  margin: 2px;
}

.fast-item {
  font-size: 15px;
  font-weight: 500;
  color: #333348;
  line-height: 23px;
  padding-left: 20px;
  //background: url("https://cdn.amardata.com/voiceexpress/images/list_style.png") no-repeat 0px 5px;
  background: url(../views/static/images/list_style.png) no-repeat 0 8px;
  background-size: 11px 7px;
  margin: 15px 0;
}

.hot {
  background: url(../views/static/images/hot-icon.png) no-repeat 0 5px;
  background-size: 16px 16px;
}
.more-btn {
  font-size: 16px;
  color: #3377FF;
  text-align: center;
  padding: 20px 0;
}

.more-btn:after, .more-btn:before {
  display: inline-block;
  content: " ";
  width: 9px;
  height: 9px;
  border-radius: 9px;
  background-color: #FFBF3D;
  margin: 0 15px;
}
</style>

