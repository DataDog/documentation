---
title: 예상 사용량 메트릭
---

## 개요

Datadog에서는 거의 실시간으로 현재 예상 사용량을 계산합니다. 예상 사용량 메트릭을 통해 다음을 할 수 있습니다.

* 예상 사용량 그래프화
* 선택한 임계값을 기반으로 예상 사용량에 대한 모니터를 생성합니다.
* 사용량 급증 또는 하락에 대한 즉각적인 알림을 받습니다.
* 거의 실시간으로 사용량에 대한 코드 변경의 잠재적 영향을 평가합니다.

**참고**: 이러한 사용량 메트릭은 실시간의 특성 때문에 청구되는 사용량과 항상 일치하지는 않습니다. 평균적으로 10~20%의 차이가 발생합니다. 예측의 특성상 오차 범위는 사용량이 적을 수록 더 큽니다.

{{< img src="account_management/billing/usage-metrics-01.png" alt="대시보드 예" >}}

## 사용량 유형

예상 사용량 메트릭은 일반적으로 다음 사용량 유형에 대해 사용할 수 있습니다.

| 사용량 유형                    | 메트릭                                   | 설명 |
|-------------------------------|------------------------------------------| ----------- |
| 인프라 호스트          | `datadog.estimated_usage.hosts`          | 이전 시간 동안 발견된 고유한 호스트입니다. |
| 컨테이너                    | `datadog.estimated_usage.containers`     | 지난 시간 동안 발견된 고유한 컨테이너입니다. |
| Fargate 작업                 | `datadog.estimated_usage.fargate_tasks`  | 지난 5분 동안 발견된 고유한 Fargate 작업입니다. |
| 인덱스된 커스텀 메트릭        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric` | 지난 시간 동안 발견된 고유한 인덱싱된 커스텀 메트릭입니다. |
| 수집된 커스텀 메트릭       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric` | 지난 시간 발견된 고유한 인덱싱된 커스텀 메트릭입니다. |
| 수집된 바이트 로그           | `datadog.estimated_usage.logs.ingested_bytes` | 총 수집 로그(바이트) |
| 수집된 이벤트 로그          | `datadog.estimated_usage.logs.ingested_events` | 제외된 로그를 포함해 수집된 이벤트의 총 개수 |
| 분석된 로그(보안)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes` | 총 Cloud SIEM 로그 수집(바이트) |
| APM 호스트                     | `datadog.estimated_usage.apm_hosts` | 지난 시간 발견된 고유한 APM 호스트입니다. Azure App Services 호스트를 포함하지 않습니다. |
| APM 인덱싱된 스팬             | `datadog.estimated_usage.apm.indexed_spans` | 인덱싱된 스팬의 총 개수 |
| APM 수집 바이트            | `datadog.estimated_usage.apm.ingested_bytes` | 수집된 스팬 볼륨(바이트)입니다. |
| APM 수집 스팬            | `datadog.estimated_usage.apm.ingested_spans` | 수집된 스팬의 총 개수 |
| APM Fargate 작업             | `datadog.estimated_usage.apm.fargate_tasks` | 지난 5분 동안 발견된 고유한 APM Fargate 작업입니다. |
| RUM 세션                  | `datadog.estimated_usage.rum.sessions` | RUM 세션 총 개수 |
| 서버리스 람다 함수   | `datadog.estimated_usage.serverless.aws_lambda_functions` | 지난 시간 발견된 고유한 서버리스 함수 |
| 서버리스 호출        | `datadog.estimated_usage.serverless.invocations`| 지난 시간 동안의 서버리스 호출 총계입니다. |
| API 테스트 실행                 | `datadog.estimated_usage.synthetics.api_test_runs` | API 테스트 예상 사용량 |
| 브라우저 테스트 실행             | `datadog.estimated_usage.synthetics.browser_test_runs`| 브라우저 테스트 예상 사용량입니다. |
| 병렬 테스팅 슬롯        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | 병렬 테스팅 슬롯을 위한 예상 사용량 |
| 네트워크 호스트                 | `datadog.estimated_usage.network.hosts` | 지난 시간 발견된 고유한 NPM 호스트입니다. |
| 네트워크 장치               | `datadog.estimated_usage.network.devices` | 지난 시간 발견된 고유한 NDM 장치입니다. |
| 프로파일링된 호스트                | `datadog.estimated_usage.profiling.hosts` | 지난 시간 발견된 고유한 프로파일링 호스트입니다. |
| 프로파일링된 컨테이너           | `datadog.estimated_usage.profiling.containers` | 지난 5분 동안 발견된 고유한 프로파일링 컨테이너입니다. |
| 프로파일러 Fargate 작업        | `datadog.estimated_usage.profiling.fargate_tasks` | 지난 5분 동안 발견된 고유한 프로파일링 Fargate 작업입니다. |
| CSPM 호스트                    | `datadog.estimated_usage.cspm.hosts` | 지난 시간 발견된 고유한 CSPM 호스트입니다. |
| CSPM 컨테이너               | `datadog.estimated_usage.cspm.containers` | 지난 5분 동안 발견된 고유한 CSPM 컨테이너입니다. |
| CWS 호스트                     | `datadog.estimated_usage.cws.hosts` | 지난 시간 발견된 고유한 CWS 호스트입니다. |
| CWS 컨테이너                | `datadog.estimated_usage.cws.containers` | 지난 5분 동안 발견된 고유한 CWS 컨테이너입니다. |
| 데이터베이스 호스트                | `datadog.estimated_usage.dbm.hosts` | 지난 시간 발견된 고유한 DBM 호스트입니다. |
| ASM 호스트                     | `datadog.estimated_usage.asm.hosts` | 지난 시간 발견된 고유한 ASM 호스트입니다. |
| ASM 작업                     | `datadog.estimated_usage.asm.tasks` | 지난 5분 동안 발견된 ASM 고유한 Fargate 작업입니다. |
| 인시던트 관리(활성 사용자)   | `datadog.estimated_usage.incident_management.active_users` | 이번 달부터 현재(달력 기준)까지 발견된 활성 IM 사용자입니다. |
| CI Visibility 파이프라인 커미터 | `datadog.estimated_usage.ci_visibility.pipeline.committers` | 이번 달부터 현재까지(달력 기준) 발견된 파이프라인 커미터입니다. |
| CI Visibility 테스트 커미터 | `datadog.estimated_usage.ci_visibility.test.committers` | 이번 달부터 현재까지(달력 기준) 발견된 테스트 커미터입니다. |
| IOT 장치                   | `datadog.estimated_usage.iot.devices` | 지난 시간 발견된 고유한 IoT 장치입니다. |
| 관찰 가능성 파이프라인 수집 바이트 | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | 관찰 가능성 파이프라인에서 수집한 데이터 볼륨입니다. |


{{< img src="account_management/billing/usage-metrics-02.png" alt="메트릭 이름" >}}

## 다수-조직 사용량

다수의 조직이 있는 계정의 경우 `from` 필드를 사용해 하위 조직들의 예상 사용량을 모아 전체 계정의 사용량을 모니터링할 수 있습니다.

{{< img src="account_management/billing/usage-metrics-03.png" alt="다수-조직 사용량" >}}

## 트러블슈팅

기술적 질문의 있다면 [Datadog 지원][1]에 문의해 주세요.

요금 청구와 관련해 궁금하신 점이 있다면 [고객 성공][2] 매니저와 상의하시기 바랍니다.

[1]: /ko/help/
[2]: mailto:success@datadoghq.com