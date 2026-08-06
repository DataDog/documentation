---
dependencies: []
disable_edit: true
title: 関数は一度だけ定義しなければならない
---
## メタデータ
**ID:** `python-best-practices/function-already-exists`

**言語:** Python

**重大度:** エラー

**カテゴリー:** エラーを起こしやすい

## 説明
関数は一度しか定義してはいけません。モジュール内の各関数には必ず一意な名前を使用してください。

## 非準拠コードの例
```python

def my_function():
  pass

def foo():
  pass

def my_function(): # 定義済みの関数
  pass

```

## 準拠コードの例
```python

def my_function():
  pass

def foo():
  pass

def my_other_function():
  pass

```