---
title: Error Tracking Dynamic Sampling
kind: documentation
is_beta: true
description: Learn about how Dynamic Sampling in Error Tracking can make sure that your volume isn't consumed all at once.
further_reading:
- link: '/logs/manage_data_collection'
  tag: 'Documentation'
  text: 'Learn about managing your data in Error Tracking'
- link: '/logs/error_tracking'
  tag: 'Documentation'
  text: 'Learn about Error Tracking for Logs'
---

<div class="alert alert-info">
Dynamic Sampling for Error Tracking is in private beta.
</div>

## Overview

Dynamic Sampling establishes a threshold based on your daily rate limit and historical volume. If a single issue reaches that threshold, events from the issue will be dropped to keep your daily limit from being consumed too quickly.


## Requirements

A minimum daily rate limit of 12k events must be set for Dynamic Sampling to be active.

{{< img src="error_tracking/dynamic-sampling-rate-limit.png" alt="Error Tracking Rate Limit" style="width:90%" >}}


## Setup

Dynamic Sampling is automatically enabled with Error Tracking and can be disabled in your settings

## Getting started

Because Error Tracking bills based on the number of events, large increases in the events for a single issue can quickly consume your quota for the day. Dynamic Sampling mitigates this by establishing a threshold for the number of events sent per issues and drops them once that threshold is reached. 

Dynamic Sampling will automatically deactivate once the error rate of your issue decreases below the given threshold.

### Monitor Dynamic Sampling
A `Dynamic Sampling activated` event is generated when the Dynamic Sampling is applied to an issue. See the [Event Management documentation][1] for details on viewing and using events.

{{< img src="error_tracking/dynamic-sampling-event.png" alt="Error Tracking Rate Limit" style="width:90%" >}}

### Next steps when Dynamic Sampling is applied
When Dynamic Sampling is applied, we recommend taking the following steps:

* Check which issue is consuming your quota. The issue to which Dynamic Sampling is applied is linked in the event generated in Event Management
* If you'd like collect additional samples for this issue, raise your daily quota in the [Error Tracking Settings page][2].
* If you'd like to avoid collecting samples for this issue in the future, consider creating an [exclusion filter][3] to prevent additional events from being ingested into Error Tracking.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/events/
[2]: /logs/error_tracking/manage_data_collection#rate-limits
[3]: /logs/error_tracking/manage_data_collection#add-a-rule