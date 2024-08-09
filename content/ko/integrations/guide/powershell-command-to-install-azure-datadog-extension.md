---
aliases:
- /ko/integrations/faq/powershell-command-to-install-azure-datadog-extension
further_reading:
- link: https://www.datadoghq.com/blog/migrate-to-azure-with-the-microsoft-cloud-adoption-framework/
  tag: 블로그
  text: Datadog과 Microsoft Cloud Adoption Framework을 활용하여 Azure로 성공적으로 마이그레이션하기
- link: https://www.datadoghq.com/blog/azure-arc-integration/
  tag: 블로그
  text: Datadog을 활용해 Azure Arc 하이브리드 인프라스트럭처 모니터링
title: Azure Datadog 확장 설치 명령
---

## Azure에 설치

Datadog은 Azure 인스턴스에서 에이전트 배포를 지원하는 Azure 확장을 제공합니다.

* [원클릭 Datadog 배포가 가능한 Azure 모니터링 설명][1]
* [Azure Native 통합][2] _US3만 해당_
* [표준 Azure 통합][7] _모든 사이트_

GUI 설치 대신 명령줄을 사용할 수 있습니다.
Azure 인스턴스에서 Datadog 에이전트 확장을 실행하려면 환경에 맞는 명령을 사용합니다. `<SITE_PARAMETER>`를 [Datadog 사이트 페이지][3]의 Datadog 계정 **사이트 파라미터** 값으로 교체하고, `<DATADOG_API_KEY>`를 [Datadog API 키][4]로 교체합니다.

{{< tabs >}}
{{% tab "Windows" %}}

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "5.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

Azure 인스턴스 확장을 설정하는 구문에 대한 자세한 내용은 [Azure 확장 Set-AzVMExtension 설명][1]에서 확인할 수 있습니다.

Azure 확장은 일반 설정과 보안 설정을 모두 허용합니다.

일반 설정에는 다음이 포함됩니다.

| 변수 | 유형 | 설명  |
|----------|------|--------------|
| `site` | 문자열 | 다음과 같이 Datadog 인테이크 사이트를 설정합니다. 예: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | 문자열 | 설치할 에이전트 버전은 다음의 `x.y.z` 또는 `latest` 형식입니다. |
| `agentConfiguration` | URI | (옵션) 에이전트 구성을 zip 파일로 포함하는 Azure 블룹 URL입니다. |
| `agentConfigurationChecksum` | 문자열 | 에이전트 설정 zip 파일의 SHA256 체크섬(checksum)입니다. `agentConfiguration` 지정 시 필수입니다. |

보안 설정에는 다음이 포함됩니다.

| 변수 | 유형 | 설명  |
|----------|------|--------------|
| `api_key`| 문자열 | Datadog API KEY를 설정 파일에 추가하세요. |

**참고**: `agentConfiguration`와 `api_key`을 동시에 지정하면 `agentConfiguration`의 API 키가 우선합니다. 또한 대상 머신에 API 키가 설정되어 있다면 `Set-AzVMExtension`으로 변경할 수 없습니다.

### 설정 URI 지정하기
본 예시에서는 Datadog 에이전트에서 사용할 설정을 지정하는 방법을 알아봅니다.
Datadog 에이전트 설정 URI는 Azure 블롭 스토리지 URI여야 합니다.
Datadog 윈도우즈 에이전트 Azure 확장은 `agentConfiguration` URI가 `.blob.core.windows.net` 도메인에서 제공되는지 확인합니다.
Datataog 에이전트 설정은 `%PROGRAMDATA%\Datadog` 폴더에서 생성해야 합니다.

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "5.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentConfiguration" = "https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip"; "agentConfigurationChecksum" = "<SHA256_CHECKSUM>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

**참고**: Datadog 에이전트가 설치되면 설정은 최신 버전으로 업그레이드할 때만 변경할 수 있습니다.

### 특정 버전의 에이전트 설정
본 예시에서는 설치할 에이전트 버전을 지정하는 방법을 알아봅니다. 기본적으로 Datadog 윈도우즈 에이전트 Azure 확장은 Datadog 에이전트 최신 버전을 설치합니다.

**참고**: 다운그레이드는 지원되지 *않으므로* 현재 대상 머신에 설치된 Datadog 에이전트 버전보다 *하위* 버전을 설치할 수 없습니다. Datadog 에이전트 하위 버전을 설치하려면, 먼저 대상 머신에서 Datadog 윈도우즈 에이전트 Azure 확장을 삭제하여 이전 버전을 삭제합니다. Datadog 윈도우즈 에이전트 Azure 확장을 삭제해도 Datadog 에이전트 설정은 삭제되지 않습니다.

{{< code-block lang="powershell" >}}
Set-AzVMExtension -Name "DatadogAgent" -Publisher "Datadog.Agent" -Type "DatadogWindowsAgent" -TypeHandlerVersion "5.0" -Settings @{"site" = "<SITE_PARAMETER>"; "agentVersion" = "latest"} -ProtectedSettings @{"api_key" = "<DATADOG_API_KEY>"} -DisableAutoUpgradeMinorVersion
{{< /code-block >}}

[1]: https://learn.microsoft.com/en-us/powershell/module/az.compute/set-azvmextension
{{% /tab %}}
{{% tab "Linux" %}}

{{< code-block lang="bash" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}
Azure 인스턴스 확장을 설정하는 구문에 대한 자세한 내용은 [Azure 확장 CLI 참조][1]에서 확인하세요.

Azure 확장은 일반 설정과 보안 설정을 모두 허용합니다.

일반 설정에는 다음이 포함됩니다.

| 변수 | 유형 | 설명  |
|----------|------|--------------|
| `site` | 문자열 | 다음과 같이 Datadog 인테이크 사이트를 설정합니다. 예: `SITE=`{{< region-param key="dd_site" code="true">}} |
| `agentVersion` | 문자열 | `x.y.z` 또는 `latest` 형식을 따라 에이전트 버전을 설치합니다. |
| `agentConfiguration` | URI | (옵션) 에이전트 구성을 zip 파일로 포함하는 Azure 블룹 URI입니다. |
| `agentConfigurationChecksum` | 문자열 | 에이전트 설정 zip 파일의 SHA256 checksum입니다 (`agentConfiguration` 지정 시 필수). |

보안 설정에는 다음이 포함됩니다.

| 변수 | 유형 | 설명  |
|----------|------|--------------|
| `api_key`| 문자열 | Datadog API KEY를 설정 파일에 추가하세요. |

**참고**: `agentConfiguration`와 `api_key`을 동시에 지정하면 `agentConfiguration`의 API 키가 우선합니다. 대상 머신에 API 키가 설정되어 있다면 `api_key` 설정으로 변경할 수 없습니다.

### 설정 URI 지정하기
본 예시에서는 Datadog 에이전트에서 사용할 설정을 지정하는 방법을 알아봅니다.
- Datadog 에이전트 설정 URI는 반드시 Azure 블롭 스토리지 URI여야 합니다.
- Datadog 리눅스 에이전트 Azure 확장은 `agentConfiguration` URI가 `.blob.core.windows.net`에서 제공되는지 확인합니다.
- Datataog 에이전트 설정은 `/etc/datadog-agent/` 폴더에서 생성해야 합니다.

{{< code-block lang="bash" >}}
az vm extension set --publisher "Datadog.Agent" --name "DatadogLinuxAgent" --version 7.0 --settings '{"site":"datadoghq.com", "agentVersion":"latest", "agentConfiguration":"https://<CONFIGURATION_BLOB>.blob.core.windows.net/<FILE_PATH>.zip", "agentConfigurationChecksum":"<SHA256_CHECKSUM>"}' --protected-settings '{"api_key":"<DATADOG_API_KEY>"}' --no-auto-upgrade-minor-version
{{< /code-block >}}


[1]: https://learn.microsoft.com/en-us/cli/azure/vm/extension
{{% /tab %}}
{{< /tabs >}}

## Azure Arc에 설치

[Azure Arc][5] 인스턴스에서 Datadog 에이전트 확장을 실행하려면 환경에 맞는 명령을 사용합니다.

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

Azure `connectedmachine` 확장을 설정하는 구문에 대한 자세한 내용은 [az connectedmachine 확장][6] 페이지에서 확인할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/introducing-azure-monitoring-with-one-click-datadog-deployment
[2]: /ko/integrations/guide/azure-native-manual-setup/#deploy-the-datadog-agent
[3]: /ko/getting_started/site/#access-the-datadog-site
[4]: /ko/account_management/api-app-keys/#api-keys
[5]: /ko/integrations/azure_arc/
[6]: https://learn.microsoft.com/en-us/cli/azure/connectedmachine/extension
[7]: /ko/integrations/guide/azure-manual-setup/#agent-installation