---
title: Roles and Permissions
description: "Review the roles, permissions, and restriction policies that control access to journeys and their linked assets."
further_reading:
- link: '/journey_monitoring/'
  tag: 'Documentation'
  text: 'Learn about Journey Monitoring'
- link: '/journey_monitoring/configuring_journeys/'
  tag: 'Documentation'
  text: 'Configure journeys in Datadog Journey Monitoring'
- link: '/account_management/rbac/permissions/'
  tag: 'Documentation'
  text: 'Review the full list of Datadog role permissions'
---

## Overview

A journey can include assets from [Product Analytics][2], [Real User Monitoring (RUM)][3], and [Synthetic Monitoring & Testing][4]. To manage a journey or one of its assets, you need the corresponding [Journey Monitoring permissions][1] and product permissions.

## Create and edit journeys

| Action | Required access |
|--------|-----------------|
| Create or edit a journey | Journey Monitoring write |
| Create a journey's [Synthetic test suite][5] | Journey Monitoring write and Synthetic Monitoring write |
| Link or edit [RUM operations][6] | Journey Monitoring write and RUM write |

Journey Monitoring write access is sufficient to create a journey. Datadog creates its Synthetic test suite only if you also have Synthetic Monitoring write access. Otherwise, Datadog creates the journey without a test suite. Add a test suite later with the required access.

## View journeys and linked assets

| Action | Required access |
|--------|-----------------|
| View an event-based journey and its details | Journey Monitoring read and RUM read on the journey's RUM application |
| View a Synthetics-only journey | Journey Monitoring read |
| View a test suite, its tests, and [uptime SLO][7] | Synthetic Monitoring read and a read restriction policy on the suite |
| View linked RUM operations | Journey Monitoring read and RUM read |
| View an operation's SLO | SLO read |
| View journey [Session Replays][8] | RUM read, subject to RUM data access controls |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/#digital-experience-monitoring
[2]: /product_analytics/
[3]: /real_user_monitoring/
[4]: /synthetics/
[5]: /synthetics/test_suites/
[6]: /real_user_monitoring/operations_monitoring/
[7]: /synthetics/test_suites/#service-level-objectives
[8]: /session_replay/
