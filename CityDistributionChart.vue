<template>
  <div>
    <div>
      <p class="city-distribution-text">城市分布</p>
      <div id="city-distribution"></div>
      <button @click="changData">更新数据</button>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      chartData: [
            {
              name: "上海市",
              value: 30,
            },
            {
              name: "北京市",
              value: 40
            },
            {
              name: "C",
              value: 10
            },
            {
              name: "D",
              value: 8
            },
            {
              name: "E",
              value: 6
            },
            {
              name: "F",
              value: 3
            },
            {
              name: "G",
              value: 2
            },
            {
              name: "攀枝花市",
              value: 1
            }
          ],
    };
  },
  // 父组件传递给子组件数据的变量的定义
  props:{
    propChartData:[{
      name :String,
      value: Number
    }]
  },
  watch: {
    chartData: function (newData) {
      document.getElementById("city-distribution").querySelectorAll('[class^="city_id_"]').forEach(element => {        
        element.remove();
      });
      this.drawTreeMapChart(newData); // 监听数据变化，调用更新图表方法
    },
  },
  methods: {
    drawTreeMapChart() {
      var chartDom = document.getElementById("city-distribution");
      let myChart = echarts.init(chartDom);
      // 指定图表的配置项和数据
      var option = {
        series: [
          {
            type: "treemap",
            layout: "vertical", // 将布局方向设为纵向
            width: "100%", // 设置矩形树图铺满画布
            height: "100%", // 设置矩形树图铺满画布
            data: this.chartData,
            label: {
              show: true,
              formatter: "{b}",
              position: "insideTopLeft",
            },

            nodeClick: false, // 禁用节点的点击事件
            roam: false, // 禁用拖拽和缩放
            breadcrumb: false, //控制下方黑色面包屑的显示
            itemStyle: {
              borderColor: 'white', // 设置方块边框颜色为白色
              borderWidth: 1, // 设置方块边框宽度为1
            }
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      myChart.on("finished", function () {
        var option = myChart.getOption();
        var data = option.series[0].data;
        // 获取所有图形元素
        var elementList = myChart.getZr().storage.getDisplayList();
        console.log(myChart.getZr().storage);
        var chartRect = chartDom.getBoundingClientRect();
        // 遍历图形元素，找到name的TSpan的对象，为其在矩形的左下角添加value元素
        elementList.forEach(function (enelment) {
          if (enelment.type === "tspan") {
            // 找到name的父级元素ZRText
            var zrText = enelment.parent;
            var value = '';
            data.forEach(function (data) {
              if (data.name === enelment.style.text) {
                value = data.value;
              }
            })
            var valueDivClassNm = 'city_id_' + enelment.id + '_value_' + value;
            // 拿到ZRText的坐标对象
            var transformable = zrText.innerTransformable;
            // 找到ZRText的父级元素Rect(矩形方块)
            var hostTarget = zrText.__hostTarget;
            var hostTargetShape = hostTarget.shape;
            // 创建一个Div元素显示value值在左下角
            var valueDiv = document.getElementsByClassName(valueDivClassNm);
            if (valueDiv.length === 0) {
              valueDiv = document.createElement("div");
              chartDom.appendChild(valueDiv);
              valueDiv.className = valueDivClassNm;
              valueDiv.textContent = value;
              valueDiv.style.left = window.pageXOffset + chartRect.left + transformable.x + enelment.style.x + 'px';
              valueDiv.style.top = window.pageYOffset + chartRect.top + transformable.y + hostTargetShape.height - valueDiv.clientHeight + 'px';
            } else {
              valueDiv[0].style.left = window.pageXOffset + chartRect.left + transformable.x + enelment.style.x + 'px';
              valueDiv[0].style.top = window.pageYOffset + chartRect.top + transformable.y + hostTargetShape.height - valueDiv.clientHeight + 'px';
            }
          }
        });
      });
    },
    changData(){
      this.chartData = [
            {
              name: "上海市",
              value: 50,
            },
            {
              name: "北京市",
              value: 40
            },
            {
              name: "C",
              value: 10
            },
            {
              name: "D",
              value: 8
            },
            {
              name: "E",
              value: 6
            },
            {
              name: "F",
              value: 3
            },
            {
              name: "G",
              value: 2
            },
            {
              name: "攀枝花市",
              value: 1
            }
          ]
    }
  },
  mounted() {
    this.drawTreeMapChart();
  },
};
</script>

<style scope>
#city-distribution {
  margin-left: 25px;
  width: 300px;
  height: 500px;
}

[class*=city_id_]{
  font-size: 12px;
  color: #fff;
  position: absolute;
  line-height: 1;
}
.city-distribution-text{
  margin: 5px 0 0 25px ;
}
</style>
