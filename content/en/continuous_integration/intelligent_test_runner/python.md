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

Prior to setting up Intelligent Test Runner, set up [Test Visibility for Python][1]. If you are reporting data through the Agent, use v6.40+/v7.40+.

To enable Intelligent Test Runner, set the following environment variables:

`DD_APP_KEY` (Required)
: The [Datadog Application key][2] used to query the tests to be skipped.<br/>
**Default**: `(empty)`

After setting these environment variables, run your tests as you normally do:

{{< code-block lang="shell" >}}
DD_ENV=ci DD_SERVICE=my-python-app DD_CIVISIBILITY_AGENTLESS_ENABLED=true DD_API_KEY=$API_KEY DD_APP_KEY=$APP_KEY pytest --ddtrace
{{< /code-block >}}

#### UI activation
In addition to setting the environment variables, you or a user in your organization with "Intelligent Test Runner Activation" permissions must activate the Intelligent Test Runner on the [Test Service Settings][3] page.

{{< img src="continuous_integration/itr_overview.png" alt="Intelligent test runner enabled in test service settings in the CI section of Datadog.">}}

## Disabling the Intelligent Test Runner

The Intelligent Test Runner can be disabled at runtime, regardless of the settings applied in the UI activation section above, by setting the `DD_CIVISIBILITY_ITR_DISABLED` environment variable to `true`.

`DD_CIVISIBILITY_ITR_DISABLED` (Optional)
: Disables the Intelligent Test Runner from running.<br/>
**Default**: `false`

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/tests/python
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: https://app.datadoghq.com/ci/settings/test-service
