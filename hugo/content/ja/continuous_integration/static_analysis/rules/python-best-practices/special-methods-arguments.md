---
dependencies: []
disable_edit: true
title: 特別なメソッドが正しい引数を持つようにする
---
## メタデータ
**ID:** `python-best-practices/special-methods-arguments`

**言語:** Python

**重大度:** エラー

**カテゴリー:** ベストプラクティス

## 説明
クラスのすべての特別なメソッド (`__add__` や `__sub__` など) では、メソッドの引数の数が正しいことを確認してください。

## 非準拠コードの例
```python
class GFG:

    def __init__(self, val):
        self.val = val

    def __next__(self, val2, val3): # 無効、引数は 1 つだけであるべきです。
        return GFG(self.val + val2.val)
```

```python
class GFG:

    def __init__(self, val):
        self.val = val

    def __add__(self, val2, val3): # 引数は 2 つだけであるべきです。
        return GFG(self.val + val2.val)
```

## 準拠コードの例
```python
class GFG:

    def __init__(self, val):
        self.val = val

    def __add__(self, val2):
        return GFG(self.val + val2.val)
```