---
dependencies: []
disable_edit: true
title: ネストされた if 条件を使いすぎない
---
## メタデータ
**ID:** `python-best-practices/too-many-nested-if`

**言語:** Python

**重大度:** 警告

**カテゴリー:** ベストプラクティス

## 説明
ネストされたループを使いすぎると、コードを読んで理解するのが難しくなります。ネストの階層を減らしてコードを簡素化し、コードを小さな単位に分割しましょう。

## 非準拠コードの例
```python
if foo:
    if bar:
        if baz:
            if bao:
                pass
```

## 準拠コードの例
```python
if foo:
    if bar:
        if baz:
            pass
```