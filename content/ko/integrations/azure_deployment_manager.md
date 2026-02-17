---
app_id: azure_deployment_manager
categories:
- 클라우드
- azure
custom_kind: 통합
description: Azure Deployment Manager에서 카나리 배포를 모니터링하세요.
further_reading:
- link: https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/
  tag: 블로그
  text: Azure Deployment Manager 및 Datadog을 사용하여 카나리 배포
title: Microsoft Azure Deployment Manager
---
## 개요

Azure Deployment Manager(ADM)를 사용하여 복잡한 애플리케이션의 안전한 배포를 위해 단계적 롤아웃을 관리할 수 있습니다.

Datadog을 사용하여 Azure Deployment Manager에 대한 상태 검사를 만들고 문제가 감지되면 배포를 중지합니다.

## 설정

### 설치

Datadog을 ADM에 대한 상태 검사로 사용하려면 활성 Datadog 계정과 Azure Deployment Manager의 활성 인스턴스가 필요합니다.

### 설정

1. Start by setting up monitors in Datadog for your deployment. Start with a monitor for each region. Depending on the complexity of your application, you may want to have monitors for different parts of the deployment in each region. Completing the [Tutorial: Use Azure Deployment Manager with Resource Manager templates](https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-tutorial) may help you decide where to monitor. For monitor ideas, check out [the blog](https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/).
1. If you end up with multiple monitors for each region, create a [composite monitor](https://docs.datadoghq.com/monitors/monitor_types/composite/) for each rollout step or region. Each composite monitor is a logical combination of other monitors that together indicate the overall status of a deployment step.
1. Next, configure Datadog as a health check within the Azure Deployment Manager topology [as a part of the rollout](https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview#rollout-template). Set these health check steps as dependencies between the deployment steps. Use the [template](#full-configuration-example), and replace `<API_KEY>` and `<APP_KEY>` with your Datadog API and application keys. Create a section in `resources` for each monitor (or composite monitor) you just created and replace `<MONITOR_ID>` with the monitor IDs. It is possible to add multiple checks within a [health check step](#example-health-check-step), but Datadog recommends you create one [check](#example-health-check) per health check step, and then create additional health check steps for each composite monitor. If you are setting the check with something besides a composite monitor, be sure to update the `regex` accordingly.
1. Follow the [Microsoft documentation](https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview) to initiate the deployment.

#### 상태 검사 예시

다음은 상태 검사로 간주되는 Azure Deployment Manager 롤아웃 템플릿의 일부입니다.

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

#### 상태 검사 단계 예시

다음은 상태 검사 단계로 간주되는 Azure Deployment Manager 롤아웃 템플릿의 일부입니다.

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

#### 전체 설정 예시

다음은 Azure Deployment Manager 롤아웃 단계에 대한 전체 템플릿입니다.

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

### 결과

롤아웃 단계에 대한 상태 검사 단계를 수행할 때 Azure Deployment Manager는 해당 배포의 상태 검사 단계에서 식별된 복합 모니터의 상태에 대해 Datadog Monitor API를 쿼리합니다.

Azure Deployment Manager는 템플릿에 제공된 정규식을 사용하여 응답을 파싱하며, `overall_status: OK` 문구가 포함되어 있는지 식별합니다.

`overall_status: OK`가 발견되면 검사는 정상으로 간주됩니다. 상태가 `Warn`, `No Data` 또는 `Alert`이면 검사가 비정상으로 간주되고 Azure Deployment Manager가 배포를 중지합니다.

## 수집한 데이터

### Metrics

Azure Deployment Manager는 메트릭을 보고하지 않습니다.

### 이벤트

Azure Deployment Manager에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Azure Deployment Manager에는 서비스 검사가 포함되지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.