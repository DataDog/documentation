---
title: Attributes Naming Convention
kind: documentation
description: "Parse your logs using the Grok Processor"
aliases:
    - logs/parsing/
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "logs/faq/log-parsing-best-practice"
  tag: "FAQ"
  text: Log Parsing - Best Practice
- link: "logs/logging_without_limits"
  tag: "Documentation"
  text: Control the volume of logs indexed by Datadog
---

## Tl;Dr

One may ask, why do we need a naming convention for Log attributes?

* Various technologies tends to use different attribute names for the same meaning.
* This usually generates too many attributes which can lead to: user confusion and un-ability to correlate logs across sources.
* Datadog Integrations rely on the following attribute naming convention.
* We advise you to use the following reference when you parse your custom formats & sources in order to leverage fully all functionalities of your Datadog application.

## Overview

Centralizing logs from various technologies and applications tends to generate tens or hundreds of different attributes in a Log Management environment. Especially when many users - each one with its own personal usage- are working with it. 
This tends to generate confusion among users. For instance, a client IP can have the following attributes within your logs: `clientIP`, `client_ip_address`, `remote_address`, `client.ip`, and many other combinations are possible...
In this context, knowing which attribute corresponds to the logs your are trying to filter on or correlating this same proxy logs to the web application logs just behind it is a cumberstone. 

Actually even if all technologies tends to name logs attributes differently, a URL, a client ip or a duration have the same meaning for everyone.
This is why Datadog decided while implementing log integrations to rely on a subset of names for attributes that are commonly observe over log sources.

But as Datadog integrations are not covering your custom formats and sources, we decided to make this Attribute Naming Convention (or [Taxonomy][1]) public to help you decide how to name your attributes in your own parsers.

This attribute naming convention has been split into 7 functional domains:

* [Network/communications](#network)
* [HTTP Requests](#http-requests)
* [Source code](#source-code)
* [Database](#database)
* [Performance](#performance)
* [User related attributes](#user-related-attributes)
* [Syslog and log shippers](#syslog-and-log-shippers)

## Network

Related to the data used in a network communication. All fields and metrics are prefixed by `network`.

| **Fullname**               | **Type** | **Description**                                                                          |
| :---                       | :---     | :----                                                                                    |
| `network.client.ip`        | `string` | The IP address of the client which initiated the TCP connection.                         |
| `network.destination.ip`   | `string` | The IP address the client connected to.                                                  |
| `network.client.port`      | `string` | The port of the client which initiated the connection.                                   |
| `network.destination.port` | `string` | The TCP port the client connected to.                                                    |
| `network.bytes_read`       | `number` | Total number of bytes transmitted from the client to the server when the log is emitted. |
| `network.bytes_written`    | `number` | Total number of bytes transmitted from the server to the client when the log is emitted. |

Typical integrations relying on these: [Apache][7], [Varnish][8], [AWS ELB][9], [Nginx][10], [HAProxy][11], etc...

## HTTP Requests

Related to the data commonly used in HTTP requests & accesses. All attributes are prefixed by `http`.

Typical integrations relying on these attributes are: [Apache][7], *Rails*, [AWS CloudFront][12], web applications servers, etc...

### Common attributes


| **Fullname**       | **Type** | **Description**                                                                                           |
| :---               | :---     | :----                                                                                                     |
| `http.url`         | `string` | The URL of the HTTP request.                                                                              |
| `http.status_code` | `number` | The IP address the client connected to.                                                                   |
| `http.method`      | `string` | The HTTP verb of the request.                                                                             |
| `http.referer`     | `string` | The HTTP referer.                                                                                         |
| `http.request_id`  | `string` | The HTTP request id.                                                                                      |
| `http.useragent`   | `string` | The User-Agent as it is sent (raw format). [See bellow for all details about it](#user-agent-attributes). |

### URL details attributes

Details about the parsed parts of the HTTP url. Generally generated thanks to the [URL parser][13]. All attributes are prefixed by `http.url_details`.

| **Fullname**                   | **Type** | **Description**                                                                         |
| :---                           | :---     | :----                                                                                   |
| `http.url_details.host`        | `string` | The HTTP host part of the url.                                                          |
| `http.url_details.port`        | `number` | The HTTP port part of the url.                                                          |
| `http.url_details.path`        | `string` | The HTTP path part of the url.                                                          |
| `http.url_details.queryString` | `object` | The HTTP query string parts of the url decomposed as query params key/value attributes. |
| `http.url_details.scheme`      | `string` | The protocol name of the URL (http or https)                                            |

### User-Agent attributes

Details about the meanings of user agents attributes. Generally generated thanks to the [User-Agent parser][14]. All attributes are prefixed by `http.useragent_details`.

| **Fullname**                            | **Type** | **Description**                                |
| :---                                    | :---     | :----                                          |
| `http.useragent_details.os.family`      | `string` | The OS family reported by the user-agent.      |
| `http.useragent_details.browser.family` | `string` | The Browser Family reported by the user-agent. |
| `http.useragent_details.device.family`  | `string` | The Device family reported by the user-agent.  |

## Source code

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

## Database

Database related attributes are prefixed by `db`.

| **Fullname**   | **Type** | **Description**                                                                                                                       |
| :---           | :---     | :----                                                                                                                                 |
| `db.instance`  | `string` | Database instance name. E.g., In java, if the `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, the instance name is `customers`.   |
| `db.statement` | `string` | A database statement for the given database type. E.g., for mySQL: `"SELECT * FROM wuser_table";` for Redis: `"SET mykey 'WuValue'"`. |
| `db.operation` | `string` | The operation that was performed (“query”, “update”, “delete”,...).                                                                   |
| `db.user`      | `string` | User that performs the operation.                                                                                                     |

Typical integrations relying on these attributes are: [Cassandra][15], [MySQL][16], [RDS][17], [Elasticsearch][18], etc...

## Performance

Performance metrics.

| **Fullname** | **Type** | **Description**                                                                                   |
| :---         | :---     | :----                                                                                             |
| `duration`   | `number` | A duration of any kind in **nanoseconds**: HTTP response time, database query time, latency, etc. |


We advise you to rely or at least remap on this attribute as Datadog displays and uses it in the best way possible.

## User related attributes

All attributes and measures are prefixed by `usr`.

| **Fullname** | **Type** | **Description**         |
| :---         | :---     | :----                   |
| `usr.id`     | `string` | The user identifier.    |
| `usr.name`   | `string` | The user friendly name. |
| `usr.email`  | `string` | The user email.         |

## Syslog and log shippers

Related to the data added by a syslog or a log-shipper agent. All fields and metrics are prefixed by `syslog`.

| **Fullname**       | **Type** | **Description**                                                               |
| :---               | :---     | :----                                                                         |
| `syslog.hostname`  | `string` | The hostname                                                                  |
| `syslog.appname`   | `string` | The application name. Generally remapped to the `service` reserved attribute. |
| `syslog.severity`  | `string` | The log severity. Generally remapped to the `status` reserved attribute.      |
| `syslog.timestamp` | `string` | The log timestamp. Generally remapped to the `date` reserved attribute.       |
| `syslog.env`       | `string` | The environment name where the source of logs come from.                      |

Some integrations that rely on these are: [Rsyslog][2], [NxLog][3], [Syslog-ng][4], [Fluentd][5], [Logstash][6], etc...

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/Taxonomy
[2]: /integrations/rsyslog
[3]: /integrations/nxlog
[4]: /integrations/syslog_ng
[5]: /integrations/fluentd/
[6]: /integrations/logstash/
[7]: /integrations/apache
[8]: /integrations/varnish
[9]: /integrations/amazon_elb
[10]: /integrations/nginx
[11]: /integrations/haproxy
[12]: /integrations/amazon_elb
[13]: /logs/processing/#url-parser
[14]: /logs/processing/#useragent-parser
[15]: /integrations/cassandra
[16]: /integrations/mysql
[17]: /integrations/amazon_rds
[18]: /integrations/elastic