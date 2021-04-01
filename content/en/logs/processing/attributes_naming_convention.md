---
title: Attributes and Aliasing
kind: documentation
description: 'Learn about attributes and how to support a naming convention'
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

## Overview

Centralizing logs from various technologies and applications can generate tens or hundreds of different attributes in a Log Management environment, especially when many teams are working within the same environment.

For instance, a client IP may have various log attributes: `clientIP`, `client_ip_address`, `remote_address`, `client.ip`, etc. The execution time of a request may be referred to as `exec_time`, `request_latency`, `request.time_elapsed`, etc.

Use **attributes** and **aliasing** to unify your Logs environment.

## Attribute types and aliasing

Attributes prescribe [logs facets][1], which are used for filtering and searching in Log Explorer.

  * [**Reserved attributes**](#reserved-attributes) are automatically ingested.

  * [**Standard attributes**](#standard-attributes) are the backbone of the naming convention for your organization. There is a default set of standard attributes available in [the app][2]. However, this list can be customized to create a **naming convention** for your team.

  * Use [**Aliasing**](#aliasing) once you've implemented a naming convention with standard attributes or if you're trying to create a unique standard facet from multiple log sources. For example, follow the clients most impacted by latencies on a hybrid [Apache][3] and [Amazon Cloud Front][4] infrastructure, using the standard `Network Client IP` facet alongside the standard `duration`. Aliasing allows implementation of a naming convention without having to change a team's technical stack.

## Reserved attributes

Below is a list of reserved attributes that are automatically ingested with logs:

**Note**: If you're also collecting traces or metrics, it is recommended to configure unified service tagging. This configuration ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. Refer to the dedicated [unified service tagging][5] documentation for more information.

| Attribute | Description                                                                                                                                                                                                                                |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`    | The name of the originating host as defined in metrics. Datadog automatically retrieves corresponding host tags from the matching host in Datadog and applies them to your logs. The Agent sets this value automatically.                          |
| `source`  | This corresponds to the integration name: the technology from which the log originated. When it matches an integration name, Datadog automatically installs the corresponding parsers and facets. For example: `nginx`, `postgresql`, etc. |
| `status`  | This corresponds to the level/severity of a log. It is used to define [patterns][6] and has a dedicated layout in the Datadog Log UI.                                                                                                     |
| `service` | The name of the application or service generating the log events. It is used to switch from Logs to APM, so make sure you define the same value when you use both products.                                                                |
| `message` | By default, Datadog ingests the value of the `message` attribute as the body of the log entry. That value is then highlighted and displayed in Live Tail, where it is indexed for full text search.                                    |

## Standard attributes

Log integrations natively rely on a [default set](#default-standard-attribute-list) of standard attributes.

Admin users in your organization can curate the list:

- From the [Log Explorer][1]: **Promote** existing attributes as standard attributes.
- From the standard attribute [configuration page][2]: **Create** new standard attributes.

{{< img src="logs/processing/attribute_naming_convention/standard_attribute_config.png" alt="Standard Attributes"  style="width:60%;">}}

The standard attribute table comes with a set of [predefined standard attributes](#default-standard-attribute-list). You can append that list with your own attributes, and edit or delete existing standard attributes:

{{< img src="logs/processing/attribute_naming_convention/edit_standard_attributes.png" alt="Edit standard attributes"  style="width:80%;">}}

A standard attribute is defined by its:

- `Path`: The path of the attribute **promoted** as a standard attribute, as you would find it in your JSON (for example: `network.client.ip`).
- `Type` (`string`, `integer`, `double`, `boolean`): The type of the attribute, which is used to cast elements of the remapping list.
- `Aliasing list`: Comma separated list of attributes that should be **aliased** to it.
- `Description`: Human readable description of the attribute.

The standard attribute panel appears when you add a new standard attribute or edit an existing one:

{{< img src="logs/processing/attribute_naming_convention/define_standard_attribute.png" alt="Define Standard attribute"  style="width:80%;">}}

### Default standard attribute list

The default standard attribute list is split into the functional domains:

- [Network/communications](#network)
- [HTTP Requests](#http-requests)
- [Source code](#source-code)
- [Database](#database)
- [Performance](#performance)
- [User related attributes](#user-related-attributes)
- [Syslog and log shippers](#syslog-and-log-shippers)
- [DNS](#dns)

#### Network

The following attributes are related to the data used in network communication. All fields and metrics are prefixed by `network`.

| **Fullname**               | **Type** | **Description**                                                                          |
| :------------------------- | :------- | :--------------------------------------------------------------------------------------- |
| `network.client.ip`        | `string` | The IP address of the client that initiated the TCP connection.                          |
| `network.destination.ip`   | `string` | The IP address the client connected to.                                                  |
| `network.client.port`      | `number` | The port of the client that initiated the connection.                                    |
| `network.destination.port` | `number` | The TCP port the client connected to.                                                    |
| `network.bytes_read`       | `number` | Total number of bytes transmitted from the client to the server when the log is emitted. |
| `network.bytes_written`    | `number` | Total number of bytes transmitted from the server to the client when the log is emitted. |

Typical integrations relying on these attributes include [Apache][3], [Varnish][7], [AWS ELB][8], [Nginx][9], [HAProxy][10], etc.

#### Geolocation

The following attributes are related to the geolocation of IP addresses used in network communication. All fields are prefixed by `network.client.geoip` or `network.destination.geoip`.

| **Fullname**                                | **Type** | **Description**                                                                                                                      |
| :------------------------------------------ | :------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `network.client.geoip.country.name`         | `string` | Name of the country                                                                                                                  |
| `network.client.geoip.country.iso_code`     | `string` | [ISO Code][5] of the country (example: `US` for the United States, `FR` for France)                                                  |
| `network.client.geoip.continent.code`       | `string` | ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`)                                                                 |
| `network.client.geoip.continent.name`       | `string` | Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America`, `Oceania`)                    |
| `network.client.geoip.subdivision.name`     | `string` | Name of the first subdivision level of the country (example: `California` in the United States or the `Sarthe` department in France) |
| `network.client.geoip.subdivision.iso_code` | `string` | [ISO Code][5] of the first subdivision level of the country (example: `CA` in the United States or the `SA` department in France)    |
| `network.client.geoip.city.name`            | `String` | The name of the city (example `Paris`, `New York`)                                                                                   |

#### HTTP requests

These attributes are related to the data commonly used in HTTP requests and accesses. All attributes are prefixed by `http`.

Typical integrations relying on these attributes include [Apache][3], Rails, [AWS CloudFront][8], web applications servers, etc.

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

These attributes provide details about the parsed parts of the HTTP URL. They are generally generated thanks to the [URL parser][11]. All attributes are prefixed by `http.url_details`.

| **Fullname**                   | **Type** | **Description**                                                                         |
| :----------------------------- | :------- | :-------------------------------------------------------------------------------------- |
| `http.url_details.host`        | `string` | The HTTP host part of the URL.                                                          |
| `http.url_details.port`        | `number` | The HTTP port part of the URL.                                                          |
| `http.url_details.path`        | `string` | The HTTP path part of the URL.                                                          |
| `http.url_details.queryString` | `object` | The HTTP query string parts of the URL decomposed as query params key/value attributes. |
| `http.url_details.scheme`      | `string` | The protocol name of the URL (HTTP or HTTPS)                                            |

##### User-Agent attributes

These attributes provide details about the meanings of user-agents' attributes. They are generally generated thanks to the [User-Agent parser][12]. All attributes are prefixed by `http.useragent_details`.

| **Fullname**                            | **Type** | **Description**                                |
| :-------------------------------------- | :------- | :--------------------------------------------- |
| `http.useragent_details.os.family`      | `string` | The OS family reported by the User-Agent.      |
| `http.useragent_details.browser.family` | `string` | The Browser Family reported by the User-Agent. |
| `http.useragent_details.device.family`  | `string` | The Device family reported by the User-Agent.  |

#### Source code

These attributes are related to the data used when a log or an error is generated via a logger in a custom application. All attributes are prefixed either by `logger` or `error`.

| **Fullname**         | **Type** | **Description**                                                  |
| :------------------- | :------- | :--------------------------------------------------------------- |
| `logger.name`        | `string` | The name of the logger.                                          |
| `logger.thread_name` | `string` | The name of the current thread when the log is fired.            |
| `logger.method_name` | `string` | The class method name.                                           |
| `logger.version`     | `string` | The version of the logger.                                       |
| `error.kind`         | `string` | The error type or kind (or code is some cases).                  |
| `error.message`      | `string` | A concise, human-readable, one-line message explaining the event |
| `error.stack`        | `string` | The stack trace or the complementary information about the error |

Typical integrations relying on these attributes are: _Java_, _NodeJs_, _.NET_, _Golang_, _Python_, etc.

#### Database

Database related attributes are prefixed by `db`.

| **Fullname**   | **Type** | **Description**                                                                                                                       |
| :------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `db.instance`  | `string` | Database instance name. E.g., in Java, if `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, the instance name is `customers`.       |
| `db.statement` | `string` | A database statement for the given database type. E.g., for mySQL: `"SELECT * FROM wuser_table";` for Redis: `"SET mykey 'WuValue'"`. |
| `db.operation` | `string` | The operation that was performed ("query", "update", "delete",...).                                                                   |
| `db.user`      | `string` | User that performs the operation.                                                                                                     |

Typical integrations relying on these attributes are: [Cassandra][13], [MySQL][14], [RDS][15], [Elasticsearch][16], etc.

#### Performance

Performance metrics attributes.

| **Fullname** | **Type** | **Description**                                                                                   |
| :----------- | :------- | :------------------------------------------------------------------------------------------------ |
| `duration`   | `number` | A duration of any kind in **nanoseconds**: HTTP response time, database query time, latency, etc. |

Datadog advises you to [remap][17] any durations within your logs on this attribute since Datadog displays and uses it as a default [measure][1] for [trace search][18].

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
| `syslog.hostname`  | `string` | The hostname                                                                  |
| `syslog.appname`   | `string` | The application name. Generally remapped to the `service` reserved attribute. |
| `syslog.severity`  | `number` | The log severity. Generally remapped to the `status` reserved attribute.      |
| `syslog.timestamp` | `string` | The log timestamp. Generally remapped to the `date` reserved attribute.       |
| `syslog.env`       | `string` | The environment name where the source of logs come from.                      |

Some integrations that rely on these are: [Rsyslog][19], [NxLog][20], [Syslog-ng][21], [Fluentd][22], [Logstash][23], etc.

#### DNS

All attributes and measures are prefixed by `dns`.

| **Fullname**         | **Type** | **Description**                                                           |
| :------------------- | :------- | :------------------------------------------------------------------------ |
| `dns.id`             | `string` | The DNS query identifier.                                                 |
| `dns.question.name`  | `string` | The queried domain name.                                                  |
| `dns.question.type`  | `string` | A [two octet code][24] which specifies the DNS question type.             |
| `dns.question.class` | `string` | The class looked up by the DNS question (i.e IN when using the internet). |
| `dns.question.size`  | `number` | The DNS question size in bytes.                                           |
| `dns.answer.name`    | `string` | The IP address that the DNS answers with.                                 |
| `dns.answer.type`    | `string` | A [two octet code][24] which specifies the DNS answer type.               |
| `dns.answer.class`   | `string` | The class answered by the DNS.                                            |
| `dns.answer.size`    | `number` | The DNS answer size in bytes.                                             |
| `dns.flags.rcode`    | `string` | The DNS reply code.                                                       |

#### Events

All attributes are prefixed by `evt`.

| **Fullname** | **Type** | **Description**                                                                       |
|:--------------|:---------|:-------------------------------------------------------------------------------------|
| `evt.name`    | `string` | The shared name across events generated by the same activity (e.g.: authentication). |
| `evt.outcome` | `string` | The result of the event (e.g. `success`, `failure`).                                 |

## Aliasing

Creating an alias for a source attribute that maps to a destination attribute allows logs to carry both the source and destination attributes.

Users can interact with either the aliased (source) or standard (destination) faceted attribute. However, users are [encouraged][25] to use the standard facet rather than the aliased one. This provides guidance towards the naming convention, and discourages users from building assets (such as saved views or dashboards) based on non-standard content.

**Additional details regarding aliasing**:

- Aliasing happens after logs are processed by pipelines. Any extracted or processed attribute can be used as a source for aliasing.
- Datadog enforces the type of an aliased attribute. If this is not possible, the aliasing is skipped.
- In the case of a log that already carries the destination attribute, aliasing overrides the value of that log.
- For a standard attribute to which multiple attributes are aliased, if a log carries several of these source attributes, only one of these source attributes is aliased.
- Any updates or additions to standard attributes are only applied to newly ingested logs.
- Standard attributes cannot be aliased.
- Attributes can only be aliased to standard attributes.
- To respect the JSON structure of logs, it is not possible to have one standard attribute as the child of another (for example `user` and `user.name` cannot both be standard attributes).

See the [associated documentation][26] for additional information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explorer/facets/
[2]: https://app.datadoghq.com/logs/pipelines/standard-attributes
[3]: /integrations/apache/
[4]: /integrations/amazon_cloudfront/
[5]: /getting_started/tagging/unified_service_tagging/
[6]: /logs/explorer/patterns/
[7]: /integrations/varnish/
[8]: /integrations/amazon_elb/
[9]: /integrations/nginx/
[10]: /integrations/haproxy/
[11]: /logs/processing/processors/#url-parser
[12]: /logs/processing/processors/#user-agent-parser
[13]: /integrations/cassandra/
[14]: /integrations/mysql/
[15]: /integrations/amazon_rds/
[16]: /integrations/elastic/
[17]: /logs/processing/processors/#remapper
[18]: /tracing/app_analytics/search/
[19]: /integrations/rsyslog/
[20]: /integrations/nxlog/
[21]: /integrations/syslog_ng/
[22]: /integrations/fluentd/
[23]: /integrations/logstash/
[24]: https://en.wikipedia.org/wiki/List_of_DNS_record_types
[25]: /logs/explorer/facets/#aliased-facets
[26]: /logs/explorer/facets/#alias-facets
