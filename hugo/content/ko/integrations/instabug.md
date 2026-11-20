---
app_id: instabug
app_uuid: 37d9bc39-888f-4bec-b8c5-3c137cf88f84
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.instabug.com/
  name: Instabug
  sales_email: success@instabug.com
  support_email: support@instabug.com
categories:
- 경고
- 문제 추적
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/instabug/README.md
display_on_public_website: true
draft: false
git_integration_title: instabug
integration_id: instabug
integration_title: Instabug
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: instabug
public_title: Instabug
short_description: 모바일 앱 상태와 성능을 모니터링하고 추적하세요.
supported_os:
- 리눅스
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 제공::UI 확장
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Alerting
  - 카테고리::이슈 추적
  configuration: README.md#Setup
  description: 모바일 앱 상태와 성능을 모니터링하고 추적하세요.
  media:
  - caption: Instabug 위젯을 사용하여 앱의 전반적인 성능을 모니터링하세요.
    image_url: images/instabug-datadog-widget.png
    media_type: image
  - caption: Instabug의 대시보드는 팀에게 앱 성능에 대한 개요와 앱에서 발생하는 잠재적인 오류 또는 문제를 제공합니다.
    image_url: images/instabug-app-overview.png
    media_type: image
  - caption: 사용자가 제출하는 피드백이나 버그가 있을 때마다 Instabug는 사용자가 경험한 코드 문제에 대해 이해할 수 있도록 모든
      세부 정보를 자동으로 캡처합니다.
    image_url: images/instabug-bugs.png
    media_type: image
  - caption: 사용자에게 가장 큰 영향을 미치는 충돌을 먼저 해결하기 위해 우선순위를 정합니다.
    image_url: images/instabug-crashes-list.png
    media_type: image
  - caption: 앱 릴리스의 각 버전이 어떻게 수행되고 채택되는지 이해합니다.
    image_url: images/instabug-releases-page.png
    media_type: image
  - caption: 문제가 발생하는 위치를 더 잘 이해하기 위해 장치 및 버전 전반에 걸쳐 데이터를 집계합니다.
    image_url: images/instabug-crash-details.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/instabug-mobile-usability/
  support: README.md#Support
  title: Instabug
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->

## 개요

[Instabug][1]는 모바일 팀이 모바일 앱을 개발하는 동안 전반에 걸쳐 성능 및 안정성 문제를 모니터링하고 우선순위를 지정하고 디버깅할 수 있도록 지원하는 모바일 중심 플랫폼입니다.

Datadog의 Instabug 대시보드 위젯은 App Apdex라는 단 하나의 숫자를 통해 전반적인 앱 상태와 사용자가 앱 성능을 어떻게 인식하는지 모니터링하는 데 도움이 됩니다. 위젯은 다음을 제공합니다.
- 전체 App Apdex 점수
- App Apdex 초과시간
- 세션을 4개의 버킷(`Satisfying`, `Tolerable`, `Frustrating` 또는 `Crashing` 세션)으로 분류
- 가장 최근 버그 보고서 5개와 새로운 보고서의 총 개수


## 설정
1. 아직 하지 않았다면 무료로 [Instabug에 가입][2]하고 [단계][3]에 따라 SDK를 앱에 통합하세요.
2. Instabug SDK를 앱에 통합한 후 신규 또는 기존 [Datadog 대시보드][4]로 이동합니다.
3. **+ Add Widgets** 또는 **+ Edit Dashboard** 버튼을 눌러 위젯 서랍을 표시합니다.
4. 위젯 서랍의 **Apps** 탭에서 `Instabug`를 검색합니다.
5. Instabug 위젯 아이콘을 클릭하거나 드래그하여 대시보드에 추가하고 Instabug 편집기 모달을 엽니다.
6. Instabug 크리덴셜로 로그인하여 Instabug 계정을 인증하고 Datadog에 연결합니다.
7. (선택 사항) 위젯에 타이틀을 지정합니다.
8. **저장**을 눌러 Datadog 대시보드 위젯 구성을 완료합니다.

## 수집한 데이터
Instabug 통합은 메트릭을 포함하지 않습니다.

## 서비스 점검
Instabug 통합은 서비스 점검을 포함하지 않습니다.

## 지원
도움이 필요하신가요? [Instabug 지원팀][5]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Instabug Datadog Marketplace 제품을 통해 사용자 컨텍스트를 활용하여 모바일 성능 문제 디버깅][6]

[1]: http://instabug.com
[2]: https://dashboard.instabug.com/signup
[3]: https://docs.instabug.com/docs/introduction
[4]: https://app.datadoghq.com/dashboard/lists
[5]: mailto:support@instabug.com
[6]: https://www.datadoghq.com/blog/instabug-mobile-usability/