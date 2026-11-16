---
aliases:
- /ko/real_user_monitoring/browser/monitoring_performance_vitals/
- /ko/real_user_monitoring/browser/optimizing_performance/
description: RUM Optimization 페이지에서 Core Web Vitals 분석과 사용자 경험 시각화를 활용하여 브라우저 성능 문제를
  식별하고 해결하세요.
further_reading:
- link: /synthetics/browser_tests/
  tag: 문서
  text: Synthetic Monitoring에서 브라우저 테스트 구성
- link: https://learn.datadoghq.com/courses/rum-optimize-frontend-performance
  tag: 학습 센터
  text: '대화형 실습: Datadog RUM 브라우저 모니터링으로 프런트엔드 성능 최적화'
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: 블로그
  text: Real User Monitoring
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/
  tag: 블로그
  text: Datadog RUM 및 Synthetic Monitoring으로 코어 웹 바이탈 모니터링
- link: https://www.datadoghq.com/blog/rum-optimization/
  tag: 블로그
  text: '데이터에서 실행까지: Datadog RUM으로 Core Web Vitals 등을 최적화'
title: 성능 최적화
---
## 개요 {#overview}

{{< img src="real_user_monitoring/browser/optimizing_performance/optimization-workflow.mp4" alt="RUM 성능 최적화는 실제 사용자 트래픽을 기반으로 브라우저 성능 문제의 근본 원인을 찾는 데 도움을 줍니다." video="true" >}}

Optimization 페이지는 실제 사용자 트래픽 데이터를 사용하여 브라우저 성능 문제의 근본 원인을 식별하는 데 도움을 줍니다. [Core Web Vitals][1](CWV) 및 사용자 관점에서 전체 페이지 로드 시간을 평가하는 Datadog의 사용자 지정 [Loading Time][2] KPI와 같은 브라우저 KPI를 사용하여 페이지 로드 속도가 느려지는 원인을 파악하고 해결하세요.

Optimization 페이지에서는 심층 분석을 위해 브라우저, 지역, 앱 버전 등의 사용자 특성에 따른 Core Web Vitals의 세부 분석 결과를 제공합니다. 이 정보를 사용하여 시간 경과에 따른 성능 추세를 추적하고, 가장 큰 영향을 받는 사용자 그룹을 파악하며, 최적화 작업의 우선순위를 정확하게 지정할 수 있습니다.

## 전제 조건 {#prerequisites}

애플리케이션을 최적화하려면 다음을 사용하고 있는지 확인하세요.

- [RUM Browser SDK][3] 버전 5.4.0 이상
- 적어도 일부 세션에 [Session Replay][4] 적용

## 핵심 지표 선택 {#selecting-a-vital}

[{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Monitoring{{< /ui >}}][6] 탭에 있는 [Optimization 페이지][5]로 이동합니다.

{{< img src="real_user_monitoring/browser/optimizing_performance/page-selectors.png" alt="Optimization 페이지에서 방문 횟수가 가장 많은 페이지나 특정 페이지를 확인할 수 있습니다." style="width:100%;" >}}

이 보기에서 페이지나 핵심 지표를 선택하는 방법은 다음 두 가지입니다.

- 가장 많이 방문한 페이지의 트리맵에서 선택
- 입력 상자에 뷰 이름을 입력하고 페이지 선택

사용 가능한 핵심 지표는 다음과 같습니다.

- **[Loading Time (LT)][2]**: 사용자 관점에서 페이지가 로드되는 시간을 측정하는 Datadog의 사용자 지정 KPI입니다.
- **[Largest Contentful Paint (LCP)][8]**: 페이지의 가장 큰 시각적 요소가 얼마나 빨리 로드되는지를 측정하며, 이는 사용자 경험과 SEO 순위 모두에 중요한 요소입니다. LCP가 느리면 사용자 불만이 커지고 이탈률이 높아지며 검색 결과에서의 가시성이 저하될 수 있습니다. Optimization 페이지는 LCP를 하위 항목(첫 바이트까지 걸리는 시간(TTFB), 리소스 로드 지연, 리소스 로드 시간, 렌더링 지연)으로 세분화하여 전체 메트릭에 가장 크게 기여하는 단계를 정확히 파악할 수 있도록 합니다.
- **[First Contentful Paint (FCP)][9]**: 사용자가 페이지로 처음 이동한 시점부터 페이지 콘텐츠의 일부가 화면에 렌더링될 때까지의 시간을 측정합니다. FCP가 빠르면 사용자에게 페이지에서 작업이 진행되고 있음을 알려 안심시킬 수 있습니다.
- **[Cumulative Layout Shift (CLS)][10]**: 페이지 수명 주기 동안 예상치 못한 레이아웃 이동이 연속해서 발생한 구간 중 가장 큰 구간을 측정합니다. 레이아웃 이동은 사용자 상호작용 없이 가시적인 요소가 한 렌더링 프레임에서 다음 프레임으로 이동하여 페이지의 시각적 안정성을 방해할 때 발생합니다. 사용자가 예상치 못한 레이아웃 이동을 얼마나 자주 경험하는지 정량화하는 데 도움이 되므로 시각적 안정성을 측정하기 위한 중요한 KPI입니다. CLS가 낮으면 사용자가 페이지를 쾌적하게 이용할 수 있습니다.
- **[Interaction to Next Paint (INP)][11]**: 사용자가 페이지와 상호작용한 후 페이지가 시각적으로 반응하기까지 걸리는 시간을 측정합니다. Optimization 페이지는 INP를 하위 요소(입력 지연, 처리 시간, 표시 지연)로 세분화하여 병목 현상이 메인 스레드 경합, 핸들러 실행, 렌더링 중 어디에서 발생하는지 파악할 수 있게 합니다.

## 필터링 및 평가 {#filter-and-evaluate}

페이지와 핵심 지표를 선택한 후 성능 인사이트를 다음과 같이 분석합니다.

- 오른쪽 상단에서 기간 조정
- 드롭다운을 사용하여 속성별로 필터링
- {{< ui >}}Show Filter Breakdown{{< /ui >}}에서 그룹 선택
- 다양한 백분위수에서 핵심 지표 평가

예를 들어, pc75 평가는 CWV에 일반적으로 사용되는 75백분위수 값을 나타냅니다.

{{< img src="real_user_monitoring/browser/optimizing_performance/filter-and-evaluate.png" alt="선택한 뷰의 핵심 지표를 필터링하고 평가하세요." style="width:100%;" >}}

## 사용자 경험 시각화 {#visualize-the-users-experience}

페이지의 다음 부분은 사용자가 정확히 무엇을 경험하고 있는지 시각화하는 데 도움을 줍니다.

Optimization 페이지에서는 선택한 기간과 트래픽을 기준으로, 선택한 핵심 지표가 캡처되는 시점에 사용자가 페이지에서 보는 화면의 가장 대표적인 예시를 강조 표시합니다. [Session Replay][4]를 사용하는 경우 여기에서 페이지 화면을 볼 수 있습니다.

일부 핵심 지표의 경우 {{< ui >}}See a different element{{< /ui >}}를 클릭하여 분석할 다른 버전의 페이지를 선택할 수도 있습니다.

{{< img src="real_user_monitoring/browser/optimizing_performance/vitals-visualize.png" alt="다양한 요소를 선택하여 사용자 경험을 미리 보고 시각화하세요." style="width:100%;" >}}

Largest Contentful Paint 및 Interaction to Next Paint의 경우, Optimization 페이지는 해당 메트릭을 개별 단계로 세분화한 결과도 표시합니다. 세부 분석 결과를 사용하여 전체 메트릭에 가장 크게 기여하는 단계를 파악하고 해당 단계에 최적화 작업을 집중하세요. 각 하위 항목에 대한 자세한 내용은 [하위 항목을 사용한 Core Web Vitals 진단][14]을 참조하세요.

## 리소스 및 오류 문제 해결 {#troubleshoot-resources-and-errors}

문제 해결 섹션에서는 사용자가 페이지에서 접한 리소스와 오류 중 핵심 지표의 성능에 영향을 미쳤을 가능성이 있는 항목을 확인할 수 있습니다. 예를 들어, Largest Contentful Paint(LCP)의 경우 LCP가 트리거되기 전에 로드된 리소스를 확인할 수 있습니다. LCP는 가장 큰 요소가 페이지에 로드되는 데 걸리는 시간을 나타내는 지표이므로 다음 사항을 조사할 수 있습니다.

- 그 이전에 발생하는 모든 활동이 속도 저하나 렌더링 문제의 원인일 가능성
- 로드 속도가 특히 느리거나 크기가 큰 리소스가 성능 문제에 영향을 미칠 가능성
- 문제를 일으킬 수 있는 반복적인 오류

{{< img src="real_user_monitoring/browser/optimizing_performance/troubleshoot.png" alt="Troubleshooting 섹션에서는 사용자가 페이지에서 접한 리소스와 오류 중 핵심 지표의 성능에 영향을 미쳤을 가능성이 있는 항목을 보여줍니다." style="width:100%;" >}}

## 이벤트 샘플 조회 {#view-event-samples}

나머지 페이지 활동과 함께 전체 컨텍스트를 확인하려면 아래로 스크롤하여 워터폴과 이벤트 타임라인을 살펴보세요. 워터폴은 핵심 지표가 캡처된 시점까지의 이벤트 타임라인을 보여줍니다.

왼쪽 상단의 드롭다운을 사용하여 다른 샘플 이벤트를 선택할 수 있으며, 워터폴의 이벤트를 클릭하여 펼치면 아래와 같이 사이드 패널을 볼 수 있습니다.

{{< img src="real_user_monitoring/browser/optimizing_performance/view-event-samples.png" alt="이벤트 샘플을 조회하여 나머지 페이지 활동과 함께 전체 컨텍스트를 살펴보세요." style="width:100%;" >}}

## 이벤트 샘플 내 브라우저 프로파일링 {#browser-profiling-within-event-samples}
근본 원인을 더 심층적으로 분석하려면 RUM과 브라우저 프로파일링을 함께 사용하여 어떤 JavaScript 또는 렌더링 활동이 느린 응답이나 무응답 현상을 일으키는지 파악하세요. 프로파일링을 사용하면 Core Web Vitals만으로는 항상 확인할 수 없는 성능 문제를 발견할 수 있습니다. 시작하려면 [RUM SDK 구성에서 브라우저 프로파일링이 활성화되어 있는지 확인하세요][12].
{{< img src="real_user_monitoring/browser/optimizing_performance/browser_profiler.png" alt="이벤트 샘플을 분석할 때의 브라우저 프로파일링 예시" style="width:100%;" >}}

## Lighthouse 감사 {#lighthouse-audits}

[Lighthouse][15]는 성능, 접근성, 모범 사례, SEO, 에이전트형 브라우징과 같은 카테고리별로 페이지를 평가하는 Google의 오픈소스 도구로, 사용자 경험을 저하하거나 사용자에게 불편을 주는 요소를 찾아 수정할 수 있도록 지원합니다.

[브라우저 Synthetic 테스트][7]를 통해 Lighthouse 감사를 실행하고 해당 RUM 뷰로 점수를 전송할 수 있습니다. Lighthouse의 실험실 측정 데이터는 이 페이지의 실제 사용자 현장 데이터를 보완하므로 정기적으로 프런트엔드 품질을 추적할 수 있습니다.

감사는 각 테스트 실행에서 최종적으로 도달한 URL을 대상으로 한 번 실행되며, 다음 5개 카테고리의 점수를 0~100점 척도로 보고합니다.

- **Performance**: 페이지가 로드되고, 콘텐츠가 표시되며, 상호작용이 가능한 상태가 되기까지 걸리는 시간을 측정합니다.
- **Accessibility**: 자동화된 검사를 기반으로 장애인이 페이지를 얼마나 원활하게 탐색하고 사용할 수 있는지 측정합니다.
- **Best Practices**: 페이지가 보안, 브라우저 호환성 및 코드 품질에 관한 최신 표준을 준수하는지 측정합니다.
- **SEO**: 검색 엔진이 페이지를 발견, 이해 및 색인화할 수 있는지 측정합니다.
- **Agentic**: AI 에이전트가 페이지를 얼마나 원활하게 이해하고 탐색하며 상호작용할 수 있는지 측정합니다.

### 전제 조건 {#prerequisites-1}

- Datadog 관리형 위치에서 **데스크톱 Chrome**을 사용하여 실행되는 [브라우저 Synthetic 테스트][7]
- RUM 애플리케이션을 선택하고 [테스트에서 RUM 데이터 수집을 활성화][16] 테스트는 로드하는 페이지에 RUM Browser SDK를 주입하므로 테스트 대상 사이트에 별도로 RUM 계측을 적용할 필요가 없습니다.
- 테스트를 저장한 후 예약된 일정에 따라 또는 필요시 실행해야 합니다. 테스트를 생성하거나 기록하는 동안에는 감사가 실행되지 않으며, CI/CD에서 트리거한 테스트 실행에서도 감사가 실행되지 않습니다.

### Lighthouse 감사 설정 {#set-up-a-lighthouse-audit}

RUM 애플리케이션 또는 Synthetic Monitoring에서 다음과 같이 Lighthouse 감사를 활성화할 수 있습니다.

- **RUM 애플리케이션에서**: Optimization 페이지에서 아직 Lighthouse 데이터가 없는 뷰를 선택한 다음 {{< ui >}}Lighthouse{{< /ui >}} 패널의 빈 상태에서 {{< ui >}}Create a Synthetics test{{< /ui >}}를 선택합니다. RUM 데이터 수집 및 Lighthouse 감사가 자동으로 활성화되며 테스트가 RUM 애플리케이션에 연결됩니다. 테스트 구성을 완료하고 저장합니다.
- **Synthetic Monitoring에서**: [브라우저 테스트][7]를 생성하거나 편집하고, [RUM 데이터 수집][16]을 활성화한 후 RUM 애플리케이션을 선택하고 {{< ui >}}Run Lighthouse audit{{< /ui >}}을 켭니다(RUM 데이터 수집이 활성화된 경우에만 사용 가능). 감사하려는 페이지에 도달하는 단계를 기록한 다음 테스트를 저장합니다.

### Lighthouse 결과 조회 {#view-lighthouse-results}

테스트가 실행된 후 Lighthouse 결과는 [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Monitoring{{< /ui >}}][6] 아래 두 위치에 표시됩니다. Lighthouse 패널과 표에는 애플리케이션, 뷰, 기간만 적용됩니다. 브라우저, 국가 또는 팀과 같은 다른 페이지 필터는 적용되지 않습니다.

**Optimization 페이지**에서 단일 뷰를 선택하면 {{< ui >}}Lighthouse{{< /ui >}} 패널에 선택한 기간 내 해당 뷰의 가장 최근 감사 결과가 다음과 같이 표시됩니다.

- 5개 카테고리 점수 게이지
- 이전 기간 대비 각 카테고리 점수의 변화
- Lighthouse로 측정한 랩 메트릭
- 통과 및 실패한 감사 건수
- 시간에 따른 점수 추세

패널에서 Lighthouse 뷰어의 보고서를 열거나, JSON 형식으로 다운로드하거나, 해당 보고서의 출처인 Synthetic 테스트 결과를 열 수 있습니다.

{{< img src="real_user_monitoring/browser/optimizing_performance/lighthouse-panel.png" alt="카테고리 점수, 랩 메트릭, 감사 결과 및 시간에 따른 점수 추세를 보여주는 Lighthouse 패널" style="width:100%;" >}}

**Performance Monitoring 요약 페이지**의 {{< ui >}}Lighthouse{{< /ui >}} 섹션에는 뷰별 점수를 비교하는 **Lighthouse scores by view** 표가 표시됩니다. 백분위수 선택기(기본값 p75)를 사용하여 선택한 기간의 감사 점수 중 표에 표시할 백분위수를 선택한 다음, 행을 선택하여 해당 뷰의 Optimization 페이지를 엽니다.

{{< img src="real_user_monitoring/browser/optimizing_performance/lighthouse-scores-by-view.png" alt="백분위수 선택기가 포함되어 있으며 RUM 뷰 간 카테고리 점수를 비교하는 Lighthouse scores by view 표" style="width:100%;" >}}

### 메트릭 및 속성 {#metrics-and-attributes}

`@synthetics.lighthouse_audited` 속성은 감사를 수행한 각 뷰에서 `true`로 설정됩니다. [RUM Explorer][17]에서 감사를 수행한 뷰를 찾으려면 이벤트 유형을 {{< ui >}}Views{{< /ui >}}로 변경하고 `@synthetics.lighthouse_audited:true`를 검색합니다. 감사를 수행한 뷰는 실제 사용자 세션이 아닌 Synthetic 테스트에서 생성되므로 쿼리에서 `@session.type:user` 필터를 모두 제거합니다.

카테고리 점수는 메트릭으로 제공되므로 대시보드에서 그래프로 시각화하고 모니터를 통해 성능 저하에 대한 경보를 생성할 수 있습니다.

- `rum.measure.lighthouse.performance`
- `rum.measure.lighthouse.accessibility`
- `rum.measure.lighthouse.best_practices`
- `rum.measure.lighthouse.seo`
- `rum.measure.lighthouse.agentic`

Lighthouse 점수 메트릭에는 `application.id` 및 `view.name` 태그가 지정됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[2]: /ko/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[3]: /ko/real_user_monitoring/application_monitoring/browser/setup/
[4]: /ko/session_replay/
[5]: https://app.datadoghq.com/rum/vitals
[6]: https://app.datadoghq.com/rum/performance-monitoring
[8]: https://web.dev/articles/lcp/
[9]: https://web.dev/articles/fcp
[10]: https://web.dev/articles/cls/
[11]: https://web.dev/articles/inp/
[12]: /ko/real_user_monitoring/correlate_with_other_telemetry/profiling
[13]: /ko/real_user_monitoring/guide/browser-sdk-upgrade/#collect-long-animation-frames-as-long-tasks
[14]: /ko/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#diagnose-core-web-vitals-with-subparts
[7]: /ko/synthetics/browser_tests/
[15]: https://developer.chrome.com/docs/lighthouse/overview/
[16]: /ko/synthetics/guide/explore-rum-through-synthetics/
[17]: /ko/real_user_monitoring/explorer/