---
app_id: jumpcloud
app_uuid: 37f8026f-e2ac-4a71-9270-0b03fab814cc
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 613
    source_type_name: Jumpcloud
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 이벤트 관리
- 보안
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: jumpcloud
integration_id: jumpcloud
integration_title: Jumpcloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: jumpcloud
public_title: Jumpcloud
short_description: Datadog에서 Jumpcloud 이벤트 보기
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::이벤트 관리
  - Category::Security
  - 제공::통합
  configuration: README.md#Setup
  description: Datadog에서 Jumpcloud 이벤트 보기
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Jumpcloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

JumpCloud는 사용자 인증 및 네트워크 관리를 중심으로 Active Directory 및 LDAP 서비스에 대한 통합 접근 방식을 제공하는 클라우드 기반 디렉터리 플랫폼입니다. 

JumpCloud를 사용하여 기업은 소프트웨어, 시스템 및 네트워크에 대한 사용자 액세스를 관리 및 프로비저닝하고, 감사 추적을 준수하며, SSO(Single-Sign-On)를 통해 통합 로그인 환경을 제공할 수 있습니다. 클라우드 네이티브 플랫폼인 JumpCloud는 기존의 디렉토리 요구사항에 대한 도메인 없는 보안 솔루션을 제공하여 원격의 유연한 IT 관리 형태를 지원합니다.

JumpCloud 통합은 다음에 대한 액세스를 제공합니다.

- 디렉터리 이벤트: 포털의 활동 로그는 다음에 대한 관리자 변경 사항을 포함합니다.
  포털에 대한 관리자/사용자 인증 및 디렉터리

- SAML 이벤트: 로그 SAML 애플리케이션에 대한 사용자 인증을 기록합니다.

- RADIUS 이벤트: WiFI 및 VPN을 사용한 RADIUS 사용자 인증을 기록합니다.

- MacOS, Windows 및 Linux 이벤트: 시스템에 대한 사용자 인증을 기록합니다.
  잠금, 비밀번호 변경 및 파일 디스크 등 에이전트 관련 이벤트 포함
  암호화 키 업데이트입니다.

- LDAP 이벤트: LDAP 바인드 및 검색 이벤트 유형 등
  사용자 인증을 기록합니다.

- MDM 이벤트: MDM 명령 결과를 기록합니다.

자세한 정보는 [Datadog를 사용한 JumpCloud 디렉터리 모니터링][1] 및 [Insights API 레퍼런스][2]를 참조하세요.

## 설정

### 설치

설치가 필요하지 않습니다.

### 구성

자세한 내용은 통합 타일을 참조하세요. JumpCloud 관리자 포털에서 API 키가 필요합니다.


## 수집한 데이터

### 로그

로그는 단일 API 엔드포인트에서 수집됩니다. [Insights API][2]를 참조하세요.

### 메트릭

JumpCloud 통합은 메트릭을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://www.datadoghq.com/blog/monitor-jumpcloud-directory/
[2]: https://docs.jumpcloud.com/api/insights/directory/1.0/index.html
[3]: https://docs.datadoghq.com/ko/help/