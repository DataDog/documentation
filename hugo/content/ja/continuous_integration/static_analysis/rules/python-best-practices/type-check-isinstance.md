---
dependencies: []
disable_edit: true
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
if type(Foo()) == Foo:
    print("is foo")
```

## 準拠コードの例
```python
raise ValueError("target %s config %s has type of %s" % (target, config_content, type(config_content)))
```

```python
if isinstance(Bar(), Foo):
    print("foo")
```