---
dependencies: []
disable_edit: true
title: if 条件が値を返す場合、else は不要である
---
## メタデータ
**ID:** `python-best-practices/if-return-no-else`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
`if` ブランチのコードが値を返す場合、`else` ブランチは存在させないでください。

## 非準拠コードの例
```python
if bla:
    foo()
    return 1
else:  # 不要、else ブランチを削除してください
    return 2
```

## 準拠コードの例
```python
if bla:
    foo()
    return 1
return 2
```

```python
if bla:
    foo()
else:
    return 2
```