---
dependencies: []
disable_edit: true
title: クラスは 100 行以下でなければならない
---
## メタデータ
**ID:** `python-code-style/max-class-lines`

**言語:** Python

**重大度:** 警告

**カテゴリー:** デザイン

## 説明
クラスは理解しやすいように短く (100 行未満) する必要があります。もしクラスや関数が 100 行を超えるようなら、コードをリファクタリングしてクラスが 100 行未満になるようにしましょう。

## 非準拠コードの例
```python
class MyClass:
    def __init__(self):
        pass

































































































    def foo(self):
        pass
```

## 準拠コードの例
```python
class MyClass:
    def __init__(self):
        pass

    def foo(self):
        pass
```