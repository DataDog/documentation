---
description: 롤아웃 전에 Feature Flags 사용량 및 비용을 추정하고, 배포 후에 구체적인 수단을 적용하여 사용량 및 비용을 관리하고
  줄이세요.
further_reading:
- link: /feature_flags/concepts/monthly_flag_configuration_requests/
  tag: 설명서
  text: 월간 플래그 구성 요청
- link: /feature_flags/concepts/stale_flags/
  tag: 설명서
  text: 오래된 플래그
- link: /feature_flags/concepts/environments/
  tag: 설명서
  text: 환경
- link: /feature_flags/concepts/configuration_sources/
  tag: 설명서
  text: 서버 SDK 구성 소스
- link: /account_management/plan_and_usage/usage_details/
  tag: 설명서
  text: 사용량 세부 정보
- link: /account_management/plan_and_usage/bill_overview/
  tag: 설명서
  text: 청구 개요
title: Feature Flags 비용 추정 및 관리
---
## 개요 {#overview}

Feature Flags 사용량은 플래그를 배포하는 방식에 따라 달라집니다.

- **클라이언트 측** 사용량의 경우, Datadog에 연결하는 클라이언트 애플리케이션 및 최종 사용자 수에 따라 달라집니다.
- **서버 측** 사용량의 경우, 구성을 폴링하는 백엔드 서비스 수에 따라 달라집니다.

플래그 수가 동일한 두 조직이라도 이 배포 풋프린트에 따라 서로 다른 사용량을 생성할 수 있습니다. 이 가이드는 광범위한 롤아웃 전에 사용량과 비용을 추정하는 데 도움이 됩니다. 이 가이드에서는 배포 후 비용을 관리하고 절감하는 데 사용 가능한 수단도 다룹니다.

## Feature Flags 사용량 및 비용 추정 {#estimate-your-feature-flags-usage-and-costs}

Datadog은 월간 플래그 구성 요청(MFCR)을 통해 Feature Flags 사용량에 대한 비용을 청구합니다. MFCR은 개별 플래그 평가가 아니라 플래그와 해당 타겟팅 규칙이 포함된 파일에 대한 요청입니다. SDK는 해당 파일을 로컬에 캐시하고 추가 네트워크 호출 없이 해당 파일에서 플래그를 평가하므로 단일 구성 요청으로 여러 플래그에 걸쳐 많은 평가를 지원할 수 있습니다. 전체 정의 및 계산 규칙은 [월간 플래그 구성 요청][1]을 참조하세요.

MFCR은 구성 요청 수를 계산하므로 유지 관리하는 플래그 수와 평가 빈도가 사용량에 직접적인 영향을 미치지 않습니다. 사용량에 영향을 미치는 요인은 다음과 같습니다.

- **클라이언트 측 사용량**: 클라이언트 측 SDK는 초기화될 때 구성을 요청하며, 이는 일반적으로 사용자가 브라우저 탭이나 모바일 앱을 열 때마다 발생합니다. 클라이언트 측 MFCR은 플래그를 사용하는 애플리케이션 전체의 세션 또는 앱 열기 총량(샘플링되지 않음)을 면밀히 추적합니다.
- **서버 측 사용량**: 서버 측 SDK는 구성 가능한 간격(기본값: 30초)으로 Datadog 또는 Datadog Agent(선택한 [구성 소스][2]에 따름)를 폴링합니다. 서버 측 MFCR은 SDK가 배포된 상태에서 실행 중인 호스트, 서비스 또는 컨테이너의 총 개수에 각각의 폴링 빈도를 곱하여 추적합니다.
- **클라이언트 및 서버 측 혼합**: 클라이언트와 서버 모두에서 플래그를 사용하는 경우, 두 추정치를 합산하세요.

<div class="alert alert-info">Datadog은 서버 측 구성 요청에 대한 비용을 원시 개수의 10배로 청구합니다. 이는 단일 서버 측 요청이 단일 클라이언트 측 요청보다 훨씬 더 많은 최종 사용자에게 변형 할당을 제공할 수 있기 때문입니다.</div>

### 롤아웃 전에 사용량 추정 {#estimate-your-usage-before-you-roll-out}

1. 배포하려는 SDK(클라이언트 측, 서버 측 또는 둘 다)를 결정합니다.
1. 클라이언트 측 사용량의 경우, 다음 중 하나를 사용하여 추정합니다.
   - 월간 RUM 세션 볼륨. 또는 플래그를 사용하려는 애플리케이션 전체의 일일 활성 사용자 수에 30을 곱하여 월간 추정치를 구합니다.
   - 플래그가 현재 RUM 구현보다 더 광범위한 애플리케이션 세트를 다루는 경우, 대신 해당 애플리케이션 전체의 일일 활성 사용자 수나 일일 세션 수를 사용합니다.
1. 서버 측 사용량의 경우, SDK가 배포된 상태에서 실행 중인 호스트, 서비스 또는 컨테이너의 총 개수를 계산합니다. 해당 개수에 폴링 간격 기준 일일 구성 요청 수를 곱한 다음 30을 곱하여 월간 추정치를 구하고 10배의 서버 측 배수를 적용합니다.
1. 클라이언트 측 및 서버 측 추정치를 합산하여 결합된 월간 MFCR 추정치를 구합니다.

예를 들어, 플래그가 지정된 클라이언트 애플리케이션에서 일일 활성 사용자 수가 120만 명인 조직은 월간 약 3,600만 MFCR을 생성합니다(120만 x 30일).

서버 측 예시로, 33개의 호스트에서 SDK를 실행하는 조직은 기본 30초 폴링 간격에서 호스트당 하루 2,880개의 구성 요청을 생성합니다(하루 86,400초/30초). 이는 서버 측 배수를 적용하기 전 33 x 2,880 x 30일 = 2,851,200(약 285만) MFCR이며, 적용 후에는 약 2,850만 MFCR입니다.

월간 100만 MFCR 미만의 사용량은 무료로 포함됩니다. 해당 할당량을 초과하는 현재 요금 체계는 [Feature Flags 요금 페이지][4]를 참조하세요.

### 실제 사용량 및 비용 모니터링 {#monitor-your-actual-usage-and-cost}

배포 후 추정치와 실제 사용량을 비교하세요. Datadog은 [사용량 세부 정보][5] 및 [청구 개요][6] 페이지에서 다른 제품과 함께 Feature Flags 사용량 및 비용을 보고합니다. 해당 페이지에서 시간 경과에 따른 사용량 추세를 조회하고 상세 사용량 데이터를 다운로드할 수 있습니다.

## Feature Flags 비용 관리 및 절감 {#manage-and-reduce-feature-flags-costs}

MFCR은 플래그 수가 아닌 구성 요청을 추적하므로 유지 관리하는 플래그 수를 줄이는 것만으로는 비용이 절감되지 않습니다. 다음 수단은 SDK를 초기화하는 클라이언트 세션 수, 구성을 폴링하는 서버 인스턴스 수 및 그 빈도 등 MFCR을 실제로 생성하는 요인을 공략합니다.

### 환경 확산 및 서버 SDK 풋프린트 검토 {#review-environment-sprawl-and-server-sdk-footprint}

서버 측 MFCR은 SDK 인스턴스를 실행하는 모든 환경에서 증가합니다. 실제로 실시간 서버 측 플래그 전달이 필요한 [환경][3]을 검토하세요. 브랜치별 또는 CI 환경과 같은 임시 또는 수명이 짧은 인프라는 타겟팅이 필요하지 않은 경우 롤아웃 가치를 더하지 않고 요청 볼륨만 증가시킵니다. 여러 `env` 값이 동일한 논리적 환경에 매핑되는 경우 환경 쿼리를 통합하여 불필요하게 구성 전달이 중복되지 않도록 하세요.

### 사용하지 않는 곳에서 Feature Flags 해제 {#turn-off-feature-flags-where-they-arent-in-use}

서버 SDK를 설치해도 그 자체로 요금이 청구되지는 않으며 공급자가 초기화된 후에만 구성 요청이 발생합니다. 서비스에 트레이서가 설치되어 있지만 플래그를 사용하지 않는 경우, `DD_FEATURE_FLAGS_ENABLED=false`를 설정하여 공급자를 비활성화하고 구성 폴링을 중지합니다. 자세한 내용은 [서버 SDK 구성 소스][2]를 참조하세요.

### 구성 폴링 간격 조정 {#adjust-the-configuration-polling-interval}

에이전트리스 서버 측 전달의 경우, `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_POLL_INTERVAL_SECONDS`로 SDK가 구성을 요청하는 빈도가 제어됩니다. 기본값은 30초이고, 최댓값은 3,600초(1시간)입니다. 간격이 길어지면 요청 볼륨은 줄어들지만 플래그 전파 속도가 느려집니다. 개발 또는 스테이징과 같이 우선 순위가 낮은 환경에서 간격을 늘리는 것도 프로덕션 환경보다 빠른 전파가 덜 중요한 경우 볼륨을 줄이는 한 가지 방법입니다.

### 배포에 맞는 구성 소스 선택 {#choose-a-configuration-source-that-matches-your-deployment}

Agent Remote Configuration을 사용하면 애플리케이션이 Datadog을 직접 폴링하는 대신 로컬 Datadog Agent와 통신합니다. 동일한 호스트에서 여러 애플리케이션 프로세스를 실행하는 경우, 각 프로세스가 에이전트리스 전달로 Datadog을 독립적으로 폴링하는 것보다 공유 Agent를 통해 라우팅하면 구성 요청을 통합할 수 있습니다. Remote Configuration이 활성화된 Agent를 실행하고 유지 관리하는 데 드는 운영 비용과 비교하여 고려하세요. 두 가지 중에서 선택하는 방법은 [서버 SDK 구성 소스][2]를 참조하세요.

### 플래그를 사용하는 위치로 클라이언트 측 SDK 초기화 범위 지정 {#scope-client-side-sdk-initialization-to-where-you-use-flags}

클라이언트 측 MFCR은 플래그 공급자를 초기화하는 애플리케이션에서 세션 또는 앱 열기를 추적합니다. 모든 클라이언트 속성에서 보편적으로 초기화하기보다는 플래그로 기능을 게이팅하는 애플리케이션 및 속성에서만 공급자를 초기화하세요.

### 오래되었거나 사용하지 않는 플래그 정리 {#clean-up-stale-and-unused-flags}

구성 요청이 개수에 상관없이 모든 플래그를 처리하므로 [오래된 플래그][7]는 MFCR에 직접 추가되지 않습니다. 오래된 플래그를 아카이빙하면 플래그 부채와 더 이상 필요하지 않은 서비스 또는 환경에 연결된 로직을 유지 관리하는 데 따르는 위험이 줄어듭니다. 오래된 플래그를 검토하는 것은 더 이상 사용하지 않는 전체 환경 또는 SDK 배포의 서비스를 종료하는 데에도 유용합니다. 이렇게 하면 서버 측 요청 볼륨이 줄어듭니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/feature_flags/concepts/monthly_flag_configuration_requests/
[2]: /ko/feature_flags/concepts/configuration_sources/
[3]: /ko/feature_flags/concepts/environments/
[4]: https://www.datadoghq.com/pricing/?product=feature-flags#products
[5]: /ko/account_management/plan_and_usage/usage_details/
[6]: /ko/account_management/plan_and_usage/bill_overview/
[7]: /ko/feature_flags/concepts/stale_flags/