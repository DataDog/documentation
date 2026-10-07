---
dependencies: []
disable_edit: true
title: strip() 引数に重複文字を指定してはならない
---
## メタデータ
**ID:** `python-best-practices/invalid-strip-call`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
`.strip()` を使うときは、分割したい文字だけを渡します。同じ文字を 2 回指定する必要はありません。

## 非準拠コードの例
```python
"Hello World".strip("Hello")  # 文字 l が文字列中に 2 回存在します
```

## 準拠コードの例
```python
"Hello World".strip("Helo")  # 文字 l が文字列中に 2 回存在します
```