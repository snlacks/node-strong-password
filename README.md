# Validate Password

An interface for commonly used password quality assurance.

Works on Server or in Browser.

## Commonly used patterns.

* minimum length
* minimum variety for types of characters
* disallow common passwords

## customizing including patterns, messages, names.

If a password fails the pattern test, two keys are set on an object.

name - patterned after the function name. 

If a password fails spw.isLongEnough(), the object would look like this.

    {
        name: "length",
        message: `The password needs to be 8 characters long.`,
        pattern: 8
    }

If you want to change the minimum length, you can pass that in the options. (minLength) See the full documentation below for complete API.