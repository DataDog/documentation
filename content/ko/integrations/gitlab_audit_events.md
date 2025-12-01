---
app_id: gitlab-audit-events
app_uuid: 4a1f22c0-6085-491b-a903-b202fd9f3f88
assets:
  dashboards:
    GitLab Audit Events: assets/dashboards/gitlab_audit_events_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 11648998
    source_type_name: GitLab 감사 이벤트
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 로그 수집
- security
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: gitlab_audit_events
integration_id: gitlab-audit-events
integration_title: GitLab 감사 이벤트
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: gitlab_audit_events
public_title: GitLab 감사 이벤트
short_description: 위험, 보안 및 규정 준수를 평가하기 위해 GitLab 감사 이벤트를 수집하세요.
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: 위험, 보안 및 규정 준수를 평가하기 위해 GitLab 감사 이벤트를 수집하세요.
  media:
  - caption: GitLab 감사 이벤트 대시보드
    image_url: images/overview-dashboard.png
    media_type: 이미지
  overview: README.md#Overview
  resources:
  - resource_type: 설명서
    url: https://docs.datadoghq.com/integrations/gitlab_audit_events
  support: README.md#Support
  title: GitLab 감사 이벤트
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

GitLab은 기업이 소프트웨어를 만들고, 보호하고, 배포하는 데 유용한 소스 제어 및 DevOps 플랫폼입니다. [GitLab 감사 이벤트][1]와 통합하여 보안 조치를 강화하고, 인시던트에 대응하고, 규정 준수 기준을 준수하세요. Datadog는 GitLab 감사 이벤트를 로그로 자동 파싱하여 사용자 ID, IP 주소 또는 이벤트 이름별로 필터링할 수 있도록 해줍니다. 이를 통해 의심스러운 로그인 시도나 비정상적인 활동과 같은 이상 징후를 식별할 수 있습니다. 이 통합에는 활동을 모니터링하기 위한 기본 제공 대시보드가 포함되어 있으므로 필요에 맞게 커스터마이즈할 수 있습니다.

일상적인 사용자 작업부터 규정 준수 보고서까지 모든 GitLab 감사 이벤트를 추적하여 보안 및 규정 준수를 강화하세요. 예를 들어 다음 작업이 가능합니다.
 - 봇 작업 및 프로젝트 병합 정책 변경을 포함해 사용자와 프로젝트별 요청 활동을 추적하고 병합할 수 있습니다.
 - 토큰 생성에서 제거까지 모든 것이 가능합니다. GPG 키에 대한 보고서를 만들고, 개인 액세스 토큰을 생성하고, 토큰을 배포할 수 있습니다.

[`source:gitlab-audit-events`][2]를 검색하여 Datadog [로그 관리 제품][3]에서 GitLab 감사 이벤트를 확인하고, Datadog의 분석 도구를 활용하여 보안, 성능 및 운영 인사이트를 개선하세요.

## 설정

Datadog는 OAuth를 사용하여 GitLab에 연결하여 GitLab 감사 이벤트를 통합합니다. 이 통합을 설정하려면, 인증된 사용자에게 관리자 권한이 있어야 합니다. 이 통합을 인증하는 사용자 요건은 다음과 같습니다.

- Premium 또는 Ultimate GitLab 구독
- 모든 그룹, 프로젝트 및 사용자 감사 이벤트에 액세스할 수 있는 계정 소유자 또는 관리자 권한

### 설치

1. [통합 페이지][4]로 이동하여 "GitLab 감사 이벤트" 통합을 검색합니다.
2. 제목을 클릭합니다.
3. 통합 기능을 설치하기 위해 계정을 추가하려면 **GitLab 계정 추가** 버튼을 클릭합니다.
4. 모달의 지침을 읽은 후 **인증** 버튼을 클릭하면 GitLab 로그인 페이지로 리디렉션됩니다.
5. GitLab 관리자 계정을 사용하여 GitLab에 로그인합니다.
6. `api` 범위에 대한 액세스를 요청하는 화면에서 **Authorize**를 클릭합니다. 그러면 Datadog에서 감사 이벤트를 확인할 수 있습니다.
7. 새 계정이 포함된 Datadog의 GitHub 감사 이벤트 타일로 다시 리디렉션됩니다. Datadog에서는 '계정 이름'을 기억하기 쉬운 이름으로 변경할 것을 권장합니다.

## 수집한 데이터

### 로그

GitLab 감사 이벤트는 GitLab의 모든 [감사 이벤트 유형][5]을 로그로 수집합니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.


[1]: https://docs.gitlab.com/ee/administration/audit_event_reports.html
[2]: https://app.datadoghq.com/logs?query=source%3Agitlab-audit-events
[3]: https://docs.datadoghq.com/ko/logs/
[4]: https://app.datadoghq.com/integrations?search=GitLab%20Audit%20Events
[5]: https://docs.gitlab.com/ee/user/compliance/audit_event_types.html
[6]: https://docs.datadoghq.com/ko/help