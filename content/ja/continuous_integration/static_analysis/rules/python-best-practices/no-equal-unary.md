---
dependencies: []
disable_edit: true
title: 演算子 =+ と =- を使用しない
---
## メタデータ
**ID:** `python-best-practices/no-equal-unary`

**言語:** Python

**重大度:** エラー

**カテゴリー:** ベストプラクティス

## 説明
Python に演算子 `=+` と `=-` は存在しません。コードは有効ですが、開発者が実現したいことをしてくれている可能性は低いです。

## 非準拠コードの例
```python
# =+ は Python には存在しません。n = n + 3 を使用してください。
n =+ 3

# =- は Python には存在しません。n = n - 3 を使用してください。
n =- 3
```

## 準拠コードの例
```python
n = n + 3

n = n - 3

foo = -1
```