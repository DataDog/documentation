---
dependencies: []
disable_edit: true
title: __exit__ と __enter__ の両方が定義されていることを確認する
---
## メタデータ
**ID:** `python-best-practices/ctx-manager-enter-exit-defined`

**言語:** Python

**重大度:** エラー

**カテゴリー:** ベストプラクティス

## 説明
メソッド `__enter__` と `__exit__` は一緒に宣言する必要があります。片方のメソッドがない場合は、両方が定義されていることを確認する必要があります。

#### 詳細はこちら

 - [contextlib ドキュメント](https://docs.python.org/3/library/contextlib.html)

## 非準拠コードの例
```python
class Ctx:
    def __exit__(self, *exc):  # メソッド __enter__ が定義されている必要があります。
        pass
```

```python
class Ctx:
    def __enter__(self):  # メソッド __exit__ も定義する必要があります。
        pass
```

## 準拠コードの例
```python
class Ctx:
    def __enter__(self):
        pass
    def __exit__(self, *exc):
        pass
```