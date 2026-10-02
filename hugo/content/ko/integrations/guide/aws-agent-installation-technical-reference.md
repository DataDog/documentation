---
description: AWS 통합을 통해 Datadog이 Amazon EC2 인스턴스와 AWS Lambda 함수를 계측하는 방법(생성되는 AWS
  리소스, 계측 메커니즘, 보안 모델, Datadog이 계측을 유지하는 방식)을 알아보세요.
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/
  tag: 설명서
  text: AWS 통합을 통한 Datadog 계측 설치
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: 설명서
  text: AWS 통합
- link: https://docs.datadoghq.com/agent/fleet_automation/
  tag: 설명서
  text: Fleet Automation
- link: https://docs.datadoghq.com/account_management/workload_identity_federation/
  tag: 설명서
  text: 워크로드 ID 페더레이션
private: true
title: AWS 통합을 통한 Datadog 계측의 작동 방식
---
이 페이지에서는 AWS 통합을 통해 Datadog이 AWS 워크로드를 계측하고 유지 관리하는 방법을 설명합니다. 설정 지침과 Datadog에서 필요한 권한은 [AWS 통합을 통한 Datadog 계측 설치][1]를 참조하세요.

이 페이지는 Amazon EC2 인스턴스와 AWS Lambda 함수를 다룹니다. Amazon EKS는 지원되지 않습니다.

Datadog은 Lambda 함수를 위한 [원격 계측][4]도 제공합니다. 원격 계측은 Datadog에서 변경하는 대신 사용자 계정에 계측 함수를 배포합니다. 두 방식에 대한 비교는 설정 가이드의 [AWS 통합과 원격 계측 중 선택][6]을 참조하세요.

## Datadog이 생성하는 AWS 리소스 {#aws-resources-that-datadog-creates}

### CloudFormation 스택에서 한 번 생성 {#created-once-by-the-cloudformation-stack}

CloudFormation 템플릿을 실행하면 단일 스택 내에서 다음 리소스를 한 번 생성합니다.

| 리소스 | 이름 | 목적 |
|---|---|---|
| EventBridge 연결 | `datadog-agent-resource-update-intake-connection` | Datadog으로 이벤트를 전송할 수 있도록 Datadog API 및 애플리케이션 키를 보관합니다. |
| EventBridge API 목적지 | `datadog-agent-resource-update-intake-destination` | 리소스 변경 이벤트를 Datadog으로 전송합니다. |
| EventBridge 규칙 | `datadog-agent-resource-update-rule-ec2` | 대상 인스턴스에 변경 사항 발생 시 Datadog에 알립니다. EC2 워크로드 선택 시 생성 |
| EventBridge 규칙 | `datadog-agent-resource-update-rule-lambda` | 대상 함수에 변경 사항 발생 시 Datadog에 알립니다. Lambda 워크로드 선택 시 생성 |
| IAM 역할 | 자동 명명 | EventBridge가 `datadog-agent-resource-update-intake-destination` API 목적지로 이벤트를 전송하도록 합니다. |
| IAM 역할 | `datadog-eventbridge-cross-region-role` | 다른 리전에서 기본 리전으로 이벤트를 전달하도록 합니다. |

또한 이 스택은 선택한 워크로드에 대한 IAM 권한을 AWS 통합 역할에 연결합니다. Lambda 워크로드만 선택하는 경우, 스택은 EC2 권한을 부여하지 않습니다.

### EC2 인스턴스에 필요할 때 생성 {#created-as-needed-for-ec2-instances}

| 리소스 | 이름 | 목적 |
|---|---|---|
| Systems Manager 문서 | `datadog-ec2-instrumenter` | 설치 및 제거 스크립트입니다. 계정당 하나의 문서가 있습니다. |
| Secrets Manager 시크릿 | `/datadog/ec2-instrumenter/<ACCOUNT_ID>/<INSTANCE_ID>` | 인스턴스에서 직접 가져올 수 있도록 Datadog API 키를 보관합니다. 기본 AWS 관리형 키로 암호화됩니다. |
| IAM 역할 및 인스턴스 프로필 | `datadog-ssm-<INSTANCE_ID>` 및 `datadog-ssm-profile-<INSTANCE_ID>` | 인스턴스 프로필이 없는 경우에만 IAM 경로 `/datadog-ec2-instrumenter/` 아래에 생성되므로 이를 식별할 수 있습니다. Systems Manager가 인스턴스에 접근할 수 있도록 AWS 관리형 `AmazonSSMManagedInstanceCore` 정책을 적용합니다. |
| 인라인 IAM 정책 | `datadog-ec2-instrumenter-secrets` | 인스턴스의 역할에 추가되었습니다. `/datadog/ec2-instrumenter/` 아래의 시크릿에 대한 읽기 권한만 부여합니다. |
| 다른 리전의 EventBridge 규칙 | 기본 리전 리소스와 동일한 이름 | 변경 이벤트를 기본 리전으로 전달합니다. |

Datadog은 S3 버킷, 이벤트 버스, 로그 그룹, SSM 파라미터를 생성하지 않으며 인스턴스에 태그를 지정하지 않습니다.

### Lambda 함수에 추가 리소스가 생성되지 않음 {#no-additional-resources-created-for-lambda-functions}

CloudFormation 스택이 생성하는 Lambda EventBridge 규칙 외에, Datadog은 Lambda 계측을 위해 어떠한 AWS 리소스도 생성하지 않습니다. 다른 유일한 변경 사항은 규칙이 적용되는 함수의 구성에 대한 것입니다. Datadog은 Lambda를 위한 시크릿, IAM 역할 또는 SSM 문서를 생성하지 않으며, 함수에 태그를 지정하지 않습니다.

## 계측 작동 방식 {#how-instrumentation-works}

계측 규칙을 저장하면 Datadog은 정의한 쿼리를 계정에 적용하여 대상 리소스를 결정한 다음, 각 리소스에 대해 다음 단계를 실행합니다. 전제 조건(지원되는 플랫폼 및 런타임 포함)은 설정 가이드의 [전제 조건][2]을 참조하세요.

### Amazon EC2의 경우 {#on-amazon-ec2}

1. Datadog은 각 대상 인스턴스가 실행 중인지, 지원되는 플랫폼에 있는지, AWS Systems Manager를 통해 연결 가능한지 확인합니다.
2. 인스턴스에 IAM 인스턴스 프로필이 없는 경우, Datadog은 Systems Manager가 인스턴스에 접근할 수 있도록 프로필을 생성합니다. 인스턴스에 이미 프로필이 있는 경우, Datadog은 기존 역할에 SSM 정책과 범위가 지정된 시크릿 읽기 정책을 추가합니다.
3. Datadog은 Agent가 이미 설치되어 있는지 확인합니다. Datadog이 설치하지 않은 Agent가 있는 경우, Datadog은 작업을 중단하고 해당 인스턴스를 그대로 둡니다.
4. Datadog은 `ssm:SendCommand`을 호출하여 한 번에 하나씩 인스턴스에서 `datadog-ec2-instrumenter` 문서를 실행합니다.
5. 인스턴스에서 해당 문서는 인스턴스 자체 IAM 역할을 통해 Secrets Manager에서 API 키를 가져옵니다. 그런 다음 로그 수집 및 APM 호스트 계측이 활성화된 상태로 Datadog의 표준 Agent 설치 프로그램(Linux의 경우 `install_script_agent7.sh`, Windows의 경우 표준 MSI)을 실행합니다.

Datadog은 인스턴스를 재부팅하거나 다시 시작하지 않습니다. Datadog이 관리하는 유일한 서비스는 Datadog Agent 자체이며, 이는 설치 시 시작되고 제거 시 중지됩니다. 사용자의 애플리케이션 및 기타 서비스에 영향을 주지 않습니다.

### AWS Lambda의 경우 {#on-aws-lambda}

Lambda 계측은 전적으로 Datadog에서 실행됩니다. Datadog은 함수를 계측하기 위해 계측 함수와 같은 컴퓨팅 리소스를 사용자 계정에 배포하지 않습니다.

1. Datadog은 함수의 현재 구성 및 태그를 읽고 [Lambda 전제 조건][3]을 충족하는지 확인합니다.
2. Datadog은 함수가 이미 계측되었는지 확인합니다. Datadog은 Datadog 레이어, Datadog 핸들러 또는 Datadog이 적용하지 않은 Datadog 환경 변수가 포함된 함수는 건너뜁니다. 또한 Datadog은 [원격 계측][4]으로 관리되는 함수를 건너뛰고 두 가지 이유 중 무엇이 적용되는지 보고합니다.
3. Datadog은 함수의 런타임, 아키텍처, 리전 및 AWS 파티션에 대한 Datadog 레이어 버전을 확인합니다. Datadog은 설치를 재현할 수 있도록 당시 가장 최신 버전이 아닌 검증된 레이어 버전을 적용합니다.
4. Datadog은 원하는 전체 구성을 계산하고 실제로 변경하기 전에 변경할 내용을 정확히 기록합니다.
5. Datadog은 함수의 실행 역할이 Datadog 조직으로 텔레메트리를 보낼 수 있도록 권한을 부여합니다. [Lambda 텔레메트리 인증 방법](#how-lambda-telemetry-is-authenticated) 섹션을 참조하세요.
6. Datadog은 `lambda:UpdateFunctionConfiguration`을 한 번 호출하여 전체 레이어 목록과 환경 맵을 제출합니다. Datadog은 AWS가 성공을 보고한 후에만 변경 사항을 적용된 것으로 표시합니다.

Lambda 업데이트는 교체 방식 작업입니다. 즉, 제출된 레이어 목록과 환경 맵이 새로운 구성이 됩니다. 따라서 Datadog은 기존 상태에 추가하는 대신 원하는 전체 상태를 계산하므로 기존 레이어와 환경 변수가 보존됩니다. 업데이트에는 함수의 수정 ID가 포함되므로 Datadog의 읽기 및 쓰기 작업 사이에 계정에서 변경이 발생하면 변경 사항을 덮어쓰는 대신 업데이트가 실패합니다.

### Datadog이 함수에서 변경하는 사항 {#what-datadog-changes-on-a-function}

| 변경 | 적용 대상 |
|---|---|
| Datadog 확장 프로그램 레이어(`Datadog-Extension` 또는 `Datadog-Extension-ARM`)을 추가합니다. | 지원되는 모든 런타임 |
| 해당 Datadog 트레이싱 레이어를 추가합니다. | Node.js, Python, Ruby, Java 및 .NET |
| `DD_SITE` 및 `DD_ORG_UUID` | 를 설정합니다. |지원되는 모든 런타임
| 핸들러를 Datadog 핸들러로 리디렉션하고 원본을 `DD_LAMBDA_HANDLER` | 에 이동합니다. |Node.js 및 Python
| `AWS_LAMBDA_EXEC_WRAPPER`를 `/opt/datadog_wrapper` | 로 설정합니다. |Java 및 .NET

Datadog은 함수 코드, 메모리 크기, 시간 초과, VPC 구성, 동시성 또는 기타 함수 설정을 변경하지 않습니다.

### Datadog에서 제외하는 리소스 {#resources-that-datadog-excludes}

EC2에서 Datadog은 다음을 제외합니다.

- 실행되지 않는 인스턴스
- EKS worker 노드
- ECS 컨테이너 인스턴스
- Datadog에서 설치하지 않은 Agent가 있는 인스턴스

Lambda에서 Datadog은 다음을 제외합니다.

- 컨테이너 이미지 함수 및 지원되지 않는 런타임이나 아키텍처의 함수
- 상용 `aws` 파티션 외부의 함수
- Lambda@Edge 복제본 및 해당 복제본이 복제하는 함수
- 사용자 또는 원격 계측에 의해 이미 계측된 함수
- `AWS_LAMBDA_EXEC_WRAPPER`를 Datadog이 아닌 래퍼로 이미 설정한 함수
- Datadog 레이어를 추가하면 AWS의 5개 레이어 제한을 초과하는 함수

## 보안, 감사, 변경 제어 {#security-auditing-and-change-control}

### Datadog이 액세스 권한을 획득하는 방식 {#how-datadog-gets-access}

Datadog은 AWS 통합과 동일한 교차 계정 IAM 역할을 사용하며, 이는 외부 ID로 인증됩니다. Datadog은 수명이 짧은 임시 자격 증명을 받고, 각 작업 유형(EC2 읽기, IAM 관리, 명령 전송, 함수 업데이트)은 하나의 광범위한 세션이 아닌 범위가 별도로 지정된 자격 증명 세션을 사용합니다. Datadog은 장기 지속형 AWS 키를 저장하지 않습니다.

### Datadog의 작업 감사 {#auditing-datadogs-actions}

Datadog이 수행하는 모든 작업은 표준 AWS API 호출이므로 모든 작업이 AWS CloudTrail에 표시됩니다. Datadog이 생성하는 모든 항목은 이름으로 식별할 수 있습니다. 리소스에는 `datadog-` 접두사가 붙고, 시크릿은 `/datadog/ec2-instrumenter/` 아래에 저장되며, IAM 역할은 변경 불가능한 경로 `/datadog-ec2-instrumenter/`를 사용합니다. IAM 경로는 생성 후 편집이 불가능하므로 경로를 몰래 변경할 수 없습니다. 인스턴스 내 명령 결과는 Systems Manager Run Command 기록에 나타납니다. Lambda 구성 변경 사항은 AWS 통합 역할에 귀속된 `UpdateFunctionConfiguration` 이벤트로 나타납니다.

### EC2의 API 키 처리 방식 {#how-the-api-key-is-handled-on-ec2}

API 키는 사용자의 Secrets Manager에 저장되며 저장 시 암호화됩니다. 시크릿의 Amazon Resource Name(ARN)만 SSM 명령으로 전달되며, 키 자체는 명령 파라미터나 CloudTrail에 나타나지 않습니다. 인스턴스는 자체 IAM 역할을 통해 단일 경로로 제한된 시크릿을 읽습니다. Datadog은 내부적으로 키 자체가 아닌 키에 대한 참조 값만 저장합니다.

### Lambda 텔레메트리 인증 방식 {#how-lambda-telemetry-is-authenticated}

Lambda 계측은 사용자 계정에 Datadog 자격 증명을 저장하지 않습니다. Datadog 확장 프로그램은 Datadog이 함수에 설정한 `DD_ORG_UUID` 및 `DD_SITE` 값을 사용하여 [워크로드 ID 페더레이션][5]을 통해 함수의 AWS 실행 ID로 인증합니다. Datadog API 키, 시크릿 ARN 또는 KMS 암호화 키는 함수의 구성에 기록되지 않습니다.

해당 인증이 성공하려면 Datadog은 함수의 실행 역할이 사용자의 Datadog 조직으로 텔레메트리를 보낼 수 있도록 권한을 부여합니다. Datadog은 함수를 업데이트하기 전에 이 권한 부여를 설정하며, 더 넓은 패턴이 아닌 실행 역할과 정확히 일치하도록 합니다.

단일 실행 역할이 여러 함수에서 공유되는 경우가 많기 때문에 Datadog은 이러한 권한 부여를 생성하지만 제거 시에는 삭제하지 않습니다. 공유 역할에 대한 권한 부여를 제거하면 해당 역할에 여전히 의존하는 다른 함수가 중단될 수 있습니다.

### 계측 변경 권한 {#who-can-change-instrumentation}

- **AWS**: 사용자의 자체 IAM 정책에 따라 액세스를 관리합니다. 교차 계정 권한을 제거하면 Datadog 작업이 즉시 중지됩니다.
- **Datadog**: 계측 규칙을 확인하려면 **Hosts Read** 권한이 필요합니다. 규칙을 생성, 편집, 삭제하려면 **Agent Install** 권한이 필요합니다. 규칙 변경에는 속도 제한이 적용됩니다.

### 안전 장치{#guardrails}

- Datadog은 설치하지 않은 계측은 절대 제거하지 않습니다.
- Datadog은 계측한 리소스를 추적하므로 자체 작업만 정리합니다.
- EC2에서 일부 리전을 나열할 수 없는 경우, Datadog은 계측이 대량으로 제거될 위험을 피하기 위해 정리를 건너뜁니다.
- Lambda에서 Datadog은 계측하기 전에 기록한 구성에서 함수를 복원하므로, 제거 시 Datadog이 수행한 변경 사항이 정확히 되돌려집니다.
- 실패의 영향 범위는 개별 리소스로 제한됩니다. 하나의 리소스가 실패해도 이미 계측된 리소스에는 영향을 주지 않습니다.

## Datadog이 계측을 유지하는 방법 {#how-datadog-maintains-instrumentation}

### 지속적 조정 {#continuous-reconciliation}

Datadog은 적용 대상 리소스에 대해 사용자가 정의한 상태를 지속적으로 유지합니다.

- Datadog은 정기적인 일정에 따라 적용 대상 리소스를 재확인하여 누락된 계측을 복원하고, 실패한 작업을 재시도하며, 더 이상 존재하지 않는 리소스를 정리합니다.
- 계정에서 전달된 변경 이벤트 덕분에 Datadog은 다음 예약된 검사를 기다릴 필요 없이 몇 분 내에 대응할 수 있습니다. Datadog은 변경된 적용 대상 리소스와 쿼리 기반 규칙이 일치하는 새로 생성된 리소스 모두에 대응합니다.
  - **EC2**: 이벤트는 CloudFormation 스택의 EventBridge 규칙에서 발생합니다.
  - **Lambda**: `datadog-agent-resource-update-rule-lambda` 규칙은 함수 생성, 구성 업데이트, 태그 및 태그 해제 이벤트를 전달합니다.
- EC2의 경우, 이미 Agent가 있는 인스턴스는 불필요한 활동을 방지하기 위해 더 낮은 빈도로 다시 확인됩니다.
- Lambda의 경우, Datadog은 변경이 필요한 함수에 대해서만 계정의 Lambda API를 호출합니다. 이미 현재 레이어 버전을 사용하는 플릿은 함수별 작업이 발생하지 않습니다.

### Lambda 함수가 새 레이어 버전을 가져오는 방법 {#how-lambda-functions-pick-up-new-layer-versions}

Datadog은 적용 대상 함수의 레이어를 최초 계측 시 적용된 버전이 아닌 현재 Datadog이 배포하는 버전과 비교합니다. Datadog이 새 레이어 버전을 릴리스하면 적용 대상 함수가 해당 버전으로 업데이트됩니다. 따라서 사용자가 별도의 조치를 취하지 않아도 함수는 Datadog의 레이어 릴리스에 맞춰 업데이트됩니다.

진행 중인 Lambda 구성 업데이트는 그대로 두었다가 잠시 후 다시 시도하므로, Datadog이 이미 적용 중인 변경 사항과 충돌하지 않습니다.

### 규칙이 적용 범위를 결정하는 방법 {#how-a-rule-determines-coverage}

규칙은 일회성 선택이 아닙니다. Datadog은 시간이 지남에 따라 쿼리를 재평가하고 계정에서 전달된 변경 이벤트에 대응합니다. Datadog은 다음 중 어느 경우든 일치하는 리소스를 탐지하는 즉시 계측합니다.

- **규칙을 저장한 후 리소스가 생성된 경우** `RunInstances` 및 `CreateFunction` 이벤트가 전달되므로 새 리소스가 몇 분 내에 탐지됩니다.
- **이미 존재하던 리소스가 규칙과 일치하기 시작했습니다.** 리소스에 태그를 지정하여 적용 범위에 포함하는 경우가 일반적이므로 태그 이벤트도 전달됩니다. EC2의 `CreateTags` 및 `DeleteTags`, Lambda의 `TagResource` 및 `UntagResource`가 이에 해당합니다. 이는 `@Tags:datadog:true`와 같은 규칙을 먼저 작성한 다음 필요에 따라 리소스에 태그를 지정하여 규칙에 포함시키는 방식을 지원합니다.

특정 리소스를 선택하여 만든 규칙은 해당 리소스를 지정하는 쿼리를 포함하므로 다른 리소스가 이 규칙과 일치할 수 없습니다.

고정 태그와 일치시키는 경우를 포함하여 쿼리 작성에 대한 지침은 설정 가이드의 [규칙이 리소스와 일치하는 방식 선택][7]을 참조하세요.

### 적용 범위 변경 시 조치 {#what-happens-when-coverage-changes}

Datadog은 규칙을 재평가하고 적용 대상 리소스를 이전 리소스 집합과 비교합니다. 더 이상 적용 대상이 아닌 리소스에서는 계측이 제거됩니다. 새로 적용 대상이 된 리소스가 계측됩니다. 규칙을 삭제하면 해당 규칙의 모든 적용 대상에서 계측이 제거됩니다.

<div class="alert alert-warning">
Datadog에서 규칙을 편집했거나 AWS에서 리소스의 태그 또는 구성을 변경하여 리소스가 더 이상 규칙과 일치하지 않으면 Datadog은 계측을 제거합니다. 다른 팀이 변경할 수 있는 태그를 기반으로 규칙을 작성할 때는 이 동작을 고려하세요.
</div>

### 종료, 중지 또는 삭제된 리소스 {#terminated-stopped-or-deleted-resources}

EC2에서 Datadog은 종료된 인스턴스를 탐지하고 해당 인스턴스에 대해 생성한 IAM 리소스를 정리합니다. Datadog은 중지된 인스턴스가 다시 시작될 때까지 그대로 둡니다. Lambda에서 삭제된 함수는 적용 범위에서 제외됩니다.

### 계측 실패 시 {#when-instrumentation-fails}

Datadog은 시도 간 지연 시간을 늘려가며 자동으로 재시도합니다. 권한 누락이나 레이어 제한에 도달한 함수와 같이 사용자의 조치가 필요한 문제는 보고되며, 문제가 해결될 때까지 더 이상 재시도되지 않습니다. 권한이 누락된 경우 **AWS 통합 타일**과 Fleet 설치 페이지에서 문제로 표시됩니다.

<div class="alert alert-warning">
누군가 수동으로 적용 대상 리소스에서 계측을 제거하면 Datadog이 이를 복원합니다. 규칙을 기준으로 판단합니다. 적용 범위를 중지하려면 규칙을 변경하세요.
</div>

## Datadog 계측 제거 {#remove-datadog-instrumentation}

계측을 제거하려면 규칙에서 리소스를 제거하거나, 규칙의 쿼리를 편집하거나, 규칙을 삭제하세요.

- **EC2**: Datadog은 Datadog Agent, Linux의 `/etc/datadog-agent` 및 `/opt/datadog-agent` 디렉터리(또는 Windows에서 MSI 제거 수행), 그리고 Datadog이 각 인스턴스에 대해 생성한 모든 IAM 역할이나 인스턴스 프로필을 제거합니다.
- **Lambda**: Datadog은 추가했던 레이어를 제거하고 함수가 이전에 가지고 있던 환경 변수와 핸들러를 복원합니다. Datadog은 먼저 원본 구성에 대한 기록과 함수의 현재 구성을 비교하므로, 직접 추가하지 않은 레이어나 변수는 제거하지 않습니다. 실행 역할에 대한 텔레메트리 권한은 다른 함수와 공유될 수 있으므로 그대로 유지됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/guide/aws-agent-installation/
[2]: https://docs.datadoghq.com/ko/integrations/guide/aws-agent-installation/#prerequisites
[3]: https://docs.datadoghq.com/ko/integrations/guide/aws-agent-installation/#aws-lambda-functions
[4]: https://docs.datadoghq.com/ko/serverless/aws_lambda/remote_instrumentation/
[5]: https://docs.datadoghq.com/ko/account_management/workload_identity_federation/
[6]: https://docs.datadoghq.com/ko/integrations/guide/aws-agent-installation/#choose-between-the-aws-integration-and-remote-instrumentation
[7]: https://docs.datadoghq.com/ko/integrations/guide/aws-agent-installation/#choose-how-your-rule-matches-resources