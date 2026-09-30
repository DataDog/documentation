---
description: Observability Pipelines Worker를 사용하여 로그를 Microsoft Sentinel로 전송하는 방법을
  알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Microsoft Sentinel 목적지
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Microsoft Sentinel 목적지를 사용하여 로그를 Microsoft Sentinel로 전송하세요. Microsoft Sentinel의 API 호출 제한은 [로그 수집 API][3]를 참조하세요.

## 전제 조건 {#prerequisites}

Microsoft Sentinel 목적지를 설정하려면 Azure에서 Workspace를 생성해야 합니다. 해당 작업 영역에서 다음 단계를 따르세요.
1. 작업 영역에 [Microsoft Sentinel을 추가][6]합니다.
1. [Data Collection Endpoint(DCE)를 생성][7]합니다.
1. 아직 생성하지 않은 경우 작업 영역 내에 [Log Analytics Workspace를 생성][8]합니다.
1. 데이터를 전송하려는 표 유형에 해당하는 지침을 따릅니다.
{{< tabs >}}
{{% tab "Azure Table" %}}
1. Data Collection Rule(DCR) 파라미터용 JSON 파일을 생성합니다. 자세한 내용은 [데이터 수집 규칙(DCR)][1]을 참조하고, 데이터를 전송할 수 있는 표의 전체 목록은 [지원하는 Azure 표][7]를 참조하세요.
    - `streamDeclarations` 속성에는 해당 Azure 표 열에 매핑할 모든 로그 필드를 나열해야 합니다. 자세한 내용은 [스트림 선언][2]을 참조하세요.
    - `transformKql` 속성에는 삭제되어 표에 매핑되지 않는 로그의 모든 필드를 나열해야 합니다. 자세한 내용은 [데이터 흐름 속성][3]을 참조하세요.
    - **참고**: 각 로그 필드는 `streamDeclarations` 또는 `transformKql` 중 하나의 속성에 나열되어야 합니다. 그렇지 않으면 로그가 삭제됩니다. 로그가 삭제될 때 알림을 설정하는 방법은 [Azure Monitor에서 DCR 데이터 수집 모니터링][4]을 참조하세요.
    - 예를 들어, 이 JSON 파일(`dcr-commonsecuritylog.json`)은 [`CommonSecurityLog`][5] 표에 매핑할 로그 필드를 추가합니다.
        ```bash
        {
            "location": "eastus",
            "kind": "Direct",
            "properties": {
            "dataCollectionEndpointId": "<DCE_RESOURCE_ID>",
            "streamDeclarations": {
                "Custom-CommonSecurityLog": {
                "columns": [
                    { "name": "TimeGenerated",      "type": "datetime" },
                    { "name": "DeviceVendor",       "type": "string"   },
                    { "name": "DeviceProduct",      "type": "string"   },
                    { "name": "DeviceVersion",      "type": "string"   },
                    { "name": "DeviceEventClassID", "type": "string"   },
                    { "name": "Activity",           "type": "string"   },
                    { "name": "LogSeverity",        "type": "string"   },
                    { "name": "SourceIP",           "type": "string"   },
                    { "name": "DestinationIP",      "type": "string"   },
                    { "name": "Message",            "type": "string"   },
                    { "name": "source_type",        "type": "string"   },
                    { "name": "path",               "type": "string"   },
                    { "name": "timestamp",          "type": "string"   }
                ]
                }
            },
            "destinations": {
                "logAnalytics": [
                {
                    "workspaceResourceId": "<WORKSPACE_RESOURCE_ID>",
                    "name": "LogAnalyticsDest"
                }
                ]
            },
            "dataFlows": [
                {
                "streams":      ["Custom-CommonSecurityLog"],
                "destinations": ["LogAnalyticsDest"],
                "transformKql": "source | project-away source_type, path, timestamp",
                "outputStream": "Microsoft-CommonSecurityLog"
                }
            ]
            }
            ```
    - Replace the placeholders:
        - `<DCE_RESOURCE_ID>` with the ID of the DCE resource you created in step 2. Run the [`az monitor data-collection endpoint show`][9] command to get the DCE resource ID. For example:
            ```
            az monitor data-collection endpoint show \
            --name "<DCE_NAME>" \
            --resource-group <RESOURCE_GROUP> \
            --subscription <SUBSCRIPTION_ID> \
            --query "id"
            ```
        - `<WORKSPACE_RESOURCE_ID>` with the ID of the Logs Analytics Workspace you created in step 3. Run the [`az monitor log-analytics workspace show`][10] command to get the Workspace resource ID. For example:
            ```
            az monitor log-analytics workspace show \
            --workspace-name "<DCE_NAME>" \
            --resource-group <RESOURCE_GROUP> \
            --subscription <SUBSCRIPTION_ID> \
            --query "id"
            ```

    - See [CommonSecurityLog Columns][6] for a full list of `commonsecuritylog` table columns.
1. [`az monitor data-collection rule create`][8] Azure CLI 명령을 실행하여 이전 단계에서 만든 JSON 파일을 사용하여 DCR을 생성합니다. 예를 들어, `dcr-commonsecuritylog.json` 예시 파일의 경우 다음과 같습니다.
    ```bash
    az monitor data-collection rule create \
        --resource-group "myResourceGroup" \
        --location "eastus" \
        --name "myCollectionRule" \
        --subscription "mysubscription" \
        --rule-file "\path\to\json\dcr-commonsecuritylog.json"
    ```

[1]: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/logs-ingestion-api-overview#data-collection-rule-dcr
[2]: https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/data-collection-rule-structure#stream-declarations
[3]: https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/data-collection-rule-structure#data-flow-properties
[4]: https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/data-collection-monitor
[5]: https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/commonsecuritylog
[6]: https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/commonsecuritylog#columns
[7]: https://learn.microsoft.com/en-us/azure/azure-monitor/logs/logs-ingestion-api-overview#supported-tables
[8]: https://learn.microsoft.com/en-us/cli/azure/monitor/data-collection/rule?view=azure-cli-latest#az-monitor-data-collection-rule-create
[9]: https://learn.microsoft.com/en-us/cli/azure/monitor/data-collection/endpoint?view=azure-cli-latest#az-monitor-data-collection-endpoint-show
[10]: https://learn.microsoft.com/en-us/cli/azure/monitor/log-analytics/workspace?view=azure-cli-latest#az-monitor-log-analytics-workspace-show

{{% /tab %}}
{{% tab "사용자 지정 표" %}}
1. Log Analytics Workspace에서 **Settings** > **Tables**로 이동합니다.
1. **+ Create**를 클릭합니다.
1. 사용자 지정 표를 정의합니다(예: `MyOPWLogs`).
    - **참고**:<br>- 표가 구성되면 표 이름에 접두사 `Custom-` 및 접미사 `_CL`가 자동으로 추가됩니다. 예를 들어, Azure에서 표 이름을 `MyOPWLogs`로 정의한 경우, 전체 표 이름은 `Custom-MyOPWLogs_CL`로 저장됩니다. Observability Pipelines Microsoft Sentinel 목적지를 설정할 때는 전체 표 이름을 사용하세요.<br>- 전체 표 이름은 DCR의 리소스 JSON 내 `streamDeclarations`에서 찾을 수 있습니다.
1. **New Custom Log (DCR-based)**를 선택합니다.
1. **Create a new data collection rule**을 클릭하고 이전에 만든 DCE를 선택합니다.
1. **Next**를 클릭합니다.
1. 샘플 JSON 로그를 업로드합니다. 이 예시에서는 다음 JSON을 **Schema and Transformation**에 사용하며, `TimeGenerated`는 필수입니다.
    ```json
    {
        "TimeGenerated": "2024-07-22T11:47:51Z",
        "event": {}
    }
    ```
1. **Create**를 클릭합니다.
{{% /tab %}}
{{< /tabs >}}
1. Azure에서 **Microsoft Entra ID**로 이동합니다.
    1. **Add** > **App Registration**을 클릭합니다.
    1. **Create**를 클릭합니다.
    1. 개요 페이지에서 **Client credentials: Add a certificate or secret**을 클릭합니다.
    1. **New client secret**을 클릭합니다.
    1. 시크릿 이름을 입력하고 **Add**를 클릭합니다. **참고**: 클라이언트 시크릿은 10분 후에 난독화되므로 반드시 기록해 두세요.
    1. **테넌트 ID** 및 **클라이언트 ID**도 기록해 둡니다. [Observability Pipelines Microsoft Sentinel 목적지](#set-up-the-destination-in-observability-pipelines)를 설정할 때 클라이언트 시크릿과 함께 이 정보가 필요합니다.
1. Azure Portal의 [Data Collection Rules][9] 페이지에서 이전에 만든 DCR을 검색하여 선택합니다.
    1. 왼쪽 탐색 창에서 **Access Control (IAM)**을 클릭합니다.
    1. **Add**를 클릭하고 **Add role assignment**를 선택합니다.
    1. **Monitoring Metrics Publisher** 역할을 추가합니다.
    1. Members 페이지에서 **User, group, or service principal**을 선택합니다.
    1. **Select Members**를 클릭한 후 앱 등록 단계에서 만든 애플리케이션을 검색합니다.
    1. **Review + Assign**을 클릭합니다. **참고**: IAM 변경 사항이 적용되는 데 최대 10분이 걸릴 수 있습니다.

아래 표는 [Observability Pipelines Microsoft Sentinel 목적지](#set-up-the-destination-in-observability-pipelines)를 설정할 때 필요한 Azure 및 Microsoft Sentinel 정보를 요약한 것입니다.

| 이름                              | 설명                                                                                                                                                                                                                     |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Application (client) ID            | Azure Active Directory(AD) 애플리케이션의 클라이언트 ID입니다. 자세한 내용은 [Microsoft Entra ID에 애플리케이션 등록][4]을 참조하세요.<br>**예시**: `550e8400-e29b-41d4-a716-446655440000`                                                                                      |
| Directory (tenant) ID              | Azure AD 테넌트 ID입니다. 자세한 내용은 [Microsoft Entra ID에 애플리케이션 등록][4]을 참조하세요.<br>**예시**: `72f988bf-86f1-41af-91ab-2d7cd011db47`                                                                                      |
| Table (Stream) Name                | Data Collection Rule(DCR)을 구성할 때 선택한 표와 일치하는 스트림의 이름입니다.  **참고**: 전체 표 이름은 `streamDeclarations` 아래의 DCR 리소스 JSON에서 찾을 수 있습니다. <br>**예시**: `Custom-MyOPWLogs_CL`                                                                                                          |
| Data Collection Rule (DCR) immutable ID | 로깅 경로가 정의된 DCR의 수정 불가능한 ID입니다. DCR Overview 페이지에 표시되는 **Immutable ID**입니다.<br>**참고**: DCR IAM 설정에서 Monitoring Metrics Publisher 역할이 할당되었는지 확인하세요.<br>**예시**: `dcr-000a00a000a00000a000000aa000a0aa`<br> DCR 생성 또는 보기에 대한 자세한 내용은 [Azure Monitor의 데이터 수집 규칙(DCR)][5]을 참조하세요. |


## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리의 경우 Microsoft Sentinel 클라이언트 시크릿 및 Data Collection Endpoint의 식별자만 입력하세요. 실제 값은 <b>입력하지 마세요</b>.</div>

[파이프라인 설정][10] 시 Microsoft Sentinel 목적지를 설정합니다. 파이프라인은 [UI][1], [API][11] 또는 [Terraform][12]을 사용하여 설정할 수 있습니다. 이 섹션에서 설명하는 단계는 UI에서 설정합니다.

파이프라인 UI에서 Microsoft Sentinel 목적지를 선택한 후 다음 단계를 따르세요.

1. Microsoft Sentinel 클라이언트 시크릿 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. Microsoft Sentinel Data Collection Endpoint의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. 애플리케이션의 클라이언트 ID(예: `550e8400-e29b-41d4-a716-446655440000`)를 입력합니다.
1. 테넌트의 디렉터리 ID(예: `72f988bf-86f1-41af-91ab-2d7cd011db47`)를 입력합니다. 이는 Azure AD 테넌트 ID입니다.
1. 로그를 전송할 전체 표 이름을 입력합니다. 표 이름 예시: `Custom-MyOPWLogs_CL`.
1. Data Collection Rule(DCR) immutable ID(예: `dcr-000a00a000a00000a000000aa000a0aa`)를 입력합니다.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 버퍼링 {#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Microsoft Sentinel 클라이언트 시크릿 식별자:
    - DCR Overview 페이지에 **Logs Ingestion Endpoint** 또는 **Data Collection Endpoint**로 표시된 DCE 엔드포인트 URL을 참조합니다. URL 예시: `https://<DCE-ID>.ingest.monitor.azure.com`
	- 기본 식별자는 `DESTINATION_MICROSOFT_SENTINEL_CLIENT_SECRET`입니다.
- Microsoft Sentinel Data Collection Endpoint 식별자:
    - Azure AD 애플리케이션의 클라이언트 시크릿(예: `550e8400-e29b-41d4-a716-446655440000`)를 참조합니다.
	- 기본 식별자는 `DESTINATION_MICROSOFT_SENTINEL_DCE_URI`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/microsoft_sentinel %}}

{{% /tab %}}
{{< /tabs >}}

## 목적지 작동 방식 {#how-the-destination-works}

### 이벤트 배치 처리 {#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 배치 처리][2]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 타임아웃(초)   |
|----------------|-------------------|---------------------|
| 없음           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/destinations/#event-batching
[3]: https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/service-limits#logs-ingestion-api
[4]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate%2Cexpose-a-web-api
[5]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-rule-overview
[6]: https://portal.azure.com/#browse/microsoft.securityinsightsarg%2Fsentinel
[7]: https://portal.azure.com/#view/HubsExtension/BrowseResource.ReactView/resourceType/microsoft.insights%2Fdatacollectionendpoints
[8]: https://portal.azure.com/#create/Microsoft.LogAnalyticsOMS
[9]: https://portal.azure.com/#view/HubsExtension/BrowseResource.ReactView/resourceType/microsoft.insights%2Fdatacollectionrules
[10]: /ko/observability_pipelines/configuration/set_up_pipelines/
[11]: /ko/api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline