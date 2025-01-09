---
app_id: dns
app_uuid: a21dc4ff-8b3f-427e-a5cc-17790a36b147
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: dns.response_time
      metadata_path: metadata.csv
      prefix: dns.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: DNS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- network
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/dns_check/README.md
display_on_public_website: true
draft: false
git_integration_title: dns_check
integration_id: dns
integration_title: DNS 점검
integration_version: 3.3.0
is_public: true
manifest_version: 2.0.0
name: dns_check
public_title: DNS 점검
short_description: 모든 DNS 기록의 조회 확인과 조회 시간을 모니터링합니다.
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
  configuration: README.md#Setup
  description: 모든 DNS 기록의 조회 확인과 조회 시간을 모니터링합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: DNS 점검
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

선택한 네임서버를 사용하여 모든 DNS 기록의 조회 확인과 조회 시간을 모니터링합니다.

## 설정

### 설치

DNS 점검은 [Datadog 에이전트][1] 패키지에 포함됩니다. 서버에 추가 설치할 필요가 없습니다.

메트릭 점검 대부분은 모니터링하는 서비스와 동일한 호스트에서 실행하는 것이 가장 좋지만, 모니터링하는 DNS 서비스를 실행하지 않는 호스트에서 본 상태 점검을 실행할 수 있습니다.

### 설정

1. [에이전트 설정 디렉토리][2] 루트의 `conf.d/` 폴더에서 `dns_check.d/conf.yaml` 파일을 편집해 DNS 데이터 수집을 시작합니다.
   사용 가능한 설정 옵션을 전부 확인하려면 [dns_check.d/conf.yaml 샘플][3]을 참조하세요.

   ```yaml
   init_config:

   instances:
     ## @param name - string - required
     ## Name of your DNS check instance.
     ## To create multiple DNS checks, create multiple instances with unique names.
     #
     - name: '<INSTANCE_NAME>'

       ## @param hostname - string - required
       ## Hostname to resolve.
       #
       hostname: '<HOSTNAME>'
   ```

    `nameserver` 옵션을 생략하는 경우 해당 점검은 로컬 네트워크 환경에서 설정된 네임서버를 사용합니다.

2. [에이전트를 재시작][4]하여 Datadog에 DNS 서비스 점검과 응답 시간을 전송합니다.

### 검증

[에이전트의 `status` 상태 하위 명령을 실행][5]하고 점검 섹션에서 `dns_check`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "dns_check" >}}


### 이벤트

DNS 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "dns_check" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/dns_check/datadog_checks/dns_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/dns_check/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/dns_check/assets/service_checks.json
[8]: https://docs.datadoghq.com/ko/help/