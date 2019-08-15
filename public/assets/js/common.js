$('#logout').on('click', function () {
  // confirm() 方法 返回一个布尔值 根据布尔值判断用户是否退出
  var isConfirm = confirm('您确定要退出吗?');
  if (isConfirm) {
    $.ajax({
      url: '/logout',
      type: 'post',
      success: function (data) {
        location.href = 'login.html';
      },
      error: function () {
        alert('退出失败');
      }
    })
  }
});

// 想服务器端发送请求 获取用户登录信息
$.ajax({
  url: '/users/' + userId,
  type: 'get',
  success: function (data) {
    // console.log(data);
    $('.avatar').attr('src', data.avatar);
    $('.profile .name').html(data.nickName)
  }
})
