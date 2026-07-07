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
  text: 로그 처리 방법 알아보기
- link: /logs/guide/reduce_data_transfer_fees
  tag: 길라잡이
  text: 데이터 전송 수수료를 줄이면서 로그를 Datadog로 보내는 방법
- link: https://learn.datadoghq.com/courses/send-aws-logs
  tag: 학습 센터
  text: AWS 로그 전송
title: Datadog Lambda 함수를 사용하여 AWS 서비스 로그 전송
---
AWS 서비스 로그는 Datadog Forwarder Lambda 함수를 사용하여 수집할 수 있습니다. 이 Lambda 함수는 S3 버킷, CloudWatch 로그 그룹 및 EventBridge 이벤트를 트리거로 사용하며, 수집된 로그를 Datadog으로 전달합니다.

AWS 서비스 로그 수집을 시작하려면 다음 단계를 수행합니다.

1. AWS 계정에서 [Datadog Forwarder Lambda 함수][1]를 설정합니다.
AWS 서비스에서 2. [로깅을 활성화](#enable-logging-for-your-aws-service)합니다(대부분의 AWS 서비스는 S3 버킷 또는 CloudWatch 로그 그룹에 기록할 수 있습니다).
전달할 새로운 로그가 있을 때 Forwarder Lambda가 실행되도록 3. [트리거를 설정](#set-up-triggers)합니다. 트리거를 구성하는 방법은 두 가지가 있습니다.

**참고**:
   - [AWS PrivateLink][2]를 사용하여 전용 연결을 통해 로그를 전송할 수 있습니다.
   - CloudFormation은 모든 리소스에 대해 `KMS:Decrypt` 권한을 포함하는 IAM 정책을 생성하며, 이는 AWS Security Hub의 권장 모범 사례와 일치하지 않습니다. 이 권한은 Lambda 함수 설정 과정에서 KMS로 암호화된 S3 버킷의 객체를 복호화하는 데 사용되며, S3 버킷을 암호화하는 데 사용된 KMS 키는 예측할 수 없습니다. 설치가 성공적으로 완료된 후 이 권한을 안전하게 삭제할 수 있습니다.

## AWS 서비스에서 로깅 활성화 {#enable-logging-for-your-aws-service}

S3 버킷이나 CloudWatch 로그 그룹으로 로그를 생성하는 모든 AWS 서비스가 지원됩니다. 아래 표에서 가장 많이 사용되는 서비스의 설정 지침을 확인하세요.

| AWS 서비스                        | AWS 서비스 로깅 활성화                                                                                   | AWS 로그를 Datadog에 전송                                                                                                     |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway][3]                   | [Amazon API Gateway 로그 활성화][4]                                                                            | [수동][5] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                  |
| [AppSync][64]                      | [AWS AppSync 로그 활성화][65]                                                                                  | [수동][65] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                  |
| Batch                              | `-`                                                                                                            | [자동](#automatically-set-up-triggers) 로그 수집.                                                  |
| [Bedrock Agentcore][74]            | `-`                                                                                                            | [자동](#automatically-set-up-triggers) 로그 수집.                                                  |
| [Cloudfront][6]                    | [Amazon CloudFront 로그 활성화][7]                                                                             | [수동][8] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                  |
| [CloudTrail][9]                    | [AWS CloudTrail 로그 활성화][9]                                                                                | [수동][10] 및 [자동](#automatically-set-up-triggers) 로그 수집. Cloud SIEM용 AWS CloudTrail을 설정하는 경우 [Cloud SIEM용 AWS 설정][11]을 참조하세요. |
| [CodeBuild][66]                    | [AWS CodeBuild 로그 활성화][67]                                                                                | [수동][67] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                  |
| [DMS][68]                          | [AWS 데이터베이스 마이그레이션 서비스 로그 활성화][69]                                                               | [수동][69] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                  |
| [DocumentDB][70]                   | [Amazon DocumentDB 로그 활성화][71]                                                                            | [수동][71] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                  |
| [DynamoDB][12]                     | [Amazon DynamoDB 로그 활성화][13]                                                                              | [수동][14] 로그 수집.                                                                                                 |
| [EC2][15]                          | `-`                                                                                                            | [Datadog Agent][15]를 사용하여 로그를 Datadog에 전송합니다.                                                                    |
| [ECS][16]                          | `-`                                                                                                            | [Docker Agent를 사용하여 로그 수집][17] 또는 [자동](#automatically-set-up-triggers) 로그 수집.                                                                              |
| [EKS][62]                          | [Amazon EKS 로그 활성화][63]                                                                                   | [수동][63] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                 |
| [Elastic Load Balancing(ELB)][18] | [Amazon ELB 로그 활성화][19]                                                                                   | [수동][20] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                 |
| [Glue][76]                         | [AWS Glue 로그 활성화][77]                                                                                     | [수동][77] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                 |
| [IoT Core][74]                     | [Amazon IoT Core 로그 활성화][75]                                                                              | [자동](#automatically-set-up-triggers) 로그 수집.                                                                  |
| [Lambda][21]                       | `-`                                                                                                            | [수동][22] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                 |
| [MWAA][55]                         | [Amazon MWAA 로그 활성화][56]                                                                                  | [수동][56] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                 |
| [Network Firewall][57]             | [AWS 네트워크 방화벽 로그 활성화][58]                                                                         | [수동][58] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                 |
| [PCS][75]                          | `-`                                                                                                            | [자동](#automatically-set-up-triggers) 로그 수집.                                                  |
| [RDS][23]                          | [Amazon RDS 로그 활성화][24]                                                                                   | [수동][25] 로그 수집.                                                                                                |
| [RedShift][34]                     | [Amazon Redshift 로그 활성화][35]                                                                              | [수동][36] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                 |
| Redshift Serverless                | `-`                                                                                                            | [자동](#automatically-set-up-triggers) 로그 수집.                                                                  |
| [Route 53][59]                     | Amazon Route 53 [DNS 쿼리 로깅][60] 및 [Resolver 쿼리 로깅][73] 활성화                                                                                                                                                  | [수동][61] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                 |
| [S3][29]                           | [Amazon S3 로그 활성화][30]                                                                                    | [수동][31] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                 |
| [SNS][32]                          | SNS에서는 로그를 제공하지 않지만, SNS 서비스를 통과하는 로그 및 이벤트를 처리할 수 있습니다 | [수동][33] 로그 수집.                                                                                                 |
| SSM                                | `-`                                                                                                            | [자동](#automatically-set-up-triggers) 로그 수집.                                                            |
| [Step Functions][52]               | [Amazon Step Functions 로그 활성화][53]                                                                        | [수동][54] 로그 수집.                                                                                                 |
| [Verified Access][37]              | [Verified Access 로그 활성화][38]                                                                              | [수동][39] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                                                                 |
| [VPC][40]                          | [Amazon VPC 로그 활성화][41]                                                                                   | [수동][42] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                                                                 |
| [VPN][26]                          | [AWS VPN 로그 활성화][72]                                                                                      | [수동][27] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                                                                 |
| [웹 애플리케이션 방화벽][49]     | [AWS WAF 로그 활성화][50]                                                                                      | [수동][51] 및 [자동](#automatically-set-up-triggers) 로그 수집.                                                 |



## 트리거 설정 {#set-up-triggers}

Datadog Forwarder Lambda 함수에 트리거를 구성하는 방법은 두 가지가 있습니다.

- [자동](#automatically-set-up-triggers): Datadog이 선택된 AWS 서비스의 로그 위치를 자동으로 검색하여 Datadog Forwarder Lambda 함수에 트리거를 추가합니다. Datadog이 트리거 목록을 최신 상태로 유지합니다.
- [수동](#manually-set-up-triggers): 각 트리거를 직접 설정합니다.

### 트리거 자동 설정 {#automatically-set-up-triggers}

Datadog은 Datadog Forwarder Lambda 함수의 트리거를 자동으로 구성하여 AWS 로그를 수집할 수 있습니다. 그러나 자동 구독은 서로 다른 AWS 계정이나 리전에서 트리거를 생성하는 것을 지원하지 않습니다. 로그가 다른 AWS 계정의 S3 버킷에 게시되는 경우에는 이 제한을 우회하기 위해 S3 버킷과 동일한 계정에서 수동으로 트리거를 생성하는 것이 권장됩니다.

지원되는 로그 소스 및 위치:

| 소스                      | 위치       |
| --------------------------- | -------------- |
| Apache Airflow(MWAA)       | CloudWatch     |
| API Gateway 액세스 로그     | CloudWatch     |
| API Gateway 실행 로그  | CloudWatch     |
| 애플리케이션 ELB 액세스 로그 | S3             |
| AppSync Logs                | CloudWatch     |
| Batch                       | CloudWatch     |
| Bedrock Agentcore Logs      | S3, CloudWatch |
| 클래식 ELB 액세스 로그     | S3             |
| CloudFront 액세스 로그      | S3             |
| Cloudtrail 로그             | S3, CloudWatch |
| CodeBuild 로그              | S3, CloudWatch |
| DMS 로그                    | CloudWatch     |
| DocumentDB 로그             | CloudWatch     |
| ECS 로그                    | CloudWatch     |
| EKS 컨트롤 플레인 로그      | CloudWatch     |
| EKS Container Insights 로그 | CloudWatch     |
| Glue Jobs 로그              | CloudWatch     |
| Lambda 로그                 | CloudWatch     |
| Lambda@Edge 로그            | Cloudwatch     |
| IoT Core 로그                    | CloudWatch     |
| 네트워크 방화벽 로그       | S3, CloudWatch |
| PCS 로그                    | CloudWatch     |
| Redshift 로그               | S3, CloudWatch |
| Redshift Serverless 로그    | CloudWatch     |
| RDS 로그                    | CloudWatch     |
| Route53 DNS 쿼리 로그      | CloudWatch     |
| Route53 Resolver 쿼리 로그 | S3, CloudWatch |
| S3 액세스 로그              | S3             |
| SSM 명령 로그            | CloudWatch     |
| Step 함수              | CloudWatch     |
| Verified Access 로그        | S3, CloudWatch |
| VPC Flow 로그               | S3, CloudWatch |
| VPN 로그                    | CloudWatch     |
| 웹 애플리케이션 방화벽    | S3, CloudWatch |

**참고**: [구독 필터][48]는 DatadogForwarder에 의해 CloudWatch 로그 그룹에 자동으로 생성되며, `DD_LOG_SUBSCRIPTION_FILTER_<LOG_GROUP_NAME>` 형식으로 이름이 지정됩니다.

1. 아직 설정하지 않았다면 [Datadog 로그 수집 AWS Lambda 함수][1]를 설정하세요.
2. [Datadog-AWS 통합][43]에 사용되는 IAM 역할의 정책에 다음 권한이 포함되어 있는지 확인하세요. 이 권한들이 사용되는 방식에 대한 자세한 내용은 아래 설명에서 찾을 수 있습니다.

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
    "elasticloadbalancing:DescribeLoadBalancerAttributes",
    "elasticloadbalancing:DescribeLoadBalancers",
    "glue:BatchGetJobs",
    "glue:GetJobs",
    "glue:GetJob",
    "glue:ListJobs",
    "iot:GetV2LoggingOptions",
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
    | `iot:GetV2LoggingOptions`                                   | Get IoT V2 logging options.                                                  |
    | `lambda:InvokeFunction`                                     | Invoke a Lambda function.                                                    |
    | `lambda:List*`                                              | List all Lambda functions.                                                   |
    | `lambda:GetPolicy`                                          | Get the Lambda policy when triggers are to be removed.                       |
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


3. [AWS 통합 페이지][44]에서 로그를 수집할 AWS 계정을 선택하고 **Log Collection** 탭을 클릭합니다.
4. **Datadog Forwarder Lambda** 섹션에서 이전 단계에서 생성한 Lambda의 ARN을 입력한 다음 **Add**를 클릭합니다. Lambda 함수는 아래 표에 이름, 버전 및 리전과 함께 표시됩니다.
5. **Log Autosubscription** 섹션의 **Log Sources**에서 로그를 수집할 AWS 서비스를 활성화합니다. 스위치를 켜면 로그 수집이 시작됩니다. 특정 서비스의 로그 수집을 중지하려면 해당 로그 소스를 비활성화합니다.
6. (선택 사항) **Log Source Tag Filters** 섹션에서 각 로그 소스에 대해 리소스 태그를 기준으로 로그 수집을 필터링할 수 있습니다. 드롭다운 메뉴에서 로그 소스를 선택하고 `key:value` 형식의 태그를 추가하여 수집하는 리소스의 로그를 제한합니다. **참고**: 리소스 태그는 Datadog 플랫폼 규칙에 맞추어 자동으로 소문자로 변환됩니다. 태그 필터는 불일치를 방지하기 위해 소문자로 정의하세요.
7. 여러 리전에 로그가 존재하는 경우 각 리전에 추가 Datadog Forwarder Lambda 함수를 생성하고 **Datadog Forwarder Lambda** 섹션에 추가해야 합니다.
8. 특정 Lambda 함수로부터의 모든 AWS 로그 수집을 중지하려면 표에서 해당 Lambda 위에 마우스를 올리고 삭제 아이콘을 클릭합니다. 해당 함수에 연결된 모든 트리거가 제거됩니다.
9. 이 초기 설정 후 몇 분 내에 Datadog [Log Explorer][45]에 AWS 로그가 나타납니다.

### 트리거 수동 설정 {#manually-set-up-triggers}

#### CloudWatch 로그 그룹에서 로그 수집 {#collecting-logs-from-cloudwatch-log-group}

CloudWatch 그룹에서 로그를 수집하는 경우 다음 방법 중 하나를 사용하여 [Datadog Forwarder Lambda 함수][1] 트리거를 설정합니다.

{{< tabs >}}
{{% tab "AWS 콘솔" %}}

1. AWS 콘솔에서 **Lambda**로 이동합니다.
2. **Functions**를 클릭하고 Datadog Forwarder를 선택합니다.
3. **Add trigger**를 클릭하고 **CloudWatch Logs**를 선택합니다.
4. 드롭다운 메뉴에서 로그 그룹을 선택합니다.
5. 필터의 이름을 입력하고 필요에 따라 필터 패턴을 지정합니다.
6. **Add**를 클릭합니다.
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

Lambda 함수에서 전송된 로그에서 이메일이나 IP 주소를 스크러빙하거나 [Lambda 파라미터에서][46] 사용자 지정 스크러빙 규칙을 정의할 수 있습니다.
[필터링 옵션][47]을 사용하여 특정 패턴과 일치하는 로그만 전송하거나, 해당 패턴과 일치하지 않는 로그를 제외할 수도 있습니다.

## 추가 자료 {#further-reading}

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
[26]: /ko/integrations/amazon-vpn/
[27]: /ko/integrations/amazon-vpn/#send-logs-to-datadog
[28]: /ko/integrations/amazon_route53/#send-logs-to-datadog
[29]: /ko/integrations/amazon_s3/
[30]: /ko/integrations/amazon_s3/#enable-s3-access-logs
[31]: /ko/integrations/amazon_s3/#manual-installation-steps
[32]: /ko/integrations/amazon_sns/
[33]: /ko/integrations/amazon_sns/#send-logs-to-datadog
[34]: /ko/integrations/amazon_redshift/
[35]: /ko/integrations/amazon-redshift/#enable-logging
[36]: /ko/integrations/amazon-redshift/#log-collection
[37]: /ko/integrations/amazon-verified-access/
[38]: /ko/integrations/amazon-verified-access/#enable-verified-access-logs
[39]: /ko/integrations/amazon-verified-access/#log-collection
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
[57]: /ko/integrations/amazon_network_firewall/
[58]: /ko/integrations/amazon_network_firewall/#log-collection
[59]: /ko/integrations/amazon_route53/
[60]: /ko/integrations/amazon_route53/#enable-route53-dns-query-logging
[61]: /ko/integrations/amazon_route53/#send-logs-to-datadog
[62]: /ko/integrations/amazon-eks/
[63]: /ko/integrations/amazon-eks/#log-collection
[64]: /ko/integrations/amazon-appsync/
[65]: /ko/integrations/amazon-appsync/#send-logs-to-datadog
[66]: /ko/integrations/amazon-codebuild/
[67]: /ko/integrations/amazon-codebuild/#send-logs-to-datadog
[68]: /ko/integrations/amazon-dms/
[69]: /ko/integrations/amazon-dms/#send-logs-to-datadog
[70]: /ko/integrations/amazon-documentdb/
[71]: /ko/integrations/amazon-documentdb/#send-logs-to-datadog
[72]: /ko/integrations/amazon-vpn/#enable-logging
[73]: /ko/integrations/amazon_route53/#enable-route53-resolver-query-logging
[74]: /ko/integrations/amazon-iot/
[75]: /ko/integrations/amazon-iot/#enable-logging
[74]: /ko/integrations/amazon-bedrock/
[75]: /ko/integrations/amazon-pcs/
[76]: /ko/integrations/amazon_glue/
[77]: /ko/integrations/amazon_glue/#log-collection