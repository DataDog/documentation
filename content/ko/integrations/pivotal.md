---
categories:
- Collaboration
- issue tracking
custom_kind: 통합
dependencies: []
description: ' Datadog 이벤트 스트림에서 스토리에 대한 댓글을 달 수 있습니다.'
doc_link: https://docs.datadoghq.com/integrations/pivotal/
draft: false
git_integration_title: pivotal
has_logo: true
integration_id: pivotal
integration_title: 피벗 트래커
integration_version: ''
is_public: true
manifest_version: '1.0'
name: pivotal
public_title: Datadog-Pivotal Tracker 통합
short_description: ' Datadog 이벤트 스트림에서 스토리에 대한 댓글을 달 수 있습니다.'
team: 웹-통합
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

[Pivotal Tracker]][1]는 스토리를 사용하여 팀이 프로젝트를 추적할 수 있도록 해줄 뿐만 아니라 새로운 기능을 구축하고, 버그를 해결하며, 기술 기술적 문제를 처리하는 등 개발 주기 각기 다른 부분에서 협업할 수 있도록 돕습니다. Pivotal Tracker를 Datadog 연결하여 다음 혜택을 누리세요.

- Datadog 이벤트 탐색기에서 스토리의 진행 상황을 확인하고 논의합니다.
- 시스템 내 다른 이벤트와 메트릭에 완결된 스토리를 연계하고 그래프화합니다.
- 알림을 수신하여 스토리를 업데이트합니다.

## 설정

### 설치

Datadog 이벤트 탐색기에서 Pivotal 이벤트를 받으려면 Pivotal [프로필 페이지][2]에서 생성된 API 토큰을 입력합니다.

{{< img src="integrations/pivotal/pivotal_token.png" alt="Pivotal 토큰" popup="true">}}

## 수집한 데이터

### 메트릭

 Pivotal Tracker 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

 Pivotal Tracker 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

 Pivotal Tracker에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://www.pivotaltracker.com/features
[2]: https://www.pivotaltracker.com/signin
[3]: https://docs.datadoghq.com/ko/help/