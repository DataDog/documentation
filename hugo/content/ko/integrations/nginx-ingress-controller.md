---
aliases:
- /ko/integrations/nginx_ingress_controller
app_id: nginx-ingress-controller
categories:
- 컨테이너
- Kubernetes
- 로그 수집
- 네트워크
- 오케스트레이션
custom_kind: 통합
description: NGINX 수신 컨트롤러와 임베디드 NGINX에 관련된 메트릭을 모니터링합니다.
integration_version: 5.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: nginx-ingress-controller
---
## 개요

본 점검은 Kubernetes [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx)를 모니터링합니다. F5 NGINX Ingress Controller를 모니터링하려면 [Datadog Prometheus 통합](https://docs.datadoghq.com/agent/kubernetes/prometheus/)을 설정하세요. 이를 통해 [NGINX Prometheus Exporter](https://github.com/nginxinc/nginx-prometheus-exporter#exported-metrics)가 제공한 목록 중에서 원하는 메트릭을 모니터링할 수 있습니다.

## 설정

### 설치

`nginx-ingress-controller` 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있으므로 서버에 별도로 설치할 필요가 없습니다.

### 설정

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 Agent를 실행하는 경우, Agent의 구성 디렉터리 루트에 있는 `conf.d/` 폴더 내 `nginx_ingress_controller.d/conf.yaml` 파일을 편집하세요. 사용 가능한 설정 옵션 전체를 보려면 [샘플 nginx_ingress_controller.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example)을 참고하세요. 그런 다음 [Agent를 재시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "컨테이너화" %}}

#### 컨테이너화된 환경

컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에 아래 파라미터를 적용하는 방법이 안내되어 있습니다.

{{% /tab %}}

{{< /tabs >}}

#### 메트릭 수집

기본적으로 NGINX 메트릭은 `nginx-ingress-controller`에서 수집됩니다. 그러나 수신 컨트롤러에서 정규 `nginx` 점검을 실행하는 것이 더 편리할 수 있습니다.

그러려면 에이전트에서 NGINX 상태 페이지에 접근할 수 있도록 하세요. 컨트롤러에 `nginx-status-ipv4-whitelist` 설정을 사용하고 컨트롤러 포드에 Autodiscovery 주석을 추가하세요.

예를 들어, 이 주석에서 `nginx`와 `nginx-ingress-controller` 점검과 로그 수집을 활성화합니다.

| 파라미터            | 값                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `["nginx","nginx_ingress_controller"]`                                                                             |
| `<INIT_CONFIG>`      | `[{},{}]`                                                                                                          |
| `<INSTANCE_CONFIG>`  | `[{"nginx_status_url": "http://%%host%%:18080/nginx_status"},{"prometheus_url": "http://%%host%%:10254/metrics"}]` |

사용 가능한 모든 구성 옵션은 [샘플 nginx_ingress_controller.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example)을 참고하세요.

**참고**: `nginx-ingress-controller` 0.23.0+ 버전의 경우, `18080` 포트를 리스닝하는 `nginx` 서버가 제거되었습니다. 그러나 구성 configmap에 다음 `http-snippet`을 추가해 복원할 수 있습니다. 

```text
  http-snippet: |
    server {
      listen 18080;

      location /nginx_status {
        allow all;
        stub_status on;
      }

      location / {
        return 404;
      }
    }
```

**참고**: 히스토그램 메트릭(예: `nginx_ingress.controller.response.*` 메트릭)은 기본적으로 수집되지 않으며, 추가 [collect_nginx_histograms](https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example#L59C7-L59C31) 인스턴스 구성 파라미터를 `true`로 설정해야 합니다.
히스토그램 메트릭은 태그 카디널리티가 높으므로 파라미터 기본값은 `false`입니다.

| 파라미터            | 값                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `<INSTANCE_CONFIG>`  | `[{"nginx_status_url": "http://%%host%%:18080/nginx_status"},{"prometheus_url": "http://%%host%%:10254/metrics", "collect_nginx_histograms": true}]` |

#### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Datadog Agent에서는 로그 수집이 기본적으로 비활성화되어 있습니다. 이를 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/)을 참고하세요.

| 파라미터      | 값                                                              |
| -------------- | ------------------------------------------------------------------ |
| `<LOG_CONFIG>` | `[{"service": "controller", "source": "nginx-ingress-controller"}]` |

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `nginx_ingress_controller`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **nginx_ingress.controller.cpu.time** <br>(count) | CPU 사용량(초)<br>_second로 표시됨_ |
| **nginx_ingress.controller.last.reload.success** <br>(gauge) | 마지막 구성 다시 로드 시도의 성공 여부|
| **nginx_ingress.controller.mem.resident** <br>(gauge) | 상주 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **nginx_ingress.controller.mem.virtual** <br>(gauge) | 가상 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **nginx_ingress.controller.reload.success** <br>(count) | Ingress Controller 다시 로드 작업의 누적 횟수|
| **nginx_ingress.controller.request.duration.count** <br>(gauge) | 요청 처리 시간 카운트|
| **nginx_ingress.controller.request.duration.sum** <br>(gauge) | 요청 처리 시간의 합계<br>_millisecond로 표시됨_ |
| **nginx_ingress.controller.request.size.count** <br>(gauge) | 요청 크기 카운트|
| **nginx_ingress.controller.request.size.sum** <br>(gauge) | 요청 크기 합계<br>_byte로 표시됨_ |
| **nginx_ingress.controller.requests** <br>(count) | 총 클라이언트 요청 수<br>_request로 표시됨_ |
| **nginx_ingress.controller.response.duration.count** <br>(gauge) | 인그레스당 응답 지속 시간 카운트|
| **nginx_ingress.controller.response.duration.sum** <br>(gauge) | 인그레스당 응답 시간 합계<br>_second로 표시됨_ |
| **nginx_ingress.controller.response.size.count** <br>(gauge) | 인그레스당 응답 크기 카운트|
| **nginx_ingress.controller.response.size.sum** <br>(gauge) | 인그레스당 응답 크기 합계<br>_byte로 표시됨_ |
| **nginx_ingress.controller.upstream.latency.count** <br>(gauge) | \[Deprecated\] 인그레스당 업스트림 서비스 레이턴시 카운트|
| **nginx_ingress.controller.upstream.latency.quantile** <br>(gauge) | \[Deprecated\] 인그레스당 업스트림 서비스 레이턴시 분위수<br>_second로 표시됨_ |
| **nginx_ingress.controller.upstream.latency.sum** <br>(gauge) | \[Deprecated\] 인그레스당 업스트림 서비스 레이턴시 합계<br>_second로 표시됨_ |
| **nginx_ingress.nginx.bytes.read** <br>(count) | 읽은 바이트 수<br>_byte로 표시됨_ |
| **nginx_ingress.nginx.bytes.write** <br>(count) | 작성된 바이트 수<br>_byte로 표시됨_ |
| **nginx_ingress.nginx.connections.current** <br>(gauge) | 상태별 현재 클라이언트 연결 수<br>_connection으로 표시됨_ |
| **nginx_ingress.nginx.connections.total** <br>(count) | 상태별 총 연결 수<br>_connection으로 표시됨_ |
| **nginx_ingress.nginx.cpu.time** <br>(count) | CPU 사용량(초)<br>_second로 표시됨_ |
| **nginx_ingress.nginx.mem.resident** <br>(gauge) | 상주 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **nginx_ingress.nginx.mem.virtual** <br>(gauge) | 가상 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **nginx_ingress.nginx.process.count** <br>(gauge) | NGINX 프로세스 수<br>_process로 표시됨_ |
| **nginx_ingress.nginx.requests.total** <br>(count) | 총 클라이언트 요청 수<br>_request로 표시됨_ |

### 이벤트

NGINX Ingress Controller에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

NGINX Ingress Controller에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.