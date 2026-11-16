---
aliases:
- /ko/real_user_monitoring/product_analytics
- /ko/real_user_monitoring/guide/rum-for-product-analytics
description: Product Analytics를 사용하면 애플리케이션 사용 현황을 한눈에 파악할 수 있습니다.
further_reading:
- link: /product_analytics/analytics_explorer/
  tag: 설명서
  text: Analytics Explorer
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: 학습 센터
  text: Product Analytics 시작하기
- link: https://learn.datadoghq.com/courses/define-user-behavior-with-labeled-actions-in-product-analytics
  tag: 학습 센터
  text: Product Analytics에서 레이블이 지정된 액션을 사용하여 사용자 행동 정의
- link: https://www.datadoghq.com/blog/product-signal-latency-gap/
  tag: 블로그
  text: 성장을 둔화시키는 제품 신호 지연 격차
- link: https://www.datadoghq.com/blog/ai-summaries-and-smart-chapters/
  tag: 블로그
  text: AI 요약 및 스마트 챕터로 Session Replay를 더 빠르게 파악
- link: https://www.datadoghq.com/blog/product-data-best-practices
  tag: 블로그
  text: 제품 데이터가 실제로 의미하는 바
- link: https://www.datadoghq.com/blog/guardrail-metrics
  tag: 블로그
  text: 가드레일 메트릭을 활용하고 릴리스를 수동으로 감시하는 번거로움 줄이기
- link: https://www.datadoghq.com/blog/product-analytics-faster-decisions
  tag: 블로그
  text: Datadog Product Analytics로 더 빠르고 나은 제품 결정 내리기
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: 블로그
  text: '성능에서 영향까지: 공유 컨텍스트를 통한 프런트엔드 팀 연결하기'
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: 블로그
  text: Product Analytics를 사용하여 데이터 기반 설계 결정 내리기
title: Product Analytics
---
{{< learning-center-callout header="학습 센터에서 Product Analytics 시작하기" btn_title="지금 등록" btn_url="https://learn.datadoghq.com/courses/getting-started-product-analytics">}}
  Datadog 체험 계정을 사용하여 의미 있는 디지털 제품 메트릭을 정의하고 Product Analytics에서 시각화하는 방법을 알아보세요. 지금 무료로 등록하세요!
{{< /learning-center-callout >}}

## 개요 {#overview}

Product Analytics를 사용하면 사용자 행동에 대한 인사이트를 얻고 데이터 기반 의사결정을 내릴 수 있습니다. 애플리케이션에서 다음과 같은 사용 사례를 지원합니다.

- [제품 도입 이해](#understand-product-adoption)
- [전환율 및 시간 경과에 따른 변화 추적](#track-conversion-rates-and-their-evolution-over-time)
- [주요 사용자 행동 패턴 추적](#track-key-user-behavior-patterns)
- [사용자 상호작용 시각화](#visualize-user-interactions)

## 애플리케이션 계측{#instrument-your-application}

Product Analytics는 Datadog SDK를 통해 클라이언트 측 사용자 활동 데이터를 수집합니다. API를 통해 서버 측 이벤트를 전송하여 클라이언트 측 데이터를 보완할 수도 있습니다.

시작하려면 애플리케이션에 [Datadog SDK를 추가](#track-client-side-events-sdk)하고 Datadog에서 [Product Analytics를 활성화](#enable-product-analytics)하세요. [API를 통해 서버 측 이벤트를 전송](#track-server-side-events-api)할 수도 있습니다.

<div class="alert alert-info">Product Analytics는 <a href="/real_user_monitoring/#what-is-real-user-monitoring">Real User Monitoring (RUM)</a>과 동일한 SDK 및 구성을 사용하며, 기본적으로 데이터를 15개월 동안 보관합니다. 자세한 내용은 <a href="/data_security/data_retention_periods/">Datadog의 데이터 보존 기간</a>을 참조하세요.</div>

### 클라이언트 측 이벤트 추적(SDK) {#track-client-side-events-sdk}

사용자 장치에서 페이지 조회나 버튼 클릭과 같은 이벤트를 수집하여 Datadog으로 전송합니다.

사용자 활동 데이터 수집을 시작하려면 애플리케이션에 Datadog SDK를 추가하세요. 이미 RUM을 구성했다면 Product Analytics를 위해 애플리케이션을 다시 계측할 필요가 없습니다.

Datadog에 아직 설정된 애플리케이션이 없다면 플랫폼에 대한 지침을 따르세요.

- [브라우저][14]
- [iOS][15]
- [Android][16]

코딩 어시스턴트로 애플리케이션을 설정하려면 [Agentic Onboarding][17]을 참조하세요.

### 서버 측 이벤트 추적(API) {#track-server-side-events-api}

클라이언트 측 수집을 설정한 후 [Product Analytics API][21]를 사용하여 결제 완료나 결제 처리와 같은 사용자 지정 이벤트를 서버에서 보낼 수 있습니다. 자세한 내용은 [서버 측 이벤트 추적][22]을 참조하세요.

<div class="alert alert-warning">Datadog은 서버 측 이벤트를 별도로 청구합니다. 자세한 내용은 <a href="https://www.datadoghq.com/pricing/?product=product-analytics#products">가격 책정 페이지</a>를 참조하고, 추가 질문이 있으면 Customer Success Manager에게 문의하세요.</div>

## Product Analytics 활성화 {#enable-product-analytics}

사용자 행동을 모니터링하려는 각 애플리케이션에 대해 Product Analytics를 활성화하세요.

1. Datadog에서 {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Real User Monitoring{{< /ui >}} > [{{< ui >}}Manage Applications{{< /ui >}}][9]로 이동합니다. {{< ui >}}Active{{< /ui >}} 아래의 애플리케이션 목록에서 모니터링할 애플리케이션을 선택합니다.
2. {{< ui >}}PRODUCT SETTINGS{{< /ui >}}에서 {{< ui >}}Product Analytics{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Enable{{< /ui >}} 버튼을 클릭합니다.

{{< img src="product_analytics/enable-product-analytics.png" alt="애플리케이션 관리 페이지에서 Product Analytics를 활성화합니다.">}}

## 데이터 이해 {#understand-your-data}
Datadog SDK는 세션, 보기, 액션이라는 세 가지 수준의 클라이언트 측 사용자 데이터를 자동으로 수집합니다.:  RUM 이벤트 유형에 대한 전체 분석은 [RUM 이벤트 계층 이해][19]를 참조하세요. SDK를 설정한 후 [Product Analytics API][21]를 통해 서버 측 이벤트를 전송할 수도 있습니다.

**세션**
: 세션은 사용자가 애플리케이션을 여는 순간부터 떠날 때까지의 전체 여정을 의미합니다.

**보기**
: 보기는 사용자가 세션 내에서 방문하는 각 페이지나 화면을 나타냅니다.

**액션**
: 액션은 클릭, 탭, 스크롤과 같이 사용자가 페이지에서 수행하는 동작입니다. 액션은 RUM SDK에 의해 자동으로 수집됩니다. [퍼널][4] 및 [세그먼트][6]와 같은 기능을 구성할 때 특정 액션을 단계나 필터로 선택할 수 있습니다. 사용 가능한 액션을 확인하려면 [RUM Explorer][20]를 열고 {{< ui >}}Actions{{< /ui >}}로 필터링하세요.

**서버 측 이벤트**
: 서버 측 이벤트는 결제 완료나 결제 처리와 같이 [Product Analytics API][21]를 통해 전송되는 사용자 지정 이벤트입니다. 이벤트 선택기에서 {{< ui >}}Server Events{{< /ui >}}를 선택하여 분석의 범위를 서버 측 데이터로 설정하세요.

## Product Analytics UI 탐색 {#navigate-the-product-analytics-ui}
각 Product Analytics 기능은 사용자 여정에 대한 컨텍스트를 제공합니다.

### 제품 도입 이해 {#understand-product-adoption}
[홈][3] 페이지에서는 사용자 활동과 제품 도입 현황을 한눈에 파악할 수 있습니다. 이곳은 Product Analytics에 액세스할 때 가장 자주 방문하게 되는 페이지입니다.

{{< img src="/product_analytics/pana_home_page.png" alt="퍼널 분석을 통해 엔드투엔드 전환을 파악해 보세요.">}}

기본적으로 이 페이지에는 `active users`, `page views`, `average time spent by user` 차트가 표시되지만, 추가 차트나 대시보드를 추가할 수 있습니다. 홈 페이지에는 제품의 사용자와 사용 현황에 대한 추가적인 컨텍스트를 제공하는 다음과 같은 기본 하위 섹션도 포함되어 있습니다.

[사용자](https://app.datadoghq.com/product-analytics/user-trends)
: 누가 제품을 사용하고 있는지 한눈에 파악할 수 있습니다.

[앱 및 장치](https://app.datadoghq.com/product-analytics/app-and-devices)
: 데스크톱과 모바일 사용 비율을 시각화하고, 사용 중인 버전을 파악하며, 어떤 버전을 더 이상 지원하지 않아도 될지 확인할 수 있습니다.

[참여도](https://app.datadoghq.com/product-analytics/engagement-and-features)
: 사용자가 제품과 어떻게 상호작용하는지 이해하고, 사용자가 페이지에 얼마나 머무르는지, 가장 많이 수행하는 액션은 무엇인지와 같은 질문에 대한 답을 얻을 수 있습니다. 

[트래픽](https://app.datadoghq.com/product-analytics/traffic-and-acquisition)
: 이탈률, 주요 트래픽 소스, 그리고 성장의 실제 원천을 확인하세요.

[성능](https://app.datadoghq.com/product-analytics/performance)
: 가장 빈번하게 발생하는 오류와 불편 사항을 확인하고, 이러한 오류가 정확히 어떤 보기에 영향을 미치는지 파악하세요.

<br>


### 전환율 및 시간 경과에 따른 변화 추적 {#track-conversion-rates-and-their-evolution-over-time}
Product Analytics 차트를 사용하면 사용자가 제품을 사용하는 동안의 여정을 시각화할 수 있습니다.

{{< img src="/product_analytics/pana_charts_video.mp4" alt="차트를 사용하여 사용자 여정을 시각화합니다." video="true">}}

각 차트 유형은 사용자 여정에 대한 서로 다른 관점을 제공합니다.

[경로][5]
: 애플리케이션 전반의 모든 사용자 여정을 시각화하여 중요 경로를 분석합니다.

[퍼널][4]
: 주요 워크플로 전반의 전환율을 추적하여 엔드투엔드 사용자 여정에서 발생하는 병목 현상을 파악하고 이를 해결합니다. <br> 예를 들어, 웹사이트 성능 저하로 인해 특정 지점에서 고객이 이탈하는지 확인하거나, 워크플로에 새로운 단계를 추가했을 때 이탈률에 어떤 영향을 미치는지 측정할 수 있습니다.

[유지율][2]
: 사용자가 페이지나 액션으로 얼마나 자주 성공적으로 돌아오는지 측정하여 전반적인 사용자 만족도에 대한 인사이트를 얻을 수 있습니다.

[분석][13]
: 사용 데이터를 집계하여, 사용자가 제품과 상호작용하는 방식을 보여줍니다.

<br>

### 주요 사용자 행동 패턴 추적 {#track-key-user-behavior-patterns}
[사용자 및 세그먼트][6]를 사용하여 공유된 특성을 기반으로 사용자를 그룹화하세요. 예를 들어, 사용자가 장바구니에 항목을 추가하지만 결제는 하지 않는 것을 발견하면 해당 사용자에 대한 세그먼트를 만들고 구매를 완료하도록 유도하는 이메일을 보낼 수 있습니다.

{{< img src="/product_analytics/segmentation/userprofiles_pana-ga.png" alt="사용자의 개별 프로필을 확인하고 이러한 프로필에서 세그먼트를 만드세요.">}}

### 사용자 상호작용 시각화 {#visualize-user-interactions}
다음 기능을 활용하여 애플리케이션 UI 변경과 같은 제품 변경 결정을 내리는 데 참고하세요. 사용자가 페이지를 어떻게 탐색하는지, 다른 경로보다 더 많이 이용하는 경로가 있는지, 또는 어떤 부분에서 액션 및 흐름을 더 원활하게 개선할 수 있는지 확인함으로써 이를 파악할 수 있습니다.

{{< img src="/product_analytics/pana_session_replay_page.png" alt="사용자의 브라우징 경험을 캡처하고 재생하여 제품 디자인 결정에 정보를 활용하세요.">}}

[Session Replay][11] 
: 사용자의 웹 브라우징 또는 모바일 앱 경험을 캡처하고 다시 재생합니다.<br><br>이는 오류 식별, 재현 및 해결에 유용하며 애플리케이션의 사용 패턴과 디자인 결함에 대한 인사이트를 제공합니다.

[히트맵][10]
: Session Replay 데이터 위에 오버레이된 사용자 상호 작용을 시각화합니다. Product Analytics에는 클릭 맵, 상위 요소, 스크롤 맵 등 세 가지 유형의 히트맵이 있습니다.:  <br><br> 히트맵을 사용하면 복잡한 데이터를 한 번에 정리하여 사용자 경험을 최적화할 인사이트를 얻을 수 있습니다.

[재생목록][12]
: Session Replay의 재생목록을 만들어 관찰한 패턴에 따라 정리할 수 있습니다. [Session Replay 재생목록][12]에 대해 더 알아보세요.
<br>


## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[2]: /ko/product_analytics/charts/retention_analysis
[3]: https://app.datadoghq.com/product-analytics
[4]: /ko/product_analytics/charts/funnel_analysis
[5]: /ko/product_analytics/charts/pathways
[6]: /ko/product_analytics/segmentation/
[9]: https://app.datadoghq.com/rum/list
[10]: /ko/session_replay/heatmaps
[11]: /ko/session_replay/
[12]: /ko/session_replay/playlists
[13]: /ko/product_analytics/charts/analytics_explorer
[14]: /ko/real_user_monitoring/application_monitoring/browser
[15]: /ko/real_user_monitoring/application_monitoring/ios
[16]: /ko/real_user_monitoring/application_monitoring/android
[17]: /ko/product_analytics/agentic_onboarding
[19]: /ko/real_user_monitoring/guide/understanding-the-rum-event-hierarchy
[20]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aaction
[21]: /ko/api/latest/product-analytics/#send-server-side-events
[22]: /ko/product_analytics/data_collected/server_side_events/