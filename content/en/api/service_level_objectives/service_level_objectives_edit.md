---
title: Edit a Service Level Objective
type: apicontent
order: 30.03
external_redirect: /api/#edit-a-service-level-objective
---

## Edit A Service Level Objective

**ARGUMENTS**:

* **`name`** [*required, optional on edit*]:
    The name of the SLO.
* **`description`** [*optional*, *default*=**dynamic, based on query**]:
    A description of the SLO.
* **`tags`** [*optional*, *default*=**None**]:
    A list of tags to associate with your SLO.
* **`thresholds`** [*optional*, *default*=**None**]:
    A list of Target thresholds, do not specify if not changing.
    
    * **`timeframe`** [*required*]: 
        The timeframe to apply to the target value. Valid options are `7d`, `30d`, `90d`.
    * **`target`** [*required*]:
        The target value to associate with the SLI that defines the SLO.
    * **`target_displauy`** [*optional*, *default* = **dynamic, based on query**]:
        The target display value that includes the requires level of precision.
    * **`warning`** [*optional*, *default* = **none**]:
        A warning target value to indicate when the SLI is close to breaching the `target`.
    * **`warning_display`** [*optional*, *default* = **dynamic, based on query**]:
        A warning target display value that includes the requires level of precision.

## Monitor Based SLO

For more information, see [Monitor SLOs][1].

* **`monitor_ids`** [*required*, *default* = **empty list**]:
    Specify up to 20 monitor IDs directly for a monitor-based SLO. You can optionally on-create-dynamically select
    monitor IDs using the following option instead:
* **`groups`** [*optional*, *default* = **empty list**]:
    **Note: Only valid on single monitor SLOs** Specify the selected groups as a sub query of the selected monitor.

## Event Based SLO

There is one type of event based SLO, a metric query. For more information, see [Event SLOs][2].

### Metric Query

* **`query`** [*required*]:
    The query defines the event-based SLO query. It requires two arguments:
    
    * **`numerator`** [*required*]:
        Defines the sum of the `good` events.
    * **`denominator`** [*required*]:
        Defines the sum of the `total` events. **Note: this should always be >= `good` events**

[1]: /monitors/service_level_objectives/monitor
[2]: /monitors/service_level_objectives/event
