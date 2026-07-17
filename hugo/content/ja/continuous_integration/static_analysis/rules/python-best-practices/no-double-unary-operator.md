---
dependencies: []
disable_edit: true
title: 演算子 -- と ++ を使用しない
---
## メタデータ
**ID:** `python-best-practices/no-double-unary-operator`

**言語:** Python

**重大度:** エラー

**カテゴリー:** ベストプラクティス

## 説明
Python に演算子 `--` と `++` は存在しません。変数を適切にインクリメントまたはデクリメントしてください。

## 非準拠コードの例
```python
--n  # n = n - 1 を使用します
++n  # n = n + 1 を使用します

```

## 準拠コードの例
```python
n = n + 1
n = n - 1
```