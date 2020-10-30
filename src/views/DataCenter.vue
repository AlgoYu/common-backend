<template>
	<section>
		<el-row :gutter="20" class="row-style">
			<el-col :span="6">
				<el-card class="box-card">
					<div class="info-box">
						<svg class="icon" aria-hidden="true" style="font-size: 50px;color: #2E68AA;">
							<use xlink:href="#icon-people_fill"></use>
						</svg>
						<div class="num-box">
							<div>
								<font size="3px" color="#9C9C9C">用户</font>
							</div>
							<div>
								<font size="6px" color="#000000">58753</font>
							</div>
						</div>
					</div>
					<el-divider></el-divider>
					<i class="el-icon-time"></i>
					<font style="margin-left: 5px;">截止现在</font>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card">
					<div class="info-box">
						<svg class="icon" aria-hidden="true" style="font-size: 50px;color: #56A36C;">
							<use xlink:href="#icon-zhtn"></use>
						</svg>
						<div class="num-box">
							<div>
								<font size="3px" color="#9C9C9C">当前在线</font>
							</div>
							<div>
								<font size="6px" color="#000000">12642</font>
							</div>
						</div>
					</div>
					<el-divider></el-divider>
					<i class="el-icon-time"></i>
					<font style="margin-left: 5px;">截止现在</font>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card">
					<div class="info-box">
						<svg class="icon" aria-hidden="true" style="font-size: 50px;color: #EB3F2F;">
							<use xlink:href="#icon-redpacket_fill"></use>
						</svg>
						<div class="num-box">
							<div>
								<font size="3px" color="#9C9C9C">成交额</font>
							</div>
							<div>
								<font size="6px" color="#000000">2504210.97</font>
							</div>
						</div>
					</div>
					<el-divider></el-divider>
					<i class="el-icon-time"></i>
					<font style="margin-left: 5px;">截止现在</font>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card">
					<div class="info-box">
						<svg class="icon" aria-hidden="true" style="font-size: 50px;color: #00D2D0;">
							<use xlink:href="#icon-order1"></use>
						</svg>
						<div class="num-box">
							<div>
								<font size="3px" color="#9C9C9C">订单</font>
							</div>
							<div>
								<font size="6px" color="#000000">17538</font>
							</div>
						</div>
					</div>
					<el-divider></el-divider>
					<i class="el-icon-time"></i>
					<font style="margin-left: 5px;">截止现在</font>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="20" class="row-style">
			<el-col :span="6">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-card class="box-card" >
							<v-chart :options="basicLineChart" style="width: 100%;height: 200px;"></v-chart>
						</el-card>
					</el-col>
				</el-row>
				<el-row :gutter="20" class="row-style">
					<el-col :span="24">
						<el-card class="box-card" >
							<v-chart :options="compareLineChart" style="width: 100%;height: 200px;"></v-chart>
						</el-card>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="6">
				<el-row :gutter="20">
					<el-col :span="24">
						<el-card class="box-card" >
							<v-chart :options="areaLineChart" style="width: 100%;height: 200px;"></v-chart>
						</el-card>
					</el-col>
				</el-row>
				<el-row :gutter="20" class="row-style">
					<el-col :span="24">
						<el-card class="box-card" >
							<v-chart :options="barChart" style="width: 100%;height: 200px;"></v-chart>
						</el-card>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card" >
					<v-chart :options="proportionPieChart" style="width:100%;height:460px;"></v-chart>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card class="box-card" >
					<v-chart :options="dataPieChart" style="width: 100%;height: 460px;"></v-chart>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="20" class="row-style">
			<el-col :span="16">
				<el-card class="box-card" >
					<v-chart :options="mapChart" style="width: 100%;height: 460px;"></v-chart>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="box-card" >
					<AuthorCard></AuthorCard>
				</el-card>
			</el-col>
		</el-row>
	</section>
</template>

<script>
	import AuthorCard from '../components/AuthorCard.vue'
	export default {
		name: 'Dashboard',
		components:{
			AuthorCard: AuthorCard
		},
		data() {
			return {
				// 基础线图
				basicLineChart: {
					title: {
						text: '月销量'
					},
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: 'line'
					}]
				},
				// 区域线图
				areaLineChart: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					legend: {
						data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
							name: '邮件营销',
							type: 'line',
							stack: '总量',
							areaStyle: {},
							data: [120, 132, 101, 134, 90, 230, 210]
						},
						{
							name: '联盟广告',
							type: 'line',
							stack: '总量',
							areaStyle: {},
							data: [220, 182, 191, 234, 290, 330, 310]
						},
						{
							name: '视频广告',
							type: 'line',
							stack: '总量',
							areaStyle: {},
							data: [150, 232, 201, 154, 190, 330, 410]
						},
						{
							name: '直接访问',
							type: 'line',
							stack: '总量',
							areaStyle: {},
							data: [320, 332, 301, 334, 390, 330, 320]
						},
						{
							name: '搜索引擎',
							type: 'line',
							stack: '总量',
							label: {
								normal: {
									show: true,
									position: 'top'
								}
							},
							areaStyle: {},
							data: [820, 932, 901, 934, 1290, 1330, 1320]
						}
					]
				},
				// 饼图
				proportionPieChart: {
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
					},
					legend: {
						orient: 'vertical',
						left: 10,
						data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
					},
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: [{
								value: 335,
								name: '直接访问'
							},
							{
								value: 310,
								name: '邮件营销'
							},
							{
								value: 234,
								name: '联盟广告'
							},
							{
								value: 135,
								name: '视频广告'
							},
							{
								value: 1548,
								name: '搜索引擎'
							}
						]
					}]
				},
				//地图
				mapChart: {
					title: {
						text: '世界订单分布',
						sublink: 'http://esa.un.org/wpp/Excel-Data/population.htm',
						left: 'center',
						top: 'top'
					},
					tooltip: {
						trigger: 'item',
						formatter: function(params) {
							var value = (params.value + '').split('.');
							value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') +
								'.' + value[1];
							return params.seriesName + '<br/>' + params.name + ' : ' + value;
						}
					},
					visualMap: {
						min: 0,
						max: 1000000,
						text: ['High', 'Low'],
						realtime: false,
						calculable: true,
						color: ['orangered', 'yellow', 'lightskyblue']
					},
					series: [{
						name: 'World Population (2010)',
						type: 'map',
						mapType: 'world',
						roam: true,
						itemStyle: {
							emphasis: {
								label: {
									show: true
								}
							}
						},
						data: [{
								name: 'Afghanistan',
								value: 28397.812
							},
							{
								name: 'Angola',
								value: 19549.124
							},
							{
								name: 'Albania',
								value: 3150.143
							},
							{
								name: 'United Arab Emirates',
								value: 8441.537
							},
							{
								name: 'Argentina',
								value: 40374.224
							},
							{
								name: 'Armenia',
								value: 2963.496
							},
							{
								name: 'French Southern and Antarctic Lands',
								value: 268.065
							},
							{
								name: 'Australia',
								value: 22404.488
							},
							{
								name: 'Austria',
								value: 8401.924
							},
							{
								name: 'Azerbaijan',
								value: 9094.718
							},
							{
								name: 'Burundi',
								value: 9232.753
							},
							{
								name: 'Belgium',
								value: 10941.288
							},
							{
								name: 'Benin',
								value: 9509.798
							},
							{
								name: 'Burkina Faso',
								value: 15540.284
							},
							{
								name: 'Bangladesh',
								value: 151125.475
							},
							{
								name: 'Bulgaria',
								value: 7389.175
							},
							{
								name: 'The Bahamas',
								value: 66402.316
							},
							{
								name: 'Bosnia and Herzegovina',
								value: 3845.929
							},
							{
								name: 'Belarus',
								value: 9491.07
							},
							{
								name: 'Belize',
								value: 308.595
							},
							{
								name: 'Bermuda',
								value: 64.951
							},
							{
								name: 'Bolivia',
								value: 716.939
							},
							{
								name: 'Brazil',
								value: 195210.154
							},
							{
								name: 'Brunei',
								value: 27.223
							},
							{
								name: 'Bhutan',
								value: 716.939
							},
							{
								name: 'Botswana',
								value: 1969.341
							},
							{
								name: 'Central African Republic',
								value: 4349.921
							},
							{
								name: 'Canada',
								value: 34126.24
							},
							{
								name: 'Switzerland',
								value: 7830.534
							},
							{
								name: 'Chile',
								value: 17150.76
							},
							{
								name: 'China',
								value: 1359821.465
							},
							{
								name: 'Ivory Coast',
								value: 60508.978
							},
							{
								name: 'Cameroon',
								value: 20624.343
							},
							{
								name: 'Democratic Republic of the Congo',
								value: 62191.161
							},
							{
								name: 'Republic of the Congo',
								value: 3573.024
							},
							{
								name: 'Colombia',
								value: 46444.798
							},
							{
								name: 'Costa Rica',
								value: 4669.685
							},
							{
								name: 'Cuba',
								value: 11281.768
							},
							{
								name: 'Northern Cyprus',
								value: 1.468
							},
							{
								name: 'Cyprus',
								value: 1103.685
							},
							{
								name: 'Czech Republic',
								value: 10553.701
							},
							{
								name: 'Germany',
								value: 83017.404
							},
							{
								name: 'Djibouti',
								value: 834.036
							},
							{
								name: 'Denmark',
								value: 5550.959
							},
							{
								name: 'Dominican Republic',
								value: 10016.797
							},
							{
								name: 'Algeria',
								value: 37062.82
							},
							{
								name: 'Ecuador',
								value: 15001.072
							},
							{
								name: 'Egypt',
								value: 78075.705
							},
							{
								name: 'Eritrea',
								value: 5741.159
							},
							{
								name: 'Spain',
								value: 46182.038
							},
							{
								name: 'Estonia',
								value: 1298.533
							},
							{
								name: 'Ethiopia',
								value: 87095.281
							},
							{
								name: 'Finland',
								value: 5367.693
							},
							{
								name: 'Fiji',
								value: 860.559
							},
							{
								name: 'Falkland Islands',
								value: 49.581
							},
							{
								name: 'France',
								value: 63230.866
							},
							{
								name: 'Gabon',
								value: 1556.222
							},
							{
								name: 'United Kingdom',
								value: 62066.35
							},
							{
								name: 'Georgia',
								value: 4388.674
							},
							{
								name: 'Ghana',
								value: 24262.901
							},
							{
								name: 'Guinea',
								value: 10876.033
							},
							{
								name: 'Gambia',
								value: 1680.64
							},
							{
								name: 'Guinea Bissau',
								value: 10876.033
							},
							{
								name: 'Equatorial Guinea',
								value: 696.167
							},
							{
								name: 'Greece',
								value: 11109.999
							},
							{
								name: 'Greenland',
								value: 56.546
							},
							{
								name: 'Guatemala',
								value: 14341.576
							},
							{
								name: 'French Guiana',
								value: 231.169
							},
							{
								name: 'Guyana',
								value: 786.126
							},
							{
								name: 'Honduras',
								value: 7621.204
							},
							{
								name: 'Croatia',
								value: 4338.027
							},
							{
								name: 'Haiti',
								value: 9896.4
							},
							{
								name: 'Hungary',
								value: 10014.633
							},
							{
								name: 'Indonesia',
								value: 240676.485
							},
							{
								name: 'India',
								value: 1205624.648
							},
							{
								name: 'Ireland',
								value: 4467.561
							},
							{
								name: 'Iran',
								value: 240676.485
							},
							{
								name: 'Iraq',
								value: 30962.38
							},
							{
								name: 'Iceland',
								value: 318.042
							},
							{
								name: 'Israel',
								value: 7420.368
							},
							{
								name: 'Italy',
								value: 60508.978
							},
							{
								name: 'Jamaica',
								value: 2741.485
							},
							{
								name: 'Jordan',
								value: 6454.554
							},
							{
								name: 'Japan',
								value: 127352.833
							},
							{
								name: 'Kazakhstan',
								value: 15921.127
							},
							{
								name: 'Kenya',
								value: 40909.194
							},
							{
								name: 'Kyrgyzstan',
								value: 5334.223
							},
							{
								name: 'Cambodia',
								value: 14364.931
							},
							{
								name: 'South Korea',
								value: 51452.352
							},
							{
								name: 'Kosovo',
								value: 97.743
							},
							{
								name: 'Kuwait',
								value: 2991.58
							},
							{
								name: 'Laos',
								value: 6395.713
							},
							{
								name: 'Lebanon',
								value: 4341.092
							},
							{
								name: 'Liberia',
								value: 3957.99
							},
							{
								name: 'Libya',
								value: 6040.612
							},
							{
								name: 'Sri Lanka',
								value: 20758.779
							},
							{
								name: 'Lesotho',
								value: 2008.921
							},
							{
								name: 'Lithuania',
								value: 3068.457
							},
							{
								name: 'Luxembourg',
								value: 507.885
							},
							{
								name: 'Latvia',
								value: 2090.519
							},
							{
								name: 'Morocco',
								value: 31642.36
							},
							{
								name: 'Moldova',
								value: 103.619
							},
							{
								name: 'Madagascar',
								value: 21079.532
							},
							{
								name: 'Mexico',
								value: 117886.404
							},
							{
								name: 'Macedonia',
								value: 507.885
							},
							{
								name: 'Mali',
								value: 13985.961
							},
							{
								name: 'Myanmar',
								value: 51931.231
							},
							{
								name: 'Montenegro',
								value: 620.078
							},
							{
								name: 'Mongolia',
								value: 2712.738
							},
							{
								name: 'Mozambique',
								value: 23967.265
							},
							{
								name: 'Mauritania',
								value: 3609.42
							},
							{
								name: 'Malawi',
								value: 15013.694
							},
							{
								name: 'Malaysia',
								value: 28275.835
							},
							{
								name: 'Namibia',
								value: 2178.967
							},
							{
								name: 'New Caledonia',
								value: 246.379
							},
							{
								name: 'Niger',
								value: 15893.746
							},
							{
								name: 'Nigeria',
								value: 159707.78
							},
							{
								name: 'Nicaragua',
								value: 5822.209
							},
							{
								name: 'Netherlands',
								value: 16615.243
							},
							{
								name: 'Norway',
								value: 4891.251
							},
							{
								name: 'Nepal',
								value: 26846.016
							},
							{
								name: 'New Zealand',
								value: 4368.136
							},
							{
								name: 'Oman',
								value: 2802.768
							},
							{
								name: 'Pakistan',
								value: 173149.306
							},
							{
								name: 'Panama',
								value: 3678.128
							},
							{
								name: 'Peru',
								value: 29262.83
							},
							{
								name: 'Philippines',
								value: 93444.322
							},
							{
								name: 'Papua New Guinea',
								value: 6858.945
							},
							{
								name: 'Poland',
								value: 38198.754
							},
							{
								name: 'Puerto Rico',
								value: 3709.671
							},
							{
								name: 'North Korea',
								value: 1.468
							},
							{
								name: 'Portugal',
								value: 10589.792
							},
							{
								name: 'Paraguay',
								value: 6459.721
							},
							{
								name: 'Qatar',
								value: 1749.713
							},
							{
								name: 'Romania',
								value: 21861.476
							},
							{
								name: 'Russia',
								value: 21861.476
							},
							{
								name: 'Rwanda',
								value: 10836.732
							},
							{
								name: 'Western Sahara',
								value: 514.648
							},
							{
								name: 'Saudi Arabia',
								value: 27258.387
							},
							{
								name: 'Sudan',
								value: 35652.002
							},
							{
								name: 'South Sudan',
								value: 9940.929
							},
							{
								name: 'Senegal',
								value: 12950.564
							},
							{
								name: 'Solomon Islands',
								value: 526.447
							},
							{
								name: 'Sierra Leone',
								value: 5751.976
							},
							{
								name: 'El Salvador',
								value: 6218.195
							},
							{
								name: 'Somaliland',
								value: 9636.173
							},
							{
								name: 'Somalia',
								value: 9636.173
							},
							{
								name: 'Republic of Serbia',
								value: 3573.024
							},
							{
								name: 'Suriname',
								value: 524.96
							},
							{
								name: 'Slovakia',
								value: 5433.437
							},
							{
								name: 'Slovenia',
								value: 2054.232
							},
							{
								name: 'Sweden',
								value: 9382.297
							},
							{
								name: 'Swaziland',
								value: 1193.148
							},
							{
								name: 'Syria',
								value: 7830.534
							},
							{
								name: 'Chad',
								value: 11720.781
							},
							{
								name: 'Togo',
								value: 6306.014
							},
							{
								name: 'Thailand',
								value: 66402.316
							},
							{
								name: 'Tajikistan',
								value: 7627.326
							},
							{
								name: 'Turkmenistan',
								value: 5041.995
							},
							{
								name: 'East Timor',
								value: 10016.797
							},
							{
								name: 'Trinidad and Tobago',
								value: 1328.095
							},
							{
								name: 'Tunisia',
								value: 10631.83
							},
							{
								name: 'Turkey',
								value: 72137.546
							},
							{
								name: 'United Republic of Tanzania',
								value: 44973.33
							},
							{
								name: 'Uganda',
								value: 33987.213
							},
							{
								name: 'Ukraine',
								value: 46050.22
							},
							{
								name: 'Uruguay',
								value: 3371.982
							},
							{
								name: 'United States of America',
								value: 312247.116
							},
							{
								name: 'Uzbekistan',
								value: 27769.27
							},
							{
								name: 'Venezuela',
								value: 236.299
							},
							{
								name: 'Vietnam',
								value: 89047.397
							},
							{
								name: 'Vanuatu',
								value: 236.299
							},
							{
								name: 'West Bank',
								value: 13.565
							},
							{
								name: 'Yemen',
								value: 22763.008
							},
							{
								name: 'South Africa',
								value: 51452.352
							},
							{
								name: 'Zambia',
								value: 13216.985
							},
							{
								name: 'Zimbabwe',
								value: 13076.978
							}
						]
					}]
				},
				//数据饼图
				dataPieChart: {
					title: {
						text: '功能使用',
						left: 'center',
						top: 20
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},

					visualMap: {
						show: false,
						min: 80,
						max: 600,
						inRange: {
							colorLightness: [0, 1]
						}
					},
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '50%'],
						data: [{
								value: 335,
								name: '拼团'
							},
							{
								value: 310,
								name: '分享'
							},
							{
								value: 274,
								name: '广告'
							},
							{
								value: 235,
								name: '佣金'
							},
							{
								value: 400,
								name: '积分'
							}
						].sort(function(a, b) {
							return a.value - b.value;
						}),
						roseType: 'radius',
						
						animationType: 'scale',
						animationEasing: 'elasticOut',
						animationDelay: function() {
							return Math.random() * 200;
						}
					}]
				},
				//垂直条形图
				barChart: {
					legend: {},
					tooltip: {},
					dataset: {
						source: [
							['product', '2015', '2016', '2017'],
							['Matcha Latte', 43.3, 85.8, 93.7],
							['Milk Tea', 83.1, 73.4, 55.1],
							['Cheese Cocoa', 86.4, 65.2, 82.5],
							['Walnut Brownie', 72.4, 53.9, 39.1]
						]
					},
					xAxis: {
						type: 'category'
					},
					yAxis: {},
					// Declare several bar series, each will be mapped
					// to a column of dataset.source by default.
					series: [{
							type: 'bar'
						},
						{
							type: 'bar'
						},
						{
							type: 'bar'
						}
					]
				},
				// 比较线图
				compareLineChart: {
					color: ['#5793f3', '#d14a61', '#675bba'],
					tooltip: {
						trigger: 'none',
						axisPointer: {
							type: 'cross'
						}
					},
					legend: {
						data: ['2015 成交量', '2016 成交量']
					},
					grid: {
						top: 70,
						bottom: 50
					},
					xAxis: [{
							type: 'category',
							axisTick: {
								alignWithLabel: true
							},
							axisLine: {
								onZero: false,
								lineStyle: {
									color: '#d14a61'
								}
							},
							axisPointer: {
								label: {
									formatter: function(params) {
										return '成交量  ' + params.value +
											(params.seriesData.length ? '：' + params.seriesData[0].data : '');
									}
								}
							},
							data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10',
								'2016-11', '2016-12'
							]
						},
						{
							type: 'category',
							axisTick: {
								alignWithLabel: true
							},
							axisLine: {
								onZero: false,
								lineStyle: {
									color: '#5793f3'
								}
							},
							axisPointer: {
								label: {
									formatter: function(params) {
										return '成交量  ' + params.value +
											(params.seriesData.length ? '：' + params.seriesData[0].data : '');
									}
								}
							},
							data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10',
								'2015-11', '2015-12'
							]
						}
					],
					yAxis: [{
						type: 'value'
					}],
					series: [{
							name: '2015 成交量',
							type: 'line',
							xAxisIndex: 1,
							smooth: true,
							data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
						},
						{
							name: '2016 成交量',
							type: 'line',
							smooth: true,
							data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
						}
					]
				}
			}
		}
	}
</script>

<style>
	.row-style {
		margin-top: 20px;
	}

	.box-card {
		border-radius: 5px;
	}
	
	.info-box{
		display: flex;
		justify-content: space-between;
	}
	
	.num-box{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
</style>
