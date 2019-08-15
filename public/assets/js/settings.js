// 当管理员选择logo图片时
$('#logo').on('change', function () {
  // 获取管理员选择的文件
  var file = this.files[0];
  console.log(file);
  // 创建 formData 对象 实现二进制文件上传
  var formData = new FormData();
  // 将管理员选择的文件添加到 formData 对象中
  formData.append('logo', file);
  // 如果有上传图片 才向服务器端发送请求 也就是执行 ajax
  // 向服务器端发送请求 实现文章的上传
  if (file) {
    $.ajax({
      url: '/upload',
      type: 'post',
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        // console.log(data);
        $('#hiddenLogo').val(data[0].logo)
        // 将文件显示在页面上
        $('#preview').attr('src', data[0].logo);
      }
    })
  }
});

// 当网站设置表单发生提交行为时
$('#settingsForm').on('submit', function () {
  // 获取管理员在表单中输入的内容
  var formData = $(this).serialize();
  // 向服务器端发送请求 实现网站数据的添加 成功添加后 刷新页面
  $.ajax({
    url: '/settings',
    type: 'post',
    data: formData,
    success: function () {
      location.reload();
    }
  })
  // 阻止表单的默认提交行为
  return false;
});

// 向服务器端发送请求 获取网站设置的列表数据
$.ajax({
  url: '/settings',
  type: 'get',
  success: function (data) {
    // console.log(data);
    // 判断数据是否存在
    if(data) {
      // 将 logo 地址存储在隐藏域中
      $('#hiddenLogo').val(data.logo);
      // 将 logo 展示在页面上
      $('#preview').attr('src', data.logo);
      // 将站点名称显示在页面上
      $('input[name="title"]').val(data.title);
      // 将是否开去评论功能显示在页面上
      $('input[name="comment"]').prop('checked', data.comment);
      // 将评论是否经过人工审核显示在页面上
      $('input[name="review"]').prop('checked', data.review);
    }
  }
})