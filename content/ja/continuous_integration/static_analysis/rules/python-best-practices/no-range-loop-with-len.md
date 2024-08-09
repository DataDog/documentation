---
dependencies: []
disable_edit: true
title: range(len(<array>)) で for i を使用しない
---
## メタデータ
**ID:** `python-best-practices/no-range-loop-with-len`

**言語:** Python

**重大度:** エラー

**カテゴリー:** ベストプラクティス

## 説明
`for in range(len(array))` を使用して配列を反復処理しないでください。代わりに `for i in array` を使ってください。

#### 詳細はこちら

 - [配列を介した Python ループ](https://www.w3schools.com/python/gloss_python_array_loop.asp)

## 非準拠コードの例
```python
for i in range(len(tab)):  # 配列を直接反復処理します
  bla(tab[i])
```

```python
for i in range(len(tab)):  # 配列を直接反復処理します
  tab[i] = bla
```

## 準拠コードの例
```python
for i in tab:
  bla(i)
```