---
aliases:
- /ko/account_management/faq/personal-access-tokens/
description: API 및 애플리케이션 키를 페어링하지 않고도 Datadog API 호출을 인증할 수 있는 수명이 짧고 범위가 지정된 개인
  액세스 토큰을 생성하고 관리하세요.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-api-authentication/
  tag: 블로그
  text: 범위가 지정된 자격 증명으로 Datadog API 인증 현대화
title: 개인 액세스 토큰
---
## 개요 {#overview}

개인 액세스 토큰(PAT)은 Datadog API 호출을 인증하는 자격 증명 유형입니다. 애플리케이션 키와 달리 PAT는 API 키와 페어링할 필요가 없습니다. 기본적으로 수명이 짧고 범위가 지정되어 있어 각 토큰이 액세스할 수 있는 항목과 유효 기간을 더 엄격하게 제어할 수 있습니다.

PAT를 사용하면 다음을 수행할 수 있습니다.
- 단일 자격 증명으로 API 호출을 인증합니다.
- 워크플로에 필요한 범위만 선택하여 최소 권한 원칙을 적용합니다.
- 필수 수명(TTL) 값을 통해 유출된 자격 증명의 영향 범위를 제한합니다. 만료된 토큰은 자동으로 취소되므로 비활성 자격 증명이 무기한 유지되지 않습니다.
- 텔레메트리 제출(Agent, 로그, 메트릭)에는 API 키를 사용하고, 기타 모든 웹 API 호출에는 PAT를 사용하여 업무를 분리하세요.

### 다른 자격 증명 유형과 PAT 비교 {#pats-compared-to-other-credential-types}

| | 개인 액세스 토큰 | 서비스 액세스 토큰 | 애플리케이션 키 |
|---|---|---|---|
| 독립형 인증 | 예, API 키 페어링 불필요 | 예, API 키 페어링 불필요 | 아니요, API 키 필요 |
| 기본적으로 범위 지정됨 | 예, 범위 필수 | 예, 범위 필수 | 선택 사항, 기본적으로 범위 미지정 |
| 수명(TTL) | 필수(24시간~1년) | 선택 사항, 장기 사용 가능 | 만료 없음 |
| 식별 가능한 접두사 | `ddpat_` | `ddsat_` | `ddapp_` (신규) |
| 연결 대상 | 개별 사용자 | 서비스 계정 | 개별 사용자 또는 서비스 계정 |

서비스 액세스 토큰에 대한 자세한 내용은 [서비스 액세스 토큰][7]을 참조하세요.

## 전제 조건 {#prerequisites}

- 권한이 있는 Datadog 사용자 계정 `user_app_keys`
- 조직 내 다른 사용자의 PAT를 관리하려면 `org_app_keys_write` 권한 필요

## 개인 액세스 토큰 만들기 {#create-a-personal-access-token}

1. [**개인 설정** > **액세스 토큰**][1]으로 이동합니다.
2. {{< ui >}}+ New Access Token{{< /ui >}} 항목을 클릭합니다.
3. 토큰의 {{< ui >}}Name{{< /ui >}} 항목을 입력합니다.
4. {{< ui >}}Expiration Date{{< /ui >}} 항목을 선택합니다. 최소 만료 기간은 24시간이며 최대 만료 기간은 생성일로부터 1년입니다.
5. {{< ui >}}Select Scopes{{< /ui >}} 항목을 클릭하여 이 토큰이 액세스할 수 있는 범위를 선택합니다. 최소 하나의 범위가 필요합니다. 워크플로에 필요한 권한만 부여한 다음 {{< ui >}}Save{{< /ui >}} 버튼을 클릭합니다.

<div class="alert alert-warning">Datadog은 토큰 생성 시에만 토큰 시크릿을 한 번 표시합니다. 복사하여 안전하게 보관하세요. 나중에 다시 검색할 수 없습니다.</div>

## 개인 액세스 토큰 사용하기 {#use-a-personal-access-token}

PAT는 두 가지 인증 방법을 지원합니다.

### 인증 헤더(권장) {#authorization-header-recommended}

`Authorization` 헤더에 Bearer 토큰으로 PAT를 전달합니다. 이 방법은 API 키가 필요하지 않습니다.

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "Authorization: Bearer <YOUR_PAT>"
```

### 애플리케이션 키 헤더{#application-key-header}

`dd-application-key` 헤더에 PAT를 전달합니다. 이는 이미 애플리케이션 키 헤더 형식을 사용하는 기존 통합을 마이그레이션하는 데 유용합니다.

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "dd-application-key: <YOUR_PAT>"
```

**참고:** `dd-application-key` 헤더에 유효한 개인 액세스 토큰이 제공되면 Datadog은 개인 액세스 토큰으로만 인증합니다. `dd-api-key` 헤더는 선택 사항이며 해당 값은 평가되지 않습니다.

## 개인 액세스 토큰 인증 API 호출에 대한 제한 사항 {#restrictions-on-pat-authenticated-api-calls}

권한 상승을 방지하기 위해 Datadog은 개인 액세스 토큰으로 인증된 API 호출이 수행할 수 있는 작업을 제한합니다. 이러한 제한 사항은 호출을 수행하는 API 클라이언트에 관계없이 적용됩니다.

- **애플리케이션 키**: 개인 액세스 토큰은 애플리케이션 키를 생성하거나 업데이트할 수 없습니다. 애플리케이션 키 취소는 허용됩니다.
- **새 토큰의 범위**: 개인 액세스 토큰은 새 토큰의 범위가 자체 범위의 하위 집합인 경우에만 개인 액세스 토큰 또는 서비스 액세스 토큰을 생성하거나 업데이트할 수 있습니다.
- **새 토큰의 유효 기간(TTL)**: 개인 액세스 토큰은 자체 만료일을 초과하는 유효 기간을 가진 개인 액세스 토큰 또는 서비스 액세스 토큰을 생성할 수 없습니다.

이러한 제한 사항 중 하나를 위반하는 호출은 `403 Forbidden` 응답을 반환합니다.

## 개인 액세스 토큰 관리하기 {#manage-personal-access-tokens}

### 토큰 조회하기 {#view-your-tokens}

[**개인 설정** > **액세스 토큰**][1]으로 이동하여 이름, 범위, 만료 날짜 및 마지막 사용 정보를 포함하여 계정과 연결된 모든 개인 액세스 토큰을 확인합니다.

토큰을 생성한 후 세부 정보 패널에 토큰 시크릿, 이름, 토큰 ID, 소유자, 범위 및 만료 날짜가 표시됩니다. 이 패널에서 토큰을 편집하거나 취소할 수도 있습니다.

{{< img src="account_management/personal-access-tokens/pat-details.png" alt="토큰 시크릿, 이름, 토큰 ID, 소유자, 범위 및 만료 날짜를 보여주는 개인 액세스 토큰 세부 정보" style="width:60%;" >}}

### 관리자로서 토큰 관리하기 {#manage-tokens-as-an-administrator}

`org_app_keys_read` 및 `org_app_keys_write` 권한이 있는 조직 관리자는 [**조직 설정** > **액세스 토큰**][2]에서 조직 내 모든 사용자의 개인 액세스 토큰을 보고 관리할 수 있습니다.

{{< img src="account_management/personal-access-tokens/pat-admin.png" alt="조직 관리자는 조직 설정에서 모든 개인 액세스 토큰을 조회하고 관리할 수 있습니다." style="width:80%;" >}}


### 토큰 취소하기 {#revoke-a-token}

1. [**개인 설정** > **액세스 토큰**][1] 또는 관리자의 경우 [**조직 설정** > **액세스 토큰**][2]으로 이동합니다.
2. 취소하려는 토큰 위에 마우스를 올리고 {{< ui >}}Revoke Token{{< /ui >}} 아이콘을 클릭합니다.

취소된 토큰은 더 이상 API 호출을 인증할 수 없습니다. 취소는 몇 초 내에 적용됩니다.

### 토큰 편집하기 {#edit-a-token}

기존 PAT의 이름과 범위를 업데이트할 수 있습니다. 생성 후에는 TTL을 수정할 수 없습니다. TTL을 변경하려면 기존 토큰을 취소하고 원하는 구성으로 토큰을 생성하세요.

## 토큰 형식 {#token-format}

PAT는 시크릿 스캔 및 키 관리를 지원하는 식별 가능한 형식을 사용합니다.

```
ddpat_<ALIAS>_<SECRET><CHECKSUM>
```

| 구성 요소 | 설명 |
|-----------|-------------|
| `ddpat_` | 자격 증명을 개인 액세스 토큰으로 식별하는 접두사 |
| `<ALIAS>` | 토큰 UUID에서 파생된 Base62 인코딩 토큰 식별자 |
| `<SECRET>` | 32바이트 무작위 생성 시크릿 |
| `<CHECKSUM>` | GitHub 체크섬 표준을 따르는 CRC32 체크섬 |

식별 가능한 접두사와 체크섬을 통해 GitHub 시크릿 스캔, Sensitive Data Scanner, GitGuardian을 포함한 시크릿 스캔 서비스에서 자동 감지가 가능합니다.

## 권한 {#permissions}

PAT는 애플리케이션 키와 동일한 권한을 사용합니다.

| 권한 | 설명 |
|------------|-------------|
| `user_app_keys` | 자신의 PAT 생성 및 관리하기 |
| `org_app_keys_read` | 조직 내 모든 사용자의 PAT 조회하기 |
| `org_app_keys_write` | 조직 내 모든 사용자의 PAT 생성, 편집 및 취소하기 |

권한에 대한 자세한 내용은 [역할 기반 Access Control][3]을 참조하세요.

## Audit Trail {#audit-trail}

조직에 [Audit Trail][4]이 활성화된 경우, Audit Trail은 모든 PAT 생성, 사용 및 취소 이벤트를 기록합니다. Audit Trail은 PAT로 수행된 각 API 호출에 대한 인증 방법 및 토큰 메타데이터를 캡처하여 관리자가 조직 전체의 자격 증명 사용 현황을 파악할 수 있도록 합니다.

PAT 활동을 검토하려면 [**Security** > **Compliance** > **Audit Trail**][5]로 이동하여 개인 액세스 토큰 인증 방법으로 필터링하세요.

## API 레퍼런스 {#api-reference}

Datadog API를 통해 프로그래밍 방식으로 PAT를 관리하세요.

| 작업 | 엔드포인트 |
|-----------|----------|
| PAT 및 SAT 목록 | `GET /api/v2/personal_access_tokens` |
| PAT 만들기 | `POST /api/v2/personal_access_tokens` |
| 특정 PAT 가져오기 | `GET /api/v2/personal_access_tokens/<PAT_ID>` |
| PAT 업데이트 | `PATCH /api/v2/personal_access_tokens/<PAT_ID>` |
| PAT 취소 | `DELETE /api/v2/personal_access_tokens/<PAT_ID>` |

`GET /api/v2/personal_access_tokens` 엔드포인트는 단일 호출로 PAT와 SAT를 모두 반환합니다.
SAT를 관리하려면 [서비스 액세스 토큰][7]을 참조하세요.

전체 API 레퍼런스는 [키 관리][6]을 참조하세요.

## 키 전파 지연 {#key-propagation-delay}

PAT는 최종 일관성 모델을 따릅니다. 생성 또는 취소 후 변경 사항이 모든 Datadog 시스템에 전파되는 데 몇 초가 걸릴 수 있습니다. 중요한 워크플로에서는 토큰을 생성한 직후에 바로 사용하지 마세요. 전파 기간 중 일시적인 오류를 처리하기 위해 짧은 지수 백오프로 재시도 전략을 구현하세요.

[1]: https://app.datadoghq.com/personal-settings/access-tokens
[2]: https://app.datadoghq.com/organization-settings/access-tokens
[3]: /ko/account_management/rbac/permissions/
[4]: /ko/account_management/audit_trail/
[5]: https://app.datadoghq.com/audit-trail
[6]: /ko/api/latest/key-management/
[7]: /ko/account_management/service-access-tokens/

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}