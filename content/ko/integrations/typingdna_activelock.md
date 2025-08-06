---
app_id: typingdna-activelock
app_uuid: e4eb4314-400c-4c30-8842-60d74e7f455a
assets:
  dashboards:
    TypingDNA ActiveLock: assets/dashboards/TypingDNAActiveLock.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10339
    source_type_name: TypingDNA ActiveLock
author:
  homepage: https://www.typingdna.com/contact
  name: TypingDNA
  sales_email: datadog.support@typingdna.com
  support_email: datadog.support@typingdna.com
categories:
- 로그 수집
- 보안
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/typingdna_activelock/README.md
display_on_public_website: true
draft: false
git_integration_title: typingdna_activelock
integration_id: typingdna-activelock
integration_title: TypingDNA ActiveLock
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: typingdna_activelock
public_title: TypingDNA ActiveLock
short_description: TypingDNA ActiveLock 로그를 확인하고 분석하세요.
supported_os:
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: TypingDNA ActiveLock 로그를 확인하고 분석하세요.
  media:
  - caption: 커스텀 Datadog 대시보드에서 TypingDNA ActiveLock 로그를 확인하고 분석하세요.
    image_url: images/TypingDNAActiveLock.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: TypingDNA ActiveLock
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->



## 개요

[TypingDNA ActiveLock][1]은 Continuous Endpoint Authentication 앱으로, 타이핑 패턴을 감지하고 컴퓨터를 잠금하여 민감한 데이터를 보호함으로써 회사 컴퓨터에 무단 액세스가 발생하는 것을 방지해 줍니다.

이 통합을 사용하면 ActiveLock 앱에서 Datadog로 로그를 보낼 수 있으며 조직의 컴퓨터를 모니터링할 수 있는 기본 대시보드가 ​​제공됩니다.

Datadog에서 데이터를 시각화하려면 커스텀 ActiveLock 앱을 설정하고 설치해야 합니다. 이는 모든 조직 컴퓨터에 동일하게 설치됩니다.


## 설정

### 설정

Datadog API 키를 생성하는 방법:

1. Datadog 계정에서 [Organization settings > API keys][2]로 이동합니다.
2. **+ New Key**를 클릭하여 API 키를 생성합니다.

커스텀 설치 앱을 받는 방법:

1. 새로 생성된 API 키, [Datadog 사이트][4] 및 조직 세부 정보를 제출하여 [커스텀 설치 양식][3]을 완료하세요.
2. 조직 컴퓨터에 설치할 수 있는 커스텀 ActiveLock 앱과 설치 지침이 포함된 이메일을 받게 됩니다.
    a. 첫 설치 시 좌석이 10개로 제한되며, 기본적으로 30일 동안 체험할 수 있습니다. 체험 기간 제한을 해제하려면 정식 상업용 라이선스가 필요합니다. 상업용 라이선스가 없는 경우 [TypingDNA][5] 또는 리셀러/파트너에 문의하시기 바랍니다.
3. 설치 후 ActiveLock 로그가 [Log Explore][6]에 나타납니다.

리셀러/파트너를 통해 구매한 경우 해당 리셀러/파트너의 지침에 따라 커스텀 설치 앱(및 상업용 라이선스)을 받아야 합니다.


### 검증

Datadog에서 ActiveLock 로그를 확인하려면 [Log Explorer][6]로 이동하여 검색 쿼리에 `source:typingdna` 및/또는 `service:activelock`를 입력하세요.

대시보드에 액세스하려면 [Dashboard List][7]로 이동하여 **TypingDNA ActiveLock** 대시보드를 검색하세요.


## 수집한 데이터

### 로그 수집

TypingDNA ActiveLock 로그는 각 애플리케이션에서 수집되어 Datadog으로 직접 전송됩니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog][8] 또는 [TypingDNA 지원팀][5]에 문의하세요.

[1]: https://www.typingdna.com/activelock
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://www.typingdna.com/clients/altrial
[4]: https://docs.datadoghq.com/ko/getting_started/site/#access-the-datadog-site
[5]: https://www.typingdna.com/contact
[6]: https://app.datadoghq.com/logs
[7]: https://app.datadoghq.com/dashboard/lists
[8]: https://docs.datadoghq.com/ko/help/