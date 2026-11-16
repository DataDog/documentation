---
algolia:
  tags:
  - workload identity federation
  - cloud authentication
  - aws authentication
  - terraform provider
  - agent authentication
  - delegated auth
aliases:
- /ko/account_management/cloud_authentication/
- /ko/account_management/cloud_provider_authentication/
description: AWS STS 인증 및 ID 매핑을 활용하는 Workload Identity Federation을 통해 정적 API 키 대신
  클라우드 자격 증명으로 Datadog Terraform 공급자와 Datadog Agent를 인증합니다.
further_reading:
- link: /getting_started/integrations/terraform/
  tag: 설명서
  text: Terraform으로 Datadog 관리
- link: /agent/configuration/
  tag: 설명서
  text: Agent 구성
- link: /account_management/api-app-keys/
  tag: 설명서
  text: API 및 애플리케이션 키
- link: /integrations/amazon_web_services/
  tag: 설명서
  text: AWS 통합
title: 워크로드 ID 페더레이션
---
## 개요 {#overview}

Workload Identity Federation을 사용하면 정적 API 키 및 애플리케이션 키 대신 클라우드 자격 증명으로 Datadog Terraform 공급자와 Datadog Agent를 인증할 수 있습니다.

AWS는 유일하게 지원되는 클라우드 공급자입니다.

Workload Identity Federation은 다음 항목에 사용할 수 있습니다.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
<ul>
<li><b>Terraform 공급자</b>: Datadog 사용자 또는 서비스 계정에 매핑된 AWS 자격 증명으로 Terraform 작업을 인증합니다. 모든 고객이 사용할 수 있습니다.</li>
<li><b>Datadog Agent</b>: AWS 자격 증명으로 Agent를 인증하여 자동으로 관리되고 교체되는 API 키를 발급받습니다.</li>
</ul>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<ul>
<li><b>Terraform 공급자</b>: Datadog 사용자 또는 서비스 계정에 매핑된 AWS 자격 증명으로 Terraform 작업을 인증합니다. 모든 고객이 사용할 수 있습니다.</li>
</ul>
{{< /site-region >}}

## 작동 방식: AWS 인증 프로세스 {#how-it-works-aws-authentication-process}

인증 프로세스는 [AWS Security Token Service(STS)][1]를 사용하여 사용자의 신원을 확인합니다.

### Terraform 공급자 인증 흐름 {#terraform-provider-authentication-flow}

1. **증명 생성:** Datadog Terraform 공급자는 현재 AWS 자격 증명을 사용하여 서명된 AWS STS `GetCallerIdentity` 요청을 생성합니다.
2. **증명 검증:** Datadog은 AWS STS를 호출하여 증명을 검증하며, AWS STS는 사용자의 AWS ARN, 사용자 ID 및 계정 ID를 반환합니다.
3. **ID 매핑:** 사용자의 AWS ID는 조직의 구성에 따라 Datadog 서비스 계정 또는 사용자 계정에 매핑됩니다.
4. **토큰 발급:** 검증이 성공하면 Datadog은 API 액세스를 위한 임시 JWT 토큰을 발급합니다.
5. **API 인증:** 이 토큰은 이후 Datadog API 호출에 사용됩니다.

<div class="alert alert-info">가능한 경우 ARN을 사용자 계정이 아닌 Datadog 서비스 계정에 매핑합니다. 서비스 계정을 사용하면 인증 프로세스가 특정 개인과 연결되는 것을 방지할 수 있습니다.</div>

### Agent 인증 흐름 {#agent-authentication-flow}

1. **자격 증명 탐지:** Agent가 실행 환경에서 AWS 자격 증명을 검색합니다.
2. **증명 생성:** Agent가 자격 증명에 대한 액세스 권한을 증명하기 위해 서명된 AWS STS 요청을 생성합니다.
3. **증명 검증:** Datadog은 AWS를 통해 서명된 요청을 검증하고 조직의 수집 매핑 구성과 대조하여 확인합니다.
4. **API 키 발급:** 검증에 성공하면 Datadog은 자동으로 교체되는 관리형 API 키를 발급합니다.
5. **Agent 구성:** Agent는 발급된 API 키를 이후의 모든 Datadog API 호출에 사용합니다.

<div class="alert alert-info">위임 인증 흐름이 실패하면 Agent는 다음 파일에 설정된 API 키로 폴백합니다. <code>datadog.yaml</code> 파일에서 제거하세요. 이러한 폴백 동작 덕분에 기존 구성에 미치는 위험을 최소화하면서 온보딩할 수 있습니다.</div>

## AWS용 워크로드 ID 페더레이션 설정 {#set-up-workload-identity-federation-for-aws}

**요구 사항**:
- Datadog Terraform 공급자 버전 3.70 이상.
- [Datadog-AWS 통합][4]을 구성하고 AWS 계정을 추가한 상태여야 합니다. [AWS 통합 문서][3]를 참조하세요.
- 계정에 `workload_identity_federation_config_read` 및 `workload_identity_federation_config_write` 권한이 있어야 합니다.

AWS용 워크로드 ID 페더레이션 설정은 두 부분으로 구성됩니다.
1. [Datadog에서 AWS ID 매핑 구성](#configure-aws-identity-mapping-in-datadog)
2. [Terraform 공급자 구성 업데이트](#update-your-terraform-provider-configuration)

### Datadog에서 AWS ID 매핑 구성 {#configure-aws-identity-mapping-in-datadog}

<div class="alert alert-info">ID 매핑이 작동하려면 AWS 계정이 <a href="https://app.datadoghq.com/integrations/amazon-web-services">Datadog-AWS 통합</a>을 통해 Datadog과 <strong>반드시 통합되어 있어야</strong> 합니다. AWS 계정이 통합되지 않은 경우 인증 흐름에서 호출자를 검증할 수 없어 매핑이 실패합니다.</div>

AWS ID(ARN)를 Datadog 서비스 계정 또는 사용자 계정에 매핑합니다. UI에서 또는 API를 사용하여 ID 매핑을 구성할 수 있습니다.

AWS에서 IAM 역할을 생성해야 하는 경우 [AWS IAM 역할 생성 설명서][5]를 참조하세요.

#### UI 사용 {#using-the-ui}

[**Organization Settings** > **Workload Identity Federation**][6]으로 이동하여 **Identity Mappings** 탭을 클릭합니다. 각 매핑은 특정 Datadog 사용자 또는 서비스 계정의 권한을 클라우드 역할에 부여합니다.

{{< img src="account_management/workload_identity_federation/identity-mappings-list.png" alt="Workload Identity Federation 페이지의 ID 매핑 탭에 표시된 조직 UUID 필드와 Datadog 사용자 및 서비스 계정에 매핑된 AWS ARN 패턴 목록" style="width:100%;" >}}

<div class="alert alert-warning">Datadog은 소스 패턴 필드에 IAM 역할 ARN이 아닌 <strong>assumed-role ARN</strong>을 입력하도록 요구합니다. 이 두 형식은 서로 다릅니다.</div>
<ul>
<li><strong>IAM 역할 ARN</strong>(AWS 콘솔에 표시됨): <code>arn:aws:iam::123456789012:role/my-role</code></li>
<li><strong>Assumed-role ARN</strong>(Datadog에서 요구함): <code>arn:aws:sts::123456789012:assumed-role/my-role/session-name</code></li>
</ul>
워크로드의 assumed-role ARN을 확인하려면 워크로드 환경에서 <code>aws sts get-caller-identity</code> 를 실행한 후 응답의 <code>Arn</code> 필드에 있는 값을 사용합니다.

ID 매핑을 생성하려면 다음 단계를 따르세요.

1. {{< ui >}}\+ New Mapping{{< /ui >}}을 클릭합니다.
2. **Cloud Provider**를 선택합니다.
3. **Source Pattern (ARN)**을 입력합니다. assumed-role ARN 형식을 사용하고, 와일드카드 패턴에는 `*`를 사용합니다(예: `arn:aws:sts::123456789012:assumed-role/terraform-runner/*`).
4. **Target Identity**를 검색하여 선택합니다. 클라우드 ID는 여기서 지정한 Datadog 사용자 또는 서비스 계정으로 인증됩니다.
5. {{< ui >}}Create Mapping{{< /ui >}}을 클릭합니다.

{{< img src="account_management/workload_identity_federation/identity-mapping-create.png" alt="클라우드 공급자, 소스 패턴 ARN 및 대상 ID 필드와 와일드카드 패턴 지원을 설명하는 도움말 텍스트가 표시된 ID 매핑 생성 대화 상자" style="width:70%;" >}}

<div class="alert alert-info">액세스 권한이 개인에게 연결되지 않도록 사용자 계정보다 서비스 계정을 사용하는 것이 좋습니다.</div>

#### API 사용 {#using-the-api}

##### AWS ARN을 Datadog 사용자 계정에 매핑 {#map-an-aws-arn-to-a-datadog-user-account}
`account_identifier`의 경우, Datadog 사용자 프로필에 표시된 이메일 주소를 사용합니다.

**예시**: AWS ARN을 Datadog 사용자 계정에 매핑하는 API 호출(`john.doe@myorg.com`)

```bash
# Example: map an AWS ARN to a Datadog User
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "john.doe@myorg.com",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner"
    }
  }
}'
```

##### AWS ARN을 Datadog 서비스 계정에 매핑 {#map-an-aws-arn-to-a-datadog-service-account}
`account_identifier`의 경우 다음 중 하나를 사용할 수 있습니다.
- 서비스 계정의 **UUID**: {{< ui >}}Organization settings{{< /ui >}} > {{< ui >}}Service accounts{{< /ui >}}로 이동하여 매핑하려는 서비스 계정을 클릭한 다음 URL에서 `service_account_id`를 복사합니다. 예를 들어, URL이 `/organization-settings/service-accounts?service_account_id=3fa85f64-5717-4562-b3fc-2c963f66afa6`으로 끝나는 경우 `3fa85f64-5717-4562-b3fc-2c963f66afa6`을 사용합니다.
- 서비스 계정의 **이메일 주소**: 서비스 계정 세부 정보에 표시된 이메일 주소를 사용합니다.

**예시**: UUID를 사용하여 AWS ARN을 Datadog 서비스 계정에 매핑하는 API 호출(`3fa85f64-5717-4562-b3fc-2c963f66afa6`)

```bash
# Example: map an AWS ARN to a Datadog Service Account using UUID
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner"
    }
  }
}'
```

**예시**: 이메일 주소를 사용하여 AWS ARN을 Datadog 서비스 계정에 매핑하는 API 호출(`terraform-service-account@myorg.com`)

```bash
# Example: map an AWS ARN to a Datadog Service Account using email
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "terraform-service-account@myorg.com",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/terraform-runner"
    }
  }
}'
```

##### ARN 패턴에서 와일드카드 사용 {#using-wildcards-in-arn-patterns}

ARN 패턴은 리소스 ARN의 동적 또는 가변 부분을 처리하기 위해 와일드카드 매칭을 지원합니다. 이는 세션 식별자나 기타 가변 구성 요소를 포함하는 수임 역할을 사용할 때 유용합니다.

**와일드카드 규칙**:
- 와일드카드(`*`)는 리소스 ARN의 마지막 부분에서만 허용됩니다
- 와일드카드 앞에 특정 리소스를 지정해야 합니다
- 와일드카드는 ARN 중간에 배치할 수 없습니다

**예시**: `DatadogTerraformerRole` 역할을 수임한 모든 세션과 일치하는 패턴:

```bash
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_config",
    "attributes": {
      "account_identifier": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/*"
    }
  }
}'
```

이 패턴은 다음과 같은 실제 수임 역할 ARN과 일치합니다.
- `arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/run-abcdefghijk`
- `arn:aws:sts::123456789012:assumed-role/DatadogTerraformerRole/session-xyz789`

<div class="alert alert-info">와일드카드 매칭은 역할 세션의 식별자가 동적으로 생성되는 CI/CD 파이프라인에 특히 유용합니다.</div>

##### 기존 매핑 목록 조회 {#list-existing-mappings}

```bash
curl -X GET "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/persona_mapping" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### Terraform 공급자 구성 업데이트 {#update-your-terraform-provider-configuration}

ID 매핑을 구성한 후, Datadog Terraform 공급자 구성을 업데이트하여 Workload Identity Federation을 사용합니다.

#### 기존 구성 제거 {#remove-your-existing-configuration}

```hcl
# Old configuration
provider "datadog" {
  api_key = var.datadog_api_key
  app_key = var.datadog_app_key
}
```

#### 새 Workload Identity Federation 구성 추가 {#add-the-new-workload-identity-federation-configuration}

`org_uuid`를 가져오려면 [**Organization Settings** > **Workload Identity Federation**][6] 페이지에서 직접 확인하거나 다음 엔드포인트를 호출합니다(대상 조직에 로그인된 세션 필요). [{{< region-param key=dd_api >}}/api/v2/current_user][2]

```hcl
# New configuration using AWS authentication
provider "datadog" {
  org_uuid             = var.datadog_org_uuid
  cloud_provider_type  = "aws"
}
```

#### 선택 사항 - AWS 자격 증명 명시적으로 지정 {#optional-specify-aws-credentials-explicitly}
환경 변수나 AWS 자격 증명 파일을 사용하는 대신 Terraform 구성에서 AWS 자격 증명을 직접 지정할 수 있습니다.

```hcl
provider "datadog" {
  org_uuid              = var.datadog_org_uuid
  cloud_provider_type   = "aws"
  aws_access_key_id     = var.aws_access_key_id
  aws_secret_access_key = var.aws_secret_access_key
  aws_session_token     = var.aws_session_token  # If using temporary credentials
}
```

Terraform 공급자는 구성된 AWS 자격 증명을 사용하여 Datadog에 자동으로 인증합니다.

## Datadog Agent용 Workload Identity Federation 설정 {#set-up-workload-identity-federation-for-the-datadog-agent}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog Agent용 Workload Identity Federation은 선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}})에서는 Agentless Scanning을 사용할 수 없습니다.</div>
{{< /site-region >}}

Agent용 Workload Identity Federation을 사용하면 정적 API 키를 관리하지 않고도 AWS 자격 증명으로 Agent를 인증할 수 있습니다. Agent는 AWS 인증 증명을 Datadog이 자동으로 교체하는 관리형 API 키로 교환합니다.

### 요구 사항 {#requirements}

- Agent가 AWS 자격 증명을 가져오는 방식에 따라 지원되는 Agent 버전 및 유형 [지원되는 Agent 버전 및 AWS 자격 증명](#supported-agent-versions-and-aws-credentials)을 참조하세요.
- AWS 자격 증명에 액세스할 수 있는 AWS 환경에서 실행 중인 Agent(예: IAM 역할이 있는 EC2 인스턴스, ECS 작업 또는 EKS 포드)
- AWS 계정이 추가되고 구성이 완료된 [Datadog-AWS 통합][4] 
- `workload_identity_federation_config_read` 및 `workload_identity_federation_config_write` 권한

#### 지원되는 Agent 버전 및 AWS 자격 증명 {#supported-agent-versions-and-aws-credentials}

Workload Identity Federation 지원은 Agent 버전, Agent 유형, 그리고 Agent가 AWS 자격 증명을 획득하는 방식에 따라 다릅니다.

| Agent가 AWS 자격 증명을 획득하는 방법 | Agent 7.78-7.81 | Agent 7.82 | Agent 7.83+ |
|---|---|---|---|
| 환경 변수(`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) | 모든 Agent | 모든 Agent | 모든 Agent |
| EC2 인스턴스 메타데이터 서비스(IMDS) 역할 | Core Agents 전용 | Core Agents 전용 | 모든 Agent |
| EKS IRSA(`AWS_ROLE_ARN`, `AWS_WEB_IDENTITY_TOKEN_FILE`) | 지원되지 않음 | Core Agents 전용 | 모든 Agent |
| ECS 작업 역할 또는 EKS Pod Identity(`AWS_CONTAINER_CREDENTIALS_*`) | 지원되지 않음 | Core Agents 전용 | 모든 Agent |

**Core Agents**: Agent, Cluster Agent, Process Agent, Security Agent, System Probe 및 설치 프로그램 

**모든 Agent**: Core Agents, Trace Agent, standalone DogStatsD, Private Action Runner, IoT Agent 및 Heroku Agent

OpenTelemetry Collector(`otel-agent`)는 Workload Identity Federation을 지원하지 않습니다. AWS는 유일하게 지원되는 클라우드 공급자입니다. Azure, Google Cloud 및 일반 OIDC 공급자는 지원되지 않습니다.

<div class="alert alert-info">지원되지 않는 Agent 유형, 클라우드 공급자 또는 자격 증명 제공 방식을 사용하는 경우, <a href="/help/">Datadog 지원팀에 기능 요청을 제출합니다</a>.</div>

Agent용 Workload Identity Federation 설정은 두 단계로 구성됩니다.
1. [Datadog에서 AWS 수집 매핑 구성](#configure-aws-intake-mapping-in-datadog)
2. [Agent 구성 업데이트](#update-your-agent-configuration)

### Datadog에서 AWS 수집 매핑 구성 {#configure-aws-intake-mapping-in-datadog}

<div class="alert alert-info">수집 매핑이 작동하려면 AWS 계정이 <a href="https://app.datadoghq.com/integrations/amazon-web-services">Datadog-AWS 통합</a>을 통해 Datadog과 <strong>반드시 통합되어 있어야</strong> 합니다. AWS 계정이 통합되지 않은 경우 인증 흐름에서 호출자를 검증할 수 없어 매핑이 실패합니다.</div>

Agent 인증을 위해 특정 AWS ARN 패턴을 허용하도록 수집 매핑을 구성합니다. ID 매핑과 달리 수집 매핑은 ARN 패턴만 필요합니다. Agent는 사용자 액션을 실행하는 것이 아니라 데이터를 전송하기 위해 인증하므로 Datadog 계정 식별자가 필요하지 않습니다. Datadog은 사용자를 대신하여 기본 API 키를 자동으로 프로비저닝, 구성 및 교체합니다.

AWS에서 IAM 역할을 생성해야 하는 경우 [AWS IAM 역할 생성 설명서][5]를 참조하세요.

#### UI 사용 {#using-the-ui-1}

[**Organization Settings** > **Workload Identity Federation**][6]으로 이동하여 **Intake Mappings** 탭을 클릭합니다.

{{< img src="account_management/workload_identity_federation/intake-mappings-list.png" alt="Workload Identity Federation 페이지의 수집 매핑 탭에 표시된 조직 UUID 필드와 Agent 인증이 허용된 AWS ARN 패턴 목록" style="width:100%;" >}}

<div class="alert alert-warning">Datadog은 소스 패턴 필드에 IAM 역할 ARN이 아닌 <strong>assumed-role ARN</strong>을 입력하도록 요구합니다. 이 두 형식은 서로 다릅니다.</div>
<ul>
<li><strong>IAM 역할 ARN</strong>(AWS 콘솔에 표시됨): <code>arn:aws:iam::123456789012:role/my-role</code></li>
<li><strong>Assumed-role ARN</strong>(Datadog에서 요구함): <code>arn:aws:sts::123456789012:assumed-role/my-role/session-name</code></li>
</ul>
워크로드의 assumed-role ARN을 확인하려면 워크로드 환경에서 <code>aws sts get-caller-identity</code> 를 실행한 후 응답의 <code>Arn</code> 필드에 있는 값을 사용합니다.

수집 매핑을 생성하려면 다음 단계를 따르세요.

1. {{< ui >}}\+ New Mapping{{< /ui >}}을 클릭합니다.
2. **Cloud Provider**를 선택합니다.
3. **Source Pattern (ARN)**을 입력합니다. assumed-role ARN 형식을 사용하고, 와일드카드 패턴에는 `*`를 사용합니다(예: `arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/*`).
4. {{< ui >}}Create Mapping{{< /ui >}}을 클릭합니다.

{{< img src="account_management/workload_identity_federation/intake-mapping-create.png" alt="클라우드 공급자 및 소스 패턴 ARN 필드와 와일드카드 패턴 지원을 설명하는 도움말 텍스트가 표시된 수집 매핑 생성 대화 상자" style="width:70%;" >}}

#### API 사용 {#using-the-api-1}

##### 수집 매핑 생성 {#create-an-intake-mapping}

**예시**: 특정 IAM 역할을 사용하여 실행되는 Agent의 인증을 승인하는 API 호출

```bash
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_intake_mapping",
    "attributes": {
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/*"
    }
  }
}'
```

##### ARN 패턴에서 와일드카드 사용 {#using-wildcards-in-arn-patterns-1}

ARN 패턴은 리소스 ARN의 동적 또는 가변 부분을 처리하기 위해 와일드카드 매칭을 지원합니다. 이는 세션 식별자가 포함된 수임 역할을 사용하거나 Agent 인스턴스가 여러 개인 경우에 유용합니다.

**와일드카드 규칙**:
- 와일드카드(`*`)는 리소스 ARN의 마지막 부분에서만 허용됩니다
- 와일드카드 앞에 특정 리소스를 지정해야 합니다
- 와일드카드는 ARN 중간에 배치할 수 없습니다

**예시**: `DatadogAgentRole` 역할을 수임한 모든 세션과 일치하는 패턴:

```bash
curl -X POST "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d '{
  "data": {
    "type": "aws_cloud_auth_intake_mapping",
    "attributes": {
      "arn_pattern": "arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/*"
    }
  }
}'
```

이 패턴은 다음과 같은 실제 수임 역할 ARN과 일치합니다.
- `arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/i-0abc123def456`
- `arn:aws:sts::123456789012:assumed-role/DatadogAgentRole/eks-datadog-agent-xyz`

##### 기존 수집 매핑 목록 조회 {#list-existing-intake-mappings}

```bash
curl -X GET "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

##### 수집 매핑 삭제 {#delete-an-intake-mapping}

```bash
curl -X DELETE "{{< region-param key=dd_api code="true" >}}/api/v2/cloud_auth/aws/intake_mapping/<MAPPING_UUID>" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### Agent 구성 업데이트 {#update-your-agent-configuration}

수집 매핑을 구성한 후, Workload Identity Federation을 사용하도록 Agent 구성을 업데이트합니다.

#### 전역 구성 {#global-configuration}

모든 Agent 데이터에 대해 Workload Identity Federation을 활성화하려면 `datadog.yaml` 파일에 `delegated_auth` 섹션을 추가합니다.

```yaml
delegated_auth:
  org_uuid: <YOUR_ORG_UUID>
```

`org_uuid`를 가져오려면 [**Organization Settings** > **Workload Identity Federation**][6] 페이지에서 직접 확인하거나 다음 엔드포인트를 호출합니다(대상 조직에 로그인된 세션 필요). [{{< region-param key=dd_api >}}/api/v2/current_user][2]

Agent는 AWS 환경에서 실행 중인지 자동으로 탐지하고 사용 가능한 AWS 자격 증명을 사용합니다.

#### 공급자별 옵션 {#provider-specific-options}

AWS를 인증 공급자로 명시적으로 설정하고 공급자별 옵션을 지정하려면 `provider` 및 `aws` 하위 섹션을 사용합니다.

```yaml
delegated_auth:
  org_uuid: <YOUR_ORG_UUID>
  provider: aws  # Optional: auto-detects if omitted
  aws:
    region: <AWS_REGION>  # Optional: auto-detects from IMDS if omitted or uses global STS
```

`<AWS_REGION>`을 STS 인증에 사용할 AWS 리전으로 바꿉니다(예: `us-east-1`).

#### 제품별 구성 {#per-product-configuration}

Agent 제품별로 위임 인증을 독립적으로 활성화할 수 있습니다. 이는 서로 다른 데이터 유형을 서로 다른 Datadog 조직으로 전송하거나 특정 제품에 대해서만 Workload Identity Federation을 사용하려는 경우에 유용합니다.

로그에 대해서만 위임 인증을 활성화하려면 다음 단계를 따르세요.

```yaml
logs_config:
  delegated_auth:
    org_uuid: <YOUR_ORG_UUID>
```

제품별로 서로 다른 조직을 사용하려면 다음과 같이 설정합니다.

```yaml
delegated_auth:
  org_uuid: <YOUR_GLOBAL_ORG_UUID>
  provider: aws
  aws:
    region: <AWS_REGION>

logs_config:
  delegated_auth:
    org_uuid: <YOUR_LOGS_ORG_UUID>
```

<div class="alert alert-info">공급자별 설정(예: <code>provider</code> 및 <code>aws</code>)은 전역 <code>delegated_auth</code> 섹션에서만 구성됩니다. 제품별 섹션은 <code>org_uuid</code>만 지원합니다.</div>

#### 폴백 동작 {#fallback-behavior}

어떤 이유로든 위임 인증 흐름이 실패하면 Agent는 `datadog.yaml` 파일에 설정된 API 키를 사용하는 방식으로 자동 폴백합니다. 이러한 폴백 동작은 온보딩 중 안전장치 역할을 하며 인증 서비스 중단에 대비할 수 있도록 합니다.

폴백 기능을 활용하려면 새로운 `delegated_auth` 구성과 함께 기존 `api_key` 구성을 유지합니다.

```yaml
api_key: <YOUR_API_KEY>

delegated_auth:
  org_uuid: <YOUR_ORG_UUID>
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html
[2]: https://app.datadoghq.com/api/v2/current_user
[3]: /ko/integrations/amazon-web-services/
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create.html
[6]: https://app.datadoghq.com/organization-settings/workload-identity-federation