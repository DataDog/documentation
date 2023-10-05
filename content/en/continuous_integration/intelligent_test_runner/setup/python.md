---
title: Intelligent Test Runner for Python
kind: documentation
code_lang: python
type: multi-code-lang
code_lang_weight: 30
aliases:
  - continuous_integration/intelligent_test_runner/python/
further_reading:
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
---

{{< callout header="false" url="#" btn_hidden="true" >}}Intelligent Test Runner for Python (using pytest) in beta.{{< /callout >}}

## Compatibility

Intelligent Test Runner is only supported in the following versions and testing frameworks:

* `pytest>=6.8.0`
  * From `ddtrace>=1.18.0`.
  * From `Python>=3.7`.
  * Requires `coverage>=5.5`.

## Setup

### Test Visibility 

Prior to setting up Intelligent Test Runner, set up [Test Visibility for Python][1]. If you are reporting data through the Agent, use v6.40 and later or v7.40 and later.

### Configure the test runner environment

{{< tabs >}}

{{% tab "On-Premises CI Provider (Datadog Agent)" %}}
{{% ci-itr-agent %}}
{{% /tab %}}

{{% tab "Cloud CI Provider (Agentless)" %}}
{{% ci-itr-agentless %}}
{{% /tab %}}

{{< /tabs >}}

{{% ci-itr-activation-instructions %}}

## Run tests with the Intelligent Test Runner enabled

<div class="alert alert-info">Setting <code>DD_CIVISIBILITY_ITR_ENABLED</code> to true is required while the Intelligent Test Runner support for pytest is in beta. </div>

To run tests on services with the Intelligent Test Runner enabled, set `DD_CIVISIBILITY_ITR_ENABLED` to true.

`DD_CIVISIBILITY_ITR_ENABLED` (Optional)
: Enable the Intelligent Test Runner coverage and test skipping features<br />
**Default**: `(false)`

After completing setup, run your tests as you normally do:

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app DD_CIVISIBILITY_ITR_ENABLED=true pytest --ddtrace
{{< /code-block >}}

## Disabling skipping for specific tests

You can override the Intelligent Test Runner's behavior and prevent specific tests from being skipped. These tests are referred to as unskippable tests.

### Why make tests unskippable?

The Intelligent Test Runner uses code coverage data to determine whether or not tests should be skipped. In some cases, this data may not be sufficient to make this determination.

Examples include:

* Tests that read data from text files
* Tests that interact with APIs outside of the code being tested (such as remote REST APIs)

Designating tests as unskippable ensures that the Intelligent Test Runner runs them regardless of coverage data.

### Compatibility

Unskippable tests are supported in the following versions and testing frameworks:

* `pytest`
  * From `ddtrace>=1.19.0`

### Marking tests as unskippable in `pytest`

You can use [`pytest`][2]'s [`skipif` mark][3] to prevent the Intelligent Test Runner from skipping individual tests or modules. Specify the `condition` as `False`, and the `reason` as `"datadog_itr_unskippable"`.

#### Individual tests

Individual tests can be marked as unskippable using the `@pytest.mark.skipif` decorator as follows:
```python
import pytest

@pytest.mark.skipif(False, reason="datadog_itr_unskippable")
def test_function():
    assert True
```
#### Modules

Modules can be skipped using the [`pytestmark` global variable][4] as follows:
```python
import pytest

pytestmark = pytest.mark.skipif(False, reason="datadog_itr_unskippable")

def test_function():
    assert True
```

**Note**: This does not override any other `skip` marks, or `skipif` marks that have a `condition` evaluating to `True`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/tests/python
[2]: https://pytest.org/
[3]: https://docs.pytest.org/en/latest/reference/reference.html#pytest-mark-skipif-ref
[4]: https://docs.pytest.org/en/latest/reference/reference.html#globalvar-pytestmark
