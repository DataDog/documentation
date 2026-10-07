---
title: Roles and Permissions
description: "Review the roles, permissions, and restriction policies that control access to journeys and their linked assets."
further_reading:
- link: '/journey_monitoring/'
  tag: 'Documentation'
  text: 'Learn about Journey Monitoring'
- link: '/journey_monitoring/guide/configuring_journeys/'
  tag: 'Documentation'
  text: 'Configure journeys in Datadog Journey Monitoring'
- link: '/account_management/rbac/permissions/'
  tag: 'Documentation'
  text: 'Review the full list of Datadog role permissions'
---

## Overview

A journey connects assets from Product Analytics, RUM, and Synthetic Monitoring. Most actions require both a Journey Monitoring permission and the permission for the underlying asset the action touches.

## Create and edit journeys

| Action | Required access |
|--------|-----------------|
| Create or edit a journey | [Journey Monitoring write][perms] |
| Create a journey's Synthetic test suite | [Journey Monitoring write][perms] and Synthetic Monitoring write |
| Add or edit the conversion rate monitor | [Journey Monitoring write][perms] and monitor write |
| Add or edit the journey SLO | [Journey Monitoring write][perms] and SLO write |
| Edit strongly-linked RUM operations | [Journey Monitoring write][perms] and RUM write |

Asset creation is best-effort: creating a journey succeeds with [Journey Monitoring write][perms] access alone. Datadog creates a linked asset, such as the test suite, only when you also hold that asset's permission. Otherwise, Datadog skips it and you can add it later. A journey without a test suite is a valid state.

## View journeys and linked assets

| Action | Required access |
|--------|-----------------|
| View a journey and its details | [Journey Monitoring read][perms] and RUM read on the journey's RUM application |
| View a test suite, its tests, and uptime SLO | Synthetic Monitoring read and a read restriction policy on the suite |
| View strongly-linked RUM operations | [Journey Monitoring read][perms] and RUM read |
| View an operation's SLO | SLO read |
| View journey session replays | RUM read, subject to RUM data access controls |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[perms]: /account_management/rbac/permissions/#digital-experience-monitoring
