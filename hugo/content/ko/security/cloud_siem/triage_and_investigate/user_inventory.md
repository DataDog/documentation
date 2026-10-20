---
description: Cloud SIEM에 동기화된 모든 사용자 ID를 탐색하고 조사하세요. 계정 구성, 관련 위험 및 활동 기록도 확인할 수 있습니다.
further_reading:
- link: /security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
  tag: 문서
  text: 엔터티 위험
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/
  tag: 문서
  text: 엔터티 팩
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
  tag: 문서
  text: Microsoft Entra ID 엔터티 팩
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/okta/
  tag: 문서
  text: Okta Identity 엔터티 팩
- link: /security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
  tag: 문서
  text: Google Workspace Identity 엔터티 팩
- link: /security/cloud_siem/investigator/
  tag: 문서
  text: Investigator
- link: /security/cloud_siem/investigate_security_signals/
  tag: 문서
  text: 보안 신호 조사하기
- link: /security/cloud_siem/ingest_and_enrich/open_cybersecurity_schema_framework/
  tag: 문서
  text: Open Cybersecurity Schema Framework(OCSF)
title: 사용자 인벤토리
---
## 개요 {#overview}

[Cloud SIEM의 사용자 인벤토리][6]는 Cloud SIEM 내 사용자 디렉터리의 동기화되고 정규화된 복사본입니다. Cloud SIEM이 ID 공급자로부터 동기화한 모든 사용자 ID는 활동, 신호 또는 위험과 관계없이 사용자 인벤토리의 목록에 포함됩니다. 사용자가 누구인지, 계정 상태는 어떠한지, 어떻게 변경되었는지 확인해야 할 때 ID 공급자로 전환할 필요 없이 Cloud SIEM에서 바로 확인할 수 있습니다.

사용자 인벤토리를 통해 다음을 수행할 수 있습니다.

- 동기화된 모든 사용자 ID와 서비스 계정을 하나의 목록에서 탐색합니다.
- 계정 상태, 직책, 사무실 위치, 주체 ID, 공급자 및 사용자 유형별로 사용자를 필터링합니다.
- 이름 또는 주체 ID로 인벤토리를 검색합니다.
- 직책, 부서, 사무실 위치 및 다중 인증(MFA) 상태를 포함하여 사용자의 현재 구성을 검토합니다.
- 사용자 ID와 연결된 각 계정의 위험 점수와 해당 점수의 변경 내역을 확인합니다.
- 시간 경과에 따른 사용자의 신호, 로그인, MFA 변경, 비밀번호 변경, 구성 변경 및 로그를 추적합니다.

사용자 인벤토리와 [엔터티 위험][1]은 서로 다른 질문에 답합니다. 사용자 인벤토리는 활동 여부와 관계없이 동기화된 모든 사용자를 포함하는 전체 디렉터리입니다. 엔터티 위험은 위험 점수가 매겨지고 위험도에 따라 순위가 지정된 사용자 ID 및 기타 엔터티를 보여주는 우선순위 보기입니다. 조사하려는 사용자가 누구인지 알고 있다면 사용자 인벤토리에서 시작하세요. Datadog에서 어떤 사용자를 먼저 살펴봐야 할지 확인하려면 엔터티 위험에서 시작하세요.

## 전제 조건 {#prerequisites}

### 권한 {#permissions}

다음 Cloud SIEM 권한이 사용자 인벤토리에 적용됩니다.

| 권한 | 부여 내용 |
| ---------- | -------------- |
| **SIEM Entities Notification** | 이 권한이 있는 사용자는 엔터티 위험 알림을 수정할 수 있습니다. |
| **SIEM Entities Read** | 사용자 인벤토리 탐색기에서 목록을 확인하고 검색하거나, 사용자 사이드 패널을 열고, Signals 사이드 패널에서 연결된 사용자 배지를 확인할 수 있습니다. 또한 Content Packs 탐색기의 Entity Pack 사이드 패널에 대한 읽기 액세스 권한을 부여합니다. |
| **SIEM Entities Admin** | SIEM Entities Read가 부여하는 모든 권한과 엔터티 팩 및 기타 엔터티 위험 설정을 구성할 수 있는 권한을 부여합니다. 아래의 엔터티 팩 전제 조건을 충족하는 데 필요합니다. |

<div class="alert alert-info">필터가 적용되지 않은 상태에서 사용자 인벤토리가 비어 있다면 다음 두 가지 원인 중 하나일 수 있습니다. 엔터티 팩이 하나도 활성화되지 않았거나 <strong>SIEM Entities Read</strong> 권한이 없는 경우입니다. 먼저 엔터티 팩 구성을 확인한 다음 권한을 확인하세요.</div>

### 엔터티 팩 {#entity-packs}

엔터티 팩은 ID 공급자로부터 사용자 및 ID 컨텍스트를 동기화하여 사용자 인벤토리에 데이터를 채웁니다. 사용자 인벤토리에서 결과를 반환하려면 최소 하나의 엔터티 팩이 활성화되어 있어야 합니다.

엔터티 팩은 다음 공급자에 대해 제공됩니다.

- [Microsoft Entra ID][2]
- [Okta][3]
- [Google Workspace][4]

엔터티 팩을 구성하려면 `SIEM Entities Admin` 권한이 필요합니다. 엔터티 팩은 Content Packs 탐색기에서 구성합니다. 설정 지침은 [엔터티 팩][5]을 참조하세요.

### 권장 사항: OCSF 파이프라인 {#recommended-ocsf-pipelines}

활성 Open Cybersecurity Schema Framework(OCSF) 파이프라인은 선택 사항입니다. Cloud SIEM은 표준 속성만 사용하여 일부 활동을 사용자 ID와 연결할 수 있습니다. 그러나 활성 OCSF 파이프라인이 있는 소스에서 가장 완전한 연결 결과를 얻을 수 있습니다. Cloud SIEM에서 사용자 활동이 예상보다 적게 나타나면 관련 소스에 OCSF 파이프라인이 구성되어 있는지 확인하세요.

## 사용자 인벤토리 탐색 {#explore-the-user-inventory}

사용자 인벤토리를 열려면 **Cloud SIEM** > **Investigate** > [**User Inventory**][6]로 이동합니다.

{{< img src="security/cloud_siem/user_inventory_explorer.png" alt="동기화된 사용자 ID와 각 사용자의 주체 ID, 사용자 유형, 계정 상태 및 공급자가 표시된 사용자 인벤토리 탐색기" style="width:100%;" >}}

### 사용자 검색 및 필터링 {#search-and-filter-users}

사용자를 표시 이름 또는 주체 ID로 찾으려면 검색 상자에 쿼리를 입력하고 <kbd>Enter</kbd> 키를 누릅니다.

속성별로 목록을 좁히려면 필터 드롭다운을 사용합니다. 각 필터는 기본적으로 **All**로 설정됩니다.

| Filter | 일치 항목 |
| ------ | --------------- |
| Account Status | ID 공급자의 계정 상태(예: `ACTIVE`, `SUSPENDED` 또는 `DELETED`)입니다. |
| Job Title | ID 공급자가 보고한 사용자의 직책입니다. |
| Office Location | ID 공급자가 보고한 사용자의 사무실 위치입니다. |
| Principal ID | ID 공급자가 보고한 사용자의 주체 ID입니다. |
| Provider | 사용자가 동기화된 ID 공급자입니다. |
| User Type | 계정 유형으로, `human`, `service_account` 또는 `guest` 중 하나입니다. |

직책, 사무실 위치 및 주체 ID 정보는 ID 공급자로부터 그대로 전달됩니다. Cloud SIEM에서 값이 잘못되었거나 누락된 경우, ID 공급자의 해당 필드를 확인하세요.

### SIEM에서 사용자 탐색 {#browse-users-in-siem}

- 스크롤하면 목록에 사용자가 더 로드됩니다. 목록 상단의 엔터티 수는 로드된 사용자 수와 현재 검색 및 필터와 일치하는 사용자 수를 나타냅니다.
- **Changes Detected** 열은 지난 14일 동안 하나 이상의 속성이 변경된 사용자 ID 업데이트 건수를 표시합니다. 개별 속성이 아닌 업데이트 건수를 계산하므로 세 가지 속성을 변경한 단일 업데이트는 1건으로 계산됩니다. 이를 사용하여 최근 구성이 수정된 사용자를 찾은 다음 사용자를 열고 **Entity changes** 탭으로 이동하여 변경된 내용을 확인하세요.
- 목록을 CSV 파일로 내보내려면 표 위의 내보내기 아이콘을 클릭합니다. CSV 파일에는 Cloud SIEM에 동기화된 모든 사용자가 아닌 현재 보기에 로드된 사용자만 포함됩니다. 내보내기에 더 많은 사용자를 포함하려면 먼저 스크롤하여 추가 사용자를 로드합니다.
- 표시할 열을 변경하려면 열 설정 아이콘을 클릭합니다.

## 사용자 ID 조사 {#investigate-a-user-identity}

사용자 목록에서 아무 행이나 클릭하여 사용자 사이드 패널을 엽니다. 동일한 정보를 전체 페이지로 열려면 **Open Fullscreen**을 클릭합니다.

패널 헤더에는 사용자의 계정 상태, 표시 이름, 패널에 적용된 시간 범위 및 다음 메타데이터가 표시됩니다.

| 필드 | 설명 |
| ----- | ----------- |
| Principal ID | 사용자의 주체 ID입니다. 복사 아이콘을 클릭하여 복사합니다. |
| Type | 계정 유형으로, `human`, `service_account` 또는 `guest` 중 하나입니다. |
| Created | 계정이 생성된 시점이며 상대 시간으로 표시됩니다. |
| Last updated | Cloud SIEM이 이 사용자 ID에 대한 변경 사항을 마지막으로 동기화한 시점이며 상대 시간으로 표시됩니다. |

상대 시간은 패널 전체에 표시됩니다. 상대 시간에 해당하는 정확한 타임스탬프를 확인하려면 해당 시간 위로 마우스를 가져갑니다.

{{< img src="security/cloud_siem/user_inventory_side_panel.png" alt="현재 상태와 관련 위험이 표시된 개별 사용자 ID의 사용자 사이드 패널" style="width:100%;" >}}

### 현재 상태 검토 {#review-current-state}

**Current state** 섹션에는 가장 최근 동기화 시점의 사용자 구성이 표시됩니다.

| 필드 | 설명 |
| ----- | ----------- |
| Identity Source(s) | 이 사용자 ID가 동기화된 ID 공급자입니다. |
| Email | 사용자의 이메일 주소입니다. |
| Name | 사용자의 표시 이름입니다. |
| Job | 사용자의 직책, 부서 및 사무실 위치입니다. |
| MFA status | 사용자의 MFA 등록 여부와 정책상 MFA 사용이 필수인지 여부를 나타내는 두 가지 독립적인 상태입니다. |

MFA 상태는 두 값이 서로 다를 수 있으므로 별도로 표시됩니다. `ENABLED`는 사용자가 MFA를 등록했음을 의미합니다. `NOT ENFORCED`는 ID 공급자의 정책이 모든 상황에서 사용자에게 MFA 사용을 요구하지 않음을 의미합니다. 정책을 검토하여 차이가 있는지 확인하세요.

### 위험 검토 {#review-risks}

**Risks** 섹션에는 이 사용자 ID와 연결된 각 계정의 위험 점수가 나열됩니다. 이는 사용자 전체에 대한 집계 점수가 아니라 계정별 점수입니다.

| 열 | 설명 |
| ------ | ----------- |
| Risk Score | 계정의 위험 점수와 해당 심각도입니다. |
| Name | 점수가 적용되는 계정입니다. |
| Type | `Email Address`와 같은 위험 점수가 매겨진 엔터티의 유형입니다. |
| Source | 계정 활동과 연결된 로그 소스입니다. 오버플로 표시기를 클릭하여 추가 소스를 확인하세요. |
| Last Seen | 계정이 마지막으로 신호를 생성한 시점이며 상대 시간으로 표시됩니다. 이는 계정에 활동이 있었던 마지막 시점이 아닙니다. |
| Risk Change | 지난 14일 동안 계정의 위험 점수가 어떻게 변화했는지 보여줍니다. |
| Signals | 계정 점수에 기여하는 신호의 수입니다. |

<div class="alert alert-info">Last Seen은 신호 활동만 반영합니다. Last Seen 값이 오래된 계정도 여전히 로그를 생성하고 있을 수 있습니다. <strong>Activity History</strong>의 <strong>All logs</strong> 탭에서 가장 최근 활동을 확인하세요.</div>

Risk Change는 항상 고정된 14일 조회 기간을 반영하며 패널의 시간 범위 선택기 설정을 따르지 않습니다.

위험 점수 계산 방법 및 사용자 지정 방법에 대한 자세한 내용은 [엔터티 위험][1]을 참조하세요.

## 활동 기록 탐색 {#explore-activity-history}

**Activity History** 섹션은 사용자가 수행한 작업과 계정 변경 사항을 추적합니다. 전체 섹션의 범위를 지정하는 두 가지 컨트롤은 다음과 같습니다.

- **Activity from**: 단일 계정을 선택하여 해당 계정으로 활동 범위를 지정하거나, **All**을 선택하여 이 사용자 ID와 연결된 모든 계정의 활동을 조회합니다.
- **Time range**: 활동 보기의 기간을 설정합니다.

각 탭에는 결과 수와 **See all** 링크가 표시되며, 이 링크를 클릭하면 기본 데이터를 해당 탐색기에서 열어 추가로 쿼리할 수 있습니다.

Activity History의 데이터는 Datadog 표준 속성 또는 OCSF 필드에 매핑되므로 Cloud SIEM의 다른 곳에서 사용하는 것과 동일한 속성 이름을 사용하여 탐색기에서 쿼리할 수 있습니다.

### Signals {#signals}

이 사용자 ID와 연결된 보안 신호를 보여줍니다. 그래프 보기는 시간 경과에 따른 신호를 심각도별로 분류하고, 목록 보기는 개별 신호를 보여줍니다. 이 탭을 사용하여 사용자에 대한 탐지가 발생했는지, 발생했다면 얼마나 최근에 발생했는지 확인하세요.

### 로그인 및 MFA 변경 {#login-and-mfa-changes}

시간에 따른 로그인 및 MFA 변경 활동을 막대그래프로 보여줍니다. 이 탭을 사용하여 사용자의 로그인 패턴 변화나 MFA 설정 변경과 같은 인증 동작의 변화를 파악하세요.

### 비밀번호 변경 {#password-changes}

사용자의 비밀번호가 수정된 시점을 기록한 타임스탬프 시퀀스를 보여줍니다. 이 섹션을 사용하여 비정상적이거나 의심스러운 계정 활동이 발생한 시점 전후에 비밀번호가 변경되었는지 확인하세요.

### Entity changes {#entity-changes}

사용자의 구성이 시간에 따라 어떻게 변경되었는지 보여줍니다. Cloud SIEM은 사용자 ID의 각 버전을 저장하므로, 두 버전을 비교하여 정확히 어떤 속성이 변경되었는지 확인할 수 있습니다.

탭 헤더에는 선택한 기간 동안 발생한 변경 횟수가 표시됩니다. 두 가지 보기를 사용할 수 있습니다.

- **JSON**: 두 버전의 차이점을 나란히 비교한 결과입니다. 제거된 값은 빨간색으로, 추가된 값은 녹색으로 표시됩니다.
- **Timeline**: 변경 사항을 시간순으로 보여주는 보기입니다.

{{< img src="security/cloud_siem/user_inventory_entity_changes.png" alt="사용자 ID의 두 버전을 나란히 비교하고 MFA 적용 변경 사항을 강조 표시하는 JSON 차이점 보기" style="width:100%;" >}}

JSON 보기에서 각 창 위에 있는 버전 드롭다운을 사용하여 비교할 버전을 선택합니다. 선택한 두 버전 간의 변경 횟수가 두 번째 창 옆에 나타납니다. 불필요한 정보를 줄이기 위해 변경되지 않은 속성은 접힌 상태로 표시됩니다. 숨겨진 줄 표시기를 클릭하여 펼칩니다.

차이점 비교에서 추적되는 속성에는 사용자의 이메일, 이름 및 성, 직책, 사무실 위치, 주체 ID, 공급자, 사용자 유형과 `mfaEnrolled`, `mfaEnforced`, `lastPasswordChange`와 같은 인증 상태가 포함됩니다.

<div class="alert alert-info">선택한 시간 범위와 관계없이 지난 14일 동안 발생한 엔터티 변경 사항만 이 탭에 표시됩니다.</div>

### All logs {#all-logs}

Cloud SIEM이 이 사용자 ID와 연결한 모든 로그를 보여줍니다. 세 가지 보기를 사용할 수 있습니다.

- **Graph**: 로그 소스별로 분류된 시간 경과에 따른 로그 볼륨의 막대 차트입니다. 그 옆의 도넛 차트는 이 사용자 ID와 연결된 각 계정이 기여한 활동 점유율을 보여줍니다.
- **Map**: 활동이 탐지된 국가가 음영으로 표시된 세계 지도입니다.
- **List**: 개별 로그입니다.

이 탭을 사용하여 사용자가 어떤 시스템에 액세스했는지, 어떤 계정에서 가장 많은 활동이 발생하는지 확인하세요.

### Time range {#time-range}

활동 기록은 기본적으로 14일 전까지의 데이터를 조회합니다. 범위를 30일 이상으로 확장할 수 있습니다.

두 가지 보기는 시간 범위 선택기 설정을 따르지 않습니다.

- **Entity changes**는 지난 14일로 제한됩니다.
Risks 섹션의 - **Risk Change**는 항상 고정된 14일 조회 기간을 반영합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_siem/triage_and_investigate/entities_and_risk_scoring/
[2]: /ko/security/cloud_siem/ingest_and_enrich/entity_packs/microsoft_entra_id/
[3]: /ko/security/cloud_siem/ingest_and_enrich/entity_packs/okta/
[4]: /ko/security/cloud_siem/ingest_and_enrich/entity_packs/google_workspace/
[5]: /ko/security/cloud_siem/ingest_and_enrich/entity_packs/
[6]: https://app.datadoghq.com/security/siem/user-inventory