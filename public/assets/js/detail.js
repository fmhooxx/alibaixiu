// 从地址栏中获取 id 值
var id = getUrlParams('id');
// // 评论是否进过人工审核
// var review;
// 向服务器端发送请求 根据 id 值获取相应的文章
$.ajax({
	type: 'get',
	url: '/posts/' + id,
	success: function (data) {
		var html = template('postTpl', data);
		$('#article').html(html)
	}
});

// 为点赞按钮绑定事件
$('#article').on('click', '#like', function () {
  // 向服务器端发送请求 执行该操作
  $.ajax({
    url: '/posts/fabulous/' + id,
    type: 'post',
    success: function () {
      alert('点赞成功');
      location.reload();
    }
  })
})