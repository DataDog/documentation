---
further_reading:
- link: /continuous_integration/setup_tests/containers/
  tag: 설명서
  text: 테스트용 환경 변수를 컨테이너로 전달하기
- link: /continuous_integration/setup_tests/
  tag: 다음 단계
  text: 사용하는 언어로 테스트 계측하기
kind: 설명서
title: 테스트 데이터 수집을 위해 Datadog Agent 설치하기
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택하신 사이트({{<region-param key="dd_site_name">}})에서 현재 CIVisibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

테스트 결과를 Datadog에 보고하려면 [Datadog Agent][1]가 필요합니다.

CI 환경에 Agent를 구성하는 방법은 두 가지가 있습니다.

* Agent를 장시간 실행 프로세스로 각 워커 노드에 설치합니다(온프레미스 설치에 권장).
* 각 빌드에서 서비스 컨테이너로서 Agent의 임시(Ephemeral) 인스턴스를 실행합니다(SaaS CI 공급자에 권장).

## CI의 각 워커 노드에 Agent를 설치하기

온프레미스 CI 공급자에서 테스트를 수행하는 경우 [Agent 설치 절차][2]에 따라 각 워커 노드에 Datadog Agent를 설치합니다.

CI 공급자가 컨테이너 기반의 실행기(executor)를 사용하는 경우는 빌드 내의 `localhost`가 Datadog Agent를 실행하는 기초 워커 노드가 아닌 컨테이너 자체를 참조합니다. 따라서 모든 빌드의(기본 설정은 `localhost`) `DD_AGENT_HOST` 환경 변수를 빌드 컨테이너에서 액세스 가능한 엔드포인트로 설정하세요.

쿠버네티스(Kubernetes) 실행기를 사용하는 경우는 [Admission Controller][3]를 사용하시길 권장합니다. 이를 통해 빌드 팟의 `DD_AGENT_HOST` 환경 변수가 자동으로 설정되어, 로컬 Datadog Agent와 통신할 수 있습니다.

## 각 빌드에 서비스 컨테이너로서 Datadog Agent 설치하기

기본 워커 노드에 접근할 수 없는 SaaS CI 공급자를 사용하는 경우, 컨테이너 내의 Datadog Agent를 빌드 서비스로 실행하세요. 이 메소드는 [각 워커 노드에 Datadog Agent 설치하기](#installing-the-agent-on-each-ci-worker-node) 옵션이 없는 경우에 컨테이너 기반 실행기를 사용하는 온프레미스 CI 공급자에서도 사용할 수 있습니다.

결과의 포워더(Forwarder)로만 기능하는 컨테이너로서 Datadog Agent를 실행하고 싶다면 도커(Docker) 이미지 `gcr.io/datadoghq/agent:latest`와 다음의 환경 변수를 사용하세요.

`DD_API_KEY` (필수)
: 테스트 결과를 업로드하는 데 사용되는 [Datadog API 키][4].<br/>
**기본 설정**: (none)

`DD_INSIDE_CI` (필수)
: 기본 호스트에 액세스할 수 없으므로 Datadog Agent 컨테이너의 모니터링을 비활성화합니다.<br/>
**기본 설정**: `false`<br/>
**필수값**: `true`

`DD_HOSTNAME` (필수)
: 기본 호스트를 모니터링할 수 없으므로 테스트와 관련된 호스트네임의 보고를 비활성화합니다.<br/>
**기본 설정**: (autodetected)<br/>
**필수 값**: `none`

{{< site-region region="us3,us5,eu" >}}
또, 선택 사항을 활용하려면 Datadog 사이트를 설정하세요 ({{< region-param key="dd_site_name" >}}):

`DD_SITE`
: 결과를 업로드할 Datadog 사이트입니다.<br/>
**기본 설정**: `datadoghq.com`<br/>
**선택한 사이트**: {{< region-param key="dd_site" code="true" >}}
{{< /site-region >}}

### CI 공급자 설정 예시

다음 섹션에서는 Agent를 실행하여 테스트 정보를 보고하도록 설정하기 위해 필요한 특정 CI 공급자의 구성 절차를 설명해드리겠습니다.

{{< tabs >}}
{{% tab "Azure Pipelines" %}}

Azure Pipelines에서 Datadog Agent를 실행하려면 [리소스 섹션][1]에서 새로운 컨테이너를 정의하고 이를 [서비스 컨테이너][2]로 선언한 작업과 연계합니다.

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
{{< site-region region="us3,us5,eu" >}}
`<DD_SITE>`를 선택한 사이트({{< region-param key="dd_site" code="true" >}})로 바꿉니다.

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

`DD_API_KEY` 키와 함께 [Datadog API 키][3]를 [프로젝트 환경 변수][4]에 추가하세요.

[1]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/resources?view=azure-devops&tabs=schema
[2]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/service-containers?view=azure-devops&tabs=yaml
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch
{{% /tab %}}
{{% tab "GitLab CI" %}}

Git Lab에서 Agent를 실행하려면 [서비스][1]에서 Agent 컨테이너를 정의하세요.

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
{{< site-region region="us3,us5,eu" >}}

`<DD_SITE>`를 선택한 사이트({{< region-param key="dd_site" code="true" >}})로 바꿉니다.

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

`DD_API_KEY` 키와 함께 [Datadog API 키][2]를 [프로젝트 환경 변수][3]에 추가하세요.

[1]: https://docs.gitlab.com/ee/ci/docker/using_docker_images.html#what-is-a-service
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.gitlab.com/ee/ci/variables/README.html#custom-environment-variables
{{% /tab %}}
{{% tab "GitHub Actions" %}}

Git Hub Actions에서 Agent를 실행하려면 [Datadog Agent GitHub Action][1] `datadog/agent-github-action`을 사용하세요.

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
{{< site-region region="us3,us5,eu" >}}

`<datadog_site>`를 선택한 사이트({{< region-param key="dd_site" code="true" >}})로 바꿉니다.

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

`DD_API_KEY` 키와 함께 [Datadog API 키][2]를 [프로젝트 시크릿][3]에 추가하세요.

[1]: https://github.com/marketplace/actions/datadog-agent
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.github.com/en/actions/reference/encrypted-secrets
{{% /tab %}}
{{% tab "CircleCI" %}}

CircleCI에서 Agent를 실행하려면 테스트를 실행하기 전에 [datadog/agent CircleCI orb][1]를 사용하여 Agent 컨테이너를 부팅하고, 결과가 Datadog로 전송되었는지 확인한 후 정지합니다.

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
{{< site-region region="us3,us5,eu" >}}

`<DD_SITE>`를 선택한 사이트({{< region-param key="dd_site" code="true" >}})로 바꿉니다.

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

`DD_API_KEY` 키와 함께 [Datadog API 키][2]를 [프로젝트 환경 변수][3]에 추가하세요.

[1]: https://circleci.com/developer/orbs/orb/datadog/agent
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://circleci.com/docs/2.0/env-vars/
{{% /tab %}}
{{< /tabs >}}

### Docker Compose 사용하기

어느 종류의 CI 공급자를 사용하든 [Docker Compose][5]를 활용해 테스트를 실행하는 경우, Datadog Agent는 하나의 서비스로 실행됩니다.

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

`<DD_SITE>`를 선택한 사이트({{< region-param key="dd_site" code="true" >}})로 바꿉니다.

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

대신, 동일한 네트워크 네임스페이스를 Agent 컨테이너와 테스트 컨테이너 사이에서 공유할 수도 있습니다.

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

`<DD_SITE>`를 선택한 사이트({{< region-param key="dd_site" code="true" >}})로 바꿉니다.

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

이 경우, `localhost`가 기본 설정되므로 `DD_AGENT_HOST`가 필요하지 않습니다.

다음으로 `DD_API_KEY` 환경 변수에 [Datadog API 키][4]를 입력해 테스트를 실행하세요.

{{< code-block lang="bash" >}}
DD_API_KEY=<YOUR_DD_API_KEY> docker-compose up \
  --build --abort-on-container-exit \
  tests
{{< /code-block >}}

**참조:** 이 경우 필요한 모든 CI 공급자의 환경 변수를 추가해야 합니다. 이렇게 하면 [컨테이너 테스트][6]에서 설명해드린 바와 같이, 각 테스트 결과에 빌드 정보가 추가됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/agent/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/kr/agent/cluster_agent/admission_controller/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.docker.com/compose/
[6]: /kr/continuous_integration/setup_tests/containers/