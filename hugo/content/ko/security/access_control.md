---
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: 설명서
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

## 권한 {#permissions}

Security 제품의 [권한 목록][2]을 참조하세요.

## 탐지 규칙 액세스 제한{#restrict-access-to-detection-rules}

{{% security-products/detection-rules-granular-access %}}

## 억제 규칙 액세스 제한{#restrict-access-to-suppression-rules}

{{% security-products/suppressions-granular-access %}}

## 동적 중증도 규칙 액세스 제한{#restrict-access-to-dynamic-severity-rules}

{{% security-products/dynamic-severity-granular-access %}}

[1]: /ko/account_management/rbac/#role-based-access-control
[2]: /ko/account_management/rbac/permissions/#cloud-security-platform
[3]: /ko/account_management/rbac/granular_access/