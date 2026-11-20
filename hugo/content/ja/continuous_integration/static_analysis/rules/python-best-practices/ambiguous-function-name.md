---
dependencies: []
disable_edit: true
title: 関数名が読めるようにする
---
## メタデータ
**ID:** `python-best-practices/ambiguous-function-name`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
フォントによっては、これらの文字は数字の 1 や 0 と区別がつきません。あいまいでない文字を使いましょう。

## 非準拠コードの例
```python
def I():  # 代わりに i を使用します
    pass
```

## 準拠コードの例
```python
def i():
    pass
```