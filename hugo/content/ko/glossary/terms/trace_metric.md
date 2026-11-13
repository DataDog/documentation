---
core_product:
- apm
id: trace_metric
title: 트레이스 메트릭
---
트레이스 메트릭은 자동으로 수집되며 다른 [Datadog 메트릭][1]과 마찬가지로 15개월 보존 정책에 따라 보관됩니다. 이러한 메트릭을 사용하여 히트, 오류 또는 지연 시간을 식별하고 이에 대한 경보를 설정할 수 있습니다. 통계 및 메트릭은 항상 모든 트레이스에 기반해 계산되며, 수집 제어의 영향을 받지 않습니다.

트레이스 메트릭은 트레이스를 수신하는 호스트와 서비스 또는 리소스별로 태그가 지정됩니다. 예를 들어, 웹 서비스를 계측한 후 [**Metrics Catalog** 페이지][2]의 진입점 스팬 `web.request`에 대한 트레이스 메트릭이 수집됩니다.

{{< img src="tracing/visualization/trace_metrics.mp4" video="true" alt="트레이스 메트릭" >}}

트레이스 메트릭은 **Service** 또는 **Resource** 페이지에서 대시보드로 내보낼 수 있습니다. 또한, 트레이스 메트릭은 기존 대시보드에서 쿼리할 수 있습니다.

{{< img src="tracing/visualization/trace_metric_dashboard.mp4" video="true" alt="트레이스 메트릭 대시보드" >}}

트레이스 메트릭은 모니터링에 유용합니다. APM 모니터는 [New Monitors][3], [Service][4] 또는 [Resource][5] 페이지에서 설정할 수 있습니다. 제안된 모니터 세트는 [Service][4] 또는 [Resource][5] 페이지에서 확인할 수 있습니다.


[1]: /ko/extend/guide/data-collection-resolution/
[2]: https://app.datadoghq.com/metric/catalog
[3]: https://app.datadoghq.com/monitors
[4]: /ko/tracing/services/service_page/
[5]: /ko/tracing/services/resource_page/