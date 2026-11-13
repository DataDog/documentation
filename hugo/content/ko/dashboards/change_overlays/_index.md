---
description: 그래프에 변경 이벤트를 오버레이하여 애플리케이션 변경 사항과 성능 이상 간의 연관성 분석
further_reading:
- link: /tracing/services/deployment_tracking/
  tag: 설명서
  text: APM 배포 추적 시작
- link: https://www.datadoghq.com/blog/datadog-deployment-tracking/
  tag: 블로그
  text: Datadog APM의 배포 추적을 사용하여 코드 배포를 모니터링하기
- link: https://www.datadoghq.com/blog/faulty-deployment-detection/
  tag: 블로그
  text: 자동 결함 배포 탐지 기능으로 안심하고 코드 릴리스하기
- link: /real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
  tag: 설명서
  text: RUM 배포 추적 시작
- link: https://www.datadoghq.com/blog/datadog-rum-deployment-tracking/
  tag: 블로그
  text: RUM의 배포 추적을 사용하여 문제가 있는 프런트엔드 배포의 문제 해결하기
- link: https://www.datadoghq.com/blog/change-overlays/
  tag: 블로그
  text: 변경 오버레이를 사용하여 문제가 있는 배포를 빠르게 식별하고 되돌리기
title: 변경 오버레이
---
## 개요 {#overview}

팀이 개발을 반복하고 코드를 배포하며 애플리케이션과 서비스를 변경하는 과정에서 오류 급증, 지연 시간 증가 또는 페이지 로드 시간 증가를 유발한 변경 사항을 정확히 파악하기는 어려울 수 있습니다. 변경 오버레이를 사용하여 배포나 기능 플래그와 같은 변경 사항을 대시보드에 시각적으로 표시하고 성능 문제와의 연관성을 신속하게 분석합니다.

## 그래프에 변경 사항 오버레이 {#overlay-changes-on-graphs}

시작하려면 대시보드 오른쪽 상단에 있는 {{< ui >}}Show Overlays{{< /ui >}}를 클릭합니다. 이제 [변경 추적][16] 타임라인과 시계열 위젯의 변경 오버레이를 활성화할 수 있습니다.

{{< img src="dashboards/change_overlays/show_overlays_button.png" alt="대시보드 헤더의 오버레이 버튼" style="width:100%;">}}

활성화되면 {{< ui >}}Service{{< /ui >}} 검색 창에 기본적으로 {{< ui >}}Most Relevant{{< /ui >}} 서비스가 표시됩니다. Datadog은 대시보드의 위젯을 지원하는 쿼리에서 가장 자주 참조되는 서비스를 자동으로 선택합니다.

검색 창을 사용하여 원하는 서비스를 찾음으로써 자동 서비스 탐지를 재정의합니다. 

변경 타임라인에 표시되고 오버레이로 나타나는 모든 변경 사항은 선택한 서비스와 연결됩니다. 
{{< ui >}}Show On{{< /ui >}} 드롭다운을 사용하여 변경 오버레이를 관련 위젯에만 표시하거나 대시보드의 모든 위젯에 표시합니다.

추가 세부 정보를 보거나 추가적인 조치를 취하려면 변경 오버레이 또는 변경 타임라인의 변경 항목을 클릭합니다.

### 배포 변경 사항의 범위 지정 {#scope-deployment-changes}

APM 배포의 경우 `env`를 지정해야 합니다. 대시보드에 `env` 또는 `datacenter` 템플릿 변수가 설정되어 있으면 배포가 선택 항목과 일치하도록 필터링됩니다. 그렇지 않으면 `env`는 기본적으로 `prod`로 설정됩니다. 

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/services/deployment_tracking/
[2]: /ko/watchdog/faulty_deployment_detection/
[3]: /ko/dashboards/widgets/
[4]: https://app.datadoghq.com/metric/explorer
[5]: https://app.datadoghq.com/notebook/list
[6]: https://app.datadoghq.com/metric/summary
[7]: /ko/metrics/advanced-filtering/
[8]: /ko/getting_started/tagging/
[9]: /ko/metrics/#time-aggregation
[10]: /ko/dashboards/functions/rollup/#rollup-interval-enforced-vs-custom
[11]: /ko/dashboards/functions/rollup/
[12]: /ko/dashboards/functions/#apply-functions-optional
[13]: /ko/metrics/advanced-filtering/#boolean-filtered-queries
[14]: /ko/logs/explorer/search_syntax/
[15]: /ko/dashboards/widgets/timeseries/#event-overlay
[16]: /ko/change_tracking/