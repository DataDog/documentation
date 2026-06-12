---
dependencies: []
disable_edit: true
title: NullBooleanField を使用しない
---
## メタデータ
**ID:** `python-django/no-null-boolean`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
`NullBooleanField` 型は非推奨です。代わりに `BooleanField` を使用します。

## 非準拠コードの例
```python
class Person(models.Model):
    is_adult = models.NullBooleanField()  # BooleanField を使用してください

```

## 準拠コードの例
```python
class Person(models.Model):
    is_adult = models.BooleanField(null=True)
```