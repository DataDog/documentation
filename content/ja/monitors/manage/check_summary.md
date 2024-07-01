---
title: Check Summary
description: "See the list of all your checks reporting to Datadog."
aliases:
- /monitors/check_summary/
further_reading:
- link: /monitors/
  tag: Documentation
  text: Learn how to create a monitor
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/manage/
  tag: Documentation
  text: Manage your monitors
---

## Overview

Datadog checks report a status on each run. The [check summary page][1] displays your checks reported in the past day. Potential statuses are:

- `OK`
- `WARNING`
- `CRITICAL`
- `UNKNOWN`

## Search

To find a specific check, use the `filter checks` search box on the check summary page. Click on a check name to see the statuses and tags associated with the check. Filter the list further by using the `filter checks` search box inside the check panel:

{{< img src="monitors/check_summary/check_search.png" alt="Check details" style="width:100%;">}}

## Dashboards

To view your check status on a dashboard, utilize the [Check Status Widget][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/check/summary
[2]: /dashboards/widgets/check_status/
