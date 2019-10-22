---
title: Logs Indexes
type: apicontent
order: 24
external_redirect: /api/#logs-indexes
---

## Logs Indexes

<div class="alert alert-warning">
This endpoint is in public beta and not supported in Datadog's client libraries. If you have any feedback, <a href="/help">contact Datadog support</a>.
</div>

The `Index` object describes the configuration of a log index. It has the following attributes:

* **`name`** (Read Only):
    The name of the index.
* **`filter.query`** :
    Only logs matching the filter criteria are considered for this index.
    The search query followis the [Log search syntax][1]
* **`num_retention_days`** (Read Only) :
    The number of days before logs are deleted from this index
* **`daily_limit`** (Read Only) :
    The number of log-events you can send in this index before you are rate-limited.
* **`is_rate_limited`** (Read Only) :
    A boolean stating if the index is rate limited, meaning more logs than the daily limit have been sent. Rate limit is reset every-day at 2pm UTC.
* **`exclusion_filters`**
    An array of `ExclusionFilter` objects (see hereafter). The logs are tested against the query of each `ExclusionFilter`, following the order of the array. Only the first matching active `ExclusionFilter` matters, others (if any) are ignored.

  * **`name`** :
    The name of the exclusion filter
  * **`is_enabled`** :
    A boolean stating if the exclusion is active (will eventually exclude logs) or not.
  * **`filter.query`** :
    Only logs matching the filter criteria AND the query of the parent index will be considered for this exclusion filter.
    The search query follows the [Log search syntax][1]
  * **`filter.sample_rate`** :
    The fraction of logs excluded by the exclusion filter, when active. The sampling is uniform.

**Note**:  You need an API and applications key with Admin right to interact with this endpoint.

[1]: https://docs.datadoghq.com/logs/explorer/search/#search-syntax
