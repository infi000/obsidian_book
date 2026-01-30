#!/usr/bin/env python3
# Correct lz-string implementation based on official library
import base64
import json
import sys

def decompress_from_base64(s):
    """
    Decompress a string that was compressed using lz-string library's compressToBase64
    """
    if not s:
        return ""

    keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

    # 第一步：base64 -> 字符串
    res = []
    bits_cached = 0
    phase = 0

    for c in s:
        idx = keyStr.find(c)
        if idx < 0:
            raise ValueError(f"Invalid character: {c}")

        if phase == 0:
            bits_cached = (bits_cached << 6) | idx
        elif phase == 1:
            bits_cached = (bits_cached << 6) | idx
            res.append(chr((bits_cached >> 16) & 0xFF))
            res.append(chr((bits_cached >> 8) & 0xFF))
            res.append(chr(bits_cached & 0xFF))
            bits_cached = 0
        else:  # phase == 2, should not happen in normal flow
            bits_cached = (bits_cached << 6) | idx

        phase = (phase + 1) % 3

    # Handle remaining bits
    if phase == 1:
        bits_cached = (bits_cached << 6)
        res.append(chr((bits_cached >> 16) & 0xFF))
    elif phase == 2:
        bits_cached = (bits_cached << 6)
        res.append(chr((bits_cached >> 16) & 0xFF))
        res.append(chr((bits_cached >> 8) & 0xFF))

    compressed = ''.join(res)

    # 第二步：解压
    return _decompress(compressed)


def _decompress(compressed):
    """Decompress LZ-string string"""
    if not compressed:
        return ""

    dict_size = 256
    max_dict_bits = 8
    dictionary = {}

    # Convert string to char codes
    data = [ord(c) for c in compressed]
    pos = 0
    bitstream = 0
    bitcount = 0

    def read_bits(n):
        nonlocal pos, bitstream, bitcount
        result = 0
        while bitcount < n:
            if pos >= len(data):
                break
            bitstream = (bitstream << 8) | data[pos]
            pos += 1
            bitcount += 8

        bitcount -= n
        result = (bitstream >> bitcount) & ((1 << n) - 1)
        return result

    # Get initial code word size
    num_literal_bits = read_bits(2) + 1

    output = []

    while pos < len(data) or bitcount > 0:
        code = read_bits(max_dict_bits)

        if code == 256:
            break
        elif code < 256:
            output.append(chr(code))
        elif code in dictionary:
            output.append(dictionary[code])
        else:
            # This case occurs when code == dict_size
            # which shouldn't happen with a wellformed stream
            if output:
                entry = output[-1] + output[-1][0]
                output.append(entry)
            else:
                output.append("")

        if output and dict_size < 65536:
            # Add previous + first char of current to dictionary
            if len(output) > 1:
                w = output[-2]
                entry = output[-1]
                dictionary[dict_size] = w + entry[0]
            else:
                dictionary[dict_size] = output[-1]

            dict_size += 1
            if dict_size > (1 << max_dict_bits) and max_dict_bits < 16:
                max_dict_bits += 1

    return ''.join(output)


# Test
if __name__ == "__main__":
    compressed_data = 'N4IgLgngDgpiBcIYA8DGBDANgSwCYCd0B3EAGhADcZ8BnbAewDsEAmcm+gV31TkQAswYKDXgB6MQHNsYfpwBGAOlT0AtmIBeNCtlQbs6RmPry6uA4wC0KDDgLFLUTJ2lH8MTDHQ0YNMWHRJMRZFAEYATkUABjIkT1UYRjAaBABtAF1ydCgoAGUAsD5QSXw8XOwNPkZOTExyHRgiACF0VABrEq5GXABhekx6fAQQAGIAMwnJkABfaaA=='

    try:
        result = decompress_from_base64(compressed_data)
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
        print(f"错误: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
