// LZ-String 解压实现
const LZString = {
    decompressFromBase64: function(input) {
        if (!input) return null;

        const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        let res = [];
        let phase = 0;
        let bitsCached = 0;
        let val = 0;

        for (let i = 0; i < input.length; i++) {
            const c = keyStr.indexOf(input.charAt(i));

            if (c === -1) {
                throw new Error("invalid character found: " + input.charAt(i));
            }

            switch (phase) {
                case 0:
                    bitsCached = (bitsCached << 6) | c;
                    phase = 1;
                    break;
                case 1:
                    bitsCached = (bitsCached << 6) | c;
                    for (let j = 12; j >= 0; j -= 8) {
                        res.push(String.fromCharCode((bitsCached >> j) & 0xFF));
                    }
                    phase = 0;
                    break;
            }
        }

        if (phase === 1) {
            bitsCached <<= 6;
            for (let j = 12; j >= 0; j -= 8) {
                res.push(String.fromCharCode((bitsCached >> j) & 0xFF));
            }
        }

        return this._decompress(res.join(""));
    },

    _decompress: function(compressed) {
        if (!compressed) return "";

        let dict = {};
        let dictSize = 256;
        let data = [];
        let bitstream = 0;
        let bitcount = 0;
        let pos = 0;

        // Convert string to byte array
        for (let i = 0; i < compressed.length; i++) {
            data.push(compressed.charCodeAt(i));
        }

        const readBits = (n) => {
            let result = 0;
            while (bitcount < n) {
                if (pos >= data.length) {
                    throw new Error("not enough data");
                }
                bitstream = (bitstream << 8) | data[pos++];
                bitcount += 8;
            }
            bitcount -= n;
            result = (bitstream >> bitcount) & ((1 << n) - 1);
            return result;
        };

        let literalBits = readBits(2) + 1;
        let result = [];
        let dictMaxBits = 8;

        while (true) {
            let code = readBits(dictMaxBits);

            if (code === 256) {
                break;
            }

            let w = "";
            if (code < 256) {
                w = String.fromCharCode(code);
            } else if (code - 256 < dictSize) {
                w = dict[code];
            } else {
                w = result[result.length - 1] + result[result.length - 1].charAt(0);
            }

            result.push(w);

            // Add to dictionary
            if (dictSize < 65536) {
                dict[256 + dictSize] = result[result.length - 2] + w.charAt(0);
                dictSize++;
                if (dictSize > (1 << dictMaxBits)) {
                    dictMaxBits++;
                }
            }
        }

        return result.join("");
    }
};

// 测试
const compressed = 'N4IgLgngDgpiBcIYA8DGBDANgSwCYCd0B3EAGhADcZ8BnbAewDsEAmcm+gV31TkQAswYKDXgB6MQHNsYfpwBGAOlT0AtmIBeNCtlQbs6RmPry6uA4wC0KDDgLFLUTJ2lH8MTDHQ0YNMWHRJMRZFAEYATkUABjIkT1UYRjAaBABtAF1ydCgoAGUAsD5QSXw8XOwNPkZOTExyHRgiACF0VABrEq5GXABhekx6fAQQAGIAMwnJkABfaaA==';

try {
    const decompressed = LZString.decompressFromBase64(compressed);
    const json = JSON.parse(decompressed);
    console.log(JSON.stringify(json, null, 2));
} catch (err) {
    console.error("Error:", err.message);
}
