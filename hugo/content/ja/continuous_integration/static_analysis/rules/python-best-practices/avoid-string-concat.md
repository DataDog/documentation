---
dependencies: []
disable_edit: true
title: 文字列の連結を避ける
---
## メタデータ
**ID:** `python-best-practices/avoid-string-concat`

**言語:** Python

**重大度:** 警告

**カテゴリー:** パフォーマンス

## 説明
複数の文字列の連結は効率的ではなく、コードが読みにくく理解しにくくなります。

複数の文字列を連結する代わりに、f-文字列またはフォーマット文字列を使用します。

#### 詳細はこちら

 - [Python ドキュメント: `str.format()`](https://docs.python.org/3/library/stdtypes.html#str.format)
 - [Python ドキュメント - f-文字列](https://docs.python.org/3/reference/lexical_analysis.html#f-strings)

## 非準拠コードの例
```python
"my" + awesome + "string"
plop = "super" + "awesome" + "text"
```

## 準拠コードの例
```python
"my {0} string".format(awesome)
f"my {awesome} string"
plop = "superawesometext"

function(
    tags = (
    user_tags
    + s.get("tags", [])
    + [
        f"schedule_id:{s['_id']}",
        f"schedule_name:{s['schedule_name']}",
        f"git_ref:{schedule_git_ref}",
    ]
)
)
```