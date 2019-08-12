// 当表单发生提交行为的时候
$('#userForm').on('submit', function () {
  // 用 serialize() 方法获取用户在表单中输入的内容 并将内容格式化成字符串的参数
  var formData = $(this).serialize();
  // 向服务器端发送请求
  $.ajax({
    type: 'post',
    url: '/users',
    data: formData,
    success: function () {
      // 刷新页面
      location.reload();
    },
    error: function () {
      alert('用户添加失败');
    }
  })
  // 阻止表单的默认提交事件
  return false;
});

// 当用户选择文件的时候
$('#modifyBox').on('change', '#avatar', function () {
  // this.files[0] 用户选择的文件
  var formData = new FormData();
  formData.append('avatar', this.files[0]);
  // 向服务器发送请求
  $.ajax({
    type: 'post',
    url: '/upload',
    data: formData,
    // 告诉 $.ajax 方法不要解析请求参数
    processData: false,
    // 告诉 $.ajax 方法不要设置请求参数的类型
    contentType: false,
    success: function (data) {
      // console.log(data);
      // 实现头像预览功能
      $('#preview').attr('src', data[0].avatar);
      $('#hiddenAvatar').val(data[0].avatar);
    }
  })
});

// 向服务器端发送请求
$.ajax({
  type: 'get',
  url: '/users',
  success: function (data) {
    // console.log(data);
    // 拼接模板字符串
    var html = template('userTpl', { result: data });
    // 将拼接好的字符串显示在页面上
    $('#userBox').html(html);
  }
});

// 通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function () {
  // 获取被点击用户的 id 值
  var id = $(this).attr('data-id');
  // 根据 id 值获取用户的信息
  $.ajax({
    type: 'get',
    url: '/users/' + id,
    success: function (data) {
      // console.log(data);
      // 拼接模板字符串
      var html = template('modifyTpl', data);
      // 将拼接好的字符串显示在页面上
      $('#modifyBox').html(html);
    }
  })
});

// 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function () {
  // 获取用户在表单中输入的内容
  var formData = $(this).serialize();
  // 获取要修改的那个用户的 id 值
  var id = $(this).attr('data-id');
  // 向服务器端发送请求 修改用户信息
  $.ajax({
    type: 'put',
    url: '/users/' + id,
    data: formData,
    success: function (data) {
      // 如果用户信息修改成功 重新加载页面
      location.reload();
    }
  });
  // 阻止表单默认提交
  return false;
});

// 为删除按钮绑定点击事件
$('#userBox').on('click', '.delete', function () {
  // 再次确定是否删除
  if (confirm('确定删除该用户吗?')) {
    // 获取要被删除用户的 id
    var id = $(this).attr('data-id');
    // 向服务器端发送请求
    $.ajax({
      type: 'delete',
      url: '/users/' + id,
      success: function (data) {
        // 当删除成功之后 刷新页面
        location.reload();
      }
    })
  }
});

// 为全选按钮的状态发生改变的时候绑定事件
$('#selectAll').on('change', function () {
  // 获取全选按钮的状态
  var status = $(this).prop('checked');
  // 获取所有的用户并将用户的状态按钮和全选按钮保持一致
  $('#userBox').find('.userStatus').prop('checked', status);
  // 判断全选按钮的状态
  if (status) {
    // 如果是选中的状态 是 true 批量删除按钮显示
    $('#deleteMany').show()
  } else {
    // 如果未处于选中状态 是 false 批量删除按钮隐藏
    $('#deleteMany').hide()
  }
});

// 当用户前面的复选框状态发生改变的时候
$('#userBox').on('change', '.userStatus', function () {
  // 获取到所有用户 在所有用户中过滤除选中的用户
  // 判断选中用户的数量和所有用户的数量是否是一致
  // 如果一致 就说明所有的用户都是选中的
  // 如果不一致 就说明有用户没有被选中
  // 获取所有的用户
  var inputs = $('#userBox').find('.userStatus')
  // 用 filter() 方法 将所有用户中处于被选中状态的用户 组成一个数组
  // 如果被选中用户的数组长度等于所有用户的长度 那么全选按钮处于选中状态
  // 否则是未选中状态
  if (inputs.length == inputs.filter(':checked').length) {
    $('#selectAll').prop('checked', true);
  } else {
    $('#selectAll').prop('checked', false);
  };
  // 如果选中的复选框的数量大于 0 就说明有选中的复选框
  if (inputs.filter(':checked').length > 0) {
    // 显示批量删除按钮
    $('#deleteMany').show()
  } else {
    // 隐藏批量删除按钮
    $('#deleteMany').hide()
  }
});

// 为批量删除按钮添加点击事件
$('#deleteMany').on('click', function () {
  var ids = [];
  // 获取选中的用户
  var checkedUser = $('#userBox').find('.userStatus').filter(':checked');
  // 循环复选框 从复选框元素的身上获取 data-id 属性的值
  checkedUser.each(function (index, item) {
    // item 代表每个循环中的 元素
    // console.log(item);
    ids.push($(item).attr('data-id'));
  });
  if (confirm('您确定要进行批量删除的吗？')) {
    $.ajax({
      type: 'delete',
      url: '/users/' + ids.join('-'),
      success: function () {
        location.reload();
      }
    })
  }
})