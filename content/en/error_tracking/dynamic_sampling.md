---
title: Error Tracking Dynamic Sampling
is_beta: false
private: false
description: Learn about how Dynamic Sampling in Error Tracking can make sure that your volume isn't consumed all at once.
further_reading:
- link: '/logs/error_tracking/manage_data_collection'
  tag: 'Documentation'
  text: 'Learn about managing your data in Error Tracking'
- link: '/logs/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking for Logs'
---

## Overview

Because Error Tracking billing is based on the number of events, large increases in the events for a single issue can quickly consume your quota for the day. Dynamic Sampling mitigates this by establishing a threshold for the number of events sent per issue, dropping events when that threshold is reached. Dynamic Sampling automatically deactivates when the error rate of your issue decreases below the given threshold.

## Setup

Dynamic Sampling is automatically enabled with Error Tracking with default intake threshold based on your daily rate limit and historical volume.

For best results, set up a daily rate limit on the [Error Tracking Rate Limits page][2]: Click **Edit Rate Limit** and enter a new value.

{{< img src="error_tracking/dynamic-sampling-rate-limit.png" alt="Error Tracking Rate Limit" style="width:90%" >}}

## Monitor Dynamic Sampling

A `Dynamic Sampling activated` event is generated when Dynamic Sampling is applied to an issue. See the [Event Management documentation][1] for details on viewing and using events.

{{< img src="error_tracking/dynamic-sampling-event.png" alt="Error Tracking Rate Limit" style="width:90%" >}}

### Investigation and mitigation steps

When Dynamic Sampling is applied, the following steps are recommended:

- Check which issue is consuming your quota. The issue to which Dynamic Sampling is applied is linked in the event generated in Event Management.
- If you'd like collect additional samples for this issue, raise your daily quota on the [Error Tracking Rate Limits page][2].
- If you'd like to avoid collecting samples for this issue in the future, consider creating an [exclusion filter][3] to prevent additional events from being ingested into Error Tracking.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/events/
[2]: https://app.datadoghq.com/error-tracking/settings/rate-limits
[3]: /logs/error_tracking/manage_data_collection#add-a-rule
[4]: https://app.datadoghq.com/error-tracking/settings
