---
title: Standard Attributes
kind: documentation
description: "Datadog standard attributes for pipelines."
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "logs/processing/processors"
  tag: "Documentation"
  text: "Consult the full list of available Processors"
- link: "logs/logging_without_limits"
  tag: "Documentation"
  text: "Logging without limit"
- link: "logs/explorer"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

## Overview

Centralizing logs from various technologies and applications tends to generate tens or hundreds of different attributes in a Log Management environment—especially when many teams' users, each one with their own personal usage patterns, are working within the same environment.

This can generate confusion. For instance, a client IP might have the following attributes within your logs: `clientIP`, `client_ip_address`, `remote_address`, `client.ip`, etc.

In this context, the number of created or provided attributes can lead to confusion and difficulty to configure or understand the environment. It is also cumbersome to know which attributes correspond to the the logs of interest and - for instance - correlating web proxy with web application logs would be difficult. Even if technologies define their respective logs attributes differently, a URL, client IP, or duration have universally consistent meanings.

Standard Attributes have been designed to help your organization to define its own Naming Convention and to enforce it as much as possible across users and functional teams. The goal is to define a subset of attributes that would be the recipient of shared semantics that everyone agrees to use by convention.

### Setup standard attributes

Log Integrations are natively relying on the [default provided set](#default-standard-attribute-list) but your organization can decide to extend or modify this list.
The standard attribute table is available in Log Configuration pages, along with pipelines and other logs intake capabilities (metrics generation, archives, exclusion filters, etc.).

{{< img src="logs/processing/attribute_naming_convention/standard_attributes_config.png" alt="Standard Attributes" responsive="true" style="width:60%;">}}

How these Standard Attributes will be suggested or enforced?
Administrators have the right to re-copy an existing set of (non-standard) attributes into a standard one so to enforce non compliant logs sources to become compliant without loosing any previous information.

### Standard attributes in Log Explorer

It's likely that standard attributes coexist in your organisation along with their non-standard version. Typically when arranging a transition period. And to help your users cherry-pick the standard attribute in this context, they are identified as such in the explorer (e.g. in the facet list, or in measure or group selectors in Analytics). 

{{< img src="logs/processing/attribute_naming_convention/standard_attributes_explorer.png" alt="Standard Attributes" responsive="true" style="width:60%;">}}

As an administrator or prescriptor of the naming convention in your organisation, you can take this opportunity to educate them with standard attributes, and nudge them to align. 

## Standard Attribute list

The standard attribute table comes with a set of [predefined standard attributes](#default-standard-attribute-list). You can append that list with your own attributes, and edit or delete existing standard attributes:

{{< img src="logs/processing/attribute_naming_convention/edit_standard_attributes.png" alt="Edit standard attributes" responsive="true" style="width:80%;">}}

### Add Or Update Standard Attributes

A standard attribute is defined by its:

* `Path`: The path of the Standard attributes as you would find it in your JSON (e.g `network.client.ip`)
* `Type` (`string`, `integer`, `double`, `boolean`): The type of the attribute which is used to cast element of the remapping list
* `Description`: Human readable description of the attribute
* `Remapping list`: Comma separated list of non-compliant attribute that should be remapped to the Standard one

The standard attribute panel pops when you add a new standard attribute or edit an existing one:

{{< img src="logs/processing/attribute_naming_convention/define_standard_attribute.png" alt="Define Standard attribute" responsive="true" style="width:80%;">}}

Any element of the standard attribute can then be filled or updated. **Note**: Any updates or additions to standard attributes are only applied to newly ingested logs.

### Standard Attribute Remapping Behaviour

After being processed in the pipelines, each log goes through the full list of Standard Attributes.
For each entry of the standard attribute table, if the current log has an attribute matching the remapping list, the following is done:

* The first attribute that matches the provided list is remapped, and the value is overridden by the new one if already existing
* Datadog enforces the type of the remapped attribute (if this is not possible, the attribute is skipped and the next matching one of the list is used)
* The original attribute is kept in the log

**Important Note**: By default, the type of an existing standard attribute is unchanged if the remapping list is empty. Add the standard attribute to its own remapping list to enforce its type.

#### Validation

To add or update a standard attribute, follow these rules:

* A standard attribute cannot be added in the remapping list of another standard attribute.
* A custom attribute can be remapped to only one standard attribute.
* To respect the JSON structure of the logs, it is not possible to have one standard attribute as the child of another (for example `user` and `user.name` cannot be both standard attributes).

## Default Standard Attribute List

The default standard attribute list is split into 7 functional domains:

* [Network/communications](#network)
* [HTTP Requests](#http-requests)
* [Source code](#source-code)
* [Database](#database)
* [Performance](#performance)
* [User related attributes](#user-related-attributes)
* [Syslog and log shippers](#syslog-and-log-shippers)

### Network

The following attributes are related to the data used in network communication. All fields and metrics are prefixed by `network`.

| **Fullname**               | **Type** | **Description**                                                                          |
| :---                       | :---     | :----                                                                                    |
| `network.client.ip`        | `string` | The IP address of the client that initiated the TCP connection.                          |
| `network.destination.ip`   | `string` | The IP address the client connected to.                                                  |
| `network.client.port`      | `number` | The port of the client that initiated the connection.                                    |
| `network.destination.port` | `number` | The TCP port the client connected to.                                                    |
| `network.bytes_read`       | `number` | Total number of bytes transmitted from the client to the server when the log is emitted. |
| `network.bytes_written`    | `number` | Total number of bytes transmitted from the server to the client when the log is emitted. |

Typical integrations relying on these attributes include [Apache][1], [Varnish][2], [AWS ELB][3], [Nginx][4], [HAProxy][5], etc.

### Geolocation

The following attributes are related to the geolocation of IP addresses used in network communication. All fields are prefixed by `network.client.geoip` or `network.destination.geoip`.

| **Fullname**                                 | **Type** | **Description**                                                         |
| :---                                         | :---     | :----                                                                   |
| `network.client.geoip.country.name`          | `string` | Name of the country |
| `network.client.geoip.country.iso_code`      | `string` | [Iso Code][6] of the country (example: `US` for the United States, `FR` for France) |
| `network.client.geoip.continent.code`        | `string` | Iso code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`) |
| `network.client.geoip.continent.name`        | `string` | Name of the Continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America`, `Oceania`) |
| `network.client.geoip.subdivision.name`      | `string` | Name of the first subdivision level of the country (example: `California` in the United States or the `Sarthe` Department in France) |
| `network.client.geoip.subdivision.iso_code`  | `string` | [Iso Code][6] of the first subdivision level of the country (example: `CA` in the United States or the `SA` Department in France) |
| `network.client.geoip.city.name`             | `String` | The Name of the city (example `Paris`, `New York`) |

### HTTP Requests

These attributes are related to the data commonly used in HTTP requests and accesses. All attributes are prefixed by `http`.

Typical integrations relying on these attributes include [Apache][1], Rails, [AWS CloudFront][7], web applications servers, etc.

#### Common attributes


| **Fullname**       | **Type** | **Description**                                                                                    |
| :---               | :---     | :----                                                                                              |
| `http.url`         | `string` | The URL of the HTTP request.                                                                      |
| `http.status_code` | `number` | The HTTP response status code.                                                                    |
| `http.method`      | `string` | Indicates the desired action to be performed for a given resource.                                |
| `http.referer`     | `string` | HTTP header field that identifies the address of the webpage that linked to the resource being requested.|
| `http.request_id`  | `string` | The ID of the HTTP request.                                                                       |
| `http.useragent`   | `string` | The User-Agent as it is sent (raw format). [See below for more details](#user-agent-attributes). |

#### URL details attributes

These attributes provide details about the parsed parts of the HTTP URL. They are generally generated thanks to the [URL parser][8]. All attributes are prefixed by `http.url_details`.

| **Fullname**                   | **Type** | **Description**                                                                        |
| :---                           | :---     | :----                                                                                 |
| `http.url_details.host`        | `string` | The HTTP host part of the URL.                                                        |
| `http.url_details.port`        | `number` | The HTTP port part of the URL.                                                        |
| `http.url_details.path`        | `string` | The HTTP path part of the URL.                                                        |
| `http.url_details.queryString` | `object` | The HTTP query string parts of the URL decomposed as query params key/value attributes. |
| `http.url_details.scheme`      | `string` | The protocol name of the URL (HTTP or HTTPS)                                          |

#### User-Agent attributes

These attributes provide details about the meanings of user-agents' attributes. They are generally generated thanks to the [User-Agent parser][9]. All attributes are prefixed by `http.useragent_details`.

| **Fullname**                            | **Type** | **Description**                                |
| :---                                    | :---     | :----                                          |
| `http.useragent_details.os.family`      | `string` | The OS family reported by the User-Agent.      |
| `http.useragent_details.browser.family` | `string` | The Browser Family reported by the User-Agent. |
| `http.useragent_details.device.family`  | `string` | The Device family reported by the User-Agent.  |

### Source code

These attributes are related to the data used when a log or an error is generated via a logger in a custom application. All attributes are prefixed either by `logger` or `error`.

| **Fullname**         | **Type** | **Description**                                                  |
| :---                 | :---     | :----                                                            |
| `logger.name`        | `string` | The name of the logger.                                          |
| `logger.thread_name` | `string` | The name of the current thread when the log is fired.            |
| `logger.method_name` | `string` | The class method name.                                           |
| `error.kind`         | `string` | The error type or kind (or code is some cases).                  |
| `error.message`      | `string` | A concise, human-readable, one-line message explaining the event |
| `error.stack`        | `string` | The stack trace or the complementary information about the error |

Typical integrations relying on these attributes are: *Java*, *NodeJs*, *.NET*, *Golang*, *Python*, etc.

### Database

Database related attributes are prefixed by `db`.

| **Fullname**   | **Type** | **Description**                                                                                                                       |
| :---           | :---     | :----                                                                                                                                 |
| `db.instance`  | `string` | Database instance name. E.g., in Java, if `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, the instance name is `customers`.   |
| `db.statement` | `string` | A database statement for the given database type. E.g., for mySQL: `"SELECT * FROM wuser_table";` for Redis: `"SET mykey 'WuValue'"`. |
| `db.operation` | `string` | The operation that was performed ("query", "update", "delete",...).                                                                   |
| `db.user`      | `string` | User that performs the operation.                                                                                                     |

Typical integrations relying on these attributes are: [Cassandra][10], [MySQL][11], [RDS][12], [Elasticsearch][13], etc.

### Performance

Performance metrics attributes.

| **Fullname** | **Type** | **Description**                                                                                   |
| :---         | :---     | :----                                                                                             |
| `duration`   | `number` | A duration of any kind in **nanoseconds**: HTTP response time, database query time, latency, etc. |


We advise you to rely or at least remap on this attribute as Datadog displays and uses it as a default [Measure][14] for [trace Search][15].

### User related attributes

All attributes and measures are prefixed by `usr`.

| **Fullname** | **Type** | **Description**         |
| :---         | :---     | :----                   |
| `usr.id`     | `string` | The user identifier.    |
| `usr.name`   | `string` | The user friendly name. |
| `usr.email`  | `string` | The user email.         |

### Syslog and log shippers

These attributes are related to the data added by a syslog or a log-shipper agent. All fields and metrics are prefixed by `syslog`.

| **Fullname**       | **Type** | **Description**                                                               |
| :---               | :---     | :----                                                                         |
| `syslog.hostname`  | `string` | The hostname                                                                  |
| `syslog.appname`   | `string` | The application name. Generally remapped to the `service` reserved attribute. |
| `syslog.severity`  | `number` | The log severity. Generally remapped to the `status` reserved attribute.      |
| `syslog.timestamp` | `string` | The log timestamp. Generally remapped to the `date` reserved attribute.       |
| `syslog.env`       | `string` | The environment name where the source of logs come from.                      |

Some integrations that rely on these are: [Rsyslog][16], [NxLog][17], [Syslog-ng][18], [Fluentd][19], [Logstash][20], etc.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/apache
[2]: /integrations/varnish
[3]: /integrations/amazon_elb
[4]: /integrations/nginx
[5]: /integrations/haproxy
[6]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[7]: /integrations/amazon_elb
[8]: /logs/processing/processors/#url-parser
[9]: /logs/processing/processors/#user-agent-parser
[10]: /integrations/cassandra
[11]: /integrations/mysql
[12]: /integrations/amazon_rds
[13]: /integrations/elastic
[14]: /logs/explorer/?tab=measures#setup
[15]: /tracing/trace_search_and_analytics/search
[16]: /integrations/rsyslog
[17]: /integrations/nxlog
[18]: /integrations/syslog_ng
[19]: /integrations/fluentd
[20]: /integrations/logstash
