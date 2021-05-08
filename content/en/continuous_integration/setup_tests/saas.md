---
title: Tests in a SaaS CI
kind: documentation
further_reading:
    - link: "/ci/filename/"
      tag: "Documentation"
      text: "linktext"
---


To report test traces that run in SaaS-based CI providers, the Datadog Agent is required, configured with the following settings:

```
DD_INSIDE_CI=true
DD_HOSTNAME=none
```

Where:
* `DD_INSIDE_CI=true` disables reporting host-level infrastructure metrics, and enables APM listening in non-local traffic if no custom `datadog.yaml` configuration file is provided
(equivalent to `DD_APM_ENABLED=true` and `DD_APM_NON_LOCAL_TRAFFIC=true`).
* `DD_HOSTNAME=none` disables attaching host information to tests, and avoids APM per-host billing for test data.

**Note:** This is configuration is currently required for the beta version, and might change in the future.


## Running the agent using Docker Compose

Independently of the CI provider used, if tests are run using [Docker Compose][1], run the Agent as one service:

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

Then, run your tests by providing your [Datadog API key][2] in the `DD_API_KEY` environment variable:

```sh
DD_API_KEY=xxxx docker-compose up --build --abort-on-container-exit tests
```


## Provider-specific instructions

The following sections provide CI provider-specific instructions to run and configure the Datadog agent to report test information.


### Azure Pipelines

To run the Datadog Agent in [Azure Pipelines][3], define the Agent container under the [`resources` section][4] and link it with the job declaring it as a [`service` container][5]:

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

Then, add your [Datadog API key][2] to your [project environment variables][6] with the key `DD_API_KEY`.


### GitLab CI

To run the Datadog Agent in [GitLab.com][7], define the Agent container under [`services`][8]:

```yaml
# .gitlab-ci.yml
variables:
  DD_AGENT_HOST: "dd_agent"
  DD_HOSTNAME: "none"
  DD_INSIDE_CI: "true"
  DD_API_KEY: $DD_API_KEY

test:
  services:
    - name: datadog/agent:latest
      alias: dd_agent
  script:
    - make test
```

Then, add your [Datadog API key][2] to your [project environment variables][9] with the key `DD_API_KEY`.


### GitHub Actions

To run the Datadog Agent in [GitHub Actions][10], define the Agent container under [`services`][11]:

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

Then, add your [Datadog API key][2] to your [project secrets][12] with the key `DD_API_KEY`.


### CircleCI

To run the Datadog Agent in [CircleCI][13], launch the Agent container before running tests using the [datadog/agent][14] CircleCI orb, and stop it after to ensure results are flushed out to Datadog.

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

Then, add your [Datadog API key][2] to your [project environment variables][15] with the key `DD_API_KEY`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/compose/
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://azure.microsoft.com/en-us/services/devops/pipelines/
[4]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/resources?view=azure-devops&tabs=schema
[5]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/service-containers?view=azure-devops&tabs=yaml
[6]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch
[7]: https://gitlab.com/
[8]: https://docs.gitlab.com/ee/ci/docker/using_docker_images.html#what-is-a-service
[9]: https://docs.gitlab.com/ee/ci/variables/README.html#custom-environment-variables
[10]: https://docs.github.com/en/actions
[11]: https://docs.github.com/en/actions/guides/about-service-containers
[12]: https://docs.github.com/en/actions/reference/encrypted-secrets
[13]: https://circleci.com/
[14]: https://circleci.com/developer/orbs/orb/datadog/agent
[15]: https://circleci.com/docs/2.0/env-vars/
