---
title: Python Tests
kind: documentation
aliases:
  - /continuous_integration/setup_tests/python
further_reading:
    - link: "/continuous_integration/tests/containers/"
      tag: "Documentation"
      text: "Forwarding Environment Variables for Tests in Containers"
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Compatibility

Supported Python interpreters:
* Python >= 2.7 and >= 3.5

Supported test frameworks:
* pytest >= 3.0.0
  * pytest < 5 when using Python 2

## Configuring reporting method

To report test results to Datadog, you need to configure the Datadog Python library:

{{< tabs >}}

{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}

{{% tab "Cloud CI provider (Agentless)" %}}

{{% ci-agentless %}}

{{% /tab %}}
{{< /tabs >}}

## Installing the Python tracer

Install the Python tracer by running:

{{< code-block lang="shell" >}}
pip install -U ddtrace
{{< /code-block >}}

For more information, see the [Python tracer installation documentation][4].

## Instrumenting your tests

To enable instrumentation of `pytest` tests, add the `--ddtrace` option when running `pytest`, specifying the name of the service or library under test in the `DD_SERVICE` environment variable, and the environment where tests are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable:

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace
{{< /code-block >}}

If you also want to enable the rest of the APM integrations to get more information in your flamegraph, add the `--ddtrace-patch-all` option:

{{< code-block lang="shell" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace --ddtrace-patch-all
{{< /code-block >}}

### Adding custom tags to tests

You can add custom tags to your tests by using the declaring `ddspan` as argument to your test:

```python
from ddtrace import tracer

# Declare `ddspan` as argument to your test
def test_simple_case(ddspan):
    # Set your tags
    ddspan.set_tag("test_owner", "my_team")
    # test continues normally
    # ...
```

To create filters or `group by` fields for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][5] section of the Python custom instrumentation documentation.

## Configuration settings

The following is a list of the most important configuration settings that can be used with the tracer, either in code or using environment variables:

`ddtrace.config.service`
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Default**: `pytest`<br/>
**Example**: `my-python-app`

`ddtrace.config.env`
: Name of the environment where tests are being run.<br/>
**Environment variable**: `DD_ENV`<br/>
**Default**: `none`<br/>
**Examples**: `local`, `ci`

The following environment variable can be used to configure the location of the Datadog Agent:

`DD_TRACE_AGENT_URL`
: Datadog Agent URL for trace collection in the form `http://hostname:port`.<br/>
**Default**: `http://localhost:8126`

All other [Datadog Tracer configuration][6] options can also be used.

{{% ci-git-metadata %}}

{{% ci-information-collected %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: https://docs.datadoghq.com/agent/cluster_agent/admission_controller/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /tracing/trace_collection/dd_libraries/python/
[5]: /tracing/trace_collection/custom_instrumentation/python?tab=locally#adding-tags
[6]: /tracing/trace_collection/library_config/python/?tab=containers#configuration
