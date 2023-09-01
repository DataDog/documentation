---
aliases:
- /ko/integrations/aws/
- /ko/logs/aws
- /ko/integrations/faq/revoking-aws-keys-and-enabling-role-delegation-for-the-datadog-aws-integration/
- /ko/integrations/faq/additional-aws-metrics-min-max-sum
- /ko/integrations/faq/why-am-i-only-seeing-the-average-values-of-my-custom-aws-cloudwatch-metrics/
categories:
- cloud
- aws
- log collection
ddtype: crawler
dependencies: []
description: Datadog와 AWS 서비스 통합.
doc_link: https://docs.datadoghq.com/integrations/amazon_web_services/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-aws-control-plane-api-usage-metrics/
  tag: 블로그
  text: Datadog에서 AWS 제어 플레인 API 사용 메트릭 모니터링
git_integration_title: amazon_web_services
has_logo: true
integration_id: amazon-web-services
integration_title: AWS
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: amazon_web_services
public_title: Datadog-AWS 통합
short_description: Datadog와 AWS 서비스 통합.
version: '1.0'
---

## 개요

Amazon Web Services(AWS)에 연결하면 다음이 가능해집니다.

- 이벤트 스트림(Event Stream)으로 AWS 상태의 자동 업데이트를 확인
- Agent 설치 없이 EC2 호스트의 클라우드와치(CloudWatch) 메트릭 수집
- EC2 호스트에 EC2 고유 정보를 태그 지정
- EC2의 일정이 설정된 점검 이벤트를 스트림에 표시
- 다양한 기타 AWS 제품에서 클라우드와치(CloudWatch) 메트릭 및 이벤트 수집
- 이벤트 스트림(Event Stream)에 클라우드와치(CloudWatch) 경보 표시

AWS를 통합해 빠르게 시작하는 방법을 알아보려면 [AWS 시작하기 가이드][1]를 참조하세요.

<div class="alert alert-warning">
Datadog의 Amazon Web Services 통합은 <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html">클라우드와치(CloudWatch)에서 모든 메트릭</a>을 수집하도록 설계되었습니다. Datadog는 계속해서 문서를 업데이트하여 모든 서브 통합을 표시하고자 최선을 다합니다. 다만 클라우드 서비스에서 빠르게 신규 메트릭 및 서비스를 출시하는 관계로, 통합 목록의 정리가 다소 늦어지는 경우가 종종 발생합니다.
</div>

| 통합                             | 설명                                                                            |
| --------------------------------------- | -------------------------------------------------------------------------------------- |
| [API Gateway][2]                        | API의 생성, 게시, 점검, 보안                                             |
| [App Runner][3]                       | 소스 코드나 컨테이너 이미지에서 빠르고 간단하며 뛰어난 비용 대비 효율로 배포할 수 있도록 지원하는 서비스.         |
| [Appstream][4]                          | AWS의 완전관리형 애플리케이션 스트리밍                                             |
| [AppSync][5]                            | 실시간 데이터 동기화와 오프라인 프로그래밍 기능을 갖춘 GraphQL 서비스 |
| [Athena][6]                             | 서버리스 대화형 쿼리 서비스                                                   |
| [Autoscaling][7]                        | EC2 용량 확장                                                                     |
| [Billing][8]                            | 빌링 및 예산 설정                                                                    |
| [CloudFront][9]                         | 로컬 콘텐츠 전송 네트워크                                                         |
| [Cloudhsm][10]                           | 관리형 HSM(하드웨어 보안 모듈)                                                 |
| [CloudSearch][11]                        | 로그 파일과 AWS API 호출 액세스                                                  |
| [CloudTrail][12]                        | 로그 파일과 AWS API 호출 액세스                                                  |
| [CodeBuild][13]                         | 완전관리형 빌드 서비스                                                            |
| [CodeDeploy][14]                        | 코드 배포의 자동화                                                              |
| [Cognito][15]                           | 안전한 가입 및 로그인                                                        |
| [Connect][16]                           | 셀프 서비스형 클라우드 기반의 고객 문의 센터 서비스                                     |
| [Direct Connect][17]                    | AWS 전용 네트워크 연결                                                    |
| [DMS][18]                               | 데이터베이스 마이그레이션 서비스                                                             |
| [DocumentDB][19]                        | MongoDB 호환 데이터베이스                                                            |
| [Dynamo DB][20]                         | NoSQL 데이터베이스                                                                         |
| [EBS(Elastic Block Store)][21]         | 영구적인 블록 레벨의 스토리지 볼륨                                                 |
| [EC2(Elastic Cloud Compute)][22]       | 클라우드의 사이즈 변경 가능한 컴퓨팅 용량                                                |
| [EC2 Spot][23]                          | 미사용 EC2 용량 활용                                                  |
| [ECS(Elastic Container Service)][24]   | 도커(Docker) 컨테이너를 지원하는 컨테이너 관리 서비스                           |
| [EFS(Elastic File System)][25]         | 공유형 파일 스토리지                                                                    |
| [EKS][26]                               | 쿠버네티스(Kubernetes)용 Elastic Container Service                                               |
| [Elastic Transcoder][27]                | 클라우드 내에서 미디어 및 비디오 트랜스코딩                                               |
| [ElastiCache][28]                       | 클라우드 내 인메모리 캐시                                                           |
| [Elastic Beanstalk][29]                 | 웹 애플리케이션과 서비스 배포 및 확장 서비스                        |
| [ELB(Elastic Load Balancing)][30]      | 수신 애플리케이션 트래픽을 여러 Amazon EC2 인스턴스로 분산          |
| [EMR(Elastic Map Reduce)][31]          | Hadoop을 사용한 데이터 처리                                                           |
| [ES(Elasticsearch)][32]                | Elasticsearch 클러스터 배포, 운영 및 확장                                      |
| [Firehose][33]                          | 스트리밍 데이터 수집 및 로딩                                                        |
| [FSx][34]                              | 윈도우즈(Windows) File Server 또는 Lustre용 확장 가능 스토리지를 제공하는 관리형 서비스.          |
| [Gamelift][35]                          | 전용 게임 서버 호스팅                                                          |
| [Glue][36]                              | 데이터를 분석용으로 추출, 변환, 로딩                                        |
| [GuardDuty][37]                         | 지능형 위협 감지                                                           |
| [Health][38]                            | AWS 리소스, 서비스, 계정 상태의 시각화                |
| [Inspector][39]                         | 보안 평가 자동화                                                          |
| [IOT(Internet of Things)][40]          | IOT 기기를 클라우드 서비스와 연결                                                |
| [Keyspaces][41]                        | 관리형 Apache Cassandra 호환 데이터베이스 서비스                                   |
| [Kinesis][42]                           | 분산된 대용량 데이터 스트림의 실시간 처리 서비스                    |
| [KMS(Key Management Service)][43]      | 암호화 키 생성 및 컨트롤                                                     |
| [Lambda][44]                            | 서버리스 컴퓨팅                                                                   |
| [Lex][45]                               | 대화형 챗봇 개발                                                                |
| [Machine Learning][46]                  | 기계 학습 모델 생성                                                         |
| [MediaConnect][47]                      | 라이브 비디오 전송                                                               |
| [MediaConvert][48]                      | 비디오의 방송용 처리 및 멀티스크린 전송                                |
| [MediaPackage][49]                      | 인터넷 전송을 위한 비디오 준비 및 보호                               |
| [MediaTailor][50]                       | 확장 가능한 서버 측의 광고 삽입                                                      |
| [MQ][51]                                | ActiveMQ용 관리형 메시지 브로커                                                    |
| [Managed Streaming for Kafka][52]       | 스트리밍 데이터를 처리하기 위해 Apache Kafka를 사용하는 애플리케이션 개발 및 실행             |
| [NAT Gateway][53]                       | 프라이빗 서브넷 내의 인스턴스를 인터넷 또는 기타 AWS 서비스에 연결 가능  |
| [Neptune][54]                           | 빠르고 믿을 수 있는 클라우드용 그래프 데이터베이스                                      |
| [Network Firewall][55]                 | VPC 경계에서 트래픽 필터링                                               |
| [OpsWorks][56]                          | 설정 관리                                                               |
| [Polly][57]                             | 텍스트 읽기 서비스                                                                    |
| [RDS(Relational Database Service)][58] | 클라우드 내 관계형 데이터베이스                                                       |
| [Redshift][59]                          | 데이터 웨어하우스 솔루션                                                                |
| [Rekognition][60]                       | 애플리케이션용 이미지 및 비디오 분석                                              |
| [Route 53][61]                          | DNS 및 트래픽 관리, 가용성 모니터링                                |
| [S3(Simple Storage Service)][62]       | 가용성과 확장성이 뛰어난 클라우드 스토리지 서비스                                    |
| [SageMaker][63]                         | 기계 학습 모델 및 알고리즘                                                 |
| [SES(Simple Email Service)][64]        | 비용 대비 효율이 뛰어난 아웃바운드 전용 이메일 전송 서비스                                    |
| [SNS(Simple Notification System)][65]  | 경고 및 알림                                                               |
| [SQS(Simple Queue Service)][66]        | 메시지 큐 서비스                                                                |
| [Storage Gateway][67]                   | 하이브리드 클라우드 스토리지                                                                   |
| [SWF(Simple Workflow Service)][68]     | 클라우드 워크플로우 관리                                                              |
| [VPC(Virtual Private Cloud)][69]       | 가상 네트워크에서 AWS 리소스 기동                                            |
| [Web Application Firewall(WAF)][70]    | 일반적인 웹 취약점 공격에 대비해 웹 애플리케이션 보호                                      |
| [Workspaces][71]                        | 안전한 데스크톱 컴퓨팅 서비스                                                       |
| [X-Ray][72]                             | 분산화 애플리케이션의 트레이싱                                                   |

## 구성

{{< site-region region="gov" >}}
<div class="alert alert-warning">AWS 역할 위임은 Datadog for Government site에서 지원되지 않습니다. <a href="?tab=accesskeysgovcloudorchinaonly#setup">액세스 키</a>를 사용해야 합니다.</div>
{{< /site-region >}}

메트릭, 트레이스, 로그 수집을 위해 AWS 계정을 Datadog에 통합하려면 다음 방법을 활용하세요.

- [역할 위임(자동)](?tab=roledelegation#automatic---cloudformation): CloudFormation 템플릿을 이용해 자동으로 필요한 AWS 역할을 구성합니다(권장).
- [역할 위임(수동)](?tab=roledelegation#manual): 직접 필요한 역할을 만들고 각각의 양식에 필수 자격증명 정보를 복사합니다.
- [액세스 키](?tab=accesskeysgovcloudorchinaonly#setup): GovCloud 또는 중국에서만 사용합니다

{{< tabs >}}
{{% tab "Role delegation" %}}

필요한 AWS 역할 구성 방법을 선택하세요. CloudFormation을 권장합니다.

### 자동 - CloudFormation

CloudFormation으로 AWS를 구성하려면 [AWS 시작하기 가이드][1]를 참조하세요.

### 수동

#### AWS

1. AWS [IAM Console][2]에서 새 역할을 생성하세요.
2. 역할 유형에서 `Another AWS account` 옵션을 선택하세요.
3. 계정 ID에서 `464622532012` (Datadog의 계정 ID)를 입력하세요. 이를 통해 Datadog에 AWS 데이터의 읽기 전용 액세스 권한을 부여합니다.
4. `Require external ID` 옵션을 선택하고 [AWS 통합 타일][3]에서 생성된 것을 입력하세요. **Require MFA**를 비활성화했는지 확인하시기 바랍니다. _외부 ID를 자세히 알아보려면 [IAM 사용자 가이드][4]를 참조하세요_.
5. `Next: Permissions`를 클릭하세요.
6. 이미 정책을 생성했다면 본 페이지에서 찾아서 선택한 다음 12단계로 이동합니다. 아직 생성하지 않았다면 `Create Policy` 옵션을 클릭하세요. 새로운 창이 열립니다.
7. `JSON` 탭을 선택합니다. 텍스트 상자 내 아래의 [정책 스니펫](#datadog-aws-iam-policy)을 사용해 Datadog에서 제공하는 AWS 통합의 장점을 모두 누려보세요. 통합에 다른 컴포넌트가 추가된 경우에는 권한 허용 설정이 바뀔 수 있습니다.
8. `Next: Tags` 및 `Review policy`을(를) 클릭하세요.
9. 정책에 `DatadogAWSIntegrationPolicy` 또는 마음에 드는 이름을 지정하고, 적절한 설명을 입력하세요.
10. `Create policy` 옵션을 클릭하면 창이 닫힙니다.
11. "역할 생성" 창으로 돌아와서, 정책 목록을 새로고침하고 방금 생성한 정책을 선택하세요.
12. (선택 사항): [AWS SecurityAudit Policy][6]를 역할에 추가해, Datadog의 [Cloud Security Posture Management 제품][5]을 사용하는 데 필요한 권한을 허용할 수 있습니다.
13. `Next: Tags` 및 `Next: Review`을(를) 클릭하세요.
14. 역할 이름을 지정하고(예: `DatadogAWSIntegrationRole`) 적절한 설명을 입력하세요.
15. `Create Role` 옵션을 클릭하세요.

**보너스**: Terraform을 사용 중이라면 [Terraform을 사용한 AWS 통합][7]을 참조해 Datadog IAM 정책을 구성하세요.

#### Datadog

1. Datadog AWS 통합 타일로 돌아가세요.
2. **Role Delegation** 탭에서 **Manually**을 선택하세요.
3. **대시(-) 기호 없이** AWS 계정 ID를 입력하세요(예시: `123456789012`). 계정 ID는 [AWS 통합 설치](#aws) 중 생성한 역할의 ARN에서 찾을 수 있습니다.
4. 생성한 역할 이름을 입력하세요. **참조:** 통합 타일에 입력하는 역할 이름은 대소문자를 구별하며, AWS에서 생성된 역할 이름과 정확하게 일치해야 합니다.
5. [Datadog is not authorized to perform sts:AssumeRole][8](Datadog에서 sts:AssumeRole 실행 불가) 오류가 발생한 경우, AWS 신뢰 정책의 `sts:ExternalId:` 항목이 Datadog AWS 통합 타일 내 생성된 `AWS External ID` 항목과 일치하는지 확인하세요.
6. 대화상자 왼쪽에서 메트릭을 수집할 AWS 서비스를 선택합니다.
7. 선택 사항: [Resource Collection][9] 기능을 활성화하려면 `Enable resource configuration collection` 상자를 체크 표시하세요(일부 제품과 기능에 필요합니다).
8. 선택 사항: 모든 호스트와 메트릭에 태그를 추가하세요.
9. 선택 사항: `to hosts with tag` 텍스트 상자에 AWS 태그를 입력해 EC2 인스턴스의 서브셋을 모니터링하세요. **참조:** 인스턴스에 접속된 EBS 볼륨에도 적용됩니다.
10. 선택 사항: `to Lambdas with tag` 텍스트 상자에 AWS 태그를 입력해 Lambdas의 서브셋을 모니터링하세요.
11. **Install Integration**을 클릭하세요.



[1]: https://docs.datadoghq.com/ko/getting_started/integrations/aws/
[2]: https://console.aws.amazon.com/iam/home#/roles
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[4]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[5]: /ko/security_platform/cspm
[6]: https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit
[7]: /ko/integrations/faq/aws-integration-with-terraform
[8]: /ko/integrations/faq/error-datadog-not-authorized-sts-assume-role/#pagetitle
[9]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#resource-collection
{{% /tab %}}

{{% tab "액세스 키(GovCloud 또는 중국 전용)" %}}

#### AWS

1. AWS 콘솔을 이용해 Datadog 통합에서 사용할 IAM 사용자를 구성하세요.
2. Datadog 통합 IAM 사용자용 액세스 키와 시크릿 키를 생성하세요.

자세한 정보는 [제3자에게 AWS 리소스 액세스 권한을 부여할 때 외부 ID를 사용하는 방법][1] AWS 설명서에서 알아볼 수 있습니다.

#### Datadog

1. [AWS 통합 타일][2]을 여세요.
2. **Access Keys (GovCloud or China Only)** 탭을 선택하세요.
3. `AWS Access Key` 및 `AWS Secret Key`를 입력하세요. GovCloud 및 중국용 액세스 키와 시크릿 키만 사용 가능합니다.
4. 대화상자 왼쪽에서 메트릭을 수집할 서비스를 선택합니다.
5. 선택 사항으로, 모든 호스트와 메트릭에 태그를 추가하세요.
6. 선택 사항: `to hosts with tag` 텍스트 상자에 AWS 태그를 입력해 EC2 인스턴스의 서브셋을 모니터링하세요. **참조:** 인스턴스에 접속된 EBS 볼륨에도 적용됩니다.
7. 선택 사항: `to Lambdas with tag` 텍스트 상자에 AWS 태그를 입력해 Lambdas의 서브셋을 모니터링하세요.
8. **Install Integration**을 클릭하세요.

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
{{% /tab %}}
{{< /tabs >}}

{{% aws-permissions %}}

## 로그 수집

Datadog로 AWS 서비스 로그를 전송하는 방법은 두 가지가 있습니다.

- [Kinesis Firehose destination][73]: Kinesis Firehose 전송 시스템에서 Datadog를 수신 대상으로 지정하여 Datadog로 로그를 전달하세요. 클라우드와치(CloudWatch)에서 평균 이상의 대용량 로그를 보낼 때 이 방법을 사용하시길 권장합니다.
- [Forwarder Lambda 함수][74]: Datadog Forwarder Lambda 함수를 배포하면 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹을 구독하고 Datadog로 로그를 전달합니다. Lambda 함수에서 로그를 통해 트레이스, 개선된 메트릭 또는 커스텀 메트릭을 비동기 전송하는 경우 **반드시** 이 방법을 사용해야 합니다. 또, Datadog에서는 S3나 기타 Kinesis로 직접 데이터를 스트리밍할 수 없는 리소스에서 로그를 전송할 때 이 접근법을 사용하시길 권장합니다.

## 메트릭 수집

Datadog로 AWS 메트릭을 전송하는 방법은 두 가지가 있습니다.

- [메트릭 폴링][75]: AWS 통합을 완료하면 API 폴링을 사용할 수 있습니다. 클라우드와치(CloudWatch) API를 메트릭별로 크롤링하여 데이터를 수집한 다음 Datadog로 전송합니다. 신규 메트릭은 평균 10분마다 가져옵니다.
- [Kinesis Firehose를 이용한 메트릭 스트리밍][76]: Amazon CloudWatch Metric Streams 및 Amazon Kinesis Data Firehose를 사용해 메트릭을 확인할 수 있습니다. **참조:** 이 방법을 사용하면 2-3분 정도 지연이 발생하며 별도의 설정이 필요합니다.

## 리소스 수집

일부 Datadog 제품은 AWS 리소스(예: S3 버킷, RDS 스냅숏, CloudFront 배포 등)의 구성 방법과 관련된 정보를 활용합니다. Datadog는 AWS 계정에 읽기 전용 API 호출을 생성해 해당하는 정보를 수집합니다.

### Cloud Security Posture Management

#### 설정

AWS 계정에서 AWS를 아직 통합하지 않았다면, 위의 [통합 설정 프로세스][77]를 완료한 다음 리소스 수집이 활성화되었는지 확인해주세요.

이미 다른 Datadog 제품에서 AWS 통합 구성을 마쳤으나 리소스 수집을 활성화하지 않았다면 다음 안내에 따라 진행하세요.

1. 자동 - CloudFormation 템플릿 업데이트
    1. CloudFormation 콘솔에서 Datadog 통합 설치 시 사용한 메인 스택을 찾아 `Update`를 선택하세요.
    2. `Replace current template` 옵션을 선택하세요.
    3. `Amazon S3 URL`을 선택하고 `https://datadog-cloudformation-template.s3.amazonaws.com/aws/main.yaml`를 입력한 다음, `next`을 클릭하세요.
    4. `CloudSecurityPostureManagementPermissions` 옵션을 참으로 설정하고, 다른 기존 파라미터를 수정하지 않고 `next`을 클릭해 `Review` 페이지가 표시될 때까지 진행합니다. 여기에서 변경 사항의 미리보기를 확인할 수 있습니다.
    5. 하단의 확인 상자 두 개를 체크 표시한 다음 `Update stack` 옵션을 클릭하세요.
2. 수동
    1. AWS에서 관리하는 `SecurityAudit` 정책을 Datadog AWS IAM 역할에 연결하세요. 이 정책은 [AWS 콘솔][78]에서 찾아볼 수 있습니다.
2. [Datadog AWS 통합 타일][79]로 이동해 다음의 안내를 따라 진행하세요.
    1. 리소스 수집을 활성화할 AWS 계정을 클릭하세요.
    2. 해당 계정의 **Resource collection** 섹션으로 이동해 `Route resource data to the Cloud Security Posture Management product` 상자를 체크 표시하세요.
    3. 타일 왼쪽 하단에서 `Update Configuration` 옵션을 클릭하세요.

## 경보 수집

AWS 클라우드와치(CloudWatch) 경보를 Datadog 이벤트 스트림 Event Stream으로 전송하는 방법은 두 가지가 있습니다.

- 경보 폴링: AWS 통합 후 경보 폴링을 사용할 수 있으며, [DescribeAlarmHistory][80] API를 통해 메트릭 경보를 가져옵니다. 이 방법을 사용하는 경우, 경보는 `Amazon Web Services` 이벤트 소스로 카테고리가 지정됩니다. **참조**: 크롤러는 컴포짓(composite) 경보를 수집하지 않습니다.
- SNS 토픽: 경보를 SNS 토픽으로 구독한 다음 SNS 메시지를 Datadog로 전달하면 모든 AWS 클라우드와치(CloudWatch) 경보를 이벤트 스트림에서 볼 수 있습니다. Datadog의 이벤트로서 SNS 메시지를 수신하는 방법을 알아보려면 [SNS 메시지 수신][81]을 참조하세요. 이 방법을 사용하는 경우, 경보는 `Amazon SNS` 이벤트 소스로 카테고리가 지정됩니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_web_services" >}}


### 이벤트

AWS의 이벤트는 AWS 서비스 단위로 수집됩니다. [AWS 서비스 설명서][83]를 참조해 수집된 이벤트에 대해 자세히 알아볼 수 있습니다.

### 태그

AWS 통합을 통해 다음의 태그가 수집됩니다. **참조**: 일부 태그는 특정 메트릭에서만 표시됩니다.

| 통합            | Datadog 태그 키                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 전체                    | `region`                                                                                                                                                                                                      |
| [API Gateway][2]      | `apiid`, `apiname`, `method`, `resource`, `stage`                                                                                                                                                             |
| [App Runner][3]      | `instance`, `serviceid`, `servicename`                                                                                                                                                                       |
| [Auto Scaling][7]    | `autoscalinggroupname`, `autoscaling_group`                                                                                                                                                                   |
| [Billing][8]          | `account_id`, `budget_name`, `budget_type`, `currency`, `servicename`, `time_unit`                                                                                                                            |
| [CloudFront][9]       | `distributionid`                                                                                                                                                                                              |
| [CodeBuild][13]              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy][14]       | `application`, `creator`, `deployment_config`, `deployment_group`, `deployment_option`, `deployment_type`, `status`                                                                                           |
| [DirectConnect][17]    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB][20]         | `globalsecondaryindexname`, `operation`, `streamlabel`, `tablename`                                                                                                                                           |
| [EBS][21]              | `volumeid`, `volume-name`, `volume-type`                                                                                                                                                                      |
| [EC2][22]              | `autoscaling_group`, `availability-zone`, `image`, `instance-id`, `instance-type`, `kernel`, `name`, `security_group_name`                                                                                    |
| [ECS][24]              | `clustername`, `servicename`, `instance_id`                                                                                                                                                                   |
| [EFS][26]              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache][28]      | `cachenodeid`, `cache_node_type`, `cacheclusterid`, `cluster_name`, `engine`, `engine_version`, `preferred_availability-zone`, `replication_group`                                                             |
| [ElasticBeanstalk][29] | `environmentname`, `enviromentid`                                                                                                                                                                             |
| [ELB][30]              | `availability-zone`, `hostname`, `loadbalancername`, `name`, `targetgroup`                                                                                                                                    |
| [EMR][31]              | `cluster_name`, `jobflowid`                                                                                                                                                                                   |
| [ES][32]               | `dedicated_master_enabled`, `ebs_enabled`, `elasticsearch_version`, `instance_type`, `zone_awareness_enabled`                                                                                                 |
| [Firehose][33]         | `deliverystreamname`                                                                                                                                                                                          |
| [FSx][34]             | `filesystemid`, `filesystemtype`                                                                                                                                                                               |
| [Health][38]           | `event_category`, `status`, `service`                                                                                                                                                                         |
| [IoT][40]              | `actiontype`, `protocol`, `rulename`                                                                                                                                                                          |
| [Kinesis][42]          | `streamname`, `name`, `state`                                                                                                                                                                                 |
| [KMS][43]              | `keyid`                                                                                                                                                                                                       |
| [Lambda][44]           | `functionname`, `resource`, `executedversion`, `memorysize`, `runtime`                                                                                                                                        |
| [Machine Learning][46] | `mlmodelid`, `requestmode`                                                                                                                                                                                    |
| [MQ][51]               | `broker`, `queue`, `topic`                                                                                                                                                                                    |
| [OpsWorks][56]         | `stackid`, `layerid`, `instanceid`                                                                                                                                                                            |
| [Polly][57]            | `operation`                                                                                                                                                                                                   |
| [RDS][58]              | `auto_minor_version_upgrade`, `dbinstanceclass`, `dbclusteridentifier`, `dbinstanceidentifier`, `dbname`, `engine`, `engineversion`, `hostname`, `name`, `publicly_accessible`, `secondary_availability-zone` |
| [RDS Proxy][84]       | `proxyname`, `target`, `targetgroup`, `targetrole`                                                                                                                                                                                                  |
| [Redshift][59]       | `clusteridentifier`, `latency`, `nodeid`, `service_class`, `stage`, `wlmid`                                                                                                                                   |
| [Route 53][61]        | `healthcheckid`                                                                                                                                                                                               |
| [S3][62]             | `bucketname`, `filterid`, `storagetype`                                                                                                                                                                       |
| [SES][64]             | 태그 키는 AWS에서 커스텀 설정됩니다.                                                                                                                                                                               |
| [SNS][65]              | `topicname`                                                                                                                                                                                                   |
| [SQS][66]              | `queuename`                                                                                                                                                                                                   |
| [VPC][69]              | `nategatewayid`, `vpnid`, `tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][71]       | `directoryid`, `workspaceid`                                                                                                                                                                                  |

### 서비스 점검
{{< get-service-checks-from-git "amazon_web_services" >}}


## 트러블슈팅

AWS 통합 관련 문제를 해결하려면 [AWS 통합 트러블슈팅 가이드][86]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/getting_started/integrations/aws/
[2]: https://docs.datadoghq.com/ko/integrations/amazon_api_gateway/
[3]: https://docs.datadoghq.com/ko/integrations/amazon_app_runner
[4]: https://docs.datadoghq.com/ko/integrations/amazon_appstream/
[5]: https://docs.datadoghq.com/ko/integrations/amazon_appsync/
[6]: https://docs.datadoghq.com/ko/integrations/amazon_athena/
[7]: https://docs.datadoghq.com/ko/integrations/amazon_auto_scaling/
[8]: https://docs.datadoghq.com/ko/integrations/amazon_billing/
[9]: https://docs.datadoghq.com/ko/integrations/amazon_cloudfront/
[10]: https://docs.datadoghq.com/ko/integrations/amazon_cloudhsm/
[11]: https://docs.datadoghq.com/ko/integrations/amazon_cloudsearch/
[12]: https://docs.datadoghq.com/ko/integrations/amazon_cloudtrail/
[13]: https://docs.datadoghq.com/ko/integrations/amazon_codebuild/
[14]: https://docs.datadoghq.com/ko/integrations/amazon_codedeploy/
[15]: https://docs.datadoghq.com/ko/integrations/amazon_cognito/
[16]: https://docs.datadoghq.com/ko/integrations/amazon_connect/
[17]: https://docs.datadoghq.com/ko/integrations/amazon_directconnect/
[18]: https://docs.datadoghq.com/ko/integrations/amazon_dms/
[19]: https://docs.datadoghq.com/ko/integrations/amazon_documentdb/
[20]: https://docs.datadoghq.com/ko/integrations/amazon_dynamodb/
[21]: https://docs.datadoghq.com/ko/integrations/amazon_ebs/
[22]: https://docs.datadoghq.com/ko/integrations/amazon_ec2/
[23]: https://docs.datadoghq.com/ko/integrations/amazon_ec2_spot/
[24]: https://docs.datadoghq.com/ko/integrations/amazon_ecs/
[25]: https://docs.datadoghq.com/ko/integrations/amazon_efs/
[26]: https://docs.datadoghq.com/ko/integrations/amazon_eks/
[27]: https://docs.datadoghq.com/ko/integrations/amazon_elastic_transcoder/
[28]: https://docs.datadoghq.com/ko/integrations/amazon_elasticache/
[29]: https://docs.datadoghq.com/ko/integrations/amazon_elasticbeanstalk/
[30]: https://docs.datadoghq.com/ko/integrations/amazon_elb/
[31]: https://docs.datadoghq.com/ko/integrations/amazon_emr/
[32]: https://docs.datadoghq.com/ko/integrations/amazon_es/
[33]: https://docs.datadoghq.com/ko/integrations/amazon_firehose/
[34]: https://docs.datadoghq.com/ko/integrations/amazon_fsx/
[35]: https://docs.datadoghq.com/ko/integrations/amazon_gamelift/
[36]: https://docs.datadoghq.com/ko/integrations/amazon_glue/
[37]: https://docs.datadoghq.com/ko/integrations/amazon_guardduty/
[38]: https://docs.datadoghq.com/ko/integrations/amazon_health/
[39]: https://docs.datadoghq.com/ko/integrations/amazon_inspector/
[40]: https://docs.datadoghq.com/ko/integrations/amazon_iot/
[41]: https://docs.datadoghq.com/ko/integrations/amazon_keyspaces/
[42]: https://docs.datadoghq.com/ko/integrations/amazon_kinesis/
[43]: https://docs.datadoghq.com/ko/integrations/amazon_kms/
[44]: https://docs.datadoghq.com/ko/integrations/amazon_lambda/
[45]: https://docs.datadoghq.com/ko/integrations/amazon_lex/
[46]: https://docs.datadoghq.com/ko/integrations/amazon_machine_learning/
[47]: https://docs.datadoghq.com/ko/integrations/amazon_mediaconnect/
[48]: https://docs.datadoghq.com/ko/integrations/amazon_mediaconvert/
[49]: https://docs.datadoghq.com/ko/integrations/amazon_mediapackage/
[50]: https://docs.datadoghq.com/ko/integrations/amazon_mediatailor/
[51]: https://docs.datadoghq.com/ko/integrations/amazon_mq/
[52]: https://docs.datadoghq.com/ko/integrations/amazon_msk/
[53]: https://docs.datadoghq.com/ko/integrations/amazon_nat_gateway/
[54]: https://docs.datadoghq.com/ko/integrations/amazon_neptune/
[55]: https://docs.datadoghq.com/ko/integrations/amazon_network_firewall/
[56]: https://docs.datadoghq.com/ko/integrations/amazon_ops_works/
[57]: https://docs.datadoghq.com/ko/integrations/amazon_polly/
[58]: https://docs.datadoghq.com/ko/integrations/amazon_rds/
[59]: https://docs.datadoghq.com/ko/integrations/amazon_redshift/
[60]: https://docs.datadoghq.com/ko/integrations/amazon_rekognition/
[61]: https://docs.datadoghq.com/ko/integrations/amazon_route53/
[62]: https://docs.datadoghq.com/ko/integrations/amazon_s3/
[63]: https://docs.datadoghq.com/ko/integrations/amazon_sagemaker/
[64]: https://docs.datadoghq.com/ko/integrations/amazon_ses/
[65]: https://docs.datadoghq.com/ko/integrations/amazon_sns/
[66]: https://docs.datadoghq.com/ko/integrations/amazon_sqs/
[67]: https://docs.datadoghq.com/ko/integrations/amazon_storage_gateway/
[68]: https://docs.datadoghq.com/ko/integrations/amazon_swf/
[69]: https://docs.datadoghq.com/ko/integrations/amazon_vpc/
[70]: https://docs.datadoghq.com/ko/integrations/amazon_waf/
[71]: https://docs.datadoghq.com/ko/integrations/amazon_workspaces/
[72]: https://docs.datadoghq.com/ko/integrations/amazon_xray/
[73]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[74]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[75]: /ko/integrations/faq/cloud-metric-delay/#aws
[76]: /ko/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?
[77]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=roledelegation#setup
[78]: https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit
[79]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[80]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_DescribeAlarmHistory.html#API_DescribeAlarmHistory_RequestParameters
[81]: https://docs.datadoghq.com/ko/integrations/amazon_sns/#receive-sns-messages
[82]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/amazon_web_services_metadata.csv
[83]: https://docs.datadoghq.com/ko/integrations/#cat-aws
[84]: https://docs.datadoghq.com/ko/integrations/amazon_rds_proxy/
[85]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_web_services/service_checks.json
[86]: https://docs.datadoghq.com/ko/integrations/guide/aws-integration-troubleshooting/