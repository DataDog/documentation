---
aliases:
- /ko/integrations/guide/azure-architecture-and-configuration/
- /ko/integrations/guide/powershell-command-to-install-azure-datadog-extension/
- /ko/integrations/guide/azure-vms-appear-in-app-without-metrics/
- /ko/integrations/guide/azure-troubleshooting/
- /ko/integrations/guide/powered-down-azure-vm-on-infrastructure-list/
- /ko/integrations/guide/azure-count-metric/
- /ko/integrations/guide/azure-status-metric
- /ko/integrations/faq/azure-vm-status-is-not-reporting
- /ko/integrations/faq/azure-status-metric
- /ko/integrations/faq/azure-count-metric
- /ko/integrations/faq/azure-troubleshooting
- /ko/integrations/faq/azure-vms-are-showing-up-in-the-app-but-not-reporting-metrics
- /ko/integrations/faq/my-Azure-vm-is-powered-down-why-is-it-still-listed-in-my-infrastructure-list
- /ko/integrations/faq/powershell-command-to-install-azure-datadog-extension
description: Datadog Azure 통합의 고급 구성 및 아키텍처
further_reading:
- link: /integrations/azure/
  tag: 문서
  text: Azure 통합
title: Azure 고급 구성
---
## 개요 {#overview}

이 가이드는 Datadog의 Azure 통합을 구성하는 사용자를 위한 고급 구성 옵션과 참조 아키텍처는 물론 특정 사용 사례에 대한 대체 구성 옵션을 제공합니다.

### 참조 아키텍처 {#reference-architectures}

이 가이드의 다이어그램은 [Azure 시작하기][1]의 단계를 따를 때의 구성 프로세스와 결과를 시각적으로 보여줍니다. 이 가이드는 Datadog이 사용자의 Azure 환경과 상호 작용하는 방식에 대한 자세한 개요를 제공하며 일반적인 보안, 규정 준수 및 거버넌스 관련 질문에 답변합니다.

### 대체 구성 {#alternate-configurations}

[Azure 시작하기][1]에 문서화된 설정 프로세스는 권장되는 단계이며 대부분의 사용자에게 이상적인 구성을 제공합니다. 이 문서의 대체 구성 옵션은 특정 사용 사례에 더 적합할 수 있습니다. 성능, 기능 또는 관리 용이성 측면의 상충 관계는 필요에 따라 설명됩니다.

## 메트릭 및 데이터 수집 {#metric-and-data-collection}

Datadog의 Azure 통합을 활성화하면 Datadog이 다음을 수행할 수 있습니다.

  - 지정된 범위 내 모든 구독의 모든 리소스 검색 및 모니터링
  - Azure Monitor에서 사용 가능한 모든 메트릭이 수집되도록 검색된 메트릭 정의를 자동으로 업데이트
  - 다양한 일반 메타데이터와 리소스별 메타데이터(사용자 지정 Azure 태그 포함)를 수집하고 이를 Datadog의 관련 리소스 메트릭에 태그로 적용
  - Azure 메타데이터 API를 쿼리하고 응답을 사용하여 [Datadog에서 유용한 메트릭 생성][2]함으로써 Azure Monitor를 제공하지 않는 인사이트 확보

사용된 Azure API와 수집된 데이터는 통합의 표준 버전을 사용하는지 Azure Native 버전을 사용하는지에 관계없이 동일합니다.

아래 다이어그램은 [Azure 시작하기][1]에 설명된 Azure 통합 구성의 프로세스와 결과 아키텍처를 간략하게 설명합니다.

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_integration_setup.png" alt="Azure 앱 등록 통합 설정을 보여주는 워크플로 다이어그램: Azure에서 서비스 주체 및 클라이언트 암호로 앱 등록을 생성하고 구독 또는 관리 리소스에 모니터링 읽기 권한자 역할을 할당한 다음, Datadog 백엔드에서 메트릭 태그 필터로 통합을 설정합니다." >}}

이 작업이 완료되면 데이터 수집이 자동으로 시작됩니다. 앱 등록을 통해 Datadog은 [Azure AD(Active Directory)에서 토큰을 요청][3]할 수 있습니다. Datadog은 이 토큰을 다양한 Azure API에 대한 API 호출 권한으로 사용하여 제공된 범위 내에서 리소스를 검색하고 데이터를 수집합니다. 이 지속적인 프로세스는 기본적으로 2분 간격으로 실행되며 Azure 환경에서 데이터를 검색하고 수집하는 데 사용됩니다. 데이터 수집 프로세스는 아래 그림과 같습니다.

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_metric_collection.png" alt="Azure 메트릭 수집 프로세스를 보여주는 워크플로 다이어그램: Datadog 백엔드가 구성을 읽고, 서비스 주체를 통해 Azure Active Directory에 인증하고, RBAC 권한을 사용하여 구독 및 리소스 메타데이터를 수집하고, 태그별로 리소스를 필터링한 다음 Azure Monitor에서 메트릭을 검색하여 Datadog으로 수집합니다." >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
위의 메트릭 및 로그 수집 다이어그램은 클라이언트 암호를 통한 인증을 사용합니다. **Secretless Auth**를 사용하면 앱 등록은 Azure 페더레이션 자격 증명 및 OpenID Connect(OIDC) 워크로드 ID 페더레이션을 통해 Datadog의 ID를 신뢰합니다. 이는 저장된 클라이언트 암호를 대체합니다. 기존 앱 등록을 Secretless Auth로 이동하려면 [기존 앱 등록을 Secretless Auth로 마이그레이션](/getting_started/integrations/azure/#secretless-migration-setup)을 참조하세요.
{{< /site-region >}}

## 로그 수집 {#log-collection}

아래 다이어그램은 [자동 로그 포워딩][29]을 사용하여 Azure에서 Datadog으로 로그를 전달하기 위한 참조 아키텍처를 제공합니다. 선택한 구독에 배포된 제어 평면은 리소스를 검색하고 진단 설정을 구성합니다. Azure Container Apps 작업과 스토리지 계정으로 구성된 로그 포워더는 리소스가 로그를 생성하는 각 리전에 배포되며, 로그 볼륨에 맞춰 확장되거나 축소됩니다.

{{<img src="/logs/guide/azure_automated_logs_architecture/detailed_architecture.png" alt="Azure 자동 로그 포워딩을 보여주는 워크플로 다이어그램: 컨트롤 플레인이 리소스를 발견하고, 리전에 걸쳐 로그 포워더를 확장하며, 로그를 스토리지 계정으로 전송하기 위해 진단 설정을 구성하고, 이후 Container Apps가 새로운 로그를 확인해 Datadog Log Management로 포워딩합니다." style="width:100%">}}

설정 지침은 [Azure 자동 로그 포워딩 설정 가이드][29]를 참조하세요.

{{% collapse-content title="이벤트 허브 로그 포워딩(레거시)" level="h3" expanded=false id="legacy-event-hub-log-forwarding" %}}

다음 참조 아키텍처는 기존 이벤트 허브 로그 포워딩 설정에 적용됩니다. 새 배포에는 대신 [자동 로그 포워딩][29]을 사용하세요.

{{< img src="integrations/guide/azure_architecture_and_configuration/manual_log_forwarding.png" alt="Azure 리소스가 진단 설정을 사용하여 이벤트 허브 및 로그 포워딩 함수를 통해 Datadog Logs Ingestion으로 로그를 보내는 두 리전 간의 수동 Azure 로그 포워딩 설정을 보여주는 아키텍처 다이어그램입니다." >}}

#### 제공된 템플릿 사용{#using-the-provided-templates}

기본 Azure [이벤트 허브 로깅 가이드][13]의 **Deploy to Azure** 버튼은 이벤트 허브 및 포워더 함수 쌍을 생성하기 위한 템플릿을 제공합니다. 이 템플릿을 사용하여 직접 배포하는 것 외에도 기본 ARM 템플릿을 자체 코드형 인프라 배포의 시작점으로 사용할 수 있습니다.

이러한 템플릿은 활동 로그에 대한 선택적 진단 설정 하나를 제외하고는 진단 설정을 추가하지 않습니다. 리소스 로그의 경우 ARM 템플릿이나 Terraform을 사용하여 리소스에 진단 설정을 프로그래밍 방식으로 추가하는 것이 좋습니다. 이러한 진단 설정은 리소스 로그를 Datadog으로 보내야 하는 모든 리소스에 추가되어야 합니다.

#### 리전 고려 사항 {#region-considerations}

진단 설정은 리소스와 동일한 리전에 있는 이벤트 허브로만 리소스 로그를 보낼 수 있습니다. Datadog으로 리소스 로그를 보내려는 리소스가 포함된 각 리전에 이벤트 허브 및 포워더 함수 쌍을 추가합니다.

하지만 진단 설정은 리소스와 동일한 구독에 있는 이벤트 허브로 로그를 전송하는 것으로 제한되지는 않습니다. Azure 테넌트 내에 여러 구독이 있는 경우 동일한 리전 내에서 단일 이벤트 허브 및 포워더 함수를 공유할 수 있습니다.

#### 대용량 로그 고려 사항 {#high-volume-log-considerations}

로그 볼륨이 확장됨에 따라 일반적으로 이벤트 허브에서 병목 현상이 발생할 수 있습니다. 많은 양의 로그를 제출할 계획이라면 파티션을 추가하거나 프리미엄 또는 전용 계층을 사용하는 것을 고려할 수 있습니다.
특히 로그 볼륨이 큰 경우 동일한 리전 내에 이벤트 허브 및 포워더 함수 쌍을 추가하고 그 사이에서 트래픽 분할을 고려할 수 있습니다.

{{% /collapse-content %}}

{{% collapse-content title="Azure Datadog Extension 설치 명령" level="h3" expanded=false id="azure-datadog-extension-commands" %}}
## Azure에 설치 {#install-on-azure}

Datadog은 Azure 인스턴스에서 에이전트 배포를 지원하는 Azure 확장 프로그램을 제공합니다.

* [원클릭 Datadog 배포가 가능한 Azure 모니터링 설명][6]
* [Azure 통합][10] _모든 사이트_
* [Azure Native 통합][7] _US3만 해당_

GUI 설치 대신 명령줄을 사용할 수 있습니다.

Azure 인스턴스에서 Datadog Agent 확장 프로그램을 실행하려면 환경에 맞는 명령을 사용하세요. [Datadog 사이트 페이지][33]에서 `<SITE_PARAMETER>`를 Datadog 계정 **사이트 파라미터** 값으로 바꾸고 `<DATADOG_API_KEY>`를 [Datadog API 키][9]로 바꿉니다.
   **참고**: Agent 버전 7 이상을 설치하려면 Python 3.9 이상이 필요합니다.

{{< tabs >}}
{{% tab "Windows" %}}

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

Azure 인스턴스 확장 프로그램을 설정하는 구문에 대한 자세한 내용은 [Azure 확장 Set-AzVMExtension 설명][100]에서 확인할 수 있습니다.

Azure 확장 프로그램은 일반 설정과 보안 설정을 모두 허용합니다.

일반 설정에는 다음이 포함됩니다.

| 변수 | 유형 | 설명  |
|----------|------|--------------|
| `site` | 문자열 | 다음과 같이 Datadog 인테이크 사이트를 설정합니다. 예: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | 문자열 | `x.y.z` 또는 `latest` 형식을 따라 설치할 Agent 버전 |
| `agentConfiguration` | URI | (선택 사항) Agent 구성을 ZIP 파일로 포함하는 Azure Blob에 대한 URI입니다. |
| `agentConfigurationChecksum` | 문자열 | Agent 구성 ZIP 파일의 SHA256 체크섬입니다. `agentConfiguration`이 지정된 경우 필수입니다. |

보안 설정에는 다음이 포함됩니다.

| 변수 | 유형 | 설명  |
|----------|------|--------------|
| `api_key`| 문자열 | 구성 파일에 Datadog API 키를 추가합니다. |

**참고**: `agentConfiguration` 및 `api_key`가 동시에 지정된 경우 `agentConfiguration`에서 발견된 API 키가 우선합니다. 또한 대상 머신에 API 키가 설정된 경우 `Set-AzVMExtension`을 사용하여 변경할 수 없습니다.

### 구성 URI 지정 {#specify-a-configuration-uri}

본 예시에서는 Datadog Agent에서 사용할 구성을 지정하는 방법을 알아봅니다.
Datadog Agent 구성 URI는 반드시 Azure Blob 스토리지 URI여야 합니다.
Datadog Windows Agent Azure Extension에서는 `agentConfiguration` URI를 `.blob.core.windows.net` 도메인에서 가져오는지 확인합니다.
Datadog Agent 구성은 `%PROGRAMDATA%\Datadog` 폴더에서 생성해야 합니다(사용 가능한 모든 구성 옵션은 [Windows용 Agent 구성 파일 예시][101] 참조).

<div class="alert alert-info">
기존 Agent의 구성을 재사용하려면 다음 단계를 수행하세요.

   1. 기존 Agent의 <code>%ProgramData%\Datadog</code> 폴더에서 추가 설치 아티팩트나 파일을 제거해 이 폴더에 통합 구성과 함께 <code>datadog.yaml</code> 파일 및 <code>conf.d</code> 폴더만 포함되도록 합니다.
   1. 새니타이즈된 <code>%ProgramData%\Datadog</code> 폴더를 ZIP 파일로 저장합니다.
</div>

#### Agent 구성 파일에서 SHA256 체크섬 생성 {#generate-a-sha256-checksum-from-the-agent-configuration-file}

{{< code-block lang="powershell" >}}
Get-FileHash -Path "C:\path\to\yourfile.zip" -Algorithm SHA256
{{< /code-block >}}

#### 사용자 지정 구성으로 Agent 설치 {#install-the-agent-with-your-custom-configuration}

VM 확장 프로그램을 생성하려면 `agentConfiguration` 파라미터로 Blob Storage URL을 참조하고 `agentConfigurationChecksum` 파라미터로 체크섬을 참조하세요.

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentConfiguration" = "https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip"; "agentConfigurationChecksum" = "<SHA256_CHECKSUM>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

**참고**: Datadog Agent가 설치되면 구성은 최신 버전으로 업그레이드할 때만 변경할 수 있습니다.

### 특정 버전의 Agent 설정 {#set-a-specific-version-of-the-agent}

이 예시는 설치할 Agent 버전을 지정하는 방법을 보여줍니다. 기본적으로 Datadog Windows Agent Azure Extension은 최신 버전의 Datadog Agent를 설치합니다.

**참고**: 다운그레이드는 *지원되지* 않으므로 대상 머신에 현재 설치된 버전보다 *낮은* 버전의 Datadog Agent는 설치할 수 없습니다. 더 낮은 버전의 Datadog Agent를 설치하려면 대상 머신에서 Datadog Windows Agent Azure Extension을 제거하여 이전 버전을 먼저 삭제하세요. Datadog Windows Agent Azure Extension을 제거해도 Datadog Agent 구성은 제거되지 않습니다.

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "7.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

[100]: https://learn.microsoft.com/powershell/module/az.compute/set-azvmextension
[101]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example
{{% /tab %}}
{{% tab "Linux" %}}

{{< code-block lang="shell" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}

Azure 인스턴스 확장 프로그램을 설정하는 구문에 대한 자세한 내용은 [Azure Extension CLI 참조][200]에서 확인할 수 있습니다.

Azure 확장 프로그램은 일반 설정과 보안 설정을 모두 허용합니다.

일반 설정에는 다음이 포함됩니다.

| 변수 | 유형 | 설명  |
|----------|------|--------------|
| `site` | 문자열 | 다음과 같이 Datadog 인테이크 사이트를 설정합니다. 예: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | 문자열 | `x.y.z` 또는 `latest` 형식을 따라 설치할 Agent 버전 |
| `agentConfiguration` | URI | (선택 사항) Agent 구성을 zip 파일로 포함하는 Azure Blob에 대한 URI입니다. |
| `agentConfigurationChecksum` | 문자열 | Agent 구성 ZIP 파일의 SHA256 체크섬입니다. `agentConfiguration`이 지정된 경우 필수입니다. |

보안 설정에는 다음이 포함됩니다.

| 변수 | 유형 | 설명  |
|----------|------|--------------|
| `api_key`| 문자열 | 구성 파일에 Datadog API 키를 추가합니다. |

**참고**: `agentConfiguration` 및 `api_key`가 동시에 지정된 경우 `agentConfiguration`에서 발견된 API 키가 우선합니다. 대상 머신에 API 키가 설정되어 있으면 이 설정을 `api_key` 설정으로 변경할 수 없습니다.

### 구성 URI 지정 {#specify-a-configuration-uri-1}

본 예시에서는 Datadog Agent에서 사용할 구성을 지정하는 방법을 알아봅니다.
- Datadog Agent 구성 URI는 반드시 Azure Blob 스토리지 URI여야 합니다.
- Datadog Linux Agent Azure Extension은 `agentConfiguration` URI를 `.blob.core.windows.net` 도메인에서 가져오는지 확인합니다.
- Datadog Agent 구성은 `/etc/datadog-agent/` 폴더에서 생성해야 합니다(사용 가능한 모든 구성 옵션은 [Linux용 Agent 구성 파일 예시][201] 참조).

<div class="alert alert-info">
기존 Agent의 <code>/etc/datadog-agent</code> 폴더를 ZIP 파일로 저장하여 기존 Agent의 구성을 재사용하려면 다음 단계를 수행하세요.

<code>zip -r datadog_config.zip /etc/datadog-agent</code>.
</div>

#### Agent 구성 파일에서 SHA256 체크섬 생성 {#generate-a-sha256-checksum-from-the-agent-configuration-file-1}

{{< code-block lang="shell" >}}
sha256sum <YOUR_FILENAME>.zip
{{< /code-block >}}

#### 사용자 지정 구성으로 Agent 설치 {#install-the-agent-with-your-custom-configuration-1}

VM 확장 프로그램을 생성하려면 `agentConfiguration` 파라미터로 Blob Storage URL을 참조하고 `agentConfigurationChecksum` 파라미터로 체크섬을 참조하세요.

{{< code-block lang="shell" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest", "agentConfiguration":"https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip", "agentConfigurationChecksum":"<SHA256_CHECKSUM>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}


[200]: https://learn.microsoft.com/cli/azure/vm/extension
[201]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
{{% /tab %}}
{{< /tabs >}}

## Azure Arc에 설치 {#install-on-azure-arc}

[Azure Arc][11] 인스턴스에서 Datadog Agent를 확장 프로그램으로 실행하려면 환경에 맞는 명령을 사용합니다.

{{< tabs >}}
{{% tab "Windows" %}}

{{< code-block lang="powershell" >}}
az connectedmachine extension create --name <NAME> --machine-name <MACHINE_NAME> -g <RESOURCE_GROUP> --publisher Datadog.Agent --type DatadogWindowsAgent --location <LOCATION> --settings '{"site":"<SITE_PARAMETER>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}'
{{< /code-block >}}

{{% /tab %}}
{{% tab "Linux" %}}

{{< code-block lang="bash" >}}
az connectedmachine extension create --name <NAME> --machine-name <MACHINE_NAME> -g <RESOURCE_GROUP> --publisher Datadog.Agent --type DatadogLinuxAgent --location <LOCATION> --settings '{"site":"<SITE_PARAMETER>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}'
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Azure `connectedmachine` 확장 프로그램을 설정하는 구문에 대한 자세한 내용은 [az connectedmachine 확장 프로그램][12] 페이지에서 확인할 수 있습니다.
{{% /collapse-content %}} 

{{% collapse-content title="Azure 카운트 메트릭" level="h3" expanded=false id="azure-count-metrics" %}}
Datadog은 [Azure 통합][23]으로 모니터링되는 각 리소스에 대해 추가 메트릭인 `azure.*.count`를 생성합니다. 예를 들어, Datadog에서 모니터링하는 Azure 가상 머신은 `azure.vm.count`를 보고합니다.

`azure.*.count` 메트릭은 지원이 중단된 `azure.*.status`보다 개선된 메트릭입니다.

## 카운트 메트릭 {#count-metric}

`azure.*.count` 메트릭은 다음 2가지 기본적 정보를 제공합니다.

- 해당 유형의 리소스 수
- Azure에서 보고한 각 리소스 상태

`azure.*.count` 메트릭은 해당 리소스 유형에 대한 다른 메트릭과 동일한 네임스페이스에 생성됩니다(예: `azure.network_loadbalancers.count`). 여기에는 해당 네임스페이스의 다른 메트릭과 동일한 메타데이터 태그가 모두 포함되며 `status`에 대한 추가 태그도 포함됩니다.

### 사용 사례 {#use-cases}

`azure.*.count` 메트릭을 사용하여 다음 작업을 수행할 수 있습니다.

- 모든 항목에 대해 `azure.vm.count`를 그래프로 표시하고 `status`로 합산하여 시간 경과에 따른 상태별로 분류된 가상 머신 수에 대한 보기를 생성합니다.
- 대시보드에 쿼리 위젯을 생성하여 특정 리소스 유형의 수를 표시합니다. 사용 가능한 태그를 사용하여 리전, 리소스 그룹, 종류 또는 상태와 같은 관련 집계로 카운트 범위를 지정합니다.
- 다양한 Azure 리소스의 상태에 대해 경고하도록 모니터링을 생성합니다.

**참고**: 경우에 따라 기본 시각화 설정으로 인해 차트나 쿼리 위젯에서 리소스가 간헐적으로 이중으로 계산되는 것처럼 보일 수 있습니다. 이는 특정 상태로 범위가 지정된 모니터링 또는 위젯에는 영향을 주지 않습니다.
Interpolation > none으로 설정하거나 `.fill(null)`을 사용하여 차트나 쿼리 위젯에서 [보간][22]을 꺼 이 효과를 줄일 수 있습니다.

대부분의 리소스 유형의 경우 가능한 상태는 다음과 같습니다.

- 실행 중
- 사용 불가
- 알 수 없음
- 강등됨
- 실패

가상 머신 상태는 아래 상태를 포함하여 더욱 상세합니다.

- 실행 중
- 중지됨_재할당됨
- 중지됨
- 알 수 없음
- 사용 불가
- 강등됨
- 실패

상태가 `query_failed`인 경우 Azure에서 리소스 상태 공급자를 활성화해야 합니다.
{{% /collapse-content %}} 

## Azure 통합 문제 해결 {#azure-integration-troubleshooting}

{{% collapse-content title="테넌트 이름 찾기" level="h3" expanded=false id="troubleshooting-find-your-tenant-name" %}}
1. [portal.azure.com][24]으로 이동합니다.
2. 왼쪽 사이드바에서 **Azure Active Directory**를 선택합니다.
3. **Basic information**에서 **Name** 값을 찾습니다.
{{% /collapse-content %}} 

{{% collapse-content title="로그인할 수 없음" level="h3" expanded=false id="troubleshooting-unable-to-login" %}}
Azure 통합을 설치하는 동안 로그인 오류가 발생하는 경우 [Datadog 지원팀][36]에 문의하세요. 가능한 경우 스크린샷을 첨부하세요.
{{% /collapse-content %}} 

{{% collapse-content title="누락 메트릭" level="h3" expanded=false id="troubleshooting-missing-metrics" %}}
해당 구독을 모니터링하기 위해 Azure 애플리케이션에 읽기 권한을 부여하는 등 설치 프로세스를 완료했는지 확인합니다.

ARM 배포 가상 머신의 경우 진단을 활성화하고 수집하려는 VM 메트릭도 선택해야 합니다. 지침은 아래 **진단 활성화**를 참조하세요.

누락된 메트릭의 경우 메트릭에 대한 다음 정보와 함께 [Datadog 지원팀][36]에 문의하시기 바랍니다.
- 차원
- 리소스 그룹
- 리소스 이름
- 구독 ID 또는 구독 이름 

메트릭 그래프를 보여주는 Azure Monitor의 그래프 스크린샷을 첨부합니다. **중요**: 스크린샷에 1분 데이터 포인트를 그래프로 표시하세요.

#### 진단 활성화 {#enable-diagnostics}

진단을 활성화하면 ​​ARM 배포 VM이 CPU, 네트워크 등에 대한 메트릭이 포함된 로깅 정보를 수집할 수 있습니다. 다음 지침을 따르세요.

1. [Azure Portal][24]로 이동하여 VM을 찾습니다.
2. **Monitoring** 섹션에서 **Diagnostics settings**를 클릭합니다.
3. 스토리지 계정을 선택하고 **Enable guest-level monitoring**을 클릭합니다.
4. 기본적으로 기본 메트릭과 로그가 활성화되어 있습니다. 사용자의 선호에 따라 조정하세요.
5. 변경사항을 저장하려면 **Save**를 클릭합니다.

    {{< img src="integrations/guide/azure_troubleshooting/azure_enable_diagnostics.png" alt="Pick a storage account 및 활성화된 enable guest level monitoring에서 No storage account가 강조 표시되어 있는 Azure 진단 설정 개요" style="width:70%">}}
{{% /collapse-content %}} 

{{% collapse-content title="Azure와 Datadog 간의 데이터 불일치" level="h3" expanded=false id="troubleshooting-metric-discrepancy" %}}
Datadog의 Azure 통합은 [Azure Monitor][27]에서 모든 메트릭을 수집합니다. 메트릭은 사용 가능한 모든 차원(Datadog의 태그에 매핑됨), 가장 높은 시간 세분성 및 기본 집계 유형과 함께 수집됩니다.

아래 섹션에서는 주의해야 할 두 가지 중요한 차이점과 [불일치를 조정하는](#reconcile-the-discrepancy) 단계를 설명합니다.

#### 1. 시간 집계 {#1-time-aggregation}

Datadog은 Azure에서 선택한 시간 범위와 관계없이 Azure의 원시 데이터를 초당 값으로 표시합니다. 이로 인해 Datadog의 값이 Azure에 표시되는 값보다 낮게 보일 수 있습니다. 자세한 내용은 메트릭 설명서의 [시간 집계][15]를 참조하세요.

#### 2. 공간 집계 {#2-space-aggregation}

Datadog의 [공간 집계][28]는 Azure Monitor 메트릭의 [기본 집계 유형][17]에 해당합니다. Azure의 [메트릭 정의 - 목록][16] API의 필드 `primaryAggregationType`에서 기본 집계 유형을 확인할 수 있습니다.

#### 불일치 조정 {#reconcile-the-discrepancy}

1. [Azure Monitor Metrics Explorer][18]에서 메트릭을 그래프로 표시하거나, Azure에서 리소스로 이동하여 왼쪽 패널에서 **Monitoring**을 클릭한 다음 **Metrics**를 클릭합니다.
2. [Datadog Metrics Explorer][31]에서 메트릭을 그래프로 표시합니다.
3. Azure의 쿼리가 Datadog의 쿼리와 동일한 범위로 지정되었는지 확인합니다.
   - Azure 메트릭 쿼리에 사용된 모든 차원은 Datadog 메트릭 쿼리에 사용된 태그와 일치해야 함
   - 쿼리에 사용된 기본 집계 유형은 Datadog [공간 애그리게이터][28]와 일치해야 합니다.
   - 시간 프레임은 Datadog Metrics Explorer의 시간 프레임과 일치해야 합니다.
4. 그래프의 데이터 포인트 위에 마우스를 올리면 타임스탬프와 값이 표시됩니다.

{{< img src="integrations/guide/azure_advanced_configuration/azure_metric_explorer.png" alt="그래프의 한 지점에 커서를 올려 메트릭 값과 타임스탬프가 강조 표시된 Azure Metrics Explorer" >}}

5. Datadog 그래프에서 동일한 시점을 찾아 값을 비교합니다. 값이 동일하다면, 원래의 불일치는 두 그래프 간의 시간 또는 공간 집계의 차이 때문입니다.
{{% /collapse-content %}} 

### 로그 수집 문제 해결 {#log-collection-troubleshooting}

로그 포워딩 문제를 해결하려면 [일반 문제 해결 섹션](#general-troubleshooting-applicable-to-all-setup-methods)부터 시작하세요. 해당 단계로 문제가 해결되지 않으면 다음 설정별 가이드를 확인하세요. 

- [자동화](#automated-log-forwarding-troubleshooting)
- [Blob Storage](#blob-storage-log-forwarding-troubleshooting)
- [네이티브 통합](#azure-native-integration-log-forwarding-troubleshooting)
- [이벤트 허브](#event-hub-log-forwarding-troubleshooting)

#### 모든 설정 방법에 적용되는 일반적인 문제 해결 {#general-troubleshooting-applicable-to-all-setup-methods}

일일 로그 할당량 초과:
: 로그 보존에 대한 [일일 할당량][20]을 초과하지 않았는지 확인하세요.

제외 필터를 사용하여 로그 제외:
: [제외 필터][38]에 의해 로그가 제외되지 않았는지 확인하세요.

로그 검색에 잘못된 구문 사용:
: 올바른 [검색 구문][34]을 사용했는지, 검색에 올바른 속성이나 태그가 포함되어 있는지 확인하세요.

진단 설정이 없음:
: Datadog으로 보낼 리소스, 활동 로그 및 Entra ID 로그에 [진단 설정][8]이 추가되었는지 확인하세요.

**참고**: `source:azure.activedirectory` 쿼리를 사용하여 Entra ID 로그를 검색할 수 있습니다.

#### 자동 로그 포워딩 문제 해결 {#automated-log-forwarding-troubleshooting}

{{% collapse-content title="이름 충돌이 발생했는지 검사" level="h5" expanded=false id="troubleshooting-logs-naming-conflicts" %}}
기본 파라미터 중 하나와 리소스 이름이 동일한 Azure 리소스가 있는 경우 이름 충돌이 발생할 수 있습니다. Azure에서는 개별 구독 내에서 리소스 이름 공유를 허용하지 않습니다. 환경 내에 아직 존재하지 않는 고유한 이름으로 기본 파라미터의 이름을 변경하는 것이 좋습니다.

**참고**: 이 오류로 인해 템플릿을 다시 실행하는 경우 전체 리소스 그룹을 제거하여 새로 배포하는 것이 좋습니다. 
{{% /collapse-content %}} 

{{% collapse-content title="리소스 공급자가 등록되었는지 확인" level="h5" expanded=false id="troubleshooting-logs-unregistered-resource-provider" %}}
오류`The subscription is not registered to use namespace 'Microsoft.EventHub'`로 인해 템플릿 배포에 실패하는 경우:

Azure는 각 서비스에 대한 리소스 공급자(예: Azure Event Hubs의 경우 `Microsoft.EventHub`)를 보유하고 있습니다. 사용 중인 Azure 구독이 필수 리소스 공급자에 등록되어 있지 않으면 스크립트가 실패합니다. 

적절한 리소스 공급자에 등록하여 이 문제를 해결하세요. 아래 예시 명령을 CloudShell에서 실행하고 <RESOURCE_PROVIDER_NAME>을 리소스 공급자 이름(예: `Microsoft.EventHub`)으로 대체합니다.

{{< code-block lang="shell" >}}

az provider register --namespace <RESOURCE_PROVIDER_NAME>

{{< /code-block >}}
{{% /collapse-content %}} 

{{% collapse-content title="DD_SITE 및 DD_API_KEY 값 확인" level="h5" expanded=false id="troubleshooting-logs-check-site-and-api-key-alf" %}}
모든 로그가 누락된 경우 [Datadog 사이트][33] 및 API 키를 확인하세요.

1. 자동 로그 포워딩 리소스가 배포된 리소스 그룹에서 **Settings > Deployments**로 이동합니다.
2. 가장 최근 배포를 선택합니다.
3. **Redeploy**를 클릭하여 값을 확인하고 수정합니다.
{{% /collapse-content %}} 

{{% collapse-content title="스토리지 계정 컨테이너에 로그가 있는지 확인합니다." level="h5" expanded=false id="troubleshooting-logs-verify-logs-in-storage-account" %}}
Azure 리소스 로그가 누락된 경우 리소스 리전에 있는 ARM 배포 스토리지 계정을 찾고 예상되는 로그가 포함된 컨테이너를 확인합니다.
{{% /collapse-content %}} 

{{% collapse-content title="포워더 작업의 containerAppConsole 로그를 검사하세요." level="h5" expanded=false id="troubleshooting-logs-inspect-forwarder-job-logs" %}}
[Container App Console 로그][32]는 애플리케이션 오류 및 예외를 진단하는 데 유용합니다. 로그를 검사하려면 로그가 누락된 리소스와 동일한 리전의 Container Apps 환경 내에서 로깅을 활성화합니다.
{{% /collapse-content %}} 

**참고**: 자동화된 로그 포워더를 사용하여 로그를 전송할 때는 Microsoft Entra 진단 설정을 수동으로 지정해야 합니다. 자세한 내용은 [활동 로그에 대한 Microsoft Entra 진단 설정 구성][14]을 참조하세요.

#### Blob Storage 로그 포워딩 문제 해결 {#blob-storage-log-forwarding-troubleshooting}

{{% collapse-content title="DD_SITE 및 DD_API_KEY 값 확인" level="h5" expanded=false id="troubleshooting-logs-check-site-and-api-key-bs" %}}
모든 로그가 누락된 경우 다음 사항을 확인하세요.
   - [선택한 Datadog 사이트][33]가 올바름
   - 구성된 [API 키][9]가 올바른 Datadog 조직에 속해 있음
{{% /collapse-content %}} 

{{% collapse-content title="포워더 구성 확인" level="h5" expanded=false id="troubleshooting-logs-verify-forwarder-config" %}}
포워더가 최신 버전을 사용하여 Windows OS에서 Node.js 22 LTS 이상을 실행 중인지 확인하세요. 코드는 [index.js][19]에서 공개적으로 확인할 수 있습니다.
{{% /collapse-content %}} 

{{% collapse-content title="Blob 트리거 검사" level="h5" expanded=false id="troubleshooting-logs-inspect-blob-trigger" %}}
Blob Storage 트리거가 다음 옵션으로 구성되어 있는지 확인합니다.

- **바인딩 유형**: `Azure Blob Storage`
- **Blob 파라미터 이름**: `blobContent`
- **경로**: 스토리지 계정 내 로그 데이터 경로
- **스토리지 계정 연결**: 스토리지 계정 연결 문자열이 포함된 애플리케이션 설정 이름
{{% /collapse-content %}} 

{{% collapse-content title="Blob Storage 메트릭 검사" level="h5" expanded=false id="troubleshooting-logs-inspect-blob-metrics" %}}
Blob Storage가 데이터를 수신하고 있는지 확인합니다.
: `azure.storage_storageaccounts_blobservices.ingress`

Blob Storage가 데이터를 전송하고 있는지 확인합니다.
: `azure.storage_storageaccounts_blobservices.egress` 

Blob Storage에 대한 요청에 성공했는지 확인합니다.
: `azure.storage_storageaccounts_blobservices.transactions`

`azure.storage_storageaccounts_blobservices.transactions` 메트릭의 경우 다음 메트릭 쿼리를 사용하여 성공 또는 실패한 `PUT` 작업 수를 각각 확인할 수 있습니다.

   - `azure.storage_storageaccounts_blobservices.transactions{responsetype:success , apiname:put*} by {apiname}`
   - `azure.storage_storageaccounts_blobservices.transactions{!responsetype:success , apiname:put*} by {responsetype}`
{{% /collapse-content %}} 

{{% collapse-content title="함수 메트릭 검사" level="h5" expanded=false id="troubleshooting-logs-inspect-function-metrics-bs" %}}
다음 메트릭을 검사하여 함수 앱에서 실행 문제, 데이터 수신 또는 전송 문제, 오류 상태 코드가 발생하는지 확인합니다.

함수가 데이터를 수신하고 있는지 확인합니다.
: `azure.functions.bytes_received`

함수가 데이터를 전송하고 있는지 확인합니다.
: `azure.functions.bytes_sent`

함수의 요청이 성공 상태 코드를 수신하고 있는지 확인합니다.
: `azure.functions.http2xx`

함수의 요청이 오류 상태 코드를 수신하지 않는지 확인합니다.
: `azure.functions.http4xx`
: `azure.functions.http5xx`
{{% /collapse-content %}} 

{{% collapse-content title="진단 설정이 리소스나 활동 로그에 자동으로 추가되지 않음" level="h5" expanded=false id="troubleshooting-logs-diagnostic-settings-not-added" %}}

진단 설정이 리소스나 활동 로그에 자동으로 추가되지 않은 경우 다음 경우가 발생했는지 확인하세요.
   - [진단 설정의 최대 개수][25]에 도달한 경우
   - 리소스에 수정 작업을 방지하는 잠금이 설정되어 있는 경우
{{% /collapse-content %}} 

**참고**: Blob Storage 파일에 새 로그가 추가되면, 함수가 트리거되어 새 추가 항목뿐만 아니라 파일의 전체 내용이 전송됩니다.

#### Azure Native 통합 로그 포워딩 문제 해결 {#azure-native-integration-log-forwarding-troubleshooting}

{{% collapse-content title="리소스 로그 태그 규칙 검사" level="h5" expanded=false id="troubleshooting-logs-check-resource-logs-tag-rules" %}}
Datadog 리소스 구성의 태그 규칙이 리소스 로그의 태그 집합과 일치하는지 확인합니다.

태그 규칙에 문제가 없다면 [Datadog 지원 팀][36]에 문의하여 다음 정보를 공유하세요.
   - **테넌트 ID**: **기본 정보** 아래의 Entra ID에서 테넌트 ID 값을 찾습니다.
   - **구독 ID**: 로그가 누락된 모든 구독의 구독 ID입니다.
   - **Datadog 리소스 ID**: Datadog 리소스 블레이드에서 **Settings > Properties**로 이동하여 Datadog 리소스 ID를 찾습니다. 리소스 ID는 다음 형식을 사용합니다. `/subscriptions/<SUBSCRIPTION_ID>/resourceGroups/myresourcegroup/providers/Microsoft.Datadog/monitors/<DATADOG_RESOURCE_NAME`
   - **리소스 ID**: 로그가 누락된 모든 리소스(예: 웹 앱 또는 데이터베이스)의 리소스 ID입니다.
{{% /collapse-content %}} 

**참고**: Azure에서 Datadog 리소스를 사용하여 로그를 보낼 때는 Entra ID 진단 설정을 수동으로 지정해야 합니다.

#### 이벤트 허브 로그 포워딩 문제 해결 {#event-hub-log-forwarding-troubleshooting}
   
{{% collapse-content title="리소스 공급자가 등록 해제되어 있는지 확인" level="h5" expanded=false id="troubleshooting-logs-check-resource-provider-registration" %}}

오류`The subscription is not registered to use namespace 'Microsoft.EventHub'`로 인해 템플릿 배포에 실패하는 경우:

Azure는 각 서비스에 대한 리소스 공급자(예: Azure Event Hubs의 경우 `Microsoft.EventHub`)를 보유하고 있습니다. 사용 중인 Azure 구독이 필수 리소스 공급자에 등록되어 있지 않으면 스크립트가 실패합니다. 

적절한 리소스 공급자에 등록하여 이 문제를 해결하세요. 아래 예시 명령을 CloudShell에서 실행하고 <RESOURCE_PROVIDER_NAME>을 리소스 공급자 이름(예: `Microsoft.EventHub`)으로 대체합니다.

{{< code-block lang="shell" >}}

az provider register --namespace <RESOURCE_PROVIDER_NAME>

{{< /code-block >}}
{{% /collapse-content %}} 

{{% collapse-content title="DD_SITE 및 DD_API_KEY 값 확인" level="h5" expanded=false id="troubleshooting-logs-check-site-and-api-key-eh" %}}
모든 로그가 누락된 경우 다음 사항을 확인하세요.
   - [선택한 Datadog 사이트][33]가 올바름
   - 구성된 [API 키][9]가 올바른 Datadog 조직에 속해 있음

**참고**: 함수 앱 설정에서 Datadog 사이트 및 API 키가 설정되었는데 수정되면 앱이 다시 시작될 수 있습니다. 
{{% /collapse-content %}} 

{{% collapse-content title="잠재적인 이벤트 허브 병목 현상 식별" level="h5" expanded=false id="troubleshooting-logs-check-event-hub-bottlenecks" %}}
수신 메시지는 급증하는데 발신 메시지가 감소한다면 병목 현상이 발생했음을 의미합니다. 다음 메트릭을 사용하여 조사:

수신 메시지 확인:
: `azure.eventhub_namespaces.incoming_messages`

수신 데이터 확인:
: `azure.eventhub_namespaces.incoming_bytes`

발신 메시지 확인:
: `azure.eventhub_namespaces.outgoing_messages`

발신 데이터 확인:
: `azure.eventhub_namespaces.outgoing_bytes`

Microsoft.EventHub 스로틀 요청 확인:
: `azure.eventhub_namespaces.throttled_requests`

Microsoft.EventHub 서버 오류 확인:
: `azure.eventhub_namespaces.server_errors`

**참고**: [18시간보다 오래된 로그][4]는 삭제되므로 로그 지연 시간을 늘리면 데이터가 손실될 수 있습니다. 

병목 현상을 해결하기 위해 다음 작업 중 하나를 수행할 수 있습니다.

   - 더 많은 처리량(최대 32)을 처리하도록 [이벤트 허브 파티션을 확장][26]합니다. 현재 위치 확장(in-place scaling)은 프리미엄 또는 전용 계층에서만 사용할 수 있으므로, 원하는 파티션 수로 새 Event Hub를 만든 다음 진단 설정 및 포워더 트리거를 다시 구성해야 합니다. 확장 관련 조언은 [Azure 지원 팀][30]에 문의하세요. 
   - 로그 포워더를 Datadog의 여러 파이프라인으로 분할하여 각 파이프라인이 우선순위와 같은 규칙에 따라 특정 리소스 하위 집합을 처리하도록 합니다. 이렇게 하면 동시에 처리할 수 있는 로그 수가 증가합니다.
{{% /collapse-content %}} 

{{% collapse-content title="함수 메트릭 검사" level="h5" expanded=false id="inspect-function-metrics-eh" %}}
다음 함수 메트릭을 확인하여 함수 앱이 실행 중인지 확인하세요.

함수 실행 횟수를 확인합니다.
: `azure.functions.function_execution_count`

함수가 데이터를 수신 중인지 확인합니다.
: `azure.functions.bytes_received`

함수가 데이터를 수신 중인지 확인합니다.
: `azure.functions.bytes_sent`

함수의 요청이 성공 상태 코드를 반환하는지 확인합니다.
: `azure.functions.http2xx`

함수의 요청이 오류 상태 코드를 반환하지 않는지 확인합니다.
: `azure.functions.http4xx`
: `azure.functions.http5xx`

**참고**: 
   - 로그 포워더는 패키지 기반이며 Azure 포털에서 직접 코드 편집을 비활성화하는 [Azure Functions V4 프로그래밍 모델][35]을 사용합니다. 이전에 수동으로 설정한 함수를 업데이트하거나 사용자 지정하려면 [Datadog 지원 팀][36]에 문의하여 지침을 받으세요.
   - 더욱 안정적이고 효율적이며 비용 효율적인 로그 수집을 위해 [자동 로그 포워더][37]로 전환하세요. 모든 Azure 리소스에서 Datadog으로 로그 포워딩 프로세스를 완전히 자동화합니다.
{{% /collapse-content %}} 

## 여러 앱 등록 모니터링 {#monitoring-multiple-app-registrations}

여러 앱 등록을 통해 모니터링되는 구독은 액세스 구성이 중복될 수 있습니다. 이 설정은 권장되지 않으며 통합 문제나 시스템 충돌이 발생할 수 있고, Azure Monitor 비용이 증가할 수도 있습니다.

## 인프라 목록의 전원이 꺼진 Azure VM {#powered-down-azure-vms-on-the-infrastructure-list}

Azure에서 VM 전원을 끄면 Datadog Azure 통합 기능이 해당 VM에 대한 메트릭 `azure.vm.status`를 계속 수집합니다. 이 메트릭에는 `status:running`, `status:not_running` 또는 `status:unknown` 태그가 지정됩니다.

이는 의도된 동작이지만, 이로 인해 VM이 인프라 목록에 계속 남아 있게 됩니다. VM이 이 메트릭만 보고하는 경우 청구 가능한 호스트 수에 포함되지 않습니다. 자세한 청구 정보는 Datadog [청구 페이지][21]를 참조하세요.

Azure VM을 제거하면 3시간 내에 인프라스트럭처 목록에서 제거됩니다.

## 앱에 Azure VM이 나타나지만 메트릭이 보이지 않음 {#azure-vms-appear-in-the-app-without-metrics}

Datadog에 Azure 통합을 제대로 설치하면 15분 내에 Azure VM과 다른 서비스의 메트릭이 표시되기 시작합니다.

15분 후 인프라스트럭처 목록에 Azure VM이 나타나는데 메트릭이 보고되지 않는 경우, 이 문제에는 여러 원인이 있을 수 있습니다.

1. 올바른 메트릭을 보고 있는지 확인합니다.
    **클래식** 가상 머신 메트릭은 azure.vm 네임스페이스로 시작하며, ARM 배포 가상 머신 메트릭은 `azure.compute_virtualmachines` 네임스페이스로 시작합니다.

2. 이 두 네임스페이스가 메트릭을 반환하지 않는 경우 Azure Portal 내 가상 머신에 대해 **Diagnostics**가 활성화되어 있는지 확인하세요. Boot 진단과 Basic 메트릭만 필요합니다.
    * **클래식** 가상 머신의 경우:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/classic_vm.png" alt="Azure Portal에서 상태가 'on'으로 설정된 클래식 가상 머신의 진단 보기를 보여줍니다." >}}

    * For ARM deployed VMs:
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/arm_deployed_vm.png" alt="Azure Portal에서 상태가 'on'으로 설정된 가상 머신의 진단 설정 보기를 보여줍니다." >}}

3. 가상 머신이 실행 중인지 확인해야 합니다.
    통합 기능은 중지되거나 할당 해제된 가상 머신에 대한 성능 메트릭을 수집하지 않습니다. `azure.vm.count` 메트릭과 `running`, `stopped`, `stopped_deallocated`의 `status` 태그 값을 사용하여 호스트의 상태를 확인합니다. 해당 호스트의 상태가 `status:running`인지 확인하고, 호스트가 Azure 포털에서 실행 중인지 확인합니다.
    {{< img src="integrations/guide/azure_vms_appearing_in_the_app_without_metrics/azure_vm_running_2025-05-02.png" alt="status:running에서 가져온 azure.vm.count 메트릭의 그래프" >}}

##  `azure.*.count` 메트릭 관련 문제 {#issues-with-azurecount-metrics}

Azure 통합이 메트릭을 보고하지만 `azure.*.count`를 보고하지 않거나 `azure.*.count`가 `status:query_failed`를 반환하는 경우, Azure 구독에서 Azure 리소스 상태 공급자를 등록해야 합니다.

Azure 명령줄 인터페이스 사용:

```bash
azure login # Login to the Azure user associated with your Datadog account
azure config mode arm
azure provider register Microsoft.ResourceHealth
```

`azure.*.count` 메트릭은 5~10분 내에 Datadog에 표시되어야 합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/integrations/azure/
[2]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/
[3]: https://learn.microsoft.com/azure/databricks/dev-tools/api/latest/aad/
[4]: /ko/logs/troubleshooting/#missing-logs---timestamp-outside-of-the-ingestion-window
[5]: /ko/logs/guide/azure-event-hub-log-forwarding
[6]: https://www.datadoghq.com/blog/introducing-azure-monitoring-with-one-click-datadog-deployment
[7]: /ko/integrations/guide/azure-native-integration/#agent-extensions
[8]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings?tabs=portal
[9]: /ko/account_management/api-app-keys/#api-keys
[10]: /ko/getting_started/integrations/azure/#install-the-agent-for-greater-visibility-into-your-application
[11]: /ko/integrations/azure_arc/
[12]: https://learn.microsoft.com/cli/azure/connectedmachine/extension
[13]: /ko/logs/guide/azure-event-hub-log-forwarding/
[14]: https://learn.microsoft.com/entra/identity/monitoring-health/howto-configure-diagnostic-settings
[15]: /ko/metrics/#time-aggregation
[16]: https://learn.microsoft.com/rest/api/monitor/metric-definitions/list?view=rest-monitor-2023-10-01
[17]: https://learn.microsoft.com/azure/azure-monitor/metrics/metrics-aggregation-explained#aggregation-types
[18]: https://portal.azure.com/#view/Microsoft_Azure_Monitoring/AzureMonitoringBrowseBlade/~/metrics
[19]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[20]: /ko/logs/log_configuration/indexes/#set-daily-quota
[21]: /ko/account_management/billing/
[22]: /ko/metrics/guide/interpolation-the-fill-modifier-explained/
[23]: /ko/integrations/azure/
[24]: https://portal.azure.com
[25]: https://learn.microsoft.com/troubleshoot/azure/partner-solutions/log-limitations#check-diagnostic-settings-limit
[26]: https://learn.microsoft.com/azure/event-hubs/event-hubs-scalability
[27]: https://learn.microsoft.com/azure/azure-monitor/reference/metrics-index
[28]: /ko/metrics/#space-aggregation
[29]: /ko/logs/guide/azure-automated-log-forwarding/
[30]: https://azure.microsoft.com/support
[31]: https://app.datadoghq.com/metric/explorer
[32]: https://learn.microsoft.com/azure/azure-monitor/reference/tables/containerappconsolelogs
[33]: /ko/getting_started/site/#access-the-datadog-site
[34]: /ko/logs/explorer/search_syntax/
[35]: https://techcommunity.microsoft.com/blog/appsonazureblog/azure-functions-node-js-v4-programming-model-is-generally-available/3929217
[36]: /ko/help/
[37]: https://www.datadoghq.com/blog/azure-log-forwarding/
[38]: /ko/logs/log_configuration/indexes/#exclusion-filters