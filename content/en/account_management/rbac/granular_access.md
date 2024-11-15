---
title: Granular Access Control
---
## Manage access to individual resources

Some resources allow you to restrict access to individual resources by roles, [Teams][1], or users.

Use the different principals to control access patterns in your organization and encourage knowledge sharing and collaboration:
- Use Teams to map access to functional groups in your organizations. For example, restrict editing of a dashboard to the application team that owns it.
- Use roles to map access to personas. For example, restrict editing of payment methods to billing administrators.
- Allocate access to individual users only when necessary.


| Supported resources with granular access control | Team-based access | Role-based access | User / service account-based access |
|--------------------------------------------------|-------------------|-------------------|-------------------------------------|
| [Dashboards][2]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Monitors][3]                                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Notebooks][4]                                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Powerpacks][5]                                  | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Security rules][6]                              | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Security suppressions][7]                       | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Service Level Objectives][8]                    | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Synthetic tests][9]                             | {{< X >}}         | {{< X >}}         | {{< X >}}                           |

### Elevate access to individual resources

A user with the `user_access_manage` permission can elevate their access to any individual resource that supports restrictions based on team, role, and user or service account. Resources with only role-based access restrictions are not supported. To get access, click the **Elevate Access** button in the granular access control modal.

[1]: /account_management/teams/
[2]: /dashboards/configure/#permissions
[3]: /monitors/configuration/#permissions
[4]: /notebooks/#limit-edit-access
[5]: /dashboards/widgets/powerpack/#powerpack-permissions
[6]: /security/detection_rules/#restrict-edit-permissions
[7]: /security/suppressions/#restrict-edit-permissions
[8]: /service_management/service_level_objectives/#permissions
[9]: /synthetics/browser_tests/#permissions