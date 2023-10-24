---
description: 안드로이드 애플리케이션의 상태 및 성능에 대한 인사이트를 발견하세요.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: GitHub
  text: dd-sdk-android의 소스 코드
- link: https://www.datadoghq.com/blog/monitor-mobile-vitals-datadog/
  tag: 블로그
  text: Datadog에서 모바일 바이탈 모니터링
kind: 설명서
title: 모바일 바이탈
---

## 개요

실제 사용자 모니터링은 모바일 애플리케이션의 응답성, 안정성 및 리소스 사용에 대한 인사이트를 발견하는데 도움이 되는 [Android Vitals][1]에서 영감을 얻은 메트릭 세트인 모바일 바이탈을 제공합니다. 모바일 바이탈의 범위는 불량, 보통, 양호로 나뉩니다.

 **UX Monitoring > Performance Summary**로 이동하여 애플리케이션을 선택하면 애플리케이션에 대한 모바일 바이탈을 볼 수 있습니다.

{{< img src="real_user_monitoring/android/android_performance-summary.png" alt="성능 요약 탭의 모바일 바이탈" style="width:90%;">}}

RUM 모바일 앱 성능 대시보드에 액세스하려면 애플리케이션 요약 페이지에서 Monitor Performance Metrics 섹션으로 스크롤하여 **Performance Overview**를 클릭합니다.

{{< img src="real_user_monitoring/android/mobile-performance-dashboard-3.png" alt="성능 개요의 모바일 바이탈 세부 정보" style="width:90%;">}}

다양한 애플리케이션 버전에 대한 메트릭을 표시하는 선 그래프를 통해 애플리케이션의 전반적인 상태와 성능을 파악하세요. 애플리케이션 버전을 기준으로 필터링하거나 특정 세션 및 보기를 보려면 그래프를 클릭하세요.

{{< img src="real_user_monitoring/android/android_mobile_vitals_3.png" alt="RUM 탐색기의 이벤트 타이밍 및 모바일 바이탈" style="width:90%;">}}

RUM 탐색기에서 보기를 선택하고 세션에서 애플리케이션의 사용자 환경과 직접적으로 연관된 권장 벤치마크 범위를 관찰할 수도 있습니다. **Refresh Rate Average**와 같은 메트릭을 클릭하고 **Search Views With Poor Performance**를 클릭하여 검색 쿼리에 필터를 적용하고 추가 뷰를 검토합니다.

## 메트릭

다음 메트릭은 모바일 애플리케이션의 성능에 대한 인사이트를 제공합니다.

| 측정                    | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 렌더링 속도가 느림                   | 부드럽고 [끊김 없는][2] 사용자 경험을 보장하려면 애플리케이션이 60Hz 미만으로 프레임을 렌더링해야 합니다.<br /><br /> RUM은 `@view.refresh_rate_average` 및 `@view.refresh_rate_min` 보기 속성을 사용하여 애플리케이션의 [디스플레이 재생 속도][3]를 추적합니다. <br /><br /> 느린 렌더링을 사용하면 렌더링에 16ms 또는 60Hz보다 오래 걸리는 보기를 모니터링할 수 있습니다.<br /> **참고: 재생 속도는 0부터 60fps까지의 범위에서 정규화됩니다. 예를 들어, 애플리케이션이 120fps를 렌더링할 수 있는 디바이스에서 100fps로 실행되는 경우, Datadog은 **Mobile Vitals**에서 50fps를 보고합니다. |
| 정지된 프레임                  | 렌더링하는 데 700밀리초 이상 걸리는 프레임은 애플리케이션에서 멈춰 있거나 응답하지 않는 것으로 나타납니다. 이러한 프레임은 [정지된 프레임][4]으로 분류됩니다. <br /><br /> RUM은 완료하는 데 100ms보다 오래 걸리는 모든 작업의 지속 시간으로 `long task` 이벤트를 추적합니다. <br /><br /> 정지된 프레임을 사용하면 최종 사용자에게 어떤 보기가 고정(렌더링하는 데 700ms 이상 소요)된 것처럼 보이는지 모니터링하고 애플리케이션에서 끊김 현상을 제거할 수 있습니다.
                                                                                                                                                                                                 |
| 애플리케이션이 응답하지 않음     | 애플리케이션의 UI 스레드가 5초 이상 차단되면 `Application Not Responding` ([ANR][5]) 오류가 트리거됩니다. 애플리케이션이 포그라운드에 있는 경우, 시스템은 사용자에게 대화 모달을 표시하여 애플리케이션을 강제 종료할 수 있도록 합니다. <br /><br /> RUM은 ANR 발생을 추적하고 ANR이 발생하면 메인 스레드를 차단하는 전체 스택 트레이스를 캡처합니다.                                                                                                                                                                                                                              |
| 버전별 충돌 없는 세션 | [애플리케이션 충돌][6]은 일반적으로 처리되지 않은 예외 또는 신호로 인한 애플리케이션의 예기치 않은 종료로 인해 보고됩니다. 애플리케이션에서 충돌 없는 사용자 세션은 최종 사용자의 경험과 전반적인 만족도와 직결됩니다. <br /><br /> RUM은 [오류 추적][7]을 통해 전체 충돌 보고서를 추적하고 시간 경과에 따른 추세를 제시합니다. <br /><br /> 충돌 없는 세션을 통해 업계 벤치마크에 대한 최신 정보를 파악하고 애플리케이션이 Google Play Store에서 높은 순위를 유지할 수 있습니다.                                                                                                 |
| 초당 CPU 틱 수           | 높은 CPU 사용량은 사용자 디바이스의 [배터리 수명][8]에 영향을 미칩니다. <br /><br />RUM은 각 보기의 초당 CPU 틱과 세션 동안의 CPU 사용률을 추적합니다. 권장 범위는 양호한 경우 40 미만, 보통인 경우 60 미만입니다. 애플리케이션의 Overview 페이지의 **Mobile Vitals**에서 선택한 기간 동안 평균 CPU 틱 수가 가장 많은 상위 보기를 확인할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                        |
| 메모리 사용률             | 메모리 사용량이 많으면 애플리케이션이 충돌하고 사용자 환경이 열악해지는 [OutOfMemoryError][9]가 발생할 수 있습니다. <br /><br /> RUM은 세션 동안 각 보기에 대해 애플리케이션이 사용하는 물리적 메모리 양을 바이트 단위로 추적합니다. 권장 범위는 양호한 경우 200MB 미만, 보통인 경우 400MB 미만입니다. <br /><br />애플리케이션의 Overview 페이지의 **Mobile Vitals**에서 선택한 기간 동안 평균적으로 메모리를 가장 많이 소비한 상위 보기를 확인할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.android.com/topic/performance/vitals
[2]: https://developer.android.com/topic/performance/vitals/render#common-jank
[3]: https://developer.android.com/guide/topics/media/frame-rate
[4]: https://developer.android.com/topic/performance/vitals/frozen
[5]: https://developer.android.com/topic/performance/vitals/anr
[6]: https://developer.android.com/topic/performance/vitals/crash
[7]: /ko/real_user_monitoring/error_tracking/android
[8]: https://developer.android.com/topic/performance/power
[9]: https://developer.android.com/reference/java/lang/OutOfMemoryError