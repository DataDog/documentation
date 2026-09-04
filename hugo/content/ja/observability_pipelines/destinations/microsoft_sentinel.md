---
description: Observability Pipelines Worker を使用して Microsoft Sentinel にログを送信する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Microsoft Sentinel 送信先
---
{{< product-availability >}}

## 概要 {#overview}

Observability Pipelines の Microsoft Sentinel 送信先を使用して、Microsoft Sentinel にログを送信します。Microsoft Sentinel の API 呼び出し制限については、[Logs Ingestion API][3] を参照してください。

## 前提条件{#prerequisites}

Microsoft Sentinel 送信先をセットアップするには、まだ作成していない場合は、Azure でワークスペースを作成する必要があります。そのワークスペースで、以下を行います。
1. [Microsoft Sentinel を追加][6]します。
1. [データ収集エンドポイント (DCE) を作成][7]します。
1. [Log Analytics ワークスペースを作成][8]します (まだ作成していない場合)。
1. データを送信するテーブルの種類に関する手順に従ってください。
{{< tabs >}}
{{% tab "Azure Table" %}}
1. データ収集ルール (DCR) パラメータ用の JSON ファイルを作成します。詳細については[データ収集ルール (DCR)][1]を、データを送信できるすべての利用可能なテーブルについては[サポートされている Azure テーブル][7]を参照してください。
    - `streamDeclarations`プロパティには、対応する Azure テーブル列にマッピングするすべてのログフィールドをリストする必要があります。詳細については[ストリーム宣言][2]を参照してください。
    - `transformKql`プロパティには、破棄され、テーブルにマッピングされないログ上のすべてのフィールドをリストする必要があります。詳細については[データフロープロパティ][3]を参照してください。
    - **注**: 各ログフィールドは、`streamDeclarations` または `transformKql` のいずれかのプロパティにリストされている必要があります。そうでない場合、ログは破棄されます。ログが破棄されたときにアラートを設定する方法については、[Azure Monitor で DCR データ収集を監視する][4]を参照してください。
    - たとえば、この JSON ファイル (`dcr-commonsecuritylog.json`) は、[`CommonSecurityLog`][5] テーブルにマップされるログフィールドを追加します。
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
1. 前の手順で作成した JSON ファイルを使用して [`az monitor data-collection rule create`][8] Azure CLI コマンドを実行し、DCR を作成します。たとえば、`dcr-commonsecuritylog.json` サンプルファイルを使用する場合、
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
{{% tab "カスタムテーブル" %}}
1. Log Analytics ワークスペースで、**Settings** > **Tables** に移動します。
1. **+ Create** をクリックします。
1. カスタムテーブルを定義します (例: `MyOPWLogs`)。
    - **注**:<br>- テーブルが構成されると、プレフィックス `Custom-` とサフィックス `_CL` がテーブル名に自動的に追加されます。たとえば、Azure で テーブル名を `MyOPWLogs` と定義した場合、完全なテーブル名は `Custom-MyOPWLogs_CL` として保存されます。Observability Pipelines Microsoft Sentinel 宛先を設定する際は、完全なテーブル名を使用する必要があります。<br>- 完全なテーブル名は、DCR のリソース JSON の `streamDeclarations` で確認できます。
1. **New Custom Log (DCR-based)** を選択します。
1. **Create a new data collection rule** をクリックし、先ほど作成した DCE を選択します。
1. **Next** をクリックします。
1. サンプル JSON ログをアップロードします。この例では、**Schema and Transformation** に以下の JSON を使用します。ここで `TimeGenerated` が必須となります。
    ```json
    {
        "TimeGenerated": "2024-07-22T11:47:51Z",
        "event": {}
    }
    ```
1. **Create** をクリックします。
{{% /tab %}}
{{< /tabs >}}
1. Azure で **Microsoft Entra ID** に移動します。
    1. **Add** > **App Registration** をクリックします。
    1. **Create** をクリックします。
    1. 概要ページで、**Client credentials: Add a certificate or secret** をクリックします。
    1. **New client secret** をクリックします。
    1. シークレットの名前を入力し、**Add** をクリックします。**注**: クライアントシークレットは 10 分後に難読化されるため、必ず控えておいてください。
    1. また、**テナント ID**と **クライアント ID** も控えておいてください。この情報は、[Observability Pipelines Microsoft Sentinel 送信先を設定する](#set-up-the-destination-in-observability-pipelines)際に、クライアントシークレットとともに必要になります。
1. Azure Portal の[データ収集ルール][9]ページで、先ほど作成した DCR を検索して選択します。
    1. **Access Control (IAM)** を左側のナビゲーションでクリックします。
    1. **Add** をクリックし、**Add role assignment** を選択します。
    1. **Monitoring Metrics Publisher** ロールを追加します。
    1. Members ページで、**User, group, or service principal** を選択します。
    1. **Select Members** をクリックし、アプリ登録の手順で作成したアプリケーションを検索します。
    1. **Review + Assign** をクリックします。**注**: IAM の変更が有効になるまで最大 10 分かかる場合があります。

以下の表は、[Observability Pipelines の Microsoft Sentinel 送信先を設定する](#set-up-the-destination-in-observability-pipelines)際に必要な Azure および Microsoft Sentinel の情報をまとめたものです。

| 名前                              | 説明                                                                                                                                                                                                                     |
|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Application (client) ID            | Azure Active Directory (AD) アプリケーションのクライアント ID。詳細については、[Microsoft Entra ID でアプリケーションを登録する][4]を参照してください。<br>**例**: `550e8400-e29b-41d4-a716-446655440000`                                                                                      |
| Directory (tenant) ID              | Azure AD テナント ID。詳細については、[Microsoft Entra ID でアプリケーションを登録する][4]を参照してください。<br>**例**: `72f988bf-86f1-41af-91ab-2d7cd011db47`                                                                                      |
| Table (Stream) Name                | データ収集ルール (DCR) の構成時に選択したテーブルと一致するストリームの名前。 **注**: 完全なテーブル名は、`streamDeclarations`の下にあるリソース JSON で確認できます。<br>**例**: `Custom-MyOPWLogs_CL`                                                                                                          |
| Data Collection Rule (DCR) immutable ID | これは、ログルーティングが定義されている DCR の不変 ID です。これは、DCR 概要ページに表示される **Immutable ID** です。<br>**注**: DCR の IAM 設定で Monitoring Metrics Publisher ロールが割り当てられていることを確認してください。<br>**例**: `dcr-000a00a000a00000a000000aa000a0aa`<br>DCR の作成または表示の詳細については、[Azure Monitor のデータ収集ルール (DCR)][5]を参照してください。|


## セットアップ {#setup}

<div class="alert alert-danger">シークレット管理の場合: Microsoft Sentinel クライアントシークレットとデータ収集エンドポイントの識別子のみを入力してください。実際の値を<b>入力しないで</b>ください</div>。

[パイプラインを作成][10]する際に、Microsoft Sentinel の送信先を設定します。パイプラインは、[UI][1]、[API][11]、または[Terraform][12] を使用して作成できます。このセクションの手順は UI で設定します。

パイプライン UI で Microsoft Sentinel の送信先を選択した後、

1. Microsoft Sentinel クライアントシークレットの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. Microsoft Sentinel データ収集エンドポイントの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. アプリケーションのクライアント ID を入力します (例: `550e8400-e29b-41d4-a716-446655440000`)。
1. テナントのディレクトリ ID を入力します (例: `72f988bf-86f1-41af-91ab-2d7cd011db47`)。これは Azure AD テナント ID です。
1. ログを送信する完全なテーブル名を入力します。例: テーブル名 `Custom-MyOPWLogs_CL`。
1. データ収集ルール (DCR) の不変 ID を入力します (例: `dcr-000a00a000a00000a000000aa000a0aa`)。

{{% observability_pipelines/secrets_env_var_note %}}

### オプションのバッファリング{#optional-buffering}

{{% observability_pipelines/destination_buffer %}}

## シークレットのデフォルト値 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- Microsoft Sentinel クライアントシークレット識別子:
    - DCR 概要ページに **Logs Ingestion Endpoint** または **Data Collection Endpoint** として表示される DCE エンドポイント URL を参照します。URL の例: `https://<DCE-ID>.ingest.monitor.azure.com`。
	- デフォルトの識別子は `DESTINATION_MICROSOFT_SENTINEL_CLIENT_SECRET` です。
- Microsoft Sentinel データ収集エンドポイント識別子:
    - Azure AD アプリケーションのクライアントシークレットを参照します (例: `550e8400-e29b-41d4-a716-446655440000`)。
	- デフォルトの識別子は `DESTINATION_MICROSOFT_SENTINEL_DCE_URI` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/microsoft_sentinel %}}

{{% /tab %}}
{{< /tabs >}}

## 送信先の仕組み {#how-the-destination-works}

### イベントのバッチ処理 {#event-batching}

イベントのバッチは、これらのパラメータのいずれかを満たしたときにフラッシュされます。詳細については、[送信先のイベントバッチ処理][2]を参照してください。

| 最大イベント数| 最大サイズ (MB) | タイムアウト (秒)   |
|----------------|-------------------|---------------------|
| なし           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching
[3]: https://learn.microsoft.com/en-us/azure/azure-monitor/fundamentals/service-limits#logs-ingestion-api
[4]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app?tabs=certificate%2Cexpose-a-web-api
[5]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-collection-rule-overview
[6]: https://portal.azure.com/#browse/microsoft.securityinsightsarg%2Fsentinel
[7]: https://portal.azure.com/#view/HubsExtension/BrowseResource.ReactView/resourceType/microsoft.insights%2Fdatacollectionendpoints
[8]: https://portal.azure.com/#create/Microsoft.LogAnalyticsOMS
[9]: https://portal.azure.com/#view/HubsExtension/BrowseResource.ReactView/resourceType/microsoft.insights%2Fdatacollectionrules
[10]: /ja/observability_pipelines/configuration/set_up_pipelines/
[11]: /ja/api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline