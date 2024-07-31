---
dependencies: []
disable_edit: true
title: 可能な限りコンビニエンスインポートを使用する
---
## メタデータ
**ID:** `python-django/use-convenience-imports`

**言語:** Python

**重大度:** Notice

**カテゴリー:** Code Style

## 説明
Django からのインポートには、可能な限り簡便型のインポートを使用します。

## 非準拠コードの例
```python
from django.views.generic.base import View  # django.views を使用してください
```

## 準拠コードの例
```python
from django.views import View
```