---
dependencies: []
disable_edit: true
title: 関数は 200 行以下でなければならない
---
## メタデータ
**ID:** `python-code-style/max-function-lines`

**言語:** Python

**重大度:** エラー

**カテゴリー:** Code Style

## 説明
関数が長すぎないようにしてください。関数は 100 行未満であるべきです。そうでないと、長すぎて理解しにくくなります。

## 非準拠コードの例
```python
def myfunction():
    foo()
    bar()





























































































































































































































    pass
```

## 準拠コードの例
```python
def myfunction(args):
    foo()
    bar()
    pass
```