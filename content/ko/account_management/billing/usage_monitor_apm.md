---
title: APM 사용량 보기 및 알림
---

Datadog에는 사용자 요구에 맞는 다양한 가격 플랜이 있습니다. 자세한 내용은 [가격 페이지][1]를 참조하세요.
APM 및 분산 추적에 대한 빌링이 작동하는 방식을 이해하려면 [APM 빌링][2]에 대한 APM 설명서를 읽어보세요.

## 사용량 페이지

계정 관리자인 경우 24시간마다 업데이트되는 [사용량 페이지][3]를 사용해 계정 사용량을 볼 수 있습니다.

| 차원          | 설명                                                                                    |
|--------------------|------------------------------------------------------------------------------------------------|
| APM 호스트          | 현재 달의 모든 시간에 대해 모든 고유 APM 호스트의 99번째 백분위수를 표시합니다.       |
| APM Fargate 작업  | 현재 달에서 5분 간격으로 발생한 고유한 Fargate 작업 평균을 표시합니다.   |
| 수집된 스팬(span)     | 현재 달에서 수집된 스팬의 수집 바이트 총계를 표시합니다.                      |
| 인덱싱된 스팬      | 현재 달에서 인덱싱된 스팬의 총계를 표시합니다.                                   |

각 APM 호스트 및 APM Fargate 작업은 수집되고 인덱싱된 볼륨을 할당할 수 있도록 해줍니다.
- 수집된 스팬: APM 호스트마다 150GB의 수집된 스팬 및 APM Fargate 작업마다 10GB의 수집된 스팬이 제공됩니다.
- 인덱싱된 스팬: APM 호스트마다 1백만 개의 인덱싱된 스팬과 APM Fargate 작업마다 65,000개의 인덱싱된 스팬이 제공됩니다.

## 수집 및 인덱싱된 볼륨 기반 알림 설정

### 수집된 바이트 기반 알림 설정

수집된 스팬 사용량이 허용된 APM 호스트 및 APM Fargate 할당량 내에 있는 경우 모니터를 설정해 월간 사용량이 할당량에 근접하면 알림을 받습니다.

1. [메트릭 모니터][8]를 생성합니다.
2. 메트릭 쿼리에 대해 `datadog.estimated_usage.apm.ingested_bytes`를 입력합니다.
3. `current month (MTD)`에 모니터에 대한 평가 기간을 정의합니다. 이를 통해 모니터가 이번 달부터 현재까지 사용량을 살펴보도록 할 수 있습니다. [모니터][9] 설명서에서 누적 기간에 대해 자세히 읽어보세요.
4. **알림 임계값**과 선택 항목인 **경고 임계값**을 설정하여 수집된 볼륨이 할당량의 80% 또는 90%에 도달할 때 알림을 받습니다.
5. 해당 모니터에 대한 이름을 입력합니다. 알림을 정의하여 수집된 볼륨이 너무 높을 경우 팀에 알림을 전송합니다.

{{< img src="account_management/billing/monitor_usage_apm.png" alt="datadog.estimated_usage.apm.ingested_bytes를 메트릭 쿼리로 표시하는 메트릭 모니터 설정 페이지" width="80%" >}}

수집된 볼륨을 효과적으로 줄이려면 이 [가이드][7]나 [수집 메커니즘][10] 설명서를 참조하세요.

### 인덱싱된 스팬에 대한 알림 설정

마찬가지로, 인덱싱된 스팬에 대한 예산이 특정 한도 내에서 유지되도록 경고를 설정할 수 있습니다. 월별 인덱싱된 스팬 볼륨이 정의된 임계값을 초과할 때 경고를 받으려면 `datadog.estimated_usage.apm.indexed_spans` 메트릭을 사용하여 메트릭 모니터를 생성합니다.

인덱싱된 스팬 수를 줄이려면 보존 기간 필터 설정을 확인하세요. [추적 보존 기간][11] 설명서에서 보존 기간 필터에 대해 자세히 알아보세요.

[1]: https://www.datadoghq.com/pricing
[2]: /ko/account_management/billing/apm_distributed_tracing/
[3]: https://app.datadoghq.com/account/usage
[4]: https://app.datadoghq.com/monitors#create/metric
[5]: /ko/monitors/types/apm/?tab=traceanalytics#monitor-creation
[6]: https://app.datadoghq.com/apm/traces?viz=timeseries
[7]: /ko/tracing/guide/trace_ingestion_volume_control/
[8]: https://app.datadoghq.com/monitors/create/metric
[9]: /ko/monitors/configuration/?tab=thresholdalert#cumulative-time-windows
[10]: /ko/tracing/trace_pipeline/ingestion_mechanisms/
[11]: /ko/tracing/trace_pipeline/trace_retention/