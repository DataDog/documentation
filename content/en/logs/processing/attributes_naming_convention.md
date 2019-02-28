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

Centralizing logs from various technologies and applications tends to generate tens or hundreds of different attributes in a Log Management environment- especially when many teams users, each one with their own personal usage patterns, are working within the same environment.
This generates confusion. For instance, a client IP might have the following attributes within your logs: `clientIP`, `client_ip_address`, `remote_address`, `client.ip`, etc.
In this context, it can be cumbersome to know which attributes correspond to the logs you are trying to filter on, or correlate proxy logs to web application logs.

Even if technologies define their respective logs attributes differently, a URL, client IP, or duration have universally consistent meanings.
This is why Datadog decided while implementing log integrations to rely on a subset of names for attributes that are commonly observed over log sources.

The standard attribute table is available in Log Configuration pages, along with pipelines, indexes, and archives.

{{< img src="logs/processing/attribute_naming_convention/standard_attributes.png" alt="Standard Attributes" responsive="true" style="width:80%;">}}

## Standard Attribute list

The standard attribute table comes with a set of [predefined standard attributes](#default-standard-attribute-list). You can append that list with your own attributes, and edit or delete existing standard attributes:

{{< img src="logs/processing/attribute_naming_convention/edit_standard_attributes.png" alt="Edit standard attributes" responsive="true" style="width:80%;">}}

### Standard Attribute Definition

A standard Attribute is defined by its:

* Name
* Type (`string`, `integer`, `double`, `boolean`)
* Description
* Remapping list

After being processed in the pipelines, each log goes through the full list of Standard Attributes.
For each entry of the Standard Attribute table, if the current log has an attribute matching the remapping list the following is done:

* The first attribute that matches the provided list is remapped and the value is overridden by the new one if already existing
* Enforce the type of the remapped attribute (if not possible, the attribute is skipped and the next matching one of the list is used)
* The original attribute is kept in the log

**Important Note**: By default, the type of an existing Standard Attribute is unchanged if the remapping list is empty. Add the Standard Attribute to its own remapping list to enforce its type.

### Add or Update a Standard Attribute

The standard attribute panel pops when you add a new standard attribute or edit an existing one:

{{< img src="logs/processing/attribute_naming_convention/define_standard_attribute.png" alt="Define Standard attribute" responsive="true" style="width:80%;">}}

Any element of the Standard Attribute can then be filled or updated. **Note** that any updates or addition to Standard Attributes only applies to newly ingested logs.

#### Validation

To add or update an Standard Attribute, the following rules must be followed:

* A Standard Attribute cannot be added in the remapping list of another Standard Attribute.
* A custom attribute can be remapped to only one Standard Attribute.
* To respect the JSON structure of the logs, it is not possible to have one Standard Attribute as the child of another (for example `user` and `user.name` cannot be both Standard Attributes).

## Default Standard Attribute List

The default standard attribute list has been split into 7 functional domains:

* [Network/communications](#network)
* [HTTP Requests](#http-requests)
* [Source code](#source-code)
* [Database](#database)
* [Performance](#performance)
* [User related attributes](#user-related-attributes)
* [Syslog and log shippers](#syslog-and-log-shippers)

### Network

Related to the data used in network communication. All fields and metrics are prefixed by `network`.

| **Fullname**               | **Type** | **Description**                                                                          |
| :---                       | :---     | :----                                                                                    |
| `network.client.ip`        | `string` | The IP address of the client that initiated the TCP connection.                          |
| `network.destination.ip`   | `string` | The IP address the client connected to.                                                  |
| `network.client.port`      | `string` | The port of the client that initiated the connection.                                    |
| `network.destination.port` | `string` | The TCP port the client connected to.                                                    |
| `network.bytes_read`       | `number` | Total number of bytes transmitted from the client to the server when the log is emitted. |
| `network.bytes_written`    | `number` | Total number of bytes transmitted from the server to the client when the log is emitted. |

Typical integrations relying on these attributes include [Apache][2], [Varnish][3], [AWS ELB][4], [Nginx][5], [HAProxy][6], etc.

### HTTP Requests

Related to the data commonly used in HTTP requests and accesses. All attributes are prefixed by `http`.

Typical integrations relying on these attributes include [Apache][2], Rails, [AWS CloudFront][7], web applications servers, etc.

#### Common attributes


| **Fullname**       | **Type** | **Description**                                                                                          |
| :---               | :---     | :----                                                                                                    |
| `http.url`         | `string` | The URL of the HTTP request.                                                                              |
| `http.status_code` | `number` | The HTTP response status code.                                                                            |
| `http.method`      | `string` | Indicates the desired action to be performed for a given resource.                                          |
| `http.referer`     | `string` | HTTP header field that identifies the address of the webpage that linked to the resource being requested.|
| `http.request_id`  | `string` | The ID of the HTTP request.                                                                              |
| `http.useragent`   | `string` | The User-Agent as it is sent (raw format). [See below for more details](#user-agent-attributes). |

#### URL details attributes

Details about the parsed parts of the HTTP URL. Generally generated thanks to the [URL parser][8]. All attributes are prefixed by `http.url_details`.

| **Fullname**                   | **Type** | **Description**                                                                         |
| :---                           | :---     | :----                                                                                   |
| `http.url_details.host`        | `string` | The HTTP host part of the URL.                                                          |
| `http.url_details.port`        | `number` | The HTTP port part of the URL.                                                          |
| `http.url_details.path`        | `string` | The HTTP path part of the URL.                                                          |
| `http.url_details.queryString` | `object` | The HTTP query string parts of the URL decomposed as query params key/value attributes. |
| `http.url_details.scheme`      | `string` | The protocol name of the URL (HTTP or HTTPS)                                            |

#### User-Agent attributes

Details about the meanings of user agents attributes. Generally generated thanks to the [User-Agent parser][9]. All attributes are prefixed by `http.useragent_details`.

| **Fullname**                            | **Type** | **Description**                                |
| :---                                    | :---     | :----                                          |
| `http.useragent_details.os.family`      | `string` | The OS family reported by the User-Agent.      |
| `http.useragent_details.browser.family` | `string` | The Browser Family reported by the User-Agent. |
| `http.useragent_details.device.family`  | `string` | The Device family reported by the User-Agent.  |

### Source code

Related to the data used when a log or an error is generated via a logger in a custom application. All attributes are prefixed either by `logger` or `error`.
 
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
| `db.instance`  | `string` | Database instance name. E.g., in Java, if `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, the instance name is `customers`.       |
| `db.statement` | `string` | A database statement for the given database type. E.g., for mySQL: `"SELECT * FROM wuser_table";` for Redis: `"SET mykey 'WuValue'"`. |
| `db.operation` | `string` | The operation that was performed ("query", "update", "delete",...).                                                                   |
| `db.user`      | `string` | User that performs the operation.                                                                                                     |

Typical integrations relying on these attributes are: [Cassandra][10], [MySQL][11], [RDS][12], [Elasticsearch][13], etc.

### Performance

Performance metrics.

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

Related to the data added by a syslog or a log-shipper agent. All fields and metrics are prefixed by `syslog`.

| **Fullname**       | **Type** | **Description**                                                               |
| :---               | :---     | :----                                                                         |
| `syslog.hostname`  | `string` | The hostname                                                                  |
| `syslog.appname`   | `string` | The application name. Generally remapped to the `service` reserved attribute. |
| `syslog.severity`  | `string` | The log severity. Generally remapped to the `status` reserved attribute.      |
| `syslog.timestamp` | `string` | The log timestamp. Generally remapped to the `date` reserved attribute.       |
| `syslog.env`       | `string` | The environment name where the source of logs come from.                      |

Some integrations that rely on these are: [Rsyslog][16], [NxLog][17], [Syslog-ng][18], [Fluentd][19], [Logstash][20], etc.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/Taxonomy
[2]: /integrations/apache
[3]: /integrations/varnish
[4]: /integrations/amazon_elb
[5]: /integrations/nginx
[6]: /integrations/haproxy
[7]: /integrations/amazon_elb
[8]: /logs/processing/#url-parser
[9]: /logs/processing/#useragent-parser
[10]: /integrations/cassandra
[11]: /integrations/mysql
[12]: /integrations/amazon_rds
[13]: /integrations/elastic
[14]: /logs/explorer/?tab=measures#setup
[15]: /tracing/visualization/search
[16]: /integrations/rsyslog
[17]: /integrations/nxlog
[18]: /integrations/syslog_ng
[19]: /integrations/fluentd
[20]: /integrations/logstash
