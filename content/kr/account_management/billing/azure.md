---
kind: 설명서
title: Azure 통합 빌링
---

## 개요

Datadog는 모든 [Datadog에서 모니터링하는 Azure 가상 머신][1] 전체에 대해 요금을 청구합니다. 이러한 머신은 Datadog Agent 설치 여부와 관계없이 요금 청구 대상입니다. Azure 통합을 통해 수집되는 Azure 가상 머신에서 Agent를 실행하는 경우 요금이 중복 청구되지 않습니다.

또한 Datadog는 Azure App Service Plan 내부의 노드 역시 요금 청구 대상의 호스트로 간주합니다. **참조**: 모든 공유(Shared), 동적(Dynamic), 또는 무료(Free) 티어의 앱 서비스 플랜은 연관된 노드 개수가 없으며 Datadog 사용 요금에 영향을 미치지 않습니다.
Azure 통합은 월간 요금 청구에 영향을 미치지 않고 기타 모든 Azure 리소스(Azure SQL DB, Azure Redis Cache, Azure Load Balancer 등)의 메트릭을 수집합니다.

## Azure 가상 머신 제외

Datadog-Azure 통합 타일을 사용해 Datadog에서 모니터링하는 가상 머신을 필터링할 수 있습니다. Configuration 탭으로 이동해 기존 App Registration을 수정하거나 새 앱을 추가하세요. 각 필터는 “Optionally limit metrics collection to hosts with tag:”에서 관리할 수 있습니다.

통합 타일에서 기존 Azure 테넌트에 한도를 추가한 경우에는 기존에 검출된 가상 머신이 인프라스트럭처 목록에 최장 2시간 동안 남을 수 있습니다. 이전 기간 중에는 가상 머신의 상태가 `???`로 표시됩니다. 이는 요금 청구 대상에 포함되지 않습니다.

Agent가 실행되는 가상 머신은 계속 표시되며 요금 청구 대상에 포함됩니다. 한도 옵션은 Agent가 실행되지 않는 가상 머신에만 적용됩니다.

## Azure App Service Plan 제외

Datadog-Azure 통합 타일을 사용하여 Datadog에서 모니터링하는 Azure App Service Plan을 필터링할 수 있습니다. Configuration 탭으로 이동하여 기존 App Registration을 편집하거나 신규 앱을 추가하세요. 필터는 "Optionally limit metrics collection to App Service Plans with tag" 설정에서 관리할 수 있습니다.

**참조**: 이는 App Service Plan에서 실행되는 모든 앱 또는 함수의 메트릭을 필터링합니다.

## 트러블슈팅

기술적 지원이 필요하신 경우 [Datadog 지원팀][2]에 문의해주세요.

요금 청구와 관련해 궁금하신 점이 있다면 [고객 성공][3] 매니저와 상의하시기 바랍니다.

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /kr/getting_started/tagging/using_tags/#integrations
[3]: /kr/infrastructure/