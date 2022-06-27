<template>
  <div class="time-line-list">
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(item, index) in list"
        :key="index"
        color="#409eff"
        v-show="item.subEventTime"
        ><div class="time-line-items">
          <div class="time-line-list-date">
            {{ item.subEventTime }}
          </div>
          <div class="triangle"></div>
          <span>{{ item.subEventTitle }}</span>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  name: "ListTimeline",
  components: {},
  props: {
    list: {
      type: Array,
    },
  },
  data() {
    return { reverse: true };
  },
  methods: {},
  created() {},
};
</script>
<style lang="less" >
.time-line-list {
  display: inline-block;
  padding-left: 25px;
  padding-right: 10px;
}
.time-line-list-date {
  min-width: 78px;
  float: left;
  color: #3377ff;
  padding-left: 8px;
}

.time-line-list span {
  font-weight: normal;
  color: #333a48;
  line-height: 19px;
  font-size: 13px;
  opacity: 0.85;
}
.el-timeline-item {
  position: relative;
  padding-bottom: 10px;
}
.el-timeline-item .el-timeline-item__node {
  background-color: #3377ff !important;
}

.time-line-list .el-timeline-item .el-timeline-item__node {
  background-color: #3377ff !important;
  width: 7px;
  height: 7px;
  position: absolute;
  left: -11px;
  top: 5px;
  border-radius: 50%;
}
.el-timeline-item /deep/ .el-timeline-item__node--normal {
  left: -2px;
  width: 14px;
  height: 14px;
}
.el-timeline-item:last-child .el-timeline-item__tail {
  height: 0;
}
.el-timeline /deep/ .el-timeline-item__wrapper {
  top: -5px;
}
.el-timeline-item::marker {
  color: #fff;
}
.el-timeline-item__tail {
  position: absolute;
  left: -8px;
  height: 100%;
  border-left: 1px dotted #333a48;
  top: 14px;
  opacity: 0.2;
}
.time-line-items {
  display: flex;
}
.triangle {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-left: 8px solid #3377ff;
  border-bottom: 5px solid transparent;
  margin: 4px 7px 6px 25px;
}
</style> 