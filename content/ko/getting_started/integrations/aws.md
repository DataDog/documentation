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
  text: Kinesis Data Firehose를 이용한 AWS CloudWatch Metric Streams
- link: https://www.datadoghq.com/blog/monitor-aws-graviton3-with-datadog/
  tag: 블로그
  text: Datadog을 사용해 Graviton3-powered EC2 인스턴스 모니터링
kind: documentation
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
    * s3:CreateBucket
    * s3:DeleteBucket
    * s3:DeleteBucketPolicy
    * s3:GetEncryptionConfiguration
    * s3:GetObject
    * s3:GetObjectVersion
    * s3:PutBucketPolicy
    * s3:PutBucketPublicAccessBlock
    * s3:PutEncryptionConfiguration
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
    c. 또는 [Datadog 포워더 Lambda][1]를 사용하여 로그 및 기타 데이터를 Datadog으로 보냅니다.
    d. 또는 [클라우드 보안 관리 오류][54]를 활성화하여 클라우드 환경, 호스트, 컨테이너에서 잘못된 설정 및 보안 위험을 검색합니다.

5. **CloudFormation Template** 실행을 클릭합니다. 그러면 AWS 콘솔이 열리고 CloudFormation 스택이 로드됩니다. 이전 Datadog 양식에서 선택한 내용을 기반으로 모든 파라미터를 입력하므로 원하는 경우에는 수정할 필요가 없습니다.
**참조:** `DatadogAppKey` 파라미터는 CloudFormation 스택이 Datadog로 API를 호출해 해당 AWS 계정에 Datadog 설정을 추가하고 수정하도록 해줍니다. 키는 자동으로 생성하며, 사용자의 Datadog 계정과 연동됩니다.

6. AWS에서 필요한 상자를 선택하고 **Create stack**을 클릭합니다. 그러면 3개의 중첩된 스택과 함께 Datadog 스택에 대한 생성 프로세스가 시작됩니다. 몇 분 정도 걸릴 수 있습니다. 계속하기 전에 스택이 성공적으로 생성되었는지 점검하세요.

7. 스택이 생성되면 Datadog의 AWS 통합 타일로 돌아가서 **Ready!**를 클릭합니다

8. 최대 10분 정도를 기다리면 데이터 수집이 시작되고, 곧바로 사용 가능한 [AWS 개요 대시보드][12]가 표시됩니다. 여기에서 AWS 서비스와 인프라스터럭처에서 전송한 메트릭을 확인할 수 있습니다.
{{< img src="getting_started/integrations/aws-dashboard.png" alt="Datadog 계정 내의 AWS 개요 대시보드. 왼쪽에는 AWS 로고와 'No matching entries found'(해당하는 엔트리 없음)이라고 표시된 AWS 이벤트 그래프가 있습니다. 중앙에는 EBS 볼륨과 관련된 그래프와 수치 데이터, 일관된 데이터를 보여주는 히트맵이 표시됩니다. 오른쪽에는 ELB 관련 그래프와 수치 데이터, 출처 3곳에서 가져온 급등락 데이터를 보여주는 시계열 그래프가 있습니다.">}}

## 개별 AWS 서비스 통합 지원

이용 가능한 서브 통합의 전체 목록은 [Integrations 페이지][13]에서 확인할 수 있습니다. 대다수의 통합은 Datadog에서 AWS 계정으로 들어오는 데이터를 인식하는 시점에 기본으로 설치됩니다.

## 로그 전송

Datadog로 AWS 서비스 로그를 전송하는 방법에는 두 가지가 있습니다.

- [Kinesis Firehose destination][73]: Kinesis Firehose 전송 시스템에서 Datadog를 수신 대상으로 지정하여 Datadog로 로그를 전달하세요. CloudWatch에서 평균 이상의 대용량 로그를 보낼 때 이 방법을 사용하는 것이 좋습니다.
- [Forwarder Lambda 기능/함수][11]: S3 버킷이나 CloudWatch 로그 그룹에 가입하고 로그를 Datadog에 전달하는 Datadog Forwarder Lambda 기능/함수를 배포합니다. Lambda 함수의 트레이스, 향상된 메트릭, 커스텀 메트릭을 로그를 통해 비동기적으로 전송하려면 **반드시** 이 방법을 사용해야 합니다. 또 데이터를 직접 Kinesis로 스트리밍할 수 없는 S3이나 기타 리소스에서 로그를 전송할 때에도 이 방법을 사용하는 것이 좋습니다.

가장 많이 사용되는 AWS 서비스의 로그 흐름을 보려면 [AWS 서비스 로깅 활성화][14] 섹션을 확인하세요.

### 검증

로그를 활성화한 후에는 패싯 패널의 `source`나 `service` 패싯을 사용해 [Logs Explorer][15]에서 원하는 로그를 찾아볼 수 있습니다. 다음은 S3 예시입니다.
{{< img src="getting_started/integrations/logs-explorer.png" alt="Datadog 계정의 Logs Explorer 페이지. 왼쪽에는 Source와 Service 패싯이 표시되는데, 둘 모두 's3'으로 체크 표시되어 있습니다. 오른쪽에는 목록 형식으로 일련의 로그 엔트리가 표시됩니다.">}}

## Datadog 플랫폼 추가 활용법

### EC2의 Datadog Agent로 더욱 깊이 있는 시각화

Datadog AWS 통합은 기본적으로 CloudWatch API를 크롤링하여 AWS가 제공하는 메트릭을 얻습니다. 여기서 [Datadog 에이전트 [16]를 사용하면 EC2 인스턴스를 더욱 깊이 있게 시각화할 수 있습니다. 에이전트는 가벼운 데몬으로 메트릭이나 이벤트를 보고하며 로그나 트레이스용으로 구성할 수도 있습니다. 다양한 운영체제에 에이전트를 설치하는 방법을 알아보려면 Datadog 애플리케이션에서 [에이전트 설치] [17] 섹션을 참고하세요. 다양한 운영체제(예: Amazon Linux)에는 인스턴스 터미널에서 실행하여 에이전트를 설치할 수 있는 원스텝 설치 명령어가 존재합니다.
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="Datadog 'Integrations' 탭의 '에이전트' 섹션. 왼쪽에 Datadog Agent 지원 운영체제 목록이 표시됩니다. 이 중에서 'Amazon Linux'가 강조 표시되어 있습니다. 오른쪽에는 'Use our easy one-step install'(간단한 원스텝 설치 사용)이라는 문구가 나타납니다. 문구 아래로 에이전트를 설치하는 명령어가 있는데, DD_API_KEY 부분이 난독화되어 있습니다.">}}

에이전트가 설치되면 [Infrastructure List][18]에 뼈다귀 아이콘 그래픽이 표시됩니다.
{{< img src="getting_started/integrations/infrastructure-list.png" alt="인프라스트럭처 목록에 호스트 2개가 목록 형식으로 표시되어 있습니다.두 호스트 모두 AWS 통합용 AWS 아이콘과 AWS 통합과 관련되었음을 의미하는 파란색 상자로 표시된 'aws'를 볼 수 있습니다. 호스트 한 개는 뼈다귀처럼 생긴 아이콘과 'ntp', 'system'용 파란색 상자도 보여줍니다.">}}

위의 스크린샷은 [시스템][19] 및 [NTP][20] 점검에서 데이터를 보고하는 Datadog 에이전트와 함께 호스트를 보여줍니다. 시스템 점검은 CPU, 메모리, 파일 시스템 및 I/O에 대한 메트릭을 제공하여 호스트에 대한 추가적인 인사이트를 제공합니다. 환경 및 사용 사례에 맞게 추가 [통합][21]을 활성화하거나 [DogStatsD][22]를 사용하여 커스텀 메트릭을 Datadog에 직접 전송할 수 있습니다.

이 방법의 장점에 관한 자세한 내용은 [클라우드 인스턴스에 Datadog 에이전트를 사용해야 하는 이유 FAQ][23]를 참고하세요.

### Amazon Container Services에 Datadog 에이전트 사용

컨테이너 환경에서 인스턴스 관리나 [Fargate][24]를 이용한 서버리스 환경 활용 시에도 Datadog 에이전트를 사용할 수 있습니다.

#### EC2 시작 유형의 ECS

[Amazon ECS 설명서][25]를 활용해 ECS 클러스터 내 EC2 인스턴스에서 [Datadog Docker 에이전트][26]를 실행하세요. Datadog 계정으로 리포트하는 메트릭과 이벤트를 알아보려면 [Amazon ECS Data Collection 설명서][27]를 참고하세요.

#### Fargate 시작 유형의 ECS

[Amazon ECS on AWS Fargate 설명서][28]를 이용해 애플리케이션과 동일한 작업 정의를 사용해 컨테이너로 에이전트를 실행하세요. **참조**: Fargate 통합 시의 장점을 전부 활용하려면 Datadog 에이전트 버전 6.1.1 이상이 필요합니다.

#### EKS

[쿠버네티스 배포 설명서][29]에 안내되어 있듯, Amazon Elastic Kubernetes Service(EKS)에서는 특별한 설정이 필요하지 않습니다. [쿠버네티스 전용 설명서][30]를 참고해 EKS 클러스터에 에이전트를 배포하세요.

#### EKS와 Fargate

Fargate Pod는 AWS에서 관리하므로 CPU, 메모리를 비롯한 호스트 기반의 시스템 점검을 배제합니다. AWS Fargate Pod에서 데이터를 수집하려면 [Amazon EKS on AWS Fargate 설명서][31]를 참조하여 커스텀 RBAC(역할 기반 액세스 컨트롤)을 활용해 애플리케이션 Pod를 보조하는 역할로 에이전트를 실행하세요. **참조**: Datadog 에이전트 버전 7.17 이상이 필요합니다.

#### EKS Anywhere

온프레미스 쿠버네티스 클러스터의 경우, [EKS Anywhere 설명서][32]를 사용하세요.

### 추가 Datadog 리소스 생성
Datadog UI 또는 [API][33]을 사용하는 것 외에도 [CloudFormation 등록][35]을 사용하여 많은 [Datadog 리소스][34]를 만들 수 있습니다. 가시성과 트러블슈팅을 위해 [대시보드][36]을 사용하여 주요 데이터를 표시하고 [기능/함수][37]을 적용한 후 [메트릭 상관관계][38]를 찾습니다.

계정에서 원하지 않거나 예상하지 못한 동작이 발생했을 때 알림을 받고 싶다면 [모니터링]을 생성하세요[39]. 모니터링을 사용하면 꾸준히 계정으로 보고된 데이터를 평가하고, [알림][40]을 보내 해당하는 팀원에게 적절한 정보를 전송하도록 해줍니다. 팀에게 알림을 보내는 방법을 모두 알아보려면 [알림 통합 목록][41]을 참고하세요.

## 관련 제품 살펴보기

### 서버리스

Datadog 서버리스 애플리케이션을 실행하는 AWS Lambda 함수에서 메트릭, 트레이스, 로그를 일원화하여 관리할 수 있습니다. [서버리스][42]에서 애플리케이션 계측, [서버리스 라이브러리 및 통합][43] 설치, [서버리스 애플리케이션을 이용한 분산 트레이싱][44],  [서버리스 트러블슈팅][45]과 관련한 자세한 내용을 알아보세요.

### APM
애플리케이션과 AWS 서비스에서 더 많은 데이터를 수집하고 심층적으로 파악하려면 [애플리케이션 성능 모니터링(APM)][47]을 사용하여 [AWS 엑스레이][46] 통합이나 Datadog 에이전트와 호스트에서 분산 트레이스를 수집할 수 있습니다. 그런 다음 [애플리케이션 성능 모니터링(APM) 설명서][48]를 읽고 이 데이터를 사용하여 애플리케이션 성능에 대한 인사이트를 얻을 수 있습니다.

또한 APM 성능 및 인프라스트럭처 메트릭용 알고리즘 기능인 [Watchdog][49]을 사용해 잠재적 애플리케이션 문제를 자동으로 감지하고 알림을 받을 수 있습니다.

### 보안

#### Cloud SIEM

[Cloud SIEM을 이용해 시작하기][50]을 보고 즉각적으로 이용 가능한 [로그 탐지 규칙][51]과 비교해 로그를 평가하세요. 로그 탐지 규칙은 사용자 지정할 수 있고, 위협을 감지하면 [Security Signals Explorer][52]에서 액세스할 수 있는 보안 신호를 생성합니다. 적절한 팀에 알림을 보내려면 [알림 규칙][53]을 사용해 여러 규칙에 적용할 알림 설정을 구성하세요.

#### 클라우드 보안 관리 설정이 잘못되었을 경우

[CSM 설정이 잘못된 경우][54]의 가이드를 참고해 클라우드 환경에서 잘못된 설정을 감지하고 평가하는 방법을 알아보세요. 리소스 구성 데이터는 즉시 사용 가능한 [클라우드][55] 및 [인프라스트럭처][56] 규정 준수 규칙을 기준으로 평가되어 공격자의 기술 및 잠재적인 잘못된 구성에 플래그를 지정하여 신속한 대응 및 업데이트 적용을 가능하게 합니다.

### 문제 해결

`Datadog is not authorized to perform sts:AssumeRole`오류가 발생하면 전용 [트러블슈팅 페이지][2]를 참고하세요. 기타 문제는 [AWS 통합 트러블슈팅 가이드][57]을 참고하세요.

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
[45]: /ko/serverless/troubleshooting
[46]: /ko/integrations/amazon_xray/
[47]: /ko/tracing/trace_collection/
[48]: /ko/tracing/
[49]: /ko/watchdog/
[50]: /ko/getting_started/cloud_siem/
[51]: /ko/security/default_rules/#cat-log-detection
[52]: /ko/security/explorer/
[53]: /ko/security/notifications/rules/
[54]: /ko/security/misconfigurations/setup/
[55]: /ko/security/default_rules/#cat-posture-management-cloud
[56]: /ko/security/default_rules/#cat-posture-management-infra
[57]: /ko/integrations/guide/aws-integration-troubleshooting/