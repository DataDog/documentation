---
categories:
- cloud
- azure
dependencies: []
description: Datadog을 사용하여 Azure Deployment Manager에서 카나리 배포를 모니터링하세요.
doc_link: https://docs.datadoghq.com/integrations/azure_deployment_manager/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/
  tag: 블로그
  text: Azure Deployment Manager 및 Datadog을 사용하여 카나리 배포
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
short_description: Azure Deployment Manager에서 카나리 배포를 모니터링하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Deployment Manager(ADM)를 사용하여 복잡한 애플리케이션의 안전한 배포를 위해 단계적 롤아웃을 관리할 수 있습니다.

Datadog을 사용하여 Azure Deployment Manager에 대한 상태 검사를 만들고 문제가 감지되면 배포를 중지합니다.

## 설정

### 설치

Datadog을 ADM에 대한 상태 검사로 사용하려면 활성 Datadog 계정과 Azure Deployment Manager의 활성 인스턴스가 필요합니다.

### 설정

1. 배포를 위해 Datadog에서 모니터를 설정하세요. 리전별 모니터부터 시작해 보세요. 애플리케이션의 복잡성에 따라 각 리전에서 배포의 다양한 부분에 대한 모니터를 갖기 원한다면 [튜토리얼: Resource Manager 템플릿과 함께 Azure Deployment Manager 사용][1]을 확인하세요. 모니터링할 위치를 결정하는 데 도움이 됩니다. 모니터에 대한 아이디어는 [블로그][2]에서 확인하세요.
2. 각 리전에 여러 개의 모니터가 있는 경우 각 롤아웃 단계 또는 리전에 대해 [복합 모니터][3]를 만듭니다. 각 복합 모니터는 배포 단계의 전체 상태를 함께 나타내는 다른 모니터의 논리적 조합입니다.
3. 그런 다음 [롤아웃의 일부로][4] Azure Deployment Manager 토폴로지 내에서 Datadog을 상태 검사로 설정합니다. 이러한 상태 검사 단계를 배포 단계 간의 종속성으로 설정합니다. [템플릿](#full-configuration-example)을 사용하고 `<API_KEY>` 및 `<APP_KEY>`를 Datadog API 및 애플리케이션 키로 변경합니다. 방금 만든 각 모니터(또는 복합 모니터)에 대해 `resources`에서 섹션을 만들고 `<MONITOR_ID>`를 모니터 ID로 바꿉니다. [상태 검사 단계](#example-health-check-step) 내에서 여러 검사를 추가할 수 있지만 Datadog은 상태 검사 단계마다 하나의 [검사](#example-health-check)를 생성한 다음 각 복합 모니터에 대한 추가 상태 검사 단계를 생성하는 것을 권장합니다. 복합 모니터 이외의 것으로 검사를 설정하는 경우 그에 따라 `regex`를 업데이트해야 합니다.
4. 배포를 시작하려면 [Microsoft 설명서][5]를 따르세요.

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

## 수집한 데이터

### 메트릭

Azure Deployment Manager는 메트릭을 보고하지 않습니다.

### 이벤트

Azure Deployment Manager에는 이벤트가 포함되지 않습니다.

### 서비스 검사

Azure Deployment Manager에는 서비스 검사가 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.

[1]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-tutorial
[2]: https://www.datadoghq.com/blog/canary-deployments-with-azure-and-datadog/
[3]: https://docs.datadoghq.com/ko/monitors/monitor_types/composite/
[4]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview#rollout-template
[5]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/deployment-manager-overview
[6]: https://docs.datadoghq.com/ko/help/