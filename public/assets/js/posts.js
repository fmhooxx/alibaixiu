// 向服务器发送请求 获取文章列表页面数据
$.ajax({
	type: 'get',
	url: '/posts',
	success: function (data) {
    var html = template('postsTpl', data);
		$('#postsBox').html(html);
		var page = template('pageTpl', data);
		$('#page').html(page);
	}
});

// 处理日期的时间格式
function formateDate(date) {
  // 将日期字符串转换成日期对象
  var date = new Date();
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};

// 分页
function changePage(page) {
  // 再向服务器端发送请求 获取页面列表数据
  $.ajax({
    type: 'get',
    url: '/posts',
    data: {
      page: page
    },
    success: function (data) {
      var html = template('postsTpl', data);
      $('#postsBox').html(html);
      var page = template('pageTpl', data);
      $('#page').html(page);
    }
  })
};

// 向服务器端发送请求 索要分类数据
$.ajax({
  url: '/categories',
  type: 'get',
  success: function (data) {
    var html = template('categoryTpl', {result: data});
    $('#categoryBox').html(html);
  }
});

// 当用户进行文章列表筛选的时候
$('#filterForm').on('submit', function () {
  // 接受管理员的筛选条件
  var formData = $(this).serialize();
  // 向服务器发送请求 根据条件获取到文章列表的数据
  $.ajax({
    type: 'get',
    url: '/posts',
    data: formData,
    success: function (data) {
      var html = template('postsTpl', data);
      $('#postsBox').html(html);
      var page = template('pageTpl', data);
      $('#page').html(page);
    }
  })
  // 阻止表单的默认提交事件
  return false;
});

// 绑定删除框点击事件
$('#postsBox').on('click', '.delete', function () {
  // 获取要删除的文章的 id 值
  var id = $(this).attr('data-id');
  // 向服务器端发送请求 执行删除操作
  $.ajax({
    url: '/posts/' + id,
    type: 'delete',
    success: function () {
      // 删除完成 刷新页面
      location.reload();
    }
  })
})