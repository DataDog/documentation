---
aliases:
- /ko/synthetics/apm/browser_tests
description: Synthetic 브라우저 테스트 결과를 확인하고 성공 또는 실패한 샘플 실행을 테스트 실행과 비교합니다.
further_reading:
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: 설명서
  text: Synthetics에서 RUM 및 Session Replay 살펴보기
- link: /synthetics/dashboards/browser_test/
  tag: 설명서
  text: 브라우저 테스트 성능 대시보드에 대해 알아보기
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: 학습 센터
  text: Synthetic Monitoring 및 브라우저 테스트 시작하기
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: 블로그
  text: Synthetic Monitoring으로 Core Web Vitals 모니터링
- link: https://www.datadoghq.com/blog/bits-investigation-synthetic-tests/
  tag: 블로그
  text: Bits Investigation으로 Synthetic 테스트 실패를 더 빠르게 분류하기
title: 브라우저 테스트 결과
---
## 개요 {#overview}

테스트 세부 정보 페이지는 Synthetic 브라우저 테스트가 실행된 후 열리며 [{{< ui >}}Activity{{< /ui >}}](#test-activity), [{{< ui >}}Test Runs{{< /ui >}}](#test-runs), [{{< ui >}}Performance{{< /ui >}}](#test-performance), 및 [{{< ui >}}Properties{{< /ui >}}](#test-properties)의 네 가지 탭으로 구성됩니다. 이 탭을 사용하여 가동 시간을 모니터링하고, 개별 실행을 검사하며, 집계된 성능 메트릭을 검토하고, 테스트 구성을 관리하세요. 테스트 실행이 실패할 경우, [실패 결과](#failed-results)에서 AI 실패 요약 및 스크린샷 비교와 같은 문제 해결 도구를 확인하세요.

## 테스트 활동 {#test-activity}

{{< ui >}}Activity{{< /ui >}} 탭에서 다음을 확인할 수 있습니다.

- 주어진 시간 간격 동안 모든 테스트 위치의 총 가동 시간을 표시하는 {{< ui >}}Global Uptime{{< /ui >}} 그래프입니다. 글로벌 가동 시간 시각화는 주어진 시간 간격 내에 테스트에 대해 구성된 [경보 조건][20]이 트리거된 경우에만 빨간색으로 표시됩니다. 위치 가동 시간은 재시도가 완료된 후 최종 테스트 결과를 기반으로 계산되므로, [빠른 재시도][24] 간격은 총 가동 시간 그래프에 직접적인 영향을 미칩니다. 가동 시간 모니터링에 대한 자세한 내용은 [SLO를 사용한 웹사이트 가동 시간 모니터링][14] 가이드를 참조하세요.
- 경보 트리거, 복구 및 테스트 수정 사항의 {{< ui >}}Timeline{{< /ui >}}입니다.
- 선택한 타임라인 이벤트에 대한 {{< ui >}}Summary{{< /ui >}} 패널로, 발생한 상황, 실패 결과 및 조사에 대한 권장 다음 단계를 보여줍니다.

{{< img src="synthetics/browser_tests/synthetics_bits_investigation.png" alt="글로벌 가동 시간, 경보 타임라인, Bits Investigation이 포함된 실패 세부 정보 패널을 보여주는 브라우저 테스트 세부 정보 페이지의 활동 탭입니다." style="width:100%;" >}}

## 테스트 실행 {#test-runs}

{{< ui >}}Test Runs{{< /ui >}} 탭에서 모든 개별 테스트 실행을 확인할 수 있습니다. 상태(성공 또는 실패), 실행 유형, 위치 또는 기기별로 필터링하고, 행을 클릭하여 해당 실행을 자세히 검사하세요.

{{< img src="synthetics/browser_tests/synthetics_test_runs.png" alt="상태, 날짜, 실행 유형, 단계, 기간, 위치, 기기, 브라우저 및 테스트 버전 열이 있는 테스트 실행의 필터링 가능한 표를 보여주는 브라우저 테스트 세부 정보 페이지의 테스트 실행 탭입니다." style="width:100%" >}}

브라우저 테스트 실행에는 [스크린샷](#screenshots-and-actions), [페이지 성능 데이터](#test-performance), [오류](#errors-and-warnings), [리소스](#resources) 및 [백엔드 추적](#backend-traces)과 같은 구성 요소가 포함되어 [테스트 실패](#failed-results) 문제를 해결하는 데 도움을 줍니다.

{{% collapse-content title="테스트 실행 열" level="h3" %}}

다음은 {{< ui >}}Test Runs{{< /ui >}} 표의 각 열에 대한 설명입니다:

상태
: 테스트 실행 상태(`PASSED` 또는 `FAILED`).

날짜
: 실행이 수행된 상대 시간 및 타임스탬프.

Run Type
: 테스트 실행 유형(예약됨, CI 또는 수동 트리거).

단계
: 실행을 위해 구성된 전체 단계 중 완료된 테스트 단계 수.

기간
: 테스트 실행이 완료되는 데 걸린 시간.

위치
: 테스트가 실행된 관리형 위치 또는 프라이빗 위치.

장치
: 테스트가 실행된 장치 유형.

브라우저
: 테스트가 실행된 브라우저 유형.

테스트 버전
: 실행에 사용된 테스트 구성 버전.

{{% /collapse-content %}}

### RUM 세션 {#rum-sessions}

[RUM 탐색기][22]에서 관련 세션 및 사용 가능한 재생을 보려면 {{< ui >}}View Session in RUM{{< /ui >}}을 클릭하세요. [Session Replay][23]에서 특정 작업 또는 단계에 대한 사용자 세션에 액세스하려면 {{< ui >}}Replay Session{{< /ui >}}을 클릭하세요. 자세한 내용은 [Synthetic Monitoring에서 RUM 및 Session Replay 탐색][16]을 참조하세요.

### 스크린샷 및 액션 {#screenshots-and-actions}

실행된 모든 테스트 단계에는 단계 액션의 스크린샷, Session Replay의 세션 링크, 단계 설명, 특정 단계의 시작 URL, 단계 ID, 단계 지속 기간 및 페이지 성능 정보가 포함됩니다.

### 오류 및 경고 {#errors-and-warnings}

{{< ui >}}Errors{{< /ui >}} 배지를 클릭하여 {{< ui >}}Errors & Warnings{{< /ui >}} 탭에 액세스하고 오류 유형(`js` 또는 `network`) 및 상태(네트워크 상태 코드)별로 구분된 오류 목록을 검토하세요.

{{< img src="synthetics/browser_tests/test_results/synthetics_errors.png" alt="각 단계에서 오류 배지가 강조 표시된 브라우저 테스트 실행 세부 정보. 오류 및 경고 탭을 열기 위해 클릭해야 하는 위치를 나타냅니다." style="width:100%" >}}

{{< ui >}}Errors & Warnings{{< /ui >}} 탭에는 오류 유형(`js` 또는 `network`) 및 상태(네트워크 상태 코드)별로 구분된 오류 목록이 표시됩니다.

오류 유형은 브라우저 테스트가 페이지와 상호 작용할 때 기록됩니다. 이는 페이지가 열린 시점부터 페이지와 상호 작용할 수 있는 시점 사이에 수집된 오류에 해당합니다. 표시될 수 있는 최대 오류 수는 8개입니다(예: `network` 2개+`js` 6개 오류).

### 리소스 {#resources}

{{< ui >}}Resources{{< /ui >}} 배지를 클릭하여 {{< ui >}}Resources{{< /ui >}} 탭에 액세스하고 {{< ui >}}Fully Loaded{{< /ui >}} 아래의 총 단계 지속 시간과 리소스를 제공하는 CDN 공급자를 포함하여 요청과 자산의 조합을 검사하세요. 

{{< img src="synthetics/browser_tests/test_results/synthetics_resources.png" alt="각 단계에서 리소스 배지가 강조 표시된 브라우저 테스트 실행 세부 정보로, 리소스 탭을 열기 위해 클릭해야 하는 위치를 나타냅니다." style="width:100%" >}}

유형별로 리소스를 필터링하고 검색 창에서 이름으로 검색할 수 있습니다. 표시될 수 있는 최대 리소스 수는 100개입니다. 리소스는 시작 시간순으로 정렬되며 Datadog에는 처음 100개가 표시됩니다.

{{% collapse-content title="리소스 탭 열" level="h4" %}}

다음은 {{< ui >}}Resources{{< /ui >}} 탭의 열 머리글에 대한 설명입니다.

상대 시간 
: 테스트 단계에서 리소스 로드가 시작된 시점입니다.

CDN
: 리소스를 제공한 CDN 공급자입니다. CDN 공급자의 아이콘 위로 마우스를 가져가면 원시 캐시 상태를 확인할 수 있습니다.  
Datadog은 Akamai, Cloudflare, Fastly, Amazon Cloudfront, Netlify, Google Cloud CDN, Imperva 및 Sucuri를 탐지합니다.

리소스
: 리소스의 URL입니다.

유형
: 리소스 유형(HTML, Download, CSS, Fetch, Image, JavaScript, XHR 등)입니다.

방법
: 요청 메서드입니다.

프로토콜
: 요청 프로토콜입니다.

상태
: HTTP 응답 상태 코드입니다.

기간
: 요청 수행에 필요한 시간입니다.

크기
: 요청 응답의 크기입니다.

{{% /collapse-content %}}

Fetch 및 XHR 리소스의 경우, 리소스 행을 클릭하여 요청 및 응답 헤더와 본문을 확인하세요. 페이로드 세부 정보는 테스트의 [고급 옵션][28]에서 {{< ui >}}Capture HTTP payloads{{< /ui >}}가 활성화된 경우에만 사용할 수 있습니다.

### 백엔드 추적 {#backend-traces}

{{< ui >}}Traces{{< /ui >}} 배지를 클릭하여 {{< ui >}}Traces{{< /ui >}} 탭에 액세스하고 브라우저 테스트와 관련된 APM 트레이스를 탐색하세요. UI는 Trace Explorer의 [트레이스 보기][7]와 유사하지만, 하나의 브라우저 테스트 단계는 서로 다른 URL이나 엔드포인트에 대해 여러 요청을 수행할 수 있습니다. 이는 트레이싱 설정과 [Synthetic Monitoring 설정 페이지][8]에서 브라우저 테스트를 위해 허용한 URL에 따라 여러 관련 트레이스를 생성합니다. 

제품 간 상관 관계에 대한 자세한 내용은 [제품 간 상관 관계를 통한 문제 해결][21] 가이드를 참조하세요.

### 단계 지속 시간 {#step-duration}

단계 지속 시간은 [Datadog 로케이터 시스템][9]을 사용하여 단계가 완전히 로드된 것으로 간주되기까지 걸리는 시간을 나타냅니다. 자세한 내용은 [브라우저 테스트에서 단계 지속 시간이 결정되는 방법][25]을 참조하세요.

테스트가 최대 실행 시간에 도달하면, 시간 초과 메시지는 총 지속 시간에 테스트 단계와 시스템 오버헤드가 모두 포함되어 있음을 나타냅니다. 결과적으로 보고된 테스트 기간은 개별 단계 지속 시간의 합계와 다를 수 있습니다.

{{< img src="synthetics/browser_tests/test_results/test_execution_error.png" alt="'최대 테스트 실행 시간에 도달했습니다. 여기에는 테스트 단계와 시스템 오버헤드가 포함되므로 보고된 테스트 기간은 다를 수 있습니다'라는 테스트 기간 실행 오류 메시지입니다." style="width:90%;" >}}

## 테스트 성능 {#test-performance}

{{< ui >}}Performance{{< /ui >}} 탭에서 테스트의 모든 실행에 걸친 집계된 성능 메트릭을 확인할 수 있습니다.

- **브라우저 성공률** 카드(각 브라우저 유형(Chrome, Firefox, Edge)별)는 선택한 시간 간격 동안 통과한 실행의 백분율을 표시합니다.
- **브라우저 유형별 평균 테스트 지속 시간** 및 **위치 및 기기별 평균 테스트 기간** 그래프는 주어진 시간 간격 내에 각 브라우저, 위치 및 기기가 테스트를 완료하는 데 걸리는 시간을 표시합니다.
- **p75 Largest Contentful Paint** 및 **p75 Cumulative Layout Shift** 그래프는 실행 전반에 걸쳐 집계된 이러한 [Core Web Vital 메트릭][6]의 75번째 백분위수를 표시합니다.

{{< img src="synthetics/browser_tests/synthetics_browser_graphs.png" alt="Chrome, Firefox, Edge 성공률, 브라우저 유형 및 위치별 테스트 기간 그래프, p75 LCP 및 CLS Core Web Vital 메트릭을 보여주는 브라우저 테스트 세부 정보 페이지의 성능 탭" style="width=80%" >}}

개별 테스트 실행 내에서 [Largest Contentful Paint][2] 및 [Cumulative Layout Shift][3]는 각 단계 URL 오른쪽에 배지 모양으로 표시됩니다. [First Input Delay][4]는 [Real User Monitoring][5]을 사용하여 실제 사용자 데이터를 수집하는 경우 실제 메트릭으로 사용할 수 있습니다. 자세한 내용은 [페이지 성능 모니터링][6]을 참조하세요.

{{< img src="synthetics/browser_tests/test_results/page_performance_lab_metrics.png" alt="Synthetic 랩 메트릭" style="width:100%" >}}

## 테스트 속성 {#test-properties}

{{< ui >}}Properties{{< /ui >}} 탭에는 테스트와 관련된 구성 세부 정보, 소유권 정보 및 통합이 포함되어 있습니다. 왼쪽 탐색 메뉴를 사용하여 섹션 간을 전환하세요.

{{< img src="synthetics/browser_tests/synthetics_properties_tab.png" alt="브라우저 테스트 세부 정보 페이지의 속성 탭에는 소유권, 실행 및 모니터링 섹션이 표시되며, 왼쪽 탐색 메뉴에는 Continuous Testing, Parent Tests 및 기타 구성이 포함되어 있습니다." style="width=80%" >}}

{{% collapse-content title="속성 탭 섹션" level="h3" %}}

다음은 {{< ui >}}Properties{{< /ui >}} 탭에서 사용할 수 있는 각 섹션에 대한 설명입니다.

{{< ui >}}Ownership{{< /ui >}}
: 테스트 소유자, 편집자, 생성 날짜, 마지막 수정 날짜, 환경, 팀 및 태그를 표시합니다. 테스트는 즉시 사용 가능한 Synthetic [브라우저 테스트 대시보드][11]로도 연결됩니다.

{{< ui >}}Execution{{< /ui >}}
: 테스트 빈도, 경보 조건 및 재시도 동작을 보여줍니다.

{{< ui >}}Monitor{{< /ui >}}
: [Synthetic 테스트 모니터링][13] 이름, 우선 순위, 구성된 수신자 및 알림 메시지를 포함합니다.

{{< ui >}}Continuous Testing{{< /ui >}}
: 이 테스트가 [Continuous Testing CI 파이프라인][19]의 일부로 실행될 때 사용되는 [실행 규칙][12]을 설정합니다.

{{< ui >}}Parent Tests{{< /ui >}}
: 이 테스트를 하위 테스트로 포함하는 다단계 테스트와 같이 이 테스트를 참조하는 테스트를 나열합니다.

{{< ui >}}Parent Suites{{< /ui >}}
: 이 테스트가 속한 [테스트 제품군][26]을 나열합니다.

{{< ui >}}Downtimes{{< /ui >}}
: 계획된 유지 관리 기간 중과 같이 이 테스트의 실행을 일시 중지하는 [예약된 가동 중지 시간][27]을 나열합니다.

{{< ui >}}Configuration as Code{{< /ui >}}
: 테스트를 코드로 관리할 수 있도록 Terraform과 같은 형식으로 테스트 구성을 내보냅니다.

{{% /collapse-content %}}

## 실패한 결과 {#failed-results}

테스트 결과가 어설션을 충족하지 못하거나 다른 이유로 단계가 실패하면 `FAILED`로 간주됩니다. 실패한 실행의 스크린샷을 확인하고, 단계 수준에서 잠재적인 [오류](#errors-and-warnings)를 검사하고, 단계에서 생성된 [리소스][17] 및 [백엔드 추적](#backend-traces)을 조사하여 실패한 실행을 문제 해결할 수 있습니다.

### AI 실패 요약 {#ai-failure-summaries}

브라우저 테스트 실행이 실패하면 Datadog은 원인을 파악하고 다음 조사 단계를 결정하는 데 도움이 되도록 AI 실패 요약을 생성합니다. 각 요약에는 다음이 포함됩니다.

- 네트워크 오류, 어설션, 스크린샷 등의 실행 데이터를 기반으로 한 실패 원인에 대한 간략한 설명을 제공합니다.
- 실패를 **실제 실패**(애플리케이션의 실제 문제) 또는 **테스트 구성 오류**(테스트 설정 문제)로 분류합니다.
- 문제 해결을 위한 다음 단계를 제안합니다.

AI 실패 요약은 실패한 모든 브라우저 테스트 실행의 테스트 실행 세부 정보 페이지에 나타납니다. LLM이 생성한 콘텐츠에는 부정확한 내용이 포함될 수 있으므로, 이를 신빙성 있는 근본 원인 분석이 아닌 조사 시작점으로 활용하세요. 요약에 있는 👍 및 👎 버튼을 사용하여 피드백을 공유하고 향후 결과를 개선하는 데 도움을 주세요.

{{< img src="synthetics/browser_tests/test_results/synthetics_ai_summaries_new.png" alt="실패한 브라우저 테스트 실행의 AI 실패 요약 패널" style="width:100%" >}}

### 스크린샷 비교 {#compare-screenshots}

조사 중에 도움이 필요하면 {{< ui >}}Compare Screenshots{{< /ui >}}를 클릭하여 실패한 결과와 마지막으로 성공한 실행의 스크린샷을 나란히 확인하세요. 비교를 통해 테스트 실패의 원인이 되었을 수 있는 차이점을 파악할 수 있습니다.

{{< img src="synthetics/browser_tests/test_results/compare_screenshots.png" alt="실패한 실행과 성공한 실행 간의 스크린샷 비교" style="width:90%;" >}}

**참고**: 비교는 동일한 버전, 시작 URL, 기기, 브라우저 및 실행 유형(예약됨, 수동 트리거, CI/CD)을 가진 두 테스트 실행 간에 수행됩니다. 동일한 파라미터를 가진 성공적인 이전 실행이 없는 경우 비교가 제공되지 않습니다.
### 일반적인 브라우저 테스트 오류 {#common-browser-test-errors}

`Element located but it's invisible` 
: 요소가 페이지에 있지만 클릭할 수 없습니다. 예를 들어 다른 요소가 그 위에 겹쳐져 있는 경우입니다.

`Cannot locate element`
: HTML에서 요소를 찾을 수 없습니다.

`Select did not have option`
: 드롭다운 메뉴에 지정된 옵션이 없습니다.

`Forbidden URL`
: 테스트가 지원되지 않는 프로토콜을 만났을 가능성이 높습니다. 자세한 내용은 [고객 지원에 문의][10]하세요.

`General test failure`
: 일반적인 오류 메시지입니다. 자세한 내용은 [고객 지원에 문의][10]하세요.

## 테스트 이벤트 {#test-events}

Synthetic 테스트 모니터링의 경고는 [{{< ui >}}Activity{{< /ui >}} 탭](#test-activity)의 타임라인에 표시되며, 여기에서 전체 가동 시간 그래프와 함께 경보 트리거, 복구 및 테스트 수정을 검토할 수 있습니다. Synthetic 테스트의 경고를 이벤트 탐색기에서 검색하려면 [{{< ui >}}Events{{< /ui >}} > {{< ui >}}Explorer{{< /ui >}}][18]로 이동하여 검색 쿼리에 `@evt.type:synthetics_alert`를 입력하세요. 자세한 정보는 [Synthetic 테스트 모니터링 사용][13]을 참고하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://web.dev/vitals/
[2]: https://web.dev/lcp/
[3]: https://web.dev/cls/
[4]: https://web.dev/fid/
[5]: /ko/real_user_monitoring/
[6]: /ko/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[7]: /ko/tracing/trace_explorer/trace_view/
[8]: /ko/synthetics/settings/?tab=specifyvalue#apm-integration-for-browser-tests
[9]: /ko/synthetics/browser_tests/advanced_options/?tab=requestoptions#user-specified-locator
[10]: /ko/help/
[11]: /ko/synthetics/dashboards/browser_test/
[12]: /ko/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[13]: /ko/synthetics/guide/synthetic-test-monitors/
[14]: /ko/synthetics/guide/uptime-percentage-widget/
[15]: /ko/real_user_monitoring/application_monitoring/browser/data_collected/#long-task-timing-metrics
[16]: /ko/synthetics/guide/explore-rum-through-synthetics/
[17]: /ko/tracing/services/resource_page/
[18]: https://app.datadoghq.com/event/explorer
[19]: /ko/continuous_testing/cicd_integrations
[20]: /ko/synthetics/browser_tests/?tab=requestoptions#define-alert-conditions
[21]: /ko/logs/guide/ease-troubleshooting-with-cross-product-correlation/#leverage-trace-correlation-to-troubleshoot-synthetic-tests
[22]: /ko/real_user_monitoring/explorer
[23]: /ko/real_user_monitoring/session_replay
[24]: /ko/synthetics/browser_tests/?tab=requestoptions#fast-retry
[25]: /ko/synthetics/guide/step-duration/
[26]: /ko/synthetics/test_suites/
[27]: /ko/synthetics/platform/downtime/
[28]: /ko/synthetics/browser_tests/#advanced-options