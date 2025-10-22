---
title: Access Control
disable_toc: false
---

## Overview

Datadog's access management system uses role-based access control (RBAC). This lets you define the level of access users have to different Datadog resources. Users are assigned to roles that define their account permissions, including what data they can read and which account assets they can modify. When [permissions](#permissions) are granted for a role, any user who is associated with that role receives those permissions. See [Role based access control][1] for more information.

[Granular access control](#granular-access-control) lets you restrict access to individual resources by roles, [Teams][2], or users. For Observability Pipelines, you can [restrict access to a pipeline](#restrict-access-to-a-pipeline) or [restrict access to Live Capture for a pipeline](#restrict-access-to-live-capture-for-a-pipeline).

## Permissions

See the [list of permissions][3] for Observability Pipelines' assets and what levels of permissions Datadog default roles include.

## Granular access control

[Granular access control][4] can only restrict access to resources and does **not** elevate permissions. For example, if a user has the **Datadog Read Only Role** and they are given the **Editor** access for a specific pipeline using granular access control, the user still only has read-only access to this pipeline and cannot edit it. You need to update their role to one that allows pipeline editing if you want them to be able to make changes to this pipeline and other pipelines.

### Restrict access to a pipeline

You can restrict access to a specific pipeline with the following role options:

| Role | View pipeline | Edit pipeline | Deploy pipeline | Delete pipeline | Can restrict access to pipeline |
|:----:|:-------------:|:-------------:|:---------------:|:---------------:|:--------------------------:|
| Editor | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Runner | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| Contributor* | {{< X >}} | {{< X >}} |  |  |  |
| Viewer | {{< X >}} |  |  |  |  |
| No Access |  |  |  |  |  |

*Contributor can only edit pipeline configuration when the pipeline is in draft mode and has not been deployed yet.

**Notes**:

- You can't save granular access settings if there isn't at least one user with Editor access to the pipeline.
- You can lock yourself out of a pipeline even if you created it. When you edit granular access restrictions for pipeline access and you want to continue to have Editor access for the pipeline, make sure you are one of the users or part of a Team or role with Editor access.

To use granular access controls to limit access to a specific pipeline:

1. Navigate to the [Pipelines][5] page.
1. Select the pipeline you want to restrict access to.
1. Click the cog on the upper right side of the page.
1. Click **Edit Access** > **Pipeline Access**.
1. Click **Restrict Access**.
1. The **Organization access** section shows that members of your organization have **Viewer** access by default. Use the dropdown menu to select what kind of access you want them to have.
1. Click the dropdown menu in the **Restricted** section to set access levels for Teams, roles, users, or service accounts.
1. Click **Copy Link** if you want to provide the pipeline link to users who are getting access to this pipeline.
1. Click **Save**.

To restore full access to a pipeline:

1. Click the cog on the upper right side of your pipeline's page.
1. Click **Edit Access** > **Pipeline Access**.
1. Click **Restore Full Access**.
1. Click **Save**.

### Restrict access to Live Capture for a pipeline

[Live Capture][6] lets you:

- See the data a source sends to the pipelines.
- See the data a processor receives.
- See the data a processor sends to the destination.

You can restrict access to Live Capture **for a specific pipeline** with the following options:

| Role | View captured events | Run new captures | Restrict access to Live Capture |
|:----:|:--------------------:|:----------------:|:-------------------------------:|
| Editor | {{< X >}} | {{< X >}} | {{< X >}} |
| Viewer | {{< X >}} |  |  |
| No Access |  |  |  |

**Notes**:

- You can't save granular access settings if there isn't at least one user with **Editor** access to Live Capture.
- You can lock yourself out of Live Capture for a specific pipeline even if you created the pipeline. When you edit granular access restrictions for Live Capture access and you want to have Editor access for Live Capture, make sure you are one of the users or part of a Team or role with Editor access.

To use granular access controls to limit access to Live Capture for a specific pipeline:

1. Navigate to the [Pipelines][6] page.
1. Select the pipeline you want to restrict access to.
1. Click the cog on the upper right side of the page.
1. Click **Edit Access** > **Live Capture Access**.
1. Click **Restrict Access**.
1. The **Organization access** section shows that members of your organization have **Viewer** access by default. Use the dropdown menu to select what kind of access you want them to have.
1. Click the dropdown menu in the **Restricted* section to set access levels for Teams, roles, users, or service accounts based on your use case.
1. Click **Save**.

To restore full access to Live Capture for a pipeline:

1. Click the cog on the upper right side of your pipeline's page.
1. Click **Edit Access** > **Live Capture Access**.
1. Click **Restore Full Access**.
1. Click **Save**.

[1]: /account_management/rbac/?tab=datadogapplication#role-based-access-control
[2]: /account_management/teams/
[3]: /account_management/rbac/permissions/#observability-pipelines
[4]: /account_management/rbac/granular_access/
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /observability_pipelines/live_capture/