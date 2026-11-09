---
further_reading:
- link: https://learn.datadoghq.com/courses/send-aws-logs
  tag: 학습 센터
  text: AWS 로그 전송
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: 학습 센터
  text: Datadog으로 AWS Lambda를 Serverless Monitoring에 맞춰 구성
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: /logs/explorer/#visualize
  tag: 설명서
  text: 로그 분석 수행
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
- link: /logs/guide/reduce_data_transfer_fees
  tag: 가이드
  text: 데이터 전송 수수료를 줄이면서 로그를 Datadog로 보내는 방법
title: Datadog Lambda 함수를 사용하여 AWS 서비스 로그 전송
---
AWS 서비스 로그는 Datadog Forwarder Lambda 함수를 사용하여 수집할 수 있습니다. 이 Lambda 함수는 S3 버킷, CloudWatch 로그 그룹 및 EventBridge 이벤트를 트리거로 사용하며, 수집된 로그를 Datadog으로 전달합니다.

AWS 서비스 로그 수집을 시작하려면 다음 단계를 수행합니다.

1. AWS 계정에서 [Datadog Forwarder Lambda 함수][1]를 설정합니다.
2. AWS 서비스의 로깅을 활성화합니다. [지원되는 AWS 서비스](#supported-aws-services)에서 서비스를 찾아 설정 지침을 확인합니다. 대부분의 AWS 서비스는 S3 버킷이나 CloudWatch 로그 그룹에 로그를 기록할 수 있습니다.
전달할 새로운 로그가 있을 때 Forwarder Lambda가 실행되도록 3. [트리거를 설정](#set-up-triggers)합니다. 트리거를 구성하는 방법은 두 가지가 있습니다.

**참고**:
   - [AWS PrivateLink][2]를 사용하여 전용 연결을 통해 로그를 전송할 수 있습니다.
   - CloudFormation은 모든 리소스에 대해 `KMS:Decrypt` 권한을 포함하는 IAM 정책을 생성하며, 이는 AWS Security Hub의 권장 모범 사례와 일치하지 않습니다. 이 권한은 Lambda 함수 설정 과정에서 KMS로 암호화된 S3 버킷의 객체를 복호화하는 데 사용되며, S3 버킷을 암호화하는 데 사용된 KMS 키는 예측할 수 없습니다. 설치가 성공적으로 완료된 후 이 권한을 안전하게 삭제할 수 있습니다.

## 지원되는 AWS 서비스 {#supported-aws-services}

Datadog Forwarder Lambda 함수는 S3 버킷이나 CloudWatch 로그 그룹으로 로그를 생성하는 모든 AWS 서비스를 지원합니다. 다음 표에는 로그를 수집할 수 있는 AWS 서비스가 나열되어 있습니다.

- **AWS 서비스**: 로그를 생성하는 AWS 서비스입니다. 각 서비스 이름은 해당 로그 수집 설정 지침으로 연결됩니다. 링크가 없는 서비스는 서비스 측 설정이 필요하지 않습니다.
- **로그 소스**: Datadog이 로그에 적용하는 `source` 태그입니다. [로그 탐색기][40]에서 로그를 검색할 때 사용합니다.
- **스토리지**: Forwarder가 수집하는 로그를 AWS 서비스가 기록할 수 있는 위치입니다.
- **자동 수집**: Datadog이 해당 로그 소스에 대한 [트리거를 자동으로 설정](#automatically-set-up-triggers)할 수 있는지 여부입니다. 그렇지 않은 경우, [트리거를 수동으로 설정합니다](#manually-set-up-triggers).

| AWS 서비스                        | 로그 소스                    | 스토리지        | 자동 수집 |
| ---------------------------------- | ----------------------------- | -------------- | -------------------- |
| [API Gateway][3]                   | `source:apigateway`           | CloudWatch, S3 | Yes                  |
| [AppSync][4]                       | `source:appsync`              | CloudWatch     | Yes                  |
| Batch                              | `source:batch`                | CloudWatch     | Yes                  |
| [Bedrock][5]                       | `source:bedrock`              | CloudWatch, S3 | No                   |
| Bedrock Agentcore                  | `source:bedrock-agentcore`    | CloudWatch, S3 | 예                  |
| [CloudFront][6]                    | `source:cloudfront`           | CloudWatch, S3 | Yes                  |
| [CloudTrail][7]                    | `source:cloudtrail`           | CloudWatch, S3 | 예                  |
| [CodeBuild][8]                     | `source:codebuild`            | CloudWatch, S3 | Yes                  |
| [DMS][9]                           | `source:dms`                  | CloudWatch, S3 | Yes                  |
| [DocumentDB][10]                   | `source:docdb`                | CloudWatch, S3 | Yes                  |
| [ECS][11]                          | `source:ecs`                  | CloudWatch     | Yes                  |
| [EKS][12]                          | `source:eks` <sup>1</sup>     | CloudWatch     | Yes                  |
| [Elastic Beanstalk][13]            | - <sup>2</sup>                | CloudWatch     | Yes                  |
| [Elastic Load Balancing(ELB)][14] | `source:elb`                  | CloudWatch, S3 | Yes                  |
| [FSx][15]                          | `source:aws.fsx`              | CloudWatch, S3 | No                   |
| [Glue][16]                         | `source:glue`                 | CloudWatch, S3 | Yes                  |
| [IoT][17]                          | `source:iot`                  | CloudWatch     | Partial <sup>3</sup> |
| [Lambda][18]                       | `source:lambda`               | CloudWatch     | Yes                  |
| Lambda@Edge                        | `source:lambda`               | CloudWatch     | Yes                  |
| Lambda MicroVMs                    | `source:lambda`               | CloudWatch     | Yes                  |
| [MWAA][19]                         | `source:mwaa`                 | CloudWatch     | Yes                  |
| [Network Firewall][20]             | `source:network-firewall`     | CloudWatch, S3 | Yes                  |
| [OpenSearch][21]                   | `source:opensearch`           | CloudWatch     | No                   |
| [PCS][22]                          | - <sup>2</sup>                | CloudWatch     | Partial <sup>4</sup> |
| [RDS][23]                          | `source:rds` <sup>5</sup>     | CloudWatch     | Yes                  |
| [Redshift][24]                     | `source:redshift`             | CloudWatch, S3 | Yes                  |
| Redshift Serverless                | `source:redshift-serverless`  | CloudWatch     | Yes                  |
| [Route 53][25]                     | `source:route53` <sup>6</sup> | CloudWatch     | Yes                  |
| [S3][26]                           | `source:s3`                   | S3             | Yes                  |
| SSM                                | `source:ssm`                  | CloudWatch     | Yes                  |
| [Step Functions][27]               | `source:stepfunction`         | CloudWatch     | Yes                  |
| [Transit Gateway][28]              | `source:transitgateway`       | CloudWatch, S3 | No                   |
| [Verified Access][29]              | `source:verified-access`      | CloudWatch, S3 | Yes                  |
| [VPC][30]                          | `source:vpc`                  | CloudWatch, S3 | Yes                  |
| [VPN][31]                          | - <sup>2</sup>                | CloudWatch, S3 | Yes <sup>7</sup>     |
| [Web Application Firewall][32]     | `source:waf`                  | S3             | Yes                  |

<sup>1</sup> EKS 컨트롤 플레인 로그는 `kubernetes.audit`, `kube-scheduler`, `kube-apiserver`, `kube-controller-manager` 및 `aws-iam-authenticator` 소스도 사용합니다.<br>
<sup>2</sup> Datadog은 이러한 로그에 서비스별 소스 태그를 적용하지 않습니다.<br>
<sup>3</sup> IoT에 대한 자동 수집은 계정 수준에서만 가능합니다.<br>
<sup>4</sup> PCS에 대한 자동 수집은 CloudWatch 로그 그룹에 대해서만 가능합니다.<br>
<sup>5</sup> RDS 엔진 로그는 `postgresql`, `mariadb` 및 `mysql` 소스도 사용합니다.<br>
<sup>6</sup> DNS 쿼리 로그와 Resolver 쿼리 로그를 모두 포함합니다.<br>
<sup>7</sup> CloudWatch 로그 그룹에 대해 자동 수집을 사용할 수 있습니다. S3 버킷의 경우 [트리거를 수동으로 설정합니다](#collecting-logs-from-s3-buckets).

**참고**: Datadog Forwarder는 CloudWatch 로그 그룹에 [구독 필터][43]를 자동으로 생성합니다. 각 필터의 이름은 `DD_LOG_SUBSCRIPTION_FILTER_<LOG_GROUP_NAME>` 형식으로 지정됩니다.

### 다른 방법으로 수집되는 서비스 {#services-collected-through-another-method}

다음 AWS 서비스는 로그 수집을 지원하지만, Datadog Forwarder Lambda 함수를 동일한 방식으로 사용하지 않습니다.

| AWS 서비스    | 로그 수집 방법                                                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [DynamoDB][33] | DynamoDB는 자체 로그를 생성하지 않습니다. API 활동은 CloudTrail을 통해 캡처됩니다. [Datadog에 로그 보내기][34]를 참조하세요.                           |
| [EC2][35]      | [Datadog Agent][35]를 사용하여 로그를 Datadog에 전송합니다.                                                                                      |
| [SNS][36]      | SNS에서는 로그를 제공하지 않지만, SNS 서비스를 통과하는 로그 및 이벤트를 처리할 수 있습니다. [Datadog에 로그 보내기][37]를 참조하세요.  |

## 트리거 설정 {#set-up-triggers}

Datadog Forwarder Lambda 함수에 트리거를 구성하는 방법은 두 가지가 있습니다.

- [자동](#automatically-set-up-triggers): Datadog이 선택된 AWS 서비스의 로그 위치를 자동으로 검색하여 Datadog Forwarder Lambda 함수에 트리거를 추가합니다. Datadog이 트리거 목록을 최신 상태로 유지합니다.
- [수동](#manually-set-up-triggers): 각 트리거를 직접 설정합니다.

### 트리거 자동 설정 {#automatically-set-up-triggers}

Datadog은 Datadog Forwarder Lambda 함수의 트리거를 자동으로 구성하여 AWS 로그를 수집할 수 있습니다. 그러나 자동 구독은 서로 다른 AWS 계정이나 리전에서 트리거를 생성하는 것을 지원하지 않습니다. 로그가 다른 AWS 계정의 S3 버킷에 게시되는 경우에는 이 제한을 우회하기 위해 S3 버킷과 동일한 계정에서 수동으로 트리거를 생성하는 것이 권장됩니다.

자동 수집을 지원하는 서비스와 해당 서비스가 지원하는 스토리지 위치를 확인하려면 [지원되는 AWS 서비스](#supported-aws-services)를 참조하세요.

1. 아직 설정하지 않았다면 [Datadog 로그 수집 AWS Lambda 함수][1]를 설정하세요.
2. [Datadog-AWS 통합][38]에 사용되는 IAM 역할의 정책에 다음 권한이 포함되어 있는지 확인합니다. 이 권한들이 사용되는 방식에 대한 자세한 내용은 아래 설명에서 찾을 수 있습니다.

    ```text
    "airflow:GetEnvironment",
    "airflow:ListEnvironments",
    "appsync:ListGraphqlApis",
    "batch:DescribeJobDefinitions",
    "cloudfront:GetDistributionConfig",
    "cloudfront:ListDistributions",
    "cloudtrail:GetTrail",
    "cloudtrail:ListTrails",
    "codebuild:BatchGetProjects",
    "codebuild:ListProjects",
    "dms:DescribeReplicationInstances",
    "ec2:DescribeFlowLogs",
    "ec2:DescribeVerifiedAccessInstanceLoggingConfigurations",
    "ec2:DescribeVpnConnections",
    "ecs:DescribeTaskDefinition",
    "ecs:ListTaskDefinitionFamilies",
    "eks:DescribeCluster",
    "eks:ListClusters",
    "elasticbeanstalk:DescribeEnvironments",
    "elasticloadbalancing:DescribeLoadBalancerAttributes",
    "elasticloadbalancing:DescribeLoadBalancers",
    "glue:BatchGetJobs",
    "glue:GetJobs",
    "glue:GetJob",
    "glue:ListJobs",
    "iot:GetV2LoggingOptions",
    "lambda:GetMicrovmImageVersion",
    "lambda:GetPolicy",
    "lambda:InvokeFunction",
    "lambda:List*",
    "logs:DeleteSubscriptionFilter",
    "logs:DescribeDeliveries",
    "logs:DescribeDeliverySources",
    "logs:DescribeLogGroups",
    "logs:DescribeSubscriptionFilters",
    "logs:GetDeliveryDestination",
    "logs:PutSubscriptionFilter",
    "network-firewall:DescribeLoggingConfiguration",
    "network-firewall:ListFirewalls",
    "rds:DescribeDBClusters",
    "rds:DescribeDBInstances",
    "redshift-serverless:ListNamespaces",
    "redshift:DescribeClusters",
    "redshift:DescribeLoggingStatus",
    "route53:ListQueryLoggingConfigs",
    "route53resolver:ListResolverQueryLogConfigs",
    "s3:GetBucketLocation",
    "s3:GetBucketLogging",
    "s3:GetBucketNotification",
    "s3:ListAllMyBuckets",
    "s3:PutBucketNotification",
    "ssm:GetServiceSetting",
    "ssm:ListCommands",
    "states:DescribeStateMachine",
    "states:ListStateMachines",
    "wafv2:ListLoggingConfigurations"
    ```

    | AWS Permission                                              | Description                                                                  |
    | ----------------------------------------------------------- | ---------------------------------------------------------------------------- |
    | `airflow:ListEnvironments`                                  | List all MWAA environment names.                                             |
    | `airflow:GetEnvironment`                                    | Get information about a MWAA environment.                                    |
    | `appsync:ListGraphqlApis`                                   | List all GraphQL Apis.                                                       |
    | `batch:DescribeJobDefinitions`                              | List all Batch job definitions.                                              |
    | `cloudfront:GetDistributionConfig`                          | Get the name of the S3 bucket containing CloudFront access logs.             |
    | `cloudfront:ListDistributions`                              | List all CloudFront distributions.                                           |
    | `cloudtrail:GetTrail`                                       | Get Trail logging information.                                               |
    | `cloudtrail:ListTrails`                                     | List all Cloudtrail trails.                                                  |
    | `codebuild:BatchGetProjects`                                | List all CodeBuild projects.                                                 |
    | `codebuild:ListProjects`                                    | Get information on CodeBuild projects.                                       |
    | `dms:DescribeReplicationInstances`                          | List all replication instances for DMS.                                      |
    | `ec2:DescribeFlowLogs`                                      | List all Flow log configurations.                                            |
    | `ec2:DescribeVerifiedAccessInstanceLoggingConfigurations`   | List all Verified Access instance logging configurations.                    |
    | `ec2:DescribeVpnConnections`                                | List all VPN connections.                                                    |
    | `ecs:DescribeTaskDefinition`                                | Describe ECS task definition.                                                |
    | `ecs:ListTaskDefinitionFamilies`                            | List all task definition families.                                           |
    | `elasticloadbalancing:`<br>`DescribeLoadBalancers`          | List all load balancers.                                                     |
    | `elasticloadbalancing:`<br>`DescribeLoadBalancerAttributes` | Get the name of the S3 bucket containing ELB access logs.                    |
    | `glue:BatchGetJobs`                                             | Get information about multiple Glue jobs.                                    |
    | `glue:GetJob`                                               | Get information about a Glue job.                                            |
    | `glue:GetJobs`                                              | List all Glue jobs.                                                          |
    | `glue:ListJobs`                                             | List all Glue job names.                                                     |
    | `eks:DescribeCluster`                                       | Describe an EKS cluster.                                                     |
    | `eks:ListClusters`                                          | List all EKS clusters.                                                       |
    | `elasticbeanstalk:DescribeEnvironments`                     | List all Elastic Beanstalk environments.                                     |
    | `iot:GetV2LoggingOptions`                                   | Get IoT V2 logging options.                                                  |
    | `lambda:InvokeFunction`                                     | Invoke a Lambda function.                                                    |
    | `lambda:List*`                                              | List all Lambda functions.                                                   |
    | `lambda:GetPolicy`                                          | Get the Lambda policy when triggers are to be removed.                       |
    | `lambda:GetMicrovmImageVersion`                             | Get information about a Lambda MicroVM image version.                        |
    | `logs:PutSubscriptionFilter`                                | Add a Lambda trigger based on CloudWatch Log events.                         |
    | `logs:DeleteSubscriptionFilter`                             | Remove a Lambda trigger based on CloudWatch Log events.                      |
    | `logs:DescribeLogGroups`                                    | Describe CloudWatch log groups.                                              |
    | `logs:DescribeDeliveries`                                   | Describe CloudWatch log deliveries.                                          |
    | `logs:DescribeDeliverySources`                              | Describe CloudWatch log delivery sources.                                    |
    | `logs:DescribeSubscriptionFilters`                          | List the subscription filters for the specified log group.                   |
    | `logs:GetDeliveryDestination`                               | Get a CloudWatch log delivery destination.                                   |
    | `network-firewall:DescribeLoggingConfiguration`             | Get the logging configuration of a firewall.                                 |
    | `network-firewall:ListFirewalls`                            | List all Network Firewall firewalls.                                         |
    | `rds:DescribeDBClusters`                                    | List all RDS clusters.                                                       |
    | `rds:DescribeDBInstances`                                   | List all RDS instances.                                                      |
    | `redshift:DescribeClusters`                                 | List all Redshift clusters.                                                  |
    | `redshift:DescribeLoggingStatus`                            | Get the name of the S3 bucket containing Redshift Logs.                      |
    | `redshift-serverless:ListNamespaces`                        | List all Redshift Serverless namespaces.                                     |
    | `route53:ListQueryLoggingConfigs`                           | List all DNS query logging configurations for Route 53.                      |
    | `route53resolver:ListResolverQueryLogConfigs`               | List all Resolver query logging configurations for Route 53.                 |
    | `s3:GetBucketLogging`                                       | Get the name of the S3 bucket containing S3 access logs.                     |
    | `s3:GetBucketLocation`                                      | Get the region of the S3 bucket containing S3 access logs.                   |
    | `s3:GetBucketNotification`                                  | Get existing Lambda trigger configurations.                                  |
    | `s3:ListAllMyBuckets`                                       | List all S3 buckets.                                                         |
    | `s3:PutBucketNotification`                                  | Add or remove a Lambda trigger based on S3 bucket events.                    |
    | `ssm:GetServiceSetting`                                     | Get the SSM service setting for customer script log group name.              |
    | `ssm:ListCommands`                                          | List all SSM commands.                                                       |
    | `states:ListStateMachines`                                  | List all Step Functions.                                                     |
    | `states:DescribeStateMachine`                               | Get logging details about a Step Function.                                   |
    | `wafv2:ListLoggingConfigurations`                           | List all logging configurations of the Web Application Firewall.             |


3. [AWS 통합 페이지][39]에서 로그를 수집할 AWS 계정을 선택하고 {{< ui >}}Log Collection{{< /ui >}} 탭을 클릭합니다.
4. {{< ui >}}Datadog Forwarder Lambda{{< /ui >}} 섹션에서 앞 단계에서 생성한 Lambda의 ARN을 입력하고 {{< ui >}}Add{{< /ui >}}를 클릭합니다. Lambda 함수는 아래 표에 이름, 버전 및 리전과 함께 표시됩니다.
5. {{< ui >}}Log Autosubscription{{< /ui >}} 섹션의 {{< ui >}}Log Sources{{< /ui >}} 아래에서 로그를 수집할 서비스의 토글을 켜서 활성화합니다. 특정 서비스의 로그 수집을 중지하려면 해당 로그 소스를 비활성화합니다.
6. (선택 사항) {{< ui >}}Log Source Tag Filters{{< /ui >}} 섹션에서 각 로그 소스에 대해 리소스 태그를 기준으로 로그 수집을 필터링할 수 있습니다. 드롭다운 메뉴에서 로그 소스를 선택하고 `key:value` 형식의 태그를 추가하여 수집하는 리소스의 로그를 제한합니다. **참고**: 리소스 태그는 Datadog 플랫폼 규칙에 맞추어 자동으로 소문자로 변환됩니다. 태그 필터는 불일치를 방지하기 위해 소문자로 정의하세요.
7. 여러 리전에 로그가 존재하는 경우 각 리전에 추가 Datadog Forwarder Lambda 함수를 생성하고 **Datadog Forwarder Lambda** 섹션에 추가해야 합니다.
8. 특정 Lambda 함수로부터의 모든 AWS 로그 수집을 중지하려면 표에서 해당 Lambda 위로 마우스를 가져가고 삭제 아이콘을 클릭합니다. 해당 함수에 연결된 모든 트리거가 제거됩니다.
9. 이 초기 설정 후 몇 분 내에 Datadog [Log Explorer][40]에 AWS 로그가 나타납니다.

### 트리거 수동 설정 {#manually-set-up-triggers}

#### CloudWatch 로그 그룹에서 로그 수집 {#collecting-logs-from-cloudwatch-log-group}

CloudWatch 그룹에서 로그를 수집하는 경우 다음 방법 중 하나를 사용하여 [Datadog Forwarder Lambda 함수][1] 트리거를 설정합니다.

{{< tabs >}}
{{% tab "AWS 콘솔" %}}

1. AWS 콘솔에서 {{< ui >}}Lambda{{< /ui >}}로 이동합니다.
2. {{< ui >}}Functions{{< /ui >}}를 클릭하고 Datadog Forwarder를 선택합니다.
3. {{< ui >}}Add trigger{{< /ui >}}를 클릭하고 {{< ui >}}CloudWatch Logs{{< /ui >}}를 선택합니다.
4. 드롭다운 메뉴에서 로그 그룹을 선택합니다.
5. 필터의 이름을 입력하고 필요시 필터 패턴을 지정합니다.
6.  {{< ui >}}Add{{< /ui >}}를 클릭합니다.
7. [Datadog Log 섹션][1]으로 이동하여 로그 그룹으로 전송된 새로운 로그 이벤트를 확인합니다.

[1]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Terraform" %}}

Terraform 사용자의 경우, 트리거를 프로비저닝하고 관리하기 위해 [aws_cloudwatch_log_subscription_filter][1] 리소스를 사용할 수 있습니다. 아래 샘플 코드를 참조하세요.

```conf
data "aws_cloudwatch_log_group" "some_log_group" {
  name = "/some/log/group"
}

resource "aws_lambda_permission" "lambda_permission" {
  action        = "lambda:InvokeFunction"
  function_name = "datadog-forwarder" # this is the default but may be different in your case
  principal     = "logs.amazonaws.com" # or logs.amazonaws.com.cn for China*
  source_arn    = data.aws_cloudwatch_log_group.some_log_group.arn
}

resource "aws_cloudwatch_log_subscription_filter" "datadog_log_subscription_filter" {
  name            = "datadog_log_subscription_filter"
  log_group_name  = <CLOUDWATCH_LOG_GROUP_NAME> # for example, /some/log/group
  destination_arn = <DATADOG_FORWARDER_ARN> # for example,  arn:aws:lambda:us-east-1:123:function:datadog-forwarder
  filter_pattern  = ""
}
```
\*{{% mainland-china-disclaimer %}}

[1]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_subscription_filter
{{% /tab %}}
{{% tab "CloudFormation" %}}

AWS CloudFormation 사용자의 경우, CloudFormation [AWS::Logs::SubscriptionFilter][1] 리소스를 사용하여 트리거를 프로비저닝하고 관리할 수 있습니다. 아래 샘플 코드를 참조하세요.

샘플 코드는 AWS [SAM][2] 및 [Serverless Framework][3]에서도 작동합니다. Serverless Framework의 경우, 코드를 `serverless.yml`의 [resources][4] 섹션 아래에 배치하세요.

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

#### S3 버킷에서 로그 수집{#collecting-logs-from-s3-buckets}

S3 버킷에서 로그를 수집하는 경우, 다음 방법 중 하나를 사용하여 [Datadog Forwarder Lambda 함수][1] 트리거를 설정합니다.

{{< tabs >}}
{{% tab "AWS 콘솔" %}}

1. Lambda 함수가 설치되면 AWS 콘솔에서 로그가 포함된 S3 버킷에 트리거를 수동으로 추가합니다.
  {{< img src="logs/aws/adding_trigger.png" alt="트리거 추가" popup="true"style="width:80%;">}}

2. 버킷을 선택한 다음 AWS 안내를 따릅니다.
  {{< img src="logs/aws/integration_lambda.png" alt="Integration Lambda" popup="true" style="width:80%;">}}

3. S3 버킷에 올바른 이벤트 유형을 설정합니다.
  {{< img src="logs/aws/object_created.png" alt="Object Created" popup="true" style="width:80%;">}}

완료되면 [Datadog Log 섹션][1]으로 이동하여 로그를 탐색해 보세요!

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


## 스크러빙 및 필터링 {#scrubbing-and-filtering}

Lambda 함수에서 전송된 로그에서 이메일 주소나 IP 주소를 스크러빙하거나 [Lambda 파라미터에서][41] 사용자 지정 스크러빙 규칙을 정의할 수 있습니다.
또한 [필터링 옵션][42]을 사용하여 특정 패턴과 일치하는 로그만 전송하거나, 해당 패턴과 일치하는 로그를 제외할 수도 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/serverless/forwarder/
[2]: /ko/serverless/forwarder#aws-privatelink-support
[3]: /ko/integrations/amazon_api_gateway/#log-collection
[4]: /ko/integrations/amazon-appsync/#send-logs-to-datadog
[5]: /ko/integrations/amazon-bedrock/
[6]: /ko/integrations/amazon_cloudfront/#log-collection
[7]: /ko/integrations/amazon_cloudtrail/#send-logs-to-datadog
[8]: /ko/integrations/amazon-codebuild/#send-logs-to-datadog
[9]: /ko/integrations/amazon-dms/#send-logs-to-datadog
[10]: /ko/integrations/amazon-documentdb/#send-logs-to-datadog
[11]: /ko/containers/amazon_ecs/logs/
[12]: /ko/integrations/amazon-eks/#log-collection
[13]: /ko/integrations/amazon-elastic-beanstalk/
[14]: /ko/integrations/amazon_elb/#log-collection
[15]: /ko/integrations/amazon_fsx/#log-collection
[16]: /ko/integrations/amazon_glue/#log-collection
[17]: /ko/integrations/amazon-iot/#enable-logging
[18]: /ko/integrations/amazon_lambda/#log-collection
[19]: /ko/integrations/amazon_mwaa/#log-collection
[20]: /ko/integrations/amazon_network_firewall/#log-collection
[21]: /ko/integrations/amazon_es/#log-collection
[22]: /ko/integrations/amazon-pcs/
[23]: /ko/integrations/amazon_rds/#log-collection
[24]: /ko/integrations/amazon-redshift/#log-collection
[25]: /ko/integrations/amazon_route53/#send-logs-to-datadog
[26]: /ko/integrations/amazon_s3/#enable-s3-access-logs
[27]: /ko/integrations/amazon_step_functions/#log-collection
[28]: /ko/integrations/amazon_transit_gateway/#log-collection
[29]: /ko/integrations/amazon-verified-access/#log-collection
[30]: /ko/integrations/amazon_vpc/#log-collection
[31]: /ko/integrations/amazon-vpn/#send-logs-to-datadog
[32]: /ko/integrations/amazon_waf/#log-collection
[33]: /ko/integrations/amazon_dynamodb/
[34]: /ko/integrations/amazon_dynamodb/#send-logs-to-datadog
[35]: /ko/integrations/amazon_ec2/
[36]: /ko/integrations/amazon_sns/
[37]: /ko/integrations/amazon_sns/#send-logs-to-datadog
[38]: /ko/integrations/amazon_web_services/
[39]: https://app.datadoghq.com/integrations/amazon-web-services
[40]: https://app.datadoghq.com/logs
[41]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-scrubbing-optional
[42]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#log-filtering-optional
[43]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters