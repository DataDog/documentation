---
app_id: nginx
app_uuid: b98a5a97-1d65-4f74-9d1a-b2c1be85a470
assets:
  dashboards:
    NGINX Plus base overview: assets/dashboards/plus_overview.json
    NGINX-Metrics: assets/dashboards/NGINX-Metrics_dashboard.json
    NGINX-Overview: assets/dashboards/NGINX-Overview_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - nginx.net.connections
      - nginx.connections.active
      metadata_path: metadata.csv
      prefix: nginx.
    process_signatures:
    - 'nginx: master process'
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 31
    source_type_name: Nginx
  monitors:
    Upstream 4xx errors are high: assets/monitors/4xx.json
    Upstream 5xx errors are high: assets/monitors/5xx.json
    Upstream peers are failing: assets/monitors/upstream_peer_fails.json
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    nginx_processes: assets/saved_views/nginx_processes.json
    status_code_overview: assets/saved_views/status_code_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nginx/README.md
display_on_public_website: true
draft: false
git_integration_title: nginx
integration_id: nginx
integration_title: Nginx
integration_version: 8.1.0
is_public: true
manifest_version: 2.0.0
name: nginx
public_title: Nginx
short_description: 연결 및 요청 메트릭을 모니터링하세요. NGINX Plus로 더 많은 메트릭을 확보하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 연결 및 요청 메트릭을 모니터링하세요. NGINX Plus로 더 많은 메트릭을 확보하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/how-to-monitor-nginx
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/how-to-collect-nginx-metrics/index.html
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/how-to-monitor-nginx-with-datadog/index.html
  support: README.md#Support
  title: Nginx
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![NGINX 기본값 대시보드][1]

## 개요

Datadog 에이전트는 다음을 포함하되 이에 국한되지 않는 많은 메트릭을 NGINX 인스턴스로부터 수집할 수 있습니다.

- 총 요청
- 수락, 처리, 활성 등의 연결

NGINX의 상용 버전인 NGINX Plus 사용자의 경우, 에이전트에서 NGINX Plus가 제공하는 더 많은 메트릭을 수집할 수 있습니다.

- 4xx 코드 및 5xx 코드와 같은 오류
- 활성 연결, 5xx 코드 및 상태 점검과 같은 업스트림 서버
- 크기, 히트, 미스 등 캐시
- 핸드셰이크 및 실패한 핸드셰이크와 같은 SSL

## 설정

### 설치

NGINX 점검은 로컬 NGINX 상태 엔드포인트에서 메트릭을 가져오므로 `nginx` 바이너리는 NGINX 상태 모듈로 컴파일해야 합니다.

- [스텁 상태 모듈][2] - 오픈 소스 NGINX용
- [HTTP 상태 모듈][3] - NGINX Plus용

#### NGINX 오픈 소스

오픈 소스 NGINX를 사용하는 경우 인스턴스에 스텁 상태 모듈이 없을 수 있습니다. **설정 ** 진행 전에 `nginx` 바이너리에 해당 모듈이 포함되어 있는지 확인하세요.

```shell
$ nginx -V 2>&1| grep -o http_stub_status_module
http_stub_status_module
```

명령 출력에 `http_stub_status_module`이 포함되지 않으면 해당 모듈이 포함된 NGINX 패키지를 설치해야 합니다. 직접 NGINX를 컴파일하여 모듈을 활성화할 수도 있지만, 대부분의 최신 리눅스(Linux) 배포에서는 다양한 추가 모듈 조합이 내장된 대체 NGINX 패키지를 제공합니다. 운영 체제의 NGINX 패키지를 확인하여 스텁 상태 모듈이 포함된 패키지를 찾으세요.

#### NGINX Plus

릴리스 13 이전의 NGINX Plus 패키지에는 http 상태 모듈이 포함되어 있습니다. NGINX Plus 릴리스 13 이상의 경우 상태 모듈은 더 이상 사용되지 않으며 대신 새로운 Plus API 를 사용해야 합니다. 자세한 내용은 [공지사항][4]을 참조하세요.

#### NGINX 준비

{{< tabs >}}
{{% tab "Host" %}}

각 NGINX 서버에서 다른 NGINX 설정 파일(예: `/etc/nginx/conf.d/`)이 포함된 디렉터리에 `status.conf` 파일을 생성합니다.

```conf
server {
  listen 81;
  server_name localhost;

  access_log off;
  allow 127.0.0.1;
  deny all;

  location /nginx_status {
    # Choose your status module

    # freely available with open source NGINX
    stub_status;

    # for open source NGINX < version 1.7.5
    # stub_status on;

    # available only with NGINX Plus
    # status;

    # ensures the version information can be retrieved
    server_tokens on;
  }
}
```

**NGINX Plus**

NGINX Plus 사용자도 `stub_status`를 사용할 수 있지만 해당 모듈이 제공하는 메트릭 이 적기 때문에 Datadog에서는 `status`를 사용할 것을 권장합니다.

NGINX Plus 릴리스 15 이상에서는 `status` 모듈이 더 이상 사용되지 않습니다. 대신 [http_api_module][1]을 사용하세요. 예를 들어, 기본 NGINX 설정 파일(`/etc/nginx/conf.d/default.conf`)에서 `/api` 엔드포인트를 활성화합니다.

```conf
server {
  listen 8080;
  location /api {
    api write=on;
  }
}
```

더 자세한 메트릭(예: 초당 2xx / 3xx / 4xx / 5xx 응답 개수)을 얻으려면 모니터링하려는 서버에 `status_zone`를 설정하세요. 예시:

```conf
server {
  listen 80;
  status_zone <ZONE_NAME>;
  ...
}
```

NGINX를 다시 로드하여 상태 또는 API 엔드포인트를 활성화합니다. 완전히 다시 시작할 필요는 없습니다.

```shell
sudo nginx -t && sudo nginx -s reload
```
[1]: https://nginx.org/en/docs/http/ngx_http_api_module.html
{{% /tab %}}
{{% tab "Kubernetes" %}}

메트릭 엔드포인트를 다른 포트에 노출하려면 설정 구성 맵에 다음 스니펫을 추가하세요.

```yaml
kind: ConfigMap
metadata:
  name: nginx-conf
data:
[...]
  status.conf: |
    server {
      listen 81;

      location /nginx_status {
        stub_status on;
      }

      location / {
        return 404;
      }
    }
```

그런 다음 NGINX 포드에서 `81` 엔드포인트를 노출하고 해당 파일을 NGINX 설정 폴더에 마운트합니다.

```yaml
spec:
  containers:
    - name: nginx
      ports:
        - containerPort: 81
      volumeMounts:
        - mountPath: /etc/nginx/conf.d/status.conf
          subPath: status.conf
          readOnly: true
          name: "config"
  volumes:
    - name: "config"
      configMap:
          name: "nginx-conf"
```


{{% /tab %}}
{{< /tabs >}}

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

호스트에서 실행되는 경우 아래 지침에 따라 이 점검을 설정하세요. 컨테이너화된 환경 경우 [도커(Docker)](?tab=docker#docker), [쿠버네티스(Kubernetes)](?tab=kubernetes#kubernetes) 또는 [ECS](?tab=ecs#ecs) 섹션을 참조하세요.

##### 메트릭 수집

1. `nginx.d/conf.yaml` 파일에서 `nginx_status_url` 파라미터를 `http://localhost:81/nginx_status/`로 설정하여 [NGINX 메트릭](#metrics) 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 nginx.d/conf.yaml][1]을 참조하세요.

    **NGINX Plus**:

      - NGINX Plus 릴리스 13 이상의 경우 `nginx.d/conf.yaml` 설정 파일에서 파라미터 `use_plus_api`를 `true`로 설정하세요.
      - Stream stats API 호출은 NGINX Plus에 기본적으로 포함됩니다. 사용하지 않으려면 `nginx.d/conf.yaml` 설정 파일에서 파라미터 `use_plus_api_stream`을 `false`로 설정하세요.
      - 예를 들어 `http_api_module`을 사용하는 경우 파라미터 `nginx_status_url`을 서버의 `/api` 위치로 설정합니다(예: `nginx.d/conf.yaml` 설정 파일).

          ```yaml
          nginx_status_url: http://localhost:8080/api
          ```

2. 선택 사항 - NGINX `vhost_traffic_status module`을 사용하는 경우 `nginx.d/conf.yaml` 설정 파일에서 파라미터 `use_vts`를 `true`로 설정합니다.

3. [에이전트][2]를 다시 시작하여 NGINX 메트릭을 Datadog로 전송하기 시작합니다.

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. 이 설정 블록을 `nginx.d/conf.yaml` 파일에 추가하여 NGINX 로그 수집을 시작하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/nginx/access.log
       service: nginx
       source: nginx

     - type: file
       path: /var/log/nginx/error.log
       service: nginx
       source: nginx
   ```

   및 `path` 파라미터 값을 변경하고 환경을 설정하세요. 사용 가능한 모든 설정 옵션은 [샘플 nginx.d/conf.yaml][1]을 참조하세요.

3. [Agent를 재시작합니다][2].

**참고**: 기본 NGINX 로그 형식에는 요청 응답 시간이 없습니다. 로그에 포함하려면 NGINX 로그 형식을 업데이트하여 NGINX 설정 파일의 `http` 섹션에 다음 설정 블록을 추가하세요(`/etc/nginx/nginx.conf`).

```conf
http {
    #recommended log format
    log_format nginx '\$remote_addr - \$remote_user [\$time_local] '
                  '"\$request" \$status \$body_bytes_sent \$request_time '
                  '"\$http_referer" "\$http_user_agent"';

    access_log /var/log/nginx/access.log;
}
```

[1]: https://github.com/DataDog/integrations-core/blob/master/nginx/datadog_checks/nginx/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "도커" %}}

#### Docker

컨테이너에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에서 [자동탐지 통합 템플릿][1]을 Docker 레이블로 설정합니다.

```yaml
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:81/nginx_status/"}]'
```

**참고**: 이 인스턴스 설정은 NGINX 오픈 소스에서만 작동합니다. NGINX Plus를 사용하는 경우 해당 인스턴스 설정을 인라인으로 연결하세요.

#### 로그 수집


기본적으로 로그 수집은 Datadog 에이전트에서 비활성화되어 있습니다. 활성화하려면 [Docker 로그 수집][2]을 참고하세요.

그런 다음 Docker 레이블로 [로그 통합][3]을 설정하세요.

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"nginx","service":"nginx"}]'
```

[1]: https://docs.datadoghq.com/ko/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### 쿠버네티스(Kubernetes)

쿠버네티스에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

메트릭을 수집하려면 다음 파라미터와 값을 [자동탐지 템플릿][1]에 설정합니다. NGINX 포드의 쿠버네티스 어노테이션(아래 표시) 또는 [로컬 파일, ConfigMap, 키-값 저장소, Datadog Operator 매니페스트 또는 헬름(Helm) 차트][2]를 통해 이를 수행할 수 있습니다.

| 파라미터            | 값                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `["nginx"]`                                                                |
| `<INIT_CONFIG>`      | `[{}]`                                                                     |
| `<INSTANCE_CONFIG>`  | `[{"nginx_status_url": "http://%%host%%:18080/nginx_status"}]`             |

**주석 v1**(Datadog 에이전트 v7.36 이하용)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  annotations:
    ad.datadoghq.com/nginx.check_names: '["nginx"]'
    ad.datadoghq.com/nginx.init_configs: '[{}]'
    ad.datadoghq.com/nginx.instances: |
      [
        {
          "nginx_status_url":"http://%%host%%:81/nginx_status/"
        }
      ]
  labels:
    name: nginx
```

**주석 v2**(Datadog 에이전트 v7.36 이상용)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  annotations:
    ad.datadoghq.com/nginx.checks: |
      {
        "nginx": {
          "init_config": {},
          "instances": [
            {
              "nginx_status_url":"http://%%host%%:81/nginx_status/"
            }
          ]
        }
      }
  labels:
    name: nginx
```

**참고**: 이 인스턴스 설정은 NGINX 오픈 소스에서만 작동합니다. NGINX Plus를 사용하는 경우 해당 인스턴스 설정을 인라인으로 연결하세요.

#### 로그 수집


Datadog 에이전트에서 기본적으로 로그 수집이 비활성화되어 있습니다. 활성화하려면 [쿠버네티스 로그 수집]을 확인하세요.

그런 다음 [자동탐지 템플릿][1]에서 다음을 파라미터를 설정합니다. Redis 포드에서 쿠버네티스(Kubernetes) 어노테이션(아래 표시)을 사용하거나 [로컬 파일, ConfigMap, 키-값 저장소, Datadog Operator 매니페스트 또는 헬름(Helm) 차트][2]를 사용하여 이 작업을 수행할 수 있습니다.

| 파라미터            | 값                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<LOG_CONFIG>`       | `[{"source":"nginx","service":"nginx"}]`                                   |

**주석 v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  annotations:
    ad.datadoghq.com/nginx.logs: '[{"source":"nginx","service":"nginx"}]'
  labels:
    name: nginx
```

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

ECS에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에 [자동탐지 통합 템플릿][1]을 Docker 레이블로 설정하세요.

```json
{
  "containerDefinitions": [{
    "name": "nginx",
    "image": "nginx:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"nginx\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"nginx_status_url\":\"http://%%host%%:81/nginx_status/\"}]"
    }
  }]
}
```

**참고**: 이 인스턴스 설정은 NGINX 오픈 소스에서만 작동합니다. NGINX Plus를 사용하는 경우 해당 인스턴스 설정을 인라인으로 연결하세요.

##### 로그 수집


기본적으로 로그 수집은 Datadog 에이전트에서 비활성화되어 있습니다. 활성화하려면 [ECS 로그 수집][2]을 참조하세요.

그런 다음 Docker 레이블로 [로그 통합][3]을 설정하세요.

```yaml
{
  "containerDefinitions": [{
    "name": "nginx",
    "image": "nginx:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"nginx\",\"service\":\"nginx\"}]"
    }
  }]
}
```

[1]: https://docs.datadoghq.com/ko/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ko/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행][5]하고 점검 섹션에서 `nginx`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "nginx" >}}


표시된 메트릭이 모두 오픈 소스 NGINX 사용자가 사용할 수 있는 것은 아닙니다. [스텁 상태][2](오픈 소스 NGINX)와 [http 상태][3](NGINX Plus)의 모듈 참조를 비교하여 각 모듈에서 어떤 메트릭을 제공하는지 파악하세요.

몇 가지 오픈 소스 NGINX 메트릭은 NGINX Plus에서 이름이 다르지만 메트릭이 동일합니다.

| NGINX                          | NGINX Plus                   |
| ------------------------------ | ---------------------------- |
| `nginx.net.connections`        | `nginx.connections.active`   |
| `nginx.net.conn_opened_per_s`  | `nginx.connections.accepted` |
| `nginx.net.conn_dropped_per_s` | `nginx.connections.dropped`  |
| `nginx.net.request_per_s`      | `nginx.requests.total`       |

이들 메트릭이 정확히 같은 메트릭을 가리키지는 않지만 어느 정도 관련이 있습니다.

| NGINX               | NGINX Plus               |
| ------------------- | ------------------------ |
| `nginx.net.waiting` | `nginx.connections.idle` |

마지막으로, 이들 메트릭과 동등한 메트릭이 없습니다.

| 메트릭              | 설명                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------- |
| `nginx.net.reading` | nginx가 요청 헤더를 읽고 있는 현재 연결 수입니다.              |
| `nginx.net.writing` | nginx가 클라이언트에 응답을 다시 쓰고 있는 현재 연결 수입니다. |

### 이벤트

NGINX 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "nginx" >}}


## 트러블슈팅

- [로그에 예상 타임스탬프가 없는 이유는 무엇인가요?]][6]

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [NGINX 모니터링 방법][8]
- [NGINX 메트릭 수집 방법][9]
- [Datadog를 사용한 NGINX 모니터링 방법][10]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/nginx/images/nginx_dashboard.png
[2]: https://nginx.org/en/docs/http/ngx_http_stub_status_module.html
[3]: https://nginx.org/en/docs/http/ngx_http_status_module.html
[4]: https://www.nginx.com/blog/nginx-plus-r13-released
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/logs/faq/why-do-my-logs-not-have-the-expected-timestamp/
[7]: https://docs.datadoghq.com/ko/help/
[8]: https://www.datadoghq.com/blog/how-to-monitor-nginx
[9]: https://www.datadoghq.com/blog/how-to-collect-nginx-metrics/index.html
[10]: https://www.datadoghq.com/blog/how-to-monitor-nginx-with-datadog/index.html