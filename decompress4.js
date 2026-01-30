// 官方 lz-string 库的完整实现
const LZString = (function() {

    // private property
    const keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    const getBaseValue = function(alphabet, char) {
        return alphabet.indexOf(char);
    };

    return {
        decompressFromBase64 : function (input) {
            if (input == null) return "";
            if (input == "") return null;
            let output = [];
            let bitsCached = 0;
            let phase = 0;
            let byteCached;

            // convert each character in the input into
            // its corresponding 6-bit relative index and add it to a
            // 24-bit buffer. when 4 characters have been converted (6 * 4 = 24 bits),
            // turn the 24-bit buffer into the output of 3 bytes by converting to octet

            for (let i = 0; i < input.length; i++) {
                const c = getBaseValue(keyStrBase64, input.charAt(i));
                if (c == undefined) throw new Error("Could not find base64 index for " + input.charAt(i));
                if (phase == 0) {
                    bitsCached |= (c) << 18;
                } else if (phase == 1) {
                    bitsCached |= (c) << 12;
                } else if (phase == 2) {
                    bitsCached |= (c) << 6;
                } else {
                    bitsCached |= (c);
                    output.push(String.fromCharCode((bitsCached >> 16) & 255));
                    output.push(String.fromCharCode((bitsCached >> 8) & 255));
                    output.push(String.fromCharCode(bitsCached & 255));
                    bitsCached = 0;
                }

                phase = (phase + 1) % 4;
            }

            if (phase == 1) {
                throw new Error("Invalid base64 string!");
            } else if (phase == 2) {
                output.push(String.fromCharCode((bitsCached >> 16) & 255));
            } else if (phase == 3) {
                output.push(String.fromCharCode((bitsCached >> 16) & 255));
                output.push(String.fromCharCode((bitsCached >> 8) & 255));
            }

            return output.join("");
        },

        decompress : function (compressed) {
            if (compressed == null) return "";
            if (compressed == "") return null;
            let dictionary = [],
                next,
                enlargeIn = 4,
                dictSize = 4,
                numBits = 2,
                entry = "",
                result = [],
                i = 0,
                w,
                c,
                bits = 0,
                resb,
                maxpower,
                power,
                val;

            const data = {};
            for (let idx = 0; idx < 3; idx++) {
                dictionary[idx] = idx;
            }

            let pos = 0;
            const readBits = function(numBits) {
                let res = 0;
                for (let i = 0; i < numBits; i++) {
                    resb = compressed.charCodeAt(pos) >> (15 - i % 16);
                    pos += (i % 16) == 15 ? 1 : 0;
                    res += (resb & 1) << (numBits - i - 1);
                }
                return res;
            };

            let numLiterralBits = readBits(2) + 1;
            enlargeIn = 4;

            // reset the vars.
            next = readBits(numLiterralBits);
            if (next == 0) {
                do {
                    c = readBits(numLiterralBits);
                    dictionary[dictSize] = String.fromCharCode(c);
                    dictSize++;
                    enlargeIn--;
                    if (enlargeIn == 0) {
                        enlargeIn = Math.pow(2, numLiterralBits);
                        numLiterralBits++;
                    }
                } while (c != dictionary.length);
                next = -1;
            } else if (next == 1) {
                do {
                    c = readBits(2 + numLiterralBits);
                    dictionary[dictSize] = String.fromCharCode(c);
                    dictSize++;
                    enlargeIn--;
                    if (enlargeIn == 0) {
                        enlargeIn = Math.pow(2, 2 + numLiterralBits);
                        numLiterralBits++;
                    }
                } while (c != dictionary.length);
                next = -1;
            } else if (next == 2) {
                return "";
            }

            numBits = 3;
            maxpower = Math.pow(2, numBits);
            power = 1;

            while (power != maxpower) {
                resb = compressed.charCodeAt(pos) >> (15 - i % 16);
                pos += (i % 16) == 15 ? 1 : 0;
                power += resb << (numBits - i % 16 - 1);
                i++;
            }

            next = power - 1;
            if (next == -1) {
                next = readBits(numLiterralBits);
            }
            entry = dictionary[next];
            result = [entry];
            while (true) {
                if (pos > compressed.length) {
                    return "";
                }

                next = readBits(numBits);

                if (next < 2) {
                    if (next == 0) {
                        do {
                            c = readBits(numLiterralBits);
                            dictionary[dictSize] = String.fromCharCode(c);
                            dictSize++;
                            enlargeIn--;
                            if (enlargeIn == 0) {
                                enlargeIn = Math.pow(2, numLiterralBits);
                                numLiterralBits++;
                            }
                        } while (c != dictionary.length);
                        c = dictSize - 1;
                    } else {
                        do {
                            c = readBits(numLiterralBits + 1);
                            dictionary[dictSize] = String.fromCharCode(c);
                            dictSize++;
                            enlargeIn--;
                            if (enlargeIn == 0) {
                                enlargeIn = Math.pow(2, numLiterralBits + 1);
                                numLiterralBits++;
                            }
                        } while (c != dictionary.length);
                        c = dictSize - 1;
                    }
                }

                if (next == 3) {
                    return "";
                }

                if (next == 2) {
                    return result.join('');
                }

                next == 0 || next == 1 ? entry = dictionary[c] : (entry = entry + entry.charAt(0));

                result.push(entry);

                dictionary[dictSize] = entry;
                dictSize++;
            }
        }
    };
}());

// Test
const compressed = 'N4IgLgngDgpiBcIYA8DGBDANgSwCYCd0B3EAGhADcZ8BnbAewDsEAmcm+gV31TkQAswYKDXgB6MQHNsYfpwBGAOlT0AtmIBeNCtlQbs6RmPry6uA4wC0KDDgLFLUTJ2lH8MTDHQ0YNMWHRJMRZFAEYATkUABjIkT1UYRjAaBABtAF1ydCgoAGUAsD5QSXw8XOwNPkZOTExyHRgiACF0VABrEq5GXABhekx6fAQQAGIAMwnJkABfaaA==';

try {
    const base64decoded = LZString.decompressFromBase64(compressed);
    console.log("Base64 解码后，长度:", base64decoded.length);
    console.log("前 100 个字符 (charCodes):");
    for (let i = 0; i < Math.min(100, base64decoded.length); i++) {
        process.stdout.write(base64decoded.charCodeAt(i) + " ");
    }
    console.log("\n\n正在解压...");

    const decompressed = LZString.decompress(base64decoded);
    console.log("解压后的内容长度:", decompressed.length);
    console.log("\n前 500 个字符:");
    console.log(decompressed.substring(0, 500));

    try {
        const json = JSON.parse(decompressed);
        console.log("\n\n解压后的 JSON 内容:");
        console.log(JSON.stringify(json, null, 2));
    } catch (parseErr) {
        console.log("\n\nJSON 解析失败:", parseErr.message);
    }
} catch (err) {
    console.error("错误:", err.message);
    console.error(err.stack);
}
