---
aliases:
- /ko/logs/guide/azure-logging-guide/
- /ko/logs/guide/azure-automated-logs-architecture/
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-azure-platform-logs/
  tag: 블로그
  text: Microsoft Azure 플랫폼 로그 모니터링 모범 사례
title: Azure 자동 로그 포워딩 설정
---
## 개요 {#overview}

이 가이드를 사용하여 Azure 자동 로그 포워딩을 설정하고 관리하세요. Datadog에서 바로 로그 포워딩을 구성하거나 Azure Resource Manager(ARM) 템플릿을 사용하여 배포할 수 있습니다.

ARM 템플릿은 Azure 서비스(스토리지 계정 및 함수 앱)에 있는 일련의 리소스를 사용자의 구독에 배포하여 로그를 수집하고 Datadog으로 전달합니다. 이러한 서비스는 로그 볼륨에 맞춰 자동으로 확장 또는 축소됩니다. 확장은 선택한 구독 및 리전에 배포된 함수 앱 세트인 컨트롤 플레인에 의해 관리됩니다. 스토리지 계정과 함수 앱은 Datadog으로 로그를 포워딩하는 각 구독에 배포됩니다.

**모든 사이트**: 자동 로그 포워딩은 모든 [Datadog 사이트][4]에서 사용할 수 있습니다.

**지원되는 Azure 환경**: 자동 로그 포워딩은 Azure 상용(공공) 클라우드에서만 지원됩니다. Azure Government 및 Azure China는 지원되지 않습니다. 정부 기관용 Datadog 사이트를 사용하는 경우, Azure 상용 클라우드의 워크로드와 함께 이 기능을 사용할 수 있습니다.

## 자동 설정과 수동 설정 중에서 선택하는 방법 {#how-to-choose-between-automated-and-manual-setup}

원하는 작업이 다음에 해당하는 경우, 수동 설정 방법을 선택하세요.
   - 리소스에 사용자 지정 태그 적용

원하는 작업이 다음에 해당하는 경우, 자동 설정 방법을 사용하세요.
   - Azure 포털을 통한 배포 자동화
   - 선언형 템플릿을 통한 인프라스트럭처 관리
   - 중앙에서 접근, 태그 및 청구 관리
   - 리소스를 올바른 순서로 일관되게 재배포
   - 이벤트 허브 대신 스토리지 계정을 사용하여 비용 절감

## 설정 {#setup}

### 로그 포워딩 구성 {#configure-log-forwarding}

**로그 포워딩 구성** 흐름을 사용하여 Datadog에서 바로 새 로그 포워더를 설정하거나 기존 로그 포워더를 관리하세요. 이 흐름을 사용하여 자동 로그 포워딩을 처음부터 배포하거나, 구독을 추가 또는 제거하거나 로그 필터를 수정하는 등 기존 설정을 업데이트할 수 있습니다.

1. Datadog에서 [{{< ui >}}Integrations > Azure{{< /ui >}}][16]로 이동합니다.
1. {{< ui >}}Configure Log Forwarding{{< /ui >}}을 클릭합니다.
1. 새 설정을 배포할지, 기존 설정을 업데이트할지 선택합니다.
1. 제공된 명령을 복사하여 Azure Cloud Shell에 붙여넣습니다.
1. 로그를 포워딩할 구독을 선택합니다.
1. 필요 시, 로그 필터를 추가하거나 제거합니다.
1. {{< ui >}}Confirm{{< /ui >}}을 클릭합니다.

### ARM 템플릿 {#arm-template}

또는 [Azure Public ARM 템플릿][1]을 사용하여 자동 로그 포워딩을 배포할 수도 있습니다. 아래 섹션에는 템플릿의 각 페이지를 완료하기 위한 지침이 나와 있습니다.

#### 기본 {#basics}

1. {{< ui >}}Project details{{< /ui >}} 아래에서 관리 그룹을 선택합니다. 이 그룹은 ARM 템플릿이 자동 로그 포워딩을 위해 선택한 구독에 권한을 부여하는 데 필요합니다.
2. {{< ui >}}Instance details{{< /ui >}} 아래에서 다음 값을 선택합니다.
   - {{< ui >}}Region{{< /ui >}}. 컨트롤 플레인이 배포되는 곳입니다.
   - {{< ui >}}Subscriptions to Forward Logs{{< /ui >}}. 로그 포워딩을 위해 구성될 예정인 구독입니다.
   - {{< ui >}}Control Plane Subscription{{< /ui >}}. 컨트롤 플레인이 배포된 구독입니다.
   - {{< ui >}}Resource Group Name{{< /ui >}}. 컨트롤 플레인에서 사용할 리소스 그룹입니다. 컨트롤 플레인 서비스 관리를 간소화하기 위해 사용되지 않은 새 리소스 그룹 이름을 선택하는 것이 좋습니다.

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_basics.png" alt="Azure 자동 로그 포워딩을 위한 ARM 템플릿의 기본 페이지" popup="true" style="width:100%">}}

3. {{< ui >}}Next{{< /ui >}}를 클릭합니다.

#### Datadog 구성 {#datadog-configuration}

1. [Datadog API 키][2] 값을 입력합니다.
2. [Datadog 사이트][4]를 선택합니다.

{{< img src="logs/guide/azure-automated-log-forwarding/deployment_datadog_configuration_2025-02-18.png" alt="Azure 자동 로그 포워딩을 위한 ARM 템플릿의 Datadog 구성 페이지" popup="true" style="width:100%">}}

3. {{< ui >}}Next{{< /ui >}}를 클릭합니다.

#### 배포 {#deployment}

1. 확인란을 클릭해 배포 경고를 확인합니다.
2. {{< ui >}}Review + create{{< /ui >}}를 클릭합니다.

#### 검토 + 생성 {#review-create}

1. 최종 배포 세부 정보를 검토합니다.
2. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

## 리소스 태그 필터링 {#resource-tag-filtering}

태그 필터를 사용하여 Datadog으로 로그를 포워딩할 Azure 리소스를 관리할 수 있습니다. 태그 필터 구문, 와일드카드 지원, 예시는 Azure 시작 가이드의 [리소스 태그 필터링][21]을 참조하세요.

## Log Analytics Workspaces {#log-analytics-workspaces}

자동 로그 포워더를 통해 Azure Log Analytics Workspaces(LAW)에서 Datadog으로 로그를 포워딩할 수 있습니다. 이전에는 Datadog이 LAW의 [진단 설정][13] 로그만 지원했습니다. [데이터 내보내기 규칙][17]을 사용하면 LAW 로그 테이블에서 Datadog으로 로그를 포워딩할 수 있습니다.

### 제한 사항 {#restrictions}

- 로그 포워더와 동일한 리전 내의 LAW 리소스에 대해서만 포워딩을 설정할 수 있습니다.
- LAW의 경우 최대 10개의 데이터 내보내기 규칙만 설정할 수 있습니다. LAW에 데이터 내보내기 규칙을 위한 남은 용량이 없다면 기존 규칙을 삭제하여 공간을 확보하세요.
- 일부 로그 테이블은 내보내기하지 못합니다. Microsoft의 [지원되지 않는 테이블][18] 목록을 참조하세요.

### Log Analytics Workspace에서 로그 포워딩 {#forward-logs-from-a-log-analytics-workspace}

1. 자동 로그 포워더를 아직 생성하지 않았다면 [설정](#setup) 지침을 따릅니다. 이미 로그 포워더가 있는 경우, 최신 버전으로 업데이트되었는지 확인하세요.
2. [Azure 포털][19]에서 원하는 Log Analytics Workspace로 이동합니다.
3. {{< ui >}}Settings{{< /ui >}} 아래에서 {{< ui >}}Data export{{< /ui >}}를 클릭합니다.
4. {{< ui >}}New export rule{{< /ui >}}을 클릭합니다.
5. 규칙의 이름을 지정하고, {{< ui >}}Enable upon creation{{< /ui >}}을 선택한 후 {{< ui >}}Next{{< /ui >}}를 클릭합니다.
6. 내보낼 테이블을 선택합니다. 데이터 내보내기 규칙을 편집하여 이 선택 사항을 나중에 수정할 수 있습니다. {{< ui >}}Next{{< /ui >}}를 클릭합니다.
7. {{< ui >}}Destination type{{< /ui >}}에 대해 {{< ui >}}Storage Account{{< /ui >}}를 선택합니다. 로그 포워더가 포함된 구독을 선택하고, 로그 포워더 스토리지 계정을 선택하세요. 이 계정은 일반적으로 `ddlogstorage` 접두사가 있습니다. {{< ui >}}Next{{< /ui >}}를 클릭합니다.
8. 규칙을 검토하고 {{< ui >}}Create{{< /ui >}}를 클릭합니다. LAW의 로그는 몇 분 이내에 Datadog에 표시됩니다.

### 문제 해결 {#troubleshooting}

#### 로그가 Datadog에 나타나지 않을 경우 {#logs-are-not-appearing-in-datadog}

데이터 내보내기 규칙을 생성했지만 Datadog에서 로그가 보이지 않는 경우 다음 단계를 따르세요.

1. 데이터 내보내기 규칙이 활성화되어 있는지 확인합니다.
1. 대상 스토리지 계정이 자동 로그 포워더에 의해 생성된 것인지 확인합니다(일반적으로 이름이 `ddlogstorage`로 시작).
1. 스토리지 계정에서 컨테이너를 검사합니다. 접두사가 `am-`인 컨테이너는 LAW 내보내기를 나타냅니다. 접두사가 `insights-`인 컨테이너만 보이는 경우, 데이터 내보내기 규칙이 잘못 구성되었을 수 있습니다.
1. LAW가 지난 2시간 이내에 새로운 로그를 수집했는지 확인합니다.

추가 정보는 Microsoft의 [데이터 내보내기 문제 해결 FAQ][20]를 참조하세요.

#### 내보낼 로그 선택 {#selecting-which-logs-are-exported}

데이터 내보내기 규칙을 사용하면 Log Analytics Workspace에서 어떤 로그 테이블을 내보낼지 지정할 수 있습니다. 데이터 내보내기 규칙을 편집하여 테이블을 추가하거나 제거하세요.

#### 예상 지연 시간 {#expected-latency}

LAW 로그는 일반적으로 Datadog에 2~5분 이내에 나타나지만, 처음에는 최대 20분이 소요될 수 있습니다. LAW 로그는 비LAW 로그와 속성이 다를 수 있습니다.

## 아키텍처 {#architecture}

### 사용된 서비스 {#services-used}

- [Azure Function][15] 앱은 Azure 구독에서 리소스를 발견하고, 로그 포워더를 확장하며, 감지된 리소스에 대한 진단 설정을 구성하는 데 사용됩니다.
- [Azure Container Apps][8]는 진단 설정에 의해 생성된 리소스 로그를 수집하고, 이미 처리된 로그를 추적하며, 이를 Datadog에 제출하는 데 사용됩니다.
- [Azure Storage 계정][9]은 리소스에서 생성된 로그를 저장하고 구독 ID, 리소스 ID 및 리전과 같은 메타데이터의 작은 캐시를 저장하는 데 사용됩니다.

### 고급 아키텍처 {#high-level-architecture}

{{<img src="/logs/guide/azure_automated_logs_architecture/high_level_architecture_06-13-2025.png" alt="아키텍처 다이어그램은 Azure 자동 로그 포워딩의 세 가지 주요 구성 요소인 컨트롤 플레인과 로그 포워더(Datadog이 고객 환경에 배포)가 Azure 리소스에 연결되어 있는 모습을 보여줍니다." style="width:100%">}}

배포 템플릿은 선택한 구독에서 [컨트롤 플레인](#control-plane)과 [로그 포워더](#log-forwarders)를 설정합니다.

#### 컨트롤 플레인 {#control-plane}

컨트롤 플레인은 Azure Function 앱과 캐싱을 위한 스토리지 계정의 집합입니다. 하나의 컨트롤 플레인이 선택한 구독에 배포되며 다음 작업을 수행합니다.
- 진단 설정을 통해 로그를 기록할 수 있는 선택한 구독의 리소스를 발견합니다.
- 로그 포워더가 추적하는 스토리지 계정으로 로그가 유입되는 발견된 리소스에 대해 진단 설정을 자동으로 구성합니다.
- 리소스가 위치한 리전에서 로그 포워더를 확장하여 로그 볼륨에 맞게 동적으로 조정할 수 있도록 합니다.

#### 로그 포워더 {#log-forwarders}

로그 포워더는 Azure Container Apps 작업과 로그를 위한 스토리지 계정으로 구성됩니다. 로그 포워더는 로그 포워딩을 위해 선택한 각 구독의 컨트롤 플레인에 의해 배포됩니다. 구독당 배포되는 로그 포워더의 수는 리소스에서 생성된 로그 볼륨에 따라 확장됩니다. 로그 포워더는 다음 작업을 수행합니다.
- 리소스의 진단 설정에서 생성된 로그를 스토리지 계정에 임시로 저장합니다.
- 저장된 로그를 처리하고 이를 Datadog에 전달합니다.

Azure에서는 리소스의 진단 설정은 동일한 리전 내의 스토리지 계정만을 대상으로 할 수 있습니다. 따라서 포워더는 진단 설정이 있는 각 리전에서 생성됩니다.

자세한 내용은 Azure의 [Azure Monitor의 진단 설정][13] 페이지를 참조하세요.

### 상세 아키텍처 {#detailed-architecture}

{{<img src="/logs/guide/azure_automated_logs_architecture/detailed_architecture.png" alt="Azure 자동 로그 포워딩을 보여주는 워크플로 다이어그램: 컨트롤 플레인이 리소스를 발견하고, 리전에 걸쳐 로그 포워더를 확장하며, 로그를 스토리지 계정으로 전송하기 위해 진단 설정을 구성하고, 이후 Container Apps가 새로운 로그를 확인해 Datadog Log Management로 포워딩합니다." style="width:100%">}}

### 보안 및 권한 {#security-and-permissions}

ARM 템플릿은 포워더를 관리하고 리소스에 진단 설정을 배치하는 데 필요한 권한만 컨트롤 플레인에 부여합니다. 이를 달성하기 위해 ARM 템플릿 배포 중에 리소스 그룹이 생성되고 권한이 부여됩니다. 이후 ARM 템플릿을 재배포하여 더 많은 구독에 대한 권한을 추가할 수 있습니다.

#### 사용된 권한 {#permissions-used}

- 일부 구독의 **구독** 수준의 [모니터링 기여자][10] 역할
   - 이 역할은 사용 가능한 진단 설정이 있는 리소스를 발견하고 스토리지로의 로그 출력을 활성화하는 데 필요합니다.

- 일부 구독에 대한 로그 포워딩 리소스 그룹의 **리소스 그룹** 수준의 [기여자][11] 역할
   - 이 역할은 포워더 스토리지 계정 및 Container Apps 작업을 관리(생성 및 삭제)하는 데 필요합니다.

- 컨트롤 플레인 함수 앱을 업데이트하기 위한 **컨트롤 플레인 리소스 그룹** 수준의 [웹사이트 기여자][12] 역할

리소스에 대한 정보는 외부로 내보내기되지 않습니다. Datadog은 로그 출력을 활성화하는 데 필요한 정보만 요청하며, 이 아키텍처의 유일한 출력은 Datadog으로 전송된 로그입니다.

**참고**: 필요 시, 컨트롤 플레인이 디버깅 목적으로 자체 상태 메트릭, 로그 및 이벤트를 Datadog에 제출하도록 활성화할 수 있습니다. 활성화하려면 컨트롤 플레인의 모든 함수 앱 또는 컨테이너 앱에서 환경 변수 `DD_TELEMETRY=true`를 설정하세요.

{{% azure-log-archiving %}}

## 설치 제거 {#uninstall}

[Azure Cloud Shell][5]을 열고 . PowerShell이 아닌 Azure CLI/Bash에서 실행되고 있는지 확인하세요.

다음과 같이 제거 스크립트를 다운로드하고 실행합니다.
{{< code-block lang="bash" >}}
wget https://ddazurelfo.blob.core.windows.net/uninstall/uninstall.py
python uninstall.py
{{< /code-block >}}

스크립트는 먼저 각 구독에서 실행 중인 인스턴스를 발견한 다음, 제거할 인스턴스를 선택하라는 메시지를 표시합니다. 리소스 삭제를 확인하고, 리소스가 삭제될 때까지 기다려 주세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FcreateUiDefinition.json
[2]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /ko/getting_started/site/
[5]: https://learn.microsoft.com/en-us/azure/cloud-shell/overview
[8]: https://azure.microsoft.com/products/container-apps
[9]: https://learn.microsoft.com/azure/storage/common/storage-account-overview
[10]: https://learn.microsoft.com/azure/azure-monitor/roles-permissions-security#monitoring-contributor
[11]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/privileged#contributor
[12]: https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/web-and-mobile#website-contributor
[13]: https://learn.microsoft.com/azure/azure-monitor/essentials/diagnostic-settings
[14]: https://app.datadoghq.com/integrations/azure/add?config_azure-new-onboarding=true
[15]: https://learn.microsoft.com/azure/azure-functions/
[16]: https://app.datadoghq.com/integrations/azure
[17]: https://learn.microsoft.com/azure/azure-monitor/logs/logs-data-export?tabs=portal
[18]: https://learn.microsoft.com/azure/azure-monitor/logs/logs-data-export?tabs=portal#unsupported-tables
[19]: https://portal.azure.com
[20]: https://learn.microsoft.com/troubleshoot/azure/azure-monitor/log-analytics/workspaces/workspace-data-export-faq
[21]: /ko/getting_started/integrations/azure/#resource-tag-filtering-for-logs