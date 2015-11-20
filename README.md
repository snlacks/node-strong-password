# Validate Password
[![Build Status](https://travis-ci.org/snlacks/node-strong-password.svg?branch=master)](https://travis-ci.org/snlacks/node-strong-password)

Tests for minimum length and complexity with char types.

These methods can be used with instantiation or functionally.
## new StrongPassword(password, [option])
options
* minLength

## isValid() 
Validate both length and complexity; only on instantiated passwords. Runs both functions. Returns true or false.

## isLongEnough([password])
Validates for length, can pass minLength as an option on instantiation or as the second argument.
No length maximum.

## isComplexEnough([password])
Validates for three of the following
* An uppercase letter
* A lowercase letter
* A number
* A special character
Allows spaces.

