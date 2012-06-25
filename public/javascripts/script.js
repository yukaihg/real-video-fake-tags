$(document).ready(function () {

	$("body").click(function (evt) {
		var target = evt.target;
		console.log($(target).parent().attr("class"));
		if ($(target).attr("class") !== 'tooltip' && $(target).parent().attr("class") !== 'tooltip' && $(target).parent().parent().attr("class") !== 'tooltip') {
			$(".tooltip").hide();
		}
	});



	var myPlayer = _V_("player");
	var duration = 0;

	myPlayer.ready(function () {

		var myPlayer = this;

		// EXAMPLE: Start playing the video.
		//myPlayer.play();

		if (!duration) {

		}

	});

	myPlayer.addEvent('durationchange', function () {

		var comments;
		jQuery.get("/api/comments/", function (data, textStatus, jqXHR) {
			console.log("Get resposne:");
			console.dir(data);
			if(data){

				duration = myPlayer.duration();
                //console.log(data.length);
				$.each(data,function(index,element){
					var position = (element.start / myPlayer.duration()) * 980;
					insertMarker(position,element);
					appendComment(element)
				})


			}
			console.log(textStatus);
			console.dir(jqXHR);
		});




	});


	$(".marker").live('mouseover', function () {
		$('.tooltip').hide();
		$(this).next().show();
	})


	$('.start_time').live('click', function () {
		var time = $(this).attr('data-time');
		myPlayer.currentTime(time);
		myPlayer.play();
		$('.tooltip').fadeOut('slow');
		$("body").scrollTop(0);
	})

	$('#btn_show_comment').bind('click', function () {
		$('#make_comment_time').val(convert(myPlayer.currentTime()));
		$('#make_comment_time').attr('data-time',myPlayer.currentTime());
		$('#make_comment').slideDown();
		myPlayer.pause();
	})

	$('#btn_make_comment_time').bind('click', function () {

		$('#make_comment_time').val(convert(myPlayer.currentTime()));
		$('#make_comment_time').attr('data-time',myPlayer.currentTime());
		myPlayer.pause();
		return false;

	})

	$('form').bind('submit',function(){
		var data = {}
		data.start = $('#make_comment_time').attr('data-time');
		data.name = "Guest";
		data.avatar = "/images/1.jpg";
		data.comment =  $('#make_comment_context').val();

		jQuery.post("/api/comments", data, function (data, textStatus, jqXHR) {
			console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR);
			if(data){
				var position = (data.start / myPlayer.duration()) * 980;
				insertMarker(position,data);
				appendComment(data);
				$('#make_comment').slideDown();
				myPlayer.play();
			}
		});



		return false;

	})

	$('#btn_show_share').bind('click',function(){
		alert('under construction... basically what\'s on the white board');
		return false;

	})



});

function convert(totalSec) {
	totalSec = parseInt(totalSec, 10);

	minutes = parseInt(totalSec / 60, 10) % 60;
	seconds = totalSec % 60;

	return result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);

}


function insertMarker(position,data){
	var marker = '<div class="marker" style="left:' + position + 'px;"></div>';
	var tooltip = '<div class="tooltip" style="left:' + (position - 150) + 'px;"> <p>' + data.name + ' comment at <time class="start_time" data-time="' + data.start + '">' + convert(data.start) + '</time></p><p>' + data.comment + '</p></div>';

	$('#timeline').append(marker + tooltip);
}

function appendComment(data){
	var comment = '<article class="clearfix">'
			+ '<a  href="#">'
			+ '<img src="' + data.avatar + '"  class="portrait">'
			+ '</a>'
			+ '<div class="comment">'
			+ '<p class="meta">'
			+ '<a href="#" class="name">' +data.name + '</a>'
			+ 'comment on  <time data-time="' + data.start + '" class="start_time">' + convert(data.start) + '</time>'
			+ '</p>'
			+ '<div class="text">'
			+ '<p class="first">' + data.comment + '</p></div>'
			+ '</div></article>'
		;

	$('#comments').prepend(comment);
}