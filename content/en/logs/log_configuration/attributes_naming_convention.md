---
title: Attributes and Aliasing
kind: documentation
description: 'Learn about attributes and how to support a naming convention'
aliases:
  - /logs/processing/attributes_naming_convention/
further_reading:
    - link: 'logs/log_configuration/pipelines'
      tag: 'Documentation'
      text: 'Discover Datadog Pipelines'
    - link: 'logs/log_configuration/processors'
      tag: 'Documentation'
      text: 'Consult the full list of available Processors'
    - link: 'logs/logging_without_limits'
      tag: 'Documentation'
      text: 'Logging without limit'
    - link: 'logs/explorer'
      tag: 'Documentation'
      text: 'Learn how to explore your logs'
    - link: "https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/"
      tag: "Blog"
      text: "Use CIDR notation queries to filter your network traffic logs"
---

## Overview

Centralizing logs from various technologies and applications can generate tens or hundreds of different attributes in a Log Management environment, especially when many teams are working within the same environment.

For instance, a client IP may have various log attributes, such as `clientIP`, `client_ip_address`, `remote_address`, `client.ip`, and so on. The execution time of a request may be referred to as `exec_time`, `request_latency`, `request.time_elapsed`, and so on.

Use **attributes** and **aliasing** to unify your Logs environment.

## Attribute types and aliasing

Attributes prescribe [logs facets][1] and [tags][2], which are used for filtering and searching in Log Explorer.

  * [**Reserved attributes**](#reserved-attributes) are automatically ingested.

  * [**Standard attributes**](#standard-attributes) are the backbone of the naming convention for your organization. There is a default set of standard attributes available in [the app][3]. However, this list can be customized to create a **naming convention** for your team.

  * Use [**Aliasing**](#aliasing) once you've implemented a naming convention with standard attributes or if you're trying to create a unique standard facet from multiple log sources. For example, follow the clients most impacted by latencies on a hybrid [Apache][4] and [Amazon Cloud Front][5] infrastructure, using the standard `Network Client IP` facet alongside the standard `duration`. Aliasing allows implementation of a naming convention without having to change a team's technical stack.

## Reserved attributes

Below is a list of reserved attributes that are automatically ingested with logs.

**Note**: If you're also collecting traces or metrics, it is recommended to configure unified service tagging. This configuration ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. Refer to the dedicated [unified service tagging][6] documentation for more information.

| Attribute | Description                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | The name of the originating host as defined in metrics. Datadog automatically retrieves corresponding host tags from the matching host in Datadog and applies them to your logs. The Agent sets this value automatically.                          |
| `source`  | This corresponds to the integration name, the technology from which the log originated. When it matches an integration name, Datadog automatically installs the corresponding parsers and facets. For example, `nginx`, `postgresql`, and so on. |
| `status`  | This corresponds to the level/severity of a log. It is used to define [patterns][7] and has a dedicated layout in the Datadog Log UI.                                                                                                     |
| `service` | The name of the application or service generating the log events. It is used to switch from Logs to APM, so make sure you define the same value when you use both products.                                                                |
| `trace_id` | This corresponds to the Trace ID used for traces. It is used to [correlate your log with its trace][8].                                                                                                                                 |
| `message` | By default, Datadog ingests the value of the `message` attribute as the body of the log entry. That value is then highlighted and displayed in Live Tail, where it is indexed for full text search.                                    |

## Standard attributes

Log integrations natively rely on a [default set][9] of standard attributes.

Admin users in your organization can curate the list:

- From the [Log Explorer][1]: **Promote** existing attributes as standard attributes.
- From the standard attribute [configuration page][3]: **Create** new standard attributes.

{{< img src="logs/processing/attribute_naming_convention/standard_attribute_config.png" alt="Standard Attributes" style="width:60%;">}}

The standard attribute table comes with a set of [predefined standard attributes](#default-standard-attribute-list). You can append that list with your own attributes, and edit or delete existing standard attributes:

{{< img src="logs/processing/attribute_naming_convention/edit_standard_attributes.png" alt="Edit standard attributes" style="width:80%;">}}

A standard attribute is defined by its:

- `Path`: The path of the attribute **promoted** as a standard attribute, as you would find it in your JSON (for example, `network.client.ip`).
- `Type`: (`string`, `integer`, `double`, `boolean`): The type of the attribute, which is used to cast elements of the remapping list.
- `Aliasing list`: Comma separated list of attributes that should be **aliased** to it.
- `Description`: Human readable description of the attribute.

The standard attribute panel appears when you add a new standard attribute or edit an existing one:

{{< img src="logs/processing/attribute_naming_convention/define_standard_attribute.png" alt="Define Standard attribute" style="width:80%;">}}

### Default standard attribute list

See the full list of [Log Management Default Standard Attributes][9], which is split into the functional domains:

- [Network/communications][10]
  - These attributes are related to the data used in network communication. All fields and metrics are prefixed by `network`.
- [Geolocation][11]
  - These attributes are related to the geolocation of IP addresses used in network communication. All fields are prefixed by `network.client.geoip` or `network.destination.geoip`.
- [HTTP Requests][12]
  - These attributes are related to data commonly used in HTTP requests and accesses. All attributes are prefixed by `http`.
  - Typical integrations relying on these attributes include [Apache][4], Rails, [AWS CloudFront][13], web applications servers, and so forth.
  - URL details attributes are prefixed by `http.url_details`. These attributes provide details about the parsed parts of the HTTP URL. They are generated by the [URL parser][14].
- [Source code][15]
  - These attributes are related to data used when a log or an error is generated using a logger in a custom application. All attributes are prefixed either by `logger` or `error`.
  - Typical integrations relying on these attributes are Java, NodeJs, .NET, Golang, Python, and so on.
- [Database][16]
  - Typical integrations relying on these attributes are [Cassandra][17], [MySQL][18], [RDS][19], [Elasticsearch][20], and so on.
- [Performance][21]
  - These attributes are related to performance metrics. Datadog recommends [remapping][22] any durations within your logs on this attribute since they are displayed and used as a default [measure][1] for [trace search][23].
- [User related attributes][24]
  - All attributes and measures are prefixed by `usr`.
- [Syslog and log shippers][25]
  - These attributes are related to the data added by a syslog or a log-shipper agent. All fields and metrics are prefixed by `syslog`.
  - Integrations that rely on these include [Rsyslog][26], [NxLog][27], [Syslog-ng][28], [Fluentd][29], and [Logstash][30].
- [DNS][31]
  - All attributes and measures are prefixed by `dns`.
- [Events][32]
  - All attributes are prefixed by `evt`.

## Aliasing

Creating an alias for a source attribute that maps to a destination attribute allows logs to carry both the source and destination attributes.

Users can interact with either the aliased (source) or standard (destination) faceted attribute. However, users are [encouraged][33] to use the standard facet rather than the aliased one. This provides guidance towards the naming convention, and discourages users from building assets (such as saved views or dashboards) based on non-standard content.

**Additional details regarding aliasing**:

- Aliasing happens after logs are processed by pipelines. Any extracted or processed attribute can be used as a source for aliasing.
- Datadog enforces the type of an aliased attribute. If this is not possible, the aliasing is skipped.
- In the case of a log that already carries the destination attribute, aliasing overrides the value of that log.
- For a standard attribute to which multiple attributes are aliased, if a log carries several of these source attributes, only one of these source attributes is aliased.
- Any updates or additions to standard attributes are only applied to newly ingested logs.
- Standard attributes cannot be aliased.
- Attributes can only be aliased to standard attributes.
- To respect the JSON structure of logs, it is not possible to have one standard attribute as the child of another (for example, `user` and `user.name` cannot both be standard attributes).

See [Alias Facets][34] for additional information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/facets/
[2]: /logs/search_syntax/#tags
[3]: https://app.datadoghq.com/logs/pipelines/standard-attributes
[4]: /integrations/apache/
[5]: /integrations/amazon_cloudfront/
[6]: /getting_started/tagging/unified_service_tagging/
[7]: /logs/explorer/patterns/
[8]: /tracing/other_telemetry/connect_logs_and_traces/
[9]: /standard-attributes/?product=log+management
[10]: /standard-attributes/?product=log+management&search=network
[11]: /standard-attributes/?product=log+management&search=geolocation
[12]: /standard-attributes/?search=http.&product=log+management
[13]: /integrations/amazon_elb/
[14]: /logs/log_configuration/processors/#url-parser
[15]: /standard-attributes/?search=logger+error&product=log+management
[16]: /standard-attributes/?search=db&product=log+management
[17]: /integrations/cassandra/
[18]: /integrations/mysql/
[19]: /integrations/amazon_rds/
[20]: /integrations/elastic/
[21]: /standard-attributes/?search=duration&product=log+management
[22]: /logs/log_configuration/processors/#remapper
[23]: /tracing/app_analytics/search/
[24]: /standard-attributes/?search=usr&product=log+management
[25]: /standard-attributes/?search=syslog&product=log+management
[26]: /integrations/rsyslog/
[27]: /integrations/nxlog/
[28]: integrations/syslog_ng/
[29]: /integrations/fluentd/
[30]: /integrations/logstash/
[31]: /standard-attributes/?search=dns&product=log+management
[32]: /standard-attributes/?search=evt&product=log+management
[33]: /logs/explorer/facets/#aliased-facets
[34]: /logs/explorer/facets/#alias-facets
