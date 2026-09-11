---
dependencies: []
disable_edit: true
title: ネストされたブロックを増やしすぎない
---
## メタデータ
**ID:** `python-best-practices/nested-blocks`

**言語:** Python

**重大度:** エラー

**カテゴリー:** Code Style

## 説明
ループをネストしすぎないようにしてください。ループが多すぎると、コードがわかりにくくなります。コードを理解しやすい関数やコード単位にまとめるようにしてください。

#### 詳細はこちら

 - [コンピュータプログラミング wikibooks - ネストの最小化](https://en.wikibooks.org/wiki/Computer_Programming/Coding_Style/Minimize_nesting)


## 非準拠コードの例
```python
def func():
    for v in bla:
        if bar:
            if baz:
                if wiz:  # ネストされた要素が多すぎる
                    pass
```

```python
def func():
    if foo:
        pass
    else:
        if bar:
            if baz:
                if wiz:  # ネストされた要素が多すぎる
                    pass
```

```python
def func():
    if foo:
        if bar:
            if baz:
                if wiz:  # ネストされた要素が多すぎる
                    pass
```

```python
def func():
    if foo:
        pass
    elif bar:
        if bar:
            if baz:
                if wiz:  # ネストされた要素が多すぎる
                    pass
    else:
        pass
```

## 準拠コードの例
```python
while Foo:
    while Bar:
        print("foobar")
```