---
aliases:
- /ko/logs/docker
- /ko/logs/languages/docker
- /ko/logs/log_collection/docker
- /ko/agent/docker/log
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
title: Docker 로그 수집
---

## 개요

Datadog Agent 6+는 컨테이너로부터 로그를 수집합니다. 두 가지 유형의 설치 방법이 있습니다:

로그 수집 설정은 현재 환경에 따라 달라집니다. 시작하려면 다음 설치 방법 중 하나를 선택하세요:

- 사용자 환경이 **all** 로그를 `stdout`/`stderr`에 쓰는 경우 [컨테이너형 에이전트](?tab=containerized-agent#installation) 에 따라 설치합니다.

- 컨테이너형 에이전트를 배포할 수 없고 컨테이너가 **all** 로그를 `stdout`/`stderr`에 쓰는 경우 [호스트 에이전트](?tab=hostagent#installation) 에 따라 에이전트 설정 파일 내에서 컨테이너형 로깅을 사용하도록 설정합니다.

- 컨테이너가 파일에 로그를 쓰는 경우 (일부는 `stdout`/`stderr`에, 일부는 파일에 로그를 쓰거나 로그 전체를 파일에 쓰는 경우) [사용자 지정 로그 수집을 사용하는 호스트 에이전트](?tab=hostagentwith customlogging#installation) 설치, 또는 [컨테이너형 에이전트](?tab=intervalized-agent#installation)설치를 따르고 [자동 탐지 설정 예제가 포함된 파일에서 로그 수집](?tab=logcollectionfromfile#file)을 확인합니다.

이 페이지의 CLI 명령은 Docker 런타임에 대한 명령입니다. 컨테이너형 런타임의 경우 `docker`를 `nerdctl`로, Podman runtime의 경우에는 `podman`로 대체합니다. 컨테이너형 및 Podman 로그 수집에 대한 지원은 제한됩니다.

## 설치

{{< tabs >}}
{{% tab "Container Installation" %}}

호스트 모니터링을 위해 Datadog 에이전트를 포함하는 [Docker 컨테이너][1]를 실행하려면 각 운영 체제에 다음 명령을 사용합니다.

### Linux
다음 구성에서 `<DD_SITE>`를 {{< region-param key="dd_site" >}}로 바꿉니다.
{{< site-region region="us,eu,us3,us5,ap1,gov" >}}
```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_SITE=<DD_SITE>
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```
{{< /site-region >}}

### Windows
다음 구성에서 `<DD_SITE>`를 {{< region-param key="dd_site" >}}로 바꿉니다.
{{< site-region region="us,eu,us3,us5,ap1,gov" >}}
```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_SITE=<DD_SITE>
           -v \\.\pipe\docker_engine:\\.\pipe\docker_engine \
           -v c:\programdata\docker\containers:c:\programdata\docker\containers:ro
           gcr.io/datadoghq/agent:latest
```
{{< /site-region >}}

### macOS
Docker Desktop -> Settings -> Resources -> File sharing 아래에 `/opt/datadog-agent/run` 경로를 추가합니다.

다음 구성에서 `<DD_SITE>`를 {{< region-param key="dd_site" >}}로 바꿉니다.
{{< site-region region="us,eu,us3,us5,ap1,gov" >}}
```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_SITE=<DD_SITE>
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           gcr.io/datadoghq/agent:latest
```
{{< /site-region >}}

최신 버전의 Datadog 에이전트를 선택할 것을 권장합니다. GCR에서 사용 가능한 [에이전트 v6용 이미지][2]의 전체 목록을 참고하세요.

로그 수집과 관련된 명령은 다음과 같습니다:

`-e DD_LOGS_ENABLED=true`                                     
: `true`로 설정하면 로그 수집을 활성화합니다. 에이전트가 설정 파일에서 로그 지시사항을 찾습니다.

`-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`                
: 모든 컨테이너에 대한 로그 수집을 활성화하는 로그 설정을 추가합니다.

`-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw`         
: 다시 시작하거나 네트워크 문제가 발생하는 동안 컨테이너 로그 손실을 방지하기 위해 디렉터리의 각 컨테이너에 수집된 마지막 로그 행이 호스트에 저장됩니다.

`-e DD_CONTAINER_EXCLUDE="name:datadog-agent"`                
: Datadog 에이전트가 자체 로그 및 메트릭을 수집하고 전송하지 못하도록 합니다. Datadog 에이전트 로그 또는 메트릭을 수집하려면 이 매개변수를 제거하세요. 이 매개변수 값은 정규 표현식을 지원합니다.

`-v /var/run/docker.sock:/var/run/docker.sock:ro`             
: Docker 데몬에 연결하여 컨테이너를 검색하고 Docker 소켓에서 `stdout/stderr`를 수집합니다.

`-v /var/lib/docker/containers:/var/lib/docker/containers:ro` 
: 파일에서 컨테이너 로그를 수집합니다. Datadog 에이전트 6.27.0/7.27.0+에서 사용할 수 있습니다.

**참고**: Docker Compose를 사용하는 경우 `DD_CONTAINER_EXCLUDE` 값을 따옴표에 넣어서는 안 됩니다.  docker-compose.yaml 파일 환경 변수를 아래 예시와 같이 구성하세요.

```yaml
environment:
    - DD_CONTAINER_EXCLUDE=image:datadog/agent:*
```

[1]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/agent
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
{{% /tab %}}
{{% tab "Host Agent" %}}

1. 호스트에 [최신 버전의 에이전트][1]를 설치합니다.
2. Datadog 에이전트에서 로그 수집은 기본적으로 _사용 안 함_으로 설정되어 있습니다. 활성화하려면 `datadog.yaml` 설정 파일에 다음 행을 추가합니다.

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
3. **Windows 10 전용**: Docker 컨테이너로 작업할 수 있는 권한을 가지려면 Datadog 에이전트 사용자가 `docker-users` 그룹의 구성원이어야 합니다. 관리자 명령 프롬프트에서 `net localgroup docker-users "ddagentuser" /ADD` 를 실행하거나 [Docker User Group][2] 설정 단계를 따릅니다.
4. [에이전트 재시작][3]을 클릭하여 Datadog의 모든 컨테이너 로그를 확인합니다.

[1]: /ko/agent/basic_agent_usage/
[2]: https://docs.microsoft.com/en-us/visualstudio/containers/troubleshooting-docker-errors?view=vs-2019#docker-users-group
[3]: /ko/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "호스트 에이전트의 커스텀 로깅" %}}

1. 호스트에 [최신 버전의 에이전트][1]를 설치합니다.
2. [사용자 지정 로그 수집 설명서][2]에 따라 로그 파일을 추적합니다.

   `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log`에 저장된 `<APP_NAME>` 애플리케이션에서 로그를 수집하려면 [에이전트 설정 디렉터리][3] 루트에서 다음 내용을 포함하여  `<APP_NAME>.d/conf.yaml`파일을 생성하세요.

    ```yaml
    logs:
      - type: file
        path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
        service: "<APP_NAME>"
        source: "<SOURCE>"
    ```

3. [에이전트 재시작][4]을 클릭하여 Datadog의 모든 컨테이너 로그를 확인합니다.

**참고**: 에이전트가 사용자 지정 로그 설정을 사용하여 컨테이너에서 생성된 로그를 수집하려면 호스트에서 접근할 수 있는 볼륨에 로그를 기록해야 합니다. 컨테이너 로그는 `stdout`와 `stderr`에 기록하여 자동으로 수집할 수 있도록 하는 것이 좋습니다.

[1]: /ko/agent/basic_agent_usage/
[2]: /ko/agent/logs/#custom-log-collection
[3]: /ko/agent/configuration/agent-configuration-files/
[4]: /ko/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

**중요 사항**:

- 컨테이너 메타데이터는 사용자 지정 로그 수집을 사용하여 검색되지 않으므로 에이전트가 자동으로 로그에 컨테이너 태그를 할당하지 않습니다. [사용자 지정 태그][1]를 사용하여 컨테이너 태그를 생성하세요.

- `source`및 `service`는 Datadog Agent 6.8+에서  `short_image` 태그 값으로 기본 설정됩니다. 아래에 설명된 대로 자동 탐지를 사용하여 소스 및 서비스 값을 재정의할 수 있습니다. `source` 값을 통합 이름으로 설정하면 로그를 구문 분석하고 로그에서 관련 정보를 추출하는 통합 파이프라인이 설치됩니다.

- `Stderr` 컨테이너에서 전송되는 로그의 기본 상태는 `Error`입니다.

- Docker의 기본 json-file 로깅 드라이버 대신 _journald_ 로깅 드라이버를 사용하는 경우 컨테이너형 환경 설정의 자세한 내용은 [jourd 통합 설명서][2]를 참고하세요. 필터링할 매개변수에 대한 자세한 내용은 [journald 필터 단위 설명서][2]를 참고하세요.


## 로그 통합

Datadog Agent 6.8+에서는 `short_image` 태그 기본값으로 `source`와 `service`가 설정됩니다. 이를 통해 Datadog는 각 컨테이너의 로그 소스를 식별하고 해당 통합을 자동으로 설치할 수 있습니다.

컨테이너 짧은 이미지 이름이 사용자 지정 이미지의 통합 이름과 일치하지 않을 수 있으며 애플리케이션 이름을 더 잘 반영하도록 덮어쓸 수 있습니다. 이 작업은 [Datadog 자동 탐지][3] 및 [Kubernetes Pod 주석][4] 또는 컨테이너 라벨을 사용해 실행할 수 있습니다.

자동 탐지는 파일 유형에 따라 다음의 라벨 형식을 사용합니다.

{{< tabs >}}
{{% tab "Dockerfile" %}}

다음 `LABEL`을 Dockerfile 에 추가합니다.

```text
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

다음 라벨을 `docker-compose.yaml` 파일에 추가합니다.

```yaml
labels:
    com.datadoghq.ad.logs: '["<LOGS_CONFIG>"]'
```

{{% /tab %}}
{{% tab "실행 명령" %}}

다음 라벨을 실행 명령으로 추가합니다.

```text
-l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{< /tabs >}}

`<LOG_CONFIG>`는 통합 설정 파일 내에 있는 로그 수집 설정입니다. [자세한 내용은 로그 수집 설정을 참고][5]하세요.

**참고**: Docker 라벨을 통해 `service` 값을 설정할 때 Datadog은 통합 서비스 태깅을 모범 사례로 사용할 것을 권장합니다. 통합 서비스 태깅은 `env`, `service`, `version` 세 가지 표준 태그를 사용하여 로그를 포함한 모든 Datadog 텔레메트리를 통합합니다. 통합 태깅으로 환경 설정하는 방법을 알아보려면 [통합 서비스 태깅 설명서][6]를 참고하세요.

### 예시

{{< tabs >}}
{{% tab "NGINX Dockerfile" %}}

다음 Docker 파일은 해당 컨테이너에서 NGINX 로그 통합을 활성화합니다(`service`값은 변경 가능):

```text
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

메트릭 및 로그 NGINX 통합을 모두 사용하도록 설정하는 방법:

```text
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

{{% /tab %}}
{{% tab "Java multi-line logs" %}}

스택 트레이스(stack trace) 같은 다중 행 로그의 경우 에이전트에는 [다중 행 처리 규칙][1]이 있어 행을 단일 로그로 집계할 수 있습니다.

로그 예제(Java 스택 트레이스):

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

컨테이너에 아래와 같은 `com.datadoghq.ad.logs` 라벨을 사용하여 위의 로그가 올바르게 수집되었는지 확인합니다.

```yaml
labels:
    com.datadoghq.ad.logs: '[{"source": "java", "service": "myapp", "log_processing_rules": [{"type": "multi_line", "name": "log_start_with_date", "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"}]}]'
```

자세한 패턴 예제를 보려면 [다중 행 처리 규칙 설명서][1]을 참고하세요.


[1]: /ko/agent/logs/advanced_log_collection/?tab=docker#multi-line-aggregation
{{% /tab %}}
{{% tab "파일에서" %}}

에이전트 v7.25.0+/6.25.0+는 컨테이너 자동 탐지 라벨을 기반으로 파일에서 로그를 직접 수집할 수 있습니다. 이러한 로그를 수집하려면 컨테이너에 아래와 같은 `com.datadoghq.ad.logs` 라벨을 사용하여 `/logs/app/prod.log`를 수집합니다.

```yaml
labels:
    com.datadoghq.ad.logs: '[{"type":"file", "source": "sample_app", "service": "sample_service", "path": "/logs/app/prod.log"}]'
```

파일에서 수집된 로그에는 컨테이너 메타데이터 태그가 지정됩니다. 로그 수집은 컨테이너 수명 주기와 연결되며, 컨테이너가 중지되는 즉시 해당 파일에서의 로그 수집이 중지됩니다.


**참고**:

- 파일 경로는 에이전트와 **관련**이 있으므로 파일을 포함하는 디렉터리는 애플리케이션을 실행하는 컨테이너와 에이전트 컨테이너 간에 공유되어야 합니다. 예를 들어, 컨테이너가 `/logs`를 연결하는 경우 파일에 로깅하는 각 컨테이너가 로그 파일이 작성되는`/logs/app`와 같은 볼륨을 연결할 수 있습니다.

- 컨테이너에서 이런 종류의 라벨을 사용할 때 `stderr`/`stdout` 로그는 자동으로 수집되지 않습니다. `stderr`/`stdout` 및 파일에서 수집이 필요한 경우 다음과 같이 라벨을 사용하여 명시적으로 활성화해야 합니다.
```yaml
labels:
    com.datadoghq.ad.logs: '[{"type":"file", "source": "java", "service": "app", "path": "/logs/app/prod.log"}, {"type": "docker", "source": "app_container", "service": "app"}]'
```

- 이러한 종류의 조합을 사용하는 경우 `source` 및 `service`는 기본값이 없으며 자동 탐지 라벨에 명시적으로 설정되어야 합니다.

{{% /tab %}}
{{< /tabs >}}

**참고**: 자동 탐지 기능은 `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` 환경 변수 유무와 관계 없이 사용할 수 있습니다. 다음 옵션 중 하나를 선택합니다.

- 컨테이너 라벨 또는 Pod 주석을 사용하여 로그를 수집할 컨테이너를 선택합니다.
- 환경 변수를 사용하여 모든 컨테이너에서 로그를 수집한 다음 기본값 `source`와 `service` 값을 재정의합니다.
- 원하는 컨테이너의 하위 집합의 처리 규칙을 추가합니다.

## 고급 로그 수집

자동 탐지 로그 라벨을 사용해 다음과 같은 고급 로그 수집 처리 로직를 적용합니다.

- [로그를 Datadog로 보내기 전에 필터링][7]합니다.
- [로그에서 중요한 데이터 삭제][8]합니다.
- [다중 행 집계로 진행][9]합니다.

## 파일에서 Docker 컨테이너 로그 수집

Docker 소켓을 통해 수집하는 대신 파일에서 Docker 컨테이너 로그 수집을 사용할 수 있습니다. 파일 기반 수집은 소켓 기반 수집보다 더 나은 성능을 제공합니다.

버전 7.27.0/6.27.0+에서는 파일에서 Docker 컨테이너 로그를 수집하도록 에이전트를 설정할 수 있습니다. 버전 6.33.0+/7.33.0+에서는 에이전트가 기본적으로 파일에서 Docker 컨테이너 로그를 수집합니다.

파일 기반 수집을 위해서는 Docker 컨테이너 로그를 저장하는 디렉터리가 `/var/lib/docker/containers`(Windows에서는`c:\programdata\docker\containers`)에 있는 에이전트에 노출되어야 합니다. 자세한 내용은 [Docker 로그 수집 문제 해결 가이드][10]를 참고하세요.

**참고**:
- Docker 소켓 기반 컨테이너 로그 수집에서 파일 기반 로그 수집으로 이전하면 새 컨테이너만 해당 파일에서 따라옵니다. 환경 변수 `DD_LOGS_CONFIG_DOCKER_CONTAINER_FORCE_USE_FILE`을 `true`로 설정하여 에이전트가 파일에서 모든 컨테이너 로그를 수집하도록 할 수 있습니다. 에이전트가 파일에서 모든 컨테이너 로그를 수집하도록 강제하면 기존 컨테이너에 대한 로그가 중복될 수 있습니다.
- 에이전트를 컨테이너 파일 로그 수집에서 Docker 소켓 기반 수집으로 다시 전환하면 기존 컨테이너의 중복 로그가 나타날 가능성이 높습니다.

## 컨테이너 필터링

로그를 수집할 컨테이너를 관리할 수 있습니다. 이는 Datadog 에이전트 로그 수집을 방지하는 데 유용합니다. 자세한 내용은 [Container Discovery Management][11]를 참고하세요.

## 수명이 짧은 컨테이너

Docker 환경의 경우 에이전트는 Docker 이벤트를 통해 실시간으로 컨테이너 업데이트를 수신합니다. 에이전트는 1초마다 컨테이너 라벨(자동 탐지)에서 설정을 추출하고 업데이트합니다.

v6.14+ 이후 에이전트는 모든 컨테이너(실행 중 또는 중지됨)의 로그를 수집합니다. 즉, 수명이 짧은 컨테이너가 지난 1초 동안 시작 및 중지된 경우, 로그를 삭제하지 않는 한 계속해서 수집됩니다.

Kubernetes 환경의 경우 [Kubernetes 수명이 짧은 컨테이너 설명서][12]를 참고하세요.

## 참고 자료

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