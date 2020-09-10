---
title: Best Practices with Access Control for Log Management 
kind: guide
further_reading:
- link: "/logs/guide/restrict-access-to-log-events-with-restriction-queries/"
  tag: "Documentation"
  text: "Restrict Access to Log-Events with Restriction Queries"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn more about Log Explorer"
- link: "/logs/explorer/patterns/"
  tag: "Documentation"
  text: "Get familiar with the Logs pattern view"
- link: "/logs/live_tail/"
  tag: "Documentation"
  text: "Explore Live Tail"
- link: "/logs/logs_to_metrics/"
  tag: "Documentation"
  text: "Learn how to generate metrics from ingested logs"
---

## Overview

Logs might contain sensitive information that could either get [scrubbed][1]) or be accessible only to authorized users of your organization.

To limit access of a subset of logs for a given user or group of users, you can define restriction queries in Datadog.

In this guide, assume that there are two teams, **backend** and **frontend**, and each team can only see their own logs that have the `team:frontend` and `team:backend` tags on them.

The following steps are covered for each team:

* [Create the role](#role-creation)
* [Create the restriction query](#create-restriction-queries)
* [Attach the restriction query to the role](#attach-queries-to-the-role)
* [Attach roles to the users](#attach-role-to-the-user)
* [Remove users from the default Datadog roles](#remove-default-roles)

## Prerequisites



{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[2]: https://app.datadoghq.com/account/settings#api
[3]: /account_management/rbac/?tab=datadogapplication#create-a-custom-role
[4]: /api/v2/roles/#create-role
[5]: /api/v2/roles/#list-permissions
[6]: /account_management/rbac/permissions?tab=datadogapplication#general-permissions
[7]: /account_management/rbac/permissions?tab=datadogapplication#advanced-permissions
[8]: /api/v2/roles/#grant-permission-to-a-role
[9]: /api/v2/logs-restriction-queries/#grant-role-to-a-restriction-query
[10]: /account_management/rbac/permissions?tab=datadogapplication#log-data-access
[11]: /api/v2/users/#list-all-users
[12]: /api/v2/roles/#add-a-user-to-a-role
[13]: /api/v2/roles/#remove-a-user-from-a-role
