---
aliases:
- /ko/security/cloud_siem/investigate_security_signals
disable_toc: false
further_reading:
- link: /cloud_siem/detection_rules/
  tag: 설명서
  text: 탐지 규칙의 조건부 논리에 대해 알아보세요.
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: 블로그
  text: Datadog Cloud SIEM으로 1Password 모니터링하기
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: 블로그
  text: 'Cloud SIEM의 새로운 기능: AI 기반 조사, 향상된 위협 인텔리전스, 확장 가능한 보안 운영'
- link: /bits_ai/bits_security_analyst/
  tag: 설명서
  text: Bits Security Analyst
title: 보안 신호 조사하기
---
## 개요 {#overview}

Datadog이 탐지 규칙에 따라 로그를 분석하는 동안 위협을 탐지하면 Cloud SIEM 보안 신호가 생성됩니다. 전용 쿼리 언어를 배울 필요 없이 Signals Explorer에서 보안 신호를 조회하고, 검색하고, 필터링하고, 연결할 수 있습니다. Datadog 플랫폼에서 본인이나 다른 사용자에게 보안 신호를 할당할 수도 있습니다. Signals Explorer 외에도 [Notification Rules][1]를 구성하여 특정 개인이나 팀에 신호를 보내 문제를 알릴 수 있습니다.

[Audit Trail][2]에서 상태를 변경하고 신호 작업 기록을 조회하는 등 보안 신호를 수정하려면 `Security Signals Write` 권한이 필요합니다. Cloud Security의 Datadog Security에서 사용할 수 있는 Datadog의 기본 역할과 세분화된 역할 기반 액세스 제어 권한에 대한 자세한 내용은 [역할 기반 액세스 제어][3]를 참조하세요.

Cloud SIEM 보안 신호를 조사하는 자율 AI 에이전트를 사용하려면 [Bits Security Analyst][14]를 참조하세요.

## Signals Explorer {#signals-explorer}

Signals Explorer에서 패싯 패널이나 검색창을 사용하여 신호를 그룹화하고 필터링하세요. 예를 들어, [중증도](#view-signals-by-severity), [탐지 규칙](#view-signals-by-detection-rules), [MITRE ATT&CK](#view-signals-by-mitre-attck)별로 신호를 조회할 수 있습니다. 사용 사례에 맞게 신호를 필터링한 후 나중에 쿼리를 다시 로드할 수 있도록 [저장된 보기][4]를 생성하세요.

### 중증도별 신호 조회 {#view-signals-by-severity}

예를 들어, `HIGH` 및 `CRITICAL`과 같은 특정 중증도를 가지며 `open` 또는 `under review` 분류 상태인 모든 신호를 조회하려면 다음 중 하나를 수행하세요.

- 패싯 패널의 {{< ui >}}Severity{{< /ui >}} 섹션에서 {{< ui >}}Critical{{< /ui >}}, {{< ui >}}High{{< /ui >}}, {{< ui >}}Medium{{< /ui >}}을 선택하세요. {{< ui >}}Signal State{{< /ui >}} 섹션에서 {{< ui >}}open{{< /ui >}}과 {{< ui >}}under_reviewed{{< /ui >}}만 선택되어 있는지 확인하세요.
- 검색창에 `status:(high OR critical OR medium) @workflow.triage.state:(open OR under_review)`를 입력하세요.

{{< ui >}}Signal State{{< /ui >}} 열을 추가하려면 표 오른쪽 상단의 {{< ui >}}Options{{< /ui >}} 버튼을 선택하고 `@workflow.triage.state` 패싯을 추가하세요. 이렇게 하면 신호 상태가 표시되고 헤더에서 상태별로 정렬할 수 있습니다.

다양한 시각화를 사용하여 환경 내 위협 활동을 조사하세요. 예를 들어, {{< ui >}}Visualize by{{< /ui >}} 필드에서 신호를 다음 기준으로 그룹화할 수 있습니다.

- {{< ui >}}Rules List{{< /ui >}}를 선택하여 여러 탐지 규칙의 볼륨 및 경보 추세를 확인합니다.
- {{< ui >}}Timeseries{{< /ui >}} 시간 경과에 따른 신호 추세를 확인합니다.
- {{< ui >}}Top List{{< /ui >}} 발생 횟수가 많은 신호부터 적은 신호까지 확인합니다.
- {{< ui >}}Table{{< /ui >}} 지정된 태그 키(예: `source`, `technique` 등)별로 신호를 확인합니다.
- {{< ui >}}Pie Chart{{< /ui >}} 각 탐지 규칙의 상대적 볼륨을 확인합니다.

{{< img src="security/security_monitoring/investigate_security_signals/signal_list2.png" alt="탐지 규칙별로 분류된 신호를 보여주는 Signals Explorer" style="width:100%;" >}}

### 탐지 규칙별 신호 조회 {#view-signals-by-detection-rules}

탐지 규칙을 기준으로 신호를 조회하려면 검색창 아래의 {{< ui >}}Visualize as{{< /ui >}} 필드에서 {{< ui >}}Rules List{{< /ui >}}를 클릭합니다. 규칙과 관련된 신호를 확인하려면 해당 규칙을 클릭하세요. 신호를 클릭하여 신호 세부 정보를 확인하세요.

### MITRE ATT&CK별 신호 조회 {#view-signals-by-mitre-attck}

MITRE ATT&CK 전술 및 기법별로 신호를 조회하려면 다음 단계를 따르세요.
1. 검색창 아래의 {{< ui >}}Visualize as{{< /ui >}} 필드에서 {{< ui >}}Table{{< /ui >}}을 선택하고 {{< ui >}}Tactic{{< /ui >}}으로 그룹화합니다.
1. 첫 번째 그룹 `by` 옆의 더하기 아이콘을 클릭하여 두 번째 그룹 `by`를 추가하고 해당 그룹에 {{< ui >}}Technique{{< /ui >}}을 선택합니다.
1. 표에서 전술 또는 기법 중 하나를 클릭하여 신호를 추가로 조사하고 필터링할 수 있는 옵션을 확인합니다. 예를 들어, 전술 및 기법과 관련된 신호를 조회하고 특정 전술 및 기법을 검색하거나 제외할 수 있습니다.

{{< img src="security/security_monitoring/investigate_security_signals/tactics_techniques.png" alt="전술 및 기법 목록을 보여주는 Signals Explorer 표" style="width:100%;" >}}

### 단일 신호 분류 {#triage-a-single-signal}

1. Datadog에서 {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > [{{< ui >}}Signals{{< /ui >}}][5]로 이동합니다.
1. 표에서 보안 신호를 클릭합니다.
1. {{< ui >}}What Happened{{< /ui >}} 섹션에서 쿼리와 일치하는 로그를 확인합니다. 쿼리 위로 마우스를 가져가 쿼리 세부 정보를 확인합니다.
    - 사용자 이름이나 네트워크 IP와 같은 특정 정보도 확인할 수 있습니다. {{< ui >}}Rule Details{{< /ui >}}에서 깔때기 아이콘을 클릭하여 억제 규칙을 생성하거나 기존 억제 규칙에 정보를 추가합니다. 자세한 내용은 [억제 규칙 생성][11]을 참조하세요.
1. {{< ui >}}Next Steps{{< /ui >}} 섹션에서 다음을 수행합니다.
   1. {{< ui >}}Triage{{< /ui >}} 아래에서 드롭다운을 클릭하여 신호의 분류 상태를 변경합니다. 기본 상태는 `OPEN`입니다.
      - `Open`: Datadog Security가 규칙에 기반하여 탐지를 트리거했으며, 결과 신호가 아직 해결되지 않았습니다.
      - `Under Review`: 활성 조사 중에는 분류 상태를 `Under Review`로 변경합니다. `Under Review` 상태에서는 필요에 따라 상태를 `Archived` 또는 `Open`으로 변경할 수 있습니다.
      - `Archived`: 신호를 발생시킨 탐지가 해결되면 상태를 `Archived`로 업데이트합니다. 신호가 보관되면 나중에 참조할 수 있도록 보관 이유와 설명을 입력할 수 있습니다. 보관된 이슈가 다시 발생하거나 추가 조사가 필요한 경우 상태를 `Open`으로 다시 변경할 수 있습니다. 모든 신호는 생성된 지 30일 후에 잠깁니다.</ul>
   1. {{< ui >}}Assign Signal{{< /ui >}}을 클릭하여 본인 또는 다른 Datadog 사용자에게 신호를 할당합니다.
   1. {{< ui >}}Take Action{{< /ui >}}에서 케이스를 생성하거나, 인시던트를 선언하거나, 억제 규칙을 편집하거나, 워크플로를 실행할 수 있습니다. 케이스를 생성하면 분류 상태가 자동으로 `Under Review`로 설정됩니다. 케이스와 신호를 연결하는 방법에 대한 자세한 내용은 [Case Management](#case-management)를 참조하세요.

{{< img src="security/security_monitoring/investigate_security_signals/signal_side_panel.png" alt="두 개의 IP 주소와 해당 위치가 표시된 손상된 AWS IAM 사용자 액세스 키의 신호 사이드 패널" style="width:90%;" >}}

### 여러 신호 분류 {#triage-multiple-signals}

일괄 작업을 사용하여 여러 신호를 분류하세요. 일괄 작업을 사용하려면 먼저 Signals Explorer에서 신호를 검색하고 필터링한 후 다음 단계를 따르세요.

1. 일괄 작업을 수행하려는 신호 왼쪽의 확인란을 클릭합니다. Signals Explorer 목록의 모든 신호를 선택하려면 {{< ui >}}Status{{< /ui >}} 열 머리글 옆의 확인란을 선택합니다.
1. 신호 표 위의 {{< ui >}}Bulk Actions{{< /ui >}} 드롭다운 메뉴를 클릭하고 수행할 작업을 선택합니다.

**참고**: 일괄 작업을 수행하는 동안에는 Signals Explorer가 동적으로 업데이트되지 않습니다.

{{< img src="security/security_monitoring/investigate_security_signals/bulk_actions2.png" alt="일괄 작업 옵션을 보여주는 Signals Explorer" style="width:55%;" >}}

### Workflow Automation 실행 {#run-workflow-automation}

Workflow Automation을 사용하여 신호를 조사하고 수정하는 데 필요한 작업을 수행하세요. 이러한 작업에는 다음이 포함될 수 있습니다.
- 환경에서 IP 주소 차단
- 사용자 계정 비활성화
- 타사 위협 인텔리전스 공급자를 통해 IP 주소 검색
- 조사에 도움을 받기 위해 동료에게 Slack 메시지 보내기

신호 사이드 패널에서 {{< ui >}}Workflows{{< /ui >}} 탭을 클릭하여 해당 신호에 대해 트리거된 워크플로와 실행이 제안된 워크플로를 확인하세요. 제안된 워크플로를 실행하려면 {{< ui >}}Run Workflow{{< /ui >}}를 클릭하세요. 자세한 내용은 [제안된 워크플로가 선택되는 방식](#how-suggested-workflows-are-selected)을 참조하세요. 워크플로에 추가 입력 변수가 필요한 경우 대화 상자가 나타나고 계속 진행하기 전에 필요한 값을 입력하라는 메시지가 표시됩니다.

목록에 실행하려는 워크플로가 표시되지 않으면 {{< ui >}}Search and Run Workflow{{< /ui >}}를 클릭하세요. 워크플로 브라우저에서 실행할 워크플로를 검색하고 선택하세요.

또는 {{< ui >}}Next Steps{{< /ui >}} 섹션에서 {{< ui >}}Run Workflows{{< /ui >}}를 선택하여 워크플로를 검색하고 실행할 수 있습니다.

보안 신호에 대해 워크플로를 자동으로 트리거하려면 자세한 내용은 [보안 신호에서 워크플로 트리거][8] 및 [Workflow Automation을 사용하여 보안 워크플로 자동화][9]를 참조하세요.

#### 제안된 워크플로가 선택되는 방식 {#how-suggested-workflows-are-selected}

인시던트 대응을 간소화하고 분류 과정의 불편을 줄이기 위해 Cloud SIEM은 신호와 관련된 워크플로를 제안합니다. 제안된 워크플로는 신호와 태그 유사성이 가장 높은 것을 기준으로 선택됩니다. Cloud SIEM은 다음 정보를 사용하여 신호에 대한 워크플로를 제안합니다.

- **사전 구성된 워크플로인 Blueprints에서 자동으로 추가된 태그**<br>
워크플로는 AWS CloudTrail과 같은 플랫폼과 관련된 일련의 작업으로 구성됩니다. Blueprint에서 생성된 워크플로에는 소스를 기반으로 태그가 자동으로 적용됩니다. 예를 들어, 'AWS에서 가상 머신 종료'와 같은 워크플로 작업에는 AWS CloudTrail `source` 태그가 지정됩니다.
- **수동으로 추가한 태그**<br>
Blueprint에서 파생된 워크플로와 사용자 지정 워크플로 모두에 수동으로 태그를 추가하여 어떤 워크플로에 우선순위를 지정할지 사용자 지정할 수 있습니다. 올바른 컨텍스트 매칭을 위해 이러한 태그는 신호, 경보를 생성한 로그 또는 탐지 규칙 자체의 태그와 일치해야 합니다.
- **태그 지정 전략**<br>
특정 신호에 대해 워크플로가 표시되도록 하려면 워크플로에 해당 신호의 태그와 유사한 태그가 포함되어야 합니다. 신호에서 흔히 사용되는 태그는 해당 신호의 소스 또는 서비스입니다. 예를 들어, AWS 리소스에서 생성된 신호는 일반적으로 `source:cloudtrail`로 태그가 지정됩니다. 워크플로에 `source:cloudtrail`로 태그를 지정하면 해당 워크플로는 AWS 활동과 관련된 신호와 연결됩니다.<br>
특정 탐지 규칙에 대해 워크플로가 제안되도록 하려면 해당 탐지 규칙 ID(예: `ruleId:abc-123-xyz`)로 워크플로에 태그를 지정하세요.

신호가 생성되면 다음과 같이 처리됩니다.

- **태그를 사용한 신호 및 워크플로 매칭**<br>
보안 신호가 생성되면 Cloud SIEM은 신호의 태그를 확인하고 기존 워크플로에 정의된 태그와 매칭합니다.
- **관련 워크플로 제안**<br>
{{< ui >}}Suggested Workflows{{< /ui >}} 섹션이 사이드 패널에 표시됩니다. 신호의 태그와 가장 일치하는 태그를 기반으로 상위 3개 워크플로를 보여줍니다. 이를 통해 제안된 작업이 컨텍스트를 반영하고 운영상 적절하도록 합니다.

## 조사 {#investigate}

신호에는 탐지된 위협이 악성인지 판단하는 데 중요한 정보가 포함되어 있습니다. 또한 추가 조사를 위해 [Case Management](#case-management)의 케이스에 신호를 추가할 수 있습니다.

### 로그 {#logs}

신호와 관련된 로그를 확인하려면 {{< ui >}}Logs{{< /ui >}} 탭을 클릭하세요. {{< ui >}}View All Related Logs{{< /ui >}}를 클릭하여 Log Explorer에서 관련 로그를 확인합니다.

### 엔터티 {#entities}

엔터티를 조사하려면 다음 단계를 따르세요.

1. {{< ui >}}Entities{{< /ui >}} 탭을 클릭하여 사용자 또는 IP 주소 등 신호와 관련된 엔터티를 확인합니다.
1. {{< ui >}}View Related Logs{{< /ui >}} 옆의 아래쪽 화살표를 클릭하고 다음을 수행합니다.
    - {{< ui >}}View IP Dashboard{{< /ui >}}를 선택하여 IP Investigation 대시보드에서 IP 주소에 대한 자세한 정보를 확인합니다.
    - {{< ui >}}View Related Signals{{< /ui >}}를 선택하여 Signals Explorer를 열고 해당 IP 주소와 관련된 다른 신호를 확인합니다.
1. 수임 역할이나 IAM 사용자와 같은 클라우드 환경 엔터티의 경우 활동 그래프를 확인하여 사용자가 수행한 다른 작업을 확인합니다. {{< ui >}}View in Investigator{{< /ui >}}를 클릭하여 Investigator로 이동하고 자세한 내용을 확인합니다.

### 관련 신호{#related-signals}

{{< ui >}}Related Signals{{< /ui >}} 탭을 클릭하여 관련 신호와 신호 간에 공통된 필드 및 속성 등의 정보를 확인하세요. {{< ui >}}View All Related Activity{{< /ui >}}를 클릭하여 Signals Explorer에서 신호를 확인하세요.

### 억제 규칙 {#suppressions}

신호를 생성한 탐지 규칙의 억제 규칙을 보려면 다음 중 하나를 수행하세요.

- {{< ui >}}What Happened{{< /ui >}} 섹션에서 깔때기 아이콘 위에 마우스를 가져간 다음 {{< ui >}}Add Suppression{{< /ui >}}을 클릭하세요.
- {{< ui >}}Next Steps{{< /ui >}} 섹션에서 {{< ui >}}Edit Suppressions{{< /ui >}}를 클릭하여 탐지 규칙 편집기에서 해당 규칙의 억제 섹션을 확인하세요.
- {{< ui >}}Suppressions{{< /ui >}} 탭을 클릭하여 억제 규칙이 있는 경우 해당 목록을 확인하세요. {{< ui >}}Edit Suppressions{{< /ui >}}를 클릭하여 탐지 규칙 편집기로 이동한 후 해당 규칙의 억제 섹션을 확인하세요.

## 협업 {#collaborate}

### Case Management {#case-management}

신호를 조사할 때 단일 신호에서 제공되는 정보보다 더 많은 정보가 필요한 경우가 있습니다. [Case Management][6]를 사용하여 여러 신호를 수집하고, 타임라인을 생성하고, 동료와 논의하고, 분석 및 발견 결과를 노트에 기록하세요.

#### Signals Explorer에서 케이스 생성 및 관리 {#create-and-manage-cases-from-the-signals-explorer}

[Signals Explorer][5]에서 {{< ui >}}List{{< /ui >}} 시각화를 사용하면 {{< ui >}}Cases{{< /ui >}} 열에 신호와 관련된 케이스 정보가 표시됩니다. 해당 열을 사용하여 케이스를 다음과 같이 관리할 수 있습니다.
- 단일 신호의 케이스를 관리하려면 {{< ui >}}Cases{{< /ui >}} 열을 사용하세요.
  - 신호에 연결된 케이스가 있는 경우 케이스 ID 위에 마우스를 가져가 케이스 정보를 확인하거나, 새 창에서 열거나, 신호와의 연결을 해제할 수 있습니다.
  - 신호에 연결된 케이스가 없는 경우 {{< ui >}}Create Case{{< /ui >}} 아이콘을 클릭하여 케이스를 생성하거나 신호와 연결할 기존 케이스를 선택하세요. Create Case 창이 열립니다.
    - 케이스를 생성하려면 {{< ui >}}Create Case{{< /ui >}} 창에서 {{< ui >}}Project{{< /ui >}}, {{< ui >}}Title{{< /ui >}}, {{< ui >}}Description{{< /ui >}}, {{< ui >}}Assignee{{< /ui >}}를 입력한 다음 {{< ui >}}Create Case{{< /ui >}}를 클릭하세요.
    - 기존 케이스를 선택하려면 {{< ui >}}Create Case{{< /ui >}} 창에서 {{< ui >}}Add to Existing Case{{< /ui >}} 탭을 클릭하세요. 케이스를 선택하고 {{< ui >}}Attach to an Existing Case{{< /ui >}}를 클릭하세요.
- 여러 신호의 케이스를 관리하려면 다음 단계를 따르세요.
  1. 케이스에 연결할 신호를 선택합니다.
  1. 표시되는 {{< ui >}}Bulk Actions{{< /ui >}} 목록에서 {{< ui >}}Create a Case{{< /ui >}} 또는 {{< ui >}}Add to Existing Case{{< /ui >}}를 클릭합니다. Create Case 창이 열립니다.
     - 케이스를 생성하려면 {{< ui >}}Create Case{{< /ui >}} 창에서 {{< ui >}}Project{{< /ui >}}, {{< ui >}}Title{{< /ui >}}, {{< ui >}}Description{{< /ui >}}, {{< ui >}}Assignee{{< /ui >}}를 입력한 다음 {{< ui >}}Create Case{{< /ui >}}를 클릭하세요.
     - 기존 케이스를 선택하려면 {{< ui >}}Create Case{{< /ui >}} 창에서 {{< ui >}}Add to Existing Case{{< /ui >}} 탭을 클릭하세요. 케이스를 선택하고 {{< ui >}}Attach to an Existing Case{{< /ui >}}를 클릭하세요.

사용자가 케이스를 생성하면 기본적으로 다음 사항이 자동으로 변경됩니다.
- 분류 상태가 자동으로 `Under Review`로 설정됩니다.
- 담당자가 해당 사용자로 설정됩니다.

이러한 기본값을 변경하려면 [신호 및 보안 케이스의 기본 동작 관리](#manage-default-behavior-for-signals-and-security-cases)를 참조하세요.

**참고**: 추가 조사 후 케이스가 심각한 것으로 판단되면 케이스에서 {{< ui >}}Declare Incident{{< /ui >}}를 클릭하여 인시던트로 에스컬레이션하세요.

#### 보안 관련 케이스 관리 {#manage-security-related-cases}

[Cases][12] 페이지에서 보안 프로젝트의 케이스를 확인할 수 있습니다. 케이스를 필터링하여 본인에게 할당되었거나 본인이 생성한 케이스, 또는 특정 상태이거나 특정 프로젝트에 속한 케이스만 볼 수 있습니다. 또한 프로젝트에 별표를 표시하여 더 쉽게 탐색할 수 있습니다.

케이스의 {{< ui >}}Security Signals{{< /ui >}} 섹션에서 해당 케이스와 연결된 신호를 확인하고 {{< ui >}}Add Signals{{< /ui >}}를 클릭하여 케이스에 연결할 필터를 검색할 수 있습니다.

#### 신호 및 보안 케이스의 기본 동작 관리 {#manage-default-behavior-for-signals-and-security-cases}

Cloud SIEM [Security cases][13] 설정 페이지에서 신호 및 보안 케이스의 기본 동작을 관리하여 신호와 보안 케이스를 수동 또는 자동으로 서로 연결할 때 시간을 절약할 수 있습니다. 선택한 설정은 이후 생성되는 모든 신호 및 보안 케이스에 즉시 적용되며 소급 적용되지 않습니다.

- **케이스 프로젝트 설정**

  기본 Cloud SIEM 보안 케이스 프로젝트와 선택 가능한 다른 보안 프로젝트를 선택하세요.
  - **기본 SIEM 보안 케이스 프로젝트**: 보안 케이스를 프로젝트에 연결할 때 기본적으로 표시할 프로젝트를 선택합니다. 이 프로젝트는 Cloud SIEM [Cases][12] 페이지에서도 기본 프로젝트로 표시됩니다.
  - **보안 케이스 프로젝트 범위 지정**: 보안 케이스를 연결할 때 선택할 수 있는 보안 케이스 프로젝트를 최대 20개까지 선택합니다.

- **케이스 생성 기본 설정**

  하나 이상의 신호에서 케이스를 생성할 때 케이스 필드에 따라 신호의 값을 케이스에 사용하거나, 값을 비워 두거나, 정적 값을 할당할 수 있습니다.
  <div class="alert alert-tip"><strong>신호-케이스 상관관계 스키마 표시</strong>를 클릭하여 Datadog이 신호 상태를 케이스 상태로, 신호 중증도를 케이스 우선순위로 매핑하는 방법을 확인하세요.</div>

- **신호 첨부 설정**

  신호를 케이스에 첨부할 때 해당 신호에 할당할 기본값을 선택합니다.
  <div class="alert alert-tip"><strong>케이스-신호 보관 사유 매핑 표시</strong>를 클릭하여 Datadog이 케이스 해결 사유를 신호 보관 사유로 매핑하는 방법을 확인하세요.</div>

  - **케이스에 첨부 시**:
    - **신호 상태** 및 **신호 담당자**: 신호를 케이스에 첨부할 때 신호 상태와 담당자를 유지하거나 특정 값을 할당하도록 선택합니다.
    - **재정의 허용**: 이 토글을 켜서 해당 필드의 기존 값을 재정의할 수 있도록 합니다. 이 토글이 꺼져 있으면 선택한 상태와 담당자는 해당 필드가 비어 있는 경우에만 적용됩니다.
  - **케이스 업데이트 시**:
    - **신호 상태**: 케이스에 해당하는 상태를 신호에 할당하거나 기존 상태를 그대로 유지할지 선택합니다.

### 인시던트 선언 {#declare-an-incident}

단일 신호를 기반으로 하든 케이스 조사 후에든, 특정 악성 활동에는 대응이 필요합니다. Datadog에서 인시던트를 선언하여 개발, 운영 및 보안 팀을 한데 모아 중요한 보안 이벤트에 대응할 수 있습니다. [Incident Management][7]는 팀이 인시던트를 효과적으로 식별하고 완화할 수 있도록 프레임워크와 워크플로를 제공합니다.

신호 패널에서 인시던트를 선언하려면 다음 단계를 따르세요.

1. {{< ui >}}Next Steps{{< /ui >}} 섹션에서 {{< ui >}}Declare Incident{{< /ui >}}를 클릭합니다.
1. 인시던트 템플릿을 작성합니다.

신호를 인시던트에 추가하려면 {{< ui >}}Declare Incident{{< /ui >}} 옆의 아래쪽 화살표를 클릭하고 신호를 추가할 인시던트를 선택하세요. {{< ui >}}Confirm{{< /ui >}}를 클릭하세요.

### 위협 인텔리전스 {#threat-intelligence}

Datadog Cloud SIEM은 위협 인텔리전스 파트너가 제공하는 통합 위협 인텔리전스를 제공합니다. 이러한 피드는 알려진 의심스러운 활동(예: 악성 행위자가 사용하는 것으로 알려진 IP 주소)에 대한 데이터를 포함하도록 지속적으로 업데이트되므로 대응해야 할 잠재적 위협을 신속하게 식별할 수 있습니다.

Datadog은 수집된 모든 로그를 위협 인텔리전스 피드의 침해 지표(IOC)로 자동 보강합니다. 로그에 알려진 IOC와 일치하는 항목이 포함되어 있으면 `threat_intel` 속성이 로그 이벤트에 추가되어 사용 가능한 인텔리전스를 기반으로 추가 정보를 제공합니다.

Security Signals Explorer에서 모든 위협 인텔리전스 일치 항목을 확인하는 쿼리는 `@threat_intel.indicators_matched:*`입니다. 위협 인텔리전스를 쿼리할 때 사용할 수 있는 추가 속성은 다음과 같습니다.

- `@threat_intel.results.category`의 경우: attack, corp_vpn, cryptomining, malware, residential_proxy, tor, scanner
- `@threat_intel.results.intention`의 경우: malicious, suspicious, benign, unknown

{{< img src="security/security_monitoring/investigate_security_signals/threat_intel_results_categories.png" alt="residential proxy, corp_vpn, cryptomining 및 malware 위협 인텔리전스 범주별로 분류된 신호의 막대 그래프를 보여주는 Signals Explorer" style="width:80%;" >}}

위협 인텔리전스 피드에 대한 자세한 내용은 [Threat Intelligence][10] 문서를 참조하세요.

### 네트워크 IP 속성별 검색 {#search-by-network-ip-attributes}

로그에서 의심스러운 활동이 탐지되면 네트워크 IP를 검색하여 의심스러운 행위자가 시스템과 상호 작용했는지 확인하세요. Log Explorer에서 IP 속성별로 검색하려면 다음 쿼리를 사용하세요. `@network.ip.list:<IP address>` 이 쿼리는 태그, 속성, 오류 및 메시지 필드를 포함하여 로그의 모든 위치에서 IP를 검색합니다.

신호 패널에서 직접 이 쿼리를 실행할 수도 있습니다.
1. {{< ui >}}IPS{{< /ui >}} 섹션에서 IP 주소를 클릭합니다.
2. {{< ui >}}View Logs with @network.client.ip:<ip_address>{{< /ui >}}를 선택합니다.

{{< img src="security/security_monitoring/investigate_security_signals/search_logs_by_ip.png" alt="선택한 IP 주소에 대한 위협 옵션을 보여주는 신호 패널" style="width:90%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/notifications/rules/
[2]: /ko/account_management/audit_trail/events/#cloud-security-platform-events
[3]: /ko/account_management/rbac/
[4]: /ko/logs/explorer/saved_views/
[5]: https://app.datadoghq.com/security/siem/signals
[6]: /ko/incident_response/work_management/
[7]: /ko/incident_response/incident_management/
[8]: /ko/actions/workflows/trigger/#trigger-a-workflow-from-a-security-signal
[9]: /ko/security/cloud_security_management/workflows/
[10]: /ko/security/threat_intelligence
[11]: /ko/security/suppressions/#create-a-suppression-rule
[12]: https://app.datadoghq.com/security/siem/cases
[13]: https://app.datadoghq.com/security/configuration/siem/case-management
[14]: /ko/bits_ai/bits_security_analyst/