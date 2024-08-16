<template>
  <div>
    <div>
      <p class="contribution-distribution-text">贡献分布</p>
      <div id="contribution-distribution-chart" ref="contributionDistributionChart"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import 'echarts/lib/component/legend';
export default {
  data() {
    return {
      contributionDistributionChartData: []
    };
  },
  methods: {
    drawContributionDistributionChart() {
      var contributionDistributionChartDom = this.$refs.contributionDistributionChart;
      this.contributionDistributionChart = echarts.init(contributionDistributionChartDom);
      // 指定图表的配置项和数据
      var option = {
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          symbolSize: 20, // 设置散点的大小
          data: [
            [10, 20],
            [30, 40],
            [50, 60],
            [70, 80]
            // 添加更多散点的数据
          ],
          type: 'scatter'
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.contributionDistributionChart.setOption(option);
    },
  },
  mounted() {
    this.drawContributionDistributionChart();
  },
};
</script>

<style scope>
#contribution-distribution-chart {
  margin-left: 25px;
  width: 300px;
  height: 300px;
}

.contribution-distribution-text {
  margin: 5px 0 0 25px;
}
</style>
