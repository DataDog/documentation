---
aliases:
- /ko/account_management/org_settings/organization_topology/
- /ko/getting_started/organization_topology/
description: 단일 조직 또는 다중 조직 Datadog 배포 중에서 선택하고 액세스 제어를 사용하여 격리하며 다중 조직 환경을 관리합니다.
further_reading:
- link: /account_management/multi_organization/
  tag: 문서
  text: 다중 조직 계정 관리
- link: /account_management/organization_groups/
  tag: 문서
  text: 조직 그룹
- link: /account_management/org_settings/cross_org_visibility/
  tag: 문서
  text: 조직 간 가시성
- link: /account_management/rbac/
  tag: 문서
  text: RBAC(역할 기반 액세스 제어)
- link: /account_management/rbac/data_access/
  tag: 문서
  text: Data Access Control
- link: /account_management/rbac/granular_access/
  tag: 문서
  text: 세분화된 액세스 제어
- link: /account_management/teams/
  tag: 문서
  text: Teams
- link: /account_management/saml/
  tag: 문서
  text: SAML Single Sign-On
title: 조직 토폴로지
---
## 개요 {#overview}

Datadog 조직 토폴로지(단일 조직 또는 다중 조직)는 서비스 관찰, 액세스 제어, 사용자 관리 및 비용 할당 방식을 결정합니다.

이 페이지에서는 다음 내용을 다룹니다.
- 단일 조직 토폴로지의 기능
- 다중 조직 토폴로지를 정당화하는 시나리오
- 필요에 맞는 토폴로지를 결정하는 방법

## 단일 조직으로 시작 {#start-with-a-single-organization}

대부분의 배포에 [단일 조직 토폴로지](#single-organization-topology-recommended)를 사용하는 것이 좋습니다. Datadog 리소스에 대한 액세스 수준을 사용자 지정하여 단일 조직을 관리할 수 있습니다. 예를 들어, 수천 명의 사용자와 여러 사업부가 있는 대기업은 [Teams][7] 및 [세분화된 액세스 제어][6]를 사용하여 엄격한 규정 준수 요구 사항을 충족할 수 있습니다.

단일 조직으로는 엄격한 요구 사항을 충족할 수 없는 경우에만 [다중 조직 토폴로지](#multi-organization-topology)를 사용하세요.

## 단일 조직 토폴로지(권장) {#single-organization-topology-recommended}

단일 조직 토폴로지에서는 사업부, 팀 및 환경이 하나의 조직을 공유합니다. 태그 기반 규칙(`team:`, `env:`, `service:`, `cost_center:`)이 액세스 정책, 대시보드 및 비용 할당을 결정합니다. 액세스 제어는 필요 시 그룹 간 격리를 적용합니다.

### 단일 조직 토폴로지의 기능 {#capabilities-of-a-single-org-topology}
단일 조직일 경우 얻을 수 있는 이점은 다음과 같습니다.

- **연결된 관측 가능성:** 분산 트레이스가 서비스 전반에 걸쳐 간극 없이 엔드투엔드로 흐릅니다. 메트릭, 로그 및 트레이스 전반의 상관관계 보기가 추가 사용자 지정 없이 잘 작동합니다.
- **단일 구성 환경:** 모니터, 대시보드, 파이프라인 및 SLO가 한곳에 있어 중복이나 드리프트가 발생하지 않습니다.
- **중앙 집중식 사용자 관리:** 하나의 SSO 구성, 하나의 [SCIM][11] 통합, 하나의 역할 및 팀 세트만 있으면 됩니다.
- **팀별 비용 가시성:** 사용량 어트리뷰션 분석은 태그를 기반으로 팀, 서비스 또는 사업부별로 지출을 분류하므로, 별도의 청구서 보기를 위해 조직을 분리할 필요가 없습니다.
- **낮은 운영 비용:** 단일 조직을 사용하면 조직별 Terraform 모듈, 조직 간 우회 방법 또는 중복된 경보 라우팅이 필요하지 않습니다.

**예:** 12개 사업부에 5,000명의 Datadog 사용자를 보유한 대규모 기술 기업에서 단일 조직을 사용합니다. 각 사업부에는 각자 텔레메트리에 대한 재량적 액세스 제어 제한 사항이 있는 팀이 있습니다. 플랫폼 관리자에게는 글로벌 역할이 있습니다. 사업부 엔지니어는 자신의 팀 데이터만 볼 수 있습니다.

### 단일 조직 내 액세스 제어 {#access-control-within-a-single-organization}

대부분의 조직은 단일 조직의 액세스 제어만으로 요구 사항을 충족할 수 있습니다. [RBAC][3], [데이터 액세스 제어][4], [세분화된 액세스 제어][6], [Teams][7] 및 [IP 허용 목록][10]은 단일 조직 내에서 강력한 데이터 격리를 적용하며, 이는 규제 산업에서도 마찬가지입니다.

자세한 구현 지침은 [액세스 제어 설명서][3]를 참조하세요.

### 제한 사항 {#limitations}

조직 내 모든 사용자는 인프라와 같은 핵심 기능을 볼 수 있습니다. 일부 텔레메트리 유형은 행 수준 제한을 지원하지 않습니다. 전체 목록은 [지원되는 텔레메트리 유형][5]을 참조하세요.

## 다중 조직 토폴로지 {#multi-organization-topology}

액세스 제어를 적용한 단일 조직만으로 필수 요구 사항을 충족할 수 없거나, 별도의 청구 엔터티에 독립적인 인보이스 발행이 필요한 경우 다중 조직을 사용합니다. 다음 다섯 가지 시나리오가 다중 조직을 사용하기에 적합합니다.

### 시나리오 1: 규제 또는 계약에 따른 데이터 격리 {#scenario-1-regulatory-or-contractual-data-isolation}

_팀 기반 액세스 제한을 적용하더라도 이 데이터를 동일한 조직에 함께 배치하는 것이 규정이나 계약을 위반하게 됩니까?_

일부 규정에서는 데이터가 동일한 논리적 경계 내에 공존하지 않도록 요구합니다. 이 요구 사항은 사용자가 데이터를 볼 수 없어야 한다는 의미가 아니라, 데이터가 동일한 조직을 공유할 수 없다는 의미입니다. 규정 준수 팀이나 외부 감사인이 (행 수준 제한 사항이 아닌) 물리적인 조직 수준의 분리를 요구하는 경우 다중 조직이 적절한 선택입니다.

다중 조직 사용: 규제 대상 워크로드당 하나, 필수 리전당 하나(예: 유럽 리전), 그 외 모든 항목에 대해 하나를 사용합니다. [조직 간 가시성][2]은 통합된 메트릭을 사용하는 운영 대시보드를 제공하기 위해 조직을 연결합니다. 규제 대상 조직에는 더 엄격한 액세스 정책, IP 허용 목록 및 감사 제어가 적용됩니다.

**예:** 한 금융 서비스 회사는 거래 플랫폼 텔레메트리(SEC/FINRA 데이터 처리 요구 사항의 적용을 받음)를 전담 조직으로 분리합니다. 다른 모든 사업부는 기본 조직을 공유합니다.

### 시나리오 2: 데이터 상주 요구 사항 충족 {#scenario-2-meet-data-residency-requirements}

_이 데이터에 대해 지역 간 데이터 전송이 금지되어 있습니까?_

규정에 따라 텔레메트리가 지리적 리전을 벗어날 수 없는 경우 다른 Datadog 사이트(예: US1, EU1, AP1)에 조직이 필요합니다.

### 시나리오 3: 팀 간 데이터 방화벽 설정 {#scenario-3-firewall-data-between-teams}

_한 팀이 다른 팀 데이터의 트레이스를 볼 수 있다면 위험합니까?_

Datadog 액세스 제어는 민감한 데이터의 가장 일반적인 소스를 제한합니다. 이러한 제어는 모든 텔레메트리 데이터나 자산 메타데이터의 완전한 방화벽 분리를 지원하지 않습니다. 요구 사항에 따라 데이터 혼합이 전혀 허용되지 않는다면 별도의 조직을 사용하세요.

### 시나리오 4: MSP 고객 격리 {#scenario-4-isolate-msp-customers}

_고객별로 별도의 청구, 데이터 경계, 사용자 풀이 필요합니까?_

여러 외부 고객에게 서비스를 제공하는 MSP(관리형 서비스 제공업체)는 독립적인 청구, 데이터 및 사용자 관리가 가능한 격리된 조직에 각 고객을 배치해야 합니다. Datadog의 [부모-자식 조직 모델][1]은 이 패턴을 지원합니다.

MSP의 내부 운영에는 부모 조직을 사용하고 고객별로 자식 조직을 사용합니다. 각 자식 조직의 데이터, 사용자 및 청구는 서로 격리되어 있습니다. 부모 조직은 [조직 간 가시성][2]을 통해 중앙 집중식 운영 보기를 제공합니다.

**예:** 200곳이 넘는 고객사를 보유한 관리형 인프라 공급자는 고객당 하위 조직을 하나씩 생성합니다. 상위 조직의 NOC 팀은 조직 간 대시보드를 사용하여 모든 고객 조직의 서비스 상태를 모니터링합니다.

### 시나리오 5: 인수한 기업 통합 {#scenario-5-integrate-an-acquired-company}

_인수한 기업이 이미 자체 Datadog 조직을 보유하고 있으며, 이 기업을 통합하고 있습니까?_

합병 및 인수로 인해 일시적인 다중 조직 상태가 발생하는 경우가 빈번합니다. 인수된 회사의 조직은 통합 중에도 활성 상태로 유지되며, 그 동안 여러분은 적절한 액세스 제어, 팀 및 구성을 갖춘 대상 조직을 준비합니다. 목표는 액세스 제어와 마이그레이션 도구가 준비된 이후 단일 조직으로 통합하는 것입니다. 통합에 대한 지침은 계정 팀에 문의하세요.

**예:** SaaS 기업 인수 후 한 기업에서는 운영 상황을 즉각적으로 파악하기 위해 [조직 간 가시성][2]으로 두 조직을 연동합니다. 그런 다음 이 기업은 3~6개월에 걸쳐 단계적 통합을 실행합니다.

## 토폴로지 결정 {#decide-your-topology}

| 시나리오 | 조직 토폴로지 |
| :---- | :---- |
| 규정이나 계약에 따라 데이터가 물리적으로 분리된 조직 경계 내에 존재해야 합니다. | 다중 조직 |
| 일부 텔레메트리 데이터의 리전 간 전송이 금지됩니다. | 다중 조직 |
| 보안 정책상 [RBAC][3], [Data Access Control][4] 및 [Granular Access Control][6]이 적용된 경우에도 팀 간 데이터 혼합이 전혀 허용되지 않습니다. | 다중 조직 |
| 별도의 청구, 데이터 및 사용자 풀이 필요한 외부 고객에게 서비스를 제공합니다. | 다중 조직(MSP) |
| 인수한 기업이 이미 자체 Datadog 조직을 보유하고 있으며, 이 기업을 통합하고 있습니다. | 임시 다중 조직 |
| 위 항목 중 해당 없음 | 단일 조직 |

### 조직 기능 비교 {#compare-org-capabilities}

다음 차트에서 '변경 없음'은 조직 그룹이 새로운 기능을 도입하지 않음을 나타냅니다.

| 기능 | 단일 조직 | 다중 조직 | 조직 그룹 사용 |
| :---- | :---- | :---- | :---- |
| 엔드투엔드 분산 트레이스 | 전체 | 조직 경계를 넘을 수 없음 | 변경 없음 |
| 텔레메트리 데이터 | 전체 | [조직 간 가시성][2]을 통해 메트릭, 로그, CI 데이터를 대시보드로 공유 | 변경 없음 |
| 대시보드(메트릭, 로그, 트레이스) | 전체 | 다른 조직의 구성원과 [초대 전용 공유 대시보드][9] 공유 | 변경 없음 |
| 데이터 소스 전반의 모니터 알림 | 전체 | 조직 간 모니터 평가 없음 | 변경 없음 |
| 서비스 전반에서 SLO | 전체 | 여러 조직에 걸칠 수 없음 | 변경 없음 |
| 사용자 관리 | 단일 통합 | 조직별 별도 [SCIM][11] | 그룹에서 중앙 집중화 |
| RBAC 및 사용자 지정 역할 | 단일 구성 | 조직별로 복제해야 함 | 그룹에서 중앙 집중화 |
| SSO/SAML | 단일 구성([multi-SAML][8]이 여러 IdP 지원) | 조직별 별도 SAML | 변경 없음 |
| 청구 및 사용량 | 조직별 사용량 어트리뷰션 | Datadog은 모든 자식 조직의 사용량을 집계하여 부모 조직 수준에서 청구합니다 | 변경 없음 |
| 기능 출시 | 즉시 | 조직별로 활성화해야 함 | 그룹에서 중앙 집중화 |

사용 사례에 다중 조직이 필요한 경우 조직 전반의 중앙 집중식 거버넌스를 위해 [조직 그룹][12]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/multi_organization/
[2]: /ko/account_management/org_settings/cross_org_visibility/
[3]: /ko/account_management/rbac/
[4]: /ko/account_management/rbac/data_access/
[5]: /ko/account_management/rbac/data_access/#supported-telemetry
[6]: /ko/account_management/rbac/granular_access/
[7]: /ko/account_management/teams/
[8]: /ko/account_management/saml/
[9]: /ko/dashboards/sharing/shared_dashboards/#invite-only-shared-dashboards
[10]: /ko/account_management/org_settings/ip_allowlist/
[11]: /ko/account_management/scim/
[12]: /ko/account_management/organization_groups/