<template>
  <div>
    <div>
      <p class="gender-distribution-text">性别分布</p>
      <div id="gender-distribution-chart" ref="genderDistributionChart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import 'echarts/lib/component/legend';
export default {
  data() {
    return {
      genderDistributionChartData: [
        { value: 300, name: '男' },
        { value: 300, name: '女' }
      ]
    };
  },
  methods: {
    drawGenderDistributionChart(cahrtData) {
      var genderDistributionChartDom = this.$refs.genderDistributionChart;
      this.genderDistributionChart = echarts.init(genderDistributionChartDom);
      // 指定图表的配置项和数据
      // 饼图的配置项
      var option = {
        legend: {
          orient: 'horizontal',
          left: 'center',
          data: ['男', '女'],
          icon: 'circle',
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            data: cahrtData,
            label: {
              show: true,
              formatter: '{b}\n{d}%',
              fontSize: 12,  // 设置字体大小
              fontFamily: 'Arial',  // 设置字体样式
              position:'outside'
            },
            labelLine: {
                show: true
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.genderDistributionChart.setOption(option);
    },
  },
  mounted() {
    this.drawGenderDistributionChart(this.genderDistributionChartData);
  },
};
</script>

<style scope>
#gender-distribution-chart {
  margin-left: 25px;
  width: 300px;
  height: 300px;
}

.gender-distribution-text {
  margin: 5px 0 0 25px;
}
</style>
