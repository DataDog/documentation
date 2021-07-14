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

To report test results to Datadog, the [Datadog Agent][1] is required.

There are two ways to set up the Agent in a CI environment:

* Installing it as a long running process on each worker node (recommended for on-premises installations).
* Running an ephemeral instance of it as a service container on each build (recommended for SaaS CI providers).

## Installing the Agent on each CI worker node

If you are running tests on an on-premises CI provider, install the Datadog Agent on each worker node by following the [Agent installation instructions][2].

If the CI provider is using a container-based executor, you will need to set the `DD_AGENT_HOST` environment variable on all builds (which defaults to `localhost`) to an endpoint that is accessible from within build containers, as `localhost` inside the build will reference the container itself and not the underlying worker node where the Datadog Agent is running.

If you are using a Kubernetes executor, we recommend you use the [Datadog Admission Controller][3] which will automatically set the `DD_AGENT_HOST` environment variable in the build pods to communicate with the local Datadog Agent.

## Installing the Datadog Agent as a service container on each build

If you are using a SaaS CI provider with no access to the underlying worker nodes, you can run the Datadog Agent in a container as a build service. You can also use this method with an on-premises CI provider that use a container-based executor if [installing the Datadog Agent on each worker node](#installing-the-agent-on-each-ci-worker-node) is not an option.

To run the Datadog Agent as container acting as a simple results forwarder, use the Docker image `datadog/agent:latest` and the following environment variables:

`DD_API_KEY` (Required)
: [Datadog API key][4] used to upload the test results.

`DD_INSIDE_CI=true`
: Disables the monitoring of the Datadog Agent container, as the underlying host is not accessible.

`DD_HOSTNAME=none`
: Disables the reporting of hostnames associated with tests, as the underlying host cannot be monitored.

### CI provider configuration examples

The following sections provide CI provider-specific instructions to run and configure the Agent to report test information.

{{< tabs >}}
{{% tab "Azure Pipelines" %}}

To run the Datadog Agent in Azure Pipelines, define a new container in the [`resources` section][1] and link it with the job declaring it as a [`service` container][2]:

{{< code-block lang="yaml" filename="azure-pipeline.yml" >}}
variables:
  ddApiKey: $(DD_API_KEY)

resources:
  containers:
    - container: dd_agent
      image: datadog/agent:latest
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

Add your [Datadog API key][3] to your [project environment variables][4] with the key `DD_API_KEY`.


[1]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/resources?view=azure-devops&tabs=schema
[2]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/service-containers?view=azure-devops&tabs=yaml
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch
{{% /tab %}}
{{% tab "GitLab CI" %}}

To run the Agent in GitLab, define the Agent container under [`services`][1]:

{{< code-block lang="yaml" filename=".gitlab-ci.yml" >}}
variables:
  DD_API_KEY: $DD_API_KEY
  DD_INSIDE_CI: "true"
  DD_HOSTNAME: "none"
  DD_AGENT_HOST: "datadog-agent"

test:
  services:
    - name: datadog/agent:latest
  script:
    - make test
{{< /code-block >}}

Add your [Datadog API key][2] to your [project environment variables][3] with the key `DD_API_KEY`.


[1]: https://docs.gitlab.com/ee/ci/docker/using_docker_images.html#what-is-a-service
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.gitlab.com/ee/ci/variables/README.html#custom-environment-variables
{{% /tab %}}
{{% tab "GitHub Actions" %}}

To run the Agent in GitHub Actions, define the Agent container under [`services`][1]:

{{< code-block lang="yaml" >}}
jobs:
  test:
    services:
      datadog-agent:
        image: datadog/agent:latest
        ports:
          - 8126:8126
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_INSIDE_CI: "true"
          DD_HOSTNAME: "none"
    steps:
      - run: make test
{{< /code-block >}}

Add your [Datadog API key][2] to your [project secrets][3] with the key `DD_API_KEY`.


[1]: https://docs.github.com/en/actions/guides/about-service-containers
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.github.com/en/actions/reference/encrypted-secrets
{{% /tab %}}
{{% tab "CircleCI" %}}

To run the Agent in CircleCI, launch the agent container before running tests by using the [datadog/agent CircleCI orb][1], and stop it after to ensure results are sent to Datadog.

For example:

{{< code-block lang="yaml" filename=".circleci/config.yml" >}}
version: 2.1

orbs:
  datadog-agent: datadog/agent@0.0.1

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

Add your [Datadog API key][2] to your [project environment variables][3] with the key `DD_API_KEY`.


[1]: https://circleci.com/developer/orbs/orb/datadog/agent
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://circleci.com/docs/2.0/env-vars/
{{% /tab %}}
{{< /tabs >}}

### Using Docker Compose

Regardless of which CI provider you use, if tests are run using [Docker Compose][5], the Datadog Agent can be run as one service:

{{< code-block lang="yaml" filename="docker-compose.yml" >}}
version: '3'
services:
  datadog-agent:
    image: "datadog/agent:latest"
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

Alternatively, share the same network namespace between the Agent container and the tests container:

{{< code-block lang="yaml" filename="docker-compose.yml" >}}
version: '3'
services:
  datadog-agent:
    image: "datadog/agent:latest"
    environment:
      - DD_API_KEY
      - DD_INSIDE_CI=true
      - DD_HOSTNAME=none

  tests:
    build: .
    network_mode: "service:datadog-agent"
{{< /code-block >}}

In this case, `DD_AGENT_HOST` is not required because it is `localhost` by default.

Then, run your tests by providing your [Datadog API key][4] in the `DD_API_KEY` environment variable:

{{< code-block lang="bash" >}}
DD_API_KEY=<MY_API_KEY> docker-compose up \
  --build --abort-on-container-exit \
  tests
{{< /code-block >}}

**Note:** In this case, also pass along all the required CI provider environment variables so build information can be attached to each test result, as described in [Tests in containers][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/agent/cluster_agent/admission_controller/
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://docs.docker.com/compose/
[6]: /continuous_integration/setup_tests/containers/
