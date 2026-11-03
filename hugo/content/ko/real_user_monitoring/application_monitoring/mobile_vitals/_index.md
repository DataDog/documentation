---
aliases:
- /ko/real_user_monitoring/android/mobile_vitals
- /ko/real_user_monitoring/ios/mobile_vitals
- /ko/real_user_monitoring/flutter/mobile_vitals
- /ko/real_user_monitoring/reactnative/mobile_vitals
description: Android, iOS, Flutter 및 React Native 전반에 걸쳐 시작 시간, 프레임 속도, 리소스 사용량 및
  성능 시계열을 포함한 주요 모바일 성능 메트릭을 모니터링하세요.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: 소스 코드
  text: dd-sdk-android의 소스 코드
- link: https://github.com/DataDog/dd-sdk-ios
  tag: 소스 코드
  text: dd-sdk-ios 소스 코드
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: 소스 코드
  text: dd-sdk-flutter의 소스 코드
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: 소스 코드
  text: dd-sdk-reactnative의 소스 코드
- link: /real_user_monitoring/explorer/events/#performance-timeseries
  tag: 문서
  text: 성능 시계열 패널 탐색
- link: /real_user_monitoring
  tag: 문서
  text: Datadog RUM 탐색하기
title: 모바일 바이탈
---
## 개요 {#overview}

Real User Monitoring은 [Android Vitals][1] 및 [Apple의 MetricKit][2]와 같은 프레임워크에서 영감을 받은 데이터 포인트 세트를 포함하는 모바일 바이탈을 제공합니다. 이는 모바일 애플리케이션의 응답성, 안정성 및 리소스 소비에 대한 인사이트를 계산하는 데 도움을 줍니다. 모바일 바이탈의 범위는 나쁨, 보통, 좋음으로 나뉩니다.

{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Summary{{< /ui >}}로 이동하여 애플리케이션을 선택하면 애플리케이션에 대한 모바일 바이탈을 볼 수 있습니다.

{{< img src="real_user_monitoring/android/android-mobile-vitals.png" alt="Performance Summary 탭의 모바일 바이탈" style="width:90%;">}}

RUM 모바일 앱 성능 대시보드에 액세스하려면 {{< ui >}}Performance{{< /ui >}} 탭으로 전환한 다음 {{< ui >}}View Dashboard{{< /ui >}} 링크를 클릭하세요.

{{< img src="real_user_monitoring/android/android-perf-dash-link.png" alt="Performance 탭에서 모바일 성능 대시보드에 액세스합니다." style="width:90%;">}}

다양한 애플리케이션 버전에 걸쳐 데이터 포인트를 표시하는 선 그래프를 통해 애플리케이션의 전반적인 상태와 성능을 파악할 수 있습니다. 애플리케이션 버전을 기준으로 필터링하거나 특정 세션 및 조회를 보려면 그래프를 클릭하세요.

{{< img src="real_user_monitoring/android/android_mobile_vitals_3.png" alt="RUM Explorer의 이벤트 타이밍 및 모바일 바이탈" style="width:90%;">}}

RUM Explorer에서 뷰를 선택하고 세션 내 애플리케이션의 사용자 경험과 직접적으로 연관된 권장 벤치마크 범위를 관찰할 수도 있습니다. {{< ui >}}Refresh Rate Average{{< /ui >}}와 같은 메트릭을 클릭하고 {{< ui >}}Search Views With Poor Performance{{< /ui >}}를 클릭하여 검색 쿼리에 필터를 적용하고 추가 뷰를 검토하세요.

## 텔레메트리 {#telemetry}

다음 텔레메트리는 모바일 애플리케이션의 성능에 대한 인사이트를 제공합니다.

{{< tabs >}}
{{% tab "Android" %}}

| 측정 항목 | 설명 |
| --- | --- |
| 새로 고침 빈도 | 부드럽고 [끊김 없는][1] 사용자 경험을 보장하려면 애플리케이션이 60Hz 미만으로 프레임을 렌더링해야 합니다. <br /><br /> RUM은 `@view.refresh_rate_average` 및 `@view.refresh_rate_min` 뷰 속성을 사용하여 애플리케이션의 [메인 스레드 디스플레이 새로 고침 빈도][2]를 추적합니다.  <br /><br />  **참고:** 새로 고침 빈도는 0~60fps 범위로 정규화됩니다. 예를 들어, 애플리케이션이 120fps 렌더링이 가능한 장치에서 100fps로 실행되는 경우, Datadog은 {{< ui >}}Mobile Vitals{{< /ui >}}에서 50fps를 보고합니다.|
| 느린 렌더링 | 부드럽고 [끊김 없는][1] 사용자 경험을 보장하려면 애플리케이션이 60Hz 미만으로 프레임을 렌더링해야 합니다. <br /><br />  RUM은 `@view.refresh_rate_average` 및 `@view.refresh_rate_min` 뷰 속성을 사용하여 애플리케이션의 [디스플레이 새로 고침 빈도][2]를 추적합니다. <br /><br />  느린 렌더링을 통해 렌더링에 16ms 또는 60Hz보다 오래 걸리는 뷰를 모니터링할 수 있습니다. <br /> **참고:** 새로 고침 빈도는 0~60fps 범위로 정규화됩니다. 예를 들어, 애플리케이션이 120fps 렌더링이 가능한 장치에서 100fps로 실행되는 경우, Datadog은 {{< ui >}}Mobile Vitals{{< /ui >}}에서 50fps를 보고합니다. |
| 정지된 프레임 | 렌더링에 700ms 이상 걸리는 프레임은 애플리케이션에서 멈추고 응답하지 않는 상태로 나타납니다. 이러한 프레임은 [정지된 프레임][3]으로 분류됩니다. <br /><br />  RUM은 완료하는 데 100ms 이상 걸리는 모든 작업에 대해 지속 시간과 함께 `long task` 이벤트를 추적합니다. <br /><br />  정지된 프레임을 사용하면 최종 사용자에게 정지된 것처럼 보이는(렌더링에 700ms 이상 걸리는) 뷰를 모니터링하고 애플리케이션의 끊김 현상을 제거할 수 있습니다. |
| 애플리케이션 응답 없음 | 애플리케이션의 UI 스레드가 5초 넘게 차단되면 `Application Not Responding`([ANR][4]) 오류가 트리거됩니다. 애플리케이션이 포그라운드에 있으면 시스템이 사용자에게 대화 상자 모달을 표시하여 애플리케이션을 강제 종료할 수 있도록 합니다. <br /><br />   RUM은 ANR 발생을 추적하고 ANR이 발생할 때 메인 스레드를 차단하는 전체 스택 트레이스를 캡처합니다. |
| 버전별 무충돌 세션 | [애플리케이션 충돌][5]은 일반적으로 처리되지 않은 예외나 신호로 인해 애플리케이션이 예기치 않게 종료될 때 보고됩니다. 애플리케이션의 무충돌 사용자 세션은 최종 사용자의 경험 및 전반적인 만족도와 직접적으로 관련이 있습니다. <br /><br />   RUM은 전체 충돌 보고서를 추적하고 [Error Tracking][6]을 통해 시간 경과에 따른 추세를 보여줍니다. <br /><br />  무충돌 세션을 통해 업계 벤치마크를 지속적으로 파악하고 애플리케이션이 Google Play Store에서 높은 순위를 차지하도록 할 수 있습니다. |
| 초당 CPU 틱 | 높은 CPU 사용량은 사용자 장치의 [배터리 수명][7]에 영향을 미칩니다.  <br /><br />  RUM은 각 뷰의 초당 CPU 틱과 세션 동안의 CPU 사용률을 추적합니다. 권장 범위는 양호의 경우 40 미만, 보통의 경우 60 미만입니다. <br /><br />  애플리케이션의 {{< ui >}}Overview{{< /ui >}} 페이지에 있는 {{< ui >}}Mobile Vitals{{< /ui >}}에서 선택한 기간 동안 평균 CPU 틱 수가 가장 많은 상위 뷰를 확인할 수 있습니다. |
| 메모리 사용률 | 높은 메모리 사용량은 [OutOfMemoryError][8]를 유발하여 애플리케이션 충돌을 일으키고 사용자 경험을 저하시킬 수 있습니다. <br /><br />  RUM은 세션 동안 각 뷰에 대해 애플리케이션이 사용하는 물리적 메모리 양을 바이트 단위로 추적합니다. 권장 범위는 양호의 경우 200MB 미만, 보통의 경우 400MB 미만입니다. <br /><br />  애플리케이션의 {{< ui >}}Overview{{< /ui >}} 페이지에 있는 {{< ui >}}Mobile Vitals{{< /ui >}}에서 선택한 기간 동안 평균적으로 가장 많은 메모리를 소비하는 상위 뷰를 확인할 수 있습니다. |

[1]: https://developer.android.com/topic/performance/vitals/render#common-jank
[2]: https://developer.android.com/guide/topics/media/frame-rate
[3]: https://developer.android.com/topic/performance/vitals/frozen
[4]: https://developer.android.com/topic/performance/vitals/anr
[5]: https://developer.android.com/topic/performance/vitals/crash
[6]: /ko/real_user_monitoring/error_tracking/android
[7]: https://developer.android.com/topic/performance/power
[8]: https://developer.android.com/reference/java/lang/OutOfMemoryError

{{% /tab %}}
{{% tab "iOS" %}}

| 측정 항목 | 설명 |
| --- | --- |
| 새로 고침 빈도 | 부드럽고 끊김 없는 사용자 경험을 보장하려면 애플리케이션이 60Hz 미만으로 프레임을 렌더링해야 합니다. <br /><br /> RUM은 `@view.refresh_rate_average` 및 `@view.refresh_rate_min` 뷰 속성을 사용하여 애플리케이션의 메인 스레드 디스플레이 새로 고침 빈도를 추적합니다.  <br /><br />  **참고:** 새로 고침 빈도는 0~60fps 범위로 정규화됩니다. 예를 들어, 애플리케이션이 120fps 렌더링이 가능한 장치에서 100fps로 실행되는 경우, Datadog은 {{< ui >}}Mobile Vitals{{< /ui >}}에서 50fps를 보고합니다. |
| 느린 렌더링 | 부드럽고 끊김 없는 사용자 경험을 보장하려면 애플리케이션이 60Hz 미만으로 프레임을 렌더링해야 합니다. <br /><br />  RUM은 `@view.refresh_rate_average` 및 `@view.refresh_rate_min` 뷰 속성을 사용하여 애플리케이션의 디스플레이 새로 고침 빈도를 추적합니다. <br /><br />  느린 렌더링을 통해 렌더링에 16ms 또는 60Hz보다 오래 걸리는 뷰를 모니터링할 수 있습니다. <br /> **참고:** 새로 고침 빈도는 0~60fps 범위로 정규화됩니다. 예를 들어, 애플리케이션이 120fps 렌더링이 가능한 장치에서 100fps로 실행되는 경우, Datadog은 {{< ui >}}Mobile Vitals{{< /ui >}}에서 50fps를 보고합니다. |
| 정지된 프레임 | 렌더링에 700ms 이상 걸리는 프레임은 애플리케이션에서 멈추고 응답하지 않는 상태로 나타납니다. 이러한 프레임은 정지된 프레임으로 분류됩니다. <br /><br />  RUM은 완료하는 데 100ms 이상 걸리는 모든 작업에 대해 지속 시간과 함께 `long task` 이벤트를 추적합니다. <br /><br />  정지된 프레임을 사용하면 최종 사용자에게 정지된 것처럼 보이는(렌더링에 700ms 이상 걸리는) 뷰를 모니터링하고 애플리케이션의 끊김 현상을 제거할 수 있습니다. |
| 버전별 무충돌 세션 | [애플리케이션 충돌][1]은 일반적으로 처리되지 않은 예외나 신호로 인해 애플리케이션이 예기치 않게 종료될 때 보고됩니다. 애플리케이션의 무충돌 사용자 세션은 최종 사용자의 경험 및 전반적인 만족도와 직접적으로 관련이 있습니다. <br /><br />   RUM은 전체 충돌 보고서를 추적하고 [Error Tracking][2]을 통해 시간 경과에 따른 추세를 보여줍니다. <br /><br />  무충돌 세션을 통해 업계 벤치마크를 지속적으로 파악하고 애플리케이션이 Apple App Store에서 높은 순위를 차지하도록 할 수 있습니다. |
| 응답 없음 비율 | Apple의 정의에 따르면, 애플리케이션의 응답 없음 비율은 "앱이 응답하지 않는 시간(초/시간)이며, 250ms를 초과하는 응답 없음 기간만 계산한 값"에 해당합니다. Datadog에서 애플리케이션의 응답 없음 비율을 계산하려면 [앱 응답 없음 보고][4]를 활성화하고 [전용 섹션][5]을 따르세요.
| 초당 CPU 틱 | 높은 CPU 사용량은 사용자 장치의 [배터리 수명][3]에 영향을 미칩니다.  <br /><br />  RUM은 각 뷰의 초당 CPU 틱과 세션 동안의 CPU 사용률을 추적합니다. 권장 범위는 양호의 경우 40 미만, 보통의 경우 60 미만입니다. <br /><br />  애플리케이션의 {{< ui >}}Overview{{< /ui >}} 페이지에 있는 {{< ui >}}Mobile Vitals{{< /ui >}}에서 선택한 기간 동안 평균 CPU 틱 수가 가장 많은 상위 뷰를 확인할 수 있습니다. |
| 메모리 사용률 | 높은 메모리 사용량은 [Watchdog 종료][6]를 유발하여 사용자 경험을 저하시킬 수 있습니다. <br /><br />  RUM은 세션 동안 각 뷰에 대해 애플리케이션이 사용하는 물리적 메모리 양을 바이트 단위로 추적합니다. 권장 범위는 양호의 경우 200MB 미만, 보통의 경우 400MB 미만입니다. <br /><br />  애플리케이션의 {{< ui >}}Overview{{< /ui >}} 페이지에 있는 {{< ui >}}Mobile Vitals{{< /ui >}}에서 선택한 기간 동안 평균적으로 가장 많은 메모리를 소비하는 상위 뷰를 확인할 수 있습니다. |

[1]: https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs
[2]: /ko/real_user_monitoring/ios/crash_reporting/
[3]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[4]: /ko/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-app-hang-reporting
[5]: /ko/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#compute-the-hang-rate-of-your-application
[6]: /ko/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-watchdog-terminations-reporting

{{% /tab %}}
{{% tab "Flutter" %}}

| 측정 항목 | 설명 |
| --- | --- |
| 새로 고침 빈도 | 부드럽고 [끊김 없는][1] 사용자 경험을 보장하려면 애플리케이션이 60Hz 미만으로 프레임을 렌더링해야 합니다. <br /><br /> RUM은 `@view.refresh_rate_average` 및 `@view.refresh_rate_min` 뷰 속성을 사용하여 애플리케이션의 [메인 스레드 디스플레이 새로 고침 빈도][2]를 추적합니다.  <br /><br />  **참고:** 새로 고침 빈도는 0~60fps 범위로 정규화됩니다. 예를 들어, 애플리케이션이 120fps 렌더링이 가능한 장치에서 100fps로 실행되는 경우, Datadog은 {{< ui >}}Mobile Vitals{{< /ui >}}에서 50fps를 보고합니다. |
| 느린 렌더링 | 부드럽고 [끊김 없는][1] 사용자 경험을 보장하려면 애플리케이션이 60Hz 미만으로 프레임을 렌더링해야 합니다. <br /><br />  RUM은 `@view.refresh_rate_average` 및 `@view.refresh_rate_min` 뷰 속성을 사용하여 애플리케이션의 [디스플레이 새로 고침 빈도][2]를 추적합니다. <br /><br />  느린 렌더링을 통해 렌더링에 16ms 또는 60Hz보다 오래 걸리는 뷰를 모니터링할 수 있습니다. <br /> **참고:** 새로 고침 빈도는 0~60fps 범위로 정규화됩니다. 예를 들어, 애플리케이션이 120fps 렌더링이 가능한 장치에서 100fps로 실행되는 경우, Datadog은 {{< ui >}}Mobile Vitals{{< /ui >}}에서 50fps를 보고합니다. |
| 정지된 프레임 | 렌더링에 700ms 이상 걸리는 프레임은 애플리케이션에서 멈추고 응답하지 않는 상태로 나타납니다. 이러한 프레임은 [정지된 프레임][3]으로 분류됩니다. <br /><br />  RUM은 완료하는 데 100ms 이상 걸리는 모든 작업에 대해 지속 시간과 함께 `long task` 이벤트를 추적합니다. <br /><br />  정지된 프레임을 사용하면 최종 사용자에게 정지된 것처럼 보이는(렌더링에 700ms 이상 걸리는) 뷰를 모니터링하고 애플리케이션의 끊김 현상을 제거할 수 있습니다. |
| 애플리케이션 응답 없음 | Android에서 애플리케이션의 UI 스레드가 5초 넘게 차단되면 `Application Not Responding`([ANR][4]) 오류가 트리거됩니다. 애플리케이션이 포그라운드에 있으면 시스템이 사용자에게 대화 상자 모달을 표시하여 애플리케이션을 강제 종료할 수 있도록 합니다. <br /><br />   RUM은 ANR 발생을 추적하고 ANR이 발생할 때 메인 스레드를 차단하는 전체 스택 트레이스를 캡처합니다. |
| 버전별 무충돌 세션 | [애플리케이션 충돌][5]은 일반적으로 처리되지 않은 예외나 신호로 인해 애플리케이션이 예기치 않게 종료될 때 보고됩니다. 애플리케이션의 무충돌 사용자 세션은 최종 사용자의 경험 및 전반적인 만족도와 직접적으로 관련이 있습니다. <br /><br />   RUM은 전체 충돌 보고서를 추적하고 [Error Tracking][8]을 통해 시간 경과에 따른 추세를 보여줍니다. <br /><br />  무충돌 세션을 통해 업계 벤치마크를 지속적으로 파악하고 애플리케이션이 Google Play Store에서 높은 순위를 차지하도록 할 수 있습니다. |
| 초당 CPU 틱 | 높은 CPU 사용량은 사용자 장치의 [배터리 수명][6]에 영향을 미칩니다.  <br /><br />  RUM은 각 뷰의 초당 CPU 틱과 세션 동안의 CPU 사용률을 추적합니다. 권장 범위는 양호의 경우 40 미만, 보통의 경우 60 미만입니다. <br /><br />  애플리케이션의 {{< ui >}}Overview{{< /ui >}} 페이지에 있는 {{< ui >}}Mobile Vitals{{< /ui >}}에서 선택한 기간 동안 평균 CPU 틱 수가 가장 많은 상위 뷰를 확인할 수 있습니다. |
| 메모리 사용률 | 높은 메모리 사용량은 [메모리 부족 충돌][7]을 유발하여 사용자 경험을 저하시킬 수 있습니다. <br /><br />  RUM은 세션 동안 각 뷰에 대해 애플리케이션이 사용하는 물리적 메모리 양을 바이트 단위로 추적합니다. 권장 범위는 양호의 경우 200MB 미만, 보통의 경우 400MB 미만입니다. <br /><br />  애플리케이션의 {{< ui >}}Overview{{< /ui >}} 페이지에 있는 {{< ui >}}Mobile Vitals{{< /ui >}}에서 선택한 기간 동안 평균적으로 가장 많은 메모리를 소비하는 상위 뷰를 확인할 수 있습니다. |
| 위젯 빌드 시간 | UI 스레드에서 프레임을 빌드하는 데 걸리는 시간입니다. 애플리케이션이 부드럽게 작동하도록 하려면 60 FPS의 경우 16ms, 120 FPS의 경우 8ms를 초과해서는 안 됩니다. <br /><br />  이 값이 높으면 이 뷰에 대한 빌드 메서드를 최적화해야 한다는 의미입니다. Flutter 문서의 [빌드 비용 제어][8]를 참조하세요. |
| 래스터 시간 | 래스터 스레드에서 프레임을 래스터화하는 데 걸리는 시간입니다. 애플리케이션이 부드럽게 작동하도록 하려면 60 FPS의 경우 16ms, 120 FPS의 경우 8ms를 초과해서는 안 됩니다. <br /><br />  이 값이 높으면 뷰를 렌더링하기 복잡하다는 의미일 수 있습니다. Flutter 문서의 [GPU 그래프에서 문제 식별하기][12]를 참조하세요. |

[1]: https://docs.flutter.dev/perf/ui-performance
[2]: https://docs.flutter.dev/tools/devtools/performance
[3]: https://developer.android.com/topic/performance/vitals/frozen
[4]: https://developer.android.com/topic/performance/vitals/anr
[5]: https://docs.flutter.dev/reference/crash-reporting
[6]: /ko/real_user_monitoring/error_tracking/flutter
[7]: https://docs.flutter.dev/perf/best-practices#build-and-display-frames-in-16ms
[8]: https://docs.flutter.dev/tools/devtools/memory
[9]: https://docs.flutter.dev/perf/best-practices#control-build-cost
[10]: https://docs.flutter.dev/perf/ui-performance#identifying-problems-in-the-gpu-graph

{{% /tab %}}
{{% tab "React Native" %}}

| 측정 항목 | 설명 |
| --- | --- |
| 새로 고침 빈도 | 부드럽고 [끊김 없는][1] 사용자 경험을 보장하려면 애플리케이션이 60Hz 미만으로 프레임을 렌더링해야 합니다. <br /><br /> RUM은 `@view.refresh_rate_average` 및 `@view.refresh_rate_min` 뷰 속성을 사용하여 애플리케이션의 [메인 스레드 디스플레이 새로 고침 빈도][2]를 추적합니다.  <br /><br />  **참고:** 새로 고침 빈도는 0~60fps 범위로 정규화됩니다. 예를 들어, 애플리케이션이 120fps 렌더링이 가능한 장치에서 100fps로 실행되는 경우, Datadog은 {{< ui >}}Mobile Vitals{{< /ui >}}에서 50fps를 보고합니다. |
| JS 새로 고침 빈도 | 부드럽고 [끊김 없는][1] 사용자 경험을 보장하려면 애플리케이션이 60Hz 미만으로 프레임을 렌더링해야 합니다. <br /><br /> RUM은 `@view.js_refresh_rate.average`, `@view.js_refresh_rate.min`, `@view.js_refresh_rate.max` 뷰 속성을 사용하여 애플리케이션의 [JavaScript 스레드 디스플레이 새로 고침 빈도][2]를 추적합니다.  <br /><br />  **참고:** 새로 고침 빈도는 0~60fps 범위로 정규화됩니다. 예를 들어, 애플리케이션이 120fps 렌더링이 가능한 장치에서 100fps로 실행되는 경우, Datadog은 {{< ui >}}Mobile Vitals{{< /ui >}}에서 50fps를 보고합니다. |
| 느린 렌더링 | 부드럽고 [끊김 없는][1] 사용자 경험을 보장하려면 애플리케이션이 60Hz 미만으로 프레임을 렌더링해야 합니다. <br /><br /> 느린 렌더링을 통해 평균 프레임 속도가 55fps 미만인 뷰를 모니터링할 수 있습니다.  <br /><br />  **참고:** 새로 고침 빈도는 0~60fps 범위로 정규화됩니다. 예를 들어, 애플리케이션이 120fps 렌더링이 가능한 장치에서 100fps로 실행되는 경우, Datadog은 {{< ui >}}Mobile Vitals{{< /ui >}}에서 50fps를 보고합니다. |
| 정지된 프레임 | 렌더링에 700ms 이상 걸리는 프레임은 애플리케이션에서 멈추고 응답하지 않는 상태로 나타납니다. 이러한 프레임은 [정지된 프레임][3]으로 분류됩니다. <br /><br />  RUM은 완료하는 데 100ms 이상 걸리는 모든 작업에 대해 지속 시간과 함께 `long task` 이벤트를 추적합니다. <br /><br />  정지된 프레임을 사용하면 최종 사용자에게 정지된 것처럼 보이는(렌더링에 700ms 이상 걸리는) 뷰를 모니터링하고 애플리케이션의 끊김 현상을 제거할 수 있습니다. |
| 애플리케이션 응답 없음 | 애플리케이션의 UI 스레드가 5초 넘게 차단되면 `Application Not Responding`(ANR) 오류가 트리거됩니다. 애플리케이션이 포그라운드에 있으면 시스템이 사용자에게 대화 상자 모달을 표시하여 애플리케이션을 강제 종료할 수 있도록 합니다. <br /><br />   RUM은 ANR 발생을 추적하고 ANR이 발생할 때 메인 스레드를 차단하는 전체 스택 트레이스를 캡처합니다. |
| 버전별 무충돌 세션 | [애플리케이션 충돌][4]은 일반적으로 처리되지 않은 예외나 신호로 인해 애플리케이션이 예기치 않게 종료될 때 보고됩니다. 애플리케이션의 무충돌 사용자 세션은 최종 사용자의 경험 및 전반적인 만족도와 직접적으로 관련이 있습니다. <br /><br />   RUM은 전체 충돌 보고서를 추적하고 [Error Tracking][5]을 통해 시간 경과에 따른 추세를 보여줍니다. <br /><br />  무충돌 세션을 통해 업계 벤치마크를 지속적으로 파악하고 애플리케이션이 Google Play Store에서 높은 순위를 차지하도록 할 수 있습니다. |
| 초당 CPU 틱 | 높은 CPU 사용량은 사용자 장치의 [배터리 수명][6]에 영향을 미칩니다.  <br /><br />  RUM은 각 뷰의 초당 CPU 틱과 세션 동안의 CPU 사용률을 추적합니다. 권장 범위는 양호의 경우 40 미만, 보통의 경우 60 미만입니다. <br /><br />  애플리케이션의 {{< ui >}}Overview{{< /ui >}} 페이지에 있는 {{< ui >}}Mobile Vitals{{< /ui >}}에서 선택한 기간 동안 평균 CPU 틱 수가 가장 많은 상위 뷰를 확인할 수 있습니다. |
| 메모리 사용률 | 높은 메모리 사용량은 [메모리 부족 충돌][7]을 유발하여 사용자 경험을 저하시킬 수 있습니다. <br /><br />  RUM은 세션 동안 각 뷰에 대해 애플리케이션이 사용하는 물리적 메모리 양을 바이트 단위로 추적합니다. 권장 범위는 양호의 경우 200MB 미만, 보통의 경우 400MB 미만입니다. <br /><br />  애플리케이션의 {{< ui >}}Overview{{< /ui >}} 페이지에 있는 {{< ui >}}Mobile Vitals{{< /ui >}}에서 선택한 기간 동안 평균적으로 가장 많은 메모리를 소비하는 상위 뷰를 확인할 수 있습니다. |

[1]: http://jankfree.org/
[2]: https://reactnative.dev/docs/performance#what-you-need-to-know-about-frames
[3]: https://firebase.google.com/docs/perf-mon/screen-traces?platform=ios#frozen-frames
[4]: https://docs.microsoft.com/en-us/appcenter/sdk/crashes/react-native
[5]: /ko/real_user_monitoring/ios/crash_reporting/
[6]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[7]: https://docs.sentry.io/platforms/apple/guides/ios/configuration/out-of-memory/

{{% /tab %}}
{{% tab "Unity" %}}

| 측정 항목 | 설명 |
| --- | --- |
| 새로 고침 빈도 | 부드럽고 끊김 없는 사용자 경험을 보장하려면 애플리케이션이 60Hz 미만으로 프레임을 렌더링해야 합니다. <br /><br /> RUM은 `@view.refresh_rate_average` 및 `@view.refresh_rate_min` 뷰 속성을 사용하여 애플리케이션의 메인 스레드 디스플레이 새로 고침 빈도를 추적합니다.  <br /><br />  **참고:** 새로 고침 빈도는 0~60fps 범위로 정규화됩니다. 예를 들어, 애플리케이션이 120fps 렌더링이 가능한 장치에서 100fps로 실행되는 경우, Datadog은 {{< ui >}}Mobile Vitals{{< /ui >}}에서 50fps를 보고합니다. |
| 느린 렌더링 | 부드럽고 끊김 없는 사용자 경험을 보장하려면 애플리케이션이 60Hz 미만으로 프레임을 렌더링해야 합니다. <br /><br />  RUM은 `@view.refresh_rate_average` 및 `@view.refresh_rate_min` 뷰 속성을 사용하여 애플리케이션의 디스플레이 새로 고침 빈도를 추적합니다. <br /><br />  느린 렌더링을 통해 렌더링에 16ms 또는 60Hz보다 오래 걸리는 뷰를 모니터링할 수 있습니다. <br /> **참고:** 새로 고침 빈도는 0~60fps 범위로 정규화됩니다. 예를 들어, 애플리케이션이 120fps 렌더링이 가능한 장치에서 100fps로 실행되는 경우, Datadog은 {{< ui >}}Mobile Vitals{{< /ui >}}에서 50fps를 보고합니다. |
| 버전별 무충돌 세션 | [애플리케이션 충돌][1]은 일반적으로 처리되지 않은 예외나 신호로 인해 애플리케이션이 예기치 않게 종료될 때 보고됩니다. 애플리케이션의 무충돌 사용자 세션은 최종 사용자의 경험 및 전반적인 만족도와 직접적으로 관련이 있습니다. <br /><br />   RUM은 전체 충돌 보고서를 추적하고 [Error Tracking][2]을 통해 시간 경과에 따른 추세를 보여줍니다. <br /><br />  무충돌 세션을 통해 업계 벤치마크를 지속적으로 파악하고 애플리케이션이 Google Play Store에서 높은 순위를 차지하도록 할 수 있습니다. |
| 응답 없음 비율 | Apple의 정의에 따르면, 애플리케이션의 응답 없음 비율은 "앱이 응답하지 않는 시간(초/시간)이며, 250ms를 초과하는 응답 없음 기간만 계산한 값"에 해당합니다. Datadog에서 애플리케이션의 응답 없음 비율을 계산하려면 [Datadog 설정][4]에서 {{< ui >}}Track Non-Fatal App Hangs{{< /ui >}}를 활성화하세요.
| 초당 CPU 틱 | 높은 CPU 사용량은 사용자 장치의 [배터리 수명][3]에 영향을 미칩니다.  <br /><br />  RUM은 각 뷰의 초당 CPU 틱과 세션 동안의 CPU 사용률을 추적합니다. 권장 범위는 양호의 경우 40 미만, 보통의 경우 60 미만입니다. <br /><br />  애플리케이션의 {{< ui >}}Overview{{< /ui >}} 페이지에 있는 {{< ui >}}Mobile Vitals{{< /ui >}}에서 선택한 기간 동안 평균 CPU 틱 수가 가장 많은 상위 뷰를 확인할 수 있습니다. |
| 메모리 사용률 | 높은 메모리 사용량은 [Watchdog 종료][6]를 유발하여 사용자 경험을 저하시킬 수 있습니다. <br /><br />  RUM은 세션 동안 각 뷰에 대해 애플리케이션이 사용하는 물리적 메모리 양을 바이트 단위로 추적합니다. 권장 범위는 양호의 경우 200MB 미만, 보통의 경우 400MB 미만입니다. <br /><br />  애플리케이션의 {{< ui >}}Overview{{< /ui >}} 페이지에 있는 {{< ui >}}Mobile Vitals{{< /ui >}}에서 선택한 기간 동안 평균적으로 가장 많은 메모리를 소비하는 상위 뷰를 확인할 수 있습니다. |

[1]: https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs
[2]: /ko/real_user_monitoring/error_tracking/mobile/unity/
[3]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[4]: /ko/real_user_monitoring/application_monitoring/unity/setup
[6]: /ko/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-watchdog-terminations-reporting

{{% /tab %}}

{{< /tabs >}}

## 성능 시계열 {#performance-timeseries}

{{< callout url="https://www.datadoghq.com/product-preview/rum-timeseries/" btn_hidden="false" header="미리 보기에 참여하세요!">}}
성능 시계열은 미리 보기 상태이며, 수집은 기본적으로 꺼져 있습니다. 활성화하려면 미리 보기에 참여하세요. Datadog은 참여하는 고객에게 설정 지침을 보냅니다.
{{< /callout >}}

성능 시계열은 iOS 및 Android SDK에서 사용할 수 있습니다.

표준 모바일 성능 바이탈은 뷰의 전체 수명 동안의 평균 메모리 사용률을 보고합니다. 성능 시계열은 세션 동안 매초 메모리 및 CPU 사용량을 캡처하고, 세션, 뷰 및 작업 [사이드 패널][3]의 대화형 그래프에 결과를 표시합니다.

{{< img src="real_user_monitoring/mobile_vitals/timeseries-panel.png" alt="세션 동안의 대화형 메모리 및 CPU 그래프를 보여주는 RUM 사이드 패널의 성능 시계열 섹션" style="width:100%;" >}}

수집이 활성화되면 모든 세션에 대해 시계열이 캡처됩니다.

두 가지 계열이 수집됩니다.

- **CPU 사용량**: 애플리케이션이 소비하는 모든 코어 전반에 걸친 장치의 총 CPU 용량의 백분율입니다. 이는 뷰에 대해 보고된 초당 CPU 틱과는 다릅니다.
- **메모리**: SDK가 뷰 메모리 바이탈을 위해 이미 수집하고 있는 값과 동일합니다. [iOS에서의 뷰 메모리 수집][4] 및 [Android에서의 뷰 메모리 수집][5]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.android.com/topic/performance/vitals
[2]: https://developer.apple.com/documentation/metrickit
[3]: /ko/real_user_monitoring/explorer/events/#performance-timeseries
[4]: /ko/real_user_monitoring/application_monitoring/ios/data_collected/#view-memory-collection
[5]: /ko/real_user_monitoring/application_monitoring/android/data_collected/#view-memory-collection