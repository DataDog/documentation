---
dependencies: []
disable_edit: true
title: モデルの列をドキュメント化するために help_text を使用する
---
## メタデータ
**ID:** `python-django/model-help-text`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
`help_text` を使用して、データベースで使用されているフィールドをドキュメント化します。

#### 詳細はこちら

 - [Django ドキュメント: `help_text`](https://docs.djangoproject.com/en/4.2/ref/models/fields/#help-text)

## 非準拠コードの例
```python
class MyModel(models.Model):
  my_field = models.DateField()
  last_name = models.CharField(max_length=40)  # help_text を追加して、このフィールドが何をしているかを説明します
```

## 準拠コードの例
```python
class MyModel(models.Model):
  my_field = models.DateField(help_text = "Use format YYYY/MM/DD")
```