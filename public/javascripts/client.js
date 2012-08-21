jQuery(function($) {
	"use strict";
	var socket = io.connect('http://'+location.host+'/');
	socket.on('message',function(data){
		$('#list').append($('<div/>').text(data.text));
	});
	$('#send').click(function(){
		var text = $('#input').val();
		if(text !== ''){
			socket.emit('message',{text:text});
			$('#list').append($('<div/>').text(text));
		}
	});
});