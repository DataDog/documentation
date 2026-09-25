---
description: 각 호스트에 연결하거나 호스트별 스크립트를 실행할 필요 없이, AWS 통합에서 직접 Amazon EC2 인스턴스의 Datadog
  Agent를 설치하고 관리하세요.
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-agent-installation-technical-reference/
  tag: 설명서
  text: AWS 통합을 통한 Agent 설치 방법
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: 설명서
  text: AWS 통합
- link: https://docs.datadoghq.com/integrations/guide/aws-manual-setup/
  tag: 설명서
  text: AWS 매뉴얼 설정 가이드
- link: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: 설명서
  text: 클라우드 인스턴스에 Datadog Agent를 설치하는 이유는 무엇인가요?
- link: https://docs.datadoghq.com/agent/fleet_automation/
  tag: 설명서
  text: Fleet Automation
- link: https://docs.datadoghq.com/agent/configuration/
  tag: 설명서
  text: Agent 구성
private: true
title: AWS 통합을 통한 Datadog Agent 설치
---
## 개요 {#overview}

[AWS 통합][1]은 호스트에 어떠한 프로그램도 설치하지 않은 상태로 Amazon CloudWatch에서 메트릭, 이벤트, 로그를 수집합니다. Datadog Agent를 설치하면 호스트 수준 메트릭, 분산된 트레이스(APM), Live Processes, 상세 로그 등 CloudWatch만으로 제공할 수 없는 AWS 워크로드 내부의 텔레메트리가 추가됩니다.

각 호스트에 연결하거나 호스트별 스크립트를 실행할 필요 없이, Datadog에서 직접 Datadog Agent를 Amazon EC2 인스턴스에 배포할 수 있습니다. AWS 통합을 설정하는 과정에서, 또는 설정 후 언제든지 Agent 설치를 활성화합니다.

Amazon EKS는 지원되지 않습니다.

## 전제 조건 {#prerequisites}

시작하기 전에 다음 사항을 확인하세요.

- **CloudFormation 액세스**: 대상 AWS 계정에서 CloudFormation 스택을 승인할 수 있습니다. 설치 시 계정에 스택이 배포되므로 사용자(또는 팀원)는 이를 검토하고 생성할 권한을 보유해야 합니다. 필요한 권한과 그 이유는 [필수 AWS 권한](#required-aws-permissions) 섹션을 참조하세요.
- **SSM Agent**: [AWS Systems Manager(SSM) Agent][2]가 대상 인스턴스에 이미 설치된 상태여야 합니다. Datadog은 SSM을 통해 Agent를 설치하며 SSM Agent를 대신 설치할 수 없으므로, SSM Agent가 없는 사용자 지정 AMI로 생성된 인스턴스는 대상에서 제외됩니다. Datadog은 해당 인스턴스를 표시하여 사용자가 처리할 수 있도록 합니다.
- **지원 플랫폼**: Linux(x86_64 및 arm64) 및 Windows(x86_64). arm64 기반의 macOS 및 Windows는 지원되지 않습니다.

## 필수 AWS 권한 {#required-aws-permissions}

{{% aws-agent-installation %}}

Datadog은 각 권한을 사용하여 특정 작업을 수행합니다.

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
| `events:PutRule`, `events:PutTargets`, `events:RemoveTargets`, `events:DeleteRule` | Datadog에서 인스턴스 변경 사항에 대응할 수 있도록 변경 알림을 설정합니다. |

`iam:CreateRole` 및 `iam:PassRole`은 가장 민감한 권한입니다. `iam:CreateRole`은 계정 내 `datadog-ec2-instrumenter/datadog-ssm-*`과 일치하는 역할 이름으로 제한되며, `iam:PassRole`은 Amazon EC2 서비스에 한해 사용하도록 추가 제한이 적용됩니다.

## 작동 방식 {#how-it-works}

에이전트 설치는 **설치 규칙**을 기반으로 작동합니다. 이는 AWS 계정과 포함할 EC2 인스턴스를 설명하는 쿼리가 결합된 형태입니다. Datadog은 시간 경과에 따라 지속적으로 규칙을 다시 확인하고, AWS 계정에서 일치하는 각 인스턴스에 Agent를 설치합니다.

1. 포함할 EC2 인스턴스를 선택하거나 모든 적격 인스턴스에 대해 옵트인합니다.
1. Datadog은 선택 항목에 포함되는 인스턴스를 식별합니다.
1. Datadog은 AWS Systems Manager를 통해 포함된 각 인스턴스에 Agent를 설치하고 누락된 IAM 구성을 자동으로 추가합니다.
1. Datadog은 시간 경과에 따라 지속적으로 규칙을 다시 확인합니다. 이후 일치하게 되는 인스턴스(새로 시작되거나 새 태그가 지정된 인스턴스)는 자동으로 계측됩니다.

초기 설정 시 CloudFormation 스택 하나를 한 번만 승인하면 됩니다. 그 후에는 Datadog에서 설치가 자동으로 실행되며, 설치할 때마다 새로운 CloudFormation 템플릿을 시작하지 않아도 됩니다.

Datadog이 생성하는 AWS 리소스, 설치 메커니즘, Datadog이 인스턴스를 관리하는 방법 등 전체 기술 및 보안 세부 정보는 [AWS 통합을 통한 Agent 설치 방법][6]을 참조하세요.

{{< img src="integrations/amazon_web_services/aws-agent-installation-how-it-works.png" alt="AWS Agent 설치 프로세스 순서도는 Datadog에서 이루어지는 단계와 AWS 계정 내에서 실행되는 단계를 보여줍니다." style="width:70%;" >}}

### 규칙이 인스턴스와 일치하는 방식 선택 {#choose-how-your-rule-matches-instances}

Datadog은 시간 경과에 따라 지속적으로 규칙을 다시 확인하므로, 작성한 쿼리에 따라 인프라 변경 시 적용 범위의 조정 방식이 결정됩니다.

**표시되는 인스턴스를 포함하려면**, `env:prod`와 같이 인프라에 이미 존재하는 태그 및 속성을 일치시킵니다. 규칙을 저장한 후 시작되거나 태그가 다시 지정된 인스턴스를 비롯하여 일치하는 모든 인스턴스가 계측됩니다. 규칙을 업데이트하지 않고도 새로 일치하는 인스턴스를 자동으로 모니터링하려면 이 방법을 사용합니다.

**고정된 세트를 포함하려면**, 리소스 목록에서 인스턴스를 개별적으로 선택합니다. 규칙과 일치하는 인스턴스는 선택한 항목으로 제한되므로, 나중에 표시되는 인스턴스는 추가되지 않습니다.

**고정된 세트가 너무 커서 개별적으로 선택할 수 없다면**, `datadog:true`등 사용자가 제어하는 태그를 일치시킵니다. 해당 태그를 계측하려는 인스턴스에만 적용합니다. 태그를 변경할 때만 적용 범위가 변경되므로, 코드형 인프라에 따라 어떤 인스턴스를 포함할지 결정됩니다.

<div class="alert alert-warning">
적용 범위는 양방향으로 작동합니다. 인스턴스가 규칙과 더 이상 일치하지 않으면 Datadog이 해당 인스턴스에서 Agent를 제거합니다. 따라서 AWS에서 태그를 변경하면 Datadog에서 규칙을 수정하지 않아도 인스턴스에 대한 모니터링이 제거될 수 있습니다.
</div>

### 규칙 및 태그 관련 모범 사례 {#best-practices-for-rules-and-tags}

**팀이 소유한 태그를 일치시킵니다.** 규칙이 다른 팀이 제어하는 태그와 일치하면 해당 팀은 Datadog을 열지 않은 상태에서 태그를 다시 지정하여 모니터링을 추가하거나 제거할 수 있습니다. 태그와 규칙의 소유자를 동일하게 유지할 경우 해당 결정을 내린 사람들이 계속 관리할 수 있습니다.

**정상적인 운영 과정에서 변경되는 태그는 사용하지 마세요.** 환경 승격, 배포 또는 자동 스케일링 템플릿에 따라 변경되는 태그로 인해 인스턴스가 적용 범위에 속하거나 제외될 수 있습니다. 인스턴스 수명 동안 안정적으로 유지되는 속성을 기준으로 일치시킵니다.

**규칙을 계정의 전체 구성으로 취급합니다.** 각 AWS 계정에는 리소스 유형당 하나의 규칙이 마련되어 있습니다. 수정할 때마다 기존 적용 범위에 추가하는 대신 해당 리소스 유형에 대해 모든 적용 범위를 다시 지정합니다. 저장하기 전에 일치하는 인스턴스를 검토하세요.

**제외 설정을 통해 예외를 지정하세요.** 광범위한 규칙이 제외하려는 인스턴스를 포함하는 경우, 개별 선택 목록으로 전환하는 대신 동일한 규칙에서 해당 인스턴스를 제외합니다. 제외 설정을 사용하면 규칙의 가독성을 유지하고 다른 모든 항목에 대한 자동 적용 범위를 보존할 수 있습니다.

## Agent 설치 {#install-the-agent}

계측 대상 인스턴스에 대한 제어 수준에 따라 두 가지 진입점에서 Agent 설치를 시작할 수 있습니다.

- **AWS 통합 설정(모든 적격 인스턴스에 설치)**: [AWS 통합 설정][5] 진행 시 로그 및 리소스 수집과 함께 표시되는 [AWS 통합 페이지][7]에서 Agent 설치 토글을 활성화합니다. Agent는 모든 적격 EC2 인스턴스에 설치됩니다.
- **Fleet Automation(특정 인스턴스에 설치)**: 언제든지 [AWS Agent 설치 페이지][8]를 열어 원하는 특정 EC2 인스턴스를 선택합니다.

<!-- TODO(DOCS-14545): per AWS team, surfacing the Agent install flow in the main AWS setup flow for non-first-time users is still rolling out; confirm it's live before publish. -->

설정 과정에서 Agent 설치 토글이 나타납니다.

{{< img src="integrations/amazon_web_services/aws-agent-installation-setup-toggle.png" alt="AWS 설정의 Datadog Agent 설치 단계로, 설치 토글이 활성화되어 있고 호스트 (EC2) 워크로드 토글이 켜진 상태입니다." style="width:80%;" >}}

AWS Agent 설치 페이지에서 설치하기

1. 모든 적격 인스턴스에 대해 옵트인하거나 리소스 목록에서 특정 EC2 인스턴스를 선택합니다.
1. 생성된 CloudFormation 스택을 검토한 다음 AWS로 이동하여 생성합니다. Datadog은 이 작업을 한 번만 요청합니다.
1. Datadog으로 돌아갑니다. 설치가 자동으로 진행되며, Agent가 온라인 상태가 되면 Datadog이 진행 상황을 보고합니다.

<!-- TODO(DOCS-14545): add resource-selection / Manage Agents page screenshot (AWS Install Agents page) — setup-toggle screenshot added. -->

##  설치 확인 {#verify-the-installation}

설치를 완료한 후에는

- 새로 설치된 Agent가 [인프라 목록][3] 및 호스트 맵에 표시됩니다.
- Fleet Automation은 Fleet View에 동일한 Agent를 나열합니다.

<!-- TODO(DOCS-14545): add expected time-to-data once confirmed. -->

## 설치된 Agent 관리 {#manage-installed-agents}

Fleet Automation의 [AWS Agent 설치 페이지][8]에서 AWS 통합을 통해 설치한 Agent를 관리합니다.

이 페이지에서 다음을 수행할 수 있습니다.

- 설치된 Agent와 Agent 상태를 확인합니다.
- AWS 환경의 새 인스턴스에 Agent를 설치합니다.
- 모니터링을 중단하려는 인스턴스에서 Agent를 제거합니다.

적용 대상에서 제외하려면 인스턴스가 더 이상 규칙과 일치하지 않도록 규칙을 업데이트합니다. 적용 대상 인스턴스에서 Agent를 수동으로 제거하면 Datadog이 다시 설치합니다. [Fleet Automation][4]을 통해 Agent 구성 및 버전 업그레이드를 관리합니다.

## 문제 해결 {#troubleshooting}

### EC2 인스턴스에 SSM Agent가 존재하지 않습니다 {#the-ssm-agent-is-not-present-on-an-ec2-instance}

EC2에 Agent를 설치하려면 AWS Systems Manager(SSM) Agent가 필요하며, Datadog에서 이를 대신 설치할 수 없습니다. Datadog은 사용자 지정 AMI로 빌드된 인스턴스를 포함하여 SSM Agent가 없는 모든 인스턴스를 '부적격'으로 표시합니다. SSM Agent를 인스턴스에 설치한 후 다시 시도하세요. AWS 설명서의 [Working with SSM Agent][2]를 참조하세요.

### 권한 또는 IAM 오류 발생 {#a-permission-or-iam-error-occurs}

권한이 없어 설치를 완료할 수 없는 경우, Datadog은 새로운 권한이 필요한 CloudFormation 리소스로 연결되는 알림을 표시합니다. 기존 스택을 업데이트하여 [필수 권한](#required-aws-permissions)을 부여합니다. 스택을 새로 생성할 필요는 없습니다.

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