# Variant-BESJS
This is a lightweight encryption algorithm for the web browser written in JavaScript. It is based off of BES but has a few features added to allow it to be faster and smaller. It will encrypt strings in a shuffling cipher, and give you a string to decrypt.

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
var decrypted_arr = encryption.decrypt(encrypted_arr, pass, size, extra); //[0, 1, 2, 3]

//Decrypt Array to String
var decrypted_string = encryption.decryptString(encrypted_string, pass, size, extra); // "Pineapples"
```

To decrypt, plug in the output from the encrypt method, and the other three variables must remain the same.

pass - what to encrypt/decrypt with.

size - the size of the generation array. I recommend something above (10*1024). It can be any number you wish though.

extra - A constant extra password to encrypt with. Just adds some extra entropic uniqueness to your generation scheme.
