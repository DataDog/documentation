---
description: 바로 사용 가능한 RUM 대시보드를 통해 애플리케이션 데이터와 성능에 대해 자세히 알아보세요.
further_reading:
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: RUM 탐색기에 대해 자세히 알아보기
kind: 설명서
title: RUM 대시보드
---

## 개요

RUM 애플리케이션을 생성하면 Datadog는 [데이터를 수집하고][1] 애플리케이션의 성능, 오류, 리소스 및 사용자 세션에 대한 대시보드를 생성합니다.

{{< img src="real_user_monitoring/dashboards/rum_application_overview_dashboard-3.png" alt="RUM 애플리케이션 개요 페이지" style="width:90%;" >}}

[**대시보드 목록**][2]의 검색 쿼리나 애플리케이션 요약 페이지(**실제 사용자 모니터링 > 성능 요약** 및 **실제 사용자 모니터링 > 분석 요약**)에서 `RUM`을 필터링하여 RUM 대시보드에 액세스하세요.

{{< img src="real_user_monitoring/dashboards/available_rum_dashboards-2.png" alt="Out-of-the-box RUM Dashboards" style="width:90%;" >}}

{{< whatsnext desc="You can explore the following out-of-the-box RUM dashboards:" >}}
  {{< nextlink href="/real_user_monitoring/dashboards/performance" >}}<u>성능 개요</u>: 웹사이트/앱 성능과 인구 통계에 대한 전 세계 뷰를 확인합니다. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/testing_and_deployment" >}}<u>테스팅 및 배포</u>: 브라우저 테스트의 애플리케이션 지원 범위를 평가하고 애플리케이션의 인기 요소를 파악하여 RUM 및 Synthetics 데이터를 통해 추적합니다.. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/usage" >}}<u>사용량</u>: 위험 신호를 포함해 RUM 애플리케이션의 사용자 세션 및 사용량 데이터를 분석합니다. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/errors" >}}<u>오류</u>: 사용자 콘솔에서 브라우저 및 장치 유형별로 표시되는 오류를 관찰합니다. {{< /nextlink >}}
{{< /whatsnext >}}

## RUM 대시보드와 상호작용

[대시보드][3]을 복제하고 커스터마이즈하여 [RUM 탐색기]에서 애플리케이션 데이터를 탐색할 수 있습니다.

### 템플릿 변수

생성된 RUM 대시보드는 자동으로 일련의 기본 템플릿 변수를 포함합니다. 템플릿 변수 드롭다운 메뉴를 사용해 검색 결과를 좁힙니다. 예를 들어 `applicationId` 템플릿 변수를 사용해 특정 애플리케이션을 필터링할 수 있습니다.

{{< img src="real_user_monitoring/dashboards/template_variables.mp4" alt="템플릿 변수" video=true style="width:50%;" >}}

### RUM 이벤트 보기

개별 이벤트를 탐색하려면 그래프를 클릭한 다음 **RUM 이벤트 보기**를 클릭합니다. 그러면 사전 선택된 검색 필터가 있는 RUM 탐색기로 이동하게 됩니다.

{{< img src="real_user_monitoring/dashboards/view_rum_events.mp4" alt="RUM 이벤트 보기" video=true style="width:80%;" >}}

### 대시보드 커스터마이즈

RUM 대시보드를 복제하려면 **설정** 아이콘을 클릭한 다음 **대시보드 복제**를 선택합니다. 더 많은 위젯, 파워팩, 또는 앱을 추가하려면 아래로 스크롤한 다음 **+** 아이콘을 클릭합니다.

또한 템플릿 변수를 수정하여 [저장된 보기][5]를 생성할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/data_collected/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /ko/dashboards/
[4]: /ko/real_user_monitoring/explorer/
[5]: /ko/real_user_monitoring/explorer/saved_views/