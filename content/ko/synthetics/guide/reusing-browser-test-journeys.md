---
further_reading:
- link: synthetics/browser_tests
  tag: 설명서
  text: 브라우저 테스트 설정
- link: /synthetics/browser_tests/actions
  tag: 설명서
  text: 브라우저 테스트 단계 생성
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: 블로그
  text: 엔드 투 엔드 테스트 생성 모범 사례
title: 브라우저 테스트 여정을 테스트 스위터 전체에 재사용하기
---

## 개요

여러 테스트에 같은 여정을 사용하고 싶을 경우가 있습니다. 다음과 같은 예가 있을 수 있습니다.

* 애플리케이션 기능 대부분이 로그인 후에 사용할 수 있는 경우, 각 테스트 도입부에서 [로그인 단계를 재사용](#create-and-reuse-a-login-subtest)할 수 있습니다.
* 애플리케이션 기능을 여러 환경에서 모니터링하고 싶을 경우, Prod 환경에서 테스트를 생성하고 Dev나 Staging 단계에서 하위 테스트로 재사용할 수 있습니다.
* 테스트를 실행할 때 데이터베이스 개체가 생성되는 경우, 테스트 환경을 제거하는 테스트를 만들고 하위 테스트로 사용하여 테스트 시작이나 종료 시에 정리하는 체계를 만들 수 있습니다.

브라우저 테스트 하위 테스트를 사용하면 테스트 스위트에서 여정을 재사용할 수 있습니다. 이 경우 다음과 같은 장점이 있습니다.
* **테스트를 만드는 시간을 줄일 수 있습니다.** 로그인 테스트가 있을 경우, 각 테스트마다 같은 로그인 단계를 레코딩하는 대신 테스트 스위트를 시작할 때 하위 테스트로 호출할 수 있습니다.
* **테스트를 더 쉽게 이해할 수 있습니다.** 다른 사람이 테스트를 읽을 때 블록 단위로 읽을 수 있어 이해하기 쉬워집니다.
* **유지 관리를 할 수 있습니다.** 흐름이 변경되더라도 테스트를 실행할 때마다 업데이트를 하는 것이 아니라 한 번만 업데이트하면 되기 때문입니다.


## 로그인 하위 테스트 생성 및 재사용

애플리케이션을 모니터링할 때 로그인이 필요할 경우, 로그인 단계를 모두 포함한 단일 테스트 하나를 만든 후 다른 테스트에 하위 테스트로 재사용하는 것이 좋습니다.

로그인 테스트를 만들고 테스트 스위트 전체에 하위 테스트로 사용하는 방법:

1. 애플리케이션에 로그인만 하는 테스트 A를 만드세요. 테스트 A의 **Starting URL**을 로그인 전 URL로 설정하세요.

  {{< img src="synthetics/guide/reusing-browser-test-journeys/login_subtest_recording.mp4" alt="로그인 하위 테스트 레코딩" video="true" width="100%">}}

2. 애플리케이션 로그인 후 기능을 모니터링하는 두 번째 테스트 테스트 B를 만드세요. 다음은 대시보드 생성을 모니터링하는 두 번째 테스트 예시입니다. 테스트 B의 **Starting URL**도 로그인 전 UR로 설정하세요.

  {{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_configuration.png" alt="상위 테스트 구성" >}}

3. 테스트 B를 레코딩할 때 **Subset**을 클릭하고 로그인 테스트 A를 선택하세요.

  {{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_subtest.mp4" alt="상위 테스트에서 하위 테스트를 포함" video="true" width="100%">}}

  이렇게 하위 테스트 단계를 설정할 때 테스트 A에 포함된 모든 단계가 상위 테스트 B를 시작할 때 실행됩니다. 또 하위 테스트 A에 있는 변수를 상위 테스트 B에서 가져옵니다. 기본적으로 하위 테스트는 메인 탭에서 실행됩니다. 따라서 하위 테스트 단계가 이전 및 다음 단계가 실행되는 동일 탭에서 실행됩니다. 상위 테스트에 설정된 URL을 사용해 하위 테스트가 실행되고(이 경우 로그인 전 URL), 하위 테스트 단계가 모두 실행된 후 브라우저 테스트가 하위 테스트가 마지막으로 실행된 브라우저에 상위 테스트의 첫 단계를 실행합니다. 현재 상위 테스트는 생성하지 않은 상태입니다.

**참고:** [**Subtest Advanced Options**][1]을 사용해 하위 테스트가 있는 탭을 선택할 수 있습니다.

4. 상위 테스트 단계를 레코딩하기 전에 레코더 창에서 전용 자격 증명으로 계정에 로그인하세요. 이렇게 하면 하위 테스트 단계가 완료된 뒤 내 브라우저 테스트와 같은 상태에서 상위 테스트가 시작하도록 할 수 있습니다.

  {{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_iframe.mp4" alt="상위 테스트에서 하위 테스트 재생" video="true" width="100%">}}

5. 로그인 한 후 **Start recording**를 클릭해 상위 테스트에서 하고 싶은 로그인 후 단계를 레코딩합니다. 레코딩을 완료한 후 **Save**를 클릭하세요.

  {{< img src="synthetics/guide/reusing-browser-test-journeys/dashboard_test_recording.mp4" alt="상위 테스트 레코딩" video="true" width="100%">}}

 위 예시에서 로그인 하위 테스트는 Datadog 테스트 계정에 로그인한 후 사용자가 타임보드를 생성할 수 있도록 해줍니다. 그 타임보드가 해당 사용자와 연결됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/browser_tests/advanced_options#subtests