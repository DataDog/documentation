---
dependencies: []
disable_edit: true
kind: documentation
title: type の代わりに isinstance を使う
---
## メタデータ
**ID:** `python-best-practices/type-check-isinstance`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
`isinstance` を使用した方が `type` よりも高速ですが、継承も考慮するためより正確です。

## 非準拠コードの例
```python
# 次のように記述する代わりに isinstance を使用します
type(Foo()) == Foo

```

## 準拠コードの例
```python
isinstance(Bar(), Foo)
```