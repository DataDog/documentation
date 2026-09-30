---
dependencies: []
disable_edit: true
title: __bytes__ メソッドは文字列ではなくバイトを返すべきである
---
## メタデータ
**ID:** `python-best-practices/return-bytes-not-string`

**言語:** Python

**重大度:** Notice

**カテゴリー:** エラーを起こしやすい

## 説明
`__bytes__` メソッドは文字列を返すべきではなく、代わりにバイトを返すようにする必要があります。

## 非準拠コードの例
```python
class MyClass:
    def __bytes__(self):
        pass
        return "123" # b"123" を返すべき
```

## 準拠コードの例
```python
class MyClass:
    def __bytes__(self):
        pass
        return b"123"
```