---
dependencies: []
disable_edit: true
title: os.environ に代入しても環境はクリアされない
---
## メタデータ
**ID:** `python-best-practices/os-environ-no-assign`

**言語:** Python

**重大度:** エラー

**カテゴリー:** エラーを起こしやすい

## 説明
`os.environ` に代入しても環境はクリアされません。環境をクリアするには、`os.environ.clear()` を使用します。

## 非準拠コードの例
```python
import os

os.environ = {}  # os.environ.clear を使用します
```

## 準拠コードの例
```python
import os

os.environ.clear()

```