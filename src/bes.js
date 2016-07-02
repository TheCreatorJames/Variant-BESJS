//Small BES for JavaScript.
//JS-BES
//This is a sifting algorithm.

//Added the cipher element
function BasylEncryptor()
{
    var saltLength = 16;

    var ov = 0;
    var pos = 0;

    var n = null;
    var salt = null;
    var size = null;
    var ext = null;
    var ciphA = null;
    var ciphB = null;

    //generator function for the cipher.
    function generate(word, pass, mode)
    {
        //salt for enhanced encryption
        for (var i = 0; i < saltLength; i++)
        {
            if(mode)
                salt.push(word[i]);
            else
                salt.push(Math.floor(Math.random() * 10000) % 256);
        }

        for (var i = 0; i < size; i++)
        {
            n.push(i * i + i + salt[i % saltLength]);
        }

        for (var i = 0; i < pass.length; i++)
        {
            n[i] += pass.charCodeAt(i);
        }

        ciphA = [];
        ciphB = [];

        for (var z = 0; z < 256; z++)
        {
            ciphA.push(z);
            ciphB.push(z);
        }

        ov = 0;

        for (var i = 0; i < 20; i++)
        {
            siftForward();
            if (i == 3 || i == 9 || i == 13) randSwap();
            siftBackward();
            if (!(i == 4 || i == 8)) siftForward();
        }

        pos = 0;

        for (var t = 0; t < 10; t++)
            for (var z = 0; z < 256; z++)
            {
                EncryptRight(z);
                EncryptLeft(z);
                EncryptRight(salt[z % saltLength]);
            }

        Recycle();
    }

    function siftForward()
    {
        for (var i = 1; i < size; i++)
        {
            n[i] += n[i - 1];
            n[i] %= 913137;
        }
    }

    function swapper(z)
    {
        var position = n[pos++] % 256;
        var temp = ciphA[position];

        ciphB[temp] = z;
        ciphB[ciphA[z]] = position;

        ciphA[position] = ciphA[z];
        ciphA[z] = temp;
    }

    function Layers(cur, top)
    {
        cur = Math.abs(cur);
        if (top <= 0)
        {
            ov = cur % size;
            return n[ov];
        }

        return Layers(n[cur % size] % size, top - 1);
    }

    function randSwap()
    {
        for (var i = 0; i < size; i++)
        {
            var temp = n[i];
            Layers(n[i] % size, ((temp << 2) ^ (temp >> 2)) % 8 + 1);
            n[i] = n[ov];
            n[ov] = temp;
        }
    }

    function siftBackward()
    {
        for (var i = size - 2; i >= 0; i--)
        {
            n[i] += n[i + 1];
            n[i] %= 913122;
        }
    }

    function EncryptRight(z)
    {
        var res = ciphA[z];
        swapper(z);
        return res;
    }

    function EncryptLeft(z)
    {
        var res = ciphB[z];
        swapper(res);
        return res;
    }


    function Recycle()
    {
        pos = 0;
        for (var i = 0; i < ext.length; i++)
        {
            n[i] += ext.charCodeAt(i);
        }

        siftForward();
        siftBackward();
        randSwap();
        siftBackward();

        pos = 0;
    }

    function setSize(sz)
    {
        size = sz;
    }

    function setExt(e)
    {
        ext = e;
    }

    this.encryptString = function(word, pass, size, ext)
    {
        var arr = [];
        for(var i = 0; i < word.length; i++)
            arr.push(word.charCodeAt(i));
        return this.encrypt(arr, pass, size, ext);
    }

    this.encrypt = function(arr, pass, size, ext)
    {
        n = [];
        salt = [];

        setExt(ext);
        setSize(size);

        generate(null, pass, false);

        var result = [];

        for (var i = 0; i < saltLength; i++)
        {
            result.push(salt[i]);
        }

        for (i = 0; i < arr.length; i++)
        {
            if (pos >= size) Recycle();
            result.push(EncryptRight(arr[i]));
        }

        return result;
    }

    this.decryptString = function(encryptedArray, pass, size, ext)
    {
        var arr = this.decrypt(encryptedArray, pass, size, ext);
        var result = "";
        for(var i = 0; i < arr.length; i++)
        {
            result += String.fromCharCode(arr[i]);
        }
        return result;
    }

    this.decrypt = function(encryptedArray, pass, size, ext)
    {
        n = [];
        salt = [];

        setExt(ext);
        setSize(size);
        generate(encryptedArray, pass, true);
        var result = [];
        for (var i = saltLength; i < encryptedArray.length; i++)
        {
            if (pos >= size) Recycle();
            result.push(EncryptLeft(encryptedArray[i]));
        }

        return result;
    }
}
