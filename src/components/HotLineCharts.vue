<template>
  <div class="container">
    <div id="chart1" ref="chart1" class="box"></div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
import "echarts/theme/macarons.js";
export default {
  name: "HotLineCharts",
  props: {
    list: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initChart();
    });
  },
  watch: {
    list: {
      handler: function (news) {
        if (news) {
          // console.log(news);
          this.initChart();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created: function () {},
  methods: {
    initChart: function () {
      var chart = document.getElementById("chart1");
      if (chart) {
        let myChart = echarts.init(chart); //你这里啥都不写，初始化个啥？？？
        // 绘制图表
        myChart.setOption(this.setOption("折线图"));
        this.$nextTick(() => {
        myChart.resize();
      });
      }
    },
    setOption: function () {
      var datax = [];
      var datay1 = []; //
      var datay2 = []; //
      for (var i = 0; i < this.list.length; i++) {
        datay1.push(this.list[i].articleSum);
        datay2.push(this.list[i].importScore);
        datax.push(this.list[i].maxTime);
      }
      // console.log(datay1, datax);
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
            // shadowStyle: {
            //   // 阴影指示器样式设置
            //   width: "auto", // 阴影大小
            //   color: "rgba(150,150,150,0.3)", // 阴影颜色
            // },
          },
          // textStyle: {
          //   color: "#333A48", fontsize: 16,
          // },

          // backgroundColor: "#fff",
          // formatter: function (params) {
          //   return params[0].value;
          // },
        },

        //          dataZoom: {
        //              show: true,
        //              realtime: true,
        //              y: 36,
        //              height: 15,
        //              start: 0,
        //              end: 20
        //          },

        // dataZoom: [
        //   {
        //     type: "slider",
        //     z: 0,
        //     height: 15,
        //     startValue: start,
        //     endValue: end,
        //     handleStyle: {
        //       borderCap: "round",
        //     },
        //   },
        //   {
        //     type: "inside",
        //   },
        // ],
        grid: {
          left: "0%",
          top: "20%",
          right: "2%",
          bottom: "4%",
          containLabel: true,
        },
        color: ["#FF9933"],
        // legend: {
        //     // orient: 'vertical',
        //     bottom: 0,
        //     left: 'center',
        //     fontSize: '7',
        //     icon: 'rect',
        //     textStyle: {
        //         color: [ '#FF9933'],
        //       //  height: '50px'
        //     },
        //     data: ['未去重报道量', '去重后报道量']
        // },
        xAxis: {
          type: "category",
          data: datax.reverse(), axisTick: {
            show: false, //刻度不显示
          },
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#E8E8E8", //左边线的颜色
            },
          },
          axisLabel: {
            textStyle: {
              color: "#79808B",
            },
          },
          splitLine: {
            //网格线
            lineStyle: {
              type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
            },
            show: true, //隐藏或显示
          },
        },
        yAxis: {
          type: "value", axisTick: {
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
              color: "#323A52",
            },
          },
        },
        series: [
          {
            // name: "重要性得分",
            lineStyle: { width: 3, shadowBlur: 10, shadowColor: "#FF9933" },
            data: datay1.reverse(),
            color: "#FF9933",
            type: "line",
            // smooth: true,
            smooth: true,
            markPoint: {
              symbolSize: (e) =>
                e
                  ? e.toString().length <= 4
                    ? 40
                    : e.toString().length * 10
                  :40,
              data: [
                { type: "max", name: "Max" }, //最大值标记
                // { type: "min", name: "Min" },
              ],
            },
          },
          // {
          //   show: false,
          //   lineStyle: {
          //     width: 0,
          //     shadowBlur: 10,
          //     shadowColor: "#FF9933",
          //   },
          //   data: datay2,
          //   // color: "#FF9933",
          //   type: "line",
          //   // smooth: true,
          //   smooth: true,
          //   symbol: "none",
          // },
        ],
      };
      return option;
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  background: none;
}
.box {
  /* width: 327px;
  height: 231px; */
  width: 100%;
  height: 200px;
}
</style>