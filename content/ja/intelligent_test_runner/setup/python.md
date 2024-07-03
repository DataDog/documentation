---
aliases:
- /ja/continuous_integration/intelligent_test_runner/python/
- /ja/continuous_integration/intelligent_test_runner/setup/python/
code_lang: python
code_lang_weight: 30
further_reading:
- link: /continuous_integration/tests
  tag: Documentation
  text: Explore Test Results and Performance
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Troubleshooting CI Visibility
kind: documentation
title: Intelligent Test Runner for Python
type: multi-code-lang
---

## Compatibility

Intelligent Test Runner is only supported in the following versions and testing frameworks:

* `pytest>=7.2.0`
  * From `ddtrace>=2.1.0`.
  * From `Python>=3.7`.
  * Requires `coverage>=5.5`.
  * Incompatible with `pytest-cov` (see [known limitations](#known-limitations))
* `unittest`
  * From `ddtrace>=2.2.0`.
  * From `Python>=3.7`.
* `coverage`
  * Incompatible for coverage collection (see [known limitations](#known-limitations))

## セットアップ

### Test Visibility

Prior to setting up Intelligent Test Runner, set up [Test Visibility for Python][1]. If you are reporting data through the Agent, use v6.40 and later or v7.40 and later.

{{% ci-itr-activation-instructions %}}

### Required dependencies

The Intelligent Test Runner requires the [`coverage` package][2].

Install the package in your CI test environment by specifying it in the relevant requirements file, for example, or using `pip`:

{{< code-block lang="shell" >}}
pip install coverage
{{< /code-block >}}

See [known limitations](#known-limitations) if you are already using the `coverage` package or a plugin like `pytest-cov`.

## Running tests with the Intelligent Test Runner enabled

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

## Disabling skipping for specific tests

You can override the Intelligent Test Runner's behavior and prevent specific tests from being skipped. These tests are referred to as unskippable tests.

### Why make tests unskippable?

The Intelligent Test Runner uses code coverage data to determine whether or not tests should be skipped. In some cases, this data may not be sufficient to make this determination.

Examples include:

* Tests that read data from text files
* Tests that interact with APIs outside of the code being tested (such as remote REST APIs)

Designating tests as unskippable ensures that the Intelligent Test Runner runs them regardless of coverage data.


{{< tabs >}}

{{% tab "Pytest" %}}

### Compatibility

Unskippable tests are supported in the following versions:

* `pytest`
  * From `ddtrace>=1.19.0`.

### Marking tests as unskippable

You can use [`pytest`][1]'s [`skipif` mark][2] to prevent the Intelligent Test Runner from skipping individual tests or modules. Specify the `condition` as `False`, and the `reason` as `"datadog_itr_unskippable"`.

#### Individual tests

Individual tests can be marked as unskippable using the `@pytest.mark.skipif` decorator as follows:
```python
import pytest

@pytest.mark.skipif(False, reason="datadog_itr_unskippable")
def test_function():
    assert True
```
#### Modules

Modules can be skipped using the [`pytestmark` global variable][3] as follows:
```python
import pytest

pytestmark = pytest.mark.skipif(False, reason="datadog_itr_unskippable")

def test_function():
    assert True
```

**Note**: This does not override any other `skip` marks, or `skipif` marks that have a `condition` evaluating to `True`.

[1]: https://pytest.org/
[2]: https://docs.pytest.org/en/latest/reference/reference.html#pytest-mark-skipif-ref
[3]: https://docs.pytest.org/en/latest/reference/reference.html#globalvar-pytestmark

{{% /tab %}}

{{% tab "Unittest" %}}

### Compatibility

Unskippable tests are supported in the following versions:

* `unittest`
  * From `ddtrace>=2.2.0`.

### Marking tests as unskippable in `unittest`

You can use [`unittest`][1]'s [`skipif` mark][2] to prevent the Intelligent Test Runner from skipping individual tests. Specify the `condition` as `False`, and the `reason` as `"datadog_itr_unskippable"`.

#### Individual tests

Individual tests can be marked as unskippable using the `@unittest.skipif` decorator as follows:
```python
import unittest

class MyTestCase(unittest.TestCase):
  @unittest.skipIf(False, reason="datadog_itr_unskippable")
  def test_function(self):
      assert True
```


Using `@unittest.skipif` does not override any other `skip` marks, or `skipIf` marks that have a `condition` evaluating to `True`.

[1]: https://docs.python.org/3/library/unittest.html
[2]: https://docs.python.org/3/library/unittest.html#unittest.skipIf

{{% /tab %}}

{{< /tabs >}}

## Known limitations

### Code coverage collection

#### Interaction with coverage tools

Coverage data may appear incomplete when the Intelligent Test Runner is enabled. Lines of code that would normally be covered by tests are not be covered when these tests are skipped.

#### Interaction with the coverage package

The Intelligent Test Runner uses the [`coverage`][2] package's API to collect code coverage. Data from `coverage run` or plugins like `pytest-cov` is incomplete as a result of `ddtrace`'s use of the `Coverage` class.

Some race conditions may cause exceptions when using `pytest` plugins such as `pytest-xdist` that change test execution order or introduce parallelization.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/tests/python
[2]: https://pypi.org/project/coverage/