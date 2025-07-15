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

For Datadog Security products, [granular access control][3] is available for [detection rules](#restrict-access-to-detection-rules) and [suppressions](#restrict-access-to-suppression-rules), allowing you to restrict access by teams, roles, or service accounts.

## Permissions

See the [list of permissions][2] for Security products.

## Restrict access to detection rules

{{% security-products/detection-rules-granular-access %}}

## Restrict access to suppression rules

{{% security-products/suppressions-granular-access %}}

[1]: /account_management/rbac/#role-based-access-control
[2]: /account_management/rbac/permissions/#cloud-security-platform
[3]: /account_management/rbac/granular_access/