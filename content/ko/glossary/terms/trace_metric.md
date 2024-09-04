---
core_product:
- apm
title: 트레이스 메트릭
---
트레이스 메트릭은 자동으로 수집되며 보유 기간은 다른 [Datadog 메트릭][1]과 마찬가지로 보유 정책에 따라 15개월 동안 보유됩니다. 적중률, 오류, 또는 대기 시간을 파악하고 알림을 보낼 때 이 메트릭이 사용됩니다. 통계와 메트릭은 항상 전체 트레이스를 기반으로 계산되며 수집 통제의 영향을 받지 않습니다.

트레이스 메트릭은 트레이스를 수신하는 호스트와 서비스 또는 리소스로 태깅됩니다. 예를 들어 웹 서비스 계측 후, 트레이스 메트릭은 [**Metrics Summary** 페이지][2]의 진입점 스팬 `web.request`에 수집됩니다.

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="트레이스 메트릭" >}}

트레이스 메트릭은 **Service**나 **Resource** 페이지에서 대시보드로 내보내기할 수 있습니다. 또 기존 대시보드에서 트레이스 메트릭을 쿼리할 수 있습니다.

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="트레이스 메트릭 대시보드" >}}

트레이스 메트릭은 모니터링에 유용하게 사용됩니다. [New Monitors][3], [Service][4], 또는 [[Resource][5] 페이지에서 APM 모니터를 설정할 수 있습니다. [Service][4]나 [Resource][5] 페이지에서 추천하는 모니터 세트를 이용할 수도 있습니다.


[1]: /ko/developers/guide/data-collection-resolution-retention/
[2]: https://app.datadoghq.com/metric/summary
[3]: https://app.datadoghq.com/monitors
[4]: /ko/tracing/services/service_page/
[5]: /ko/tracing/services/resource_page/