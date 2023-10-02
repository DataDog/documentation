---
description: React Native 프로젝트에서 RUM 데이터를 수집합니다.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative를 위한 소스 코드
- link: real_user_monitoring/explorer/
  tag: 설명서
  text: RUM 데이터를 탐색하는 방법 알아보기
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: 블로그
  text: React Native 애플리케이션 모니터링
kind: 설명서
title: 모바일 바이탈
---
## 개요

실제 사용자 모니터링은 모바일 애플리케이션의 응답성, 안정성 및 리소스 소비에 대한 인사이트를 계산하는 데 도움이 되는 일련의 메트릭인 모바일 바이탈을 제공합니다. 모바일 바이탈은 불량, 보통, 양호로 나뉩니다.

 **UX Monitoring > Performance Summary**로 이동하여 애플리케이션을 선택하면 애플리케이션에 대한 모바일 바이탈을 볼 수 있습니다.

{{< img src="real_user_monitoring/react_native/reactnative_mobile_vitals-3.png" alt="성능 탭의 모바일 바이탈" style="width:90%;">}}

RUM 모바일 앱 성능 대시보드에 액세스하려면 애플리케이션 요약 페이지에서 Monitor Performance Metrics 섹션까지 스크롤하여 **Performance Overview**를 클릭합니다.

{{< img src="real_user_monitoring/flutter/flutter-performance-overview.png" alt="성능 요약 탭에서 모바일 성능 대시보드에 액세스합니다." style="width:90%;">}}

다양한 애플리케이션 버전의 메트릭을 표시하는 선 그래프를 통해 애플리케이션의 전반적인 상태와 성능을 이해할 수 있습니다. 애플리케이션 버전을 필터링하거나 특정 세션 및 보기를 보려면 그래프를 클릭하세요.

{{< img src="real_user_monitoring/react_native/rum_explorer_mobile_vitals-3.png" alt="RUM 탐색기의 이벤트 타이밍 및 모바일 바이탈" style="width:90%;">}}

또한 RUM 탐색기에서 보기를 선택하고 세션에서 애플리케이션의 사용자 경험과 직접적으로 연관된 권장 벤치마크 범위를 관찰할 수 있습니다. **Refresh Rate Average**와 같은 메트릭을 클릭하고 **Search Views With Poor Performance**를 클릭하여 검색 쿼리에서 필터를 적용하고 추가 보기를 검토합니다.

## 메트릭

다음 메트릭은 모바일 애플리케이션의 성능에 대한 인사이트를 제공합니다.
| 측정                 | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 재생률                 | 부드럽고 [끊김 없는][3] 사용자 경험을 보장하려면 애플리케이션이 60Hz 미만으로 프레임을 렌더링해야 합니다.<br /><br /> RUM은 `@view.refresh_rate_average` 및 `@view.refresh_rate_min` 보기 속성을 사용하여 애플리케이션의 [메인 스레드 디스플레이 재생률][10]을 추적합니다. <br /><br /> **참고:** 새로 고침 빈도는 0~60fps 범위에서 정규화됩니다. 예를 들어, 애플리케이션이 120fps를 렌더링할 수 있는 기기에서 100fps로 실행되는 경우, Datadog은 **Mobile Vitals**에서 50fps를 보고합니다.                                                                                                                                                                                          |
| JS 재생률                 | 부드럽고 [끊김 없는][3] 사용자 경험을 보장하려면 애플리케이션이 60Hz 미만으로 프레임을 렌더링해야 합니다. <br /><br /> RUM은 `@view.js_refresh_rate.average`, `@view.js_refresh_rate.min`,`@view.js_refresh_rate.max` 보기 속성을 사용하여 애플리케이션의 [자바스크립트 스레드 디스플레이 재생률][10]을 추적합니다. <br /><br /> **참고:** 새로 고침 빈도는 0~60fps 범위에서 정규화됩니다. 예를 들어, 애플리케이션이 120fps 렌더링이 가능한 기기에서 100fps로 실행되는 경우, Datadog은 **Mobile Vitals**에서 50fps를 보고합니다.                                                                                                                                                                                   |
| 느린 렌더링                  | 부드럽고 [끊김 없는][3] 사용자 환경을 보장하려면 애플리케이션에서 60Hz 미만으로 프레임을 렌더링해야 합니다. <br /><br /> 느린 렌더링을 사용하면 평균 프레임 속도가 55fps 미만인 보기를 모니터링할 수 있습니다. <br /><br /> **참고:** 새로 고침 빈도는 0~60fps 범위에서 정규화됩니다. 예를 들어, 애플리케이션이 120fps 렌더링이 가능한 기기에서 100fps로 실행되는 경우, Datadog은 **Mobile Vitals**에서 50fps를 보고합니다.                                                                                                                                                                                         |
| 동결 프레임                 | 렌더링하는 데 700밀리초 이상 걸리는 프레임은 애플리케이션에서 멈춰 있거나 응답하지 않는 것으로 나타납니다. 이러한 프레임은 [동결 프레임][5]으로 분류됩니다. <br /><br />RUM은 완료하는 데 100ms보다 오래 걸리는 모든 작업의 지속 시간으로 `long task` 이벤트를 추적합니다. <br /><br /> 동결 프레임을 사용하면 최종 사용자에게 어떤 보기가 고정(렌더링하는 데 700ms 이상 소요)된 것처럼 보이는지 모니터링하고 애플리케이션에서 끊김 현상을 제거할 수 있습니다.                                                                                                                                                                                               |
| 애플리케이션이 응답하지 않음     | 애플리케이션의 UI 스레드가 5초 이상 차단되면 `Application Not Responding`(ANR) 오류가 트리거됩니다. 애플리케이션이 포그라운드에 있는 경우, 시스템은 사용자에게 대화 모달을 표시하여 애플리케이션을 강제 종료할 수 있도록 합니다. <br /><br /> RUM은 ANR 발생을 추적하고 ANR이 발생하면 메인 스레드를 차단하는 전체 스택 트레이스를 캡처합니다.                                                                                                                                                                                                  |
| 버전별 크래시 없는 세션 | [애플리케이션 크래시][6]는 일반적으로 처리되지 않은 예외 또는 신호로 인한 애플리케이션의 예기치 않은 종료로 인해 보고됩니다. 애플리케이션에서 크래시 없는 사용자 세션은 최종 사용자의 경험 및 전반적인 만족도와 직결됩니다. <br /><br /> RUM은 [오류 추적][7]을 통해 전체 크래시 보고서를 추적하고 시간 경과에 따른 추세를 제시합니다. <br /><br /> 크래시 없는 세션을 통해 업계 벤치마크에 대한 최신 정보를 파악하고 애플리케이션이 Google Play Store에서 높은 순위를 유지할 수 있습니다.                                          
|
| 초당 CPU 틱 수          | 높은 CPU 사용량은 사용자 디바이스의 [배터리 수명][8]에 영향을 미칩니다. <br /><br /> RUM은 각 보기에 대한 초당 CPU 틱과 세션 동안의 CPU 사용률을 추적합니다. 권장 범위는 양호한 경우 40 미만, 보통인 경우 60 미만입니다. <br /><br /> 애플리케이션의 Overview 페이지의 **Mobile Vitals**에서 선택한 기간 동안 평균 CPU 틱 수가 가장 많은 상위 보기를 확인할 수 있습니다.                                                                                                                                                                                                                                                                                                                                           |
| 메모리 사용률             | 메모리 사용량이 많으면 [메모리 부족 크래시][9]가 발생하여 사용자 환경이 저하될 수 있습니다. <br /><br /> RUM은 세션 동안 각 보기에 대해 애플리케이션이 사용하는 물리적 메모리 양을 바이트 단위로 추적합니다. 권장 범위는 양호한 경우 200MB 미만, 보통인 경우 400MB 미만입니다. <br /><br />애플리케이션의 Overview 페이지의 **Mobile Vitals**에서 선택한 기간 동안 평균적으로 메모리를 가장 많이 소비한 상위 보기를 확인할 수 있습니다.                                                                                                                                                                                                                                                                                           |


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.apple.com/documentation/metrickit
[2]: https://app.datadoghq.com/rum/explorer
[3]: http://jankfree.org/
[4]: https://reactnative.dev/docs/performance#what-you-need-to-know-about-frames
[5]: https://firebase.google.com/docs/perf-mon/screen-traces?platform=ios#frozen-frames
[6]: https://docs.microsoft.com/en-us/appcenter/sdk/crashes/react-native
[7]: /ko/real_user_monitoring/ios/crash_reporting/
[8]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[9]: https://docs.sentry.io/platforms/apple/guides/ios/configuration/out-of-memory/
[10]: https://reactnative.dev/docs/performance#what-you-need-to-know-about-frames