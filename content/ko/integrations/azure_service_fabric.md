---
app_id: azure_service_fabric
categories:
- 클라우드
- azure
custom_kind: 통합
description: Azure Service Fabric 메트릭 추적하기
title: Microsoft Azure Service Fabric
---
## 개요

 Azure Service Fabric은 신뢰할 수 있고 규모 조정이 가능한  마이크로서비스와 컨테이너를 패키징, 배포, 관리하는 데 사용되는 분배 시스템 플랫폼입니다.

## 설정

### 설치

If you haven't already, set up the [Microsoft Azure integration](https://docs.datadoghq.com/integrations/azure/) first.

Monitor the health of your Azure Service Fabric cluster in Datadog by running a command in the [Azure command line interface](https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest).

설치 명령을 실행하려면 다음을 기록해 두세요.

- 내 클러스터가 사용 중인 OS(Windows나 Linux)
- 내 클러스터의 리소스 그룹
- 내 클러스터의 처음 사용자용 노드를 관리하는 VMSS(Virtual Machine Scale Set) 이름
- Your [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys)

수집한 정보를 기반으로 다음 명령을 업데이트하세요.

{{< tabs >}}

{{% tab "Windows" %}}

```shell
az vmss extension set --name DatadogWindowsAgent --publisher Datadog.Agent --resource-group <RESOURCE_GROUP_NAME> --vmss-name <VMSS_NAME> --protected-settings "{'api_key':'<YOUR_API_KEY>'}"
```

{{% /tab %}}

{{% tab "Linux" %}}

```shell
az vmss extension set --name DatadogLinuxAgent --publisher Datadog.Agent --resource-group <RESOURCE_GROUP_NAME> --vmss-name <VMSS_NAME> --protected-settings "{'api_key':'<YOUR_API_KEY>'}"
```

{{% /tab %}}

{{< /tabs >}}

Azure CLI에 로그인하고 업데이트한 명령을 실행해 Datadog 에이전트를 내 클러스터 노드에 배포하세요.

### VM 확장 프로그램

An alternative installation method is adding the Datadog Azure Virtual Machine extension directly to the [ARM template](https://github.com/DataDog/service-fabric-datadog) of your Service Fabric cluster.

## 수집한 데이터

### Metrics

Because the Datadog Agent is installed on the nodes in your Service Fabric cluster, metrics are reported to Datadog from the Agent's [core checks](https://docs.datadoghq.com/getting_started/agent/#checks).

If you are running containerized apps on Service Fabric, the Agent reports [Service Fabric Mesh metrics](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftservicefabricmeshapplications).

### 이벤트

Azure Service Fabric 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Service Fabric 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.