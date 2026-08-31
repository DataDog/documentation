---
dependencies: []
disable_edit: true
title: ベース例外を発生させない
---
## メタデータ
**ID:** `python-best-practices/no-base-exception`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
`Exception` や `BaseException` を発生させないでください。これらは汎用的すぎます。汎用的な例外を使うと、プログラムのエラーを区別するのが難しくなります。汎用的な例外を使うのではなく、 `ValueError` などの特定の例外を使うか、独自の例外を作成してください。

#### 詳細はこちら

 - [`raise Exception` の使用をやめる](https://jerrynsh.com/stop-using-exceptions-like-this-in-python/#2-stop-using-raise-exception)

## 非準拠コードの例
```python
if foo:
    raise Exception("bla")
elif bar:
    raise Exception
else:
    raise Exception
```

```python
def use_base_exception():
    raise Exception
    raise Exception("awesome")
```

```python
for v in list:
    raise BaseException
```

## 準拠コードの例
```python
if foo:
    print("bar")
else:
    raise ValueError
```