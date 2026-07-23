---
dependencies: []
disable_edit: true
title: 特定の例外がない限り、raise ステートメントを使用しない
---
## メタデータ
**ID:** `python-best-practices/no-bare-raise`

**言語:** Python

**重大度:** 警告

**カテゴリー:** ベストプラクティス

## 説明
むき出しの raise は決して使用せず、常に特定の例外を使用してください。特定の例外を使うことで、プログラム中のエラーを区別し、適切なエラー処理コードを用意することができます。

## 非準拠コードの例
```python
def myfunc():
  raise  # 特定の例外を使用する必要があります

if foo:
  raise
else:
  func1()
  raise

for v in list:
  do_something()
  raise
```

## 準拠コードの例
```python
def myfunc():
  raise MyException

try:
  foo()
except MyException:
  raise  # 例外を再発生させます
```