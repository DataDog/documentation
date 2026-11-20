---
aliases:
- /ko/integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
- /ko/integrations/faq/aws-integration-and-cloudwatch-faq
description: Datadog AWS 통합 및 CloudWatch 메트릭 수집에 관해 자주 묻는 질문입니다.
title: AWS 통합 및 CloudWatch FAQ
---
### 통합으로 AWS 커스텀 메트릭을 수집할 수 있나요? {#can-i-collect-aws-custom-metrics-through-the-integration}

예. [AWS 통합 페이지][1]의 **Metric Collection** 탭에서 **Collect Custom Metrics**를 활성화하세요.

### 메트릭 이름 기준으로 AWS 메트릭을 필터링할 수 있나요? {#can-i-filter-aws-metrics-by-metric-name}

예. [AWS 통합 페이지][1]에서 **메트릭 수집** 탭을 열고 CloudWatch 네임스페이스를 확장한 다음 메트릭 이름 필터를 추가하세요. **Include**를 사용하여 해당 네임스페이스에서 일치하는 Datadog 메트릭 이름만 수집하거나, **Exclude**를 사용하여 일치하는 메트릭 이름을 제외한 모든 항목을 수집하세요.

구문 및 필수 메트릭에 대한 자세한 내용은 [AWS 시작하기][14]를 참조하세요. 메트릭 이름 필터를 프로그래밍 방식으로 관리하려면 [API를 사용한 AWS 메트릭 이름 필터 구성][15]을 참조하세요.

### Datadog 공식 통합이 없는 서비스에서 메트릭을 어떻게 수집하나요? {#how-do-i-collect-metrics-from-a-service-for-which-datadog-doesnt-have-an-official-integration}

공식 통합이 없는 `AWS/<namespace>`에서 발생하는 AWS 메트릭의 경우에도 `Collect custom metrics` 옵션이 활성화되면 커스텀 네임스페이스 아래로 이동합니다. [AWS 태그 필터 설정][2] API를 통해 커스텀 네임스페이스 아래의 필터 문자열을 사용하여 이러한 메트릭을 필터링하고 원하는 메트릭만 유지할 수 있습니다.

### Datadog AWS 통합은 CloudWatch를 어떻게 사용하나요? {#how-does-the-datadog-aws-integration-use-cloudwatch}

Datadog은 CloudWatch 모니터링 API를 사용하여 AWS 리소스를 모니터링합니다. 이 API의 주된 용도는 `GetMetricData` 엔드포인트를 통해 원시 메트릭 데이터를 수집하는 것입니다.

다른 API는 메트릭 데이터를 보강하는 데 사용됩니다. 다음은 몇 가지 예시입니다.

 * 메트릭에 추가할 커스텀 태그 수집

 * 리소스 상태/서비스 상태에 관한 정보 수집(예: 자동화)

 * 로그 스트림 수집

### API 요청의 양은 어떻게 되나요? CloudWatch 사용량을 어떻게 모니터링하나요? {#how-many-api-requests-are-made-and-how-can-i-monitor-my-cloudwatch-usage}

Datadog은 설치한 각 AWS 하위 통합에 10분마다 사용 가능한 메트릭을 수집합니다. 특정 하위 통합에 AWS 리소스가 많은 경우(SQS, ELB, DynamoDB, AWS 커스텀 메트릭) AWS CloudWatch 청구서에 영향을 미칠 수 있습니다.

[AWS 청구 통합][3]으로 CloudWatch API 사용량을 모니터링할 수 있습니다.

### CloudWatch 메트릭을 Datadog에서 수신 시 지연 시간을 어떻게 줄일 수 있나요? {#how-can-i-reduce-the-delay-of-receiving-my-cloudwatch-metrics-to-datadog}

기본적으로 Datadog은 10분마다 AWS 메트릭을 수집합니다. 자세한 내용은 [Cloud 메트릭 지연][4]을 참조하세요. 지연 시간을 줄여야 하는 경우 [Datadog 지원팀][5]에 문의하여 도움을 받으세요. 2-3분의 지연 시간으로 CloudWatch 메트릭을 Datadog으로 가져오려면 [Amazon CloudWatch Metric Streams 및 Amazon Data Firehose][6]를 사용할 것을 권장합니다. 


### 커스텀 AWS CloudWatch 메트릭의 평균 값만 표시되는 이유는 무엇인가요? {#why-am-i-only-seeing-the-average-values-of-my-custom-awscloudwatch-metrics}

기본적으로 Datadog은 커스텀 AWS/CloudWatch 메트릭의 평균 값만 수집합니다. 단, [Datadog 지원팀][5]에 문의하면 추가 값을 사용할 수 있습니다. 추가 값에는 (사용 가능한 경우) 최소값, 최대값, 합계, 샘플 수 등이 포함됩니다.

### CloudWatch와 Datadog의 데이터가 일치하지 않습니다. {#is-there-a-discrepancy-between-my-data-in-cloudwatch-and-datadog}

숙지해야 할 중요한 차이점이 있습니다.

- Datadog은 Datadog의 해당 CloudWatch 메트릭에 대해 단일 CloudWatch 통계를 수집합니다. CloudWatch의 `Sum`와 Datadog의 `Average`를 비교하면 불일치가 발생합니다. 일부 CloudWatch 메트릭의 경우 여러 통계가 유용할 수 있으며, Datadog은 통계값이 각각 다른 동일한 CloudWatch 메트릭에 이름을 다르게 생성합니다. 예: `aws.elb.latency` 및 `aws.elb.latency.maximum`.
- AWS 카운터의 경우 `sum` `1 minute`으로 설정된 그래프는 해당 시점까지 1분 동안의 총 발생 횟수(1분당 비율)를 표시합니다. Datadog은 AWS에서 선택한 타임프레임에 관계없이, AWS의 원시 데이터를 초당 값으로 정규화하여 표시합니다. 따라서 Datadog에서는 더 낮은 값이 표시될 수 있습니다.
- 전반적으로 `min`, `max` 및 `avg`는 AWS에서 다른 의미를 갖습니다 AWS는 평균 지연 시간, 최소 지연 시간, 최대 지연 시간을 개별적으로 수집합니다. AWS CloudWatch에서 메트릭을 불러올 때, Datadog은 평균 지연 시간을 ELB당 단일 시계열로만 수신합니다. Datadog 내에서 `min`, `max` 또는 `avg`을 선택할 경우, 여러 시계열이 통합되는 방식을 제어하게 됩니다. 예를 들어, 필터 없이 `system.cpu.idle`을 요청하면 해당 메트릭을 보고하는 각 호스트당 시계열 하나가 반환됩니다. Datadog은 [공간 집계][7]을 활용하여 이러한 시계열을 결합합니다. 단일 호스트에서 `system.cpu.idle`을 요청한 경우 집계 작업이 필요하지 않으며 `avg`과 `max` 값 간을 전환해도 동일한 결과가 도출됩니다.

### CloudWatch에 표시되는 데이터와 일치하도록 Datadog의 데이터를 조정하려면 어떻게 해야 하나요? {#how-do-i-adjust-my-data-on-datadog-to-match-the-data-displayed-in-cloudwatch}

AWS CloudWatch는 분당 데이터로 정규화된 메트릭을 1분 단위로 보고합니다. Datadog은 초당 데이터로 정규화된 메트릭을 1분 단위로 보고합니다. Datadog에서 데이터를 조정하려면 60을 곱하세요. 또한 메트릭 통계가 동일한지 확인해야 합니다. 예를 들어, `IntegrationLatency` 메트릭은 평균, 최대, 최소, 백분위수 등의 다양한 통계를 가져옵니다. Datadog에서 이러한 통계는 각각 고유한 메트릭으로 표시됩니다.
  ```
aws.apigateway.integration_latency (average)
aws.apigateway.integration_latency.maximum
aws.apigateway.integration_latency.minimum
aws.apigateway.integration_latency.p50
  ```


#### rollup()이 데이터를 조정하나요? {#will-a-rollup-adjust-my-data}

롤업은 비슷한 결과를 표시하지 않습니다. `rollup(sum, 60)` 롤업 호출의 경우, 서버는 모든 데이터 포인트를 분 단위 구간(bin)으로 그룹화하고 각 구간의 합계를 데이터 포인트로 반환합니다. 그러나 AWS 메트릭의 세분성 단위는 1분이므로, 구간당 데이터 포인트가 하나뿐이어서 변경이 발생하지 않습니다.

### 새로 활성화한 AWS 서비스의 메트릭이 보이지 않는 이유는 무엇인가요? {#why-dont-i-see-metrics-for-a-new-aws-service-i-enabled}

최근에 AWS 서비스 통합을 새로 활성화했으나 Datadog에서 메트릭이 보이지 않는다면 다음 사항을 확인하세요.

1. **IAM 권한**: Datadog 통합과 연결된 IAM 역할/사용자에게 해당 서비스에서 요구하는 권한이 있는지 확인합니다. 서비스별 권한 요구 사항은 개별 [AWS 통합 페이지][8]를 참조하세요.
2. **리전**: 리소스가 배포된 AWS 리전이 [AWS 통합 페이지][1]에서 활성화되어 있는지 확인합니다.
3. **CloudWatch 가용성**: AWS에서 CloudWatch 콘솔을 열고 예상 메트릭이 존재하는지 확인합니다. 일부 서비스는 특정 조건이 충족될 때까지 CloudWatch 메트릭을 내보내지 않습니다(예: 인스턴스가 연결되지 않은 ELB는 메트릭을 내보내지 않음).
4. **폴링 지연**: API 폴링은 약 10분마다 메트릭을 수집합니다. [CloudWatch Metric Streams][6]를 사용하는 경우 2~3분의 지연이 발생합니다. 추가 조사를 수행하기 전에 최소 한 번의 폴링 주기가 완료될 때까지 기다리세요.

### API 폴링과 CloudWatch Metric Streams의 차이점은 무엇인가요? {#what-is-the-difference-between-api-polling-and-cloudwatch-metric-streams}

| &nbsp; | API 폴링(기본값) | CloudWatch Metric Streams |
|---|---|---|
| **일반 지연 시간** | ~10분 | 2~3분 |
| **설정** | AWS 통합에 포함됨 | [Amazon Data Firehose][6]를 통한 별도의 설정 필요 |
| **AWS 비용** | CloudWatch `GetMetricData` API 호출 | CloudWatch Metric Streams 및 Firehose 전송 요금 |
| **범위** | 모든 표준 CloudWatch 네임스페이스, 커스텀 네임스페이스의 경우 **Collect Custom Metrics**을 활성화해야 합니다. | 대부분의 CloudWatch 네임스페이스(일부 항목 제외) |
| **커스텀 네임스페이스** | **Collect Custom Metrics**을 활성화한 상태에서 지원합니다. | 스트림 구성에 네임스페이스를 포함하여 지원합니다. |

자세한 내용은 [클라우드 메트릭 지연][4] 및 [CloudWatch Metric Streams 가이드][6]를 참조하세요.

### Metric Streams 활성화 이후 메트릭 값이 두 배로 표시되는 이유는 무엇인가요? {#why-do-my-metric-values-look-doubled-after-enabling-metric-streams}

API 폴링에서 CloudWatch Metric Streams로 전환할 때, 두 수집 방법이 동일한 메트릭에 대해 데이터를 전송할 수 있는 중복 기간이 발생합니다. 이로 인해 Datadog에서 메트릭 값이 두 배로 나타날 수 있습니다.

Datadog은 스트리밍된 네임스페이스를 자동으로 탐지해 폴링을 중지하므로, API 폴링을 수동으로 비활성화할 필요가 없습니다. [AWS 통합 페이지][1]의 구성 설정은 변경하지 마세요. Datadog은 계속해서 API 폴링을 사용하여 Metric Streams를 통해 전송할 수 없는 사용자 지정 태그, 메타데이터, 메트릭(`aws.s3.bucket_size_bytes` 및 `aws.billing.estimated_charges` 등)을 수집하기 때문입니다.

이 탐지 과정은 최대 5분까지 소요되지만, 실제로는 활성 폴링 크롤러의 타이밍에 따라 중복 기간이 더 길어질 수 있습니다. 몇 분 후에도 값이 두 배로 나타난다면 [CloudWatch Metric Streams 가이드][6]에서 문제 해결 방법을 참조하세요.

### 핵심 통합 외에 추가 설정이 필요한 AWS 서비스는 무엇인가요? {#which-aws-services-require-additional-setup-beyond-the-core-integration}

일부 AWS 서비스는 기본적으로 CloudWatch에 메트릭을 내보내지 않으므로 추가 구성이 필요합니다.

| 서비스 | 추가 설정 필요 |
|---|---|
| Amazon RDS(OS 수준 메트릭) | RDS 콘솔에서 [Enhanced Monitoring][9]을 활성화합니다. |
| Amazon S3(Storage Lens 메트릭) | S3 콘솔에서 [Storage Lens][10]를 구성합니다. |
| AWS 결제 메트릭 | [메트릭 수집 탭][1]에서 `Billing`을 활성화하고, `budgets:ViewBudget` 권한을 추가한 다음, AWS 콘솔에서 [결제 메트릭 활성화][11]를 수행합니다. 전체 지침은 [AWS 결제 세부 정보 모니터링][13]을 참조하세요. |
| 커스텀 CloudWatch 네임스페이스 | [메트릭 수집 탭][1]에서 **Collect Custom Metrics**를 활성화합니다. |
| EC2 세부 모니터링 | EC2 콘솔에서 인스턴스별로 [세부 모니터링][12]을 활성화합니다. |

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.datadoghq.com/ko/api/latest/aws-integration/#set-an-aws-tag-filter
[3]: /ko/integrations/amazon_billing/
[4]: /ko/integrations/guide/cloud-metric-delay/
[5]: /ko/help/
[6]: https://docs.datadoghq.com/ko/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[7]: /ko/metrics/introduction/#space-aggregation
[8]: /ko/integrations/#cat-aws
[9]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.Enabling.html
[10]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html
[11]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[12]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-cloudwatch-new.html
[13]: /ko/integrations/guide/monitor-your-aws-billing-details/
[14]: /ko/getting_started/integrations/aws/#filter-metrics-by-metric-name
[15]: /ko/integrations/guide/aws-metric-name-filters/