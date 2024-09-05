---
aliases:
- /ko/real_user_monitoring/platform/dashboards/errors_dashboard
further_reading:
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: RUM 탐색기에 대해 자세히 알아보기
title: RUM 오류 대시보드
---

## 웹 앱 오류


RUM 웹 앱 오류 대시보드는 애플리케이션 오류에 대한 인사이트를 제공합니다. 이를 통해 가장 많은 오류를 생성하는 보기나 버전에 집중할 수 있습니다. 다음을 표시합니다.

- **코드 오류**:
  애플리케이션 어느 부분이 가장 많은 오류를 생성하는지 간략히 살펴봅니다. 자세히 알아보려면 [오류 추적][1]을 검토해 크리티컬 프런트엔드 오류를 조사하고 새 오류가 발생 시 오류에 대한 정보를 확인합니다.
- **네트워크 오류**:
  어느 리소스가 가장 많은 오류를 생성하는지 모니터링합니다.

{{< img src="real_user_monitoring/dashboards/dashboard-errors-web.png" alt="즉시 사용 가능한 RUM 웹 앱 오류 대시보드" style="width:100%" >}}

표시되는 데이터에 대한 자세한 정보는 [수집된 RUM 브라우저 데이터][2]를 참조하세요.

## 모바일 앱 충돌 및 오류


RUM 모바일 앱 충돌과 오류 대시보드는 모바일 애플리케이션 오류에 대한 인사이트를 제공합니다. 가장 많은 오류를 생성하는 보기나 버전에 집중할 수 있도록 도움을 줍니다. 다음을 표시합니다.

- **코드 오류**:
  애플리케이션 어느 부분이 가장 많은 오류를 생성하는지 간략히 살펴봅니다. 자세히 알아보려면 [오류 추적][1]을 검토해 크리티컬 프런트엔드 오류를 조사하고 새 오류가 발생 시 오류에 대한 정보를 확인합니다.
- **네트워크 오류**:
  어느 리소스가 가장 많은 오류를 생성하는지 모니터링합니다.

{{< img src="real_user_monitoring/dashboards/dashboard-errors-mobile.png" alt="즉시 사용 가능한 RUM 모바일 앱 오류 대시보드" style="width:100%" >}}

표시되는 데이터에 대한 자세한 정보는 각 플랫폼([iOS RUM][3], [Android RUM][4], [React Native RUM][5] 및 [Flutter RUM][6])에 대한 설명서를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: /ko/real_user_monitoring/data_collected/
[3]: /ko/real_user_monitoring/ios/data_collected/
[4]: /ko/real_user_monitoring/android/data_collected/
[5]: /ko/real_user_monitoring/reactnative/data_collected/
[6]: /ko/real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter