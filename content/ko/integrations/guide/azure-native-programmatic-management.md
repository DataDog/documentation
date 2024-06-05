---
description: Datadog와 Azure 네이티브 통합을 위한 프로그램 관리 단계
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/
  tag: 설명서
  text: Azure 통합
- link: https://docs.datadoghq.com/integrations/guide/azure-portal
  tag: 설명서
  text: Azure Native 통합 관리
kind: guide
title: Azure 네이티브 통합을 위한 프로그램 관리 가이드
---

{{< site-region region="us3" >}}

## 개요

Azure 네이티브 통합은 Azure에 있는 Datadog 리소스를 사용하여 Azure 환경을 위한 관리 및 데이터 수집을 간소화합니다. Datadog에서는 가능한 한 이 방법을 사용할 것을 권장합니다. 이 방법은 [azurerm_datadog_monitor][3] 리소스를 생성하고 [모니터링 읽기 권한자 역할][4]을 할당해 Datadog 조직에 Azure 구독을 연결하는 것을 포함합니다. 이 작업은 메트릭 수집과 로그 전달을 위한 이벤트 허브 설정을 위해 앱 등록 자격 증명 프로세스를 대체합니다.

## 설정

**참고**: Azure 네이티브 통합을 설정하려면, 연결하려는 Azure 구독의 소유자이자 구독을 연결하려는 Datadog 조직의 관리자여야 합니다.

### Terraform

1. [Terraform Azure 공급자][1]를 설정하였는지 확인합니다.

2. 아래 템플릿을 사용하여 `azurerm_datadog_monitor` 리소스를 생성하고 Terraform을 사용하여 `Monitoring Reader` 역할 할당을 수행합니다.

#### Azure Datadog 모니터링 리소스

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "azurerm_resource_group" "example" {
  name     = "<NAME>"
  location = "<AZURE_REGION>"
}
resource "azurerm_datadog_monitor" "example" {
  name                = "<NAME>"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  datadog_organization {
    api_key         = "<DATADOG_API_KEY>"
    application_key = "<DATADOG_APPLICATION_KEY>"
  }
  user {
    name  = "<NAME>"
    email = "<EMAIL>"
  }
  sku_name = "Linked"
  identity {
    type = "SystemAssigned"
  }
}

{{< /code-block >}}

#### 모니터링 읽기 권한자 역할

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

data "azurerm_subscription" "primary" {}

data "azurerm_role_definition" "monitoring_reader" {
  name = "Monitoring Reader"
}

resource "azurerm_role_assignment" "example" {
  scope              = data.azurerm_subscription.primary.id
  role_definition_id = data.azurerm_role_definition.monitoring_reader.role_definition_id
  principal_id       = azurerm_datadog_monitor.example.identity.0.principal_id
}

{{< /code-block >}}

3. `terraform apply`를 실행합니다.

## 로그 수집

Datadog 리소스가 Azure 계정에서 설정되면 Azure 포털을 통한 로그 수집을 설정합니다. 자세한 정보는 Azure 설명서의 [메트릭 및 로그 수집][5]을 참조하세요.

[1]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs
[2]: /ko/integrations/guide/azure-portal/
[3]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors
[4]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/datadog_monitors#role-assignment
[5]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/create#configure-metrics-and-logs
{{< /site-region >}}

{{< site-region region="us,us5,eu,ap1,gov" >}}

<div class="alert alert-info">Azure 네이티브 통합은 Datadog US3 사이트에 있는 조직에서만 사용할 수 있습니다. 다른 <a href="https://docs.datadoghq.com/getting_started/site/" target="_blank">Datadog 사이트</a>를 사용하는 경우, 표준 <a href="https://docs.datadoghq.com/integrations/guide/azure-programmatic-management/" target="_blank">Azure 프로그램 관리 가이드</a>를 참조하세요. Datadog US3 사이트를 사용하는 경우, 이 페이지의 오른쪽에서 <a href="?site=us3" target="_blank">사이트 선택기 변경</a>을 클릭하세요.</div>

{{< /site-region >}}

{{< partial name="whats-next/whats-next.html" >}}