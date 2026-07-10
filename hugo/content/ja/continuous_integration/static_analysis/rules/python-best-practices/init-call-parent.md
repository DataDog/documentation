---
dependencies: []
disable_edit: true
title: super() を使って親コンストラクタを呼び出す
---
## メタデータ
**ID:** `python-best-practices/init-call-parent`

**言語:** Python

**重大度:** 警告

**カテゴリー:** ベストプラクティス

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
# 親が複数あり、どの親コンストラクタを使用するか
# 正確に知る必要があります
class DummyCIVisibilityWriter(DummyWriterMixin, CIVisibilityWriter):
    def __init__(self, *args, **kwargs):
        CIVisibilityWriter.__init__(self, *args, **kwargs)
        DummyWriterMixin.__init__(self, *args, **kwargs)
        self._encoded = None
```

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