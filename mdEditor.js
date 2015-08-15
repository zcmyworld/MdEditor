var mod = 1;
$(function() {
	different();
	//initUI
	var winWidth = $(window).width();
	$("#mainBox").width(winWidth * 1.51);

	$("#one").width(winWidth * 0.49);
	$("#two").css("margin-left", winWidth * 0.01);
	$("#two").width(winWidth * 0.49);
	$("#three").css("margin-left", winWidth * 0.02);
	$("#three").width(winWidth * 0.47);

	function play(data) {
		$("#mainBox").animate({
			left: -data
		});
	}

	//图片拖拽上传
	var control = document.getElementById("box");
	control.addEventListener('dragover', function(event) {
		event.preventDefault();
	})
	control.addEventListener('drop', function(event) {
		event.preventDefault();
		var fileList = event.dataTransfer.files;
		progressInit();
		for (var i = 0; i < fileList.length; i++) {
			var form = new FormData();
			form.append("photo", fileList[0])
			var xhr = new XMLHttpRequest();
			xhr.onload = function() {
				// console.log('upload complete')
			}
			xhr.open('post', '/upload', true);
			xhr.send(form)
		}
	})

	//生成markdown
	$("#input").keyup(function(e) {
		var input = $("#input").val();
		var markedownStr = marked(input);
		$("#output").html(markedownStr);
		hljs.initHighlighting();
		different();
	})

	//切换页面
	$(document).keydown(function(e) {
		//esc
		if (e.keyCode == 27 && mod == 1) {
			mod = 2;
			$("#mainBox").animate({
				left: - winWidth * 0.49
			}, 100);
			return;
		}
		if (e.keyCode == 27 && mod == 2) {
			mod = 1
			$("#mainBox").animate({
				left: 0
			}, 100);
			return;
		}
	});

	//进度条
	function progressInit() {
		$("body").append("<div id='all'></div>");
		var html = '<div class="progressbar" data-perc="100">';
		html += '<div class="bar color4"><span></span></div>';
		html += '<div class="label"><span></span></div>';
		html += '</div>';
		$("body").append(html);
		setProgress(98);
	}

	function progressClose() {
		setProgress(100);
		$(".progressbar").remove();
		$("#all").remove();
		// $("#all").hide();
		// $(".progressbar").hide();
	}

	function setProgress(dataperc) {
		var t = $('.progressbar');
		var barperc = Math.round(dataperc * 5.56);
		t.find('.bar').animate({
			width: barperc
		}, dataperc * 10);
		t.find('.label').append('<div class="perc"></div>');

		function perc() {
			var length = t.find('.bar').css('width'),
				perc = Math.round(parseInt(length) / 5.56),
				labelpos = (parseInt(length) - 2);
			t.find('.label').css('left', labelpos);
			if (perc == 100) {
				t.find('.perc').text('完成');
				return;
			}
			t.find('.perc').text(perc + '%');
		}
		perc();
		setInterval(perc, 0);
	}
	//提交
	$("#sub").click(function() {

	})
})

function showMarkdown() {
	var rs = editor.getValue();
	var markedownStr = marked(rs);
	$("#output").html(markedownStr);
	hljs.initHighlighting();
	different();
}


function different() {
	// var html = "<p>41</p>";
	var html2 = "<h2>Hello World!</h2>";
	// $("#output").html(html);
	$("#outputHistory").html(html2);

	var newhtml = $("#output").html();
	var oldhtml = $("#outputHistory").html();

	if (newhtml.length == 0 || oldhtml.length == 0) {
		return;
	}

	var UE = globalVar.UE;
	var root_o = UE.htmlparser(oldhtml);
	var root_n = UE.htmlparser(newhtml);

	var root = compare(root_n, root_o);
	var result = root.toHtml();

	$("#outputHistory").html(result);
}


// function setPhoto() {
// 	var rs = editor.getValue();
// 	var url = "http://zcmyworld-images.qiniudn.com/FgyOyFSe0cghbmxiLgb5NoEmJBcr";
// 	var img = "<br><img src='" + url + "'/>";
// 	var rs = rs + img;
// 	editor.setValue(rs);
// }