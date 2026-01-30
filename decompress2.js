// 正确的 LZ-String 解压实现
function decompress(compressed) {
    const getBaseValue = (alphabet, char) => alphabet.indexOf(char);

    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let res = [];
    let phase = 0;
    let bitsCached = 0;
    let val = 0;

    // First, convert base64 to byte stream
    for (let i = 0; i < compressed.length; i++) {
        const c = getBaseValue(keyStr, compressed.charAt(i));
        if (c === -1) {
            throw new Error("Invalid character: " + compressed.charAt(i));
        }

        if (phase === 0) {
            bitsCached = (bitsCached << 6) | c;
            phase = 1;
        } else {
            bitsCached = (bitsCached << 6) | c;

            // Extract three bytes
            for (let j = 12; j >= 0; j -= 8) {
                res.push(String.fromCharCode((bitsCached >>> j) & 0xFF));
            }
            phase = 0;
        }
    }

    if (phase === 1) {
        bitsCached <<= 6;
        for (let j = 12; j >= 0; j -= 8) {
            res.push(String.fromCharCode((bitsCached >>> j) & 0xFF));
        }
    }

    const data = res.join("");

    // Now decompress the data
    const decompressData = () => {
        const dict = {};
        const data_ords = [];

        for (let i = 0; i < data.length; i++) {
            data_ords.push(data.charCodeAt(i));
        }

        let bitstream = 0;
        let bitcount = 0;
        let dict_size = 256;
        let max_dict_bits = 8;
        let pos = 0;

        const readBits = (n) => {
            let result = 0;
            while (bitcount < n) {
                if (pos >= data_ords.length) {
                    throw new Error("Unexpected end of data");
                }
                bitstream = (bitstream << 8) | data_ords[pos];
                pos++;
                bitcount += 8;
            }
            bitcount -= n;
            result = (bitstream >>> bitcount) & ((1 << n) - 1);
            return result;
        };

        // Read literal bits
        const literal_bits = readBits(2) + 1;

        const output = [];
        let w = "";

        while (pos < data_ords.length || bitcount > 0) {
            try {
                const code = readBits(max_dict_bits);

                if (code === 256) {
                    break;
                }

                let entry = "";
                if (code < 256) {
                    entry = String.fromCharCode(code);
                } else if (code in dict) {
                    entry = dict[code];
                } else if (code === dict_size) {
                    entry = w + w.charAt(0);
                } else {
                    throw new Error("Bad code: " + code);
                }

                output.push(entry);

                // Add w+entry[0] to the dictionary.
                if (dict_size < 65536) {
                    dict[dict_size] = w + entry.charAt(0);
                    dict_size++;
                    if (dict_size > (1 << max_dict_bits) && max_dict_bits < 16) {
                        max_dict_bits++;
                    }
                }

                w = entry;
            } catch (e) {
                break;
            }
        }

        return output.join("");
    };

    return decompressData();
}

// Test
const compressed = 'N4IgLgngDgpiBcIYA8DGBDANgSwCYCd0B3EAGhADcZ8BnbAewDsEAmcm+gV31TkQAswYKDXgB6MQHNsYfpwBGAOlT0AtmIBeNCtlQbs6RmPry6uA4wC0KDDgLFLUTJ2lH8MTDHQ0YNMWHRJMRZFAEYATkUABjIkT1UYRjAaBABtAF1ydCgoAGUAsD5QSXw8XOwNPkZOTExyHRgiACF0VABrEq5GXABhekx6fAQQAGIAMwnJkABfaaA==';

try {
    const decompressed = decompress(compressed);
    console.log("解压后的原始内容:");
    console.log(decompressed);
    console.log("\n\n长度:", decompressed.length);
    console.log("前200个字符:", decompressed.substring(0, 200));

    try {
        const json = JSON.parse(decompressed);
        console.log("\n\n解压后的 JSON:");
        console.log(JSON.stringify(json, null, 2));
    } catch (parseErr) {
        console.log("\n\nJSON 解析失败:", parseErr.message);
    }
} catch (err) {
    console.error("Decompression Error:", err.message);
    console.error(err.stack);
}
