---
app_id: nomad
app_uuid: 245bf496-4185-4407-a0fd-d6ef6fc125bb
assets:
  dashboards:
    Nomad Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: nomad.client.host.cpu.user
      metadata_path: metadata.csv
      prefix: nomad
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10002
    source_type_name: Nomad
  monitors:
    Jobs are in pending status: assets/monitors/nomad_pending_jobs.json
    No Jobs Running: assets/monitors/nomad_no_jobs_running.json
    Nomad has excessive leadership losses: assets/monitors/nomad_excessive_leadership_losses.json
    Nomad heartbeats is low: assets/monitors/nomad_heartbeats_received.json
    Nomad jobs are failing: assets/monitors/nomad_job_is_failing.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Nomad
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nomad/README.md
display_on_public_website: true
draft: false
git_integration_title: nomad
integration_id: nomad
integration_title: Nomad
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: nomad
public_title: Nomad
short_description: 어떤 규모로든 애플리케이션을 배포하고 일정 세우기
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 어떤 규모로든 애플리케이션을 배포하고 일정 세우기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nomad
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


![Nomad 대시보드][1]

## 개요

Nomad 클러스터에서 메트릭을 수집하면 다음을 할 수 있습니다.

- 클러스터 성능 시각화 및 모니터링
- 클러스터 상태와 가용성 알림 받기

권장 모니터를 통해 다른 Nomad 이벤트에서 알림을 받을 수 있습니다.

## 설정

### 설치

Nomad는 DogStatsD를 통해 메트릭을 Datadog로 전송합니다. Nomad 통합을 활성화하려면 각 클라이언트와 서버 호스트에 [Datadog 에이전트를 설치][2]하세요.

### 구성

Datadog 에이전트가 설치되면 클라이언트와 서버의 Nomad 구성에 텔레메트리 스탠자를 추가할 수 있습니다.

```conf
telemetry {
  publish_allocation_metrics = true
  publish_node_metrics       = true
  datadog_address = "localhost:8125"
  disable_hostname = true
  collection_interval = "10s"
}
```

그 후 각 호스트에서 Nomad 에이전트를 다시 로드하거나 재시작합니다. Datadog 계정으로 Nomad 메트릭이 유입됩니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "nomad" >}}


### 이벤트

Nomad 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

Nomad 점검은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nomad/images/dashboard_overview.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-extras/blob/master/nomad/metadata.csv
[4]: https://docs.datadoghq.com/ko/help/