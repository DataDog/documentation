---
description: Datadog Azure 통합 아키텍처 및 대체 설정 옵션에 대한 가이드
further_reading:
- link: https://docs.datadoghq.com/integrations/azure/
  tag: 설명서
  text: Azure 통합
kind: guide
title: Azure 통합 아키텍처 및 설정
---

## 개요

이 가이드는 Datadog의 Azure 통합을 설정하는 사용자를 위한 자세한 정보와 참조 아키텍처는 물론 특정 사용 사례에 대한 대체 설정 옵션을 제공합니다.

### 참조 아키텍처

이 가이드의 다이어그램은 [Azure 통합 페이지][1]의 단계를 따를 때 설정 프로세스와 결과를 시각적으로 보여줍니다. 이 가이드는 Datadog과 Azure 환경의 상호 작용에 대한 자세한 개요를 제공하고 일반적인 보안, 컴플라이언스 및 거버넌스 질문에 답변합니다.

### 대체 설정

[Azure 통합 페이지][1]에 문서화된 설정 프로세스는 권장 단계이며 대부분의 사용자에게 가장 적합한 설정을 제공합니다. 사용 사례에 따라 이 문서의 대체 설정 옵션이 더 나을 수도 있습니다. 성능, 기능 또는 관리 용이성에 대한 절충 사항은 필요 시 설명되어 있습니다.

## Azure 메트릭 및 데이터 수집

Datadog의 Azure 통합을 활성화하면 Datadog이 다음을 수행할 수 있습니다.

  - 지정된 범위 내 모든 구독의 모든 리소스 검색 및 모니터링
  - Azure Monitor에서 사용 가능한 모든 메트릭이 수집되도록 검색된 메트릭 정의를 자동으로 업데이트
  - 다양한 일반 메타데이터와 리소스별 메타데이터(사용자 지정 Azure 태그 포함)를 수집하고 이를 Datadog의 관련 리소스 메트릭에 태그로 적용
  - Azure 메타데이터 API를 쿼리하고 응답을 사용하여 [Datadog에서 유용한 메트릭 생성][2]함으로써 Azure Monitor 제공하지 않는 인사이트 확보

사용된 Azure API와 수집된 데이터는 통합의 표준 버전을 사용하는지 Azure Native 버전을 사용하는지에 관계없이 동일합니다.

{{% site-region region="us,us5,eu,gov,ap1" %}}

### 표준 Azure 통합 메트릭 및 데이터 수집

_모든 Datadog 사이트에서 사용 가능_

표준 Azure 통합을 활성화하려면 다음 단계를 따르세요.

  1. Active Directory에서 앱 등록을 생성하고 [Datadog Azure 통합 페이지][2]에 크리덴셜을 입력합니다.
  2. 모니터링하려는 구독 또는 관리 그룹에 애플리케이션 읽기 액세스 권한(`Monitoring Reader` 역할)을 부여합니다.

아래 다이어그램은 기본 설명서에 설명된 Azure 통합 설정의 프로세스와 결과 아키텍처를 간략하게 설명합니다.

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_integration_setup.png" alt="앱 등록 통합 설정 다이어그램" >}}

이 작업이 완료되면 데이터 수집이 자동으로 시작됩니다. Datadog에 입력된 앱 등록 정보를 통해 Datadog은 [Azure Active Directory(AD)에서 토큰을 요청][1]할 수 있습니다. Datadog은 이 토큰을 다양한 Azure API에 대한 API 호출 인증으로 사용하여 제공된 범위 내에서 리소스를 검색하고 데이터를 수집합니다. 이 연속 프로세스는 기본적으로 2분 간격으로 실행되며 Azure 환경에서 데이터를 검색하고 수집하는 데 사용됩니다. 데이터 수집 과정은 아래 그림과 같습니다.

{{< img src="integrations/guide/azure_architecture_and_configuration/app_registration_metric_collection.png" alt="앱 등록 통합 설정 다이어그램" >}}

[1]: https://learn.microsoft.com/en-us/azure/databricks/dev-tools/api/latest/aad/
[2]: https://app.datadoghq.com/integrations/azure
{{% /site-region %}}
{{% site-region region="us3" %}}

### Azure Native 통합 메트릭 수집
_Datadog US3 사이트에서만 사용 가능_

**계정 연결**: Azure의 Datadog 리소스는 Azure 환경과 Datadog 계정을 연결합니다. 이 링크를 사용하면 다른 Datadog 사이트에 사용할 수 있는 표준 Azure 통합과 동일한 데이터 수집이 가능하지만 인증 메커니즘은 다릅니다. 해당 액세스 권한은 사용자가 만들고 구성한 **App Registration**이 아닌 Azure의 Datadog 리소스와 연결된 **System Managed Identity**를 사용하여 할당됩니다.

**권한**: `Monitoring Reader` 역할 할당은 Datadog 리소스 생성 중에 자동으로 발생하며 범위는 Datadog 리소스의 상위 구독으로 지정됩니다. 모니터링을 위해 Datadog 리소스에 구독을 추가하면 관리되는 ID에 대해 이 범위가 자동으로 업데이트됩니다.

Azure Native 통합을 활성화하려면 다음 단계를 따르세요.

1. Datadog 조직이 US3 [Datadog 사이트][1]에 호스팅되어 있는지 확인하거나 [US3 사이트에서 평가판 Datadog 계정을 생성][5]합니다.
2. Azure에서 하나 이상의 구독을 연결하는 Datadog 리소스를 만듭니다.
3. (선택 사항) 다른 구독을 포함하도록 Datadog 리소스를 업데이트합니다.

[외부 ISV][6]로서 이 액세스를 요청하고 사용하기 위한 별도의 추가 프로세스가 있습니다.

1. Datadog은 Azure에 인증하고 프라이빗 Azure 서비스를 사용하여 지정된 Datadog 리소스와 연결된 고객 토큰을 요청합니다.
1. 이 Azure 서비스는 Datadog의 ID를 확인하고 요청된 Datadog 리소스가 존재하고 활성화되어 있는지 확인합니다.
1. Azure는 단기 고객 토큰을 Datadog에 반환합니다. 이 토큰을 사용하면 연결된 시스템 관리 ID에 동일한 수준의 액세스 권한을 부여할 수 있습니다.
1. Datadog은 이 고객 토큰을 사용하여 만료가 가까워질 때까지 모니터링되는 환경에서 데이터를 쿼리하며, 이 시점에서 프로세스가 반복됩니다.

아래 다이어그램은 Azure Native 통합 설정의 프로세스와 결과 아키텍처를 간략하게 설명합니다.

{{< img src="integrations/guide/azure_architecture_and_configuration/azure_native_integration_setup.png" alt="Azure Native 통합 설정 다이어그램" >}}

이 작업이 완료되면 데이터 수집이 자동으로 시작됩니다. Datadog은 아래 그림과 같이 Azure 환경에서 지속적으로 메트릭을 검색하고 수집합니다.

{{< img src="integrations/guide/azure_architecture_and_configuration/azure_native_metric_collection.png" alt="Azure Native 메트릭 수집 설정 다이어그램" >}}

### 메트릭 수집을 위한 대체 설정 옵션

표준 통합을 사용하든 Azure Native 통합을 사용하든 Datadog에서는 기본 구성을 사용할 것을 적극 권장합니다. 이는 새롭고 차별화된 인사이트를 제공할 뿐만 아니라 데이터 수집의 성능과 안정성을 향상하기 위해 통합이 지속적으로 강화되기 때문입니다. 메트릭 수집에 대한 구성이 제한되면 이러한 개선 사항이 저해될 수 있습니다.

#### 액세스 제한 옵션

다음 섹션에서는 액세스 제한 옵션과 그 의미를 자세히 설명합니다.

##### 1. 구독 수준 아래의 액세스 권한 할당

구독 수준 아래에서 Datadog 액세스 권한을 할당할 수 있습니다.

  - 리소스 그룹별
  - 개별 리소스별

**참고**: 이 액세스는 표준 Azure 통합의 경우 **App Registration**을 통해 관리되고, Azure Native 통합의 경우 Datadog 리소스와 연결된 **System Managed Identity**를 통해 관리됩니다.

구독 수준 아래의 액세스 범위를 업데이트하는 경우 Datadog은 계속해서 리소스와 사용 가능한 메트릭을 검색하고 지정된 범위 내에서 이를 동적으로 수집할 수 있습니다.

Datadog의 액세스를 구독 수준 아래로 제한하면 다음 결과가 나타납니다.

  - 메트릭 호출을 일괄 처리하는 기능을 금지합니다. 이로 인해 Datadog에 채워지기 전에 일반적으로 1~2분 이상 지연이 발생합니다. 개별 리소스별로 제한하는 것이 리소스 그룹별로 제한하는 것보다 더 큰 영향을 미칩니다. 실제 지연은 Azure 환경의 크기, 구성 및 배포에 따라 크게 달라집니다. 어떤 경우에는 눈에 띄는 효과가 없을 수도 있고, 다른 경우에는 최대 45분의 대기 시간이 있을 수도 있습니다.
  - Azure API 호출이 증가하여 Azure 내에서 비용이 높아질 수 있습니다.
  - 리소스 자동탐지를 제한합니다.
  - 모니터링할 새 리소스, 리소스 그룹 또는 구독에 대한 역할 할당 범위를 수동으로 업데이트해야 합니다.

##### 2. Monitoring Reader보다 더 제한적인 역할 할당

**Monitoring Reader** 역할은 모니터링 리소스 및 구독 수준 데이터에 대한 폭넓은 액세스를 제공합니다. 이 읽기 전용 액세스를 통해 Datadog은 기존 기능과 새로운 기능 모두에 대해 최상의 사용자 경험을 제공할 수 있습니다. Azure AD 역할을 사용하면 이 액세스를 테넌트 수준 Azure AD 리소스로 확장할 수 있습니다.

Monitoring Reader 역할 아래로 액세스를 제한하면 다음과 같은 의미가 있습니다.

  - 모니터링 데이터의 일부 또는 전체 손실
  - 리소스 메트릭에 대한 태그 형태 메타데이터의 부분적 또는 전체 손실
  - [클라우드 보안 관리 잘못된 구성(CSM 잘못된 구성)][3] 또는 [리소스 카탈로그][4]에 대한 데이터의 부분적 또는 전체 손실
  - Datadog에서 생성된 메트릭의 부분적 또는 전체 손실

Azure AD 역할을 제한하거나 생략하면 다음과 같은 의미가 있습니다.

  - CSM 잘못된 구성으로 인해 Azure AD 리소스에 대한 메타데이터의 부분적 또는 전체 손실
  - Azure AD 리소스에 대한 크리덴셜 만료 모니터링의 부분적 또는 전체 손실

[1]: /ko/getting_started/site/
[2]: https://www.datadoghq.com/
[3]: /ko/security/cloud_security_management/misconfigurations/
[4]: /ko/infrastructure/resource_catalog/
[5]: https://us3.datadoghq.com/signup
[6]: https://learn.microsoft.com/en-us/azure/partner-solutions/datadog/
{{% /site-region %}}

## Azure 로그 수집

{{% site-region region="us,us5,eu,gov,ap1" %}}

### 표준 Azure 통합 로그 수집
_모든 Datadog 사이트에서 사용 가능_

아래 다이어그램은 Azure 통합 페이지의 [로그 수집 섹션][1]에 설명된 대로 Azure에서 Datadog으로 로그를 전달하기 위한 참조 아키텍처를 제공합니다.

{{< img src="integrations/guide/azure_architecture_and_configuration/manual_log_forwarding.png" alt="수동 로그 전달 설정 다이어그램" >}}

### 표준 Azure 통합으로 로그 전달을 위한 대체 설정 옵션

위의 기본 아키텍처는 대부분의 사용자에게 적합합니다. Azure 환경의 규모와 구성뿐만 아니라 조직의 아키텍처 구현 방법에 따라 아래 섹션에서 관련 추가 고려 사항을 자세히 설명합니다.

#### 제공된 템플릿 사용

기본 Azure [로그 수집 섹션][1]의 **Deploy to Azure** 버튼은 Event Hub 및 포워더 함수 쌍을 생성하기 위한 템플릿을 제공합니다. 이 템플릿을 사용하여 직접 배포하는 것 외에도 기본 ARM 템플릿을 자체 인프라스트럭처의 시작점으로 사용하여 코드를 배포할 수 있습니다.

이러한 템플릿은 활동 로그에 대한 하나의 선택적 진단 설정을 제외하고 진단 설정을 추가하지 않습니다. 리소스 로그의 경우 Datadog에서는 ARM 템플릿 또는 Terraform을 활용하여 프로그래밍 방식으로 리소스에 진단 설정을 추가할 것을 권장합니다. 이러한 진단 설정은 리소스 로그를 Datadog으로 보내야 하는 모든 리소스에 추가되어야 합니다.

#### 리전 고려 사항

진단 설정은 리소스와 동일한 리전에 있는 Event Hubs에만 리소스 로그를 보낼 수 있습니다. Datadog에 리소스 로그를 보내려는 리소스가 포함된 각 리전에 Event Hub 및 포워더 함수 쌍을 추가합니다.

그러나 진단 설정은 리소스와 동일한 구독의 Event Hubs에 로그를 보내는 것으로 제한되지 않습니다. Azure 테넌트 내에 여러 구독이 있는 경우 동일한 리전 내에서 단일 Event Hub 및 포워더 함수를 공유할 수 있습니다.

#### 대용량 로그 고려 사항

로그 볼륨이 확장되면 일반적으로 Event Hub에서 발생하는 병목 현상이 나타날 수 있습니다. 높은 로그 볼륨을 제출하려는 경우 파티션을 추가하거나 Premium 또는 Dedicated 티어를 사용하는 것이 좋습니다.
특히 로그 볼륨이 높은 경우 동일한 리전 내에 추가 Event Hub 및 포워더 함수 쌍을 추가하고 이들 간에 트래픽을 분할하는 것을 고려할 수 있습니다.

[1]: /ko/integrations/azure/#log-collection
{{% /site-region %}}
{{% site-region region="us3" %}}

### Azure Native 통합 로그 수집
_Datadog US3 사이트에서만 사용 가능_

아래 다이어그램은 Azure Native 통합 로그 전달 설정의 프로세스와 결과 아키텍처를 간략하게 설명합니다.

{{< img src="integrations/guide/azure_architecture_and_configuration/azure_native_log_forwarding.png" alt="Azure Native 로그 전달 설정 다이어그램" >}}

Azure Native 통합을 사용하면 Datadog에 대한 Azure 리소스 또는 활동 로그 전달을 구현하기 위해 Datadog 리소스 외부의 항목을 구성할 필요가 없습니다. Datadog 리소스에 지정된 태그 규칙만 사용하여 구성과 일치하도록 진단 설정이 자동으로 추가되거나 제거됩니다.

**참고**: 아래와 같이 필터 없이 리소스 로그를 활성화하여 모든 리소스 로그를 보낼 수 있습니다.

{{< img src="integrations/guide/azure_architecture_and_configuration/datadog_agent_build_metrics_and_logs.png" alt="Datadog Agent 빌드 다이어그램" >}}

Datadog 리소스에서 생성된 진단 설정은 모든 로그 카테고리를 포함하고 `Send to Partner Solution`으로 구성되며 원래 Datadog 리소스로 로그를 다시 보냅니다. 이름 지정 형식 `DATADOG_DS_V2_<UNIQUE_IDENTIFIER>`를 따릅니다.

삭제를 포함하여 리소스에 대한 수동 변경 사항은 몇 분 내에 되돌려집니다.

아래에서 Datadog 리소스로 생성된 진단 설정의 예를 참조하세요.

{{< img src="integrations/guide/azure_architecture_and_configuration/diagnostic_setting.png" alt="진단 설정 다이어그램" >}}

### Azure Native 통합을 사용한 로그 전달을 위한 대체 설정 옵션

Datadog 리소스의 로그를 활성화하는 원클릭 버튼은 진단 설정 추가 프로세스를 자동화합니다. 경우에 따라 조직에서는 Azure Native 통합을 통해 자동화된 로그 전달 기능을 계속 활용하면서 진단 설정을 자체적으로 관리하고 구성하기를 원할 수 있습니다.

수동으로 생성된 진단 설정은 Datadog 리소스의 로그 설정에 영향을 받지 않으며 Datadog 리소스에 지정된 태그 규칙에 따라 삭제되지 않습니다. 수동 로그 전달이 작동하기 위해 Datadog 리소스에서 리소스 로그를 활성화할 필요는 없습니다. 단, 로그 전달에 사용되는 Datadog 리소스는 비활성화된 상태가 아니어야 합니다.

진단 설정을 수동으로 관리하는 이유는 다음과 같습니다.

  1. 코드 정책으로서의 인프라스트럭처
     모든 리소스를 결정론적으로 생성하고 관리해야 하는 IaC에 대한 엄격한 내부 정책(예: Datadog 리소스의 진단 설정 자동 생성으로 인해 원하는 상태와 실제 상태 간에 해결할 수 없는 충돌이 발생하는 경우)

  2. 리소스 로그 카테고리 제한
     Datadog 리소스에 의해 자동으로 생성된 진단 설정에는 모든 로그 카테고리가 포함되므로 이러한 카테고리의 하위 집합을 지정하려면 진단 설정을 직접 생성해야 합니다.
     **참고**: [제외 필터][1]를 사용하여 Datadog에 수집 시 이러한 로그가 색인화되지 않도록 제외할 수도 있습니다.

  3. 구독 간 로그 전달
     구독 간 로그 전달은 특정 구독에서 로그만 전송하고 다른 데이터는 전송하지 않는 데 유용합니다. 구독 간 로그 전달을 활성화하려면 진단 설정을 만들기 전에 로그를 보내려는 각 구독에 `Microsoft.Datadog` 리소스 공급자를 등록합니다. 로그 전달에 사용되는 Datadog 리소스는 모니터링되는 리소스 블레이드를 통해 구성된 모든 구독과 자체 구독에서 메트릭과 데이터를 계속 수집합니다.

       {{< img src="integrations/guide/azure_architecture_and_configuration/datadog_agent_build_resource_providers.png" alt="Microsoft의 Azure Portal에 있는 리소스 공급자 페이지의 스크린샷. 등록된 상태를 보여주는 Datadog." >}}

  4. 테스팅
     Datadog에 예제 로그를 보내는 것은 테스트나 기타 조사에 유용할 수 있습니다. 이러한 경우 진단 설정을 수동으로 추가하는 것이 업데이트된 태그 및 설정에서 자동으로 생성될 때까지 기다리는 것보다 더 빠를 수 있습니다.

이 아키텍처는 구독 간 설정(선택 사항)을 포함하여 아래에 표시됩니다.

{{< img src="integrations/guide/azure_architecture_and_configuration/custom_azure_native_log_forwarding.png" alt="커스텀 Azure Native 로그 전달 설정 다이어그램" >}}

[1]: /ko/logs/log_configuration/indexes/#exclusion-filters
{{% /site-region %}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/azure/
[2]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/