<template>
  <div class="home">
    <div class="header">
      <div class="title-box">
        <span class="title">{{ eventDetail.eventTitle }}</span>
        <div v-if="false">
          <span class="follow" v-if="follow" @click="followChange">
            <img src="./static/images/follow.png" />关注
          </span>
          <span class="follow" v-else @click="followChange">已关注</span>
        </div>
      </div>
      <div class="title-bottom">
        <span class="entName" v-if="eventRelaEntList[0]">
          <img src="./static/images/detail_build.png" />
          {{ eventRelaEntList[0].customerName }}
        </span>
        <span
          v-if="eventDetail.sentiment && eventRelaEntList[0]"
          class="line"
        ></span>
        <span class="senti">{{ eventDetail.sentiment }}</span>
        <span class="time" v-if="eventDetail.eventTime"
          >事件发生时间：{{ eventDetail.eventTime }}</span
        >
      </div>
    </div>
    <div class="content">
      <div class="bend downloadword">
        <div class="abstract">
          {{ eventDetail.abstract }}
        </div>
        <div class="rank-hot">
          <span class="rank" v-if="eventDetail.infoPost"
            ><img src="" alt="" />{{ eventDetail.infoPost }}</span
          >
          <span class="hotScore" v-if="eventDetail.importScore"
            ><img src="" alt="" />热度：{{ eventDetail.importScore }}</span
          >
        </div>
        <div class="downloadline" v-if="true">
          <div class="download" @click="getWord">一键生成报告</div>
        </div>
      </div>
      <div class="bend" v-if="list != ''">
        <div class="center-box">
          <div class="bend title">事件进展</div>
          <div class="center-one" v-loading="list == ''">
            <div v-for="(item, index) in list" :key="index">
              <div>
                <el-timeline :reverse="reverse">
                  <div class="time-line-date-now">
                    {{ item.date.slice(5, 10) }}
                  </div>
                  <div v-for="(info, index) in item.events" :key="index">
                    <el-timeline-item
                      color="#409eff"
                      :timestamp="info.abstract"
                      v-show="info.pubDate"
                    >
                      <div class="time-line-time">
                        {{ info.pubDate.split(" ")[0].substring(0, 5) }}
                      </div>
                      <div class="time-line-tit">
                        <div @click="showDetail(info)">
                          <span v-if="info.subEventTitle"
                            >{{ info.subEventTitle }}
                          </span>
                          <span v-else>{{ info.title }} </span
                          ><span
                            v-for="(it, index) in info.importantEvents"
                            :key="index"
                            :class="
                              it.ruleEmotion == '正面'
                                ? 'label-blue'
                                : it.ruleEmotion == '负面'
                                ? 'label-red'
                                : 'label-yellow'
                            "
                          >
                            {{ it.ruleName }}
                          </span>
                        </div>
                      </div>
                    </el-timeline-item>
                    <div class="time-line-from">
                      <span>来源：</span>
                      <span class="time-line-siteName">
                        {{ info.siteName }}
                      </span>
                    </div>
                  </div>
                </el-timeline>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bend" v-if="meidaList != ''">
        <div class="bend title">媒体观点</div>
        <div class="center-two">
          <div v-for="(item, index) in meidaList" :key="index">
            <div>
              <el-timeline :reverse="reverse">
                <div v-for="(info, index) in item.events" :key="index">
                  <el-timeline-item
                    color="#409eff"
                    :timestamp="info.abstract"
                    v-show="info.pubDate"
                    ><div class="time-line-site">{{ item.siteName }}</div>
                    <div class="time-line-time-two">
                      {{ info.pubDate.split(" ")[0].substring(5, 10) }}
                      {{ info.pubDate.split(" ")[1].substring(0, 5) }}
                    </div>
                    <div class="time-line-tit">
                      <div @click="showDetail(info)">
                        <span v-if="info.subEventTitle"
                          >{{ info.subEventTitle }}
                        </span>
                        <span v-else>{{ info.title }} </span
                        ><span
                          v-for="(it, index) in info.importantEvents"
                          :key="index"
                          :class="
                            it.ruleEmotion == '正面'
                              ? 'label-blue'
                              : it.ruleEmotion == '负面'
                              ? 'label-red'
                              : 'label-yellow'
                          "
                          >{{ it.ruleName }}
                        </span>
                      </div>
                    </div>
                  </el-timeline-item>
                </div>
              </el-timeline>
            </div>
          </div>
        </div>
      </div>
      <div class="bend" v-if="eventAnalysisList.opinionTrend">
        <div class="bend title">舆论分析图</div>
        <div v-if="eventAnalysisList.opinionTrend">
          <div class="chart-title">舆论走势</div>
          <LineCharts :list="eventAnalysisList.opinionTrend"></LineCharts>
        </div>
        <div v-if="eventAnalysisList.sourceDistribution">
          <div class="chart-title">信源分布</div>
          <PieCharts :list="eventAnalysisList.sourceDistribution"></PieCharts>
        </div>
        <div v-if="eventAnalysisList.coreMedia">
          <div class="chart-title">核心媒体报道</div>
          <TreeCharts :list="eventAnalysisList.coreMedia"></TreeCharts>
        </div>
        <div v-if="eventAnalysisList.emotionInclination">
          <div class="chart-title">舆论情感</div>
          <AuditCharts
            :list="eventAnalysisList.emotionInclination"
          ></AuditCharts>
        </div>
      </div>
      <div class="bend nomargin" v-show="enterpriseList != ''" id="capture">
        <div class="bend title downloadpng">
          一图知企业
          <div class="downloadbtn" v-if="true" @click="btn" id="btn">
            一键生成长图
          </div>
        </div>
        <div class="enterprise-tit">
          <div v-if="eventRelaEntList[0]">
            【{{ eventRelaEntList[0].customerName }}】
          </div>
          <span>热点大事记</span>
          <!-- <span @click="btn" id="btn">一键生成长图</span> -->
        </div>
        <div class="center-four">
          <div class="enterprise-box">
            <div v-for="(item, index) in enterpriseList" :key="index">
              <div class="list-title">
                <span class="date-before">{{ item.maxTime }}</span
                ><span class="date-after">{{ item.eventTitle }}</span>
                <div>
                  相关报道量<span>{{ item.articleSum }}</span>
                </div>
              </div>
              <div class="list-info">
                <div v-if="item.eventTrack.length >= 3">
                  <ListTimeline :list="item.eventTrack"></ListTimeline>
                </div>
                <div v-else-if="item.importScore >= 60">
                  <div class="list-info-num">
                    <div>相关报道量</div>
                    <span><i class="square-icon"></i> 报道数目</span>
                  </div>
                  <TreeChartsReport
                    v-if="item"
                    :index="index"
                    :enterpriseList="item"
                  ></TreeChartsReport>
                </div>
                <div v-else>
                  <div class="list-info-abstract" v-show="item.abstract != ''">
                    {{ item.abstract }}
                  </div>
                </div>
              </div>
            </div>
            <div class="hot-chart">
              <div>
                <span v-if="eventRelaEntList[0]" class="hot-chart-tit">
                  {{ eventRelaEntList[0].customerName }}热度变化表<br />
                </span>
                <div class="yellow-icon"><i></i>热度</div>
              </div>
              <div>
                <HotLineCharts
                  v-if="enterpriseList"
                  :list="enterpriseList"
                ></HotLineCharts>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bend" v-if="allList != ''">
        <div class="bend title">全部报道</div>
        <div class="center-five" v-loading="allList == ''">
          <div>
            <div>
              <el-timeline :reverse="false">
                <el-timeline-item
                  v-for="(item, index) in allList"
                  :key="index"
                  color="#409eff"
                  :timestamp="item.abstract"
                  v-show="item.title"
                >
                  <div class="time-line-time-five">
                    {{ item.pubDate.substring(5, 16) }}
                  </div>
                  <div class="time-line-tit">
                    <div>
                      <span v-if="item.title" @click="showDetail(item)"
                        >{{ item.title }}
                      </span>
                    </div>
                  </div>
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
          <div @click="loadMore" v-show="loadMoreList" class="loadMore">
            点击加载更多
          </div>
        </div>
      </div>
    </div>
    <div id="weixin-tip">
      <p>
        <img src="./static/images/live_weixin.png" />
        <img
          @click="close"
          title="关闭"
          class="close"
          src="./static/images/close.png"
        />
      </p>
    </div>
  </div>
</template>


<script>
import {
  getDetail,
  getEntCard,
  getHotlist,
  getRelArticle,
  getAnalysisList,
  wordGenerate,
  exportHotEventInfo,
  addAttention,
  cancelAttention,
} from "../api/detail";

import TreeCharts from "../components/TreeCharts";
import AuditCharts from "../components/AuditCharts";
import LineCharts from "../components/LineCharts";
import PieCharts from "../components/PieCharts";
import ListTimeline from "../components/ListTimeline";
import TreeChartsReport from "../components/TreeChartsReport";
import HotLineCharts from "../components/HotLineCharts";
import html2canvas from "html2canvas";

let oneYear = new Date().setFullYear(new Date().getFullYear() - 1);
let beginTime = getMonth(new Date(oneYear));
let endTime = getMonth(new Date());

function getMonth(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}

export default {
  name: "Detail",
  data() {
    return {
      follow: true,
      allPng: null,
      eventAnalysisList: [],
      reverse: true,
      list: [],
      meidaList: [],
      allList: [],
      eventId: "2021090100037",
      // eventId: "2021121600027",
      eventDetail: [],
      eventRelaEntList: [],
      enterpriseList: [],
      careType: "1",
      isRepeat: 1,
      keyWord: "",
      beginTime: beginTime,
      sortType: "2",
      endTime: endTime,
      pageIndex: 1,
      loadpageIndex: 1,
      isShowDetail: false,
      loadMoreList: true,
      pageSize: 10,
      isdownloadword: false,
      isdownloadexcel: false,
    };
  },
  components: {
    LineCharts,
    PieCharts,
    AuditCharts,
    ListTimeline,
    TreeChartsReport,
    HotLineCharts,
    TreeCharts,
  },
  methods: {
    close() {
      var weixinTip = document.getElementById("weixin-tip");
      weixinTip.style.display = "none";
    },
    isWeixin() {
      var weixinTip = document.getElementById("weixin-tip");
      let wx =
        navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
      if (wx) {
        weixinTip.style.display = "block";
        return true;
      } else return false;
    },
    //事件时间线
    getData: function () {
      let self = this;
      this.loading = false;
      let params1 = {
        careType: "1",
        isRepeat: this.isRepeat,
        eventId: this.eventId,
        keyWord: this.keyWord,
        beginTime: this.beginTime,
        endTime: this.endTime,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        sortType: this.sortType,
      };
      let params2 = {
        careType: "2",
        isRepeat: this.isRepeat,
        eventId: this.eventId,
        keyWord: this.keyWord,
        beginTime: this.beginTime,
        endTime: this.endTime,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        sortType: this.sortType,
      };
      let params3 = {
        careType: "",
        isRepeat: this.isRepeat,
        eventId: this.eventId,
        keyWord: this.keyWord,
        beginTime: this.beginTime,
        endTime: this.endTime,
        pageIndex: this.pageIndex,
        pageSize: 20,
        sortType: this.sortType,
      };

      getRelArticle(params1)
        .then(function (res) {
          self.list = res.data.list;
        })
        .finally(() => {
          setTimeout(() => {
            self.btn("a");
          }, 500);
          this.loading = true;
        });
      getRelArticle(params2)
        .then(function (res) {
          self.meidaList = res.data.list;
        })
        .finally(() => {
          this.loading = true;
        });
      getRelArticle(params3)
        .then(function (res) {
          self.allList = res.data.list;
          self.total = res.data.total;
          if (self.loadpageIndex * self.pageSize >= self.total) {
            self.loadMoreList = false;
          }
        })
        .finally(() => {
          this.loading = true;
        });
    },
    //四图 + 一图
    getDetail() {
      let self = this;
      getDetail({ eventId: this.eventId }).then(function (res) {
        //console.log('****',res)
        self.eventDetail = res.data[0];
        if (self.eventDetail.eventTime)
          self.eventDetail.eventTime = self.eventDetail.eventTime.substring(
            0,
            10
          );
      });
      getEntCard({ eventId: this.eventId }).then(function (res) {
        self.eventRelaEntList = res.data;
        if (res.code == "success") {
          getHotlist({
            entName: self.eventRelaEntList[0].customerName,
            orderType: "1",
            targetTimeFormat: "yyyy-MM-dd",
          }).then(function (res) {
            self.enterpriseList = res.data.list;
          });
        }
      });
      getAnalysisList({ eventId: this.eventId }).then(function (res) {
        //四图数据
        // console.log(res);
        self.eventAnalysisList = res.data;
      });
    },
    //加载更多
    loadMore() {
      var self = this;
      this.loadpageIndex++;
      let params3 = {
        careType: "",
        isRepeat: this.isRepeat,
        eventId: this.eventId,
        keyWord: this.keyWord,
        beginTime: this.beginTime,
        endTime: this.endTime,
        pageIndex: this.loadpageIndex,
        pageSize: 20,
        sortType: this.sortType,
      };
      getRelArticle(params3)
        .then(function (res) {
          self.allList = self.allList.concat(res.data.list);
          self.total = res.data.total;
          if (self.loadpageIndex * self.pageSize >= self.total) {
            self.loadMoreList = false;
          }
          // console.log(self.total, self.allList, "self.allList");
        })
        .finally(() => {
          this.loading = true;
        });
    },
    //点击跳转
    showDetail(item) {
      this.articleid = item.articleId;
    },
    //下载一图知企业
    btn(value) {
      console.log(value)
      if (value == "a" || !this.isWeixin()) {
        let showbtn = document.getElementById("btn");
        showbtn.style.display = "none";
        let element = document.querySelector("#capture");
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
              // console.log(element.scrollWidth, element.scrollHeight);
              newImg.src = canvas.toDataURL("image/png");
              // newImg.src = canvas.toDataURL("image/jpeg",0.7); //生成图片
              // console.log(newImg.src);
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
              // console.log(this.allPng, 999999);
              showbtn.style.display = "block";
            });
        }, 200);
      }
    },
    //导出word
    getWord() {
      if (!this.isWeixin()) {
        console.log(!this.isdownloadword && !this.isdownloadexcel);
        if (!this.isdownloadword && !this.isdownloadexcel) {
          if (this.eventAnalysisList) {
            this.wordFrom = {
              eventId: this.eventId,
              opinionTrend: this.eventAnalysisList.opinionTrend
                ? this.getBase("main1")
                : null,
              sourceDistribution: this.eventAnalysisList.sourceDistribution
                ? this.getBase("main2")
                : null,
              coreMedia: this.eventAnalysisList.coreMedia
                ? this.getBase("main3")
                : null,
              emotionInclination: this.eventAnalysisList.emotionInclination
                ? this.getBase("main4")
                : null,
              relEntFigure: this.allPng,
            };
          }

          //导出word
          wordGenerate(this.wordFrom).finally(() => {
            this.isdownloadword = true;
          });
          //导出excel
          exportHotEventInfo({ eventId: this.eventId }).finally(() => {
            this.isdownloadexcel = true;
          });
        } else {
          console.log(this.isdownloadword, this.isdownloadexcel);
          if (!(this.isdownloadword && this.isdownloadexcel)) {
            this.$message({
              message: "正在下载，请勿重复点击",
              type: "失败",
            });
          } else {
            this.isdownloadword = false;
            this.isdownloadexcel = false;
          }
        }
      }
    },
    //canvas转base64
    getBase(chart) {
      var baseCanvas = document
        .getElementById(chart)
        .getElementsByTagName("canvas")[0];
      if (!baseCanvas) {
        return false;
      }
      return baseCanvas.toDataURL();
    },
    //关注
    followChange() {
      this.follow = !this.follow;
      if (this.follow) {
        addAttention({
          eventId: this.eventId,
          followobjType: "event",
        }).then(() => {});
      } else {
        cancelAttention({
          eventId: this.eventId,
          followobjType: "event",
        }).then(() => {});
      }
    },
  },
  created() {
    this.eventId = this.$route.query.eventId;
    localStorage.setItem("accessToken", this.$route.query.shareToken);
    this.getDetail();
    this.getData();
  },
};
</script>



<style  scoped>
@import "static/detail.css";
.el-timeline-item /deep/ .el-timeline-item__node {
  background: url("./static/images/timeline-circle.png") no-repeat;
  background-size: contain;
  z-index: 1;
}
.el-timeline-item /deep/ .el-timeline-item__node--normal {
  left: -10px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  top: 14px;
}
.center-five .el-timeline-item /deep/ .el-timeline-item__node--normal {
  display: none;
}
.center-five .el-timeline-item /deep/ .el-timeline-item__wrapper {
  position: relative;
  padding-left: 8px;
  padding-top: 20px;
}
.center-five .el-timeline-item:first-of-type /deep/ .el-timeline-item__wrapper {
  padding-top: 0;
}

.el-timeline /deep/ .el-timeline-item {
  padding: 0;
}
.center-five .el-timeline-item /deep/ .el-timeline-item__tail {
  display: none;
}
.el-timeline-item /deep/ .el-timeline-item__tail {
  left: -5px;
  border-left: 1px dotted #3377ff;
  height: 100%;
  position: absolute;
  top: 26px;
  padding: 22px;
}
.el-timeline > div:last-child /deep/ .el-timeline-item .el-timeline-item__tail {
  border: none !important;
}

.center-one
  .el-timeline
  > div:nth-last-child(2)
  /deep/
  .el-timeline-item__tail {
  border: none !important;
}

.el-timeline-item /deep/ .el-timeline-item__wrapper {
  position: relative;
  padding-left: 16px;
}

.el-timeline-item /deep/ .el-timeline-item__timestamp.is-bottom {
  color: rgb(51, 58, 72, 65%);
  line-height: 20px;
  font-weight: normal;
  font-size: 13px;
  padding-top: 6px;
  padding-right: 15px;
}

.el-timeline /deep/ .el-timeline-item::marker {
  color: #fff!important;
}
.center-five .el-timeline /deep/ .el-timeline-item::marker {
  color: #3377ff;
}
.el-timeline /deep/ {
  position: relative;
}
.el-timeline /deep/ .el-timeline-item {
  position: relative;
}
.el-timeline-item:last-child /deep/ .el-timeline-item__tail {
  display: none;
}
</style>
