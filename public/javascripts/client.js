jQuery(function($) {
	"use strict";
	//socket.ioのサーバにに接続
	var socket = io.connect('http://'+location.host+'/');
	
	//サーバからmessageイベントが送信された時
	socket.on('message',function(data){
		$('#list').prepend($('<div/>').text(data.text));
	});
	//sendボタンがクリックされた時
	$('#send').click(function(){
		var text = $('#input').val();
		if(text !== ''){
			//サーバにテキストを送信
			socket.emit('message',{text:text});
			$('#list').prepend($('<div/>').text(text));
			$('#input').val('');
		}
	});
});