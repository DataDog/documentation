---
dependencies: []
disable_edit: true
title: TODO と FIXME コメントは所有権を持たなければならない
---
## メタデータ
**ID:** `python-best-practices/comment-fixme-todo-ownership`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
`TODO` や `FIXME` を使用する場合は、誰がその注釈を書いたのかを指定してください。これは、誰が注釈を作成したかを思い出させ、この問題に関する潜在的な文脈や情報を持つためのベストプラクティスです。

## 非準拠コードの例
```python
# TODO この関数を修正します
def my_function():
    pass

# FIXME この関数を修正します
def my_function():
    pass
```

## 準拠コードの例
```python
# TODO(bob) この関数を修正
def my_function():
    pass

# FIXME(julien) この関数を修正
def my_other_function():
    pass

# FIXME[julien] この関数を修正
def my_other_function():
    pass

# TODO[bob] この関数を修正
def my_function():
    pass
```