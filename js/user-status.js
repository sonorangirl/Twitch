

var twitchUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];


//Creates a streamer div for each user with their data
function showUserInfo(userImage, userName, userStatus, userGame, userLink) {
	userBlock = '<a href="' + userLink + '" target="blank"><div class="streamer-container">';

	userBlock += '<div class="col-lg-5 streamer main-info"><div class="row">';
	userBlock += '<div class="col-xs-3 streamer-img"><img src="' + userImage + '" /></div>';
	userBlock += '<div class="col-xs-6 streamer-name">' + userName + '</div>';
	userBlock += '<div class="col-xs-2 streamer-status">' + userStatus + '</div></div></div>';
	
	userBlock += '<div class="col-lg-5 streamer game-link streamer-hidden"><div class="row">';
	userBlock += '<div class="col-xs-3 streamer-img"><img src="' + userImage + '" /></div>';
	userBlock += '<div class="col-xs-8 streamer-game">' + userGame + '</div></div></div></div></a>';
}

//Gets status for each user
function determineUserStatus(twitchUser) {

	var twitchStatusCall = "https://api.twitch.tv/kraken/streams/" + twitchUser + "?client_id=apquhgcwgzvz1ozz9p12tb716x141qu&callback=?";

	$.getJSON( twitchStatusCall, function(data) {

		//check whether user is streaming or not
		if (data.stream === null) {
			getUserData(twitchUser, "Offline");
		//if user is not found show as account closed
		} else if (data.stream === undefined) {
			getUserData(twitchUser, "Account Closed");
		} else {
			getUserData(twitchUser, "Online");
		}

	});

}

//Gets info on each user and displays it
function getUserData(twitchUser, streamingStatus) {

	var twitchDataCall = "https://api.twitch.tv/kraken/channels/" + twitchUser + "?client_id=apquhgcwgzvz1ozz9p12tb716x141qu&callback=?";
	
	if (streamingStatus === "Online") {

		$.getJSON( twitchDataCall, function(data) {
			showUserInfo(data.logo, data.display_name, streamingStatus, data.game, data.url);
			$('.online-streamers').append(userBlock);
		});
		

	} else if (streamingStatus === "Offline") {

		$.getJSON( twitchDataCall, function(data) {
			showUserInfo(data.logo, data.display_name, streamingStatus, streamingStatus, data.url);
			$('.offline-streamers').append(userBlock);
		});
		
	
	} else if (streamingStatus === "Account Closed") {
		showUserInfo("https://placehold.it/100x100/?text=No+Image", twitchUser, streamingStatus, streamingStatus, '#');
		$('.offline-streamers').append(userBlock);
	
	}
	
}


$(document).ready( function() {

	//Get info and status for all users listed
	for (var i = 0; i < twitchUsers.length; i++) {
		determineUserStatus(twitchUsers[i]);
	}

	//When hovering over a streamer, show hidden div with image and game being played
	$('.online-streamers, .offline-streamers').on("mouseenter mouseleave", ".streamer",
      function() {
         $(this).toggleClass('streamer-hidden');
         $(this).siblings().toggleClass('streamer-hidden');
    });


		
});







