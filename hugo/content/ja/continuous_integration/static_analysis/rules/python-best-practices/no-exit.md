---
dependencies: []
disable_edit: true
title: exit() を使用しない
---
## メタデータ
**ID:** `python-best-practices/no-exit`

**言語:** Python

**重大度:** エラー

**カテゴリー:** ベストプラクティス

## 説明
`exit()` の代わりに `sys.exit()` を使ってください。exit は[ビルトイン](https://docs.python.org/3/library/constants.html#exit)で、主にコンソールで実行されます。`sys.exit()` は適切な戻り引数を持つプログラムに対して実行されます ([ドキュメント参照](https://docs.python.org/3/library/sys.html#sys.exit))。

#### 詳細はこちら
 - [`sys.exit()` の Python ドキュメント](https://docs.python.org/3/library/sys.html#sys.exit)

## 非準拠コードの例
```python
print("bla")
exit(0)  # 代わりに sys.exit() を使用します
```

## 準拠コードの例
```python
import sys
print("bla")
sys.exit(0)
```