---
title: APM 사용량 보기 및 알림
---

[Pricing 페이지][1]에서 Datadog의 다양한 유료 플랜을 확인해 보세요.
APM 및 Distributed Tracing에 대한 청구는 [APM 빌링][2] 관련 APM 문서에서 확인할 수 있습니다.

## 사용량 페이지

계정 관리자는 24시간마다 업데이트되는 [Usage 페이지][3]를 통해 계정 사용량을 확인할 수 있습니다.

| 디멘션          | 설명                                                                                    |
|--------------------|------------------------------------------------------------------------------------------------|
| APM 호스트          | 현재 달의 모든 시간 동안 모든 고유한 애플리케이션 성능 모니터링(APM) 호스트에 대해 99번째 백분위수를 표시합니다.       |
| 애플리케이션 성능 모니터링(APM) Fargate 작업  | 현재 달에 5분 동안의 개별 Fargate 작업의 평균을 표시합니다.   |
| 수집된 스팬     | 현재 달에 수집된 스팬에서 수집된 바이트의 합계를 표시합니다.                      |
| 인덱싱된 스팬      | 현재 달에 인덱싱된 인덱싱된 스팬의 합계를 표시합니다.                                   |

각 APM 호스트 및 APM Fargate 작업은 수집 및 인덱싱된 볼륨에 대한 할당량을 부여합니다.
- 수집된 스팬: APM 호스트당 150GB 수집된 스팬 및 APM Fargate 작업당 10GB 수집된 스팬.
- 인덱싱된 스팬: APM 호스트당 1M 인덱싱된 스팬 및 APM Fargate 작업당 65,000개의 인덱싱된 스팬.

## 수집/인덱싱된 볼륨을 기반으로 경고 설정

### 수집된 바이트에 대한 경고 설정

수집된 스팬 사용량이 APM 호스트 및 APM Fargate 작업에서 부여한 할당 내에서 유지되도록 하려면 월별 사용량이 할당량에 근접할 때 경고하도록 모니터를 설정하세요.

1. [메트릭 모니터][8]를 생성합니다.
2. 메트릭 쿼리에 대해 `datadog.estimated_usage.apm.ingested_bytes`를 입력합니다.
3. 모니터의 평가 창을 `current month (MTD)`로 정의합니다. 이렇게 하면 모니터가 월별 사용량을 확인합니다. [모니터][9] 문서에서 누적 시간 창에 대해 자세히 알아보세요.
4. 수집된 볼륨이 할당량의 80% 또는 90%에 도달하면 경고하도록 **Alert threshold** 및 **Warning threshold**(선택 사항)을 정의합니다.
5. 모니터 이름을 입력합니다. 수집된 볼륨이 너무 높을 때 팀에 경고를 보내도록 알림을 정의합니다.

{{< img src="account_management/billing/monitor_usage_apm.png" alt=" datadog.estimated_usage.apm.ingested_bytes를 메트릭 쿼리로 표시하는 메트릭 모니터 구성 페이지" width="80%" >}}

수집된 볼륨을 효과적으로 줄이려면 이 [가이드][7] 또는 [수집 메커니즘][10] 문서를 참조하세요.

### 인덱싱된 스팬에 대한 경고 설정

마찬가지로, 인덱싱된 스팬에 대한 예산이 특정 한도 내에 유지되도록 경고를 설정할 수 있습니다. 월별 인덱싱된 스팬 볼륨이 정의된 임계값을 초과할 때 경고를 받으려면 `datadog.estimated_usage.apm.indexed_spans` 메트릭을 사용하여 메트릭 모니터를 만듭니다.

인덱싱된 스팬 수를 줄이려면 보존 필터 구성을 확인하세요. [트레이스 보존][11] 문서에서 보존 필터에 대해 자세히 알아보세요.

[1]: https://www.datadoghq.com/pricing
[2]: /ko/account_management/billing/apm_distributed_tracing/
[3]: https://app.datadoghq.com/account/usage
[4]: https://app.datadoghq.com/monitors/create/metric
[5]: /ko/monitors/types/apm/?tab=traceanalytics#monitor-creation
[6]: https://app.datadoghq.com/apm/traces?viz=timeseries
[7]: /ko/tracing/guide/trace_ingestion_volume_control/
[8]: https://app.datadoghq.com/monitors/create/metric
[9]: /ko/monitors/configuration/?tab=thresholdalert#cumulative-time-windows
[10]: /ko/tracing/trace_pipeline/ingestion_mechanisms/
[11]: /ko/tracing/trace_pipeline/trace_retention/