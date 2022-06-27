<template>
  <div>
    <div class="card-title">{{ item.BkName }}</div>
    <template v-for="(it,index) in item.BkData">
<!--      v-show="showMore || index < moreCount"-->
      <div
          v-show="acciLen * 5 > index"
          :key="'list2'+index"
          class="card-body"
          @click="gotoWeb(item,it)"
      >
        <div class="title">
          <div v-if="index < 3 && item.BkName==='热点舆情'" class="hot-info">
            <i>NO.{{ Number(index) + 1 }}</i
            ><span v-if="it.d7EvtHotScore&&reportType==='week'" class="seco-text"
          >{{ it.d7EvtHotScore }}热度</span
          ><span v-else-if="it.h24EvtHotScore&&reportType==='day'" class="seco-text"
          >{{ it.h24EvtHotScore }}热度</span
          >
          </div>
          <h1 v-if="it.dataSrc==='热点事件'" style="font-size: 15px">{{ it.subeventTitle }}</h1>
          <h1 v-else style="font-size: 15px">{{ it.articleTitle }}</h1>
          <span v-for="(label,i) in it.evtLabelList" v-show="getParam(label)!=='null'&&getParam(label)!==''" :key="i"
                :class="getLevel(label)==='L' ?'primary-tag':getLevel(label)==='M' ?'warning-tag':'danger-tag'"
                class="tag">{{
              getParam(label)
            }}</span>
        </div>
        <div class="site-wrp">
          <span class="label">发布时间：</span>
          <span class="value">{{ it.publishDate }}</span>
          <span class="label">发文媒体：</span>
          <span class="value">{{ it.siteName }}</span>
        </div>
        <div class="context">{{ it.evtAbstract }}</div>
        <div class="site-wrp" v-show="it.evtEntList!==null&&it.evtEntList.length>0">
          <span class="label">涉及企业：</span>
          <span v-for="(company,j) in it.evtEntList" v-show="company!==null&&company!==''" :key="j"
                class="ent-tag">{{ company }}</span>
        </div>
      </div>
    </template>
<!--    <div v-if="item.BkData.length>5">-->
<!--      <div v-if="!showMore" class="more-btn" @click="showMoreList()">查看更多</div>-->
<!--      <div v-if="showMore" class="more-btn" @click="clearList">收起</div>-->
<!--    </div>-->
    <div v-if="item.BkData.length > 5">
      <div
          v-if="item.BkData.length > acciLen * 5 "
          class="more-btn"
          @click="showMoreList"
      >
        查看更多
      </div>
      <div v-else class="more-btn" @click="acciLen = 1">收起</div>
    </div>
  </div>
</template>
<script>
import dailyMixin from "../mixins/dailyMixin";
import Analysis from "../utils/Analysis";

export default {
  props: ['item', 'reportType','index'],
  mixins: [dailyMixin],
  data() {
    return {
      showMore: false,
      moreCount: 5,
      acciLen: 1,
      num:[]
    }
  },
  created() {
    Analysis.push('enterPage', {
      remark: this.$route.query.taskId,
      name: this.$route.meta.title,
      sign: 1
    });
    this.intoPrevScrollTop()
  },
  methods: {
    showMoreList() {
      this.acciLen = this.acciLen+1
    },
    getParam(val) {
      if (!val) {
        return ''
      } else {
        JSON.stringify(val)
        return JSON.stringify(val).split('@')[0].replace('"', '')
      }
    },
    getLevel(val) {
      if (!val) {
        return ''
      } else {
        JSON.stringify(val)
        return JSON.stringify(val).split('@')[1].replace('"', '')
      }
    }
  },
}
</script>
<style lang="less" scoped>
.bg {
  //background: #0E47C8 url("https://cdn.amardata.com/voiceexpressh5/images/bg.png") no-repeat left top;
  background: #0E47C8 url(../views/static/images/bg.png) no-repeat left top;
  overflow: hidden;
  max-width: 640px;
  margin: 0 auto;
  background-size: 100% auto;
}

.top {
  height: 240px;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 15px 50px 0px;
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
  background: url(../views/static/images/list_style.png) no-repeat 0 5px;
  background-size: 11px 7px;
  margin: 15px 0;
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
.hot-info {
  padding-bottom: 2px;
  font-size: 12px;
  font-family: YouSheBiaoTiHei;
  color: #eb5139;
  font-weight: 600;
  line-height: 16px;
  display: flex;
}

.hot-info-grey {
  color: rgba(51, 51, 72, 0.65);
  padding-top: 6px;
}

.hot-info-grey span {
  font-weight: 400;
  color: rgba(235, 81, 57, 1);
}
.seco-text {
  padding-left: 6px;
  padding-bottom: 4px;
  color: rgba(51, 51, 72, 0.45);
  font-weight: 400;
}
</style>
