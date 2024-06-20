---
aliases:
- /ko/integrations/faq/i-can-t-filter-out-my-elb-instances-will-i-be-charged-for-them/
title: AWS 통합 빌링
---

## 개요

Datadog는 Datadog 에이전트를 실행하는 AWS 호스트와 Datadog-AWS 통합으로 선택된 모든 EC2 인스턴스에 대해 요금을 청구합니다. **AWS 통합을 통해 선택된 EC2 인스턴스에서 에이전트를 실행하는 경우 비용이 두 번 청구되지 않습니다**.

**중요**: Datadog는 EC2 인스턴스 메타데이터를 사용하여 에이전트를 실행하고 AWS 통합에 의해 크롤링되는 호스트에 대해 두 번 요금이 청구되지 않도록 합니다. EC2 인스턴스가 [인스턴스 메타데이터 서비스 버전 2(IMDSv2)][1]를 사용해야 하도록 설정된 경우, [에이전트 설성][2]에서 `ec2_prefer_imdsv2` 파라미터를 `true`로 설정해야만 이중 청구를 피할 수 있습니다.

Fargate 및 람다 통합 타일 및 커스텀 메트릭을 설정하는 경우 Datadog 청구 금액에 영향을 미칩니다.

ELB, RDS 및 DynamoDB 등 기타 AWS 리소스는 월별 인프라 빌링에 포함되지 않으며 설정 제외는 적용되지 않습니다.

## AWS 리소스 제외

일부 서비스에 대해 수집된 AWS 메트릭을 특정 리소스로 제한할 수 있습니다. [Datadog-AWS 통합 페이지][3]에서 AWS 계정을 선택하고 **메트릭 수집** 탭을 클릭합니다. **특정 리소스로 메트릭 수집 제한**에서 EC2, Lambda, ELB, 애플리케이션 ELB, 네트워크 ELB, RDS, SQS 및 CloudWatch 커스텀 메트릭 중 하나 이상에 대한 메트릭을 제외할 수 있습니다.

{{< img src="account_management/billing/aws-resource-exclusion.png" alt="Datadog AWS 통합 페이지에 있는 AWS 계정의 메트릭 수집 탭에는 AWS 서비스를 선택할 수 있는 드롭다운 메뉴와 키:값 형식으로 태그를 추가할 수 있는 필드가 포함되어 메트릭 수집을 특정 리소스로 제한하는 옵션이 표시되어 있습니다." >}}

또한 [API][4]를 사용해 AWS 메트릭을 제한할 수 있습니다.

**참고**: Datadog에서는 EC2(호스트), 람다(활성 함수) 및 CloudWatch 커스텀 메트릭(커스텀 메트릭)만 청구할 수 있습니다. 필터링할 수 있는 다른 서비스에 대해 통합된 메트릭에는 Datadog 요금이 부과되지 않습니다.

### EC2

EC2 메트릭 리소스 제외 설정은 EC2 인스턴스와 연결된 EBS 볼륨 모두에 적용됩니다. 통합 페이지 내에서 기존 AWS 계정에 제한을 추가하면, 이전에 검색된 인스턴스를 [인프라 목록][5]에 최대 2시간 동안 유지할 수 있습니다. 전환 기간 동안 EC2 인스턴스는 `???` 상태를 표시합니다. 이는 청구에 포함되지 않습니다.

실행 중인 에이전트가 있는 호스트는 계속 표시되며 청구에 포함됩니다. AWS에서 `aws.ec2.*` 메트릭 수집을 제한하고 AWS 리소스 EC2 인스턴스 호스트를 제한하려면 제한 옵션을 사용하세요.

### Kinesis Data Firehose를 사용한 CloudWatch 메트릭 스트림

기본 API 폴링 방법을 사용하는 대신 선택적으로 [CloudWatch Metric Streams 및 Kinesis Data Firehose를 사용하여 CloudWatch 메트릭을 Datadog에 전송][8]할 수 있습니다. 조직에서 Kinesis와 CloudWatch Metric Streams 방법을 사용하는 경우 Datadog AWS 통합 페이지에 정의된 AWS 리소스 제외 규칙이 적용되지 않습니다. AWS 계정의 CloudWatch Metric Streams 설정에 있는 메트릭 네임스페이스 또는 특정 메트릭 이름을 포함하거나 제외하려면 모든 규칙을 관리해야 합니다.

## 트러블슈팅

기술과 관련된 질문이 있다면 [Datadog 고객지원][1]에 문의해 주세요.

빌링과 관련해 궁금한 점이 있다면 [고객 성공][7] 매니저와 상의하세요.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: /ko/api/latest/aws-integration/#set-an-aws-tag-filter
[5]: /ko/infrastructure/
[6]: /ko/help/
[7]: mailto:success@datadoghq.com
[8]: https://docs.datadoghq.com/ko/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?tab=cloudformation#streaming-vs-polling