---
app_id: akamai-datastream-2
app_uuid: 9a772881-d31a-4ffb-92bb-7beef1088a55
assets:
  dashboards:
    Akamai DataStream 2: assets/dashboards/akamai_datastream_2_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: akamai_datastream.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10273
    source_type_name: Akamai DataStream 2
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 캐싱(caching)
- 로그 수집
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/akamai_datastream_2/README.md
display_on_public_website: true
draft: false
git_integration_title: akamai_datastream_2
integration_id: akamai-datastream-2
integration_title: Akamai DataStream 2
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: akamai_datastream_2
public_title: Akamai DataStream 2
short_description: Akamai DataStream 로그를 Datadog으로 전송하기
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::캐싱(Caching)
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 제공::통합
  configuration: README.md#Setup
  description: Akamai DataStream 로그를 Datadog으로 전송하기
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/monitor-akamai-datastream2/
  support: README.md#Support
  title: Akamai DataStream 2
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

Akamai DataStream 2는 프로퍼티의 성능, 보안, CDN 상태 로그를 Akamai Intelligent Edge Platform에서 캡처합니다. 본 통합은 데이터를 거의 실시간으로 Datadog으로 스트리밍합니다.

Akamai DataStream 2 로그를 사용하여 장기적인 트렌드의 인사이트를 얻고, 성능 및 보안 문제를 해결하세요. 고처리량 데이터 전송 스트림을 모니터링할 수도 있습니다. 자세한 내용과 사용 사례는 [DataStream 2 설명서][1]를 참조하세요.

## 설정

### 설치

**Install Integration**를 클릭하면 프리셋 대시보드가 활성화되어 Akamai DataStream 2 로그 및 메트릭을 볼 수 있습니다.

### 구성

로그를 Datadog으로 전송하도록 Akamai DataStream 2를 구성하려면 [Akamai Techdocs 사이트의 다음 지침을 따르세요]
(https://techdocs.akamai.com/datastream2/docs/stream-datadog). 로그 소스를 `akamai.datastream`로, 로그 형식을 `JSON`로 설정해야 합니다.

페이지 우측의 Datadog Site Selector가 [Datadog 사이트][2]로 설정되어 있는지 확인하고 하단의 로그 엔드포인트 URL을 복사합니다.

`https://{{< region-param key="http_endpoint" code="true" >}}/v1/input`

### 검증

본 통합이 올바르게 구성되었는지 확인하려면 [소스 `akamai.datastream`로 로그를 검색합니다][3]. Akamai에서 데이터 스트림을 구성한 후 로그가 Datadog에 표시되기까지 몇 분 정도 기다려야 할 수 있습니다.

## 수집한 데이터

### 메트릭

Akamai DataStream 2는 메트릭을 포함하지 않습니다.

### 서비스 점검

Akamai DataStream 2는 서비스 점검을 포함하지 않습니다.

### 이벤트

Akamai DataStream 2는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog으로 Akamai DataStream 2 모니터링][5]

[1]: https://techdocs.akamai.com/datastream2/docs
[2]: https://docs.datadoghq.com/ko/getting_started/site/
[3]: https://app.datadoghq.com/logs?query=source%3Aakamai.datastream
[4]: https://docs.datadoghq.com/ko/help/
[5]: https://www.datadoghq.com/blog/monitor-akamai-datastream2/