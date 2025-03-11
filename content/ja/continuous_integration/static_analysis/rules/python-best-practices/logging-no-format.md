---
dependencies: []
disable_edit: true
title: ロギング関数でフォーマット文字列を使用しない
---
## メタデータ
**ID:** `python-best-practices/logging-no-format`

**言語:** Python

**重大度:** Notice

**カテゴリー:** ベストプラクティス

## 説明
情報をログに記録する際には、`format` メソッドでフォーマット文字列を使用しないようにしてください。

## 非準拠コードの例
```python
import logging
import shlex

logging.info("error {0}".format(plop))  # 代わりに logging.info("error %s", plop) を使用します
```

## 準拠コードの例
```python
import logging

logging.info("wfwef")
```