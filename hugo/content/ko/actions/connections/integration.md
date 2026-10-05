---
aliases:
- /ko/actions/connections/aws_integration/
- /ko/actions/connections/integration_connections/
description: 기존 Datadog 통합의 자격 증명을 사용하여 워크플로 및 앱에서 작업을 인증합니다.
disable_toc: false
further_reading:
- link: /actions/connections/
  tag: 설명서
  text: 연결 자격 증명에 대해 자세히 알아보기
title: 통합 연결
---
## 개요 {#overview}

통합 연결을 사용하면 Datadog 워크플로 및 작업에서 Datadog 통합에 이미 구성된 자격 증명을 사용할 수 있습니다. 이렇게 하면 작업에 대해 별도의 연결을 구성할 필요가 없으며 외부 서비스에 대한 액세스가 간소화됩니다.

## 지원되는 사용 사례 {#supported-use-cases}

통합 연결은 다음에 사용할 수 있습니다.

- **ServiceNow**: 기존 ServiceNow 통합 인스턴스의 자격 증명을 사용하여 ServiceNow 작업을 실행합니다.
- **AWS**: 기존 AWS 통합 계정의 자격 증명을 사용하여 지원되는 읽기 전용 AWS 작업을 실행합니다. 지원되는 AWS 작업 및 권한에 대한 자세한 내용은 [AWS 통합 연결](#aws-integration-connections)을 참조하세요.

다른 통합 또는 작업의 경우 [연결을 생성하세요][2].

## 구성 {#configuration}

시작하기 전에 통합이 활성화되어 있고 사용하려는 통합 계정 또는 인스턴스의 편집 권한이 있는지 확인하세요.

다음 예제는 ServiceNow 통합 연결을 구성합니다. [추가 AWS 요구 사항](#aws-integration-connections)에 따라 지원되는 AWS 작업에 대해서도 동일한 일반 프로세스를 따를 수 있습니다.

### 1. 통합 권한 구성 {#1-configure-integration-permissions}

ServiceNow 통합 인스턴스의 {{< ui >}}Executor{{< /ui >}} 권한을 구성하려면:

1. Datadog에서 [**Integrations**][4]로 이동합니다.
1. {{< ui >}}ServiceNow{{< /ui >}} 통합을 클릭합니다.
1. 작업을 실행하는 데 사용할 ServiceNow 인스턴스를 선택합니다.
1. {{< ui >}}Set Permissions{{< /ui >}}를 클릭합니다.
    - {{< ui >}}Request Edit Access{{< /ui >}} 버튼 대신 {{< ui >}}Set Permissions{{< /ui >}} 버튼이 표시되는 경우 Datadog 조직 관리자에게 해당 인스턴스의 Editor로 추가해 달라고 요청합니다.
1. 사용자, 팀 또는 조직을 선택하고 {{< ui >}}Add{{< /ui >}}를 클릭합니다.
1. {{< ui >}}People with access{{< /ui >}}에서 {{< ui >}}Executor{{< /ui >}} 권한을 선택합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

### 2. 작업에 통합 추가 {#2-add-the-integration-to-an-action}

1. [Workflow Automation][5]에서 편집하려는 워크플로를 클릭합니다.
1. ServiceNow 작업을 추가합니다.
1. 구성 창에서 {{< ui >}}Connection{{< /ui >}} 드롭다운을 클릭하고 {{< ui >}}Existing ServiceNow Integrations{{< /ui >}}로 스크롤합니다.
1. 이전 단계에서 구성한 ServiceNow 인스턴스를 선택합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

## AWS 통합 연결 {#aws-integration-connections}

Datadog 워크플로 및 작업은 기존 Datadog AWS 통합 자격 증명을 사용하여 AWS 환경에서 읽기 전용 작업을 수행할 수 있습니다. Datadog은 Amazon EC2, RDS, S3 모니터링과 같은 통합에 사용되는 동일한 AWS 자격 증명을 사용하여 지원되는 읽기 전용 작업을 안전하게 실행합니다.

환경에서 AWS 작업을 실행하는 방법에는 두 가지가 있습니다.

- Datadog AWS 통합을 사용하여 [`ViewOnlyAccess` 권한][1] 정책에 따라 허용된 읽기 전용 작업을 실행합니다.
- [`ViewOnlyAccess` 권한][1]에 포함되지 않은 작업의 경우 특정 권한이 있는 전용 AWS IAM 역할에 연결된 사용자 지정 AWS 연결을 사용합니다.

### 지원되는 AWS 작업 {#supported-aws-actions}

예를 들면 다음과 같습니다:

- `ListECSClusters`, `DescribeInstances`, `GetBucketPolicy`과 같은 AWS 리소스 나열 또는 설명
- `GetFunctionConfiguration` 및 `ListSecrets`과 같은 AWS 서비스의 구성 또는 메타데이터 읽기
- 리소스 태그, 메트릭 또는 로그 검사

다른 AWS 작업의 경우 [전용 연결][2]을 대신 사용하세요.

### AWS 요구 사항 {#aws-requirements}

AWS 통합 연결을 통해 작업을 성공적으로 실행하려면 다음 요구 사항을 충족해야 합니다.

- 역할 위임을 위해 구성된 AWS 통합 IAM 역할에는 원하는 작업에 필요한 권한(예: `ecs:ListClusters`)이 있어야 합니다.
- 선택한 작업은 읽기 전용이어야 합니다. `Put*`, `Delete*`, `Update*`과(와) 같은 쓰기 또는 변경 작업은 지원되지 않으며 실행 시 실패합니다.
- 작업을 실행하는 사용자, 팀 또는 조직은 Datadog의 AWS 통합 계정에 대한 명시적인 {{< ui >}}Executor{{< /ui >}} 권한이 있어야 합니다.

<div class="alert alert-info">
Datadog AWS 통합을 사용하여 작업을 실행하는 기능은 <a href="/integrations/guide/aws-manual-setup/?tab=roledelegation" target="_blank">역할 위임</a>을 통해 Datadog AWS 통합을 설정한 사용자만 사용할 수 있습니다. 또한 <a href="https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ViewOnlyAccess.html" target="_blank">ViewOnlyAccess 권한</a>으로 허용되는 작업이라도 Datadog AWS 통합과 연결된 IAM 역할에는 해당 작업에 필요한 권한이 없을 수 있습니다. 문제가 발생하면 역할에 올바른 권한이 있는지 확인하세요.
</div>

AWS 통합 연결을 구성하기 전에 다음 사항을 확인하세요.

- AWS 통합이 대상 AWS 계정에서 활성화되어 있고 Datadog에서 통합 문제가 감지되지 않았는지 확인합니다. AWS 통합을 설정하지 않은 경우 [AWS 통합 설정 가이드][6]를 따르세요.
- 통합과 연결된 IAM 역할에는 필요한 작업(예: `ecs:ListClusters`)을 수행할 권한이 있어야 합니다.
- 사용하려는 AWS 계정의 권한을 편집할 수 있어야 합니다.

AWS 통합 계정의 {{< ui >}}Executor{{< /ui >}} 권한을 구성하려면 [구성 단계](#1-configure-integration-permissions)를 따르고 ServiceNow 대신 {{< ui >}}Amazon Web Services{{< /ui >}} 통합과 해당 AWS 계정을 선택하세요.

작업에 AWS 통합을 추가하려면:

1. [Workflow Automation][5]에서 편집하려는 워크플로를 클릭합니다.
1. {{< ui >}}List ECS Clusters{{< /ui >}}과(와) 같은 AWS 작업을 추가합니다.
1. 구성 창에서 {{< ui >}}Connection{{< /ui >}} 드롭다운을 클릭하고 {{< ui >}}Existing AWS Integrations{{< /ui >}}로 스크롤합니다.
1. 구성한 AWS 계정을 선택합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

[1]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ViewOnlyAccess.html
[2]: /ko/actions/connections/#create-a-connection
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/workflow
[6]: /ko/integrations/amazon-web-services/#setup