---
dependencies: []
disable_edit: true
title: パスステートメントを持つ例外を無視しない
---
## メタデータ
**ID:** `python-best-practices/no-silent-exception`

**言語:** Python

**重大度:** エラー

**カテゴリー:** ベストプラクティス

## 説明
例外ブロックで `pass` 文を使用すると、例外が無視されます。例外は決して無視されるべきではありません。代わりに、ユーザーはコードを追加し、発生した例外を通知して、例外処理または例外からの復帰を試みる必要があります。

## 非準拠コードの例
```python
a = 2
b = 0
try:
  c = a /b
except Exception as e:
  pass  # 通常のステートメントを使用すべきで、例外を無視すべきではありません
```

## 準拠コードの例
```python
a = 2
b = 0
try:
  c = a /b
except ValueError as e:
  print(e)
  pass
```