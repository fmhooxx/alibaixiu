// 当管理员选择文件的时候触发
$('#file').on('change', function () {
  // 用户选择的文件
  var file = this.files[0];
  // 创建formData对象实现二进制文件上传
  var formData = new FormData();
  // 将选择的文件添加到 formData 对象中
  formData.append('image', file);
  // 向服务器端发送请求 实现文件上传
  $.ajax({
    url: '/upload',
    type: 'post',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      // console.log(data[0].image)
      $('#image').val(data[0].image)
    }
  })
});

// 当轮播图表单发生提交事件
$('#slidesForm').on('submit', function () {
  // 获取管理员在表单中输入的内容
  var formData = $(this).serialize();
  // 向服务器端发送请求 添加轮播图数据
  $.ajax({
    url: '/slides	',
    type: 'post',
    data: formData,
    success: function (data) {
      // 添加成功 刷新页面
      location.reload();
      // console.log(1);
    }
  })
  // 阻止表单的默认提交事件
  return false;
});

// 向服务器端发送请求 获取轮播图的数据 并展示在页面上
$.ajax({
  url: '/slides',
  type: 'get',
  success: function (data) {
    // console.log(data);
    var html = template('slidesTpl', {result: data})
    $('#slidesBox').html(html);
  }
});

// 给删除按钮绑定事件
$('#slidesBox').on('click', '.delete', function () {
  if (confirm('您确定要删除吗？')) {
    // 获取要删除的轮播图 id
    var id = $(this).attr('data-id');
    // 向服务器端发送请求 执行删除操作 删除成功 刷新页面
    $.ajax({
      url: '/slides/' + id,
      type: 'delete',
      success: function () {
        location.reload();
      }
    })
  }
})