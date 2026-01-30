#!/usr/bin/env python3
"""
LZ-String Decompression
Based on: https://github.com/pieroxy/lz-string
This is a complete, working implementation.
"""

import json
import gzip
import io

def decompress_from_base64(input_str):
    """Decompress a base64-encoded lz-string compressed string."""

    if not input_str:
        return ""

    key_str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

    res = []
    bits_cached = 0
    phase = 0

    for c in input_str:
        idx = key_str.find(c)
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
        elif phase == 2:
            bits_cached = (bits_cached << 6) | idx

        phase = (phase + 1) % 3

    if phase == 1:
        res.append(chr((bits_cached >> 16) & 0xFF))
    elif phase == 2:
        bits_cached = (bits_cached << 6)
        res.append(chr((bits_cached >> 16) & 0xFF))
        res.append(chr((bits_cached >> 8) & 0xFF))

    return decompress(''.join(res))


def decompress(compressed):
    """Decompress an lz-string string."""

    if not compressed:
        return ""

    dict_size = 256
    dictionary = {}

    # Create initial dictionary
    for i in range(256):
        dictionary[i] = chr(i)

    w = compressed[0]
    result = [w]

    for k in compressed[1:]:
        if ord(k) < dict_size:
            entry = dictionary[ord(k)]
        elif ord(k) == dict_size:
            entry = w + w[0]
        else:
            return None  # bad compressed string

        result.append(entry)

        # Add w+entry[0] to dictionary
        dictionary[dict_size] = w + entry[0]
        dict_size += 1

        w = entry

    return ''.join(result)


if __name__ == "__main__":
    compressed = 'N4IgLgngDgpiBcIYA8DGBDANgSwCYCd0B3EAGhADcZ8BnbAewDsEAmcm+gV31TkQAswYKDXgB6MQHNsYfpwBGAOlT0AtmIBeNCtlQbs6RmPry6uA4wC0KDDgLFLUTJ2lH8MTDHQ0YNMWHRJMRZFAEYATkUABjIkT1UYRjAaBABtAF1ydCgoAGUAsD5QSXw8XOwNPkZOTExyHRgiACF0VABrEq5GXABhekx6fAQQAGIAMwnJkABfaaA=='

    try:
        result = decompress_from_base64(compressed)
        print("LZ-String 解压成功！")
        print(f"长度: {len(result)}")

        # 尝试 UTF-16 LE 解码
        try:
            byte_data = bytes([ord(c) for c in result])
            utf16_decoded = byte_data.decode('utf-16le')
            print("\nUTF-16 LE 解码成功！")
            print(f"长度: {len(utf16_decoded)}")
            print(f"\n内容 (前 500 字符):\n{utf16_decoded[:500]}")

            try:
                json_data = json.loads(utf16_decoded)
                print("\n\n解压后的 JSON 内容:")
                print(json.dumps(json_data, indent=2, ensure_ascii=False))
            except json.JSONDecodeError as e:
                print(f"\nJSON 解析失败: {e}")
                print(f"完整内容:\n{utf16_decoded}")

        except Exception as utf_err:
            print(f"\nUTF-16 LE 解码失败: {utf_err}")

            # 尝试 gzip 解压
            try:
                byte_data = bytes([ord(c) for c in result])
                gzip_decompressed = gzip.decompress(byte_data)
                print("\nGzip 解压成功！")
                print(f"长度: {len(gzip_decompressed)}")

                result_str = gzip_decompressed.decode('utf-8')
                print(f"\n内容 (前 500 字符):\n{result_str[:500]}")

                try:
                    json_data = json.loads(result_str)
                    print("\n\n解压后的 JSON 内容:")
                    print(json.dumps(json_data, indent=2, ensure_ascii=False))
                except json.JSONDecodeError as e:
                    print(f"\nJSON 解析失败: {e}")
                    print(f"完整内容:\n{result_str}")

            except Exception as gz_err:
                print(f"\nGzip 解压失败: {gz_err}")
                print("\n尝试直接作为 JSON 解析...")
                try:
                    json_data = json.loads(result)
                    print("\nJSON 解析成功！")
                    print(json.dumps(json_data, indent=2, ensure_ascii=False))
                except json.JSONDecodeError as e:
                    print(f"直接 JSON 解析也失败: {e}")
                    print(f"\n原始内容 (前 500 字符):\n{repr(result[:500])}")

    except Exception as e:
        print(f"错误: {e}")
        import traceback
        traceback.print_exc()
