---
dependencies: []
disable_edit: true
title: 二重否定を使用しない
---
## メタデータ
**ID:** `python-best-practices/no-double-not`

**言語:** Python

**重大度:** 警告

**カテゴリー:** エラーを起こしやすい

## 説明
二重否定は使用しないでください。コードがより複雑になり、読むのも理解するのも難しくなります。二重否定を使用する代わりに、該当する表現を直接使用します。

## 非準拠コードの例
```python
if not not foo:  # シンプルに if foo を使用します
    pass
```

## 準拠コードの例
```python
if not foo:
    pass
```