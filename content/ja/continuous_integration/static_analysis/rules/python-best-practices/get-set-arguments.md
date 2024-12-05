---
dependencies: []
disable_edit: true
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

#### 詳細はこちら

 - [Python ドキュメント - プロパティ](https://docs.python.org/3/library/functions.html#property)

## 非準拠コードの例
```python
class Foo:
   @property
   def get_my_attribute(self, foo):  # ゲッターの引数は 1 つだけです
      return self.my_attribute

   @attr.setter
   def set_attr(self, v, bar):  # セッターの引数は 2 つだけです
      self._attr = v

   @attr.deleter
   def del_attr(self, foo):  # デリーターの引数は 1 つだけです
      del self._attr
```

## 準拠コードの例
```python
class Foo:
   def get_my_attribute(self):
      return self.my_attribute

   def get_my_attribute(self, foo): # プロパティや引数が 1 つではないので有効
      return self.my_attribute

   @property
   def get_my_attribute(self):
      return self.my_attribute

   def set_my_attribute(self, v):
      self.my_attribute = v

   @attr.setter
   def set_attr(self, v):
      self._attr = v

   @attr.deleter
   def del_attr(self,):
      return self._attr
```