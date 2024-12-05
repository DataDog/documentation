---
dependencies: []
disable_edit: true
title: 到達不可能なコードを避ける
---
## メタデータ
**ID:** `python-best-practices/unreachable-code`

**言語:** Python

**重大度:** エラー

**カテゴリー:** ベストプラクティス

## 説明
到達不能コードを避けます。コーディングミスのために到達できないコードは、ビジネスロジックを修正してください。使用すべきでないコードは削除してください。


#### 詳細はこちら

 - [カーネギーメロン大学: 到達不能コードを避ける](https://wiki.sei.cmu.edu/confluence/display/android/Avoid+having+unreachable+code)

## 非準拠コードの例
```python
def foo():
  return 3
  foo()  # 到達不能コード
  pass  # 到達不能コード
```

## 準拠コードの例
```python
def foo():
    foo()
    pass
    return 3

```