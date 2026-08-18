---
dependencies: []
disable_edit: true
title: 例外がベース例外を継承するようにする
---
## メタデータ
**ID:** `python-best-practices/exception-inherit`

**言語:** Python

**重大度:** 警告

**カテゴリー:** ベストプラクティス

## 説明
新しい `Exception` は基底 `Exception` を継承しなければなりません。常に別の例外を親にするか、少なくとも `Exception` の基底クラスを使用してください。

#### 詳細はこちら

- [Python ドキュメント: ユーザー定義の例外](https://docs.python.org/3/tutorial/errors.html#user-defined-exceptions)

## 非準拠コードの例
```python
class CustomException:
    """An Invalid exception class."""
```

## 準拠コードの例
```python
class CustomException(Exception):
    """An Invalid exception class."""
```