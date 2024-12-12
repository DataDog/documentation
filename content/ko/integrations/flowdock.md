---
categories:
- collaboration
- notifications
custom_kind: 통합
dependencies: []
description: Datadog 알림과 그래프를 팀 플로우에 전송하기.
doc_link: https://docs.datadoghq.com/integrations/flowdock/
draft: false
git_integration_title: flowdock
has_logo: true
integration_id: ''
integration_title: Flowdock
integration_version: ''
is_public: true
manifest_version: '1.0'
name: flowdock
public_title: Datadog-Flowdock 통합
short_description: Datadog 알림과 그래프를 팀 플로우에 전송하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/flowdock/flowdock_overview.png" alt="Flowdock 개요" popup="true">}}

## 개요

FlowDock과 통합하면 다음 작업을 할 수 있습니다.

- 스트림에 게시물이 올라올 때 알림 받기
- 모니터 알림을 받고 내 플로우 내에서 통합 상태 변경 및 많은 작업 가능

Datadog에서는 Flowdock의 스레드를 이용해 플로우가 알림으로 혼잡해지는 것을 방지합니다. 특정 플로우에서 각 알림이 자체 스레드로 이동하며, 관련 알림은 같은 스레드로 이동합니다(예: 특정 모니터 알림이 트리거되고 해결된 경우 해당 알림이 Flowdock에서 그룹화됨).

## 설정

### 설치

Flowdock을 Datadog와 통합하려면 Flowdock의 **Configuration** 탭을 사용하세요. 그러면 열린 플로우를 모두 가져옵니다. 플로우를 모두 게시하고 싶지 않으면 자동 완성 목록에 표시하지 않을 항목을 삭제할 수 있습니다. 그 후 사용자 메시지나 모니터에서 `@flowdock` 핸들을 사용해 내 플로우에 메시지를 게시할 수 있습니다.

사용자 메시지와 스냅샷은 내 플로우의 주요 스레드로 이동하고 각 알림은 Flowdock 자체 스레드에 게시됩니다. 그러면 주요 스레드가 알림으로 혼잡해지는 것을 방지할 수 있어 팀 채팅방을 깨끗하고 정리된 상태로 유지할 수 있습니다. 그러나 수신함 보기를 통해 항상 최신 보고된 모니터 상태를 즉각 확인할 수 있습니다.

## 수집한 데이터

### 메트릭

Flowdock 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

Flowdock 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Flowdock 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? 그러면 [Datadog 고객지원][1]에 연락하세요.

[1]: https://docs.datadoghq.com/ko/help/