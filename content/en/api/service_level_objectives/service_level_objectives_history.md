---
title: Get a SLO's history
type: apicontent
order: 30.03
external_redirect: /api/#get-a-slo-s-history
---

## Get a SLO's history

<div class="alert alert-warning">
This endpoint is in beta. If you have any feedback, <a href="/help">contact Datadog support</a>.
</div>

Get a specific SLO's history, regardless of it's SLO type.

The detailed history data is structured according to the source data type. For example, metric data is included
for `event` SLOs that use the `metric` source, and `monitor` SLO types include the monitor transition history.

**Note:** There are different response formats for event based and time based SLO's. Examples of both are shown.

**ARGUMENTS**:

This endpoint takes no JSON arguments.
