---
dependencies: []
disable_edit: true
title: assertRaises は特定の例外をチェックしなければならない
---
## メタデータ
**ID:** `python-best-practices/assertraises-specific-exception`

**言語:** Python

**重大度:** 警告

**カテゴリー:** エラーを起こしやすい

## 説明
例外をチェックするときは、特定の例外をチェックしてください。`Exception` のチェックは、プログラムの正しい動作の検証をバイパスする可能性があります。

一般的な例外を使うとエラーが起こりやすく、正しいという誤った認識を与えてしまいます。その代わりに、正しい例外を使ってチェックしてください。

## 非準拠コードの例
```python
self.assertRaises(Exception, foo)  # 一般的な例外ではなく、特定の例外をチェックします
```

## 準拠コードの例
```python
self.assertRaises(ValueError, foo)
```