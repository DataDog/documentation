---
title: Access Control
disable_toc: false
products:
- name: Cloud SIEM
  url: /security/cloud_siem/
  icon: siem
- name: Workload Protection
  url: /security/workload_protection/
  icon: cloud-security-management
- name: App and API Protection
  url: /security/application_security/
  icon: app-sec
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

{{< product-availability >}}

## Overview

Datadog's access management system uses role-based access control, enabling you to define the level of access users have to Datadog resources. Users are assigned to roles that define their account permissions, including what data they can read and which account assets they can modify. When permissions are granted to a role, any user who is associated with that role receives those permissions. See the [Account Management Access Control][1] documentation for more information.

For Datadog Security products, [granular access control][3] is available for [detection rules](#restrict-access-to-detection-rules), [suppressions](#restrict-access-to-suppression-rules), and [dynamic severity rules](#restrict-access-to-dynamic-severity-rules), allowing you to restrict access by teams, roles, or service accounts.

Access to the security data itself is managed separately, with [Data Access Control](#restrict-access-to-security-data) or [team ownership](#restrict-access-to-findings-by-team-ownership).

## Permissions

See the [list of permissions][2] for Security products.

## Restrict access to detection rules

{{% security-products/detection-rules-granular-access %}}

## Restrict access to suppression rules

{{% security-products/suppressions-granular-access %}}

## Restrict access to dynamic severity rules

{{% security-products/dynamic-severity-granular-access %}}

## Restrict access to security data

[Data Access Control][4] restricts the security data a user can view, based on the tags and attributes carried by the data. Define a Restricted Dataset with a query, then grant access to specific teams or roles. Two security telemetry types are supported:

- **Security signals**: Cloud SIEM signals, Workload Protection signals, and Workload Protection Agent Events.
- **Security findings** (in Preview, available upon request): Cloud Security, Code Security, Workload Protection, and App and API Protection findings only. Other types of findings are not covered.

Data that falls outside every Restricted Dataset stays visible to all users with the appropriate permissions, unless you set the telemetry type to [Restricted][5].

## Restrict access to findings by team ownership

Ownership-based access control (in Preview, available upon request) restricts security findings by team ownership, instead of by an explicit list of datasets. Each user sees the findings owned by the [teams][6] they belong to, including the teams above them in the hierarchy. Because access follows team membership, there is no mapping between tag values and roles to maintain.

Ownership-based access control covers the same finding types as Data Access Control: Cloud Security, Code Security, Workload Protection, and App and API Protection findings. It uses the `team` tag, so findings without that tag are visible only to the teams and roles that have [unrestricted access][7]. A product uses either Data Access Control or ownership-based access control, not both.

To set it up, open the {{< ui >}}Bulk Policies via Teams{{< /ui >}} tab on the Access Control page in [Organization Settings][8].

[1]: /account_management/rbac/#role-based-access-control
[2]: /account_management/rbac/permissions/#cloud-security-platform
[3]: /account_management/rbac/granular_access/
[4]: /account_management/rbac/data_access/
[5]: /account_management/rbac/data_access/#strict-mode
[6]: /account_management/teams/
[7]: /account_management/rbac/data_access/#unrestricted-user-groups
[8]: https://app.datadoghq.com/organization-settings/