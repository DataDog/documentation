---
dependencies: []
disable_edit: true
title: __unicode__ を使用しない
---
## メタデータ
**ID:** `python-django/no-unicode-on-models`

**言語:** Python

**重大度:** 警告

**カテゴリー:** ベストプラクティス

## 説明
Django モデルでは `__unicode__` を使用しないでください。フィールド `__unicode__` は Python 2 で使用されます。代わりに `__str__` を使用し、`__str__` は Python 3 で使用します。

## 非準拠コードの例
```python
class Person(models.Model):

    def __unicode__(self):  # __unicode__ を定義せず、__str__ を定義します
       pass
```

## 準拠コードの例
```python
class Person(models.Model):

    def __str__(self):
       "person"
```