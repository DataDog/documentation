---
title: Azure 통합 빌링
---

## 개요

Datadog는 [Datadog에서 모니터링되는 Azure Virtual Machine][1] 모두에 대해 금액을 청구합니다. 이들 기기는 Datadog 에이전트 설치 여부에 관계없이 청구 대상입니다. Azure 통합에서 가져온 Azure VM에서 에이전트를 실행하는 경우 두 번 청구되지 않습니다. 추가로, Datadog는 Azure App Service Plan 내부 노드를 청구 가능한 호스트로 집계합니다.

**참고**: Shared, Dynamic 및 Free 티어 앱 서비스 플랜은 연결된 노드 개수가 없으므로 Datadog 청구에 영향을 미치지 않습니다.

Azure 통합은 월간 청구에 영향을 미치지 않고 다른 모든 Azure 리소스(Azure SQL DB, Azure Redis Cache, Azure Load Balancer 등)에 대한 메트릭을 수집합니다. 수집된 메트릭에 대한 전체 목록을 보려면 [Azure Monitor에서 지원되는 메트릭][6]을 참조하세요.

## Azure 가상 머신 제외

Datadog에서 모니터링되는 VM을 필터링하려면 Datadog-Azure 통합 타일을 사용하세요. 설정 탭으로 이동해 기존 앱 등록을 수정하거나 새로운 등록을 추가하세요. 각 필터는 "태그를 사용해 선택적으로 메트릭 수집 제한" 에서 제어됩니다.

통합 타일에서 기존 Azure 테넌트에 한도를 추가한 경우에는 기존에 탐지된 가상 머신이 인프라 목록에 최장 2시간 동안 남을 수 있습니다. 이전(트랜지션) 기간 중에는 가상 머신의 상태가 `???`로 표시됩니다. 이는 요금 청구 대상으로 간주되지 않습니다.

Agent가 실행되는 가상 머신은 계속 표시되며 요금 청구 대상에 포함됩니다. 한도 옵션은 Agent가 실행되지 않는 가상 머신에만 적용됩니다.

## Azure App Service Plan 제외

Datadog-Azure 통합 타일을 사용하여 Datadog에서 모니터링하는 App Service Plan을 필터링합니다. 설정 탭으로 이동하여 기존 앱 등록을 편집하거나 새 앱 등록을 추가하세요. 필터는 "태그를 사용해 선택적으로 메트릭 수집 제한"에서 제어됩니다.

**참조**: 이는 App Service Plan에서 실행되는 모든 앱 또는 함수의 메트릭을 필터링합니다.

## App Insights 커스텀 메트릭

[커스텀 메트릭 수집을 활성화][5]하면 Datadog는 통합 범위를 사용하여 Azure App Insights 인스턴스에 작성된 모든 사용자 지정 메트릭을 수집합니다. 이러한 측정 항목은 Datadog의 커스텀 측정 항목으로 간주되며 비용에 영향을 미칠 수 있습니다. [커스텀 메트릭 청구 가이드][4]를 참조하세요.

## 문제 해결

기술적 지원이 필요하신 경우 [Datadog 지원팀][2]에 문의해주세요.

요금 청구와 관련해 궁금하신 점이 있다면 [고객 성공][3] 매니저와 상의하시기 바랍니다.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /ko/getting_started/tagging/using_tags/#integrations
[3]: /ko/infrastructure/
[4]: /ko/account_management/billing/custom_metrics/?tab=countrate
[5]: /ko/integrations/azure#configuration
[6]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported