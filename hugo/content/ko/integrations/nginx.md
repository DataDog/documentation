---
app_id: nginx
categories:
- 설정 및 배포
- 로그 수집
custom_kind: 통합
description: 연결 및 요청 메트릭을 모니터링하세요. NGINX Plus로 더 많은 메트릭을 확보하세요.
further_reading:
- link: https://www.datadoghq.com/blog/how-to-monitor-nginx
  tag: 블로그
  text: NGINX 모니터링 방법
- link: https://www.datadoghq.com/blog/how-to-collect-nginx-metrics/index.html
  tag: 블로그
  text: NGINX 메트릭 수집 방법
- link: https://www.datadoghq.com/blog/how-to-monitor-nginx-with-datadog/index.html
  tag: 블로그
  text: Datadog를 통한 NGINX 모니터링 방법
integration_version: 9.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Nginx
---
![NGINX 기본 대시보드](https://raw.githubusercontent.com/DataDog/integrations-core/master/nginx/images/nginx_dashboard.png)

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

- [Stub 상태 모듈](https://nginx.org/en/docs/http/ngx_http_stub_status_module.html) - 오픈 소스 NGINX용
- [HTTP 상태 모듈](https://nginx.org/en/docs/http/ngx_http_status_module.html) - NGINX Plus전용

#### NGINX 오픈 소스

오픈 소스 NGINX를 사용하는 경우 인스턴스에 스텁 상태 모듈이 없을 수 있습니다. **설정 ** 진행 전에 `nginx` 바이너리에 해당 모듈이 포함되어 있는지 확인하세요.

```shell
$ nginx -V 2>&1| grep -o http_stub_status_module
http_stub_status_module
```

명령 출력에 `http_stub_status_module`이 포함되지 않으면 해당 모듈이 포함된 NGINX 패키지를 설치해야 합니다. 직접 NGINX를 컴파일하여 모듈을 활성화할 수도 있지만, 대부분의 최신 리눅스(Linux) 배포에서는 다양한 추가 모듈 조합이 내장된 대체 NGINX 패키지를 제공합니다. 운영 체제의 NGINX 패키지를 확인하여 스텁 상태 모듈이 포함된 패키지를 찾으세요.

#### NGINX Plus

릴리스 13 이전의 NGINX Plus 패키지에는 http 상태 모듈이 포함되어 있습니다. NGINX Plus 릴리스 13 이상의 경우 상태 모듈은 더 이상 사용되지 않으며 대신 새로운 Plus API를 사용해야 합니다. 자세한 내용은 [공지사항](https://www.nginx.com/blog/nginx-plus-r13-released)을 참조하세요.

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

NGINX Plus 릴리스 15 이상에서는 `status` 모듈이 더 이상 사용되지 않습니다. 대신 [http_api_module](https://nginx.org/en/docs/http/ngx_http_api_module.html)을 사용하세요. 예를 들어, 기본 NGINX 설정 파일(`/etc/nginx/conf.d/default.conf`)에서 `/api` 엔드포인트를 활성화합니다.

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

### 설정

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

호스트에서 실행되는 에이전트 점검을 설정하려면 아래 지침을 따르세요. 컨테이너화된 환경의 경우 [도커(Docker)](?tab=docker#docker), [쿠버네티스(Kubernetes)](?tab=kubernetes#kubernetes) 또는 [ECS](?tab=ecs#ecs) 섹션을 참조하세요.

##### 메트릭 수집

1. `nginx.d/conf.yaml` 파일에서 `nginx_status_url` 파라미터를 `http://localhost:81/nginx_status/` 로 설정하여 [NGINX 메트릭](#metrics) 수집을 시작합니다. 사용 가능한 모든 설정 옵션은 [샘플 nginx.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/nginx/datadog_checks/nginx/data/conf.yaml.example)을 참조하세요.

   **NGINX Plus**:

   - NGINX Plus 릴리스 13 이상의 경우 `nginx.d/conf.yaml` 설정 파일에서 파라미터 `use_plus_api`를 `true`로 설정하세요.

   - Stream stats API 호출은 NGINX Plus에 기본적으로 포함됩니다. 사용하지 않으려면 `nginx.d/conf.yaml` 설정 파일에서 파라미터 `use_plus_api_stream`을 `false`로 설정하세요.

   - 예를 들어 `http_api_module`을 사용하는 경우 파라미터 `nginx_status_url`을 서버의 `/api` 위치로 설정합니다(예: `nginx.d/conf.yaml` 설정 파일).

     ```yaml
     nginx_status_url: http://localhost:8080/api
     ```

1. 선택 사항 - NGINX `vhost_traffic_status module`을 사용하는 경우 `nginx.d/conf.yaml` 설정 파일에서 파라미터 `use_vts`를 `true`로 설정합니다.

1. [Agent를 다시 시작](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)하여 NGINX 메트릭을 Datadog으로 전송합니다.

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. 이 설정 블록을 `nginx.d/conf.yaml` 파일에 추가하여 NGINX 로그 수집을 시작하세요.

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

   `service` 및 `path` 파라미터 값을 변경하고 환경에 맞게 설정합니다. 모든 가용 설정 옵션은 [샘플 nginx.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/nginx/datadog_checks/nginx/data/conf.yaml.example)을 참조하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

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

{{% /tab %}}

{{% tab "Docker" %}}

#### 도커(Docker)

컨테이너에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에서 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker)을 Docker 레이블로 설정합니다.

```yaml
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:81/nginx_status/"}]'
```

**참고**: 이 인스턴스 설정은 NGINX 오픈 소스에서만 작동합니다. NGINX Plus를 사용하는 경우 해당 인스턴스 설정을 인라인으로 연결하세요.

#### 로그 수집

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Docker 로그 수집](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation)을 참고하세요.

그런 다음 [로그 통합](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations)을 Docker 레이블로 설정합니다.

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"nginx","service":"nginx"}]'
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

#### Kubernetes

쿠버네티스에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

메트릭을 수집하려면 다음 파라미터와 값을 [Autodiscovery 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에 설정합니다. NGINX 포드의 Kubernetes 어노테이션(아래 표시) 또는 [로컬 파일, ConfigMap, 키-값 저장소, Datadog Operator 매니페스트 또는 Helm 차트](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration)를 통해 해당 작업을 수행할 수 있습니다.

| 파라미터            | 값                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `["nginx"]`                                                                |
| `<INIT_CONFIG>`      | `[{}]`                                                                     |
| `<INSTANCE_CONFIG>`  | `[{"nginx_status_url": "http://%%host%%:18080/nginx_status"}]`             |

**Annotations v1** (Datadog Agent \< v7.36용)

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

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup)을 참고하세요.

그런 다음 [Autodiscovery 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에서 다음 파라미터를 설정합니다. Redis 포드에서 Kubernetes 어노테이션(아래 표시)을 사용하거나 [로컬 파일, ConfigMap, 키-값 저장소, Datadog Operator 매니페스트 또는 Helm 차트](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration)를 사용하여 이 작업을 할 수 있습니다.

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

{{% /tab %}}

{{% tab "ECS" %}}

#### ECS

ECS에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에서 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker)을 Docker 레이블로 설정합니다.

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

Datadog Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [ECS 로그 수집](https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux)을 참고하세요.

그런 다음 [로그 통합](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations)을 Docker 레이블로 설정합니다.

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

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `nginx`을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **nginx.cache.bypass.bytes** <br>(gauge) | 프록시 서버에서 읽은 총 바이트 수<br>_byte로 표시됨_ |
| **nginx.cache.bypass.bytes_count** <br>(count) | 프록시 서버에서 읽은 총 바이트 수(개수로 표시)<br>_byte로 표시됨_ |
| **nginx.cache.bypass.bytes_written** <br>(gauge) | 캐시에 기록된 총 바이트 수<br>_byte로 표시됨_ |
| **nginx.cache.bypass.bytes_written_count** <br>(count) | 캐시에 기록된 총 바이트 수(개수로 표시)<br>_byte로 표시됨_ |
| **nginx.cache.bypass.responses** <br>(gauge) | 캐시에서 가져오지 않은 총 응답 수<br>_response로 표시됨_ |
| **nginx.cache.bypass.responses_count** <br>(count) | 캐시에서 가져오지 않은 총 응답 수(개수로 표시)<br>_response로 표시됨_ |
| **nginx.cache.bypass.responses_written** <br>(gauge) | 캐시에 기록된 총 응답 수<br>_response로 표시_ |
| **nginx.cache.bypass.responses_written_count** <br>(count) | 캐시에 기록되지 않은 총 응답 수(개수로 표시)<br>_response로 표시됨_ |
| **nginx.cache.cold** <br>(gauge) | 캐시 로더 프로세스가 아직 디스크에서 캐시로 데이터를 로드 중인지 여부를 나타내는 부울 값<br>_response로 표시됨_ |
| **nginx.cache.expired.bytes** <br>(gauge) | 프록시 서버에서 읽은 총 바이트 수<br>_byte로 표시_ |
| **nginx.cache.expired.bytes_count** <br>(count) | 프록시 서버에서 읽은 총 바이트 수(개수로 표시)<br>_byte로 표시_ |
| **nginx.cache.expired.bytes_written** <br>(gauge) | 캐시에 기록된 총 바이트 수<br>_byte로 표시_ |
| **nginx.cache.expired.bytes_written_count** <br>(count) | 캐시에 기록된 총 바이트 수(개수로 표시)<br>_byte로 표시_ |
| **nginx.cache.expired.responses** <br>(gauge) | 캐시에서 가져오지 않은 총 응답 수<br>_response로 표시_ |
| **nginx.cache.expired.responses_count** <br>(count) | 캐시에서 가져오지 않은 총 응답 수(개수로 표시)<br>_response로 표시_ |
| **nginx.cache.expired.responses_written** <br>(gauge) | 캐시에 기록된 총 응답 수<br>_response로 표시_ |
| **nginx.cache.expired.responses_written_count** <br>(count) | 캐시에 기록되지 않은 총 응답 수(개수로 표시)<br>_response로 표시_ |
| **nginx.cache.hit.bytes** <br>(gauge) | 캐시에서 읽은 총 바이트 수<br>_byte로 표시됨_ |
| **nginx.cache.hit.bytes_count** <br>(count) | 캐시에서 읽은 총 바이트 수(개수로 표시)<br>_byte로 표시됨_ |
| **nginx.cache.hit.responses** <br>(gauge) | 캐시에서 읽은 총 응답 수<br>_response로 표시됨_ |
| **nginx.cache.hit.responses_count** <br>(count) | 캐시에서 읽은 총 응답 수(개수로 표시)<br>_response로 표시됨_ |
| **nginx.cache.max_size** <br>(gauge) | 설정에 지정된 캐시 최대 크기 제한<br>_byte로 표시됨_ |
| **nginx.cache.miss.bytes** <br>(gauge) | 프록시 서버에서 읽은 총 바이트 수<br>_byte로 표시_ |
| **nginx.cache.miss.bytes_count** <br>(count) | 프록시 서버에서 읽은 총 바이트 수(개수로 표시)<br>_byte로 표시_ |
| **nginx.cache.miss.bytes_written** <br>(gauge) | 캐시에 기록된 총 바이트 수<br>_byte로 표시_ |
| **nginx.cache.miss.bytes_written_count** <br>(count) | 캐시에 기록된 총 바이트 수(개수로 표시)<br>_byte로 표시_ |
| **nginx.cache.miss.responses** <br>(gauge) | 캐시에서 가져오지 않은 총 응답 수<br>_response로 표시_ |
| **nginx.cache.miss.responses_count** <br>(count) | 캐시에서 가져오지 않은 총 응답 수(개수로 표시)<br>_response로 표시_ |
| **nginx.cache.miss.responses_written** <br>(gauge) | 캐시에 기록된 총 응답 수<br>_response로 표시_ |
| **nginx.cache.miss.responses_written_count** <br>(count) | 캐시에 기록된 총 응답 수<br>_response로 표시됨_ |
| **nginx.cache.revalidated.bytes** <br>(gauge) | 캐시에서 읽은 총 바이트 수<br>_byte로 표시_ |
| **nginx.cache.revalidated.bytes_count** <br>(count) | 캐시에서 읽은 총 바이트 수(개수로 표시)<br>_byte로 표시_ |
| **nginx.cache.revalidated.responses** <br>(gauge) | 캐시에서 읽은 총 응답 수<br>_response로 표시_ |
| **nginx.cache.revalidated.responses_count** <br>(count) | 캐시에서 읽은 총 응답 수(개수로 표시)<br>_response로 표시_ |
| **nginx.cache.size** <br>(gauge) | 캐시의 현재 크기<br>_response로 표시됨_ |
| **nginx.cache.stale.bytes** <br>(gauge) | 캐시에서 읽은 총 바이트 수<br>_byte로 표시_ |
| **nginx.cache.stale.bytes_count** <br>(count) | 캐시에서 읽은 총 바이트 수(개수로 표시)<br>_byte로 표시_ |
| **nginx.cache.stale.responses** <br>(gauge) | 캐시에서 읽은 총 응답 수<br>_response로 표시_ |
| **nginx.cache.stale.responses_count** <br>(count) | 캐시에서 읽은 총 응답 수(개수로 표시)<br>_response로 표시_ |
| **nginx.cache.updating.bytes** <br>(gauge) | 캐시에서 읽은 총 바이트 수<br>_byte로 표시_ |
| **nginx.cache.updating.bytes_count** <br>(count) | 캐시에서 읽은 총 바이트 수(개수로 표시)<br>_byte로 표시_ |
| **nginx.cache.updating.responses** <br>(gauge) | 캐시에서 읽은 총 응답 수<br>_response로 표시_ |
| **nginx.cache.updating.responses_count** <br>(count) | 캐시에서 읽은 총 응답 수(개수로 표시)<br>_response로 표시_ |
| **nginx.connections.accepted** <br>(gauge) | 허용된 총 클라이언트 연결 수.<br>_connection으로 표시됨_ |
| **nginx.connections.accepted_count** <br>(count) | 허용된 총 클라이언트 연결 수(개수로 표시).<br>_connection으로 표시됨_ |
| **nginx.connections.active** <br>(gauge) | 현재 활성화된 클라이언트 연결 수.<br>_connection으로 표시됨_ |
| **nginx.connections.dropped** <br>(gauge) | 삭제된 총 클라이언트 연결 수.<br>_connection으로 표시됨_ |
| **nginx.connections.dropped_count** <br>(count) | 삭제된 총 클라이언트 연결 수(개수로 표시).<br>_connection으로 표시됨_ |
| **nginx.connections.idle** <br>(gauge) | 현재 유휴 상태인 클라이언트 연결 수.<br>_connection으로 표시됨_ |
| **nginx.generation** <br>(gauge) | 설정 재로드 총 횟수<br>_refresh로 표시됨_ |
| **nginx.generation_count** <br>(count) | 설정 재로드 총 횟수(개수로 표시)<br>_refresh로 표시됨_ |
| **nginx.limit_conn.passed** <br>(count) | 제한되지 않았고 제한 대상으로 간주되지도 않은 총 연결 수.<br>_connection으로 표시됨_ |
| **nginx.limit_conn.rejected** <br>(count) | 거부된 총 연결 수.<br>_connection으로 표시됨_ |
| **nginx.limit_conn.rejected_dry_run** <br>(count) | 드라이 런 모드에서 거부 대상으로 간주된 총 연결 수.<br>_connection으로 표시됨_ |
| **nginx.limit_req.delayed** <br>(count) | 지연된 총 요청 수.<br>_request로 표시됨_ |
| **nginx.limit_req.delayed_dry_run** <br>(count) | 드라이 런 모드에서 지연 대상으로 간주된 총 요청 수.<br>_request로 표시됨_ |
| **nginx.limit_req.passed** <br>(count) | 제한되지 않았고 제한 대상으로 간주되지도 않은 총 요청 수.<br>_request로 표시됨_ |
| **nginx.limit_req.rejected** <br>(count) | 거부된 총 요청 수.<br>_request로 표시됨_ |
| **nginx.limit_req.rejected_dry_run** <br>(count) | 드라이 런 모드에서 거부 대상으로 간주된 총 요청 수.<br>_request로 표시됨_ |
| **nginx.load_timestamp** <br>(gauge) | 구성을 마지막으로 재로드한 시간(Epoch 이후 경과 시간)<br>_millisecond로 표시됨_ |
| **nginx.location_zone.discarded** <br>(count) | 응답을 보내지 않고 완료된 총 요청 수.<br>_request로 표시됨_ |
| **nginx.location_zone.received** <br>(count) | 클라이언트로부터 수신된 총 바이트 수.<br>_byte로 표시됨_ |
| **nginx.location_zone.requests** <br>(count) | 클라이언트로부터 수신된 총 클라이언트 요청 수.<br>_request로 표시됨_ |
| **nginx.location_zone.responses.1xx** <br>(count) | 상태 코드가 1xx인 총 응답 수.<br>_response로 표시됨_ |
| **nginx.location_zone.responses.2xx** <br>(count) | 상태 코드가 2xx인 총 응답 수.<br>_response로 표시됨_ |
| **nginx.location_zone.responses.3xx** <br>(count) | 상태 코드가 3xx인 총 응답 수.<br>_response로 표시됨_ |
| **nginx.location_zone.responses.4xx** <br>(count) | 상태 코드가 4xx인 총 응답 수.<br>_response로 표시됨_ |
| **nginx.location_zone.responses.5xx** <br>(count) | 상태 코드가 5xx인 총 응답 수.<br>_response로 표시됨_ |
| **nginx.location_zone.responses.code** <br>(count) | 각 상태 코드당 총 응답 수.<br>_response로 표시됨_ |
| **nginx.location_zone.responses.total** <br>(count) | 클라이언트에 전송된 총 응답 수<br>_response로 표시_ |
| **nginx.location_zone.sent** <br>(count) | 클라이언트에 전송된 총 바이트 수.<br>_byte로 표시됨_ |
| **nginx.net.conn_dropped_per_s** <br>(rate) | 연결 삭제률(오픈 소스 NGINX에 포함).<br>_connection으로 표시됨_ |
| **nginx.net.conn_opened_per_s** <br>(rate) | 연결 생성률(오픈 소스 NGINX에 포함).<br>_connection으로 표시됨_ |
| **nginx.net.connections** <br>(gauge) | 활성화된 연결의 총 수(오픈 소스 NGINX에 포함).<br>_connection으로 표시됨_ |
| **nginx.net.reading** <br>(gauge) | 클라이언트 요청을 읽은 연결 수(오픈 소스 NGINX에 포함).<br>_connection으로 표시됨_ |
| **nginx.net.request_per_s** <br>(rate) | 처리된 요청률. 성공 및 실패 요청을 모두 측정(오픈 소스 NGINX에 포함).<br>_request로 표시됨_ |
| **nginx.net.waiting** <br>(gauge) | 작업 대기 중인 keep-alive 연결 수(오픈 소스 NGINX에 포함).<br>_connection으로 표시됨_ |
| **nginx.net.writing** <br>(gauge) | 업스트림 응답 대기 중 및/또는 클라이언트에 응답을 작성 중인 연결 수(오픈 소스 NGINX에 포함).<br>_connection으로 표시됨_ |
| **nginx.pid** <br>(gauge) | 상태 요청을 처리한 작업자 프로세스의 ID.|
| **nginx.ppid** <br>(gauge) | 작업자 프로세스를 시작한 마스터 프로세스의 ID.|
| **nginx.processes.respawned** <br>(gauge) | 비정상적으로 종료되어 재생성된 자식 프로세스의 총 수.<br>_process로 표시됨_ |
| **nginx.processes.respawned_count** <br>(count) | 비정상적으로 종료되어 재생성된 자식 프로세스의 총 수(개수로 표시).<br>_process로 표시됨_ |
| **nginx.requests.current** <br>(gauge) | 현재 클라이언트 요청 수<br>_request로 표시됨_ |
| **nginx.requests.total** <br>(gauge) | 총 클라이언트 요청 수<br>_request로 표시됨_ |
| **nginx.requests.total_count** <br>(count) | 총 클라이언트 요청 수(개수로 표시).<br>_request로 표시됨_ |
| **nginx.resolver.requests.addr** <br>(count) | 주소를 이름으로 변환하기 위한 총 요청 수.<br>_request로 표시됨_ |
| **nginx.resolver.requests.name** <br>(count) | 이름을 주소로 변환하기 위한 총 요청 수.<br>_request로 표시됨_ |
| **nginx.resolver.requests.srv** <br>(count) | SRV 레코드를 변환하기 위한 총 요청 수.<br>_request로 표시됨_ |
| **nginx.resolver.responses.formerr** <br>(count) | 총 FORMERR(형식 오류) 응답 수.<br>_response로 표시됨_ |
| **nginx.resolver.responses.noerror** <br>(count) | 총 성공 응답 수.<br>_response로 표시됨_ |
| **nginx.resolver.responses.notimp** <br>(count) | 총 NOTIMP(구현되지 않음) 응답 수.<br>_response로 표시됨_ |
| **nginx.resolver.responses.nxdomain** <br>(count) | 총 NXDOMAIN(호스트를 찾을 수 없음) 응답 수.<br>_response로 표시됨_ |
| **nginx.resolver.responses.refused** <br>(count) | 총 REFUSED(작업 거부) 응답 수.<br>_response로 표시됨_ |
| **nginx.resolver.responses.servfail** <br>(count) | 총 SERVFAIL(서버 장애) 응답 수.<br>_response로 표시됨_ |
| **nginx.resolver.responses.timedout** <br>(count) | 타임아웃된 총 요청 수<br>_request로 표시됨_ |
| **nginx.resolver.responses.unknown** <br>(count) | 알 수 없는 오류로 완료된 총 요청 수.<br>_request로 표시됨_ |
| **nginx.server_zone.discarded** <br>(gauge) | 응답을 보내지 않고 완료된 총 요청 수.<br>_request로 표시_ |
| **nginx.server_zone.discarded_count** <br>(count) | 응답을 보내지 않고 완료된 총 요청 수(개수로 표시).<br>_request로 표시됨_ |
| **nginx.server_zone.processing** <br>(gauge) | 현재 처리 중인 클라이언트 요청 수.<br>_request로 표시됨_ |
| **nginx.server_zone.received** <br>(gauge) | 클라이언트로부터 수신된 데이터 총량.<br>_byte로 표시됨_ |
| **nginx.server_zone.received_count** <br>(count) | 클라이언트로부터 수신된 데이터 총량(개수로 표시).<br>_byte로 표시됨_ |
| **nginx.server_zone.requests** <br>(gauge) | 클라이언트로부터 수신된 총 클라이언트 요청 수.<br>_request로 표시_ |
| **nginx.server_zone.requests_count** <br>(count) | 클라이언트로부터 수신된 총 클라이언트 요청 수(개수로 표시).<br>_request로 표시됨_ |
| **nginx.server_zone.responses.1xx** <br>(gauge) | 상태 코드가 1xx인 응답 수.<br>_response로 표시됨_ |
| **nginx.server_zone.responses.1xx_count** <br>(count) | 상태 코드가 1xx인 응답 수(개수로 표시).<br>_response로 표시됨_ |
| **nginx.server_zone.responses.2xx** <br>(gauge) | 상태 코드가 2xx인 응답 수.<br>_response로 표시됨_ |
| **nginx.server_zone.responses.2xx_count** <br>(count) | 상태 코드가 2xx인 응답 수(개수로 표시).<br>_response로 표시됨_ |
| **nginx.server_zone.responses.3xx** <br>(gauge) | 상태 코드가 3xx인 응답 수.<br>_response로 표시됨_ |
| **nginx.server_zone.responses.3xx_count** <br>(count) | 상태 코드가 3xx인 응답 수(개수로 표시).<br>_response로 표시됨_ |
| **nginx.server_zone.responses.4xx** <br>(gauge) | 상태 코드가 4xx인 응답 수.<br>_response로 표시됨_ |
| **nginx.server_zone.responses.4xx_count** <br>(count) | 상태 코드가 4xx인 응답 수(개수로 표시).<br>_response로 표시됨_ |
| **nginx.server_zone.responses.5xx** <br>(gauge) | 상태 코드가 5xx인 응답 수.<br>_response로 표시됨_ |
| **nginx.server_zone.responses.5xx_count** <br>(count) | 상태 코드가 5xx인 응답 수(개수로 표시).<br>_response로 표시됨_ |
| **nginx.server_zone.responses.code** <br>(count) | 각 상태 코드당 총 응답 수(상태 코드 번호로 태그됨).<br>_response로 표시됨_ |
| **nginx.server_zone.responses.total** <br>(gauge) | 클라이언트에 전송된 총 응답 수<br>_response로 표시됨_ |
| **nginx.server_zone.responses.total_count** <br>(count) | 클라이언트에 전송된 총 응답 수(개수로 표시)<br>_response로 표시됨_ |
| **nginx.server_zone.sent** <br>(gauge) | 클라이언트에 전송된 데이터 총량.<br>_byte로 표시됨_ |
| **nginx.server_zone.sent_count** <br>(count) | 클라이언트로 전송된 데이터 총량(개수로 표시).<br>_byte로 표시됨_ |
| **nginx.slab.pages.free** <br>(gauge) | 현재 사용 가능한 메모리 페이지 수<br>_page로 표시됨_ |
| **nginx.slab.pages.used** <br>(gauge) | 현재 사용된 메모리 페이지 수<br>_page로 표시됨_ |
| **nginx.slab.slot.fails** <br>(gauge) | 지정된 크기의 메모리 할당에 실패한 횟수<br>_request로 표시됨_ |
| **nginx.slab.slot.fails_count** <br>(count) | 지정된 크기의 메모리 할당에 실패한 횟수(개수로 표시)<br>_request로 표시됨_ |
| **nginx.slab.slot.free** <br>(gauge) | 현재 사용 가능한 메모리 슬롯 수|
| **nginx.slab.slot.reqs** <br>(gauge) | 지정된 크기의 메모리 할당 시도 총 횟수<br>_request로 표시됨_ |
| **nginx.slab.slot.reqs_count** <br>(count) | 지정된 크기의 메모리 할당 시도 총 횟수(개수로 표시)<br>_request로 표시됨_ |
| **nginx.slab.slot.used** <br>(gauge) | 현재 사용 중인 메모리 슬롯 수|
| **nginx.ssl.handshakes** <br>(gauge) | 성공한 SSL 핸드셰이크 총 횟수.|
| **nginx.ssl.handshakes_count** <br>(count) | 성공한 SSL 핸드셰이크 총 횟수(개수로 표시).|
| **nginx.ssl.handshakes_failed** <br>(gauge) | 실패한 SSL 핸드셰이크 총 횟수.|
| **nginx.ssl.handshakes_failed_count** <br>(count) | 실패한 SSL 핸드셰이크 총 횟수(개수로 표시).|
| **nginx.ssl.session_reuses** <br>(gauge) | SSL 핸드셰이크 도중 세션 재사용 총 횟수.|
| **nginx.ssl.session_reuses_count** <br>(count) | SSL 핸드셰이크 도중 세션 재사용 총 횟수(개수로 표시).|
| **nginx.stream.limit_conn.passed** <br>(count) | 제한되지 않았고 제한 대상으로 간주되지도 않은 총 연결 수.<br>_connection으로 표시_ |
| **nginx.stream.limit_conn.rejected** <br>(count) | 거부된 총 연결 수.<br>_connection으로 표시_ |
| **nginx.stream.limit_conn.rejected_dry_run** <br>(count) | 드라이 런 모드에서 거부 대상으로 간주된 총 연결 수.<br>_connection으로 표시_ |
| **nginx.stream.server_zone.connections** <br>(gauge) | 클라이언트가 수락한 총 연결 수.<br>_connection으로 표시됨_ |
| **nginx.stream.server_zone.connections_count** <br>(count) | 클라이언트가 수락한 총 연결 수(개수로 표시).<br>_connection으로 표시됨_ |
| **nginx.stream.server_zone.discarded** <br>(gauge) | 응답을 보내지 않고 완료된 총 요청 수.<br>_request로 표시_ |
| **nginx.stream.server_zone.discarded_count** <br>(count) | 응답을 보내지 않고 완료된 총 요청 수(개수로 표시).<br>_request로 표시_ |
| **nginx.stream.server_zone.processing** <br>(gauge) | 현재 처리 중인 클라이언트 요청 수.<br>_request로 표시_ |
| **nginx.stream.server_zone.received** <br>(gauge) | 클라이언트로부터 수신된 데이터 총량.<br>_byte로 표시_ |
| **nginx.stream.server_zone.received_count** <br>(count) | 클라이언트로부터 수신된 데이터 총량(개수로 표시).<br>_byte로 표시_ |
| **nginx.stream.server_zone.sent** <br>(gauge) | 클라이언트에 전송된 데이터 총량.<br>_byte로 표시_ |
| **nginx.stream.server_zone.sent_count** <br>(count) | 클라이언트로 전송된 데이터 총량(개수로 표시).<br>_byte로 표시_ |
| **nginx.stream.server_zone.sessions.2xx** <br>(gauge) | 상태 코드가 2xx인 응답 수.<br>_session으로 표시됨_ |
| **nginx.stream.server_zone.sessions.2xx_count** <br>(count) | 상태 코드가 2xx인 응답 수(개수로 표시).<br>_session으로 표시됨_ |
| **nginx.stream.server_zone.sessions.4xx** <br>(gauge) | 상태 코드가 4xx인 응답 수.<br>_session으로 표시됨_ |
| **nginx.stream.server_zone.sessions.4xx_count** <br>(count) | 상태 코드가 4xx인 응답 수(개수로 표시).<br>_session으로 표시됨_ |
| **nginx.stream.server_zone.sessions.5xx** <br>(gauge) | 상태 코드가 5xx인 응답 수.<br>_session으로 표시됨_ |
| **nginx.stream.server_zone.sessions.5xx_count** <br>(count) | 상태 코드가 5xx인 응답 수(개수로 표시).<br>_session으로 표시됨_ |
| **nginx.stream.server_zone.sessions.total** <br>(gauge) | 클라이언트에 전송된 총 응답 수<br>_session으로 표시됨_ |
| **nginx.stream.server_zone.sessions.total_count** <br>(count) | 클라이언트에 전송된 총 응답 수(개수로 표시)<br>_session으로 표시됨_ |
| **nginx.stream.upstream.peers.active** <br>(gauge) | 현재 연결 수<br>_connection으로 표시됨_ |
| **nginx.stream.upstream.peers.backup** <br>(gauge) | 서버가 백업 서버인지 여부를 나타내는 부울 값.|
| **nginx.stream.upstream.peers.connect_time** <br>(gauge) | 이 서버에 연결하는 데 걸린 평균 시간.<br>_millisecond로 표시됨_ |
| **nginx.stream.upstream.peers.connections** <br>(gauge) | 이 서버로 포워딩된 총 클라이언트 연결 수.<br>_connection으로 표시됨_ |
| **nginx.stream.upstream.peers.connections_count** <br>(count) | 이 서버로 포워딩된 총 클라이언트 연결 수(개수로 표시).<br>_connection으로 표시됨_ |
| **nginx.stream.upstream.peers.downstart** <br>(gauge) | 서버가 'unavail', 'checking' 또는 'unhealthy' 상태가 된 시간(Epoch 이후 경과 시간)<br>_millisecond로 표시됨_ |
| **nginx.stream.upstream.peers.downtime** <br>(gauge) | 서버가 'unavail', 'checking' 또는 'unhealthy' 상태였던 총 시간<br>_millisecond로 표시됨_ |
| **nginx.stream.upstream.peers.downtime_count** <br>(count) | 서버가 'unavail', 'checking' 또는 'unhealthy' 상태였던 총 시간<br>_millisecond로 표시_ |
| **nginx.stream.upstream.peers.fails** <br>(gauge) | 이 서버와의 통신 시도에 실패한 총 횟수.<br>_error로 표시됨_ |
| **nginx.stream.upstream.peers.fails_count** <br>(count) | 이 서버와의 통신 시도에 실패한 총 횟수(개수로 표시).<br>_error로 표시됨_ |
| **nginx.stream.upstream.peers.first_byte_time** <br>(gauge) | 이 서버로부터 첫 데이터 바이트를 수신하는 데 걸린 평균 시간.<br>_millisecond로 표시됨_ |
| **nginx.stream.upstream.peers.health_checks.checks** <br>(gauge) | 실행한 서비스 상태 확인 요청의 총수.<br>_request로 표시됨_ |
| **nginx.stream.upstream.peers.health_checks.checks_count** <br>(count) | 실행한 서비스 상태 확인 요청의 총수(개수로 표시).<br>_request로 표시됨_ |
| **nginx.stream.upstream.peers.health_checks.fails** <br>(gauge) | 실패한 서비스 상태 확인 횟수.<br>_error로 표시됨_ |
| **nginx.stream.upstream.peers.health_checks.fails_count** <br>(count) | 실패한 서비스 상태 확인 횟수(개수로 표시).<br>_error로 표시됨_ |
| **nginx.stream.upstream.peers.health_checks.last_passed** <br>(gauge) | 마지막 서비스 상태 확인 요청이 성공하여 테스트를 통과했는지 여부를 나타내는 부울.|
| **nginx.stream.upstream.peers.health_checks.unhealthy** <br>(gauge) | 서버가 'unhealthy' 상태가 된 횟수('unhealthy' 상태).|
| **nginx.stream.upstream.peers.health_checks.unhealthy_count** <br>(count) | 서버가 'unhealthy' 상태가 된 횟수('unhealthy' 상태)(개수로 표시).|
| **nginx.stream.upstream.peers.id** <br>(gauge) | 서버의 ID.|
| **nginx.stream.upstream.peers.max_conns** <br>(gauge) | 서버의 max_conns 한도.<br>_connection으로 표시됨_ |
| **nginx.stream.upstream.peers.received** <br>(gauge) | 이 서버로부터 수신된 총 바이트 수.<br>_byte로 표시됨_ |
| **nginx.stream.upstream.peers.received_count** <br>(count) | 이 서버로부터 수신된 총 바이트 수(개수로 표시).<br>_byte로 표시됨_ |
| **nginx.stream.upstream.peers.response_time** <br>(gauge) | 이 서버로부터 마지막 데이터 바이트를 수신하는 데 걸린 평균 시간.<br>_millisecond로 표시됨_ |
| **nginx.stream.upstream.peers.response_time_histogram** <br>(gauge) | 이 서버로부터 마지막 데이터 바이트를 수신하는 데 걸린 평균 시간(히스토그램).<br>_millisecond로 표시됨_ |
| **nginx.stream.upstream.peers.response_time_histogram.avg** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **nginx.stream.upstream.peers.response_time_histogram.count** <br>(rate) | <br>_millisecond로 표시됨_ |
| **nginx.stream.upstream.peers.response_time_histogram.max** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **nginx.stream.upstream.peers.response_time_histogram.median** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **nginx.stream.upstream.peers.selected** <br>(gauge) | 서버가 연결 처리를 위해 마지막으로 선택된 시간(Epoch 이후 경과 시간).<br>_millisecond로 표시됨_ |
| **nginx.stream.upstream.peers.sent** <br>(gauge) | 이 서버에 전송한 총 바이트 수.<br>_byte로 표시됨_ |
| **nginx.stream.upstream.peers.sent_count** <br>(count) | 이 서버에 전송한 총 바이트 수(개수로 표시).<br>_byte로 표시됨_ |
| **nginx.stream.upstream.peers.unavail** <br>(gauge) | 서버가 클라이언트 연결에 사용할 수 없게 된 횟수('unavail' 상태).|
| **nginx.stream.upstream.peers.unavail_count** <br>(count) | 서버가 클라이언트 연결에 사용할 수 없게 된 횟수('unavail' 상태)(개수로 표시).|
| **nginx.stream.upstream.peers.weight** <br>(gauge) | 서버 가중치.|
| **nginx.stream.upstream.zombies** <br>(gauge) | 그룹에서 제거되었지만 아직 활성 클라이언트 연결을 처리 중인 현재 서버 수.<br>_host로 표시됨_ |
| **nginx.stream.zone_sync.status.bytes_in** <br>(gauge) | 이 노드가 수신한 바이트 수.<br>_byte로 표시됨_ |
| **nginx.stream.zone_sync.status.bytes_out** <br>(gauge) | 이 노드가 전송한 바이트 수.<br>_byte로 표시됨_ |
| **nginx.stream.zone_sync.status.msgs_in** <br>(gauge) | 이 노드가 수신한 메시지 수.<br>_byte로 표시됨_ |
| **nginx.stream.zone_sync.status.msgs_out** <br>(gauge) | 이 노드가 전송한 메시지 수.<br>_message로 표시됨_ |
| **nginx.stream.zone_sync.status.nodes_online** <br>(gauge) | 이 노드가 연결된 피어 수.|
| **nginx.stream.zone_sync.zone.records_pending** <br>(gauge) | 클러스터로 전송해야 하는 레코드 수.<br>_record로 표시됨_ |
| **nginx.stream.zone_sync.zone.records_total** <br>(gauge) | 공유 메모리 영역에 저장된 레코드 수.<br>_record로 표시됨_ |
| **nginx.stream.zone_sync.zone.records_total_count** <br>(count) | 공유 메모리 영역에 저장된 레코드의 총수.<br>_record로 표시됨_ |
| **nginx.timestamp** <br>(gauge) | Epoch 이후 경과된 현재 시간<br>_millisecond로 표시됨_ |
| **nginx.upstream.keepalive** <br>(gauge) | 현재 유휴 keep-alive 연결 수.<br>_connection로 표시됨_ |
| **nginx.upstream.peers.active** <br>(gauge) | 현재 활성 연결 수.<br>_connection로 표시됨_ |
| **nginx.upstream.peers.backup** <br>(gauge) | 서버가 백업 서버인지 여부를 나타내는 부울 값.|
| **nginx.upstream.peers.downstart** <br>(gauge) | 서버가 'unavail' 또는 'unhealthy' 상태가 된 시간(Epoch 이후 경과 시간)<br>_millisecond로 표시됨_ |
| **nginx.upstream.peers.downtime** <br>(gauge) | 서버가 'unavail' 또는 'unhealthy' 상태였던 총 시간<br>_millisecond로 표시됨_ |
| **nginx.upstream.peers.downtime_count** <br>(count) | 서버가 'unavail' 또는 'unhealthy' 상태였던 총 시간<br>_millisecond로 표시_ |
| **nginx.upstream.peers.fails** <br>(gauge) | 이 서버와의 통신 시도에 실패한 총 횟수.|
| **nginx.upstream.peers.fails_count** <br>(count) | 이 서버와의 통신 시도에 실패한 총 횟수(개수로 표시).|
| **nginx.upstream.peers.header_time** <br>(gauge) | 업스트림 서버로부터 응답 헤더를 수신하는 데 소요된 총 시간.<br>_millisecond로 표시됨_ |
| **nginx.upstream.peers.health_checks.checks** <br>(gauge) | 실행한 서비스 상태 확인 요청의 총수.|
| **nginx.upstream.peers.health_checks.checks_count** <br>(count) | 실행한 서비스 상태 확인 요청의 총수(개수로 표시).|
| **nginx.upstream.peers.health_checks.fails** <br>(gauge) | 실패한 서비스 상태 확인 횟수.|
| **nginx.upstream.peers.health_checks.fails_count** <br>(count) | 실패한 서비스 상태 확인 횟수(개수로 표시).|
| **nginx.upstream.peers.health_checks.last_passed** <br>(gauge) | 마지막 상태 확인 요청이 성공하여 테스트를 통과했는지 여부를 나타내는 부울.|
| **nginx.upstream.peers.health_checks.unhealthy** <br>(gauge) | 서버가 'unhealthy' 상태가 된 횟수('unhealthy' 상태).|
| **nginx.upstream.peers.health_checks.unhealthy_count** <br>(count) | 서버가 'unhealthy' 상태가 된 횟수('unhealthy' 상태, 개수로 표시).|
| **nginx.upstream.peers.id** <br>(gauge) | 서버의 ID.|
| **nginx.upstream.peers.max_conns** <br>(gauge) | 이 서버의 max_conns 한도.<br>_connection으로 표시됨_ |
| **nginx.upstream.peers.received** <br>(gauge) | 이 서버로부터 수신된 데이터 총량.<br>_byte로 표시됨_ |
| **nginx.upstream.peers.received_count** <br>(count) | 이 서버로부터 수신된 데이터 총량(개수로 표시).<br>_byte로 표시됨_ |
| **nginx.upstream.peers.requests** <br>(gauge) | 이 서버로 포워딩된 총 클라이언트 요청 수.<br>_request로 표시됨_ |
| **nginx.upstream.peers.requests_count** <br>(count) | 이 서버로 포워딩된 총 클라이언트 요청 수(개수로 표시).<br>_request로 표시됨_ |
| **nginx.upstream.peers.response_time** <br>(gauge) | 이 서버에서 마지막 데이터 바이트를 수신하는 데 걸린 평균 시간.<br>_millisecond로 표시_ |
| **nginx.upstream.peers.response_time_histogram** <br>(gauge) | 이 서버로부터 마지막 데이터 바이트를 수신하는 데 걸린 평균 시간.<br>_millisecond로 표시_ |
| **nginx.upstream.peers.response_time_histogram.avg** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **nginx.upstream.peers.response_time_histogram.count** <br>(rate) | <br>_millisecond로 표시됨_ |
| **nginx.upstream.peers.response_time_histogram.max** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **nginx.upstream.peers.response_time_histogram.median** <br>(gauge) | <br>_millisecond로 표시됨_ |
| **nginx.upstream.peers.responses.1xx** <br>(gauge) | 이 서버로부터 수신한 상태 코드 1xx 응답의 수.<br>_response로 표시됨_ |
| **nginx.upstream.peers.responses.1xx_count** <br>(count) | 이 서버로부터 수신한 상태 코드 1xx 응답의 수(개수로 표시).<br>_response로 표시됨_ |
| **nginx.upstream.peers.responses.2xx** <br>(gauge) | 이 서버로부터 수신한 상태 코드 2xx 응답의 수.<br>_response로 표시됨_ |
| **nginx.upstream.peers.responses.2xx_count** <br>(count) | 이 서버로부터 수신한 상태 코드 2xx 응답의 수(개수로 표시).<br>_response로 표시됨_ |
| **nginx.upstream.peers.responses.3xx** <br>(gauge) | 이 서버로부터 수신한 상태 코드 3xx 응답의 수.<br>_response로 표시됨_ |
| **nginx.upstream.peers.responses.3xx_count** <br>(count) | 이 서버로부터 수신한 상태 코드 3xx 응답의 수(개수로 표시).<br>_response로 표시됨_ |
| **nginx.upstream.peers.responses.4xx** <br>(gauge) | 이 서버로부터 수신한 상태 코드 4xx 응답의 수.<br>_response로 표시됨_ |
| **nginx.upstream.peers.responses.4xx_count** <br>(count) | 이 서버로부터 수신한 상태 코드 4xx 응답의 수(개수로 표시).<br>_response로 표시됨_ |
| **nginx.upstream.peers.responses.5xx** <br>(gauge) | 이 서버로부터 수신한 상태 코드 5xx 응답의 수.<br>_response로 표시됨_ |
| **nginx.upstream.peers.responses.5xx_count** <br>(count) | 상태 코드가 5xx인 응답 수(개수로 표시).<br>_response로 표시_ |
| **nginx.upstream.peers.responses.code** <br>(count) | 각 상태 코드별 이 서버의 총 응답 수.<br>_response로 표시됨_ |
| **nginx.upstream.peers.responses.total** <br>(gauge) | 이 서버로부터 받은 총 응답 수.<br>_response로 표시됨_ |
| **nginx.upstream.peers.responses.total_count** <br>(count) | 이 서버로부터 받은 총 응답 수(개수로 표시).<br>_response로 표시됨_ |
| **nginx.upstream.peers.selected** <br>(gauge) | 서버가 연결 처리를 위해 마지막으로 선택된 시간(Epoch 이후 경과 시간)(1.7.5).<br>_millisecond로 표시됨_ |
| **nginx.upstream.peers.sent** <br>(gauge) | 이 서버로 전송된 데이터 총량.<br>_byte로 표시됨_ |
| **nginx.upstream.peers.sent_count** <br>(count) | 이 서버로 전송된 데이터 총량(개수로 표시).<br>_byte로 표시됨_ |
| **nginx.upstream.peers.unavail** <br>(gauge) | 실패한 시도의 횟수가 max_fails 임계값에 도달하여 서버가 클라이언트 요청을 처리할 수 없게 된 횟수('unavail' 상태).|
| **nginx.upstream.peers.unavail_count** <br>(count) | 실패한 시도의 횟수가 max_fails 임계값에 도달하여 서버가 클라이언트 요청을 처리할 수 없게 된 횟수('unavail' 상태)(개수로 표시).|
| **nginx.upstream.peers.weight** <br>(gauge) | 서버 가중치.|
| **nginx.upstream.zombies** <br>(gauge) | 그룹에서 제거되었지만 아직 활성 클라이언트 연결을 처리 중인 현재 서버 수.<br>_host로 표시_ |
| **nginx.version** <br>(gauge) | NGINX 버전.|

### 이벤트

NGINX 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

**nginx.can_connect**

Agent가 모니터링되는 NGINX 인스턴스에 연결하여 메트릭을 수집할 수 없는 경우 `CRITICAL`을 반환합니다. 그렇지 않으면 `OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

- [로그에 예상 타임스탬프가 없는 이유는 무엇인가요?](https://docs.datadoghq.com/logs/faq/why-do-my-logs-not-have-the-expected-timestamp/)

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [NGINX 모니터링 방법](https://www.datadoghq.com/blog/how-to-monitor-nginx)
- [NGINX 메트릭 수집 방법](https://www.datadoghq.com/blog/how-to-collect-nginx-metrics/index.html)
- [Datadog을 사용한 NGINX 모니터링 방법](https://www.datadoghq.com/blog/how-to-monitor-nginx-with-datadog/index.html)