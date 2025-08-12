---
app_id: rigor
app_uuid: f9ab0c97-235c-4f88-8b92-89eb563e18ba
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: rigor.http.dns_time
      metadata_path: metadata.csv
      prefix: rigor.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10029
    source_type_name: Rigor
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Rigor
  sales_email: support@rigor.com
  support_email: support@rigor.com
categories:
- 테스트
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rigor/README.md
display_on_public_website: true
draft: false
git_integration_title: rigor
integration_id: rigor
integration_title: Rigor
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rigor
public_title: Rigor
short_description: Rigor는 개발 라이프 사이클 동안 신서틱(Synthetic) 모니터링 및 최적화를 제공합니다.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Testing
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Rigor는 개발 라이프 사이클 동안 신서틱(Synthetic) 모니터링 및 최적화를 제공합니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Rigor
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요

Rigor는 개발 라이프 사이클 동안 신서틱(Synthetic) 모니터링 및 최적화 인사이트를 제공합니다.

![timeboard][1]

Rigor를 사용하면 신서틱, 프런트엔드 성능 메트릭을 수집하고 이러한 메트릭을 Datadog에 푸시할 수 있습니다. 또한, Datadog에 알림을 이벤트로 푸시할 수도 있습니다.

## 설정

Rigor는 Datadog를 통해 두 개의 서로 다른 통합을 제공합니다. 메트릭 통합과 이벤트 통합입니다.

### 설정
#### 메트릭 수집

관리자로 화면 오른쪽 상단에서 "관리 도구" 메뉴를 클릭한 다음 "통합"을 선택합니다.

![관리-메뉴][2]

"신규" 버튼을 클릭해 새로운 통합을 추가하여 통합 설정을 활성화합니다.

![푸시-설정][3]

Datadog의 API 키와 이 통합에 대한 고유한 이름을 추가합니다. 그런 다음, 전송할 태그와 메트릭을 선택합니다. 다음 사항을 기억해 두세요.

- 점검 이름의 표준화된 버전은 기본 태그를 포함합니다.
- 다단계 점검(실제 브라우저 및 API 점검)의 경우 메트릭의 출처가 된 요청의 위치를 포함해야 합니다.
- 업타임 점검은 HTTP, 포트 및 API 점검을 포함합니다.
- 포트 점검은 "반응 시간" 메트릭만 보고합니다.
- 일부 브라우저는 일부 메트릭을 지원하지 않습니다.

실제 브라우저 점검이 [사용자 타이밍 API][4]에서 타이밍을 보고하도록 하려면, "모든 사용자 타이밍 전송?"을 선택합니다. `rigor.real_browser.marks` 네임스페이스에 있는 모든 표시가 보고됩니다. `rigor.real_browser.measures` 네임스페이스 아래에는 측정값이 보고됩니다. **참고**: 이 옵션을 선택하면 Datadog에 많은 계열이 전송될 수 있습니다. 특히 테스팅하는 사이트의 표시와 측정값이 동적으로 생성되는 경우 그렇습니다.

통합을 구성하면 실제 브라우저, HTTP, 포트 또는 API 점검에 추가할 수 있습니다. 점검을 편집하고 "알림" 탭으로 이동하기만 하면 됩니다. 여기서 방금 만든 통합을 추가할 수 있습니다.

![점검에-통합-추가][5]

#### 이벤트 수집

관리자로, 화면 오른쪽 상단에 있는 "관리 도구" 메뉴를 클릭하고 "경고 웹훅"을 선택합니다.

![웹훅-메뉴][6]

"신규" 버튼을 클릭하고 Datadog 타일을 클릭하여 새로운 통합을 추가합니다.

![웹훅-선택기][7]

이 웹훅에 대한 고유한 이름을 추가하고 Datadog API 키를 사용해 트리거를 업데이트해야 합니다.

![웹훅-설정][8]

통합을 구성하면 실제 브라우저, HTTP, 포트 또는 API 점검에 추가할 수 있습니다. 점검을 편집하고 "알림" 탭으로 이동하기만 하면 됩니다. 여기서 방금 만든 웹훅을 추가할 수 있습니다.

![점검에-웹훅-추가][9]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "rigor" >}}


### 이벤트

Datadog 이벤트를 통해 경고를 보내도록 점검을 설정하면 두 개의 이벤트가 Datadog에 푸시됩니다.

- **실패** - 점검이 임계값을 초과할 정도로 많이 실패하여 경고를 전송하는 경우입니다.
- **다시 온라인** - 경고 상태에서 점검이 성공적으로 실행된 경우입니다.

![이벤트-예시][11]

### 서비스 점검

Rigor 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Rigor 지원][12]에 문의하세요.


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_timeboard_with_metrics.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_admin_menu.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_integration_configuration.png
[4]: https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_add_integration_to_check.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_menu.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_chooser.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_configuration.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_add_webhook_to_check.png
[10]: https://github.com/DataDog/integrations-extras/blob/master/rigor/metadata.csv
[11]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_events_example.png
[12]: mailto:support@rigor.com