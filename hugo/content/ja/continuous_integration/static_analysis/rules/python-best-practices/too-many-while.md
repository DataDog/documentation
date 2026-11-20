---
dependencies: []
disable_edit: true
title: ネストされたループと条件を使いすぎない
---
## メタデータ
**ID:** `python-best-practices/too-many-while`

**言語:** Python

**重大度:** 警告

**カテゴリー:** ベストプラクティス

## 説明
プログラムでネストされたループを使用する場合は、階層に上限を設ける必要があります。プログラム内でネストされたループ (`if`/`for`/`while`) が多すぎる場合は、ネストの階層が多くなりすぎないように、プログラムのリファクタリングを検討してください。

## 非準拠コードの例
```python
while bla:
    while foo:
        while bar:
            while baz:
                pass

```

## 準拠コードの例
```python
while bla:
    while foo:
        while bar:
            pass

```