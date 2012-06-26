$(document).ready(function () {


	//create a new player using the HTML5 video's id attributes
	var myPlayer = _V_("player");

	//initialize duration to 0
	var duration = 0;

	myPlayer.ready(function () {
		//when the JS player is in ready state, start do things

		var myPlayer = this;

		myPlayer.addEvent('durationchange', function () {

			//fires when time duration changes, means that we loaded the a new video file succsufully

			if ($('#player_html5_api').attr('pluginspage') === 'http://go.divx.com/plugin/download/'){
				//some user has divx web player install and hijack our player, pop a message says it's wrong
				alert('Fuck DivX Plus Web Player, Uninstall it now!!!');

			};

			var comments;

			jQuery.get("/api/comments/", function (data, textStatus, jqXHR) {
				//call the api to get all the comments

				console.log("Get resposne:");
				console.dir(data);
				if(data){
					// if we have some results returned, render them on page

					duration = myPlayer.duration();
					//console.log(data.length);
					$.each(data,function(index,element){
						//caculate the position of the tags using percentage

						var position = (element.start / myPlayer.duration()) * 980;

						//insert the tags on timeline
						insertMarker(position,element);

						//prepend comment on comment area
						prependComment(element)
					})


				}

				//TODO: error handling
				console.log(textStatus);
				console.dir(jqXHR);
			});




		});



	});




	$(".marker").live('mouseover', function () {
		//when mouse move over tags, show its related tooltips, using live here since new tags can be generated any time

		$('.tooltip').hide();
		$(this).next().show();
	})


	$('.start_time').live('click', function () {
		//when user clicks on "00:30", move the movie to 00:30

		var time = $(this).attr('data-time');
		myPlayer.currentTime(time);
		myPlayer.play();
		$('.tooltip').fadeOut('slow');
		$("body").scrollTop(0);
	})

	$('#btn_show_comment').bind('click', function () {
		//show comment form when the button is clicked, using data-time to record the value in seconds unit
		$('#make_comment_time').val(convert(myPlayer.currentTime()));
		$('#make_comment_time').attr('data-time',myPlayer.currentTime());
		$('#make_comment').slideDown();
		myPlayer.pause();
	})

	$('#btn_make_comment_time').bind('click', function () {
		//get current time value into the start time input box, using data-time to record the value in seconds unit

		$('#make_comment_time').val(convert(myPlayer.currentTime()));
		$('#make_comment_time').attr('data-time',myPlayer.currentTime());
		myPlayer.pause();
		return false;

	})

	$('#btn_show_share').bind('click',function(){
		//TODO: share functionality
		alert('under construction... basically what\'s on the white board');
		return false;

	})


	//if we click anyelse where, the tooltip will be dismiss
	$("body").click(function (evt) {
		var target = evt.target;
		console.log($(target).parent().attr("class"));
		if ($(target).attr("class") !== 'tooltip' && $(target).parent().attr("class") !== 'tooltip' && $(target).parent().parent().attr("class") !== 'tooltip') {
			$(".tooltip").hide();
		}
	});

	$('form').bind('submit',function(){
		//on form submit, gather all the data of the form and do AJAX request
		var data = {}
		data.start = $('#make_comment_time').attr('data-time');
		data.name = "Guest";
		data.avatar = "/images/1.jpg";
		data.comment =  $('#make_comment_context').val();

		jQuery.post("/api/comments", data, function (data, textStatus, jqXHR) {
			//call the post api to create new comment
			console.log("Post resposne:"); console.dir(data); console.log(textStatus); console.dir(jqXHR);
			if(data){
				//if we created new comment successfully, it will return what we just created, render them on page

				var position = (data.start / myPlayer.duration()) * 980;
				insertMarker(position,data);
				prependComment(data);
				$('#make_comment').slideDown();
				myPlayer.play();
			}
		});



		return false;

	})




});

function convert(totalSec) {
	//convert seconds into MM:SS format

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

function prependComment(data){
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



