---
description: 각 호스트에 연결하거나 각 함수를 재배포할 필요 없이 AWS 통합에서 직접 Amazon EC2 인스턴스 및 AWS Lambda
  함수를 계측하세요.
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-agent-installation-technical-reference/
  tag: 문서
  text: AWS 통합을 통한 Datadog 계측의 작동 방식
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: 문서
  text: AWS 통합
- link: https://docs.datadoghq.com/integrations/guide/aws-manual-setup/
  tag: 문서
  text: AWS 매뉴얼 설정 가이드
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: 문서
  text: 클라우드 인스턴스에 Datadog Agent를 설치하는 이유는 무엇인가요?
- link: https://docs.datadoghq.com/agent/fleet_automation/
  tag: 문서
  text: Fleet Automation
- link: https://docs.datadoghq.com/agent/configuration/
  tag: 문서
  text: Agent 구성
- link: https://docs.datadoghq.com/serverless/aws_lambda/
  tag: 문서
  text: AWS Lambda용 Serverless Monitoring
- link: https://docs.datadoghq.com/serverless/aws_lambda/configuration/
  tag: 문서
  text: AWS Lambda용 Serverless Monitoring 구성하기
- link: https://docs.datadoghq.com/serverless/aws_lambda/instrumentation/
  tag: 문서
  text: AWS Lambda 계측
- link: https://docs.datadoghq.com/serverless/aws_lambda/troubleshooting/
  tag: 문서
  text: AWS Lambda 모니터링 문제 해결하기
- link: https://docs.datadoghq.com/account_management/workload_identity_federation/
  tag: 문서
  text: 워크로드 ID 페더레이션
private: true
title: AWS 통합을 통해 Datadog 계측 설치하기
---
## 개요 {#overview}

[AWS 통합][1]은 리소스에 아무것도 설치하지 않고 Amazon CloudWatch에서 메트릭, 이벤트 및 로그를 수집합니다. Datadog 계측은 호스트 수준 메트릭, 분산 트레이싱(APM), 라이브 프로세스 및 상세 로그 등 CloudWatch만으로는 제공할 수 없는 AWS 워크로드 내부의 텔레메트리 데이터를 수집합니다.

각 호스트에 연결하거나 각 함수를 재배포할 필요 없이 Datadog에서 직접 AWS 워크로드를 계측할 수 있습니다. AWS 통합을 설정하는 과정에서 또는 설정 후 언제든지 계측을 활성화하세요.

## 지원되는 워크로드 {#supported-workloads}

| 워크로드 | Datadog이 설치하는 항목 |
|---|---|
| Amazon EC2 인스턴스 | Datadog Agent |
| AWS Lambda 함수 | Datadog Lambda 확장 프로그램 및 지원되는 런타임의 경우 함수 런타임과 일치하는 Datadog 트레이싱 레이어 |

Amazon EKS는 지원되지 않습니다. Lambda 함수의 경우 Datadog은 별도의 제품인 원격 계측도 제공합니다. 어떤 것을 사용할지 결정하려면 다음 섹션을 참조하세요.

<div class="alert alert-warning">Lambda 함수는 하나의 Datadog 계측 제품으로만 관리할 수 있습니다. Datadog은 원격 계측이 이미 관리하는 함수나 사용자가 직접 계측한 함수를 건너뜁니다.</div>

## AWS 통합과 원격 계측 중 선택하기 {#choose-between-the-aws-integration-and-remote-instrumentation}

Datadog은 사용자가 직접 재배포하지 않고도 Lambda 함수에 계측을 추가하는 두 가지 방법을 제공합니다.

- **AWS 통합을 통한 계측**은 이 가이드에서 다루며 Datadog에서 전적으로 관리됩니다. Datadog은 CloudFormation 스택으로 생성된 AWS 통합 IAM 역할을 사용하여 함수를 업데이트하며, 계정에는 컴퓨팅 리소스를 배포하지 않습니다.
- **[원격 계측][9]**은 Datadog 계측기 함수인 `datadog-remote-instrumenter`를 사용자 계정에 배포합니다. 해당 함수는 계측을 적용하고 적용 상태를 유지합니다.

둘 다 동일한 Datadog Lambda 확장 프로그램 및 트레이싱 레이어를 추가하며, Datadog 외부에서 변경된 계측을 복원합니다. 작업 실행 위치, 함수 선택 방식 및 설치 항목이 서로 다릅니다.

| 측면 | AWS 통합을 통한 계측 | 원격 계측 |
|---|---|---|
| 워크로드 | Amazon EC2 인스턴스 및 AWS Lambda 함수 | AWS Lambda 함수 |
| 계정에서 실행되는 항목 | Datadog 컴퓨팅 리소스 없음. Datadog은 CloudFormation 스택으로 생성된 AWS 통합 IAM 역할을 사용하여 AWS API를 호출합니다. | 계측기 Lambda 함수 |
| 설정 범위 | AWS 계정당 하나의 CloudFormation 스택 | 계정 및 리전당 하나의 CloudFormation 스택 |
| 함수 선택 | 함수 속성에 대한 쿼리를 작성하거나, 특정 함수를 선택하거나, 모든 적격 함수를 추가합니다. Datadog은 저장하기 전에 일치하는 함수 집합을 표시합니다. | 함수 이름과 태그에 대한 타겟팅 규칙을 논리 연산자와 함께 작성합니다. |
| 나중에 일치하는 함수 | 규칙을 저장한 후 생성되었거나 태그 변경 후 일치하기 시작했는지 여부와 관계없이 자동으로 계측됩니다. | 타겟팅 규칙과 일치하면 자동으로 계측됩니다. |
| 레이어 버전 | Datadog이 선택하고 업데이트합니다. | 사용자가 설정하며, 변경하기 전까지 고정된 상태로 유지됩니다. |
| 계측된 함수가 인증하는 방법 | [Workload Identity Federation][16], 함수에 Datadog API 키 없음 | Remote Configuration이 활성화된 Datadog API 키 |
| Datadog 권한 | Hosts Read 및 Agent Install | Serverless AWS Instrumentation Read 및 Write |
| 계측 제거 | Datadog에서 제거 | 해당 리전의 CloudFormation 스택 삭제 |

두 제품 모두 사용자 계정에 CloudFormation 스택을 배포합니다. 원격 계측을 위한 스택은 CloudTrail 추적 및 관련 리소스도 생성합니다. 변경 이벤트를 Datadog으로 보내는 EventBridge 리소스를 포함하여 이 가이드의 스택이 생성하는 항목에 대해서는 [AWS 통합을 통한 Datadog 계측의 작동 방식][6]을 참조하세요.

EC2 인스턴스와 Lambda 함수를 한 곳에서 모두 계측하거나 리전, 런타임 및 메모리 크기별로 함수 목록을 좁히려면 AWS 통합을 통한 계측을 사용하세요.

`DD_TAGS`의 태그를 기준으로 일치시키거나 함수에 적용되는 레이어 버전을 설정하여 고정된 상태로 유지하려면 원격 계측을 사용하세요. 두 제품 모두 AWS 리소스 태그를 기준으로 일치시킬 수 있습니다.

## 전제 조건 {#prerequisites}

모든 워크로드에 대해 다음 사항을 확인하세요.

- **CloudFormation 액세스**: 대상 AWS 계정에서 CloudFormation 스택을 승인할 수 있습니다. 계측 시 계정에 스택이 배포되므로 사용자(또는 팀원)는 이를 검토하고 생성할 권한을 보유해야 합니다. 필요한 권한과 그 이유는 [필수 AWS 권한](#required-aws-permissions) 섹션을 참조하세요.
- **Datadog 권한**: 계측 규칙을 조회하려면 **Hosts Read** 권한이 필요합니다. 규칙을 생성, 편집, 삭제하려면 **Agent 설치** 권한이 필요합니다.

### Amazon EC2 instances {#amazon-ec2-instances}

- **SSM Agent**: [AWS Systems Manager(SSM) Agent][2]가 대상 인스턴스에 이미 설치된 상태여야 합니다. Datadog은 SSM을 통해 Agent를 설치하며 SSM Agent를 대신 설치할 수 없으므로, SSM Agent가 없는 사용자 지정 AMI로 생성된 인스턴스는 대상에서 제외됩니다. Datadog은 해당 인스턴스를 표시하여 사용자가 처리할 수 있도록 합니다.
- **지원 플랫폼**: Linux(x86_64 및 arm64) 및 Windows(x86_64). arm64 기반의 macOS 및 Windows는 지원되지 않습니다.

### AWS Lambda 함수 {#aws-lambda-functions}

- **리소스 수집**: AWS 통합에서 [리소스 수집][10]이 활성화되어 있어야 합니다. Datadog은 이를 사용하여 함수를 나열하고 규칙이 일치하는 함수를 미리 확인합니다.
- **AWS 파티션**: 함수는 상용 `aws` 파티션에 있어야 합니다. AWS GovCloud 또는 AWS 중국 파티션의 함수는 지원되지 않습니다. 이는 Lambda 계측이 [Workload Identity Federation][16]을 통해 인증을 수행하는데, 이 기능이 해당 파티션을 지원하지 않기 때문입니다.
- **패키지 유형**: 함수는 Zip 패키지 유형을 사용해야 합니다. 컨테이너 이미지 함수는 지원되지 않습니다. 이는 Datadog 계측이 Lambda 레이어로 배포되는데, 컨테이너 이미지 함수는 이를 사용할 수 없기 때문입니다.
- **아키텍처**: 함수는 `x86_64` 또는 `arm64` 중 하나의 아키텍처를 사용해야 합니다.
- **Lambda@Edge**: 함수는 Lambda@Edge 함수가 아니어야 합니다. Datadog은 복제본과 복제 대상 함수를 모두 제외합니다.
- **레이어 수**: AWS는 함수당 최대 5개의 레이어로 제한합니다. Datadog은 2개의 레이어(OS 전용 런타임의 경우 1개)를 추가하므로, 함수에는 기존 레이어 외에 해당 레이어를 추가할 여유가 있어야 합니다.
- **지원되는 런타임**:

  | 런타임 | 버전 |
  |---|---|
  | Node.js | 16.x, 18.x, 20.x, 22.x, 24.x, 26.x |
  | Python | 3.8, 3.9, 3.10, 3.11, 3.12, 3.13, 3.14 |
  | Ruby | 3.2, 3.3, 3.4, 4.0 |
  | Java | 8 (`java8` 및 `java8.al2`), 11, 17, 21, 25 |
  | .NET | 6, 8, 10 |
  | OS 전용 | `provided.al2` 및 `provided.al2023` (확장 프로그램 레이어만 사용, 트레이싱 레이어 없음) |

Datadog은 이러한 조건을 충족하지 않는 모든 함수를 규칙 미리 보기에서 부적격으로 표시하므로, 규칙을 적용하기 전에 제외되는 함수를 확인할 수 있습니다.

## 필수 AWS 권한 {#required-aws-permissions}

{{% aws-agent-installation %}}

다음 섹션에서는 모든 워크로드가 공유하는 권한 목록을 제공하고, 이어서 각 워크로드에 특정한 권한 목록을 제공합니다.

### 변경 알림 권한 {#change-notification-permissions}

이러한 권한을 통해 Datadog은 AWS 리소스 변경 사항에 대응할 수 있습니다. 모든 워크로드에 적용됩니다.

| 권한 | Datadog에서 권한이 필요한 이유|
|---|---|
| `events:PutRule`, `events:PutTargets`, `events:DescribeRule`, `events:ListTargetsByRule`, `events:RemoveTargets`, `events:DeleteRule` | Datadog에서 리소스 변경 사항에 대응할 수 있도록 변경 알림을 설정합니다 |
| `iam:GetRole`, `iam:PassRole` | EventBridge 교차 리전 역할을 읽고 전달합니다. 둘 다 `datadog-eventbridge-cross-region-role` 역할로 제한되며, `iam:PassRole`은 EventBridge 서비스로 더욱 제한됩니다 |

### Amazon EC2 권한 {#amazon-ec2-permissions}

| 권한 | Datadog에서 권한이 필요한 이유|
|---|---|
| `ec2:DescribeInstances` | 인스턴스를 찾고 규칙(상태, 태그, OS, 아키텍처)과 일치하는 인스턴스를 확인합니다. |
| `ssm:DescribeInstanceInformation` | Datadog에서 작업을 시도하기 전에 SSM Agent가 실행 중인지 확인합니다. |
| `ssm:GetDocument`, `ssm:CreateDocument`, `ssm:UpdateDocument`, `ssm:UpdateDocumentDefaultVersion` | 계정에 설치 스크립트를 게시하고 최신 상태로 유지합니다. |
| `ssm:SendCommand`, `ssm:ListCommandInvocations` | 설치를 실행하고 완료되면 설치 상태를 확인합니다. |
| `secretsmanager:DescribeSecret`, `secretsmanager:CreateSecret` | API 키가 명령에 전달되지 않도록 저장합니다. |
| `iam:CreateRole`, `iam:CreateInstanceProfile`, `iam:AddRoleToInstanceProfile`, `iam:AttachRolePolicy`, `iam:PutRolePolicy`, `iam:PassRole`, `ec2:AssociateIamInstanceProfile`, 일치하는 `Get` 및 `List` 읽기 | IAM 역할이 지정되지 않은 경우 인스턴스에 필요한 최소한의 액세스 권한을 부여합니다. Systems Manager를 통해 접근 가능하고 자체 API 키 시크릿을 읽을 수 있어야 합니다. |
| `iam:Detach*`, `iam:Delete*`, `iam:RemoveRoleFromInstanceProfile`, `ec2:Disassociate*`, `ec2:DescribeIamInstanceProfileAssociations` | 제거 시 상기 리소스를 깔끔하게 정리합니다. |
| `ecs:ListClusters`, `ecs:ListContainerInstances` | Amazon Elastic Container Service(ECS) 컨테이너 인스턴스를 인식하여 Datadog에서 이를 건너뛰도록 합니다(클러스터 수준에서 처리). |

`iam:CreateRole` 및 `iam:PassRole`은 가장 민감한 권한입니다. `iam:CreateRole`은 계정 내 `datadog-ec2-instrumenter/datadog-ssm-*`과 일치하는 역할 이름으로 제한되며, `iam:PassRole`은 Amazon EC2 서비스에 한해 사용하도록 추가 제한이 적용됩니다.

### AWS Lambda 권한 {#aws-lambda-permissions}

| 권한 | Datadog에서 권한이 필요한 이유|
|---|---|
| `lambda:ListFunctions` | 계정 및 리전의 함수 검색 |
| `cloudfront:ListDistributions` | Datadog에서 제외할 Lambda@Edge 함수 식별 |
| `lambda:GetFunctionConfiguration`, `lambda:ListTags` | 규칙과 일치하는 함수를 확인하기 위한 함수 구성 및 태그 조회 |
| `lambda:UpdateFunctionConfiguration` | Datadog 레이어 및 환경 변수 추가 및 제거 시 삭제 |
| `lambda:GetLayerVersion` | 변경되지 않은 사용자 레이어를 포함하여 함수 업데이트 시 제출되는 모든 레이어의 승인을 요구하는 AWS 요구 사항 충족 |

Lambda 계측에는 Secrets Manager, Systems Manager 또는 IAM 쓰기 권한이 필요하지 않습니다. 함수 읽기 및 업데이트는 사용자 계정의 AWS Lambda 함수로 제한됩니다.

## 작동 방식 {#how-it-works}

계측은 **계측 규칙**을 기반으로 작동합니다. 이는 AWS 계정과 포함할 리소스를 설명하는 쿼리가 결합된 형태입니다. Datadog은 쿼리를 평가하고, 사용자 계정 내의 각 대상 리소스를 계측하며, 계측 상태를 유지합니다.

1. 포함할 리소스를 설명하는 쿼리를 작성하거나, 특정 리소스를 선택하거나, 모든 적격 리소스를 추가합니다.
1. Datadog은 계정에서 규칙을 평가하고 규칙이 적용되는 리소스를 기록합니다.
1. Datadog은 각 대상 리소스를 계측합니다. EC2의 경우 AWS Systems Manager를 통해 Agent를 설치하고, Lambda의 경우 함수에 Datadog 레이어와 환경 변수를 추가합니다.
1. Datadog은 대상 리소스에 계측이 적용된 상태를 유지하며, 누락된 계측을 다시 설치하고 실패한 작업을 재시도합니다.

초기 설정 시 CloudFormation 스택 하나를 한 번만 승인하면 됩니다. 그 후에는 새 CloudFormation 템플릿을 실행할 필요 없이 Datadog에서 계측이 자동으로 실행됩니다.

전체 기술 및 보안 세부 정보(예: Datadog이 생성하는 AWS 리소스, 계측 메커니즘, Datadog이 계측을 유지하는 방법 등)는 [AWS 통합을 통한 Datadog 계측의 작동 방식][6]을 참조하세요.

{{< img src="integrations/amazon_web_services/aws-agent-installation-how-it-works.png" alt="AWS Agent 설치 프로세스 순서도는 Datadog에서 이루어지는 단계와 AWS 계정 내에서 실행되는 단계를 보여줍니다." style="width:70%;" >}}

<!-- TODO(DOCS-14545): the "How it works" diagram shows the EC2 flow only. Add a Lambda equivalent (or a workload-agnostic version) before publish. -->

### 규칙의 리소스 일치 방식 선택 {#choose-how-your-rule-matches-resources}

Datadog은 시간 경과에 따라 지속적으로 규칙을 다시 평가하므로, 작성한 쿼리에 따라 인프라 변경 시 적용 범위가 어떻게 달라지는지 결정됩니다.

**리소스가 나타날 때마다 포함하려면**, `env:prod`와 같이 인프라에 이미 존재하는 태그 및 속성을 일치시킵니다. 규칙을 저장한 후 생성되거나 태그가 다시 지정된 리소스를 비롯하여 일치하는 모든 리소스가 계측됩니다. 규칙을 업데이트하지 않고도 새로 일치하는 리소스를 자동으로 모니터링하려면 이 방법을 사용하세요.

**고정된 세트를 포함하려면**, 리소스 목록에서 리소스를 개별적으로 선택합니다. 규칙과 일치하는 리소스는 선택한 항목으로 제한되므로, 나중에 표시되는 리소스는 추가되지 않습니다.

**고정된 세트가 너무 커서 개별적으로 선택할 수 없다면**, `datadog:true`등 사용자가 제어하는 태그를 일치시킵니다. 해당 태그를 계측하려는 리소스에만 적용합니다. 태그를 변경할 때만 적용 범위가 변경되므로, 코드형 인프라에 따라 어떤 리소스가 포함되는지가 결정됩니다.

<div class="alert alert-warning">
적용 범위는 양방향으로 작동합니다. 리소스가 규칙과 일치하지 않게 되면 Datadog은 해당 리소스에서 계측을 해제합니다. 따라서 AWS에서 태그를 변경하면 Datadog에서 규칙을 수정하지 않아도 리소스에 대한 모니터링이 해제될 수 있습니다.
</div>

### 규칙 및 태그 관련 모범 사례 {#best-practices-for-rules-and-tags}

**팀이 소유한 태그를 일치시킵니다.** 규칙이 다른 팀이 제어하는 태그와 일치하면 해당 팀은 Datadog을 열지 않은 상태에서 태그를 다시 지정하여 모니터링을 추가하거나 제거할 수 있습니다. 태그와 규칙의 소유자를 동일하게 유지할 경우 해당 결정을 내린 사람들이 계속 관리할 수 있습니다.

**정상적인 운영 과정에서 변경되는 태그는 사용하지 마세요.** 환경 승격, 배포 또는 자동 스케일링 템플릿에 따라 변경되는 태그로 인해 리소스가 적용 범위에 포함되거나 제외될 수 있습니다. 리소스 수명 동안 안정적으로 유지되는 속성을 기준으로 일치시키세요.

**규칙을 계정의 전체 구성으로 취급합니다.** 각 AWS 계정에는 리소스 유형당 하나의 규칙이 마련되어 있습니다. 수정할 때마다 기존 적용 범위에 추가하는 대신 해당 리소스 유형에 대해 모든 적용 범위를 다시 지정합니다. 저장하기 전에 일치하는 리소스를 검토하세요.

**제외 설정을 통해 예외를 지정하세요.** 광범위한 규칙이 제외하려는 리소스를 포함하는 경우, 개별 선택 목록으로 전환하는 대신 동일한 규칙에서 해당 리소스를 제외합니다. 제외 설정을 사용하면 규칙의 가독성을 유지하고 다른 모든 항목에 대한 자동 적용 범위를 보존할 수 있습니다.

## Datadog이 Lambda 함수에서 변경하는 사항 {#what-datadog-changes-on-a-lambda-function}

Datadog은 기존 레이어와 환경 변수를 보존합니다. Node.js 및 Python 함수의 경우, Datadog은 핸들러를 Datadog 핸들러로 리디렉션하고 원래 핸들러를 환경 변수에 유지합니다. Datadog은 변경 사항을 정확하게 기록하므로 제거하면 원래 구성이 복원됩니다. Datadog이 수행하는 특정 레이어, 환경 변수 및 핸들러 변경 사항에 대해서는 기술 참조의 [Datadog이 함수에서 변경하는 사항][17]을 참조하세요.

**Datadog API 키는 함수에 기록되지 않습니다.** 확장 프로그램은 [Workload Identity Federation][16]을 통해 함수 자체의 실행 역할로 인증하므로 Lambda 계측을 위해 계정에 Datadog 자격 증명이 저장되지 않습니다. Datadog이 이 인증을 설정하므로 구성할 항목이 없습니다.

확장 프로그램이 수집하는 항목을 조정하려면 함수에서 표준 Datadog 환경 변수를 설정하세요. 전체 목록은 [AWS Lambda용 Serverless Monitoring 구성][14]을 참조하세요. 계측이 수집하는 항목과 활성화되는 Lambda 모니터링 기능에 대해서는 [AWS Lambda용 Serverless Monitoring][13]을 참조하세요.

## Datadog 계측 설치 {#install-datadog-instrumentation}

계측 대상 리소스를 얼마나 세밀하게 제어할지에 따라 두 가지 진입점에서 계측을 시작할 수 있습니다.

- **AWS 통합 설정(모든 적격 리소스 계측)**: [AWS 통합 설정][5] 진행 시 로그 및 리소스 수집 옆에 있는 [AWS 통합 페이지][7]에서 계측 토글을 활성화하세요. 그런 다음 원하는 워크로드를 선택하세요. Datadog은 해당 워크로드에 대한 모든 적격 리소스를 계측하며, 적격 리소스가 나타날 때마다 계속해서 계측합니다.
- **Fleet Automation(특정 리소스 계측)**: 언제든지 [AWS Agent 설치 페이지][8]를 열어 원하는 특정 리소스를 선택하세요.

<!-- TODO(DOCS-14545): per AWS team, surfacing the install flow in the main AWS setup flow for non-first-time users is still rolling out; confirm it's live before publish. -->

계측 토글은 설정 중에 나타나며, **EC2 인스턴스**, **Lambda 함수**, **EKS 클러스터**가 목록으로 표시된 워크로드 선택기가 함께 표시됩니다. **EC2 인스턴스** 및 **Lambda 함수**만 선택할 수 있습니다.

{{< img src="integrations/amazon_web_services/aws-agent-installation-setup-toggle.png" alt="AWS 설정의 Datadog Agent 설치 단계로, 설치 토글이 활성화되어 있고 호스트 (EC2) 워크로드 토글이 켜진 상태입니다." style="width:80%;" >}}

<!-- TODO(DOCS-14545): the setup-toggle screenshot predates the Lambda workload. Recapture it showing EC2 Instances, Lambda Functions, and EKS Clusters (Coming Soon) before publish. -->

AWS Agent 설치 페이지에서 설치하기

1. 계측할 워크로드를 선택합니다. **EC2 인스턴스** 또는 **Lambda 함수**.
1. 포함할 리소스를 설명하는 쿼리를 작성하거나, 목록에서 특정 리소스를 선택하거나, 모든 적격 리소스를 추가합니다. Lambda의 경우 리전, 런타임 및 메모리 크기별로 목록을 좁힐 수 있습니다.
1. 일치하는 리소스의 미리 보기를 검토합니다. Datadog이 계측할 수 없는 리소스는 이유와 함께 부적격으로 표시됩니다.
1. 생성된 CloudFormation 스택을 검토한 다음 AWS로 이동하여 생성합니다. Datadog은 이 작업을 한 번만 요청합니다.
1. Datadog으로 돌아갑니다. 계측이 자동으로 진행되며, 리소스가 계측됨에 따라 Datadog이 진행 상황을 보고합니다.

<!-- TODO(DOCS-14545): add resource-selection / Manage Agents page screenshot (AWS Install Agents page) — setup-toggle screenshot added. -->

## 계측 검증 {#verify-instrumentation}

계측이 완료되면 다음을 확인하세요.

- **EC2**: 새로 설치된 Agent가 [인프라 목록][3] 및 호스트 맵에 표시됩니다. Fleet Automation은 Fleet View에 동일한 Agent를 표시합니다.
- **Lambda**: 계측된 함수는 [Serverless][11] 페이지에 표시되며, 해당 트레이스는 [APM][12]에 표시됩니다. 함수가 계측되었는데 텔레메트리가 수신되지 않으면 [AWS Lambda 모니터링 문제 해결][15]을 참조하세요.

<!-- TODO(DOCS-14545): add expected time-to-data once confirmed. -->

## 계측된 리소스 관리 {#manage-instrumented-resources}

Fleet Automation의 [AWS Agent 설치 페이지][8]에서 AWS 통합을 통해 계측한 리소스를 관리하세요.

이 페이지에서 다음을 수행할 수 있습니다.

- 계측된 리소스와 상태 조회
- AWS 환경의 새 리소스 계측
- 더 이상 모니터링하지 않을 리소스에서 계측 제거

규칙을 기준으로 판단합니다. 적용 범위를 중지하려면 규칙을 업데이트하세요. 계측 대상 리소스에서 직접 계측을 제거하면 Datadog이 이를 복원합니다. EC2의 경우, [Fleet Automation][4]을 통해 Agent 구성 및 버전 업그레이드를 관리합니다. Lambda의 경우, Datadog은 레이어 버전을 자동으로 업데이트합니다.

## Datadog 계측 제거 {#remove-datadog-instrumentation}

계측을 제거하려면 규칙에서 리소스를 제거하거나, 규칙의 쿼리를 편집하거나, 규칙을 삭제하세요. 규칙을 삭제하면 해당 규칙의 모든 적용 대상에서 계측이 제거됩니다.

- **EC2**: Datadog은 각 인스턴스에 대해 생성한 Datadog Agent와 모든 IAM 역할 또는 인스턴스 프로필을 제거합니다.
- **Lambda**: Datadog은 추가했던 레이어를 제거하고 함수가 이전에 가지고 있던 환경 변수와 핸들러를 복원합니다. 사용자가 직접 추가한 레이어와 환경 변수는 그대로 유지됩니다.

## 문제 해결 {#troubleshooting}

### EC2 인스턴스에 SSM Agent가 존재하지 않습니다 {#the-ssm-agent-is-not-present-on-an-ec2-instance}

EC2에 Agent를 설치하려면 AWS Systems Manager(SSM) Agent가 필요하며, Datadog에서 이를 대신 설치할 수 없습니다. Datadog은 사용자 지정 AMI로 빌드된 인스턴스를 포함하여 SSM Agent가 없는 모든 인스턴스를 '부적격'으로 표시합니다. SSM Agent를 인스턴스에 설치한 후 다시 시도하세요. AWS 문서의 [Working with SSM Agent][2]를 참조하세요.

### 권한 또는 IAM 오류 발생 {#a-permission-or-iam-error-occurs}

권한이 없어 계측을 완료할 수 없는 경우, Datadog은 새로운 권한이 필요한 CloudFormation 리소스로 연결되는 알림을 표시합니다. 기존 스택을 업데이트하여 [필수 권한](#required-aws-permissions)을 부여하세요. 스택을 새로 생성할 필요는 없습니다.

### 이미 계측된 Lambda 함수 건너뛰기 {#a-lambda-function-is-skipped-as-already-instrumented}

Datadog은 Datadog 레이어, Datadog 핸들러 또는 Datadog이 적용하지 않은 Datadog 환경 변수가 포함된 함수는 건너뜁니다. 이러한 함수를 건너뛰면 레이어 및 구성 충돌을 방지할 수 있습니다. 대신 AWS 통합에서 함수를 관리하려면 기존 Datadog 계측을 제거하세요. 그러면 Datadog이 자동으로 함수를 계측합니다.

[원격 계측][9]으로 관리되는 함수도 건너뛰며, Datadog은 함수가 둘 중 어떤 경우에 해당하는지 알려줍니다. 함수는 하나의 Datadog 계측 제품으로만 관리될 수 있습니다.

### Lambda 함수의 레이어 제한 초과 {#a-lambda-function-exceeds-the-layer-limit}

AWS는 함수당 레이어를 5개로 제한하며, Datadog은 2개의 레이어(OS 전용 런타임의 경우 1개)를 추가합니다. 함수에 이미 충분한 레이어가 있어 계측 시 제한을 초과하게 되는 경우, Datadog은 이를 보고하고 재시도하지 않고 중단합니다. 공간을 확보하려면 함수에서 레이어를 제거하세요. 그러면 Datadog이 자동으로 함수를 계측합니다.

### Lambda 함수에서 Datadog 외 실행 래퍼 사용 {#a-lambda-function-uses-a-non-datadog-execution-wrapper}

Java 및 .NET 계측은 `AWS_LAMBDA_EXEC_WRAPPER`를 설정합니다. 함수가 이미 해당 변수를 Datadog 래퍼가 아닌 다른 값으로 설정한 경우, Datadog은 사용자의 래퍼를 덮어쓰지 않고 함수를 건너뜁니다. AWS 통합을 통해 함수를 계측하려면 함수에서 사용자 지정 래퍼를 제거하세요. 함수에 자체 래퍼가 필요한 경우 대신 직접 계측하세요. [AWS Lambda 계측하기][18]를 참조하세요.

### Lambda 함수가 부적격으로 표시됨 {#a-lambda-function-appears-as-ineligible}

Datadog은 함수가 [Lambda 필수 구성 요소](#aws-lambda-functions)를 충족하지 못할 때 해당 함수를 부적격으로 표시합니다. 가장 일반적인 이유는 컨테이너 이미지 패키지 유형, 지원되지 않는 런타임 또는 아키텍처, 상용 `aws` 파티션 외부의 함수, Lambda@Edge 함수입니다. Lambda@Edge 복제본 및 해당 복제본이 복제하는 함수는 모두 제외됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/systems-manager/latest/userguide/ssm-agent.html
[3]: https://app.datadoghq.com/infrastructure
[4]: https://docs.datadoghq.com/ko/agent/fleet_automation/
[5]: https://docs.datadoghq.com/ko/getting_started/integrations/aws/
[6]: https://docs.datadoghq.com/ko/integrations/guide/aws-agent-installation-technical-reference/
[7]: https://app.datadoghq.com/integrations/amazon-web-services
[8]: https://app.datadoghq.com/fleet/install-agent/latest?platform=aws
[9]: https://docs.datadoghq.com/ko/serverless/aws_lambda/remote_instrumentation/
[10]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#resource-collection
[11]: https://app.datadoghq.com/functions
[12]: https://app.datadoghq.com/apm/traces
[13]: https://docs.datadoghq.com/ko/serverless/aws_lambda/
[14]: https://docs.datadoghq.com/ko/serverless/aws_lambda/configuration/
[15]: https://docs.datadoghq.com/ko/serverless/aws_lambda/troubleshooting/
[16]: https://docs.datadoghq.com/ko/account_management/workload_identity_federation/
[17]: https://docs.datadoghq.com/ko/integrations/guide/aws-agent-installation-technical-reference/#what-datadog-changes-on-a-function
[18]: https://docs.datadoghq.com/ko/serverless/aws_lambda/instrumentation/