var basiccard = function(front, back) {
	if (this instanceof basiccard) {
		this.front = front;
		this.back = back;	
	}
	else {
		return new basiccard(front, back);
	};
};

module.exports = basiccard;