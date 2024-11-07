---
dependencies: []
disable_edit: true
title: 変数名が読めるようにする
---
## メタデータ
**ID:** `python-best-practices/ambiguous-variable-name`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
フォントによっては、数字の 1 や 0 と区別がつかない文字もあります (例えば、O がゼロのように見える)。あいまいでない文字を使いましょう。

## 非準拠コードの例
```python
I = 1  # 代わりに i を使用します
```

## 準拠コードの例
```python
def i():
    pass
```