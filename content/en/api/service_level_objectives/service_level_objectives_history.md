---
title: Get an SLO's history
type: apicontent
order: 30.03
external_redirect: /api/#get-an-slo-s-history
---

## Get an SLO's history

<div class="alert alert-warning">
This endpoint is in beta and subject to change. If you have any feedback, <a href="/help">contact Datadog support</a>.
</div>

Get a specific SLO's history, regardless of its SLO type.

The detailed history data is structured according to the source data type. For example, metric data is included
for `event` SLOs that use the `metric` source, and `monitor` SLO types include the monitor transition history.

**Note:** There are different response formats for event based and time based SLOs. Examples of both are shown.

**ARGUMENTS**:

This endpoint takes no JSON arguments.
