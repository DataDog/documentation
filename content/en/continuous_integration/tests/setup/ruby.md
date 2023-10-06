---
title: Ruby Tests
kind: documentation
code_lang: ruby
type: multi-code-lang
code_lang_weight: 40
aliases:
  - /continuous_integration/setup_tests/ruby
  - /continuous_integration/tests/ruby
further_reading:
    - link: "/continuous_integration/tests/containers/"
      tag: "Documentation"
      text: "Forwarding Environment Variables for Tests in Containers"
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-info">Ruby test instrumentation is in beta.
</div>

## Compatibility

Supported Ruby interpreters:

* Ruby >= 2.1
* JRuby >= 9.2

Supported test frameworks:

* RSpec >= 3.0.0
* Minitest >= 5.0.0
* Cucumber >= 3.0

## Installing the Datadog Agent

To report test results to Datadog, you need to install the Datadog Agent.

### Using an on-premises CI provider

If you are running tests on an on-premises CI provider, such as Jenkins or self-managed GitLab CI, install the Datadog Agent on each worker node by following the [Agent installation instructions][1]. This is the recommended option as test results are then automatically linked to the underlying host metrics.

If you are using a Kubernetes executor, Datadog recommends using the [Datadog Admission Controller][2], which automatically sets the environment variables in the build pods to communicate with the local Datadog Agent.

If you are not using Kubernetes or can't use [Datadog Admission Controller][2] and the CI provider is using a container-based executor, set the `DD_TRACE_AGENT_URL` environment variable (which defaults to `http://localhost:8126`) in the build container running the tracer to an endpoint that is accessible from within that container. _Note that using `localhost` inside the build references the container itself and not the underlying worker node or any container where the Agent might be running_.

`DD_TRACE_AGENT_URL` includes the protocol and port (for example, `http://localhost:8126`) and takes precedence over `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`, and is the recommended configuration parameter to configure the Datadog Agent's URL for CI Visibility.

### Using a cloud CI provider

If you are using a cloud CI provider with no access to the underlying worker nodes, such as GitHub Actions or CircleCI, run the Datadog Agent in a container as a build service. This method is also available for an on-premises CI provider that uses a container-based executor if installing the Datadog Agent on each worker node is not an option.

To run the Datadog Agent as a container acting as a simple results forwarder, use the Docker image `gcr.io/datadoghq/agent:latest` and the following environment variables:

`DD_API_KEY` (Required)
: The [Datadog API key][3] used to upload the test results.<br/>
**Default**: (none)

`DD_INSIDE_CI` (Required)
: Disables the monitoring of the Datadog Agent container, as the underlying host is not accessible.<br/>
**Default**: `false`<br/>
**Required value**: `true`

`DD_HOSTNAME` (Required)
: Disables the reporting of hostnames associated with tests, as the underlying host cannot be monitored.<br/>
**Default**: (autodetected)<br/>
**Required value**: `none`

{{< site-region region="us3,us5,eu,ap1" >}}
Additionally, configure the Datadog site to use the selected one ({{< region-param key="dd_site_name" >}}):

`DD_SITE`
: The Datadog site to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}
{{< /site-region >}}

#### CI provider configuration examples

The following sections provide CI provider-specific instructions to run and configure the Agent to report test information.

{{< tabs >}}
{{% tab "Azure Pipelines" %}}

To run the Datadog Agent in Azure Pipelines, define a new container in the [resources section][1] and link it with the job declaring it as a [service container][2].

{{< site-region region="us" >}}
{{< code-block lang="yaml" filename="azure-pipeline.yml" >}}
variables:
  ddApiKey: $(DD_API_KEY)

resources:
  containers:
    - container: dd_agent
      image: gcr.io/datadoghq/agent:latest
      ports:
        - 8126:8126
      env:
        DD_API_KEY: $(ddApiKey)
        DD_INSIDE_CI: "true"
        DD_HOSTNAME: "none"

jobs:
  - job: test
    services:
      dd_agent: dd_agent
    steps:
      - script: make test
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="us3,us5,eu,ap1" >}}
Replace `<DD_SITE>` with the selected site: {{< region-param key="dd_site" code="true" >}}.

{{< code-block lang="yaml" filename="azure-pipeline.yml" >}}
variables:
  ddApiKey: $(DD_API_KEY)

resources:
  containers:
    - container: dd_agent
      image: gcr.io/datadoghq/agent:latest
      ports:
        - 8126:8126
      env:
        DD_API_KEY: $(ddApiKey)
        DD_INSIDE_CI: "true"
        DD_HOSTNAME: "none"
        DD_SITE: "<DD_SITE>"

jobs:
  - job: test
    services:
      dd_agent: dd_agent
    steps:
      - script: make test
{{< /code-block >}}
{{< /site-region >}}

Add your [Datadog API key][3] to your [project environment variables][4] with the key `DD_API_KEY`.

[1]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/resources?view=azure-devops&tabs=schema
[2]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/service-containers?view=azure-devops&tabs=yaml
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch
{{% /tab %}}
{{% tab "GitLab CI" %}}

To run the Agent in GitLab, define the Agent container under [services][1].

{{< site-region region="us" >}}
{{< code-block lang="yaml" filename=".gitlab-ci.yml" >}}
variables:
  DD_API_KEY: $DD_API_KEY
  DD_INSIDE_CI: "true"
  DD_HOSTNAME: "none"
  DD_AGENT_HOST: "datadog-agent"

test:
  services:
    - name: gcr.io/datadoghq/agent:latest
  script:
    - make test
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="us3,us5,eu,ap1" >}}

Replace `<DD_SITE>` with the selected site: {{< region-param key="dd_site" code="true" >}}.

{{< code-block lang="yaml" filename=".gitlab-ci.yml" >}}
variables:
  DD_API_KEY: $DD_API_KEY
  DD_INSIDE_CI: "true"
  DD_HOSTNAME: "none"
  DD_AGENT_HOST: "datadog-agent"
  DD_SITE: "<DD_SITE>"

test:
  services:
    - name: gcr.io/datadoghq/agent:latest
  script:
    - make test
{{< /code-block >}}
{{< /site-region >}}

Add your [Datadog API key][2] to your [project environment variables][3] with the key `DD_API_KEY`.

[1]: https://docs.gitlab.com/ee/ci/docker/using_docker_images.html#what-is-a-service
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.gitlab.com/ee/ci/variables/README.html#custom-environment-variables
{{% /tab %}}
{{% tab "GitHub Actions" %}}

To run the Agent in GitHub Actions, use the [Datadog Agent GitHub Action][1] `datadog/agent-github-action`.

{{< site-region region="us" >}}
{{< code-block lang="yaml" >}}
jobs:
  test:
    steps:
      - name: Start the Datadog Agent locally
        uses: datadog/agent-github-action@v1
        with:
          api_key: ${{ secrets.DD_API_KEY }}
      - run: make test
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="us3,us5,eu,ap1" >}}

Replace `<datadog_site>` with the selected site: {{< region-param key="dd_site" code="true" >}}.

{{< code-block lang="yaml" >}}
jobs:
  test:
    steps:
      - name: Start the Datadog Agent locally
        uses: datadog/agent-github-action@v1
        with:
          api_key: ${{ secrets.DD_API_KEY }}
          datadog_site: <datadog_site>
      - run: make test
{{< /code-block >}}
{{< /site-region >}}

Add your [Datadog API key][2] to your [project secrets][3] with the key `DD_API_KEY`.

[1]: https://github.com/marketplace/actions/datadog-agent
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.github.com/en/actions/reference/encrypted-secrets
{{% /tab %}}
{{% tab "CircleCI" %}}

To run the Agent in CircleCI, launch the Agent container before running tests by using the [datadog/agent CircleCI orb][1], and stop it after to ensure results are sent to Datadog.

{{< site-region region="us" >}}
{{< code-block lang="yaml" filename=".circleci/config.yml" >}}
version: 2.1

orbs:
  datadog-agent: datadog/agent@0

jobs:
  test:
    docker:
      - image: circleci/<language>:<version_tag>
    steps:
      - checkout
      - datadog-agent/setup
      - run: make test
      - datadog-agent/stop

workflows:
  test:
    jobs:
      - test
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="us3,us5,eu,ap1" >}}

Replace `<DD_SITE>` with the selected site: {{< region-param key="dd_site" code="true" >}}.

{{< code-block lang="yaml" filename=".circleci/config.yml" >}}
version: 2.1

orbs:
  datadog-agent: datadog/agent@0

jobs:
  test:
    docker:
      - image: circleci/<language>:<version_tag>
    environment:
      DD_SITE: "<DD_SITE>"
    steps:
      - checkout
      - datadog-agent/setup
      - run: make test
      - datadog-agent/stop

workflows:
  test:
    jobs:
      - test
{{< /code-block >}}
{{< /site-region >}}

Add your [Datadog API key][2] to your [project environment variables][3] with the key `DD_API_KEY`.

[1]: https://circleci.com/developer/orbs/orb/datadog/agent
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://circleci.com/docs/2.0/env-vars/
{{% /tab %}}
{{< /tabs >}}

## Installing the Ruby tracer

To install the Ruby tracer:

1. Add the `ddtrace` gem to your `Gemfile`:

    {{< code-block lang="ruby" filename="Gemfile" >}}
source 'https://rubygems.org'
gem 'ddtrace', "~> 1.0"
{{< /code-block >}}

2. Install the gem by running `bundle install`

See the [Ruby tracer installation docs][4] for more details.

## Instrumenting your tests

{{< tabs >}}
{{% tab "RSpec" %}}

The RSpec integration traces all executions of example groups and examples when using the `rspec` test framework.

To activate your integration, add this to the `spec_helper.rb` file:

```ruby
require 'rspec'
require 'datadog/ci'

Datadog.configure do |c|
  # Only activates test instrumentation on CI
  c.tracing.enabled = (ENV["DD_ENV"] == "ci")

  # Configures the tracer to ensure results delivery
  c.ci.enabled = true

  # The name of the service or library under test
  c.service = 'my-ruby-app'

  # Enables the RSpec instrumentation
  c.ci.instrument :rspec
end
```

Run your tests as you normally do, specifying the environment where tests are being run in the `DD_ENV` environment variable.

You could use the following environments:

* `local` when running tests on a developer workstation
* `ci` when running them on a CI provider

For example:

```bash
DD_ENV=ci bundle exec rake spec
```

{{% /tab %}}

{{% tab "Minitest" %}}

The Minitest integration traces all executions of tests when using the `minitest` framework.

To activate your integration, add this to the `test_helper.rb` file:

```ruby
require 'minitest'
require 'datadog/ci'

Datadog.configure do |c|
  # Only activates test instrumentation on CI
  c.tracing.enabled = (ENV["DD_ENV"] == "ci")

  # Configures the tracer to ensure results delivery
  c.ci.enabled = true

  # The name of the service or library under test
  c.service = 'my-ruby-app'

  c.ci.instrument :minitest
end
```

Run your tests as you normally do, specifying the environment where tests are being run in the `DD_ENV` environment variable.

You could use the following environments:

* `local` when running tests on a developer workstation
* `ci` when running them on a CI provider

For example:

```bash
DD_ENV=ci bundle exec rake test
```

{{% /tab %}}

{{% tab "Cucumber" %}}

The Cucumber integration traces executions of scenarios and steps when using the `cucumber` framework.

To activate your integration, add the following code to your application:

<!-- TODO: Explicitly setting `c.tracing.enabled` overrides any existing value, including the environment
variable `DD_TRACE_ENABLED`. This prevents production environments from being able to disable the tracer
using `DD_TRACE_ENABLED`.
This snippet should be adapted to work correctly with the production tracer configuration or
instruct clients to only include this code in a CI environment.
This affects all code snippets in this file.
-->
```ruby
require 'cucumber'
require 'datadog/ci'

Datadog.configure do |c|
  # Only activates test instrumentation on CI
  c.tracing.enabled = (ENV["DD_ENV"] == "ci")

  # Configures the tracer to ensure results delivery
  c.ci.enabled = true

  # The name of the service or library under test
  c.service = 'my-ruby-app'

  # Enables the Cucumber instrumentation
  c.ci.instrument :cucumber
end
```

Run your tests as you normally do, specifying the environment where tests are being run in the `DD_ENV` environment variable.
You could use the following environments:

* `local` when running tests on a developer workstation
* `ci` when running them on a CI provider

For example:

```bash
DD_ENV=ci bundle exec rake cucumber
```

{{% /tab %}}
{{< /tabs >}}

### Adding custom tags to tests

You can add custom tags to your tests by using the current active span:

```ruby
require 'ddtrace'

# inside your test
Datadog::Tracing.active_span&.set_tag('test_owner', 'my_team')
# test continues normally
# ...
```

To create filters or `group by` fields for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][5] section of the Ruby custom instrumentation documentation.

### Adding custom metrics to tests

Like tags, you can add custom metrics to your tests by using the current active span:

```ruby
require 'ddtrace'

# inside your test
Datadog::Tracing.active_span&.set_tag('memory_allocations', 16)
# test continues normally
# ...
```

For more information on custom metrics, see the [Add Custom Metrics Guide][7].

## Configuration settings

The following is a list of the most important configuration settings that can be used with the tracer, either in code by using a `Datadog.configure` block, or using environment variables:

`service`
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Default**: `$PROGRAM_NAME`<br/>
**Example**: `my-ruby-app`

`env`
: Name of the environment where tests are being run.<br/>
**Environment variable**: `DD_ENV`<br/>
**Default**: `none`<br/>
**Examples**: `local`, `ci`

The following environment variable can be used to configure the location of the Datadog Agent:

`DD_TRACE_AGENT_URL`
: Datadog Agent URL for trace collection in the form `http://hostname:port`.<br/>
**Default**: `http://localhost:8126`

All other [Datadog Tracer configuration][6] options can also be used.

## Collecting Git metadata

{{% ci-git-metadata %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /agent/
[2]: https://docs.datadoghq.com/agent/cluster_agent/admission_controller/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /tracing/trace_collection/dd_libraries/ruby/#installation
[5]: /tracing/trace_collection/custom_instrumentation/ruby?tab=locally#adding-tags
[6]: /tracing/trace_collection/library_config/ruby/?tab=containers#configuration
[7]: /continuous_integration/guides/add_custom_metrics/?tab=ruby
