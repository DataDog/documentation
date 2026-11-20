---
dependencies: []
disable_edit: true
title: 関数の外にリターンしない
---
## メタデータ
**ID:** `python-best-practices/return-outside-function`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
すべての `return` ステートメントは関数内に記述しなければなりません。関数の外に `return` ステートメントを置くと、予期しない動作 (プログラムを早期に終了させるなど) をする可能性があります。

## 非準拠コードの例
```python
class Foo:
    return 1  # return は関数内で行う必要があります
```

```python
def foo():
    return "bar"

return "bar"  # return は関数内で行う必要があります
```

## 準拠コードの例
```python
def foobar()
    return 2
```