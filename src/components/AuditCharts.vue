<template>
  <div class="container">
    <div id="main4" ref="main4" class="box"></div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
import "echarts/theme/macarons.js";
export default {
  name: "auditcharts",
  props: {
    list: {
      type: Array,
    },
  },
  data: function () {
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
      var chart = document.getElementById("main4");
      if (chart) {
        let myChart = echarts.init(chart); //你这里啥都不写，初始化个啥？？？
        // 绘制图表
        myChart.setOption(this.setOption("竖向柱状图"));
      }
    },
    setOption: function () {
      var datax = [];
      var datay1 = []; // 非负面
      var datay2 = []; // 负面

      for (var i = 0; i < this.list.length; i++) {
        // var str = '-'+this.list[i].negativeSum;
        datay2.push(this.list[i].negativeSum);
        datay1.push(-this.list[i].notNegativeSum);
        datax.push(this.list[i].timeSection);
      }

      var emphasisStyle = {
        itemStyle: {
          barBorderWidth: 1,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: "rgba(0,0,0,0.5)",
        },
      };

      var option = {
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            // 假设此轴的 type 为 'time'。
            console.log(params[0].data, -params[1].data);
            return (
              "负面：" + params[0].data + "</br>" + "非负面：" + -params[1].data
            );
          },
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

        xAxis: {
          data: datax,
          //              name: 'XAxis',
          // axisLine: {},
          axisTick: {
            show: false,
          },
          splitLine: {
            //网格线
            lineStyle: {
              color: "rgb(51, 58, 72, 15%)",
              width: 0.5,
              type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
            },
            show: true, //隐藏或显示
          },
          splitArea: { show: false },
          axisLine: {
            onZero: true,
            show: false,
          },
          axisLabel: {
            textStyle: {
              fontWeight: "bold",
              color: "rgba(51, 51, 72, 0.65)",
              fontSize: "10",
            },
          },
          // show:false,
        },
        yAxis: {
          inverse: false,
          // show:false,
          axisTick: {
            show: false,
          },
          splitArea: { show: false },
          splitLine: {
            //网格线
            lineStyle: {
              color: "rgb(51, 58, 72, 15%)",
              width: 0.5,
              type: "dashed", //设置网格线类型 dotted：虚线   solid:实线
            },
            show: true, //隐藏或显示
          },
          axisLine: {
            onZero: true,
            show: false,
          },
          axisLabel: {
            textStyle: {fontWeight: "bold",
              color: "rgba(51, 51, 72, 0.65)",
              fontSize: "10",
            },
          },
        },

        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "16%",
          containLabel: true,
        },

        legend: {
          // orient: 'vertical',
          top: 0,
          right: 10,
          // left: "right",
          fontSize: 30,
          itemGap: 20,
          icon: "square", //图例方块
          itemHeight: 6, //图例icon大小
          textStyle: {
            color: "rgba(51, 51, 72, 0.65)",
            fontSize: "10",
          },
          itemWidth: 8,
          data: ["负面", "非负面"],
        },
        series: [
          {
            name: "负面",
            type: "bar",
            stack: "one",
            color: "#EB5139",
            emphasis: emphasisStyle,
            data: datay2,
            barWidth: 16,
            itemStyle: {
              barBorderRadius: [120, 120, 0, 0],
            },
          },
          {
            name: "非负面",
            type: "bar",
            stack: "one",
            color: "#C6C8CF",
            emphasis: emphasisStyle,
            data: datay1,
            barWidth: 16,
            itemStyle: {
              barBorderRadius: [0, 0, 120, 120],
            },
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
  height: 166px;
}
</style>