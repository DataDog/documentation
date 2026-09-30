---
dependencies: []
disable_edit: true
title: クラスメソッドは self を使うべきではない
---
## メタデータ
**ID:** `python-best-practices/class-methods-use-self`

**言語:** Python

**重大度:** エラー

**カテゴリー:** ベストプラクティス

## 説明
クラスメソッド (クラスメソッドでも静的メソッドでもないメソッド) では、最初の引数は慣習的に `self` でなければなりません。

#### 詳細はこちら

 - [Python のメソッドオブジェクトのドキュメント](https://docs.python.org/3.8/tutorial/classes.html#method-objects)
 - [PEP8 スタイルガイド](https://peps.python.org/pep-0008/#function-and-method-arguments)

## 非準拠コードの例
```python
class Foo:
    def bar(bar):  # 代わりに def bar(self) を使用します
        pass
```

## 準拠コードの例
```python
class Foo:
    @staticmethod
    def static_method(bar):
        pass

    @classmethod
    def class_method(bar):
        pass
```