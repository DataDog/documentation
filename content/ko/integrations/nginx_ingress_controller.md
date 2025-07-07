---
app_id: nginx-ingress-controller
app_uuid: f84e3ebf-848b-4894-a5b0-9abbd21d4189
assets:
  dashboards:
    nginx_ingress_controller: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: nginx_ingress.nginx.process.count
      metadata_path: metadata.csv
      prefix: nginx_ingress.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10050
    source_type_name: nginx-ingress-controller
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    status_code_overview: assets/saved_views/status_code_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ㅊ
- 쿠버네티스(Kubernetes)
- 로그 수집
- 네트워크
- orchestration
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/README.md
display_on_public_website: true
draft: false
git_integration_title: nginx_ingress_controller
integration_id: nginx-ingress-controller
integration_title: nginx-ingress-controller
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: nginx_ingress_controller
public_title: nginx-ingress-controller
short_description: NGINX 수신 컨트롤러와 임베디드 NGINX에 관련된 메트릭을 모니터링합니다.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Log Collection
  - Category::Network
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: NGINX 수신 컨트롤러와 임베디드 NGINX에 관련된 메트릭을 모니터링합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: nginx-ingress-controller
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

이 점검은 Kubernetes [NGINX 수신 컨트롤러][1]를 모니터링합니다. F5 NGINX 수신 컨트롤러를 모니터링하려면 [Datadog Prometheus 통합][2]을 설정하세요. 이를 통해 [NGINX Prometheus Exporter][3]에서 제공한 목록 중에서 원하는 메트릭을 모니터링할 수 있습니다.


## 설정

### 설치

`nginx-ingress-controller` 점검은 [Datadog 에이전트][4] 패키지에 포함되어 있으므로 서버에 추가 설치할 필요가 없습니다.

### 구성

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 에이전트를 실행하는 경우, 에이전트의 구성 디렉터리 루트에 있는 `conf.d/` 폴더 내 `nginx_ingress_controller.d/conf.yaml` 파일을 편집하세요. 사용 가능한 설정 옵션 전체를 보려면 [nginx_ingress_controller.d/conf.yaml 샘플][3]을 참고하세요.

[1]: https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

컨테이너화된 환경의 경우 [자동탐지 통합 템플릿][1]에 다음 파라미터를 적용하는 방법이 안내되어 있습니다.

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/
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

사용 가능한 모든 구성 옵션은 [nginx_ingress_controller.d/conf.yaml 샘플][5]을 참고하세요.

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

#### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [Kubernetes 로그 수집][6]을 참고하세요.

| 파라미터      | 값                                                              |
| -------------- | ------------------------------------------------------------------ |
| `<LOG_CONFIG>` | `[{"service": "controller", "source": "nginx-ingress-controller"}]` |

### 검증

[에이전트의 상태 하위 명령을 실행][7]하고 Checks 섹션에서 `nginx_ingress_controller`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "nginx-ingress-controller" >}}


### 이벤트

NGINX Ingress Controller에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

NGINX Ingress Controller에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.


[1]: https://kubernetes.github.io/ingress-nginx
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/prometheus/
[3]: https://github.com/nginxinc/nginx-prometheus-exporter#exported-metrics
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-core/blob/master/nginx_ingress_controller/datadog_checks/nginx_ingress_controller/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ko/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ko/help/