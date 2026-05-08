---
further_reading:
- link: /service_management/events/ingest//
  tag: doc
  text: Datadog에 이벤트 전송
- link: /service_management/events/correlation/
  tag: doc
  text: 이벤트 상관관계에 대해 자세히 알아보기
- link: https://www.datadoghq.com/blog/datadog-event-management/
  tag: 블로그
  text: AIOps 기반 Event Management를 통해 더 빠르게 알림을 집계하고 상호 연관성을 파악하여 조치를 취하세요.
title: Event Management Triage Inbox
---

## 개요

Datadog Event Management의 [Triage Inbox][4]는 다양한 소스에서 발생한 관련 이벤트를 실행 가능한 케이스로 통합하여 인시던트 대응을 간소화합니다. 이 중앙 집중식 뷰는 노이즈를 줄이고, 팀이 보다 효과적으로 트리아지, 조사 및 협업할 수 있도록 지원합니다. 사용자 정의 가능한 저장된 뷰를 통해 우선순위가 높은 케이스에 집중할 수 있으며, 상호 연관된 알림, 관련 변경 사항 및 텔레메트리 데이터를 한 곳에서 확인할 수 있습니다.

## 케이스 트리아지 및 조사

케이스 트리아지 및 조사는  Triage Inbox에서 시작되며, 여기에서 수신된 케이스를 정렬, 필터링, 관리할 수 있습니다. Datadog 내부뿐 아니라 외부의 팀원과도 협업하여 대응을 조율할 수 있습니다. 이후 필요에 따라 케이스의 우선순위를 지정하고, 담당자를 할당하며, 조사 및 에스컬레이션하여 보다 신속한 해결을 이끌 수 있습니다.

{{< img src="/service_management/events/triage_inbox/event_mgmt_inbox.mp4" alt="우선순위별 정렬, 상태 및 우선순위 변경 기능을 갖춘 Event Management Inbox" video=true >}}

## 시작하기

1. [**Service Management** > **Event Management** > **Triage Inbox**][4]로 이동합니다.
2. 왼쪽 패널에서 프로젝트를 선택하면 **Open**, **In Progress**, **Closed** 및 **Archived**와 같은 기본 제공 상태 뷰가 표시됩니다.
3. 디스플레이 설정 아이콘을 사용하여 **split view**(케이스 상세 조사용) 또는 **table view**(대량 케이스 검토 및 열 구성용) 중에서 선택할 수 있습니다. Sort By 드롭다운을 사용해 인박스 정렬 기준을 사용자 지정할 수 있으며, **Priority**, **Created at** 또는 **Last Updated**와 같은 옵션을 선택할 수 있습니다. **Save**를 클릭하면 사용자 지정한 인박스를 이후에도 다시 사용할 수 있습니다.
5. 트리아지 중 케이스 카드에서 상태, 우선순위 및 담당자를 직접 업데이트할 수 있습니다.
6. 왼쪽 케이스 프로젝트 패널과 Datadog 탐색 바를 접어 화면 공간을 최대화할 수 있습니다.
7. 케이스 카드의 **alert** 수에 마우스를 올리면 연관된 알림을 미리 볼 수 있습니다.

## 다음 단계

이제 케이스를 트리아지하고 조사하는 방법을 익혔으므로, 이러한 도구를 활용하여 팀과 [협업](#collaborate-and-integrate)하고, 근본 원인에 대해 [조치](#take-action)하며, 대응 프로세스를 간소화할 수 있습니다.

## 협업 및 통합

오른쪽 분할 보기 측면 패널에서 다음 작업을 수행할 수 있습니다.

- **태그 및 댓글**: 사용자 태그 지정 및 메모 추가를 통해 케이스 타임라인에서 팀원과 협업할 수 있습니다.
- **알림 전송**: Slack, Microsoft Teams, 이메일 또는 웹훅을 통해 이해관계자에게 알림을 보낼 수 있습니다.
- **이슈 에스컬레이션:** [Incident Management][1], [On-Call][2], [Workflow Automation][3] 또는 타사 도구를 사용하여 인시던트를 트리거하거나 온콜 담당자에게 페이지를 보낼 수 있습니다.
- **외부 도구와 동기화:** Jira 및 ServiceNow 레코드를 동기화하여 외부 이해관계자가 최신 상태를 유지할 수 있도록 합니다.

   {{< img src="/service_management/events/triage_inbox/event_mgmt_inbox_right_hand_panel.png" alt="Event Management 인박스 오른쪽 패널, Escalate 드롭다운 강조 표시" style="width:100%;" >}}

## 조치

- **근본 원인 표시**: 결함이 있는 변경 사항과 같은 관련 이벤트를 식별하여 근본 원인으로 표시합니다.
- **워크플로 실행**: 복구 런북을 수동으로 실행하거나 [Case Automation Rules][5]를 사용해 조건에 따라 트리거할 수 있습니다.
- **케이스 병합**: 관련 케이스를 결합하여 조사를 단순화합니다.
- **케이스 분할**: 개별 조사가 필요한 알림을 나눕니다.

**참고**: 케이스의 모든 알림이 해결되면 시스템이 해당 케이스를 자동으로 종료합니다. 또한 케이스를 수동으로 해결됨으로 표시할 수도 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/service_management/incident_management/
[2]: /ko/service_management/on-call/
[3]: /ko/actions/workflows/
[4]: https://app.datadoghq.com/event/correlation
[5]: /ko/service_management/case_management/automation_rules/