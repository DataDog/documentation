---
title: Create a SLO
type: apicontent
order: 29.01
external_redirect: /api/#create-a-slo
---

## Create a service level objective

Create a JSON to define your SLO.

**ARGUMENTS**:

* **`type`** [*required*]:
    The type of the SLO, chosen from:

| SLO Type     | supported value             |
|:-------------|:---------------------------------|
| [event][1]       | `metric`                         |
| [monitor][2]      | `monitor`                        |

* **`name`** [*required*, *default* = **dynamic, based on query**]:
    The name of the SLO.
* **`description`** [*optional*, *default* = **empty**]:
    A description of the SLO.
* **`tags`** [*optional*, *default* = **empty list**]:
    A list of tags to associate with your SLO.
* **`thresholds`** [*required*]:
    A list of Target thresholds, requires at least 1.
    
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

### Monitor Based SLO

For more information, see [Monitor SLOs][1].

* **`monitor_ids`** [*required*, *default* = **empty list**]:
    Specify up to 20 monitor IDs directly for a monitor-based SLO. You can optionally on-create-dynamically select
    monitor IDs using the following option instead:
* **`monitor_search`** [*optional*]:
    Optional way to specify monitor IDs on create is to use a monitor search. On first create or edit, it will dynamically
    search for the provided parameters and select up to the first 50 monitors matching the query.
* **`groups`** [*optional*, *default* = **empty list**]:
    **Note: Only valid on single monitor SLOs** Specify the selected groups as a sub query of the selected monitor.

### Event Based SLOs  

There is one type of event based SLO, a metric query. For more information, see [Event SLOs][2].

#### Metric Query

* **`query`** [*required*]:
    The query defines the metric-based SLO query. It requires two arguments:
    
    * **`numerator`** [*required*]:
        Defines the sum of the `good` events
    * **`denominator`** [*required*]:
        Defines the sum of the `total` events. **Note: this should always be >= `good` events**


[1]: /monitors/service_level_objectives/monitor
[2]: /monitors/service_level_objectives/event
