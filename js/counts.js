var chartDom = document.getElementById('counts');
var countsChart = echarts.init(chartDom);
var option;

axios.get("http://47.108.204.33:8888/category/getarticle").then(function (response) {
    let result = response.data.data;
    option = {
        title: {
            text: '各分类文章占比统计',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#fff'
            }
        },
        series: [
            {
                name: 'Counts group by categories',
                type: 'pie',
                radius: '60%',
                center: ['50%', '60%'],
                data: result.map((val) => { return { value: val.total_articles, name: val.cg_name } }).sort(function (a, b) {
                    return a.value - b.value;
                }),
                // roseType: 'radius',
                label: {
                    color: 'rgba(255, 255, 255, 1)',
                    formatter: '{b}: {d}%'
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 1)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 0
                },
                itemStyle: {
                    color: '#a21531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 1)',
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };

    option && countsChart.setOption(option);

    window.addEventListener('resize', function () {
        countsChart.resize();
    });

});