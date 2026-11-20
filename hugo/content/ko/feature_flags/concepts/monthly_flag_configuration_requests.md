---
description: Feature Flags의 과금 단위인 월간 플래그 구성 요청(MFCR)과 클라이언트 측 및 서버 측 SDK가 이를 다르게
  생성하는 방식을 이해합니다.
further_reading:
- link: /feature_flags/concepts/configuration_sources
  tag: 설명서
  text: 서버 측 SDK 구성 소스
- link: /feature_flags/guide/estimating_and_managing_costs
  tag: 설명서
  text: Feature Flags 비용 추정 및 관리
- link: /account_management/plan_and_usage/usage_details
  tag: 설명서
  text: 사용량 세부 정보
- link: /account_management/plan_and_usage/bill_overview
  tag: 설명서
  text: 청구 개요
title: 월간 플래그 구성 요청(MFCR)
---
## 개요 {#overview}

Datadog은 **월간 플래그 구성 요청(MFCR)**을 기준으로 Feature Flags에 대해 과금합니다. MFCR은 SDK가 플래그, 변형 및 타겟팅 규칙이 포함된 페이로드인 플래그 구성 파일을 요청할 때마다 계산됩니다. MFCR은 애플리케이션 코드가 플래그를 평가하는 횟수를 계산하지 않습니다.

Feature Flags SDK는 이미 보유하고 있는 구성 파일에 대해 로컬 메모리 내에서 플래그를 평가합니다. 평가는 네트워크 호출을 수행하지 않으므로 Datadog은 평가 볼륨별로 사용량을 측정할 수 없습니다. 대신 기능 플래그 과금은 SDK가 로컬 평가를 가능하게 하는 구성 파일을 얼마나 자주 요청하는지를 측정합니다.

## MFCR 생성 원인 {#what-generates-an-mfcr}

플래그 구성 파일이 요청될 때마다 MFCR이 증가합니다. 구성 요청은 다음과 같은 경우에 발생합니다.

- 클라이언트 측 SDK**가 초기화될 때, 이는 일반적으로 사용자가 모바일 앱을 열거나 웹 페이지를 로드할 때 발생합니다.**
- 서버 측 SDK**가 정기적인 간격으로 업데이트된 구성 파일을 확인할 때**

요청 자체는 전달 경로에 따라 다른 곳으로 이동합니다. 클라이언트 측 SDK와 에이전트 없는 전달을 사용하는 서버 측 SDK는 Fastly에서 실행되는 Datadog의 CDN에 직접 구성을 요청합니다. 에이전트 전달을 사용하는 서버 측 SDK는 구성을 직접 요청하지 않으며, Datadog Agent가 Remote Configuration을 통해 SDK를 대신하여 요청합니다. 서버 측 SDK가 이러한 전달 경로 중에서 선택하는 방법은 [Server SDK Configuration Sources][1]를 참조하십시오.

SDK를 설치하는 것만으로는 구성 요청이 생성되지 않습니다. 요청은 애플리케이션 코드가 SDK를 초기화(클라이언트 측)하거나 구성 소스(서버 측)를 명시적으로 선택한 후에만 시작됩니다.

구성 파일의 플래그 수는 개수에 영향을 주지 않습니다. 단일 구성 요청으로 임의 개수의 플래그를 전달할 수 있습니다. [MFCR로 계산되지 않는 항목](#what-doesnt-count-as-an-mfcr)을 참조하세요.

## 클라이언트 측 대 서버 측 SDK 청구 {#client-side-vs-server-side-sdk-billing}

클라이언트 측 및 서버 측 SDK는 구성 요청을 다르게 생성하므로 MFCR 볼륨에 기여하는 방식도 다릅니다.

### 클라이언트 측 SDK {#client-side-sdks}

[클라이언트 측 SDK][2]는 초기화될 때 CDN에 구성을 요청합니다. 이는 일반적으로 사용자가 모바일 앱을 열거나 웹 페이지를 로드할 때 발생합니다. SDK는 해당 구성을 세션이 유지되는 동안 장치에 로컬로 캐시합니다.

각 요청이 앱 열기 또는 페이지 로드에 매핑되므로 클라이언트 측 MFCR 볼륨은 최종 사용자 트래픽과 밀접하게 연관됩니다. 예로는 샘플링되지 않은 RUM 세션, 또는 클라이언트 측 플래그가 사용되는 속성 전반의 일일 활성 사용자나 세션이 있습니다.

### 서버 측 SDK {#server-side-sdks}

[서버 측 SDK][3]는 최종 사용자 요청당이 아니라 주기적인 간격으로 구성을 요청합니다. 전달 경로에 따라 해당 요청은 CDN으로 직접 이동하거나(에이전트 없는 전달) Datadog Agent를 통해 이동합니다(Agent delivery). 실행 중인 각 인스턴스(예: 각 호스트, 컨테이너 또는 서비스)는 독립적으로 자체 구성 요청을 생성합니다. 결과적으로 서버 측 SDK의 MFCR 볼륨은 실행 중인 인스턴스 수와 업데이트된 구성을 요청하는 빈도에 따라 달라집니다. 이는 해당 인스턴스가 처리하는 최종 사용자 트래픽의 양과는 무관합니다.

단일 서버 측 구성 요청은 대량의 최종 사용자 트래픽을 처리하는 인스턴스에 구성을 제공할 수 있습니다. 이 때문에 Datadog은 서버 측 구성 요청에 대해 원시 수의 10배를 청구합니다.

### 클라이언트 측 및 서버 측 통합 사용량 {#combined-client-side-and-server-side-usage}

클라이언트 측 및 서버 측 SDK를 모두 사용하는 경우 총 MFCR 사용량은 둘의 합계입니다. 서버 측 승수를 적용한 후 클라이언트 측 구성 요청을 서버 측 구성 요청에 추가하십시오.

## MFCR로 간주되지 않는 항목 {#what-doesnt-count-as-an-mfcr}

플래그 평가는 MFCR로 간주되지 않습니다. SDK가 구성 파일을 수신하면 추가 네트워크 호출 없이 해당 캐시된 파일에 대해 로컬에서 플래그를 평가합니다. 따라서:

- 단일 구성 요청에 임의 개수의 플래그가 포함될 수 있습니다.
- 애플리케이션은 추가 MFCR을 생성하지 않고 해당 플래그 각각을 여러 번 평가할 수 있습니다.

## 사용량 및 청구 조회 {#view-usage-and-billing}

MFCR 사용량과 이것이 Feature Flags 청구에 어떻게 반영되는지 확인하려면 [사용량 세부 정보][4] 및 [청구 개요][5]로 이동하십시오.

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/feature_flags/concepts/configuration_sources/
[2]: /ko/feature_flags/client/
[3]: /ko/feature_flags/server/
[4]: /ko/account_management/plan_and_usage/usage_details/
[5]: /ko/account_management/plan_and_usage/bill_overview/