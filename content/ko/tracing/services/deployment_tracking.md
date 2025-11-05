---
aliases:
- /ko/tracing/version_tracking
- /ko/tracing/deployment_tracking/
description: Datadog을 사용하여 버전 태그를 통해 배포를 추적하세요
further_reading:
- link: getting_started/tagging/unified_service_tagging/
  tag: 설명서
  text: Unified Service Tagging 및 예약된 태그에 대해 알아보세요
- link: tracing/app_analytics
  tag: 설명서
  text: App Analytics 쿼리에서 버전을 차원으로 사용하세요
title: 배포 추적
---
## 버전 태그

`version` 태그는 Unified Service Tagging에 예약되어 있습니다. 이는 인프라스트럭처 메트릭(호스트, 컨테이너, 프로세스 및 NPM 검사), 트레이스 메트릭, 트레이스, 프로필 및 로그에 적용됩니다.

`version` 태그를 사용하여 소프트웨어 배포 전략을 지원하는 배포 및 서비스 동작을 모니터링할 수 있습니다.

`version` 태그를 설정하지 않은 경우 [[Unified Service Tagging 문서][1]에서 설정 정보를 참조하세요.

## Service 페이지에서 버전 태그 사용

{{< img src="tracing/deployment_tracking/ServicePageRequestsErrorsByVersion.png" alt="Service 페이지의 버전" style="width:100%;">}}

 Service 페이지에서 `version` 태그를 사용할 수 있는 경우 요청 위젯의 범위를 다음으로 지정할 수 있습니다.

- 버전별 총 요청 수 또는
- 버전별 초당 요청 수

오류 위젯의 범위를 다음으로 지정할 수 있습니다.

- 버전별 총 오류 수
- 버전별 초당 오류 수 또는
- 버전별 오류율(%)

요청 및 오류 위젯은 모두 대시보드와 모니터로 내보낼 수 있습니다.

## 잘못된 배포 자동 감지를 위해 버전 태그 사용

`version` 태그를 사용하여 서비스를 구성하면 [Automatic Faulty Deployment Detection][4]이 활성화됩니다.

잠재적으로 결함이 있는 모든 배포에 대해 자동으로 알림을 받도록 모니터를 설정할 수 있습니다. 이렇게 하려면 New Monitors 페이지로 이동하여 이벤트를 선택하고 모니터를 정의하는 검색 쿼리에 `tags:deployment_analysis`를 포함합니다.


## 배포된 버전

`version` 태그로 구성된 서비스에는 Service 페이지의 기본 서비스 상태 그래프 아래에 버전 섹션이 있습니다. 버전 섹션에는 선택한 시간 간격 동안 활성화된 서비스의 모든 버전이 표시되며 활성 서비스가 맨 위에 표시됩니다.

기본적으로 다음이 표시됩니다.

- 일정 기간 동안 이 서비스에 배포된 버전 이름입니다.
- 이 버전에 해당하는 트레이스가 처음이자 마지막으로 표시된 시간입니다.
- 바로 이전 버전에는 나타나지 않았지만 각 버전에는 나타나는 오류 유형 수를 보여주는 Error Types 표시기입니다.

  **참고:** 이 표시는 이전 버전의 트레이스에서 볼 수 없었던 오류를 표시합니다. 이 버전에서 반드시 이러한 오류가 발생했다는 의미는 아닙니다. 새로운 오류 유형을 살펴보는 것은 오류 조사를 시작하는 좋은 방법이 될 수 있습니다.

- 초당 요청입니다.
- 총 요청에 대한 오류율(%)입니다.


이 개요 테이블에서 열을 추가하거나 제거할 수 있으며 선택 사항이 저장됩니다. 추가로 사용 가능한 열은 다음과 같습니다.

- 이전 버전에는 없었지만 버전에서 활성화된 엔드포인트입니다.
- 활성 시간 - 첫 번째 트레이스부터 해당 버전에 대해 Datadog으로 전송된 마지막 트레이스까지의 시간을 표시합니다.
- 총 요청 수입니다.
- 총 오류 수입니다.
- p50, p75, p90, p95, p99 또는 최대로 측정된 지연 시간입니다.

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="서비스 페이지의 버전" style="width:100%;">}}

**참고:** 버전 섹션은 페이지 상단에서 선택한 기간 동안 보고되는 버전이 두 개 이상인 경우에만 나타납니다.

## 배포 비교

버전 요약 표에서 버전 행을 클릭하면 버전 비교 페이지가 열리며, 동일한 서비스의 두 버전을 비교할 수 있습니다. 기본적으로 선택한 버전은 바로 이전 버전과 비교되지만 지난 30일 내의 두 버전을 비교하도록 변경할 수 있습니다.

버전 비교 페이지에서 다음 정보를 확인할 수 있습니다.

- [비교 그래프](#comparison-graphs): 서비스에 대한 요청 및 오류를 시각화하여 다양한 유형의 [배포](#deployment-strategies)를 관찰하는 데 유용합니다.
- [오류 비교](#error-comparison): 버전에 따라 발생했거나 해결되었을 수 있는 오류입니다.
- [엔드포인트 비교](#endpoint-comparison): 각 버전에서 엔드포인트 대기 시간 및 오류율이 어떻게 나타나는지 파악할 수 있습니다.

### 비교 그래프

Service 페이지의 그래프와 유사하게 요청 및 오류 그래프는 배포 롤아웃 개요 또는 오류율 급증을 보여줍니다. 이 페이지에서 그래프는 비교를 위해 선택한 버전을 강조 표시하고 추가 컨텍스트를 위해 다른 모든 버전은 회색으로 둡니다.

{{< img src="tracing/deployment_tracking/ComparisonGraphs.png" alt="배포 비교 그래프" style="width:100%;">}}

[Continuous Profiler가 활성화된 경우][5] CPU 시간이나 할당된 메모리와 같은 주요 성능 메트릭의 비교가 APM 리소스별로 분류되어 표시됩니다. 여기에서 [Profile Comparison 페이지][6]로 전환할 수 있습니다.

{{< img src="tracing/deployment_tracking/DeploymentTrackingProfileComparison.png" alt="배포 프로파일링 비교 그래프" style="width:100%;">}}

### 오류 비교

이 섹션에는 두 버전 각각에 대해 감지된 오류 유형의 차이점이 나열되어 있으며 다음을 강조합니다.

 - 소스 버전에만 나타나며 문제 해결에 유용한 오류 유형입니다.
 -  더 이상 소스 버전에 나타나지 않으며 수정 사항을 검증하는 데 유용한 오류 유형입니다.
 - 둘다에서 나타나는 오류 유형입니다.

이 테이블에서 추가 조사를 위해 선택한 오류에 해당하는 실시간 또는 기록 트레이스로 전환할 수 있습니다.

**참고:** 오류 비교는 _관찰된_ 오류 유형을 기반으로 합니다. 오류 유형이 드물다면 _아직_ 표시되지 않았기 때문에 더 이상 표시되지 않는 것으로 나열될 수 있습니다.

{{< img src="tracing/deployment_tracking/ErrorComparison.mp4" alt="오류 비교" video=true style="width:100%;">}}

### 엔드포인트 비교

이 섹션에서는 서비스에 있는 각 엔드포인트의 성능(요청, 대기 시간 및 오류)을 비교할 수 있습니다. 배포 후에도 처리량이 가장 높은 엔드포인트가 여전히 정상인지 확인하려면 값을 기준으로 테이블을 정렬하고, 대기 시간 또는 오류율의 큰 변화를 확인하려면 변경률을 기준으로 정렬하세요.

{{< img src="tracing/deployment_tracking/EndpointComparison.png" alt="엔드포인트 비교" style="width:100%;">}}

## 배포 전략

Datadog의 배포 추적은 잘못된 코드 배포를 감지하고 변경 사항의 영향을 억제합니다. 또한 사고에 더 빠르게 대응하기 위해 다음 배포 전략(또는 기타)을 사용할 때 배포된 코드의 성능에 대한 가시성을 제공합니다.

### 롤링 배포

롤링 배포는 호스트 또는 컨테이너에 새 버전을 하나씩 배포하는 동안 트래픽을 다른 인스턴스로 이동시켜 다운타임을 없앱니다.

Datadog을 사용하면 롤링 배포를 모니터링하고 그에 따른 오류 증가를 감지할 수 있습니다.

{{< img src="tracing/deployment_tracking/rolling.png" alt="롤링 배포" style="width:100%;">}}

### 파란색 및 녹색 배포

파란색과 녹색(또는 기타 색상 조합) 배포는 트래픽을 모두 허용하는 두 개의 서비스 클러스터를 실행하거나 하나를 대기 상태로 유지하고 다른 하나에 문제가 있을 경우 활성화할 수 있도록 하여 가동 중지 시간을 줄입니다.

이러한 서비스에 대해 `version` 태그를 설정하고 확인하면 요청과 오류를 비교하여 클러스터 중 하나의 오류율이 다른 클러스터보다 높은지, 클러스터가 SLO를 충족하지 않는지, 또는 트래픽을 수신해서는 안 되는 클러스터인지 감지할 수 있습니다. 

{{< img src="tracing/deployment_tracking/BlueGreenDeploy.png" alt="Blue/Green 배포" style="width:100%;">}}

### 카나리 배포

카나리 배포를 사용하면 제한된 수의 호스트 또는 일부 고객을 대상으로 서비스를 배포하여 제한된 영향력 내에서 테스트할 수 있습니다.

Datadog 내에서 `version` 태그를 사용하면 카나리 배포에 대한 오류율, 트레이스 및 서비스 동작을 비교할 수 있습니다.

예를 들어 다음 이미지에서는 카나리 버전이 배포되고 몇 가지 오류가 발생하여 제거되었으며 추가 영향 없이 조사에 사용가능한 해당 버전에 해당하는 트레이스를 볼 수 있습니다.

{{< img src="tracing/deployment_tracking/canarydeployment.png" alt="카나리 배포" style="width:100%;">}}

### 섀도우 배포

섀도우 배포에서는 릴리스 후보 버전이 프로덕션 버전과 함께 배포되며, 들어오는 트래픽이 두 서비스 모두로 전송됩니다. 사용자는 프로덕션의 결과만 볼 수 있지만 두 서비스 모두에서 데이터를 수집할 수 있습니다.

섀도우 배포를 사용하면 실제 프로덕션 트래픽에 대해 잠재적인 릴리스를 테스트할 수 있습니다. 섀도우에 `version` 태그를 지정하면 두 버전 간의 오류율, 트레이스 및 서비스 동작을 비교하여 섀도우 버전을 릴리스해야 하는지 결정할 수 있습니다.

## Datadog 내 다른 곳에서 버전 태그 사용

`version` 태그는 검색 보기를 특정 버전으로 필터링하거나 다른 버전의 메트릭을 비교하는 등 Datadog 내 어디에서나 사용할 수 있습니다.

### Resource 페이지

{{< img src="tracing/deployment_tracking/ResourcePage.png" alt="Resource 페이지의 버전" style="width:100%;">}}

Resource 페이지에서 버전 태그를 사용할 수 있는 경우 요청 위젯의 범위는 다음 중 하나로 지정될 수 있습니다.

- 버전별 총 요청
- 버전별 초당 요청

오류 위젯의 범위는 `version` 태그와 관련된 세 가지 옵션 중 하나로 지정될 수 있습니다.

- 버전별 총 오류 수
- 버전별 초당 오류
- 버전별 오류율(%)

이들 모두는 대시보드와 모니터로 내보낼 수 있습니다.

### 트레이스 검색 및 분석

{{< img src="tracing/deployment_tracking/AnalyticsErrorsByVersion.mp4" alt="App Analytics 버전" video=true style="width:100%;">}}

사용 가능한 경우 실시간 검색 모드 및 인덱싱된 트레이스를 필터링하거나 분석 쿼리를 필터링 또는 그룹화하기 위해 Trace Search 및 Analytics 모두에 대한 태그로 `version`을 사용할 수 있습니다.

`version` 태그 필터링을 포함한 분석을 대시보드 및 모니터로 내보낼 수 있습니다.

### 버전별 프로필

특정 버전에 해당하는 프로필을 검색할 수 있습니다. [Deployment Comparison](#deployment-comparison) 페이지 오른쪽 상단에 있는 **View Profiles**를 클릭하여 비교 중인 두 버전으로 범위가 지정된 Continuous Profiler를 열 수도 있습니다.

{{< img src="tracing/deployment_tracking/VersionProfiler.png" alt="버전별로 프로필 필터링" style="width:100%;">}}

<br>

## 배포 메트릭 사이의 시간

서비스의 새 배포가 감지될 때마다 배포 추적은 `time_between_deployments` 메트릭에 대한 값을 계산합니다. 새 배포와 그 이전의 최신 버전 배포 사이의 기간(초)으로 계산됩니다. 

### 메트릭 정의

`datadog.service.time_between_deployments{env, service, second_primary_tag}`
: **전제 조건:** 이 지표는 [Unified Service Tagging][1]을 통해 버전 태그 지정이 활성화된 모든 APM 서비스에 대해 존재합니다.<br>
**설명:** 서비스 배포와 그 이전의 최신 버전 배포 사이에 경과된 시간(초)입니다.<br>
**메트릭 유형:** [분포][2]<br>
**태그:** 메트릭에는 서비스의 `env`, `service` 및 [두 번째 기본 태그][3] 태그가 지정됩니다.

### 예시

time = 0에 버전 A를 배포하고 time = 10에 버전 B를 배포하는 서비스가 있는 경우 `datadog.service.time_between_deployments` 메트릭 값은 10입니다.

Time = 0
: `{service: foo, env: prod, cluster-name: dev-shopist, version: A}`

Time = 10
: `{service: foo, env: prod, cluster_name: dev-shopist, version: B}`

배포 간 시간
: `datadog.service.time_between_deployments{env: prod, cluster_name: dev-shopist} = 10`


클러스터 `dev-shopist`에서 time = 20에 버전 X를 배포하고 클러스터 `us-staging`에서 time = 30에 버전 Y를 배포하며, 클러스터 `dev-shopist`에서 time = 45에 버전 Y를 다시 배포하는 경우 모든 클러스터에 대한 `datadog.service.time_between_deployments` 메트릭 `max` 값은 25(가장 최근 Y의 시간에서 마지막 X를 뺀 값 )입니다. 

Time = 20
: `{service: foo, env: staging, cluster-name: dev-shopist, version: X}`

Time = 30
: `{service: foo, env: staging, cluster-name: us-staging, version: Y}`

Time = 45
: `{service: foo, env: staging, cluster-name: dev-shopist, version: Y}`

배포 간 최대 시간:
: `max:datadog.service.time_between_deployments{env: staging, cluster-name: *} = 25`


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/getting_started/tagging/unified_service_tagging/
[2]: /ko/metrics/types/?tab=distribution#metric-types
[3]: /ko/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[4]: /ko/watchdog/faulty_deployment_detection/
[5]: /ko/profiler/enabling/
[6]: /ko/profiler/compare_profiles