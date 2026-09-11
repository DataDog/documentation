---
dependencies: []
disable_edit: true
title: ジェネリック例外を使用する場合は、最後にする
---
## メタデータ
**ID:** `python-best-practices/generic-exception-last`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
複数の例外をキャッチする場合、一般的な例外 `Exception` は最後にキャッチする必要があります。例外 `Exception` のキャッチは非常に汎用的で、特定の例外の前に置くと、すべての例外をキャッチし、特定の例外ハンドラーはキャッチされません。

このため、一般的な例外 `Exception` は、特定の例外ハンドラーがトリガー/実行されるように、最後に処理されなければなりません。

#### 詳細はこちら

- [エラーに関する Python チュートリアル](https://docs.python.org/3/tutorial/errors.html)

## 非準拠コードの例
```python
try:
    pass
except Exception:
    pass
except FileNotFound as e:
    pass
```

## 準拠コードの例
```python
try:
    pass
except MyError:
    pass
except Exception as e:
    pass
```

```python
try:
    pass
except MyError:
    pass
except FileNotFound as e:
    pass
```