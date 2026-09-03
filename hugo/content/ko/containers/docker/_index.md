---
aliases:
- /ko/guides/basic_agent_usage/docker/
- /ko/agent/docker
- /ko/agent/basic_agent_usage/docker/
- /ko/integrations/docker_daemon/
- /ko/docker/
description: Docker 컨테이너 및 컨테이너 런타임을 위한 Datadog Agent 설치 및 구성
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: 릴리스 노트
  text: 최근에 출시된 Datadog Containers를 확인해보세요! (앱 로그인 필요).
- link: /agent/docker/log/
  tag: 설명서
  text: 애플리케이션 로그 수집
- link: /agent/docker/apm/
  tag: 설명서
  text: 애플리케이션 트레이스 수집
- link: /agent/docker/prometheus/
  tag: 설명서
  text: Prometheus 메트릭 수집
- link: /agent/docker/integrations/
  tag: 설명서
  text: 애플리케이션의 메트릭 및 로그 자동 수집
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
- link: /agent/docker/tag/
  tag: 설명서
  text: 컨테이너에서 내보내는 모든 데이터에 태그 할당
- link: https://learn.datadoghq.com/courses/agent-on-docker
  tag: 학습 센터
  text: Docker용 Agent
title: Docker, containerd 및 Podman을 위한 Docker Agent
---
## 개요 {#overview}

Datadog Docker Agent는 Docker, containerd 및 Podman 런타임을 지원하는 [Datadog Agent][1]의 버전입니다. 지원되는 Docker 버전은 [지원되는 플랫폼][2]을 참조하세요.

## Datadog Docker Agent 설치 {#install-the-datadog-docker-agent}
[Datadog의 인앱 설치 흐름][3]을 따르세요. 이것은 권장하는 방법으로, API 키, 필수 최소 구성 및 다양한 Datadog 기능을 위한 토글과 함께 `docker run` 명령을 생성하는 데 도움이 됩니다.

{{< img src="/agent/basic_agent_usage/agent_install_docker.png" alt="Docker에서 Datadog Agent에 대한 인앱 설치 단계입니다." style="width:90%;">}}

## Datadog Docker Agent 수동 실행 {#manually-run-the-datadog-docker-agent}

Fleet Automation 흐름은 Datadog의 권장 지침에 따라 Datadog Agent 컨테이너를 구성하는 데 도움을 줍니다. 이를 수동으로 구성하려면 아래의 예제를 참조하세요.

모니터링하려는 각 호스트에서 Agent를 Docker 컨테이너로 한 번 실행하려면 다음 명령을 사용하세요. `<DATADOG_API_KEY>`를 Datadog API 키로, `<DATADOG_SITE>`를 {{< region-param key=dd_site code="true" >}}로 바꿉니다.

{{< tabs >}}
{{% tab "Linux" %}}

```shell
docker run -d --cgroupns host --pid host --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e DD_SITE=<DATADOG_SITE> \
  -e DD_API_KEY=<DATADOG_API_KEY> \
  registry.datadoghq.com/agent:7
```
{{% /tab %}}
{{% tab "Windows" %}}
Datadog Agent는 Windows Server 2019(LTSC) 및 Windows Server 2022(LTSC)에서 지원됩니다. 다음 PowerShell 명령으로 Datadog Agent 컨테이너를 실행할 수 있습니다.

```powershell
docker run -d --name dd-agent `
  -v \\.\pipe\docker_engine:\\.\pipe\docker_engine `
  -e DD_SITE=<DATADOG_SITE> `
  -e DD_API_KEY=<DATADOG_API_KEY> `
  registry.datadoghq.com/agent:7
```
{{% /tab %}}
{{< /tabs >}}

**참고**: Docker Compose의 경우 [Compose 및 Datadog Agent][4]를 참조하세요. Podman에서 Agent를 배포하려면 [Podman 컨테이너 런타임과 함께 Docker 통합 사용][5]의 지침을 참조하세요.

## 통합 {#integrations}

Datadog Docker Agent가 실행 중이면 [Datadog 통합 구성][6]을 통해 애플리케이션 컨테이너에서 메트릭과 로그를 자동으로 수집할 수 있습니다. Datadog의 [Container Autodiscovery][7]를 사용하면 컨테이너화된 시스템의 동적 리소스에 대한 모니터링 구성을 정의할 수 있습니다.

## Datadog Docker Agent의 구성 옵션 {#configuration-options-for-the-datadog-docker-agent}

### 컨테이너 레지스트리 {#container-registries}

이미지는 64비트 x86 및 Arm v8 아키텍처에서 사용할 수 있습니다. Datadog은 Datadog Container Registry, Google Artifact Registry(GAR), Amazon ECR, Azure ACR, Docker Hub에 컨테이너 이미지를 게시합니다.

{{% container-images-table %}}

기본적으로 위의 지침은 Datadog Container Registry(`registry.datadoghq.com`)에서 이미지를 가져옵니다. 이 레지스트리를 사용하는 경우 방화벽이 `us-docker.pkg.dev/datadog-prod/public-images`로의 트래픽을 허용하는지 확인하세요. 레지스트리가 요청을 이 URL로 리디렉션할 수 있습니다.

<div class="alert alert-warning">Docker Hub에는 이미지 풀 속도 제한이 적용됩니다. Docker Hub 고객이 아니라면 Datadog은 다른 레지스트리에서 이미지를 가져오도록 구성을 업데이트할 것을 권장합니다. 관련 지침은 <a href="/agent/guide/changing_container_registry">컨테이너 레지스트리 변경</a>을 참조하세요.</div>

### 환경 변수 {#environment-variables}

비컨테이너화된 환경에서는 Datadog Agent의 구성 옵션이 [`datadog.yaml`][8]에 설정됩니다. Datadog Docker Agent의 경우 환경 변수를 통해 `datadog.yaml` 구성 옵션을 설정할 수 있습니다.

#### 전역 옵션 {#global-options}

`DD_API_KEY`
: Datadog API 키(**필수**).

`DD_ENV`
: 내보내는 모든 데이터에 대해 전역 `env` 태그를 설정합니다.

`DD_HOSTNAME`
: 메트릭에 사용할 호스트 이름(자동 감지에 실패할 경우).

`DD_HOSTNAME_FILE`
: 일부 환경에서는 호스트 이름의 자동 감지가 적절하지 않으며, 환경 변수를 사용하여 값을 설정할 수 없습니다. 이 경우, 호스트의 파일을 사용하여 적절한 값을 제공할 수 있습니다. `DD_HOSTNAME`이 비어 있지 않은 값으로 설정되면 이 옵션은 무시됩니다.

`DD_TAGS`
: 공백으로 구분된 호스트 태그. 예: `key1:value1 key2:value2`.

`DD_SITE`
: 메트릭, 트레이스 및 로그의 대상 사이트입니다. Datadog 사이트를 다음으로 설정: `{{< region-param key="dd_site" >}}`. Defaults to `datadoghq.com`.

`DD_DD_URL`
: 제출 메트릭에 대한 URL을 덮어쓰기 위한 추가적인 설정입니다.

`DD_URL` (6.36+/7.36+)
: `DD_DD_URL`의 별칭입니다. `DD_DD_URL`이 이미 설정되어 있으면 무시됩니다.

`DD_CHECK_RUNNERS`
: Agent는 기본적으로 모든 검사를 동시에 실행합니다(기본값 = `4`개 러너). 검사를 순차적으로 실행하려면 값을 `1`로 설정합니다. 많은 수의 검사(또는 느린 검사)를 실행해야 하는 경우, `collector-queue` 구성 요소가 지연되어 상태 검사에 실패할 수 있습니다. 이 경우 러너 수를 늘려 검사를 병렬로 실행할 수 있습니다.

`DD_APM_ENABLED`
: 트레이스 수집을 활성화합니다. 기본값은 `true`입니다. 추가적인 트레이스 수집 환경 변수에 대한 자세한 내용은 [Docker 애플리케이션 트레이스][9]를 참조하세요.

`DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION`
: 일부 환경에서는 호스트의 초기 로그에 올바른 태그가 포함되지 않을 수 있습니다. 로그의 새로운 호스트에서 태그가 누락된 경우, 이 환경 변수를 포함하고 `"10m"`로 설정하세요.

#### 프록시 설정 {#proxy-settings}

Agent v6.4.0(및 Trace Agent는 v6.5.0)부터 다음 환경 변수를 사용하여 Agent 프록시 설정을 재정의할 수 있습니다.

`DD_PROXY_HTTP`
: `http``http` 요청에 대해 프록시로 사용할 수 있는 HTTP URL.

`DD_PROXY_HTTPS`
: `https``https` 요청에 대해 프록시로 사용할 수 있는 HTTPS URL.

`DD_PROXY_NO_PROXY`
: 프록시를 사용하지 않으며 공백으로 구분된 URL 목록.

프록시 설정에 대한 자세한 내용은 [Agent v6 프록시 설명서][10]를 참조하세요.

#### 선택적 수집 Agent {#optional-collection-agents}

선택적 수집 Agent는 보안 또는 성능상의 이유로 기본적으로 비활성화되어 있습니다. 다음 환경 변수를 사용하여 활성화하세요.

`DD_APM_NON_LOCAL_TRAFFIC`
: [다른 컨테이너에서 추적][11]할 때 로컬이 아닌 트래픽을 허용합니다.

`DD_LOGS_ENABLED`
: Logs Agent를 사용하여 [로그 수집][12]을 활성화합니다.

`DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED`
: Process Agent를 사용하여 [실시간 프로세스 수집][13]을 활성화합니다. Docker 소켓을 사용할 수 있다면 [실시간 컨테이너 보기][14]가 기본적으로 활성화되어 있습니다.

#### DogStatsD(사용자 지정 메트릭) {#dogstatsd-custom-metrics}

[StatsD 프로토콜][15]을 사용해 사용자 지정 메트릭을 전송하세요.

`DD_DOGSTATSD_NON_LOCAL_TRAFFIC`
: 다른 컨테이너에서 DogStatsD 패킷을 수신합니다(사용자 지정 메트릭 전송에 필요).

`DD_HISTOGRAM_PERCENTILES`
: 계산할 히스토그램 백분위수(공백으로 구분)입니다. 기본값은 `0.95`입니다.

`DD_HISTOGRAM_AGGREGATES`
: 계산할 히스토그램 집계(공백으로 구분)입니다. 기본값은 `"max median avg count"`입니다.

`DD_DOGSTATSD_SOCKET`
: 수신할 유닉스 소켓의 경로입니다. `rw` 마운트된 볼륨 내 경로여야 합니다.

`DD_DOGSTATSD_ORIGIN_DETECTION`
: UNIX 소켓 메트릭에 대해 컨테이너 감지 및 태깅을 활성화합니다.

`DD_DOGSTATSD_TAGS`
: 이 DogStatsD 서버가 수신한 모든 메트릭, 이벤트 및 서비스 검사에 추가하기 위한 추가 태그입니다. 예: `"env:golden group:retrievers"`.

`DD_USE_DOGSTATSD`
: DogStatsD 라이브러리에서 사용자 지정 메트릭 전송을 활성화하거나 비활성화합니다.
[Unix 도메인 소켓을 통한 DogStatsD][16]에 대해 자세히 알아보세요.

#### 태깅 {#tagging}

Datadog은 태그를 할당할 때 [unified service tagging][17]을 사용하는 것이 좋습니다.

Datadog은 Docker, Kubernetes, ECS, Swarm, Mesos, Nomad 및 Rancher에서 일반적으로 사용되는 태그를 자동으로 수집합니다. 더 많은 태그를 추출하려면 다음 옵션을 사용하세요.

`DD_CONTAINER_LABELS_AS_TAGS`
: 컨테이너 레이블을 추출합니다. 이 환경 변수는 `DD_DOCKER_LABELS_AS_TAGS`와 동일합니다.

`DD_CONTAINER_ENV_AS_TAGS`
: 컨테이너 환경 변수를 추출합니다. 이 환경 변수는 `DD_DOCKER_ENV_AS_TAGS`와 동일합니다.

`DD_COLLECT_EC2_TAGS`
: AWS 통합을 사용하지 않고 사용자 지정 EC2 태그를 추출합니다.

[Docker 태그 추출][18] 설명서에서 자세한 내용을 확인하세요.

####  시크릿 파일 사용 {#using-secret-files}

통합 자격 증명은 Docker 또는 Kubernetes 시크릿에 저장되어 Autodiscovery 템플릿에서 사용할 수 있습니다. 자세한 내용은 [시크릿 관리 설명서][19]를 참조하세요.

####  컨테이너 무시 {#ignore-containers}

로그 수집, 메트릭 수집 및 Autodiscovery에서 컨테이너를 제외합니다. Datadog은 기본적으로 Kubernetes 및 OpenShift `pause` 컨테이너를 제외합니다. 이 허용 목록과 차단 목록은 Autodiscovery에만 적용되며, 트레이스 및 DogStatsD에는 영향을 미치지 않습니다. 이 환경 변수의 값은 정규 표현식을 지원합니다.

`DD_CONTAINER_INCLUDE`
: 포함할 컨테이너의 허용 목록(공백으로 구분). 모두 포함하려면 `.*`를 사용하세요. 예: `"image:image_name_1 image:image_name_2"`, `image:.*` OpenShift 환경 내에서 ImageStreams를 사용할 때는 이미지 대신 컨테이너 이름을 사용하세요. 예: `"name:container_name_1 name:container_name_2"`, `name:.*`

`DD_CONTAINER_EXCLUDE`
: 제외할 컨테이너의 차단 목록(공백으로 구분). 모두 제외하려면 `.*`를 사용하세요. 예: `"image:image_name_3 image:image_name_4"`, `image:.*` (**참고**: 이 변수는 Autodiscovery에만 적용됩니다.)

`DD_CONTAINER_INCLUDE_METRICS`
: 포함하려는 메트릭의 컨테이너 허용 목록.

`DD_CONTAINER_EXCLUDE_METRICS`
: 제외하려는 메트릭의 컨테이너 차단 목록.

`DD_CONTAINER_INCLUDE_LOGS`
: 포함하려는 로그의 컨테이너 허용 목록.

`DD_CONTAINER_EXCLUDE_LOGS`
: 제외하려는 로그의 컨테이너 차단 목록.

`DD_AC_INCLUDE`
: **지원 중단됨**. 포함할 컨테이너의 허용 목록(공백으로 구분). 모두 포함하려면 `.*`를 사용하세요. 예: `"image:image_name_1 image:image_name_2"`, `image:.*`

`DD_AC_EXCLUDE`
: **지원 중단됨**. 제외할 컨테이너의 차단 목록(공백으로 구분). 모두 제외하려면 `.*`를 사용하세요. 예: `"image:image_name_3 image:image_name_4"`, `image:.*` (**참고**: 이 변수는 Autodiscovery에만 적용됩니다.)

더 많은 예는 [컨테이너 탐지 관리][20] 페이지에서 확인할 수 있습니다.

**참고**: `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` 및 `.stopped.total` 메트릭은 이러한 설정의 영향을 받지 않습니다. 모든 컨테이너가 계속 집계됩니다. 이는 컨테이너 과금에도 영향을 주지 않습니다.

**참고**: containerd를 사용할 때, `DD_CONTAINERD_NAMESPACES` 및 `DD_CONTAINERD_EXCLUDE_NAMESPACES`를 사용하여 네임스페이스별로 컨테이너를 무시할 수 있습니다. 두 가지 모두 공백으로 구분된 네임스페이스 목록입니다. `DD_CONTAINERD_NAMESPACES`가 설정되면, Agent는 목록에 있는 네임스페이스에 속하는 컨테이너의 데이터를 보고합니다. `DD_CONTAINERD_EXCLUDE_NAMESPACES`가 설정되면, Agent는 목록에 있는 네임스페이스에 속하지 않는 모든 컨테이너의 데이터를 보고합니다.

#### Autodiscovery {#autodiscovery}

`DD_LISTENERS`
: 실행할 Autodiscovery 리스너입니다.

`DD_EXTRA_LISTENERS`
: 추가로 실행할 Autodiscovery 리스너입니다. 이들은 `datadog.yaml` 구성 파일의 `listeners` 섹션에 정의된 변수에 추가됩니다.

`DD_CONFIG_PROVIDERS`
: Agent트가 검사 구성 정보를 수집하기 위해 호출해야 하는 제공자들입니다. 기본 제공자는 `docker`입니다. Docker 제공자는 컨테이너 레이블에 내장된 템플릿을 처리합니다.

`DD_EXTRA_CONFIG_PROVIDERS`
: 사용할 추가 Autodiscovery 구성 제공자입니다. 이들은 `datadog.yaml` 구성 파일의 `config_providers` 섹션에 정의된 변수에 추가됩니다.

#### 기타 {#miscellaneous}

`DD_PROCESS_AGENT_CONTAINER_SOURCE`
: 컨테이너 소스 자동 감지를 무시하고 단일 소스를 강제로 설정합니다. 예: `"docker"`, `"ecs_fargate"`, `"kubelet"`. Agent v7.35.0부터는 일반적으로 필요하지 않습니다.

`DD_HEALTH_PORT`
: 포트 `5555`에서 Agent 상태 점검을 노출하려면 이를 `5555`로 설정하세요.

## 명령어 {#commands}

모든 Docker Agent 명령은 [Agent Commands 가이드][21]에서 확인하세요.

## 수집된 데이터 {#data-collected}

### Metrics {#metrics}

기본적으로 Docker Agent는 다음 핵심 검사를 통해 메트릭을 수집합니다. 기타 기술로부터 메트릭을 수집하려면 [통합](#integrations) 섹션을 참조하세요.

| 검사 | 메트릭 |
| ----------- | ------------- |
| 컨테이너   | [메트릭][22] |
| CPU         | [시스템][23]  |
| 디스크        | [디스크][24]    |
| Docker      | [Docker][25]  |
| File Handle | [시스템][23]  |
| IO          | [시스템][23]  |
| Load        | [시스템][23]  |
| 메모리      | [시스템][23]  |
| 네트워크     | [네트워크][26] |
| NTP         | [NTP][27]     |
| 가동 시간      | [시스템][23]  |

### 이벤트 {#events}

Docker Agent는 Agent가 시작되거나 재시작될 때 Datadog에 이벤트를 보냅니다.

###  서비스 검사 {#service-checks}

**datadog.agent.up** <br>
Agent가 Datadog에 연결할 수 없는 경우 `CRITICAL`을 반환하고, 그렇지 않으면 `OK`를 반환합니다.

**datadog.agent.check_status** <br>
Agent 검사가 Datadog에 Metrics를 보낼 수 없는 경우 `CRITICAL`을 반환하고, 그렇지 않으면 `OK`를 반환합니다.

## Single Step APM Instrumentation 제거 {#uninstall-single-step-apm-instrumentation}

Single Step APM Instrumentation으로 Datadog Docker Agent를 설치한 후 Agent를 제거하려면 [추가 명령을 실행][28]하여 APM Instrumentation을 제거해야 합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/
[2]: /ko/agent/supported_platforms/?tab=cloudandcontainers
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[4]: /ko/containers/guide/compose-and-the-datadog-agent/
[5]: /ko/containers/guide/podman-support-with-docker-integration/
[6]: /ko/containers/docker/integrations/
[7]: /ko/getting_started/containers/autodiscovery
[8]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /ko/containers/docker/apm/
[10]: /ko/agent/configuration/proxy/#agent-v6
[11]: /ko/containers/docker/apm/?tab=linux#tracing-from-other-containers
[12]: /ko/containers/docker/log/
[13]: /ko/infrastructure/process/
[14]: /ko/infrastructure/livecontainers/
[15]: /ko/extend/dogstatsd/
[16]: /ko/extend/dogstatsd/unix_socket/
[17]: /ko/getting_started/tagging/unified_service_tagging/?tab=docker
[18]: /ko/containers/docker/tag
[19]: /ko/agent/configuration/secrets-management/?tab=linux
[20]: /ko/containers/guide/container-discovery-management/?tab=containerizedagent
[21]: /ko/agent/configuration/agent-commands/
[22]: /ko/integrations/container/
[23]: /ko/integrations/system/#metrics
[24]: /ko/integrations/disk/#metrics
[25]: /ko/containers/docker/data_collected/#metrics
[26]: /ko/integrations/network/#metrics
[27]: /ko/integrations/ntp/#metrics
[28]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/docker/#remove-single-step-apm-instrumentation-from-your-agent