---
app_id: external-dns
app_uuid: b41539a6-8222-4d6e-92f9-0a9f8496acdd
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: external_dns.source.endpoints.total
      metadata_path: metadata.csv
      prefix: external_dns.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10075
    source_type_name: 외부 DNS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 네트워크
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/external_dns/README.md
display_on_public_website: true
draft: false
git_integration_title: external_dns
integration_id: external-dns
integration_title: 외부 DNS
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: external_dns
public_title: 외부 DNS
short_description: Datadog으로 모든 외부 DNS 메트릭을 추적하세요
supported_os:
- linux
- macos
- 윈도우즈(Windows)
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog으로 모든 외부 DNS 메트릭을 추적하세요
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: 외부 DNS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

외부 DNS 서비스에서 실시간으로 메트릭을 가져와 Kubernetes 외부 DNS Prometheus 애드온으로 수집된 DNS 메트릭을 시각화하고 모니터링하세요.

외부 DNS에 대한 자세한 내용은 [Github 리포지토리][1]를 참조하세요.

## 설정

### 설치

외부 DNS 검사는 [Datadog Agent][2] 패키지에 포함되어 있으므로 서버에 다른 것을 설치할 필요가 없습니다.

### 설정

[Agent 구성 디렉터리][3]의 루트에 있는 `conf.d/` 폴더에서 `external_dns.d/conf.yaml` 파일을 편집하여 서버와 포트를 가리키도록 하고 모니터링할 마스터를 설정합니다. 사용 가능한 모든 구성 옵션은 [샘플 external_dns.d/conf.yaml][4]을 참조하세요.

#### 서비스 탐지 사용

Kubernetes 작업자 노드당 하나의 Datadog Agent 파드를 사용하는 경우 외부 DNS 파드에서 다음 예제 주석을 사용하여 데이터를 자동으로 검색합니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  annotations:
    ad.datadoghq.com/external-dns.check_names: '["external_dns"]'
    ad.datadoghq.com/external-dns.init_configs: '[{}]'
    ad.datadoghq.com/external-dns.instances: '[{"prometheus_url":"http://%%host%%:7979/metrics", "tags":["externaldns-pod:%%host%%"]}]'
```

- `externaldns-pod` 태그는 대상 DNS 파드 IP를 추적합니다. 다른 태그는 자동탐지를 사용하여 정보를 폴링하는 Datadog Agent와 관련이 있습니다.
- 자동탐지 주석은 파드에서 수행됩니다. 배포하려면 템플릿 사양의 메타데이터에 주석을 추가하세요.

### 검증

[Agent의 `status` 하위 명령을 실행][5]하고 Checks 섹션에서 `external_dns`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "external_dns" >}}


### 이벤트

외부 DNS 점검에는 이벤트가 포함되지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "external_dns" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://github.com/kubernetes-incubator/external-dns
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/external_dns/datadog_checks/external_dns/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/external_dns/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/external_dns/assets/service_checks.json
[8]: https://docs.datadoghq.com/ko/help/
