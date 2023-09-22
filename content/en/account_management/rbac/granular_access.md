---
title: Granular Access Control
kind: documentation
---
## Restrict access to individual resources

Some resources allow you to restrict access to individual resources by roles, [Teams][1] (beta), or users (beta). Datadog recommends that you use teams to map access to functional groups in your organizations (for example, restrict editing of a dashboard to the application team owning it), roles to map access to personas (for example, restrict editing of payment methods to billing administrators), and individual users only when necessary. This encourages knowledge sharing and collaboration.


| Supported Resources with Granular Access Control | Team-Based Access | Role-Based Access | User / Service Account-Based Access |
|--------------------------------------------------|-------------------|-------------------|-------------------------------------|
| [Dashboards][2]                                 | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Monitors][3]                                   |                   | {{< X >}}         |                                     |
| [Notebooks][4]                                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Security rules][5]                             | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Service Level Objectives][6]                   | {{< X >}}         | {{< X >}}         | {{< X >}}                           |
| [Synthetic tests][7]                            |                   | {{< X >}}         |                                     |

[1]: /account_management/teams/
[2]: /dashboards/#permissions
[3]: /monitors/notify/#permissions
[4]: /notebooks/#limit-edit-access
[5]: /security/detection_rules/#limit-edit-access
[6]: /service_management/service_level_objectives/#permissions
[7]: /synthetics/browser_tests/#permissions
