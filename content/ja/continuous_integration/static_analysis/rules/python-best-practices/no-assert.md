---
dependencies: []
disable_edit: true
title: 本番コードで assert を使用しない
---
## メタデータ
**ID:** `python-best-practices/no-assert`

**言語:** Python

**重大度:** エラー

**カテゴリー:** ベストプラクティス

## 説明
コード中に `assert` ステートメントを記述することは避けてください。このルールは `_test.py` で終わるようなテストファイルには適用されません。

## 非準拠コードの例
```python
def foo(bar):
  assert bar  # 本番コードではアサートなし
```

## 準拠コードの例
```python
ctx1.set_baggage_item("test", 3)
ctx2 = SpanContext()
# テストファイル内のアサートはエラーを発生させない
assert "test" not in ctx2._baggage
```

```python
def foo(bar):
  assert bar  # テストコードではアサート OK (ファイル名参照)
```

```python
def foo(bar):
  assert bar  # テストコードではアサート OK
```