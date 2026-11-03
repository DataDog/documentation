---
further_reading:
- link: https://www.datadoghq.com/blog/create-browser-tests-from-datadog-rum-session-replay/
  tag: 블로그
  text: Datadog RUM Session Replay에서 직접 브라우저 테스트 생성하기
- link: synthetics/browser_tests
  tag: 설명서
  text: 브라우저 테스트 설정
- link: real_user_monitoring/application_monitoring/browser
  tag: 설명서
  text: RUM 브라우저 모니터링
title: Session Replay에서 Synthetic 브라우저 테스트 생성하기
---
## 개요 {#overview}

[Real User Monitoring(RUM)][1]을 이용하면 개별 사용자의 실시간 활동 및 경험을 엔드투엔드로 파악할 수 있습니다. [Synthetic 브라우저 테스트][2]를 이용하면 전 세계에서 시뮬레이션한 요청 및 액션을 사용하여 시스템과 애플리케이션의 성능을 관찰할 수 있습니다.

{{< img src="synthetics/guide/rum_to_synthetics/generate_test_modal.png" alt="Session Replay 모달을 사용한 브라우저 테스트 생성" style="width:70%" >}}

RUM의 Session Replay에서 Synthetic 브라우저 테스트를 생성하여 실사용자 행동을 기반으로 성능을 추적할 수 있습니다.

## Session Replay에서 테스트 생성{#generate-a-test-from-a-session-replay}

[RUM 탐색기][3]로 이동하여 브라우저 테스트를 생성하려는 [Session Replay][4]가 있는 세션을 선택합니다. 이벤트 타임라인 위의 {{< ui >}}Generate Synthetic Browser Test{{< /ui >}}를 클릭합니다. 

{{< img src="synthetics/guide/rum_to_synthetics/test_recording.png" alt="RUM 탐색기의 사용자 세션" style="width:100%" >}}

그러면 사용자 클릭 및 페이지 로드와 같이 Session Replay에서 캡처한 이벤트가 신규 브라우저 테스트용 개별 단계로 자동 복제됩니다. 

예를 들어, 다음 스크린샷의 경우 생성된 브라우저 테스트는 사용자의 쇼핑 페이지 세션을 복제했습니다. 해당 세션에는 쇼핑 페이지로 이동하여 {{< ui >}}Add to cart{{< /ui >}} 버튼을 클릭하는 동작이 포함됩니다. 

{{< img src="synthetics/guide/rum_to_synthetics/example_test.png" alt="RUM 데이터로 자동 채워진 브라우저 테스트 레코더" style="width:100%" >}}

[다른 브라우저 테스트][6]와 마찬가지로 필요에 따라 테스트 및 테스트 단계를 추가로 사용자 지정할 수 있습니다. 예를 들어, 추가 [테스트 단계][5](예: 어설션)를 추가하고, 테스트 실행 빈도를 조정하며, 알림을 사용자 지정할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/
[2]: /ko/synthetics/browser_tests
[3]: https://app.datadoghq.com/rum/sessions
[4]: /ko/session_replay/
[5]: /ko/synthetics/browser_tests/test_steps
[6]: /ko/synthetics/browser_tests/?tab=requestoptions#test-configuration