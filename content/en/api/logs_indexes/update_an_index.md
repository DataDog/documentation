---
title: Update an Index
type: apicontent
order: 24.3
external_redirect: /api/#update-an-index
---

## Update an Index

<div class="alert alert-warning">
This endpoint is in public beta. If you have any feedback, <a href="/help">contact Datadog support</a>.
</div>

This endpoint updates an `Index` identified by its name. It returns the `Index` object passed in the request body when the request is successful.

**ARGUMENTS**:

**Note**: Using the `PUT` method updates your index's configuration by **replacing** your current configuration with the new one sent to your Datadog organization.

* **`filter.query`**  [*required*]:
    Only logs matching the filter criteria will be considered for this index. The search query followis the [Log search syntax][1]
* **`exclusion_filters`** An array of `ExclusionFilter` objects (see hereafter). The logs are tested against the query of each `ExclusionFilter`, following the order of the array. Only the first matching active `ExclusionFilter` matters, others (if any) are ignored. The `ExclusionFilter` object describes the configuration of an [exclusion filter][2]. It has the following attributes:

  * **`name`** [*required*]:
    The name of the exclusion filter
  * **`is_enabled`**  [*optional*, *default*=**False**]:
    A boolean stating if the exclusion is active.
  * **`filter.query`** [*optional*]:
    Only logs matching the filter criteria AND the query of the parent index will be considered for this exclusion filter. The search query follows the [Log search syntax][1]
  * **`filter.sample_rate`** [*required*]:
    The fraction of logs excluded by the exclusion filter, when active. The sampling is uniform.

[1]: /logs/explorer/search
[2]: /logs/indexes/#exclusion-filters
