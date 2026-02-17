---
algolia:
  tags:
  - 워크플로우
  - 워크플로
  - 워크플로우 자동화
aliases:
- /ko/workflows/build
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: 설명서
  text: 워크플로 자동화 시작
- link: /actions/actions_catalog
  tag: 설명서
  text: Actions Catalog에서 사용 가능한 작업 찾아보기
- link: /security/cloud_security_management/workflows
  tag: 설명서
  text: Workflow Automation를 통한 보안 워크플로 자동화
- link: /service_management/workflows/variables
  tag: 문서
  text: 변수 및 매개변수
title: 워크플로 구축
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}})는 워크플로우 자동화를 지원하지 않습니다.</div>
{{< /site-region >}}

[Workflow Automation][1] 페이지에서 워크플로를 만들거나 기존 워크플로를 편집할 수 있습니다. 페이지에는 워크플로의 소유자, 트리거 유형, 각 워크플로가 마지막으로 수정 및 실행된 날짜, 각 워크플로의 게시 여부 등 기존 워크플로우에 관한 정보가 나열되어 있습니다.
- 워크플로에 마우스를 가져가면 워크플로에 대한 권한을 삭제, 복제 또는 편집할 수 있는 옵션이 표시됩니다.
- 내가 만든 워크플로만 보려면 **My workflows**를 토글합니다.

## 블루프린트에서 워크플로 빌드

1. [**Blueprints**][5] 탭을 클릭합니다.
1. 원하는 경우 검색창을 사용하여 이름, 카테고리, 또는 통합을 기준으로 블루프린트 목록의 범위를 좁힐 수 있습니다.
1. 사용하려는 블루프린트를 찾아 클릭합니다. 워크플로 캔버스가 나타납니다.
1. **Create From Blueprint**을 클릭합니다. 워크플로 캔버스가 업데이트되어 새로 만든 워크플로가 표시됩니다.
1. 워크플로의 새 이름과 설명을 입력합니다.
1. 선택 사항으로 워크플로에 적용하려는 태그를 선택하거나 입력합니다. Datadog 태그에 관한 자세한 내용은 [태그 시작하기][7]를 참조하세요.
1. 선택 사항으로 관련 [서비스][8]를 선택하여 워크플로에 적용할 수 있습니다.
1. 선택 사항으로 [팀][9]를 선택하여 워크플로에 연결합니다. 팀이 없는 경우 이름을 입력하여 팀을 만들 수 있습니다.
1. 변경 사항을 적용하려면 **Save**을 클릭합니다.
1. 워크플로 업데이트가 필요한 단계에는 느낌표가 표시되어 있습니다. 수정하려는 워크플로 단계를 각각 클릭하고 **Configure** 탭에서 빈 필드를 채웁니다.
1. 워크프로 수정이 완료되면 **Run**을 클릭하여 워크플로를 테스트합니다.
1. 워크플로를 게시할 준비가 되면 **Publish** 를 클릭합니다. 게시된 워크플로의 경우 워크플로 실행을 기준으로 비용이 발생합니다. 자세한 내용은 [Datadog 가격 페이지][4]를 참조하세요.

## AI로 워크플로 생성

어디서부터 시작해야 할지 잘 모르겠다면 AI를 사용하여 워크플로를 자동으로 생성할 수 있습니다. 워크플로 생성 방법:

1. [워크플로 자동화][1] 패이지에서 ***New Workflow**를 클릭합니다.
1. **<i class="icon-bits-ai"></i> Build with Bits AI**를 클릭합니다.
1. 워크플로에 관한 자세한 설명을 입력합니다. 사용하려는 연동 서비스 및 작업을 지정합니다.
1. 위쪽 화살표(**↑**)를 클릭하여 앱을 생성합니다.

## 커스텀 워크플로를 생성합니다.

워크플로를 생성하려면 [워크플로 자동화[1] 페이지에서 **New workflow**를 클릭합니다.

워크플로를 구성하는 방법:
1. 워크플로 구성 패널에서 워크플로의 **Name**을 입력합니다.
1. 선택 사항으로 워크플로에 적용하려는 태그를 선택하거나 입력합니다. Datadog 태그에 관한 자세한 내용은 [태그 시작하기][7]를 참조하세요.
1. 선택 사항으로 관련 [서비스][8]를 선택하여 워크플로에 적용할 수 있습니다.
1. 선택 사항으로 [팀][9]를 선택하여 워크플로에 연결합니다. 팀이 없는 경우 이름을 입력하여 팀을 만들 수 있습니다.
1. 워크플로에서 입력 또는 출력 매개변수를 사용하는 경우 입력합니다.
1. 변경 사항을 적용하려면 **Save**을 클릭합니다.

워크플로 구성이 확실하지 않은 경우 나중에 워크플로 캔버스의 아무 곳이나 클릭하여 패널로 돌아갈 수 있습니다.

### 워크플로 빌더로 워크플로를 빌드합니다.

1. 워크플로에 트리거가 필요한 경우 **Add Trigger**를 클릭합니다. 자세한 내용은 [워크플로 트리거][3]를 참조하세요.
1. 워크플로에 단계 추가를 시작하려면 **Add Step**를 클릭합니다.
1. 검색창에서 작업을 검색하거나 통합 및 관련 작업을 탐색하여 원하는 작업을 찾습니다. 작업을 클릭하여 워크플로 캔버스에 대상을 단계로 추가합니다.
1. 워크플로 캔버스에서 단계을 클릭하여 구성하거나 출력 또는 컨텍스트 변수를 확인합니다. 출력 및 컨텍스트 변수에 관한 자세한 내용은 [컨텍스트 변수][14]를 참조하세요.
1. 단계를 구성한 후 AI 아이콘(<i class="icon-bits-ai"></i>) 또는 더하기 아이콘(**+**)을 클릭하여 단계를 추가하거나, 완료되면 워크플로를 저장합니다.
1. 워크플로를 게시할 준비가 되면 **Publish**를 클릭합니다. 게시된 워크플로에는 워크플로 실행을 기준으로 비용이 발생합니다. 자세한 내용은 [Datadog 가격 페이지][4]를 참조하세요.

워크플로에서 언제든지 단계를 클릭하여 편집할 수 있습니다. 워크플로에서 단계를 클릭하고 드래그하여 재정렬할 수 있습니다.

#### 바로 가기 및 캔버스 도구

워크플로 빌더 캔버스에 대한 키보드 및 마우스 단축키를 보려면 `?`(shift+`/`)를 입력하거나 **Keyboard** {{< img src="service_management/workflows/keyboard-icon.png" inline="true" style="width:40px;">}} 버튼을 클릭합니다. 단축키 목록이 나타납니다.

**Zoom out** {{< img src="service_management/workflows/zoom-out-mag-icon.png" inline="true" style="width:30px;">}}, **Zoom in** {{< img src="service_management/workflows/zoom-in-mag-icon.png" inline="true" style="width:30px;">}} 및 **Reset viewport** {{< img src="service_management/workflows/reset-viewport-icon.png" inline="true" style="width:34px;">}} 버튼으로 뷰포트 표시 방식을 제어할 수 있습니다.

**Auto layout** {{< img src="service_management/workflows/auto-layout-icon.png" inline="true" style="width:80px;">}} 버튼으로 워크플로 단계를 정렬하고 배포할 수 있습니다.

**Add annotation** {{< img src="service_management/workflows/add-annotation-icon.png" inline="true" style="width:30px;">}} 버튼을 사용하면 워크플로에 주석 메모를 추가할 수 있습니다. 이 노트에는 굵게, 이탤릭체, 링크, 목록 등 다양한 텍스트 서식을 추가할 수 있는 서식 표시줄이 있습니다. 마크다운에서 주석을 입력할 수도 있습니다.

{{< img src="service_management/workflows/workflow-annotation-with-bar.png" alt="위에 서식 표시줄이 표시된 빈 주석" style="width:70%;" >}}

## 단계 테스트

[단계 테스트 방법][11]에 관한 정보는 테스트 및 디버그 페이지를 참조하세요.

## 워크플로 게시

예약 및 트리거된 워크플로는 게시할 때까지 자동으로 트리거되지 않습니다. 워크플로를 게시하려면 워크플로의 페이지에서 **Publish** 를 클릭합니다.

게시된 워크플로는 워크플로 실행을 기준으로 비용이 발생합니다. 자세한 내용은 [Datadog 가격 페이지][4]를 참조하세요.

## 변수 및 파라미터

워크플로에서 변수 및 매개변수를 사용하는 방법에 관한 자세한 내용은 [변수 및 매개변수][12]를 참조하세요.

## 워크플로 알림

성공 또는 실패 시 알림을 보내도록 워크플로를 구성할 수 있습니다. 다음과 같은 통합이 지원됩니다.
- Slack
- Microsoft Teams
- PagerDuty
- 이메일

알림을 추가하는 방법:
1. 워크플로 설정 패널에서 아래로 스크롤하여 **Notifications** 섹션으로 이동합니다.
1. 워크플로에 성공하면 알림을 추가합니다.
   1. **Notify on success** 옆에 있는 더하기(`+`) 아이콘을 클릭합니다.
   1. 알림에 사용할 통합 서비스를 선택합니다.
   1. 지정된 통합에 필요한 필수 필드를 입력합니다.
   1. **Save**를 클릭하여 워크플로를 저장합니다.
1. 워크플로 실패 시 알림을 추가합니다.
   1. **Notify on failure** 옆의 더하기(`+`) 아이콘을 클릭합니다.
   1. 알림에 사용할 통합 서비스를 선택합니다.
   1. 지정된 통합에 필요한 필수 필드를 입력합니다.
   1. **Save**를 클릭하여 워크플로를 저장합니다.

## 오류 처리

선택적 오류 경로로 이동하기 전에 워크플로에서 실패한 단계를 재시도할 횟수와 간격을 지정할 수 있습니다. 오류 경로가 없으면 모든 재시도가 완료된 후 워크플로가 종료됩니다.

### 재시도

단계 재시도를 구성하는 방법:
1. 워크플로 캔버스에서 단계를 클릭합니다.
1. **Retries** 섹션에서 **Interval** 및 **Max retries** 값을 조정합니다.
1. 워크플로우를 저장하여 변경 사항을 적용합니다.

### 오류 경로 추가

워크플로에 오류가 발생할 경우 따라야 할 오류 경로를 추가할 수 있습니다.

오류 경로를 추가하는 방법:
1. 오류 경로를 추가하려는 단계 위로 마우스를 가져갑니다.
1. **오류 경로** 아이콘 {{< img src="service_management/workflows/error-path-icon.png" inline="true" style="width:24px;">}}을 클릭하고 드래그하여 캔버스에 새 오류 경로를 배치합니다.
1. 오류 경로에 추가할 워크플로 단계를 선택합니다.
1. 단계를 구성한 후 오류 경로에 단계를 더 추가하고 오류 경로를 기본 워크플로 경로로 다시 병합할 수도 있습니다.
1. 오류 경로 단계 구성을 완료했으면 **Save**을 클릭하여 변경 사항을 적용합니다.

## 조건이 충족될 때까지 기다립니다.

일부 작업을 통해 워크플로가 단계를 완료로 표시하고 계속하기 전 조건을 추가할 수 있습니다.

조건을 추가하는 방법:
1. 워크플로 캔버스에서 단계를 클릭합니다.
1. **Wait until condition** 섹션에서 드롭다운을 사용하여 미리 구성된 조건을 선택하거나 **Configure custom wait condition**을 선택하여 조건을 직접 작성합니다.
   - 사용 가능한 사전 구성된 조건 목록은 작업에 따라 다릅니다.
   - 조건문 변수는 문자열, 숫자, 부울 또는 단계 출력 변수일 수 있습니다.
   - 커스텀 조건문에는 현재 단계의 출력 변수만 사용할 수 있습니다.
1. 워크플로의 최대 대기 시간을 입력합니다. 조건이 제시간에 충족되지 않으면 단계가 실패합니다.

{{< img src="service_management/workflows/wait-until-condition2.png" alt="대기 조건 예" style="width:100%;" >}}

## JSON을 통한 워크플로 편집

워크플로 페이지에서 **Edit JSON Spec**을 클릭하여 워크플로를 JSON으로 편집합니다. JSON 편집기로도 가능합니다.
- **Format JSON**: JSON을 꾸밉니다.
- **Export JSON**: 워크플로를 다운로드합니다.

## API를 사용하여 워크플로와 상호 작용하기

API를 사용하여 작업하려면 [워크플로 자동화 API 설명서][13]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog Community Slack][10]의 **#workflows** 채널에 참여하세요.

[1]: https://app.datadoghq.com/workflow
[2]: https://handlebarsjs.com/guide/expressions.html#expressions
[3]: /ko/service_management/workflows/trigger
[4]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[5]: https://app.datadoghq.com/workflow/blueprints
[6]: /ko/service_management/workflows/actions/#testing-expressions-and-functions
[7]: /ko/getting_started/tagging/
[8]: /ko/glossary/#service
[9]: /ko/account_management/teams/
[10]: https://datadoghq.slack.com/
[11]: /ko/service_management/workflows/test_and_debug/#test-a-step
[12]: /ko/service_management/workflows/variables/
[13]: /ko/api/latest/workflow-automation/
[14]: /ko/service_management/workflows/variables/#context-variables