---
aliases:
- /ko/service_management/case_management/automation_rules/
- /ko/incident_response/case_management/automation_rules/
further_reading:
- link: /incident_response/work_management
  tag: 설명서
  text: Work Management에 대해 자세히 알아보기
title: 작업 항목 자동화 규칙
---
## 개요 {#overview}

Work Item Automation Rules는 특정 조건이 충족될 때 자동으로 액션을 트리거하여 인시던트 관리 워크플로를 간소화하며, 팀이 대응 프로세스를 표준화할 수 있도록 합니다.

다음 네 가지 주요 트리거를 기반으로 자동화된 액션을 정의할 수 있습니다.
- **작업 항목 생성** - 새 작업 항목을 온콜 팀원에게 자동으로 할당
- **상태 변경** - 작업 항목이 상태 간에 이동할 때 후속 액션을 트리거
- **속성 변경** - 우선순위와 같은 작업 항목 속성이 수정될 때 즉시 대응
- **작업 항목 승인** - 작업 항목이 승인되거나 거부될 때 워크플로 트리거

이러한 기능은 수동 작업을 줄이고 더 빠른 응답 시간을 제공합니다. 팀은 작업 항목 관리 대신 문제 해결에 집중할 수 있으며, 규정 준수 및 가시성을 위한 전체 감사 투명성을 통해 일관된 작업 항목 처리를 보장합니다.

## 자동화 규칙 구성 {#configuring-automation-rules}

자동화 규칙을 구성하려면 다음 단계를 따르세요.
1. **[Work Management > 설정][1]**으로 이동합니다.
1. 자동화 규칙을 생성할 프로젝트를 선택합니다.
1. **Automation**을 선택합니다.
1. **New Rule**을 클릭합니다.

구성에 다음 내용을 추가합니다.

1. **트리거 정의** - 자동화 규칙을 실행할 시기를 선택합니다.
    1. 작업 항목 생성 시
    1. 작업 항목의 상태가 변경될 때
    1. 작업 항목 속성이 추가되거나 삭제될 때
    1. 작업 항목이 승인되거나 거부될 때
1. **워크플로 선택** - [Workflow Automation][2]을(를) 사용하여 다음과 같은 액션을 자동화합니다.
    1. 팀 구성원에게 작업 항목 할당
    1. 코멘트 추가
    1. 해결된 작업 항목 닫기
1. **규칙 활성화 및 이름 지정** - 규칙에 구체적인 이름을 설정하고 활성화 또는 비활성화 여부를 선택합니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/work/settings
[2]: /ko/actions/workflows/