module.exports =(function (){
	let StrongPassword = class StrongPassword{
		constructor (password, options){
			let minLength, lengthMessage;
			this._password = password;
			this._options = options || {};
			minLength = options.hasOwnProperty('minLength') ? options.minLength : 8;
			this.specs = {
				minLength: minLength,
				lengthMessage: lengthMessage
			};
		}

		isValid (){
			return this.isLongEnough() && this.isComplexEnough();
		}

		listErrors (){
			if (!this.hasOwnProperty('errors')){
				this.errors = [];
				if (!this.isLongEnough()) this.errors.push(`Password must be at least ${this.specs.minLength} characters long.`);
				if (!this.isComplexEnough()) this.errors.push(`Password must contain at least three of these: lowercase letter (a,b,c...), uppercase letter (A,B,C...), number (0,1,2...), special character (!,#,@...).`);
			}
			return this.errors;
		}

		isLongEnough (pw, ml){
			let password = pw || this._password,
			    minLength = ml || this.specs.minLength;
			return password.length >= minLength;
		}

		isComplexEnough (pw){
			let password = pw || this._password;
			let count = 0;
			count = password.match(/[a-z]/) ? count  + 1 : count;
			count = password.match(/[A-Z]/) ? count  + 1 : count;
			count = password.match(/\d/) ? count  + 1 : count;
			count = password.match(/[^a-zA-Z\d]/) ? count  + 1 : count;
			return count > 2;
		}
	};
	return StrongPassword;
})();
