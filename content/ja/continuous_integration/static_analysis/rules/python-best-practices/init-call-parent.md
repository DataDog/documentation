---
dependencies: []
disable_edit: true
kind: documentation
title: super() を使って親コンストラクタを呼び出す
---
## メタデータ
**ID:** `python-best-practices/init-call-parent`

**言語:** Python

**重大度:** 警告

**カテゴリー:** デザイン

## 説明
親コンストラクタを呼び出すには、親オブジェクトを直接呼び出すのではなく、`super()` を呼び出す必要があります。

## 非準拠コードの例
```python
class Class(Parent):
    def __init__(self):
        SomeClass.__init__(self)  # super() を使用する必要があります
```

## 準拠コードの例
```python
class Class(Parent):
    def foo(self):
        SomeClass.__init__(self)  # __init__の外側、有効
```

```python
class Class(Parent):
    def __init__(self):
        super().__init__(self)
```