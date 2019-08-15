// 获取地址栏中的categoryId参数
var id = getUrlParams('categoryId');

// 向服务器端发送请求 根据分类 id 获取文章列表
$.ajax({
  url: '/posts/category/' + id,
  type: 'get',
  success: function (data) {
    var html = template('listTpl', {result: data});
    $('#listBox').html(html);
  }
});

// 根据分类 id 获取分类信息
$.ajax({
  url: '/categories/' + id,
  type: 'get',
  success: function (data) {
    $('#categoryTitle').html(data.title)
  }
})