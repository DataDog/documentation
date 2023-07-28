---
dependencies: []
disable_edit: true
kind: documentation
title: 表現に問題がないか変数名をチェックする
---
## メタデータ
**ID:** `python-inclusive/variable-name`

**言語:** Python

**重大度:** Notice

**カテゴリー:** Code Style

## 説明
変数名をチェックして、より良い名前を提案してください。

代替案の例:

-   `blacklist` を `denylist` に
-   `whitelist` を `allowlist` に
-   `master` を `primary` に
-   `slave` を `secondary` に

## 非準拠コードの例
```python
# 禁止された名前、allowlist を提案します
whitelist = "foo"
```

## 準拠コードの例
```python
# 名前に問題なし
snow_white = "happy"
```