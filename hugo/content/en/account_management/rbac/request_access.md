---
title: Request Access
description: Let users request the access they need directly from a permission-denied page, with manual or automatic approval workflows for administrators.
further_reading:
    - link: '/account_management/rbac/permissions/'
      tag: 'Documentation'
      text: 'Permissions'
    - link: '/account_management/rbac/granular_access/'
      tag: 'Documentation'
      text: 'Granular Access'
    - link: '/getting_started/access_for_enterprises/'
      tag: 'Guide'
      text: 'Access for Enterprises'
---

{{< callout url="#" btn_hidden="true" header="false" >}}
Request Access is in Preview.
{{< /callout >}}

## Overview

Getting access to a feature in Datadog could knowing who to ask, filing a ticket, and waiting for a response. For organizations managing many roles and users, this slows users down and creates manual work for administrators.

Request Access lets a user ask for the permission they need directly from the page where they were blocked, with a justification for the request. Administrators can review and approve these requests from a central queue, or configure specific roles to grant themselves automatically. Every request, decision, and justification appears in [Audit Trail][2], so access changes stay traceable without a support ticket.

## To enable or disable in-product Request Access

**Note**: You must have the `user_access_manage` permission.

To enable manual or auto-approval requests for your organization, navigate to [Organization Settings][1] and select {{< ui >}}Access Controls{{< /ui >}}, then create the corresponding configuration. See [Configuring access requests as an administrator](#configuring-access-requests-as-an-administrator) for setup details.

To disable manual or auto-approval requests, delete all corresponding configurations. This is especially relevant if you manage access through a separate internal access elevation process.

## Requesting access as an end user

### From a permission-denied page

When you navigate to a page that requires a permission you don't have, Datadog shows a 403 permission-denied page. If your organization has a manual approval or auto-approval configuration enabled for a role that includes that permission, a {{< ui >}}Request Access{{< /ui >}} button appears on the page.

1. Click {{< ui >}}Request Access{{< /ui >}}.
2. Enter a justification for the request.
3. Submit the request.

If a relevant auto-approval is configured, you'll be notified and granted access within a minute. Other requests are forwarded to specific admins for manual approval.

### From the Roles page

You can also request a role directly, without first hitting a permission-denied page.

1. Navigate to [Organization Settings][1] and select {{< ui >}}Roles{{< /ui >}}.
2. Find the role you want and open its details panel.
3. Click {{< ui >}}Request Access{{< /ui >}}.
4. Enter a justification and submit.

Direct role requests follow the same approval and auto-approval rules as requests made from a permission-denied page.

## Configuring access requests as an administrator

Navigate to [Organization Settings][1] and select {{< ui >}}Access Controls{{< /ui >}} to configure and manage all access request settings. You need the `user_access_manage` permission to access this page.

### Manual approval

Manual approval escalates a request to a list of reviewers, who can approve or deny it. Your organization supports one manual approval configuration, and enabling it turns on manual requests for every role in the organization.

1. Navigate to [Organization Settings][1] and select {{< ui >}}Access Controls{{< /ui >}}.
2. Create a manual approval configuration.
3. Select the users who can approve requests. Only users with the `user_access_manage` permission are eligible.

If you don't designate approvers, every user with `user_access_manage` can still approve or deny requests, but none of them receive email notifications.

Approvers review pending requests from the {{< ui >}}Pending Requests{{< /ui >}} tab on the Access Controls page, where each request shows the requester, the role, and their justification. Datadog emails the requester after an approver takes action.

### Auto-approval for roles and permissions

Auto-approval lets eligible users unblock themselves immediately, without a manual review step.

1. Navigate to [Organization Settings][1] and select {{< ui >}}Access Controls{{< /ui >}}.
2. Create an auto-approval configuration. Your organization supports up to 10 configurations.
3. Select the roles this configuration auto-approves.
4. Optionally, restrict which users, teams, or roles can trigger this configuration. If you leave this field empty, the configuration applies to all users.

### Temporary access (Preview)

An auto-approval configuration can grant a role for a limited time instead of permanently. Set the assignment duration when you create the configuration: 1 hour, 1 day, 1 week, 30 days, or permanent.

If a temporary role assignment expires, Datadog revokes it within 5 minutes. You can view a user's active and expiring role assignments from their profile page, or from [Organization Settings][1] under {{< ui >}}Users{{< /ui >}}.

### Auto-approval for assets

Asset auto-approval extends the same self-service model to individual resources. Your organization can auto-approve viewer or editor access for the following resource types:

- Case Management projects
- Dashboards
- Monitors
- Notebooks
- Reference Tables
- Synthetic tests
- Synthetics global variables
- Synthetics private locations

**Note**: Like role and permission auto-approval, asset auto-approval configurations can be scoped to specific users, teams, or roles.

Enabling a resource type applies the configuration to every resource of that type. Configure requester scoping separately for each access level. For example, you can allow all users to request viewer access to dashboards while limiting editor access requests to a specific team.

To request access to an individual asset, go to the asset and click {{< ui >}}Request Access{{< /ui >}}. If you already have viewer access and want to request a higher permission level, open the existing sharing settings for the asset instead.

## Audit trail

Datadog logs every access request in [Audit Trail][2], including the requester, the role or resource requested, the justification, and the outcome. Use Audit Trail to review access history without relying on ticket or chat history.

## How role selection works

When a user requests access due to a missing permission, Datadog matches to the role that satisfies the required permission with the fewest total permissions. If several roles tie on permission count, Datadog picks the first one alphabetically. This selection method limits over-provisioning without requiring an administrator to map every role to every possible access scenario in advance.

## Limitations

- Your organization supports one manual approval configuration and up to 10 auto-approval configurations.
- If no role in your organization contains the required permission, the user has no option to request access for it.
- Requests grant a full role, not a single permission. If you need finer-grained control, create a role scoped to only the required permissions and set it as the auto-approved or manually approved option.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: /account_management/audit_trail/
