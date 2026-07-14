---
dependencies: []
disable_edit: true
title: 辞書の重複キーを避ける
---
## メタデータ
**ID:** `python-best-practices/avoid-duplicate-keys`

**言語:** Python

**重大度:** 警告

**カテゴリー:** ベストプラクティス

## 説明
辞書のキーは一意でなければなりません。

## 非準拠コードの例
```python
dict = {
  "key1": "key2",
  "key2": "key3",
  "key3": "key4",
  "key1": "bla"
}

```

## 準拠コードの例
```python
dict = {
  "key1": "key2",
  "key2": "key3",
  "key3": "key4",
}

```