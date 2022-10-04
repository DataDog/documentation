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
- link: integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/??tab=cloudformation
  tag: 설명서
  text: Kinesis Data Firehose를 이용한 AWS CloudWatch Metric Streams
- link: https://www.datadoghq.com/blog/monitor-aws-graviton3-with-datadog/
  tag: 블로그
  text: https://www.datadoghq.com/blog/monitor-aws-graviton3-with-datadog/
kind: documentation
title: AWS를 이용해 시작하기
---

## 개요

본 가이드는 Datadog의 CloudFormation 템플릿을 사용해 Datadog로 Amazon Web Services(AWS) 계정을 통합하는 프로세스를 간략히 소개합니다.

간단하게 보면, 여기에는 Datadog의 AWS 계정이 데이터 수집이나 푸시를 위해 AWS 계정으로 API를 호출하도록 허용하는 IAM 역할 및 관련 정책 작성이 포함됩니다. 본 템플릿은 Datadog로 로그를 전송하기 위한 [Datadog Forwarder][1] Lambda 함수를 배포합니다. CloudFormation 템플릿을 사용하면 Datadog 계정으로 데이터를 전송할 때 필요한 모든 도구를 지원받을 수 있으며, Datadog는 최신 기능을 제공하기 위해 CloudFormation 템플릿을 유지 관리합니다.

최초로 연결한 후, AWS 환경과 관련된 개별 AWS 서비스를 통합할 수 있습니다. 클릭 한 번이면 Datadog에서 AWS 계정에 필요한 리소스를 프로비저닝하고, 사용하는 서비스의 메트릭과 이벤트를 쿼리하기 시작합니다. 주요 AWS 서비스를 사용 중인 경우, Datadog는 곧바로 사용 가능한 대시보드를 제공합니다. 이 대시보드는 즉시 시각화를 제공하며 사용자 맞춤형 설정도 가능합니다. 본 가이드는 통합 구성, [CloudTrail][2] 및 Forwarder Lambda 함수에서 로그 전송, 아마존 리눅스 EC2 인스턴스에 Datadog Agent를 설치하는 방법을 설명합니다. 사용 가능한 서브 통합의 목록은 [개별 AWS 서비스 통합 활성화](#enable-integrations-for-individual-aws-service) 섹션에서 참고해주세요.

이번 프로세스는 여러 AWS 계정에서 필요한 만큼 반복할 수 있습니다. 또는 [API][3], [AWS CLI][4]나 [Terraform][5]를 사용해 한 번에 여러 계정을 구성하기도 가능합니다. 더 자세한 정보는 [Datadog-Amazon CloudFormation 가이드][6]에서 알아볼 수 있습니다.

## 전제 조건

시작하기 전에 다음의 전제 조건을 충족하는지 확인하세요.

1. [AWS][7] 계정. AWS 사용자가 다음의 IAM 권한을 허용해야 CloudFormation 템플릿을 실행할 수 있습니다.

    * cloudformation:CreateStack
    * ec2:DescribeSecurityGroups
    * ec2:DescribeSubnets
    * ec2:DescribeVpcs
    * iam:AttachRolePolicy
    * iam:CreatePolicy
    * iam:CreateRole
    * iam:PassRole
    * iam:PutRolePolicy
    * iam:UpdateAssumeRolePolicy
    * kms:Decrypt
    * lambda:AddPermission
    * lambda:CreateFunction
    * lambda:GetCodeSigningConfig
    * lambda:GetFunction
    * lambda:GetFunctionCodeSigningConfig
    * lambda:InvokeFunction
    * lambda:PutFunctionConcurrency
    * logs:CreateLogGroup
    * logs:DescribeLogGroups
    * logs:PutRetentionPolicy
    * s3:CreateBucket
    * s3:GetObject
    * s3:GetObjectVersion
    * secretsmanager:CreateSecret
    * secretsmanager:GetSecretValue
    * secretsmanager:PutSecretValue
    * serverless:CreateCloudFormationTemplate


## 설정


2. Datadog 계정에 표시된 [Integrations 페이지][8]의 AWS 타일에서 해당 AWS 계정과 통합하고자 하는 Datadog 제품을 선택하세요. 그러면 해당 제품에 맞추어 AWS 계정의 데이터 통합용 기본 설정이 적절하게 선택됩니다. 이러한 설정은 필요에 따라 추후 변경할 수 있습니다.
{{< img src="getting_started/integrations/cloudformation-setup.png" alt="Datadog AWS 통합 타일에 통합을 확정하는 옵션이 표시됩니다. Role Delegation 탭이 강조 표시되어 있습니다.">}}

3. CloudFormation 스택을 시작할 AWS 리전을 선택합니다. AWS 로그를 Datadog로 전송하는 Datadog Lambda Forwarder를 생성할 위치도 설정합니다(Log Management를 선택한 경우).

    **참조**: 어느 리전을 선택하든 관계없이, CloudWatch 메트릭은 모든 AWS 리전에서 수집합니다.

4. AWS 계정에서 Datadog로 데이터를 전송할 때 사용할 Datadog API Key를 선택하거나 생성합니다.

5. "Launch CloudFormation Template"을 클릭하세요. AWS 콘솔이 열리며 CloudFormation 스택을 불러옵니다. 모든 파라미터는 이전 Datadog 양식에서 선택한 내용을 바탕으로 미리 입력된 상태입니다. 그러니 별도의 요구 사항이 없다면 파라미터를 수정할 필요가 없습니다.
**참조:** `DatadogAppKey` 파라미터는 CloudFormation 스택이 Datadog로 API를 호출해 해당 AWS 계정에 Datadog 설정을 추가하고 수정하도록 해줍니다. 키는 자동으로 생성하며, 사용자의 Datadog 계정과 연동됩니다.
{{< img src="getting_started/integrations/params.png" alt="AWS CloudFormation의 create-stack 페이지에서 Stack 이름이 datadog로, IAMRoleName이 DatadogIntegrationRole로, ExternalId가 be46로 끝나는 난독화 값, DdApiKey가 난독화 값으로 나타납니다.">}}

6. AWS에서 필수 항목에 체크한 다음 `Create stack`을 클릭합니다.
    {{< img src="getting_started/integrations/cloudformation-complete.png" alt="AWS CloudFormation Stacks 페이지 왼쪽의 'Stacks' 열 아래에 완성된 스택 4개가 표시됩니다. 스택은 datadog-DatadogIntegrationRoleStack, datadog-DatadogPolicyMacroStack, datadog-ForwarderStack, datadog입니다. 각 스택은 생성 타임스탬프, CREATE_COMPLETE 표기와 함께 녹색 체크 표시가 되어 있습니다. 'datadog' 스택이 강조 표시되었으며 'Events' 탭이 나타납니다. 이벤트 9개와 각각의 타임스탬프, 로지컬 ID, 상태, 상태의 사유가 목록으로 정리되어 있습니다. 이러한 이벤트는 각 스택의 서로 다른 생성 단계를 참조합니다.">}}
이렇게 하면 Datadog 스택과 중첩 스택 3개의 생성 프로세스가 시작됩니다. 프로세스를 완료하기까지 몇 분 정도가 걸립니다. 계속 진행하기 전에 스택이 제대로 생성되었는지 확인하세요.

7. 스택을 생성한 후 Datadog의 AWS 통합 타일로 돌아가서 새로 생성한 계정 항목을 찾으세요. "Refresh to Check Status"를 클릭하면 페이지 상단에 성공 메시지가 나타나면서, 관련된 상세 정보와 함께 새 계정이 페이지에 표시됩니다.

    {{< img src="getting_started/integrations/new-account.png" alt="계정을 보여주는 Datadog 계정의 AWS 통합 타일. 새 계정 섹션과 메시지는 CloudFormation 통합이 완료 대기 중임을 보여줍니다. 상태를 새로고침해 확인하기 위한 버튼이 있고, 상태를 확인하기 전에 CloudFormation 스택 생성을 점검하라는 경고가 표시되어 있습니다.">}}

    사용하는 AWS 서비스나 모니터링 사용 사례에 따라 통합 타일 내에 수집 데이터를 특정하기 위한 옵션이 다양하게 존재합니다. 예를 들면 AWS 서비스, 네임스페이스 또는 태그를 기반으로 데이터 수집을 제한할 수 있습니다. 또한, 모니터링 알림을 음소거할 수도 있습니다. 직접 트리거한 종료나 [EC2 자동화][9]를 사용하는 자동 스케일링에 따라 트리거된 종료 등이 그 예시입니다. 필요한 경우, CloudWatch 경보를 Datadog [Event Explorer][11]로 전송하기 위해 [Alarm Collection] [10]을 활성화하고 커스텀 메트릭 수집 여부를 선택합니다.

8. 최대 10분 정도를 기다리면 데이터 수집이 시작되고, 곧바로 사용 가능한 [AWS 개요 대시보드][12]가 표시됩니다. 여기에서 AWS 서비스와 인프라에서 전송한 메트릭을 확인할 수 있습니다.
{{< img src="getting_started/integrations/aws-dashboard.png" alt="Datadog 계정 내의 AWS 개요 대시보드. 왼쪽에는 AWS 로고와 'No matching entries found'(해당하는 엔트리 없음)이라고 표시된 AWS 이벤트 그래프가 있습니다. 중앙에는 EBS 볼륨과 관련된 그래프와 수치 데이터, 일관된 데이터를 보여주는 히트맵이 표시됩니다. 오른쪽에는 ELB 관련 그래프와 수치 데이터, 출처 3곳에서 가져온 급등락 데이터를 보여주는 시계열 그래프가 있습니다.">}}

## 개별 AWS 서비스의 통합 활성화

이용 가능한 서브 통합의 전체 목록은 [Integrations 페이지][13]에서 확인할 수 있습니다. 대다수의 통합은 Datadog에서 AWS 계정으로 들어오는 데이터를 인식하는 시점에 기본으로 설치됩니다.

## 로그 전송

Datadog로 AWS 로그를 전송하는 방법의 전체 목록은 [AWS 서비스의 로그 활성화][14]를 참조하세요.

### 검증

로그를 활성화한 후에는 파셋 패널의 `source` 또는 `service` 파셋을 사용해 [Logs Explorer][15]에서 원하는 로그를 찾아볼 수 있습니다. S3에서의 예시는 다음과 같습니다.
{{< img src="getting_started/integrations/logs-explorer.png" alt="Datadog 계정의 Logs Explorer 페이지. 왼쪽에는 Source와 Service 파셋이 표시되는데, 둘 모두 's3'으로 체크 표시되어 있습니다. 오른쪽에는 목록 형식으로 일련의 로그 엔트리가 표시됩니다.">}}

## Datadog 플랫폼의 추가 활용법

### EC2의 Datadog Agent로 더욱 깊이 있는 시각화

Datadog AWS 통합은 기본적으로 CloudWatch API를 크롤링하여 AWS가 제공하는 메트릭을 얻습니다. 여기서 [Datadog Agent] [16]을 사용하면 EC2 인스턴스를 더욱 깊이 있게 시각화할 수 있습니다. Agent는 가벼운 데몬으로서 메트릭이나 이벤트를 리포트하며, 로그나 트레이스용으로 구성할 수도 있습니다. Datadog 애플리케이션의 [Agent Installation] [17] 섹션은 다양한 운영체제에 Agent를 설치하는 방법을 설명합니다. 다양한 운영체제(예: 아마존 리눅스)에는 인스턴스 터미널에서 실행하여 Agent를 설치할 수 있는 원스텝 설치 명령어가 존재합니다.
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="Datadog 'Integrations' 탭의 'Agent' 섹션. 왼쪽에 Datadog Agent 지원 운영체제 목록이 표시됩니다. 이 중에서 'Amazon Linux'(아마존 리눅스)가 강조 표시되어 있습니다. 오른쪽에는 'Use our easy one-step install'(간단한 원스텝 설치 사용)이라는 문구가 나타납니다. 문구 아래로 Agent를 설치하는 명령어가 있는데, DD_API_KEY 부분이 난독화되어 있습니다.">}}

Agent가 설치되면 [Infrastructure List][18]에 뼈다귀 아이콘 그래픽이 표시됩니다.
{{< img src="getting_started/integrations/infrastructure-list.png" alt="인프라스트럭처 목록에 호스트 2개가 목록 형식으로 표시되어 있습니다.두 호스트 모두 AWS 통합용 AWS 아이콘과 AWS 통합과 관련되었음을 의미하는 파란색 상자로 표시된 'aws'를 볼 수 있습니다. 호스트 한 개는 뼈다귀처럼 생긴 아이콘과 'ntp', 'system'용 파란색 상자도 보여줍니다.">}}

위의 스크린샷은 [System][19] 및 [NTP][20] 점검에서 얻은 데이터를 리포트하는 Datadog Agent와 호스트를 보여줍니다. System 점검은 CPU, 메모리, 파일 시스템, I/O 관련 메트릭을 보고하면서 호스트에 대한 추가 인사이트를 제공합니다. 추가 [통합][21]을 활성화해 환경과 사용 사례에 맞추거나, 추가로 [DogStatsD][22]를 사용해 Datadog로 직접 커스텀 메트릭을 전송할 수 있습니다. 

이러한 접근법의 장점을 더 자세히 알고 싶다면 [클라우드 인스턴스에 Datadog Agent를 사용해야 하는 이유 FAQ][23]를 참조하세요.

### Amazon Container Services와 함께 Datadog Agent 사용

컨테이너 환경에서 인스턴스 관리나 [Fargate][24]를 이용한 서버리스 환경 활용 시에도 Datadog Agent를 사용할 수 있습니다.

#### EC2 시작 유형의 ECS

[Amazon ECS 설명서][25]를 활용해 ECS 클러스터 내 EC2 인스턴스에서 [Datadog Docker Agent][26]를 실행하세요. Datadog 계정으로 리포트하는 메트릭과 이벤트를 알아보려면 [Amazon ECS Data Collection 설명서][27]를 참조하시기 바랍니다.

#### Fargate 시작 유형의 ECS

[Amazon ECS on AWS Fargate 설명서][28]를 이용해 애플리케이션과 동일한 작업 정의를 사용해 컨테이너로서 Agent를 실행하세요. **참조**: Fargate 통합 시의 장점을 전부 활용하려면 Datadog Agent version 6.1.1 이상이 필요합니다.

#### EKS

[Kubernetes Distributions 설명서][29]에서 명시했듯, Amazon Elastic Kubernetes Service (EKS)의 경우 특별한 설정이 필요하지 않습니다. [쿠버네티스(Kubernetes) 전용 설명서][30]를 참조해 EKS 클러스터에 Agent를 배포하세요.

#### EKS와 Fargate

Fargate 파드는 AWS에서 관리하므로 CPU, 메모리를 비롯한 호스트 기반의 시스템 점검을 배제합니다. AWS Fargate 파드에서 데이터를 수집하려면 [Amazon EKS on AWS Fargate 설명서][31]를 참조해, 커스텀 RBAC(역할 기반 액세스 컨트롤)로 애플리케이션 파드의 사이드카로서 Agent를 실행하세요. **참조**: Datadog Agent version 7.17 이상이 필요합니다.

#### EKS Anywhere

온프레미스 쿠버네티스(Kubernetes) 클러스터의 경우, [EKS Anywhere 설명서][32]를 이용하세요.

### 추가 Datadog 리소스 생성
Datadog UI나 [API][33]의 사용과 더불어, [CloudFormation Registry][35]에서 다양한 [Datadog 리소스][34]를 생성할 수 있습니다. 시각화와 트러블슈팅 시에는 [대시보드][36]에서 주요 데이터 표시, [함수][37] 적용, [메트릭 상관관계][38] 찾기 등의 기능을 이용해보세요.

계정에서 원하지 않거나 예상하지 못한 동작이 발생했을 때 알림을 받고 싶다면 [모니터링]을 생성하세요[39]. 모니터링을 사용하면 꾸준히 계정으로 보고된 데이터를 평가하고, [알림][40]을 보내 해당하는 팀원에게 적절한 정보를 전송하도록 해줍니다. 팀에게 알림을 보내는 방법을 모두 알아보려면 [알림 통합 목록][41]을 참조하세요.

## 관련 제품 살펴보기

### 서버리스

Datadog 서버리스 애플리케이션을 실행하는 AWS Lambda 함수에서 메트릭, 트레이스, 로그를 일원화하여 관리할 수 있습니다. [서버리스][42]에서 애플리케이션 인스트루먼테이션, [서버리스 라이브러리 및 통합][43] 설치, [서버리스 애플리케이션을 이용한 분산 트레이싱][44], 또는 [서버리스 트러블슈팅][45] 관련 안내를 참조하세요.

### APM
애플리케이션과 AWS 서비스에서 한층 깊이 있게, 더 많은 데이터를 수집하고자 하는 경우 [AWS X-Ray][46] 통합이나 [APM][47]을 사용하는 Datadog Agent 호스트를 통한 분산 트레이싱 수집을 활성화하세요. 그리고 [Datadog APM 살펴보기][48]를 참조해, 데이터를 활용하여 애플리케이션 성능 인사이트를 얻는 방법을 더욱 자세하게 알아볼 수 있습니다.

또한 APM 성능 및 인프라스트럭처 메트릭용 알고리즘 기능인 [Watchdog][49]을 사용하여, 발생 가능한 애플리케이션 문제를 자동으로 감지하고 알림을 받을 수 있습니다.

### 보안

#### Cloud SIEM

[Cloud SIEM을 이용해 시작하기][50]를 살펴보면서 즉각 이용 가능한 [로그 탐지 규칙][51]과 비교해 로그를 평가하세요. 로그 탐지 규칙은 커스텀이 가능하며, 위협을 감지하면 [Security Signals Explorer][52]에서 액세스할 수 있는 보안 신호를 생성합니다. 적절한 팀에 알림을 보내려면 [알림 규칙][53]을 사용해 여러 규칙에 적용할 알림 설정을 구성하세요.

#### CSPM

[CSPM을 이용해 시작하기][54] 가이드를 읽고 클라우드 환경의 구성 오류 검출과 평가에 대해 알아보세요. 리소스 설정 데이터는 곧바로 이용 가능한 Posture Management [Cloud][55] 및 [인프라스트럭처][56] 탐지 규칙을 기준으로 평가되며, 공격자의 기술과 발생 가능한 구성 오류에 플래그를 지정해 신속한 대응과 복구를 지원합니다.

### 트러블슈팅
문제가 발생하는 경우 [트러블슈팅][57] 섹션을 확인해주세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/logs/guide/forwarder/
[2]: https://aws.amazon.com/cloudtrail/
[3]: /kr/api/latest/aws-integration/#create-an-aws-integration
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudformation/index.html
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
[6]: /kr/integrations/guide/amazon_cloudformation/
[7]: https://aws.amazon.com/getting-started/?nc1=f_cc
[8]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[9]: /kr/integrations/amazon_ec2/#ec2-automuting
[10]: /kr/integrations/amazon_web_services/?tab=roledelegation#alarm-collection
[11]: /kr/events/explorer
[12]: https://app.datadoghq.com/screen/integration/7/aws-overview
[13]: /kr/integrations/#cat-aws
[14]: /kr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service
[15]: https://app.datadoghq.com/logs
[16]: /kr/getting_started/agent/
[17]: https://app.datadoghq.com/account/settings#agent
[18]: https://app.datadoghq.com/infrastructure
[19]: /kr/integrations/system/
[20]: /kr/integrations/ntp/
[21]: /kr/integrations/
[22]: /kr/developers/dogstatsd/?tab=hostagent
[23]: /kr/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[24]: https://aws.amazon.com/fargate/
[25]: /kr/agent/amazon_ecs/?tab=awscli
[26]: /kr/agent/docker/?tab=standard
[27]: /kr/agent/amazon_ecs/data_collected/
[28]: /kr/integrations/ecs_fargate/?tab=fluentbitandfirelens
[29]: /kr/agent/kubernetes/distributions/?tab=helm#EKS
[30]: /kr/agent/kubernetes/?tab=helm
[31]: /kr/integrations/eks_fargate/#setup
[32]: /kr/integrations/eks_anywhere/
[33]: /kr/api/latest/using-the-api/
[34]: /kr/integrations/guide/amazon_cloudformation/#resources-available
[35]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[36]: /kr/dashboards/#overview
[37]: /kr/dashboards/functions/
[38]: /kr/dashboards/correlations/
[39]: /kr/monitors/create/#monitor-types
[40]: /kr/monitors/notify/
[41]: /kr/integrations/#cat-notification
[42]: /kr/serverless
[43]: /kr/serverless/libraries_integrations
[44]: /kr/serverless/distributed_tracing
[45]: /kr/serverless/troubleshooting
[46]: /kr/integrations/amazon_xray/?tab=nodejs
[47]: /kr/tracing/trace_collection/
[48]: /kr/tracing/#explore-datadog-apm
[49]: /kr/watchdog/
[50]: /kr/security_platform/cloud_siem/getting_started/
[51]: /kr/security_platform/default_rules/#cat-log-detection
[52]: /kr/security_platform/explorer/
[53]: /kr/security_platform/notifications/rules/
[54]: /kr/security_platform/cspm/getting_started/
[55]: /kr/security_platform/default_rules/#cat-posture-management-cloud
[56]: /kr/security_platform/default_rules/#cat-posture-management-infra
[57]: /kr/integrations/amazon_web_services/?tab=roledelegation#troubleshooting