---
app_id: azure_deployment_manager
categories:
- cloud
- azure
custom_kind: integration
description: Azure Deployment Manager でのカナリアデプロイを監視
further_reading:
- link: https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/
  tag: ブログ
  text: Azure Deployment Manager と Datadog を使用したカナリアリリース
title: Microsoft Azure Deployment Manager
---
## 概要

Azure Deployment Manager (ADM) を使用すると、複雑なアプリケーションを安全にデプロイするための段階的ロールアウトを管理できます。

Datadog の使用によって、Azure Deployment Manager 用の健全性チェックを作成し、問題が検出された場合にデプロイを中止することが可能になります。

## セットアップ

### インストール

Datadog を ADM の健全性チェックとして使用するには、アクティブな Datadog アカウントと Azure Deployment Manager のアクティブなインスタンスが必要です。

### 設定

1. Start by setting up monitors in Datadog for your deployment. Start with a monitor for each region. Depending on the complexity of your application, you may want to have monitors for different parts of the deployment in each region. Completing the [Tutorial: Use Azure Deployment Manager with Resource Manager templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-tutorial) may help you decide where to monitor. For monitor ideas, check out [the blog](https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/).
1. If you end up with multiple monitors for each region, create a [composite monitor](https://docs.datadoghq.com/monitors/monitor_types/composite/) for each rollout step or region. Each composite monitor is a logical combination of other monitors that together indicate the overall status of a deployment step.
1. Next, configure Datadog as a health check within the Azure Deployment Manager topology [as a part of the rollout](https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview#rollout-template). Set these health check steps as dependencies between the deployment steps. Use the [template](#full-configuration-example), and replace `<API_KEY>` and `<APP_KEY>` with your Datadog API and application keys. Create a section in `resources` for each monitor (or composite monitor) you just created and replace `<MONITOR_ID>` with the monitor IDs. It is possible to add multiple checks within a [health check step](#example-health-check-step), but Datadog recommends you create one [check](#example-health-check) per health check step, and then create additional health check steps for each composite monitor. If you are setting the check with something besides a composite monitor, be sure to update the `regex` accordingly.
1. Follow the [Microsoft documentation](https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview) to initiate the deployment.

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

## 収集データ

### メトリクス

Azure Deployment Manager は、メトリクスを報告しません。

### イベント

Azure Deployment Manager には、イベントは含まれません。

### サービス チェック

Azure Deployment Manager には、サービスのチェック機能は含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。