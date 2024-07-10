---
further_reading:
- link: https://learn.datadoghq.com/courses/core-web-vitals-lab
  tag: 학습 센터
  text: '인터랙티브 랩: 코어 웹 바이탈'
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: 블로그
  text: 실제 사용자 모니터링(RUM)
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/
  tag: 블로그
  text: Datadog RUM 및 Synthetic 모니터링으로 코어 웹 바이탈 모니터링
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: Datadog에서 보기 탐색
- link: /real_user_monitoring/explorer/visualize/
  tag: 설명서
  text: 이벤트에 시각화 적용
- link: /real_user_monitoring/platform/dashboards/
  tag: 설명서
  text: RUM 대시보드에 대해 알아보기
title: 페이지 성능 모니터링
---

## 개요

RUM 보기 이벤트는 모든 페이지 보기에 대한 광범위한 성능 메트릭을 수집합니다. 애플리케이션의 페이지 조회수를 모니터링하고 대시보드와 RUM Explorer에서 성능 메트릭을 탐색하세요.

{{< img src="real_user_monitoring/browser/waterfall-4.png" alt="RUM 탐색기에서 RUM 보기의 성능 탭에 있는 워터폴 그래프" style="width:100%;" >}}

다음에서 보기에 대한 성능 메트릭에 액세스할 수 있습니다:

- 애플리케이션 성능에 대한 높은 수준의 보기를 제공하는 기본 제공 [RUM 대시보드][1]를 사용할 수 있습니다. 예를 들어, RUM에서 수집한 [기본 속성][2]을 필터링하여 [성능 개요 대시보드][3]에서 사용자 하위 집합에 영향을 미치는 문제를 표시할 수 있습니다. 이 대시보드를 복제하여 필요에 맞게 사용자 지정하고 대시보드의 쿼리에서 [RUM 성능 메트릭](#all-performance-metrics)을 사용할 수도 있습니다.
- 성능 워터폴은 특정 페이지 보기의 성능 문제를 해결할 수 있는 [RUM 탐색기][4]의 모든 RUM 보기 이벤트에 액세스할 수 있습니다. 웹사이트 자산 및 리소스, 긴 작업, 프론트엔드 오류가 최종 사용자의 페이지 수준 성능에 미치는 영향을 표시합니다.

## 이벤트 타이밍 및 코어 웹 바이탈

<div class="alert alert-warning">
  Datadog의 Core Web Vitals 메트릭은 <a href="https://github.com/DataDog/browser-sdk">@datadog/browser-rum</a> 패키지 v2.2.0 이상부터 사용할 수 있습니다.
</div>

[Google의 Core Web Vitals][5]은 사이트의 사용자 경험을 모니터링하기 위해 고안된 세 가지 메트릭 세트입니다. 이러한 메트릭은 로드 성능, 상호 작용 및 시각적 안정성을 파악하는 데 중점을 둡니다. 각 메트릭에는 우수한 사용자 경험으로 해석되는 값의 범위에 대한 지침이 함께 제공됩니다. Datadog은 이러한 메트릭의 75번째 백분위수를 모니터링할 것을 권장합니다.

{{< img src="real_user_monitoring/browser/core-web-vitals.png" alt="Core Web Vitals 요약 시각화" >}}

- 백그라운드에서 열린 페이지(예: 새 탭 또는 초점이 없는 창)에 대해서는 첫 번째 Input Delay 및 Largest Contentful Paint가 수집되지 않습니다.
- 실제 사용자의 페이지 보기에서 수집된 메트릭은 [Synthetic 브라우저 테스트][6]와 같이 고정되고 통제된 환경에서 로드된 페이지에 대해 계산된 메트릭과 다를 수 있습니다. Synthetic 모니터링은 실제 메트릭이아닌 실험실 메트릭으로 Largest Contentful Paint 및 Cumulative Layout Shift를 표시합니다.

| 메트릭                   | 초점            | 설명                                                                                           | 대상 값 |
|--------------------------|------------------|-------------------------------------------------------------------------------------------------------|--------------|
| [Largest Contentful Paint][7] | 로드 성능 | 뷰포트 내 최대의 DOM 오브젝트 (즉, 화면에 표시됨)가 렌더링 되는 페이지 로드 타임 라인의 순간.         | <2.5s       |
| [First Input Delay][8]        | 상호 작용    | 사용자가 페이지와 처음 상호 작용한 후 브라우저의 응답까지 경과한 시간.             | <100ms      |
| [Cumulative Layout Shift][9]  | 시각적 안정성 | 동적으로 로드된 콘텐츠(예: 타사 광고)로 인한 예기치 않은 페이지 이동을 정량화합니다. 여기서 0은 이동이 발생하지 않음을 의미합니다. | <0.1        |
| [Next Paint와 상호작용][19]| 상호 작용    | 사용자의 페이지 상호작용과 다음 페인트 간에 경과한 가장 긴 시간. RUM SDK v5.1.0이 필요함. | <200ms        |

### Core Web Vitals 대상 요소

근본 문제를 알아내고 성능을 향상하려면 먼저 Core Web Vitals 메트릭 수치를 높인 요소가 무엇인지 알아내야 합니다.
RUM에서는 각 Core Web Vital 인스턴스와 연관된 요소를 보고합니다.

- Largest Contentful Paint의 경우, RUM에서 최대 컨텐츠풀 페인트에 해당하는 요소의 CSS 선택기를 보고합니다.
- Next Paint와 상호작용의 경우, RUM에서 다음 페인트와 상호작용 시간이 가장 많이 걸린 요소의 CSS 선택기를 보고합니다.
- First Input Delay의 경우, Rum에서 사용자가 첫 번째로 상호작용한 요소의 CSS 선택기를 보고합니다.
- Cumulative Layout Shift의 경우, RUM에서 가장 많이 움직여 CLS에 영향을 준 요소의 CSS 선택기를 보고합니다.

## 모든 성능 메트릭

| 속성                       | 유형        | 설명                                                                                                                                                                                                                      |
|---------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | 숫자 (ns) | 현재 보기에 소요된 시간.                                                                                                                                                                                                  |
| `view.first_byte`               | 숫자 (ns) | 보기의 첫 번째 바이트가 수신될 때까지 경과된 시간.                                                                                                |
| `view.largest_contentful_paint` | 숫자(ns) | 뷰포트의 가장 큰 DOM 객체가 렌더링되고 화면에 나타나는 페이지 로드 타임라인의 순간입니다.                                                                                                               |
| `view.largest_contentful_paint_target_selector` | 문자열(CSS 선택기) | 최대 컨텐츠풀 페인트에 해당하는 요소의 CSS 선택기.                                                                                     |
| `view.first_input_delay`        | 숫자(ns) | 사용자가 페이지와 처음 상호 작용한 후 브라우저의 응답까지 경과한 시간.                                                                                                                                        |
| `view.first_input_delay_target_selector`      | 문자열(CSS 선택기) | 사용자가 첫 번째로 상호작용한 요소의 CSS 선택기.                                                                                                                |
| `view.interaction_to_next_paint`| 숫자(ns) | 사용자의 페이지 상호작용과 다음 페인트 간에 경과한 가장 긴 시간.                                                                                                                              |
| `view.interaction_to_next_paint_target_selector`| 문자열(CSS 선택기) | 다음 페인트와 상호작용 시간이 가장 많이 걸린 요소의 CSS 선택기.                                                                                                          |
| `view.cumulative_layout_shift`  | 숫자      | 동적으로 로드된 콘텐츠(예: 타사 광고)로 인한 예기치 않은 페이지 이동을 정량화합니다. 여기서 0은 이동이 발생하지 않음을 의미합니다.                                                                                      |
| `view.cumulative_layout_shift_target_selector`  | 문자열(CSS 선택기) | 가장 많이 움직여 페이지 CLS에 영향을 준 요소의 CSS 선택기.                                           |
| `view.loading_time`             | 숫자(ns) | 페이지가 준비될 때까지의 시간이며 현재 네트워크 요청이나 DOM 변이가 발생하지 않습니다. 자세한 내용은 [페이지 성능 모니터링][10]을 참고하세요.                                                                          |
| `view.first_contentful_paint`   | 숫자(ns) | 브라우저가 텍스트, 이미지(배경 이미지 포함), 흰색이 아닌 캔버스 또는 SVG를 처음 렌더링하는 시간입니다. 브라우저 렌더링에 관한 자세한 내용은 [w3c 정의][11]를 참고하세요.                                         |
| `view.dom_interactive`          | 숫자(ns) | 파서(Parser)가 주 문서 작업을 완료하는 순간입니다. 자세한 내용은 [MDN 설명서][12]를 참고하세요.                                                                                                        |
| `view.dom_content_loaded`       | 숫자(ns) | 최초의 HTML 문서가 비렌더링 블로킹 스타일 시트, 이미지, 서브프레임의 로드 완료를 기다리지 않고 완전하게 로드되어 해석될 때 발생하는 이벤트입니다. 자세한 내용은 [MDN 설명서][13]를 참고하세요. |
| `view.dom_complete`             | 숫자(ns) | 페이지와 모든 하위 리소스가 준비되었습니다. 사용자 측에서는 로딩 스피너가 회전을 멈췄습니다. 자세한 내용은 [MDN 설명서][14]를 참고하세요.                                                                     |
| `view.load_event`               | 숫자(ns) | 페이지가 완전히 로드될 때 발생하는 이벤트입니다. 일반적으로 추가 애플리케이션 로직을 위한 트리거입니다. 자세한 내용은 [MDN 설명서][15]를 참고하세요.                                                                            |
| `view.error.count`              | 숫자      | 이 보기에 대해 수집된 모든 오류의 수.                                                                                                                                                                                     |
| `view.long_task.count`          | 숫자      | 이 보기에 대해 수집된 모든 긴 작업의 수.                                                                                                                                                                                 |
| `view.resource.count`           | 숫자      | 이 보기에 대해 수집된 모든 리소스의 수.                                                                                                                                                                                  |
| `view.action.count`             | 숫자      | 이 보기에 대해 수집된 모든 작업 수.                                                                                                                                                                                    |

## 단일 페이지 애플리케이션(SPA) 모니터링

단일 페이지 애플리케이션(SPA)의 경우, RUM Browser SDK는 `loading_type` 속성을 사용하여 `initial_load` 와 `route_change` 탐색을 구분합니다. 웹 페이지의 상호 작용이 페이지를 완전히 새로 고치지 않고 다른 URL로 연결되는 경우, RUM SDK는 `loading_type:route_change`를 사용하여 새 보기 이벤트를 시작합니다. RUM은 [히스토리 API][16]를 사용하여 URL 변경 사항을 추적합니다.

Datadog에서는 페이지 로딩에 필요한 시간을 계산하는 고유한 성능 메트릭인 `loading_time`을 제공합니다. 이 메트릭은 `initial_load` 및 `route_change` 탐색 모두에서 작동합니다.

### 로딩 시간 계산 방법

최신 웹 애플리케이션을 고려하기 위해 로딩 시간은 네트워크 요청과 DOM 변형을 감시합니다.

- **Initial Load**: 로딩 시간은 _더 긴 값_을 표시합니다.

  - `navigationStart`와 `loadEventEnd`의 차이, 또는
  - `navigationStart`와 첫 페이지 활동 시점의 시간 차. 자세한 내용은 [페이지 활동 계산 방법](#how-page-activity-is-calculated)을 참고하세요.

- **SPA Route Change**: 로딩 시간은 URL 변경 시간과 페이지에 활동이 없는 첫 시간의 차와 같습니다. 자세한 내용은 [페이지 활동 계산 방법](#how-page-activity-is-calculated)을 참고하세요.

### 페이지 활동 계산 방법

RUM Browser SDK는 페이지 활동을 추적하여 인터페이스가 다시 안정될 때까지의 시간을 추정합니다. 다음과 같은 경우 페이지에 활동이 있는 것으로 간주합니다.

- `xhr` 또는 `fetch` 요청이 진행 중입니다.
- 브라우저는 성능 리소스 타이밍 항목(JS, CSS 등의 로딩 종료)을 방출합니다.
- 브라우저는 DOM 변형을 방출합니다.

페이지 활동은 100초 동안 활동이 없으면 종료된 것으로 간주됩니다.

**참고**: SDK 초기화 이후에 발생한 활동만 고려됩니다.

**주의 사항:**

다음 시나리오에서는 마지막 요청이나 DOM 변경 후 100ms인 기준으로도 활동을 정확하게 판단하지 못할 수 있습니다.

- 애플리케이션은 주기적으로 또는 클릭할 때마다 API에 요청을 전송하여 분석을 수집합니다.
- 이 애플리케이션은 '[come][17]' 기술(즉, 스트리밍 또는 긴 폴링)을 사용하며 요청은 무기한 보류 상태로 유지됩니다.

이러한 경우 활동 결정의 정확성을 높이려면 페이지 활동을 계산할 때 제외할 RUM Browser SDK의 리소스 목록인 `excludedActivityUrls`를 지정합니다.

```javascript
window.DD_RUM.init({
    ...
    excludedActivityUrls: [
        // 정확한 URL 제외
        'https://third-party-analytics-provider.com/endpoint',

        // /comet으로 끝나는 모든 URL 제외
        /\/comet$/,

        // 함수가 true를 반환하는 모든 URL 제외
        (url) => url === 'https://third-party-analytics-provider.com/endpoint',
    ]
})
```

### Hash SPA 내비게이션

RUM SDK는 해시(`#`) 탐색에 의존하는 프레임워크를 자동으로 모니터링합니다. SDK는 `HashChangeEvent`를 감시하고 새 보기를 발행합니다. 현재 보기 컨텍스트에 영향을 주지 않는 HTML 앵커 태그에서 오는 이벤트는 무시됩니다.

## 자체 성능 타이밍 추가

RUM의 기본 성능 타이밍 외에도 애플리케이션이 시간을 소비하는 위치를 보다 유연하게 측정할 수 있습니다. `addTiming` API는 성능 타이밍을 추가할 수 있는 간단한 방법입니다.

예를 들어 히어로 이미지가 표시되는 타이밍을 추가할 수 있습니다:

```html
<html>
  <body>
    <img onload="window.DD_RUM.addTiming('hero_image')" src="/path/to/img.png" />
  </body>
</html>
```

또는 사용자가 처음 스크롤할 때 타이밍을 추가할 수 있습니다.

```javascript
document.addEventListener("scroll", function handler() {
    // 이벤트 리스너를 제거하여 한 번만 트리거되도록 합니다.
    document.removeEventListener("scroll", handler);
    window.DD_RUM.addTiming('first_scroll');
});
```

타이밍이 전송되면 타이밍은 `@view.custom_timings.<timing_name>`과 같이 나노초 단위로 액세스할 수 있습니다 (예: `@view.custom_timings.first_scroll`). RUM Explorer 또는 대시보드에서 시각화를 만들기 전에 [측정값을 생성][18]해야 합니다.

단일 페이지 애플리케이션의 경우 `addTiming` API는 현재 RUM 보기의 시작을 기준으로 타이밍을 발행합니다. 예를 들어 사용자가 애플리케이션을 시작(초기 로드)하고 5초 후에 다른 페이지로 이동(경로 변경)하고 8초 후에 최종적으로 `addTiming`을 트리거하는 경우, 타이밍은 `8-5 = 3`초입니다.

비동기 설정을 사용하는 경우, 나의 고유한 타이밍(UNIX 에포크 타임스탬프)을 두 번째 파라미터로 제공할 수 있습니다.

예시:

```javascript
document.addEventListener("scroll", function handler() {
    // 이벤트 리스너를 제거하여 한 번만 트리거되도록 합니다.
    document.removeEventListener("scroll", handler);

    const timing = Date.now()
    window.DD_RUM.onReady(function() {
      window.DD_RUM.addTiming('first_scroll', timing);
    });
});

```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/platform/dashboards/
[2]: /ko/real_user_monitoring/browser/data_collected/#default-attributes
[3]: /ko/real_user_monitoring/platform/dashboards/performance
[4]: /ko/real_user_monitoring/explorer/
[5]: https://web.dev/vitals/
[6]: /ko/synthetics/browser_tests/
[7]: https://web.dev/lcp/
[8]: https://web.dev/fid/
[9]: https://web.dev/cls/
[10]: /ko/real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[11]: https://www.w3.org/TR/paint-timing/#sec-terminology
[12]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[15]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[16]: https://developer.mozilla.org/en-US/docs/Web/API/History
[17]: https://en.wikipedia.org/wiki/Comet_&#40;programming&#41;
[18]: /ko/real_user_monitoring/explorer/search/#setup-facets-and-measures
[19]: https://web.dev/inp/