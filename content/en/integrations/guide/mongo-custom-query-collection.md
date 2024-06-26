---
title: Collect MongoDB Custom Metrics
kind: guide
further_reading:
- link: "/integrations/mongo/"
  tag: "Documentation"
  text: "Learn about the MongoDB integration"
---

## Overview

To collect custom metrics with the [MongoDB integration][8], use the `custom_queries` option in the `conf.d/mongo.d/conf.yaml` file at the root of your [Agent's configuration directory][1]. See the sample [mongo.d/conf.yaml][2] for more details.

## Configuration

`custom_queries` has the following options:

* **`metric_prefix`**: Each metric starts with the chosen prefix.
* **`query`**: This is the [Mongo runCommand][3] query to execute as a JSON object. **Note**: The Agent only supports `count`, `find`, and `aggregates` queries.
* **`database`**: This is the MongoDB database to collect metrics from.
* **`fields`**: Ignored for `count` queries. This is a list representing each field with no specific order. Ignores unspecified and missing fields. There are three required pieces of data for each `fields`:
  * `field_name`: This is the name of the field from which to fetch the data.
  * `name`: This is the suffix to append to the metric_prefix to form the full metric name. If `type` is `tag`, this column is treated as a tag and applied to every metric collected by this particular query.
  * `type`: This is the submission method (`gauge`, `count`, `rate`, and more). This can also be set to `tag` to tag each metric in the row with the name and value of the item in this column. You can use the `count` type to perform aggregation for queries that return multiple rows with the same or no tags.
* **`tags`**: A list of tags to apply to each metric (as specified above).
* **`count_type`**: For `count` queries only, this is the submission method (`gauge`, `count`, `rate`, and more) of the count result. Ignored for non-count queries.

## Examples

For the examples below, the following Mongo collection `user_collection` is used:

```text
{ name: "foo", id: 12345, active: true, age:45, is_admin: true}
{ name: "bar", id: 67890, active: false, age:25, is_admin: true}
{ name: "foobar", id: 16273, active: true, age:35, is_admin: false}
```

Choose the type of query you would like to see an example for:

{{< tabs >}}
{{% tab "Count" %}}

To monitor how many users are active at a given time, your [Mongo count command][1] would be:

```text
db.runCommand( {count: user_collection, query: {active:true}})
```

Which would correspond to the following `custom_queries` YAML configuration inside your `mongo.d/conf.yaml` file:

```yaml
custom_queries:
  - metric_prefix: mongo.users
    query: {"count": "user_collection", "query": {"active":"true"}}
    count_type: gauge
    tags:
      - user:active
```

This would emit one `gauge` metric `mongo.users` with one tag: `user:active`.

**Note**: The [metric type][2] defined is `gauge`.

[1]: https://docs.mongodb.com/manual/reference/command/count/#dbcmd.count
[2]: /metrics/types/
{{% /tab %}}
{{% tab "Find" %}}

To monitor the age per user, your [Mongo find command][1] would be:

```text
db.runCommand( {find: user_collection, filter: {active:true} )
```

Which would correspond to the following `custom_queries` YAML configuration inside your `mongo.d/conf.yaml` file:

```yaml
custom_queries:
  - metric_prefix: mongo.example2
    query: {"find": "user_collection", "filter": {"active":"true"}}
    fields:
      - field_name: name
        name: name
        type: tag
      - field_name: age
        name: user.age
        type: gauge

```

This would emit one `gauge` metric `mongo.example2.user.age` with two tags: `name:foo` and `name:foobar`

**Note**: The [metric type][2] defined is `gauge`.

[1]: https://docs.mongodb.com/manual/reference/command/find/#dbcmd.find
[2]: /metrics/types/
{{% /tab %}}
{{% tab "Aggregate" %}}

To monitor the average age for an admin and a non-admin user, your [Mongo aggregate command][1] would be:

```text
db.runCommand(
              {
                'aggregate': "user_collection",
                'pipeline': [
                  {"$match": {"active": "true"}},
                  {"$group": {"_id": "$is_admin", "age_avg": {"$avg": "$age"}}}
                ],
                'cursor': {}
              }
            )
```

Which would correspond to the following `custom_queries` YAML configuration inside your `mongo.d/conf.yaml` file:

```yaml
custom_queries:
  - metric_prefix: mongo.example3
    query: {"aggregate": "user_collection","pipeline": [{"$match": {"active": "true"}},{"$group": {"_id": "$is_admin", "age_avg": {"$avg": "$age"}}}],"cursor": {}}
    fields:
      - field_name: age_avg
        name: user.age
        type: gauge
      - field_name: _id
        name: is_admin
        type: tag
    tags:
      - test:mongodb
```

This would emit one `gauge` metric `mongo.example3.user.age` with two tags: `is_admin:true` and `is_admin:false` representing the average age of users for each tags.

[1]: https://docs.mongodb.com/manual/reference/command/aggregate/#dbcmd.aggregate
{{% /tab %}}
{{< /tabs >}}

**Note**: After updating the Mongo YAML file, [restart the Datadog Agent][4].

### Validation

To verify the result, search for the metrics using the [Metrics Explorer][5].

### Debugging

[Run the Agent's status subcommand][6] and look for `mongo` under the Checks section. Additionally, the [Agent's logs][7] may provide useful information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[3]: https://docs.mongodb.com/manual/reference/command
[4]: /agent/guide/agent-commands/#restart-the-agent
[5]: /metrics/explorer/
[6]: /agent/guide/agent-commands/#agent-status-and-information
[7]: /agent/guide/agent-log-files/
[8]: /integrations/mongodb