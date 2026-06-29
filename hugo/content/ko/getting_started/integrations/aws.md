---
description: CloudFormation을 사용하여 Amazon Web Services 계정을 Datadog에 통합합니다. IAM 역할을
  설정하고, 서비스 통합을 활성화하고, 로그 포워딩을 구성하세요.
further_reading:
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: 블로그
  text: AWS 모니터링을 위한 핵심 메트릭
- link: https://www.datadoghq.com/blog/aws-1-click-integration/
  tag: 블로그
  text: AWS 원클릭 통합 소개
- link: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation/
  tag: 블로그
  text: CloudFormation으로 Datadog 배포 및 구성
- link: https://www.datadoghq.com/blog/monitoring-as-code-with-datadog-and-cloudformation/
  tag: 블로그
  text: Datadog 및 CloudFormation Registry를 통해 코드로 모니터링 구현
- link: https://www.datadoghq.com/blog/datadog-serverless-view/
  tag: 블로그
  text: Serverless 뷰에서 전체 Serverless 스택 모니터링
- link: https://www.datadoghq.com/blog/monitor-aws-fargate/
  tag: 블로그
  text: Datadog으로 AWS Fargate에서 ECS 애플리케이션 모니터링
- link: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
  tag: 블로그
  text: Datadog으로 Amazon ECS Anywhere 모니터링
- link: /integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?tab=cloudformation
  tag: 설명서
  text: Amazon Data Firehose를 사용한 AWS CloudWatch Metric Streams
- link: https://www.datadoghq.com/blog/monitor-aws-graviton3-with-datadog/
  tag: 블로그
  text: Datadog으로 Graviton3 기반 EC2 인스턴스 모니터링
title: AWS로 시작
---
## 개요 {#overview}

본 가이드에서는 Datadog의 CloudFormation 템플릿을 사용해 Amazon Web Services(AWS) 계정을 Datadog에 통합하는 방법을 알아봅니다. 설정을 완료한 후에는 개별 AWS 서비스 통합을 활성화하고, EC2 인스턴스에 Datadog Agent를 설치하여 더욱 깊이 있는 시각화를 확보하며, 로그 포워딩을 구성할 수 있습니다.

## 전제 조건 {#prerequisites}

시작하기 전에 [AWS][7] 계정이 있는지 확인하시기 바랍니다. CloudFormation 템플릿은 IAM 역할과 관련 정책을 생성하여 Datadog의 AWS 계정이 귀하의 AWS 계정에 대한 API 호출을 수행하여 데이터를 수집하고 전송할 수 있도록 합니다. AWS 사용자가 템플릿을 실행하려면 다음 IAM 권한을 보유해야 합니다.

{{% collapse-content title="필수 IAM 권한" level="h4" expanded=false id="iam-permissions" %}}
- cloudformation:CreateStack
- cloudformation:CreateUploadBucket
- cloudformation:DeleteStack
- cloudformation:DescribeStacks
- cloudformation:DescribeStackEvents
- cloudformation:GetStackPolicy
- cloudformation:GetTemplateSummary
- cloudformation:ListStacks
- cloudformation:ListStackResources
- ec2:DescribeSecurityGroups
- ec2:DescribeSubnets
- ec2:DescribeVpcs
- iam:AttachRolePolicy
- iam:CreatePolicy
- iam:CreateRole
- iam:DeleteRole
- iam:DeleteRolePolicy
- iam:DetachRolePolicy
- iam:GetRole
- iam:GetRolePolicy
- iam:PassRole
- iam:PutRolePolicy
- iam:TagRole
- iam:UpdateAssumeRolePolicy
- kms:Decrypt
- lambda:AddPermission
- lambda:CreateFunction
- lambda:DeleteFunction
- lambda:GetCodeSigningConfig
- lambda:GetFunction
- lambda:GetFunctionCodeSigningConfig
- lambda:GetLayerVersion
- lambda:InvokeFunction
- lambda:PutFunctionConcurrency
- lambda:RemovePermission
- lambda:TagResource
- logs:CreateLogGroup
- logs:DeleteLogGroup
- logs:DescribeLogGroups
- logs:PutRetentionPolicy
- oam:ListSinks
- oam:ListAttachedLinks
- s3:CreateBucket
- s3:DeleteBucket
- s3:DeleteBucketPolicy
- s3:GetEncryptionConfiguration
- s3:GetObject
- s3:GetObjectVersion
- s3:PutBucketPolicy
- s3:PutBucketPublicAccessBlock
- s3:PutEncryptionConfiguration
- s3:PutLifecycleConfiguration
- secretsmanager:CreateSecret
- secretsmanager:DeleteSecret
- secretsmanager:GetSecretValue
- secretsmanager:PutSecretValue
- serverlessrepo:CreateCloudFormationTemplate
{{% /collapse-content %}}

## 설정 {#setup}

1. Datadog에서 [AWS 통합 구성 페이지][8]로 이동하여 {{< ui >}}Add AWS Account{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Automatically using CloudFormation{{< /ui >}} 옵션에서 통합 설정을 구성합니다.
   1. 통합할 AWS 리전을 선택합니다.
   1. 귀하의 Datadog [API 키][9]를 추가합니다.
   1. 필요 시, [Datadog Forwarder Lambda][1]를 사용하여 로그 및 기타 데이터를 Datadog으로 보냅니다.
   1. 필요 시, [Cloud Security Misconfigurations][54]를 활성화하여 클라우드 환경, 호스트 및 컨테이너의 구성 오류 및 보안 위험을 스캔합니다.
1. {{< ui >}}Launch CloudFormation Template{{< /ui >}}을 클릭합니다. 이렇게 하면 AWS 콘솔이 열리고 CloudFormation 스택이 로드됩니다. 모든 파라미터는 이전 Datadog 양식에서 선택한 항목을 기반으로 하여 자동으로 채워지므로, 원하는 경우 외에는 수정할 필요가 없습니다.
**참고:** `DatadogAppKey` 파라미터를 사용하면 CloudFormation 스택이 Datadog에 대한 API 호출을 수행하여 이 AWS 계정의 Datadog 구성을 추가 및 편집할 수 있습니다. 키는 자동으로 생성되며, 귀하의 Datadog 계정에 연결됩니다.
1. AWS에서 필수 상자를 선택하고 {{< ui >}}Create stack{{< /ui >}}을 클릭합니다. 이렇게 하면 세 개의 중첩 스택과 함께 Datadog 스택을 생성하는 프로세스가 시작됩니다. 이 작업에는 몇 분이 소요될 수 있습니다. 진행하기 전에 스택이 성공적으로 생성되었는지 확인하시기 바랍니다.
1. 스택이 생성되면 Datadog의 AWS 통합 타일로 돌아가서 {{< ui >}}Ready!{{< /ui >}}를 클릭합니다.
1. 데이터 수집이 시작될 때까지 최대 10분 정도 기다린 후 기본 제공 [AWS 개요 대시보드][12]를 통해 AWS 서비스 및 인프라스트럭처에서 전송한 메트릭을 확인하세요.
{{< img src="getting_started/integrations/aws-dashboard.png" alt="Datadog 계정의 AWS 개요 대시보드. 왼쪽에는 AWS 로고와 'No matching entries found'를 보여주는 AWS 이벤트 그래프가 있습니다. 중앙에는 수치 데이터가 표시된 EBS 볼륨 관련 그래프와 일관된 데이터를 보여주는 히트맵이 있습니다. 오른쪽에는 수치 데이터가 표시된 ELB 관련 그래프와 세 소스에서의 급등락 데이터를 보여주는 시계열 그래프가 있습니다.">}}

여러 계정을 동시에 설정하려면 [API][3], [AWS CLI][4] 또는 [Terraform][5]을 사용하세요. 자세한 내용은 [Datadog-Amazon CloudFormation 가이드][6]를 참조하시기 바랍니다.

**참고**: Datadog의 CloudFormation 템플릿은 정의된 리소스의 생성 및 삭제만 지원합니다. 스택 업데이트 적용에 관한 안내는 [스택 템플릿 업데이트][59]를 참조하시기 바랍니다.

### 설정 후 예상되는 사항 {#what-to-expect-after-setup}

통합이 성공적으로 구성된 후, 데이터는 다음 일정에 따라 Datadog에 표시됩니다.

- **메트릭**: API 폴링을 통해 약 10분 이내에 나타나며, [CloudWatch Metric Streams][60]를 통하는 경우에는 2~3분 이내에 표시됩니다. 모든 서비스가 동일한 주기로 보고하지 않으므로, 처음 한 시간 동안 대시보드가 일부분만 채워지는 것은 정상입니다.
- **태그**: AWS 리소스 태그는 전파되는 데 별도의 시간이 소요될 수 있습니다. AWS에서 태그 변경 사항이 Datadog에 반영되는 데는 15분에서 수 시간까지 걸릴 수 있습니다.
- **리소스**: 설정 후에 다음 리소스 크롤링 주기 동안 발견됩니다.
- **로그**: 별도의 구성이 필요합니다. 설정 지침은 [로그 전송](#send-logs)을 참조하세요.

<div class="alert alert-info">
Datadog은 통합이 활성화되기 전의 과거 메트릭 데이터를 다시 채우지 않습니다. 메트릭은 통합이 성공적으로 구성된 시점부터 유입되기 시작합니다.
</div>

## 구성 {#configuration}

### 개별 AWS 서비스의 통합 활성화 {#enable-integrations-for-individual-aws-services}

사용 가능한 하위 통합의 전체 목록은 [통합 페이지][13]를 참조하세요. 이러한 통합 중 많은 부분은 Datadog이 AWS 계정에서 들어오는 데이터를 인식할 때 기본적으로 설치됩니다.

[AWS 통합 페이지][8]의 {{< ui >}}Metric Collection{{< /ui >}} 탭을 사용하여 Datadog 통합이 메트릭을 수집하는 서비스를 구성하세요.

### 리전 추가 {#add-regions}

[AWS 통합 페이지][8]의 {{< ui >}}General{{< /ui >}} 탭에서 Datadog이 메트릭, CloudWatch 이벤트 및 리소스를 수집하는 AWS 리전을 관리할 수 있습니다.

## 로그 전송 {#send-logs}

Datadog으로 AWS 서비스 로그를 전송하는 방법은 두 가지가 있습니다.

- [Amazon Data Firehose 목적지][10]: 대용량의 CloudWatch 로그에 권장됩니다.
- [Forwarder Lambda 함수][11]: 트레이스, 향상된 메트릭 또는 Lambda 함수의 사용자 정의 메트릭에 필요합니다. 직접 Amazon Data Firehose로 스트리밍할 수 없는 다른 리소스나 S3의 로그에도 권장됩니다.

AWS 서비스에 대한 로그 활성화 방법은 [여기][14]를 참조하세요.

### 유효성 검사 {#validation}

로그를 활성화한 후, [Log Explorer][15]에서 `source` 또는 `service` 패싯을 사용하여 로그를 찾으세요. 다음은 S3의 예시입니다.
{{< img src="getting_started/integrations/logs-explorer.png" alt="Datadog 계정의 Log Explorer 페이지. 왼쪽 이미지에는 's3'에 체크 표시가 되어 있는 소스 및 서비스 패싯이 표시됩니다. 오른쪽에는 일부 로그 항목이 목록 형식으로 표시됩니다.">}}

## Datadog 플랫폼에서 더 많은 것을 얻으세요 {#get-more-from-the-datadog-platform}

### EC2의 Datadog Agent로 더욱 깊이 있는 시각화 {#deeper-visibility-with-the-datadog-agent-on-ec2}

기본적으로 Datadog AWS 통합은 AWS 제공 메트릭에 대한 CloudWatch API를 크롤링하지만 [Datadog Agent][16]를 사용하면 EC2 인스턴스에 대한 더욱 깊은 시각화를 확보할 수 있습니다. Agent는 메트릭과 이벤트를 보고하는 경량 데몬이며, 로그 및 트레이스를 위해 구성할 수도 있습니다. Datadog 애플리케이션의 [Agent 설치][17] 섹션에서는 다양한 운영 체제에 Agent를 설치하는 방법에 대한 지침을 안내합니다. 많은 운영 체제(예: Amazon Linux)에는 Agent를 설치하기 위해 인스턴스 터미널에서 실행할 수 있는 원스텝 설치 명령이 있습니다.
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="Datadog의 'Integrations' 탭에 있는 'Agent' 섹션. 왼쪽에는 Datadog Agent에 지원되는 운영 체제 목록이 표시됩니다. 이 목록에서는 'Amazon Linux'가 강조 표시됩니다. 오른쪽에는 'Use our easy one-step install'이 표시됩니다. Agent 설치 명령은 DD_API_KEY 섹션이 난독화된 상태로 아래에 표시됩니다.">}}

Agent가 설치되면 [인프라스트럭처 목록][18]에서 뼈 모양 아이콘을 사용해 그래픽으로 표시됩니다.
{{< img src="getting_started/integrations/infrastructure-list.png" alt="두 호스트를 목록 형식으로 표시한 인프라스트럭처 목록. 두 호스트 모두 AWS 통합을 의미하는 AWS 아이콘이 표시되고, 파란색 상자의 'aws' 텍스트는 AWS 통합과 관련이 있음을 나타냅니다. 한 호스트에는 뼈 모양 아이콘과 'ntp' 및 'system'이 적힌 파란색 상자도 표시됩니다.">}}

위의 스크린샷은 Datadog Agent가 [시스템][19] 및 [NTP][20] 검사를 통해 데이터를 보고하는 호스트를 보여줍니다. 시스템 검사에서는 CPU, 메모리, 파일 시스템 및 I/O에 대한 메트릭을 제공하여 호스트에 대한 추가 통찰력을 제공합니다. 환경 및 사용 사례에 맞게 추가 [통합][21]을 활성화하거나, [DogStatsD][22]를 사용하여 사용자 정의 메트릭을 Datadog으로 직접 전송할 수 있습니다.

이 접근 방식의 이점에 대한 자세한 내용은 [클라우드 인스턴스에 Datadog Agent를 설치해야 하는 이유에 관한 FAQ][23]를 참조하세요.

### Amazon 컨테이너 서비스에서 Datadog Agent 사용 {#using-the-datadog-agent-with-amazon-container-services}

컨테이너화된 환경의 경우, 인스턴스를 관리하든 서버리스 환경을 위해 [Fargate][24]를 사용하든 Datadog Agent를 사용할 수 있습니다.

#### EC2 시작 유형을 사용한 ECS {#ecs-with-ec2-launch-type}

[Amazon ECS 설명서][25]를 사용하여 ECS 클러스터의 EC2 인스턴스에서 [Datadog Docker Agent][26]를 실행합니다. [Amazon ECS 데이터 수집 설명서][27]를 검토하여 Datadog 계정에 보고된 메트릭 및 이벤트를 확인하세요.

#### Fargate 시작 유형을 사용한 ECS {#ecs-with-fargate-launch-type}

[Amazon ECS on AWS Fargate 설명서][28]를 사용하여 애플리케이션과 동일한 작업 정의에 따라 Agent를 컨테이너로 실행합니다. **참고**: Fargate 통합의 모든 이점을 활용하려면 Datadog Agent 버전 6.1.1 이상이 필요합니다.

#### Fargate 오케스트레이션 유형을 사용한 AWS Batch {#aws-batch-with-fargate-orchestration-type}

[AWS Batch를 위한 Amazon ECS on AWS Fargate 설명서][58]를 사용하여 애플리케이션과 동일한 AWS Batch 작업 정의에 따라 Agent를 컨테이너로 실행합니다. **참고**: Fargate 통합의 모든 이점을 활용하려면 Datadog Agent 버전 6.1.1 이상이 필요합니다.

#### EKS {#eks}

[Kubernetes 배포 설명서][29]에 언급된 대로 Amazon Elastic Kubernetes Service(EKS)에 대한 특별한 구성은 필요하지 않습니다. [전용 Kubernetes 설명서][30]를 사용하여 EKS 클러스터에 Agent를 배포하세요.

#### Fargate를 사용한 EKS {#eks-with-fargate}

Fargate 포드는 AWS에 의해 관리되므로, CPU 및 메모리와 같은 호스트 기반 시스템 검사는 제외됩니다. AWS Fargate 포드에서 데이터를 수집하려면 [Amazon EKS on AWS Fargate 문서][31]를 사용하여 애플리케이션 포드의 사이드카로 Agent를 실행하고, 사용자 정의 역할 기반 액세스 제어(RBAC)를 구성하세요. **참고**: Datadog Agent 버전 7.17 이상이 필요합니다.

#### EKS Anywhere {#eks-anywhere}

온프레미스 Kubernetes 클러스터의 경우 [EKS Anywhere 설명서][32]를 사용하세요.

### 추가 Datadog 리소스 생성 {#create-additional-datadog-resources}
Datadog UI 또는 [API][33]를 사용하는 것 외에도 [CloudFormation Registry][35]로 많은 [Datadog 리소스][34]를 생성할 수 있습니다. 가시성과 문제 해결을 위해 [대시보드][36]를 사용하여 주요 데이터를 표시하고, [함수][37]를 적용하며, [메트릭 상관관계][38]를 찾으세요.

계정의 원치 않거나 예상치 못한 동작에 대한 알림을 받으려면 [모니터링][39]을 생성합니다. 모니터링은 계정에 보고된 데이터를 지속적으로 평가하고, 올바른 정보가 적절한 팀원에게 전달되도록 [알림][40]을 보냅니다. 팀에 알릴 수 있는 모든 방법에 대한 [알림 통합 목록][41]을 검토하시기 바랍니다.

## 관련 제품 살펴보기 {#explore-related-products}

### Serverless {#serverless}

AWS Lambda 함수를 Datadog으로 모니터링하려면 [Serverless][42]를 참조하여 애플리케이션을 계측하고, [Serverless 라이브러리 및 통합][43]을 설치하며, [서버리스 애플리케이션을 통한 분삭 추적][44] 또는 [서버리스 문제 해결][45]에 관한 지침을 확인하세요.

### APM {#apm}

애플리케이션 및 AWS 서비스에서 분산 트레이스를 수집하려면 Datadog Agent와 [APM][47]을 사용하세요. AWS Lambda 함수의 경우 [Datadog Lambda Extension][44]을 사용하여 계측합니다.  애플리케이션 성능 데이터 분석에 대한 자세한 내용은 [APM 설명서][48]를 참조하세요.

또한 APM 성능 및 인프라스트럭처 메트릭에 대한 알고리즘 기능인 [Watchdog][49]을 사용하여 잠재적인 애플리케이션 문제를 자동으로 감지하고 알림을 받을 수 있습니다.

### 보안 {#security}

#### Cloud SIEM {#cloud-siem}

[Cloud SIEM 시작][50]을 참조하여, 기본 제공 [로그 탐지 규칙][51]을 사용해 로그를 평가하세요. 이 규칙은 사용자 정의가 가능하며, 위협이 감지되면 [Security Signals Explorer][52]에서 접근할 수 있는 보안 신호를 생성합니다. [알림 규칙][53]을 사용하여 여러 규칙에 걸쳐 알림 기본 설정을 구성하세요.

#### Cloud Security Misconfigurations {#cloud-security-misconfigurations}

[Cloud Security Misconfigurations 설정][54] 가이드를 사용하여 클라우드 환경에서 구성 오류를 감지하고 평가하세요. 리소스 구성 데이터는 기본 제공 [클라우드][55] 및 [인프라스트럭처][56] 준수 규칙을 기준으로 평가되어 공격자 기법 및 잠재적 구성 오류를 표시합니다.

### 문제 해결 {#troubleshooting}

`Datadog is not authorized to perform sts:AssumeRole` 오류가 발생하면 전용 [문제 해결 페이지][2]를 참조하시기 바랍니다. 기타 문제의 경우 [AWS 통합 문제 해결 가이드][57]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/guide/forwarder/
[2]: /ko/integrations/guide/error-datadog-not-authorized-sts-assume-role/
[3]: /ko/api/latest/aws-integration/#create-an-aws-integration
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudformation/index.html
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_account
[6]: /ko/integrations/guide/amazon_cloudformation/
[7]: https://aws.amazon.com/getting-started/?nc1=f_cc
[8]: https://app.datadoghq.com/integrations/amazon-web-services
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[11]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://app.datadoghq.com/dash/integration/7/aws-overview
[13]: /ko/integrations/#cat-aws
[14]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service
[15]: https://app.datadoghq.com/logs
[16]: /ko/getting_started/agent/
[17]: https://app.datadoghq.com/account/settings/agent/latest
[18]: https://app.datadoghq.com/infrastructure
[19]: /ko/integrations/system/
[20]: /ko/integrations/ntp/
[21]: /ko/integrations/
[22]: /ko/extend/dogstatsd/?tab=hostagent
[23]: /ko/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[24]: https://aws.amazon.com/fargate/
[25]: /ko/agent/amazon_ecs/?tab=awscli
[26]: /ko/agent/docker/?tab=standard
[27]: /ko/agent/amazon_ecs/data_collected/
[28]: /ko/integrations/ecs_fargate/?tab=fluentbitandfirelens
[29]: /ko/agent/kubernetes/distributions/?tab=helm#EKS
[30]: /ko/agent/kubernetes/?tab=helm
[31]: /ko/integrations/eks_fargate/#setup
[32]: /ko/integrations/eks_anywhere/
[33]: /ko/api/latest/using-the-api/
[34]: /ko/integrations/guide/amazon_cloudformation/#resources-available
[35]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[36]: /ko/dashboards/#overview
[37]: /ko/dashboards/functions/
[38]: /ko/dashboards/correlations/
[39]: /ko/monitors/types
[40]: /ko/monitors/notify/
[41]: /ko/integrations/#cat-notification
[42]: /ko/serverless
[43]: /ko/serverless/libraries_integrations
[44]: /ko/serverless/distributed_tracing
[45]: /ko/serverless/aws_lambda/troubleshooting/
[46]: /ko/integrations/amazon_xray/
[47]: /ko/tracing/trace_collection/
[48]: /ko/tracing/
[49]: /ko/watchdog/
[50]: /ko/getting_started/cloud_siem/
[51]: /ko/security/default_rules/#cat-log-detection
[52]: /ko/security/cloud_siem/triage_and_investigate/investigate_security_signals
[53]: /ko/security/notifications/rules/
[54]: /ko/security/cloud_security_management/setup/
[55]: /ko/security/default_rules/#cat-posture-management-cloud
[56]: /ko/security/default_rules/#cat-posture-management-infra
[57]: /ko/integrations/guide/aws-integration-troubleshooting/
[58]: /ko/integrations/ecs_fargate/?tab=webui#installation-for-aws-batch
[59]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-get-template.html
[60]: /ko/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/