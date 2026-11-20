---
dependencies: []
disable_edit: true
title: 条件において True と比較しない
---
## メタデータ
**ID:** `python-best-practices/no-if-true`

**言語:** Python

**重大度:** Notice

**カテゴリー:** Code Style

## 説明
`変数 == True` は使用せず、`変数` のみを使用します。`True` に対する比較を行うと、コードが複雑化して読みづらくなります。

## 非準拠コードの例
```python
if foo == True:  # シンプルに if foo を使用してください
  print("bar")
```

## 準拠コードの例
```python
if foo:
  print("bar")
```