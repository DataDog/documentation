---
app_id: akeyless-gateway
app_uuid: a71a3b29-5921-4bc9-8a7e-38de5a940ad8
assets:
  dashboards:
    akeyless_gateway_dashboard: assets/dashboards/akeyless_gateway_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - akeyless.gw.system.cpu
      - akeyless.gw.system.disk
      - akeyless.gw.system.load
      - akeyless.gw.system.memory
      - akeyless.gw.system.network
      - akeyless.gw.quota.current_transactions_number
      - akeyless.gw.quota.gw_admin_client_transactions
      - akeyless.gw.quota.total_transactions_limit
      - akeyless.gw.system.http_response_status_code
      - akeyless.gw.system.request_count
      - akeyless.gw.system.healthcheck.status
      metadata_path: metadata.csv
      prefix: akeyless
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10426
    source_type_name: Akeyless Gateway
author:
  homepage: https://www.akeyless.io
  name: Akeyless Security
  sales_email: sales@akeyless.io
  support_email: support@akeyless.io
categories:
- 보안
- 쿠버네티스(Kubernetes)
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/akeyless_gateway/README.md
display_on_public_website: true
draft: false
git_integration_title: akeyless_gateway
integration_id: akeyless-gateway
integration_title: Akeyless Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: akeyless_gateway
public_title: Akeyless Gateway
short_description: Akeyless Gateway 주요 메트릭을 추적하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::보안
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - 제출한 데이터 유형::메트릭
  configuration: README.md#Setup
  description: Akeyless Gateway 주요 메트릭을 추적하세요.
  media:
  - caption: Akeyless Gateway 메트릭 대시보드
    image_url: images/AKs-Graphs-Light.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Akeyless Gateway
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Akeyless Platform은 크리덴셜, 인증서 및 암호화 키를 저장, 보호, 회전하고 동적으로 생성할 수 있는 통합 비밀 관리 시스템입니다. 당사의 플랫폼은 정적 및 동적 크리덴셜 관리, 인증서 자동화, 암호화 및 디지털 서명, 내부 리소스에 대한 원격 액세스를 보호하는 제로 트러스트 애플리케이션 액세스 등 다양한 사용 사례를 지원합니다.

이 통합을 통해 [Akeyless Gateway][1]의 성능을 시각화하고 모니터링할 수 있습니다. 원격 메트릭은 애플리케이션 및 런타임 환경에서 제공됩니다.

## 설정

Akeyless는 개인 네트워크와 클라우드 사이에 추가 보호 수준을 추가하는 고유한 Gateway를 제공합니다. 핵심 서비스의 SaaS 확장 역할을 하는 무상태 게이트웨이는 강력한 기본 메커니즘을 통해 투명한 내부 운영을 가능하게 하여 내부 리소스를 사용하기 위해 네트워크 인프라스트럭처를 변경하지 않고도 서비스 연속성과 복구를 보장합니다. .

중요한 Akeyless Gateway 메트릭을 보기 위해 Datadog과의 통합을 구성하려면 Gateway 배포에 사용 중인(또는 사용한) 방법에 대한 아래 지침을 따르세요.

### 사전 필수 요건
- 실행 중이거나 처음으로 배포되는 Akeyless Gateway

### 설정

이 통합은 동일한 API 키를 사용하는 하나의 Gateway 또는 여러 인스턴스에서 작동합니다. 메트릭은 **Akeyless GW** 대시보드에서  `host` 또는 `instance`별로 표시될 수 있습니다.

#### Kubernetes에서 실행되는 Gateway의 경우

[K8s에서 실행되는 게이트웨이][2]에서 Akeyless Gateway 통합을 구성하려면:

1. Kubernetes에 Gateway를 배포하는 데 사용하는 `values.yaml` 파일의  `metrics` 섹션 아래에 다음 구성을 추가합니다. Datadog 서버의 관련 API 키와 `app.datadoghq.com`과 같은 관련 [Datadog 사이트][3]를 설정합니다.

```
metrics:
  enabled: true  
  config: |
    exporters:    
      datadog:
        api:
          key: "<Your Datadog API key>"
          site: <Your Datadog server site>         
    service:
      pipelines:
        metrics:
          exporters: [datadog]
```

2. Gateway를 아직 배포하지 않은 경우 평소대로 설치를 계속하고 배포할 준비가 되면 다음 명령을 실행합니다.

```
helm install <your-gateway-name> akeyless/akeyless-api-gateway -f values.yaml
```

3. Kubernetes에서 기존 Gateway를 업데이트하는 경우 다음 명령을 실행합니다.

```
helm upgrade <your-gateway-name> akeyless/akeyless-api-gateway -f values.yaml
```

#### Docker에서 실행되는 독립형 Gateway의 경우

[Standalone Gateway][4]에서 Akeyless Gateway 통합을 구성하려면:

1. 다음 구성으로 `otel-config.yaml`이라는 로컬 파일을 생성합니다. Datadog 서버의 관련 API 키 및 `app.datadoghq.com`과 같은 관련 [Datadog 사이트][3]를 설정합니다.

```
exporters:
  datadog:
    api:
      key: "<Your Datadog API key>"
      site: <Your Datadog server site>
service:
  pipelines:
    metrics:
      exporters: [datadog]
```

2. 아직 Gateway를 배포하지 않은 경우 다음 명령을 실행하여 `ENABLE_METRICS=true` 변수로 Akeyless Gateway를 가동하고 `otel-config.yaml` 파일을 마운트합니다.

```
docker run -d -p 8000:8000 -p 8200:8200 -p 18888:18888 -p 8080:8080 -p 8081:8081 -p 5696:5696 -e ENABLE_METRICS="true" -v $PWD/otel-config.yaml:/akeyless/otel-config.yaml --name <your-gateway-name> akeyless/base:latest-akeyless
```
3. 기존 Gateway를 업데이트하는 경우 이전에 제거된 Docker 인스턴스에서 최신 설정 및 데이터를 검색하려면 업데이트된 Gateway에 대해 동일한 `Admin Access ID` 및 `Cluster Name`을 사용하세요.

```
docker run -d -p 8000:8000 -p 8200:8200 -p 18888:18888 -p 8080:8080 -p 8081:8081 -p 5696:5696 -e ADMIN_ACCESS_ID="p-xxxxxx" -e ADMIN_ACCESS_KEY="62Hu...xxx....qlg=" -e ENABLE_METRICS="true" -v $PWD/otel-config.yaml:/akeyless/otel-config.yaml --name <your-gateway-name> akeyless/base:latest-akeyless
```

### 검증

Gateway가 성공적으로 설정되면 Datadog 사이트의 [Metrics Explorer][5]로 이동하여 요약 페이지에서 Akeyless 메트릭을 필터링합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "akeyless-gateway" >}}


### 서비스 점검

Akeyless Gateway 통합에는 서비스 점검이 포함되지 않습니다.

### 이벤트

Akeyless Gateway 통합에는 이벤트가 포함되지 않습니다.

## 지원

도움이 필요하신가요? [Akeyless 지원팀][7]에 문의하세요.


[1]: https://docs.akeyless.io/docs/api-gw
[2]: https://docs.akeyless.io/docs/gateway-k8s
[3]: https://docs.datadoghq.com/ko/getting_started/site/
[4]: https://docs.akeyless.io/docs/install-and-configure-the-gateway
[5]: https://app.datadoghq.com/metric/explorer
[6]: https://github.com/DataDog/integrations-extras/blob/master/akeyless_gateway/metadata.csv
[7]: mailto:support@akeyless.io