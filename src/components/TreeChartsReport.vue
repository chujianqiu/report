<template>
  <div class="container">
    <div :id="'main' + (index + 5)" ref="main5" class="box"></div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
import "echarts/theme/macarons.js";
export default {
  name: "TreeChartsReport",
  props: {
    enterpriseList: {
      type: Object,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      list: [],
      articleSum: 0,
      reportStartCount1Day: null,
      reportStartCount3Day: null,
      reportStartCount7Day: null,
    };
  },
  mounted: function () {
    //  setTimeout(this.initChart(),2000);
    this.$nextTick(function () {
      this.initChart();
    });
  },
  created: function () {},
  methods: {
    initChart: function () {
      this.list = this.enterpriseList;
      this.articleSum = this.list.articleSum;
      this.reportStartCount1Day = this.list.reportStartCount1Day;
      this.reportStartCount3Day = this.list.reportStartCount3Day;
      this.reportStartCount7Day = this.list.reportStartCount7Day;
      var chart = document.getElementById("main" + (this.index + 5));
      if (chart) {
        let myChart = echarts.init(chart); //你这里啥都不写，初始化个啥？？？
        // 绘制图表
        myChart.setOption(this.setOption("横向柱状图"));
      }
    },
    setOption: function () {
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {
              // 直线指示器样式设置
              color: "#48b",
              width: 0,
              type: "solid",
            },
            shadowStyle: {
              // 阴影指示器样式设置
              width: "auto", // 阴影大小
              color: "rgba(24, 120, 235, 0.04)", // 阴影颜色
            },
          },
        },

        // legend: {
        //     data: ['利润']
        // },
        grid: {
          left: "3%",
          right: "10%",
          bottom: "8%",
          top: "8%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "value",
            boundaryGap: false,

            axisLine: {
              show: false, //底下线不显示
              lineStyle: {
                type: "dashed",
                color: "#E8E8E8", //左边线的颜色
              },
            },
            axisLabel: {
              show: false,
              textStyle: {
                color: "#6D7278", //坐标值得具体的颜色
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#E8E8E8"],
                width: 1,
                type: "dashed",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
            },

            data: ["至今", "事发七天内", "事发三天内", "事发日"],
            axisLine: {
              show: false,
              lineStyle: {
                type: "solid",
                color: "#E8E8E8",
              },
            },
            axisLabel: {
              textStyle: { fontSize: 10, color: "#6D7278" },
            },
          },
        ],
        series: [
          {
            name: "报道量",
            type: "bar",
            label: {
              show: true,
              color: "#515763",
              position: "right",
              fontWeight: "bold",
              fontSize: 12,
            },
            barWidth: 5,
            //设置柱状图渐变颜色
            itemStyle: {
              normal: {
                color: "#5C6DFF", // 100% 处的颜色
                //柱形图圆角，初始化效果
                barBorderRadius: [0, 10, 10, 0],
              },
              emphasis: {
                barBorderRadius: [0, 10, 10, 0],
              },
            },

            data: [
              this.articleSum,
              this.reportStartCount7Day,
              this.reportStartCount3Day,
              this.reportStartCount1Day,
            ],
          },
        ],
      };
      return option;
    },
  },
};
</script>
<style scoped>
.container {
  background: none;
}
.box {
  /* width: 327px;
  height: 231px; */
  width: 100%;
  height: 125px;
}
</style>