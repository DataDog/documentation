---
dependencies: []
disable_edit: true
title: 関数名とパラメーターには snake_case を使用する
---
## メタデータ
**ID:** `python-code-style/function-naming`

**言語:** Python

**重大度:** 通知

**カテゴリー:** Code Style

## 説明
関数が `snake_case` を使用するようにします。

このルールは tests ファイル (プレフィックスが `test_` またはサフィックスが `_test.py`) では無効です。なぜなら testing は `tearDown` や `setUp` などのキャメルケースのメソッドを必要とするからです。

#### 詳細はこちら

 - [Python ドキュメント Testing: `setUp()`](https://docs.python.org/3/library/unittest.html#unittest.TestCase.setUp)

## 非準拠コードの例
```python
def my_function(myParameter, otherParameter):
  pass
```

```python
def myFunction(arg1, arg2):
  pass

def myOtherFunction():
  pass
```

## 準拠コードの例
```python
# 多くのテストフレームワークで使用される名前。警告を出さないこと
def tearDown(self):
    """各テストケースの後で、ダミーのトレーサーをリセットして削除"""
    super(TracerTestCase, self).tearDown()
```

```python
class TestModel(unittest.TestCase):
    def setUp(self):  # ファイル model_test.py で使用され、setUp と tearDown のルールをスキップします
        pass

    def tearDown(self):  # ファイル model_test.py で使用され、setUp と tearDown のルールをスキップします
        pass

    def test_violation_category(self):
        self.assertEqual(ViolationCategory.BEST_PRACTICE.value, 1)
        self.assertEqual(ViolationCategory.DESIGN.value, 2)
        v1 = Violation("bla", 1, "description", 2, ViolationCategory.BEST_PRACTICE, 10, "notool")
        self.assertEqual(v1.get_category_string(), "Best Practices")
        v1 = Violation("bla", 1, "description", 2, 1, 10, "notool")
        self.assertEqual(v1.get_category_string(), "Unknown")
```