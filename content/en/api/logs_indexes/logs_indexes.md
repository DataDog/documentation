---
title: Logs Indexes
type: apicontent
order: 23
external_redirect: /api/#logs-indexes
---

## Logs Indexes

https://docs.datadoghq.com/logs/logging_without_limits/#exclusion-filters

### Index-Order Endpoint

The index order endpoints are for controlling the _order_ in which an organisation's indexes are processed.

/!\ Logs are only stored in one index and they are routed sequentially through the index list to the first index with a matching filter. Re-ordering them may change the distribution of logs.

`[IndexOrder]`
```javascript
{
  index_names: [ 'index-1', 'index-2', 'index-3' ]
}
```

Action | Verb | Path | Payload | Response | Notes
------ | ---- | ---- | ------- | -------- | -----
Get Index Order | `GET` | `/api/v1/logs/config/index-order` | \<none> | `[IndexOrder]`
Update Index Order | `PUT` | `/api/v1/logs/config/index-order` | `[IndexOrder]` | `[IndexOrder]`

Errors:
- The `PUT` will be rejected with:
  - `400` if the payload does not contain an `index_names` entry or if the entry is not an array of strings.
  - `422` if the `index_names` in the payload does not contain each and every id in the current index order exactly once (it can not be used to add/copy/delete indexes, nor to do partial reordering)

### Indexes Endpoint


##### Signature

Action | Verb | Path | Payload | Response
------ | ---- | ---- | ------- | --------
Get All Indexes | `GET` | `/api/v1/logs/config/indexes` | \<none> | `Array<[Index]>` |
Read Index | `GET` | `/api/v1/logs/config/indexes/{index_name}` | \<none> | `[Index]` |
Update Index | `PUT` | `/api/v1/logs/config/indexes/{index_name}` | `[Index]` | `[Index]` |


##### Structure

`[Index]`
```javascript
{
  name: "team-a-index"          // [Read Only] Name for the index

  // Only logs that match the filter criteria will be considered for this index.
  filter: {
    query: "team:a"             // A query string. For search query syntax, see:
                                // https://docs.datadoghq.com/logs/explorer/search/
  }


  num_retention_days: 25        // [Read Only] The number of days before logs are removed from this
                                //             index.
  daily_limit: 123456789        // [Read Only] The daily limit in lines for this index.
  is_rate_limited: true         // [Read Only] True if the index is currently dropping all logs
                                //             because it has reached its daily limit.

  // Ordered list of exclusion filters to apply before saving logs in this index.
  exclusion_filters: [
    {
      name: 'Exclude almost all debug logs'  // Name of the exclusion filter, for display only.
      is_enabled: true                       // True if this exclusion filter is enabled and processing logs.

      // Only logs that match the filter criteria will be excluded by this exclusion filter.
      filter: {
        query: 'status:debug'                // A query string. For search query syntax, see:
                                             // https://docs.datadoghq.com/logs/explorer/search/
        sample_rate: 0.994                   // A rate between 0 and 1 at which to (arbitrarily)
                                             // drop logs.
      }
    },
    {
      name: 'Exclude all info logs from service a'
      is_enabled: true
      filter: { query: 'service:a status:debug', sample_rate: 1 }
    },
    ...
  ]
}
```

##### Errors

- The `PUT` operation will be rejected with:
  - `400` if the `[Index]` in the payload contains read-only values.
  - `400` if the `[Index]` in the payload does not contain all user-modifiable values.


##### Notes

- Index creation or deletion is not enabled yet trhough API.
- An Index can contain many ExclusionFilters, and they are executed _in order_.
