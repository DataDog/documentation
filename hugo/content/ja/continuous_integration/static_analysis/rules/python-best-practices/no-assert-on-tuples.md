---
dependencies: []
disable_edit: true
title: タプルにアサートしない
---
## メタデータ
**ID:** `python-best-practices/no-assert-on-tuples`

**言語:** Python

**重大度:** エラー

**カテゴリー:** エラーを起こしやすい

## 説明
タプルにアサートしないでください。タプルにアサートすると、タプルが空でない場合は常に `True` と評価されます。タプルに対してアサートするのではなく、それぞれの値に対してアサートしてください。

## 非準拠コードの例
```python
assert (1, 2)  # タプルにアサートしないでください
```

## 準拠コードの例
```python
assert x

assert exitcode == 42, (stdout, stderr)
```