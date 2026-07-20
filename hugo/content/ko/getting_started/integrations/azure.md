---
aliases:
- /ko/integrations/guide/azure-manual-setup/
- /ko/integrations/guide/azure-programmatic-management/
description: Azure 앱 등록 통합 옵션을 사용하여 Microsoft Azure를 Datadog에 연결합니다. 메트릭 수집, 로그 포워딩
  및 Agent 설치를 구성합니다.
further_reading:
- link: https://www.datadoghq.com/blog/azure-integration-onboarding/
  tag: 블로그
  text: 가이드 온보딩을 통해 Azure 통합 설정을 가속화합니다.
- link: https://docs.datadoghq.com/integrations/azure/#overview
  tag: 설명서
  text: Microsoft Azure 통합
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: 가이드
  text: 클라우드 인스턴스에 Datadog Agent를 설치해야 하는 이유
title: Azure 시작
---
## 개요 {#overview}

Datadog은 Azure 통합을 위한 여러 구성 옵션을 제공합니다. 이 가이드는 Azure를 시작하기 위한 다양한 옵션에 대한 개요를 제공하며, 특정 사용 사례를 다루는 Azure 리소스 및 튜토리얼에 대한 링크를 포함합니다.

## 전제 조건 {#prerequisites}

[Datadog 계정][2]이 없다면 생성하세요.

{{% collapse-content title="통합 설정에 필요한 권한" level="h4" expanded=false id="required-permissions" %}}

### Azure {#in-azure}

Microsoft Entra ID 사용자는 다음 권한이 필요합니다.

#### 앱 등록을 생성할 권한 {#permission-to-create-an-app-registration}

**사용자가 다음 중 하나**의 조건을 충족해야 합니다.

- `Users can register applications` 옵션이 `Yes`로 설정되었습니다.
- 사용자가 [애플리케이션 개발자][38] 역할을 보유합니다.

##### 구독 내의 관리자 역할 {#admin-roles-within-your-subscriptions}

모니터링하려는 구독 내에서 다음 중 하나를 보유해야 합니다.

- {{< ui >}}Owner{{< /ui >}} 역할
- {{< ui >}}Contributor{{< /ui >}} 및 {{< ui >}}User Access Admin{{< /ui >}} 역할 모두

#### Graph API 권한에 대한 추가 및 동의 권한 {#permission-to-add-and-grant-consent-for-graph-api-permissions}

[권한 있는 역할 관리자 역할][25]에는 필요한 권한이 포함되어 있습니다.

### Datadog {#in-datadog}

`Datadog Admin Role`, 또는 `azure_configurations_manage` 권한이 있는 다른 역할입니다.

{{% /collapse-content %}}

{{< site-region region="us3" >}}

<div class="alert alert-danger"><a href="https://docs.datadoghq.com/cloud_cost_management/setup/azure/?tab=billingaccounts&site=us3#overview">Cloud Cost Management</a> 및 <a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">로그 아카이브</a>의 경우 앱 등록 설정 방법이 필요합니다. Azure 네이티브 통합을 사용하는 Datadog 계정의 경우, 이 페이지의 설정 단계를 따라 앱 등록을 생성하세요. 구독이 두 방법 모두를 통해 연결된 경우, Azure 통합 타일에 중복 경고가 표시됩니다. 이 경고는 Cloud Cost Management 및 로그 아카이브의 경우 안전하게 무시할 수 있습니다.
</div>

{{< /site-region >}}


## 설정 {#setup}

이 페이지의 지침을 따라 모든 Datadog 사이트에서 사용할 수 있는 앱 등록을 통해 {{< ui >}}Azure integration{{< /ui >}}을 설정하세요.

{{< img src="/getting_started/integrations/azure/GSwAzure_siteSelector.mp4" alt="US3 사이트의 사이트 선택기" video=true >}}

{{% collapse-content title="빠른 시작(권장)" level="h4" expanded=false id="quickstart-setup" %}}

### 다음에 해당하는 경우 빠른 시작 설정 방법 선택 {#choose-the-quickstart-setup-method-if}

- Datadog을 처음 설정합니다.
- UI 기반 워크플로를 선호하고 필요한 모니터링 권한으로 서비스 주체를 생성하는 데 걸리는 시간을 최소화하고자 합니다.
- 스크립트나 CI/CD 파이프라인에서 설정 단계를 자동화하고자 합니다.

### 지침 {#instructions}

1. Azure 통합 타일에서 {{< ui >}}+ Add New App registration{{< /ui >}}을 클릭한 다음 {{< ui >}}Quickstart{{< /ui >}}을 선택합니다.
2. 설정 스크립트를 복사하고 Azure 클라우드 셸에서 실행합니다.
3. Datadog UI로 돌아갑니다. 설정 스크립트 오른쪽 상단에서 {{< ui >}}CONNECTED{{< /ui >}}를 확인합니다.
4. 데이터를 수집할 구독 및 관리 그룹을 선택합니다.
5. 필요 시, 메트릭 수집 토글을 클릭하여 Azure에서 모든 메트릭 수집을 비활성화할 수 있습니다. {{< ui >}}Advanced Configuration{{< /ui >}}드롭다운을 확장하여 메트릭을 필터링할 수도 있습니다.
   - 리소스 공급자
   - 태그
   - 호스트
   - 앱 서비스 플랜
   - 컨테이너 앱

또한 옵션을 클릭하여 [Azure Application Insights][36]에서 사용자 정의 메트릭 수집을 활성화하고, 사용량 메트릭 수집을 비활성화할 수 있습니다.

6. 필요 시, 리소스 수집 토글을 클릭하여 Azure 리소스의 구성 정보 수집을 비활성화할 수 있습니다.
7. 로그 수집을 활성화하여 로그를 Datadog으로 전달하는 데 필요한 서비스 및 진단 설정을 설정 및 구성합니다.
   1. 테넌트에 이미 로그 포워더가 존재하는 경우, 그 범위를 확장하도록 수정됩니다. 변경된 설정은 기존 및 새로 선택된 구독 또는 관리 그룹에 적용됩니다.
   2. 새 로그 포워더를 생성하는 경우
      1. 로그 포워더 컨트롤 플레인을 저장할 리소스 그룹 이름을 입력합니다.
      2. 로그 포워딩 오케스트레이션(LFO)을 위한 컨트롤 플레인 구독을 선택합니다.
      3. 컨트롤 플레인을 위한 리전을 선택합니다.<br>
   **참고**: 리소스 그룹 이름, 컨트롤 플레인 구독 및 리전 필드는 새 로그 포워더를 생성할 때만 표시됩니다.
   3. 필요 시, {{< ui >}}Log filtering options{{< /ui >}}를 열어 태그별로 로그를 필터링하거나, 정규식을 사용하여 특정 정보(예: PII)를 필터링할 수 있습니다.

   이 아키텍처에 대한 자세한 정보는 자동 로그 포워딩 가이드의 [아키텍처 섹션][34]을 참조하세요.

8. {{< ui >}}Confirm{{< /ui >}}을 클릭해 설정을 마칩니다.

{{% /collapse-content %}}

{{% collapse-content title="Terraform" expanded=false level="h4" id="terraform-setup" %}}

### 다음에 해당하는 경우 Terraform 설정 방법 선택 {#choose-the-terraform-setup-method-if}

- 코드형 인프라스트럭처를 관리하고 Datadog Azure 통합에 대한 버전 관리를 유지하려는 경우
- 재사용 가능한 공급자 블록으로 여러 테넌트 또는 구독을 일관되게 구성해야 하는 경우
- Terraform 관리 환경에 적합한 반복 가능하고 감사 가능한 배포 프로세스를 원하는 경우

### 지침 {#instructions-1}

다음 단계에 따라 [Terraform][23]을 통해 Datadog Azure 통합을 배포하세요.

{{< tabs >}}
{{% tab "앱 등록 생성" %}}

1. [Azure 통합 타일][100]에서 {{< ui >}}+ Add New App registration{{< /ui >}}을 클릭한 다음 {{< ui >}}Terraform{{< /ui >}}을 선택합니다.
2. 데이터를 수집할 구독 및 관리 그룹을 선택합니다.
3. 필요 시, 메트릭 수집 토글을 클릭하여 Azure에서 모든 메트릭 수집을 비활성화할 수 있습니다. {{< ui >}}Advanced Configuration{{< /ui >}}드롭다운을 확장하여 메트릭을 필터링할 수도 있습니다.
   - 리소스 공급자
   - 태그
   - 호스트
   - 앱 서비스 플랜
   - 컨테이너 앱

   또한 옵션을 클릭하여 [Azure Application Insights][101]에서 사용자 정의 메트릭 수집을 활성화하고, 사용량 메트릭 수집을 비활성화할 수 있습니다.
4. 필요 시, 리소스 수집 토글을 클릭하여 Azure 리소스의 구성 정보 수집을 비활성화할 수 있습니다.
5. 다음과 같이 로그 수집을 구성합니다.
   - 테넌트에 이미 로그 포워더가 존재하는 경우, 새로운 구독 또는 관리 그룹을 포함하도록 범위를 확장합니다.
   - 새 로그 포워더를 생성하는 경우
     1. 로그 포워더 컨트롤 플레인을 저장할 리소스 그룹 이름을 입력합니다.
     1. 로그 포워딩 오케스트레이션(LFO)을 위한 컨트롤 플레인 구독을 선택합니다.
     1. 컨트롤 플레인을 위한 리전을 선택합니다.

   이 아키텍처에 대한 자세한 정보는 자동 로그 포워딩 가이드의 [아키텍처 섹션][102]을 참조하세요.
6. {{< ui >}}Initialize and apply the Terraform{{< /ui >}} 아래의 명령을 복사하여 실행합니다.

[100]: https://app.datadoghq.com/integrations/azure/
[101]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
[102]: /ko/logs/guide/azure-automated-log-forwarding/#architecture
{{% /tab %}}

{{% tab "기존 앱 등록 사용" %}}



- 이미 제공된 범위(구독 또는 관리 그룹)를 모니터링하기 위해 Datadog의 {{< ui >}}Monitoring Reader{{< /ui >}} 역할로 구성된 앱 등록이 있으며, 새로운 리소스를 생성하고 싶지 않은 경우입니다.

1. Terraform 구성을 통해 Datadog API와 상호 작용할 수 있도록 [Datadog Terraform 공급자][200]를 구성합니다.
2. 아래 예시를 기본 템플릿으로 사용하여 Terraform 구성 파일을 설정합니다. 변경 사항을 적용하기 전에 다음의 파라미터를 업데이트해야 합니다.
    * `tenant_name`: 귀하의 Azure Active Directory ID입니다.
    * `client_id`: 귀하의 Azure 애플리케이션(클라이언트) ID입니다.
    * `client_secret`: 귀하의 Azure 웹 애플리케이션 보안 키입니다.

   더 많은 예시 사용법과 옵션 파라미터의 전체 목록 및 추가 Datadog 리소스를 확인하려면 Terraform 레지스트리의 [Datadog Azure 통합 리소스][201] 페이지를 참조하세요.

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "datadog_integration_azure" "sandbox" {
  tenant_name   = "<AZURE_TENANT_NAME>"
  client_id     = "<AZURE_CLIENT_ID>"
  client_secret = "<AZURE_CLIENT_SECRET_KEY>"
}

{{< /code-block >}}

3. `terraform apply`을 실행합니다. 데이터 수집 시작까지 최대 10분간 기다린 후, 기본 제공 Azure 개요 대시보드에서 Azure 리소스가 전송한 메트릭을 확인합니다.

[200]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[201]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_azure
{{% /tab %}}
{{< /tabs >}}

#### 여러 구독 또는 테넌트 관리 {#managing-multiple-subscriptions-or-tenants}

여러 구독 또는 테넌트에서 별칭이 있는 다양한 공급자 블록을 사용하여 Terraform 리소스를 관리할 수 있습니다. 자세한 내용을 확인하려면 [공급자 설정][22]을 참조하세요.

### 통합 상태 모니터링 {#monitor-the-integration-status}

통합이 구성된 후, Datadog은 Azure 환경에서 중요한 모니터링 데이터를 수집하기 위해 Azure API에 대한 연속적인 호출을 실행합니다. 해당 호출은 때로 오류를 반환합니다(예: 제공된 자격 증명이 만료된 경우). 이러한 오류는 모니터링 데이터를 수집하는 Datadog의 기능을 방해하거나 차단할 수 있습니다.

중요한 오류가 발생하면 Azure 통합은 Datadog Event Explorer에서 이벤트를 생성하고 이를 5분마다 다시 게시합니다. 이러한 이벤트가 감지되면 이벤트 모니터링을 트리거하여 해당 팀에 알리도록 이벤트 모니터링을 구성할 수 있습니다.

Datadog은 시작하는 데 도움이 되는 모니터링 템플릿을 제공합니다. 모니터링 템플릿을 사용하려면 다음 단계를 따르세요.

1. Datadog에서 {{< ui >}}Monitors{{< /ui >}}로 이동하여 {{< ui >}}Browse Templates{{< /ui >}} 버튼을 클릭합니다.
2. [[Azure] 통합 오류][26]라는 제목의 모니터링 템플릿을 검색하고 선택합니다.
3. 검색 쿼리 또는 경보 조건을 원하는 대로 수정합니다. 기본적으로 모니터링은 새로운 오류가 감지될 때마다 트리거되며 지난 15분간 오류가 감지되지 않으면 해제됩니다.
4. 원하는 대로 알림 및 다시 알림 메시지를 업데이트합니다. 이벤트 자체에는 해당 이벤트 관련 정보가 포함되어 있으며, 이는 알림에 자동으로 포함됩니다. 범위, 오류 응답, 일반적인 해결 단계에 대한 자세한 정보가 여기에 포함되어 있습니다.
5. 선호하는 채널(이메일, Slack, PagerDuty 등)을 통해 [알림을 구성][27]하여 Azure 데이터 수집에 영향을 미치는 문제에 대해 팀에 알려주세요.

{{% /collapse-content %}}

{{% collapse-content title="기존 앱 등록 사용" level="h4" expanded=false id="existing-app-registration-setup" %}}

### 다음에 해당하는 경우 기존 앱 등록 설정 방법 선택 {#choose-the-existing-app-registration-setup-method-if}

- 이미 제공된 범위(구독 또는 관리 그룹)를 모니터링하기 위해 Datadog의 {{< ui >}}Monitoring Reader{{< /ui >}} 역할로 구성된 앱 등록이 있으며, 새로운 리소스를 생성하고 싶지 않은 경우입니다.

Datadog을 위한 앱 등록을 설정해야 하는 경우, [빠른 시작](#quickstart-setup) 또는 [Terraform](#terraform-setup) 설정 방법을 참조하세요.

### 지침 {#instructions-2}

1. [Datadog Azure 통합 타일][20]에서 {{< ui >}}Add Existing{{< /ui >}}을 선택합니다.
2. {{< ui >}}Tenant ID{{< /ui >}}필드에 디렉토리(테넌트) ID를 붙여넣습니다.
3. {{< ui >}}Client ID{{< /ui >}}필드에 애플리케이션(클라이언트) ID를 붙여넣습니다.
4. {{< ui >}}Client Secret Value{{< /ui >}}필드에 앱 등록의 클라이언트 암호를 붙여넣습니다.
5. 필요 시, {{< ui >}}Monitor Automuting{{< /ui >}} 토글을 클릭해 모니터링 자동 해제를 비활성화하합니다.
6. 필요 시, 메트릭 수집 토글을 클릭하여 Azure에서 모든 메트릭 수집을 비활성화할 수 있습니다. {{< ui >}}Advanced Configuration{{< /ui >}}드롭다운을 확장하여 메트릭을 필터링할 수도 있습니다.
   - 리소스 공급자
   - 태그
   - 호스트
   - 앱 서비스 플랜
   - 컨테이너 앱

또한 옵션을 클릭하여 [Azure Application Insights][36]에서 사용자 정의 메트릭 수집을 활성화하고, 사용량 메트릭 수집을 비활성화할 수 있습니다.

6. 필요 시, 리소스 수집 토글을 클릭하여 Azure 리소스의 구성 정보 수집을 비활성화할 수 있습니다.
7. {{< ui >}}Create Configuration{{< /ui >}}을 클릭합니다.

{{% /collapse-content %}}

## 메트릭 수집 {#metric-collection}

Datadog의 Azure 통합은 [Azure Monitor][8]에서 모든 메트릭을 수집하도록 설계되었습니다. [통합 페이지][9]에는 특정 Azure 서비스에 대한 추가 기본 제공 대시보드 및 모니터링을 제공하는 미리 정의된 하위 통합 목록이 나와 있습니다. 이러한 통합 중 많은 부분은 Datadog이 Azure 계정에서 들어오는 데이터를 인식할 때 기본적으로 설치됩니다. 그러나 Datadog은 전용 하위 통합 타일이 없더라도 **Azure Monitor 지원 리소스**에서 메트릭을 수집할 수 있습니다.

Azure 메트릭은 Datadog 플랫폼의 메트릭 요약 페이지에서 `Metrics > Summary`로 이동하고 `Azure`를 검색하여 찾을 수 있습니다.

{{< img src="/getting_started/integrations/azure/GSwAzure_metricExplorer.png" alt="메트릭 요약 이미지" style="width:100%;" >}}

###  메트릭 {#resource-tag-filtering-for-metrics}에 대한 리소스 태그 필터링

태그 필터를 사용하여 Datadog에서 메트릭을 수집할 Azure 리소스를 관리하세요. [Azure 통합 타일][20]의 {{< ui >}}Configuration{{< /ui >}} 탭에서 태그 필터를 구성할 수 있습니다. 태그 필터는 `key:value` 형식의 태그를 쉼표로 구분한 목록입니다. 필터의 태그 중 하나 이상과 일치하는 리소스만 메트릭이 수집됩니다.

태그 필터에서 다음과 같은 와일드카드를 사용할 수 있습니다.
- `?` - 단일 문자를 일치시킵니다.
- `*` - 여러 문자를 일치시킵니다.

주어진 태그가 있는 리소스를 제외하려면 태그 앞에 `!`를 붙이세요. 제외는 포함보다 우선합니다. 목록의 태그 중 하나와 리소스가 일치하는 경우에는 필터와 매칭됩니다.

예: `datadog:monitored,env:production,!plan_tier:basic,instance-type:c1.*`

이 필터는 `datadog:monitored` 또는 `env:production`으로 태그가 지정된 리소스에서 메트릭을 수집하고, `plan_tier:basic`으로 태그가 지정된 리소스는 제외하며, `instance-type` 태그가 `c1.*`과 일치하는 리소스를 포함합니다.

태그 필터가 설정되지 않은 경우, Datadog은 모든 Azure 리소스의 메트릭을 수집합니다.

## 로그 수집 활성화 {#enable-log-collection}

자동 로그 포워딩 기능을 사용하여 로그를 Datadog으로 포워딩하는 데 필요한 서비스 및 진단 설정을 설정하고 구성할 수 있습니다. 테넌트에 자동 로그 포워딩 컨트롤 플레인이 이미 존재하는 경우, 이 흐름은 이를 수정하고 선택한 구독 또는 관리 그룹을 포함하도록 범위를 확장합니다. 자세한 내용은 [Azure 자동 로그 포워딩 설정][19]을 참조하세요.

Datadog은 Agent 또는 DaemonSet를 사용하여 Azure에서 로그를 전송할 것을 권장합니다. 직접 스트리밍이 불가능한 경우, [Azure 통합][20]의 {{< ui >}}Configure Log Forwarding{{< /ui >}} 흐름을 사용하여 Datadog에서 자동 로그 포워딩을 직접 설정하고 관리하세요. [Azure Resource Manager(ARM) 템플릿][19]을 사용하여 로그 포워딩을 배포할 수도 있습니다. 두 방법 모두 로그 포워딩 서비스를 자동으로 관리하고 확장합니다.

{{% collapse-content title="자동화됨(권장)" level="h4" expanded=false id="automated-log-forwarding-setup" %}}

### 다음에 해당하는 경우 자동 로그 포워딩 설정 선택 {#choose-the-automated-log-forwarding-setup-method-if}

- [빠른 시작 설정 방법](#azure-quickstart-setup)을 통해 로그를 미리 설정하지 않은 경우
- UI 기반 워크플로를 선호하고 필요한 모니터링 권한으로 서비스 주체를 생성하는 데 걸리는 시간을 최소화하고자 합니다.
- 스크립트나 CI/CD 파이프라인에서 설정 단계를 자동화하고자 합니다.

### 지침 {#instructions-3}

#### 로그 포워딩 구성(권장) {#configure-log-forwarding-recommended}

{{< ui >}}Configure Log Forwarding{{< /ui >}} 흐름을 사용하여 Datadog에서 새로운 로그 포워더를 설정하거나 기존 로그 포워더를 관리하세요.

1. Datadog에서 [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Azure{{< /ui >}}][20]로 이동합니다.
1. {{< ui >}}Configure Log Forwarding{{< /ui >}}을 클릭합니다.
1. 제공된 명령을 복사하여 Azure Cloud Shell에 붙여넣습니다.
1. 로그를 포워딩할 구독을 선택합니다.
1. 필요 시, 로그 필터를 추가하거나 제거합니다.
1. {{< ui >}}Confirm{{< /ui >}}을 클릭합니다.

자세한 내용은 [Azure 자동 로그 포워딩 설정][19]을 참조하세요.

#### ARM 템플릿 {#arm-template}

또는 Azure Resource Manager(ARM) 템플릿을 사용하여 로그 포워딩을 배포할 수도 있습니다.

1. Azure에서 [자동 로그 포워딩 ARM 템플릿][29]을 엽니다.
1. Azure 프로젝트 및 인스턴스 세부정보를 [기본 탭][30]에서 구성합니다.
1. [Datadog 구성 탭][31]에서 Datadog 자격 증명을 입력합니다.
1. [배포 탭][32]에서 배포 경고를 확인합니다.
1. [검토 + 생성 탭][33]에서 배포 프로세스를 시작합니다.

{{< site-region region="us3" >}}

<div class="alert alert-danger"><a href="https://docs.datadoghq.com/logs/log_configuration/archives/?tab=azurestorage">로그 아카이브</a>의 경우 앱 등록 설정 방법이 필요합니다. Azure 네이티브 통합을 사용하는 Datadog 계정의 경우, 이 페이지의 단계를 따라 앱 등록을 생성하세요.
</div>

{{< /site-region >}}

자세한 내용은 [Azure 자동 로그 포워딩 아키텍처][34]를 참조하세요.

{{% /collapse-content %}}

{{% collapse-content title="컨테이너 앱" level="h4" expanded=false id="container-app-log-forwarding-setup" %}}

### 다음에 해당하는 경우 컨테이너 앱 로그 포워딩 방법 선택 {#choose-the-container-app-log-forwarding-method-if}

- 로그를 포워딩하려는 리소스에서 [진단 설정][53]을 수동으로 구성하는 것을 선호하는 경우

## 지침 {#instructions-4}

1. 아래의 버튼을 클릭하고 Azure 포털에서 양식을 작성합니다. Datadog은 Datadog 계정으로 로그를 포워딩하는 데 필요한 Azure 리소스를 자동으로 배포합니다.

   [![Azure로 배포](https://aka.ms/deploytoazurebutton)][52]

2. 템플릿 배포가 완료된 후, 각 로그 소스에 대해 [진단 설정][53]을 구성하여 Azure 플랫폼 로그(리소스 로그 포함)를 배포 중에 생성된 스토리지 계정으로 전송합니다.

**참고**: 리소스는 동일한 Azure 리전의 스토리지 계정으로만 스트리밍할 수 있습니다.

{{% /collapse-content %}}

{{% azure-log-archiving %}}

### 로그에 대한 리소스 태그 필터링 {#resource-tag-filtering-for-logs}

태그 필터를 사용하여 Datadog으로 로그를 포워딩할 Azure 리소스를 관리하세요. 로그에 대한 태그 필터를 구성하려면 [Azure 통합 타일][20]에서 {{< ui >}}Configure Log Forwarding{{< /ui >}}을 클릭하고 흐름을 따르세요. 태그 필터는 `key:value` 형식의 태그를 쉼표로 구분한 목록입니다. 필터의 태그 중 하나 이상과 일치하는 리소스만 로그가 포워딩됩니다.

태그 필터에서 다음과 같은 와일드카드를 사용할 수 있습니다.
- `?` - 단일 문자를 일치시킵니다.
- `*` - 여러 문자를 일치시킵니다.

주어진 태그가 있는 리소스를 제외하려면 태그 앞에 `!`를 붙이세요. 제외는 포함보다 우선합니다. 목록의 태그 중 하나와 리소스가 일치하는 경우에는 필터와 매칭됩니다.

예: `datadog:monitored,env:production,!plan_tier:basic,instance-type:c1.*`

이 필터는 `datadog:monitored` 또는 `env:production`으로 태그된 리소스에서 로그를 포워딩하고, `plan_tier:basic`으로 태그된 리소스는 제외하며, `c1.*`과 일치하는 `instance-type` 태그가 있는 리소스를 포함합니다.

태그 필터가 설정되지 않은 경우, Datadog은 모든 Azure 리소스의 로그를 포워딩합니다.

## Datadog 플랫폼에서 더 많은 것을 얻으세요 {#get-more-from-the-datadog-platform}

### 애플리케이션에 대한 더 나은 가시성을 위해 Agent 설치 {#install-the-agent-for-greater-visibility-into-your-application}

Azure 통합을 설정한 후, Datadog 크롤러가 자동으로 Azure 메트릭을 수집하지만 [Datadog Agent][1]를 사용하면 Azure 인스턴스에 대한 더 나은 가시성을 확보할 수 있습니다. 환경에 Datadog Agent를 설치하면 다음을 포함하되 이에 국한되지 않는 추가 데이터를 수집할 수 있습니다.
- **애플리케이션 상태**
- **프로세스 활용률**
- **시스템 수준 메트릭**

내장된 StatsD 클라이언트를 사용하여 애플리케이션에서 사용자 정의 메트릭을 전송하고 애플리케이션, 사용자 및 시스템의 상황을 상호 연결할 수도 있습니다. [_클라우드 인스턴스에 Datadog Agent를 설치해야 하는 이유_][15]의 가이드를 참조하여 인스턴스에 Datadog Agent를 설치하는 경우의 이점에 대해 자세히 알아보세요.

Azure 확장 프로그램을 사용하여 Windows VM, Linux x64 VM 및 Linux ARM 기반 VM에 Datadog Agent를 설치하세요. AKS 클러스터 확장 프로그램을 사용하여 Agent를 AKS 클러스터에 배포할 수도 있습니다.

{{< tabs >}}
{{% tab "VM 확장 프로그램" %}}

1. [Azure 포털][4]에서 적절한 VM을 선택합니다.
2. 왼쪽 사이드바에서 {{< ui >}}Settings{{< /ui >}} 아래의 {{< ui >}}Extensions + applications{{< /ui >}}를 선택합니다.
3. {{< ui >}}+ Add{{< /ui >}}를 클릭합니다.
4. {{< ui >}}Datadog Agent{{< /ui >}} 확장 프로그램을 검색하여 선택합니다.
5. {{< ui >}}Next{{< /ui >}}를 클릭합니다.
6. [Datadog API 키][2]와 [Datadog 사이트][1]를 입력하고 {{< ui >}}OK{{< /ui >}}를 클릭합니다.

운영 체제 또는 CI 및 CD 도구에 따라 Agent를 설치하려면 [Datadog Agent 설치 지침][3]을 참조하세요.

**참고**: Azure 확장을 사용하여 Datadog Agent를 설치할 때 도메인 컨트롤러는 지원되지 않습니다.

[1]: /ko/getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://portal.azure.com
{{% /tab %}}

{{% tab "AKS 클러스터 확장 프로그램" %}}

Datadog AKS 클러스터 확장 프로그램으로 복잡한 타사 관리 툴을 사용하지 않고도 Azure AKS 내에서 Datadog Agent를 기본 배포할 수 있습니다. AKS 클러스터 확장 프로그램을 사용하여 Datadog Agent를 설치하려면 다음 단계를 따르세요.

1. Azure 포털에서 AKS 클러스터로 이동합니다.
2. AKS 클러스터의 왼쪽 사이드바에서 {{< ui >}}Extensions + applications{{< /ui >}} 아래의 {{< ui >}}Settings{{< /ui >}}를 선택합니다.
3. {{< ui >}}Datadog AKS Cluster Extension{{< /ui >}}를 검색하여 선택합니다.
4. {{< ui >}}Create{{< /ui >}}을 클릭하고 [Datadog 자격 증명][1] 및 [Datadog 사이트][2]를 사용하는 타일의 지침을 따릅니다.

[1]: /ko/account_management/api-app-keys/
[2]: /ko/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## 문제 해결 {#troubleshooting}

Azure 고급 구성 가이드의 [문제 해결][16]을 참조하세요.

도움이 더 필요하신가요? [Datadog 지원팀][17]에 문의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/agent/
[2]: https://www.datadoghq.com/
[5]: https://learn.microsoft.com/azure/event-hubs/event-hubs-create
[8]: https://learn.microsoft.com/azure/azure-monitor/reference/supported-metrics/metrics-index
[9]: /ko/integrations/#cat-azure
[15]: /ko/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[16]: /ko/integrations/guide/azure-advanced-configuration/#azure-integration-troubleshooting
[17]: /ko/help/
[19]: /ko/logs/guide/azure-automated-log-forwarding/
[20]: https://app.datadoghq.com/integrations/azure
[21]: https://learn.microsoft.com/cli/azure/ad/sp?view=azure-cli-latest
[22]: https://developer.hashicorp.com/terraform/language/providers/configuration
[23]: https://www.terraform.io
[25]: https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#privileged-role-administrator
[26]: https://app.datadoghq.com/monitors/templates?q=Azure%20%22integration%20errors%22&origination=all&p=1
[27]: /ko/monitors/notify/#configure-notifications-and-automations
[28]: /ko/integrations/guide/azure-advanced-configuration/#enable-diagnostics
[29]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fazuredeploy.json/createUIDefinitionUri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2FcreateUiDefinition.json
[30]: /ko/logs/guide/azure-automated-log-forwarding/#basics
[31]: /ko/logs/guide/azure-automated-log-forwarding/#datadog-configuration
[32]: /ko/logs/guide/azure-automated-log-forwarding/#deployment
[33]: /ko/logs/guide/azure-automated-log-forwarding/#review--create
[34]: /ko/logs/guide/azure-automated-log-forwarding/#architecture
[35]: /ko/integrations/guide/azure-advanced-configuration/#automated-log-collection
[36]: https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview
[38]: https://learn.microsoft.com/entra/identity/role-based-access-control/permissions-reference#application-developer
[39]: https://azure.microsoft.com/services/storage/blobs/
[40]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal
[41]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-storage-explorer
[42]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-cli
[43]: https://docs.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-powershell
[44]: https://learn.microsoft.com/training/modules/store-app-data-with-azure-blob-storage/
[45]: https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Web%2Fsites/kind/functionapp
[46]: https://learn.microsoft.com/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cextensionv5&pivots=programming-language-csharp
[47]: https://learn.microsoft.com/azure/storage/common/storage-configure-connection-string#configure-a-connection-string-for-an-azure-storage-account
[48]: https://learn.microsoft.com/azure/azure-functions/functions-get-started
[49]: https://github.com/DataDog/datadog-serverless-functions/blob/master/azure/blobs_logs_monitoring/index.js
[51]: https://app.datadoghq.com/logs
[52]: https://portal.azure.com/#create/Microsoft.Template/uri/CustomDeploymentBlade/uri/https%3A%2F%2Fraw.githubusercontent.com%2FDataDog%2Fintegrations-management%2Fmain%2Fazure%2Flogging_install%2Fdist%2Fforwarder.json
[53]: https://learn.microsoft.com/azure/azure-monitor/platform/diagnostic-settings