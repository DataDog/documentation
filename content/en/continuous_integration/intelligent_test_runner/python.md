---
title: Intelligent Test Runner for Python
kind: documentation
further_reading:
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< callout header="false" url="#" btn_hidden="true" >}}Intelligent Test Runner for Python (using pytest) in beta.{{< /callout >}}

## Compatibility

Intelligent Test Runner is only supported in the following versions and testing frameworks:

* `pytest>=6.8.0`
  * From `ddtrace>=1.18.0`.
  * From `Python>=3.7`.
  * Requires `coverage>=5.5`.

## Setup

### Test Visibility setup
Prior to setting up Intelligent Test Runner, set up [Test Visibility for Python][1]. If you are reporting data through the Agent, use v6.40+/v7.40+.

{{% ci-itr-activation-instructions %}}

### Configuring the test runner environment

{{< tabs >}}

{{% tab "On-Premises CI Provider (Datadog Agent)" %}}
{{% ci-itr-agent %}}
{{% /tab %}}

{{% tab "Cloud CI Provider (Agentless)" %}}
{{% ci-itr-agentless %}}
{{% /tab %}}

{{< /tabs >}}

## Running tests with the Intelligent Test Runner enabled

### Environment variable
<div class="alert alert-info">Setting DD_CIVISIBILITY_ITR_ENABLED to true is required while the Intelligent Test Runner support for pytest is in beta. </div>

`DD_CIVISIBILITY_ITR_ENABLED` (Optional)
: Enable the Intelligent Test Runner coverage and test skipping features<br />
**Default**: `(false)`

After completing setup, run your tests as you normally do:

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app DD_CIVISIBILITY_ITR_ENABLED=true pytest --ddtrace
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/tests/python
