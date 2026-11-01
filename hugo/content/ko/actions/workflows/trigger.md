---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /ko/workflows/trigger
- /ko/service_management/workflows/trigger
description: 대시보드, 모니터, 보안 신호 및 기타 소스에서 워크플로를 수동 또는 자동으로 트리거하는 방법을 알아보세요.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-automation-rules
  tag: 블로그
  text: Datadog 자동화 규칙으로 데이터 변경 사항에 즉시 대응하기
- link: /getting_started/workflow_automation/
  tag: 문서
  text: Workflow Automation 시작하기
- link: /actions/workflows/access_and_auth/#workflow-identity
  tag: 문서
  text: 워크플로 실행에 사용되는 ID에 대해 자세히 알아보기
- link: dashboards
  tag: 문서
  text: 대시보드 설정에 대해 자세히 알아보기
- link: /security
  tag: 문서
  text: 보안 신호에 대해 자세히 알아보기
- link: monitors
  tag: 문서
  text: 모니터에 대해 자세히 알아보기
- link: /security/cloud_security_management/workflows
  tag: 문서
  text: Workflow Automation을 통한 보안 워크플로 자동화하기
title: 워크플로 트리거
---
워크플로는 수동 또는 자동으로 트리거할 수 있으며, 하나의 워크플로에 여러 트리거를 설정할 수 있습니다. 이를 통해 Datadog 모니터와 Datadog 대시보드 같은 다양한 소스에서 워크플로를 트리거할 수 있습니다.

워크플로는 소유자, 실행을 트리거한 사용자 또는 연결된 서비스 계정의 ID로 실행됩니다. 일정 및 웹훅과 같이 사용자 없이 실행되는 트리거에는 소유자 또는 서비스 계정이 필요합니다. 자세한 내용은 [Workflow identity][1]를 참조하세요.

{{< img src="actions/workflows/trigger/multiple-triggers.png" alt="여러 트리거가 있는 워크플로" style="width:100%;" >}}

## 수동 트리거 {#manual-triggers}

워크플로를 수동으로 트리거하려면 다음 단계를 따르세요.
1. 워크플로 페이지에서 {{< ui >}}Run{{< /ui >}}을 클릭합니다.
1. 기존 트리거 변수에 대한 값을 입력합니다.
1. 워크플로를 실행할 준비가 되면 {{< ui >}}Save & Run{{< /ui >}}을 클릭합니다.

## 대시보드 트리거 {#dashboard-triggers}

대시보드에서 워크플로를 트리거하려면 {{< ui >}}Run Workflow{{< /ui >}} 위젯을 추가합니다.
1. 대시보드에서 {{< ui >}}Add Widget{{< /ui >}}을 클릭합니다.
1. `workflows`를 검색하고 {{< ui >}}Run Workflow{{< /ui >}} 위젯을 추가합니다.
1. {{< ui >}}Select the workflow{{< /ui >}} 아래의 드롭다운 메뉴에서 워크플로를 찾습니다. 대시보드 트리거가 있는 게시된 워크플로만 목록에 나타납니다.
1. 대시보드 템플릿 변수를 워크플로 입력 파라미터에 매핑합니다. 이를 통해 워크플로 실행 시 대시보드 템플릿 변수의 값이 입력 파라미터에 직접 매핑됩니다.
1. 위젯의 제목을 입력하고 {{< ui >}}Save{{< /ui >}}를 클릭합니다.

워크플로우를 실행하려면 다음에 따릅니다.
1. 대시보드 위젯에서 {{< ui >}}Run Workflow{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Execution parameters{{< /ui >}} 아래에는 워크플로 입력에 매핑한 모든 템플릿 변수의 값이 자동으로 채워집니다. 매핑되지 않은 실행 파라미터의 값을 입력하거나 필요시 기존 값을 편집합니다.
1. {{< ui >}}Run{{< /ui >}}을 클릭하여 워크플로를 실행합니다.

## 모니터 트리거 {#monitor-triggers}

### 워크플로에 모니터 트리거 추가 {#add-a-monitor-trigger-to-your-workflow}

1. 워크플로에 모니터 트리거를 추가하려면 다음 단계를 따르세요.
   - 워크플로에 트리거가 없는 경우 {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Monitor{{< /ui >}}를 클릭합니다.
   - 워크플로에 이미 하나 이상의 트리거가 있고 모니터를 추가 트리거로 추가하는 경우 {{< ui >}}Add Trigger{{< /ui >}}(번개) 아이콘을 클릭하고 {{< ui >}}Monitor{{< /ui >}}를 선택합니다.
1. 트리거가 워크플로의 단계에 연결되어 있는지 확인합니다. 트리거 아래의 더하기 아이콘({{< ui >}}\+{{< /ui >}})을 클릭하고 드래그하여 트리거를 단계에 연결할 수 있습니다.
1. 트리거를 클릭하고 {{< ui >}}Mention handle{{< /ui >}}을 확인합니다.
1. 모니터 트리거는 기본적으로 자동으로 트리거되도록 설정되어 있습니다. 워크플로가 자동으로 트리거되지 않게 하려면 {{< ui >}}Automatic triggering{{< /ui >}} 옵션을 끕니다.
1. 워크플로를 저장합니다.
1. 워크플로를 게시하려면 {{< ui >}}Publish{{< /ui >}}를 클릭합니다. 워크플로는 게시하기 전까지 자동으로 실행되지 않습니다. 게시된 워크플로는 워크플로 실행 횟수를 기준으로 비용이 발생합니다. 자세한 내용은 [Datadog 비용 페이지][11]를 참조하세요.

### 모니터에 워크플로 추가 {#add-the-workflow-to-your-monitor}

1. Datadog의 [**Monitors** 페이지][2]로 이동합니다.
1. 워크플로를 트리거하려는 모니터를 찾아 편집하거나 새 모니터를 만듭니다.
1. {{< ui >}}Configure notifications & automations{{< /ui >}} 섹션에서 {{< ui >}}\+ Add Workflow{{< /ui >}}를 클릭합니다.
1. 워크플로 멘션 이름을 사용하여 워크플로를 검색하고 드롭다운에서 선택합니다. 모니터 트리거가 있는 워크플로만 목록에 나타납니다.<br>입력 파라미터가 없는 경우 `@workflow-name` 형식으로, 입력 파라미터가 있는 경우 `@workflow-name(param="")` 형식으로 알림 메시지 필드에 모니터용 멘션이 표시됩니다.
1. 워크플로가 입력 파라미터를 사용하는 경우 다음 단계를 따르세요.
    1. 모니터 이름 및 ID 옆의 {{< ui >}}Configure Inputs{{< /ui >}}를 클릭합니다.
        {{< img src="actions/workflows/trigger/monitor-configure-inputs-arrow.png" alt="Configure Inputs 링크를 사용할 수 있는 연결된 워크플로" style="width:100%;" >}}
    1. Enter values for the input parameters.<br>**Note**: Values can include monitor message template variables. To see a list of available variables, click {{< ui >}}Use Message Template Variables{{< /ui >}} in the upper-right of the {{< ui >}}Configure notifications & automations{{< /ui >}} section.
    <br>The parameters populate in the mention within the notification message field.<br>For example, if you configure a workflow named `@workflow-test-inputs` to have the following parameters:
        {{< img src="actions/workflows/trigger/monitor-configure-inputs-modal.png" alt="im_a_string이 'abc', im_a_number가 123, im_a_boolean이 true로 설정되고 i_have_a_default_value가 'override this'로 지정된 Configure Inputs 패널" style="width:70%;" >}}
        the mention changes to `@workflow-test-inputs(im_a_string="abc", im_a_number=123, im_a_boolean=true, i_have_a_default_value="override this")`.
1. 모니터를 저장합니다.

모니터 임계값에 도달할 때마다 해당 모니터는 워크플로 실행을 트리거합니다.

### 모니터 트리거 테스트 {#test-a-monitor-trigger}

테스트 및 디버그 페이지에서 [모니터 트리거 테스트 방법][12]에 대한 정보를 확인하세요.

## 인시던트 트리거 {#incident-triggers}

인시던트 트리거는 인시던트 이벤트를 기반으로 워크플로를 자동으로 실행하거나, 인시던트 내에서 수동으로 실행할 수 있습니다.

<div class="alert alert-info">인시던트 컨텍스트가 기본 제공되고 추가 요금이 부과되지 않는 Incident Management 내 인시던트 자동화를 설정하려면 <a href="/incident_response/incident_management/setup_and_configuration/automations">Incident Automations</a>를 참조하세요. 인시던트 이벤트가 여러 트리거 중 하나이거나 워크플로가 Incident Management 외부에서 관리되는 경우 인시던트 트리거가 포함된 워크플로를 사용하세요.</div>

워크플로에 인시던트 트리거를 추가하려면 다음 단계를 따르세요.
1. [Workflow 생성 페이지][6]에서 Trigger 옵션까지 스크롤하여 {{< ui >}}Incident{{< /ui >}}를 클릭합니다.
1. 인시던트가 선언되거나 업데이트될 때 또는 반복 일정에 따라 워크플로를 트리거해야 하는 인시던트 이벤트 유형을 선택합니다.
   수동 트리거의 경우, Workflows는 모니터 또는 [인시던트 알림 규칙][16]에서 사용할 수 있는 핸들을 생성합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.
1. 워크플로를 게시하려면 {{< ui >}}Publish{{< /ui >}}를 클릭합니다. 워크플로는 게시하기 전까지 실행되지 않습니다. 게시된 워크플로는 워크플로 실행 횟수를 기준으로 비용이 발생합니다. 자세한 내용은 [Datadog 비용 페이지][11]를 참조하세요.

## 보안 트리거 {#security-triggers}

모든 보안 신호 또는 보안 발견 결과에 대해 워크플로를 자동으로 트리거할 수 있습니다. 또한 Cloud SIEM Security Signal 패널, Misconfiguration 패널 또는 Identity Risk 패널에서 워크플로를 수동으로 트리거할 수도 있습니다.

**참고**: 보안 신호 또는 발견 결과에 워크플로를 추가하기 전에 해당 워크플로에 보안 트리거가 있어야 합니다.

### Security Notification Rule 트리거 {#security-notification-rule-triggers}

Security Notification Rule이 Security Signal 또는 Security Finding에 대한 알림을 보낼 때마다 워크플로가 트리거되도록 설정할 수 있습니다.

알림 규칙에서 워크플로를 트리거하려면 먼저 워크플로에 보안 트리거를 추가해야 합니다.
1. 워크플로에 보안 트리거를 추가하려면 다음 단계를 따르세요.
   - 워크플로에 트리거가 없는 경우 {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Security{{< /ui >}}를 클릭합니다.
   - 워크플로에 이미 하나 이상의 트리거가 있고 보안 트리거를 추가 트리거로 추가하는 경우, {{< ui >}}Add Trigger{{< /ui >}}(번개) 아이콘을 클릭하고 {{< ui >}}Security{{< /ui >}}를 선택합니다.
1. 트리거가 워크플로의 단계에 연결되어 있는지 확인합니다. 트리거 아래의 더하기 아이콘({{< ui >}}\+{{< /ui >}})을 클릭하고 드래그하여 트리거를 단계에 연결할 수 있습니다.
1. 트리거를 클릭하고 {{< ui >}}Mention handle{{< /ui >}}을 확인합니다.
1. 보안 트리거는 기본적으로 자동으로 트리거되도록 설정되어 있습니다. 워크플로가 자동으로 트리거되지 않게 하려면 {{< ui >}}Automatic triggering{{< /ui >}} 옵션을 끕니다.
1. 워크플로를 저장합니다.
1. 워크플로를 게시하려면 {{< ui >}}Publish{{< /ui >}}를 클릭합니다. 워크플로는 게시하기 전까지 자동으로 실행되지 않습니다. 게시된 워크플로는 워크플로 실행 횟수를 기준으로 비용이 발생합니다. 자세한 내용은 [Datadog 비용 페이지][11]를 참조하세요.

알림 규칙에 워크플로를 추가하려면 다음 단계를 따르세요.
1. [구성][3] 페이지에서 워크플로를 트리거하는 데 사용할 알림 규칙을 찾거나 새 규칙을 만듭니다.
1. {{< ui >}}Recipient{{< /ui >}} 섹션에서 워크플로 멘션 이름을 사용하여 워크플로를 찾습니다. 예를 들어, `@workflow-my-workflow`입니다.
1. 드롭다운에서 워크플로를 선택합니다. 보안 트리거가 있는 워크플로만 목록에 나타납니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

{{< img src="actions/workflows/trigger/notification-rule-trigger2.png" alt="알림 규칙의 수신자 섹션에 워크플로 이름 추가" >}}

알림 규칙이 실행될 때마다 워크플로 실행이 트리거됩니다.

### 수동 트리거 {#manual-triggers-1}

Cloud SIEM의 Security Signal 패널, Misconfiguration 패널 또는 Identity Risk 패널에서 워크플로를 수동으로 시작할 수 있습니다.

1. 사이드 패널 상단의 {{< ui >}}Next Steps{{< /ui >}} 상자에서 {{< ui >}}Run Workflow{{< /ui >}}를 클릭합니다.
1. 검색 모달에서 실행하려는 워크플로의 이름을 입력하고 선택합니다. 보안 트리거가 있는 워크플로만 목록에 나타납니다.
1. 워크플로에 입력 파라미터가 필요한 경우, 필요한 값을 입력합니다. 입력 파라미터 옆에 표시된 객체 JSON에서 값을 복사하여 파라미터 필드에 붙여넣을 수 있습니다.
1. {{< ui >}}Run{{< /ui >}}을 클릭합니다.

사이드 패널의 {{< ui >}}Workflows{{< /ui >}} 섹션에서 워크플로 실행 상태를 확인할 수 있습니다.

자동화할 수 있는 보안 워크플로의 추가 예시는 [Workflow Automation을 통한 보안 워크플로 자동화하기][4]를 참조하세요.

## 카탈로그 트리거 {#catalog-triggers}

소프트웨어 카탈로그 엔터티에서 워크플로를 실행하려면 먼저 워크플로에 소프트웨어 카탈로그 트리거를 추가해야 합니다.

1. 워크플로에 소프트웨어 카탈로그 트리거를 추가하려면 다음 단계를 따르세요.
   - 워크플로에 트리거가 없는 경우, {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}}를 클릭합니다.
   - 워크플로에 이미 하나 이상의 트리거가 있고 소프트웨어 카탈로그 트리거를 추가하려는 경우, {{< ui >}}Add Trigger{{< /ui >}}(번개 모양) 아이콘을 클릭하고 {{< ui >}}Catalog{{< /ui >}}를 선택합니다.
2. 트리거가 워크플로의 단계에 연결되어 있는지 확인합니다. 트리거 아래의 더하기 아이콘({{< ui >}}\+{{< /ui >}})을 클릭하고 드래그하여 트리거를 단계에 연결할 수 있습니다.
3. 워크플로를 저장합니다.
4. {{< ui >}}Publish{{< /ui >}}를 클릭하여 워크플로를 게시합니다. 게시된 워크플로는 워크플로 실행 횟수를 기준으로 비용이 발생합니다. 자세한 내용은 [Datadog 비용 페이지][11]를 참조하세요.

Catalog 엔터티에서 워크플로를 실행하려면 다음 단계를 따르세요.

1. [Catalog 페이지][14]에서 목록의 엔터티를 선택합니다.
1. 사이드 패널 상단에서 {{< ui >}}Run Workflow{{< /ui >}}를 클릭합니다.
1. 검색 모달에서 실행하려는 워크플로의 이름을 입력하고 선택합니다. Catalog 트리거가 있는 워크플로만 목록에 나타납니다.
1. 워크플로에 입력 파라미터가 필요한 경우, 필요한 값을 입력합니다.
1. {{< ui >}}Run{{< /ui >}}을 클릭하여 워크플로를 실행합니다.

## GitHub 트리거 {#github-triggers}

<div class="alert alert-info">이 기능을 사용하려면 GitHub 계정에 웹훅을 생성할 권한이 있어야 합니다.</div>

다음 단계에 따라 GitHub에서 워크플로를 트리거할 수 있습니다.

1. 워크플로에 GitHub 트리거를 추가하려면 다음 단계를 따르세요.
   - 워크플로에 트리거가 없는 경우 {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}GitHub{{< /ui >}}를 클릭합니다.
   - 워크플로에 이미 하나 이상의 트리거가 있고 GitHub를 추가 트리거로 추가하는 경우 {{< ui >}}Add Trigger{{< /ui >}}(번개) 아이콘을 클릭하고 {{< ui >}}GitHub{{< /ui >}}를 선택합니다.
1. 워크플로를 트리거하는 데 사용할 GitHub 리포지토리로 이동합니다.
1. GitHub에서 {{< ui >}}Settings{{< /ui >}}를 클릭하고 {{< ui >}}Webhooks{{< /ui >}}를 클릭한 다음 {{< ui >}}Add webhook{{< /ui >}}을 클릭합니다.
1. 워크플로의 {{< ui >}}Configure{{< /ui >}} 탭에서 {{< ui >}}Payload URL{{< /ui >}}을 복사합니다. GitHub 웹훅 생성 페이지의 {{< ui >}}Payload URL{{< /ui >}} 필드에 붙여넣습니다.
1. GitHub에서 웹훅의 {{< ui >}}Content type{{< /ui >}}을 `application/json`으로 설정합니다.
1. GitHub에서 16자 이상의 시크릿을 생성한 다음, 이 시크릿을 워크플로 트리거의 {{< ui >}}Secret{{< /ui >}} 필드에 복사합니다.
1. GitHub에서 웹훅을 트리거할 이벤트를 선택한 다음 {{< ui >}}Add webhook{{< /ui >}}을 클릭합니다.
1. _필요시_, 워크플로에서 {{< ui >}}\+{{< /ui >}}를 클릭하여 {{< ui >}}Rate Limit{{< /ui >}}을 추가합니다.
1. 워크플로에서 {{< ui >}}Save{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Publish{{< /ui >}}를 클릭하여 워크플로를 게시합니다. GitHub에서 워크플로를 트리거하려면 먼저 워크플로를 게시해야 합니다. 게시된 워크플로는 워크플로 실행 횟수를 기준으로 비용이 발생합니다. 자세한 내용은 [Datadog 비용 페이지][11]를 참조하세요.

## Slack 트리거 {#slack-triggers}

<div class="alert alert-info">이 기능을 사용하려면 Slack 작업 공간에 Datadog 앱을 설치해야 합니다. 자세한 내용은 <a href="/integrations/slack/?tab=datadogforslack#setup">Slack 설정</a>을 참조하세요.</div>

<div class="alert alert-info"><strong>빠른 시작</strong>: 클릭하면 Slack 트리거가 포함된 <a href="https://app.datadoghq.com/workflow/create?source=slack">워크플로</a>가 생성됩니다.</div>

`/datadog workflow` 명령어를 사용하여 Slack에서 수동으로 워크플로를 트리거하거나, 메시지에 이모지 반응이 추가되거나 채널에 메시지가 게시될 때 자동으로 트리거할 수 있습니다.

### 수동 Slack 트리거 {#manual-slack-trigger}

1. 워크플로에 Slack 트리거를 추가하려면 다음 단계를 따르세요.
   - 워크플로에 트리거가 없는 경우 {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Slack{{< /ui >}}을 클릭합니다.
   - 워크플로에 이미 하나 이상의 트리거가 있고 Slack 트리거를 추가 트리거로 추가하는 경우, {{< ui >}}Add Trigger{{< /ui >}}(번개) 아이콘을 클릭하고 {{< ui >}}Slack{{< /ui >}}을 선택합니다.
1. 트리거가 워크플로의 단계에 연결되어 있는지 확인합니다. 트리거 아래의 더하기 아이콘({{< ui >}}\+{{< /ui >}})을 클릭하고 드래그하여 트리거를 단계에 연결할 수 있습니다.
1. 워크플로에서 {{< ui >}}Save{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Publish{{< /ui >}}를 클릭하여 워크플로를 게시합니다. 워크플로를 Slack에서 트리거하려면 먼저 워크플로를 게시해야 합니다. 게시된 워크플로는 워크플로 실행 횟수를 기준으로 비용이 발생합니다. 자세한 내용은 [Datadog 비용 페이지][11]를 참조하세요.
1. Datadog 앱이 있는 Slack 채널에서 `/datadog workflow`를 실행하여 워크플로를 선택하고 실행합니다. `/dd` 별칭을 사용하여 /datadog 명령어를 실행할 수도 있습니다.

### 이모지 반응 Slack 트리거 {#emoji-reaction-slack-trigger}

사용자가 Slack 메시지에 특정 이모지 반응을 추가할 때 워크플로가 자동으로 트리거되도록 구성할 수 있습니다.

1. 워크플로에 Slack 트리거를 추가하려면 다음 단계를 따르세요.
   - 워크플로에 트리거가 없는 경우 {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Slack{{< /ui >}}을 클릭합니다.
   - 워크플로에 이미 하나 이상의 트리거가 있고 Slack 트리거를 추가 트리거로 추가하는 경우, {{< ui >}}Add Trigger{{< /ui >}}(번개) 아이콘을 클릭하고 {{< ui >}}Slack{{< /ui >}}을 선택합니다.
1. {{< ui >}}Configure{{< /ui >}} 탭에서 반응을 수신할 Slack 작업 공간을 선택합니다.
1. 작업 공간에 `emoji:read` 권한이 필요한 경우, {{< ui >}}Enable Permission{{< /ui >}}을 클릭하여 필요한 권한 범위를 적용해 Slack 앱을 다시 설치합니다.
1. 워크플로를 트리거할 하나 이상의 이모지 반응을 선택합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭한 다음 {{< ui >}}Publish{{< /ui >}}를 클릭합니다.

### 메시지 Slack 트리거 {#message-slack-trigger}

규칙과 일치하는 메시지가 하나 이상의 Slack 채널에 게시될 때 워크플로가 자동으로 트리거되도록 구성할 수 있습니다.

<div class="alert alert-info">Datadog Slack 앱은 선택한 각 채널의 멤버여야 합니다. Datadog Slack 앱 자체가 게시한 메시지는 워크플로를 트리거하지 않습니다.</div>

1. 워크플로에 Slack 트리거를 추가하려면 다음 단계를 따르세요.
   - 워크플로에 트리거가 없는 경우 {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}Slack{{< /ui >}}을 클릭합니다.
   - 워크플로에 이미 하나 이상의 트리거가 있고 Slack 트리거를 추가 트리거로 추가하는 경우, {{< ui >}}Add Trigger{{< /ui >}}(번개) 아이콘을 클릭하고 {{< ui >}}Slack{{< /ui >}}을 선택합니다.
1. {{< ui >}}Configure{{< /ui >}} 탭의 {{< ui >}}Message triggers{{< /ui >}} 아래에서 Slack {{< ui >}}Workspace{{< /ui >}}를 선택합니다.
1. 수신할 {{< ui >}}Channels{{< /ui >}}를 하나 이상 선택합니다.
1. {{< ui >}}Match type{{< /ui >}}을 선택합니다.
   - {{< ui >}}Any message{{< /ui >}}: 선택한 채널의 모든 메시지가 워크플로를 트리거합니다.
   - {{< ui >}}Contains text{{< /ui >}}: 메시지에 {{< ui >}}Message pattern{{< /ui >}}에 입력한 텍스트가 포함되어야 합니다. 일치 항목은 대소문자를 구분하지 않습니다.
   - {{< ui >}}Matches regular expression{{< /ui >}}: 메시지가 {{< ui >}}Message pattern{{< /ui >}}에 입력한 정규식과 일치해야 합니다. 대소문자를 구분하며, 메시지 내 어느 위치에서든 패턴이 일치하면 됩니다. 전체 메시지와 일치시키려면 `^`와 `$`를 사용하세요(예: `^deploy\s+production$`). 대소문자를 구분하지 않으려면 패턴 시작 부분에 `(?i)`을 추가하세요.
1. 필요시 다음과 같이 대상 메시지를 필터링할 수 있습니다.
   - {{< ui >}}Thread replies{{< /ui >}}: {{< ui >}}Include all messages{{< /ui >}}, {{< ui >}}Only thread replies{{< /ui >}} 또는 {{< ui >}}Exclude thread replies{{< /ui >}}.
   - {{< ui >}}App messages{{< /ui >}}: {{< ui >}}Include all messages{{< /ui >}}, {{< ui >}}Only app messages{{< /ui >}} 또는 {{< ui >}}Exclude app messages{{< /ui >}}.
1. 다른 패턴이나 채널을 수신하려면 {{< ui >}}Add message rule{{< /ui >}}을 클릭합니다. 메시지가 두 개 이상의 규칙과 일치하는 경우 워크플로는 한 번만 실행됩니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭한 다음 {{< ui >}}Publish{{< /ui >}}를 클릭합니다.

#### Slack 메시지 액세스 {#access-the-slack-message}

워크플로의 이후 단계에서 `Source.slack_message`를 사용하여 워크플로를 트리거한 메시지를 참조하세요.

| 변수 | 설명 |
|---|---|
| `Source.slack_message.text` | 메시지의 텍스트입니다. |
| `Source.slack_message.user_id` | 메시지를 게시한 사용자의 Slack ID입니다(있는 경우). |
| `Source.slack_message.channel_id` | 메시지가 게시된 채널의 Slack ID입니다. |
| `Source.slack_message.team_id` | 작업 공간의 Slack ID입니다. |
| `Source.slack_message.message_ts` | 메시지의 Slack 타임스탬프입니다. |
| `Source.slack_message.thread_ts` | 메시지가 스레드 답글인 경우 상위 메시지의 Slack 타임스탬프입니다. |
| `Source.slack_message.app_id` | 앱에서 메시지를 게시한 경우 해당 앱의 Slack ID입니다. |
| `Source.slack_message.bot_id` | 봇에서 메시지를 게시한 경우 해당 봇의 Slack ID입니다. |

## API 트리거 {#api-triggers}

API 호출을 사용하여 워크플로를 트리거하려면 [API 키][8]와 `workflows_run` 범위가 포함된 [애플리케이션 키][9]가 필요합니다. 애플리케이션 키에 범위를 추가하는 방법에 대한 자세한 내용은 [범위][10]를 참조하세요.

<div class="alert alert-info">범위가 지정되지 않은 키에는 <code>workflows_run</code> 해당 범위가 기본적으로 포함되지 않습니다. 보안 모범 사례를 따르고 원하는 작업을 수행하는 데 필요한 최소한의 범위가 포함된 애플리케이션 키를 사용하세요.</div>

워크플로 ID가 포함된 POST 요청을 엔드포인트 `https://api.datadoghq.com/api/v2/workflows/WORKFLOW-ID/instances`로 보내 워크플로를 트리거할 수 있습니다. 워크플로에 API 트리거를 추가하면 트리거 인터페이스에서 워크플로를 트리거하는 데 사용할 수 있는 cURL 요청 예시를 제공합니다.

워크플로에 API 트리거를 추가하려면 다음 단계를 따르세요.
1. {{< ui >}}Add Trigger{{< /ui >}} > {{< ui >}}API{{< /ui >}}를 클릭합니다.
1. 워크플로 캔버스에서 {{< ui >}}API{{< /ui >}}를 클릭하고 워크플로를 트리거하는 데 필요한 헤더와 데이터가 포함된 예시 워크플로 cURL 요청을 확인합니다.

   워크플로를 트리거하기 위한 cURL 요청은 다음과 같습니다.
   {{< code-block lang="shell" >}}
curl -X POST \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d {} \
  https://api.datadoghq.com/api/v2/workflows/32866005-d275-4553-be86-9f1b13066d84/instances
{{< /code-block >}}

   워크플로에 입력 파라미터가 포함된 경우, 요청 페이로드에 해당 파라미터를 포함합니다. 다음 예시에서는 `example_input1`과 `example_input2`라는 두 개의 입력 파라미터를 사용합니다.

   {{< code-block lang="shell" >}}
curl -X POST \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d { "meta": { "payload": { \
    "example_input1": "...", \
    "example_input2": "..." \
  } } } \
  https://api.datadoghq.com/api/v2/workflows/32866005-d275-4553-be86-9f1b13066d84/instances
   {{< /code-block >}}
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Publish{{< /ui >}}를 클릭하여 워크플로를 게시합니다. POST 요청으로 워크플로를 트리거하려면 먼저 워크플로를 게시해야 합니다. 게시된 워크플로는 워크플로 실행 횟수를 기준으로 비용이 발생합니다. 자세한 내용은 [Datadog 비용 페이지][11]를 참조하세요.

### API 요청 본문 액세스 {#access-the-api-request-body}

워크플로의 이후 단계에서 `Source.api.requestBody`를 사용하여 들어오는 API 요청의 페이로드를 참조합니다. 요청 본문이 JSON인 경우, 개별 필드에 액세스하기 전에 `JSON.parse()`로 구문 분석합니다. 예를 들어 `Source.api.requestBody.my_field` 대신 `${JSON.parse(Source.api.requestBody).my_field}`를 사용합니다.

## 예약된 트리거 {#scheduled-triggers}

워크플로 실행을 예약하려면 다음 단계를 따르세요.
1. 워크플로 캔버스에서 {{< ui >}}Add an Automated Trigger{{< /ui >}}를 클릭하고 {{< ui >}}Schedule{{< /ui >}}을 선택합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭하여 서비스 계정을 만듭니다. 자세한 내용은 [서비스 계정으로 실행][17]을 참조하세요.
1. 실행 시간과 빈도를 입력합니다.
1. (선택 사항) {{< ui >}}Memo{{< /ui >}} 필드에 워크플로에 대한 설명을 입력합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Publish{{< /ui >}}를 클릭합니다. 예약된 워크플로는 게시하기 전까지 실행되지 않습니다. 게시된 워크플로는 워크플로 실행 횟수를 기준으로 비용이 발생합니다. 자세한 내용은 [Datadog 비용 페이지][11]를 참조하세요.

## 다른 워크플로에서 워크플로 트리거 {#trigger-a-workflow-from-a-workflow}

{{< ui >}}Trigger Workflow{{< /ui >}} 작업을 사용하여 다른 워크플로에서 자식 워크플로를 트리거할 수 있습니다. 예를 들어 여러 워크플로에서 재사용해야 하는 복잡한 일련의 단계가 있는 경우, 모든 워크플로에 대해 해당 단계를 다시 만들 필요가 없습니다. 대신 단계를 새 워크플로에 추가하고 Trigger Workflow 작업을 사용하여 다른 워크플로에서 트리거하세요.

<div class="alert alert-info">요금 청구 시 자식 워크플로를 트리거하면 별도의 워크플로 실행으로 집계됩니다.</div>

자식 워크플로에 [입력 파라미터][5]가 있는 경우, 이러한 파라미터는 Trigger Workflow 작업에서 필수 필드로 나타납니다. 아래 예시에서 `service_name`이 자식 워크플로의 입력 파라미터로 설정되어 있으므로 `service_name` 입력 파라미터가 필요합니다.

{{< img src="actions/workflows/trigger/trigger-workflow-step.png" alt="service_name 입력 파라미터는 자식 워크플로에서 필수입니다." style="width:100%;" >}}

### 자식 워크플로의 결과 액세스 {#access-the-result-of-a-child-workflow}

자식 워크플로에서 {{< ui >}}Output parameters{{< /ui >}}를 정의하여 자식 워크플로의 결과를 부모 워크플로로 다시 전달할 수 있습니다. 부모 워크플로에서 `WorkflowOutputs` 컨텍스트 변수를 사용하여 자식 워크플로의 출력 파라미터를 검색하세요. 예를 들어 `exampleList`라는 출력 파라미터가 있는 `Example_workflow`라는 자식 워크플로가 있는 경우, `Steps.Example_workflow.workflowOutputs.exampleList`를 사용하여 자식 워크플로의 결과에 액세스하세요.

## 실행 기록{#run-history}

워크플로를 트리거하면 워크플로 페이지가 해당 워크플로의 {{< ui >}}Run History{{< /ui >}}로 전환됩니다. 왼쪽 상단에서 {{< ui >}}Configuration{{< /ui >}} 또는 {{< ui >}}Run History{{< /ui >}}를 클릭하여 구성 조회와 실행 기록 조회 간에 전환하세요. 실행 기록을 사용하여 트리거된 워크플로의 진행 상황을 확인하거나 [실패한 단계를 디버깅][13]하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog Community Slack][7]의 {{< ui >}}#workflows{{< /ui >}} 채널에 참여하세요.

[1]: /ko/actions/workflows/access_and_auth/#workflow-identity
[2]: https://app.datadoghq.com/monitors/manage
[3]: https://app.datadoghq.com/security/configuration/notification-rules
[4]: /ko/security/cloud_security_management/workflows
[5]: /ko/actions/workflows/build/#input-parameters
[6]: https://app.datadoghq.com/workflow/create
[7]: https://chat.datadoghq.com/
[8]: /ko/account_management/api-app-keys/#api-keys
[9]: /ko/account_management/api-app-keys/#application-keys
[10]: /ko/account_management/api-app-keys/#scopes
[11]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[12]: /ko/actions/workflows/test_and_debug/#test-a-monitor-trigger
[13]: /ko/actions/workflows/test_and_debug/#debug-a-failed-step
[14]: https://app.datadoghq.com/software
[15]: /ko/incident_response/incident_management/setup_and_configuration/automations
[16]: /ko/incident_response/incident_management/setup_and_configuration/notification_rules/
[17]: /ko/actions/workflows/access_and_auth/#run-as-a-service-account