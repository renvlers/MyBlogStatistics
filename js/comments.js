var chartDom = document.getElementById('comments');
var commentsChart = echarts.init(chartDom);
var option;

axios.get("http://47.108.204.33:8888/category/getcomment").then(function (response) {
    let rst = response.data.data;
    option = {
        title: {
            text: '各分类文章评论总数排行榜',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#fff'
            }
        },
        dataset: [
            {
                dimensions: ['cgname', 'totalComments'],
                source: rst.map((val) => { return [val.cg_name, val.total_comments] })
            },
            {
                transform: {
                    type: 'sort',
                    config: { dimension: 'totalComments', order: 'desc' }
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
            encode: { x: 'cgname', y: 'totalComments' },
            datasetIndex: 1,
            itemStyle: {
                color: "rgb(102, 204, 255)"
            }
        }
    };

    option && commentsChart.setOption(option);

    window.addEventListener('resize', function () {
        commentsChart.resize();
    });
});