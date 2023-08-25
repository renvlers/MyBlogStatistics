var chartDom = document.getElementById('favorites');
var favoritesChart = echarts.init(chartDom);
var option;

axios.get("http://47.108.204.33:8888/category/getcollect").then(function (response) {
    let rst = response.data.data;
    option = {
        title: {
            text: '各分类文章收藏总数排行榜',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#fff'
            }
        },
        dataset: [
            {
                dimensions: ['cgname', 'totalFavorites'],
                source: rst.map((val) => { return [val.cg_name, val.total_collects] })
            },
            {
                transform: {
                    type: 'sort',
                    config: { dimension: 'totalFavorites', order: 'desc' }
                }
            }
        ],
        xAxis: {
            type: 'category',
            axisLabel: { interval: 0, rotate: 30, color: "white" },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: function (value) {
                    // 只返回整数
                    if (Number.isInteger(value)) {
                        return value;
                    }
                },
                color: "white"
            }
        },
        series: {
            type: 'bar',
            encode: { x: 'cgname', y: 'totalFavorites' },
            datasetIndex: 1,
            itemStyle: {
                color: "#88ff22"
            }
        }
    };

    option && favoritesChart.setOption(option);

    window.addEventListener('resize', function () {
        favoritesChart.resize();
    });
});