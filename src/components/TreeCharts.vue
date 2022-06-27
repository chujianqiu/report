<template>
  <div class="container">
    <div id="main3" ref="main3" class="box"></div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
import "echarts/theme/macarons.js";
export default {
  name: "treecharts",
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
  created: function () {},
  methods: {
    initChart: function () {
      var chart = document.getElementById("main3");
      if (chart) {
        let myChart = echarts.init(chart); //你这里啥都不写，初始化个啥？？？
        // 绘制图表
        myChart.setOption(this.setOption("横向柱状图"));
      }
    },
    setOption: function () {
      var datax = [];
      var datay = [];

      var min;
      //遍历数组，默认arr中的某一个元素为最大值，进行逐一比较
      for (var i = 0; i < this.list.length; i++) {
        //外层循环一次，就拿arr[i] 和 内层循环arr.legend次的 arr[j] 做对比
        for (var j = i; j < this.list.length; j++) {
          if (
            Number(this.list[i].articleSum) > Number(this.list[j].articleSum)
          ) {
            //如果this.list[j]大就把此时的值赋值给最大值变量max
            min = this.list[j];
            this.list[j] = this.list[i];
            this.list[i] = min;
          }
        }
      }
      for (var u = 0; u < this.list.length; u++) {
        datax.push(this.list[u].articleSum);
        datay.push(this.list[u].sitename);
      }
      var option = {
        // backgroundColor: '#fff',//白色背景
        // title: {
        //     text: '核心媒体报道',
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
        //     data: ['报道量']
        // },
        grid: {
          left: "3%",
          right: "8%",
          bottom: "5%",
          top: "6%",
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

              textStyle: {fontWeight: "bold",
              color: "rgba(51, 51, 72, 0.65)",//坐标值得具体的颜色
              fontSize: "10",
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

            data:
              datay.length >= 6
                ? datay.splice(datay.length - 6, datay.length)
                : datay,
            axisLine: {
              show: false,
              lineStyle: {
                type: "solid",
                color: "#E8E8E8",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#6D7278",
              },
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
              fontSize: 10,
            },
            barWidth: 7,
            //设置柱状图渐变颜色
            itemStyle: {
              normal: {
                color: "#8F65FF", // 100% 处的颜色
                //柱形图圆角，初始化效果
                barBorderRadius: [0, 10, 10, 0],
              },
              emphasis: {
                barBorderRadius: [0, 10, 10, 0],
              },
            },

            data:
              datax.length >= 6
                ? datax.splice(datax.length - 6, datax.length)
                : datax,
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
  height: 155px;
}
</style>