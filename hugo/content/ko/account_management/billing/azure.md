---
title: Azure 통합 빌링
---

## 개요

Datadog은 [Datadog에서 모니터링하는 Azure 가상 머신][1] 전체에 대해 요금을 청구합니다. 해당 머신은 Datadog 에이전트 설치 여부와 관계없이 요금 청구 대상입니다. Azure 통합을 통해 수집되는 Azure 가상 머신에서 에이전트를 실행하는 경우 요금이 중복 청구되지 않습니다. 아울러, Datadog은 Azure 앱 서비스 플랜 내부의 노드를 요금 청구 대상으로 계산합니다.

**참고**: 공유, 동적 및 무료 티어 앱 서비스 요금제에는 관련 노드 카운트가 없으며, 이는 Datadog 청구 요금에 영향을 미치지 않습니다.

Azure 통합은 월간 청구 요금에 영향을 미치지 않으면서 다른 모든 Azure 리소스(예: Azure SQL DB, Azure Redis Cache, Azure Load Balancer 등)에 관한 메트릭을 수집합니다. 수집한 메트릭의 전체 목록을 확인하려면 [Azure 모니터링 지원 메트릭][6]을 참조하세요.

## Azure 가상 머신 제외

Datadog-Azure 통합 타일을 사용해 Datadog에서 모니터링하는 가상 머신을 필터링할 수 있습니다. Metric Collection 탭으로 이동해 기존 앱 등록을 수정하거나 새 앱을 추가하세요. 각 필터는 "Optionally limit metrics collection to hosts with tag:(다음 태그가 있는 호스트에 대한 메트릭 수집을 선택적으로 제한:)"에서 관리할 수 있습니다.

통합 타일에서 기존 Azure 테넌트에 제한 사항을 추가할 때, 기존에 탐지된 VM은 인프라스트럭처 목록에 최대 2시간 동안 표시됩니다. 트랜지션 동안에는 VM의 상태가 `???`로 표시됩니다. 이는 요금 청구 대상에 포함되지 않습니다.

Agent가 실행되는 가상 머신은 계속 표시되며 요금 청구 대상에 포함됩니다. 한도 옵션은 Agent가 실행되지 않는 가상 머신에만 적용됩니다.

## Azure App Service Plan 제외

Datadog-Azure 통합 타일을 사용하여 Datadog에서 모니터링하는 Azure 앱 서비스 플랜을 필터링할 수 있습니다. 설정 탭으로 이동하여 기존 앱 등록을 편집하거나 신규 앱을 추가하세요. 필터는 "다음 태그가 있는 앱 서비스 플랜에 대한 메트릭 수집을 선택적으로 제한:" 설정에서 관리할 수 있습니다.

**참조**: 이는 App Service Plan에서 실행되는 모든 앱 또는 함수의 메트릭을 필터링합니다.

## 앱 인사이트 커스텀 메트릭

[커스텀 메트릭 수집을 사용하도록 설정][5]하면, Datadog은 통합 범위를 활용하여 Azure 앱 인사이트 인스턴스에 작성된 모든 커스텀 메트릭을 수집합니다. 해당 메트릭은 Datadog에서 커스텀 메트릭으로 간주되어 비용에 영향을 미칠 수 있습니다. [커스텀 메트릭 빌링 지침][4]을 참조하세요.

## 트러블슈팅

기술 지원이 필요하신 경우 [Datadog 지원 팀][2]에 문의하세요.

요금 청구와 관련해 궁금하신 점이 있다면 [고객 성공][3] 매니저와 상의하시기 바랍니다.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /ko/getting_started/tagging/using_tags/#integrations
[3]: /ko/infrastructure/
[4]: /ko/account_management/billing/custom_metrics/?tab=countrate
[5]: /ko/integrations/azure#data-collected
[6]: https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-supported