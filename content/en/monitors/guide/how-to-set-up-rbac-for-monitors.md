---
title: How to set up RBAC for Monitors
further_reading:
- link: "/account_management/rbac/permissions/#monitors"
  tag: "Documentation"
  text: "Learn more about RBAC permissions for Monitors"
- link: "/api/latest/monitors/#create-a-monitor"
  tag: "Documentation"
  text: "Learn more about creating restricted monitors via API"
- link: "/monitors/configuration/#permissions"
  tag: "Documentation"
  text: "Learn more about creating restricted monitors via the UI"
---

## Overview

Monitors alert your teams to potential issues with your systems. Making sure only authorized users can edit your monitors prevents accidental changes in your monitors' configurations.

Safely manage your monitors by restricting edit permissions for each individual monitor to specific roles.

## Set up roles

For more information about default and custom roles, how to create custom roles, assign permissions to roles, and assign roles to users, see [Role Based Access Control][1].

## Restrict access to monitors

{{< tabs >}}

{{% tab "UI" %}}

1. Navigate to the monitor editing page by creating a new monitor or editing an existing one.
2. At the bottom of the form, specify which roles, in addition to the creator, are allowed to edit the monitor.

{{< img src="/monitors/guide/monitor_rbac_restricted.jpg" alt="RBAC Restricted Monitor" >}}

For more information, see [Monitors Permissions][1].

[1]: /monitors/configuration/#permissions
{{% /tab %}}

{{% tab "API" %}}

Use the [List Roles API endpoint][1] to get the list of roles and their ids.

```bash
curl --request GET 'https://api.datadoghq.com/api/v2/roles' \
--header 'DD-API-KEY: <DD-API-KEY>' \
--header 'DD-APPLICATION-KEY: <DD-APPLICATION-KEY>'
```

```bash
{
    "meta": {
        "page": {
            "total_filtered_count": 4,
            "total_count": 4
        }
    },
    "data": [
        {
            "type": "roles",
            "id": "89f5dh86-e470-11f8-e26f-4h656a27d9cc",
            "attributes": {
                "name": "Corp IT Eng - User Onboarding",
                "created_at": "2018-11-05T21:19:54.105604+00:00",
                "modified_at": "2018-11-05T21:19:54.105604+00:00",
                "user_count": 4
            },
            "relationships": {
                "permissions": {
                    "data": [
                        {
                            "type": "permissions",
                            "id": "984d2rt4-d5b4-13e8-a5yf-a7f560d33029"
                        },
                        ...
                    ]
                }
            }
        },
        ...
    ]
}
```

Use the [Create][2] or [Edit a monitor][3] API endpoint and the `restricted_roles` parameter to restrict monitor editing to a specific set of roles and to the monitor's creator. 

**Note:** You can specify one or multiple role UUIDs. Setting `restricted_roles` to `null` allows monitor editing for all users with [Monitor Write permissions][4].

```bash
curl --location --request POST 'https://api.datadoghq.com/api/v1/monitor' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DD-API-KEY>' \
--header 'DD-APPLICATION-KEY: <DD-APPLICATION-KEY>' \
--data-raw '{
  "message": "You may need to add web hosts if this is consistently high.",
  "name": "Bytes received on host0",
  "options": {
    "no_data_timeframe": 20,
    "notify_no_data": true
  },
  "query": "avg(last_5m):sum:system.net.bytes_rcvd{host:host0} \u003e 100",
  "tags": [
    "app:webserver",
    "frontend"
  ],
  "type": "query alert",
  "restricted_roles": ["89f5dh86-e470-11f8-e26f-4h656a27d9cc"]
}'
```

For more information, see [Roles][5] and [Monitors API Reference][6] .


[1]: /api/latest/roles/#list-roles
[2]: /api/latest/monitors/#create-a-monitor
[3]: /api/latest/monitors/#edit-a-monitor
[4]: /account_management/rbac/permissions/#monitors
[5]: /api/latest/roles/
[6]: /api/latest/monitors/
{{% /tab %}}
{{< /tabs >}}

## Migrate monitors from locked to restricted roles

Before Datadog released the feature allowing restriction of monitor editing to specific roles, monitors could be locked. Only the creator and users with the [Datadog Admin Role][2] can edit a locked monitor. 

{{< img src="/monitors/guide/monitor_rbac_locked.jpg" alt="RBAC Locked Monitor" style="width:70%;">}}

Locked monitors are deprecated and are no longer supported. Instead, use the role restriction option, which gives you more flexibility to define which users are allowed to edit monitors.

The sections below describe how to migrate from the locked mechanism to restricted roles, depending on the way you manage your monitors.

### API

The `locked` parameter corresponding to the above mentioned locking mechanism is no longer supported. This means you must update the definition of your monitors managed through API or Terraform to stop using `locked` and start using `restricted_roles` (parameter attached with the new role restriction option).

For more information on how to update your monitors' definitions, see [Edit a monitor API endpoint][3] and [Monitor API Options][4].

### UI

All new monitors created from the UI use the `restricted_roles` parameter. 
All monitors also display the role restriction option regardless of the underlying mechanism:

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="RBAC Non Restricted Monitor" >}}

Datadog updates existing monitor definitions from the old locked mechanism to the new role restriction one whenever a monitor is saved.

Below are some instructions to help you determine how to proceed in case you need to save a monitor that is using the locked mechanism.

#### Locked monitors (`locked:true`) edited by creator or user with Datadog Admin Role

You are a user with the [Datadog Admin Role][2] or are the creator of the monitor. You edit a locked monitor and see the following warning:

```
This monitor is using the locked attribute: only its creator and admins can edit it. locked is deprecated in favor of restricted_roles. On save, the monitor will be automatically updated to use a restricted_roles attribute set to all roles with Admin permissions. 
If there is no specific change you want to apply to this monitor's permissions, click Save. If you want to update this monitor's permissions, read this doc.
```

On save, your monitor's definition will be updated to all roles with Admin permissions.
You have different ways to handle this warning depending on the changes you are willing to make to your monitor:

**1. You do not want to change anything about your monitor permissions**

Save the monitor. Datadog automatically migrates the monitor from the locked mechanism to restricted roles. Any other updates you made to your monitor, such as threshold update or message, are saved at the same time.

Clicking **Save** without making any changes also performs the update for your monitor.

**2. You want to allow all users to edit this monitor**

Save the monitor, causing Datadog to migrate it to restricted roles. Reopen the editing page. In the **Restrict editing of this monitor to** dropdown menu, remove all roles. Click **Save** a second time.

**3. You want your monitor to be restricted to some roles, but not to all roles with Admin permissions**

In the **Restrict editing of this monitor to** dropdown menu, select the roles that can modify this monitor. Save the monitor. Monitor is restricted only to the roles you selected.
  
#### Locked monitors (`locked:true`) edited by non creator or user without Datadog Admin Role

You are a user without the [Datadog Admin Role][2] and are not the creator of the monitor. You edit a locked monitor and see the following warning:

```
This monitor is locked: only its creator and admins can edit it. Read more here.
```

This monitor is locked. Reach out to a user with the [Datadog Admin Role][2] or to the creator of the monitor and ask them to add one of your roles to the monitor role restrictions. Your admin will have to follow steps two or three above for [locked monitors](#locked-monitors-lockedtrue-edited-by-creator-or-user-with-datadog-admin-role).

**Note:** The discrepancy you see between the warning and the option is expected. The warning reflects the current state of the monitor that is using the locked parameter. The option reflects the role restriction option your monitor will be updated to once a user with the [Datadog Admin Role][2] or the monitor's creator edits and saves it. Once the monitor is saved, the warning disappears and the appropriate restricted roles populate the dropdown.

#### Non locked monitors (`locked:false`, `locked:null`, undefined `locked`)

You edit a non locked monitor and see the following option:

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="RBAC Non Restricted Monitor" >}}

You have different ways to handle this option depending on the changes you are willing to make on your monitor:

**1. You do not want to change anything about your monitor permissions**

Save the monitor. Datadog automatically migrates the monitor from the locked mechanism to restricted roles. Any other updates you made to your monitor, such as threshold update or message, are saved at the same time.

Clicking **Save** without making any changes also performs the update for your monitor.

**2. You want to restrict your monitor to some roles**

In the **Restrict editing of this monitor to** dropdown menu, select the roles that can modify this monitor. Save the monitor. Monitor is restricted to the roles you selected.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
[2]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[3]: /api/latest/monitors/#edit-a-monitor
[4]: /monitors/guide/monitor_api_options/#permissions-options
