---
aliases:
- /ko/real_user_monitoring/dashboards
description: 바로 사용 가능한 RUM 대시보드를 통해 애플리케이션 데이터와 성능에 대해 자세히 알아보세요.
further_reading:
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: RUM Explorer에 대해 자세히 알아보기
title: RUM 대시보드
---
## 개요 {#overview}

RUM 애플리케이션을 생성하면 Datadog는 [데이터를 수집하고][1] 애플리케이션의 성능, 오류, 리소스 및 사용자 세션에 대한 대시보드를 생성합니다. 

{{< img src="real_user_monitoring/dashboards/rum-dashboards-performance-summary.png" alt="RUM 애플리케이션 개요 페이지" style="width:90%;" >}}

[{{< ui >}}Dashboard List{{< /ui >}}][2]의 검색 쿼리에서 `RUM`을(를) 필터링하거나 애플리케이션 요약 페이지({{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Summary{{< /ui >}} 및 {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Product Analytics{{< /ui >}} > {{< ui >}}Analytics Summary{{< /ui >}})에서 RUM 대시보드에 액세스하십시오.

{{< img src="real_user_monitoring/dashboards/available-rum-dashboards.png" alt="즉시 사용 가능한 RUM 대시보드" style="width:90%;" >}}

{{< whatsnext desc="다음과 같은 즉시 사용 가능한 RUM 대시보드를 탐색할 수 있습니다:" >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/performance" >}}<u>성능 개요</u>: 웹사이트/앱 성능 및 인구 통계에 대한 전체적인 보기를 확인하십시오. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/testing_and_deployment" >}}<u>테스트 및 배포</u>: 브라우저 테스트의 애플리케이션 커버리지를 평가하고 RUM 및 Synthetics 데이터를 사용하여 추적할 애플리케이션의 인기 요소를 식별하십시오. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/usage" >}}<u>사용량</u>: 좌절 신호를 포함하여 RUM 애플리케이션에 대한 사용자 세션 및 사용량 데이터를 분석하십시오. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/platform/dashboards/errors" >}}<u>오류</u>: 브라우저 및 기기 유형별로 사용자 콘솔에 나타나는 오류를 관찰하십시오. {{< /nextlink >}}
{{< /whatsnext >}}

## RUM 대시보드와 상호작용 {#interact-with-rum-dashboards}

[대시보드][3]을 복제하고 커스터마이즈하여 [RUM 탐색기]에서 애플리케이션 데이터를 탐색할 수 있습니다.

### 템플릿 변수 {#template-variables}

생성된 RUM 대시보드에는 기본 템플릿 변수 세트가 자동으로 포함됩니다. 템플릿 변수 드롭다운을 사용하여 값을 선택하고 검색 범위를 좁히십시오. 자세한 내용은 [템플릿 변수][5] 설명서를 참조하십시오.

### RUM 이벤트 조회하다 {#view-rum-events}

개별 이벤트를 탐색하려면 그래프를 클릭한 다음 {{< ui >}}View RUM events{{< /ui >}}을 클릭하십시오. 그러면 사전 선택된 검색 필터가 적용된 RUM 탐색기로 리디렉션됩니다.

{{< img src="real_user_monitoring/dashboards/rum-view-events-2.mp4" alt="RUM 이벤트 보기" video=true style="width:80%;" >}}

### 대시보드 맞춤 설정 {#customize-dashboards}

RUM 대시보드를 복제하려면 {{< ui >}}Settings{{< /ui >}} 아이콘을 클릭하고 {{< ui >}}Clone dashboard{{< /ui >}}를 선택하십시오. 위젯, 파워팩 또는 앱을 더 추가하려면 아래로 스크롤하여 {{< ui >}}\+{{< /ui >}} 아이콘을 클릭하십시오. 

또한 템플릿 변수를 수정하여 [저장된 보기][6]를 생성할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/data_collected/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /ko/dashboards/
[4]: /ko/real_user_monitoring/explorer/
[5]: /ko/dashboards/template_variables
[6]: /ko/real_user_monitoring/explorer/saved_views/