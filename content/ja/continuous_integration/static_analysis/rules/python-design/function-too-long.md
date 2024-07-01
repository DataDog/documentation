---
dependencies: []
disable_edit: true
title: 関数は 100 行以下でなければならない
---
## メタデータ
**ID:** `python-design/function-too-long`

**言語:** Python

**重大度:** 警告

**カテゴリー:** デザイン

## 説明
関数は、理解しやすく保守しやすいように短くすべきです。100 行以上の関数は警告のトリガーとなり、より小さなコード単位にリファクタリングする必要があります。

## 非準拠コードの例
```python
def myfunc():  # 関数が長すぎます




































































































  pass
```

## 準拠コードの例
```python
def myfunc():
  pass
```