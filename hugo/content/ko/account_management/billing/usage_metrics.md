---
title: 예상 사용량 메트릭
---

## 개요

Datadog는 현재 예상 사용량을 거의 실시간으로 계산합니다. 예상 사용량 메트릭을 사용하면 됩니다.

* 예상 사용량 그래프화
* 선택한 임계값에 따라 예상 사용량을 기준으로 [모니터][3]를 만듭니다.
* 사용량 급증 또는 감소에 대한 [모니터 알림][4] 받기
* 코드 변경이 사용량에 미치는 잠재적 영향을 거의 실시간으로 평가하세요.

**참고**: 이러한 사용량 메트릭은 실시간 사용량이라는 특성상 청구 가능한 사용량과 항상 일치하지는 않습니다. 즉, 추정치입니다. 예상 사용량과 청구 가능한 사용량 사이에는 평균적으로 10~20%의 차이가 있습니다. 추정치의 특성상 사용량이 적을수록 오차 범위가 더 커집니다.

{{< img src="account_management/billing/usage-metrics-01.png" alt="대시보드 예시" >}}

## 사용 유형

예상 사용량 메트릭은 일반적으로 다음 사용 유형에 사용할 수 있습니다.

| 사용 유형                    | 메트릭                                   | 설명 |
|-------------------------------|------------------------------------------| ----------- |
| 인프라스트럭처 호스트          | `datadog.estimated_usage.hosts`          | 지난 한 시간 동안 본 고유한 호스트입니다. |
| 컨테이너                    | `datadog.estimated_usage.containers`     | 지난 한 시간 동안 본 고유한 컨테이너입니다. |
| Fargate 작업                 | `datadog.estimated_usage.fargate_tasks`  | 지난 5분 동안 본 고유한 Fargate 작업 수입니다. |
| 인덱스된 커스텀 메트릭        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric` | 지난 한 시간 동안 본 고유한 색인 커스텀 메트릭입니다. |
| 수집된 커스텀 메트릭       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric` | 지난 한 시간 동안 수집된 고유한 커스텀 메트릭입니다. |
| 수집된 바이트 로그           | `datadog.estimated_usage.logs.ingested_bytes` | 로그의 총 수집량(바이트)입니다. |
| 로그 수집 이벤트          | `datadog.estimated_usage.logs.ingested_events` | 제외된 로그를 포함하여 수집된 이벤트의 총 개수입니다. |
| 로그 결측 횟수               | `datadog.estimated_usage.logs.drop_count` | 수집 중 결측된 이벤트의 총 개수입니다. |
| 로그 절단 개수          | `datadog.estimated_usage.logs.truncated_count` | 수집 시 절단된 이벤트 총 개수입니다. |
| 로그 절단 바이트          | `datadog.estimated_usage.logs.truncated_bytes` | 절단 이벤트(바이트 단위)의 볼륨입니다. |
| 오류 추적 로그 이벤트    | `datadog.estimated_usage.error_tracking.logs.events` | 오류 추적에 수집된 로그 오류의 양입니다. |
| 분석된 로그(보안)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes` | Cloud 보안 정보와 이벤트 관리(SIEM) 로그의 총 수집량(바이트)입니다. |
| APM 호스트                     | `datadog.estimated_usage.apm_hosts` | 지난 시간에 확인된 고유 애플리케이션 성능 모니터링(APM) 호스트입니다. Azure 앱 서비스 호스트는 포함하지 않습니다. |
| APM 인덱싱된 스팬             | `datadog.estimated_usage.apm.indexed_spans` | 태그 기반 보존 필터로 인덱싱된 총 스팬 수 |
| 애플리케이션 성능 모니터링(APM) 수집된 바이트            | `datadog.estimated_usage.apm.ingested_bytes` | 수집된 스팬(span)의 볼륨(바이트)입니다. |
| APM 수집된 스팬            | `datadog.estimated_usage.apm.ingested_spans` | 수집된 스팬의 총 수 |
| 애플리케이션 성능 모니터링(APM) Fargate 작업             | `datadog.estimated_usage.apm.fargate_tasks` | 지난 5분 동안 본 고유 애플리케이션 성능 모니터링(APM) Fargate 작업입니다. |
| RUM 세션                  | `datadog.estimated_usage.rum.sessions` | 총 RUM 세션 수입니다. |
| 서버리스 Lambda 함수   | `datadog.estimated_usage.serverless.aws_lambda_functions` | 지난 한 시간 동안 본 고유한 서버리스 함수입니다. |
| 서버리스 호출        | `datadog.estimated_usage.serverless.invocations`| 지난 1시간 동안의 서버리스 호출의 합계입니다. |
| API 테스트 실행                 | `datadog.estimated_usage.synthetics.api_test_runs` | API 테스트의 예상 사용량입니다. |
| 브라우저 테스트 실행             | `datadog.estimated_usage.synthetics.browser_test_runs`| 브라우저 테스트를 위한 예상 사용량입니다. |
| 병렬 테스팅 슬롯        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | 병렬 테스트 슬롯의 예상 사용량입니다. |
| 네트워크 호스트                 | `datadog.estimated_usage.network.hosts` | 지난 한 시간 동안 본 고유 NPM 호스트입니다. |
| 네트워크 장치               | `datadog.estimated_usage.network.devices` | 지난 한 시간 동안 본 고유한 NDM 장치입니다. |
| 프로파일링 호스트                | `datadog.estimated_usage.profiling.hosts` | 지난 한 시간 동안 본 고유 프로파일링 호스트입니다. |
| 프로파일링된 컨테이너           | `datadog.estimated_usage.profiling.containers` | 지난 5분 동안 본 고유 프로파일링 컨테이너 수입니다. |
| 프로파일러 Fargate 작업        | `datadog.estimated_usage.profiling.fargate_tasks` | 지난 5분 동안 본 고유 프로파일링 Fargate 작업입니다. |
| CSPM 호스트                    | `datadog.estimated_usage.cspm.hosts` | 지난 한 시간 동안 본 고유 CSPM 호스트입니다. |
| CSPM 컨테이너               | `datadog.estimated_usage.cspm.containers` | 지난 5분 동안 본 고유 CSPM 컨테이너 수입니다. |
| CWS 호스트                     | `datadog.estimated_usage.cws.hosts` | 지난 한 시간 동안 본 고유 CWS 호스트입니다. |
| CWS 컨테이너                | `datadog.estimated_usage.cws.containers` | 지난 5분 동안 본 고유 CWS 컨테이너 수입니다. |
| 데이터베이스 호스트                | `datadog.estimated_usage.dbm.hosts` | 지난 한 시간 동안 본 고유 DBM 호스트입니다. |
| ASM 호스트                     | `datadog.estimated_usage.asm.hosts` | 지난 한 시간 동안 본 고유 ASM 호스트입니다. |
| ASM 작업                     | `datadog.estimated_usage.asm.tasks` | 지난 5분 동안 본 고유한 ASM Fargate 작업 수입니다. |
| CI 가시성 파이프라인 커미터 | `datadog.estimated_usage.ci_visibility.pipeline.committers` | (달력) 월부터 현재까지의 파이프라인 커미터입니다. |
| CI 가시성 테스트 커미터 | `datadog.estimated_usage.ci_visibility.test.committers` | (달력) 월부터 현재까지 본 테스트 커미터. |
| IOT 장치                   | `datadog.estimated_usage.iot.devices` | 지난 한 시간 동안 본 고유한 IoT 장치입니다. |
| 통합 가시성 파이프라인 수집된 바이트 수 | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | 통합 가시성 파이프라인에서 수집한 데이터의 양입니다. |
| 커스텀 이벤트                   | `datadog.estimated_usage.events.custom_events` | 커스텀 이벤트 제출된 양입니다. |
| 수집된 이벤트                        | `datadog.estimated_usage.events.ingested_events` | 이벤트 에서 수집한 데이터의 양입니다. |

{{< img src="account_management/billing/usage-metrics-02.png" alt="메트릭 이름" >}}

## 다수 조직 사용량

여러 조직이 있는 계정의 경우 `from` 필드를 사용하여 하위 조직의 예상 사용량을 전체 계정의 모니터링 사용량으로 롤업할 수 있습니다.

{{< img src="account_management/billing/usage-metrics-03.png" alt="다수 조직 사용량" >}}

## 트러블슈팅

기술적인 질문은 [Datadog 지원팀][1]에 문의하세요.

요금 청구와 관련해 궁금하신 점이 있다면 [고객 성공][2] 매니저와 상의하시기 바랍니다.

[1]: /ko/help/
[2]: mailto:success@datadoghq.com
[3]: /ko/monitors/types/metric/?tab=threshold
[4]: /ko/logs/guide/best-practices-for-log-management/#alert-on-indexed-logs-volume-since-the-beginning-of-the-month