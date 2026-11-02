---
description: Okta 사용자 디렉터리를 Cloud SIEM에 동기화하여 신호, 위험 및 조사에 ID 컨텍스트를 추가하세요.
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: 문서
  text: 엔터티 팩에 대해 자세히 알아보기
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
  tag: 문서
  text: Google Workspace Identity 엔터티 팩 설정
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
  tag: 문서
  text: Microsoft Entra ID 엔터티 팩 설정
- link: /security/cloud_siem/triage_and_investigate/user_inventory/
  tag: 문서
  text: 사용자 인벤토리에서 동기화된 사용자 찾아보기
- link: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
  tag: 문서
  text: 엔터티 위험을 통해 엔터티 및 위험 점수 살펴보기
- link: /integrations/okta/
  tag: 문서
  text: Okta 통합을 사용한 Okta 로그 수집
title: Okta Identity 엔터티 팩
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">엔터티 팩은 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

## 개요 {#overview}

Okta Identity 엔터티 팩은 Okta 사용자 디렉터리를 Cloud SIEM에 동기화합니다. 연결하면 Cloud SIEM은 해당 디렉터리를 사용하여 다음 작업을 수행합니다.

- [사용자 인벤토리][8]에 Okta 사용자 정보를 채웁니다.
- 신호에 사용자 배지를 추가하여 해당 활동을 수행한 사용자를 확인할 수 있도록 합니다.
- [엔터티 위험][1]에서 사용자의 모든 계정을 대상으로 위험 점수를 산정합니다.

엔터티 팩이 제공하는 일반적인 기능과 필요한 권한에 대해서는 [엔터티 팩][10]을 참조하세요.

Datadog은 사용자가 생성한 Okta API 토큰으로 인증하여 [Okta Users API][2]를 통해 디렉터리를 읽습니다. 읽기 전용 액세스 권한만 필요합니다. Datadog은 디렉터리에 쓰기 작업을 수행하지 않습니다.

## 전제 조건 {#prerequisites}

설정에는 **Name**, **Okta Domain**, **API Token**이라는 세 가지 값이 필요합니다. 세 값은 모두 엔터티 팩에 입력하며 API 토큰은 Okta에서 생성합니다.

시작하기 전에 다음 사항을 확인하세요.

- API 토큰을 생성하고 사용자를 읽을 수 있는 Okta 관리자 역할 **Read-only Administrator** 역할이면 충분하며 더 높은 권한을 가진 관리자 역할도 사용할 수 있습니다. Okta의 [표준 관리자 역할 및 권한][5]을 참조하세요.
- 디렉터리를 연결하는 데 필요한 Datadog의 **SIEM Entities Admin** 권한 엔터티 팩이 제공하는 ID 컨텍스트를 확인하려는 분석가에게는 최소 **SIEM Entities Read** 권한이 필요합니다. [엔터티 팩][10]을 참조하세요.

## 설정 {#setup}

Okta 조직당 하나의 자격 증명 세트를 구성할 수 있습니다. 둘 이상의 Okta 조직을 동기화하려면 [추가 Okta 조직 연결](#connect-additional-okta-orgs)을 참조하세요.

### API 토큰 생성 {#create-the-api-token}

1. Okta Admin Console에서 **Security** > **API**로 이동합니다.
1. **Tokens** 탭을 클릭한 후 **Create token**을 클릭합니다.
1. Datadog이 토큰 사용 주체임을 알 수 있는 이름을 지정합니다(예: `datadog-cloud-siem`).
1. **API calls made with this token must originate from**에서 **Any IP**를 선택합니다. 토큰을 Datadog의 IP 주소에서만 사용할 수 있도록 제한하려면 [네트워크 제한](#network-restrictions)을 참조하세요.
1. **Create token**을 클릭한 후 토큰 값을 즉시 복사합니다. Okta는 토큰 값을 한 번만 표시하고 이후에는 해시값만 저장합니다.

전체 절차 및 기타 네트워크 영역 옵션은 Okta의 [Okta API 토큰 관리][4]를 참조하세요.

<div class="alert alert-info">개인 계정이 아닌 전용 서비스 계정(예: <code>datadog-integration@example.com</code>)에서 토큰을 생성합니다. 토큰은 생성한 계정의 권한을 상속하며 Okta는 비활성화된 계정에서 생성한 토큰을 거부합니다. 해당 계정의 소유자가 퇴사하거나 관리자 역할을 상실하면 동기화가 중단되며 원인을 추적하기 어렵습니다.</div>

#### 토큰 만료 {#token-expiration}

Okta API 토큰은 30일 동안 유효하며, API 요청이 발생할 때마다 토큰의 유효 기간이 갱신됩니다. 따라서 활성화된 엔터티 팩은 사용하는 토큰의 유효성을 계속 유지합니다. 30일을 초과하여 사용하지 않은 토큰은 영구적으로 폐기되며 다시 활성화할 수 없습니다.

#### 네트워크 제한 {#network-restrictions}

가장 간단한 방법은 **Any IP**를 선택하는 것입니다. 조직에서 토큰의 사용 범위를 제한해야 한다면 Datadog에서 공개한 IP 범위를 포함하는 Okta IP 영역으로 토큰의 사용 범위를 제한합니다.

Datadog은 해당 범위를 사이트별 엔드포인트에서 JSON으로 게시합니다. US1 사이트의 경우 해당 엔드포인트는 `https://ip-ranges.datadoghq.com/`입니다. 사용 중인 Datadog 사이트와 일치하는 엔드포인트를 사용하고, IP 범위가 변경될 때마다 IP 영역을 업데이트합니다. 응답에는 변경 여부를 모니터링할 수 있는 `version` 및 `modified` 필드가 포함됩니다. 모든 엔드포인트의 목록은 [IP 범위][12]를 참조하세요.

이 방법을 사용하면 다음 두 가지 Okta 제약 사항이 적용됩니다. SSWS 토큰은 동적 영역이 아닌 IP 기반 영역에서만 작동하며 차단 목록 영역에서는 사용할 수 없습니다.

#### Okta 도메인 {#okta-domain}

로그인에 사용하는 호스트를 스킴이나 경로 없이 입력합니다(예: `example.okta.com`).

### Datadog에서 자격 증명 추가 {#add-credentials-in-datadog}

1. Datadog에서 **Cloud SIEM** > [**Content Packs**][6]로 이동합니다.
1. **Entity Pack**으로 필터링한 다음 **Okta Identity** 엔터티 팩을 엽니다. 디렉터리를 연결하기 전까지는 **AVAILABLE**로 표시됩니다.
1. **Add Credentials**를 클릭합니다.
1. **Add credentials and activate content pack** 대화 상자에서 다음 세 필드를 입력합니다.
   | 필드 | 설명 |
   | --- | --- |
   | **Name** | 자격 증명 세트의 표시 이름입니다(예: `Production credentials`). 둘 이상의 조직을 연결할 계획이라면 각 조직을 식별할 수 있는 이름을 사용합니다. |
   | **Okta Domain** | 동기화할 Okta 조직입니다(예: `example.okta.com`). 스킴이나 경로 없이 호스트만 입력합니다. |
   | **API Token** | Okta에서 복사한 토큰 값입니다. 원시 API 요청에서 사용하는 `SSWS` 접두사를 제외하고 토큰 값만 붙여넣습니다. |
1. **Test Connection**을 클릭합니다. Datadog은 자격 증명을 저장하기 전에 Okta를 통해 유효성을 검사합니다. 유효성 검사에 실패하면 [문제 해결](#troubleshooting)을 참조하세요.
1. 연결 테스트가 성공하면 자격 증명을 저장하여 엔터티 팩을 활성화합니다.

Datadog은 저장된 API 토큰을 암호화하며 인터페이스나 API 응답으로 반환하지 않습니다.

## 동기화 확인 {#verify-the-sync}

동기화는 연속적으로 수행됩니다. 첫 번째 동기화는 Datadog이 자격 증명의 유효성을 검사하는 즉시 시작되며, 이후의 각 동기화는 이전 동기화가 완료될 때 시작되므로 사용자가 직접 동기화를 예약하거나 트리거할 필요가 없습니다.

따라서 **Last synced**만으로도 동기화가 정상적으로 작동하는지 확인할 수 있습니다. 정상적인 계정은 최근 동기화 기록이 계속 갱신되므로 **Last synced** 시간이 더 이상 갱신되지 않는다면 문제가 발생했다는 의미입니다.

Datadog이 자격 증명의 유효성을 검사한 후, 엔터티 팩은 **ACTIVE** 상태로 표시됩니다. Cloud SIEM에서 해당 사이드 패널을 열고 다음 사항을 확인합니다.

### Credentials {#credentials}

**Credentials** 섹션에는 연결된 각 계정이 나열됩니다. 계정을 펼치면 다음 정보를 확인할 수 있습니다.

| 필드 | 표시되는 정보 |
| --- | --- |
| **Domain** | 이 계정에서 동기화하는 Okta 조직입니다. |
| **Status** | 이 계정의 동기화가 **Enabled** 상태인지 비활성화 상태인지를 나타냅니다. 토글을 사용하여 동기화 상태를 변경합니다. |
| **Last updated** | 자격 증명 자체가 마지막으로 수정된 날짜와 시간을 나타냅니다. |
| **Sync status** | 가장 최근 동기화가 완료되었는지 여부입니다(예: `Synced`). |
| **Last synced** | 가장 최근 동기화가 실행된 후 경과한 시간입니다. |
| **Last sync duration** | 해당 동기화에 걸린 시간입니다. |

각 계정에는 다음과 같은 유효성 검사 배지도 표시됩니다.

| 배지 | 의미 |
| --- | --- |
| **VALID** | Datadog이 이 자격 증명을 사용하여 Okta에 인증할 수 있습니다. |
| **INVALID** | Datadog이 인증할 수 없습니다. [문제 해결](#troubleshooting)을 참조하세요. |

API에서는 Datadog이 자격 증명을 수락한 시점부터 첫 번째 동기화가 완료되기 전까지 해당 자격 증명의 상태가 `initializing`로 표시됩니다.

### Key Metrics{#key-metrics}

**Key Metrics** 대시보드에는 네 개의 위젯이 표시됩니다.

- **Users Synced**: 동기화를 통해 업데이트된 사용자 수입니다. 이는 디렉터리의 규모가 아닌 변경 규모를 나타내므로 일반적으로 전체 사용자 수보다 훨씬 작은 수치로 표시됩니다. 전체 사용자 수는 아래의 [Entities](#entities) 섹션에서 확인합니다.
- **Users by Credential**: 동일한 사용자 수를 연결된 계정별로 구분하여 표시합니다.
- **Sync History by Credential**: 시간에 따른 동기화 완료 내역입니다. 기록이 비어 있는 구간은 동기화가 실패했거나 건너뛰어졌음을 의미합니다.
- **Sync Duration by Credential**: 각 동기화에 걸린 시간입니다. 간헐적인 급증은 정상적인 현상입니다. 지속적인 증가는 일반적으로 디렉터리 규모가 커지고 있거나 Okta에서 API 호출 속도를 제한하고 있음을 의미합니다.

각 자격 증명별 위젯은 사용자가 입력한 **Name**에서 파생된 `credential_name`을 기준으로 데이터를 그룹화합니다.

### 엔터티 {#entities}

**Entities** 섹션에는 이 엔터티 팩이 동기화한 사용자 목록이 표시됩니다. 각 행에는 **Display Name**, **Principal ID**, **User Type**(예: `human` 또는 `service_account`), **Account Status**(예: **ACTIVE**)가 표시됩니다.

Cloud SIEM은 Okta의 사용자 상태를 모든 ID 공급자에 공통으로 적용하는 상태 모델(**ACTIVE**, **SUSPENDED**, **DELETED**)로 정규화합니다. 여기에 있는 값은 Okta 자체의 상태 이름이 아닙니다.

엔터티 수는 이 디렉터리에서 동기화된 총 사용자 수를 나타내므로 Okta 디렉터리의 규모와 비교할 때 사용할 수 있습니다. 목록에 적용되는 시간 범위는 변경할 수 있습니다. 전체 목록을 보려면 **View in User Inventory**를 클릭합니다.

## 추가 Okta 조직 연결 {#connect-additional-okta-orgs}

각 자격 증명 세트는 하나의 Okta 조직을 동기화합니다. 다른 조직을 동기화하려면 해당 조직에서 API 토큰을 생성한 다음, 엔터티 팩 사이드 패널의 **Credentials** 섹션에서 **Add account**를 클릭합니다.

여러 조직을 연결할 때는 다음 사항을 확인합니다.

- 각 계정의 이름을 동기화 대상 조직의 이름을 따서 지정합니다. 세 가지 자격 증명별 위젯은 입력한 **Name**의 정규화된 형식인 `credential_name`을 기준으로 데이터를 그룹화하므로 이름이 모호하면 위젯의 내용을 구분하기 어렵습니다.
- **Status** 아래의 계정별 토글을 사용하여 자격 증명을 제거하지 않고 특정 조직의 동기화를 일시 중지합니다.
- 각 조직에서 별도의 API 토큰을 생성합니다. 토큰은 해당 토큰을 발급한 조직에 대해서만 인증합니다.

## 문제 해결 {#troubleshooting}

### 연결 테스트 실패 {#the-connection-test-fails}

다음 원인을 순서대로 확인합니다.

| 원인| 확인 방법| 해결 방법|
| --- | --- | --- |
| 토큰 값에 `SSWS` 접두사 또는 앞뒤 공백이 포함됨 | 붙여넣은 값이 Okta에 표시된 토큰보다 김 | 토큰 값만 다시 붙여넣습니다. |
| Okta 도메인에 스킴 또는 경로가 포함됨 | **Okta Domain** 값이 `https://`로 시작하거나 `/admin` 또는 끝에 슬래시가 포함됨 | 호스트만 입력합니다(예: `example.okta.com`). |
| 잘못된 Okta 조직 호스트 | 미리 보기 조직에 `example.okta.com`을 사용하거나 EMEA 조직에서 `-emea` 접미사를 생략함 | 로그인에 사용하는 호스트를 입력합니다(예: `example.oktapreview.com` 또는 `example.okta-emea.com`). |
| 토큰 생성자가 관리자가 아니거나 사용자 읽기 권한이 없음 | 토큰을 생성한 계정에 Okta Admin Console의 관리자 역할이 없음 | **Read-only Administrator** 또는 더 높은 권한의 관리자 역할이 있는 계정에서 토큰을 생성합니다. |
| 토큰 생성자가 비활성화됨 | 토큰을 생성한 계정이 더 이상 Okta에서 활성 상태가 아님 | 활성 서비스 계정에서 토큰을 생성합니다. Okta는 비활성화된 사용자의 토큰을 거부합니다. |
| 토큰이 폐기되었거나 만료됨 | Okta의 **Tokens** 탭에 토큰이 없거나 마지막 사용일로부터 30일이 넘음 | 토큰을 생성하여 Datadog에 추가합니다. Okta는 30일 동안 사용하지 않은 토큰을 영구적으로 폐기합니다. |
| 토큰의 사용 범위가 Datadog이 포함되지 않은 네트워크 영역으로 제한됨 | 토큰의 **Token can be used from** 설정이 다음 값과 다름: **Any IP** | 토큰을 **Any IP**로 설정하거나 IP 영역에 Datadog에서 공개한 IP 범위가 포함되어 있는지 확인합니다. [네트워크 제한](#network-restrictions)을 참조하세요. |

### 정상적으로 작동하던 자격 증명이 유효하지 않게 됨 {#credentials-were-working-and-are-now-invalid}

일반적으로 다음과 같은 Okta 측 변경 사항이 원인입니다.

- 토큰을 생성한 계정이 비활성화되었거나 사용자 읽기 권한을 부여했던 관리자 역할을 상실했습니다. 토큰의 권한은 생성한 계정의 권한을 따르므로 역할이 변경되기만 해도 동기화가 중단될 수 있습니다. 토큰이 서비스 계정이 아닌 개인 계정에 속한 경우 흔히 발생하는 문제입니다.
- 토큰이 **Tokens** 탭에서 폐기되었거나 30일간 사용되지 않아 만료되었습니다.
- 토큰의 네트워크 영역 제한이 변경되었습니다.

Okta는 System Log에 토큰 생성 및 폐기 내역을 `API token created` 및 `API token revoked`로 기록합니다. 이를 통해 토큰의 폐기 여부와 폐기한 사용자를 가장 빠르게 확인할 수 있습니다.

### 동기화가 느리거나 간헐적으로 수행됨 {#syncs-are-slow-or-intermittent}

Okta는 조직별로 API 호출 속도를 제한하며 제한을 초과하면 `HTTP 429 Too Many Requests`를 반환합니다. Okta Admin Console에서 생성한 토큰에는 기본적으로 각 API 호출 속도 제한의 50%가 할당되며 동일한 토큰을 사용하는 다른 통합도 이 할당량을 공유합니다.

- Okta에서 **Reports** > **Rate Limits**로 이동하여 경고 및 제한 위반 내역을 확인합니다. 이러한 내역은 Okta의 System Log에도 기록됩니다.
- 기본값으로 인해 동기화가 제한된다면 Okta의 토큰 페이지에서 **Token rate limits** 비율을 높입니다.
- 다른 통합에서 이미 사용 중인 토큰을 재사용하지 않고 Datadog 전용 토큰을 사용합니다.

Okta의 [속도 제한 개요][11]를 참조하세요.

### 동기화는 성공했지만 사용자가 나타나지 않음 {#the-sync-succeeds-but-no-users-appear}

- **Domain** 값이 동기화하려는 사용자가 속한 도메인과 일치하는지 확인합니다. 입력한 도메인과 다른 도메인에 속한 관리자 사용자는 유효한 계정이더라도 결과가 비어 있을 수 있습니다.


### 신호에 사용자 배지가 표시되지 않음 {#no-user-pill-appears-on-signals}

Cloud SIEM은 이메일 주소를 기준으로 ID 컨텍스트를 이벤트와 연결합니다. 동기화된 사용자의 활동에 사용자 배지가 표시되지 않으면 해당 소스의 로그에 사용자 이메일 필드가 채워져 있는지, 해당 소스의 OCSF 파이프라인이 활성화되어 있는지 확인합니다. [Open Cybersecurity Schema Framework][7]를 참조하세요.

엔터티 팩을 사용하기 위해 해당 로그 통합이 필요한 것은 아니며 로그 통합을 사용하는 데도 엔터티 팩이 필요하지 않습니다. 디렉터리를 동기화하고 있지만 ID 컨텍스트를 연결할 Okta 활동이 표시되지 않는다면 [Okta 로그 통합][3]도 필요할 수 있습니다.

도움이 더 필요하면 [Datadog 고객 지원팀][8]에 문의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: https://developer.okta.com/docs/api/openapi/okta-management/management/tags/user
[3]: /ko/integrations/okta/
[4]: https://help.okta.com/en-us/content/topics/security/api.htm
[5]: https://help.okta.com/en-us/content/topics/security/administrators-admin-comparison.htm
[6]: https://app.datadoghq.com/security/siem/content-packs
[7]: /ko/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[8]: /ko/help/
[9]: /ko/security/cloud_siem/triage_and_investigate/user_inventory/
[10]: /ko/security/cloud_siem/ingest_and_enrich/entity_packs/
[11]: https://developer.okta.com/docs/reference/rate-limits/
[12]: /ko/api/latest/ip-ranges/