// 当修改密码表单发生提交行为的时候
$('#modifyForm').on('submit', function () {
  // 获取用户在表单中的输入内容
  var formData = $(this).serialize();
  $('#box').css('display', 'block');
  // 向服务器端发送请求 修改密码
  $.ajax({
    url: '/users/password',
    type: 'put',
    data: formData,
    success: function () {
      setTimeout(function () {
        
        location.href = "/admin/login.html"
      }, 2000)
    }
  });
  // 阻止表单默认提交的行为
  return false;
})