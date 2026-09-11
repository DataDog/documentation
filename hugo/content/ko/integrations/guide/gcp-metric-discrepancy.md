---
description: Google Cloud 메트릭 불일치 문제 해결 단계
further_reading:
- link: https://docs.datadoghq.com/integrations/google-cloud-platform/
  tag: 통합
  text: Google 클라우드 통합
title: Google Cloud Metric Discrepancy
---

## 개요

본 가이드를 참조하여 Google Cloud와 Datadog 간의 메트릭 불일치 문제를 해결하세요.

## 메트릭 불일치

Datadog은 Google Cloud에서 가장 세분화된 원시 값을 수집합니다. Datadog에서 확인할 수 있는 모든 집계는 Datadog 측에서 실행됩니다. Datadog의 메트릭 수집은 Google의 원시 값을 게이지로 가져오며, 이후의 집계는 Datadog 내에서 실행됩니다. 다음 단계로 Google Cloud와 Datadog 간 `gcp.redis.stats.cpu_utilization` 메트릭을 일치시킵니다.

1. Google Cloud에서 해당 메트릭을 찾습니다.

   Google Cloud 통합의 경우, Datadog은 Google Cloud 메트릭을 `gcp.Google_Cloud_SERVICE_NAME.METRIC_NAME` 형식으로 변환합니다. [예시 메트릭][1]의 경우, Google Cloud 서비스 이름은 **redis**이고 메트릭 이름은 **stats/cpu_utilization**입니다. 전체 메트릭 이름은 `redis.googleapis.com/stats/cpu_utilization`입니다.

2. 가장 세분화된 차원을 찾습니다.

   여기에는 `project_id`, `region`, `instance_id`, `node_id`와 같은 모든 **리소스 레이블**과 `role`, `space`, `relationship`와 같은 **메트릭 레이블**이 포함됩니다. 다른 메트릭에 대해서는 [Google Cloud 문서][2]를 참조하세요.

   {{< img src="integrations/guide/gcp-metric-discrepancy/labels_definition.png" alt="GCP 문서의 레이블 정의" >}}

   리소스 유형은 Google Cloud 서비스의 각 메트릭과 연관되어 있습니다. 다음은 **redis** 서비스에 대해 지원되는 리소스 유형입니다. 예시 메트릭의 리소스 유형은 `redis_instance`입니다. `redis_instance`에는 `project_id`,`region`, `instance_id`, `node_id`와 같은 **리소스 레이블**이 지정되어 있습니다.
   - [redis.googleapis.com/Cluster][3]
   - [redis_instance][4]
   - [redis.googleapis.com/ClusterNode][5]

   {{< img src="integrations/guide/gcp-metric-discrepancy/redis_instance.png" alt="redis_instance 리소스 레이블" >}}

3. Google Cloud Metrics Explorer에서 메트릭을 그래프로 표시합니다.

   `redis.googleapis.com/stats/cpu_utilization`을 검색합니다.
   - 시간: 1시간(UTC 기준 권장)
   - 네임스페이스: Cloud Memorystore Redis Instance
   - 메트릭 이름: CPU Seconds
   - 필터: (가장 세분화된 차원) project_id, region, instance_id, node_id, role, space, relationship.
   - 집계: Sum(가장 세분화된 차원을 사용하는 경우, mean, min, max, sum, 또는 none을 사용하더라도 동일한 값을 표시해야 함)
   - 최소 간격: 1m

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_metric_explorer.png" alt="GCP 메트릭 탐색기" >}}

4. Datadog Metrics Explorer에서 메트릭을 그래프로 표시합니다. 

   {{< img src="integrations/guide/gcp-metric-discrepancy/datadog_metric_explorer.png" alt="Datadog 메트릭 탐색기" >}}

   대부분의 경우 1~4단계를 완료하면 Google Cloud와 Datadog에 정확히 동일한 값이 표시되지만, 본 예시에서는 01:40:00PM에 불일치가 나타납니다.

   - **Datadog**: 108.71ms 
   - **Google Cloud**: 0.0018119s

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_value.png" alt="GCP 값" >}}

   {{< img src="integrations/guide/gcp-metric-discrepancy/datadog_value.png" alt="Datadog 값" >}}


5. Google Cloud Alignment 함수를 이해합니다.

   이러한 불일치는 기본적으로 Google Cloud에서 해당 메트릭에 대해 Rate Alignment를 적용하기 때문에 발생합니다. 자세한 내용은 Google Cloud [Alignment 함수][6] 문서를 참조하세요. `configure aligner`를 클릭하면 Alignment 함수가 **rate** (0.108711 / 60 ≃ 0.0018119)로 자동 설정되는 것을 확인할 수 있습니다.

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_aligner.png" alt="GCP aligner" >}}

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_rate.png" alt="GCP rate" >}}

6. Google Cloud의 Alignment 함수를 조정합니다.

   Alignment 함수를 `delta`, `min`, `max`, `sum` 또는 `mean`로 변경합니다. 가장 세분화된 차원을 사용한다고 가정할 때 Google Cloud의 값은 Datadog의 값과 일치해야 합니다.

   {{< img src="integrations/guide/gcp-metric-discrepancy/gcp_delta.png" alt="GCP delta" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/monitoring/api/metrics_gcp_p_z#gcp-redis:~:text=of%20%5Bprimary%2C%20replica%5D.-,stats/cpu_utilization,-GA%20%E2%80%83(project)
[2]: https://cloud.google.com/monitoring/api/metrics_gcp
[3]: https://cloud.google.com/monitoring/api/resources#tag_redis.googleapis.com/Cluster
[4]: https://cloud.google.com/monitoring/api/resources#tag_redis_instance
[5]: https://cloud.google.com/monitoring/api/resources#tag_redis.googleapis.com/ClusterNode
[6]: https://cloud.google.com/monitoring/api/v3/aggregation#alignment-intro