var chartDom = document.getElementById('details');
var detailsChart = echarts.init(chartDom);
var option;

// 假设你有以下的请求 URLs
const url0 = 'http://47.108.204.33:8888/category/getarticle';
const url1 = 'http://47.108.204.33:8888/category/getbrowse';
const url2 = 'http://47.108.204.33:8888/category/getthumbsup';
const url3 = 'http://47.108.204.33:8888/category/getcomment';
const url4 = 'http://47.108.204.33:8888/category/getcollect';
const url5 = 'http://47.108.204.33:8888/category/getthumbsuprate';

// 使用 Promise.all() 发起多个请求
Promise.all([
    axios.get(url0),
    axios.get(url1),
    axios.get(url2),
    axios.get(url3),
    axios.get(url4),
    axios.get(url5),
]).then((responses) => {
    // 当所有请求都完成后，这里的代码会被执行
    const data1 = responses[0].data.data;
    const data2 = responses[1].data.data;
    const data3 = responses[2].data.data;
    const data4 = responses[3].data.data;
    const data5 = responses[4].data.data;
    const data6 = responses[5].data.data;

    const cgName = data2.map((val) => { return val.cg_name });
    const counts = data1.map((val) => { return val.total_articles });
    const views = data2.map((val) => { return val.total_browses });
    const likes = data3.map((val) => { return val.total_likes });
    const comments = data4.map((val) => { return val.total_comments });
    const favorites = data5.map((val) => { return val.total_collects });
    const likeRates = data6.map((val) => { return val.like_to_read_ratio });

    // 在这里处理返回的数据
    console.log(responses);
    option = {
        title: {
            text: '各类文章数据雷达图',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            data: cgName,
            textStyle: {
                color: "white"
            },
            orient: 'horizontal',
            bottom: '0%'
        },
        radar: {
            // shape: 'circle',
            indicator: [
                { name: "文章数", max: Math.max(...counts) },
                { name: '阅读量', max: Math.max(...views) },
                { name: '点赞数', max: Math.max(...likes) },
                { name: '评论量', max: Math.max(...comments) },
                { name: '收藏量', max: Math.max(...favorites) },
                { name: '点赞率', max: 1 }
            ],
            radius: '55%'

        },
        series: [
            {
                name: 'Budget vs spending',
                type: 'radar',
                data: data1.map((val, idx) => {
                    return {
                        value: [counts[idx], views[idx], likes[idx], comments[idx], favorites[idx], likeRates[idx]],
                        name: cgName[idx]
                    }
                })
            }
        ]
    };

    option && detailsChart.setOption(option);

    window.addEventListener('resize', function () {
        detailsChart.resize();
    });

}).catch((error) => {
    // 如果有任何一个请求失败了，这里的代码会被执行
    console.error('Error fetching data:', error);
});
