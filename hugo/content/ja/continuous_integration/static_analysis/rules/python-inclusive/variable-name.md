---
dependencies: []
disable_edit: true
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
# 禁止された名前、許可リストを提案します
whitelist = "foo"
names_whitelist = "bla";

names_blacklist = "bla";

addr_master_ip = "5.4.3.8";
addr_slave_ip = "1.2.3.4";
```

## 準拠コードの例
```python
# 名前に問題なし
snow_white = "happy"
```