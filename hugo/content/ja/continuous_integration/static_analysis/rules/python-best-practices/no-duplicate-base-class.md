---
dependencies: []
disable_edit: true
title: ベースクラスを一度だけ使用する
---
## メタデータ
**ID:** `python-best-practices/no-duplicate-base-class`

**言語:** Python

**重大度:** 警告

**カテゴリー:** エラーを起こしやすい

## 説明
クラスに同じスーパークラスを二度指定することはできません。各スーパークラスは一意でなければなりません。

## 非準拠コードの例
```python
class MyClass:
    pass


# 親の SuperClass が二度指定されています
class MyClassTwo(SuperClass, SuperClass):
    pass
```

## 準拠コードの例
```python
class MyClass:
    pass


class MyClassTwo(SuperClass):
    pass
```