//Small BES for JavaScript.
//JS-BES
//This is a sifting algorithm.

//Added the cipher element
function BasylEncryptor()
{
    this.encrypt = function(word, pass, size, ext)
    {
        var n = [];
        var salt = [];
        var saltLength = 16;

        //salt for enhanced encryption
        for (var i = 0; i < saltLength; i++)
        {
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

        var ciphA = [];
        var ciphB = [];
        for (var z = 0; z < 256; z++)
        {
            ciphA.push(z);
            ciphB.push(z);
        }

        function siftForward()
        {
            for (var i = 1; i < size; i++)
            {
                n[i] += n[i - 1];
                n[i] %= 913137;
            }
        }

        ov = 0;
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

        for (var i = 0; i < 20; i++)
        {
            siftForward();
            if (i == 3 || i == 9 || i == 13) randSwap();
            siftBackward();
            if (!(i == 4 || i == 8)) siftForward();
        }

        var sum = 0;
        for (var i = 0; i < size; i++)
        {
            n[i] %= 256;
            sum += n[i];
        }

        var pos = 0;

        function swapper(z)
        {
            var position = n[pos++];
            var temp = ciphA[position];

            ciphB[temp] = z;
            ciphB[ciphA[z]] = position;

            ciphA[position] = ciphA[z];
            ciphA[z] = temp;
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

        for (var t = 0; t < 10; t++)
            for (var z = 0; z < 256; z++)
            {
                EncryptRight(z);
                EncryptLeft(z);
                EncryptRight(salt[z % saltLength]);
            }

        pos = 0;

        if (false)
        {
            sum /= size;
            alert(sum);
        }

        //document.write(n.toString().replace(/,/g, "<br>"));
        function Recycle()
        {
            //alert("r");
            pos = 0;
            for (var i = 0; i < ext.length; i++)
            {
                n[i] += ext.charCodeAt(i);
            }

            siftForward();
            siftBackward();
            randSwap();
            siftBackward();

            for (var i = 0; i < size; i++)
            {
                n[i] %= 256;
            }

            pos = 0;
        }

        try
        {
            var result = "[ ";

            for (var i = 0; i < saltLength; i++)
            {
                result += salt[i].toString(16) + " ";
            }

            for (i = 0; i < word.length; i++)
            {
                if (pos >= size) Recycle();
                result += (EncryptRight(word.charCodeAt(i))).toString(16) + " ";
            }

            //document.write(result + "]");
            //window.location.href = "mailto:?body=" + escape(result + "]");
            return result + "]";
        }
        catch(ex)
        {
            word = escape(word);
            var result = "[ ";

            for (var i = 0; i < saltLength; i++)
            {
                result += salt[i].toString(16) + " ";
            }

            for (i = 0; i < word.length; i++)
            {
                if (pos >= size) Recycle();
                result += (EncryptRight(word.charCodeAt(i))).toString(16) + " ";
            }

            //document.write(result + "]");
            //window.location.href = "mailto:?body=" + escape(result + "]");
            return result + "]";
        }
    }

    this.decrypt = function(word, pass, size, ext)
    {
        var n = [];
        word = word.replace("[ ", "");
        word = word.replace(" ]", "");
        word = word.split(" ");

        var salt = [];
        var saltLength = 16;

        for (var i = 0; i < saltLength; i++)
        {
            salt.push(parseInt(word[i], 16));
        }

        for (var i = 0; i < size; i++)
        {
            n.push(i * i + i + salt[i % saltLength]);
        }

        for (var i = 0; i < pass.length; i++)
        {
            n[i] += pass.charCodeAt(i);
        }

        var ciphA = [];
        var ciphB = [];
        for (var z = 0; z < 256; z++)
        {
            ciphA.push(z);
            ciphB.push(z);
        }

        function siftForward()
        {
            for (var i = 1; i < size; i++)
            {
                n[i] += n[i - 1];
                n[i] %= 913137;
            }
        }

        ov = 0;
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

        for (var i = 0; i < 20; i++)
        {
            siftForward();
            if (i == 3 || i == 9 || i == 13) randSwap();
            siftBackward();
            if (!(i == 4 || i == 8)) siftForward();
        }

        var sum = 0;
        for (var i = 0; i < size; i++)
        {
            n[i] %= 256;
            sum += n[i];
        }

        var pos = 0;

        function swapper(z)
        {
            var position = n[pos++];
            var temp = ciphA[position];

            ciphB[temp] = z;
            ciphB[ciphA[z]] = position;

            ciphA[position] = ciphA[z];
            ciphA[z] = temp;
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

        for (var t = 0; t < 10; t++)
            for (var z = 0; z < 256; z++)
            {
                EncryptRight(z);
                EncryptLeft(z);
                EncryptRight(salt[z % saltLength]);
            }

        pos = 0;

        if (false)
        {
            sum /= size;
            alert(sum);
        }

        //document.write(n.toString().replace(/,/g, "<br>"));
        var result = "";

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

            for (var i = 0; i < size; i++)
            {
                n[i] %= 256;
            }

            pos = 0;
        }

        for (var i = saltLength; i < word.length; i++)
        {
            if (pos >= size) Recycle();
            result += String.fromCharCode(EncryptLeft(parseInt(word[i], 16))) + "";
        }

        return
            (
                unescape(result.replace( / < / g, "&lt;").replace( / > / g,
                         "&gt;"))
            );
    }
}
