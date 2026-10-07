---
aliases:
- /ko/internal_developer_portal/software_catalog/set_up/ownership
description: 서비스 및 기타 엔터티를 Datadog Teams에 연결하면 뷰를 필터링하고, 알림을 라우팅하고, 소프트웨어 포트폴리오 전반에
  걸쳐 책임 소재를 명확히 할 수 있습니다.
further_reading:
- link: /account_management/teams/
  tag: 설명서
  text: Teams
- link: /internal_developer_portal/catalog/entity_model/
  tag: 설명서
  text: Datadog UI에서 메타데이터 추가
title: 카탈로그 엔터티 소유권 정의
---
## 개요 {#overview}

카탈로그에서 소유권을 정의하여 엔터티와 이에 대해 책임을 맡은 Datadog Teams를 연결합니다. 소유권 정보는 각 엔터티의 세부 정보 페이지에 표시되며, 이를 통해 다음 작업을 수행할 수 있습니다. 
- Datadog 제품 전반에서 팀 기준으로 뷰를 필터링합니다.
- Scorecards 및 캠페인을 올바른 소유자에게 할당합니다.
- 알림 및 온 콜 컨텍스트를 올바른 팀으로 라우팅합니다.

## 팀 만들기 {#create-a-team}

[Datadog 조직 설정][3] 또는 [카탈로그][1]에서 직접 팀을 만들 수 있습니다. 전체 지침은 [팀 설정 및 구성][2]을 참조하세요. 

팀 정의에는 다음 항목이 포함되어 있습니다.
1. **팀 이름**(예: "Bits Demo")
2. **핸들**: 고유 식별자(`bits-demo` 등)입니다. 핸들은 검색 패싯으로 사용할 수 있습니다(예: `team:bits-demo`).
3. **멤버**: 한 명 이상의 Datadog 사용자입니다. 
4. **설명**: (선택 사항) 컨텍스트를 위해 권장합니다.

팀을 만든 후 참조 링크를 추가하고, 알림을 구성하고, 모니터 및 대시보드 등의 Datadog 리소스와 팀을 연결할 수 있습니다.

## 엔터티 소유권 구성 {#configure-entity-ownership}

### Datadog {#in-datadog}

Datadog에서 엔터티 소유자를 추가 또는 업데이트하기

1. **카탈로그**로 이동하여 엔터티를 엽니다.
2. 엔터티 페이지에서 **Edit in UI**를 클릭합니다.
3. **Ownership** 섹션에서 **Owner**를 설정하고 **Additional owners**를 추가합니다(선택 사항).
   - 팀 이름으로 검색하거나 핸들을 붙여넣습니다(예: `team:example-team`).
5. **Save Entry**를 클릭합니다.

### 구성 파일 사용 {#through-configuration-files}

엔터티를 코드로 관리하는 경우(예: 리포지토리 기반 서비스 정의 또는 자동화), 소유자에 매핑되는 엔터티 메타데이터 필드에 팀 핸들을 포함합니다. 핸들이 기존 Datadog Teams와 정확히 일치하는지 확인합니다.

## 모범 사례 {#best-practices}

- **개인이 아닌 Teams 사용:** 멤버십 변경으로 인해 소유권 링크, 필터, 알림이 중단되지 않도록 엔터티를 Teams에 할당합니다.
- **기본 소유자 선택:** 담당 팀을 하나 지정하고, 필요한 경우에만 보조 소유자를 추가합니다.
- **핸들의 일관성 유지:** 일관성과 검색 용이성을 위해 소문자와 하이픈으로 작성된 핸들을 사용합니다(예: `payments-platform`, `Payments Platform` 아님).
- **IDP에서 동기화:** 가능한 경우 SAML/SCIM을 통해 Teams를 프로비저닝하여 멤버십을 최신 상태로 유지합니다.
- **팀 필터 사용:** 엔지니어가 [팀 필터][4]에서 본인 팀을 선택하여 소유한 엔터티에 뷰 초점을 맞출 것을 권장합니다.
- **팀 계층 구조 사용**: [하위 팀][5]을 생성하여 조직 구조를 반영하고 계층형 필터링을 활성화합니다. 



[1]: https://app.datadoghq.com/teams
[2]: /ko/account_management/teams/
[3]: https://app.datadoghq.com/organization-settings/teams
[4]: /ko/account_management/teams/#team-filter
[5]: /ko/account_management/teams/manage/#team-hierarchies