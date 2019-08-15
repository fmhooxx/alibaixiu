// 获取到浏览器地址栏中的搜索关键字
var key = getUrlParams('key');
// 根据搜索关键字 向服务器端发送请求 获取搜索页面数据
$.ajax({
  url: '/posts/search/' + key,
  type: 'get',
  success: function (data) {
    var html = template('searchTpl', {result: data});
    $('#listBox').html(html);
  }
})