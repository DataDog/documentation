---
title: How to set up RBAC for Monitors
kind: guide
further_reading:
- link: "/account_management/rbac/permissions/#monitors"
  tag: "Documentation"
  text: "Learn more about RBAC permissions for Monitors"
- link: "/api/latest/monitors/#create-a-monitor"
  tag: "Documentation"
  text: "Learn more about creating restricted monitors via API"
- link: "/monitors/notify/#permissions"
  tag: "Documentation"
  text: "Learn more about creating restricted monitors via the UI"
---

## Overview

Monitors alert your teams to potential issues with your systems. Making sure only authorized users can edit your monitors prevents accidental changes in your monitors' configurations.

Safely manage your monitors by **restricting edit permissions of each individual monitor to some specific roles** of your account.

## Set up roles

For more information about default and custom roles, how to create them, assign permissions to them, and assign them to users, see [RBAC documentation][1].

## Restrict access to monitors

{{< tabs >}}

{{% tab "UI" %}}

* Create a new monitor or edit an existing one
* At the bottom of the form, specify which roles are allowed to edit the monitor, in addition to the monitor's creator

{{< img src="/monitors/guide/monitor_rbac_restricted.jpg" alt="RBAC Restricted Monitor"  >}}

For more information, see [Monitors documentation][1].

[1]: /monitors/notify/#permissions
{{% /tab %}}

{{% tab "API" %}}

Use the [List Roles API endpoint][1] to get the list of roles and their id.

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

Use the [Create][2] or [Edit a monitor][3] API endpoint and the `restricted_roles` parameter to restrict monitor edition to a specific set of roles and to the monitor's creator. 

**Note:** You can specify one or multiple role UUIDs. Setting `restricted_roles` to `null` allows monitor edition for all users with [Monitor Write permissions][4].

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

For more information, see [Roles][5] and [Monitors API documentation][6] .


[1]: /api/latest/roles/#list-roles
[2]: /api/latest/monitors/#create-a-monitor
[3]: /api/latest/monitors/#edit-a-monitor
[4]: /account_management/rbac/permissions/#monitors
[5]: /api/latest/roles/
[6]: /api/latest/monitors/
{{% /tab %}}
{{< /tabs >}}

## Deprecated locked mechanism

Previous to the above described role restriction option, monitors could be locked, meaning only their creator and users with the [Datadog Admin Role][2] would be able to edit them. 

{{< img src="/monitors/guide/monitor_rbac_locked.jpg" alt="RBAC Locked Monitor" style="width:70%;">}}

This locked mechanism was deprecated and it is now recommended to use the role restriction option, which gives you more flexibility to define users allowed to edit monitors.

You might however have a number of existing monitors still leveraging the locked mechanism under the hood. This mechanism is still supported and respected for now, which means locked monitors should not be editable by users who do not have the [Datadog Admin Role][2] attached or are not the monitor's creator.

Below sections describe how the change from the old locked mechanism to the new role restriction one is performed, depending on the way you manage your monitors.

### API

Although deprecated, the `locked` parameter corresponding to the above mentioned locked mechanism is still supported. This means you can progressively update the definition of your monitors managed through API/Terraform to stop using `locked` and start using `restricted_roles` (parameter attached with the new role restriction option).

For more information on how to update your monitors' definitions, see the [Edit a monitor API endpoint documentation][3] and the dedicated [Monitor API Options guide][4].

### UI

All new monitors created from the UI use the new `restricted_roles` parameter. 
All monitors (existing and new) also display the new role restriction option regardless of the mechanism used under the hood:

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="RBAC Non Restricted Monitor"  >}}

Existing monitors have their definitions updated from the old locked mechanism to the new role restriction one on the fly whenever a monitor is saved.

Below are some instructions to help you determine how to proceed in case you need to save a monitor that is using the previous locked mechanism.

#### Locked monitors (`locked:true`) edited by creator or user with Datadog Admin Role

You are a user with [Datadog Admin Role][2] and/or are the creator of the monitor. You are editing a locked monitor and seeing the below warning:

<TO DO: ADD SCREENSHOT OF WARNING>

On save, your monitor's definition will be updated to all roles with Admin permissions.
You have different ways to handle this warning depending on the changes you are willing to make on your monitor:

**1. You do not want to change anything about your monitor permissions**

Save the monitor to have the update from the locked mechanism to the restricted_roles one be performed automatically, along with any other updates you might have done on your monitor (e.g. threshold update, message, etc.).

If you were just opening the edit page to see more details about your monitor configuration, you can also hit **Save**. That also performs the update for your monitor.

**2. You want to allow all users to edit this monitor**

Save the monitor, edit it again, and remove all roles that were generated for this monitor. 

**3. You want your monitor to be restricted to some roles, but not the exact equivalent of the previous locked option**

Select the roles you want this monitor to be restricted to. This will override the locked equivalent set of roles to only the ones you specify.
  
#### Locked monitors (`locked:true`) edited by non creator or user without Datadog Admin Role

You are a user without [Datadog Admin Role][2] and/or are not the creator of the monitor. You are editing a locked monitor and seeing the below warning:

<TO DO: ADD SCREENSHOT OF WARNING>

As mentioned in the warning, this monitor was locked in the previous system. You should consequently reach out to a user with a [Datadog Admin Role][2] or to the creator of the monitor for them to update the monitor to include one of the roles you belong to. Your admin will have to follow guidelines in the [above section](#locked-monitors-lockedtrue-edited-by-creator-or-user-with-datadog-admin-role) (2. or 3.).

**Note:** The discrepancy you are seeing between the warning and the option is expected:

<TO DO: ADD SCREENSHOT OF WARNING AND OPTION>

The warning reflects the current state of the monitor that is still using the old locked parameter. The option reflects the new role restriction option your monitor will be updated to once a user with a [Datadog Admin Role][2]/the monitor's creator edits and saves it. Once saved, the warning will disappear and the adequate restricted roles will populate the dropdown.

#### Non locked monitors (`locked:false`, `locked:null`, undefined `locked`)

You are editing a non locked monitor and seeing the below option:

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="RBAC Non Restricted Monitor"  >}}

You have different ways to handle this option depending on the changes you are willing to make on your monitor:

**1. You do not want to change anything about your monitor permissions**

Save the monitor to have the update from the locked mechanism to the restricted_roles one be performed automatically, along with any other updates you might have done on your monitor (e.g. threshold update, message, etc.).

If you were just opening the edit page to see more details about your monitor configuration, you can also hit **Save**. That also performs the update for your monitor.

**2. You want to restrict your monitor to some roles**

Select the roles you want this monitor to be restricted to and save your monitor. The update of your monitor from non locked to restricted to some roles is performed automatically on save.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
[2]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[3]: /api/latest/monitors/#edit-a-monitor
[4]: /monitors/guide/monitor_api_options/#permissions-options
