---
description: 사용자 디렉터리를 Cloud SIEM에 동기화하여 신호, 위험 및 조사에 ID 컨텍스트를 추가하세요.
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
  tag: 문서
  text: Okta Identity 엔터티 팩 설정
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
- link: /security/cloud_siem/ingest_and_enrich/content_packs/
  tag: 문서
  text: Cloud SIEM 콘텐츠 팩에 대해 자세히 알아보기
- link: /security/cloud_siem/triage_and_investigate/investigator/
  tag: 문서
  text: Investigator에 대해 자세히 알아보기
- link: /account_management/rbac/permissions/
  tag: 문서
  text: Datadog 역할 권한 검토
title: 엔터티 팩
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">엔터티 팩은 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

## 개요 {#overview}

엔터티 팩은 사용자 디렉터리를 Cloud SIEM에 동기화하는 [Cloud SIEM 콘텐츠 팩][1]의 한 유형입니다.
- **콘텐츠 팩**은 탐지 규칙 및 대시보드와 같은 로그 기반 보안 콘텐츠를 가져옵니다.
- **엔터티 팩**은 해당 활동과 관련된 ID 레코드를 가져오므로, Cloud SIEM에서 *무슨* 일이 일어났는지뿐 아니라 신호가 *누구*와 관련된 것인지도 확인할 수 있습니다.

엔터티 팩이 활성화되면 Cloud SIEM은 디렉터리 사용자와 해당 속성을 로그 및 보안 신호와 연결합니다. 각 엔터티 팩에는 다음 기능이 포함됩니다.

- **자동 동기화**: Cloud SIEM은 ID 공급자로부터 사용자와 해당 속성을 동기화하여 최신 상태로 유지합니다.
- **[사용자 인벤토리][2]**: Cloud SIEM에 동기화된 사용자를 탐색, 검색 및 필터링합니다. 사용자의 속성(표시 이름, 주체 ID, 사용자 유형 및 계정 상태 포함)을 조회합니다. 사용자와 관련된 모든 신호, 위험 및 로그를 조사합니다.
- **Signals의 사용자 배지**: 보안 신호에 직접 연결된 ID 컨텍스트를 통해 신호를 분류하는 동안 관련 사용자를 확인할 수 있습니다.
- **[엔터티 위험][8]의 사용자 위험 집계**: 위험 점수가 사용자별로 집계되므로 신호를 하나씩 확인하지 않고도 특정 사용자의 모든 신호에 걸친 총 위험 수준을 확인할 수 있습니다.

<div class="alert alert-info">엔터티 팩은 이름 및 이메일 주소와 같은 개인정보가 포함된 사용자 디렉터리 데이터를 동기화합니다. 디렉터리를 연결하기 전에 조직의 개인정보 보호 요구 사항을 검토하세요.</div>

## 사용 가능한 엔터티 팩 {#available-entity-packs}

Cloud SIEM은 다음 엔터티 팩을 지원합니다.

| 엔터티 팩 | 동기화 대상 디렉터리 | 자격 증명 유형 |
|---|---|---|
| [Okta Identity][3] | Okta 사용자 및 해당 속성 | Okta 도메인 및 API 토큰 |
| [Google Workspace Identity][4] | Google Workspace 사용자 및 해당 속성 | 서비스 계정 JSON 키 파일 |
| [Microsoft Entra ID][5] | Microsoft Entra ID 사용자 및 해당 속성 | Azure 앱 등록 |

Datadog에서 엔터티 팩을 찾으려면 **Cloud SIEM** > [**Content Packs**][6]으로 이동합니다. 그런 다음 `type:entityPack`을 검색하거나 **Entity Pack** 필터를 클릭하여 엔터티 팩을 필터링합니다.

## 전제 조건 {#prerequisites}

### 권한 {#permissions}

엔터티 팩에는 다음 권한이 사용됩니다. [Datadog Admin 역할][7]이 있는 사용자는 사용자 계정에 해당 권한을 부여할 수 있습니다.

| 권한 | 허용 범위 |
|---|---|
| **SIEM Entities Notification** | 이 권한이 있는 사용자는 엔터티 위험 알림을 수정할 수 있습니다. |
| **SIEM Entities Read** | 사용자 인벤토리에서 동기화된 사용자를 조회하고, 신호 및 엔터티 위험에서 사용자 배지를 확인하며, 엔터티 팩 사이드 패널을 열 수 있습니다. |
| **SIEM Entities Admin** | **SIEM Entities Read**에서 허용하는 모든 작업 외에도 사용자 디렉터리 연결, 자격 증명 추가 및 제거, 동기화 활성화 또는 비활성화가 가능합니다. |
| **Integrations Manage** |  Microsoft Entra ID 엔터티 팩에만 필요하며, Azure 구독 및 리소스 수집을 구성하는 데 사용됩니다. |

ID 컨텍스트를 사용하는 모든 사용자는 **SIEM Entities Read** 또는 **SIEM Entities Admin** 권한이 필요합니다. 사용자에게 이러한 권한 중 하나가 없는 경우 다음과 같은 제한이 발생합니다.

- 엔터티 팩이 활성화되어 동기화 중임에도 불구하고 사용자 인벤토리가 비어 있습니다.
- 사용자 배지가 신호나 엔터티 위험에 표시되지 않습니다.
- Content Packs 인터페이스에서 엔터티 팩 사이드 패널이 열리지 않습니다.

<div class="alert alert-info">엔터티 팩을 배포할 때 분석가에게 <strong>SIEM Entities Read</strong> 권한을 부여합니다. 해당 권한이 없으면 디렉터리가 성공적으로 동기화되더라도 권한이 없는 분석가는 제공되는 ID 컨텍스트를 볼 수 없습니다. 사용자 인벤토리가 비어 있는 경우, 동기화 문제를 해결하기 전에 권한을 확인하세요.</div>

### ID 공급자 액세스 {#identity-provider-access}

엔터티 팩을 설정하려면 연결하려는 ID 공급자에 대한 관리자 액세스 권한도 필요하며, 해당 권한으로 엔터티 팩에 필요한 자격 증명을 생성할 수 있어야 합니다. 각 엔터티 팩은 서로 다른 유형의 자격 증명을 사용합니다.

- Okta Identity에는 Okta 도메인과 API 토큰이 필요합니다.
- Google Workspace Identity에는 Google 서비스 계정 JSON 키 파일, 도메인, Workspace 관리자 이메일 주소가 필요합니다.
- Microsoft Entra ID에는 Azure 앱 등록이 필요합니다. 제공된 퀵스타트 스크립트나 Terraform을 사용하여 앱 등록을 생성하거나, 이미 필요한 권한이 있는 앱 등록을 연결할 수 있습니다.

각 자격 증명에 필요한 공급자 측 권한과 범위에 대한 자세한 내용은 해당 엔터티 팩의 설정 페이지를 참조하세요.

### 로그 통합 {#log-integrations}

엔터티 팩을 사용하기 위해 해당 로그 통합이나 콘텐츠 팩이 반드시 필요한 것은 아니며, 해당 콘텐츠 팩을 사용하는 데도 엔터티 팩이 필요하지 않습니다. Okta 로그를 Datadog으로 전송하지 않고도 Okta Identity 엔터티 팩을 사용하여 Okta 사용자 디렉터리를 동기화할 수 있습니다.

두 기능은 함께 사용할 때 가장 효과적입니다. 엔터티 팩은 ID 컨텍스트를 제공하고, 로그 기반 콘텐츠 팩은 Cloud SIEM에서 해당 컨텍스트를 연결할 활동 데이터를 제공합니다. 공급자의 로그에서 생성된 신호에 ID 컨텍스트를 추가하려면 두 가지를 모두 구성합니다.

## 엔터티 팩 상태 {#entity-pack-states}

다른 콘텐츠 팩과 마찬가지로, 각 엔터티 팩은 Content Packs 인터페이스에 타일 형태로 표시되며 두 가지 상태 중 하나를 가집니다. 타일의 사이드 패널을 열려면 **SIEM Entities Read** 또는 **SIEM Entities Admin** 권한이 필요합니다.

### Available {#available}

아직 연결하지 않은 엔터티 팩은 **Available**로 표시됩니다. 사이드 패널에는 엔터티 팩을 활성화하면 제공되는 기능이 표시되며, 여기에서 사용자 디렉터리를 연결할 수 있습니다. **Add Credentials**(또는 Microsoft Entra ID의 경우 **Add Account**)를 클릭하여 설정을 시작합니다. 디렉터리를 연결하려면 **SIEM Entities Admin** 권한이 필요합니다.

### Active {#active}

자격 증명을 연결하고 Datadog에서 유효성을 검사하면 엔터티 팩이 **Active**로 표시됩니다. 사이드 패널에는 엔터티 팩의 상태가 다음과 같이 표시됩니다.

- **Credentials**: 연결된 각 계정, 도메인, 유효성 검사 상태, 활성화 또는 비활성화 상태, 마지막 업데이트 시간, 동기화 상태, 마지막 동기화 시간 및 마지막 동기화 소요 시간 추가 계정을 추가하거나 개별 계정에 대한 동기화를 활성화 또는 비활성화할 수 있습니다.
- **Key Metrics**: 동기화된 사용자, 자격 증명별 사용자, 자격 증명별 동기화 기록, 자격 증명별 동기화 소요 시간을 보여주는 대화형 대시보드
- **Entities**: 이 엔터티 팩에서 동기화한 사용자 목록으로, 표시 이름, 주체 ID, 사용자 유형(예: `human` 또는 `service_account`)과 계정 상태가 표시됩니다. **View in User Inventory**를 클릭하여 전체 인벤토리를 확인합니다.

**Key Metrics** 및 **Credentials** 섹션을 사용하여 동기화가 최신 상태인지, 자격 증명이 여전히 유효한지 확인합니다.

## 엔터티 팩 설정 {#set-up-an-entity-pack}

설정 단계는 ID 공급자에 따라 다릅니다. 연결하려는 디렉터리에 대한 가이드를 따릅니다.

- [Okta Identity 엔터티 팩][3]
- [Google Workspace Identity 엔터티 팩][4]
- [Microsoft Entra ID 엔터티 팩][5]

각 가이드는 ID 공급자에서 자격 증명을 생성하고, Datadog에 추가하며, 연결을 테스트하는 과정을 안내합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_siem/ingest_and_enrich/content_packs/
[2]: /ko/security/cloud_siem/triage_and_investigate/user_inventory/
[3]: /ko/security/cloud_siem/ingest_and_enrich/entity_packs/okta/
[4]: /ko/security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
[5]: /ko/security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
[6]: https://app.datadoghq.com/security/siem/content-packs
[7]: /ko/account_management/rbac/
[8]: /ko/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/