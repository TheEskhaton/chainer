; (function(){

	"use strict";

	var Chainer = (function(){
		
		var start = function(cb){
			this.isWaiting = false;
			this.waitTime = 0;
			this._cb=cb;
			this.repeats = 0;
			return this;
		};
		var wait = function(time){
			this.isWaiting = true;
			this.waitTime += time;
			return this;
		};
		var repeat = function(n){
			this.repeats+=n;
			return this;
		};
		var end = function(){
			if(this.isWaiting){
				if(this.repeats > 0)
				{
					for(this.repeats;this.repeats > 0;--this.repeats){
						setTimeout(this._cb, this.waitTime);
					}
				}
				else {
					setTimeout(this._cb, this.waitTime);
				}
				
			}
			else {
				for(this.repeats;this.repeats > 0;--this.repeats){
					this._cb.call();
				}
			}
			
		};

		return {
			start: start,
			end: end,
			wait: wait,
			repeat: repeat
		};

	})();

	/* random testing */
	Chainer.start(function(){
		console.log('test');
	}).wait(1000).end();

})();
