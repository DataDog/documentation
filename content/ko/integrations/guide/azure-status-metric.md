---
aliases:
- /ko/integrations/faq/azure-vm-status-is-not-reporting
- /ko/integrations/faq/azure-status-metric
title: Azure 상태 및 개수 메트릭
---

## 개요

Datadog은 [Azure 통합][1]으로 모니터링되는 각 리소스에 대해 두 가지 추가 메트릭(`azure.*.status` 및 `azure.*.count`)을 생성합니다. 예를 들어 Datadog 보고서 `azure.vm.status` 및 `azure.vm.count`, 이 두 메트릭은 유사한 정보를 다룹니다.

`azure.*.count` 메트릭은 지원 중단된 `azure.*.status`의 개선 항목입니다.

## 개수 메트릭

`azure.*.count` 메트릭은 두 개의 기본적인 정보를 제공합니다.

- 해당 유형의 리소스 수입니다.
- Azure에서 보고한 각 리소스 상태입니다.

`azure.*.count` 메트릭은 해당 리소스 유형에 대한 다른 메트릭과 동일한 네임스페이스로 생성됩니다. 예: `azure.network_loadbalancers.count`. 해당 네임스페이스에 있는 다른 메트릭과 같이 동일한 메타데이터 태그 모두와 함께 `status`에 대한 추가 태그를 포함합니다.

### 사용 사례

`azure.*.count` 메트릭을 사용해 다음을 수행합니다.

- 모든 항목에 대해 `azure.vm.count`를 그래프로 표시하고 `status`로 합산하여 시간 경과에 따른 상태별로 분류된 가상 머신 수에 대한 보기를 만듭니다.
- 특정 리소스 유형의 수를 표시하려면 대시보드에 쿼리 위젯을 만듭니다. 사용 가능한 태그를 사용하여 지역, 리소스 그룹, 종류 또는 상태와 같은 관련 집계로 개수 범위를 지정합니다.
- 다양한 Azure 리소스의 상태에 대해 경고하는 모니터를 만듭니다.

**참고**: 경우에 따라 기본 시각화 설정으로 인해 차트나 쿼리 위젯에서 리소스가 간헐적으로 이중 계산되는 것처럼 나타날 수 있습니다. 이는 특정 상태로 범위가 지정된 모니터나 위젯에는 영향을 미치지 않습니다.
보간 > 없음 또는 `.fill(null)` 사용으로 설정하거나 차트 또는 쿼리 위젯에서 [보간][2]을 끄면 이 효과를 줄일 수 있습니다.

대부분의 리소스 유형의 경우, 가능한 상태는 아래와 같습니다.

- 실행 중
- 사용 불가
- 알 수 없음
- 강등됨
- 실패

가상 기기 상태는 아래처럼 더욱 상세합니다.

- 실행 중
- 지원됨_재할당됨
- 중단됨
- 알 수 없음
- 사용 불가
- 강등됨
- 실패

`query_failed` 상태를 확인한 경우 Azure에서 [리소스 상태 제공업체](#troubleshooting)를 활성화합니다.

## 상태 메트릭

`azure.*.status` 메트릭은 이와 동일한 유형의 정보에 대한 이전 솔루션입니다. 각 Azure 리소스 유형에 사용 가능한 리소스 수를 보고합니다.

### 차이

`.status` 및 `.count` 메트릭 간 주요 차이점은 다음과 같습니다.

- `azure.*.count`는 Azure 계정에 존재하는 모든 리소스를 포함하며 `azure.*.status`는 사용 가능한 리소스 수만 보고합니다.
- `azure.*.status`는 리소스 유형에 대한 표준 태그만 포함하며 `azure.*.count`는 리소스의 특정 가용성 상태를 보고하는 `status` 태그를 포함합니다.
- `azure.*.count` 메트릭 값의 정확도와 신뢰도가 향상되었습니다.

## 트러블슈팅

Azure 통합이 메트릭을 보고하지만 `azure.*.status`를  보고하지 않거나 `azure.*.count`를 반환하는 경우 Azure 구독에서 Azure 리소스 상태 공급자를 등록해야 합니다.

Azure 명령줄 인터페이스 사용하기:
```bash
azure login # Datadog 계정과 연결된 Azure 사용자에 로그인하세요.
azure config mode arm
azure provider register Microsoft.ResourceHealth
```

`azure.*.status` 메트릭이 5~10분 내 Datadog에 표시되어야 합니다.

[1]: /ko/integrations/azure/
[2]: /ko/metrics/guide/interpolation-the-fill-modifier-explained/