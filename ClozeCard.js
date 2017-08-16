var clozecard = function(text, cloze) {
	if (this instanceof clozecard) {
		this.cloze = text.substring(0, text.indexOf(cloze)) + "..." + text.substring(text.indexOf(cloze) + cloze.length, );
		this.partial = cloze;
		this.fulltext = text;		
	}
	else {
		return new clozecard(text, cloze);
	};
};

module.exports = clozecard;