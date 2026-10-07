---
further_reading:
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#measuring-the-impact-of-our-optimizations
  tag: 블로그
  text: '규모에 맞는 Datadog 최적화: Zendesk의 비용 효율적 관측 가능성'
title: 예상 사용량 메트릭
---
<style>tbody code {word-break: break-word !important;}</style>

## 개요 {#overview}

Datadog은 현재 예상 사용량을 거의 실시간으로 계산합니다. 예상 사용량 메트릭을 사용하면 다음이 가능합니다.

* 예상 사용량 그래프 작성
* 선택한 임계값에 따라 예상 사용량에 대한 [모니터][3] 생성
* 사용량 급증 또는 급감에 대한 [모니터 경보][4] 수신
* 코드 변경이 사용량에 미치는 잠재적 영향을 거의 실시간으로 평가

**참고**: 이러한 사용량 메트릭은 실시간 특성상 청구 대상 사용량과 항상 일치하지는 않는 추정값입니다. 평균적으로 예상 사용량과 청구 대상 사용량 간에는 10~20%의 차이가 있습니다. 추정값의 특성상 사용량이 적을수록 오차 범위가 더 커집니다.

{{< img src="account_management/billing/usage-metrics-01.png" alt="대시보드 예시" >}}

## 사용량 유형 {#types-of-usage}

예상 사용량 메트릭은 일반적으로 다음 사용 유형에 사용할 수 있습니다.

| 사용량 유형                    | 메트릭                                   | 설명 |
|-------------------------------|------------------------------------------| ----------- |
| Infrastructure Hosts          | `datadog.estimated_usage.hosts`, `datadog.estimated_usage.hosts.by_tag`          | 지난 한 시간 동안 확인된 고유 호스트. |
| Containers                    | `datadog.estimated_usage.containers`, `datadog.estimated_usage.containers.by_tag`     | 지난 한 시간 동안 확인된 고유 컨테이너. |
| Fargate Tasks                 | `datadog.estimated_usage.fargate_tasks`, `datadog.estimated_usage.fargate_tasks.by_tag`  | 지난 5분 동안 확인된 고유 Fargate Task. <br/><br/>**참고**: 이 메트릭은 ECS Fargate 및 EKS Fargate 사용량을 모두 추적합니다. |
| Indexed Custom Metrics        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric`, `datadog.estimated_usage.metrics.custom.by_tag`  | 지난 한 시간 동안 확인된 고유 인덱싱 Custom Metrics. |
| Ingested Custom Metrics       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric`, `datadog.estimated_usage.metrics.custom.ingested.by_tag`  | 지난 한 시간 동안 확인된 고유 수집 Custom Metrics. |
| (미리 보기) Indexed Custom Metric Points | `datadog.estimated_usage.metrics.points.indexed`, `datadog.estimated_usage.metrics.points.indexed.by_tag`, `datadog.estimated_usage.metrics.points.indexed.hourly` | 사용자 지정 메트릭에 대한 예상 인덱싱 포인트. |
| (미리 보기) Ingested Custom Metric Points | `datadog.estimated_usage.metrics.points.ingested`, `datadog.estimated_usage.metrics.points.ingested.hourly` | 사용자 지정 메트릭에 대한 예상 수집 포인트. |
| (미리 보기) Billable Metric Names | `datadog.estimated_usage.billable.metrics` | 월 누계 기준으로 100개 이상의 인덱싱 포인트를 가진 메트릭 이름 수. [Metric Name 요금제][7]를 사용하는 조직에 적용됩니다. |
| (미리 보기) Billable Indexed Points | `datadog.estimated_usage.billable.points` | 월 누계 기준으로 메트릭 이름당 포함된 1,000만 포인트를 초과하는 인덱싱 포인트 합계. [Metric Name 요금제][7]를 사용하는 조직에 적용됩니다. |
| (미리 보기) Ingested-to-Indexed Points Ratio | `datadog.estimated_usage.metrics.points.ratio` | 전체 수집 포인트와 전체 인덱싱 포인트의 비교. [Metric Name 요금제][7]를 사용하는 조직에 적용됩니다. |
| Logs Ingested Bytes           | `datadog.estimated_usage.logs.ingested_bytes` | 바이트 기준 로그 총 수집량. |
| Logs Ingested Events          | `datadog.estimated_usage.logs.ingested_events` | 제외된 로그를 포함한 총 수집 이벤트 수. |
| Logs Pipelines Bytes           | `datadog.estimated_usage.logs.ingested_bytes` | 바이트 기준 파이프라인과 일치한 로그 수. |
| Logs Pipelines Events          | `datadog.estimated_usage.logs.ingested_events` | 제외된 로그를 포함하여 바이트 기준 파이프라인과 일치한 이벤트 수. |
| Logs Drop Count               | `datadog.estimated_usage.logs.drop_count` | 수집 중 삭제된 총 이벤트 수. |
| Logs Truncated Count          | `datadog.estimated_usage.logs.truncated_count` | 수집 시 잘린 총 이벤트 수. |
| Logs Truncated Bytes          | `datadog.estimated_usage.logs.truncated_bytes` | 바이트 기준 잘린 이벤트 볼륨. |
| Error Tracking Logs Events    | `datadog.estimated_usage.error_tracking.logs.events` | Error Tracking에 수집된 오류 로그 볼륨. |
| Analyzed Logs (security)      | `datadog.estimated_usage.security_monitoring.analyzed_bytes` | 바이트 기준 Cloud SIEM 로그 총 수집량. |
| APM Hosts                     | `datadog.estimated_usage.apm_hosts`, `datadog.estimated_usage.apm_hosts.by_tag` | 지난 한 시간 동안 확인된 고유 APM 호스트. Azure App Services 호스트는 포함되지 않습니다. |
| APM Indexed Spans             | `datadog.estimated_usage.apm.indexed_spans` | 태그 기반 보존 필터에 의해 인덱싱된 스팬 총 수. |
| APM Ingested Bytes            | `datadog.estimated_usage.apm.ingested_bytes` | 바이트 기준 수집된 스팬 볼륨. |
| APM Ingested Spans            | `datadog.estimated_usage.apm.ingested_spans` | 수집된 스팬 총 수. |
| APM Fargate Tasks             | `datadog.estimated_usage.apm.fargate_tasks`, `datadog.estimated_usage.apm.fargate_tasks.by_tag` | 지난 5분 동안 확인된 고유 APM Fargate Task. |
| RUM Sessions                  | `datadog.estimated_usage.rum.sessions` | RUM 세션 총 수. |
| RUM Ingested Sessions         | `datadog.estimated_usage.rum.ingested_sessions` | 수집된 RUM 세션 총 수. <br /><br />**참고**: RUM without Limits에 적용됩니다. |
| RUM Indexed Sessions          | `datadog.estimated_usage.rum.indexed_sessions` | 보존 필터에 의해 인덱싱된 RUM 세션 총 수. <br /><br />**참고**: RUM without Limits에 적용됩니다. |
| Serverless Lambda Functions   | `datadog.estimated_usage.serverless.aws_lambda_functions`, `datadog.estimated_usage.serverless.aws_lambda_functions.by_tag` | 지난 한 시간 동안 확인된 고유 Serverless 함수. |
| Serverless Invocations        | `datadog.estimated_usage.serverless.invocations`| 지난 한 시간 동안의 Serverless 호출 합계. |
| API test runs                 | `datadog.estimated_usage.synthetics.api_test_runs` | API 테스트의 예상 사용량. |
| Browser test runs             | `datadog.estimated_usage.synthetics.browser_test_runs`| 브라우저 테스트의 예상 사용량. |
| Parallel Testing Slots        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | 병렬 테스트 슬롯의 예상 사용량. |
| Network Hosts                 | `datadog.estimated_usage.network.hosts`, `datadog.estimated_usage.network.hosts.by_tag` | 지난 한 시간 동안 확인된 고유 CNM 호스트. |
| Network Devices               | `datadog.estimated_usage.network.devices`, `datadog.estimated_usage.network.devices.by_tag` | 지난 한 시간 동안 확인된 고유 NDM 장치. |
| Profiled Hosts                | `datadog.estimated_usage.profiling.hosts`, `datadog.estimated_usage.profiling.hosts.by_tag` | 지난 한 시간 동안 확인된 고유 프로파일링 호스트. |
| Profiled Containers           | `datadog.estimated_usage.profiling.containers`, `datadog.estimated_usage.profiling.containers.by_tag` | 지난 5분 동안 확인된 고유 프로파일링 컨테이너. |
| Profiler Fargate Tasks        | `datadog.estimated_usage.profiling.fargate_tasks`, `datadog.estimated_usage.profiling.fargate_tasks.by_tag` | 지난 5분 동안 확인된 고유 프로파일링 Fargate Task. |
| CSPM Hosts                    | `datadog.estimated_usage.cspm.hosts`, `datadog.estimated_usage.cspm.hosts.by_tag` | 지난 한 시간 동안 확인된 고유 CSPM 호스트. |
| CSPM Containers               | `datadog.estimated_usage.cspm.containers`, `datadog.estimated_usage.cspm.containers.by_tag` | 지난 5분 동안 확인된 고유 CSPM 컨테이너. |
| CWS Hosts                     | `datadog.estimated_usage.cws.hosts`, `datadog.estimated_usage.cws.hosts.by_tag` | 지난 한 시간 동안 확인된 고유 CWS 호스트. |
| CWS Containers                | `datadog.estimated_usage.cws.containers`, `datadog.estimated_usage.cws.containers.by_tag` | 지난 5분 동안 확인된 고유 CWS 컨테이너. |
| Database Hosts                | `datadog.estimated_usage.dbm.hosts`, `datadog.estimated_usage.dbm.hosts.by_tag` | 지난 한 시간 동안 확인된 고유 DBM 호스트. |
| AAP Hosts                     | `datadog.estimated_usage.asm.hosts`, `datadog.estimated_usage.asm.hosts.by_tag` | 지난 한 시간 동안 확인된 고유 AAP 호스트. |
| AAP Tasks                     | `datadog.estimated_usage.asm.tasks`, `datadog.estimated_usage.asm.tasks.by_tag` | 지난 5분 동안 확인된 고유 AAP Fargate Task. |
| CI Visibility Pipeline Committers | `datadog.estimated_usage.ci_visibility.pipeline.committers` | 당월 누계 기준 파이프라인 커미터. |
| CI Visibility Test Committers | `datadog.estimated_usage.ci_visibility.test.committers` | 당월 누계 기준 테스트 커미터. |
| Code Coverage Committers | `datadog.estimated_usage.code_coverage.committers` | 당월 누계 기준 코드 커버리지 커미터. |
| IoT devices                   | `datadog.estimated_usage.iot.devices`, `datadog.estimated_usage.iot.devices.by_tag` | 지난 한 시간 동안 확인된 고유 IoT 장치. |
| Observability Pipelines Ingested Bytes | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | Observability Pipelines에서 수집한 데이터 볼륨. |
| Custom Events                 | `datadog.estimated_usage.events.custom_events` | 제출된 사용자 지정 이벤트 볼륨. |
| Events Ingested               | `datadog.estimated_usage.events.ingested_events` | Events에서 수집한 데이터 볼륨. |
| Code Security SAST Committers | `datadog.estimated_usage.code_security.sast.committers` | 당월 누계 기준 SAST 커미터. |
| Code Security SCA Committers  | `datadog.estimated_usage.code_security.sca.committers`  | 당월 누계 기준 SCA 커미터.  |
| Code Security SCA Hosts       | `datadog.estimated_usage.asm.vulnerability_oss_host`, `datadog.estimated_usage.asm.vulnerability_oss_host.by_tag` | 지난 한 시간 동안 확인된 고유 SCA 호스트. |
| Code Security Secret Scanning Committers  | `datadog.estimated_usage.code_security.secrets.committers`  | 당월 누계 기준 Secret Scanning 커미터.  |
| Code Security IaC Committers  | `datadog.estimated_usage.code_security.iac.committers`  | 당월 누계 기준 IaC(Infrastructure as Code) 커미터.  |
| Incident Management Seats  | `datadog.estimated_usage.incident_management.seats`  | 독립형 Incident Management용 사용자 좌석 수.  |
| Incident Management Monthly Active Users  | `datadog.estimated_usage.incident_management.monthly_active_users`  | 당월 누계 기준 Incident Management의 고유 활성 사용자 수(기존 청구 방식).  |

{{< img src="account_management/billing/usage-metrics-02.png" alt="메트릭 이름" >}}

## by_tag 예상 사용량 메트릭에 태그 설정 {#setting-tags-for-your-by-tag-estimated-usage-metrics}
by_tag 예상 사용량 메트릭에 대한 태그 세분화를 설정하려면 [사용량 어트리뷰션][6] 페이지에서 팀(team) 또는 환경(env)과 같은 원하는 태그를 구성합니다(PRO 플랜을 사용하는 경우 [고객 성공 관리자][2]를 통해 이 기능에 대한 액세스를 요청할 수 있습니다). 변경 사항은 다음 UTC 기준 00:00에 적용됩니다.

{{< img src="account_management/billing/setting-eum-tags-in-ua.png" alt="사용량 어트리뷰션에서 by_tag EUM 태그 설정" >}}

## Dashboards {#dashboards}

이 메트릭과 함께 유용한 쿼리가 포함된 기본 제공 예상 사용량 대시보드를 사용할 수 있습니다. 이러한 대시보드를 복제하여 사용량 메트릭 활용을 시작할 수 있습니다. 이러한 대시보드를 찾으려면 [대시보드 프리셋 목록][5]으로 이동한 후 “예상 사용량”을 검색합니다.

## 다중 조직 사용량 {#multi-org-usage}

여러 조직이 있는 계정의 경우 `from` 필드를 사용하여 하위 조직의 예상 사용량을 집계함으로써 전체 계정의 사용량을 모니터링할 수 있습니다.

{{< img src="account_management/billing/usage-metrics-03.png" alt="다중 조직 사용량" >}}

## 문제 해결 {#troubleshooting}

기술적 지원이 필요한 경우에는 [Datadog 지원팀][1]에 문의하세요.

요금 청구와 관련한 질문은 [고객 성공][2] 관리자에게 문의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/
[2]: mailto:success@datadoghq.com
[3]: /ko/monitors/types/metric/?tab=threshold
[4]: /ko/logs/guide/best-practices-for-log-management/#alert-on-indexed-logs-volume-since-the-beginning-of-the-month
[5]: https://app.datadoghq.com/dashboard/lists/preset/3?q=estimated%20usage
[6]: /ko/account_management/billing/usage_attribution/
[7]: /ko/account_management/billing/metric_name_pricing/