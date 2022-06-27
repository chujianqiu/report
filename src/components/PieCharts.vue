<template>
  <div class="container">
    <div id="main2" ref="main2" class="box"></div>
  </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
import "echarts/theme/macarons.js";
export default {
  name: "piecharts",
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
      var chart = document.getElementById("main2");
      if (chart) {
        let myChart = echarts.init(chart); //你这里啥都不写，初始化个啥？？？
        // 绘制图表
        myChart.setOption(this.setOption("饼图"));
      }
    },
    setOption: function () {
      var data = [];
      var len = [];
      var sum = 0;
      for (var i = 0; i < this.list.length; i++) {
        var obj = {
          name: this.list[i].category,
          value: this.list[i].categorySum,
        };
        len.push(this.list[i].category);
        data.push(obj);
        sum += Number(this.list[i].categorySum);
      }
      let option = {
        // title: {
        //   text: '信源分析',
        //   textStyle: {
        //     color: '#3D7FFF',
        //     fontSize: '20'
        //   },
        //   // subtext: '副标题',
        //   subtextStyle: {
        //     color: '#3D7FFF'
        //   },
        //   padding: [5, 0, 20, 0],  // 位置
        //   x:'center',
        //   y:'top',
        //   textAlign:'left'
        // },
        color: [
          "#FF9933",
          "#8F65FF",
          "#40D672",
          "#FFD561",
          "#FF5D5D",
          "#518BFF",
          "#D69A42",
        ],

        graphic: [
          {
            type: "text",
            left: "center",
            top: "35%",
            style: {
              text: sum,
              textAlign: "center",
              fill: "#333",
              fontSize: 20,
              fontWeight: 600,
            },
          },
        ],
        legend: {
          // orient: 'vertical',
          bottom: "0",
          left: "center",
          icon: "circle",
          itemHeight: 6,
          textStyle: {
            color: "rgba(51, 51, 72, 0.65)",
            fontSize: "10",
            //  height: '50px'
          },
          data: len,
        },
        // grid: {
        //   left: "3%",
        //   right: "12%",
        //   bottom: "3%",
        //   top: "5%",
        // },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["55%", "78%"],
            bottom: "20%",
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
                formatter: [
                  "{title|{b}}{abg|}",
                  "{valueHead|数值：}{value|{c}}",
                ].join("\n"),
                borderColor: [
                  "#FF9933",
                  "#8F65FF",
                  "#40D672",
                  "#FFD561",
                  "#FF5D5D",
                  "#518BFF",
                  "#D69A42",
                ],
                // shadowColor: 'rgba(0, 0, 0, 0.4)',
                borderRadius: 4,
                rich: {
                  abg: {
                    color: "#323A52",
                    // backgroundColor: '#4169e1',
                    // width: '60',
                    align: "center",
                    height: 16,
                    // borderRadius: [4, 4, 0, 0]
                  },
                  valueHead: {
                    // color: '#323A52',
                    height: 16,
                    // width: 30,
                    align: "center",
                    // padding: [0, 10, 0, 10]
                  },
                  value: {
                    // color: '#323A52',
                    height: 16,
                    // width: 30,
                    align: "center",
                    // padding: [0, 20, 0, 0]
                  },
                },
              },
            },
            data: data,
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