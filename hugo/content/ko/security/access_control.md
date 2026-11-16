---
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: 문서
  text: 로그 처리 파이프라인
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: Access Control
---
{{< product-availability >}}

## 개요 {#overview}

Datadog의 액세스 관리 시스템은 역할 기반 액세스 제어를 사용하여 사용자가 Datadog 리소스에 대해 갖는 액세스 수준을 정의할 수 있도록 합니다. 사용자는 읽을 수 있는 데이터와 수정할 수 있는 계정 자산을 포함하여 계정 권한을 정의하는 역할에 할당됩니다. 역할에 권한이 부여되면 해당 역할과 연결된 모든 사용자가 해당 권한을 받습니다. 자세한 내용은 [계정 관리 Access Control][1] 문서를 참조하세요.

Datadog Security 제품의 경우 [탐지 규칙](#restrict-access-to-detection-rules), [억제](#restrict-access-to-suppression-rules) 및 [동적 중증도 규칙](#restrict-access-to-dynamic-severity-rules)에 대해 [세분화된 액세스 제어][3]를 사용할 수 있으며, 팀, 역할 또는 서비스 계정별로 액세스를 제한할 수 있습니다.

보안 데이터 자체에 대한 액세스를 제한하려면 [Data Access Control](#restrict-access-to-security-data)을 사용합니다.

## 권한 {#permissions}

Security 제품의 [권한 목록][2]을 참조하세요.

## 탐지 규칙 액세스 제한{#restrict-access-to-detection-rules}

{{% security-products/detection-rules-granular-access %}}

## 억제 규칙 액세스 제한{#restrict-access-to-suppression-rules}

{{% security-products/suppressions-granular-access %}}

## 동적 중증도 규칙 액세스 제한{#restrict-access-to-dynamic-severity-rules}

{{% security-products/dynamic-severity-granular-access %}}

## 보안 데이터 액세스 제한 {#restrict-access-to-security-data}

[Data Access Control][4]을 사용하여 데이터의 태그와 속성을 기반으로 사용자가 조회할 수 있는 보안 데이터를 제한합니다. 쿼리로 [Restricted Dataset][8]를 정의한 다음 특정 팀이나 역할에 액세스 권한을 부여합니다. Restricted Dataset를 생성할 때 다음 세 가지 보안 옵션을 사용할 수 있습니다.

- **Security Signals**: Cloud SIEM 및 Workload Protection 신호
- **Workload Protection Agent Events**
- **Security Findings** (미리 보기로 제공되고 있으며 요청 시 사용 가능): Cloud Security, Code Security, Workload Protection 및 App and API Protection 발견 결과

어떤 Restricted Dataset에도 포함되지 않은 보안 데이터는 [Restricted][5]로 표시하지 않는 한 적절한 권한이 있는 모든 사용자에게 계속 표시됩니다.

### 팀 소유권을 기준으로 발견 결과에 대한 액세스 제한 {#restrict-findings-by-team-ownership}

{{< callout btn_hidden="true" >}}
소유권 기반 액세스 제어는 미리 보기로 제공되고 있으며, 요청 시 사용할 수 있습니다.
{{< /callout >}}

소유권 기반 액세스 제어는 팀 멤버십을 기준으로 보안 발견 결과에 대한 액세스를 제한하며, Restricted Dataset보다 구성 작업이 적게 필요합니다. 각 사용자는 발견 결과 그룹마다 별도의 데이터셋을 만들 필요 없이 자신이 속한 [팀][6]이 소유한 발견 결과를 조회할 수 있습니다.

소유권 기반 액세스 제어는 Cloud Security, Code Security, Workload Protection 및 App and API Protection의 발견 결과를 포괄하는 Security Findings에 사용할 수 있습니다. Datadog은 `team` 태그에서 소유권을 결정합니다. 이 태그가 없는 발견 결과는 [무제한 액세스 권한][7]이 있는 팀과 역할만 조회할 수 있습니다.

[1]: /ko/account_management/rbac/#role-based-access-control
[2]: /ko/account_management/rbac/permissions/#cloud-security-platform
[3]: /ko/account_management/rbac/granular_access/
[4]: /ko/account_management/rbac/data_access/
[5]: /ko/account_management/rbac/data_access/#strict-mode
[6]: /ko/account_management/teams/
[7]: /ko/account_management/rbac/data_access/#unrestricted-user-groups
[8]: /ko/account_management/rbac/data_access/#configure-data-access