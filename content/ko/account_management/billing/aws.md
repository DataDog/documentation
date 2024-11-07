---
aliases:
- /ko/integrations/faq/i-can-t-filter-out-my-elb-instances-will-i-be-charged-for-them/
title: AWS 통합 빌링
---

## 개요

Datadog은 Datadog Agent를 실행하는 AWS 호스트와 Datadog-AWS 통합으로 선택된 모든 EC2 인스턴스에 대해 요금을 청구합니다. AWS 통합을 통해 선택된 EC2 인스턴스에서 Agent를 실행하는 경우 **비용이 두 번 청구되지 않습니다**.

**중요**: Datadog는 EC2 인스턴스 메타데이터를 사용하여 Agent를 실행하고 AWS 통합에 의해 크롤링되는 호스트에 대해 두 번 요금이 청구되지 않도록 합니다. EC2 인스턴스가 [인스턴스 메타데이터 서비스 버전 2(IMDSv2)][1]을 사용하도록 구성된 경우 이중 청구를 방지하려면 [Agent 설정][2]에서 파라미터 `ec2_prefer_imdsv2`를 `true`로 설정해야 합니다.

Fargate 및 Lambda 통합 타일과 커스텀 메트릭을 설정하면 Datadog 청구서에 영향을 미칩니다.

ELB, RDS 및 DynamoDB와 같은 기타 AWS 리소스는 월별 인프라스트럭처 청구에 포함되지 않으며 설정 제외가 적용되지 않습니다.

## AWS 리소스 제외

일부 서비스에 대해 수집된 AWS 메트릭을 특정 리소스로 제한할 수 있습니다. [Datadog-AWS 통합 페이지][3]에서 AWS 계정을 선택하고 **Metric Collection** 탭을 클릭합니다. **Limit Metric Collection to Specific Resources**에서 EC2, Lambda, ELB, Application ELB, Network ELB, RDS, SQS 및 CloudWatch 커스텀 메트릭 중 하나 이상에 대한 메트릭을 제외할 수 있습니다.

{{< img src="account_management/billing/aws-resource-exclusion.png" alt="Datadog AWS 통합 페이지에 있는 AWS 계정의 메트릭 수집 탭에는 AWS 서비스를 선택할 수 있는 드롭다운 메뉴와 키:값 형식으로 태그를 추가할 수 있는 필드가 포함되어 메트릭 수집을 특정 리소스로 제한하는 옵션이 표시되어 있습니다." >}}

[API][4]를 사용하여 AWS 메트릭을 제한할 수도 있습니다.

**참고**: Datadog에서는 EC2(호스트), Lambda(활성 함수) 및 CloudWatch Custom Metrics (커스텀 메트릭)만 청구할 수 있습니다. 필터링할 수 있는 다른 서비스에 대해 통합된 메트릭은 Datadog 요금이 발생하지 않습니다.

### EC2

EC2 메트릭 리소스 제외 설정은 EC2 인스턴스와 연결된 모든 EBS 볼륨에 적용됩니다. 통합 페이지 내에서 기존 AWS 계정에 제한을 추가하면 이전에 검색된 인스턴스가 [인프라스트럭처 목록][5]에 최대 2시간 동안 유지될 수 있습니다. 전환 기간 동안 EC2 인스턴스는 `???` 상태를 표시합니다. 이는 청구에 포함되지 않습니다.

실행 중인  Agent가 있는 호스트는 계속 표시되며 청구에 포함됩니다. AWS에서 `aws.ec2.*` 메트릭 수집을 제한하고 AWS 리소스 EC2 인스턴스 호스트를 제한하려면 제한 옵션을 사용하세요.

#### 예시

다음 필터는 `datadog:no` 태그가 포함된 모든 EC2 인스턴스를 제외합니다.

```
!datadog:no
```

다음 필터는 `datadog:monitored` 태그 **또는** `env:production` 태그 **또는** `c1.*` 값이 있는 `instance-type` 태그를 포함하고 `region:us-east-1` 태그를 포함하지 **않는** EC2 인스턴스에서만 메트릭을 수집합니다.

```
datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1
```
**참고**: Datadog에서는 대문자가 소문자로 변경되고 공백이 밑줄로 대체됩니다. 예를 들어 `Team:Frontend App` 태그가 있는 EC2 인스턴스에서 메트릭을 수집하려면 Datadog에서 적용된 태그가 `team:frontend_app`이어야 합니다.

### Amazon Data Firehose와 CloudWatch Metric Streams

필요한 경우 기본 API 폴링 방법을 사용하는 대신 [CloudWatch Metric Streams 및 Amazon Data Firehose를 사용하여 CloudWatch 메트릭을 Datadog에 전송][8]할 수 있습니다. 조직에서 Kinesis 방식으로 CloudWatch Metric Streams를 사용하는 경우 Datadog AWS 통합 페이지에 정의된 AWS 리소스 제외 규칙이 적용되지 않습니다. AWS 콘솔 내의 각 AWS 계정에 대한 CloudWatch Metric Streams 구성에서 메트릭 네임스페이스 또는 특정 메트릭 이름을 포함하거나 제외하기 위한 모든 규칙을 관리해야 합니다.

## 트러블슈팅

기술 지원이 필요하신 경우 [Datadog 지원팀][6]에 문의하세요.

청구 관련 질문은 [고객 성공][7] 관리자에게 문의하세요.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: /ko/api/latest/aws-integration/#set-an-aws-tag-filter
[5]: /ko/infrastructure/
[6]: /ko/help/
[7]: mailto:success@datadoghq.com
[8]: /ko/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?tab=cloudformation#streaming-vs-polling