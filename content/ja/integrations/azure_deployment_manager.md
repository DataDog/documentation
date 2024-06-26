---
categories:
- cloud
- azure
dependencies: []
description: Datadog を使用して Azure Deployment Manager でのカナリアデプロイを監視
doc_link: https://docs.datadoghq.com/integrations/azure_deployment_manager/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/
  tag: ブログ
  text: Azure Deployment Manager と Datadog を使用したカナリアリリース
git_integration_title: azure_deployment_manager
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Deployment Manager
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_deployment_manager
public_title: Datadog-Microsoft Azure Deployment Manager
short_description: Azure Deployment Manager でのカナリアデプロイを監視
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Azure Deployment Manager (ADM) を使用すると、複雑なアプリケーションを安全にデプロイするための段階的ロールアウトを管理できます。

Datadog の使用によって、Azure Deployment Manager 用の健全性チェックを作成し、問題が検出された場合にデプロイを中止することが可能になります。

## 計画と使用

### インフラストラクチャーリスト

Datadog を ADM の健全性チェックとして使用するには、アクティブな Datadog アカウントと Azure Deployment Manager のアクティブなインスタンスが必要です。

### ブラウザトラブルシューティング

1. 最初に、デプロイ用のモニターを Datadog でセットアップします。リージョンごとのモニターのセットアップから始めます。アプリケーションの複雑さによっては、各リージョンで、デプロイのさまざまな部分にそれぞれモニターが必要になる場合があります。[チュートリアル: Resource Manager テンプレートで Azure Deployment Manager を使用する][1]に従うと、何を監視するかを決定する際に役立ちます。モニターの考え方については、[こちらのブログ記事][2]を参照してください。
2. リージョンごとに複数のモニターをセットアップすることにした場合は、ロールアウト手順ごと、またはリージョンごとに[複合条件モニター][3]を作成します。複合条件モニターは、複数のモニターを論理的に組み合わることで、1 つのデプロイ手順の全体的なステータスを示します。
3. 次に、[ロールアウトの一環として][4]、Azure Deployment Manager のトポロジー内で Datadog を健全性チェックとして構成します。この健全性チェックは、デプロイ手順間の依存関係として設定します。[テンプレート](#full-configuration-example)を使用し、`<API_KEY>` と `<APP_KEY>` をそれぞれ Datadog API キーとアプリケーションキーに置き換えてください。また、前の手順で作成した各モニター (または複合条件モニター) の `resources` にセクションを作成し、`<MONITOR_ID>` をモニター ID に置き換えます。1 つの[健全性チェック手順](#example-health-check-step)に複数のチェックを追加することは可能ですが、健全性チェック手順ごとに[チェック](#example-health-check)を 1 つ作成し、複合条件モニターごとに複数の健全性チェック手順を作成することをお勧めします。複合条件モニター以外を使用してチェックを設定している場合は、適宜 `regex` を更新してください。
4. [Microsoft のドキュメント][5]に従って、デプロイを開始します。

#### 健全性チェック例

以下に、健全性チェックとされる Azure Deployment Manager のロールアウトテンプレートの一部を示します。

```json
{
    "healthChecks": [
        {
            "name": "datadogCompositeMonitor1",
            "request": {
                "method": "GET",
                "uri": "https://api.datadoghq.com/api/v1/monitor/<モニター_ID>?application_key=<アプリキー>",
                "authentication": {
                    "type": "ApiKey",
                    "name": "apikey",
                    "in": "Query",
                    "value": "<API_キー>"
                }
            },
            "response": {
                "successStatusCodes": ["200"],
                "regex": {
                    "matches": ["\"overall_state\"\\s*:\\s*\"OK\""],
                    "matchQuantifier": "All"
                }
            }
        }
    ]
}
```

#### 健全性チェック手順例

以下に、健全性チェック手順とされる Azure Deployment Manager のロールアウトテンプレートの一部を示します。

```json
{
    "apiVersion": "2018-09-01-preview",
    "type": "Microsoft.DeploymentManager/steps",
    "name": "datadogHealthCheckStep1",
    "location": "Central US",
    "tags": {},
    "properties": {
        "stepType": "healthCheck",
        "attributes": {
            "waitDuration": "PT5M",
            "maxElasticDuration": "PT10M",
            "healthyStateDuration": "PT10M",
            "type": "REST",
            "properties": {
                "healthChecks": [
                    {
                        "name": "datadogCompositeMonitor1",
                        "request": {
                            "method": "GET",
                            "uri": "https://api.datadoghq.com/api/v1/monitor/<モニター_ID>?application_key=<アプリキー>",
                            "authentication": {
                                "type": "ApiKey",
                                "name": "apikey",
                                "in": "Query",
                                "value": "<API_キー>"
                            }
                        },
                        "response": {
                            "successStatusCodes": ["200"],
                            "regex": {
                                "matches": ["\"overall_state\"\\s*:\\s*\"OK\""],
                                "matchQuantifier": "All"
                            }
                        }
                    }
                ]
            }
        }
    }
}
```

#### 構成例の全体

以下に、1 つの Azure Deployment Manager ロールアウト手順のテンプレート全体を示します。

```json
{
    "$schema": "http://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {},
    "variables": {},
    "resources": [
        {
            "apiVersion": "2018-09-01-preview",
            "type": "Microsoft.DeploymentManager/steps",
            "name": "datadogHealthCheckStep1",
            "location": "Central US",
            "tags": {},
            "properties": {
                "stepType": "healthCheck",
                "attributes": {
                    "waitDuration": "PT5M",
                    "maxElasticDuration": "PT10M",
                    "healthyStateDuration": "PT10M",
                    "type": "REST",
                    "properties": {
                        "healthChecks": [
                            {
                                "name": "datadogCompositeMonitor1",
                                "request": {
                                    "method": "GET",
                                    "uri": "https://api.datadoghq.com/api/v1/monitor/<モニター_ID>?application_key=<アプリキー>",
                                    "authentication": {
                                        "type": "ApiKey",
                                        "name": "apikey",
                                        "in": "Query",
                                        "value": "<API_キー>"
                                    }
                                },
                                "response": {
                                    "successStatusCodes": ["200"],
                                    "regex": {
                                        "matches": [
                                            "\"overall_state\"\\s*:\\s*\"OK\""
                                        ],
                                        "matchQuantifier": "All"
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        }
    ]
}
```

### 結果

あるロールアウト段階の健全性チェック手順を実行する際、Azure Deployment Manager は、そのデプロイ段階の健全性チェック手順で指定された複合条件モニターのステータスを Datadog Monitor API にクエリします。

Azure Deployment Manager は、テンプレートで指定されている正規表現を使用して応答をパースし、`overall_status: OK` の語句が含まれているかを確認します。

`overall_status: OK` が見つかった場合は、チェックは正常と見なされます。ステータスが `Warn`、`No Data`、または `Alert` の場合、チェックは異常と見なされ、Azure Deployment Manager はデプロイを中止します。

## リアルユーザーモニタリング

### データセキュリティ

Azure Deployment Manager は、メトリクスを報告しません。

### ヘルプ

Azure Deployment Manager には、イベントは含まれません。

### ヘルプ

Azure Deployment Manager には、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-tutorial
[2]: https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/
[3]: https://docs.datadoghq.com/ja/monitors/monitor_types/composite/
[4]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview#rollout-template
[5]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview
[6]: https://docs.datadoghq.com/ja/help/