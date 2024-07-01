---
title: DogStatsD Mapper
kind: documentation
description: Convert parts of statsd metric names to tags using mapping rules in DogStatsD.
further_reading:
    - link: developers/dogstatsd
      tag: Documentation
      text: Introduction to DogStatsD
    - link: developers/libraries
      tag: Documentation
      text: Official and Community created API and DogStatsD client libraries
---

With Agent v7.17+, the DogStatsD Mapper feature allows you to convert parts of a metric name submitted to DogStatsD to tags using mapping rules with wildcard and regex patterns. For example it allows you to transform the metric:

- `airflow.job.duration.<JOB_TYPE>.<JOB_NAME>`

into the metric `airflow.job.duration` with two associated tags:

- `job_type:<JOB_TYPE>`
- `job_name:<JOB_NAME>`.

To create a mapping rule:

1. [Open your `datadog.yaml` file][1].
2. Add a [mapping rule configuration block](#mapping-rule-configuration) under the `dogstatsd_mapper_profiles` parameter.

## Mapping rule configuration

A mapping rule block has the following layout:

```yaml
dogstatsd_mapper_profiles:
    - name: '<PROFILE_NAME>'
      prefix: '<PROFILE_PREFIX>'
      mappings:
          - match: '<METRIC_TO_MATCH>'
            match_type: '<MATCH_TYPE>'
            name: '<MAPPED_METRIC_NAME>'
            tags:
                '<TAG_KEY>': '<TAG_VALUE_TO_EXPAND>'
```

With the following placeholders:

| Placeholder             |  Definition                                                                                                                               | Required                |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
|  `<PROFILE_NAME>`       | A name to give to your mapping rule profile.                                                                                              | yes                     |
| `<PROFILE_PREFIX>`      | The metric name prefix associated to this profile.                                                                                        | yes                     |
| `<METRIC_TO_MATCH>`     | The metric name to extract groups from with the [Wildcard](#wildcard-match-pattern) or [Regex](#regex-match-pattern) match logic.         | yes                     |
| `<MATCH_TYPE>`          | The type of match to apply to the `<METRIC_TO_MATCH>`. Either [`wildcard`](#wildcard-match-pattern) or [`regex`](#regex-match-pattern)    | no, default: `wildcard` |
| `<MAPPED_METRIC_NAME>`  | The new metric name to send to Datadog with the tags defined in the same group.                                                           | yes                     |
| `<TAG_KEY>`             | The Tag key to associate to the tags collected.                                                                                           | no                      |
| `<TAG_VALUE_TO_EXPAND>` | The tags collected from the `<MATCH_TYPE>` to inline.                                                                                     | no                      |

## Wildcard match pattern

The wildcard match pattern matches dot-separated metric names using `*` as wildcard. The metric name must be only composed of alphanumeric, `.`, and `_` characters for this pattern to work. Groups extracted can then be expanded with one of the following:

- `$n` format: `$1`, `$2`, `$3`, etc.
- `${n}` format: `${1}`, `${2}`, `${3}`, etc.

For instance, if you have the metric `custom_metric.process.value_1.value_2` with the following mapping group configuration:

```yaml
dogstatsd_mapper_profiles:
    - name: my_custom_metric_profile
      prefix: custom_metric.
      mappings:
          - match: 'custom_metric.process.*.*'
            match_type: wildcard
            name: custom_metric.process
            tags:
                tag_key_1: '$1'
                tag_key_2: '$2'
```

It would send the metric `custom_metric.process` to Datadog with the tags `tag_key_1:value_1` and `tag_key_2:value_2`.

## Regex match pattern

The regex match pattern matches metric names using regex patterns. Compared to the wildcard match pattern, it allows to define captured groups that contain `.`. Groups extracted can then be expanded with one of the following:

- `$n` format: `$1`, `$2`, `$3`, etc.
- `${n}` format: `${1}`, `${2}`, `${3}`, etc.

For instance, if you have the metric `custom_metric.process.value_1.value.with.dots._2` with the following mapping group configuration:

```yaml
dogstatsd_mapper_profiles:
    - name: my_custom_metric_profile
      prefix: custom_metric.
      mappings:
          - match: 'custom_metric\.process\.([\w_]+)\.(.+)'
            match_type: regex
            name: custom_metric.process
            tags:
                tag_key_1: '$1'
                tag_key_2: '$2'
```

It would send the metric `custom_metric.process` to Datadog with the tags `tag_key_1:value_1` and `tag_key_2:value.with.dots._2`.

## Expand group in metric name

For the `regex` and `wildcard` match type, group collected can be expanded as tags value with an associated tag key as see above, but can also be used in the metric `name` parameter. For instance, if you have the metric `custom_metric.process.value_1.value_2` with the following mapping group configuration:

```yaml
dogstatsd_mapper_profiles:
    - name: my_custom_metric_profile
      prefix: custom_metric.
      mappings:
          - match: 'custom_metric.process.*.*'
            match_type: wildcard
            name: 'custom_metric.process.prod.$1.live'
            tags:
                tag_key_2: '$2'
```

It would send the metric `custom_metric.process.prod.value_1.live` to Datadog with the tag `tag_key_2:value_2`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
