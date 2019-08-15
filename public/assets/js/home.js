// 向服务器端发送请求 索要轮播图数据
$.ajax({
	type: 'get',
	url: '/slides',
	success: function (data) {
		// console.log(data)
		var html = template('slidesTpl', {result: data});
		$('#slidesBox').html(html)
		//
		var swiper = Swipe(document.querySelector('.swipe'), {
		  auto: 3000,
		  transitionEnd: function (index) {
		    // index++;

		    $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
		  }
		});

		// 上/下一张
		$('.swipe .arrow').on('click', function () {
		  var _this = $(this);

		  if(_this.is('.prev')) {
		    swiper.prev();
		  } else if(_this.is('.next')) {
		    swiper.next();
		  }
		})
	}
});


// 处理日期的时间格式
function formateDate(date) {
  // 将日期字符串转换成日期对象
  var date = new Date();
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};


// 向服务器端发送请求 索要最新发布数据
$.ajax({
	type: 'get',
	url: '/posts/lasted',
	success: function (data) {
		// console.log(data)
    var html = template('lastedTpl', {result: data});
    // console.log(html);
		$('#lastedBox').html(html);
	}
})