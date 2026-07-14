---
app_id: ambassador
app_uuid: eb591405-8cda-486a-8cf5-a06af769a3d7
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: envoy.listener.downstream_cx_total
      metadata_path: metadata.csv
      prefix: envoy.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10010
    source_type_name: Ambassador
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Ambassador
  sales_email: hello@datawire.io
  support_email: hello@datawire.io
categories:
- cloud
- containers
- kubernetes
- orchestration
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ambassador/README.md
display_on_public_website: true
draft: false
git_integration_title: ambassador
integration_id: ambassador
integration_title: Ambassador API Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: ambassador
public_title: Ambassador API Gateway
short_description: Ambassador는 Envoy를 기반으로 구축된 오픈 소스 Kubernetes 네이티브 API 게이트웨이입니다
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Containers
  - Category::Kubernetes
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Ambassador는 Envoy를 기반으로 구축된 오픈 소스 Kubernetes 네이티브 API 게이트웨이입니다
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Ambassador API Gateway
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

실시간으로  [Ambassador][1]에서 메트릭을 받아 다음을 수행할 수 있습니다.

- 마이크로서비스 성능 시각화

- Ambassador로 카나리아 롤아웃을 수행하여 새 서비스 버전의 영향 파악

![snapshot][2]

## 설정

Agent Daemonset에서 DogStatsD를 활성화하고 Ambassador Pod에서 다음 환경 변수를 설정합니다.

```
name: STATSD_HOST
valueFrom:
  fieldRef:    
    fieldPath: status.hostIP
```

이 설정을 사용하면 StatsD 메트릭이 호스트의 IP로 전송되어 트래픽을 Agent 포트 8125로 리디렉션합니다.

자세한 내용은 [StatsD를 사용한 Envoy 통계][3]를 참조하세요.

또한 Ambassador에서 Datadog APM으로 추적 데이터를 보낼 수도 있습니다. 자세한 내용은 [Datadog을 사용한 분산 추적][4]을 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "ambassador" >}}


### 이벤트

Ambassador 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

Ambassador 점검은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.

[1]: https://www.getambassador.io
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ambassador/images/upstream-req-time.png
[3]: https://www.getambassador.io/docs/edge-stack/latest/topics/running/statistics/envoy-statsd/
[4]: https://www.getambassador.io/docs/latest/howtos/tracing-datadog/
[5]: https://github.com/DataDog/integrations-extras/blob/master/ambassador/metadata.csv
[6]: https://docs.datadoghq.com/ko/help/