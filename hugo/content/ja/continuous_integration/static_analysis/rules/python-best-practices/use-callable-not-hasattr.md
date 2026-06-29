---
dependencies: []
disable_edit: true
title: 値が呼び出し可能かどうかをチェックするために hasattr を使わない
---
## メタデータ
**ID:** `python-best-practices/use-callable-not-hasattr`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
オブジェクトが `__getattr__` を再定義しているかもしれないので、関数が呼び出し可能かどうかをチェックするために `hasattr` を使ってチェックしないでください。代わりに `callable()` を使用してください。

#### 詳細はこちら

 - [Python ドキュメント: callable() ビルトイン](https://docs.python.org/3/library/functions.html#callable)

## 非準拠コードの例
```python
hasattr(x, '__call__')  # callable を使用します
```

## 準拠コードの例
```python
callable(x)
```