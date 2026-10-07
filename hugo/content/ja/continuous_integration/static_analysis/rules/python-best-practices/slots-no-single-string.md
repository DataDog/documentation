---
dependencies: []
disable_edit: true
title: __slots__ は単一の文字列であってはならない
---
## メタデータ
**ID:** `python-best-practices/slots-no-single-string`

**言語:** Python

**重大度:** エラー

**カテゴリー:** エラーを起こしやすい

## 説明
`__slots__` 属性は文字列でない反復可能な値でなければなりません。

#### 詳細はこちら

 - [Python Wiki: スロットの使用](https://wiki.python.org/moin/UsingSlots)

## 非準拠コードの例
```python
class MyClass:
    __slots__ = "attr"  # 反復可能でなければなりません

    def __init__(self):
        pass
```

## 準拠コードの例
```python
from django.apps import AppConfig


class TweetsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tweets'
```

```python
class MyClass:
    __slots__ = ("attr", )

    def __init__(self):
        pass
```