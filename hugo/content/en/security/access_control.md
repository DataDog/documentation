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

Access to the security data itself is managed separately, with [Data Access Control](#restrict-access-to-security-data).

## Permissions

See the [list of permissions][2] for Security products.

## Restrict access to detection rules

{{% security-products/detection-rules-granular-access %}}

## Restrict access to suppression rules

{{% security-products/suppressions-granular-access %}}

## Restrict access to dynamic severity rules

{{% security-products/dynamic-severity-granular-access %}}

## Restrict access to security data

Use [Data Access Control][4] to restrict which security data a user can view, based on the tags and attributes in the data. Define a Restricted Dataset with a query, then grant access to specific teams or roles. Three security options are available when you create a Restricted Dataset:

- **Security Signals**: Cloud SIEM and Workload Protection signals.
- **Workload Protection Agent Events**.
- **Security Findings** (in Preview, available upon request): Cloud Security, Code Security, Workload Protection, and App and API Protection findings.

Security data outside every Restricted Dataset stays visible to all users with the appropriate permissions, unless you switch it to [Restricted][5].

### Restrict findings by team ownership

For security findings, ownership-based access control (in Preview, available upon request) is an alternative to Restricted Datasets that requires less configuration. Rather than defining a dataset for each group of findings, each user sees the findings owned by the [teams][6] they belong to. It covers the same finding types: Cloud Security, Code Security, Workload Protection, and App and API Protection findings. Because it relies on the `team` tag, findings without that tag are visible only to the teams and roles that have [unrestricted access][7].

[1]: /account_management/rbac/#role-based-access-control
[2]: /account_management/rbac/permissions/#cloud-security-platform
[3]: /account_management/rbac/granular_access/
[4]: /account_management/rbac/data_access/
[5]: /account_management/rbac/data_access/#strict-mode
[6]: /account_management/teams/
[7]: /account_management/rbac/data_access/#unrestricted-user-groups