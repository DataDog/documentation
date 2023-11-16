---
aliases:
- /ko/real_user_monitoring/dashboards/frustration_signals_dashboard
- /ko/real_user_monitoring/dashboards/user_sessions_dashboard
further_reading:
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: RUM 탐색기에 대해 자세히 알아보기
kind: 도움말
title: RUM 사용량 대시보드
---

## 웹 사용량


RUM 웹 앱 사용량 대시보드는 고객이 애플리케이션을 어떻게 사용하고 있는지에 대한 인사이트를 제공합니다. 다음을 표시합니다.

- **애플리케이션 사용량**: 
  평균 세션 기간 그래프, 세션별 페이지뷰, 세션별 작업, 세션별 오류를 보여줍니다. 아래 표는 첫 번째 및 마지막 방문 페이지를 기준으로 목록 사용량 메트릭을 나열합니다.
- **사용자 여정**:
  사용자가 가장 많은 시간을 보내는 페이지를 확인하고 애플리케이션 전반에서 여정을 시작하고 종료하는 위치를 살펴보세요.
- **참여 매트릭스**:
  어느 정도의 사용자가 어느 작업을 수행하는지 확인합니다.
- **사용자 인구통계**:
  국가별 세션 수, 상위 국가, 기기, 애플리케이션 운영 체제를 살펴보세요. 또한 상위 브라우자 사용량 비율 그래프를 확인할 수 있습니다.

{{< img src="real_user_monitoring/dashboards/dashboard-usage-web-app.png" alt="즉시 사용 가능한 RUM 웹 앱 사용량 대시보드" style="width:100%" >}}

표시된 데이터에 대한 자세한 정보는 [수집된 RUM 브라우저 데이터][1]를 참조하세요.

## 모바일 사용량


RUM 모바일 앱 사용량 대시보드는 고객이 애플리케이션을 어떻게 사용하고 있는지에 대한 인사이트를 제공합니다.

- **애플리케이션 사용량**: 
  실행하는 브라우저, 애플리케이션 버전 Datadog SDK을 이해하여 사용자를 더 잘 파악하세요. 이번주와 지난주 세션을 비교해 보세요. 총 이탈율을 확인해보셔도 좋습니다.
- **사용자 여정**:
  사용자가 가장 많은 시간을 보내는 페이지를 확인하고 애플리케이션 전반에서 여정을 시작하고 종료하는 위치를 살펴보세요.
- **참여 매트릭스**:
  어느 정도의 사용자가 어느 작업을 수행하는지 확인합니다.
- **사용자 인구통계**:
  국가별 세션 수, 상위 국가, 기기, 애플리케이션 운영 체제를 살펴보세요. 또한 상위 브라우자 사용량 비율 그래프를 확인할 수 있습니다.

{{< img src="real_user_monitoring/dashboards/dashboard-usage-mobile-app.png" alt="즉시 사용 가능한 RUM 모바일 앱 사용량 대시보드" style="width:100%" >}}

표시되는 데이터에 대한 자세한 정보는 각 플랫폼 설명서([iOS RUM][2], [Android RUM][3], [React Native RUM][4] 및 [Flutter RUM][5])를 참조하세요.

## 사용자 인구통계


RUM 사용자 인구통계 대시보드는 애플리케이션의 지리적 분포에 대한 정보를 제공합니다.

- **글로벌 데이터**:
  전 세계 사용자를 확인하고 애플리케이션이 가장 많이 사용되는 국가, 지역, 도시를 살펴보세요.
- **지역별 국가별 비교**:
  지역 및 국가마다 애플리케이션에 대한 사용자 경험이 어떻게 다른지 알아보세요.

{{< img src="real_user_monitoring/dashboards/dashboard-usage-user-demographics.png" alt="즉시 사용 가능한 RUM 사용자 인구통계 대시보드" style="width:100%" >}}

표시되는 데이터에 대한 자세한 정보는 [실제 사용자 모니터링 데이터 보안][6]을 참조하세요.

## 장애물 신호


RUM 문제 신호 대시보드는 사용자가 워크플로에서 문제를 겪은 지점에 대한 인사이트를 보여줍니다. 문제 신호는 세 가지 유형으로 나눠볼 수 있습니다.

- **분노 클릭**:
  1초에 3번 이상 사용자가 동일한 버튼을 클릭한 경우입니다.
- **오류 클릭**:
  사용자가 요소를 클릭했는 데 자바스크립트(Javascript) 오류를 확인한 경우입니다.
- **데드 클릭**:
  사용자가 정적 요소를 클릭하여 페이지에서 작업이 발생하지 않은 경우입니다.

{{< img src="real_user_monitoring/dashboards/dashboard-usage-frustration-signals.png" alt="즉시 사용 가능한 RUM 문제 신호 대시보드" style="width:100%" >}}

표시되는 데이터에 대한 자세한 정보는 [실제 사용자 모니터링 데이터 보안][6]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/data_collected/
[2]: /ko/real_user_monitoring/ios/data_collected/
[3]: /ko/real_user_monitoring/android/data_collected/
[4]: /ko/real_user_monitoring/reactnative/data_collected/
[5]: /ko/real_user_monitoring/flutter/data_collected/
[6]: /ko/data_security/real_user_monitoring/