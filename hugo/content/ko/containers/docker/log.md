---
aliases:
- /ko/logs/docker
- /ko/logs/languages/docker
- /ko/logs/log_collection/docker
- /ko/agent/docker/log
description: Datadog Agent를 사용하여 Docker 컨테이너에서 실행되는 애플리케이션의 로그 수집 구성
further_reading:
- link: logs/explorer
  tag: 설명서
  text: 로그 탐색 방법 알아보기
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
- link: /containers/troubleshooting/log-collection
  tag: 설명서
  text: 컨테이너 로그 수집 문제 해결
title: Docker 로그 수집
---
## 개요 {#overview}

Datadog Agent 6 이상은 컨테이너에서 로그를 수집합니다. 두 가지 설치 방식이 제공됩니다.

로그 수집 구성 방법은 현재 환경에 따라 달라집니다. 시작하려면 다음 설치 방식 중 하나를 선택하세요.

- 환경에서 **모든** 로그를 `stdout`/`stderr`에 기록하는 경우 [컨테이너화된 Agent](?tab=containerized-agent#installation) 설치 방식을 따르세요.

- 컨테이너화된 Agent를 배포할 수 없고 컨테이너가 **모든** 로그를 `stdout`/`stderr`에 기록하는 경우 Agent 구성 파일에서 컨테이너 로그 기능을 활성화하기 위해 [호스트 Agent](?tab=hostagent#installation) 설치 방식을 따르세요.

- 컨테이너가 로그를 파일에 기록하는 경우(`stdout`/`stderr`에 일부만 기록하고 나머지는 파일에 기록하거나, 또는 모든 로그를 파일에 기록하는 경우) [사용자 지정 로그 수집이 포함된 호스트 Agent](?tab=hostagentwithcustomlogging#installation) 설치 방식을 따르거나, [컨테이너화된 Agent](?tab=containerized-agent#installation) 설치 방식을 사용한 뒤 [Autodiscovery를 사용한 파일 기반 로그 수집 구성 예시](?tab=logcollectionfromfile#examples)를 확인하세요.

이 페이지의 CLI 명령은 Docker 런타임 기준입니다. containerd 런타임을 사용하는 경우 `docker` 대신 `nerdctl`를 사용하고, Podman 런타임을 사용하는 경우 `podman`를 사용하세요. containerd 및 Podman 로그 수집 지원은 제한적입니다.

## 설치 {#installation}

{{< tabs >}}
{{% tab "컨테이너 설치" %}}

호스트를 모니터링하기 위해 Datadog Agent가 포함된 [Docker 컨테이너][1]를 실행하려면 운영 체제에 맞는 다음 명령을 사용하세요.

### Linux {#linux}
다음 구성에서 `<DD_SITE>`를 {{< region-param key="dd_site" code="true">}}으로 교체하세요.

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_SITE=<DD_SITE> \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           registry.datadoghq.com/agent:latest
```

### Windows {#windows}
다음 구성에서 `<DD_SITE>`를 {{< region-param key="dd_site" code="true">}}으로 교체하세요.

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_SITE=<DD_SITE> \
           -v \\.\pipe\docker_engine:\\.\pipe\docker_engine \
           -v c:\programdata\docker\containers:c:\programdata\docker\containers:ro
           registry.datadoghq.com/agent:latest
```

### macOS {#macos}
Docker Desktop -> Settings -> Resources -> File sharing 아래에 `/opt/datadog-agent/run` 경로를 추가하세요.

다음 구성에서 `<DD_SITE>`를 {{< region-param key="dd_site" code="true">}}으로 교체하세요.

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_SITE=<DD_SITE> \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           registry.datadoghq.com/agent:latest
```

최신 버전의 Datadog Agent를 사용하는 것이 권장됩니다. GCR에서 제공되는 [Agent v6 이미지][2] 전체 목록을 참조하세요.

로그 수집과 관련된 명령은 다음과 같습니다:

`-e DD_LOGS_ENABLED=true`                                     
: `true`로 설정하면 로그 수집을 활성화합니다. Agent는 구성 파일에서 로그 수집 지침을 찾습니다.

`-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`                
: 모든 컨테이너에 대해 로그 수집을 활성화하는 로그 구성을 추가합니다.

`-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw`         
: 재시작 또는 네트워크 문제 발생 시 컨테이너 로그 손실을 방지하기 위해, 이 디렉터리에서 각 컨테이너에 대해 수집된 마지막 로그 라인이 호스트 측에 저장됩니다.

`-e DD_CONTAINER_EXCLUDE="name:datadog-agent"`                
: Datadog Agent가 자체 로그 및 메트릭을 수집하고 전송하는 것을 방지합니다. Datadog Agent의 로그 또는 메트릭도 수집하려면 이 파라미터를 제거하세요. 이 파라미터 값은 정규식을 지원합니다.

`-v /var/run/docker.sock:/var/run/docker.sock:ro`             
: 컨테이너를 검색하고 Docker 소켓에서 `stdout/stderr`를 수집하기 위해 Docker 데몬에 연결합니다.

`-v /var/lib/docker/containers:/var/lib/docker/containers:ro` 
: 파일에서 컨테이너 로그를 수집합니다. Datadog Agent 6.27.0/7.27.0 이상에서 사용할 수 있습니다.

**참고**: Docker Compose를 사용하는 경우 `DD_CONTAINER_EXCLUDE` 값은 따옴표로 묶지 않아야 합니다. 아래 예시와 같이 docker-compose.yaml 파일에서 환경 변수를 구성하세요.

```yaml
environment:
    - DD_CONTAINER_EXCLUDE=image:datadog/agent:*
```

[1]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/agent
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
{{% /tab %}}
{{% tab "Host Agent" %}}

1. 호스트에 [최신 버전의 Agent][1]를 설치합니다.
2. Datadog Agent에서는 로그 수집이 기본적으로 _비활성화_되어 있습니다. 이를 활성화하려면 `datadog.yaml` 구성 파일에 다음 줄을 추가하세요.

    ```yaml
    logs_enabled: true
    listeners:
        - name: docker
    config_providers:
        - name: docker
          polling: true
    logs_config:
        container_collect_all: true
    ```
3. **Windows 10 전용**: Datadog Agent 사용자는 Docker 컨테이너를 처리할 권한을 갖기 위해 `docker-users` 그룹의 구성원이어야 합니다. 관리자 권한 명령 프롬프트에서 `net localgroup docker-users "ddagentuser" /ADD`를 실행하거나 [Docker 사용자 그룹][2] 구성 단계를 따르세요.  
4. [Agent를 재시작][3]하여 Datadog의 모든 컨테이너 로그를 확인합니다.

[1]: /ko/agent/basic_agent_usage/
[2]: https://docs.microsoft.com/en-us/visualstudio/containers/troubleshooting-docker-errors?view=vs-2019#docker-users-group
[3]: /ko/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "사용자 지정 로깅을 사용하는 Host Agent" %}}

1. 호스트에 [최신 버전의 Agent][1]를 설치합니다.
2. [사용자 지정 로그 수집 설명서][2]에 따라 로그 파일을 테일링합니다.

    `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log`에 저장된 `<APP_NAME>` 애플리케이션의 로그를 수집하려면 [Agent 구성 디렉터리][3]의 루트에 `<APP_NAME>.d/conf.yaml` 파일을 생성하고 다음 내용을 추가하세요.

    ```yaml
    logs:
      - type: file
        path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
        service: "<APP_NAME>"
        source: "<SOURCE>"
    ```

3. [Agent를 재시작][4]하여 Datadog의 모든 컨테이너 로그를 확인합니다.

**참고**: 사용자 지정 로그 구성을 사용하는 컨테이너의 로그를 Agent가 수집하려면 해당 로그가 호스트에서 접근 가능한 볼륨에 기록되어야 합니다. 자동 수집이 가능하도록 컨테이너 로그는 `stdout` 및 `stderr`에 기록하는 것이 권장됩니다. 

[1]: /ko/agent/basic_agent_usage/
[2]: /ko/agent/logs/#custom-log-collection
[3]: /ko/agent/configuration/agent-configuration-files/
[4]: /ko/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

**중요 참고 사항**:

- 사용자 지정 로그 수집에서는 컨테이너 메타데이터를 가져오지 않으므로 Agent가 로그에 컨테이너 태그를 자동으로 할당하지 않습니다. 컨테이너 태그를 생성하려면 [사용자 지정 태그][1]를 사용하세요.

- `source` 및 `service`는 Datadog Agent 6.8 이상에서 기본적으로 `short_image` 태그 값을 사용합니다. source 및 service 값은 아래 설명된 Autodiscovery를 통해 재정의할 수 있습니다. `source` 값을 통합 이름으로 설정하면 로그를 파싱하고 관련 정보를 추출하는 통합 파이프라인이 설치됩니다.

- `Stderr` 컨테이너에서 생성된 로그의 기본 상태는 `Error`입니다.

- Docker 기본 json-file 로깅 드라이버 대신 _journald_ 로깅 드라이버를 사용하는 경우, 컨테이너 환경 설정에 대한 자세한 내용은 [journald 통합 설명서][2]를 참조하세요. 필터링 파라미터에 대한 자세한 내용은 [journald filter units 설명서][2]를 참조하세요.


## 로그 통합 {#log-integrations}

Datadog Agent 6.8 이상에서는 `source` 및 `service`이 기본적으로 `short_image` 태그 값을 사용합니다. 이를 통해 Datadog은 각 컨테이너의 로그 소스를 식별하고 해당 통합을 자동으로 설치할 수 있습니다.

사용자 지정 이미지의 경우 컨테이너의 단축 이미지 이름이 통합 이름과 일치하지 않을 수 있으며, 애플리케이션 이름을 더 정확하게 반영하도록 재정의할 수 있습니다. 이는 [Datadog Autodiscovery][3], [Kubernetes의 포드 주석][4] 또는 컨테이너 레이블을 사용하여 수행할 수 있습니다.

Autodiscovery는 파일 유형에 따라 다음 형식의 레이블을 기대합니다.

{{< tabs >}}
{{% tab "Dockerfile" %}}

Dockerfile에 다음 `LABEL`을 추가하세요.

```text
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

`docker-compose.yaml` 파일에 다음 레이블을 추가하세요.

```yaml
labels:
    com.datadoghq.ad.logs: '["<LOGS_CONFIG>"]'
```

{{% /tab %}}
{{% tab "명령 실행" %}}

실행 명령에 다음 레이블을 추가하세요.

```text
-l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{< /tabs >}}

여기서 `<LOG_CONFIG>`는 통합 구성 파일 내부에서 찾을 수 있는 로그 수집 구성입니다. [자세한 내용을 보려면 로그 수집 구성을 참조하세요][5].

**참고**: Docker 레이블을 통해 `service` 값을 구성할 경우 Datadog은 모범 사례로 unified service tagging을 사용할 것을 권장합니다. unified service tagging은 `env`, `service`, `version`의 세 가지 표준 태그를 사용하여 로그를 포함한 모든 Datadog 텔레메트리를 서로 연결합니다. 통합 태깅을 사용하도록 환경을 구성하는 방법은 [unified service tagging 설명서][6]를 참조하세요.

### 예시 {#examples}

{{< tabs >}}
{{% tab "NGINX Dockerfile" %}}

다음 Dockerfile은 해당 컨테이너에서 NGINX 로그 통합을 활성화합니다(`service` 값은 변경 가능).

```text
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

메트릭 및 로그용 NGINX 통합을 모두 활성화하려면 다음과 같이 구성합니다.

```text
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

{{% /tab %}}
{{% tab "Java 다중 행 로그" %}}

스택 트레이스(stack trace) 같은 다중 행 로그의 경우 Agent에는 [다중 행 처리 규칙][1]이 있어 행을 단일 로그로 집계할 수 있습니다.

예시 로그(Java 스택 트레이스):

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

위 로그가 올바르게 수집되도록 하려면 컨테이너에 아래와 같이 `com.datadoghq.ad.logs` 레이블을 사용하세요.

```yaml
labels:
    com.datadoghq.ad.logs: '[{"source": "java", "service": "myapp", "log_processing_rules": [{"type": "multi_line", "name": "log_start_with_date", "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"}]}]'
```

더 많은 패턴 예시를 보려면 [다중 행 처리 규칙 설명서][1]를 참조하세요.


[1]: /ko/agent/logs/advanced_log_collection/?tab=docker#multi-line-aggregation
{{% /tab %}}
{{% tab "파일에서" %}}

Agent v7.25.0+/6.25.0+에서는 컨테이너 Autodiscovery 레이블을 기반으로 파일에서 직접 로그를 수집할 수 있습니다. 이러한 로그를 수집하려면 아래와 같이 컨테이너에 `com.datadoghq.ad.logs` 레이블을 사용하여 `/logs/app/prod.log`를 수집하세요.

```yaml
labels:
    com.datadoghq.ad.logs: '[{"type":"file", "source": "sample_app", "service": "sample_service", "path": "/logs/app/prod.log"}]'
```

파일에서 수집된 로그에는 컨테이너 메타데이터 태그가 추가됩니다. 로그 수집은 컨테이너 수명 주기와 연결되며, 컨테이너가 중지되면 해당 파일에 대한 로그 수집도 중지됩니다.


**참고**:

- 파일 경로는 Agent 기준의 **상대 경로**이므로, 해당 파일이 포함된 디렉터리는 애플리케이션 컨테이너와 Agent 컨테이너 간에 공유되어야 합니다. 예를 들어 컨테이너가 `/logs`를 마운트하는 경우, 파일에 로그를 기록하는 각 컨테이너는 `/logs/app`와 같은 볼륨을 마운트할 수 있습니다.

- 이 유형의 레이블을 컨테이너에 사용할 경우 해당 컨테이너의 `stderr`/`stdout` 로그는 자동으로 수집되지 않습니다. `stderr`/`stdout`와 파일 모두에서 로그를 수집해야 하는 경우 다음과 같은 레이블을 사용하여 명시적으로 활성화해야 합니다.

```yaml
labels:
    com.datadoghq.ad.logs: '[{"type":"file", "source": "java", "service": "app", "path": "/logs/app/prod.log"}, {"type": "docker", "source": "app_container", "service": "app"}]'
```

- 이와 같은 조합을 사용할 경우 `source`와 `service`에는 기본값이 없으므로 Autodiscovery 레이블에서 명시적으로 설정해야 합니다.

{{% /tab %}}
{{< /tabs >}}

**참고**: Autodiscovery 기능은 `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` 환경 변수 사용 여부와 관계없이 사용할 수 있습니다. 다음 옵션 중 하나를 선택하세요.

- 컨테이너 레이블 또는 포드 주석을 사용하여 로그를 수집할 컨테이너를 선택합니다.
- 환경 변수를 사용하여 모든 컨테이너의 로그를 수집한 후 기본 `source` 및 `service` 값을 재정의합니다.
- 원하는 컨테이너 하위 집합에 대해 처리 규칙을 추가합니다.

## 고급 로그 수집 {#advanced-log-collection}

Autodiscovery 로그 레이블을 사용하여 다음과 같은 고급 로그 수집 처리 로직을 적용할 수 있습니다.

- [Datadog으로 전송하기 전에 로그 필터링][7]
- [로그에서 민감한 데이터 마스킹][8]
- [다중 행 집계 수행][9]

## 파일 기반 Docker 컨테이너 로그 수집 {#docker-container-log-collection-from-a-file}

파일 기반 Docker 컨테이너 로그 수집은 Docker 소켓을 통한 수집의 대안입니다. 파일 기반 수집은 소켓 기반 수집보다 더 나은 성능을 제공합니다.

버전 7.27.0/6.27.0+에서는 Agent가 파일에서 Docker 컨테이너 로그를 수집하도록 구성할 수 있습니다. 버전 6.33.0+/7.33.0+에서는 Agent가 기본적으로 파일에서 Docker 컨테이너 로그를 수집합니다. 

파일 기반 수집을 사용하려면 Docker 컨테이너 로그를 저장하는 디렉터리를 Agent에 `/var/lib/docker/containers`(Windows의 경우 `c:\programdata\docker\containers`) 위치로 노출해야 합니다. 자세한 내용은 [Docker 로그 수집 문제 해결 가이드][10]를 참조하세요.

**참고**:
- Docker 소켓 기반 컨테이너 로그 수집에서 파일 기반 로그 수집으로 마이그레이션하는 경우, 새로 생성된 컨테이너만 파일에서 테일링합니다. 환경 변수 `DD_LOGS_CONFIG_DOCKER_CONTAINER_FORCE_USE_FILE`를 `true`로 설정하면 Agent가 모든 컨테이너 로그를 파일에서 수집하도록 강제할 수 있습니다. Agent가 모든 컨테이너 로그를 파일에서 수집하도록 강제하면 기존 컨테이너에 대해 중복 로그가 발생할 수 있습니다.
- 파일 기반 수집에서 다시 Docker 소켓 기반 수집으로 전환하는 경우에도 기존 컨테이너에 대해 중복 로그가 발생할 가능성이 있습니다.

## 컨테이너 필터링 {#filter-containers}

로그를 수집할 컨테이너를 관리할 수 있습니다. 예를 들어 Datadog Agent 자체의 로그 수집을 방지하는 데 유용합니다. 자세한 내용은 [컨테이너 탐지 관리][11]를 참조하세요.

## 수명이 짧은 컨테이너 {#short-lived-containers}

Docker 환경에서는 Agent가 Docker 이벤트를 통해 실시간으로 컨테이너 업데이트를 수신합니다. Agent는 1초마다 컨테이너 레이블(Autodiscovery)에서 구성을 추출하고 갱신합니다.

Agent v6.14 이상에서는 실행 중이거나 중지된 모든 컨테이너의 로그를 수집합니다. 따라서 지난 1초 이내에 시작되고 종료된 수명이 짧은 컨테이너의 로그도, 해당 컨테이너가 삭제되지 않은 한 수집됩니다.

Kubernetes 환경의 경우 [Kubernetes 수명이 짧은 컨테이너 설명서][12]를 참조하세요.

## 문제 해결 {#troubleshooting}

문제 해결 단계는 [컨테이너 로그 수집 문제 해결][13]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#methods-for-assigning-tags
[2]: /ko/integrations/journald/
[3]: /ko/agent/docker/integrations/
[4]: /ko/agent/kubernetes/integrations/?tab=kubernetespodannotations#configuration
[5]: /ko/agent/logs/#custom-log-collection
[6]: /ko/getting_started/tagging/unified_service_tagging
[7]: /ko/agent/logs/advanced_log_collection/?tab=docker#filter-logs
[8]: /ko/agent/logs/advanced_log_collection/?tab=docker#scrub-sensitive-data-from-your-logs
[9]: /ko/agent/logs/advanced_log_collection/?tab=docker#multi-line-aggregation
[10]: /ko/logs/guide/docker-logs-collection-troubleshooting-guide/
[11]: /ko/agent/guide/autodiscovery-management/
[12]: /ko/agent/kubernetes/log/?tab=daemonset#short-lived-containers
[13]: /ko/containers/troubleshooting/log-collection/