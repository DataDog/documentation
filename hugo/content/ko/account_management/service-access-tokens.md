---
description: 개별 사용자 자격 증명에 의존하지 않고 서비스 계정 대신 Datadog API 호출을 인증하기 위한 서비스 액세스 토큰을 생성하고
  관리하세요.
further_reading:
- link: /account_management/org_settings/service_accounts/
  tag: 설명서
  text: 서비스 계정
- link: /account_management/personal-access-tokens/
  tag: 설명서
  text: 개인 액세스 토큰
- link: /account_management/workload_identity_federation/
  tag: 설명서
  text: 워크로드 ID 페더레이션
- link: https://www.datadoghq.com/blog/datadog-api-authentication/
  tag: 블로그
  text: 범위가 지정된 자격 증명으로 Datadog API 인증 현대화
title: 서비스 액세스 토큰
---
## 개요 {#overview}

서비스 액세스 토큰(SAT)은 [서비스 계정][1]을 대신하여 Datadog API 호출을 인증하는
자격 증명입니다. [개인 액세스 토큰(PAT)][2]과 달리 SAT는 개별 사용자 대신
서비스 계정에 속합니다. 팀 구성원이 조직에 합류하거나 조직을 떠나더라도 SAT는 계속 유효합니다.

SAT를 사용하면 다음과 같은 작업을 수행할 수 있습니다.
- 팀 구성원이 조직을 떠난 후에도 계속 유효한 자격 증명으로 자동화된 워크플로 및 스크립트를 인증합니다.
- 주기적인 로테이션이 필요 없는 안정적인 통합을 위해 수명이 긴 토큰을 생성합니다.
- 토큰의 범위를 워크플로에 요구되는 최소 권한으로 지정합니다.
- 모든 API 활동을 소유 서비스 계정에 귀속시켜 감사 책임을 명확히 합니다.

### SAT와 다른 자격 증명 유형 비교 {#sats-compared-to-other-credential-types}

| | 서비스 액세스 토큰 | 개인 액세스 토큰 | 애플리케이션 키 |
|---|---|---|---|
| 소유자 | 서비스 계정 | 개별 사용자 | 개별 사용자 또는 서비스 계정 |
| 유효 기간(TTL) | 선택 사항: 1 day, 1 month, 1 year, Never 또는 Custom | 필수: 1일~1년 | 만료 없음 |
| 기본 범위 지정 | 예: 범위 필수 | 예: 범위 필수 | 선택 사항: 기본적으로 범위 미지정 |
| 독립형 인증 | 예: API 키 페어링 불필요 | 예: API 키 페어링 불필요 | 아니요: API 키 필요 |
| 식별 가능한 접두사 | `ddsat_` | `ddpat_` | `ddapp_`(신규) |
| 표시 위치 | 서비스 계정 세부 정보: Organization Settings > Access Tokens | Personal Settings > Access Tokens, Organization Settings > Access Tokens | Personal Settings > Application Keys, Organization Settings > Application Keys |

개인 액세스 토큰은 [개인 액세스 토큰][2]을 참조하세요.

## 전제 조건 {#prerequisites}

- Datadog 서비스 계정이 있어야 합니다. 생성하려면 [서비스 계정][1]을 참조하세요.
- 관리하는 서비스 계정에 대한 SAT를 생성할 수 있는 `service_account_write` 권한이 있어야 합니다.
- 조직 내 모든 서비스 계정에 대한 SAT를 관리할 수 있는 `org_app_keys_write` 권한이 있어야 합니다.

## 서비스 액세스 토큰 생성 {#create-a-service-access-token}

1. [**Organization Settings** > **Service Accounts**][3]로 이동하고 서비스 계정을 클릭합니다.
2. 세부 정보 패널의 **Access Tokens** 아래에서 {{< ui >}}+ New Token{{< /ui >}}을 클릭합니다.
3. 토큰의 {{< ui >}}Name{{< /ui >}}을 입력합니다.
4. {{< ui >}}Expiration Date{{< /ui >}}로 **1 day**, **1 month**, **1 year**, **Never**,
   **Custom** 중 하나를 선택합니다. 만료되지 않는 토큰의 경우 **Never**를 선택합니다.
5. {{< ui >}}Select Scopes{{< /ui >}}를 클릭하여 토큰이 액세스할 수 있는 범위를 정의합니다. 워크플로에 필요한
   권한만 부여한 다음 {{< ui >}}Save{{< /ui >}}를 클릭합니다.

<div class="alert alert-warning">Datadog은 토큰 생성 시 토큰 시크릿을 한 번만 표시합니다.
복사하여 안전하게 보관하세요. 나중에 다시 검색할 수 없습니다.</div>

저장 후 세부 정보 패널에 토큰 시크릿, 이름, 토큰 ID, 소유자, 소유자 역할,
만료 날짜 및 범위가 표시됩니다.

SAT의 만료 기간을 길게 구성하거나 **Never**를 선택하는 경우, 소스 코드나 환경 파일 대신
AWS Secrets Manager, HashiCorp Vault 또는 Azure Key Vault와 같은 시크릿 관리자에
시크릿을 보관하세요. AWS Secrets Manager는 [Datadog 서비스 계정 자격 증명에 대한
관리형 로테이션][8]을 지원합니다.

## 서비스 액세스 토큰 사용 {#use-a-service-access-token}

SAT는 두 가지 인증 방법을 지원합니다.

### 인증 헤더(권장) {#authorization-header-recommended}

`Authorization`헤더에 Bearer 토큰으로 SAT를 전달합니다. 이 방법에는 API 키가 필요하지
않습니다.

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "Authorization: Bearer <YOUR_SAT>"
```

### 애플리케이션 키 헤더 {#application-key-header}

`dd-application-key` 헤더에 SAT를 전달합니다.

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "dd-application-key: <YOUR_SAT>"
```

**참고:** `dd-application-key` 헤더에 유효한 SAT가 제공되면 Datadog은 해당
SAT로만 인증합니다. `dd-api-key` 헤더는 선택 사항이며 해당 값은 평가되지 않습니다.

## SAT 인증 API 호출에 대한 제한 사항 {#restrictions-on-sat-authenticated-api-calls}

권한 상승을 방지하기 위해 Datadog은 SAT로 인증된 API 호출이 수행할 수 있는 작업을 제한합니다. 이러한 제한 사항은 호출을 수행하는 API 클라이언트에 관계없이 적용됩니다.

- **애플리케이션 키**: SAT는 애플리케이션 키를 생성하거나 업데이트할 수 없습니다. 애플리케이션 키 취소는 허용됩니다.
- **새 토큰의 범위**: SAT는 새 토큰의 범위가 자체 범위의 하위 집합인 경우에만 다른 SAT를 생성하거나 업데이트할 수 있습니다.
- **새 토큰의 유효 기간(TTL)**: SAT는 자체 만료일을 초과하는 TTL을 가진 SAT를 생성할 수 없습니다.

이러한 제한 사항 중 하나를 위반하는 호출은 `403 Forbidden` 응답을 반환합니다.

## 서비스 액세스 토큰 관리 {#manage-service-access-tokens}

### 토큰 조회 {#view-tokens}

서비스 계정의 토큰은 세부 정보 패널의
[**Organization Settings** > **Service Accounts**][3]에 표시됩니다.

{{< img src="account_management/service-access-tokens/sat-service-account-panel.png" alt="두 개의 서비스 액세스 토큰이 나열된 Access Tokens 섹션을 보여주는 서비스 계정 세부 정보 패널입니다." style="width:80%;" >}}

`org_app_keys_read` 권한을 가진 조직 관리자는 모든 SAT와 함께
[**Organization Settings** > **Access Tokens**][4]의 개인 액세스 토큰도 조회할 수 있습니다.

### 토큰 취소 {#revoke-a-token}

1. [**Organization Settings** > **Service Accounts**][3]로 이동하고 서비스 계정을 클릭합니다.
2. 세부 정보 패널에서 토큰 위에 마우스를 올리고 {{< ui >}}Revoke{{< /ui >}}를 클릭합니다.

또는 [**Organization Settings** > **Access Tokens**][4]에서 SAT를 취소합니다.

취소된 토큰으로는 더 이상 API 호출을 인증할 수 없습니다. 취소는 몇 초 내에 적용됩니다.

### 토큰 편집 {#edit-a-token}

기존 SAT의 이름과 범위를 업데이트할 수 있습니다. 생성 후에는 만료 날짜를 수정할 수
없습니다. 만료일을 변경하려면 토큰을 취소하고 새 토큰을 생성하세요.

## 권한 {#permissions}

| 권한 | 설명 |
|------------|-------------|
| `service_account_write` | 관리하는 서비스 계정에 대한 SAT 생성 |
| `org_app_keys_read` | 조직 내 모든 서비스 계정의 SAT 조회 |
| `org_app_keys_write` | 모든 서비스 계정에 대한 SAT 생성, 편집 및 취소 |

자세한 내용은 [역할 기반 접근 제어][5]를 참조하세요.

## Audit Trail {#audit-trail}

[Audit Trail][6]이 활성화된 경우, 모든 SAT 생성, 사용 및 취소 이벤트가
기록됩니다. SAT로 인증된 각 API 호출은 소유 서비스 계정에 귀속됩니다.
이를 통해 관리자는 조직 전체의 자동화된 자격 증명 사용 현황을 파악할 수 있습니다.

SAT 활동을 검토하려면 [**Security** > **Compliance** > **Audit Trail**][7]로 이동하고
Service Access Token 인증 방법으로 필터링하세요.

## API 참조 {#api-reference}

Datadog API를 통해 프로그래밍 방식으로 SAT를 관리하세요.

| 작업 | 엔드포인트 |
|-----------|----------|
| SAT 나열 | `GET /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens` |
| SAT 생성 | `POST /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens` |
| 특정 SAT 가져오기 | `GET /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |
| SAT 업데이트 | `PATCH /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |
| SAT 취소 | `DELETE /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |

사용자 및 서비스 계정 전반의 모든 PAT와 SAT를 한 번의 호출로 검색하려면 통합
엔드포인트를 사용하세요.

```
GET /api/v2/personal_access_tokens
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/org_settings/service_accounts/
[2]: /ko/account_management/personal-access-tokens/
[3]: https://app.datadoghq.com/organization-settings/service-accounts
[4]: https://app.datadoghq.com/organization-settings/access-tokens
[5]: /ko/account_management/rbac/permissions/
[6]: /ko/account_management/audit_trail/
[7]: https://app.datadoghq.com/audit-trail
[8]: https://aws.amazon.com/about-aws/whats-new/2026/05/secrets-manager-managed-external-secrets-datadog-snowflake/