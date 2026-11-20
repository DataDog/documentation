---
aliases:
- /ko/service_management/case_management/projects/
- /ko/incident_response/case_management/projects/
disable_toc: false
further_reading:
- link: incident_response/work_management/create_work_item
  tag: 설명서
  text: 작업 항목 생성
title: 프로젝트
---
## 개요 {#overview}

프로젝트는 작업 항목 세트를 보관하는 컨테이너 개체입니다. 팀, 서비스, 이니셔티브 등 조직에 적합한 그룹을 중심으로 작업을 구성하세요. 각 프로젝트의 작업 항목은 서로 격리되어 있어 관련 작업에 집중할 수 있습니다.

## 프로젝트 생성 {#create-a-project}

프로젝트를 생성하려면 다음 단계를 따르세요.
1. Projects 조회에서 **New Project**를 선택하거나 왼쪽 탐색 바에서 *Your Projects* 옆에 있는 **+** 아이콘을 클릭합니다.
1. 프로젝트 이름과 키를 입력합니다. 프로젝트 키는 1~10자 사이여야 합니다. 작업 항목 ID 번호 앞에는 문자 조합 접두사가 붙습니다(예: `NOC-123`). 프로젝트 키는 변경할 수 없습니다.
1. **Create Project**를 클릭합니다.

## 프로젝트 삭제 {#delete-a-project}

<div class="alert alert-danger">삭제된 작업 항목은 복구할 수 없습니다.</div>

프로젝트의 Settings 페이지에서 프로젝트를 삭제할 수 있습니다.

프로젝트를 삭제하면 해당 프로젝트 내의 모든 작업 항목도 삭제됩니다. 작업 항목을 유지하려면 삭제하기 전에 다른 프로젝트로 작업 항목을 이동하는 것이 좋습니다.

프로젝트를 삭제하면 해당 프로젝트와 연결된 모든 이벤트 상관관계 패턴이 자동으로 비활성화됩니다. 연결된 프로젝트를 삭제하면 Datadog 워크플로를 통한 작업 항목 생성이나 모니터링 `@case` 멘션과 같은 다른 자동화 기능도 중단됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}