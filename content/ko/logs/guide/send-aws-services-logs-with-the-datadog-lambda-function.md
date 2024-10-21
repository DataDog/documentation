---
further_reading:
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: /logs/explorer/#visualize
  tag: 설명서
  text: 로그 분석 실행하기
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리하는 방법 배우기
- link: /logs/guide/reduce_data_transfer_fees
  tag: 가이드
  text: 데이터 전송 수수료를 줄이면서 로그를 Datadog로 보내는 방법
title: AWS 서비스 로그 Datadog 람다 전송 함수
---

AWS 서비스 로그는 Datadog 포워더(Forwarder) 람다 함수로 수집할 수 있습니다. 이 S3 Bucket, 클라우드와치(CloudWatch) 로그 그룹 및 EventBridge 이벤트 -포워더 로그를 Datadog로 전달합니다.

AWS 서비스에서 로그 수집을 시작하려면,

1. AWS 계정에서 [Datadog 포워더 람다 함수][1]를 설정합니다.
2. AWS 서비스(대부분 AWS 서비스는 S3 버킷 또는 클라우드와치 로그 그룹에 기록 가능)에 대해 [로깅 활성화](#enable-logging-for-your-aws-service)를 설정합니다.
3. 전달할 로그 새 항목이 있을 때 포워더 람다가 실행되도록 하는 [트리거 설정](#set-up-triggers)을 설정합니다. 트리거를 설정하는 방법에는 두 가지가 있습니다.

**참고**: AWS `us-east-1` 지역에 있는 경우 [Datadog-AWS 비공개 링크][2]를 활용하세요.

**참고**: Cloudformation은 모든 리소스에 대해 KMS:Decrypt를 포함하는 IAM 정책을 생성하며, AWS Security Hub의 모범 사례와 매칭되지 않습니다. 이 권한은 KMS로 암호화된 S3 버킷에서 개체의 암호를 해독하여 람다 함수를 설정하는 데 사용됩니다. S3 버킷을 암호화하는 데 사용되는 KMS 키는 예측할 수 없습니다. 설치가 성공적으로 완료된 후 이 권한을 안전하게 삭제할 수 있습니다.

## AWS 로깅 활성화 서비스

로그를 S3 버킷 또는 클라우드와치(CloudWatch)에 생성하는 AWS 서비스 모두가 지원됩니다. 아래 표에서 가장 많이 사용되는 서비스에 대한 설정 지침을 확인하세요.

| AWS 서비스                        | AWS 서비스 로깅 활성화                                                                                   | Datadog에 AWS 로그 전송                                                                                                     |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [API 게이트웨이][3]                   | [Amazon API 게이트웨이 활성화 로그][4]                                                                            | [수동][5] 및 [자동](#automatically-set-up-triggers) 로그 수집                                                  |
| [Cloudfront][6]                    | [Amazon CloudFront 로그 활성화][7]                                                                             | [수동][8] 및 [자동](#automatically-set-up-triggers) 로그 수집                                                  |
| [CloudTrail][9]                    | [AWS CloudTrail 로그 활성화][9]                                                                                | [수동][10] 로그 수집. Cloud SIEM용 AWS CloudTrail을 설정하는 경우 [Cloud SIEM용 AWS 설정][11]을 참조하세요. |
| [DynamoDB][12]                     | [Amazon DynamoDB 로그 활성화][13]                                                                              | [수동][14] 로그 수집                                                                                                 |
| [EC2][15]                          | `-`                                                                                                            | [Datadog 에이전트][15]를 사용하여 로그를 Datadog에 전송하세요.                                                                    |
| [ECS][16]                          | `-`                                                                                                            | [도커(Docker) 에이전트를 사용하여 로그][17]을 수집합니다.                                                                              |
| [Elastic 로드밸런싱(ELB)][18] | [Amazon ELB 활성화 로그][19]                                                                                   | [수동][20] 및 [자동](#automatically-set-up-triggers) 로그 수집                                                 |
| [람다][21]                       | `-`                                                                                                            | [수동][22] 및 [자동](#automatically-set-up-triggers) 로그 수집                                                 |
| [RDS][23]                          | [Amazon RDS 활성화 로그][24]                                                                                   | [수동][25] 로그 수집                                                                                                |
| [Route 53][26]                     | [Amazon Route 53 로그 활성화][27]                                                                              | [수동][28] 로그 수집                                                                                                 |
| [S3][29]                           | [Amazon S3 로그 활성화][30]                                                                                    | [수동][31] 및 [자동](#automatically-set-up-triggers) 로그 수집                                                 |
| [SNS][32]                          | SNS에서는 로그를 제공하지 않지만, SNS 서비스를 통과하는 로그 및 이벤트를 처리할 수 있습니다. | [수동][33] 로그 수집                                                                                                 |
| [RedShift][34]                     | [Amazon Redshift 로그 활성화][35]                                                                              | [수동][36] 및 [자동](#automatically-set-up-triggers) 로그 수집                                                 |
| [인증된 액세스][37]              | [인증된 액세스 로그 활성화][38]                                                                              | [수동][39] 로그 수집                                                                                                 |
| [VPC][40]                          | [Amazon VPC 로그 활성화][41]                                                                                   | [수동][42] 로그 수집                                                                                                 |
| [Step 함수][52]               | [Amazon Step 함수 로그 활성화][53]                                                                        | [수동][54] 로그 수집                                                                                                 |
| [웹 애플리케이션 방화벽][49]     | [Amazon WAF 로그 활성화][50]                                                                                   | [수동][51] 및 [자동](#automatically-set-up-triggers) 로그 수집                                                                                               |
| [MWAA][55]                         | [Amazon MWAA 로그 활성화][56]                                                                                  | [수동][56] 로그 수집                                                                                                 |


## 트리거 설정

Datadog 포워더(Forwarder) 람다 함수에서 트리거를 설정하는 두 가지 옵션이 있습니다.

- [자동](#automatically-set-up-triggers): Datadog 선택한 AWS 서비스에 대해 로그 위치를 자동으로 검색하여 Datadog 포워더 람다 함수에 트리거로 추가합니다. Datadog 또한 목록을 최신 상태로 유지합니다.
- [수동](#manually-set-up-triggers): 각 트리거를 직접 설정합니다.

### 트리거 자동 설정

Datadog는 Datadog 포워더(Forwarder) 람다 함수에서 자동으로 트리거되도록 설정되어 다음 소스와 위치에서 AWS 로그를 수집할 수 있습니다.

| 소스                      | 위치       |
| --------------------------- | -------------- |
| API 게이트웨이 액세스 로그     | 클라우드와치(CloudWatch)     |
| API Gateway 실행 로그  | 클라우드와치(CloudWatch)     |
| 애플리케이션 ELB 액세스 로그 | S3             |
| 클래식 ELB 액세스 로그     | S3             |
| CloudFront 액세스 로그      | S3             |
| 람다 로그                 | 클라우드와치(CloudWatch)     |
| Redshift 로그               | S3             |
| S3 액세스 로그              | S3             |
| Step Functions              | 클라우드와치(CloudWatch)     |
| 웹 애플리케이션 방화벽    | S3, 클라우드와치(CloudWatch) |

**참고**: [구독 필터][48]는 DatadogForwarder에 의해 자동으로 생성되지 않습니다. 로그 그룹에서 직접 생성하세요.

1. 아직 설정하지 않았다면 [Datadog 로그 컬렉션 AWS 람다 함수][1]를 설정하세요.
2. [Datadog-AWS 통합][43]에 사용되는 IAM 역할의 정책에 다음 권한이 있는지 확인합니다. 이러한 권한이 어떻게 사용되는지에 대한 정보는 아래 설명에서 확인할 수 있습니다.

    ```text
    "cloudfront:GetDistributionConfig",
    "cloudfront:ListDistributions",
    "elasticloadbalancing:DescribeLoadBalancers",
    "elasticloadbalancing:DescribeLoadBalancerAttributes",
    "lambda:List*",
    "lambda:GetPolicy",
    "redshift:DescribeClusters",
    "redshift:DescribeLoggingStatus",
    "s3:GetBucketLogging",
    "s3:GetBucketLocation",
    "s3:GetBucketNotification",
    "s3:ListAllMyBuckets",
    "s3:PutBucketNotification",
    "states:ListStateMachines",
    "states:DescribeStateMachine",
    "wafv2:ListLoggingConfigurations",
    "logs:PutSubscriptionFilter",
    "logs:DeleteSubscriptionFilter",
    "logs:DescribeSubscriptionFilters"
    ```

    | AWS 권한                                              | 설명                                                                  |
    | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
    | `cloudfront:GetDistributionConfig` | CloudFront 액세스 로그가 포함된 S3 버킷 이름을 가져옵니다.             |
    | `cloudfront:ListDistributions`                              | 모든 CloudFront 분포를 목록화합니다.                                            |
    | `elasticloadbalancing:`<br>`DescribeLoadBalancers`          | 모든 로드 밸런서를 목록화합니다.                                                     |
    | `elasticloadbalancing:`<br> `DescribeLoadBalancerAttributes` | ELB 액세스가 포함된 S3 버킷의 이름 가져오기 로그.                    |
    | `lambda:List*` | 모든 람다 함수를 목록화합니다.                                                   |
    | `lambda:GetPolicy` | 트리거가 제거될 때 람다 정책을 가져옵니다.                      |
    | `redshift:DescribeClusters`                                 | Redshift 클러스터를 모두 목록화합니다.                                                  |
    | `redshift:DescribeLoggingStatus`                            | Redshift가 포함된 S3 버킷 이름을 가져옵니다.                      |
    | `s3:GetBucketLogging`                                       | S3 액세스 로그가 포함된 S3 버킷의 이름을 가져옵니다.                     |
    | `s3:GetBucketLocation`                                      | S3 액세스 로그가 포함된 S3 버킷 지역을 가져옵니다.                   |
    | `s3:GetBucketNotification`                                  | 기존 람다 트리거 설정을 가져옵니다.                                  |
   List all S3 buckets.
    | `s3:PutBucketNotification`                                  | S3 버킷 이벤트 기반 람다 트리거를 추가하거나 제거합니다.                  |
    | `states:ListStateMachines`                                  | 모든 Step 함수를 목록화합니다.                                           |
    | `states:DescribeStateMachine`                               | Step 함수에 대한 로깅 상세 정보를 가져옵니다.                             |
    | `wafv2:ListLoggingConfigurations`                           | 웹 애플리케이션 방화벽의 모든 로깅 설정을 목록화합니다.            |
    | `logs:PutSubscriptionFilter`                                | 클라우드와치(CloudWatch) 로그 이벤트 기반으로 람다 트리거를 추가합니다.                          |
    | `logs:DeleteSubscriptionFilter` | 클라우드와치(CloudWatch) 로그를 남기다 이벤트 에 기반하여 람다 트리거를 제거합니다.
    | `logs:DescribeSubscriptionFilters`                          | 지정된 로그 그룹에 대한 구독 필터를 목록화합니다                  |

3. [AWS 통합 페이지][44]에서 AWS 계정을 선택해 로그를 수집할 AWS 계정을 선택하고 **로그 수집** 탭을 클릭합니다.
   {{< img src="logs/aws/aws_log_setup_step1.png" alt="The Log Collection tab of the AWS integration page for a specific AWS account with instructions to send AWS Services logs and a textbox to autosubscribe the Forwarder Lambda function by entering the ARN of the Forwarder Lambda function" popup="true" style="width:90%;" >}}
4. 이전 섹션에서 생성한 람다의 ARN을 입력하고 **추가**를 클릭합니다.
5. 로그를 수집하려는 서비스를 선택하고 **저장**을 클릭합니다. 특정 서비스에서 로그 수집을 중지하려면 로그를 선택 해제합니다.
   {{< img src="logs/aws/aws_log_setup_step2.png" alt="The Log Collection tab of the AWS integration page for a specific AWS account with one Lambda function successfully entered under Included ARNs and some of the services enabled under Log Sources" popup="true" style="width:90%;" >}}
6. 여러 지역의 로그를 보유하고 있는 경우 해당 지역에 람다 함수를 추가로 생성하여 이 페이지에 입력해야 합니다.
7. 모든 AWS 로그 수집을 중지하려면 람다 위로 마우스를 가져간 다음 삭제 아이콘을 클릭합니다. 해당 함수에 대한 모든 트리거가 제거됩니다.
8. 이 초기 설정 후 몇 분 내에 Datadog [로그 탐색기][45]에 AWS 로그가 나타납니다.

### 트리거 수동 설정

#### 클라우드와치(CloudWatch) 로그 그룹에서 로그 수집

클라우드와치(CloudWatch) 그룹에서 로그를 수집하는 경우 다음 방법 중 하나를 사용하여 [Datadog 포워더(Forwarder) 람다 함수][1] 트리거를 설정합니다.

{{< tabs >}}
{{% tab "AWS console" %}}

1. AWS 콘솔에서 **람다**로 이동합니다. 
2. **함수**를 클릭하고 Datadog 포워더(Forwarder)를 선택합니다.
3. **트리거 추가**를 클릭하고 **클라우드와치(CloudWatch) 로그**를 선택합니다.
4. 드롭다운 메뉴에서 로그 그룹을 선택합니다.
5. 필터의 이름을 입력하고 선택적으로 필터 패턴을 지정합니다.
6. **Add**를 클릭합니다.
7. [Datadog 로그 섹션][1]으로 이동하여 로그 그룹으로 전송된 새로운 로그 이벤트를 살펴보세요.

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Terraform 사용자의 경우, 트리거를 프로비저닝하고 관리하기 위해 [aws_cloudwatch_log_subscription_filter][1] 리소스를 사용할 수 있습니다. 아래 샘플 코드를 참조하세요.

```conf
resource "aws_cloudwatch_log_subscription_filter" "datadog_log_subscription_filter" {
  name            = "datadog_log_subscription_filter"
  log_group_name  = <CLOUDWATCH_LOG_GROUP_NAME> # 예: /aws/lambda/my_lambda_name
  destination_arn = <DATADOG_FORWARDER_ARN> # 예: arn:aws:lambda:us-east-1:123:function:datadog-forwarder
  filter_pattern  = ""
}
```

[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_subscription_filter
{{% /tab %}}
{{% tab "CloudFormation" %}}

AWS CloudFormation 사용자의 경우, CloudFormation [AWS::Logs::SubscriptionFilter][1] 리소스를 사용하여 트리거를 프로비저닝하고 관리할 수 있습니다. 아래 샘플 코드를 참조하세요.

샘플 코드는 AWS [SAM][2] 및 [서버리스 프레임워크][3]에서도 작동합니다. 서버리스 프레임워크의 경우 `serverless.yml`의 [리소스][4] 섹션 아래에 코드를 넣으세요.

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
[2]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html
[3]: https://www.serverless.com/
[4]: https://www.serverless.com/framework/docs/providers/aws/guide/resources/
{{% /tab %}}
{{< /tabs >}}

#### S3 버킷에서 로그 수집

S3 버킷에서 로그를 수집하는 경우, 다음 방법 중 하나를 사용하여 [Datadog 포워더(Forwarder) 람다 함수][1] 트리거를 설정합니다.

{{< tabs >}}
{{% tab "AWS Console" %}}

1. 람다 함수가 설치되면 AWS 콘솔에서 로그가 포함된 S3 버킷에 트리거를 수동으로 추가합니다.
  {{< img src="logs/aws/adding_trigger.png" alt="Adding trigger" popup="true"style="width:80%;">}}

2. 버킷을 선택한 다음 AWS 안내를 따릅니다.
  {{< img src="logs/aws/integration_lambda.png" alt="Integration Lambda" popup="true" style="width:80%;">}}

3. S3 버킷에 올바른 이벤트 유형을 설정합니다.
  {{< img src="logs/aws/object_created.png" alt="Object Created" popup="true" style="width:80%;">}}

완료되면 [Datadog 로그 섹션][1]으로 이동하여 로그 탐색을 시작합니다.

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Terraform 사용자의 경우, [aws_s3_bucket_notification][1] 리소스를 사용하여 트리거를 프로비저닝하고 관리할 수 있습니다. 아래 샘플 코드를 참조하세요.

```conf
resource "aws_s3_bucket_notification" "my_bucket_notification" {
  bucket = my_bucket
  lambda_function {
    lambda_function_arn = "<DATADOG_FORWARDER_ARN>"
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "AWSLogs/"
    filter_suffix       = ".log"
  }
}
```


[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_notification
{{% /tab %}}
{{% tab "CloudFormation" %}}

CloudFormation 사용자의 경우, S3 버킷에 대해 CloudFormation [NotificationConfiguration][1]을 사용하여 트리거를 설정할 수 있습니다. 아래 샘플 코드를 참조하세요.

```yaml
Resources:
  Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: "<MY_BUCKET>"
      NotificationConfiguration:
        LambdaConfigurations:
        - Event: 's3:ObjectCreated:*'
          Function: "<DATADOG_FORWARDER_ARN>"
```


[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-s3-bucket-notificationconfig.html
{{% /tab %}}
{{< /tabs >}}


## 스크러빙 및 필터링

람다 함 에서 보낸 이메일 또는 IP 주소(로그)를 스크러빙하거나 [람다 파라미터][46]에서 커스텀 스크러빙 규칙을 정의할 수 있습니다.
[필터링 옵션][47]을 사용하여 특정 패턴과 일치하는 로그만 제외하거나 보낼 수도 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/serverless/forwarder/
[2]: /ko/serverless/forwarder#aws-privatelink-support
[3]: /ko/integrations/amazon_api_gateway/
[4]: /ko/integrations/amazon_api_gateway/#log-collection
[5]: /ko/integrations/amazon_api_gateway/#send-logs-to-datadog
[6]: /ko/integrations/amazon_cloudfront/
[7]: /ko/integrations/amazon_cloudfront/#enable-cloudfront-logging
[8]: /ko/integrations/amazon_cloudfront/#send-logs-to-datadog
[9]: /ko/integrations/amazon_cloudtrail/#enable-cloudtrail-logging
[10]: /ko/integrations/amazon_cloudtrail/#send-logs-to-datadog
[11]: /ko/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[12]: /ko/integrations/amazon_dynamodb/#enable-dynamodb-logging
[13]: /ko/integrations/amazon_dynamodb/
[14]: /ko/integrations/amazon_dynamodb/#send-logs-to-datadog
[15]: /ko/integrations/amazon_ec2/
[16]: /ko/integrations/amazon_ecs/
[17]: /ko/integrations/amazon_ecs/#log-collection
[18]: /ko/integrations/amazon_elb/
[19]: /ko/integrations/amazon_elb/#enable-aws-elb-logging
[20]: /ko/integrations/amazon_elb/#manual-installation-steps
[21]: /ko/integrations/amazon_lambda/
[22]: /ko/integrations/amazon_lambda/#log-collection
[23]: /ko/integrations/amazon_rds/
[24]: /ko/integrations/amazon_rds/#enable-rds-logging
[25]: /ko/integrations/amazon_rds/#send-logs-to-datadog
[26]: /ko/integrations/amazon_route53/
[27]: /ko/integrations/amazon_route53/#enable-route53-logging
[28]: /ko/integrations/amazon_route53/#send-logs-to-datadog
[29]: /ko/integrations/amazon_s3/
[30]: /ko/integrations/amazon_s3/#enable-s3-access-logs
[31]: /ko/integrations/amazon_s3/#manual-installation-steps
[32]: /ko/integrations/amazon_sns/
[33]: /ko/integrations/amazon_sns/#send-logs-to-datadog
[34]: /ko/integrations/amazon_redshift/
[35]: /ko/integrations/amazon_redshift/#enable-aws-redshift-logging
[36]: /ko/integrations/amazon_redshift/#log-collection
[37]: /ko/integrations/aws_verified_access/
[38]: /ko/integrations/aws_verified_access/#enable-verified-access-logs
[39]: /ko/integrations/aws_verified_access/#log-collection
[40]: /ko/integrations/amazon_vpc/
[41]: /ko/integrations/amazon_vpc/#enable-vpc-flow-log-logging
[42]: /ko/integrations/amazon_vpc/#log-collection
[43]: /ko/integrations/amazon_web_services/
[44]: https://app.datadoghq.com/integrations/amazon-web-services
[45]: https://app.datadoghq.com/logs
[46]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-scrubbing-optional
[47]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-filtering-optional
[48]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters
[49]: /ko/integrations/amazon_waf/
[50]: /ko/integrations/amazon_waf/#log-collection
[51]: /ko/integrations/amazon_waf/#send-logs-to-datadog
[52]: /ko/integrations/amazon_step_functions/
[53]: /ko/integrations/amazon_step_functions/#log-collection
[54]: /ko/integrations/amazon_step_functions/#send-logs-to-datadog
[55]: /ko/integrations/amazon_mwaa/
[56]: /ko/integrations/amazon_mwaa/#log-collection