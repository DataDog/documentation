---
title: Get a service level objective's history
type: apicontent
order: 29.03
external_redirect: /api/#get-a-service-level-objective-s-history
---

## Get a service level objective's history

Get a specific SLO's history, regardless of it's SLO type.

The detailed history data is structured according to the source data type. For example, metric data is included
for `event` SLOs that use the `metric` source, and `monitor` SLO types include the monitor transition history.

**Note:** There will be different response formats for event based and time based SLO's.  Examples of both are shown.

**ARGUMENTS**:

This endpoint takes no JSON arguments.
