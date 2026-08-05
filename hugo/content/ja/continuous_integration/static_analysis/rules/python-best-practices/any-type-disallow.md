---
dependencies: []
disable_edit: true
title: Any タイプを使用しない
---
## メタデータ
**ID:** `python-best-practices/any-type-disallow`

**言語:** Python

**重大度:** 警告

**カテゴリー:** エラーを起こしやすい

## 説明
`Any` タイプは慎重に使用してください。ほとんどの場合、 `Any` タイプが使用されるのは、使用されるタイプが何であるか正確にはわからないからです。値がどのタイプでもよいことを指定したい場合は、`Any` の代わりに `object` を使用してください。


#### 詳細はこちら

 - [Python ドキュメント: `Any` タイプ](https://docs.python.org/3/library/typing.html#the-any-type)

## 非準拠コードの例
```python
my_var: Any = 1
```

```python
def foo(x: Any):  # Any を使用せず、特定のタイプを使用します
   pass
```

## 準拠コードの例
```python
my_var: int = 1

def my_function(a: str) -> str:
    pass
```