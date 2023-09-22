---
description: Flutter 모니터링에서 수집한 모바일 바이탈에 대해 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: 블로그
  text: Datadog 모바일 RUM으로 Flutte 애플리케이션 성능 모니터링
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: GitHub
  text: dd-sdk-flutter의 소스 코드
- link: real_user_monitoring/explorer/
  tag: 설명서
  text: RUM 데이터를 탐색하는 방법 알아보기
kind: 설명서
title: 모바일 바이탈
---
## 개요

실제 사용자 모니터링은 모바일 애플리케이션의 응답성, 안정성 및 리소스 사용에 대한 인사이트를 발견하는데 도움이 되는 메트릭 세트인 모바일 바이탈을 제공합니다. 모바일 바이탈의 범위는 불량, 보통, 양호로 나뉩니다.

**UX Monitoring > Performance Summary**로 이동하여 애플리케이션을 선택하면 애플리케이션에 대한 모바일 바이탈의 개요를 볼 수 있습니다.

{{< img src="real_user_monitoring/flutter/flutter-mobile-vitals-1.png" alt="Performance Summary 탭에 있는 모바일 바이탈" style="width:90%;">}}

RUM 모바일 앱 성능 대시보드에 액세스하려면 애플리케이션 요약 페이지에서 Monitor Performance Metrics 섹션까지 스크롤하여 **Performance Overview**를 클릭합니다.

{{< img src="real_user_monitoring/flutter/flutter-performance-overview.png" alt="모바일 성능 개요 대시보드" style="width:90%;">}}

다양한 애플리케이션 버전에 대한 메트릭을 표시하는 선 그래프를 통해 애플리케이션의 전반적인 상태와 성능을 파악할 수 있습니다. 애플리케이션 버전을 기준으로 필터링하거나 특정 세션 및 보기를 보려면 그래프를 클릭하세요.

{{< img src="real_user_monitoring/flutter/rum_explorer_mobile_vitals-3.png" alt="RUM 탐색기의 이벤트 타이밍 및 모바일 바이탈" style="width:90%;">}}

또한 RUM 탐색기에서 보기를 선택하고 세션에서 애플리케이션의 사용자 경험과 직접적으로 연관된 권장 벤치마크 범위를 관찰할 수 있습니다. **Refresh Rate Average**와 같은 메트릭을 클릭하고 **Search Views With Poor Performance**를 클릭하여 검색 쿼리에서 필터를 적용하고 추가 보기를 검토합니다.

## 메트릭

다음 메트릭은 모바일 애플리케이션의 성능에 대한 인사이트를 제공합니다.
| 측정                    |설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 느린 렌더링                 | 원활하고 [끊김이 없는][3] 사용자 경험을 보장하기 위해 애플리케이션이 60Hz 미만으로 프레임을 랜더링해야 합니다. <br /><br />RUM은 `@view.refresh_rate_average` 및 `@view.refresh_rate_min`보기 속성을 사용하여 애플리케이션의 [디스플레이 재생 속도][4]를 추적합니다. <br /><br /> 느린 랜더링을 사용하면 랜더링하는 데 16ms 또는 60Hz보다 더 오래 걸리는 보기를 모니터링할 수 있습니다. <br /> **참고:** 재생 속도는 0부터 60fps까지의 범위에서 정규화됩니다. 예를 들어, 120fps를 렌더링할 수 있는 디바이스에서 애플리케이션이 100fps로 실행되는 경우 **모바일 바이탈**에서 Datadog은 50fps를 보고합니다. |
| 동결된 프레임                | 랜더링하는 데 700ms 이상 걸리는 프레임은 애플리케이션에서 멈춤 및 응답 없음으로 나타납니다. 이는 [동결된 프레임][5]으로 분류됩니다. <br /><br /> RUM은 완료하는 데 100ms 이상 작업 시간이 걸린`long task` 이벤트를 추적합니다. <br /><br /> 동결된 프레임을 통해 최종 사용자에게 동결된 것처럼 보이는(렌더링에 700ms 이상 걸린) 보기를 모니터링하여 애플리케이션의 동작 지연을 제거할 수 있습니다.                                                                                                                                                                                      |
| 애플리케이션이 응답하지 않음     | Android에서 애플리케이션의 UI 스레드가 5초 이상 차단되면 `Application Not Responding` ([ANR][6]) 오류가 발생합니다. 애플리케이션이 포그라운드에 있는 경우 시스템은 사용자에게 모달 대화 상자를 표시하여 애플리케이션을 강제로 종료할 수 있습니다. <br /><br /> RUM은 ANR 발생을 추적하고 ANR이 발생하면 메인 스레드를 차단하는 전체 스택 트레이스를 캡처합니다.                                                                                                                                                                                                                               |
| 버전별 크래시 프리 세션 | [애플리케이션 크래시][7]는 일반적으로 처리되지 않은 예외 또는 신호로 인해 발생하는 애플리케이션의 예기치 않은 종료로 인해 보고됩니다. 애플리케이션에서 크래시 프리 사용자 세션은 최종 사용자의 경험 및 전반적인 만족도에 직접적으로 해당합니다. <br /><br /> RUM은 전체 크래시 리포트를 추적하고 [오류 추적][8]을 통해 시간 경과에 따른 추세를 나타냅니다. <br /><br /> 크래시 프리 세션을 통해 업계 표준 속도를 유지하고 애플리케이션이 Google Play Store에서 높은 순위를 유지할 수 있도록 합니다.                                                                                             |
| 초당 CPU 틱           | 높은 CPU 사용량은 사용자 디바이스의 [배터리 수명][9]에 영향을 줍니다. <br /><br /> RUM은 각 보기에 대한 초당 CPU 틱과 세션 중 CPU 사용량을 추적합니다. 권장 범위는 양호한 경우 40 미만, 보통인 경우 60 미만입니다. <br /><br /> 애플리케이션 개요 페이지의 **Mobile Vitals**에서 선택한 기간 동안 평균 CPU 틱이 가장 많은 상위 보기를 볼 수 있습니다.                                                                                                                                                                                                                                                                                                                                                         |
| 메모리 사용률          | 메모리 사용량이 많으면 [메모리 부족 충돌][10]이 발생하여 사용자 환경이 저하될 수 있습니다. <br /><br /> RUM은 세션 동안 각 보기에 대해 애플리케이션이 사용하는 물리적 메모리 양을 바이트 단위로 추적합니다. 권장 범위는 양호한 경우 200MB 미만, 보통의 경우 400MB 미만입니다. <br /><br /> 애플리케이션의 개요 페이지의 **Mobile Vitals**에서 선택한 기간 동안 평균적으로 메모리를 가장 많이 소비한 상위 보기를 확인할 수 있습니다. |                                                                                                                                                                                                                                                                                            |
| 위젯 구축 시간| UI 스레드에서 프레임을 구축하는 데 걸리는 시간입니다. 원활한 애니메이션을 위해 60FPS의 경우 16ms, 120FPS의 경우 8ms를 초과하면 안 됩니다. <br /><br /> 여기서 값이 높으면 이 보기에 대한 빌드 방법을 최적화해야 한다는 의미입니다. Flutter 설명서의 [빌드 비용 제어][11]를 참조하세요.

| 래스터 시간             | 래스터 스레드에서 프레임을 래스터화하는 데 걸리는 시간입니다. 원활한 애니메이션을 위해 60FPS의 경우 16ms, 120FPS의 경우 8ms를 초과해서는 안 됩니다. <br /><br /> 값이 높으면 보기가 렌더링하기 복잡하다는 것을 의미합니다. Flutter 설명서의 [GPU 그래프에서 문제 식별하기][12]를 참조하세요.                                                                                                                                                                                                                                                                                           |
## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/ios/mobile_vitals/
[2]: /ko/real_user_monitoring/android/mobile_vitals/
[3]: https://docs.flutter.dev/perf/ui-performance
[4]: https://docs.flutter.dev/tools/devtools/performance
[5]: https://developer.android.com/topic/performance/vitals/frozen
[6]: https://developer.android.com/topic/performance/vitals/anr
[7]: https://docs.flutter.dev/reference/crash-reporting
[8]: /ko/real_user_monitoring/error_tracking/flutter
[9]: https://docs.flutter.dev/perf/best-practices#build-and-display-frames-in-16ms
[10]: https://docs.flutter.dev/tools/devtools/memory
[11]: https://docs.flutter.dev/perf/best-practices#control-build-cost 
[12]: https://docs.flutter.dev/perf/ui-performance#identifying-problems-in-the-gpu-graph