var chartDom = document.getElementById('likes');
var likesChart = echarts.init(chartDom);
var option;

axios.get("http://47.108.204.33:8888/category/getthumbsup").then(function (response) {
    let rst = response.data.data;
    option = {
        title: {
            text: '各分类文章点赞总数排行榜',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#fff'
            }
        },
        dataset: [
            {
                dimensions: ['cgname', 'totalLikes'],
                source: rst.map((val) => { return [val.cg_name, val.total_likes] })
            },
            {
                transform: {
                    type: 'sort',
                    config: { dimension: 'totalLikes', order: 'desc' }
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
            encode: { x: 'cgname', y: 'totalLikes' },
            datasetIndex: 1,
            itemStyle: {
                color: "#cc33ff"
            }
        }
    };

    option && likesChart.setOption(option);

    window.addEventListener('resize', function () {
        likesChart.resize();
    });
});