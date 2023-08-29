---
kind: 가이드
title: RUM을 사용하여 Swift 테스트 계측하기
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택하신 사이트({{<region-param key="dd_site_name">}})에서 현재 CIVisibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

### 호환성

CI Visibility - RUM 통합은 `dd-sdk-swift-testing` 및 `dd-sdk-ios`의 다음 버전에서만 사용 가능합니다:

* `dd-sdk-swift-testing` >= 2.0.0
* `dd-sdk-ios` >= 1.10.0

### Swift 테스트와 RUM

UI 테스트를 위해 dd-sdk-swift-testing을 연결하고 테스트 중인 애플리케이션이 [RUM][1]을 사용하여 계측되는 경우, 테스트 결과와 생성된 RUM 브라우저 세션 및 세션 리플레이가 자동으로 연결됩니다. 테스트 세부 정보 사이드 패널에 새로운 **RUM Sessions** 탭이 나타납니다:

{{< img src="ci/ci-swift-rum-session-tab.png" alt="Browser Session Tab in Test Detail" style="width:100%;">}}

RUM 세션에는 [RUM이 일반적으로 수집하는][2] 모든 데이터가 있으므로 사용자 이름이나 예기치 않은 오류와 같은 iOS 테스트의 잠재적인 문제를 디버깅할 수 있습니다:

{{< img src="ci/ci-swift-rum-session-tab-errors.png" alt="Browser Session Tab Errors in Test Detail" style="width:100%;">}}

[1]: /ko/real_user_monitoring/ios/
[2]: /ko/real_user_monitoring/ios/data_collected/