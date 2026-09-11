---
dependencies: []
disable_edit: true
title: NotImplemented を発生させない - 存在しない
---
## メタデータ
**ID:** `python-best-practices/raising-not-implemented`

**言語:** Python

**重大度:** 警告

**カテゴリー:** ベストプラクティス

## 説明
コードは `NotImplemented` を発生させず、代わりに `NotImplementedError` を使うべきです。`NotImplemented` は[ドキュメント](https://docs.python.org/3/library/constants.html#NotImplemented)にあるように値であり、例外ではありません。適切な例外は [NotImplementedError](https://docs.python.org/3/library/exceptions.html#NotImplementedError) です

#### 詳細はこちら

 - [NotImplementedError ドキュメント](https://docs.python.org/3/library/exceptions.html#NotImplementedError)

## 非準拠コードの例
```python
a = 1
b = 2
raise NotImplemented  # 代わりに NotImplementedError を使用します
c = 3
```

## 準拠コードの例
```python
a = 1
b = 2
raise NotImplementedError
c = 3
```