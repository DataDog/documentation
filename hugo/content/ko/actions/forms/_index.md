---
description: 입력을 수집하고, 응답을 분석하며, 자동화를 트리거하는 양식을 만드세요.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: 블로그
  text: Datadog Forms를 사용하여 엔지니어링 조직 전반에서 피드백을 행동으로 전환하기
- link: https://www.datadoghq.com/blog/datadog-forms-sheets-developer-feedback/
  tag: 블로그
  text: Datadog Forms 및 Sheets를 사용하여 개발자 피드백을 운영 인사이트로 전환하기
title: 양식
---
## 개요 {#overview}

Datadog Forms를 사용하면 Datadog에서 입력을 수집하고, 응답을 분석하며, 자동화를 트리거할 수 있습니다. 양식과 응답은 조직 전체에서 공유할 수 있으므로 팀과 함께 데이터를 수집하고 분석할 수 있습니다.

양식 사용 방법은 다음과 같습니다.
- 사전 정의된 템플릿에서 서비스 스캐폴딩
- 내부 개발자 포털(IDP)에서 엔지니어링 피드백 조사
- 직원 양식 응답에서 직접 보안, 플랫폼 또는 IT 팀을 위한 서비스 요청 및 [작업 항목][1] 만들기

## 양식 만들기 {#create-a-form}

[Forms][2] 페이지에서 {{< ui >}}New Form{{< /ui >}}을 클릭한 다음, 생성 방법을 선택하세요.

{{< tabs >}}
{{% tab "AI로 만들기" %}}
1. {{< ui >}}Create with AI{{< /ui >}}를 선택하고 {{< ui >}}Continue{{< /ui >}}를 클릭합니다. [Bits Chat][100]과 함께 양식 편집기가 열립니다.
1. Bits Chat 패널에서 만들려는 양식을 설명합니다.
1. {{< ui >}}Publish{{< /ui >}} 또는 {{< ui >}}Publish Changes{{< /ui >}}를 클릭하여 응답자가 양식을 사용할 수 있도록 합니다.

Forms 편집기뿐만 아니라 Datadog 어디에서나 Bits Chat에 양식 생성을 요청할 수 있습니다. [MCP로 양식 생성 및 관리](#create-and-manage-forms-with-mcp)를 참조하세요.

[100]: /ko/bits_ai/bits_chat/

{{% /tab %}}

{{% tab "빈 양식" %}}
1. {{< ui >}}Start with a blank form{{< /ui >}}을 선택하고 {{< ui >}}Continue{{< /ui >}}를 클릭합니다.
1. 양식의 이름을 지정하고 필요에 따라 설명과 테마 색상을 추가합니다. {{< ui >}}Continue{{< /ui >}}를 클릭합니다.
1. 구성 요소를 추가하려면 {{< ui >}}Add Component{{< /ui >}}을 클릭하거나 {{< ui >}}Fields{{< /ui >}} 패널에서 더하기 **+** 아이콘을 클릭합니다. 전체 구성 요소 유형 및 옵션 목록은 [양식 구성 요소][3]를 참조하세요.
1. {{< ui >}}Publish{{< /ui >}} 또는 {{< ui >}}Publish Changes{{< /ui >}}를 클릭하여 응답자가 양식을 사용할 수 있도록 합니다.

[3]: /ko/actions/forms/components/

{{% /tab %}}

{{% tab "Blueprint" %}}
Blueprints는 일반적인 사용 사례를 위한 시작용 양식으로, 샘플 질문이 미리 로드되어 있습니다. 일부 Blueprints에는 사전 구성된 자동화가 포함되어 있습니다. 사용 가능한 Blueprints에는 개발자 경험 설문조사, IDP 피드백, 업무 관리 서비스 요청, 인시던트 보고, 버그 보고, 온콜 에스컬레이션, 인시던트 이후 검토 등이 포함됩니다.

1. {{< ui >}}Create from blueprint{{< /ui >}}를 선택하고 사용 가능한 템플릿을 살펴봅니다.
1. Blueprints를 선택하고 {{< ui >}}Continue{{< /ui >}}를 클릭합니다.
1. 양식의 이름을 지정하고 필요에 따라 설명과 테마 색상을 추가합니다. {{< ui >}}Continue{{< /ui >}}를 클릭합니다.
1. 양식을 추가로 사용자 지정하려면 [양식 구성 요소][3]를 참조하세요.
1. {{< ui >}}Publish{{< /ui >}} 또는 {{< ui >}}Publish Changes{{< /ui >}}를 클릭하여 응답자가 양식을 사용할 수 있도록 합니다.


[3]: /ko/actions/forms/components/
{{% /tab %}}

{{% tab "가져오기" %}}
PDF 또는 JSON 파일에서 기존 양식을 가져올 수 있습니다.

1. {{< ui >}}Import a form{{< /ui >}}을 선택합니다. 가져오기 대화 상자가 열립니다.
1. 소스를 선택하고 안내를 따릅니다.
1. 양식의 이름을 지정하고 필요에 따라 설명과 테마 색상을 추가합니다. {{< ui >}}Continue{{< /ui >}}를 클릭합니다.
1. 양식을 추가로 사용자 지정하려면 [양식 구성 요소][3]를 참조하세요.
1. {{< ui >}}Publish{{< /ui >}} 또는 {{< ui >}}Publish Changes{{< /ui >}}를 클릭하여 응답자가 양식을 사용할 수 있도록 합니다.


[3]: /ko/actions/forms/components/
{{% /tab %}}
{{< /tabs >}}

양식을 미리 보거나 공유하려면 다음 단계를 따르세요.
1. {{< ui >}}Preview{{< /ui >}}를 클릭하여 응답자에게 표시되는 양식을 확인합니다.
1. {{< ui >}}Share{{< /ui >}}를 클릭하여 양식 링크를 복사하거나 공유 옵션을 구성합니다.

## 양식 설정{#form-settings}

[양식][2] 페이지에서 양식을 클릭하여 편집기에서 엽니다. 편집기 헤더에서 톱니바퀴 <i class="icon-cog-2"></i> 아이콘을 클릭하여 다음 설정에 액세스합니다.

| 설정| 설명|
|---------|-------------|
| 응답 수락| 양식을 활성 또는 비활성 상태로 설정합니다. 비활성 상태일 때는 양식이 새 응답을 받지 않습니다. 종료 날짜를 설정하여 특정 날짜에 양식이 자동으로 닫히도록 할 수도 있습니다. 게시된 양식에서만 사용할 수 있습니다. |
| 익명 응답| 활성화하면 응답자의 이메일이 저장되지 않습니다. |
| 권한 관리| 양식을 보고 편집할 수 있는 사람과 제출된 응답을 볼 수 있는 사람을 구성하세요. [액세스 관리](#manage-access)를 참조하세요. |
| 양식 복제| 양식의 사본을 만듭니다. |
| 양식 가져오기| PDF 또는 JSON 파일의 필드를 현재 양식으로 가져옵니다. |
| 양식 내보내기(JSON)| 양식을 JSON 파일로 다운로드합니다. |

응답 관리에 대한 자세한 내용은 [양식 응답][4]을 참조하세요.

## 양식 공유{#share-a-form}

양식 공유를 구성하려면 다음 단계를 따르세요.
1. [양식][2] 페이지에서 양식을 클릭합니다.
1. {{< ui >}}Share{{< /ui >}}를 클릭합니다.

다음과 같은 공유 옵션을 사용할 수 있습니다.

{{% collapse-content title="Datadog 내에서 공유" level="h3" expanded=false %}}
Datadog 조직 내의 사용자와 양식을 공유합니다.

{{< ui >}}Add to Dashboard{{< /ui >}}에서 드롭다운을 사용하여 기존 대시보드에 양식을 추가하거나 대시보드를 만듭니다.

{{< ui >}}Add to IDP Self-Service Actions{{< /ui >}} 토글을 활성화하여 [Self-Service Actions][5] 카탈로그에 양식을 표시합니다. 이곳은 플랫폼 및 인프라 팀이 조직의 다른 구성원이 검색하고 사용할 수 있도록 도구를 게시하는 중앙 공간입니다.
{{% /collapse-content %}}

{{% collapse-content title="외부 사용자와 공유" level="h3" expanded=false %}}
Datadog 조직 외부의 사용자와 양식을 공유합니다. 각 공유 옵션에 대한 액세스 만료 날짜를 구성하고 설정 및 만료 날짜가 다른 여러 공유 구성을 만들 수 있습니다.

다음 옵션을 사용할 수 있습니다.

- **특정 개인**: 개별 이메일 주소로 수신자를 추가합니다. 예: `alice@example.com` 및 `bob@example.com`.
- **회사 도메인**: 예를 들어`*@yourcompany.com`과 같이 특정 이메일 도메인에 있는 모든 사람과 공유합니다.
- **공유 가능한 링크**: Datadog 계정 없이 누구나 양식에 액세스하는 데 사용할 수 있는 링크를 생성합니다.
{{% /collapse-content %}}

외부 공유를 일시 중지하거나 제거하려면 {{< ui >}}Share{{< /ui >}}를 클릭한 다음 {{< ui >}}Edit{{< /ui >}}을 클릭하고 {{< ui >}}Pause Sharing{{< /ui >}} 또는 {{< ui >}}Delete Sharing{{< /ui >}}을 선택합니다.

공유 링크의 필드를 미리 채워 응답자가 일부 답변이 입력된 상태로 시작하게 하려면 [양식 필드 미리 채우기][15]를 참조하세요.

## 대시보드에 양식 추가 {#add-a-form-to-a-dashboard}

양식 편집기에서 대시보드에 양식을 추가하려면 다음 단계를 따르세요.
1. [양식][2] 페이지에서 양식을 클릭하여 편집기에서 엽니다.
1. {{< ui >}}Share{{< /ui >}} 드롭다운을 클릭하고 {{< ui >}}Share within Datadog{{< /ui >}}을 선택합니다.
1. {{< ui >}}Add to Dashboard{{< /ui >}} 아래에서 기존 대시보드를 선택하거나 새로 만든 다음 {{< ui >}}Add{{< /ui >}}를 클릭합니다.

대시보드에서 직접 대시보드에 양식을 추가할 수도 있습니다.
1. [대시보드][6]로 이동합니다.
1. **Add Widgets**를 클릭하여 측면 패널을 엽니다.
1. **Apps** 탭을 클릭합니다.
1. **Form Widget**을 선택합니다.
1. 양식을 선택한 다음 {{< ui >}}Save{{< /ui >}}을 클릭합니다.

## 자동화 추가 {#add-automation}

양식을 만든 후, 양식이 제출될 때 자동으로 트리거되는 [작업][7] 또는 [워크플로 blueprint][8]를 추가할 수 있습니다.
1. [양식][2] 페이지에서 양식을 클릭합니다.
1. 양식 상단에서 {{< ui >}}Automation{{< /ui >}}을 선택합니다.
1. 작업 또는 blueprint를 선택합니다.
1. 작업 또는 blueprint가 워크플로 캔버스에서 열리며, 여기서 [편집][9]할 수 있습니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

**참고**: 양식에 의해 트리거되는 자동화는 [Workflow Automation][10] 아래에 나타납니다.

## MCP로 양식 생성 및 관리 {#create-and-manage-forms-with-mcp}

외부 AI 에이전트를 [Datadog MCP Server][11]에 연결하여 양식과 해당 응답을 생성하고, 업데이트하고, 게시하고, 읽을 수 있습니다. [MCP Server에 연결][12]할 때 `forms` 도구 세트(또는 `all`)를 활성화합니다. Datadog 어디에서나 [Bits Chat][13]에 양식 작성을 요청할 수도 있습니다. 사용 가능한 도구의 전체 목록은 Datadog MCP Server 도구 참조의 [양식][14]을 참조하세요.

## 액세스 관리 {#manage-access}

기본적으로 양식 작성자만 양식에 액세스할 수 있습니다. 양식의 권한을 변경하려면 다음 단계를 따르세요.
1. [양식][2] 페이지에서 양식을 클릭하여 편집기에서 엽니다.
1. 편집기 헤더에서 톱니바퀴 <i class="icon-cog-2"></i> 아이콘을 클릭합니다.
1. {{< ui >}}Manage Permissions{{< /ui >}}를 클릭합니다. 두 개의 섹션이 있는 모달이 열립니다.
   - **양식 액세스**: 양식을 조회하고 편집할 수 있는 사용자를 제어합니다.
   - **응답 액세스**: 제출된 응답을 조회할 수 있는 사용자를 제어합니다. 이 섹션은 양식이 첫 번째로 제출된 후에만 사용할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/incident_response/work_management/
[2]: https://app.datadoghq.com/forms
[3]: /ko/actions/forms/components/
[4]: /ko/actions/forms/responses/
[5]: /ko/internal_developer_portal/self_service_actions/
[6]: /ko/dashboards/
[7]: https://app.datadoghq.com/actions/action-catalog/
[8]: https://app.datadoghq.com/workflow/blueprints
[9]: /ko/actions/workflows/build/#build-a-workflow-with-the-workflow-builder
[10]: https://app.datadoghq.com/workflow
[11]: /ko/mcp_server/
[12]: /ko/mcp_server/setup/#toolsets
[13]: /ko/bits_ai/bits_chat/
[14]: /ko/mcp_server/tools/#forms
[15]: /ko/actions/forms/guide/prefill/