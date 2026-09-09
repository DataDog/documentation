---
description: 중요한 사용자 흐름을 모니터링하고 분석하여 사용자 경험 및 기술 관련 문제를 해결하세요.
title: Journey Monitoring
---
{{< callout url="https://www.datadoghq.com/product-preview/journey-monitoring/" btn_hidden="false" header="미리 보기에 참여하세요!">}}
Journey Monitoring은 미리 보기로 제공되고 있습니다.
{{< /callout >}}

## 개요 {#overview}

**Journey Monitoring**을 사용하면 로그인, 결제, 미디어 스트리밍과 같은 중요한 사용자 흐름의 상태를 한곳에서 모두 추적할 수 있습니다. 특정 흐름에 대해 다음 질문에 답할 수 있습니다.
- 사용자가 불편을 겪고 있나요?
- 성능이 얼마나 빠르고 안정적인가요?
- 문제가 프론트엔드, 네트워크, 백엔드 중 어디에서 발생하나요?

*여정*은 시작 이벤트와 종료 이벤트로 정의되는 사용자 흐름입니다. 예를 들어, 결제 여정은 사용자가 결제 페이지에 도착하는 순간부터 결제 프로세스를 완료할 때까지의 경험을 포착합니다. Journey Monitoring은 [Real User Monitoring][1], [Synthetic Monitoring & Testing][2], [Product Analytics][3], [Session Replay][4]에서 데이터를 가져와 각 여정의 트래픽, 전환율, 가동 시간, 오류를 하나의 보고서에 표시합니다.

이를 통해 엔지니어링, 제품, 개발자 운영 팀은 도구를 전환할 필요 없이 여정 상태에 대한 공유 보기를 확인할 수 있습니다.

{{< img src="journey_monitoring/journey-monitoring-map-2.png" alt="왼쪽에는 트래픽 및 전환 메트릭이 포함된 여정 카탈로그가 있고, 오른쪽에는 애플리케이션 보기와 액션 간의 사용자 경로를 표시하는 시각적 흐름 맵이 있는 Journey Monitoring 맵입니다." style="width:100%;" >}}

## 기능 {#capabilities}

각 여정에 대해 다음을 수행할 수 있습니다.
- 여정의 인바운드 트래픽, 전환율, 완료 시간을 측정합니다.
- [Synthetic 테스트 모음][10]을 기반으로 한 가동 시간 SLO를 사용하여 여정의 가용성을 추적합니다.
- 사용자가 이탈하는 지점을 파악하고 [Session Replay][4]를 통해 개별 세션을 조사합니다.
- [RUM 작업][13]을 사용하여 여정의 중요한 단계에 대한 성능을 측정합니다.
- 엔지니어링, 제품, 개발자 운영 팀 전반에 걸쳐 여정 상태에 대한 통합 보기를 공유합니다.

## 전제 조건 {#prerequisites}

Journey Monitoring을 사용하려면 프론트엔드 애플리케이션에서 다음 제품 중 **하나 이상**이 활성화되어 있어야 하며, 각 제품은 여정에 서로 다른 데이터를 제공해야 합니다.

- **[RUM without Limits][5]**: RUM 작업을 통한 프론트엔드 오류 및 성능 추적
- **[Product Analytics][8]**: 트래픽, 전환율, 전환 시간 메트릭
- **[Synthetic 브라우저 테스트][6] 또는 [Synthetic 모바일 테스트][7]**: 여정의 자동 생성된 테스트 모음을 통한 가동 시간 추적

## 여정 구조 {#journey-structure}

여정의 시작과 끝은 [Real User Monitoring][1]의 액션 또는 조회 이벤트일 수 있습니다.

각 여정은 하나 이상의 변형을 가질 수 있습니다. 변형은 사용자가 여정의 시작과 끝 사이에서 특정 순서로 진행하는 중간 단계입니다. 당연히 사용자마다 서로 다른 경로를 따릅니다. 예를 들어, 어떤 사용자는 선택적 단계를 건너뛰는 반면 다른 사용자는 여정을 완료하기 전에 우회 경로를 택할 수 있습니다.

{{< img src="journey_monitoring/journey-monitoring-explainer-diagram-final.png" alt="시작 이벤트, 종료 이벤트, 3개의 변형이 있는 여정 다이어그램으로, 라이브 환경에서는 RUM 및 Product Analytics로, Synthetic 환경에서는 Synthetic 테스트로 모니터링됩니다." style="width:100%;" >}}

## 설정 {#setup}

여정의 시작 및 종료 이벤트를 선택하여 여정을 정의한 다음 다른 Digital Experience 제품의 데이터로 커버리지를 확장하세요.

### 1단계 - 여정 생성 {#step-1-create-a-journey}

1. **Digital Experience > Journey Monitoring**으로 이동합니다.
2. **New Journey**를 클릭하거나 [추천 여정][11]을 선택합니다.

### 2단계 - 여정 세부 정보 지정 {#step-2-specify-journey-details}

1. 프론트엔드 애플리케이션을 선택합니다.
2. 여정 이름을 추가합니다.
3. 하나 이상의 시작 이벤트를 선택합니다.
4. 하나 이상의 종료 이벤트를 선택합니다.
5. **Save Journey**를 클릭합니다.

오른쪽 깔때기형 차트는 선택한 시작 및 종료 이벤트에 따라 자동으로 업데이트됩니다. 깔때기형 차트에서는 각 단계의 볼륨, 전환율, 평균 완료 시간을 보여줍니다.

**참고**: 추천 여정에서 시작하는 경우 필수 필드가 미리 채워집니다.

설명, 속성 필터, 팀 소유권, 태그, [변형][9]을 추가할 수도 있습니다. **Save Journey**를 클릭하면 여정이 생성되고 여정의 [세부 보고서][12]로 리디렉션됩니다. 세부 보고서에는 여정의 볼륨, 전환율, 평균 완료 시간에 대한 메트릭이 포함됩니다.

### 3단계 - 다른 제품에서 커버리지 추가 {#step-3-add-coverage-from-other-products}

여정의 세부 보고서에서 보유한 제품을 바탕으로 모니터링 커버리지를 확장할 수 있습니다.

- 실제 사용자 환경에서 여정의 중요한 단계에 대한 성능을 모니터링하려면 [RUM 작업][13]을 생성합니다.
- 가동 시간 추적을 시작하려면 여정의 [테스트 모음][14]에 Synthetic 테스트를 추가합니다.

여정을 포괄하는 RUM 작업 또는 Synthetic 테스트가 이미 생성되어 있는 경우, Datadog은 여정의 세부 보고서에 해당 작업 또는 테스트를 표시합니다.

## 메트릭 {#metrics}

각 여정과 해당 변형에는 다음과 같은 성능 메트릭이 있습니다.
- **트래픽**: 사용자 세션 전반에 걸친 총 여정 시도 횟수입니다. `rum.measure.journey` 메트릭을 기준으로 합니다.
- **전환**: 완료된 여정 시도의 비율입니다. `rum.measure.journey` 메트릭을 기준으로 합니다.
- **전환 시간**: 모든 사용자 세션에서 여정을 완료하는 데 걸린 평균 시간입니다. `rum.measure.journey.duration` 메트릭을 기준으로 합니다.
- **가동 시간**: [Synthetic 테스트 모음][14] 가동 시간을 기준으로 한 여정의 가용성입니다.

## 다음 단계 {#whats-next}

{{< whatsnext desc="Journey Monitoring 살펴보기:" >}}
   {{< nextlink href="/journey_monitoring/map/" >}}<strong>맵</strong>: 모든 여정과 해당 트래픽 및 전환 메트릭을 시각화합니다.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/map/suggested_journeys/" >}}<strong>추천 여정</strong>: 애플리케이션 내 실제 사용자 행동을 기반으로 자동 생성된 여정 추천을 받을 수 있습니다.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/details_report/" >}}<strong>세부 보고서</strong>: 통합 보고서에서 여정의 트래픽, 전환, 오류, 가동 시간을 분석합니다.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/details_report/variants/" >}}<strong>변형</strong>: 사용자가 여정을 거치며 선택하는 다양한 경로를 추적하고 비교합니다.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/uptime/" >}}<strong>가동 시간</strong>: 자동으로 생성된 Synthetic 테스트 모음으로 여정의 가용성을 측정합니다.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ko/real_user_monitoring/
[2]: /ko/synthetics/
[3]: /ko/product_analytics/
[4]: /ko/session_replay/
[5]: /ko/real_user_monitoring/rum_without_limits/
[6]: /ko/synthetics/browser_tests/
[7]: /ko/synthetics/mobile_app_testing/
[8]: /ko/product_analytics/
[9]: /ko/journey_monitoring/details_report/variants/
[10]: /ko/journey_monitoring/uptime/
[11]: /ko/journey_monitoring/map/suggested_journeys/
[12]: /ko/journey_monitoring/details_report/
[13]: /ko/real_user_monitoring/operations_monitoring/
[14]: /ko/synthetics/test_suites/#service-level-objectives