(function () {
	myChart = function () {
		function myChartDraw() {
			Chart.Tooltip.positioners.top = function (elements, eventPosition) {
				let model = elements[0]._model;
				return {
					pointHoverBackgroundColor: 'rgba(65, 196, 143, 0.5)',
					x: model.x,
					y: model.y

				};
			};

			//初期投資額
			var vInitialInvestmentAmount = inputdata.investmentPlan.initialInvestmentAmount;
			//毎月の積立額
			var vMonthlyDeposit = inputdata.investmentPlan.monthlyDeposit;

			//過去分析のデータリスト
			var vInvestmentHistories = inputdata.investmentHistories;
			//過去分析のデータLength
			var vInvestmentHistoriesLength = vInvestmentHistories.length;
			//最終の過去分析の元本
			var vEndAmount = vInitialInvestmentAmount + (vInvestmentHistoriesLength - 1) * vMonthlyDeposit;

			//初期化
			var labels = [];
			var amount = [];
			var pointRadius = [];
			var pointBackgroundColor = [];
			var pointBorderColor = [];
			var barAmount = [];
			var barBackgroundColor = [];

			// //リーマン・ジョック
			// var lehmanStartDate = new Date('2008-1-1');
			// var lehmanEndDate = new Date('2009-2-1');
			// var lehmanIndex = [];
			// //チャイナ・ショック
			// var chinaStartDate = new Date('2015-5-1');
			// var chinaEndDate = new Date('2016-2-1');
			// var chinaIndex = [];
			// //コロナ・ショック
			// var coronaStartDate = new Date('2019-12-1');
			// var coronaEndDate = new Date('2020-4-1');
			// var coronaIndex = [];

			var shockIndex = [];
			var startDate = document.querySelectorAll('#hidden-elements>.start-date');
			var endDate = document.querySelectorAll('#hidden-elements>.end-date');
			var shockTitle = document.querySelectorAll('#hidden-elements>.shock-title');

			console.log(shockTitle);
			for (var i = 0; i < vInvestmentHistoriesLength; i++) {
				//lineチャートのデータ
				labels.push(new Date(vInvestmentHistories[i].date.join('-')));
				amount.push(vInvestmentHistories[i].amount);
				//総資産チャートのデータ
				if (i === (vInvestmentHistoriesLength - 1)) {
					pointRadius.push(4);
					pointBackgroundColor.push('#0984e3');
					pointBorderColor.push('#0984e3');
				} else {
					pointRadius.push(0);
					pointBorderColor.push('#transparent');
					pointBackgroundColor.push('#transparent');
				}
			};
			//最高過去分析の評価額
			var maxHistorieAmount = Math.max(...amount);
			var yMax = Math.floor(maxHistorieAmount / 100) * 100;
			var yStepSize = Math.floor((yMax / 3) / 100) * 100;

			var ss = Math.floor(maxHistorieAmount / 100) * 100 + 100;
			var shockCounts = [];
			console.log('最高' + maxHistorieAmount + ":" + yMax + ":" + yStepSize);
			for (var i = 0; i < labels.length; i++) {
				var fillColorFlag = 0;
				var ss = 0;
				barAmount.push(maxHistorieAmount);
				for (var j = 0; j < startDate.length; j++) {
					var date1 = new Date(startDate[j].innerHTML);
					var date2 = new Date(endDate[j].innerHTML);
					if (labels[i] >= date1 && labels[i] <= date2) {
						fillColorFlag = 1;
						shockCounts.push(j);
						break;
					} else {
						continue;
					}
				}
				if (fillColorFlag === 0) {
					barBackgroundColor.push('transparent');
					shockIndex.push('F');
				} else {
					barBackgroundColor.push('rgba(86, 94, 99, 0.15)');
					shockIndex.push(i);
				}
			};
			var shockCounts = countNumbers(shockCounts);
			var shockBeginIndex = findZeroBeforeOne(shockIndex);
			console.log(startDate);
			//barチャートのデータ
			// for (var i = 0; i < labels.length; i++) {
			// 	barAmount.push(maxHistorieAmount)
			// 	if(labels[i]>= lehmanStartDate && labels[i]<=lehmanEndDate){
			// 		barBackgroundColor.push('rgba(86, 94, 99, 0.15)');
			// 		lehmanIndex.push(i);
			// 	}else if(labels[i]>= chinaStartDate && labels[i]<=chinaEndDate){
			// 		barBackgroundColor.push('rgba(86, 94, 99, 0.15)');
			// 		chinaIndex.push(i);
			// 	}else if(labels[i]>= coronaStartDate && labels[i]<=coronaEndDate){
			// 		barBackgroundColor.push('rgba(86, 94, 99, 0.15)');
			// 		coronaIndex.push(i);
			// 	}else{
			// 		barBackgroundColor.push('transparent');
			// 	}
			// }

			var data = {
				labels: labels,
				datasets: [
					{
						//   line: 総資産
						data: amount,
						borderColor: '#0984e3',
						borderWidth: 2,
						//borderColor: 'transparent',
						fill: false,
						tension: 0,
						pointRadius: pointRadius,
						pointBorderColor: pointBorderColor,
						pointBackgroundColor: pointBackgroundColor,
						pointHoverBackgroundColor: 'rgba(65, 196, 143, 0.5)',
						pointHitRadius: 4,
						pointHoverRadius: 4,
						animation: true,
						order: 0,
					},
					{
						//line:'元本'
						data: [{
							x: labels[0],
							y: vInitialInvestmentAmount,
							r: 10
						}, {
							x: labels[vInvestmentHistoriesLength - 1],
							y: vEndAmount,
							r: 10
						}],
						borderColor: '#9c9c9c',
						borderDash: [4, 3],
						borderWidth: 2,
						fill: false,
						tension: 0,
						pointBackgroundColor: ['transparent', '#9c9c9c'],
						pointRadius: [0, 4],
						pointHitRadius: [0, 0],
						pointHoverRadius: [0, 4],
						order: 1
					},
					{
						//bar:ショック
						type: 'bar',
						data: barAmount,
						backgroundColor: barBackgroundColor,
						order: 2
					}
				]
			};
			var options = {

				layout: {
					padding: {
						left: 10,
						right: 10,
						top: 0,
						bottom: 0
					}
				},
				title: {
					display: false
				},
				legend: {
					display: false, // 显示图例
				},

				scales: {
					xAxes: [{
						//bar
						display: true,
						barPercentage: 1,
						categoryPercentage: 1,
						//bar
						ticks: {
							intersection: false,
							padding: 4,
							fontColor: "#686868",
							fontSize: '10',
							fontStyle: "normal",
							maxRotation: 0,
							minRotation: 0,
							lineWidth: 2,
							maxTicksLimit: vInvestmentHistoriesLength,
							callback: function (label, index, labels) {
								if (index % 48 == 0 && label.getMonth() == 0) {
									return label.getFullYear();
								} else {
									return '';
								}
							}
						},
						gridLines: {
							display: true,
							drawTicks: false,
							color: "rgba(0, 0, 0, 0)"
						}
					}],
					yAxes: [{
						display: true,
						ticks: {
							intersection: false,
							min: 0,
							max: yMax + 100,
							stepSize: 100,
							padding: 4,
							fontColor: "#686868",
							fontSize: '10',
							fontStyle: "normal",
							beginAtZero: true,
							lineWidth: 2,
							maxTicksLimit: yStepSize,
							callback: function (label, index, labels) {
								// console.log(label);
								if ((label == vInitialInvestmentAmount) ||
									(label == yStepSize) ||
									(label == yStepSize * 2) ||
									(label == yStepSize * 3)) {
									return label;
								} else {
									return '';
								}
							}

						},
						gridLines: {
							display: true,
							drawTicks: false,
							color: "rgba(0, 0, 0, 0)"
						},
					}]
				},
				tooltips: {
					enabled: false,
					displayShadow: true,
					// boxShadaw: '5px 5px 10px rgba(0, 0, 0, 0.5)',
					mode: 'index',
					backgroundColor: 'rgba(255, 255, 255, 1)',
					//tooltipClass: 'chartjs-tooltip',
					borderColor: 'rgba(245, 245, 245, 0.6)',
					borderWidth: 4,
					//'#F5F5F5',
					xAlign: 'center',
					yAlign: 'bottom',
					intersect: false,
					position: 'top',
					displayColors: false,
					titleFontStyle: "bold",
					titleFontSize: 12,
					titleFontColor: '#565e63',
					bodyFontSize: 10,
					//日付style
					footerAlign: 'right',
					footerFontSize: 10,
					footerFontColor: '#999',
					callbacks: {
						title: function (tooltipItem, data) {
							var yLabel = data.datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].index];
							return formatNumber(yLabel) + '万円';
						},
						label: function (tooltipItem, data) {
							if (tooltipItem.datasetIndex === 0) {
								//過去分析の評価額
								var yLabel = tooltipItem.yLabel;
								//元本
								var vTotalInvestAmount = Math.floor(vInitialInvestmentAmount + vMonthlyDeposit * tooltipItem.index);
								//損益額
								var vProfitLossAmount = Math.floor(yLabel - vTotalInvestAmount);
								//損益率
								var vProfitLossrate = (vProfitLossAmount / vTotalInvestAmount) * 100;

								if (vProfitLossAmount < 0) {
									return formatNumber(vProfitLossAmount) + '万円 (' + vProfitLossrate.toFixed(2) + '%)';
								} else if (vProfitLossAmount > 0) {
									return '+' + formatNumber(vProfitLossAmount) + '万円 (+' + vProfitLossrate.toFixed(2) + '%)';
								} else {
									return formatNumber(vProfitLossAmount) + '万円 (' + vProfitLossrate.toFixed(0) + '%)';
								}
							}
						},
						labelTextColor: function (tooltipItem, data) {
							//過去分析の評価額
							var yLabel = tooltipItem.yLabel;
							//元本
							var vTotalInvestAmount = Math.floor(vInitialInvestmentAmount + vMonthlyDeposit * tooltipItem.index);
							//損益額
							var vProfitLossAmount = Math.floor(yLabel - vTotalInvestAmount);
							console.log(vProfitLossAmount)
							if (vProfitLossAmount < 0) {
								return "#ed432d";
							} else if (vProfitLossAmount > 0) {
								return "#41c48f";
							} else {
								return "#565e63";
							}
						},
						footer: function (tooltipItem, data) {
							var year = data.labels[tooltipItem[0].index].getFullYear();
							var month = data.labels[tooltipItem[0].index].getMonth() + 1;

							return "'" + year.toString().slice(-2) + '/' + month.toString().padStart(2, '0');
						}
					},
					custom: function (tooltipModel) {
						var tooltipEl = document.getElementById('chart-tooltip');

						if (!tooltipEl) {
							tooltipEl = document.createElement('div');
							tooltipEl.id = 'chart-tooltip';
							tooltipEl.innerHTML = '<table></table>';
							document.body.appendChild(tooltipEl);
						}
						if (tooltipModel.opacity === 0) {
							tooltipEl.style.opacity = 0;
							return;
						}
						tooltipEl.classList.remove('above', 'below', 'no-transform');
						if (tooltipModel.yAlign) {
							tooltipEl.classList.add(tooltipModel.yAlign);
						} else {
							tooltipEl.classList.add('no-transform');
						}
						function getBody(bodyItem) {
							return bodyItem.lines;
						}
						if (tooltipModel.body) {
							var titleLines = tooltipModel.title || [];
							var bodyLines = tooltipModel.body.map(getBody);
							var titleStyle = 'color:' + tooltipModel.titleFontColor;
							titleStyle += '; font-size:' + tooltipModel.titleFontSize;
							titleStyle += '; text-align:' + tooltipModel._titleAlign;
							titleStyle += '; font-weight:' + tooltipModel._titleFontStyle;
							titleStyle += '; font-family:' + tooltipModel._titleFontFamily;
							var innerHtml = '<thead style="' + titleStyle + '">';

							titleLines.forEach(function (title) {
								innerHtml += '<tr><th>' + title + '</th></tr>';
							});
							innerHtml += '</thead>';
							var labelTextColors = tooltipModel.labelTextColors;
							var bodyStyle = 'color:' + labelTextColors[0];
							bodyStyle += '; font-size:' + tooltipModel.bodyFontSize;
							bodyStyle += '; text-align:' + tooltipModel._bodyAlign;
							bodyStyle += '; font-weight:' + tooltipModel._bodyFontStyle;
							bodyStyle += '; font-family:' + tooltipModel._bodyFontFamily;;
							innerHtml += '<tbody style="' + bodyStyle + '">';
							bodyLines.forEach(function (body, i) {
								innerHtml += '<tr><td>' + body + '</td></tr>';
							});
							innerHtml += '</tbody>';
							var footerStyle = 'color:' + tooltipModel.footerFontColor;
							footerStyle += '; font-size:' + tooltipModel.footerFontSize;
							footerStyle += '; text-align:' + tooltipModel._footerAlign;
							// footerStyle += '; font-weight:' + tooltipModel._footerFontStyle;
							footerStyle += '; font-family:' + tooltipModel._footerFontFamily;
							innerHtml += '<tfoot style="' + footerStyle + '"><tr><td>' + tooltipModel.footer + '</td></td></tfoot>';
							var tableRoot = tooltipEl.querySelector('table');
							tableRoot.innerHTML = innerHtml;
						}
						var position = this._chart.canvas.getBoundingClientRect();
						tooltipEl.style.opacity = 1;
						tooltipEl.style.position = 'absolute';
						tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX - tooltipEl.clientWidth / 2 + 'px';
						tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY - tooltipEl.clientHeight - 15 + 'px';
						tooltipEl.style.backgroundColor = tooltipModel.backgroundColor;
						tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
						tooltipEl.style.boxShadow = '0 0 20px #0003';
						tooltipEl.style.pointerEvents = 'none';
					}
				}
			};
			var plugins = {
				afterDraw: function (chart) {
					var canvas = chart.canvas;
					var canvasRect = canvas.getBoundingClientRect();
					//元本
					var lastPointDiv = chart.canvas.parentNode.querySelector('#last-point');
					var lastPointAmount = lastPointDiv.querySelector('#last-point-amount');
					var lastPointModel = chart.data.datasets[1]._meta[0].data[1]._model
					var lastPointOffsetX = lastPointModel.x - lastPointDiv.clientWidth + canvasRect.left;
					var lastPointOffsetY = lastPointModel.y + lastPointDiv.clientHeight / 4 + canvasRect.top;
					var lastPoint = chart.data.datasets[1].data[chart.data.datasets[1].data.length - 1];
					lastPointAmount.innerHTML = formatNumber(lastPoint.y);
					lastPointDiv.style.left = lastPointOffsetX + 'px';
					lastPointDiv.style.top = lastPointOffsetY + 'px';
					//総資産
					var historyLastPointDiv = chart.canvas.parentNode.querySelector('#history-last-point');
					var historyLastAmount = historyLastPointDiv.querySelector('#history-last-point-amount');
					var historyLastPointModel = chart.data.datasets[0]._meta[0].data[chart.data.datasets[0]._meta[0].data.length - 1]._model
					var historyLastPointOffsetX = historyLastPointModel.x - historyLastPointDiv.clientWidth + canvasRect.left;
					var historyLastPointOffsetY = historyLastPointModel.y + historyLastPointDiv.clientHeight / 4 + canvasRect.top;
					var historyLastPoint = chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1];
					historyLastAmount.innerHTML = formatNumber(historyLastPoint);
					historyLastPointDiv.style.left = historyLastPointOffsetX + 'px';
					historyLastPointDiv.style.top = historyLastPointOffsetY + 'px';

					//万円
					var unitDiv = chart.canvas.parentNode.querySelectorAll('.spm-m1-asf-chart-simulation__unit');
					var xAxis = chart.scales['x-axis-0'];
					var yAxis = chart.scales['y-axis-0'];
					unitDiv[0].style.left = canvasRect.left + xAxis.left - unitDiv[0].clientWidth + 'px';
					unitDiv[0].style.top = canvasRect.top - unitDiv[0].clientHeight + 'px';

					//年
					unitDiv[1].style.left = canvasRect.left + xAxis._endPixel + 'px';
					unitDiv[1].style.top = canvasRect.top + yAxis._endPixel + yAxis.paddingBottom + 'px';

					//bar
					//リーマン・ショック
					// var lehmanFirstPointModel = chart.data.datasets[2]._meta[0].data[lehmanIndex[0]]._model
					// var lehmanTitleDiv = chart.canvas.parentNode.querySelector('#lehmanTitle');
					// var lehmanTitleOffsetX = lehmanFirstPointModel.x + canvasRect.left;
					// var lehmanTitleOffsetY = lehmanFirstPointModel.y - lehmanTitleDiv.clientHeight + canvasRect.top;
					// lehmanTitleDiv.style.left = lehmanTitleOffsetX + 'px';
					// lehmanTitleDiv.style.top = lehmanTitleOffsetY + 'px';
					// //チャイナ・ショック
					// var chinaFirstPointModel = chart.data.datasets[2]._meta[0].data[chinaIndex[Math.floor(chinaIndex.length / 2)]]._model
					// var chinaTitleDiv = chart.canvas.parentNode.querySelector('#chinaTitle');
					// var chinaTitleOffsetX = chinaFirstPointModel.x - chinaTitleDiv.clientWidth / 2 + canvasRect.left;
					// var chinaTitleOffsetY = chinaFirstPointModel.y - chinaTitleDiv.clientHeight + canvasRect.top;
					// chinaTitleDiv.style.left = chinaTitleOffsetX + 'px';
					// chinaTitleDiv.style.top = chinaTitleOffsetY + 'px';
					// //コロナ・ショック
					// var coronaFirstPointModel = chart.data.datasets[2]._meta[0].data[coronaIndex[Math.floor(coronaIndex.length / 2)]]._model
					// var coronaTitleDiv = chart.canvas.parentNode.querySelector('#coronaTitle');
					// var coronaTitleOffsetX = coronaFirstPointModel.x - coronaTitleDiv.clientWidth / 2 + canvasRect.left;
					// var coronaTitleOffsetY = coronaFirstPointModel.y - coronaTitleDiv.clientHeight + canvasRect.top;
					// coronaTitleDiv.style.left = coronaTitleOffsetX + 'px';
					// coronaTitleDiv.style.top = coronaTitleOffsetY + 'px';

					for (var i = 0; i < shockBeginIndex.length; i++) {
						var titleId = shockTitle[i].getAttribute('title-id');
						var shockTitleDiv = document.getElementById(titleId);
						if (!shockTitleDiv) {
							shockTitleDiv = document.createElement('div');
							shockTitleDiv.id = titleId;
							shockTitleDiv.innerHTML = '<span>' + shockTitle[i].innerHTML + '</span>';
							shockTitleDiv.style.position = 'absolute';
							document.body.appendChild(shockTitleDiv);
						}
						// var firstPointModel = {};
						// if (i === 0) {
						// 	firstPointModel = chart.data.datasets[2]._meta[0].data[shockBeginIndex[i]]._model;
						// 	var shockTitleOffsetX = firstPointModel.x + canvasRect.left;
						// } else {
						// 	var middle = Math.floor(shockCounts[i] / 2);
						// 	firstPointModel = chart.data.datasets[2]._meta[0].data[shockBeginIndex[i] + middle]._model;
						// 	var shockTitleOffsetX = firstPointModel.x + canvasRect.left - shockTitleDiv.clientWidth / 2;
						// }
						// var shockTitleOffsetY = firstPointModel.y - shockTitleDiv.clientHeight + canvasRect.top
						// shockTitleDiv.style.left = shockTitleOffsetX + 'px';
						// shockTitleDiv.style.top = shockTitleOffsetY + 'px';

						var firstPointModel = chart.data.datasets[2]._meta[0].data[0]._model;
						var lastPointModel = chart.data.datasets[2]._meta[0].data[ chart.data.datasets[2]._meta[0].data.length-1]._model;
						var startIndex = shockBeginIndex[i];
						var middleIndex = shockBeginIndex[i]+Math.floor(shockCounts[i] / 2);
						var endIndex = shockBeginIndex[i]+shockCounts[i]-1;
						var shockStartPointModel = chart.data.datasets[2]._meta[0].data[startIndex]._model;
						var shockMiddlePointModel = chart.data.datasets[2]._meta[0].data[middleIndex]._model;
						var shockEndPointModel = chart.data.datasets[2]._meta[0].data[endIndex]._model;
						if((shockMiddlePointModel.x - shockTitleDiv.clientWidth / 2) > firstPointModel.x && 
							(shockMiddlePointModel.x + shockTitleDiv.clientWidth / 2) < lastPointModel.x){
								var shockTitleOffsetX = shockMiddlePointModel.x - shockTitleDiv.clientWidth / 2+ canvasRect.left;
								var shockTitleOffsetY = shockMiddlePointModel.y - shockTitleDiv.clientHeight + canvasRect.top
						}else if ((shockStartPointModel.x + shockTitleDiv.clientWidth) > lastPointModel.x){
							var shockTitleOffsetX = shockEndPointModel.x - shockTitleDiv.clientWidth + canvasRect.left;
							var shockTitleOffsetY = shockEndPointModel.y - shockTitleDiv.clientHeight + canvasRect.top
						}else{
							var shockTitleOffsetX = shockStartPointModel.x + canvasRect.left;
							var shockTitleOffsetY = shockStartPointModel.y - shockTitleDiv.clientHeight + canvasRect.top
						}
						shockTitleDiv.style.left = shockTitleOffsetX + 'px';
						shockTitleDiv.style.top = shockTitleOffsetY + 'px';

					}
				}
			};
			var config = {
				type: 'line',
				data: data,
				options: options,
				plugins: [plugins]
			};
			var ctx = document.getElementById('myChart').getContext("2d");
			myChartCanvas = new Chart(ctx, config);
		}
		myChartDraw();
		function formatNumber(num) {

			const symbol = num < 0 ? "-" : ""; // 确定符号
			// 将数字转化为字符串，并去除小数点后面的部分
			num = num.toString().split('.')[0];
			//符号を除く
			if (symbol === '-') {
				num = num.slice(1);
			}

			// 从字符串末尾开始每三位数字添加一个逗号
			for (let i = num.length - 3; i > 0; i -= 3) {
				num = num.slice(0, i) + ',' + num.slice(i);
			}
			return symbol + num;
		}
		function findZeroBeforeOne(arr) {
			var result = [];
			var hasZeroBeforeOne = false;
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] != 'F' && i === 0) {
					result.push(i);
					hasZeroBeforeOne = false;
				} else if (arr[i] != 'F') {
					if (hasZeroBeforeOne) {
						result.push(arr[i]);
					}
					hasZeroBeforeOne = false;
				} else {
					hasZeroBeforeOne = true;
				}
			}
			return result;
		}
		function countNumbers(arr) {
			const counts = {};
			for (let i = 0; i < arr.length; i++) {
				if (counts[arr[i]]) {
					counts[arr[i]]++;
				} else {
					counts[arr[i]] = 1;
				}
			}
			return counts;
		}
	}()
})()