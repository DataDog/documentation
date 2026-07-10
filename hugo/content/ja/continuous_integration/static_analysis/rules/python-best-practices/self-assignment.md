---
dependencies: []
disable_edit: true
title: 自分自身に割り当てない
---
## メタデータ
**ID:** `python-best-practices/self-assignment`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
値の自己代入は行わないでください。代わりに、別の変数に値を代入してデータフローを明確にし、読んで理解しやすいようにします。

## 非準拠コードの例
```python
def foo():
    bar = bar  # 自己代入は避けてください
```

## 準拠コードの例
```python
def foo():
    bar = baz
```