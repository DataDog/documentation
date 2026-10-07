---
dependencies: []
disable_edit: true
title: 表現に問題がないかコメントをチェックする
---
## メタデータ
**ID:** `python-inclusive/comments`

**言語:** Python

**重大度:** 通知

**カテゴリー:** コードスタイル

## 説明
変数名をチェックして、より良い名前を提案してください。

置き換え案の例:

-   `blacklist` を `denylist` に
-   `whitelist` を `allowlist` に
-   `master` を `primary` に
-   `slave` を `secondary` に

## 非準拠コードの例
```python
# 不正使用を防ぐために名前をホワイトリストに登録します
def filter_names(names):
    pass

# 彼女はコードをチェックする必要があります 
def new_function_from_helen():
    pass


class Foo:
    # 彼はコードをチェックする必要があります 
    def new_function_from_joe():
        pass
```

## 準拠コードの例
```python
# 不正使用を防ぐ許可リスト名
def filter_names(names):
    pass

# コメントには問題の履歴がありません
def foo(bar):
    baz()
```