# Variant-BESJS
This is a lightweight encryption algorithm for the web browser written in JavaScript. It is based off of BES but has a few features added to allow it to be faster and smaller. It will encrypt strings in a shuffling cipher, and give you a string to decrypt.

Rather than using the original XOR-based encryption present in BES, this encryption algorithm uses internal "shuffle" ciphers for a more resilient design.

Quite a few ideas implemented in this project were eventually added to the desktop BES library, like the "shuffle" ciphers, and the rotation and displacement steps in the PRNG generation.

### Why a variant?
To make it lightweight and efficient. You usually aren't encrypting massive amounts of data in JavaScript, so I thought I'd make it more... slim.

### Could you create a compatible version?

Sure! But not in this project. I'll probably use emscripten for a JavaScript and BES compatible version.


### How to use this?

Try the example index.html. There are only two steps, and two commands.

1) Create a BasylEncryptor

```js
var encryption =  new BasylEncryptor();
```

2) Encrypt or Decrypt

```js
//Encrypt an Array
var encrypted_arr = encryption.encrypt([0, 1, 2, 3], pass, size, extra);

//Encrypt a String
var encrypted_string = encryption.encryptString("Pineapples", pass, size, extra);

//Decrypt the encrypted Array to an Array
var decrypted_arr = encryption.decrypt(encrypted_arr, pass, size, extra); // [0, 1, 2, 3]

//Decrypt Array to String
var decrypted_string = encryption.decryptString(encrypted_string, pass, size, extra); // "Pineapples"
```

To decrypt, use the output array from the encrypt method, the other three variables you used must remain the same. Please note that arrays that are passed in **must only** contain values between 0 and 255.

pass - the password to encrypt/decrypt with.

size - the size of the generation array. I recommend something above (10*1024). It can be any number you wish though.

extra - A constant extra password string to encrypt with. Usually something simple, like "Salty". Just adds some extra entropic uniqueness to your generation scheme.


#### UTF-16
If you wish to use UTF-16 characters in your strings, you may pass in an extra boolean value to enable UTF-16 support.

```js
//Encrypt a String with UTF-16 Support.
var encrypted_string = encryption.encryptString("Pineapples", pass, size, extra, true);

//Decrypt Array to String with UTF-16 Support.
var decrypted_string = encryption.decryptString(encrypted_string, pass, size, extra, true);  // "Pineapples"
```

This is set to false by default to save room.


### How to use this in Node.js

Download this project folder, stick it in the "node_modules" folder for your node process.

Add the following to your code:
```js
var BasylEncryptor = require("Variant-BESJS").BasylEncryptor();
var encryption = new BasylEncryptor();
```

The rest of the code will be the same as above.

You may also alternatively place the "bes.js" or "bes.min.js" in the same folder, and load it in like so:
```js
var BasylEncryptor = require("./bes.js");
var encryption = new BasylEncryptor();
```
