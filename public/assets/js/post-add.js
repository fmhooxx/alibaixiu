// 向服务器端发送请求 获取文章分类数据
$.ajax({
	url: '/categories',
  type: 'get',
  success:function (data) {
    var html = template('categoryTpl', {result: data});
    $('#category').html(html);
  }
});

// 当管理员选择文件的时候 触发事件
$('#feature').on('change', function () {
  // 获取选中的文件
  var file = this.files[0];
  // 创建 formData 对象 实现二进制上传文件
  var formData = new FormData();
  // 将管理员选择的文件追加到 formData 中
  formData.append('cover', file);
  // 向服务器端发送请求 实现封面图片的上传
  $.ajax({
    type: 'post',
		url: '/upload',
		data: formData,
		// 告诉$.ajax方法不要处理data属性对应的参数
		processData: false,
		// 告诉$.ajax方法不要设置参数类型
		contentType: false,
    success: function (data) {
      console.log(data);
      $('#thumbnail').val(data[0].cover);
    }
  })
});

// 当添加文章表单提交的时候
$('#addForm').on('submit', function () {
  // 获取管理员在表单中输入的内容
  var formData = $(this).serialize();
  // 向服务器端发送请求 实现添加文章的功能
  $.ajax({
    url: '/posts',
    type: 'post',
    data: formData,
    success: function (data) {
      console.log(data);
    }
  })
  // 阻止表单默认的提交行为
  return false;
})