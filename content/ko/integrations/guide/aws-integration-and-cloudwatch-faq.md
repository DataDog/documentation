---
aliases:
- /ko/integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
- /ko/integrations/faq/aws-integration-and-cloudwatch-faq
title: AWS 통합 및 CloudWatch FAQ
---

### 통합으로 AWS 커스텀 메트릭을 수집할 수 있나요?

네, [AWS 통합 페이지][1]의 **Metric Collection** 탭에서 **Collect Custom Metrics**를 활성화하세요.

### Datadog 공식 통합이 없는 서비스에서 메트릭을 어떻게 수집하나요?

AWS 공식 통합이 없는 `AWS/<namespace>`에서 들어오는 메트릭 또한 `Collect custom metrics` 옵션이 활성화되어 있으면 커스텀 네임스페이스로 불러올 수 있습니다. [AWS 태그 필터][2] API를 통해 커스텀 네임스페이스에서 필터 문자열을 사용하여 해당 메트릭을 필터링하고 원하는 메트릭만 유지할 수 있습니다.

### Datadog AWS 통합은 CloudWatch를 어떻게 사용하나요?

Datadog은 CloudWatch 모니터 API를 사용하여 AWS 리소스를 모니터링합니다. 해당 API의 주요 용도는 `GetMetricData` 엔드포인트를 통해 원시 메트릭 데이터를 수집하는 것입니다.

다른 API는 메트릭 데이터를 보강하는 데 사용됩니다. 다음은 몇 가지 예시입니다.

 * 수집 커스텀 태그 메트릭에 추가하기

 * 리소스의 상태 또는 서비스 상태에 관한 정보 수집(예: 자동화 등)

 * 로그 스트림 수집하기

### API 요청의 양은 어떻게 되나요? 또 CloudWatch 사용량을 어떻게 모니터링하나요?

Datadog은 설치한 각 AWS 하위 통합에 10분마다 사용 가능한 메트릭을 수집합니다. 특정 하위 통합에 AWS 리소스가 많은 경우(SQS, ELB, DynamoDB, AWS 커스텀 메트릭) AWS CloudWatch 청구서에 영향을 미칠 수 있습니다.

[AWS 청구 통합][3]으로 CloudWatch API 사용량을 모니터링할 수 있습니다.

### CloudWatch 메트릭을 Datadog에서 수신 시 지연 시간을 어떻게 줄일 수 있나요?

Datadog은 기본적으로 10분마다 AWS 메트릭을 수집합니다. 자세한 내용은 [Cloud 메트릭 딜레이][4]를 참조하세요. 레이턴시를 줄여야 하는 경우 [Datadog 지원 팀][5]에 문의하여 도움을 받으세요. CloudWatch 메트릭을 Datadog으로 더 빠르게 가져오려면(2~3분 딜레이) [Amazon CloudWatch Metric Streams 및 Amazon Data Firehose][6] 사용을 권장합니다. 


### 커스텀 AWS CloudWatch 메트릭의 평균 값만 표시되는 이유는 무엇인가요?

Datadog은 기본적으로 커스텀 AWS/CloudWatch 메트릭의 평균값만 수집합니다. 그러나 [Datadog 지원 팀][5]으로 문의하면 추가 값을 사용할 수 있습니다. 추가 값에는 최소, 최대, 합계, 샘플 수가 포함됩니다(사용 가능한 경우).

### CloudWatch와 Datadog의 데이터가 일치하지 않습니다.

숙지해야 할 중요한 차이점이 있습니다.

- Datadog은 Datadog에서 CloudWatch 메트릭에 해당하는 단일 CloudWatch 통계를 수집합니다. CloudWatch의 `Sum`와 Datadog의 `Average`를 비교하면 불일치가 발생합니다. 일부 CloudWatch 메트릭의 경우 다중 통계가 유용할 수 있으며, Datadog는 통계가 다른 동일한 CloudWatch 메트릭에 서로 다른 메트릭 이름을 생성합니다. 예를 들어 `aws.elb.latency`와 `aws.elb.latency.maximum`입니다.
- AWS 카운터의 경우, `sum` `1 minute`로 설정된 그래프는 해당 시점까지 1분 동안의 총 발생 건수(1분당 비율)를 표시합니다. Datadog은 AWS에서 선택한 타임프레임에 관계없이 초당 값으로 정규화한 AWS의 원시 데이터를 표시합니다. 따라서 Datadog에 더 낮은 값이 표시될 수 있습니다.
- 전반적으로 `min`, `max`, `avg`은 AWS에서 다른 의미를 갖습니다. AWS는 평균 레이턴시, 최소 레이턴시, 최대 레이턴시를 명시적으로 수집합니다. AWS CloudWatch에서 메트릭을 불러올 때, Datadog은 평균 레이턴시를 ELB당 단일 시계열로만 수신합니다. Datadog 내에서 `min`, `max`, 또는 `avg`을 선택할 경우, 여러 시계열이 통합되는 방식을 제어하게 됩니다. 예를 들어, 필터 없이 `system.cpu.idle`을 요청하면 메트릭을 보고하는 각 호스트당 시계열 하나가 반환됩니다. Datadog은 이러한 시계열을 [공간 집계][7]를 활용하여 결합합니다. 단일 호스트에서 `system.cpu.idle`을 요청한 경우, 집계 작업이 불필요하며 `avg`과 `max` 값 간을 전환해도 동일한 결과를 얻습니다.

### CloudWatch에 표시되는 데이터와 일치하도록 Datadog의 데이터를 조정하려면 어떻게 해야 하나요?

AWS CloudWatch는 분당 데이터로 정규회된 1분 단위의 메트릭을 보고합니다. Datadog은 초당 데이터로 정규화된 1분 단위의 메트릭을 보고합니다. Datadog의 데이터를 조정하려면 60을 곱합니다. 아울러, 메트릭의 통계가 동일한지 확인합니다. 예를 들어, 메트릭 `IntegrationLatency`은 평균, 최대, 최소, 백분위수와 같은 다양한 통계를 가져옵니다. Datadog에서 이러한 통계는 각각 고유한 메트릭으로 표시됩니다.
  ```
aws.apigateway.integration_latency (average)
aws.apigateway.integration_latency.maximum
aws.apigateway.integration_latency.minimum
aws.apigateway.integration_latency.p50
  ```


#### rollup()이 데이터를 조정하나요?

롤업은 비슷한 결과를 표시하지 않습니다. `rollup(sum, 60)`의 롤업 호출의 경우, 서버는 모든 데이터 포인트를 분 단위 빈(bin)으로 그룹화하고 각 빈의 합계를 데이터 포인트로 반환합니다. 그러나 AWS 메트릭의 분할 단위는 1분이므로 빈당 데이터 포인트가 하나만 있어 결과적으로 변화가 없습니다.

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.datadoghq.com/ko/api/latest/aws-integration/#set-an-aws-tag-filter
[3]: /ko/integrations/amazon_billing/
[4]: /ko/integrations/guide/cloud-metric-delay/
[5]: /ko/help/
[6]: https://docs.datadoghq.com/ko/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[7]: /ko/metrics/introduction/#space-aggregation