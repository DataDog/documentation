---
dependencies: []
disable_edit: true
title: if 条件が異なるコードブロックでなければならない
---
## メタデータ
**ID:** `python-best-practices/condition-similar-block`

**言語:** Python

**重大度:** 警告

**カテゴリー:** ベストプラクティス

## 説明
`if` 条件の分岐のコードは一意でなければなりません。ブランチが重複している場合は、条件をマージしてください。

## 非準拠コードの例
```python
if foo:
  printf("bar")
elif baz:
  printf("bar2")
elif bap:
  # if 条件と同じコード
  printf("bar")
else:
  # if 条件と同じコード
  printf("bar")
```

## 準拠コードの例
```python
if foo:
  printf("bar")
elif baz:
  printf("bar2")
elif bap:
  printf("bar3")
else:
  printf("bar4")
```