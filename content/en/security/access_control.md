---
title: Access Control
disable_toc: false
products:
- name: Cloud SIEM
  url: /security/cloud_siem/
  icon: siem
- name: CSM Threats
  url: /security/threats/
  icon: cloud-security-management
- name: Application Security Management
  url: /security/application_security/
  icon: app-sec
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

{{< product-availability >}}

## Overview

Datadog's access management system uses role-based access control to let you determine the level of access users have to Datadog resources. Users are added to roles, which define the account permissions those users have, such as what data they can read or what account assets they can modify. When permissions are granted to a role, any user who is associated with that role receives those permissions. See the [Account Management Access Control][1] documentation for more information.

For Datadog Security products, granular access control is available for detection rules and suppressions, so you can restrict access to them by teams, roles, or service accounts.

## Permissions

See the [list of permissions][4] for Security products.

## Granular access control

[Granular access control][2] is available for view and write permissions for detection and suppression rules.

### Restrict access to detection rules

By default, all users have full access to detection rules. To use granular access controls to limit the roles that may edit a suppression rule:

1. Click the vertical three-dot menu for the rule and select **Permissions**.
1. Click **Restrict Access**. The dialog box updates to show that members of your organization have **Viewer** access by default.
1. Use the dropdown menu to select one or more roles, teams, or users that may edit the security rule.
1. Click **Add**.
1. Click **Save**.

**Note**: To maintain your edit access to the rule, the system requires you to include at least one role that you are a member of before saving.

To restore access to a rule:

1. Click the vertical three-dot menu for the rule and select **Permissions**.
1. Click **Restore Full Access**.
1. Click **Save**.

### Restrict access to suppression rules

By default, all users have full access to [suppressions][3]. To use granular access controls to limit the roles that may edit a suppression rule:

1. Click the vertical three-dot menu for the rule and select **Permissions**.
1. Click **Restrict Access**. The dialog box updates to show that members of your organization have **Viewer** access by default.
1. Use the dropdown menu to select one or more roles, teams, or users that may edit the security rule.
1. Click **Add**.
1. Click **Save**.

**Note**: To maintain your edit access to the rule, the system requires you to include at least one role that you are a member of before saving.

To restore access to a rule:

1. Click the vertical three-dot menu for the rule and select **Permissions**.
1. Click **Restore Full Access**.
1. Click **Save**.

[1]: /account_management/rbac/
[2]: /account_management/rbac/granular_access/
[3]: /security/suppressions/
[4]: /account_management/rbac/permissions/#cloud-security-platform