---
dependencies: []
disable_edit: true
title: 表現に問題がないか関数名をチェックする
---
## メタデータ
**ID:** `python-inclusive/function-definition`

**言語:** Python

**重大度:** 通知

**カテゴリー:** コードスタイル

## 説明
コードベースで使用されていない単語があることを確認し、適切であれば置き換えを提案します。

置き換え案の例:
 - `blacklist` を `denylist` に
 - `whitelist` を `allowlist` に
 - `master` を `primary` に
 - `slave` を `secondary` に

## 非準拠コードの例
```python
# 文字列の末尾にある blacklist
def foo_blacklist():
    pass
```

```python
# 大文字と小文字が混在している場合でも、blacklist という名前を使用しないでください
def BlaCKliSt_NaMeS():
    pass

def wHiTeLisT_NaMeS():
    pass
```

```python
# 関数名の先頭に blacklist
def blacklist_names():
    pass
```

```python
# 関数名とパラメーターの誤った識別子
def blacklist_names(master, slave):
    pass
```

## 準拠コードの例
```python
def foo_denylist():
    pass
```