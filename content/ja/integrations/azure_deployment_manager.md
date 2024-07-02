---
"categories":
- cloud
- azure
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Use Datadog to monitor Canary Deployments in Azure Deployment Manager."
"doc_link": "https://docs.datadoghq.com/integrations/azure_deployment_manager/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/"
  "tag": Blog
  "text": Canary releases with Azure Deployment Manager and Datadog
"git_integration_title": "azure_deployment_manager"
"has_logo": true
"integration_id": ""
"integration_title": "Microsoft Azure Deployment Manager"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "azure_deployment_manager"
"public_title": "Datadog-Microsoft Azure Deployment Manager"
"short_description": "Monitor Canary Deployments in Azure Deployment Manager."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Azure Deployment Manager (ADM) allows you to manage a staged roll-out for safely deploying complex applications.

Use Datadog to create a health check for the Azure Deployment Manager, and to stop your deployment if issues are detected.

## セットアップ

### インストール

To use Datadog as a health check for ADM, you need an active Datadog account and an active instance of Azure Deployment Manager.

### 構成

1. Start by setting up monitors in Datadog for your deployment. Start with a monitor for each region. Depending on the complexity of your application, you may want to have monitors for different parts of the deployment in each region. Completing the [Tutorial: Use Azure Deployment Manager with Resource Manager templates][1] may help you decide where to monitor. For monitor ideas, check out [the blog][2].
2. If you end up with multiple monitors for each region, create a [composite monitor][3] for each rollout step or region. Each composite monitor is a logical combination of other monitors that together indicate the overall status of a deployment step.
3. Next, configure Datadog as a health check within the Azure Deployment Manager topology [as a part of the rollout][4]. Set these health check steps as dependencies between the deployment steps. Use the [template](#full-configuration-example), and replace `<API_KEY>` and `<APP_KEY>` with your Datadog API and application keys. Create a section in `resources` for each monitor (or composite monitor) you just created and replace `<MONITOR_ID>` with the monitor IDs. It is possible to add multiple checks within a [health check step](#example-health-check-step), but Datadog recommends you create one [check](#example-health-check) per health check step, and then create additional health check steps for each composite monitor. If you are setting the check with something besides a composite monitor, be sure to update the `regex` accordingly.
4. Follow the [Microsoft documentation][5] to initiate the deployment.

#### Example health check

The following is the part of the Azure Deployment Manager rollout template that is considered the health check.

```json
{
    "healthChecks": [
        {
            "name": "datadogCompositeMonitor1",
            "request": {
                "method": "GET",
                "uri": "https://api.datadoghq.com/api/v1/monitor/<MONITOR_ID>?application_key=<APP_KEY>",
                "authentication": {
                    "type": "ApiKey",
                    "name": "apikey",
                    "in": "Query",
                    "value": "<API_KEY>"
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

#### Example health check step

The following is the part of the Azure Deployment Manager rollout template that is considered the health check step.

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
                            "uri": "https://api.datadoghq.com/api/v1/monitor/<MONITOR_ID>?application_key=<APP_KEY>",
                            "authentication": {
                                "type": "ApiKey",
                                "name": "apikey",
                                "in": "Query",
                                "value": "<API_KEY>"
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

#### Full configuration example

The following is a full template for an Azure Deployment Manager rollout step.

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
                                    "uri": "https://api.datadoghq.com/api/v1/monitor/<MONITOR_ID>?application_key=<APP_KEY>",
                                    "authentication": {
                                        "type": "ApiKey",
                                        "name": "apikey",
                                        "in": "Query",
                                        "value": "<API_KEY>"
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

### Results

When performing the health check step for a phase of the rollout, Azure Deployment Manager queries the Datadog Monitor API for the status of the composite monitor identified in the health check step for that phase of the deployment.

Azure Deployment Manager parses the response using the regex provided in the template to identify if it contains the phrase `overall_status: OK`.

If `overall_status: OK` is found, the check is considered healthy. If the status is `Warn`, `No Data`, or `Alert`, then the check is considered unhealthy, and Azure Deployment Manager stops the deployment.

## 収集データ

### メトリクス

The Azure Deployment Manager does not report any metrics.

### イベント

The Azure Deployment Manager does not include any events.

### サービスチェック

The Azure Deployment Manager does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][6].

[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-tutorial
[2]: https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/
[3]: https://docs.datadoghq.com/monitors/monitor_types/composite/
[4]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview#rollout-template
[5]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview
[6]: https://docs.datadoghq.com/help/

