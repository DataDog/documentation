---
app_id: onepassword
app_uuid: ccfcdbb7-f4b2-43b4-a176-a1f0d7b08bba
assets:
  dashboards:
    1Password-Overview: assets/dashboards/1password_overview.json
  integration:
    auto_install: false
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10351
    source_type_name: 1password
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- 이벤트 관리
- 문제 추적
- security
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: 1password
integration_id: onepassword
integration_title: 1Password
integration_version: ''
is_public: true
kind: 통합
manifest_version: 2.0.0
name: 1password
public_title: 1Password
short_description: 1Password 계정용 이벤트를 생성하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - 카테고리::이벤트 관리
  - 카테고리::이슈 추적
  - Category::Security
  - 제출한 데이터 유형::로그
  - 제공::통합
  configuration: README.md#Setup
  description: 1Password 계정용 이벤트를 생성하세요.
  media:
  - caption: 1Password 대시보드 개요
    image_url: images/onepassword-dashboard.png
    media_type: image
  - caption: 1Password 대시보드 맵
    image_url: images/onepassword-map.png
    media_type: image
  - caption: 1Password 탐지 규칙
    image_url: images/onepassword-detection-rules.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: 1Password
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

[1Password 비즈니스][1]를 사용하면  1Password 이벤트 API로 계정 이벤트를 Datadog 클라우드 보안 정보와 이벤트 관리(SIEM)로 전송할 수 있습니다. 아울러 다음의 작업도 가능합니다.

- 1Password 데이터 보존을 관리합니다.
- 커스텀 위젯 및 대시보드를 생성합니다.
- 특정 작업을 트리거하는 탐지 규칙을 설정합니다.
- 1Password 이벤트를 다른 서비스의 데이터와 상호 참조합니다.

1Password를 사용한 Datadog의 통합 기능으로 [1Password 이벤트 API][2]를 활용하여 로그를 수집합니다. 이는 다음 세 가지 유형의 로그를 생성합니다.

- **로그인 시도**: 본 로그에는 계정에 로그인을 시도한 사용자의 이름과 IP 주소, 시도 시점이 포함됩니다. 실패한 시도의 경우 잘못된 비밀번호, 키 또는 세컨드 팩터와 같은 실패 원인이 포함됩니다.
- **항목 사용**: 본 로그 유형에는 항목(예: 비밀번호 또는 기타 자격증명)이 어떻게 사용되었는지 설명하는 작업이 포함됩니다. 가능한 작업 값으로는 채우기, 입력 항목 편집 모드, 내보내기, 공유, 보안 복사, 공개, SSO 공급자 선택, 서버 만들기, 서버 업데이트, 서버 불러오기 등이 있습니다.
- **감사 이벤트**: 본 로그에는 계정, 볼트(vault), 그룹, 사용자 등에 대한 변경 사항과 같이 1Password 계정에서 팀 구성원이 수행한 작업이 포함됩니다.

1Password 로그를 파싱한 후, Datadog은 1Password 값, 항목, 사용자에 대한 보안 관련 이벤트로부터 얻은 인사이트로 [즉시 사용 가능한 1Password 개요 대시보드][3]를 채웁니다. 위젯에는 가장 자주 사용하는 항목과 자주 사용하지 않는 항목 이벤트 를 표시하는 상단 목록과 로그인 시도의 시작 국가를 표시하는 지리적 지도가 포함되어 있습니다.

## 설정

**1단계: 1Password에서 액세스 토큰 생성**

시작하려면 1Password 계정에 [로그인][4]하고 사이드바에서 **통합**을 클릭한 다음 **Datadog**을 선택합니다.

그런 다음 1Password 계정에 통합을 추가하고 무기명(bearer) JSON 웹 토큰을 생성합니다.

1. 통합에 **이름**을 입력한 후 **통합 추가**를 클릭합니다.
2. 무기명(bearer) 토큰의 **이름**을 입력하고 토큰 만료 시기를 선택합니다.
3. 토큰에 액세스할 수 있는 다음 이벤트 유형을 선택합니다.
    a. 로그인 시도 횟수
    B. 아이템 사용 이벤트
    c. 감사 이벤트
4. **토큰 발급**을 클릭하여 액세스 토큰 키를 생성합니다. 1Password 무기명(bearer) 토큰 발급 또는 철회에 대한 자세한 내용을 확인하려면 [1Password 설명서][5]를 참조하세요.
5. **1Password 저장**을 클릭하고 토큰을 저장할 볼트(vault)를 선택합니다.
6. 해당 토큰을 보려면 ** 통합 세부정보 보기**를 클릭합니다.

다음 단계에서 해당 토큰이 필요합니다.

**2단계: 1Password 계정을 Datadog에 연결합니다.**

시작하려면 이전 단계의 액세스 토큰 키를 복사합니다.

1. 계정의 **이름**을 입력합니다.
2. 1Password 계정의 **액세스 토큰 키**를 **액세스 토큰**란에 붙여넣습니다.
3. 호스트 유형에서 1Password 계정의 **지역 및 플랜**을 선택합니다.
4. 옵션으로 해당 로그용 **태그**를 정의할 수 있습니다.
5. **저장**을 클릭합니다.

### 검증

Datadog 로그를 `source:1password`로 검색합니다. 통합을 올바르게 설치했다면 1Password 이벤트를 확인할 수 있습니다.

## 수집한 데이터

### 메트릭

1Password 통합에는 메트릭이 포함되지 않습니다.

### 서비스 점검

1Password 통합에는 서비스 점검이 포함되지 않습니다.

### 이벤트

1Password 통합에는 이벤트가 포함되지 않습니다.

## 트러블슈팅

Datadog의 도움이 필요하신가요? [Datadog 지원 팀][6]에 문의하세요. 1Password의 도움이 필요하시다면 [1Password 지원 팀][7]에 문의하세요.

[1]: https://support.1password.com/explore/business/
[2]: https://developer.1password.com/docs/events-api/
[3]: http://app.datadoghq.com/dash/integration/1Password-Overview
[4]: https://start.1password.com/signin
[5]: https://support.1password.com/events-reporting/#appendix-issue-or-revoke-bearer-tokens
[6]: https://docs.datadoghq.com/ko/help/
[7]: https://support.1password.com/contact/?o=https%3a%2f%2fsupport.1password.com%2fevents-reporting%2f