---
disable_toc: false
further_reading:
- link: service_management/case_management/create_case
  tag: 설명서
  text: 케이스 생성하기
title: 프로젝트
---

## 개요

프로젝트는 일련의 케이스를 보유하는 컨테이너 개체입니다. 팀, 서비스, 이니셔티브 등 조직에 적합한 그룹을 중심으로 작업을 구성하세요. 각 프로젝트의 케이스는 서로 분리되어 있어 관련 사항에 집중할 수 있습니다.

## 프로젝트 생성하기

{{< img src="service_management/case_management/projects/projects_create_a_project_cropped.png" alt="Case management Settings에서 새 프로젝트 페이지 생성" style="width:100%;" >}}

프로젝트를 생성하려면:
1. Projects 보기에서 **New Project**를 선택하거나 왼쪽 탐색 모음에서 *Your Projects* 옆에 있는 **+** 아이콘을 클릭합니다.
1. 프로젝트 이름과 키를 입력하세요. 프로젝트 키의 길이는 1~10자 사이여야 하며 변경할 수 없습니다. 케이스 ID 번호 앞에는 문자 조합이 붙습니다(예: `NOC-123`).
1. **Create Project**를 클릭합니다.

프로젝트를 생성한 후 한 명 이상의 사용자 또는 Datadog 팀을 구성원으로 추가합니다. 구성원으로 속해 있는 프로젝트는 왼쪽 탐색 모음의 **Your Projects** 섹션에 표시됩니다.

##  프로젝트 참여하기

{{< img src="/service_management/case_management/projects/join_a_project_cropped.png" alt="프로젝트에 참여하기 위한 버튼 옵션을 보여주는 프로젝트 페이지" style="width:100%;" >}}

왼쪽 탐색 모음에 있는 **Projects** 보기에서 조직 내의 프로젝트를 찾으세요. 누구나 모든 프로젝트를 보고 참여할 수 있습니다. 또한 프로젝트 구성원인지 여부에 관계없이 누구나 어떤 프로젝트에서든 케이스를 만들고 할당할 수 있습니다.

## 프로젝트 삭제하기

<div class="alert alert-danger">삭제된 케이스는 복구할 수 없습니다.</div>

프로젝트의 Settings 페이지에서 프로젝트를 삭제할 수 있습니다.

프로젝트를 삭제하면 그 안의 모든 케이스도 삭제됩니다. 케이스를 보관하려면 Datadog에서는 삭제하기 전에 케이스를 다른 프로젝트로 이동할 것을 권장합니다.

프로젝트를 삭제하면 프로젝트에 연결된 모든 이벤트 상관 관계 패턴이 자동으로 비활성화됩니다. Datadog Workflows를 통한 케이스 생성이나 `@case` 멘션 모니터링과 같은 다른 자동화도 연결된 프로젝트를 삭제하면 중단됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}
