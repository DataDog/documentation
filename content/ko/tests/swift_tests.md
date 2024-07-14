---
aliases:
- /ko/continuous_integration/guides/rum_swift_integration
- /ko/continuous_integration/integrate_tests/swift_tests
- /ko/continuous_integration/tests/swift_tests
description: CI 가시성 및 RUM을 사용하여 Swift 테스트 결과를 브라우저 세션 및 세션 재생과 연결하는 방법을 알아보세요.
further_reading:
- link: /continuous_integration/tests
  tag: 설명서
  text: 테스트 가시성에 대해 알아보기
- link: /real_user_monitoring/ios
  tag: 설명서
  text: RUM iOS 및 tvOS 모니터링에 대해 자세히 알아보기
kind: documentation
title: RUM을 사용하여 Swift 테스트 계측하기
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility는 현재 선택한 사이트 ({{< region-param key="dd_site_name" >}})에서 사용할 수 없습니다.</div>
{{< /site-region >}}

## 개요

[테스트 가시성][3]이 Swift에 이미 설정되어 있는지 확인합니다.

### 호환성

CI 가시성 - RUM 통합은 `dd-sdk-swift-testing` 및 `dd-sdk-ios` 버전에서 사용할 수 있습니다.

* `dd-sdk-swift-testing` >= 2.0.0
* `dd-sdk-ios` >= 1.10.0

## Swift 테스트와 RUM 연결

UI 테스트를 위해 `dd-sdk-swift-testing`을 연결하고 테스트 중인 애플리케이션이 [실제 사용자 모니터링][1]를 사용하여 계측되면 테스트 결과와 생성된 RUM 브라우저 세션 및 세션 리플레이가 자동으로 연결됩니다.

테스트 가시성 테스트 세부 정보 사이드 패널에 **RUM 세션** 탭이 나타납니다.

{{< img src="ci/ci-swift-rum-session-tab.png" alt="Browser Session Tab in Test Detail" style="width:100%;">}}

RUM 세션에는 [RUM이 일반적으로 수집하는][2] 모든 데이터가 있으므로 사용자 이름이나 예기치 않은 오류 등 iOS 테스트에서 발생할 수 있는 문제를 디버깅할 수 있습니다.

{{< img src="ci/ci-swift-rum-session-tab-errors.png" alt="Browser Session Tab Errors in Test Detail" style="width:100%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/ios/
[2]: /ko/real_user_monitoring/ios/data_collected/
[3]: /ko/continuous_integration/tests/swift/