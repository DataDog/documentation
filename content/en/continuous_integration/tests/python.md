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

If you are running tests on an on-premises CI provider, such as Jenkins or self-managed GitLab CI, install the Datadog Agent on each worker node by following the [Agent installation instructions][1]. This is the recommended option as test results are then automatically linked to the underlying host metrics.

If you are using a Kubernetes executor, Datadog recommends using the [Datadog Admission Controller][2], which automatically sets the environment variables in the build pods to communicate with the local Datadog Agent.

If you are not using Kubernetes or can't use [Datadog Admission Controller][2] and the CI provider is using a container-based executor, set the `DD_TRACE_AGENT_URL` environment variable (which defaults to `http://localhost:8126`) in the build container running the tracer to an endpoint that is accessible from within that container. _Note that using `localhost` inside the build references the container itself and not the underlying worker node or any container where the Agent might be running_.

`DD_TRACE_AGENT_URL` includes the protocol and port (for example, `http://localhost:8126`) and takes precedence over `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`, and is the recommended configuration parameter to configure the Datadog Agent's URL for CI Visibility.

If you still have issues connecting to the Datadog Agent, use the [Agentless Mode](?tab=cloudciprovideragentless#configuring-reporting-method). **Note**: by using this method, there will be no correlation between tests and infrastructure metrics.

[1]: /agent/
[2]: https://docs.datadoghq.com/agent/cluster_agent/admission_controller/
{{% /tab %}}

{{% tab "Cloud CI provider (Agentless)" %}}

### Using a cloud CI provider

If you are using a cloud CI provider with no access to the underlying worker nodes, such as GitHub Actions or CircleCI, run the Datadog Agent in a container as a build service. This method is also available for an on-premises CI provider that uses a container-based executor if installing the Datadog Agent on each worker node is not an option.

To run the Datadog Agent as a container acting as a simple results forwarder, use the Docker image `gcr.io/datadoghq/agent:latest` and the following environment variables:

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Required)
: Enables or disables Agentless mode.<br/>
**Default**: `false`

`DD_API_KEY` (Required)
: The [Datadog API key][1] used to upload the test results.<br/>
**Default**: (none)

Additionally, configure the [Datadog site][2] to send data to:

`DD_SITE`
: The Datadog site to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site/
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

### Collecting Git metadata

Datadog uses Git information for visualizing your test results and grouping them by repository, branch, and commit. Git metadata is automatically collected by the test instrumentation from CI provider environment variables and the local `.git` folder in the project path, if available.

If you are running tests in non-supported CI providers or with no `.git` folder, you can set the Git information manually using environment variables. These environment variables take precedence over any auto-detected information. Set the following environment variables to provide Git information:

`DD_GIT_REPOSITORY_URL`
: URL of the repository where the code is stored. Both HTTP and SSH URLs are supported.<br/>
**Example**: `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: Git branch being tested. Leave empty if providing tag information instead.<br/>
**Example**: `develop`

`DD_GIT_TAG`
: Git tag being tested (if applicable). Leave empty if providing branch information instead.<br/>
**Example**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: Full commit hash.<br/>
**Example**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: Commit message.<br/>
**Example**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: Commit author name.<br/>
**Example**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: Commit author email.<br/>
**Example**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: Commit author date in ISO 8601 format.<br/>
**Example**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: Commit committer name.<br/>
**Example**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: Commit committer email.<br/>
**Example**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: Commit committer date in ISO 8601 format.<br/>
**Example**: `2021-03-12T16:00:28Z`

## Information collected

When CI Visibility is enabled, the following data is collected from your project:

* Test names and durations.
* Predefined environment variables set by CI providers.
* Git commit history including the hash, message, author information, and files changed (without file contents).
* Information from the CODEOWNERS file.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: https://docs.datadoghq.com/agent/cluster_agent/admission_controller/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /tracing/trace_collection/dd_libraries/python/
[5]: /tracing/trace_collection/custom_instrumentation/python?tab=locally#adding-tags
[6]: /tracing/trace_collection/library_config/python/?tab=containers#configuration
