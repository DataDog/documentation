---
aliases:
- /ko/continuous_integration/guides/rum_integration
- /ko/continuous_integration/integrate_tests/browser_tests
- /ko/continuous_integration/tests/browser_tests
description: CI Visibility 및 RUM을 사용하여 테스트 결과를 브라우저 세션 및 세션 재생과 연결하는 방법을 알아보세요.
further_reading:
- link: /continuous_integration/tests
  tag: 설명서
  text: Test Optimization에 대해 알아보기
- link: /real_user_monitoring/application_monitoring/browser
  tag: 설명서
  text: RUM 브라우저 모니터링에 대해 알아보기
title: RUM으로 브라우저 테스트 계측
---
## 개요 {#overview}

Test Optimization은 Datadog [Real User Monitoring][2]과 통합되어 브라우저 테스트 심층 분석을 위한 도구를 제공합니다.

### 호환성 {#compatibility}

RUM 통합을 활성화하려면 테스트에 [Test Optimization][1]이 설정되어 있고 테스트 대상 애플리케이션이 [RUM][2]을 사용하여 계측되어 있는지 확인합니다.

RUM 통합은 Cypress, Playwright, WebdriverIO 및 Selenium 기반 브라우저 테스트에서 지원됩니다.

#### Cypress {#cypress}

* `cypress` >= 6.7.0
* `dd-trace-js` >= 1.7.0
* `browser-sdk` >= 3.11.0

#### Selenium {#selenium}

* `selenium-js` >= 4.11.0, `dd-trace-js` >= 5.11.0 / >= 4.35.0
* `selenium-java` >= 3.141.59, `dd-trace-java` >= 1.34.0
* `selenium-dotnet` >= 3.0.0, `dd-trace-dotnet` >= 2.51.0
* `selenium-ruby` >= 4.0.0, `datadog-ci` >= 1.0.0.beta6
* `browser-sdk` >= 5.15.0

#### Playwright {#playwright}

* `playwright` >= 1.38.0
* `dd-trace-js` >= 5.46.0
* `browser-sdk` >= 5.15.0

#### WebdriverIO {#webdriverio}

* `webdriverio` >= 9.0.0(Mocha 또는 Jasmine 프레임워크 어댑터 사용)
* `dd-trace-js` v5 릴리스 계열에서는 >= 5.125.0, v6 릴리스 계열에서는 >= 6.14.0
* `browser-sdk` >= 5.15.0

RUM 통합에는 WebDriver BiDi 브라우저 세션이 필요합니다.

<div class="alert alert-info">
Browser SDK v5.0.0부터는 <code>allowUntrustedEvents</code> 클릭을 올바르게 캡처할 수 있도록 테스트 중에 초기화 파라미터를 활성화합니다.
</div>

## 브라우저 테스트와 RUM 연결 {#connect-browser-tests-and-rum}

Cypress, Playwright, WebdriverIO 또는 Selenium을 사용하여 브라우저 테스트를 실행하고 테스트 중인 애플리케이션이 [Real User Monitoring][2]으로 계측되는 경우, 테스트 결과와 생성된 RUM 브라우저 세션 및 세션 리플레이가 자동으로 연결됩니다.

RUM 세션이 플러시되기 전에 테스트가 종료되면 세션과 테스트가 연결되지 않은 것처럼 보일 수 있습니다. 세션이 플러시될 시간을 더 확보하려면 `DD_CIVISIBILITY_RUM_FLUSH_WAIT_MILLIS` 환경 변수를 기본값인 500밀리초보다 큰 값으로 설정합니다.

Test Optimization 테스트 세부정보 사이드 패널에 {{< ui >}}Browser Sessions{{< /ui >}} 탭이 표시됩니다.

{{< img src="ci/ci-browser-session-tab.png" alt="Test Detail의 Browser Session 탭" style="width:100%;">}}

RUM 세션에는 [RUM이 일반적으로 수집][3]하는 모든 데이터가 있으므로 브라우저 테스트에서 발생하는 잠재적 오류(예: 예상치 못한 오류)를 디버깅할 수 있습니다.

{{< img src="ci/ci-browser-session-tab-errors.png" alt="Test Detail의 Browser Session 탭에 표시된 오류" style="width:100%;">}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tests/setup/
[2]: /ko/real_user_monitoring/application_monitoring/browser/
[3]: /ko/real_user_monitoring/application_monitoring/browser/data_collected/