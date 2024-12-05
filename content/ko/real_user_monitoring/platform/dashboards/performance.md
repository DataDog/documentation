---
aliases:
- /ko/real_user_monitoring/dashboards/performance_overview_dashboard/
- /ko/real_user_monitoring/dashboards/resources_dashboard
- /ko/real_user_monitoring/dashboards/mobile_dashboard
- /ko/real_user_monitoring/platform/dashboards/performance_overview_dashboard/
- /ko/real_user_monitoring/platform/dashboards/resources_dashboard
- /ko/real_user_monitoring/platform/dashboards/mobile_dashboard
further_reading:
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: RUM 탐색기에 대해 자세히 알아보기
title: RUM 성능 개요 대시보드
---

## 웹 앱 성능


웹 앱 성능 대시보드는 RUM 웹 애플리케이션을 한눈에 보여줍니다. 다음을 표시합니다.

- **핵심 웹 바이탈**:
  모든 보기에 대해 세 개의 브라우저 성능 메트릭이 강조 표시됩니다. 최대 콘텐츠풀 페인트(Largest Contentful Paint, LCP), 최초 입력 지연(First Input Delay, FID), 및 누적 레이아웃 전환(Cumulative Layout Shift, CLS)입니다. 로드 시간 등 다른 성능 메트릭도 사용할 수 있습니다.
- **XHR 및 가져오기 요청 및 리소스**:
  모든 보기에 대해 애플리케이션 로드 시 병목 현상을 파악합니다.
- **긴 작업**: 브라우저의 주 스레드가 50밀리초 이상이 소요된 이벤트입니다.

{{< img src="real_user_monitoring/dashboards/dashboard-performance -web-app.png" alt="즉시 사용 가능한 RUM 웹 앱 성능 개요 대시보드" style="width:100%" >}}

표시된 데이터에 대한 자세한 정보는 [수집된 RUM 브라우저 데이터][1]를 참조하세요.

## 모바일 앱 성능


모바일 앱 성능 대시보드는 RUM 모바일 애플리케이션 개요를 제공합니다. 다음을 표시합니다.

- **모바일 바이탈**:
  모든 화면에 대해 4개의 모바일 성능 메트릭이 강조 표시됩니다. 느린 렌더링, 초당 CPU 틱(tick), 잠긴 프레임 및 메모리 사용량입니다. 충돌 없는 세션 등 다른 성능 메트릭도 사용할 수 있습니다.
- **리소스 분석**:
  모든 화면에 대해 애플리케이션이 콘텐츠 요청 시 발생한 병목 현상을 파악합니다.
- **충돌 및 오류**:
  애플리케이션에서 충돌 및 오류가 발생하는 지점을 파악합니다.

{{< img src="real_user_monitoring/dashboards/dashboard-performance -mobile-app.png" alt="즉시 사용 가능한 RUM 웹 앱 성능 개요 대시보드" style="width:100%" >}}

표시되는 데이터에 대한 자세한 정보는 각 플랫폼 설명서([iOS RUM][2], [Android RUM][3], [React Native RUM][4] 및 [Flutter RUM][5])를 참조하세요.

## 리소스


RUM 리소스 대시보드는 애플리케이션에 가장 큰 영향을 미치는 리소스를 파악할 수 있도록 해줍니다. 다음을 표시합니다.

- **최다 요청 리소스**:
  가장 많이 로드되는 리소스를 시각화하고 크기와 로드 시간을 측정하세요.
- **XHR 및 가져오기 요청**:
  리파티션(repartition), 메서드 및 오류 상태 코드를 요청합니다.
- **리소스 로드 시간**:
  브라우저 SDK가 수집한 리소스 시간(DNS 조회, 초기 연결, 최초 바이트 생성 시간, 다운로드) 동향을 모니터링합니다.
- **타사 리소스**:
  애플리케이션에서 가장 많은 영향을 미치는 타사 리소스를 확인하세요.

{{< img src="real_user_monitoring/dashboards/dashboard-performance-resources.png" alt="즉시 사용 가능한 RUM 웹 앱 성능 개요 대시보드" style="width:100%" >}}

표시되는 데이터에 대한 자세한 정보는 [실제 사용자 모니터링 데이터 보안][6]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/data_collected/
[2]: /ko/real_user_monitoring/ios/data_collected/
[3]: /ko/real_user_monitoring/android/data_collected/
[4]: /ko/real_user_monitoring/reactnative/data_collected/
[5]: /ko/real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter
[6]: /ko/data_security/real_user_monitoring/