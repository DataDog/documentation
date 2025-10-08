---
app_id: moovingon-ai
app_uuid: 1a02140e-4927-49c9-8442-dff81a18c703
assets:
  dashboards:
    moovingon.ai Overview: assets/dashboards/moovingon.ai_overview.json
  logs: {}
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.moovingon.com/
  name: moovingon
  sales_email: sales@moovingon.com
  support_email: support@moovingon.com
categories:
- 알림
- incidents
- 자동화
- 협업
- 이벤트 관리
- 경고
- 문제 추적
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/moovingon_ai/README.md
display_on_public_website: true
draft: false
git_integration_title: moovingon_ai
integration_id: moovingon-ai
integration_title: moovingon.ai
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: moovingon_ai
public_title: moovingon.ai
short_description: moovingon.ai는 NOC 오케스트레이션 및 자동화 플랫폼입니다.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::알림
  - Category::Incidents
  - 카테고리::자동화
  - Category::Collaboration
  - 카테고리::이벤트 관리
  - Category::Alerting
  - 카테고리::이슈 추적
  - 제공::통합
  - Queried Data Type::Events
  - Submitted Data Type::Events
  - 지원 OS::Linux
  - 지원 OS::Windows
  - 지원 OS::macOS
  configuration: README.md#Setup
  description: moovingon.ai는 NOC 오케스트레이션 및 자동화 플랫폼입니다.
  media:
  - caption: moovingon.ai 가이드라인
    image_url: images/moovingon_ai-guidelines.png
    media_type: image
  - caption: moovingon.ai 이벤트
    image_url: images/moovingon_ai-events.png
    media_type: image
  - caption: moovingon.ai 통합
    image_url: images/moovingon.ai-integrations.png
    media_type: image
  - caption: moovingon.ai 개요 대시보드
    image_url: images/moovingon_ai-overview-dashbard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: moovingon.ai
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요
[moovingon.ai][1]는 클라우드 작업 및 NOC 관리 플랫폼입니다. 관측 제품군의 알림을 통합하고 자동 런북과 연결해 알림 및 인시던트 해결을 도와줍니다. 이 통합을 통해 Datadog 기능을 활용해 moovingon.ai의 자동화된 인시던트 관리를 더욱 효과적으로 이용할 수 있습니다.

moovingon.ai에서는 Datadog의 모니터, 로그, 이벤트 데이터를 사용해 알림 상관 관계를 구축하고 집계합니다.
이 통합의 핵심 기능은 다음과 같습니다.

1. **집중화된 알림 관리**: moovingon.ai 내에 있는 moovingon.ai 대시보드를 활용해 Datadog 알림을 모두 가져올 수 있어 간편하고 확실한 가시성을 제공합니다.
2. **종합 인시던트 관리**: moovingon.ai에서 작업한 문제 해결 작업이 이벤트로 Datadog로 전송되어 규정 준수와 확실한 해결성을 보장합니다.
3. **폭넓은 분석**: moovingon.ai에서 제공하는 분석 기능을 활용해 Datadog 내에 있는 Datadog 알림에서 인사이트를 얻을 수 있습니다. 이를 통해 선제적으로 의사 결정하고 추세를 분석할 수 있습니다.

## 설정

### 설치

1. moovingon.ai에 로그인하려면 **Connect Accounts**를 클릭하세요.
2. Datadog 통합 이름을 입력하고 **Submit**을 클릭합니다.
3. Datadog OAuth2 화면으로 진행하고 **Authorize** 버튼을 누릅니다.
4. (선택) moovingon.ai에서 Datadog 모니터의 모든 알림을 처리하려면 **Install/Update the webhook**을 클릭합니다. 또는 원하는 모니터에 @webhook-moovingon_ai 태그를 추가합니다.

## 삭제

1. moovingon.ai 계정에서 **Settings** --> **Templates**으로 이동한 후 관련 datadog 템플릿을 모두 삭제합니다.
2. **Setings** --> **Integrations**으로 이동해 datadog 통합을 제거합니다.
3. Datadog에서 **Integrations**  --> **Integrations**로 이동합니다.
4. moovingon.ai 타이틀을 클릭하고 **Uninstall integration**을 클릭합니다.


### 메트릭

moovingon.ai에는 메트릭이 포함되어 있지 않습니다.

### 서비스 점검

moovingon.ai에는 서비스 점검이 포함되어 있지 않습니다.

### 이벤트

moovingon 통합에는 이벤트가 포함되어 있지 않습니다.

## 트러블슈팅

지원이 필요하세요? [moovingon.ai 지원][2]으로 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [moovingon.ai와 Datadog을 사용해 네트워크 인시던트의 가시성 높이기][3]

[1]: https://moovingon.ai/
[2]: mailto:support@moovingon.com
[3]: https://www.datadoghq.com/blog/moovingon-datadog-marketplace/