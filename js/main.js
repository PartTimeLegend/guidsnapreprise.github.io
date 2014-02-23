GuidWidget = {
	init: function() {
		this.refreshGuids();
		var self = this;
		setInterval(function(){self.refreshGuids();}, 5000);
	},

	generateGuid: function(){
		return 'xxxxxxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},

	refreshGuids: function() {
		$('#guid1').text(this.generateGuid);
		$('#guid2').text(this.generateGuid);
	}
};

SnapWidget = {
	init: function() {
		var self = this;
		$('#snap').on('click', function(){self.compare()});
	},

	compare: function() {
		var isMatch = $('#guid1').text() === $('#guid2').text();		
 		var resultText = function(isMatch) {return isMatch ? 'match' : 'mismatch';};
	    
	    var buttonEl = $('#snap');
	    var resultEl = $('#result');

 		resultEl.removeClass(resultText(!isMatch)).addClass(resultText(isMatch));
 		
 		var self = this;
	    buttonEl.hide(function() {
	    	resultEl.show(function() {
	    		self.playSound(resultText(isMatch));

	    		setTimeout(function(){
	    			resultEl.hide(function(){
	    				buttonEl.show();
	    			});
	    		}, 2000);
	    	});
	    });
	},

	playSound: function(soundName) {
		var audio = new Audio();
		var file = 'audio/' + soundName + (Modernizr.audio.ogg ? '.ogg' :
        	                               Modernizr.audio.mp3 ? '.mp3' :
                                           Modernizr.audio.m4a ? '.m4a' :
                                                                 '.wav');
		audio.src = file;
		audio.play();
	}
};

(function(){

    
    $("#logo").attr("src", "img/logo-grey." + (Modernizr.svg ? "svg" : "png"));


	GuidWidget.init();
	SnapWidget.init();
})();