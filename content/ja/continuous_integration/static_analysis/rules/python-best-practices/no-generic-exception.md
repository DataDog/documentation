---
dependencies: []
disable_edit: true
title: ジェネリック例外を使用しない
---
## メタデータ
**ID:** `python-best-practices/no-generic-exception`

**言語:** Python

**重大度:** 警告

**カテゴリー:** デザイン

## 説明
一般的な `Exception` ではなく、特定のエラーを発生させなければなりません。処理したい例外を正確に指定し、プログラムが発生させる可能性のある例外ごとに回復ハンドラーを用意してください。

#### 詳細はこちら

 - [`except Exception` の使用を避ける](https://jerrynsh.com/stop-using-exceptions-like-this-in-python/#3-avoid-using-except-exception)

## 非準拠コードの例
```python
a = 2
b = 0
try:
  c = a /b
except Exception as e:
  pass
```

## 準拠コードの例
```python
a = 2
b = 0
try:
  c = a /b
except ValueError as e:
  pass
```