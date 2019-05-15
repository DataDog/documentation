---
title: Logs Pipelines
type: apicontent
order: 24
external_redirect: /api/#logs-pipelines
---

## Logs Pipelines

## Configure Pipelines & Processors

Pipelines and processors operate on incoming logs, parsing and transforming them into structured attributes for easier querying.

* See the [Pipelines Configuration Page][1] to see the pipelines and processors currently configured in our UI.
* See user [documentation here][2]


### Pipeline Order Endpoint

The pipeline order endpoints are for controlling the _order_ in which an organisation's pipelines are processed.

/!\ Logs are processed sequentially. Reordering a pipeline may change the structure and content of the data processed by other pipelines and their processors.

##### Signature

Action | Verb | Path | Payload | Response |
------ | ---- | ---- | ------- | -------- |
Get Pipeline Order | `GET` | `/api/v1/logs/config/pipeline-order` | \<none> | `[PipelineOrder]`
Update Pipeline Order | `PUT` | `/api/v1/logs/config/pipeline-order` | `[PipelineOrder]` | `[PipelineOrder]`

##### Structure

`[PipelineOrder]`
```javascript
{
  pipeline_ids: [ 'pipeline-1', 'pipeline-2', 'pipeline-3' ]
}
```

##### Errors
- The `PUT` will be rejected with:
  - `400` if the payload does not contain a `pipeline_ids` entry or if the entry is not an array of strings.
  - `422` if the `pipeline_ids` in the payload does not contain each and every id in the current pipeline order exactly once (it can not be used to add/copy/delete pipelines, nor to do partial reordering)
- `405` if users try to `POST` or `DELETE` to `/api/v1/logs/config/pipeline-order`


### Pipelines Endpoint


##### Signature

Action | Verb | Path | Payload | Response |
------ | ---- | ---- | ------- | -------- |
Get All Pipelines | `GET` | `/api/v1/logs/config/pipelines` | \<none> | `Array<[Pipeline]>` |
Create Pipeline | `POST` | `/api/v1/logs/config/pipelines` | `[Pipeline]` | `[Pipeline]` |
Read Pipeline | `GET` | `/api/v1/logs/config/pipelines/{id}` | \<none> | `[Pipeline]` |
Update Pipeline | `PUT` | `/api/v1/logs/config/pipelines/{id}` | `[Pipeline]` | `[Pipeline]` |
Delete Pipeline | `DELETE` | `/api/v1/logs/config/pipelines/{id}` | \<none> | \<none>


##### Structure

`[Pipeline]`
```javascript
{
  id: 'xoK8GRgSQYCmnyvJc4Gv5g' // [Read Only] Unique identifier -- Attributed by server.
  type: 'pipeline'             // [Read Only] For disambiguating processors and nested pipelines
  name: 'Java'                 // Name of the pipeline, for display only.
  is_enabled: true             // True if this pipeline is enabled and processing logs.
  is_read_only: true           // [Read Only] True if this pipeline can not be modified

  // Only logs that match the filter criteria will be processed by this pipeline.
  filter: {
    query: "source:java"       // A query string. For search query syntax, see:
                               // https://docs.datadoghq.com/logs/explorer/search/
  }

  // Ordered list of child processors and nested pipelines (see below for definition)
  processors: [
    {
      name: 'Parsing Java Default formats'  // Name of the processor, for display only.
      type: 'grok-parser'                   // Type of processor. See below for options.
      is_enabled: true                      // True if this processor is enabled and processing logs.
      // For the many other Processor-specific properties, see below
    }
    {
      name: 'Define timestamp as the official timestamp of the log'
      type: 'date-remapper'
      ...
    }
    {
      name: 'Define level as the official status of the log'
      type: 'status-remapper'
      ...
    }
  ]
}
```


##### Errors
- The `POST` and `PUT` operation will be rejected with:
  - `400` if the `[Pipeline]` in the payload contains read-only values.
  - `400` if the `[Pipeline]` in the payload does not contain all user-modifiable values.
- The `DELETE` operation will be rejected with `403` if it is called on a read only pipeline.


##### Notes
- `is_read_only`: At the time of writing, this property is synonymous with "is an integration pipeline". Users can never set the `is_read_only` field themselves and it will always be false on all user-created pipelines. Integration Pipelines are created manually on the backend for each new Datadog Logs Integration. They are added (by _reference_) to an org's configuration when we detect the technology being used.
- A Pipeline can contain many Processors, and Processors are executed _in order_.
- Nested Pipelines:
  - Pipelines may also contain _Nested Pipelines (NP)_ which themselves may contain lists of ordered Processors.
  - NPs have exactly the same structure/properties as pipelines, except they themselves can *not* contain NPs in their list of processors (we only allow one level of nesting).
[1]: https://app.datadoghq.com/logs/pipelines
[2]: https://docs.datadoghq.com/logs/processing
