---
title: Installing the Datadog Agent to Collect Tests Data
kind: documentation
further_reading:
  - link: "/continuous_integration/setup_tests/containers/"
    tag: "Documentation"
    text: "Forwarding Environment Variables for Tests in Containers"
  - link: "/continuous_integration/setup_tests/"
    tag: "Next step"
    text: "Instrumenting tests in your language"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

To report test result to Datadog, you can do it through the [Datadog Agent][1] (recommended for on-premises installations).

For SaaS CI providers, Datadog recommends using the [Agentless mode][7] of the Test Instrumentation Libraries. This mode allows sending data without the need of running an ephemeral instance of the Agent as a service container on each build.

## Installing the Agent on each CI worker node

If you are running tests on an on-premises CI provider, install the Datadog Agent on each worker node by following the [Agent installation instructions][2].

If the CI provider is using a container-based executor, set the `DD_AGENT_HOST` environment variable on all builds (which defaults to `localhost`) to an endpoint that is accessible from within build containers, as `localhost` inside the build references the container itself and not the underlying worker node where the Datadog Agent is running.

If you are using a Kubernetes executor, Datadog recommends using the [Admission Controller][3], which automatically sets the `DD_AGENT_HOST` environment variable in the build pods to communicate with the local Datadog Agent.

### Using Docker Compose

Regardless of which CI provider you use, if tests are run using [Docker Compose][5], the Datadog Agent can be run as one service.

{{< site-region region="us" >}}
{{< code-block lang="yaml" filename="docker-compose.yml" >}}
version: '3'
services:
  datadog-agent:
    image: "gcr.io/datadoghq/agent:latest"
    environment:
      - DD_API_KEY
      - DD_INSIDE_CI=true
      - DD_HOSTNAME=none
    ports:
      - 8126/tcp

  tests:
    build: .
    environment:
      - DD_AGENT_HOST=datadog-agent
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="us3,us5,eu" >}}

Replace `<DD_SITE>` with the selected site: {{< region-param key="dd_site" code="true" >}}.

{{< code-block lang="yaml" filename="docker-compose.yml" >}}
version: '3'
services:
  datadog-agent:
    image: "gcr.io/datadoghq/agent:latest"
    environment:
      - DD_API_KEY
      - DD_INSIDE_CI=true
      - DD_HOSTNAME=none
      - DD_SITE=<DD_SITE>
    ports:
      - 8126/tcp

  tests:
    build: .
    environment:
      - DD_AGENT_HOST=datadog-agent
{{< /code-block >}}
{{< /site-region >}}

Alternatively, share the same network namespace between the Agent container and the tests container:

{{< site-region region="us" >}}
{{< code-block lang="yaml" filename="docker-compose.yml" >}}
version: '3'
services:
  datadog-agent:
    image: "gcr.io/datadoghq/agent:latest"
    environment:
      - DD_API_KEY
      - DD_INSIDE_CI=true
      - DD_HOSTNAME=none

  tests:
    build: .
    network_mode: "service:datadog-agent"
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="us3,us5,eu" >}}

Replace `<DD_SITE>` with the selected site: {{< region-param key="dd_site" code="true" >}}.

{{< code-block lang="yaml" filename="docker-compose.yml" >}}
version: '3'
services:
  datadog-agent:
    image: "gcr.io/datadoghq/agent:latest"
    environment:
      - DD_API_KEY
      - DD_INSIDE_CI=true
      - DD_HOSTNAME=none
      - DD_SITE=<DD_SITE>

  tests:
    build: .
    network_mode: "service:datadog-agent"
{{< /code-block >}}
{{< /site-region >}}

In this case, `DD_AGENT_HOST` is not required because it is `localhost` by default.

Then, run your tests by providing your [Datadog API key][4] in the `DD_API_KEY` environment variable:

{{< code-block lang="bash" >}}
DD_API_KEY=<YOUR_DD_API_KEY> docker-compose up \
  --build --abort-on-container-exit \
  tests
{{< /code-block >}}

**Note:** In this case, add all the required CI provider environment variables so build information can be attached to each test result, as described in [Tests in containers][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/agent/cluster_agent/admission_controller/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.docker.com/compose/
[6]: /continuous_integration/setup_tests/containers/
[7]: /agentless/
