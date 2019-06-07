---
title: Collect Mongo Custom Metrics
kind: guide
further_reading:
- link: "/integrations/mongo/"
  tag: "Documentation"
  text: "Datadog-Mongo integration"
---

To collect custom metrics with the Datadog-Mongo integration, use the `custom_queries` option in the `conf.d/mongo.d/conf.yaml` file at the root of your [Agent's configuration directory][1]. See the sample [mongo.d/conf.yaml][2] for more details.

## Configuration

`custom_queries` has the following options:

| Option        | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|---------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| metric_prefix | Yes      | Each metric starts with the chosen prefix.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| query         | Yes      | This is the Mongo query to execute. The query needs to be written in a format compatible with only supports count, find and aggregates queries. The [Mongo runCommand][3]. <br> **Note**: The Agent only supports `count`, `find` and `aggregates` queries.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| field       | Yes      |Ignored for `count` queries. This is a list representing each field with no specific order. Unspecified and missing fields are ignored. There are 3 required pieces of data for each `field`:<br> - `field_name`: This is the name of the field from which to fetch the data.<br> -`name`: This is the suffix to append to the metric_prefix in order to form the full metric name. If `type` is `tag`, this column is instead considered as a tag that is applied to every metric collected by this particular query. <br> -`type`: This is the submission method (`gauge`, `count`, `rate`, etc..). This can also be set to `tag` to tag each metric in the row with the name and value of the item in this column. You can use the `count` type to perform aggregation for queries that return multiple rows with the same or no tags. |
| tags          | No       | A list of tags to apply to each metric (as specified above).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| count_type | No | For `count` queries only, this is the submission method (`gauge`, `count`, `rate`, etc...) of the count result. Ignored for non count queries. | 


## Examples

For the examples below, the following mongo collection `user_collection` is used:

```
{ user: "foo", id: 12345, active: true }
{ user: "bar", id: 67890, active: false}
{ user: "foobar", id: 16273, active: true}
```

Choose the type of query you would like to see an example for:

{{< tabs >}}
{{% tab "Count" %}}

To monitor how many users are active at a given time for example. Your [Mongo command][1] would be:

```
db.runCommand( {count: user_collection, query: {active:true}})
```

Which would correspond to the following `custom_queries` YAML configuration inside your `mongo.d/conf.yaml` file:

```
custom_queries:
  - metric_prefix: mongo.users
    query:
      count: user_collection
      query:
        '1':
          "$active": true
    count_type: gauge
    tags:
      - user:active
```

[1]: https://docs.mongodb.com/manual/reference/command
{{% /tab %}}
{{% tab "Find" %}}

Your [Mongo command][1] would be:

```
db.runCommand( {})
```

Which would correspond to the following `custom_queries` YAML configuration inside your `mongo.d/conf.yaml` file:

```
custom_queries:
  - metric_prefix: mongo.example2
    query:
        find: <COLLECTION_NAME>
        filter:
            qty:
              "$gt": 30
        sort:
            qty: -1
    fields:
      - field_name: status
        name: status_tag
        type: tag
      - field_name: qty
        name: qty
        type: gauge

```

[1]: https://docs.mongodb.com/manual/reference/command
{{% /tab %}}
{{% tab "Aggregate" %}}

Your [Mongo command][1] would be:
```
db.runCommand( {})
```

Which would correspond to the following `custom_queries` YAML configuration inside your `mongo.d/conf.yaml` file:

```
custom_queries:
  - metric_prefix: mongo.example1
    query: # Same object as the one used in Mongo db.runCommand(<QUERY>)
      aggregate: <COLLECTION_NAME>
      pipeline:
        - $match:
            <FIELD_NAME>: <FIELD_VALUE>
        - $group:
            _id: <FIELD_NAME>
      cursor: {} # Cursor is required for aggregate, can be an empty object
    fields:
      - field_name: <FIELD_NAME>
        name: <METRIC_SUFFIX>
        type: <gauge|count|rate|monotonic_count>
      - field_name: _id
        name: cluster_id
        type: tag
    tags:
      - test:mongodb
```

[1]: https://docs.mongodb.com/manual/reference/command
{{% /tab %}}
{{< /tabs >}}

**Note**: After updating the Mongo YAML file, [restart the Datadog Agent][4].

### Validation

To verify the result, search for the metrics using the [Metrics Explorer][5]:

### Debugging

[Run the Agent's status subcommand][6] and look for `mongo` under the Checks section. Additionally, the [Agent's logs][7] may provide useful information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[3]: https://docs.mongodb.com/manual/reference/command
[4]: /agent/guide/agent-commands/?tab=agentv6#restart-the-agent
[5]: /graphing/metrics/explorer
[6]: /agent/guide/agent-commands/#agent-status-and-information
[7]: /agent/guide/agent-log-files
