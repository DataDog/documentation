---
dependencies: []
disable_edit: true
title: メソッドが属性と同じ名前を持つ
---
## メタデータ
**ID:** `python-best-practices/method-hidden`

**言語:** Python

**重大度:** 警告

**カテゴリー:** エラーを起こしやすい

## 説明
クラス属性とクラスメソッドが衝突することなく一意な名前を持っていることを確認してください。

## 非準拠コードの例
```python
class MyClass:
    def __init__(self, something):
        self.foo = something

    def bla(foo):
        pass

    def foo(self): # self.foo によって隠されます
        pass
```

## 準拠コードの例
```python
class MyClass:
    def __init__(self, something):
        self.foo = something

    def bla(foo):
        pass

    def bar(self): # self.foo によって隠されます
        pass
```