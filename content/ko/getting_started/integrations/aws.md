---
further_reading:
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: 블로그
  text: AWS 모니터링의 주요 메트릭
- link: https://www.datadoghq.com/blog/aws-1-click-integration/
  tag: 블로그
  text: AWS 원클릭 통합 소개
- link: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation/
  tag: 블로그
  text: CloudFormation에서 Datadog 배포 및 구성
- link: https://www.datadoghq.com/blog/monitoring-as-code-with-datadog-and-cloudformation/
  tag: 블로그
  text: Datadog 및 CloudFormation Registry를 통해 코드로 모니터링 구현
- link: https://www.datadoghq.com/blog/datadog-serverless-view/
  tag: 블로그
  text: 서버리스 뷰에서 전체 서버리스 스택 모니터링
- link: https://www.datadoghq.com/blog/monitor-aws-fargate/
  tag: 블로그
  text: Datadog로 AWS Fargate에서 ECS 애플리케이션 모니터링
- link: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
  tag: 블로그
  text: Datadog로 Amazon ECS Anywhere 모니터링
- link: /integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?tab=cloudformation
  tag: 설명서
  text: Amazon Data Firehose를 사용한 AWS CloudWatch 메트릭 스트림
- link: https://www.datadoghq.com/blog/monitor-aws-graviton3-with-datadog/
  tag: 블로그
  text: Datadog을 사용해 Graviton3-powered EC2 인스턴스 모니터링
title: AWS를 이용해 시작하기
---

## 개요

이 가이드에서는 Datadog의 CloudFormation 템플릿을 사용해 Amazon Web Service(AWS) 계정을 Datadog과 통합하는 과정 개요를 설명합니다.

간단하게 보면, 여기에는 Datadog의 AWS 계정이 데이터 수집이나 푸시를 위해 AWS 계정으로 API를 호출하도록 허용하는 IAM 역할 및 관련 정책 작성이 포함됩니다. 본 템플릿은 Datadog로 로그를 전송하기 위한 [Datadog Forwarder][1] Lambda 함수를 배포합니다. CloudFormation 템플릿을 사용하면 Datadog 계정으로 데이터를 전송할 때 필요한 모든 도구를 지원받을 수 있으며, Datadog는 최신 기능을 제공하기 위해 CloudFormation 템플릿을 유지 관리합니다.

초기 연결이 설정된 후에는 AWS 환경과 관련된 개별 AWS 서비스 통합을 활성화할 수 있습니다. Datadog에서는 클릭 한 번으로 AWS 계정에 필요한 리소스를 공급하고 사용자가 사용하는 서비스에 대한 메트릭과 이벤트 쿼리를 시작할 수 있습니다. 사용 빈도가 높은 AWS 서비스에서 Datadog를 사용하면 기본 대시보드에서 즉시 데이터를 확인할 수 있고 사용자 지정할 수 있습니다. 이 가이드에서는 Amazon Linux EC2 인스턴스에 통합을 설정하고 Datadog 에이전트를 설치하는 방법을 설명하고 통합 기능을 개략적으로 설명합니다. 사용 가능한 하위 통합 목록은 [개별 AWS 서비스에 통합 사용](#Enable-integrations-for individual-aws-service) 섹션을 참고하세요.

이 프로세스는 여러 AWS 계정에서 반복해 사용할 수 있습니다. 또는 [API][3], [AWS CLI][4]나 [Terraform][5]을 사용해 한 번에 여러 계정에서 구성할 수도 있습니다. 더 자세한 정보는 [Datadog-Amazon CloudFormation 가이드][6]에서 알아보세요.

## 전제 조건

시작하기 전에 다음의 전제 조건을 충족하는지 확인하세요.

1. [AWS][7] 계정. AWS 사용자가 다음의 IAM 권한을 허용해야 CloudFormation 템플릿을 실행할 수 있습니다.

    * cloudformation:CreateStack
    * cloudformation:CreateUploadBucket
    * cloudformation:DeleteStack
    * cloudformation:DescribeStacks
    * cloudformation:DescribeStackEvents
    * cloudformation:GetStackPolicy
    * cloudformation:GetTemplateSummary
    * cloudformation:ListStacks
    * cloudformation:ListStackResources
    * ec2:DescribeSecurityGroups
    * ec2:DescribeSubnets
    * ec2:DescribeVpcs
    * iam:AttachRolePolicy
    * iam:CreatePolicy
    * iam:CreateRole
    * iam:DeleteRole
    * iam:DeleteRolePolicy
    * iam:DetachRolePolicy
    * iam:GetRole
    * iam:GetRolePolicy
    * iam:PassRole
    * iam:PutRolePolicy
    * iam:TagRole
    * iam:UpdateAssumeRolePolicy
    * kms:Decrypt
    * lambda:AddPermission
    * lambda:CreateFunction
    * lambda:DeleteFunction
    * lambda:GetCodeSigningConfig
    * lambda:GetFunction
    * lambda:GetFunctionCodeSigningConfig
    * lambda:GetLayerVersion
    * lambda:InvokeFunction
    * lambda:PutFunctionConcurrency
    * lambda:RemovePermission
    * lambda:TagResource
    * logs:CreateLogGroup
    * logs:DeleteLogGroup
    * logs:DescribeLogGroups
    * logs:PutRetentionPolicy
    * oam:ListSinks
    * oam:ListAttachedLinks
    * s3:CreateBucket
    * s3:DeleteBucket
    * s3:DeleteBucketPolicy
    * s3:GetEncryptionConfiguration
    * s3:GetObject
    * s3:GetObjectVersion
    * s3:PutBucketPolicy
    * s3:PutBucketPublicAccessBlock
    * s3:PutEncryptionConfiguration
    * s3:PutLifecycleConfiguration
    * secretsmanager:CreateSecret
    * secretsmanager:DeleteSecret
    * secretsmanager:GetSecretValue
    * secretsmanager:PutSecretValue
    * serverlessrepo:CreateCloudFormationTemplate

## 설정

2. Datadog에서 [AWS 통합 설정 페이지][8]로 이동하여  **Add AWS Account**를 클릭합니다.

3. **Automatically using CloudFormation** 옵션에서 통합 설정을 설정합니다.
    a. 통합할 AWS 영역을 선택합니다.
    b. Datadog [API 키][9]를 추가합니다.
   c. (선택 사항) [Datadog Forwarder Lambda][1]를 사용하여 로그 및 기타 데이터를 Datadog으로 보냅니다.
    d. (선택 사항) [Cloud Security Management Misconfigurations][54]를 활성화하여 클라우드 환경, 호스트, 컨테이너에 구성 오류나 보안 위험이 없는지 스캔합니다.

5. **Launch CloudFormation Template**을 클릭합니다. 그러면 AWS 콘솔이 열리고 CloudFormation 스택이 로드됩니다. 이전 Datadog 양식에서 선택한 것을 기반으로 모든 파라미터가 입력되기 때문에 필요한 경우 외에 수정할 필요가 없습니다.
**참조:** `DatadogAppKey` 파라미터를 사용하면 CloudFormation 스택이 Datadog에 대한 API 호출을 수행하여 이 AWS 계정에 대한 Datadog 구성을 추가하고 편집할 수 있습니다. 키는 자동으로 생성하며, 사용자의 Datadog 계정과 연동됩니다.

6. AWS에서 필요한 상자를 선택하고 **Create stack**을 클릭합니다. 그러면 3개의 중첩된 스택과 함께 Datadog 스택에 대한 생성 프로세스가 시작됩니다. 이 작업에는 몇 분이 소요될 수 있습니다. 계속 진행하기 전에 스택이 성공적으로 생성되었는지 확인합니다.

7. 스택이 생성되면 Datadog의 AWS 통합 타일로 돌아가서 **Ready!**를 클릭합니다

8. 데이터 수집이 시작될 때까지 최대 10분 정도 기다린 후 기본 제공되는 [AWS 개요 대시보드][12]를 통해 AWS 서비스 및 인프라스트럭처에서 전송한 메트릭을 확인하세요.
{{< img src="getting_started/integrations/aws-dashboard.png" alt="Datadog 계정의 AWS 개요 대시보드. 왼쪽에는 AWS 로고와 'No matching entries found'을 표시하는 AWS 이벤트 그래프가 있습니다. 중앙에는 수치 데이터가 표시된 EBS 볼륨 관련 그래프와 일관된 데이터를 보여주는 히트맵이 있습니다. 오른쪽에는 숫자 데이터를 표시하는 ELB 관련 그래프와 세 가지 소스의 스파이크 데이터를 표시하는 시계열 그래프가 있습니다.">}}

## 개별 AWS 서비스에 대한 통합 활성화

이용 가능한 서브 통합의 전체 목록은 [Integrations 페이지][13]에서 확인할 수 있습니다. 대부분의 통합은 Datadog이 AWS 계정에서 들어오는 데이터를 인식할 때 기본적으로 설치됩니다.

## 로그 전송

Datadog로 AWS 서비스 로그를 전송하는 방법은 두 가지가 있습니다.

- [Amazon Data Firehose 대상][10]: Amazon Data Firehose 전송 스트림의 Datadog 대상을 사용하여 로그를 Datadog에 전달합니다. CloudWatch에서 매우 많은 양의 로그를 보낼 때 이 접근 방식을 사용하는 것이 좋습니다.
- [Forwarder Lambda 함수][11]: Datadog Forwarder Lambda 함수를 배포하면 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹을 구독하고 Datadog로 로그를 전달합니다. Lambda 함수에서 로그를 통해 트레이스, 향상된 메트릭 또는 커스텀 메트릭을 비동기 전송하는 경우 **반드시** 이 방법을 사용해야 합니다. 또, Datadog에서는 S3나 Kinesis로 직접 데이터를 스트리밍할 수 없는 다른 리소스에서 로그를 전송할 때 이 접근법을 권장합니다.

가장 많이 사용되는 AWS 서비스에 대한 로그 흐름을 얻으려면 [AWS 서비스에 대한 로깅 활성화][14] 섹션을 읽어보세요.

### 검증

로그를 활성화한 후에는 S3의 다음 예와 같이 패싯 패널의 `source` 또는 `service` 패싯을 사용하여 [Logs Explorer][15]에서 로그를 찾으세요.
{{< img src="getting_started/integrations/logs-explorer.png" alt="Datadog 계정의 Logs Explorer 페이지. 왼쪽 이미지에는 소스 및 서비스 패싯이 표시되며 둘 다 's3'으로 확인됩니다. 오른쪽에는 일부 로그 항목이 목록 형식으로 표시됩니다.">}}

## Datadog 플랫폼에서 더 많은 것을 얻으세요

### EC2의 Datadog Agent로 더욱 깊이 있는 시각화

기본적으로 Datadog AWS 통합은 AWS 제공 메트릭에 대한 CloudWatch API를 크롤링하지만 [Datadog Agent][16]를 사용하면 EC2 인스턴스에 대한 더 깊은 가시성을 얻을 수 있습니다. Agent는 메트릭과 이벤트를 보고하는 경량 데몬이며 로그 및 트레이스를 위해 구성할 수도 있습니다. Datadog 애플리케이션의 [Agent Installation][17] 섹션에서는 다양한 운영 체제에 Agent를 설치하기 위한 지침을 제공합니다. 많은 운영 체제(예: Amazon Linux)에는 Agent를 설치하기 위해 인스턴스 터미널에서 실행할 수 있는 원스텝 설치 명령이 있습니다.
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="Datadog의 'Integrations' 탭에 있는 'Agent' 섹션. 왼쪽에는 Datadog Agent에 지원되는 운영 체제 목록이 표시됩니다. 이 목록에서는 'Amazon Linux'가 강조 표시됩니다. 오른쪽에 'Use our easy one-step install'이 표시됩니다. Agent 설치 명령은 DD_API_KEY 섹션이 난독화된 상태로 이 아래에 표시됩니다.">}}

Agent가 설치되면 [인프라스트럭처 목록][18] 내에 뼈 모양 아이콘이 그래픽으로 표시됩니다.
{{< img src="getting_started/integrations/infrastructure-list.png" alt="두 개의 호스트를 목록 형식으로 표시하는 인프라스트럭처 목록입니다. 두 호스트 모두 AWS 통합에 대한 AWS 아이콘을 표시하고 파란색 상자에 표시된 'aws'는 AWS 통합과 연결되어 있음을 나타냅니다. 한 호스트에는 'ntp' 및 'system'에 대한 뼈 모양 아이콘과 파란색 상자도 표시됩니다.">}}

위의 스크린샷은 [시스템][19] 및 [NTP][20] 점검에서 데이터를 보고하는 Datadog Agent와 함께 호스트를 보여줍니다. 시스템 점검은 CPU, 메모리, 파일 시스템 및 I/O에 대한 메트릭을 제공하여 호스트에 대한 추가적인 인사이트를 제공합니다. 환경 및 사용 사례에 맞게 추가 [통합][21]을 활성화하거나 [DogStatsD][22]를 사용하여 커스텀 메트릭을 Datadog에 직접 전송할 수 있습니다.

이 접근 방식의 이점에 대한 자세한 내용은 [클라우드 인스턴스에 Datadog Agent를 설치해야 하는 이유 FAQ][23]를 참조하세요.

### Amazon 컨테이너 서비스에서 Datadog Agent 사용

컨테이너화된 환경의 경우 인스턴스를 관리하든 서버리스 환경을 위해 [Fargate][24]를 활용하든 Datadog Agent를 사용할 수 있습니다.

#### EC2 시작 유형과 ECS

[Amazon ECS 문서][25]를 사용하여 ECS 클러스터의 EC2 인스턴스에서 [Datadog Docker Agent][26]를 실행합니다. [Amazon ECS 데이터 수집 문서][27]를 검토하여 Datadog 계정에 보고된 메트릭과 이벤트를 확인합니다.

#### Fargate 시작 유형과 ECS

[AWS Fargate의 Amazon ECS 설명서][28]를 사용하여 애플리케이션과 동일한 작업 정의에서 Agent를 컨테이너로 실행하세요. **참고**: Fargate 통합을 최대한 활용하려면 Datadog Agent 버전 6.1.1 이상이 필요합니다.

#### Fargate 오케스트레이션 유형을 사용한 AWS Batch

[AWS Batch용 AWS Fargate의 Amazon ECS 설명서][58]를 사용하여 애플리케이션과 동일한 AWS Batch 작업 정의에서 Agent를 컨테이너로 실행합니다. **참고**: Fargate 통합을 최대한 활용하려면 Datadog Agent 버전 6.1.1 이상이 필요합니다.

#### EKS

[Kubernetes 배포 문서][29]에 언급된 것처럼 Amazon Elastic Kubernetes Service(EKS)에 대한 특정 구성이 필요하지 않습니다. [전용 Kubernetes 문서][30]를 참고하여 EKS 클러스터에 Agent를 배포하세요.

#### EKS와 Fargate

Fargate 포드는 AWS에서 관리되기 때문에 CPU 및 메모리와 같은 호스트 기반 시스템 검사를 제외합니다. AWS Fargate 포드에서 데이터를 수집하려면 [AWS Fargate의 Amazon EKS 설명서][31]를 참고하여 커스텀 역할 기반 액세스 제어(RBAC)를 통해 Agent를 애플리케이션 포드의 사이드카로 실행하세요. **참고**: 이를 위해서는 Datadog Agent 버전 7.17 이상이 필요합니다.

#### EKS Anywhere

온프레미스 Kubernetes 클러스터에 대해서는 [EKS Anywhere 문서][32]를 사용하세요.

### 추가 Datadog 리소스 생성
Datadog UI 또는 [API][33]를 사용하는 것 외에도 [CloudFormation Registry][35]를 사용하여 많은 [Datadog 리소스][34]를 생성할 수 있습니다. 가시성과 트러블슈팅을 위해 [대시보드][36]를 사용하여 주요 데이터를 표시하고, [함수][37]을 적용하며, [메트릭 상관 관계][38]를 확인하세요.

계정에서 원치 않거나 예상치 못한 동작에 대한 알림을 받으려면 [모니터][39]를 만드세요. 모니터는 귀하의 계정에 보고된 데이터를 지속적으로 평가하고 [알림][40]을 보내 올바른 정보가 올바른 팀 구성원에게 전달되도록 합니다. 팀에 알리는 모든 방법은 [알림 통합 목록][41]에서 확인하세요.

## 관련 제품 살펴보기

### 서버리스

Datadog에서 서버리스 애플리케이션을 실행하는 AWS Lambda 함수의 메트릭, 트레이스 및 로그를 통합할 수 있습니다. 애플리케이션 계측, [서버리스 라이브러리 및 통합][43] 설치, [서버리스 애플리케이션을 통한 분산 추적][44] 또는 [서버리스 트러블슈팅][45] 구현에 대한 지침은 [서버리스][42]를 확인하세요.

### APM
애플리케이션과 AWS 서비스에서 더 깊이 파고들어 더 많은 데이터를 수집하려면 [AWS X-Ray][46] 통합 또는 [APM][47]을 사용하는 Datadog Agent가 있는 호스트에서 분산된 트레이스를 수집할 수 있습니다. 그런 다음 이 데이터를 사용하여 애플리케이션 성능에 대한 인사이트를 얻으려면 [APM 문서][48]를 확인하세요.

또한 APM 성능 및 인프라스트럭처 메트릭에 대한 알고리즘 기능인 [Watchdog][49]을 사용하여 잠재적인 애플리케이션 문제를 자동으로 감지하고 알림을 받을 수 있습니다.

### 보안

#### 클라우드 보안 정보와 이벤트 관리(SIEM)

[Cloud SIEM 시작하기][50]를 검토하여 기본 [로그 감지 규칙][51]과 비교하여 로그를 평가하세요. 이러한 규칙은 사용자 정의가 가능하며 위협이 감지되면 [보안 신호 탐색기][52]에서 액세스할 수 있는 보안 신호를 생성합니다. 올바른 팀에 알림이 전달되도록 하려면 [알림 규칙][53]을 사용하여 여러 규칙에 걸쳐 알림 기본 설정을 구성하세요.

#### 클라우드 보안 관리 잘못된 구성

클라우드 환경에서 잘못된 구성을 감지하고 평가하는 방법을 알아보려면 [CSM Misconfigurations 설정][54] 가이드를 사용하세요. 기본 [클라우드][55] 및 [인프라스트럭처][56] 컴플라이언스 규칙에 따라 리소스 구성 데이터를 평가하여 공격자 기술 및 잠재적인 구성 오류를 표시해 빠른 대응 및 교정이 가능합니다.

### 트러블슈팅

`Datadog is not authorized to perform sts:AssumeRole` 오류가 발생하면 전용 [트러블슈팅 페이지][2]를 참조하세요. 기타 문제는 [AWS 통합 트러블슈팅 가이드][57]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/guide/forwarder/
[2]: /ko/integrations/guide/error-datadog-not-authorized-sts-assume-role/
[3]: /ko/api/latest/aws-integration/#create-an-aws-integration
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudformation/index.html
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
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
[22]: /ko/developers/dogstatsd/?tab=hostagent
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
[52]: /ko/security/cloud_siem/investigate_security_signals
[53]: /ko/security/notifications/rules/
[54]: /ko/security/cloud_security_management/setup/
[55]: /ko/security/default_rules/#cat-posture-management-cloud
[56]: /ko/security/default_rules/#cat-posture-management-infra
[57]: /ko/integrations/guide/aws-integration-troubleshooting/
[58]: /ko/integrations/ecs_fargate/?tab=webui#installation-for-aws-batch