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

Log integrations natively rely on a [default set](#default-standard-attribute-list) of standard attributes.

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

The default standard attribute list is split into the functional domains:

- [Network/communications](#web-access)
- [Geolocation](#geolocation)
- [HTTP Requests](#http-requests)
- [Source code](#source-code)
- [Database](#database)
- [Performance](#performance)
- [User related attributes](#user-related-attributes)
- [Syslog and log shippers](#syslog-and-log-shippers)
- [DNS](#dns)
- [Events](#events)

#### Web Access

The following attributes are related to the data used in network communication. All fields and metrics are prefixed by `network`.

| **Fullname**               | **Type** | **Description**                                                                          |
| :------------------------- | :------- | :--------------------------------------------------------------------------------------- |
| `network.client.ip`        | `string` | The IP address of the client that initiated the TCP connection.                          |
| `network.destination.ip`   | `string` | The IP address the client connected to.                                                  |
| `network.client.port`      | `number` | The port of the client that initiated the connection.                                    |
| `network.destination.port` | `number` | The TCP port the client connected to.                                                    |
| `network.bytes_read`       | `number` | Total number of bytes transmitted from the client to the server when the log is emitted. |
| `network.bytes_written`    | `number` | Total number of bytes transmitted from the server to the client when the log is emitted. |

Typical integrations relying on these attributes include [Apache][4], [Varnish][9], [Amazon ELB][10], [Nginx][11], [HAProxy][12], etc.

#### Geolocation

The following attributes are related to the geolocation of IP addresses used in network communication. All fields are prefixed by `network.client.geoip` or `network.destination.geoip`.

`network.client.geoip.country.name` 
: Type: `string` <br> Name of the country. 

`network.client.geoip.country.iso_code` 
: Type: `string` <br> [ISO Code][13] of the country (for example, `US` for the United States, `FR` for France).

`network.client.geoip.continent.code` 
: Type: `string` <br> ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).

`network.client.geoip.continent.name`
: Type: `string` <br> Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America`, `Oceania`).

`network.client.geoip.subdivision.name`
: Type: `string` <br> Name of the first subdivision level of the country (for example, `California` in the United States or the `Sarthe` department in France).

`network.client.geoip.subdivision.iso_code`
: Type: `string` <br> [ISO Code][13] of the first subdivision level of the country (for example, `CA` in the United States or the `SA` department in France).

`network.client.geoip.city.name`
: Type: `string` <br> The name of the city (for example, `Paris`, `New York`).

#### HTTP requests

These attributes are related to the data commonly used in HTTP requests and accesses. All attributes are prefixed by `http`.

Typical integrations relying on these attributes include [Apache][4], Rails, [AWS CloudFront][10], web applications servers, and so forth.

##### Common attributes

| **Fullname**       | **Type** | **Description**                                                                                           |
| :----------------- | :------- | :-------------------------------------------------------------------------------------------------------- |
| `http.url`         | `string` | The URL of the HTTP request.                                                                              |
| `http.status_code` | `number` | The HTTP response status code.                                                                            |
| `http.method`      | `string` | Indicates the desired action to be performed for a given resource.                                        |
| `http.referer`     | `string` | HTTP header field that identifies the address of the webpage that linked to the resource being requested. |
| `http.request_id`  | `string` | The ID of the HTTP request.                                                                               |
| `http.useragent`   | `string` | The User-Agent as it is sent (raw format). [See below for more details](#user-agent-attributes).          |
| `http.version`     | `string` | The version of HTTP used for the request.                                                                 |

##### URL details attributes

These attributes provide details about the parsed parts of the HTTP URL. They are generated by the [URL parser][14]. All attributes are prefixed by `http.url_details`.

| **Fullname**                   | **Type** | **Description**                                                                         |
| :----------------------------- | :------- | :-------------------------------------------------------------------------------------- |
| `http.url_details.host`        | `string` | The HTTP host part of the URL.                                                          |
| `http.url_details.port`        | `number` | The HTTP port part of the URL.                                                          |
| `http.url_details.path`        | `string` | The HTTP path part of the URL.                                                          |
| `http.url_details.queryString` | `object` | The HTTP query string parts of the URL decomposed as query params key/value attributes. |
| `http.url_details.scheme`      | `string` | The protocol name of the URL (HTTP or HTTPS).                                            |

##### User-Agent attributes

These attributes provide details about the meanings of user-agent attributes. They are generated by the [User-Agent parser][15]. All attributes are prefixed by `http.useragent_details`.

| **Fullname**                            | **Type** | **Description**                                |
| :-------------------------------------- | :------- | :--------------------------------------------- |
| `http.useragent_details.os.family`      | `string` | The OS family reported by the User-Agent.      |
| `http.useragent_details.browser.family` | `string` | The Browser Family reported by the User-Agent. |
| `http.useragent_details.device.family`  | `string` | The Device family reported by the User-Agent.  |

#### Source code

These attributes are related to the data used when a log or an error is generated using a logger in a custom application. All attributes are prefixed either by `logger` or `error`.

| **Fullname**         | **Type** | **Description**                                                  |
| :------------------- | :------- | :--------------------------------------------------------------- |
| `logger.name`        | `string` | The name of the logger.                                          |
| `logger.thread_name` | `string` | The name of the current thread when the log is fired.            |
| `logger.method_name` | `string` | The class method name.                                           |
| `logger.version`     | `string` | The version of the logger.                                       |
| `error.kind`         | `string` | The error type or kind (or code in some cases).                  |
| `error.message`      | `string` | A concise, human-readable, one-line message explaining the event. |
| `error.stack`        | `string` | The stack trace or the complementary information about the error. |

Typical integrations relying on these attributes are _Java_, _NodeJs_, _.NET_, _Golang_, _Python_, and so on.

#### Database

Database related attributes are prefixed by `db`.

`db.instance` 
: Type: `string` <br> Database instance name. For example, in Java, if `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, the instance name is `customers`. 

`db.statement`
: Type: `string` <br> A database statement for the given database type. For example, for mySQL: `"SELECT * FROM wuser_table";` and for Redis: `"SET mykey 'WuValue'"`.

`db.operation`
: Type: `string` <br> The operation that was performed ("query", "update", "delete", and so on). 

`db.user`
: Type: `string` <br> User that performs the operation.

Typical integrations relying on these attributes are [Cassandra][16], [MySQL][17], [RDS][18], [Elasticsearch][19], and so on.

#### Performance

Performance metrics attributes.

| **Fullname** | **Type** | **Description**                                                                                   |
| :----------- | :------- | :------------------------------------------------------------------------------------------------ |
| `duration`   | `number` | A duration of any kind in **nanoseconds**: HTTP response time, database query time, latency, and so on. |

Datadog advises you to [remap][20] any durations within your logs on this attribute since Datadog displays and uses it as a default [measure][1] for [trace search][21].

#### User related attributes

All attributes and measures are prefixed by `usr`.

| **Fullname** | **Type** | **Description**         |
| :----------- | :------- | :---------------------- |
| `usr.id`     | `string` | The user identifier.    |
| `usr.name`   | `string` | The user friendly name. |
| `usr.email`  | `string` | The user email.         |

#### Syslog and log shippers

These attributes are related to the data added by a syslog or a log-shipper agent. All fields and metrics are prefixed by `syslog`.

| **Fullname**       | **Type** | **Description**                                                               |
| :----------------- | :------- | :---------------------------------------------------------------------------- |
| `syslog.hostname`  | `string` | The hostname.                                                                  |
| `syslog.appname`   | `string` | The application name. Generally remapped to the `service` reserved attribute. |
| `syslog.severity`  | `number` | The log severity. Generally remapped to the `status` reserved attribute.      |
| `syslog.timestamp` | `string` | The log timestamp. Generally remapped to the `date` reserved attribute.       |
| `syslog.env`       | `string` | The environment name where the source of logs come from.                      |

Some integrations that rely on these are [Rsyslog][22], [NxLog][23], [Syslog-ng][24], [Fluentd][25], and [Logstash][26].

#### DNS

All attributes and measures are prefixed by `dns`.

| **Fullname**         | **Type** | **Description**                                                           |
| :------------------- | :------- | :------------------------------------------------------------------------ |
| `dns.id`             | `string` | The DNS query identifier.                                                 |
| `dns.question.name`  | `string` | The queried domain name.                                                  |
| `dns.question.type`  | `string` | A [two octet code][27] which specifies the DNS question type.             |
| `dns.question.class` | `string` | The class looked up by the DNS question (such as IP when using the internet). |
| `dns.question.size`  | `number` | The DNS question size in bytes.                                           |
| `dns.answer.name`    | `string` | The IP address that the DNS answers with.                                 |
| `dns.answer.type`    | `string` | A [two octet code][27] which specifies the DNS answer type.               |
| `dns.answer.class`   | `string` | The class answered by the DNS.                                            |
| `dns.answer.size`    | `number` | The DNS answer size in bytes.                                             |
| `dns.flags.rcode`    | `string` | The DNS reply code.                                                       |

#### Events

All attributes are prefixed by `evt`.

| **Fullname** | **Type** | **Description**                                                                       |
|:--------------|:---------|:-------------------------------------------------------------------------------------|
| `evt.name`    | `string` | The shared name across events generated by the same activity (for example, authentication). |
| `evt.outcome` | `string` | The result of the event (for example, `success`, `failure`).                                 |

## Aliasing

Creating an alias for a source attribute that maps to a destination attribute allows logs to carry both the source and destination attributes.

Users can interact with either the aliased (source) or standard (destination) faceted attribute. However, users are [encouraged][28] to use the standard facet rather than the aliased one. This provides guidance towards the naming convention, and discourages users from building assets (such as saved views or dashboards) based on non-standard content.

**Additional details regarding aliasing**:

- Aliasing happens after logs are processed by pipelines. Any extracted or processed attribute can be used as a source for aliasing.
- Datadog enforces the type of an aliased attribute. If this is not possible, the aliasing is skipped.
- In the case of a log that already carries the destination attribute, aliasing overrides the value of that log.
- For a standard attribute to which multiple attributes are aliased, if a log carries several of these source attributes, only one of these source attributes is aliased.
- Any updates or additions to standard attributes are only applied to newly ingested logs.
- Standard attributes cannot be aliased.
- Attributes can only be aliased to standard attributes.
- To respect the JSON structure of logs, it is not possible to have one standard attribute as the child of another (for example, `user` and `user.name` cannot both be standard attributes).

See [Alias Facets][29] for additional information.

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
[9]: /integrations/varnish/
[10]: /integrations/amazon_elb/
[11]: /integrations/nginx/
[12]: /integrations/haproxy/
[13]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[14]: /logs/log_configuration/processors/#url-parser
[15]: /logs/log_configuration/processors/#user-agent-parser
[16]: /integrations/cassandra/
[17]: /integrations/mysql/
[18]: /integrations/amazon_rds/
[19]: /integrations/elastic/
[20]: /logs/log_configuration/processors/#remapper
[21]: /tracing/app_analytics/search/
[22]: /integrations/rsyslog/
[23]: /integrations/nxlog/
[24]: /integrations/syslog_ng/
[25]: /integrations/fluentd/
[26]: /integrations/logstash/
[27]: https://en.wikipedia.org/wiki/List_of_DNS_record_types
[28]: /logs/explorer/facets/#aliased-facets
[29]: /logs/explorer/facets/#alias-facets
