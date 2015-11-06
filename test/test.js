"use strict";
const chai = require('chai'),
      should = chai.should(),
      expect = chai.expect,
      StrongPassword = require('../index.es5.js');

describe('StrongPassword', () => {
	it('should exist', () => should.exist(StrongPassword) );

	describe('Package', () => {
		let testPassword = 'testPassword',
		    options = {},
		    spw;

		beforeEach(() => spw = new StrongPassword(testPassword, options) );

		it('should run without options (second parameter)', ()=> new StrongPassword(testPassword) );
		it('should set password on instantiation', () => spw._password.should.equal(testPassword) );
		it('should set options on instantiation', () => expect(spw._options).to.eql(options) );
	});

	describe('isLongEnough()', () => {
		describe('prototype', () => {
			let isLongEnough = StrongPassword.prototype.isLongEnough;

			it('should exist', () => should.exist(isLongEnough) );
			it('should be a function', () => isLongEnough.should.be.a('function') )

			describe('Utility (without instantiating, passing requirements)', () => {
				it('should pass', () => isLongEnough('Password123!', 9).should.equal(true) )
				it('should fail', () => isLongEnough('Password', 9).should.equal(false) )
			});
		});

		let situations = [
			{ description: 'with default options, short', password: '2Short', expected: false, options: {} },
			{ description: 'with default options, long', password: 'notTooShort', expected: true, options: {} },
			{ description: 'with custom options, short', password: '12345678', expected: false, options: { minLength: 10 } },
			{ description: 'with custom options, long', password: 'notTooTooShort', expected: true, options: { minLength: 10 } }
		]
		situations.forEach((situation) => {
			describe(situation.description,  () => {
				let result = new  StrongPassword(situation.password, situation.options).isLongEnough();
				let expectedMessage;
				let minLength = situation.options.hasOwnProperty('minLegth') ? situation.options.minLegth : 8;

				it('should return an object', () => result.should.be.a('boolean') );
				it('should exist', () => should.exist(result) )
				it(`should be ${situation.expected}`, () => result.should.equal(situation.expected) );
			});
		});
	});
	
	describe('isComplexEnough', ()=>{
		let isComplexEnough = StrongPassword.prototype.isComplexEnough;
		let complexSample = 'Password123!';
		let simpleSample = 'password1231';
		it('should exist', () => should.exist(isComplexEnough));
		it('should be a function', () => isComplexEnough.should.be.a('function'))

		describe('Utility (without instantiating, passing requirements)', () => {
			it('should pass', () => isComplexEnough(complexSample).should.equal(true) )
			it('should fail', () => isComplexEnough(simpleSample).should.equal(false) )
		});
		describe('Instantiated', () => {
			it('should pass', () => new StrongPassword().isComplexEnough(complexSample).should.equal(true) )
			it('should fail', () => new StrongPassword().isComplexEnough(simpleSample).should.equal(false) )
		});
	});

	describe('isValid', ()=> {
		it('should exist', () => {
			should.exist(StrongPassword.prototype.isValid)
		})
		let situations = [
			{ title: 'good password', password: 'Password123!', expected: true },
			{ title: 'short password', password: 'short1!', expected: false },
			{ title: 'simple password', password: 'password', expected: false },
			{ title: 'short and simple password', password: 'sns', expected: false }
		];

		situations.forEach((situation) => {
			describe(situation.title, () => {
				it(`should be ${situation.expected}`, () => new StrongPassword(situation.password).isValid().should.equal(situation.expected));
			});
		});
	});

	describe('listErrors', () => {
		it('should exist', () => {
			should.exist(StrongPassword.prototype.listErrors)
		})
		let situations = [
			{ title: 'good password', password: 'Password123!', expected: 0 },
			{ title: 'short password', password: 'short1!', expected: 1, contains: /long/ },
			{ title: 'simple password', password: 'password', expected: 1, contains: /letter/ },
			{ title: 'short and simple password', password: 'sns', expected: 2, contains: /(?=letter).+(?=long)|(?=long).+(?=letter)/ }
		];
		situations.forEach((situation) => {
			describe(situation.title, () => {
				let errors = new StrongPassword(situation.password).listErrors()
				it(`should be ${situation.expected}`, () => errors.length.should.equal(situation.expected));
				if(situation.hasOwnProperty('contains')){
					it(`should contain ${situation.contains}`, () =>JSON.stringify(errors).should.match(situation.contains));
				}
			});
		});
	})
});