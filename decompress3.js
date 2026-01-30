// 基于 lz-string 1.5.0 的完整实现
const LZString = (() => {
    const keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    const getBaseValue = (alphabet, char) => {
        for (let i = 0; i < alphabet.length; i++) {
            if (alphabet.charAt(i) === char) return i;
        }
        return -1;
    };

    return {
        decompressFromBase64: function(input) {
            if (!input) return "";

            const output = [];
            let bitsCached = 0;
            let phase = 0;

            for (let i = 0; i < input.length; i++) {
                const index = getBaseValue(keyStrBase64, input.charAt(i));
                if (index === -1) {
                    throw new Error("Invalid base64 character at position " + i);
                }

                if (phase === 0) {
                    bitsCached = (bitsCached << 6) | index;
                    phase = 1;
                } else {
                    bitsCached = (bitsCached << 6) | index;
                    for (let j = 12; j >= 0; j -= 8) {
                        output.push(String.fromCharCode((bitsCached >> j) & 0xFF));
                    }
                    phase = 0;
                }
            }

            if (phase === 1) {
                bitsCached <<= 6;
                for (let j = 12; j >= 0; j -= 8) {
                    output.push(String.fromCharCode((bitsCached >> j) & 0xFF));
                }
            }

            return this._decompress(output.join(""));
        },

        _decompress: function(compressed) {
            if (!compressed) return "";

            const getNextCode = (dictSize) => {
                if (dictSize === 256) {
                    return 9;
                } else if (dictSize === 512) {
                    return 10;
                } else if (dictSize === 1024) {
                    return 11;
                } else if (dictSize === 2048) {
                    return 12;
                } else if (dictSize === 4096) {
                    return 13;
                } else if (dictSize === 8192) {
                    return 14;
                } else if (dictSize === 16384) {
                    return 15;
                } else if (dictSize === 32768) {
                    return 16;
                } else if (dictSize === 65536) {
                    return 17;
                }
            };

            const dictSize = 256;
            const dict = {};
            for (let i = 0; i < 256; i++) {
                dict[i] = String.fromCharCode(i);
            }

            const data = [];
            for (let i = 0; i < compressed.length; i++) {
                data.push(compressed.charCodeAt(i));
            }

            let pos = 0;
            let bitBuffer = 0;
            let bitCount = 0;

            const readBits = (n) => {
                while (bitCount < n) {
                    if (pos >= data.length) {
                        break;
                    }
                    bitBuffer = (bitBuffer << 8) | data[pos++];
                    bitCount += 8;
                }
                bitCount -= n;
                return (bitBuffer >> bitCount) & ((1 << n) - 1);
            };

            const numLiteralBits = readBits(2) + 1;
            const output = [];
            let nextCode = 256;

            while (true) {
                const code = readBits(getNextCode(nextCode) || 8);

                if (code === 256) {
                    break;
                } else if (code < 256) {
                    output.push(String.fromCharCode(code));
                } else {
                    let s = dict[code - 1];
                    if (s === undefined) {
                        s = "";
                    }
                    output.push(s);
                }

                if (nextCode < 65536) {
                    dict[nextCode] = output[output.length - 1];
                    nextCode++;
                }
            }

            return output.join("");
        }
    };
})();

// Test
const compressed = 'N4IgLgngDgpiBcIYA8DGBDANgSwCYCd0B3EAGhADcZ8BnbAewDsEAmcm+gV31TkQAswYKDXgB6MQHNsYfpwBGAOlT0AtmIBeNCtlQbs6RmPry6uA4wC0KDDgLFLUTJ2lH8MTDHQ0YNMWHRJMRZFAEYATkUABjIkT1UYRjAaBABtAF1ydCgoAGUAsD5QSXw8XOwNPkZOTExyHRgiACF0VABrEq5GXABhekx6fAQQAGIAMwnJkABfaaA==';

try {
    const decompressed = LZString.decompressFromBase64(compressed);
    console.log("解压后的内容长度:", decompressed.length);
    console.log("前 500 个字符:");
    console.log(decompressed.substring(0, 500));

    try {
        const json = JSON.parse(decompressed);
        console.log("\n\n解压后的 JSON 内容:");
        console.log(JSON.stringify(json, null, 2));
    } catch (parseErr) {
        console.log("\n\nJSON 解析失败:", parseErr.message);
    }
} catch (err) {
    console.error("解压错误:", err.message);
    console.error(err.stack);
}
