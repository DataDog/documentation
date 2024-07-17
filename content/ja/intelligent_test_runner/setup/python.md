---
aliases:
- /ja/continuous_integration/intelligent_test_runner/python/
- /ja/continuous_integration/intelligent_test_runner/setup/python/
code_lang: python
code_lang_weight: 30
further_reading:
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
kind: ドキュメント
title: Python のための Intelligent Test Runner
type: multi-code-lang
---

## 互換性

Intelligent Test Runner は、以下のバージョンとテストフレームワークでのみサポートされています。

* `pytest>=7.2.0`
  * `ddtrace>=2.1.0``ddtrace>=1.18.0` 以降。
  * `Python>=3.7` 以降。
  * `coverage>=5.5` が必要です。
  * Incompatible with `pytest-cov` (see [known limitations](#known-limitations))
* `unittest`
  * `ddtrace>=2.2.0` 以降。
  * `Python>=3.7` 以降。
* `coverage`
  * Incompatible for coverage collection (see [known limitations](#known-limitations))

## Setup

### Test Visibility

Intelligent Test Runner をセットアップする前に、[Test Visibility for Python][1] をセットアップしてください。Agent を通してデータを報告する場合は、v6.40 以降または v7.40 以降を使用してください。

{{% ci-itr-activation-instructions %}}

### Required dependencies

The Intelligent Test Runner requires the [`coverage` package][2].

Install the package in your CI test environment by specifying it in the relevant requirements file, for example, or using `pip`:

{{< code-block lang="shell" >}}
pip install coverage
{{< /code-block >}}

See [known limitations](#known-limitations) if you are already using the `coverage` package or a plugin like `pytest-cov`.

## Intelligent Test Runner を有効にしたテストの実行

The Intelligent Test Runner is enabled when you run tests with the Datadog integration active. Run your tests with the following command:

{{< tabs >}}

{{% tab "Pytest" %}}

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app pytest --ddtrace
{{< /code-block >}}

{{% /tab %}}

{{% tab "Unittest" %}}

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app ddtrace-run python -m unittest
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

### Temporarily disabling the Intelligent Test Runner

The Intelligent Test Runner can be disabled locally by setting the `DD_CIVISIBILITY_ITR_ENABLED` environment variable to `false` or `0`.

`DD_CIVISIBILITY_ITR_ENABLED` (Optional)
: Enable the Intelligent Test Runner coverage and test skipping features<br />
**Default**: `(true)`

Run the following command to disable the Intelligent Test Runner:

{{< tabs >}}

{{% tab "Pytest" %}}

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app DD_CIVISIBILITY_ITR_ENABLED=false pytest --ddtrace
{{< /code-block >}}

{{% /tab %}}

{{% tab "Unittest" %}}

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app DD_CIVISIBILITY_ITR_ENABLED=false ddtrace-run python -m unittest
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

## 特定のテストに対するスキップの無効化

Intelligent Test Runner の動作をオーバーライドして、特定のテストがスキップされないようにすることができます。これらのテストは、スキップできないテストと呼ばれます。

### テストをスキップできないようにする理由は？

Intelligent Test Runner は、テストをスキップすべきかどうかを判断するために、コードカバレッジデータを使用します。場合によっては、このデータだけでは判断できないこともあります。

例:

* テキストファイルからデータを読み込むテスト
* テスト対象のコード以外の API とやりとりするテスト (リモートの REST API など)

テストをスキップ不可に指定すると、カバレッジデータに関係なく Intelligent Test Runner がテストを実行します。


{{< tabs >}}

{{% tab "Pytest" %}}

### 互換性

Unskippable tests are supported in the following versions:

* `pytest`
  * `ddtrace>=1.19.0` 以降。

### テストをスキップ不可にマークする

You can use [`pytest`][1]'s [`skipif` mark][2] to prevent the Intelligent Test Runner from skipping individual tests or modules. Specify the `condition` as `False`, and the `reason` as `"datadog_itr_unskippable"`.

#### 個々のテスト

個々のテストは、`@pytest.mark.skipif` デコレータを使用して、以下のようにスキップ不可としてマークすることができます。
```python
import pytest

@pytest.mark.skipif(False, reason="datadog_itr_unskippable")
def test_function():
    assert True
```
#### モジュール

Modules can be skipped using the [`pytestmark` global variable][3] as follows:
```python
import pytest

pytestmark = pytest.mark.skipif(False, reason="datadog_itr_unskippable")

def test_function():
    assert True
```

**注**: これは他の `skip` マークや `condition` が `True` に評価される `skipif` マークをオーバーライドしません。

[1]: https://pytest.org/
[2]: https://docs.pytest.org/en/latest/reference/reference.html#pytest-mark-skipif-ref
[3]: https://docs.pytest.org/en/latest/reference/reference.html#globalvar-pytestmark

{{% /tab %}}

{{% tab "Unittest" %}}

### 互換性

Unskippable tests are supported in the following versions:

* `unittest`
  * `ddtrace>=2.2.0` 以降。

### `unittest` でテストをスキップ不可にマークする

You can use [`unittest`][1]'s [`skipif` mark][2] to prevent the Intelligent Test Runner from skipping individual tests. Specify the `condition` as `False`, and the `reason` as `"datadog_itr_unskippable"`.

#### 個々のテスト

個々のテストは、`@unittest.skipif` デコレータを使用して、以下のようにスキップ不可としてマークすることができます。
```python
import unittest

class MyTestCase(unittest.TestCase):
  @unittest.skipIf(False, reason="datadog_itr_unskippable")
  def test_function(self):
      assert True
```


`@unittest.skipif` を使用しても、他の `skip` マークや、`condition` が `True` に評価される `skipIf` マークはオーバーライドされません。

[1]: https://docs.python.org/3/library/unittest.html
[2]: https://docs.python.org/3/library/unittest.html#unittest.skipIf

{{% /tab %}}

{{< /tabs >}}

## 既知の制限

### Code coverage collection

#### Interaction with coverage tools

Coverage data may appear incomplete when the Intelligent Test Runner is enabled. Lines of code that would normally be covered by tests are not be covered when these tests are skipped.

#### Interaction with the coverage package

The Intelligent Test Runner uses the [`coverage`][2] package's API to collect code coverage. Data from `coverage run` or plugins like `pytest-cov` is incomplete as a result of `ddtrace`'s use of the `Coverage` class.

Some race conditions may cause exceptions when using `pytest` plugins such as `pytest-xdist` that change test execution order or introduce parallelization.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/tests/python
[2]: https://pypi.org/project/coverage/