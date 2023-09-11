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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/tests/python
