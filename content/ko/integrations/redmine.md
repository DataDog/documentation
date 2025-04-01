---
categories:
- collaboration
- developer tools
- issue tracking
custom_kind: integration
dependencies: []
description: Datadog 이벤트 스트림에서 Redmine 업데이트를 확인, 검색, 논의하세요.
doc_link: https://docs.datadoghq.com/integrations/redmine/
draft: false
git_integration_title: redmine
has_logo: true
integration_id: redmine
integration_title: Redmine
integration_version: ''
is_public: true
manifest_version: '1.0'
name: redmine
public_title: Datadog-Redmine 통합
short_description: Datadog 이벤트 스트림에서 Redmine 업데이트를 확인, 검색, 논의하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Redmine은 오픈 소스 프로젝트 관리 웹 애플리케이션입니다. Datadog에서 Redmine 활동을 캡처하여 다음을 수행합니다.

- 개발 주기를 추적합니다.
- Datadog 이벤트 스트림에서 미해결 문제를 확인합니다.
- 팀과 함께 프로젝트에 대해 논의합니다.

Redmine 구성에는 원하는 활동 피드에 대한 전체 URL이 필요합니다. 여러 개의 URL을 추가할 수 있습니다.

## 설정

### 설치

통합을 구성하려면 [Redmine 통합 타일][1]을 참조하세요.

## 수집한 데이터

### 메트릭

Redmine 통합은 메트릭을 포함하지 않습니다.

### 이벤트

생성된 모든 이슈는 Datadog 내에서 이벤트로 나타납니다. 통합을 설치하고 구성한 후 [Events Explorer][2]에서 `source:redmine`을 검색하여 Redmine 활동 피드에서 문제를 확인할 수 있습니다.

### 서비스 점검

Redmine 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://app.datadoghq.com/integrations/redmine
[2]: https://docs.datadoghq.com/ko/service_management/events/explorer/
[3]: https://docs.datadoghq.com/ko/help/