---
dependencies: []
disable_edit: true
title: Charfield には常に max_length を指定する
---
## メタデータ
**ID:** `python-django/model-charfield-max-length`

**言語:** Python

**重大度:** 警告

**カテゴリー:** ベストプラクティス

## 説明
`Charfield` では、フィールドの最大サイズを指定するために `max_length` 属性を定義します。

## 非準拠コードの例
```python
class Person(models.Model):
    first_name = models.CharField()  # max_length を定義します
    last_name = models.CharField()  # max_length を定義します
```

## 準拠コードの例
```python
class Person(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=40)
```