---
dependencies: []
disable_edit: true
title: __init__ 関数でリターンしない
---
## メタデータ
**ID:** `python-best-practices/init-no-return-value`

**言語:** Python

**重大度:** エラー

**カテゴリー:** エラーを起こしやすい

## 説明
`__init__` メソッド (および `__new__` メソッド) は決して `None` 以外の値を返してはいけません。

#### 詳細はこちら

 - [Python データモデルの `__init__` 関数のドキュメント](https://docs.python.org/3/reference/datamodel.html#object.__init__)

## 非準拠コードの例
```python
class Foo:
    def __init__(self):
        return 3  #  __init__ は値を返すべきではありません

    def my_method():
        return 10
```

## 準拠コードの例
```python
class Foo:
    def __init__(self):
        pass
```