# Variant-BESJS
Variant of BES for lightweight javascript encryption. Not compatible with standard BES.

### Why a variant?
To make it lightweight and efficient. You usually aren't encrypting massive amounts of data in JavaScript, so I thought I'd make it more... slim.

### Could you create a compatible version?

Sure! But not in this project. I'll probably use emscripten for a JavaScript and BES compatible version. 


### How to use this?

Try the example index.html. There are only two steps, and two commands.

1) Create a BasylEncryptor

``` var something =  new BasylEncryptor(); ```

2) Encrypt or Decrypt

``` something.encrypt(word, pass, size, extra); ```

To decrypt, plug in the output from the encrypt method, and the other three variables must remain the same.

word - what to encrypt or decrypt

pass - what to encrypt/decrypt with.

size - the size of the generation array. We recommend something above (10*1024). You can make it any weird number you want.

extra - A constant extra password to encrypt with. We usually use "Salty".
