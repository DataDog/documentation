---
title: Granular Access Control
description: Control access to individual Datadog resources like dashboards, monitors, and notebooks by teams, roles, or users for fine-grained permission management.
---
## Manage access to individual resources

Some resources allow you to restrict access to individual resources by roles, [Teams][1], or users.

Use the different principals to control access patterns in your organization and encourage knowledge sharing and collaboration:
- Use Teams to map access to functional groups in your organizations. For example, restrict editing of a dashboard to the application team that owns it.
- Use roles to map access to personas. For example, restrict editing of payment methods to billing administrators.
- Allocate access to individual users only when necessary.


| Supported resources with granular access control | Team-based access | Role-based access | User / service account-based access |
|--------------------------------------------------|-------------------|-------------------|-------------------------------------|
| [Apps][13]                                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Case Management projects][10]                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Connections][14]                                | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Connection Groups][15]                          | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Cross Org Connections][20]                      | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Dashboards][2]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Datastores][16]                                 | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Integration Accounts][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Integration Services][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Integration Webhooks][11]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Logs Pipelines][24]                             | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Monitors][3]                                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Notebooks][4]                                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Observability Pipelines][23]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [On-Call][22]                                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Private Action Runner][18]                      | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Powerpacks][5]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Reference tables][12]                           | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [RUM apps][19]                                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Security rules][6]                              | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Security suppressions][7]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Service Level Objectives][8]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Sheets][21]                                     | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Synthetic tests][9]                             | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Workflows][17]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |


### Elevate access to individual resources

A user with the `user_access_manage` permission can elevate their access to any individual resource that supports restrictions based on team, role, and user or service account. Resources with only role-based access restrictions are not supported. To get access, click the **Elevate Access** button in the granular access control modal.

[1]: /account_management/teams/
[2]: /dashboards/configure/#permissions
[3]: /monitors/configuration/#permissions
[4]: /notebooks/#limit-edit-access
[5]: /dashboards/widgets/powerpack/#powerpack-permissions
[6]: /security/detection_rules/#restrict-edit-permissions
[7]: /security/suppressions/#restrict-edit-permissions
[8]: /service_level_objectives/#permissions
[9]: /synthetics/browser_tests/#permissions
[10]: /service_management/case_management/settings#granular-access-control
[11]: /getting_started/integrations/#granular-access-control
[12]: /reference_tables/#permissions
[13]: /actions/app_builder/access_and_auth/#restrict-access-to-a-specific-app
[14]: /actions/connections/?tab=workflowautomation#connection-credentials
[15]: /actions/connections/?tab=workflowautomation#connection-groups
[16]: /actions/datastore/
[17]: /actions/workflows/access_and_auth/#restrict-access-on-a-specific-workflow
[18]: /actions/private_actions
[19]: /real_user_monitoring
[20]: /account_management/org_settings/cross_org_visibility/#permissions
[21]: /sheets/#permissions
[22]: /service_management/on-call/#granular-access-control
[23]: /observability_pipelines/configuration/access_control/
[24]: /logs/log_configuration/pipelines/#pipeline-permissions
