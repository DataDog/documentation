---
aliases:
- /ko/synthetics/apm/browser_tests
description: 신서틱(Synthetic) 브라우저 테스트 결과를 확인하고 성공 또는 실패한 샘플 실행을 테스트 실행과 비교합니다.
further_reading:
- link: https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/#what-are-the-core-web-vitals
  tag: 블로그
  text: Synthetic Monitoring으로 Core Web Vitals 모니터링
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: 설명서
  text: 신서틱에서 RUM & 세션 리플레이 살펴보기
- link: /synthetics/dashboards/browser_test/
  tag: 설명서
  text: 브라우저 테스트 성능 대시보드에 대해 알아보기
title: 브라우저 테스트 결과
---

## 개요

테스트 실행은 신서틱(Synthetic) 테스트가 실행된 후 테스트 세부정보 페이지에 표시됩니다. [샘플 결과](#sample-results)는 시간 간격 및 특정 위치 및 장치 수에 따른 최신 테스트 실행의 합격 및 불합격과 연관되어 있습니다.

## 테스트 속성

**Properties** 섹션에서는 테스트 ID, 테스트 생성 및 편집 날짜, 태그 목록, 테스트 우선순위 및 기본 제공 신서틱(Synthetic) [브라우저 테스트 대시보드][11]에 대한 링크를 볼 수 있습니다.

**Overview** 
: 이 섹션에서는 테스트 URL, 위치 수, 장치 수, 테스트 간격, 사용자 지정 단계를 포함한 테스트 단계 수에 대해 설명합니다.

**Monitor**
: 이 섹션에는 [신서틱(Synthetic) 테스트 모니터][13]의 이름과 구성된 알림 메시지가 포함되어 있습니다.

**CI/CD Execution**
: 이 섹션에는 [Continuous Testing CI pipeline][19]의 일부로 실행되는 테스트의 [실행 규칙][12]을 변경하는 드롭다운 메뉴가 포함되어 있습니다.

## 테스트 이력

**History** 섹션에서는 다음 세 가지 그래프를 볼 수 있습니다.

- **Global Uptime** 그래프는 지정된 시간 간격 동안 모든 테스트 위치의 총 가동 시간을 표시합니다. 전역 가동 시간은 테스트를 위해 구성된 [경고 조건][20]을 고려합니다.
- **Time-to-interactive by location and device** 그래프는 페이지가 상호작용할 수 있을 때까지의 시간을 초 단위로 표시합니다. 가동 시간 모니터링에 대한 자세한 내용은 [SLO를 사용한 웹사이트 가동 시간 모니터링][14] 가이드를 참조하세요.
- **Test duration by location and device** 그래프는 지정된 시간 간격 동안 각 위치 및 장치를 완료하는 데 걸리는 시간(분)을 표시합니다.

{{< img src="synthetics/browser_tests/history.png" alt="Test Details 페이지의 History 및 Sample Runs 섹션" style="width=80%" >}}

## 샘플 결과

브라우저 테스트 실행에는 [스크린샷](#screenshots-and-actions), [페이지 성능 데이터](#page-performance), [오류](#errors-and-warnings), [리소스](#resources), [백엔드 트레이스](#backend-traces)와 같은 컴포넌트가 포함되어 있어 [테스트 실패](#failed-results)를 해결하는 데 도움이 됩니다.

**Sample Runs** 섹션에서는 최근에 실패한 테스트 실행을 검사하고 최근에 성공한 테스트 실행과 비교할 수 있습니다.

### 개요 속성

상황
: 테스트 실행 상태( `PASSED` 또는 `FAILED`)입니다.

Starting URL
: 브라우저 테스트 시나리오의 URL.

Steps
: 샘플 실행에서 완료된 테스트 단계 수.

기간
: 테스트를 실행하는 데 걸린 시간입니다.

Location
: 테스트가 실행된 관리형 위치 또는 프라이빗 위치.

장치
: 테스트가 실행된 장치 유형입니다.

Browser
: 테스트가 실행된 브라우저 유형.

Time ran
: 테스트 실행 이후 경과된 시간.

Run type
: 테스트 실행 유형 (CI, fast retry, manually triggered, scheduled).

### RUM 세션

 [RUM Explorer][22]에서 관련 세션 및 사용 가능한 재생을 보려면 **View Session in RUM**을 클릭합니다. [세션 재생][23]의 특정 작업이나 단계에 대한 사용자 세션에 액세스하려면 **Replay Session**을 클릭합니다. 자세한 내용은 [Synthetics에서 RUM 및 세션 재생 탐색][16]을 참조하세요.

### 스크린샷 및 작업

실행된 모든 테스트 단계에는 단계 액션의 스크린샷, 세션 재생의 세션 링크, 단계 설명, 특정 단계의 시작 URL, 단계 ID, 단계 지속 기간 및 페이지 성능 정보가 포함됩니다.

### 페이지 성능

Synthetic Monitoring에는 두 가지 [Core Web Vital 메트릭][6]([Largest Contentful Paint][2] 및 [Cumulative Layout Shift][3])가 실험실 메트릭으로 포함되어 있으며 각 단계 URL 오른쪽에 표시됩니다.

{{< img src="synthetics/browser_tests/test_results/page_performance_lab_metrics.png" alt="신서틱(Synthetic) 실험실 메트릭" style="width:100%" >}}

[실제 사용자 모니터링(RUM)][5]을 사용하여 실제 사용자 데이터를 수집하는 경우 [First Input Delay][4]를 실제 메트릭으로 사용할 수 있습니다. 자세한 내용은 [페이지 성능 모니터링][6]을 참조하세요.

### 오류 및 경고

**Errors**를 클릭하여 **Errors & Warnings** 탭에 액세스하고 오류 유형(`js` 또는 `network`)과 상태(네트워크 상태 코드)로 구분된 오류 목록을 검사합니다.

{{< img src="synthetics/browser_tests/test_results/errors_pill.png" alt="Errors 표시" style="width:100%" >}}

브라우저 테스트가 페이지와 상호 작용할 때 오류 유형이 기록됩니다. 이는 페이지가 열린 시간과 페이지가 상호 작용할 수 있는 시간 사이에 수집된 오류에 해당합니다. 표시할 수 있는 최대 오류 수는 8개입니다(예: 2 `network` + 6 `js` 오류).

### 리소스

**Resources**를 클릭하여 **Resources** 탭에 액세스하고 **Fully Loaded** 아래의 총 단계 지속 시간과 리소스를 제공하는 CDN 공급자를 포함하여 요청과 자산의 조합을 검사합니다.

{{< img src="synthetics/browser_tests/test_results/resources_pill.png" alt="Resources 보기" style="width:100%" >}}

유형별로 리소스를 필터링하고 검색창에서 이름으로 검색할 수 있습니다. 표시할 수 있는 최대 리소스 수는 100개입니다. 리소스는 시작 시간을 기준으로 정렬되며 Datadog에서는 처음 100개까지 표시됩니다.

{{< img src="synthetics/browser_tests/resources_panel.png" alt="리소스 패널" style="width:100%" >}}

Relative Time 
: 총 상호 작용 시간에 대한 리소스 지속 시간.

CDN
: 리소스를 제공한 CDN 공급자. 원래의 캐시 상태를 보려면 CDN 제공업체 아이콘 위로 마우스를 가져가세요. 
Datadog은 Akamai, Cloudflare, Fastly, Amazon Cloudfront, Netlify, Google Cloud CDN, Imperva, Sucuri를 감지합니다.

Resource
: 리소스 URL

Type
: 리소스 유형 (HTML, Download, CSS, Fetch, Image, JavaScript, XHR 등).

Method
: 요청 메서드

Protocol
: 요청 프로토콜

Status
: HTTP 응답 상태 코드

Duration
: 요청 수행에 필요한 시간

Size
: 요청 응답의 크기

### 백엔드 트레이스

**Traces**를 클릭하여 **Traces** 탭에 액세스하고 브라우저 테스트와 관련된 APM 트레이스를 탐색합니다. UI는 Trace Explorer의 [Trace View][7]와 유사하지만 하나의 브라우저 테스트 단계에서 서로 다른 URL이나 엔드포인트에 여러 요청을 보낼 수 있습니다. 이로 인해 트레이스 설정 및 [Synthetic Monitoring Settings 페이지][8]에서 브라우저 테스트에 허용한 URL에 따라 여러 관련 트레이스가 생성됩니다.

제품 간 상관 관계에 대한 자세한 내용은 [제품 간 상관 관계를 통한 문제 해결][21] 가이드를 참조하세요.

### 단계 지속 시간

단계 지속 시간은 [Datadog 로케이터 시스템][9]을 사용하여 단계를 실행하는 데 걸리는 시간을 나타냅니다. 단계 지속 시간에는 액션(예: 사용자 상호 작용)이 포함되며, 대기 및 재시도 메커니즘을 통합하여 브라우저 테스트를 통해 요소와 상호 작용할 수 있는지도 확인할 수 있습니다. 자세한 내용은 [브라우저 테스트 단계의 고급 옵션][9]을 참조하세요.

## 실패한 결과

테스트 결과가 주장을 만족하지 않거나 다른 이유로 단계가 실패한 경우 `FAILED`로 간주됩니다. 스크린샷을 확인하고, 단계 수준에서 잠재적인 [오류](#errors-and-warnings)를 확인하며, 단계에서 생성된 [리소스][17] 및 [백엔드 트레이스](#backend-traces)을 조사하여 실패한 실행 문제를 해결할 수 있습니다. 

### 스크린샷 비교하기
**Compare Screenshots**을 클릭하면 실패한 결과와 마지막으로 성공한 실행의 스크린샷을 나란히 확인할 수 있습니다. 이렇게 비교하면 테스트 실패의 원인을 찾는데 도움이 됩니다.
{{< img src="synthetics/browser_tests/test_results/compare_screenshots.png" alt="실패한 실행과 성공한 실행 간의 스크린샷을 비교" style="width:90%;" >}}
**참고**: 동일한 버전, 시작 URL, 장치, 브라우저 및 실행 유형(scheduled, manual trigger, CI/CD)을 사용하여 두 테스트 실행을 비교합니다. 이전에 동일한 파라미터를 사용한 성공적인 실행이 없는 경우에는 비교 기능이 제공되지 않습니다.
### 일반적인 브라우저 테스트 오류

`Element located but it's invisible` 
: 요소가 페이지에 있지만 클릭할 수 없습니다. — 예를 들어 다른 요소가 페이지 위에 겹쳐져 있는 경우입니다.

`Cannot locate element`
: HTML에서 요소를 찾을 수 없습니다.

`Select did not have option`
: 드롭다운 메뉴에 지정한 옵션이 없습니다.

`Forbidden URL`
: 테스트 중에 지원되지 않는 프로토콜이 발견되었을 수 있습니다. 자세한 내용은 [지원팀에 문의][10]하세요.

`General test failure`
: 일반적인 오류 메시지입니다. 자세한 내용은 [지원팀에 문의][10]하세요.

## 테스트 이벤트

신서틱(Synthetic) 테스트 모니터의 경고는 **Test Runs**의 **Events** 탭에 나타납니다.  Events Explorer에서 신서틱(Synthetic) 테스트의 경고를 검색하려면 [**Events** > **Explorer**][18]로 이동하여 `Event Type:synthetics_alert`를 검색어로 입력합니다. 자세한 내용은 [신서틱(Synthetic) 테스트 모니터 사용][13]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://web.dev/vitals/
[2]: https://web.dev/lcp/
[3]: https://web.dev/cls/
[4]: https://web.dev/fid/
[5]: /ko/real_user_monitoring/
[6]: /ko/real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[7]: /ko/tracing/trace_explorer/trace_view/
[8]: /ko/synthetics/settings/?tab=specifyvalue#apm-integration-for-browser-tests
[9]: /ko/synthetics/browser_tests/advanced_options/?tab=requestoptions#user-specified-locator
[10]: /ko/help/
[11]: /ko/synthetics/dashboards/browser_test/
[12]: /ko/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[13]: /ko/synthetics/guide/synthetic-test-monitors/
[14]: /ko/synthetics/guide/uptime-percentage-widget/
[15]: /ko/real_user_monitoring/browser/data_collected/#long-task-timing-metrics
[16]: /ko/synthetics/guide/explore-rum-through-synthetics/
[17]: /ko/tracing/services/resource_page/
[18]: https://app.datadoghq.com/event/explorer
[19]: /ko/continuous_testing/cicd_integrations
[20]: /ko/synthetics/browser_tests/?tab=requestoptions#define-alert-conditions
[21]: /ko/logs/guide/ease-troubleshooting-with-cross-product-correlation/#leverage-trace-correlation-to-troubleshoot-synthetic-tests
[22]: /ko/real_user_monitoring/explorer
[23]: /ko/real_user_monitoring/session_replay