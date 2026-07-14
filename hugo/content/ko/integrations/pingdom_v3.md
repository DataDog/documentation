---
app_id: pingdom-v3
app_uuid: d7f6a5a2-9614-45f1-9022-2ca1eba7bd5c
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: pingdom.response_time
      metadata_path: metadata.csv
      prefix: pingdom.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 615
    source_type_name: Pingdom
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 메트릭
- 알림
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: pingdom_v3
integration_id: pingdom-v3
integration_title: Pingdom
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: pingdom_v3
public_title: Pingdom
short_description: "Datadog에서 Pingdom\b 수집 업타임, 응답 시간 및 알림을 확인하세요."
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - 카테고리::메트릭
  - 카테고리::알림
  - 제공::통합
  configuration: README.md#Setup
  description: Datadog에서 Pingdom\u0008 수집 업타임, 응답 시간 및 알림을 확인하세요.
  media: []
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: Pingdom
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Datadog에서 Track Pingdom 사용자 중심 성능 메트릭을 통해 다른 관련 이벤트와 메트릭을 연계합니다.

Pingdom V3 통합은 [Datadog Pingdom 통합(사용 중단)][1]과 비슷한 역할을 합니다. 하지만 [Pingdom API][2] 버전 3.1을 사용합니다.

![Datadog 대시보드에서 Pingdom 그래프][3]

## 설정

### API 토큰 생성

1. [Pingdom 계정][4]에 로그인하세요.
2. _설정_ > _Pingdom API_로 이동합니다.
3. Click _API 토큰 추가_를 클릭합니다. 토큰 이름을 지정하고 _읽기-쓰기_ 권한을 부여합니다. 다시 액세스할 수 없는 장소에 토큰을 저장합니다.

### 설치 및 설정

1. [Pingdom V3 통합 타일][5]을 엽니다.
2. 해당 필드에 이름과 API 토큰을 입력합니다. Pingdom에서 설정한 메트릭 및 점검은 Datadog로 수집됩니다.
3. Pingdom에서 점검 태그를 관리합니다. Pingdom에서 점검에 추가되는 태그는 Datadog 점검에 자동으로 추가됩니다. `datadog-exclude` 태그를 추가하여 점검을 제외합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "pingdom-v3" >}}


### 이벤트

Pingdom 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Pingdom 통합은 트랜잭션 점검을 가져오고 이를 서비스 점검으로 보고합니다.

`pingdom.status` 점검의 경우, Pingdom 트랜잭션 점검 결과는 Datadog 서비스 점검 결과와 다음과 같이 연관되어 있습니다.

| Datadog 상태 | Pingdom 상태      |
| -------------- | ------------------- |
| `OK`           | `up`                |
| `CRITICAL`     | `down`              |
| `WARNING`      | `unconfirmed_down`  |
| `UNKNOWN`      | `unknown`, `paused` |

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/pingdom/
[2]: https://docs.pingdom.com/api/
[3]: images/pingdom_dashboard.png
[4]: https://my.pingdom.com/
[5]: https://app.datadoghq.com/account/settings#integrations/pingdom-v3
[6]: https://github.com/DataDog/integrations-internal-core/blob/main/pingdom/metadata.csv
[7]: https://docs.datadoghq.com/ko/help