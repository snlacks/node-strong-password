"use strict";
let StrongPassword = class StrongPassword{
	constructor(password, options){
		let minLength, lengthMessage;

		options = options || {};
		minLength = options.hasOwnProperty('minLength') ? options.minLength : 8;

		this._password = password;
		this._options = options;
		this.specs = {
			minLength: minLength,
			lengthMessage: lengthMessage
		};
	}

	isLongEnough(pw, ml){
		let password = pw || this._password,
		    minLength = ml || this.specs.minLength || 8;
		return password.length >= minLength;
	}

	isComplexEnough(pw){
		if(this.count === undefined){
			let password = pw || this._password;
			this.count = 0;
			count = password.match(/[a-z]/) ? count  + 1 : count;
			count = password.match(/[A-Z]/) ? count  + 1 : count;
			count = password.match(/\d/) ? count  + 1 : count;
			count = password.match(/[^a-zA-Z\d]/) ? count  + 1 : count;
		}
		return this.count > 2;
	}
};

module.exports = StrongPassword;