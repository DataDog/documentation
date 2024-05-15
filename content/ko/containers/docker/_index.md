---
aliases:
- /ko/guides/basic_agent_usage/docker/
- /ko/agent/docker
- /ko/agent/basic_agent_usage/docker/
- /ko/integrations/docker_daemon/
- /ko/docker/
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: 릴리스 노트
  text: 최근에 출시된 Datadog 컨테이너를 확인해보세요! (앱 로그인 필요).
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
  text: 애플리케이션 메트릭 및 로그 자동 수집
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
- link: /agent/docker/tag/
  tag: 설명서
  text: 컨테이너에서 내보내는 모든 데이터에 태그 할당
kind: 설명서
title: Docker, containerd, Podman용 Docker 에이전트
---

## 개요

Datadog Docker 에이전트는 호스트 [에이전트][1]의 컨테이너화된 버전입니다. Docker 에이전트는 Docker, containerd, Podman 런타임을 지원합니다. 공식 [Docker 이미지][2]는 Docker Hub, GCR 및  ECR-Public에서 사용할 수 있습니다.

<div class="alert alert-warning">Docker Hub는 이미지 풀 속도 제한에 영향을 받습니다. Datadog에서는 Docker Hub를 사용하지 않는 사용자의 경우 Datadog 에이전트와 클러스터 에이전트 구성을 GCR 또는 ECR에서 Datadog 에이전트에서 풀하여 업데이트할 것을 권장합니다. 자세한 설명은 <a href="/agent/guide/changing_container_registry">컨테이너 레지스트리 변경</a>을 참고하세요.</div>

이미지는 64비트 x86 및 Arm v8 아키텍처에서 사용할 수 있습니다.

| ECR-Public                                                           | GCR                                                             | Docker Hub                                             |
|----------------------------------------------------------------------|-----------------------------------------------------------------|--------------------------------------------------------|
| [에이전트 v6+][4]<br>`docker pull public.ecr.aws/datadog/agent`         | [에이전트 v6+][3]<br>`docker pull gcr.io/datadoghq/agent`          | [에이전트 v6+][2]<br>`docker pull datadog/agent`          |
| [에이전트 v5][7]<br>`docker pull public.ecr.aws/datadog/docker-dd-agent`| [에이전트 v5][6]<br>`docker pull gcr.io/datadoghq/docker-dd-agent` | [에이전트 v5][5]<br>`docker pull datadog/docker-dd-agent` |


CLI 명령은 Docker 런타임 명령입니다. containerd 런타임인 경우 `docker`를 `nerdctl`로 대체하고 Podman 런타임의 경우 `podman`으로 대체합니다.

## 설정

Docker 에이전트를 설치하지 않은 경우 [인앱 설치 지침][8]이나 아래의 안내를 따르세요. [지원되는 버전][9]을 보려면 에이전트 설명서를 참고하고 원스텝 설치 명령을 사용하세요. `<YOUR_DATADOG_API_KEY>`를 [Datadog API 키][10]로 대체하고, `<DATADOG_SITE>`를 {{< region-param key=dd_site code="true" >}}로 대체하세요.

{{< tabs >}}
{{% tab "Standard" %}}

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7
```

ECR-Public인 경우:

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7
```

**참고**: GCR 또는 ECR-Public 이외의 다른 레지스트리를 사용하는 경우, 이미지를 업데이트해야 합니다.

**참고**: 네트워크 모니터링, 보안 에이전트 및 oom_kill 검사 등 시스템-프로브에서 제공하는 일부 기능의 경우, `/etc/os-release` 파일을 `-v /etc/os-release:/host/etc/os-release:ro`. If your Linux distribution does not include an `/etc/os-release` file, mount the equivalent one provided, for example `/etc/redhat-release` or `/etc/fedora-release`와 연결해야 합니다.

{{% /tab %}}
{{% tab "Amazon Linux" %}}

Amazon Linux < v2인 경우: 

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7
```
ECR-Public인 경우:

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7
```

Amazon Linux v2인 경우:

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7
```
ECR-Public인 경우:

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7
```

{{% /tab %}}
{{% tab "Windows" %}}

Datadog 에이전트는 Windows 서버 2019(LTSC) 및 Windows 서버 2022(LTSC)에서 지원됩니다.

```shell
docker run -d --name dd-agent -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<API_KEY> -v \\.\pipe\docker_engine:\\.\pipe\docker_engine gcr.io/datadoghq/agent
```

ECR-Public인 경우:

```shell
docker run -d --name dd-agent -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<API_KEY> -v \\.\pipe\docker_engine:\\.\pipe\docker_engine public.ecr.aws/datadog/agent
```

{{% /tab %}}
{{% tab "Unprivileged" %}}

(선택 사항) 권한 없는 설치를 실행하려면, `--group-add=<DOCKER_GROUP_ID>`를 설치 명령에 추가합니다. 다음 예를 참고하세요.

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7 --group-add=<DOCKER_GROUP_ID>
```
ECR-Public인 경우:


```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7 --group-add=<DOCKER_GROUP_ID>
```

{{% /tab %}}
{{< /tabs >}}

**참고**: Docker Compose는 [Compose 및 Datadog 에이전트][11]를 참고하세요.

## 통합

에이전트가 실행되면 [Datadog 자동 탐지 기능][12]을 사용해 애플리케이션 컨테이너에서 자동으로 메트릭 및 로그를 수집하세요.


## 환경 변수

에이전트의 [주요 설정 파일][13]은 `datadog.yaml`입니다. Docker 에이전트인 경우 환경 변수와 함께 `datadog.yaml` 설정 옵션이 전달됩니다.

### 전역 옵션

| 환경 변수         | 설명                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Datadog API 키(**필수**).                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | 내보내기한 모든 데이터에 `env` 태그 전역 설정                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | 메트릭에 사용할 호스트 이름(자동으로 감지되지 않을 경우).                                                                                                                                                                                                                                                                                             |
| `DD_HOSTNAME_FILE`        | 일부 환경에서는 호스트 이름 자동 감지가 적절하지 않으며, 환경 변수로 값을 설정할 수 없습니다. 이 경우, 호스트의 파일을 사용하여 적절한 값을 제공할 수 있습니다. `DD_HOSTNAME`이 비어 있지 않으면 이 옵션은 무시됩니다.                                              |
| `DD_TAGS`            | 공백으로 구분된 호스트 태그(예: `key1:value1 key2:value2`)                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | 메트릭, 트레이스 및 로그의 대상 사이트입니다. Datadog 사이트를 `{{< region-param key="dd_site" >}}`으로 설정합니다. 기본값은 `datadoghq.com`입니다.                                                                                                                                                                                                |
| `DD_DD_URL`          | 제출 메트릭에 URL을 재정의할 수 있는 선택 사항 설정입니다.                                                                                                                                                                                                                                                                                      |
| `DD_URL`(6.36+/7.36+)            | `DD_DD_URL`의 별칭입니다. `DD_DD_URL`이(가) 이미 설정된 경우 무시합니다.                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS`   | 에이전트는 기본적으로 동시에 모든 검사를 실행합니다(기본값 = `4` 실행기). 순차적으로 검사를 실행하려면 값을 `1`로 설정합니다. 많은 검사(또는 느린 검사)를 실행하는 경우 `collector-queue` 구성 요소가 밀려서 상태 검사에 실패할 수 있습니다. 동시에 검사를 실행하려면 실행기 수를 늘립니다. |
| `DD_APM_ENABLED`             | 트레이스 수집을 활성화합니다. 기본값은 `true`입니다. 추가적인 트레이스 수집 환경 변수와 관련한 상세 내용은 [Docker 애플리케이션 추적][14]을 참고하세요.   |
| `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` | 일부 환경에서는 호스트의 초기 로그가 올바른 태그를 포함하지 않을 수 있습니다. 로그에서 새 호스트에 대한 태그가 누락된 경우, 해당 환경 변수를 포함시키고 `"10m"`로 설정합니다.|

### 프록시 설정

에이전트 v6.4.0(및 트레이스 에이전트 v6.5.0)으로 시작하여 에이전트 프록시 설정을 다음 환경 변수로 재정의할 수 있습니다.

| 환경 변수        | 설명                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | `http` 요청에 프록시로 사용할 수 있는 HTTP URL                |
| `DD_PROXY_HTTPS`    | `https` 요청에 프록시로 사용할 수 있는 HTTPS URL              |
| `DD_PROXY_NO_PROXY` | 프록시를 사용하지 않아야 하는, 공백으로 구분된 URL 목록 |

프록시 설정과 관련한 상세 자세한 정보는 [에이전트 v6 프록시 설명서][15]를 참고하세요.

### 에이전트 수집 선택 사항

에이전트 수집 선택 사항은 보안 및 성능 상의 이유로 기본적으로 비활성화되어 있습니다. 다음 환경 변수를 사용해 활성화할 수 있습니다.

| 환경 변수               | 설명                                                                                                                                                                                                                                                      |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_NON_LOCAL_TRAFFIC` | [다른 컨테이너에서 추적][16]할 때 로컬이 아닌 트래픽을 허용합니다.       |
| `DD_LOGS_ENABLED`          | 로그 에이전트를 통해 [로그 수집][17]을 활성화합니다.                                                                                                                                                                                                                  |
| `DD_PROCESS_AGENT_ENABLED` | 프로세스 에이전트를 통해 [실시간 프로세스 수집][18]을 활성화합니다. [실시간 컨테이너 보기][19]는 Docker 소켓을 사용할 수 있는 경우 기본적으로 활성화되어 있습니다. `false`로 설정하면 [실시간 프로세스 수집][18] 및 [실시간 컨테이너 보기][19]가 비활성화됩니다.  |

### DogStatsD(커스텀 메트릭)

[StatsD 프로토콜][20]을 사용하여 커스텀 메트릭 전송:

| 환경 변수                     | 설명                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | 다른 컨테이너에서 DogStatsD 패킷 수신(커스텀 메트릭 전송에 필요)                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | 계산을 위한 히스토그램 백분위수(공백으로 구분)입니다. 기본값은 `0.95`입니다.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | 히스토그램은 계산을 위해 집계됩니다(공백으로 구분). 기본값은 "max median avg count"입니다.                                                          |
| `DD_DOGSTATSD_SOCKET`            | 리스닝할 Unix 소켓 경로입니다. `rw`와 연결된 볼륨에 있어야 합니다.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Unix 소켓 메트릭을 위한 컨테이너 감지 및 태깅을 활성화합니다.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | 이 DogStatsD 서버가 수신한 모든 메트릭, 이벤트 및 서비스 점검에 추가하기 위한 추가 태그입니다(예: `"env:golden group:retrievers"`). |
| `DD_USE_DOGSTATSD`           | DogStatsD 라이브러리에서 커스텀 메트릭 전송을 활성화하거나 비활성화합니다.                                                                                                |
[Unix 도메인 소켓을 통한 DogStatsD][21]에 대해 자세히 알아보세요.

### 태그 설정

모범 사례는 태그를 할당할 때 [통합 서비스 태깅][22]을 사용하는 것입니다.

Datadog는 Docker, Kubernetes, ECS, Swarm, Mesos, Nomad, Rancher에서 공통 태그를 자동으로 수집합니다. 더 많은 태그를 추출하려면 다음 옵션을 사용하세요.

| 환경 변수                  | 설명                                                                                             |
|-------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS` | 컨테이너 라벨을 추출합니다. 이 환경은 기존 `DD_DOCKER_LABELS_AS_TAGS` 환경과 동일합니다.             |
| `DD_CONTAINER_ENV_AS_TAGS`    | 컨테이너 환경 변수를 추출합니다. 이 환경은 기존 `DD_DOCKER_ENV_AS_TAGS` 환경과 동일합니다. |
| `DD_COLLECT_EC2_TAGS`         | AWS 통합을 사용하지 않고 커스텀 EC2 태그를 추출합니다.                                              |

[Docker 태그 추출][23] 설명서를 참고해 자세히 알아보세요. 

### 비밀 파일 사용하기

통합 자격 증명은 Docker 또는 Kubernetes 비밀에 저장되어 자동 탐지 템플릿에서 사용됩니다. 자세한 정보는 [비밀 관리 설명서][24]를 참고하세요.

### 컨테이너 무시

로그 수집, 메트릭 수집 및 자동 탐지에서 컨테이너를 제외합니다. Datadog은 기본적으로 Kubernetes 및 OpenShift `pause` 컨테이너를 제외합니다. 이러한 허용 목록 및 차단 목록은 자동 탐지에만 적용되며, 트레이스 및 DogStatsD는 영향을 받지 않습니다. 이러한 환경 변수의 값은 정규식을 지원합니다.

| 환경 변수                   | 설명                                                                                                                                                                                                                                                                                                               |
|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_INCLUDE`         | 포함할 컨테이너의 허용 목록(공백으로 구분)입니다. 모두 포함하려면 `.*`을 사용하세요. 예: `"image:image_name_1 image:image_name_2"`, `image:.*` OpenShift 환경 내에서 ImageStream을 사용하는 경우, 이미지 대신 컨테이너 이름을 사용하세요(예: "name:container_name_1 name:container_name_2", name:.*). |
| `DD_CONTAINER_EXCLUDE`         | 제외할 컨테이너의 차단 목록(공백으로 구분)입니다. `.*`을 사용해 모두 제외합니다(예: `"image:image_name_3 image:image_name_4"`)(**참고**: 이 변수는 자동 탐지에만 적용됨.), `image:.*`                                                                                                        |
| `DD_CONTAINER_INCLUDE_METRICS` | 포함하려는 메트릭의 컨테이너 허용 목록입니다.                                                                                                                                                                                                                                                                |
| `DD_CONTAINER_EXCLUDE_METRICS` | 제외하려는 메트릭의 컨테이너 차단 목록입니다.                                                                                                                                                                                                                                                                |
| `DD_CONTAINER_INCLUDE_LOGS`    | 포함하려는 로그의 컨테이너 허용 목록입니다.                                                                                                                                                                                                                                                                   |
| `DD_CONTAINER_EXCLUDE_LOGS`    | 제외하려는 로그의 컨테이너 차단 목록입니다.                                                                                                                                                                                                                                                                   |
| `DD_AC_INCLUDE`                | **지원 중단** 포함하려는 컨테이너 허용 목록입니다(공백으로 구분). `.*`을 사용하여 모두 포함합니다(예: `"image:image_name_1 image:image_name_2"`, `image:.*`)                                                                                                                                                     |
| `DD_AC_EXCLUDE`                | **지원 중단** 제외하려는 컨테이너 차단 목록입니다(공백으로 구분). `.*`을 사용해 모두 제외합니다(예: `"image:image_name_3 image:image_name_4"`)(**참고**: 이 변수는 자동탐지에만 허용됩니다.), `image:.*`                                                                                        |

더 많은 예는 [컨테이너 탐지 관리][25] 페이지에서 확인할 수 있습니다.

**참고**: `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` 및 `.stopped.total` 메트릭은 이러한 설정의 영향을 받지 않습니다. 모든 컨테이너가 집계되며, 컨테이너별 빌링에 영향을 주지 않습니다.

**참고**: containerd를 사용할 때 `DD_CONTAINERD_NAMESPACES` 및 `DD_CONTAINERD_EXCLUDE_NAMESPACES`를 이용하여 네임스페이스에 따라 컨테이너를 무시할 수 있습니다. 둘 다 공백으로 구분된 네임스페이스 목록입니다. `DD_CONTAINERD_NAMESPACES`로 설정하면 에이전트에서는 목록에 있고 네임스페이스에 속한 컨테이너에 데이터를 보고합니다. `DD_CONTAINERD_EXCLUDE_NAMESPACES`로 설정하면 에이전트에서 목록에 있고 네임스페이스에 속한 컨테이너를 제외한 모든 컨테이너에 데이터를 보고합니다.

### 자동탐지

| 환경 변수                 | 설명                                                                                                                                                                           |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LISTENERS`               | 실행할 자동탐지 리스너                                                                                                                                                       |
| `DD_EXTRA_LISTENERS`         | 추가 실행할 자동탐지 리스너. `datadog.yaml` 구성 파일의 `listeners` 섹션에 정의된 변수에 추가로 더해집니다.                   |
| `DD_CONFIG_PROVIDERS`        | 점검 구성을 수집하기 위해 에이전트가 호출해야 하는 공급자. 기본 공급자는 `docker`입니다. Docker 공급자는 컨테이너 라벨에 포함된 템플릿을 처리합니다. |
| `DD_EXTRA_CONFIG_PROVIDERS`  | 추가 사용할 자동탐지 구성. `datadog.yaml` 구성 파일의 `config_providers` 섹션에 정의된 변수에 추가로 더해집니다. |

### 기타

| 환경 변수                        | 설명                                                                                                                                                     |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | 단일 소스 강제 적용을 위한 컨테이너 소스 자동탐지를 재정의합니다(예: `"docker"`, `"ecs_fargate"`, `"kubelet"`). 에이전트 v7.35.0 이후 버전부터는 필요하지 않습니다. |
| `DD_HEALTH_PORT`                    | `5555`로 설정해 포트 `5555`에서 에이전트 상태 점검을 표시합니다.                                                                                             |

## 명령어

모든 Docker 에이전트 명령을 알아보려면 [에이전트 명령 가이드][26]를 참고하세요.

## 수집 데이터

### 메트릭

기본적으로 Docker 에이전트는 다음 핵심 검사를 통해 메트릭을 수집합니다. 다른 기술을 이용해 메트릭을 수집하려면 [통합](#integrations) 섹션을 참고하세요.

| 점검       | 메트릭       |
|-------------|---------------|
| 컨테이너   | [메트릭][27]
| CPU         | [시스템][28]  |
| 디스크        | [디스크][29]    |
| Docker      | [Docker][30]  |
| 파일 관리 | [시스템][28]  |
| IO          | [시스템][28]  |
| 로드        | [시스템][28]  |
| 메모리      | [시스템][28]  |
| 네트워크     | [네트워크][31] |
| NTP         | [NTP][32]     |
| 업타임      | [시스템][28]  |

### 이벤트 

Docker 에이전트는 에이전트가 시작되거나 재시작될 때 Datadog에 이벤트를 보냅니다.

### 서비스 검사

**datadog.agent.up**: <br>
에이전트가 Datadog에 연결할 수 없는 경우 `CRITICAL`을 반환하고, 그렇지 않은 경우 `OK`를 반환합니다.

**datadog.agent.check_status**: <br>
에이전트 검사가 Datadog에 메트릭을 보낼 수 없는 경우 `CRITICAL`을 반환하고, 그렇지 않은 경우에는 `OK`를 반환합니다. 

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
[4]: https://gallery.ecr.aws/datadog/agent
[5]: https://hub.docker.com/r/datadog/docker-dd-agent
[6]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/docker-dd-agent?gcrImageListsize=30
[7]: https://gallery.ecr.aws/datadog/docker-dd-agent
[8]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[9]: /ko/agent/supported_platforms/?tab=cloudandcontainers
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: /ko/agent/guide/compose-and-the-datadog-agent/
[12]: /ko/agent/docker/integrations/
[13]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[14]: /ko/agent/docker/apm/
[15]: /ko/agent/configuration/proxy/#agent-v6
[16]: /ko/agent/docker/apm/#tracing-from-other-containers
[17]: /ko/agent/docker/log/
[18]: /ko/infrastructure/process/
[19]: /ko/infrastructure/livecontainers/
[20]: /ko/developers/dogstatsd/
[21]: /ko/developers/dogstatsd/unix_socket/
[22]: /ko/getting_started/tagging/unified_service_tagging/
[23]: /ko/agent/docker/tag/
[24]: /ko/agent/configuration/secrets-management/?tab=linux
[25]: /ko/agent/guide/autodiscovery-management/
[26]: /ko/agent/configuration/agent-commands/
[27]: /ko/integrations/container/
[28]: /ko/integrations/system/#metrics
[29]: /ko/integrations/disk/#metrics
[30]: /ko/agent/docker/data_collected/#metrics
[31]: /ko/integrations/network/#metrics
[32]: /ko/integrations/ntp/#metrics