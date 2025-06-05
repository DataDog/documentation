---
description: Datadog Azure 네이티브 통합을 수동으로 설정하는 단계
further_reading:
- link: https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: 설명서
  text: 클라우드 인스턴스에 Datadog Agent를 설치해야 하는 이유
- link: https://docs.datadoghq.com/integrations/guide/azure-portal/
  tag: 설명서
  text: Azure Portal에서의 Datadog
- link: https://www.datadoghq.com/blog/azure-government-monitoring-datadog/
  tag: 블로그
  text: Datadog를 사용한 Azure Government 모니터링
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: 블로그
  text: Datadog으로 Azure 컨테이너 앱 모니터링
- link: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/
  tag: 블로그
  text: Microsoft Azure VM 모니터링 방법
- link: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
  tag: 블로그
  text: Datadog 서버리스 보기를 사용해 Azure App Service 살펴보기
title: Azure 네이티브 통합 수동 설정 가이드
---

{{< site-region region="us3" >}}

## 개요

이 가이드를 사용하여 Azure에서 Datadog 리소스 생성을 통해 Datadog Azure Native 통합을 수동으로 설정하세요.

Datadog 리소스는 Azure 환경의 관리 및 데이터 수집을 간소화합니다. Datadog에서는 가능한 경우 이 방법을 사용할 것을 권장하며 메트릭 수집을 위해 표준 Azure 통합을 이용하고 로그 전달을 위해 이벤트 허브를 설치하는데 사용하는 앱 등록 자격 증명 절차를 대체합니다.

### 사전 필수 조건

#### 필수 권한

Azure Native 연동을 설정하려면 연결하려는 Azure 구독에 **Owner** 역할, 연결하려는 Datadog 조직에 **Admin** 역할이 있어야 합니다. 설정을 시작하기 전에 적절한 액세스 권한이 있는지 확인하세요.

## 설정

Azure 연동 서비스를 설정하려면 Azure에서 Datadog 리소스를 만들어야 합니다. 이러한 리소스는 연결 또는 Datadog 조직과 Azure 구독 간의 링크를 나타냅니다. 하나의 Datadog 리소스를 사용하여 여러 개의 Azure 구독을 Datadog 에 연결할 수 있습니다. 

Azure에서 Datadog 리소스를 만들 때 두 가지 옵션이 있습니다.

1. 기존 Datadog 조직에 연결합니다. 이것이 가장 일반적인 작업입니다. 이를 사용해 Datadog 조직을 아직 연결되지 않은 Azure 구독을 모니터로 설정합니다. 이 작업은 Datadog 청구 플랜에 영향을 주지 않습니다.

2. Datadog 조직을 새로 만듭니다. 이용 횟수가 적은 방법입니다. 아직 Datadog 조직이 없고 Azure Marketplace를 통해 유료 플랜을 시작하려는 경우 이 방법을 사용하세요. 이 흐름에서는 새로운 Datadog 조직을 만들고, 청구 플랜을 선택할 수 있으며, 모니터링을 위해 연결된 Azure 구독을 연결할 수 있습니다.

**참고**: 평가판은 Azure에서 **새 Datadog 조직 만들기** 옵션을 통해 사용할 수 없습니다. 무료 평가판을 시작하려면 먼저 [US3 사이트에서 평가판 Datadog 조직을 만듭니다][1]. 그런 다음 연결 흐름을 사용하여 원하는 구독을 모니터에 추가합니다.

Datadog 리소스를 만들면 연결된 구독의 데이터 수집이 시작됩니다. 이 리소스를 사용하여 Datadog를 설정, 관리 및 배포하는 방법에 관한 자세한 내용은 [Azure 네이티브 통합 관리][2] 가이드를 참조하세요.

### Datadog 리소스 만들기

Azure 구독 모니터링을 시작하려면 [Azure의 Datadog 서비스 페이지][3]로 이동하여 새 Datadog 리소스를 만드는 옵션을 선택합니다:
{< img src="integrations/azure/azure-us3-dd-service.png" alt="Azure US3 Datadog 서비스" responsive="true" style="width:90%;">}}

**Link Azure subscription to an existing Datadog organization** 또는 **Create a new Datadog organization**를 선택합니다. 연결은 많이 이용되는 방법입니다. 아직 연결되지 않은 Azure 구독에 모니터링을 설정하려면 이 방법을 사용하세요. 아직 Datadog 고객이 아니며 새 유료 플랜을 시작하려는 경우에만 **만들기** 플로우를 선택하세요.

{{< img src="integrations/azure/azure-us3-create-dd-resource1.png" alt="Azure US3, 응답 가능한 Datadog 리소스 생성" responsive="true" style="width:90%;">}}

**참고**: Azure 포털을 통해 새로 만든 Datadog 조직은 자동으로 청구가 Azure 인보이스로 통합됩니다. 이 사용량은 해당되는 경우 조직의 [MACC][4]에 포함됩니다.

### SSO 구성

(선택 사항)_: Azure에서 새 Datadog 조직을 만드는 과정에서 [SSO(Single Sign-On)][5]를 설정할 수 있습니다. 나중에 SSO를 설정할 수도 있습니다. 처음 만드는 동안 SSO를 설정하려면 먼저 Datadog 엔터프라이즈 갤러리 앱을 만듭니다.

### 설정{#configuration-us3}

{{< tabs >}}
{{% tab "Link" %}}

#### 기본{#basics-link}

기존 Datadog 조직에 연결하도록 선택하면 포털에 Datadog 리소스를 만들기 위한 양식이 표시됩니다:
{< img src="integrations/azure/azure-us3-link-sub.png" alt="Link Azure 구독을 기존 Datadog 조직 서식 계정 " responsive="true" style="width:90%;">}}

다음 값을 입력합니다.

| 속성             | 설명                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 구독         | Datadog에서 모니터링하려는 Azure 구독입니다. Datadog 리소스는 이 구독에 포함되어 있습니다. 소유자 액세스 권한을 가지고 있어야 합니다.                                                                                       |
| 리소스 그룹       | 새 리소스 그룹을 만들거나 기존 리소스 그룹을 사용하세요. 리소스 그룹][5]은 Azure 솔루션의 관련 리소스를 보관하는 컨테이너입니다.                                                                                 |
| 리소스 이름        | Datadog 리소스의 이름을 지정합니다. 권장 이름 지정 규칙은 `subscription_name-datadog_org_name`입니다.                                                                                                         |
| 위치             | 위치는 West US2이며, Datadog 의 US3 사이트가 Azure에서 호스팅되는 위치입니다. 이는 Datadog 사용에는 영향을 미치지 않습니다. 모든 [Datadog 사이트][1]와 마찬가지로 US3 사이트는 완전히 SaaS로 운영되며 다른 클라우드 제공업체 및 온프레미스 호스트뿐만 아니라 모든 Azure 지역 모니터링을 지원합니다. |
| Datadog 조직 | 인증 단계가 완료되면 Datadog 조직 이름이 연결 중인 Datadog 조직 이름으로 설정됩니다. Datadog 사이트는 US3으로 설정됩니다.                                                                                                                                |

**Link to Datadog organization** 을 클릭하여 Datadog 인증 창을 연 다음 Datadog 에 로그인합니다.

기본적으로 Azure는 현재 Datadog 조직을 Datadog 리소스에 연결합니다. 다른 조직에 연결하려면 인증 창에서 적절한 조직을 선택하세요:

{{< img src="integrations/azure/azure-us3-select-org.png" alt="Azure US3 select Datadog organization" responsive="true" style="width:90%;">}}

OAuth 흐름이 완료되면 Datadog 조직 이름이 올바른지 확인합니다.

[1]: /ko/getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
[5]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{% tab "Create" %}}

#### 기본 {#basics-create}

새 Datadog 조직을 만들도록 선택하면 포털에 Datadog 리소스와 새 Datadog 조직을 모두 만들 수 있는 양식이 표시됩니다:
{{< img src="integrations/azure/azure-us3-create-dd-resource2.png" alt="Azure US3 create a Datadog resource" responsive="true" style="width:90%;">}}

다음 값을 입력합니다.

| 속성             | 설명                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 구독         | Datadog로 모니터링하고자 하는 Azure 구독. 이 구독에 Datadog 리소스가 있습니다. 소유자 액세스 권한이 있어야 합니다.                                                                                       |
| 리소스 그룹       | 새 리소스 그룹을 만들거나 기존 리소스 그룹을 사용하세요. 리소스 그룹][2]은 Azure 솔루션의 관련 리소스를 보관하는 컨테이너입니다.                                                                                 |
| 리소스 이름        | Datadog 리소스의 이름입니다. 이 이름은 새 Datadog 조직에 할당됩니다.                                                                                                                                    |
| 위치             | 위치는 West US2이며, Datadog 의 US3 사이트가 Azure에서 호스팅되는 위치입니다. 이는 Datadog의 사용에 영향을 미치지 않습니다. 다른 [[Datadog 사이트][1]와 마찬가지로, US3 사이트는 완전히 SaaS이며, 다른 클라우드 제공업체 및 온프레미스 호스트뿐만 아니라 모든 Azure 리전 모니터링을 지원합니다. |
| Datadog 조직 | Datadog 조직 이름은 리소스 이름으로 설정되고 Datadog 사이트는 US3로 설정됩니다.                                                                                                                                |
| 요금제         | 사용 가능한 Datadog 요금제 목록입니다. 비공개 오퍼가 있는 경우 이 드롭다운에서 사용할 수 있습니다.                                                                                                                 |
| 청구 기간         | 월간.                                                                                                                                                                                                                      |

[1]: /ko/getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{< /tabs >}}

### Datadog 에이전트 배포

{{< tabs >}}
{{% tab "VM Extension" %}}

구독의 가상 머신 목록을 보려면 왼쪽 사이드바에서 **가상 머신 에이전트**를 선택합니다. 본 페이지에서 가상 머신에 Datadog 에이전트를 확장 프로그램으로 설치할 수 있습니다.

{{< img src="integrations/guide/azure_native_manual_setup/azure_native_vm_extension.png" alt="가상 머신 에이전트 선택 후 확장 프로그램 설치 옵션이 강조 표시된 Azure의 Datadog 리소스" responsive="true" style="width:90%;">}}

각 VM에 대해 다음 정보가 표시됩니다.

| 열               | 설명                                                                                                                                                    |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 리소스 이름        | VM 이름                                                                                                                                                  |
| 리소스 상태      | VM이 중지 또는 실행 중인지를 알 수 있습니다. Datadog 에이전트는 실행 중인 VM에만 설치할 수 있습니다. VM이 중지된 경우 Datadog 에이전트 설치가 비활성화됩니다. |
| 에이전트 버전        | Datadog 에이전트 버전 넘버                                                                                                                               |
| 에이전트 상태         | Datadog 에이전트가 VM에서 실행 중인지 여부를 알 수 있습니다.                                                                                                                |
| 활성화된 통합 | Datadog 에이전트에서 활성화된 통합이 수집하는 키 메트릭입니다.                                                                                  |
| 설치 방법       | Datadog 에이전트 설치에 사용되는 특정 툴(예: Chef, Azure VM 확장 프로그램)입니다.                                                                    |
| 로그 전송         | Datadog 에이전트가 로그를 Datadog으로 전송하는지 여부를 알 수 있습니다.                                                                                                          |

#### 설치

VM 확장 프로그램을 사용하여 Azure에 직접 Datadog 에이전트를 설치할 수 있습니다. Datadog 에이전트을 설치하려면 다음 단계를 따르세요.

1. 적절한 VM을 선택합니다.
2. **확장 프로그램 설치**를 클릭합니다. 
3. 포털은 에이전트 설치 확인 메시지를 기본 키로 표시합니다. **확인**을 선택하여 설치를 시작합니다. 에이전트가 설치 및 프로비저닝될 때까지 Azure는 상태를 `Installing`로 표시합니다. Datadog 에이전트 설치가 완료되면 상태가 `Installed`로 변경됩니다.

#### 설치 제거

Datadog 에이전트가 Azure VM 확장 프로그램과 함께 설치된 경우:

1. 적절한 VM을 선택합니다.
2. **에이전트 삭제**를 클릭합니다.

에이전트를 다른 방법으로 설치한 경우, Datadog 리소스를 사용하여 해당 에이전트를 배포하거나 삭제할 수 없지만 해당 에이전트에 대한 정보는 본 페이지에 계속 반영됩니다.

{{% /tab %}}
{{% tab "AKS Cluster Extension" %}}

Datadog AKS 클러스터 확장 프로그램으로 복잡한 타사 관리 툴을 사용하지 않고도 Azure AKS 내에서 Datadog 에이전트를 기본 배포할 수 있습니다.

#### 설치

AKS 클러스터 확장 프로그램을 사용하여 Datadog 에이전트를 설치하려면 다음 단계를 따릅니다.

1. 왼쪽 사이드바의 **모니터링 실행 중 리소스** 섹션에서 AKS 클러스터를 클릭합니다.
2. AKS 클러스터의 왼쪽 사이드바에서 **설정**의 **확장 프로그램 + 애플리케이션**을 선택합니다.
3. 검색을 클릭하고 `Datadog AKS Cluster Extension`을 선택합니다.
4. **생성**을 클릭하고 [Datadog 자격 증명][1] 및 [Datadog 사이트][2]를 사용하는 타일의 지침을 따릅니다.

#### 설치 제거

1. 왼쪽 사이드바의 **모니터링 실행 중 리소스** 섹션에서 AKS 클러스터를 클릭합니다.
2. AKS 클러스터의 왼쪽 사이드바에서 **설정**의 **확장 프로그램 + 애플리케이션**을 선택합니다.
3. Datadog AKS 클러스터 확장(**유형**: `Datadog.AKSExtension`)을 선택합니다.
4. **삭제**를 클릭합니다.

[1]: /ko/account_management/api-app-keys/
[2]: /ko/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

[1]: https://us3.datadoghq.com/signup
[2]: https://docs.datadoghq.com/ko/integrations/guide/azure-portal/
[3]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[4]: https://learn.microsoft.com/en-us/partner-center/marketplace/azure-consumption-commitment-enrollment
[5]: https://docs.datadoghq.com/ko/integrations/azure/?tab=link#saml-sso-configuration
{{< /site-region >}}

{{< site-region region="us,eu,us5,gov,ap1" >}}
<div class="alert alert-info">Azure 네이티브 통합은 Datadog의 US3 사이트를 사용하는 조직만 사용할 수 있습니다. 다른 Datadog 사이트를 사용하는 경우, <a href="https://docs.datadoghq.com/integrations/guide/azure-manual-setup/" target="_blank">Azure 수동 설정 가이드</a>에 안내된 지침을 참고하여 Azure 구독 읽기 권한으로 앱 등록을 하세요. Datadog US3 사이트를 사용하는 경우 이 페이지 오른쪽에 있는 <a href="?site=us3" target="_blank">사이트 선택기를 변경하세요</a>.</div>

[1]: ?site=us3
{{< /site-region >}}

{{< partial name="whats-next/whats-next.html" >}}