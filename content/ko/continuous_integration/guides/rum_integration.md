---
description: CI Visibility 및 RUM 사용 방법 알아보기
further_reading:
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 탐색하기
kind: 가이드
title: RUM을 사용하여 브라우저 테스트 계측하기
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility는 현재 ({{< region-param key="dd_site_name" >}}) 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

### 호환성

CI Visibility - RUM 통합은 `cypress`, `dd-trace-js` 및 `browser-sdk`의 아래 버전에서만 사용 가능합니다:

* `cypress` >= 6.7.0
* `dd-trace-js` >= 1.7.0
* `browser-sdk` >= 3.11.0

**참고**: 현재 이 통합에는 `cypress`만 지원됩니다.

### 브라우저 테스트와 RUM

<div class="alert alert-warning">
<strong>중요</strong>:Cypress 테스트와 RUM을 연결하기 전에 <a href="/continuous_integration/tests/javascript/?tab=cypress#instrument-your-tests">Test Visibility</a>가 Cypress에 대해 이미 설정되어 있는지 확인하세요.</div>

Cypress를 사용하여 브라우저 테스트를 실행하고 테스트 중인 애플리케이션이 [RUM][2]을 사용하여 계측되는 경우, 테스트 결과와 생성된 RUM 브라우저 세션 및 세션 리플레이가 자동으로 연결됩니다. CI Visibility의 테스트 세부 정보 사이드 패널에 새로운 **Browser Sessions** 탭이 나타납니다:

{{< img src="ci/ci-browser-session-tab.png" alt="Browser Session Tab in Test Detail" style="width:100%;">}}

RUM 세션에는 [RUM이 일반적으로 수집하는][3] 모든 데이터가 있으므로 브라우저 테스트에서 예기치 않은 오류와 같은 잠재적인 문제를 디버깅할 수 있습니다:

{{< img src="ci/ci-browser-session-tab-errors.png" alt="Browser Session Tab Errors in Test Detail" style="width:100%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/continuous_integration/tests/javascript/?tab=cypress#instrument-your-tests
[2]: /ko/real_user_monitoring/browser/
[3]: /ko/real_user_monitoring/browser/data_collected/