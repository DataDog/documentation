---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
  - logic
  - logic step
  - flow
aliases:
- /ko/workflows/logic_actions
- /ko/service_management/workflows/actions_catalog/logic_actions/
- /ko/service_management/workflows/actions/flow_control
description: if 조건, switch 문, 루프, 대기 간격 및 분기 작업을 사용하여 워크플로에 제어 로직을 추가합니다.
disable_toc: false
further_reading:
- link: /integrations/
  tag: 설명서
  text: 통합에 대해 알아보기
is_beta: false
title: 워크플로 로직
type: workflows
---
[Logic actions][1]을 사용하여 워크플로에 제어 로직을 추가합니다. 예를 들어, 조건에 따라 분기하거나, 작업을 반복 실행하거나, 대기 간격을 포함하는 등의 작업을 수행할 수 있습니다.

## If 조건 {#if-condition}

사용자가 정의한 하나 이상의 문에 대한 평가 결과에 따라 워크플로의 실행 경로를 분기할 수 있습니다. 아래 스크린샷에서 {{< ui >}}If condition{{< /ui >}} 작업은 이전 HTTP 요청 작업의 상태 코드가 `200`을 반환하는지 여부에 따라 워크플로의 다음 단계를 결정합니다.

{{< img src="actions/workflows/actions/flow_control/if-condition.png" alt="if 조건 작업이 선택되고 구성 탭이 열려 있는 워크플로 캔버스입니다. 이전 요청의 상태 코드가 200이어야 한다고 지정하는 두 개의 문이 있는 Statements 섹션이 강조 표시되어 있습니다." >}}

## Switch 문 {#switch-statement}

Switch 문 작업을 사용하여 단일 단계에서 여러 분기 경로를 처리합니다. switch 표현식을 지정하고 이를 하나 이상의 케이스 값과 비교합니다. 일치하는 케이스가 없으면 기본 분기가 대신 실행됩니다. 아래 예시에서 Switch 문은 이전 HTTP 요청의 상태 코드가 `200`, `403`, `404`, `500` 또는 다른 값인지에 따라 워크플로를 라우팅합니다.

{{< img src="actions/workflows/actions/flow_control/switch-statement.png" alt="서로 다른 HTTP 상태 코드에 대해 여러 케이스로 분기하는 'Make_request.status' 라는 이름의 Switch 문 작업을 보여주는 워크플로 캔버스입니다. 각 케이스는 서로 다른 Slack 메시지를 보내며, 다른 어떤 케이스와도 일치하지 않으면 기본 분기에서 예기치 않은 오류가 발생합니다." >}}

## Sleep {#sleep}

{{< ui >}}Sleep{{< /ui >}} 작업은 지정된 기간 동안 워크플로 실행을 일시 중지합니다. {{< ui >}}Duration{{< /ui >}} 드롭다운에서 미리 정의된 기간을 선택하거나 초 단위로 사용자 지정 변수를 입력합니다.

## For loop {#for-loop}

{{< ui >}}For loop{{< /ui >}} 작업을 사용하면 주어진 입력 목록의 각 항목에 대해 일련의 작업을 반복적으로 실행할 수 있습니다. for 루프는 최대 2,000개 항목이 포함된 입력 목록을 허용합니다. for 루프 내에서 오류 경로 구성 및 변수 업데이트를 비롯한 다양한 작업을 수행할 수 있습니다.

아래 예시에서 for 루프가 인시던트 목록을 반복하며 일주일 이상 된 인시던트에 대해 Slack 메시지를 보냅니다.

{{< img src="actions/workflows/actions/flow_control/iteration2.png" alt="For loop가 포함된 워크플로. 루프는 인시던트 목록을 반복하며 인시던트가 일주일 이상 된 경우 Slack 채널로 메시지를 보냅니다." style="width:100%;" >}}

워크플로에 for 루프를 추가하는 방법은 다음과 같습니다.
1. 워크플로 캔버스에서 더하기({{< ui >}}\+{{< /ui >}}) 아이콘을 클릭하여 작업 카탈로그를 엽니다.
1. {{< ui >}}For loop{{< /ui >}} 단계를 검색하고 선택합니다.
1. 루프 단계를 클릭하고 해당 단계에서 반복 처리할 {{< ui >}}Input list{{< /ui >}}를 입력합니다. 사용자 지정 목록을 입력하거나 워크플로 변수를 사용할 수 있습니다.
1. 루프 프레임 내부에서 ({{< ui >}}\+{{< /ui >}}) 아이콘을 클릭하여 루프에 단계를 추가합니다.
1. 반복 작업을 구성합니다. 입력 목록의 현재 값에 액세스하려면 '{{Current.Value}}' 변수를 사용하세요. 현재 값의 인덱스에 액세스하려면 '{{Current.Index}}' 변수를 사용하세요.
1. 반복 실행할 추가 단계를 필요한 만큼 추가하고 구성합니다. {{< ui >}}if statement{{< /ui >}}와 {{< ui >}}break{{< /ui >}}를 사용하여 루프를 조기에 종료할 수 있습니다.
1. 워크플로를 {{< ui >}}Save{{< /ui >}} 및 {{< ui >}}Publish{{< /ui >}}합니다.

실행이 완료되면 워크플로는 {{< ui >}}Debug{{< /ui >}} 모드로 전환됩니다. 루프 내 단계를 선택하여 해당 단계의 {{< ui >}}All{{< /ui >}}, {{< ui >}}Failed{{< /ui >}} 또는 {{< ui >}}Successful{{< /ui >}} 반복 목록을 확인합니다. 반복을 선택하여 출력 또는 오류 메시지를 확인합니다.

##  While 루프 {#while-loop}

{{< ui >}}While loop{{< /ui >}} 작업을 사용하면 일련의 조건에 따라 작업 집합을 반복 실행할 수 있으며, 반복 횟수를 미리 알 수 없는 자동화 패턴에 권장됩니다. While 루프는 최대 2,000회 반복 실행됩니다. while 루프를 사용하여 페이지 매김, 진행 상황 폴링, 성공할 때까지 재시도 등 다양한 작업을 수행할 수 있습니다.

다음 예시는 while 루프를 사용하여 앱의 AWS S3 List Buckets API에 페이지 매기기를 적용하는 방법을 보여줍니다.

{{< img src="actions/workflows/actions/flow_control/iteration3.png" alt="while 루프가 포함된 워크플로입니다. 이 워크플로는 While 루프를 사용하여 앱의 AWS S3 List Buckets API에 페이지 매기기를 적용합니다." style="width:100%;" >}}

워크플로에 while 루프를 추가하려면 다음을 수행하세요.
1. 워크플로 캔버스에서 더하기({{< ui >}}\+{{< /ui >}}) 아이콘을 클릭하여 작업 카탈로그를 엽니다.
1. {{< ui >}}While loop{{< /ui >}} 단계를 검색하고 선택합니다.
1. 루프 단계를 클릭하고 While 루프가 각 반복 전에 평가할 조건을 정의합니다. 조건이 참이면 루프가 계속되고, 거짓으로 평가되면 중지됩니다.
1.  루프 프레임 내부에서 더하기({{< ui >}}\+{{< /ui >}}) 아이콘을 클릭하여 루프에 단계를 추가합니다.
1. 반복 작업을 구성합니다. 현재 값의 인덱스에 액세스하려면 '{{Current.Index}}' 변수를 사용하세요.
1. 반복 실행할 추가 단계를 필요한 만큼 추가하고 구성합니다. {{< ui >}}if statement{{< /ui >}}와 {{< ui >}}break{{< /ui >}} 작업을 사용하여 루프를 조기에 종료할 수 있습니다.
1. 워크플로를 {{< ui >}}Save{{< /ui >}} 및 {{< ui >}}Publish{{< /ui >}}합니다.

실행이 완료되면 워크플로는 {{< ui >}}Debug{{< /ui >}} 모드로 전환됩니다. 루프 내 단계를 선택하여 해당 단계의 {{< ui >}}All{{< /ui >}}, {{< ui >}}Failed{{< /ui >}} 또는 {{< ui >}}Successful{{< /ui >}} 반복 목록을 확인합니다. 반복을 선택하여 출력 또는 오류 메시지를 확인합니다. While 루프 단계와 특정 인덱스를 선택하여 해당 인덱스에서 평가된 조건을 확인하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog Community Slack][2]의 **#workflows** 채널에 참여하세요.

[1]: https://app.datadoghq.com/workflow/action-catalog#logic//com.datadoghq.core.if
[2]: https://chat.datadoghq.com/