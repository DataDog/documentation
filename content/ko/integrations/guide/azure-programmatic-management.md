---
description: Datadog과 Azure 통합을 위한 프로그래밍 관리 단계
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/
  tag: 설명서
  text: Azure 통합
kind: 지침
title: Azure 통합 프로그래밍 관리 지침
---

## 개요

 본 지침에서는 Datadog 에이전트 VM 확장 등의 다른 Azure 리소스를 사용하여  Datadog과 Azure 통합을 프로그래밍 방식으로 관리하는 방법을 설명합니다. 해당 방법으로 여러 계정의 옵저빌리티를 한 번에 관리할 수 있습니다.

**모든 사이트**: 모든 [Datadog 사이트][3]에서 본 페이지의 단계에 따라 Azure 메트릭 수집용 앱 등록 자격 증명 프로세스 및 Azure 플랫폼 로그 전송용 이벤트 허브 설정을 완료할 수 있습니다.

**US3:** 조직이 Datadog US3 사이트를 사용한다면 Azure Native 통합으로 Azure 환경 관리 및 데이터 수집을 간소화해 보세요. Datadog은 가능한 이 방법을 사용할 것을 권장합니다. 본 설정으로 [Azure에서 Datadog 리소스][14]를 생성하여 Azure 구독을 Datadog 조직에 연결합니다. 이러한 방식으로 메트릭 수집용 앱 등록 자격 증명 프로세스 및 로그 전달용 이벤트 허브 설정을 대체할 수 있습니다. 자세한 내용을 확인하려면 [Azure Native 통합 관리 지침][1]을 참조하세요.

## Datadog Azure 통합

표준 Azure 통합은 메트릭 수집을 실행할 용도로 앱 등록 자격 증명 프로세스를 사용하고, Azure 플랫폼 로그를 전송할 목적으로 Azure 이벤트 허브 설정을 사용합니다. Datadog을 Azure 환경과 통합하기 전에 Azure에서 앱 등록을 생성하고, Datadog **모니터링 읽기** 권한으로 이를 설정하여 지정된 범위(구독 또는 관리 그룹)을 모니터링합니다. 앱 등록을 생성하지 않은 경우 [Azure 포털로 통합하기][6] 또는 [Azure CLI로 통합하기][4]의 설정 지침을 참조하세요.

**참고**: Azure에서 앱 등록을 생성할 때 관리 그룹 수준에서 읽기 권한을 할당하여 여러 구독을 모니터링합니다. 또한 관리 그룹의 새 구독도 자동 모니터링할 수 있습니다.

### Terraform

다음 단계에 따라 [Terraform][13]으로 통합을 배포합니다.

1. Terraform 설정을 통해 Datadog API와 상호 작용할 수 있도록 [Datadog Terraform 공급자][15]를 설정합니다.

2. 하단의 예시를 기본 템플릿으로 사용하여 Terraform 구성 파일을 설정합니다. 변경 사항을 적용하기 전에 다음과 같은 파라미터를 업데이트해야 합니다:
    * `tenant_name`: Azure Active Directory ID입니다.
    * `client_id`: Azure 웹 애플리케이션 보안 키입니다.
    * `client_secret`: Azure 웹 애플리케이션 보안 키입니다.

   추가 예제 사용법과 옵션 파라미터의 전체 목록 및 추가 Datadog 리소스를 확인하려면 Terraform 레지스트리의 [Datadog Azure 통합 리소스][17] 페이지를 참조하세요.

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name   = "<AZURE_TENANT_NAME>"
  client_id     = "<AZURE_CLIENT_ID>"
  client_secret = "<AZURE_CLIENT_SECRET_KEY>"
}

{{< /code-block >}}

3. `terraform apply`을 실행합니다. 데이터 수집 시작까지 최대 10분간 기다린 후, 즉시 사용 가능한 AWS 개요 대시보드에서 AWS 리소스가 전송한 메트릭을 확인합니다.

#### 여러 구독 또는 테넌트 관리하기

여러 구독 또는 테넌트에서 별칭이 있는 다양한 공급자 블록을 사용하여 Terraform 리소스를 관리할 수 있습니다. 자세한 내용을 확인하려면 [공급자 설정][9]을 참조하세요.

### 통합 상태 모니터링

통합을 설정하면 Datadog은 Azure API 호출을 연속해서 실행하여 Azure 환경에서 중요한 모니터링 데이터를 수집합니다. 해당 호출은 때로 오류를 반환합니다(예: 제공된 자격 증명이 만료된 경우). 이러한 오류는 모니터링 데이터를 수집하는 Datadog의 기능을 방해하거나 차단할 수 있습니다.

심각한 오류가 발생하면 Azure 통합은 Datadog 이벤트 익스플로러에서 이벤트를 생성하고 5분마다 다시 게시합니다. 이러한 이벤트가 감지되면 이벤트 모니터링을 트리거하여 해당 팀에 알릴 수 있습니다.

Datadog은 시작 시 템플릿으로 사용할 수 있는 권장 모니터링을 제공합니다. 다음에 따라 권장 모니터링을 사용합니다.

1. Datadog에서 **모니터링** -> **신규 모니터링**으로 이동하여 [권장 모니터링][19] 탭을 선택합니다.
2. `[Azure] Integration Errors` 타이틀의 권장 모니터링을 선택합니다.
3. 검색 쿼리 또는 알림 조건을 원하는 대로 수정합니다. 기본적으로 모니터링은 새로운 오류가 감지될 때마다 트리거되며, 지난 15분 간 오류가 감지되지 않으면 해제됩니다.
4. 원하는 대로 알림 및 다시 알림 메시지를 업데이트합니다. 이벤트에는 해당 이벤트에 관한 적절한 정보가 포함되어 있으며, 이는 알림에 자동으로 포함됩니다. 범위, 오류 응답, 일반적인 해결 단계에 대한 자세한 정보가 포함됩니다.
5. 선호하는 채널(이메일, Slack, PagerDuty 등)을 통한 [알림을 설정][20]하여 Azure 데이터 수집에 영향을 미치는 문제에 대해 팀에 알려주세요.

#### 로그 전송

Azure 환경에서 Datadog로 로그 포워딩을 설정하려면 [Azure 로깅 지침][18]을 참조하세요.

## Datadog Azure VM 확장

### Terraform

Terraform을 사용하여 Datadog 에이전트 확장을 생성하고 관리할 수 있습니다. 다음 단계에 따라 에이전트를 단일 머신에 설치하고 설정한 후, 압축된 설정 파일을 블롭 스토리지에 업로드하여 VM 확장 Terraform 블록에서 참조할 수 있도록 합니다.

1. [에이전트를 설치합니다][11].
2. 원하는 [에이전트 설정][12]을 적용합니다.
3. 윈도우즈 서버 2008, Vista 이상 버전인 경우 `%ProgramData%\Datadog` 폴더를 zip 파일로 저장합니다. Linux의 경우 `/etc/datadog-agent` 폴더를 zip 파일로 저장합니다.
4. 파일을 블롭(blob) 스토리지에 업로드합니다.
5. Terraform 블록에서 블롭 스토리지 URL을 참조하여 다음과 같이 VM 확장을 생성합니다.

{{< tabs >}}
{{% tab "Windows" %}}

```
  resource "azurerm_virtual_machine_extension" "example" {
  name                 = "DDAgentExtension"
  virtual_machine_id   = azurerm_virtual_machine.example.id
  publisher            = "Datadog.Agent"
  type                 = "DatadogWindowsAgent"
  type_handler_version = "2.0"
   settings = <<SETTINGS
  {
    "site":"<DATADOG_SITE>"
  }
  SETTINGS
   protected_settings = <<PROTECTED_SETTINGS
  {
    "DATADOG_API_KEY": "<DATADOG_API_KEY>"
  }
  PROTECTED_SETTINGS
```
{{% /tab %}}
{{% tab "Linux" %}}

```
  resource "azurerm_virtual_machine_extension" "example" {
  name                 = "DDAgentExtension"
  virtual_machine_id   = azurerm_virtual_machine.example.id
  publisher            = "Datadog.Agent"
  type                 = "DatadogLinuxAgent"
  type_handler_version = "2.0"
   settings = <<SETTINGS
  {
    "site":"<DATADOG_SITE>"
  }
  SETTINGS
   protected_settings = <<PROTECTED_SETTINGS
  {
    "DATADOG_API_KEY": "<DATADOG_API_KEY>"
  }
  PROTECTED_SETTINGS
```
{{% /tab %}}
{{< /tabs >}}

사용 가능한 인자에 대한 자세한 내용을 확인하려면 Terraform 레지스트리의 [가상 머신 확장 리소스][10]를 참조하세요.

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/ko/integrations/guide/azure-portal/
[2]: https://learn.microsoft.com/en-us/cli/azure/datadog?view=azure-cli-latest
[3]: /ko/getting_started/site/
[4]: /ko/integrations/guide/azure-manual-setup/?tab=azurecli#integrating-through-the-azure-cli
[5]: /ko/integrations/azure/
[6]: /ko/integrations/guide/azure-manual-setup/?tab=azurecli#integrating-through-the-azure-portal
[9]: https://developer.hashicorp.com/terraform/language/providers/configuration
[10]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/virtual_machine_extension
[11]: https://app.datadoghq.com/account/settings/agent/latest
[12]: /ko/agent/guide/agent-configuration-files/?tab=agentv6v7
[13]: https://www.terraform.io
[14]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/overview
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
[18]: /ko/logs/guide/azure-logging-guide
[19]: https://app.datadoghq.com/monitors/recommended
[20]: /ko/monitors/notify/#configure-notifications-and-automations