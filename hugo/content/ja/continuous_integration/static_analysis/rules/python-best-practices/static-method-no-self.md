---
dependencies: []
disable_edit: true
title: 静的メソッドのパラメーターとして self を使用しない
---
## メタデータ
**ID:** `python-best-practices/static-method-no-self`

**言語:** Python

**重大度:** エラー

**カテゴリー:** ベストプラクティス

## 説明
静的メソッドではインスタンスを一切使用しません。したがって、`self` 引数は必要性も有用性もなく、使用すべきではありません。

## 非準拠コードの例
```python
class Foo:
  @staticmethod
  def foo(self, bar):  # @staticmethod で self 引数を使用する必要はありません
     pass
```

## 準拠コードの例
```python
class Foo:
  @staticmethod
  def foo(bar):
     pass
```