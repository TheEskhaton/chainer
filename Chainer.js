; (function(root){

	"use strict";

	var Chainer = (function(){
		
		var start = function(cb){
			this.isWaiting = false;
			this.waitTime = 0;
			this._cb=cb;
			this.repeats = 0;
			this.istrue = true;
			return this;
		};
		var restart = function(cb){
			this._cb = cb;
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
		var clearWait = function(){
			this.isWaiting = false;
			this.waitTime = 0;
			return this;
		};
		var clearRepeat = function(){
			this.repeats = 1;
			return this;
		};
		var clearAll = function(){
			this.isWaiting = false;
			this.waitTime = 0;
			this.repeats = 1;
			return this;
		};
		
		var ifTrue = function(check){
			if(check === true)
			{
				this.istrue = true;
			}
			else
			{
				this.istrue = false;
			}
			return this;
		};
		
		var ifFalse = function(check){
			if(check === true)
			{
				this.istrue = false;
			}
			else
			{
				this.istrue = true;
			}
			return this;
		};
			
		var end = function(repeats, waitTime){
			if(this.istrue === true){
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
			}
			return this;			
		};

		return {
			start: start,
			end: end,
			wait: wait,
			repeat: repeat,
			clearWait: clearWait,
			clearRepeat: clearRepeat,
			clearAll: clearAll,
			ifTrue: ifTrue,
			ifFalse: ifFalse,
			restart: restart
		};

	})();
	root.Chainer = Chainer;
})(window);
