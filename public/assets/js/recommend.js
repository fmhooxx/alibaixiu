// 向服务器端发送请求  获取热门信息数据
$.ajax({
  url: '/posts/recommend',
  type: 'get',
  success: function (data) {
    // console.log(data);
    // 为了将模板变成公共的，所以将模板写在了js文件中
    var recommendTpl = `
      {{each result}}
        <li>
          <a href="detail.html?id={{$value._id}}">
            <img src="{{$value.thumbnail}}" alt="">
            <span>{{$value.title}}</span>
          </a>
        </li>
      {{/each}}
      `
    var html = template.render(recommendTpl, {result: data});
    // console.log(html);
    $('#recommendBox').html(html);
  }
})