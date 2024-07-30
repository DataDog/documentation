---
aliases:
- /ko/integrations/aws/
- /ko/logs/aws
- /ko/integrations/faq/revoking-aws-keys-and-enabling-role-delegation-for-the-datadog-aws-integration/
- /ko/integrations/faq/additional-aws-metrics-min-max-sum
- /ko/integrations/faq/why-am-i-only-seeing-the-average-values-of-my-custom-aws-cloudwatch-metrics/
categories:
- aws
- cloud
- iot
- log collection
dependencies: []
description: Datadog와 AWS 서비스 통합.
doc_link: https://docs.datadoghq.com/integrations/amazon_web_services/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-control-plane-api-usage-metrics/
  tag: 블로그
  text: Datadog에서 AWS 제어 플레인 API 사용 메트릭 모니터링
- link: https://www.datadoghq.com/blog/aws-reinvent-2022-recap/
  tag: 블로그
  text: AWS re:Invent 2022 하이라이트
git_integration_title: amazon_web_services
has_logo: true
integration_id: amazon-web-services
integration_title: AWS
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_web_services
public_title: Datadog-AWS 통합
short_description: Datadog와 AWS 서비스 통합.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon Web Services(AWS)에 연결하면 다음이 가능해집니다.

- 이벤트 탐색기에서 자동 AWS 상태 업데이트 보기
- Agent 설치 없이 EC2 호스트의 클라우드와치(CloudWatch) 메트릭 수집
- EC2 호스트에 EC2 고유 정보를 태그 지정
- EC2의 일정이 설정된 점검 이벤트를 스트림에 표시
- 다양한 기타 AWS 제품에서 클라우드와치(CloudWatch) 메트릭 및 이벤트 수집
- 이벤트 탐색기에서 클라우드와치(CloudWatch) 알람 보기

AWS를 통합해 빠르게 시작하는 방법을 알아보려면 [AWS 시작하기 가이드][1]를 참조하세요.

Datadog의 Amazon Web Services 통합은 [90일 이상의 AWS 서비스][3] 기간 동안 클라우드와치(CloudWatch)의 모든 메트릭, 이벤트와 로그를 수집합니다.

## 설정

다음 방법 중 하나를 사용해 메트릭, 이벤트, 태그 및 로그 수집을 위해 Datadog에 AWS 계정을 통합합니다.

### 자동

  * **CloudFormation(빠른 시작을 위한 권장 사항)**  
    CloudFormation을 사용한 AWS 통합을 설정하려면 [AWS 시작하기 가이드][1]를 참조하세요.

  * **Terraform**  
    Terraform를 사용해 AWS 통합을 설정하려면 [Terraform을 사용한 AWS 통합][4]을 참조하세요.

  * **Control Tower**  
    [Control Tower Account Factory][5]를 사용해 새로운 AWS 계정을 프로비저닝할 때 AWS 통합을 설정하려면 [Control Tower 설정 가이드][6]를 참조하세요.

  * **AWS 조직을 위한 다계정 설정**
    AWS 조직 내에서 다계정에 대한 AWS 통합을 설정하려면 [AWS 조직 설정 가이드][7]를 참조하세요.

{{% site-region region="gov" %}}
<div class="alert alert-warning">
Datadog US1-FED 사이트를 사용하는 경우 이 통합은 액세스 키로 설정해야 합니다. <a href="https://docs.datadoghq.com/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly">AWS 수동 설정 가이드</a>의 단계를 따르세요.
</div>
{{% /site-region %}}

### 수동

   * **역할 위임**
     역할 위임을 사용해 수동으로 AWS 통합을 설정하려면 [수동 설정 가이드][8]를 참조하세요.

   * **액세스 키(GovCloud 또는 중국\* 전용)**
     액세스 키를 사용해 AWS 통합을 설정하려면 [수동 설정 가이드][9]를 참조하세요.

     *\* 중국 본토 (또는 중국 본토 내 환경과 연결된) Datadog 서비스의 모든 사용에는 웹 사이트 [제한된 서비스 위치][10]에서 게시된 법적 고지 사항의 적용을 받습니다.

{{% aws-permissions %}}

## 로그 수집

Datadog로 AWS 서비스 로그를 전송하는 방법에는 두 가지가 있습니다.

- [Amazon Data Firehose 목적지][11]: Amazon Data Firehose 전송 스트림에서 Datadog에 로그를 전달하는 데 Datadog 목적지를 사용하세요. 클라우드와치(CloudWatch)에서 매우 많은 로그를 전송할 때 이 접근 방식이 권장됩니다.
- [포워더(Forwarder) 람다 함수][12]: Datadog의 포워더(Forwarder) 람다 함수를 배포합니다. 해당 함수는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 구독되어 로그를 Datadog에 전달합니다. 또한 Datadog는 Amazon Data Firehose에 직접 데이터를 스트림할 수 없는 기타 리소스나 S3에서 로그를 전송하는 경우 이 접근 방식을 사용할 것을 권장합니다. 

## 메트릭 수집

Datadog로 AWS 메트릭을 전송하는 방법은 두 가지가 있습니다.

- [메트릭 폴링][13]: API 폴링은 AWS 통합을 통해 즉시 사용 가능합니다. 클라우드와치(CloudWatch) API는 메트릭별 수집 기능을 통해 데이터를 풀링하여 Datadog에 전송합니다. 평균적으로 10분마다 새로운 메트릭이 풀링됩니다.
- [Amazon Data Firehose를 사용한 메트릭 메트릭 스트림][14]: Amazon 클라우드와치(CloudWatch) 메트릭 스트림  및 Amazon Data Firehose를 사용해 메트릭을 확인할 수 있습니다. **참고**: 이 방법은 2~3분의 지연이 있으며 별도의 설정이 필요합니다.

비용 제어를 위해 특정 리소스를 제외하려면 옵션에 대해 [AWS 통합 빌링 페이지][15]를 참조하세요.

## 리소스 수집

일부 Datadog 제품은 AWS 리소스(S3 버킷, RDS 스냅샷, CloudFront 분포 등)가 설정되는 방법에 대한 정보를 활용합니다. Datadog는 AWS 계정에 읽기 전용 API 호출을 함으로써 이러한 정보를 수집합니다.

### AWS 보안 감사 정책

<a href="https://docs.datadoghq.com/integrations/amazon_web_services/#resource-collection" target="_blank">리소스 수집</a>을 사용하고, AWS 관리형 <a href="https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit" target="_blank">SecurityAudit 정책</a>을 Datadog IAM 역할을 추가합니다.

**참고**: 리소스 수집을 활성화했지만 Datadog IAM 역할에 추가된 AWS Security Audit Policy가 없는 경우 Datadog의 AWS 통합 타일에 경고 메시지가 표시됩니다. 

### 클라우드 보안 관리

#### 설정

AWS 계정에 대해 설정된 AWS 통합이 없는 경우 위에서 [설정 프로세스][16]를 완료합니다. 언급 시 Cloud Security Management를 활성화했는지 확인하세요.

**참고:** 이 기능을 사용하려면 AWS 통합에 **역할 위임**이 설정되어 있어야 합니다.

Cloud Security Management를 기존 AWS 통합에 추가하려면, 아래 단계를 따라 리소스 수집을 활성화하세요.

1. 자동 **or** 수동 단계를 사용해 Datadog IAM 역할에 필수 권한을 제공하세요. 

   **자동** - CloudFormation 템플릿을 업데이트하세요.
   a. CloudFormation 콘솔에서 Datadog 통합을 설치하고 `Update`를 선택하는 데 사용한 메인 스택을 찾습니다.
    b. `Replace current template`을 선택합니다.
    c. `Amazon S3 URL`를 선택한 다음 `https://datadog-cloudformation-template.s3.amazonaws.com/aws/main.yaml`을 입력하고  `Next`를 클릭합니다. 
    d. `CloudSecurityPostureManagementPermissions`을  `true` 로 선택한 다음 `Next`를 클릭하되 `Review` 페이지에 도달할 때까지 기타 기존 파라미터를 수정하지 않습니다. 여기에서 변경 사항 설정 미리 보기를 확인할 수 있습니다.
    e. 아래에서 두 가지 확인 사항에 확인 표시하고 `Update stack`을 클릭합니다.

   **수동** - Datadog AWS IAM 역할에 [AWS 관리형 `SecurityAudit` 정책][17]을 추가합니다.  [AWS 콘솔][17]에서 이 정책을 찾을 수 있습니다.

2. 아래 단계에 따라 [Datadog AWS 통합 페이지][18]에서 설정을 완료하세요. 대신 [AWS 통합 업데이트][8] API를 사용할 수도 있습니다.

   1. 리소스 수집을 활성화할 AWS 계정을 클릭하세요.
   2. 해당 계정의 **리소스 수집** 탭으로 이동하여 `Cloud Security Posture Management Collection`을 활성화하세요.
   3. 페이지 오른쪽 하단에서 `Save`를 클릭하세요.

## 경고 수집

Datadog 이벤트 탐색기에 AWS 클라우드와치(CloudWatch) 알람을 전송하는 두 가지 방법이 있습니다.

- 알람 폴링: 알람 폴링은 AWS 통합에서 즉시 사용 가능하며 [DescribeAlarmHistory][19] API를 통해 메트릭 알람을 전송합니다. 이 방법을 따르면 알림이 `Amazon Web Services` 이벤트 소스 아래에 분류됩니다. **참고**: 크롤러는 컴포짓(composite) 알람을 수집하지 않습니다. **참고**: 크롤러는 컴포짓(composite) 알람을 수집하지 않습니다.
- SNS 주제: 알람을 SNS 주제에 구독하여 이벤트 탐색기에서 모든 AWS 클라우드와치(CloudWatch) 알람을 확인할 수 있습니다. 그런 다음 SNS 메시지를 Datadog에 전달합니다. Datadog에서 이벤트로 SNS 메시지를 받는 방법을 알아보려면 [SNS 메시지 받기][20]를 참조하세요. 이 방법을 따르면 알람이 `Amazon SNS` 이벤트 소스 아래 분류됩니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_web_services" >}}


### 이벤트

AWS 이벤트는 AWS 서비스 기반으로 수집됩니다.  [AWS 서비스 설명서]를 참조하여 수집된 이벤트에 대해 자세히 알아보세요.

### 태그

AWS 통합을 통해 다음의 태그가 수집됩니다. **참조**: 일부 태그는 특정 메트릭에서만 표시됩니다.

| 통합            | Datadog 태그 키                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 전체                    | `region`                                                                                                                                                                                                      |
| [API 게이트웨이][22]      | `apiid`, `apiname`, `method`, `resource`, `stage`                                                                                                                                                             |
| [앱 러너][23]      | `instance`, `serviceid`, `servicename`                                                                                                                                                                       |
| [자동 스케일링][24]    | `autoscalinggroupname`, `autoscaling_group`                                                                                                                                                                   |
| [빌링][25]          | `account_id`, `budget_name`, `budget_type`, `currency`, `servicename`, `time_unit`                                                                                                                            |
| [CloudFront][26]       | `distributionid`                                                                                                                                                                                              |
| [CodeBuild][27]              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy][28]       | `application`, `creator`, `deployment_config`, `deployment_group`, `deployment_option`, `deployment_type`, `status`                                                                                           |
| [DirectConnect][29]    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB][30]         | `globalsecondaryindexname`, `operation`, `streamlabel`, `tablename`                                                                                                                                           |
| [EBS][31]              | `volumeid`, `volume-name`, `volume-type`                                                                                                                                                                      |
| [EC2][32]              | `autoscaling_group`, `availability-zone`, `image`, `instance-id`, `instance-type`, `kernel`, `name`, `security_group_name`                                                                                    |
| [ECS][33]              | `clustername`, `servicename`, `instance_id`                                                                                                                                                                   |
| [EFS][34]              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache][35]      | `cachenodeid`, `cache_node_type`, `cacheclusterid`, `cluster_name`, `engine`, `engine_version`, `preferred_availability-zone`, `replication_group`                                                             |
| [ElasticBeanstalk][36] | `environmentname`, `enviromentid`                                                                                                                                                                             |
| [ELB][37]              | `availability-zone`, `hostname`, `loadbalancername`, `name`, `targetgroup`                                                                                                                                    |
| [EMR][38]              | `cluster_name`, `jobflowid`                                                                                                                                                                                   |
| [ES][39]               | `dedicated_master_enabled`, `ebs_enabled`, `elasticsearch_version`, `instance_type`, `zone_awareness_enabled`                                                                                                 |
| [Firehose][40]         | `deliverystreamname`                                                                                                                                                                                          |
| [FSx][41]             | `filesystemid`, `filesystemtype`                                                                                                                                                                               |
| [Health][42]           | `event_category`, `status`, `service`                                                                                                                                                                         |
| [IoT][43]              | `actiontype`, `protocol`, `rulename`                                                                                                                                                                          |
| [Kinesis][44]          | `streamname`, `name`, `state`                                                                                                                                                                                 |
| [KMS][45]              | `keyid`                                                                                                                                                                                                       |
| [람다][46]           | `functionname`, `resource`, `executedversion`, `memorysize`, `runtime`                                                                                                                                        |
| [머신 러닝][47] | `mlmodelid`, `requestmode`                                                                                                                                                                                    |
| [MQ][48]               | `broker`, `queue`, `topic`                                                                                                                                                                                    |
| [OpsWorks][49]         | `stackid`, `layerid`, `instanceid`                                                                                                                                                                            |
| [Polly][50]            | `operation`                                                                                                                                                                                                   |
| [RDS][51]              | `auto_minor_version_upgrade`, `dbinstanceclass`, `dbclusteridentifier`, `dbinstanceidentifier`, `dbname`, `engine`, `engineversion`, `hostname`, `name`, `publicly_accessible`, `secondary_availability-zone` |
| [RDS 프록시][52]       | `proxyname`, `target`, `targetgroup`, `targetrole`                                                                                                                                                                                                  |
| [Redshift][53]       | `clusteridentifier`, `latency`, `nodeid`, `service_class`, `stage`, `wlmid`                                                                                                                                   |
| [Route 53][54]        | `healthcheckid`                                                                                                                                                                                               |
| [S3][55]             | `bucketname`, `filterid`, `storagetype`                                                                                                                                                                       |
| [SES][56]             | 태그 키는 AWS에서 커스텀 설정됩니다.                                                                                                                                                                               |
| [SNS][57]              | `topicname`                                                                                                                                                                                                   |
| [SQS][58]              | `queuename`                                                                                                                                                                                                   |
| [VPC][59]              | `nategatewayid`, `vpnid`, `tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][60]       | `directoryid`, `workspaceid`                                                                                                                                                                                  |

### 서비스 점검
{{< get-service-checks-from-git "amazon_web_services" >}}


## 트러블슈팅

[AWS 통합 트러블슈팅 가이드][62]를 참조해 AWS 통합과 관련된 문제를 해결하세요. 

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/getting_started/integrations/aws/
[2]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html
[3]: https://docs.datadoghq.com/ko/integrations/#cat-aws
[4]: https://docs.datadoghq.com/ko/integrations/guide/aws-terraform-setup
[5]: https://docs.aws.amazon.com/controltower/latest/userguide/account-factory.html
[6]: https://aws.amazon.com/blogs/awsmarketplace/deploy-datadogs-aws-integration-accounts-aws-control-tower-account-factory-customization/
[7]: https://docs.datadoghq.com/ko/integrations/guide/aws-organizations-setup/
[8]: https://docs.datadoghq.com/ko/integrations/guide/aws-manual-setup/
[9]: https://docs.datadoghq.com/ko/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly
[10]: https://www.datadoghq.com/legal/restricted-service-locations/
[11]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[12]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[13]: https://docs.datadoghq.com/ko/integrations/guide/cloud-metric-delay/#aws
[14]: https://docs.datadoghq.com/ko/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[15]: https://docs.datadoghq.com/ko/account_management/billing/aws/
[16]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=roledelegation#setup
[17]: https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit
[18]: https://app.datadoghq.com/integrations/amazon-web-services
[19]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_DescribeAlarmHistory.html#API_DescribeAlarmHistory_RequestParameters
[20]: https://docs.datadoghq.com/ko/integrations/amazon_sns/#receive-sns-messages
[21]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/amazon_web_services_metadata.csv
[22]: https://docs.datadoghq.com/ko/integrations/amazon_api_gateway/
[23]: https://docs.datadoghq.com/ko/integrations/amazon_app_runner
[24]: https://docs.datadoghq.com/ko/integrations/amazon_auto_scaling/
[25]: https://docs.datadoghq.com/ko/integrations/amazon_billing/
[26]: https://docs.datadoghq.com/ko/integrations/amazon_cloudfront/
[27]: https://docs.datadoghq.com/ko/integrations/amazon_codebuild/
[28]: https://docs.datadoghq.com/ko/integrations/amazon_codedeploy/
[29]: https://docs.datadoghq.com/ko/integrations/amazon_directconnect/
[30]: https://docs.datadoghq.com/ko/integrations/amazon_dynamodb/
[31]: https://docs.datadoghq.com/ko/integrations/amazon_ebs/
[32]: https://docs.datadoghq.com/ko/integrations/amazon_ec2/
[33]: https://docs.datadoghq.com/ko/integrations/amazon_ecs/
[34]: https://docs.datadoghq.com/ko/integrations/amazon_efs/
[35]: https://docs.datadoghq.com/ko/integrations/amazon_elasticache/
[36]: https://docs.datadoghq.com/ko/integrations/amazon_elasticbeanstalk/
[37]: https://docs.datadoghq.com/ko/integrations/amazon_elb/
[38]: https://docs.datadoghq.com/ko/integrations/amazon_emr/
[39]: https://docs.datadoghq.com/ko/integrations/amazon_es/
[40]: https://docs.datadoghq.com/ko/integrations/amazon_firehose/
[41]: https://docs.datadoghq.com/ko/integrations/amazon_fsx/
[42]: https://docs.datadoghq.com/ko/integrations/amazon_health/
[43]: https://docs.datadoghq.com/ko/integrations/amazon_iot/
[44]: https://docs.datadoghq.com/ko/integrations/amazon_kinesis/
[45]: https://docs.datadoghq.com/ko/integrations/amazon_kms/
[46]: https://docs.datadoghq.com/ko/integrations/amazon_lambda/
[47]: https://docs.datadoghq.com/ko/integrations/amazon_machine_learning/
[48]: https://docs.datadoghq.com/ko/integrations/amazon_mq/
[49]: https://docs.datadoghq.com/ko/integrations/amazon_ops_works/
[50]: https://docs.datadoghq.com/ko/integrations/amazon_polly/
[51]: https://docs.datadoghq.com/ko/integrations/amazon_rds/
[52]: https://docs.datadoghq.com/ko/integrations/amazon_rds_proxy/
[53]: https://docs.datadoghq.com/ko/integrations/amazon_redshift/
[54]: https://docs.datadoghq.com/ko/integrations/amazon_route53/
[55]: https://docs.datadoghq.com/ko/integrations/amazon_s3/
[56]: https://docs.datadoghq.com/ko/integrations/amazon_ses/
[57]: https://docs.datadoghq.com/ko/integrations/amazon_sns/
[58]: https://docs.datadoghq.com/ko/integrations/amazon_sqs/
[59]: https://docs.datadoghq.com/ko/integrations/amazon_vpc/
[60]: https://docs.datadoghq.com/ko/integrations/amazon_workspaces/
[61]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/service_checks.json
[62]: https://docs.datadoghq.com/ko/integrations/guide/aws-integration-troubleshooting/