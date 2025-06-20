---
app_id: ably
app_uuid: 4596cd59-d3f2-4921-8133-3a448ccaea61
assets:
  dashboards:
    Ably: assets/dashboards/ably.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - ably.channels.mean
      - ably.channels.min
      - ably.channels.peak
      - ably.connections.all.mean
      - ably.connections.all.min
      - ably.connections.all.peak
      metadata_path: metadata.csv
      prefix: ably.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10340
    source_type_name: Ably
  oauth: assets/oauth_clients.json
author:
  homepage: https://ably.com
  name: Ably
  sales_email: sales@ably.com
  support_email: support@ably.com
categories:
- cloud
- 메트릭
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ably/README.md
display_on_public_website: true
draft: false
git_integration_title: ably
integration_id: ably
integration_title: Ably
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: ably
public_title: Ably
short_description: Ably 메트릭 수집 및 그래프화
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
  - "\b카테고리::클라우드"
  - 카테고리::메트릭
  - 제출한 데이터 유형::메트릭
  - Offering::Integration
  configuration: README.md#Setup
  description: Ably 메트릭 수집 및 그래프화
  media:
  - caption: Ably - 대시보드
    image_url: images/ably-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Ably
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## 개요
[Ably][1] 플랫폼은 고도로 확장 가능한 전 세계 웹 및 모바일 애플리케이션을 위해 멀티플레이어, 채팅, 데이터 동기화, 데이터 브로드캐스트, 알림과 같은 실시간 사용 사례를 지원합니다. 엔지니어는 API를 사용하여 서버와 클라우드(인프라스트럭처)를 프로비저닝하고 유지 관리할 필요 없이 핵심 기능을 구축하는 데 집중할 수 있습니다.

Ably Datadog 통합은 [Ably 통계][2] 메트릭을 직접 Datadog 계정으로 전송합니다.

Ably의 Datadog 통합을 사용하면 다음이 가능합니다.
- Datadog의 기타 핵심 메트릭과 함께 [Ably 통계][2] 사용
- Datadog 대시보드에서 협업 분석을 위해 Ably 메시지, 채널, 연결 사용량 상관관계 파악
- Datadog에서 Ably 사용량 통계 보기 및 추적

## 설정

- **Datadog 내**: **통합**으로 이동해 Ably 타일을 선택한 다음 **통합 설치**를 클릭합니다.

- Click **계정 연결**을 클릭해 이 통합의 인증을 시작합니다. [Ably][1]로 리디렉션됩니다.

- **Ably 내**: 로그인하여 **내 앱**으로 이동합니다.

![Ably 스크린샷][3]

- **Datadog 통합**을 설정하려는 **Ably 앱**을 선택한 다음  **통합**을 클릭합니다.

![Ably 스크린샷][4]

- **Datadog에 연결** 버튼을 클릭하여 이 통합의 인증을 시작합니다.

- Datadog 인증 페이지로 리디렉션됩니다.

- **인증** 버튼을 클릭해 설정을 완료하면 Ably 사이트로 리디렉션됩니다.

![Ably 스크린샷][5]

이제 Ably 앱 통계가 Datadog에 나타납니다.

## 수집한 데이터

Ably 통계에 대한 자세한 정보는 [애플리케이션 통계 설명서][2]를 읽어보세요.

### 메트릭
{{< get-metrics-from-git "ably" >}}


### 이벤트

Ably 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Ably 통합은 서비스 점검을 포함하지 않습니다.

## 삭제

- **Ably 내**: https://ably.com으로 이동해 로그인한 다음 **내 앱**으로 이동합니다.

- **Datadog 통합**을 설치 제거하려는 Ably 앱을 선택합니다.

- **Datadog 통합** 섹션에서 **제거** 버튼을 클릭합니다.

![Ably 스크린샷][7]

Ably 앱 통계가 더 이상 Datadog로 전송되지 않습니다.

- **Datadog 내**: **통합**으로 이동해 Ably 타일을 선택한 다음 **통합 설치 제거**를 클릭합니다.

이 통합이 설치 제거되면 이전 인증은 취소됩니다.

또한, [API 키 페이지][8]에서 통합 이름을 검색하여 이 통합과 연결된 모든 API 키가 비활성화되도록 합니다.

## 지원
도움이 필요하세요? [Ably 지원팀][9]에 문의하세요.

[1]: https://ably.com
[2]: https://ably.com/docs/general/statistics
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/your-apps.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/integrations.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/setup-integration.png
[6]: https://github.com/DataDog/integrations-extras/blob/master/ably/metadata.csv
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ably/images/uninstall-integration.png
[8]: https://app.datadoghq.com/organization-settings/api-keys?filter=Ably
[9]: https://ably.com/support