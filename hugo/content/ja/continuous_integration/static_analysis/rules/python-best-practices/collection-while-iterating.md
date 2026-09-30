---
dependencies: []
disable_edit: true
title: 反復処理中に辞書を変更しない
---
## メタデータ
**ID:** `python-best-practices/collection-while-iterating`

**言語:** Python

**重大度:** エラー

**カテゴリー:** エラーを起こしやすい

## 説明
反復処理中に辞書を更新しないでください。辞書を更新したい場合は、既存の値から新しい辞書を作成します。

## 非準拠コードの例
```python
i = 0
for element in my_list:
    my_list["stuff"] = i  # 反復処理中の辞書の変更
    i += 1
```

## 準拠コードの例
```python
i = 0
new_list = {}
for element in my_list:
    new_list["stuff"] = i  # 新しい辞書への値の投入
    i += 1
```