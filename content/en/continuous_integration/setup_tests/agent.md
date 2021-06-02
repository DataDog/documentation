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

* Installing it as a long running process on each worker node.
* Running an ephemeral instance of it as a service container on each build.

## Installing the Agent on each CI worker node

If you are running tests on an on-premises CI provider, where test processes have network access to the underlying worker host, install the Datadog Agent on each worker node the [Agent installation instructions][2].

After installing it, add the following configuration in the Agent configuration file:

```yaml
apm_config:
  enabled: true
  apm_non_local_traffic: true
```

This allows the tracer to send test results to `localhost:8126`.

## Installing the Datadog Agent as a service container on each build

If your CI provider runs your tests in a container (such as on-prem CI providers using a Docker or Kubernetes executor, or a SaaS CI provider), run the Datadog Agent in a container as a build service.

To enable APM and disable the monitoring of the container, set the following environment variable on the Agent container:

```
DD_INSIDE_CI=true
DD_HOSTNAME=none
```

This allows the tracer to send test results to port `8126` of the Agent container.


### Running the Datadog Agent using Docker Compose

Regardless of which CI provider you use, if tests are run using Docker Compose, the Agent can be run as one service:

```yaml
# docker-compose.yml
version: '3'
services:
  datadog-agent:
    image: "datadog/agent:latest"
    environment:
      - DD_API_KEY
      - DD_HOSTNAME=none
      - DD_INSIDE_CI=true
    ports:
      - 8126/tcp

  tests:
    build: .
    environment:
      - DD_AGENT_HOST=datadog-agent
```

Alternatively, share the same network namespace between the Agent container and the tests container:

```yaml
# docker-compose.yml
version: '3'
services:
  datadog-agent:
    image: "datadog/agent:latest"
    environment:
      - DD_API_KEY
      - DD_HOSTNAME=none
      - DD_INSIDE_CI=true

  tests:
    build: .
    network_mode: "service:datadog-agent"
```

In this case, no `DD_AGENT_HOST` is required because it is `localhost` by default.

Then, run your tests by providing your [Datadog API key][3] in the `DD_API_KEY` environment variable:

```bash
DD_API_KEY=<MY_API_KEY> docker-compose up --build --abort-on-container-exit tests
```

**Note:** In this case, also pass along all the required CI provider environment variables so build information can be attached to each test result, as described in [Tests in containers][4].

## CI provider-specific instructions

The following sections provide CI provider-specific instructions to run and configure the Agent to report test information.

### Azure Pipelines

To run the Agent in Azure Pipelines, define the Agent container in the [`resources` section][5] and link it with the job declaring it as a [`service` container][6]:

```yaml
# azure-pipeline.yml
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
          DD_HOSTNAME: "none"
          DD_INSIDE_CI: "true"

jobs:	
  - job: test
    services:
      dd_agent: dd_agent
    steps:
      - script: make test
```

Add your [Datadog API key][3] to your [project environment variables][7] with the key `DD_API_KEY`.


### GitLab CI

To run the Agent in GitLab, define the Agent container under [`services`][8]:

```yaml
# .gitlab-ci.yml
variables:
  DD_AGENT_HOST: "datadog-agent"
  DD_HOSTNAME: "none"
  DD_INSIDE_CI: "true"
  DD_API_KEY: $DD_API_KEY

test:
  services:
    - name: datadog/agent:latest
  script:
    - make test
```

Add your [Datadog API key][3] to your [project environment variables][9] with the key `DD_API_KEY`.


### GitHub Actions

To run the Agent in GitHub Actions, define the Agent container under [`services`][10]:

```yaml
jobs:
  test:
    services:
      datadog-agent:
        image: datadog/agent:latest
        ports:
          - 8126:8126
        env:
          DD_API_KEY: ${{ secrets.DD_API_KEY }}
          DD_HOSTNAME: "none"
          DD_INSIDE_CI: "true"
    steps:
      - run: make test
```

Add your [Datadog API key][3] to your [project secrets][11] with the key `DD_API_KEY`.


### CircleCI

To run the Agent in CircleCI, launch the agent container before running tests by using the [datadog/agent CircleCI orb][12], and stop it after to ensure results are sent to Datadog.

For example:

```yaml
# .circleci/config.yml
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
```

Add your [Datadog API key][3] to your [project environment variables][13] with the key `DD_API_KEY`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://app.datadoghq.com/account/settings#api
[4]: /continuous_integration/setup_tests/containers/
[5]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/resources?view=azure-devops&tabs=schema
[6]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/service-containers?view=azure-devops&tabs=yaml
[7]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch
[8]: https://docs.gitlab.com/ee/ci/docker/using_docker_images.html#what-is-a-service
[9]: https://docs.gitlab.com/ee/ci/variables/README.html#custom-environment-variables
[10]: https://docs.github.com/en/actions/guides/about-service-containers
[11]: https://docs.github.com/en/actions/reference/encrypted-secrets
[12]: https://circleci.com/developer/orbs/orb/datadog/agent
[13]: https://circleci.com/docs/2.0/env-vars/
