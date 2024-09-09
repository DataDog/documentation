---
app_id: consul-connect
app_uuid: 580ac585-9e97-4b4f-ba56-34dba5050e06
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10174
    source_type_name: Consul Connect
  logs:
    source: envoy
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 네트워크
- 로그 수집
- 컨테이너
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/consul_connect/README.md
display_on_public_website: true
draft: false
git_integration_title: consul_connect
integration_id: consul-connect
integration_title: Consul Connect
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: 2.0.0
name: consul_connect
public_title: Consul Connect
short_description: Consul Connect Envoy 사이드카 프록시를 모니터링하세요.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Network
  - Category::Log Collection
  - Category::Containers
  configuration: README.md#Setup
  description: Consul Connect Envoy 사이드카 프록시를 모니터링하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Consul Connect
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

[Datadog Envoy 통합][2]을 사용하여 [Consul Connect][1] Envoy 사이드카 프록시를 모니터링하세요. Consul Connect 통합은 [Envoy로 구성된 Consul Connect][3]만 지원합니다.

## 설정

### 설치

Consul Connect를 실행하는 서비스에 [Datadog Agent][4]를 설치하고 해당 환경에 맞는 [구성](#configuration) 지침을 따르세요.

### 구성
호스트에서 실행 중인 Agent에 대해 이 검사를 구성하려면 아래 지침을 따르세요. 컨테이너화된 환경의 경우 [Containerized](#containerized) 섹션을 참조하세요.

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

##### 메트릭 수집
1. Consul Connect에서 구성 옵션 [`-admin-bind`][1]을 활성화하여 Envoy Admin API가 노출되는 포트를 구성합니다.

2. 메트릭 수집을 구성하려면 [Envoy 통합][2]을 활성화합니다.

##### 로그 수집

[Envoy 호스트][3] 지침에 따라 로그 수집을 구성합니다.

[1]: https://www.consul.io/commands/connect/envoy#admin-bind
[2]: https://docs.datadoghq.com/ko/integrations/envoy/?tab=host#metric-collection
[3]: https://docs.datadoghq.com/ko/integrations/envoy/?tab=host#log-collection
{{% /tab %}}
{{% tab "컨테이너화" %}}

#### 컨테이너화

[Envoy 컨테이너화 지침][1]에 따라 Envoy용 Datadog Agent를 구성합니다.

##### 메트릭 수집

1. Consul Connect에서 구성 옵션 [`envoy_stats_bind_addr`][2]을 활성화하여 `/stats` 엔드포인트가 공용 네트워크에 노출되도록 합니다.

 2. 메트릭 수집을 시작하려면 [컨테이너화된 환경을 위한 Envoy 통합][3]을 구성합니다.

##### 로그 수집

[Envoy 컨테이너화 지침][4]에 따라 로그 수집을 구성합니다.

[1]: https://docs.datadoghq.com/ko/integrations/envoy/?tab=containerized#containerized
[2]: https://www.consul.io/docs/connect/proxies/envoy#envoy_stats_bind_addr
[3]: https://docs.datadoghq.com/ko/integrations/envoy/?tab=containerized#metric-collection
[4]: https://docs.datadoghq.com/ko/integrations/envoy/?tab=containerized#log-collection
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][5]하고 Checks 섹션에서 `envoy`를 찾습니다.

## 수집한 데이터

### 메트릭

수집된 메트릭 목록은 [Envoy 통합 문서][6]를 참조하세요.

### 서비스 점검

수집된 서비스 점검 목록은 [Envoy 통합 문서][7]를 참조하세요.

### 이벤트

Consul Connect에는 어떤 이벤트도 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.


[1]: https://www.consul.io/docs/connect#connect
[2]: https://docs.datadoghq.com/ko/integrations/envoy/
[3]: https://www.consul.io/docs/connect/proxies/envoy#envoy-integration
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/?#agent-status-and-information
[6]: https://docs.datadoghq.com/ko/integrations/envoy/?tab=host#metrics
[7]: https://docs.datadoghq.com/ko/integrations/envoy/?tab=host#service-checks
[8]: https://docs.datadoghq.com/ko/help/