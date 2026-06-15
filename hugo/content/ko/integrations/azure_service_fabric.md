---
categories:
- cloud
- azure
dependencies: []
description: ' Azure Service Fabric 메트릭 추적하기'
doc_link: https://docs.datadoghq.com/integrations/azure_service_fabric/
draft: false
git_integration_title: azure_service_fabric
has_logo: true
integration_id: azure-service-fabric
integration_title: Microsoft Azure Service Fabric
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: azure_service_fabric
public_title: Datadog-Microsoft Azure Service Fabric 통합
short_description: ' Azure Service Fabric 메트릭 추적하기'
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

 Azure Service Fabric은 신뢰할 수 있고 규모 조정이 가능한  마이크로서비스와 컨테이너를 패키징, 배포, 관리하는 데 사용되는 분배 시스템 플랫폼입니다.

## 설정
### 설치

아직 설정하지 않은 경우, [Microsoft Azure 통합][1]을 먼저 설정하세요.

[Azure 명령줄 인터페이스][2]에서 명령을 실행해  Azure Service Fabric 클러스터의 상태를 모니터링할 수 있습니다.

설치 명령을 실행하려면 다음을 기록해 두세요.

- 내 클러스터가 사용 중인 OS(Windows나 Linux)
- 내 클러스터의 리소스 그룹
- 내 클러스터의 처음 사용자용 노드를 관리하는 VMSS(Virtual Machine Scale Set) 이름
- 내 [Datadog API 키][3]

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

또 다른 설치 방법으로는 Datadog Azure Virtual Machine 확장 프로그램을 내 Service Fabric 클러스터의 [ARM 탬플릿][4]에 바로 추가하는 것입니다.

## 수집한 데이터
### 메트릭

Datadog 에이전트가 Service Fabric 클러스터 노드에 설치되기 때문에 메트릭이 에이전트의 [핵심 점검][5]에서 Datadog로 보고됩니다.

Service Fabric에서 컨테이너화된 앱을 실행 중인 경우에는 에이전트가 [Service Fabric Mesh 메트릭][6]을 보고합니다.

### 이벤트
Azure Service Fabric 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 검사
Azure Service Fabric 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅
도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/DataDog/service-fabric-datadog
[5]: https://docs.datadoghq.com/ko/getting_started/agent/#checks
[6]: https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported#microsoftservicefabricmeshapplications
[7]: https://docs.datadoghq.com/ko/help/