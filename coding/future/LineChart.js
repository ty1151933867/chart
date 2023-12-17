function myChartDraw() {
var amountIds = ['lowProbabilityAmount', 'middleProbabilityAmount', 'highProbabilityAmount']
var probabilityIds = ['lowProbability', 'middleProbability', 'highProbability']
var futureData = inputdata.futureProbability
var futureDataLength = futureData.futureProbabilityDetails.length
var labels = [];
var vHighestProbabilityAmount = [];
var vHighProbabilityAmount = [];
var vMiddleProbabilityAmount = [];
var vLowProbabilityAmount = [];
var vLowestProbabilityAmount = [];
//初期投資額
var vInitialInvestmentAmount = inputdata.investmentPlan.initialInvestmentAmount;
//将来予想の元本
var vTotalInvestAmount = inputdata.investmentPlan.totalInvestAmount;
//運用期間
var vInvestmentPeriodYear =inputdata.investmentPlan.investmentPeriodYear;
var maxInvestmentPeriodYear = 30;
var validPointIndex = vInvestmentPeriodYear*12;
var ctx = document.getElementById('myChart').getContext("2d");
for (var i = 0; i < futureDataLength; i += 12) {
    if(i > validPointIndex){
        break;
    }
    labels.push(futureData.futureProbabilityDetails[i].yearMonth.join('-'));
    vHighestProbabilityAmount.push(futureData.futureProbabilityDetails[i].highestProbabilityAmount);
    vHighProbabilityAmount.push(futureData.futureProbabilityDetails[i].highProbabilityAmount);
    vMiddleProbabilityAmount.push(futureData.futureProbabilityDetails[i].middleProbabilityAmount);
    vLowProbabilityAmount.push(futureData.futureProbabilityDetails[i].lowProbabilityAmount);
    vLowestProbabilityAmount.push(futureData.futureProbabilityDetails[i].lowestProbabilityAmount);
}
if ((futureDataLength -1) % 12 != 0) {
    labels.push(futureData.futureProbabilityDetails[futureDataLength - 1].yearMonth.join('-'));
    vHighestProbabilityAmount.push(futureData.futureProbabilityDetails[futureDataLength - 1].highestProbabilityAmount);
    vHighProbabilityAmount.push(futureData.futureProbabilityDetails[futureDataLength - 1].highProbabilityAmount);
    vMiddleProbabilityAmount.push(futureData.futureProbabilityDetails[futureDataLength - 1].middleProbabilityAmount);
    vLowProbabilityAmount.push(futureData.futureProbabilityDetails[futureDataLength - 1].lowProbabilityAmount);
    vLowestProbabilityAmount.push(futureData.futureProbabilityDetails[futureDataLength - 1].lowestProbabilityAmount);
}
var labelsLength = labels.length;
var data = {
    labels: labels,
    datasets: [
        {
            label: 'LastPoint',
            data: [{
                x: labels[labelsLength - 1],
                y: vLowProbabilityAmount[labelsLength - 1],
                r: 10
            }, {
                x: labels[labelsLength - 1],
                y: vMiddleProbabilityAmount[labelsLength - 1],
                r: 10
            },
            {
                x: labels[labelsLength - 1],
                y: vHighProbabilityAmount[labelsLength - 1],
                r: 10
            }],
            pointBackgroundColor: '#0984E3',
            pointRadius: 2,
            pointHoverRadius: 2,
            pointHitRadius: 2,
            showLine: false,
            fill: false
        },
        {
            label: '元本',
            data: [{
                x: labels[0],
                y: vInitialInvestmentAmount,
                r: 10
            }, {
                x: labels[labelsLength - 1],
                y: vTotalInvestAmount,
                r: 10
            }],
            borderWidth: 1,
            borderColor: '#9c9c9c',
            pointBackgroundColor: '#9c9c9c',
            pointBorderColor: 'transparent',
            pointRadius: 2,
            pointHoverRadius: 2,
            pointHitRadius: 2,
            pointStyle: 'circle',
            showLine: true,
            fill: false
        },
        {
            label: 'highestProbabilityAmount(90%の確率)',
            data: vHighestProbabilityAmount,
            borderColor: 'transparent', 
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            fill: false
        },
        {
            label: 'highProbabilityAmount(70%の確率)',
            data: vHighProbabilityAmount,
            backgroundColor: 'rgb(200, 237, 255)',
            borderColor: 'transparent',
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            fill: '-1', 
        },
        {
            label: 'middleProbabilityAmount(50%の確率)',
            data: vMiddleProbabilityAmount,
            backgroundColor: 'rgb(146, 220, 255)',
            borderWidth: 2,
            borderColor: 'rgb(255, 255, 255)',
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            fill: '-1'
        }
        , {
            label: 'lowProbabilityAmount(30%の確率)',
            data: vLowProbabilityAmount,
            backgroundColor: 'rgb(146, 220, 255)',
            borderColor: 'transparent', 
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            fill: '-1'
        }, {
            label: 'lowestProbabilityAmount(10%の確率)',
            data: vLowestProbabilityAmount,
            backgroundColor: 'rgb(200, 237, 255)',
            borderColor: 'transparent', 
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            fill: '-1' 
        }
    ]
};
var config = {
    type: 'line',
    data: data,
    options: {
        // responsive: false,
        title: {
            display: true,
            text: '将来シミュレーション',
            fontColor: '#282828',
            fontSize: 16,
            fontStyle: 'bold'
        },
        layout: {
            padding: {
                left: 10,
                right: 0,
                top: (maxInvestmentPeriodYear-vInvestmentPeriodYear)*3,
                bottom: 0
            }
        },
        elements: {
            line: {
                tension: 0.6
            }
        },
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                position: 'bottom',
                display: true,
                gridLines: {
                    display: false,
                    drawTicks: true,
                },
                ticks: {
                    autoSkip: false,
                    beginAtZero: true,
                    fontSize: '12',
                    fontStyle: "normal",
                    minRotation: 0,
                    maxRotation: 0,
                    maxTicksLimit: 10,
                    callback: function (value, index, values) {
                        if (index == 0) {
                            return '';
                        }else if (index % 10 === 0) {
                            return index + '年';
                        }else{
                            return '';
                        }
                    }
                }
            }],
            yAxes: [{
                position: 'right',
                display: true,
                gridLines: {
                    display: true,
                    drawTicks: false,
                    color: "rgba(0, 0, 0, 0)"
                },
                ticks: {
                    display: false,
                    beginAtZero: true,
                }
            }]
        },
        tooltips: {
            enabled: false,
        },
        events: [],
        animation: {
            easing: "easeOutQuart",
            duration: 0,
            onComplete: function (animation) {
                var canvas = document.getElementById("myChart");
                var canvasRect = canvas.getBoundingClientRect();
                var meta = this.chart.controller.getDatasetMeta(0);
                var metaLength = meta.data.length;
                for (var i = 0; i < metaLength; i++) {
                    var amount = document.getElementById(amountIds[i]);
                    amount.innerHTML = formatNumber(this.chart.data.datasets[0].data[i].y.toFixed(0));
                    var startPointX = meta.data[i]._model.x;
                    var startPointY = meta.data[i]._model.y;
                    var probability = document.getElementById(probabilityIds[i]);
                    var probabilityRect = probability.getBoundingClientRect();
                    var offsetX = probabilityRect.left - canvasRect.left;
                    var offsetY = probabilityRect.top - canvasRect.top;
                    var middlePointX = offsetX + probability.clientWidth+canvas.clientWidth/10;
                    var middlePointY = offsetY + probability.clientHeight;
                    var endPointX = offsetX;
                    var endPointY = offsetY + probability.clientHeight;
                    ctx.beginPath();
                    ctx.strokeStyle = '#0984E3';
                    ctx.setLineDash([4, 2]);
                    ctx.moveTo(startPointX, startPointY);
                    ctx.lineTo(middlePointX, middlePointY);
                    ctx.lineTo(endPointX, endPointY);
                    ctx.stroke();
                }
                var meta = this.chart.controller.getDatasetMeta(1);
                var metaLength = meta.data.length;
                var totalInvestAmount = document.getElementById('totalInvestAmount');
                totalInvestAmount.innerHTML = formatNumber(this.chart.data.datasets[1].data[metaLength - 1].y.toFixed(0));
                var startPointX = meta.data[metaLength - 1]._model.x;
                var startPointY = meta.data[metaLength - 1]._model.y;
                var totalInvest = document.getElementById('totalInvest');
                var totalInvestRect = totalInvest.getBoundingClientRect();
                var offsetX = totalInvestRect.left - canvasRect.left;
                var offsetY = totalInvestRect.top - canvasRect.top;
                var middlePointX = offsetX + totalInvest.clientWidth+canvas.clientWidth/10
                var middlePointY = offsetY + totalInvest.clientHeight;
                var endPointX = offsetX;
                var endPointY = offsetY + totalInvest.clientHeight;
                ctx.beginPath();
                ctx.strokeStyle = '#9c9c9c';
                ctx.setLineDash([4, 2]);
                ctx.moveTo(startPointX, startPointY);
                ctx.lineTo(middlePointX, middlePointY);
                ctx.lineTo(endPointX, endPointY);
                ctx.stroke();
            }

        }
    },
    // plugins:[{
    // 	afterDraw: function (chart) {
    // 		var canvas =chart.canvas;
    // 		var canvasRect = canvas.getBoundingClientRect();
    // 		console.log(chart);
    // 		var meta = chart.data.datasets[0]._meta[0];
    // 		var metaLength = meta.data.length;
    // 		for (var i = 0; i < metaLength; i++) {
    // 			var amount = document.getElementById(amountIds[i]);
    // 			//amount.innerHTML = formatNumber(chart.data.datasets[0].data[i].y);
    // 			amount.innerHTML = formatNumber(chart.data.datasets[0].data[i].y.toFixed(0));
    // 			var startPointX = meta.data[i]._model.x;
    // 			var startPointY = meta.data[i]._model.y;
    // 			var probability = document.getElementById(probabilityIds[i]);
    // 			var probabilityRect = probability.getBoundingClientRect();
    // 			var offsetX = probabilityRect.left - canvasRect.left;
    // 			var offsetY = probabilityRect.top - canvasRect.top;
    // 			var middlePointX = offsetX + probability.clientWidth+canvas.clientWidth/10;
    // 			var middlePointY = offsetY + probability.clientHeight;
    // 			var endPointX = offsetX;
    // 			var endPointY = offsetY + probability.clientHeight;
    // 			ctx.beginPath();
    // 			ctx.strokeStyle = '#0984E3';
    // 			ctx.setLineDash([4, 2]);
    // 			ctx.moveTo(startPointX, startPointY);
    // 			ctx.lineTo(middlePointX, middlePointY);
    // 			ctx.lineTo(endPointX, endPointY);
    // 			ctx.stroke();
    // 		}

    // 		var meta = chart.data.datasets[1]._meta[0];
    // 		var metaLength = meta.data.length;
    // 		var totalInvestAmount = document.getElementById('totalInvestAmount');
    // 		totalInvestAmount.innerHTML = formatNumber(chart.data.datasets[1].data[metaLength - 1].y);
    // 		var startPointX = meta.data[metaLength - 1]._model.x;
    // 		var startPointY = meta.data[metaLength - 1]._model.y;
    // 		var totalInvest = document.getElementById('totalInvest');
    // 		var totalInvestRect = totalInvest.getBoundingClientRect();
    // 		var offsetX = totalInvestRect.left - canvasRect.left;
    // 		var offsetY = totalInvestRect.top - canvasRect.top;
    // 		var middlePointX = offsetX + totalInvest.clientWidth+canvas.clientWidth/10;
    // 		var middlePointY = offsetY + totalInvest.clientHeight;
    // 		var endPointX = offsetX;
    // 		var endPointY = offsetY + totalInvest.clientHeight;
    // 		ctx.beginPath();
    // 		ctx.strokeStyle = '#9c9c9c';
    // 		ctx.setLineDash([4, 2]);
    // 		ctx.moveTo(startPointX, startPointY);
    // 		ctx.lineTo(middlePointX, middlePointY);
    // 		ctx.lineTo(endPointX, endPointY);
    // 		ctx.stroke();
    // 	}
    // }]	
};
LineChart = new Chart(ctx, config);
}
myChartDraw();
function formatNumber(num) {

const symbol = num < 0 ? "-" : ""; // 确定符号
// 将数字转化为字符串，并去除小数点后面的部分
num = num.toString().split('.')[0];
//符号を除く
if(symbol === '-'){
    num = num.slice(1);
}

// 从字符串末尾开始每三位数字添加一个逗号
for (let i = num.length - 3; i > 0; i -= 3) {
    num = num.slice(0, i) + ',' + num.slice(i);
}
return symbol + num;
}