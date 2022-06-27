<template>
  <div class="container">
    <div id="main1" ref="main1" class="box"></div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");

import "echarts/theme/macarons.js";
export default {
  name: "linecharts",
  props: {
    list: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  mounted: function () {
    //  setTimeout(this.initChart(),2000);
    this.$nextTick(function () {
      this.initChart();
    });
  },
  created: function () {
    //console.log(')))))))))',this.list)
  },
  methods: {
    initChart: function () {
      var chart = document.getElementById("main1");
      if (chart) {
        let myChart = echarts.init(chart); //你这里啥都不写，初始化个啥？？？
        // 绘制图表
        myChart.setOption(this.setOption("折线图"));
      }
    },
    setOption: function () {
      var datax = [];
      var datay1 = []; // 未去重相关报道量
      var datay2 = []; // 去重后相关报道量

      for (var i = 0; i < this.list.length; i++) {
        datay1.push(this.list[i].articleSum);
        datay2.push(this.list[i].noRepeatSum);
        datax.push(this.list[i].timeSection);
      }
      let min = Math.min(...datay1);
      let max = Math.max(...datay1);
      var start = datax.length - 7;

      var end = datax.length - 1;
      var option = {
        // title: {
        //     text: '舆论走势',
        //     textStyle: {
        //       color: '#3D7FFF',
        //       fontSize: '20'
        //     },
        //     // subtext: '副标题',
        //     subtextStyle: {
        //       color: '#3D7FFF'
        //     },
        //     padding: [5, 0, 20, 0],  // 位置
        //     x:'center',
        //     y:'top',
        //     textAlign:'left'
        //   },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {
              // 直线指示器样式设置
              color: "rgba(24, 120, 235, 0.2)",
              width: 1,
              type: "solid",
            },
            shadowStyle: {
              // 阴影指示器样式设置
              width: "auto", // 阴影大小
              color: "rgba(150,150,150,0.3)", // 阴影颜色
            },
          },
        },

        //          dataZoom: {
        //              show: true,
        //              realtime: true,
        //              y: 36,
        //              height: 15,
        //              start: 0,
        //              end: 20
        //          },

        dataZoom: [
          {
            type: "slider",
            z: 0,
            height: 11,
            startValue: start,
            endValue: end,
            handleStyle: {
              borderCap: "round",
            },
          },
          {
            type: "inside",
          },
        ],
        grid: {
          left: "5%",
          top: "15%",
          right: "4%",
          bottom: "22%",
          containLabel: true,
        },
        color: ["#8F65FF", "#EB5139"],
        // legend: {
        //     // orient: 'vertical',
        //     bottom: 0,
        //     left: 'center',
        //     fontSize: '7',
        //     icon: 'rect',
        //     textStyle: {
        //         color: [ '#8F65FF',"#EB5139"],
        //       //  height: '50px'
        //     },
        //     data: ['未去重报道量', '去重后报道量']
        // },
        xAxis: {
          type: "category",
          data: datax,
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#E8E8E8", //左边线的颜色
            },
          },
          axisTick: {
            show: false, //刻度不显示
          },
          axisLabel: {
            textStyle: {
              fontWeight: "bold",
              color: "rgba(51, 51, 72, 0.65)",
              fontSize: "10",
            },
          },
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false, //刻度不显示
          },
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#E8E8E8",
            },
          },
          splitLine: {
            //网格线
            lineStyle: {
              type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
            },
            show: true, //隐藏或显示
          },
          axisLabel: {
            textStyle: {
              fontWeight: "bold",
              color: "rgba(51, 51, 72, 0.65)",
              fontSize: "10",
              //  height: '50px'
            },
          },
        },
        series: [
          {
            data: datay2,
            name: "去重后报道量",
            color: "#EB5139",
            type: "line",
            // smooth: true,
            smooth: true,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(235, 81, 57, 0.5)",
                },
                {
                  offset: 1,
                  color: "rgba(246, 138, 107, 0) ",
                },
              ]),
            },
            symbol: (value) => {
              if (+value === min || +value === max) {
                return "circle";
              }
              return "none";
            },
          },
          {
            markPoint: {
              symbolSize: (e) =>
                e
                  ? e.toString().length <= 4
                    ? 35
                    : e.toString().length * 5
                  : 30,
              data: [
                { type: "max", name: "Max", width: "10" }, //最大值标记
                // { type: "min", name: "Min" },
              ],
            },
            data: datay1,
            name: "未去重报道量",
            color: "#8F65FF",
            type: "line",
            // smooth: true,
            smooth: true,
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
  height: 200px;
}
</style>