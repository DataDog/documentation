---
dependencies: []
disable_edit: true
title: 変数名は snake_case を使用しなければならない
---
## メタデータ
**ID:** `python-code-style/assignment-names`

**言語:** Python

**重大度:** エラー

**カテゴリー:** Code Style

## 説明
変数名には `camelCase` ではなく `snake_case` を使用するようにしてください。

#### 詳細はこちら

- [PEP8 - 命名スタイル](https://peps.python.org/pep-0008/#descriptive-naming-styles)

## 非準拠コードの例
```python
fooBar = foobar()
```

```python
firstVariable, secondVariable = functioncall()
```

## 準拠コードの例
```python
hello = 1
```

```python
fooBAr = foobar()
```