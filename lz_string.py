#!/usr/bin/env python3
"""
LZ-String decompression - based on official lz-string library
https://github.com/pieroxy/lz-string
"""
import json

class LZString:
    @staticmethod
    def decompress_from_base64(input_str):
        if not input_str:
            return ""

        keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

        output = []
        bits_cached = 0
        phase = 0

        for c in input_str:
            idx = keyStr.find(c)
            if idx == -1:
                raise Exception(f"Unknown character '{c}'")

            if phase == 0:
                bits_cached |= (idx << 18)
            elif phase == 1:
                bits_cached |= (idx << 12)
            elif phase == 2:
                bits_cached |= (idx << 6)
            else:  # phase == 3
                bits_cached |= idx
                output.append(chr((bits_cached >> 16) & 0xFF))
                output.append(chr((bits_cached >> 8) & 0xFF))
                output.append(chr(bits_cached & 0xFF))
                bits_cached = 0

            phase = (phase + 1) % 4

        if phase == 1:
            output.append(chr((bits_cached >> 16) & 0xFF))
        elif phase == 2:
            output.append(chr((bits_cached >> 16) & 0xFF))
            output.append(chr((bits_cached >> 8) & 0xFF))

        res = ''.join(output)
        return LZString.decompress(res)

    @staticmethod
    def decompress(compressed):
        if not compressed:
            return ""

        dictSize = 256
        dictionary = {}
        data = [ord(c) for c in compressed]
        output = []

        pos = 0
        bitstream = 0
        bitcount = 0

        def read_bits(num_bits):
            nonlocal pos, bitstream, bitcount
            res = 0
            for i in range(num_bits):
                resb = (data[pos] >> (15 - (i % 16)))  if pos < len(data) else 0
                if (i % 16) == 15:
                    pos += 1
                res += (resb & 1) << (num_bits - i - 1)
            return res

        num_literal_bits = read_bits(2) + 1

        next_code = read_bits(num_literal_bits)
        if next_code == 0:
            bits_to_read = num_literal_bits
            while True:
                c = read_bits(bits_to_read)
                dictionary[dictSize] = chr(c)
                dictSize += 1
                if c == dictionary.get(dictSize - 1):
                    break
                if dictSize > pow(2, bits_to_read):
                    bits_to_read += 1
            next_code = dictSize - 1
        elif next_code == 1:
            bits_to_read = num_literal_bits + 1
            while True:
                c = read_bits(bits_to_read)
                dictionary[dictSize] = chr(c)
                dictSize += 1
                if c == dictionary.get(dictSize - 1):
                    break
                if dictSize > pow(2, bits_to_read):
                    bits_to_read += 1
            next_code = dictSize - 1
        elif next_code == 2:
            return ""

        entry = dictionary.get(next_code, "")
        output.append(entry)
        num_bits = 3
        max_power = pow(2, num_bits)
        power = 1

        i = 0
        while power != max_power:
            resb = (data[pos] >> (15 - (i % 16))) if pos < len(data) else 0
            if (i % 16) == 15:
                pos += 1
            power += resb << (num_bits - (i % 16) - 1)
            i += 1

        next_code = power - 1

        while True:
            if pos >= len(data):
                break

            next_code = read_bits(num_bits)

            if next_code < 2:
                if next_code == 0:
                    bits_to_read = num_literal_bits
                    while True:
                        c = read_bits(bits_to_read)
                        dictionary[dictSize] = chr(c)
                        dictSize += 1
                        if dictSize > pow(2, bits_to_read):
                            bits_to_read += 1
                        if c == dictionary.get(dictSize - 1):
                            break
                    next_code = dictSize - 1
                else:
                    bits_to_read = num_literal_bits + 1
                    while True:
                        c = read_bits(bits_to_read)
                        dictionary[dictSize] = chr(c)
                        dictSize += 1
                        if dictSize > pow(2, bits_to_read):
                            bits_to_read += 1
                        if c == dictionary.get(dictSize - 1):
                            break
                    next_code = dictSize - 1

            elif next_code == 3:
                return ""

            elif next_code == 2:
                break

            entry = dictionary.get(next_code, "") or (entry + entry[0] if entry else "")
            output.append(entry)

            dictionary[dictSize] = (dictionary.get(next_code - 1, "") or entry[:1]) + (entry[:1] if entry else "")
            dictSize += 1

            if dictSize > pow(2, num_bits):
                num_bits += 1

        return ''.join(output)


if __name__ == "__main__":
    compressed_data = 'N4IgLgngDgpiBcIYA8DGBDANgSwCYCd0B3EAGhADcZ8BnbAewDsEAmcm+gV31TkQAswYKDXgB6MQHNsYfpwBGAOlT0AtmIBeNCtlQbs6RmPry6uA4wC0KDDgLFLUTJ2lH8MTDHQ0YNMWHRJMRZFAEYATkUABjIkT1UYRjAaBABtAF1ydCgoAGUAsD5QSXw8XOwNPkZOTExyHRgiACF0VABrEq5GXABhekx6fAQQAGIAMwnJkABfaaA=='

    try:
        result = LZString.decompress_from_base64(compressed_data)
        print("解压成功！")
        print(f"长度: {len(result)}")
        print(f"内容:\n{result}")

        try:
            json_data = json.loads(result)
            print("\n\n解压后的 JSON 内容:")
            print(json.dumps(json_data, indent=2, ensure_ascii=False))
        except json.JSONDecodeError as e:
            print(f"\nJSON 解析失败: {e}")

    except Exception as e:
        print(f"错误: {e}")
        import traceback
        traceback.print_exc()
