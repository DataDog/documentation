---
title: Aliasing
kind: documentation
description: 'How to support Naming Convention for logs'
further_reading:
    - link: 'logs/processing/pipelines'
      tag: 'Documentation'
      text: 'Discover Datadog Pipelines'
    - link: 'logs/processing/processors'
      tag: 'Documentation'
      text: 'Consult the full list of available Processors'
    - link: 'logs/logging_without_limits'
      tag: 'Documentation'
      text: 'Logging without limit'
    - link: 'logs/explorer'
      tag: 'Documentation'
      text: 'Learn how to explore your logs'
---

## Naming conventions

Centralizing logs from various technologies and applications tends to generate tens or hundreds of different attributes in a Log Management environment—especially when many teams' users, each one with their own personal usage patterns, are working within the same environment.

For instance, a client IP might be transcribed with various attributes within your logs: `clientIP`, `client_ip_address`, `remote_address`, `client.ip`, etc. The execution time of a request may be referred to as `exec_time`, `request_latency`, `request.time_elapsed`, etc.

In this context, the number of created or provided attributes can lead to confusion and difficulty to configure or understand the environment. It is also cumbersome to know which attributes correspond to the the logs of interest and—for instance—correlating web proxy with web application logs would be difficult.

Even if technologies and teams natively define their respective logs attributes differently, a URL, client IP, or duration have universally consistent meanings. A **naming convention** defines standard names to use when referring to structuring technical or business concepts, resulting in a common language that everyone agrees to use by convention.

## Standard attributes and aliasing

**Standard Attributes** are the backbone of the naming convention for your organization.

With **Aliasing**, search and aggregate logs flowing from heterogenous sources. Onboard users across multiple teams with your naming convention, without asking them for changes in their technical stack.

Aliasing is particularly useful when it comes to filtering or aggregating logs from different sources altogether—that is to say, when [turned into facets][1]. Gathering content from multiple and heterogenous sources into a unique **Standard Facet** makes it much more straightforward to build insights or pivot information across your organization.

For example, follow the clients most impacted by latencies on a hybrid [Apache][2] and [Amazon Cloud Front][3] infrastructure, using the standard `Network Client IP` facet alongside the standard `duration`.

### Manage standard attributes

Log integrations natively rely on a [default set](#default-standard-attribute-list) of standard attributes.

Admin users in your organization can curate the list:

- From the [Log Explorer][1], **promoting** existing attributes as standard attributes.
- From the standard attribute [configuration page](#standard-attributes-in-explorer), **creating** new standard attributes from scratch.

### Aliasing

Aliasing a source attribute towards a destination attribute allow logs carrying the source attribute to carry the source and destination attribute, both with the same value.

Users can interact with either the aliased (source) or standard (destination) faceted attribute. As far as facets are concerned, however, users are [nudged][4] to use the standard facet rather than the aliased one. This provides guidance towards the naming convention, and discourages users from building assets (such as saved views or dashboards) based on non-standard content.

Additional details regarding aliasing:

- Aliasing happens after the logs are processed by the pipelines. Any extracted or processed attribute can be used a source for aliasing.
- Datadog enforces the type of an aliased attribute. If this is not possible, the aliasing is skipped.
- In case a log already carries the destination attribute, aliasing overrides the value.
- For a standard attribute to which multiple attributes are aliased, if a log carries several of these source attributes, only one of these source attributes is aliased.
- Any updates or additions to standard attributes are only applied to newly ingested logs.
- Standard attributes cannot be aliased.
- Attributes can only be aliased to standard attributes.
- To respect the JSON structure of the logs, it is not possible to have one standard attribute as the child of another (for example `user` and `user.name` cannot both be standard attributes).

## Standard attributes in log configuration

The standard attribute table is available in Log Configuration pages, along with pipelines and other logs intake capabilities such as metrics generation, archives, exclusion filters, etc.

{{< img src="logs/processing/attribute_naming_convention/standard_attribute_config.png" alt="Standard Attributes"  style="width:60%;">}}

### Standard attribute list

The standard attribute table comes with a set of [predefined standard attributes](#default-standard-attribute-list). You can append that list with your own attributes, and edit or delete existing standard attributes:

{{< img src="logs/processing/attribute_naming_convention/edit_standard_attributes.png" alt="Edit standard attributes"  style="width:80%;">}}

A standard attribute is defined by its:

- `Path`: The path of the attribute **promoted** as a standard attribute, as you would find it in your JSON (for example: `network.client.ip`).
- `Type` (`string`, `integer`, `double`, `boolean`): The type of the attribute, which is used to cast elements of the remapping list.
- `Aliasing list`: Comma separated list of attributes that should be **aliased** to it.
- `Description`: Human readable description of the attribute.

The standard attribute panel appears when you add a new standard attribute or edit an existing one:

{{< img src="logs/processing/attribute_naming_convention/define_standard_attribute.png" alt="Define Standard attribute"  style="width:80%;">}}

## Standard Attributes in The Log Explorer

Alias attributes directly from the log explorer. See the [associated documentation][5] for reference.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/facets/
[2]: /integrations/apache/
[3]: /integrations/amazon_cloudfront/
[4]: /logs/explorer/facets/#aliased-facets
[5]: /logs/explorer/facets/#alias-facets
[6]: /integrations/apache
[7]: /integrations/varnish
[8]: /integrations/amazon_elb
[9]: /integrations/nginx
[10]: /integrations/haproxy
[11]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[12]: /logs/processing/processors/#url-parser
[13]: /logs/processing/processors/#user-agent-parser
[14]: /integrations/cassandra
[15]: /integrations/mysql
[16]: /integrations/amazon_rds
[17]: /integrations/elastic
[18]: /logs/processing/processors/#remapper
[19]: /logs/explorer/facets
[20]: /tracing/app_analytics/search
[21]: /integrations/rsyslog
[22]: /integrations/nxlog
[23]: /integrations/syslog_ng
[24]: /integrations/fluentd
[25]: /integrations/logstash
[26]: https://en.wikipedia.org/wiki/List_of_DNS_record_types
