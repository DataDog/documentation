---
description: Google Workspace 사용자 디렉터리를 Cloud SIEM에 동기화하여 신호, 위험 및 조사에 ID 컨텍스트를 추가하세요.
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: 문서
  text: 엔터티 팩에 대해 자세히 알아보기
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
  tag: 문서
  text: Okta Identity 엔터티 팩 설정
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
  tag: 문서
  text: Microsoft Entra ID 엔터티 팩 설정
- link: /security/cloud_siem/triage_and_investigate/user_inventory/
  tag: 문서
  text: 사용자 인벤토리에서 동기화된 사용자 찾아보기
- link: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
  tag: 문서
  text: 엔터티 위험을 통해 엔터티 및 위험 점수 살펴보기
- link: /integrations/gsuite/
  tag: 문서
  text: Google Workspace 통합을 사용하여 Google Workspace 로그 수집
- link: https://www.datadoghq.com/blog/google-workspace-detections/
  tag: 블로그
  text: Datadog Cloud SIEM을 사용하여 Google Workspace 앱에서 악성 활동 탐지
title: Google Workspace Identity 엔터티 팩
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">엔터티 팩은 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

## 개요 {#overview}

Google Workspace Identity 엔터티 팩은 Google Workspace 사용자 디렉터리를 Cloud SIEM으로 동기화합니다. 연결하면 Cloud SIEM은 해당 디렉터리를 사용하여 다음 작업을 수행합니다.

- [사용자 인벤토리][8]에 Google Workspace 사용자 정보를 채웁니다.
- 신호에 사용자 배지를 추가하여 해당 활동을 수행한 사용자를 확인할 수 있도록 합니다.
- [엔터티 위험][1]에서 사용자의 모든 계정을 대상으로 위험 점수를 산정합니다.


엔터티 팩이 제공하는 일반적인 기능과 필요한 권한에 대해서는 [엔터티 팩][10]을 참조하세요.

Datadog은 사용자가 생성하고 도메인 전체 위임 권한을 부여한 Google Cloud 서비스 계정을 사용하여 [Google Admin SDK Directory API][2]를 통해 디렉터리를 읽습니다. Datadog은 사용자 레코드에 대한 읽기 전용 액세스 권한을 요청하며, 디렉터리에 쓰기 작업을 수행하지 않습니다.

## 전제 조건 {#prerequisites}

이 설정에는 서로 다른 두 가지 Google ID가 사용되며, 둘 다 일반적으로 '서비스 계정'이라고 불립니다. 두 ID는 서로 바꿔 사용할 수 없습니다.

| ID | 정의 | 사용 위치 |
| --- | --- | --- |
| **Google Cloud 서비스 계정** | Datadog이 인증에 사용하는 Google Cloud 엔터티입니다. | JSON 키 파일을 Datadog에 업로드하세요. |
| **Google Workspace 관리자 사용자** | 서비스 계정이 Directory API를 호출할 때 대신 인증하는 관리자 권한을 가진 Google Workspace 사용자입니다. | **Workspace Admin email** 필드에 입력합니다. |

**Workspace Admin email** 필드에는 서비스 계정이 아닌 Google Workspace 관리자 사용자의 이메일 주소를 입력해야 합니다. 입력하려는 주소가 `@<project-id>.iam.gserviceaccount.com`으로 끝나는 경우 이는 서비스 계정 이메일이므로 연결에 실패합니다.

시작하기 전에 다음 사항을 확인하세요.

- 서비스 계정을 만들고 API를 사용 설정할 수 있는 Google Cloud 프로젝트
- **Super Admin** 권한이 있는 동기화 대상 Google Workspace 테넌트의 계정 또는 사용자를 대신하여 도메인 전체 위임 권한을 부여할 수 있는 Super Admin
- 디렉터리를 연결하는 데 필요한 Datadog의 **SIEM Entities Admin** 권한 엔터티 팩이 제공하는 ID 컨텍스트를 확인하려는 분석가에게는 최소 **SIEM Entities Read** 권한이 필요합니다. [엔터티 팩][10]을 참조하세요.
- Google Workspace 디렉터리에 최소 1명의 사용자가 있어야 합니다. 디렉터리가 비어 있으면 사용자 인벤토리도 비어 있습니다.

Datadog은 개인 계정보다는 `datadog-integration@example.com`과 같이 일반적인 이름의 공유 관리자 계정을 가장하는 것을 권장합니다. 통합이 특정 개인의 계정에 의존하는 경우 해당 인원이 조직을 떠나거나 관리자 권한을 상실하면 동기화가 중단되며 원인을 추적하기 어렵습니다.

## 설정 {#setup}

Google Workspace 도메인당 한 세트의 자격 증명을 구성할 수 있습니다. 둘 이상의 도메인을 동기화하려면 [추가 도메인 연결](#connect-additional-domains)을 참조하세요.

### Google Cloud에서 서비스 계정 만들기 {#create-a-service-account-in-google-cloud}

1. Google Cloud 콘솔에서 서비스 계정을 만들 프로젝트를 선택합니다.
1. Google의 [서비스 계정 지침][4] 중 **Create a service account** 섹션의 안내를 따릅니다.
1. 서비스 계정의 JSON 키를 만들고 다운로드한 파일을 저장합니다. 이 파일은 나중에 Datadog에 업로드합니다.

서비스 계정에는 어떠한 Google Cloud IAM 역할도 필요하지 않습니다. 디렉터리 액세스 권한은 Google Cloud IAM이 아닌 Google Workspace 관리 콘솔에서 부여한 도메인 전체 위임 권한을 통해 얻습니다.

### Admin SDK API 활성화 {#enable-the-admin-sdk-api}

1. Google Cloud 콘솔에서 서비스 계정이 속한 프로젝트가 선택되어 있는지 확인합니다.
1. **APIs & Services** > **Library**로 이동합니다.
1. **Admin SDK API**를 검색하여 엽니다(`admin.googleapis.com`).
1. **Enable**을 클릭합니다.

### 도메인 전체 위임 권한 부여 {#grant-domain-wide-delegation}

1. Google Cloud 콘솔에서 서비스 계정을 열고 **Show advanced settings**를 클릭한 다음, **Domain-wide delegation** 아래에서 서비스 계정의 **Client ID**를 복사합니다. 이는 서비스 계정의 **Details** 탭에 **Unique ID**로 표시된 숫자 값과 동일합니다.
1. Google Workspace 관리 콘솔에서 **Security** > **Access and data control** > **API controls**로 이동합니다.
1. **Domain-wide delegation** 아래에서 **Manage Domain Wide Delegation**을 클릭합니다.
1. **Add new**를 클릭합니다.
1. 서비스 계정의 **Client ID**를 **Client ID** 필드에 붙여넣습니다.
1. **OAuth scopes**에 다음 범위를 입력합니다.
   ```text
   https://www.googleapis.com/auth/admin.directory.user.readonly
   ```
1. **Authorize**를 클릭합니다.
1. 권한 부여를 확인하려면 목록에서 새 **Client ID**를 찾아 **View details**를 클릭하고 범위가 나열되어 있는지 확인합니다.

자세한 내용은 Google의 [도메인 전체 권한을 서비스 계정에 위임][5]을 참조하세요.

### Datadog에서 자격 증명 추가 {#add-credentials-in-datadog}

1. Datadog에서 **Cloud SIEM** > [**Content Packs**][6]로 이동합니다.
1. **Entity Pack**으로 필터링한 다음 **Google Workspace Identity** 엔터티 팩을 엽니다. 디렉터리를 연결하기 전까지는 **AVAILABLE**로 표시됩니다.
1. **Add Credentials**를 클릭합니다.
1. **Add credentials and activate content pack** 대화 상자에서 **Browse files**를 클릭하고 다운로드한 서비스 계정 JSON 키 파일을 선택합니다. Datadog은 파일에서 `client_email`, `private_key`, `project_id` 값을 추출합니다.
1. 나머지 필드를 입력합니다.
   | 필드 | 설명 |
   | --- | --- |
   | **Name** | 이 자격 증명 세트의 표시 이름입니다(예: `Production credentials`). 둘 이상의 도메인을 연결하려는 경우 도메인을 식별할 수 있는 이름을 사용합니다. |
   | **Domain** | 동기화할 Google Workspace 도메인입니다(예: `example.com`). |
   | **Workspace Admin email** | 서비스 계정이 가장하는 Google Workspace 관리자 사용자입니다(예: `datadog-integration@example.com`). 서비스 계정 이메일을 사용하지 마세요. |
1. **Test Connection**을 클릭합니다. Datadog은 자격 증명을 저장하기 전에 Google Workspace를 통해 유효성을 검사합니다. 유효성 검사에 실패하면 [문제 해결](#troubleshooting)을 참조하세요.
1. 연결 테스트가 성공한 후 자격 증명을 저장하여 엔터티 팩을 활성화합니다.

Datadog은 서비스 계정 개인 키를 암호화하여 저장하며 Datadog 인터페이스나 API 응답으로 반환하지 않습니다.

## 동기화 확인 {#verify-the-sync}

동기화는 연속적으로 수행됩니다. 첫 번째 동기화는 Datadog이 자격 증명의 유효성을 검사하는 즉시 시작되며, 이후의 각 동기화는 이전 동기화가 완료될 때 시작되므로 사용자가 직접 동기화를 예약하거나 트리거할 필요가 없습니다. **Last synced**에 표시된 시간이 해당 계정의 평소 동기화 간격보다 훨씬 오래되었다면 원인을 조사할 필요가 있습니다.

Datadog이 자격 증명의 유효성을 검사한 후, 엔터티 팩은 **ACTIVE** 상태로 표시됩니다. **Cloud SIEM** > [**Content Packs**][6]에서 **Google Workspace Identity** 타일을 열어 사이드 패널을 표시한 후 다음 사항을 확인합니다.

### Credentials {#credentials}

**Credentials** 섹션에는 연결된 각 계정이 나열됩니다. 계정을 펼치면 다음 정보를 확인할 수 있습니다.

| 필드 | 표시되는 정보 |
| --- | --- |
| **Domain** | 이 계정이 동기화하는 Google Workspace 도메인입니다. |
| **Status** | 이 계정의 동기화가 활성화 상태인지 비활성화 상태인지를 나타냅니다. 토글을 사용하여 동기화 상태를 변경하거나 오버플로 메뉴에서 자격 증명을 제거합니다. |
| **Last updated** | 자격 증명 자체가 마지막으로 수정된 날짜와 시간을 나타냅니다. |
| **Sync status** | 가장 최근 동기화가 완료되었는지 여부입니다(예: `Synced`). |
| **Last synced** | 가장 최근 동기화가 실행된 후 경과한 시간입니다. |
| **Last sync duration** | 해당 동기화에 걸린 시간입니다. |

각 계정에는 다음과 같은 유효성 검사 배지도 표시됩니다.

| 배지 | 의미 |
| --- | --- |
| **Valid** | Datadog이 이 자격 증명을 사용하여 Google Workspace에 인증할 수 있습니다. |
| **Invalid** | Datadog이 인증할 수 없습니다. [문제 해결](#troubleshooting)을 참조하세요. |

### Key Metrics{#key-metrics}

**Key Metrics** 섹션에는 네 개의 위젯이 표시됩니다.

- **Users Synced**: 동기화로 인해 속성이 업데이트된 사용자 수입니다. 이는 디렉터리의 규모가 아닌 변경 규모를 나타내므로 일반적으로 전체 사용자 수보다 훨씬 작습니다.
- **Users by Credential**: 업데이트된 사용자 수를 연결된 계정별로 구분하여 표시합니다.
- **Sync History by Credential**: 시간에 따른 동기화 완료 내역입니다. 기록이 비어 있는 구간은 동기화가 실패했거나 건너뛰어졌음을 나타냅니다.
- **Sync Duration by Credential**: 각 동기화에 소요된 시간을 밀리초 단위로 표시합니다. 일시적인 급증은 정상적이지만, 지속적으로 증가한다면 디렉터리 규모가 커지고 있거나 Google 측에서 API 요청을 제한하고 있다는 의미일 수 있습니다.

자격 증명별 위젯은 사용자가 입력한 **Name**의 정규화된 형식인 `credential_name`을 기준으로 데이터를 그룹화합니다. 예를 들어 `Production credentials`는 `production_credentials`로 변환됩니다.

### 엔터티 {#entities}

**Entities** 섹션에는 이 엔터티 팩이 동기화한 사용자가 **Display Name**, **Principal ID**, **User Type**(예: `human` 또는 `service_account`), **Account Status**와 함께 나열됩니다.

이 엔터티 팩이 Cloud SIEM으로 가져온 사용자 수를 확인하려면 **Users Synced**가 아닌 엔터티 수를 확인합니다. **View in User Inventory**를 클릭하여 [전체 인벤토리][9]를 확인합니다.

ID 컨텍스트가 신호에 포함되는지 확인하려면 동기화된 사용자와 연결된 신호를 열고 사용자 배지가 표시되는지 확인합니다.

## 추가 도메인 연결 {#connect-additional-domains}

각 자격 증명 세트는 하나의 Google Workspace 도메인을 동기화합니다. 엔터티 팩이 **ACTIVE** 상태가 된 후, **Credentials** 섹션에서 **Add account**를 사용하여 추가 도메인을 각각 연결합니다.

추가 도메인마다 다음 단계를 수행합니다.

1. [해당 테넌트의 Google Workspace 관리 콘솔에서 도메인 전체 위임 권한을 부여합니다](#grant-domain-wide-delegation). 위임 권한은 이를 부여한 테넌트에만 적용됩니다.
1. 엔터티 팩 사이드 패널의 **Credentials** 섹션에서 **Add account**를 클릭합니다.
1. [Datadog에서 자격 증명 추가](#add-credentials-in-datadog)에 설명된 필드를 동일하게 입력한 다음 **Test Connection**을 클릭합니다.

둘 이상의 도메인을 사용하는 경우 다음 사항을 확인합니다.

- 각 계정에 도메인을 식별할 수 있는 **Name**을 지정하여 **Users by Credential**, **Sync History by Credential**, **Sync Duration by Credential**의 내용을 쉽게 구분할 수 있도록 합니다.
- **Workspace Admin email**의 주소가 **Domain** 값과 동일한 도메인에 속하는지 확인합니다. 불일치하면 연결 테스트가 실패합니다.

## 문제 해결 {#troubleshooting}

### 연결 테스트 실패 {#the-connection-test-fails}

다음 원인을 순서대로 확인합니다.

| 원인| 확인 방법| 해결 방법|
| --- | --- | --- |
| 관리자 이메일로 서비스 계정 이메일을 입력함 | **Workspace Admin email** 값이 `@<project-id>.iam.gserviceaccount.com` | 으로 끝남 관리자 권한이 있는 Google Workspace 사용자를 대신 입력합니다. |
| Admin SDK API가 활성화되지 않음 | Google Cloud 콘솔의 **APIs & Services** > **Enabled APIs & services** 목록에 다음 API가 없음: **Admin SDK API** | [서비스 계정이 속한 프로젝트에서 Admin SDK API 활성화](#enable-the-admin-sdk-api). |
| 도메인 전체 위임 권한이 부여되지 않음 | 서비스 계정의 **Client ID**가 **Manage Domain Wide Delegation** 페이지에 표시되지 않음 | [도메인 전체 위임 권한 부여](#grant-domain-wide-delegation). |
| OAuth 범위가 잘못되었거나 누락됨 | 위임 항목에서 **View details**를 클릭했을 때 `https://www.googleapis.com/auth/admin.directory.user.readonly`가 표시되지 않음 | 위임 항목을 수정하고 범위 끝에 다른 문자를 추가하지 않은 채 지정된 범위를 정확히 입력합니다. |
| 대신 인증하는 사용자에게 관리자 권한이 없음 | **Workspace Admin email**에 입력된 사용자에게 Google Workspace 관리 콘솔의 관리자 역할이 없음 | 관리자 권한이 있는 계정을 사용하거나 사용자 정보에 대한 읽기 권한이 있는 관리자 역할을 부여합니다. |
| 도메인 불일치 | **Domain** 값이 대신 인증하는 관리자 사용자의 도메인과 일치하지 않음 | **Domain** 값을 수정하거나 해당 도메인의 관리자 사용자로 대신 인증합니다. |
| JSON 키 파일이 불완전하거나 잘못됨 | 업로드한 파일에 `client_email`, `private_key` 또는 `project_id`가 누락되었거나 `type` 필드의 값이 다음과 다름: `service_account` | 서비스 계정에서 JSON 키를 다시 다운로드하고 수정하지 않은 파일을 업로드합니다. |

Google에 따르면 위임 변경 사항이 적용되는 데 최대 24시간이 걸릴 수 있지만 일반적으로는 그보다 빨리 적용됩니다. 방금 위임 권한을 부여했거나 범위를 추가했다면 잠시 기다린 후 **Test Connection**을 다시 실행합니다.

### 정상적으로 작동하던 자격 증명이 유효하지 않게 됨 {#credentials-were-working-and-are-now-invalid}

가장 흔한 원인은 다음과 같은 Google 측 변경 사항입니다.

- 대신 인증하는 관리자 사용자 계정이 정지 또는 삭제되었거나 관리자 역할을 상실했습니다. 이는 통합이 공유 계정이 아닌 개인 계정에 연결되어 있을 때 흔히 발생하는 문제입니다.
- 서비스 계정의 JSON 키가 교체, 비활성화 또는 삭제되었습니다. 키를 생성하여 업로드합니다.
- 서비스 계정 자체가 삭제되었거나 도메인 전체 위임 항목이 제거되었습니다.
- Google Cloud 프로젝트에서 Admin SDK API가 비활성화되었습니다.

### 동기화는 성공했지만 사용자가 나타나지 않음 {#the-sync-succeeds-but-no-users-appear}

**Domain** 값이 동기화하려는 사용자가 속한 도메인과 일치하는지 확인합니다. 입력한 도메인과 다른 도메인에 속한 관리자 사용자는 유효한 계정이더라도 결과가 비어 있을 수 있습니다.

### 신호에 사용자 배지가 표시되지 않음 {#no-user-pill-appears-on-signals}

ID 컨텍스트는 이메일 주소를 기준으로 이벤트와 연결됩니다. 동기화된 사용자의 활동에 사용자 배지가 표시되지 않으면 해당 소스의 로그에 사용자 이메일 필드가 채워져 있는지, 해당 소스의 OCSF 파이프라인이 활성화되어 있는지 확인합니다. [Open Cybersecurity Schema Framework][7]를 참조하세요.

엔터티 팩을 사용하기 위해 해당 로그 통합이나 콘텐츠 팩이 반드시 필요한 것은 아니며, 반대로 로그 통합이나 콘텐츠 팩을 사용하는 데도 엔터티 팩이 필요하지 않습니다. 디렉터리를 동기화하고 있지만 ID 컨텍스트를 연결할 Google Workspace 활동이 표시되지 않는다면 [Google Workspace 로그 통합][3]도 필요할 수 있습니다.

도움이 더 필요하면 [Datadog 고객 지원팀][8]에 문의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: https://developers.google.com/workspace/admin/directory/v1/guides
[3]: /ko/integrations/gsuite/
[4]: https://developers.google.com/workspace/guides/create-credentials#service-account
[5]: https://developers.google.com/identity/protocols/oauth2/service-account#delegatingauthority
[6]: https://app.datadoghq.com/security/siem/content-packs
[7]: /ko/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[8]: /ko/help/
[9]: /ko/security/cloud_siem/triage_and_investigate/user_inventory/
[10]: /ko/security/cloud_siem/ingest_and_enrich/entity_packs/