---
dependencies: []
disable_edit: true
title: 比較では、変数はそのままにしておかなければならない
---
## メタデータ
**ID:** `python-best-practices/comparison-constant-left`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
変数と値を比較する比較では、比較式の左側に変数を置きます。

## 非準拠コードの例
```python
if 1 <= i:  # use i >= 1
  pass
```

```python
if 1.0 <= i:  # use i >= 1.0
  pass
```

## 準拠コードの例
```python
if i >= 1:
  pass

if 0 < nextSx <= len(subject):
    px = nextPx
    sx = nextSx

if 1 in ctx:
  print("foo")

```