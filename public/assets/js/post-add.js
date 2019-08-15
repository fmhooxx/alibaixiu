// 向服务器端发送请求 获取文章分类数据
$.ajax({
	url: '/categories',
	type: 'get',
	success: function (response) {
		var html = template('categoryTpl', { data: response });
		$('#category').html(html);
	}
})

// 当管理员选择文件的时候 触发事件
$('#feature').on('change', function () {
	// 获取到管理员选择到的文件
	var file = this.files[0];
	// 创建formData对象 实现二进制文件上传
	var formData = new FormData();
	// 将管理员选择到的文件追加到formData对象中
	formData.append('cover', file);
	// 实现文章封面图片上传
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		// 告诉$.ajax方法不要处理data属性对应的参数
		processData: false,
		// 告诉$.ajax方法不要设置参数类型
		contentType: false,
		success: function (response) {
			$('#thumbnail').val(response[0].cover);
		}
	})
});

// 当添加文章表单提交的时候
$('#addForm').on('submit', function () {
	// 获取管理员在表单中输入的内容
	var formData = $(this).serialize();
	// 向服务器端发送请求 实现添加文章功能
	$.ajax({
		type: 'post',
		url: '/posts',
		data: formData,
		success: function () {
			// 文章添加成功 跳转到文章列表页面
			location.href = '/admin/posts.html'
		}
	})
	// 阻止表单默认提交的行为
	return false;
});

// 获取浏览器地址栏中的 id 参数
function getUrlParams(name) {
	// location.search 里面就是包含者从 ? 之后的所有的字符串形式的参数
	// console.log(location.search);
	// 现在截取这段字符串 去掉 ? 并且利用方法 split() 将字符串分割成数组
	var paramsAry = location.search.substr(1).split('&');
	// console.log(paramsAry); ["id=5d53bdae9f1cd235ecdd1178"]
	// 利用 for 循环 将 ["id=5d53bdae9f1cd235ecdd1178"] 转换成数组 ["id", "5d53bdae9f1cd235ecdd1178"]
	for (var i = 0; i < paramsAry.length; i++) {
		var tmp = paramsAry[i].split('=');
		if (name == tmp[0]) {
			// console.log(tmp[1]); 这样就获得了要修改文章的用户的 id
			return tmp[1];
		}
	}
	// 如果返回的结果是 -1 的说管理员进行的是添加新用户
	return -1;
};

// 获取浏览器地址中的 id 值
var id = getUrlParams('id');
// 判断 id 的值 如果 id 的值不是 -1 的 说明管理员进行的是 修改文章操作
if (id != -1) {
	// 根据 id 获取文章的相信信息
	$.ajax({
		url: '/posts/' + id,
		type: 'get',
		success: function (data) {
			console.log(data);
			$.ajax({
				url: '/categories',
				type: 'get',
				success: function (response) {
					console.log(response);
					data.response = response
					var html = template('modifyTpl', data);
					console.log(html);
					$('#parentBox').html(html);
				}
			})
		}
	})
};

// 当修改文章信息表单发生提交行为的时候
$('#parentBox').on('submit', '#modifyForm', function () {
	// 获取管理员再表单中输入的内容
	var formData = $(this).serialize();
	// 获取管理员正在修改的文章id
	var id = $(this).attr('data-id');
	// 向服务器端发送请求
	$.ajax({
		type: 'put',
		url: '/posts/' + id,
		data: formData,
		success: function () {
			location.href = '/admin/posts.html';
		}
	})
	// 阻止表单的默认事件
	return false;
})