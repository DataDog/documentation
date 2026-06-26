---
dependencies: []
disable_edit: true
title: 関数の引数に代入しない
---
## メタデータ
**ID:** `python-best-practices/function-variable-argument-name`

**言語:** Python

**重大度:** 警告

**カテゴリー:** ベストプラクティス

## 説明
関数のパラメーターは読み取るだけで、変更すべきではありません。パラメーターの値を変更する場合は、関数の中でその値を返し、関数の呼び出し側で新しい値を扱います。

## 非準拠コードの例
```python
def func(arg1, arg2):
    arg1 = foo  # 引数である変数への代入
```

```python
def func(arg1, arg2):
    (arg1, arg3, arg2) = foo  # 引数である変数への代入
```

## 準拠コードの例
```python
def func(arg1, arg2):
    arg3 = foo
```