---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /ko/workflows/build
- /ko/service_management/workflows/build
description: Blueprints에서 워크플로를 생성하거나 AI 지원, 수동 구성, 드래그 앤 드롭 작업을 통해 사용자 지정 워크플로를 빌드합니다.
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: 설명서
  text: Workflow Automation 시작
- link: /actions/actions_catalog
  tag: 설명서
  text: Action Catalog에서 사용 가능한 작업 살펴보기
- link: /security/cloud_security_management/workflows
  tag: 설명서
  text: Workflow Automation을 통한 보안 워크플로 자동화
- link: /actions/workflows/variables
  tag: 설명서
  text: 변수 및 파라미터
title: 워크플로 빌드
---
[Workflow Automation][1] 페이지에서 워크플로를 생성하거나 기존 워크플로를 편집할 수 있습니다. 이 페이지는 워크플로 소유자, 트리거 유형, 각 워크플로가 마지막으로 수정 및 실행된 날짜, 워크플로 게시 여부 등 기존 워크플로에 대한 정보를 안내합니다.
- 워크플로 위에 마우스를 올리면 워크플로 삭제, 복제, 권한 편집 옵션이 표시됩니다.
- 본인이 생성한 워크플로만 확인하려면 {{< ui >}}My workflows{{< /ui >}}를 토글합니다.

## Blueprints에서 워크플로 빌드 {#build-a-workflow-from-a-blueprint}

1. [**Blueprints**][5] 탭을 클릭합니다.
1. 필요한 경우 검색 창을 사용하여 이름, 카테고리, 통합별로 Blueprints 목록 범위를 좁힙니다.
1. 사용하려는 Blueprint를 찾아 클릭합니다. 워크플로 캔버스가 나타납니다.
1. {{< ui >}}Create From Blueprint{{< /ui >}}를 클릭합니다. 워크플로 캔버스가 업데이트되어 새로 생성한 워크플로가 표시됩니다.
1. 워크플로의 새 이름과 설명을 입력합니다.
1. (선택 사항) 워크플로에 적용하려는 태그를 선택하거나 입력합니다. Datadog 태그에 대한 자세한 내용은 [태그 시작하기][7]를 참조하세요.
1. (선택 사항) 워크플로에 적용하려는 관련 [서비스][8]를 선택합니다.
1. (선택 사항) 워크플로와 연결하려는 [팀][9]을 선택합니다. 팀이 존재하지 않는 경우 이름을 입력하여 팀을 생성할 수 있습니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭하여 변경 사항을 적용합니다.
1. 업데이트가 필요한 워크플로 단계는 느낌표로 표시됩니다. 수정하려는 각 워크플로 단계를 클릭하고 {{< ui >}}Configure{{< /ui >}} 탭의 비어 있는 필드를 채웁니다.
1. 워크플로 수정을 완료하면 {{< ui >}}Run{{< /ui >}}을 클릭하여 워크플로를 테스트합니다.
1. 워크플로를 게시할 준비가 되면 {{< ui >}}Publish{{< /ui >}}를 클릭합니다. 게시된 워크플로는 워크플로 실행 횟수를 기준으로 비용이 발생합니다. 자세한 내용은 [Datadog 비용 페이지][4]를 참조하세요.

## AI로 워크플로 생성/편집 {#create-a-workflow-with-ai}

어디에서 시작해야 할지 잘 모르겠다면, 워크플로를 자동으로 생성하거나 AI로 기존 워크플로를 반복해서 개선할 수 있습니다.

워크플로 생성하기:
1. [Workflow Automation][1] 페이지에서 {{< ui >}}New Workflow{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Create a workflow with AI{{< /ui >}}를 클릭합니다.
1. 워크플로에 대한 상세 프롬프트를 입력합니다. 사용하려는 통합 및 작업을 지정합니다.
1. 위쪽 화살표({{< ui >}}↑{{< /ui >}})를 클릭하여 워크플로를 생성합니다.

기존 워크플로를 반복해서 개선하기
1. 기존 워크플로에서 {{< ui >}}Edit with AI{{< /ui >}}를 클릭합니다.
1. 워크플로에 추가하려는 동작의 상세 프롬프트를 입력합니다. 사용하려는 통합 및 작업을 포함합니다.
1. 위쪽 화살표({{< ui >}}↑{{< /ui >}})를 클릭하여 해당 기능을 워크플로에 추가합니다.

<div class="alert alert-info">Workflow Automation AI는 제품 관련 질문에 답변하지 않습니다. 질문이나 피드백이 있으시면 <a href="https://chat.datadoghq.com/">Datadog 커뮤니티 슬랙</a>의 <strong>#workflows</strong> 채널 참여를 고려하세요.</div>

## 사용자 지정 워크플로 생성 {#create-a-custom-workflow}

워크플로를 생성하려면 [Workflow Automation][1] 페이지에서 {{< ui >}}New workflow{{< /ui >}}를 클릭합니다.

워크플로 구성하기:
1. 워크플로 구성 패널에서 워크플로의 {{< ui >}}Name{{< /ui >}}을 입력합니다.
1. (선택 사항) 워크플로에 적용하려는 태그를 선택하거나 입력합니다. Datadog 태그에 대한 자세한 내용은 [태그 시작하기][7]를 참조하세요.
1. (선택 사항) 워크플로에 적용하려는 관련 [서비스][8]를 선택합니다.
1. (선택 사항) 워크플로와 연결하려는 [팀][9]을 선택합니다. 팀이 존재하지 않는 경우 이름을 입력하여 팀을 생성할 수 있습니다.
1. 워크플로에서 사용하는 입력/출력 파라미터를 입력합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭하여 변경 사항을 적용합니다.

워크플로 구성이 적합한지 잘 모르겠다면, 나중에 워크플로 캔버스의 아무 곳이나 클릭하여 패널로 돌아올 수 있습니다.

### 워크플로 빌더로 워크플로 구축 {#build-a-workflow-with-the-workflow-builder}

1. 워크플로 트리거가 필요한 경우 {{< ui >}}Add Trigger{{< /ui >}}를 클릭합니다. 자세한 내용은 [워크플로 트리거][3]를 참조하세요.
1. {{< ui >}}Add Step{{< /ui >}}을 클릭하면 워크플로에 단계를 추가됩니다.
1. 검색창에서 작업을 검색하거나 통합 및 관련 작업을 탐색하여 원하는 작업을 찾습니다. 작업을 클릭하여 워크플로 캔버스에 단계로 추가합니다.
1. 워크플로 캔버스에서 단계를 클릭하여 구성하거나 출력/컨텍스트 변수를 확인합니다. 출력 및 컨텍스트 변수에 대한 자세한 내용은 [Context variables][14]를 참조하세요.
1. 단계를 구성한 후 AI 아이콘 <i class="icon-bits-ai"></i> 또는 더하기 아이콘({{< ui >}}\+{{< /ui >}})을 클릭하여 다른 단계를 추가하거나 완료 후 워크플로를 저장합니다.
1. 워크플로를 게시할 준비가 되면 {{< ui >}}Publish{{< /ui >}}를 클릭합니다. 게시된 워크플로는 워크플로 실행 횟수를 기준으로 비용이 발생합니다. 자세한 내용은 [Datadog 비용 페이지][4]를 참조하세요.

워크플로의 단계를 클릭하면 언제든지 편집할 수 있습니다. 워크플로의 단계를 클릭하고 드래그하여 다시 배치합니다.

#### 바로가기 및 캔버스 도구 {#shortcuts-and-canvas-tools}

워크플로 빌더 캔버스의 키보드 및 마우스 바로가기를 보려면 `?`(shift+`/`)을 입력하거나 {{< ui >}}Keyboard{{< /ui >}} {{< img src="actions/workflows/build/keyboard-icon.png" inline="true" style="width:40px;">}} 버튼을 클릭합니다. 그러면 바로가기 목록이 나타납니다.

{{< ui >}}Zoom out{{< /ui >}} {{< img src="actions/workflows/build/zoom-out-mag-icon.png" inline="true" style="width:30px;">}}, {{< ui >}}Zoom in{{< /ui >}} {{< img src="actions/workflows/build/zoom-in-mag-icon.png" inline="true" style="width:30px;">}}, {{< ui >}}Reset viewport{{< /ui >}} {{< img src="actions/workflows/build/reset-viewport-icon.png" inline="true" style="width:34px;">}} 버튼으로 뷰포트 표시 방식을 제어합니다.

{{< ui >}}Auto layout{{< /ui >}} {{< img src="actions/workflows/build/auto-layout-icon.png" inline="true" style="width:80px;">}} 버튼으로 워크플로 단계를 정렬하고 배치합니다.

{{< ui >}}Add annotation{{< /ui >}} {{< img src="actions/workflows/build/add-annotation-icon.png" inline="true" style="width:30px;">}} 버튼으로 워크플로에 주석 메모를 추가할 수 있습니다. 이 메모는 굵게, 기울임꼴, 링크, 목록 등 다양한 텍스트 서식을 추가할 수 있는 서식 표시줄을 제공합니다. 또한 마크다운 형식으로 주석을 입력할 수 있습니다.

{{< img src="actions/workflows/build/workflow-annotation-with-bar.png" alt="서식 표시줄이 위에 표시된 빈 주석" style="width:70%;" >}}

## 단계 테스트 {#test-a-step}

[단계 테스트 방법][11]에 대한 자세한 내용은 테스트 및 디버그 페이지를 참조하세요.

## 워크플로 게시 {#publish-a-workflow}

예약 및 트리거된 워크플로는 게시하기 전까지 자동으로 트리거되지 않습니다. 워크플로를 게시하려면 워크플로 페이지에서 {{< ui >}}Publish{{< /ui >}}를 클릭합니다.

게시된 워크플로는 워크플로 실행 횟수를 기준으로 비용이 발생합니다. 자세한 내용은 [Datadog 비용 페이지][4]를 참조하세요.

### 게시된 워크플로 업데이트 {#updating-a-published-workflow}

준비가 완료될 때까지 라이브 버전에 영향을 주지 않고 게시된 워크플로를 업데이트할 수 있습니다.

게시된 워크플로를 편집하면 초안이 생성됩니다. 초안의 모든 변경 사항은 게시된 워크플로에 적용되지 않습니다. 각 워크플로에는 모든 편집자가 수정할 수 있는 하나의 활성 초안이 포함될 수 있습니다. 준비가 완료되면 {{< ui >}}Publish Changes{{< /ui >}}를 클릭하여 게시된 버전을 바꿉니다.

초안은 일반 워크플로와 마찬가지로 구성된 단계를 모두 실행합니다. 초안은 워크플로 편집기에서만 실행 가능합니다.

초안을 삭제하려면 편집기 오른쪽 상단 모서리의 {{< ui >}}cog icon{{< /ui >}}을 클릭하고 {{< ui >}}Discard draft{{< /ui >}}를 선택합니다.

**참고**:
- 게시된 워크플로 초안을 실행하는 과정에서 비용이 발생하지 않습니다.
- 워크플로 속성(이름, 태그, 알림)에 대한 모든 업데이트 내용은 초안 작성 흐름을 우회하여 게시된 버전에 즉시 적용됩니다.

## 변수 및 파라미터 {#variables-and-parameters}

워크플로에서 변수 및 파라미터를 사용하는 방법에 대한 자세한 내용은 [변수 및 파라미터][12]를 참조하세요.

## 워크플로 알림 {#workflow-notifications}

성공/실패 알림을 보내도록 워크플로를 구성할 수 있습니다. 지원되는 통합은 다음과 같습니다.
- Slack
- Microsoft Teams
- PagerDuty
- 이메일

알림 추가하기
1. 워크플로 구성 패널에서 {{< ui >}}Notifications{{< /ui >}} 섹션으로 스크롤합니다.
1. 워크플로가 성공적으로 완료될 경우 알림 추가하기
   1. {{< ui >}}Notify on success{{< /ui >}} 옆의 더하기({{< ui >}}\+{{< /ui >}}) 아이콘을 클릭합니다.
   1. 알림 목적으로 사용할 통합을 선택합니다.
   1. 지정된 통합에 필요한 필드를 작성합니다.
   1. {{< ui >}}Save{{< /ui >}}를 클릭하여 워크플로를 저장합니다.
1. 워크플로가 실패할 경우 알림 추가하기:
   1. {{< ui >}}Notify on failure{{< /ui >}} 옆의 더하기({{< ui >}}\+{{< /ui >}}) 아이콘을 클릭합니다.
   1. 알림 목적으로 사용할 통합을 선택합니다.
   1. 지정된 통합에 필요한 필드를 작성합니다.
   1. {{< ui >}}Save{{< /ui >}}를 클릭하여 워크플로를 저장합니다.

## 오류 처리 {#error-handling}

워크플로에서 실패한 단계를 재시도하는 횟수와 간격을 지정한 후 선택적 오류 경로로 이동할 수 있습니다. 오류 경로가 없으면 모든 재시도가 소진되는 시점에 워크플로가 종료됩니다.

### 재시도 {#retries}

단계 재시도 구성하기:
1. 워크플로 캔버스에서 단계를 클릭합니다.
1. {{< ui >}}Retries{{< /ui >}} 섹션에서 {{< ui >}}Interval{{< /ui >}} 및 {{< ui >}}Max retries{{< /ui >}} 값을 조정합니다.
1. 워크플로를 저장하여 변경 사항을 적용합니다.

### 오류 경로 추가 {#add-an-error-path}

워크플로에서 오류가 발생할 경우 따라야 할 오류 경로를 추가할 수 있습니다.

오류 경로 추가하기:
1. 오류 경로를 추가하려는 단계 위에 마우스를 올립니다.
1. {{< ui >}}Error path{{< /ui >}} 아이콘을 클릭하고 드래그하여 {{< img src="actions/workflows/build/error-path-icon.png" inline="true" style="width:24px;">}} 캔버스에 새 오류 경로를 배치합니다.
1. 오류 경로에 추가하려는 워크플로 단계를 선택합니다.
1. 단계를 구성한 후 오류 경로에 단계를 추가하거나 오류 경로를 기본 워크플로 경로로 다시 병합할 수 있습니다.
1. 오류 경로 단계 구성을 완료하면 {{< ui >}}Save{{< /ui >}}를 클릭하여 변경 사항을 적용합니다.

## 조건 충족 시점까지 대기 {#wait-until-condition}

일부 작업에서는 워크플로에서 단계를 '완료'로 표시하고 계속 진행하기 전에 충족해야 하는 조건을 추가할 수 있습니다.

조건 추가하기:
1. 워크플로 캔버스에서 단계를 클릭합니다.
1. {{< ui >}}Wait until condition{{< /ui >}} 섹션에서 드롭다운을 사용하여 사전 구성된 조건을 선택하거나 {{< ui >}}Configure custom wait condition{{< /ui >}}을 선택하여 조건을 직접 추가합니다.
   - 사용 가능한 사전 구성된 조건 목록은 작업에 따라 다릅니다.
   - 조건문 변수는 문자열, 숫자, 부울, 단계 출력 변수일 수 있습니다.
   - 사용자 지정 조건문에는 현재 단계의 출력 변수만 사용할 수 있습니다.
1. 워크플로의 최대 대기 시간을 입력합니다. 정해진 시간 내에 조건이 충족되지 않으면 단계가 실패합니다.

{{< img src="actions/workflows/build/wait-until-condition2.png" alt="조건 충족 대기 예시" style="width:100%;" >}}

## JSON으로 워크플로 편집 {#edit-a-workflow-with-json}

워크플로 페이지에서 {{< ui >}}Edit JSON Spec{{< /ui >}}을 클릭하여 JSON으로 워크플로를 편집합니다. 또한 JSON 편집기를 사용하여 다음을 수행할 수 있습니다.
- {{< ui >}}Format JSON{{< /ui >}}: JSON 형식을 보기 좋게 조정합니다.
- {{< ui >}}Export JSON{{< /ui >}}: 워크플로를 다운로드합니다.

## API를 사용한 워크플로 상호 작용{#interact-with-workflows-using-the-api}

API를 사용하여 작업을 수행하려면 [Workflow Automation API 설명서][13]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 슬랙][10]의 **#workflows** 채널에 참여하세요.

[1]: https://app.datadoghq.com/workflow
[2]: https://handlebarsjs.com/guide/expressions.html#expressions
[3]: /ko/actions/workflows/trigger
[4]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[5]: https://app.datadoghq.com/workflow/blueprints
[6]: /ko/actions/workflows/actions/#testing-expressions-and-functions
[7]: /ko/getting_started/tagging/
[8]: /ko/glossary/#service
[9]: /ko/account_management/teams/
[10]: https://chat.datadoghq.com/
[11]: /ko/actions/workflows/test_and_debug/#test-a-step
[12]: /ko/actions/workflows/variables/
[13]: /ko/api/latest/workflow-automation/
[14]: /ko/actions/workflows/variables/#context-variables