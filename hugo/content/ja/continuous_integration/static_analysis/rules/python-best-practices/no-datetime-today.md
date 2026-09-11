---
dependencies: []
disable_edit: true
title: datetime.today() を使用しない
---
## メタデータ
**ID:** `python-best-practices/no-datetime-today`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
`datetime.today()` の使用は避け、代わりに `datetime.now()`を使用してください。[公式ドキュメント](https://docs.python.org/3/library/datetime.html#datetime.date.today)にあるように、この 2 つの呼び出しは等価であり、`now()` の使用は `today()` よりも明示的です。

`today()` を使うと、年/月/日しか返さないと思いがちですが、完全なタイムスタンプを返します。そのため、`now()` を使うことをお勧めします。

## 非準拠コードの例
```python
from datetime import datetime
print("foo")
bla = datetime.today()  # 代わりに datetime.now() を使用します
```

## 準拠コードの例
```python
from datetime import datetime
print("foo")
bla = datetime.now()
```