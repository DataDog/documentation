---
description: Microsoft Entra ID 사용자 디렉터리를 Cloud SIEM으로 동기화하여 신호, 위험 및 조사에 ID 컨텍스트를
  추가하세요.
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: 문서
  text: 엔터티 팩에 대해 자세히 알아보기
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
  tag: 문서
  text: Okta Identity 엔터티 팩 설정
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
  tag: 문서
  text: Google Workspace Identity 엔터티 팩 설정
- link: /security/cloud_siem/triage_and_investigate/user_inventory/
  tag: 문서
  text: 사용자 인벤토리에서 동기화된 사용자 찾아보기
- link: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
  tag: 문서
  text: 엔터티 위험을 통해 엔터티 및 위험 점수 살펴보기
- link: /getting_started/integrations/azure/
  tag: 문서
  text: Azure 통합 시작하기
title: Microsoft Entra ID 엔터티 팩
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">엔터티 팩은 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

## 개요 {#overview}

Microsoft Entra ID 엔터티 팩은 Microsoft Entra ID 사용자 디렉터리를 Cloud SIEM으로 동기화합니다. 연결하면 Cloud SIEM은 해당 디렉터리를 사용하여 다음 작업을 수행합니다.

- [사용자 인벤토리][8]에 Entra ID 사용자 정보를 채웁니다.
- 신호에 사용자 배지를 추가하여 해당 활동을 수행한 사용자를 확인할 수 있도록 합니다.
- [엔터티 위험][1]에서 사용자의 모든 계정을 대상으로 위험 점수를 산정합니다.

엔터티 팩이 제공하는 일반적인 기능과 필요한 권한에 대해서는 [엔터티 팩][9]을 참조하세요.

Datadog은 [Microsoft Graph API][2]를 통해 디렉터리를 읽으며, 애플리케이션 권한이 부여되고 테넌트 관리자의 동의를 받은 Azure 앱 등록을 사용하여 인증합니다. Datadog은 읽기 전용 액세스를 요청하며 디렉터리에 쓰지 않습니다.

다른 엔터티 팩과 달리 Microsoft Entra ID는 Cloud SIEM에 직접 입력하는 자격 증명이 아닌 [Datadog Azure 통합][10]을 기반으로 합니다. 엔터티 팩에 사용되는 앱 등록은 Azure 통합에서 사용하는 앱 등록과 동일하며, 리소스 수집이 활성화되어 있어야 합니다. 이미 Azure 통합을 실행 중이라면 설정의 대부분이 완료된 것이며, 기존 앱 등록에 두 개의 Microsoft Graph 권한을 추가하기만 하면 됩니다.

## 전제 조건 {#prerequisites}

시작하기 전에 다음 사항을 확인하세요.

- Datadog에 [Azure 통합][10]이 구성되어 있고, 사용하려는 앱 등록에서 **리소스 수집이 활성화**되어 있어야 합니다. 리소스 수집이 필수이며, 활성화하지 않으면 엔터티 팩이 동기화되지 않습니다.
- 해당 앱 등록에 최소 하나의 Azure 구독이 구성되어 있어야 합니다(실제로 사용하지 않더라도 필요함).
- Microsoft Graph 애플리케이션 권한을 추가하고 관리자 동의를 부여할 수 있는 Azure 포털 권한이 있어야 합니다. 동의를 부여하려면 **Privileged Role Administrator** 또는 **Global Administrator** 역할이 필요합니다.
- 다음 Datadog 권한:

  | 권한 | 필요한 이유 |
  | --- | --- |
  | **SIEM Entities Admin** | 사용자 디렉터리를 연결하고 자격 증명을 관리합니다. [엔터티 팩][9]을 참조하세요. |
  | **Integrations Manage** | 이 엔터티 팩을 구성하는 데 사용되는 Azure 통합을 수정합니다. |

  엔터티 팩이 제공하는 ID 컨텍스트를 확인하려면 분석가에게 최소한 **SIEM Entities Read** 권한이 필요합니다.

## 설정 {#setup}

Entra ID 테넌트당 하나의 앱 등록을 구성할 수 있습니다. 둘 이상의 테넌트를 동기화하려면 [추가 테넌트 연결](#connect-additional-tenants)을 참조하세요.

리소스 수집이 활성화된 Azure 통합이 이미 있는 경우 [Microsoft Graph 권한 부여](#grant-microsoft-graph-permissions) 단계로 건너뛰세요.

### Azure 통합 설정 {#set-up-the-azure-integration}

1. Datadog에서 **Integrations** > [**Azure**][3]로 이동합니다.
1. 아직 Azure 통합이 없는 경우 [Azure 시작하기][10]의 안내를 따릅니다. 다음 세 가지 방법으로 설정할 수 있습니다.
   - **Quickstart**: Azure Cloud Shell에서 설치 스크립트를 실행합니다.
   - **Terraform**: 코드형 인프라 워크플로에 사용합니다.
   - **기존 앱 등록**: 테넌트 ID, 클라이언트 ID, 클라이언트 시크릿을 직접 입력하는 방식입니다.
1. Azure 통합이 이미 설정되어 있다면 다음과 같이 사용할 앱 등록이 준비되었는지 확인합니다.
   1. **Configuration** 탭에서 목록에 있는 앱 등록을 선택합니다. 각 항목에는 이름 또는 클라이언트 ID와 구독 수가 표시됩니다. 구독이 하나 이상 있는지 확인합니다.
   1. **Resource Collection** 탭을 열고 **Enable Resource Collection**이 켜져 있는지 확인합니다. 꺼져 있으면 켭니다.

확인한 앱 등록을 기록해 둡니다. 다음 단계에서 이 앱 등록에 Microsoft Graph 권한을 부여하고, 이후 Cloud SIEM에서 이 앱 등록을 선택합니다.

### Microsoft Graph 권한 부여 {#grant-microsoft-graph-permissions}

앱 등록에는 사용자 데이터를 읽기 위한 Microsoft Graph 애플리케이션 권한이 필요합니다. 이는 Azure 통합에서 이미 사용 중인 권한 외에 추가로 필요한 권한입니다.

1. Azure 포털에서 **Microsoft Entra ID** > **App registrations**로 이동합니다.
1. Datadog 앱 등록을 선택합니다. 비슷해 보이는 것이 여러 개 있는 경우 클라이언트 ID로 검색합니다.
1. 왼쪽 사이드바에서 **API permissions**를 클릭합니다.
1. **Add a permission** > **Microsoft Graph** > **Application permissions**를 클릭합니다.
1. 다음 권한을 추가합니다.
   | 권한 | 필요한 용도 | 읽는 데이터 |
   | --- | --- | --- |
   | `User.Read.All` | 사용자 프로필 | 사용자 속성: 이메일, 이름, 부서, 직책, 계정 상태 및 비밀번호 변경 타임스탬프. |
   | `AuditLog.Read.All` | MFA 상태 및 로그인 활동 | MFA 등록 상태, 인증 방법 세부 정보 및 로그인 활동. |

   `User.Read.All` 대신 `Directory.Read.All`을 부여할 수 있습니다. 범위가 더 넓으며, 사용자 데이터와 기타 디렉터리 오브젝트를 포함합니다. 조직에서 더 넓은 범위를 선택할 이유가 없다면 `User.Read.All`을 부여합니다.
1. **Grant admin consent for \<your tenant name\>**를 클릭합니다. 자세한 내용은 Microsoft의 [테넌트 전체 관리자 동의 부여][4]를 참조하세요.
1. 두 권한 모두 **Status** 열에 녹색 확인 표시가 나타나는지 확인합니다. 권한 추가와 권한 동의는 별개의 절차이며, 동의 단계가 누락되는 경우가 가장 많습니다.

<div class="alert alert-info">해당 권한이 없어도 <code>AuditLog.Read.All</code>디렉터리는 계속 동기화되고 사용자는 사용자 인벤토리에 표시되지만, 사용자 레코드에는 MFA 상태나 로그인 활동이 포함되지 않습니다.</div>

### Datadog에 앱 등록 추가 {#add-an-app-registration-in-datadog}

1. Datadog에서 **Cloud SIEM** > [**Content Packs**][5]로 이동합니다.
1. **Entity Pack**으로 필터링한 다음 **Microsoft Entra ID** 엔터티 팩을 엽니다. 디렉터리를 연결하기 전까지는 **AVAILABLE**로 표시됩니다.
1. **Add Account**를 클릭합니다.
1. **Add App Registration** 대화 상자에서 설정 방법을 선택합니다.
   | 방법 | 사용 시기 |
   | --- | --- |
   | **Quickstart** | Datadog 설치 스크립트를 사용하여 Azure Cloud Shell에서 통합을 자동으로 구성하려는 경우 |
   | **Terraform** | Azure 구성을 코드로 관리하는 경우 |
   | **Existing App Registration** | 위 단계를 따랐다면 필요한 권한이 있는 앱 등록을 Azure에 이미 설정한 경우에 해당합니다. |
1. 엔터티 팩에 Azure 앱 등록이 표시됩니다. Microsoft Graph 권한을 부여한 앱 등록을 선택하고 리소스 수집이 활성화되어 있는지 확인합니다.
1. **6 Azure applications have Resource Collection disabled.**와 같은 경고가 표시되면 그 아래 목록에서 Microsoft Graph 권한을 부여한 앱 등록을 찾습니다. 빨간색 점은 리소스 수집이 비활성화되었음을 의미합니다. 앱 등록 옆의 **Configure**를 클릭하거나 **Integrations** > [**Azure**][3]에서 앱 등록을 열고 **Resource Collection** 탭에서 **Enable Resource Collection**을 켭니다.

## 동기화 확인 {#verify-the-sync}

Entra ID 동기화는 Azure 리소스 수집에 의존하므로, 앱 등록을 연결한 직후에는 Cloud SIEM에 사용자가 나타나지 않습니다.

앱 등록이 연결되고 유효성이 검사되면 엔터티 팩이 **ACTIVE**로 표시됩니다. Cloud SIEM에서 해당 사이드 패널을 열고 다음 사항을 확인합니다.

### Credentials {#credentials}

**Credentials** 섹션에는 연결된 계정 수와 각 계정의 목록이 표시됩니다. 계정을 펼치면 다음 정보를 확인할 수 있습니다.

| 필드 | 표시되는 정보 |
| --- | --- |
| **Subscription** | 이 계정을 식별하는 Azure 구독 ID입니다. |
| **Created on** | 계정이 연결된 날짜와 시간입니다. |
| **Sync status** | 가장 최근 동기화가 완료되었는지 여부입니다(예: `Synced`). |
| **Last synced** | 가장 최근 동기화가 실행된 후 경과한 시간입니다. |
| **Last sync duration** | 해당 동기화에 걸린 시간입니다. |

구독 ID 옆의 **HEALTHY** 배지는 계정이 정상적으로 동기화되고 있음을 의미합니다. 계정을 제거하지 않고 동기화를 활성화하거나 비활성화하려면 계정 오른쪽에 있는 토글을 사용합니다.

동기화 세부 정보 아래에는 해당 계정의 Azure 앱 등록이 클라이언트 ID별로 나열되며 각 앱 등록의 구독 수도 표시됩니다. 녹색 점은 해당 앱 등록에서 리소스 수집이 활성화되었음을 의미하고, 빨간색 점은 비활성화되었음을 의미합니다. 비활성화된 항목이 있으면 목록 위에 해당 항목 수가 요약되어 표시됩니다(예: **6 Azure applications have Resource Collection disabled.**). 앱 등록 옆의 **Configure**를 클릭하여 설정 화면을 열고 리소스 수집을 활성화합니다.

Microsoft Graph 권한을 부여한 앱 등록에서 리소스 수집을 활성화해야 합니다. 목록의 다른 앱 등록에서 리소스 수집이 여전히 비활성화되어 있더라도 계정은 **HEALTHY** 및 **Synced**로 표시될 수 있습니다.

### Key Metrics{#key-metrics}

**Key Metrics** 대시보드에는 네 개의 위젯이 표시됩니다.

- **Users Synced**: 동기화로 인해 속성이 업데이트된 사용자 수입니다. 이는 디렉터리의 규모가 아닌 변경 규모를 나타내므로 일반적으로 전체 사용자 수보다 훨씬 작습니다. 전체 사용자 수는 아래의 **Entities** 섹션에서 확인합니다.
- **Users by Credential**: 업데이트된 사용자 수를 연결된 계정별로 구분하여 표시합니다.
- **Sync History by Credential**: 시간에 따른 동기화 완료 내역입니다. 기록이 비어 있는 구간은 동기화가 실패했거나 건너뛰어졌음을 나타냅니다.
- **Sync Duration by Credential**: 각 동기화에 걸린 시간입니다. 일시적인 급증은 정상적이지만, 지속적으로 증가한다면 디렉터리 규모가 커지고 있거나 Azure 측에서 Microsoft Graph 요청을 제한하고 있다는 의미일 수 있습니다.

자격 증명별 위젯은 `credential_name`을 기준으로 데이터를 그룹화합니다.

### 엔터티 {#entities}

**Entities** 섹션에는 이 엔터티 팩이 동기화한 사용자가 **Display Name**, **Principal ID**, **User Type**(예: `human` 또는 `service_account`), **Account Status**(예: **ACTIVE**)와 함께 나열됩니다. 엔터티 수는 이 디렉터리에서 Cloud SIEM으로 동기화된 총 사용자 수이므로 Entra ID 테넌트 크기와 비교할 수 있는 수치입니다. 목록은 시간 범위로 제한되며, 이 범위는 변경할 수 있습니다. **View in User Inventory**를 클릭하여 [전체 인벤토리][8]를 확인합니다.

ID 컨텍스트가 신호에 포함되는지 확인하려면 동기화된 사용자와 연결된 신호를 열고 사용자 배지가 표시되는지 확인합니다.

## 추가 테넌트 연결 {#connect-additional-tenants}

각 앱 등록은 하나의 Entra ID 테넌트를 포함합니다. 추가 테넌트를 동기화하려면 각 테넌트에서 [설정](#setup) 절차를 반복한 다음, 엔터티 팩 사이드 패널의 **Credentials** 섹션에서 **Add App Registration**을 클릭합니다.

여러 테넌트를 연결하는 경우 다음 사항을 따릅니다.

- 각 계정의 토글을 사용하여 계정을 제거하지 않고 해당 테넌트의 동기화를 일시 중지합니다.
- 각 테넌트에서 Microsoft Graph 권한 및 관리자 동의를 별도로 부여합니다. 동의는 동의를 부여한 테넌트에만 적용됩니다.
- 각 앱 등록에서 리소스 수집을 활성화합니다. 이는 전역 설정이 아닌 앱 등록별 설정입니다.

## 문제 해결 {#troubleshooting}

### 사용자가 표시되지 않음 {#no-users-appear}

다음 원인을 순서대로 확인합니다.

| 원인| 확인 방법| 해결 방법|
| --- | --- | --- |
| 충분한 시간이 지나지 않음| 권한을 부여했거나 앱 등록을 연결한 지 얼마 되지 않음| 잠시 기다린 후 다시 확인합니다. Entra ID 동기화는 Azure 리소스 수집에 의존하므로 사용자가 즉시 나타나지 않습니다. |
| 관리자 동의가 부여되지 않음| **API permissions**의 **Status** 열에서 두 권한 모두에 녹색 확인 표시가 나타나지 않음| **Grant admin consent for \<tenant\>**를 클릭하고 두 권한 모두에 녹색 확인 표시가 나타나는지 확인합니다. 동의하지 않고 권한을 추가하는 것은 아무런 효과가 없습니다. |
| 리소스 수집이 비활성화됨| **Credentials** 섹션에서 Microsoft Graph 권한을 부여한 앱 등록에 빨간색 점이 표시됩니다.| 앱 등록 옆의 **Configure**를 클릭하거나 **Integrations** > [**Azure**][3]에서 해당 앱 등록을 열고 **Resource Collection** 탭에서 **Enable Resource Collection**을 켭니다. |
| 구독이 구성되지 않음| **Credentials** 섹션 또는 **Integrations** > [**Azure**][3]의 앱 등록 목록에서 해당 앱 등록이 **0 subscriptions로 표시됩니다.** | 실제로 사용하지 않더라도 최소 하나의 구독을 구성합니다. |
| 잘못된 앱 등록이 선택됨| 엔터티 팩에서 선택한 앱 등록이 Graph 권한을 부여한 앱 등록과 다름| 권한을 부여한 앱 등록을 선택하거나 선택한 앱 등록에 권한을 부여합니다. |
| 디렉터리가 비어 있음| Entra ID 테넌트에 사용자가 없음| 사용자가 있는 테넌트를 연결합니다. 빈 디렉터리는 성공적으로 동기화되며 빈 사용자 인벤토리를 생성합니다. |
| 잘못된 수치를 확인함| **Users Synced**가 0 또는 매우 낮은 값으로 표시됨| 대신 **Entities**의 수치를 확인합니다. **Users Synced**는 동기화로 인해 속성이 변경된 사용자만 집계하므로, 동기화가 정상적으로 진행되더라도 변경 사항이 적은 디렉터리에서는 수치가 낮게 나타납니다. |

### MFA 상태 또는 로그인 활동이 누락됨 {#mfa-status-or-sign-in-activity-is-missing}

`AuditLog.Read.All` 권한이 부여되지 않았거나 해당 권한에 대한 동의가 이루어지지 않았습니다. Azure 포털에서 앱 등록의 **API permissions**를 열고 **Status**에 해당 권한과 녹색 확인 표시가 나타나는지 확인합니다. 사용자 프로필은 이 권한 없이도 동기화되지만 MFA 등록 상태와 로그인 활동은 동기화되지 않습니다.

### 권한 거부 오류 {#permission-denied-errors}

- 동의를 부여한 Azure 계정이 **권한 있는 역할 관리자** 또는 **전역 관리자** 역할을 보유하고 있는지 확인합니다. 권한 수준이 낮은 역할은 권한 요청을 추가할 수 있지만 이에 대한 동의를 부여할 수는 없습니다.
- Datadog 계정에 **SIEM Entities Admin** 및 **Integrations Manage** 권한이 있는지 확인합니다. [엔터티 팩][9]을 참조하세요.

### 정상적으로 작동하던 계정이 더 이상 정상 상태가 아님 {#an-account-was-working-and-is-no-longer-healthy}

가장 일반적인 원인은 Azure 측의 다음과 같은 변경 사항입니다.

- 앱 등록의 클라이언트 시크릿이 만료되었거나 교체되었습니다. Azure 클라이언트 시크릿에는 유효 기간이 있으므로, 몇 달간 정상적으로 작동하다가 중단된 연결에서는 이를 가장 먼저 의심해야 합니다.
- 앱 등록이 삭제되었거나 Microsoft Graph 권한 또는 관리자 동의가 취소되었습니다.
- 앱 등록에서 리소스 수집이 비활성화되었습니다.

특정 오류 메시지를 확인하려면 **Integrations** > [**Azure**][3]에서 앱 등록을 열고 **Issues** 탭을 확인합니다.

### 신호에 사용자 배지가 표시되지 않음 {#no-user-pill-appears-on-signals}

ID 컨텍스트는 이메일 주소를 기준으로 이벤트와 연결됩니다. 동기화된 사용자의 활동에 사용자 배지가 표시되지 않으면 해당 소스의 로그에 사용자 이메일 필드가 채워져 있는지, 해당 소스의 OCSF 파이프라인이 활성화되어 있는지 확인합니다. [Open Cybersecurity Schema Framework][6]를 참조하세요.

엔터티 팩을 사용하기 위해 해당 로그 통합이 반드시 필요한 것은 아니며, 반대의 경우도 마찬가지입니다. 디렉터리를 동기화하고 있지만 연결할 Entra ID 활동이 보이지 않는 경우, Entra ID 로그를 Datadog으로 전송해야 할 수도 있습니다.

도움이 더 필요하면 [Datadog 고객 지원팀][7]에 문의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: https://learn.microsoft.com/en-us/graph/api/resources/users
[3]: https://app.datadoghq.com/integrations/azure
[4]: https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent
[5]: https://app.datadoghq.com/security/siem/content-packs
[6]: /ko/security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
[7]: /ko/help/
[8]: /ko/security/cloud_siem/triage_and_investigate/user_inventory/
[9]: /ko/security/cloud_siem/ingest_and_enrich/entity_packs/
[10]: /ko/getting_started/integrations/azure/