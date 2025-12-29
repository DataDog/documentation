---
title: How to set up RBAC for Monitors
description: "Configure Role-Based Access Control (RBAC) for monitors to restrict editing permissions to specific roles and prevent unauthorized changes."
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

## Restricted roles

Datadog allows restriction of monitor editing to specific roles through the role restriction option. This gives you the flexibility to define which users are allowed to edit monitors.

### API

You can update the definition of monitors that are managed through API or Terraform by using the `restricted_roles` parameter. You can also use the [Restriction Policies][4] endpoint to define the access control rules for a monitor, mapping a set of relations (such as editor and viewer) to a set of allowed principals (such as roles, teams, or users). The restriction policy determines who is authorized to perform what actions on the monitor.

For more information, see [Edit a monitor API endpoint][3] and [Restriction Policies API][4].

### UI

All new monitors created from the UI use the `restricted_roles` parameter. 
All monitors also display the role restriction option regardless of the underlying mechanism:

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="RBAC Non Restricted Monitor" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
[2]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[3]: /api/latest/monitors/#edit-a-monitor
[4]: /api/latest/restriction-policies/
