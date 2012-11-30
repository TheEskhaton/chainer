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

		var end = function(repeats, waitTime){
			if(repeats) this.repeats = repeats;
			if(waitTime) this.waitTime = waitTime;
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
				if(this.repeats > 0)
				{
					for(this.repeats;this.repeats > 0;--this.repeats){
						this._cb.call();
					}
				}
				else{
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
	var callcount = 0;
	var print = function(str){
		console.log(str);
	};
	var hello = function(){
		callcount++;
		print('Hello call '+callcount+'!');
	};
	var chainedFunc1 = Chainer.start(hello).wait(2500);
	var chainedFunc2 = Chainer.start(hello).wait(2000);
	chainedFunc1.end();
	chainedFunc2.end(1,500);
})();