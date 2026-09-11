---
dependencies: []
disable_edit: true
title: finally ブロック内で break や continue を使用しない
---
## メタデータ
**ID:** `python-best-practices/finally-no-break-continue-return`

**言語:** Python

**重大度:** 警告

**カテゴリー:** ベストプラクティス

## 説明
`finally` ブロックの中で `return`、`break`、`continue` を使用すると、`try`、`else`、`except` ブロックでスローされた例外の伝播が停止し、return ステートメントは無視されます。

#### 詳細はこちら

 - [Python 公式ドキュメント](https://docs.python.org/3/reference/compound_stmts.html#except)

## 非準拠コードの例
```python
try:
    client_obj.get_url(url)
except (URLError, ValueError):
    client_obj.remove_url(url)
except SocketTimeout:
    client_obj.handle_url_timeout(url)
finally:
    break  # finally ブロックの break を避けます
```

```python
try:
    client_obj.get_url(url)
except (URLError, ValueError):
    client_obj.remove_url(url)
except SocketTimeout:
    client_obj.handle_url_timeout(url)
finally:
    return 0  # finally ブロックの return を避けます
```

```python
try:
    client_obj.get_url(url)
except (URLError, ValueError):
    client_obj.remove_url(url)
except SocketTimeout:
    client_obj.handle_url_timeout(url)
finally:
    continue  # finally ブロックの continue を避けます
```

## 準拠コードの例
```python
try:
  client_obj.get_url(url)
except (URLError, ValueError):
  client_obj.remove_url(url)
except SocketTimeout:
  client_obj.handle_url_timeout(url)
finally:
  print("cleanup the mess")
```