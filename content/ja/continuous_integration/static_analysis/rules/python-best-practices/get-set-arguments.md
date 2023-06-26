---
dependencies: []
disable_edit: true
kind: documentation
title: getter/setter must have 1 or 2 arguments respectively
---
## メタデータ
**ID:** `python-best-practices/get-set-arguments`

**言語:** Python

**重大度:** 警告

**カテゴリー:** ベストプラクティス

## 説明
ゲッターとセッターに適切な数のパラメーターがあることを確認してください。
 - ゲッターは正確に 1 つのパラメーター (読み込むインスタンス) を持たなければなりません
 - セッターは、正確に 2 つのパラメーター (更新するインスタンスと関連する値) を持たなければなりません

## 非準拠コードの例
```python
class Foo:
   def get_my_attribute(self, foo):  # ゲッターの引数は 1 つだけです
      return self.my_attribute


   def set_my_attribute(self, v, bar):  # セッターの引数は 2 つだけです
      self.my_attribute = v
```

## 準拠コードの例
```python
class Foo:
   def get_my_attribute(self):
      return self.my_attribute


   def set_my_attribute(self, v):
      self.my_attribute = v
```