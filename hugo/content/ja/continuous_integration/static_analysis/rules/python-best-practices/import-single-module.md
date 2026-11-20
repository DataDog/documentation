---
dependencies: []
disable_edit: true
title: インポートするモジュールは、1 つのインポートステートメントにつき 1 つだけ
---
## メタデータ
**ID:** `python-best-practices/import-single-module`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
`import` キーワードを使用したインポートは別行で行ってください。

## 非準拠コードの例
```python
import os, sys  # import ステートメントを使用する場合は、一度に 1 つのモジュールをインポートします
```

## 準拠コードの例
```python
from collections.abc import Mapping, Sequence
import os
import sys
from typing import Any, NewType
```