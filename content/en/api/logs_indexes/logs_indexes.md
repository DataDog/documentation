---
title: Logs Indexes
type: apicontent
order: 23
external_redirect: /api/#logs-indexes
---

## Logs Indexes

### Objects

#### Index

The `Index` object describes the configuration of an log index. It has the following attributes:

* **`name`** (Read Only):
    The name of the index.
* **`filter.query`** :
    Only logs matching the filter criteria will be considered for this index.
    The search query followis the [Log search syntax][1]
* **`num_retention_days`** (Read Only) :
    The number of days before logs are deleted from this index
* **`daily_limit`** (Read Only) :
    The amount of log-events you can send in this index before you are rate-limited.
* **`is_rate_limited`** (Read Only) :
    A boolean stating if the index is rate limited, meaning more logs than the daily limit have been sent. Rate limit is reset every-day at 2pm UTC.
* **`exclusion_filters`**
    An array of `ExclusionFilter` objects (see hereafter). The logs are tested against the query of each `ExclusionFilter`, following the order of the array. Only the first matching active `ExclusionFilter` matters, others (if any) are ignored.

```javascript
{
  "name": "team-a-index",
  "filter": {
    "query": "team:a"
  },
  "num_retention_days": 25,
  "daily_limit": 200000000,
  "is_rate_limited": true,
  "exclusion_filters": [
    {
      "name": "exclude most debug logs",
      "is_enabled": true,
      "filter": {"query": "status:debug","sample_rate": 0.999 }
    },
    {
      "name": "Exclude logs from service a',
      "is_enabled": true,
      "filter": { "query": "service:a status:debug", "sample_rate": 1 }
    }
  ]
}
```

#### Index Update

The `IndexUpdate` object is the object to be passed to update an index along with its exclusion filters of an index. It corresponds to the `Index` object without its read-only parameters.

```javascript
{
  "filter": {
    "query": "team:a"
  },
  "exclusion_filters": [
    {
      "name": "exclude most debug logs",
      "is_enabled": true,
      "filter": {"query": "status:debug","sample_rate": 0.999 }
    },
    {
      "name": "Exclude logs from service a',
      "is_enabled": true,
      "filter": { "query": "service:a status:debug", "sample_rate": 1 }
    }
  ]
}
```

#### Exclusion Filter

The `ExclusionFilter` object describes the configuration of an [exclusion filter][2]. It has the following attributes:

* **`name`** :
    The name of the exclusion filter
* **`is_enabled`** :
    A boolean stating if the exclusion is active (will eventually exclude logs) or not.
* **`filter.query`** :
    Only logs matching the filter criteria AND the query of the parent index will be considered for this exclusion filter.
    The search query follows the [Log search syntax][1]
* **`filter.sample_rate`** :
    The fraction of logs actually excluded by the exclusion filter, when active. The sampling is uniform.

```javascript
{
  "name": "exclude most debug logs",
  "is_enabled": true,
  "filter": {"query": "status:debug","sample_rate": 0.999 }
}
```

#### Index Order

The `IndexOrder` object has a single attribute `index-names` which is an array of `Strings` identifying by their name(s) the index(es) of your organisation. Logs are tested against the query filter of each index one by one, following the order of the array. Logs are eventually stored in the first matching index.

```javascript
{
  index_names: [ 'index-1', 'index-2', 'index-3' ]
}
```

### Index-Order Endpoints

The index order endpoints are for controlling the _order_ in which an organisation's indexes are processed. You'll use this endpoint only if you have more than one index for logs in your organisation. Note that this index cannot be used to add or delete indexes.


[1]: https://docs.datadoghq.com/logs/explorer/search/#search-syntax
[2]: https://docs.datadoghq.com/logs/logging_without_limits/#exclusion-filters
