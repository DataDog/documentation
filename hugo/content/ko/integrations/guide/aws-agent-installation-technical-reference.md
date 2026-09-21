---
description: Datadog이 AWS 통합을 통해 Amazon EC2에 Datadog Agent를 설치하고 유지 관리하는 방식(생성되는 AWS
  리소스, 설치 메커니즘, 보안 모델, Datadog Agent 수명 주기)에 대해 알아보세요.
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/
  tag: 설명서
  text: AWS 통합을 통한 Datadog Agent 설치
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: 설명서
  text: AWS 통합
- link: https://docs.datadoghq.com/agent/fleet_automation/
  tag: 설명서
  text: Fleet Automation
private: true
title: AWS 통합을 통한 Agent 설치 방법
---
이 페이지에서는 Datadog이 AWS 통합을 통해 Amazon EC2에 Datadog Agent를 설치하고 유지 관리하는 방법을 설명합니다. 설정 지침과 Datadog에서 필요한 권한은 [AWS 통합을 통한 Datadog Agent 설치][1]를 참조하세요.

<div class="alert alert-info">이 페이지에서는 Amazon EC2 환경만 다룹니다.</div>

## Datadog이 생성하는 AWS 리소스 {#aws-resources-that-datadog-creates}

CloudFormation 템플릿을 실행하면 단일 스택 내에서 다음 리소스를 한 번 생성합니다:

| 리소스 | 이름 | 목적 |
|---|---|---|
| EventBridge 연결 | `datadog-agent-resource-update-intake-connection` | Datadog으로 이벤트를 전송할 수 있도록 Datadog API 및 애플리케이션 키를 보관합니다. |
| EventBridge API 대상 | `datadog-agent-resource-update-intake-destination` | 이벤트를 `https://api.<YOUR_DD_SITE>/api/unstable/instrumenter/events`로 전송합니다(초당 10개 이벤트로 제한됨). |
| EventBridge 규칙 | `datadog-agent-resource-update-rule-ec2` | 대상 인스턴스에 변경 사항 발생 시 Datadog에 알립니다. |
| IAM 역할 | 자동 명명 | EventBridge가 `datadog-agent-resource-update-intake-destination` API 대상으로 이벤트를 전송하도록 합니다. |
| IAM 역할 | `datadog-eventbridge-cross-region-role` | 다른 리전에서 기본 리전으로 이벤트를 전송하도록 합니다. |

Datadog은 설치 시 필요에 따라 다음 리소스를 생성합니다.

| 리소스 | 이름 | 목적 |
|---|---|---|
| Systems Manager 문서 | `datadog-ec2-instrumenter` | 설치 및 제거 스크립트입니다. 계정당 하나의 문서가 있습니다. |
| Secrets Manager 보안 암호 | `/datadog/ec2-instrumenter/<ACCOUNT_ID>/<INSTANCE_ID>` | 인스턴스에서 직접 가져올 수 있도록 Datadog API 키를 보관합니다. 기본 AWS 관리형 키로 암호화됩니다. |
| IAM 역할 및 인스턴스 프로필 | `datadog-ssm-<INSTANCE_ID>` 및 `datadog-ssm-profile-<INSTANCE_ID>` | 인스턴스 프로필이 없는 경우에만 IAM 경로 `/datadog-ec2-instrumenter/` 아래에 생성되므로 이를 식별할 수 있습니다. Systems Manager가 인스턴스에 접근할 수 있도록 AWS 관리형 `AmazonSSMManagedInstanceCore` 정책을 적용합니다. |
| 인라인 IAM 정책 | `datadog-ec2-instrumenter-secrets` | 인스턴스의 역할에 추가되었습니다. `/datadog/ec2-instrumenter/` 아래의 시크릿에 대한 읽기 권한만 부여합니다. |
| 다른 리전의 EventBridge 규칙 | 기본 리전 리소스와 동일한 이름 | 변경 이벤트를 기본 리전으로 전달합니다. |

Datadog은 S3 버킷, 이벤트 버스, 로그 그룹, SSM 파라미터를 생성하지 않으며 인스턴스에 태그를 지정하지 않습니다.

## Agent 설치 원리{#how-agent-installation-works}

설치 규칙을 저장하면 Datadog은 규칙과 일치하는 인스턴스를 찾고 시간 경과에 따라 지속적으로 새로운 일치 항목을 확인합니다. Datadog은 대상 인스턴스 각각에 대해 다음 순서로 작업을 실행합니다. 전제 조건(지원되는 플랫폼 포함)은 설정 가이드의 [전제 조건][2]을 참조하세요.

1. Datadog은 각 대상 인스턴스가 실행 중인지, 지원되는 플랫폼에 있는지, AWS Systems Manager를 통해 연결 가능한지 확인합니다.
2. 인스턴스에 IAM 인스턴스 프로필이 없는 경우, Datadog은 Systems Manager가 인스턴스에 접근할 수 있도록 프로필을 생성합니다. 인스턴스에 이미 프로필이 있는 경우, Datadog은 기존 역할에 SSM 정책과 범위가 지정된 시크릿 읽기 정책을 추가합니다.
3. Datadog은 Agent가 이미 설치되어 있는지 확인합니다. Datadog이 설치하지 않은 Agent가 있는 경우, Datadog은 작업을 중단하고 해당 인스턴스를 그대로 둡니다.
4. Datadog은 `ssm:SendCommand`을 호출하여 한 번에 하나씩 인스턴스에서 `datadog-ec2-instrumenter` 문서를 실행합니다.
5. 인스턴스에서 해당 문서는 인스턴스 자체 IAM 역할을 통해 Secrets Manager에서 API 키를 가져옵니다. 그런 다음 로그 수집 및 APM 호스트 계측이 활성화된 상태로 Datadog의 표준 Agent 설치 프로그램(Linux의 경우 `install_script_agent7.sh`, Windows의 경우 표준 MSI)을 실행합니다. 명령은 6분이 지나면 시간 초과됩니다.

Datadog은 인스턴스를 재부팅하거나 다시 시작하지 않습니다. Datadog이 관리하는 유일한 서비스는 Datadog Agent 자체이며, 이는 설치 시 시작되고 제거 시 중지됩니다. 사용자의 애플리케이션 및 기타 서비스에 영향을 주지 않습니다.

### Datadog에서 제외하는 인스턴스 {#instances-that-datadog-excludes}

Datadog은 다음을 자동으로 제외합니다.

- 실행되지 않는 인스턴스
- EKS 워커 노드
- ECS 컨테이너 인스턴스
- Datadog에서 설치하지 않은 Agent가 있는 인스턴스

## 보안, 감사, 변경 제어 {#security-auditing-and-change-control}

### Datadog이 액세스 권한을 획득하는 방식 {#how-datadog-gets-access}

Datadog은 AWS 통합과 동일한 교차 계정 IAM 역할을 사용하며, 이는 외부 ID로 인증됩니다. Datadog은 수명이 짧은 임시 자격 증명을 받고, 각 작업 유형(EC2 읽기, IAM 관리, 명령 전송)은 하나의 광범위한 세션이 아닌 범위가 별도로 지정된 자격 증명 세션을 사용합니다. Datadog은 장기 지속형 AWS 키를 저장하지 않습니다.

### Datadog의 작업 감사 {#auditing-datadogs-actions}

Datadog이 수행하는 모든 작업은 표준 AWS API 호출이므로 모든 작업이 AWS CloudTrail에 표시됩니다. Datadog이 생성하는 모든 항목은 이름으로 식별할 수 있습니다. 리소스에는 `datadog-` 접두사가 붙고, 시크릿은 `/datadog/ec2-instrumenter/` 아래에 저장되며, IAM 역할은 변경 불가능한 경로 `/datadog-ec2-instrumenter/`를 사용합니다. IAM 경로는 생성 후 편집이 불가능하므로 경로를 몰래 변경할 수 없습니다. 인스턴스 내 명령 결과는 Systems Manager Run Command 기록에 나타납니다.

### API 키 처리 방법 {#how-the-api-key-is-handled}

API 키는 사용자의 Secrets Manager에 저장되며 저장 시 암호화됩니다. 시크릿의 Amazon Resource Name(ARN)만 SSM 명령으로 전달되며, 키 자체는 명령 파라미터나 CloudTrail에 나타나지 않습니다. 인스턴스는 자체 IAM 역할을 통해 단일 경로로 제한된 시크릿을 읽습니다. Datadog은 내부적으로 키 자체가 아닌 키에 대한 참조 값만 저장합니다.

### 설치 변경 권한이 있는 사용자 {#who-can-change-installations}

- **AWS**: 사용자의 자체 IAM 정책에 따라 액세스를 관리합니다. 교차 계정 권한을 제거하면 Datadog 작업이 즉시 중지됩니다.
- **Datadog**: 설치 규칙을 확인하려면 **호스트 읽기** 권한이 필요합니다. 규칙을 생성, 편집, 삭제하려면 **Agent 설치** 권한이 필요합니다. 규칙 변경에는 속도 제한이 적용됩니다.

### 안전 장치{#guardrails}

- Datadog은 직접 설치하지 않은 Agent는 제거하지 않습니다.
- Datadog은 Agent를 설치한 인스턴스를 추적하므로 자체적으로 수행한 작업만 정리합니다.
- 일부 리전을 나열할 수 없는 경우, Datadog은 대량 제거 위험을 방지하기 위해 이에 대한 정리를 건너뜁니다.

## Agent 수명 주기와 적용 범위{#agent-life-cycle-and-coverage}

### 규칙 적용 범위에 대한 지속적인 평가 {#rule-coverage-is-evaluated-over-time}

규칙은 일치하는 인스턴스를 포함하며, Datadog은 시간 경과에 따라 지속적으로 새로운 일치 항목을 확인합니다. 규칙을 저장한 후 인스턴스가 시작되거나 태그 변경으로 인해 나중에 일치하게 되는 경우, Datadog은 해당 인스턴스를 자동으로 계측합니다. Datadog은 규칙과 일치하지 않는 인스턴스를 계측하지 않습니다.

적용 범위를 고정된 인스턴스 세트로 지정하려면 해당 인스턴스를 개별적으로 선택합니다. 그러면 규칙은 선택한 인스턴스에 한해서 일치하므로 이후 확인할 때 새로운 인스턴스가 추가되지 않습니다.

고정 세트가 너무 커서 개별적으로 선택할 수 없다면 `datadog:true` 등 사용자가 제어하는 태그를 일치시킵니다. 해당 태그를 계측하려는 인스턴스에만 적용합니다. 적용 범위는 태그 변경 시에만 변경됩니다.

### Datadog에서 적용 대상 인스턴스를 동기화 상태로 유지하는 방법 {#how-datadog-keeps-covered-instances-in-sync}

Datadog은 적용 대상 인스턴스에 대해 사용자가 정의한 상태를 지속적으로 유지합니다.

- Datadog은 규칙을 정기적으로 확인하고 일치하는 인스턴스를 계측합니다.
- Datadog은 Agent가 없으면 재설치하고, 실패한 설치를 재시도하고, 더 이상 존재하지 않는 인스턴스를 정리합니다.
- 새로운 일치 항목은 일반적으로 1시간 이내, 종종 몇 분 이내에 계측됩니다.
- 이미 Agent가 설치된 인스턴스는 확인 빈도가 낮습니다.

### 적용 범위 변경 시 조치 {#what-happens-when-coverage-changes}

적용 범위가 변경되면 Datadog은 규칙의 적용 범위에 어떤 인스턴스가 추가 또는 제거되었는지 판단합니다. 규칙을 편집하거나 인스턴스에 변경 사항이 발생하면 적용 범위가 변경됩니다. Datadog은 적용 범위에 새로 포함된 인스턴스에 Agent를 설치하고, 적용 범위에 속하지 않는 인스턴스에서는 Agent를 제거합니다. 규칙을 삭제하면 해당 규칙을 적용했던 모든 인스턴스에서 Agent가 제거됩니다.

<div class="alert alert-warning">
Datadog은 Datadog의 편집이나 AWS에서 인스턴스의 태그를 다시 지정하거나 재구성함에 따라 변경이 발생하여 인스턴스가 더 이상 규칙과 일치하지 않으면 Agent를 제거합니다. 다른 팀이 변경할 수 있는 태그를 기반으로 규칙을 작성할 때는 이 동작을 고려하세요.
</div>

### 종료/중지된 인스턴스 {#terminated-or-stopped-instances}

Datadog은 종료된 인스턴스를 감지하고 해당 인스턴스에 맞게 생성한 IAM 리소스를 정리합니다. Datadog은 중지된 인스턴스가 다시 시작될 때까지 그대로 둡니다.

### 설치 실패 시 {#when-an-install-fails}

Datadog은 지연 시간을 늘려가면서(1시간, 2시간, 최대 하루에 한 번) 다시 시도합니다. 권한이 누락된 경우 **AWS 통합 타일**과 Fleet 설치 페이지에서 문제로 표시됩니다.

<div class="alert alert-warning">
누군가 적용 대상 인스턴스에서 Agent를 수동으로 제거하면 Datadog이 다시 설치합니다. 규칙을 기준으로 판단합니다. 적용 대상에서 제외하려면 인스턴스가 더 이상 규칙과 일치하지 않도록 규칙을 변경합니다.
</div>

## Agent 제거 {#uninstall-the-agent}

제거하면 Datadog Agent, Linux의 `/etc/datadog-agent` 및 `/opt/datadog-agent` 디렉터리(또는 Windows에서 MSI 제거 수행), Datadog이 해당 인스턴스에 맞게 생성한 모든 IAM 역할이나 인스턴스 프로필이 삭제됩니다. Agent를 제거하려면 인스턴스가 더 이상 일치하지 않도록 규칙 쿼리를 편집하거나, 규칙에서 인스턴스를 제거하거나, 규칙을 삭제합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/guide/aws-agent-installation/
[2]: https://docs.datadoghq.com/ko/integrations/guide/aws-agent-installation/#prerequisites