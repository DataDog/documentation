---
title: Standard Attributes and Aliasing
kind: documentation
description: "How to support a Naming Convention"
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

## The purpose of a naming convention.


Centralizing logs from various technologies and applications tends to generate tens or hundreds of different attributes in a Log Management environment—especially when many teams' users, each one with their own personal usage patterns, are working within the same environment.

For instance, a client IP might be transcripted with various attributes within your logs: `clientIP`, `client_ip_address`, `remote_address`, `client.ip`, etc. And the execution time of a request be referred to as `exec_time`, `request_latency`, `request.time_elapsed`, etc.

In this context, the number of created or provided attributes can lead to confusion and difficulty to configure or understand the environment. It is also cumbersome to know which attributes correspond to the the logs of interest and —for instance—correlating web proxy with web application logs would be difficult. 

And even if technologies and teams natively define their respective logs attributes differently, a URL, client IP, or duration have universally consistent meanings. A **naming convention** defines standard names to use when referring to structuring technical or business concepts, resulting in a common language that everyone agrees to use by convention.


## Standard Attributes as a backbone for naming convention  


### Standard Attributes, Standard Facets


**Standard Attributes** have been designed to help your organization to define its own naming convention.

Standard Attributes are most particularly useful when it comes to filtering or aggregating logs altogether - that is to say when [turned into facets][23]. Gathering content from multiple and heterogenous sources into a unique **Standard Facet** makes it much more straightforward to build insights or pivot information across your organisation.

As a matter of example, follow the clients most impacted by latencies on a hybrid [Apache][24] and [Amazon Cloud Front][25] infrastructure, using the Standard `Network Client IP` facet alonside the Standard `duration` measure.


### Curating Standard Attributes

Log Integrations natively rely on a [default set](#default-standard-attribute-list) of standard attributes. 

But Admin users in your organisation are entitled to curate the list:

* either from the [Log Explorer][23], **promoting** existing attributes as Standard Attributes. 
* or from the Standard Attribute [Configuration Page](#standard-attributes-in-explorer) **creating** new Standard Attributes from scratch.


## Aliasing

With aliasing, onboard users across multiple teams on your naming convention, without asking them for tedious changes in their technical stack (which would never be a priority, and likely to be a breaking change).

**Alias** a (source) attribute towards a (destination) attribute so that logs carrying the source attribute, will end up carrying source and destination attribute, both with same value. 

Users can interact with either aliased (source) or standard (destination) faceted attribute. But as far as facets are concerned, users are [nudged][26] to use the Standard Facet rather than the Aliased one. This provides guidance towards the naming convention, and smoothly discourages from building assets (such as saved views or dashboards) based on non-standard content.

**additional details regarding aliasing**


1. Aliasing happens after the logs are processed by the pipelines. Meaning, any extracted or processed attribute can be used a source for aliasing.
2. Datadog enforces the type of an aliased attribute. If this is not possible, the aliasing is skipped.
3. In case a log already carries the destination attribute, aliasing overrides the value.  
4. For a standard attribute to which multiple attributes are aliased, and if a log carries several of these source attributes, only one of these source attributes is aliased.
5. Any updates or additions to standard attributes are only applied to newly ingested logs.


1. Standard attributes cannot be aliased.
2. Attributes can only be aliased to Standard Attributes.
3. To respect the JSON structure of the logs, it is not possible to have one standard attribute as the child of another (for example `user` and `user.name` cannot both be standard attributes).


## Standard Attributes in Log Configuration

The standard attribute table is available in Log Configuration pages, along with pipelines and other logs intake capabilities (metrics generation, archives, exclusion filters, etc.).

{{< img src="logs/processing/attribute_naming_convention/standard_attribute_config.png" alt="Standard Attributes"  style="width:60%;">}}


### Standard attribute list

The standard attribute table comes with a set of [predefined standard attributes](#default-standard-attribute-list). You can append that list with your own attributes, and edit or delete existing standard attributes:

{{< img src="logs/processing/attribute_naming_convention/edit_standard_attributes.png" alt="Edit standard attributes"  style="width:80%;">}}


A standard attribute is defined by its:

* `Path`: The path of attribute **promoted** as Standard Attribute, as you would find it in your JSON (e.g `network.client.ip`)
* `Type` (`string`, `integer`, `double`, `boolean`): The type of the attribute which is used to cast element of the remapping list
* `Aliasing list`: Comma separated list of attributes that should be **aliased** to it
* `Description`: Human readable description of the attribute

The standard attribute panel pops when you add a new standard attribute or edit an existing one:

{{< img src="logs/processing/attribute_naming_convention/define_standard_attribute.png" alt="Define Standard attribute"  style="width:80%;">}}


## Standard Attributes in The Log Explorer

Promote or alias attributes right directly from the log explorer, to make such decisions in context. See [documentation][27] for reference. 


## Default standard attribute list

The default standard attribute list is split into 7 functional domains:

* [Network/communications](#network)
* [HTTP Requests](#http-requests)
* [Source code](#source-code)
* [Database](#database)
* [Performance](#performance)
* [User related attributes](#user-related-attributes)
* [Syslog and log shippers](#syslog-and-log-shippers)
* [DNS](#dns)

### Network

The following attributes are related to the data used in network communication. All fields and metrics are prefixed by `network`.

| **Fullname**               | **Type** | **Description**                                                                          |
|:---------------------------|:---------|:-----------------------------------------------------------------------------------------|
| `network.client.ip`        | `string` | The IP address of the client that initiated the TCP connection.                          |
| `network.destination.ip`   | `string` | The IP address the client connected to.                                                  |
| `network.client.port`      | `number` | The port of the client that initiated the connection.                                    |
| `network.destination.port` | `number` | The TCP port the client connected to.                                                    |
| `network.bytes_read`       | `number` | Total number of bytes transmitted from the client to the server when the log is emitted. |
| `network.bytes_written`    | `number` | Total number of bytes transmitted from the server to the client when the log is emitted. |

Typical integrations relying on these attributes include [Apache][1], [Varnish][2], [AWS ELB][3], [Nginx][4], [HAProxy][5], etc.

### Geolocation

The following attributes are related to the geolocation of IP addresses used in network communication. All fields are prefixed by `network.client.geoip` or `network.destination.geoip`.

| **Fullname**                                | **Type** | **Description**                                                                                                                      |
|:--------------------------------------------|:---------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `network.client.geoip.country.name`         | `string` | Name of the country                                                                                                                  |
| `network.client.geoip.country.iso_code`     | `string` | [ISO Code][6] of the country (example: `US` for the United States, `FR` for France)                                                  |
| `network.client.geoip.continent.code`       | `string` | ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`)                                                                 |
| `network.client.geoip.continent.name`       | `string` | Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America`, `Oceania`)                    |
| `network.client.geoip.subdivision.name`     | `string` | Name of the first subdivision level of the country (example: `California` in the United States or the `Sarthe` department in France) |
| `network.client.geoip.subdivision.iso_code` | `string` | [ISO Code][6] of the first subdivision level of the country (example: `CA` in the United States or the `SA` department in France)    |
| `network.client.geoip.city.name`            | `String` | The name of the city (example `Paris`, `New York`)                                                                                   |

### HTTP requests

These attributes are related to the data commonly used in HTTP requests and accesses. All attributes are prefixed by `http`.

Typical integrations relying on these attributes include [Apache][1], Rails, [AWS CloudFront][3], web applications servers, etc.

#### Common attributes

| **Fullname**       | **Type** | **Description**                                                                                           |
|:-------------------|:---------|:----------------------------------------------------------------------------------------------------------|
| `http.url`         | `string` | The URL of the HTTP request.                                                                              |
| `http.status_code` | `number` | The HTTP response status code.                                                                            |
| `http.method`      | `string` | Indicates the desired action to be performed for a given resource.                                        |
| `http.referer`     | `string` | HTTP header field that identifies the address of the webpage that linked to the resource being requested. |
| `http.request_id`  | `string` | The ID of the HTTP request.                                                                               |
| `http.useragent`   | `string` | The User-Agent as it is sent (raw format). [See below for more details](#user-agent-attributes).          |
| `http.version`     | `string` | The version of HTTP used for the request.                                                                 |

#### URL details attributes

These attributes provide details about the parsed parts of the HTTP URL. They are generally generated thanks to the [URL parser][7]. All attributes are prefixed by `http.url_details`.

| **Fullname**                   | **Type** | **Description**                                                                         |
|:-------------------------------|:---------|:----------------------------------------------------------------------------------------|
| `http.url_details.host`        | `string` | The HTTP host part of the URL.                                                          |
| `http.url_details.port`        | `number` | The HTTP port part of the URL.                                                          |
| `http.url_details.path`        | `string` | The HTTP path part of the URL.                                                          |
| `http.url_details.queryString` | `object` | The HTTP query string parts of the URL decomposed as query params key/value attributes. |
| `http.url_details.scheme`      | `string` | The protocol name of the URL (HTTP or HTTPS)                                            |

#### User-Agent attributes

These attributes provide details about the meanings of user-agents' attributes. They are generally generated thanks to the [User-Agent parser][8]. All attributes are prefixed by `http.useragent_details`.

| **Fullname**                            | **Type** | **Description**                                |
|:----------------------------------------|:---------|:-----------------------------------------------|
| `http.useragent_details.os.family`      | `string` | The OS family reported by the User-Agent.      |
| `http.useragent_details.browser.family` | `string` | The Browser Family reported by the User-Agent. |
| `http.useragent_details.device.family`  | `string` | The Device family reported by the User-Agent.  |

### Source code

These attributes are related to the data used when a log or an error is generated via a logger in a custom application. All attributes are prefixed either by `logger` or `error`.

| **Fullname**         | **Type** | **Description**                                                  |
|:---------------------|:---------|:-----------------------------------------------------------------|
| `logger.name`        | `string` | The name of the logger.                                          |
| `logger.thread_name` | `string` | The name of the current thread when the log is fired.            |
| `logger.method_name` | `string` | The class method name.                                           |
| `logger.version`     | `string` | The version of the logger.                                       |
| `error.kind`         | `string` | The error type or kind (or code is some cases).                  |
| `error.message`      | `string` | A concise, human-readable, one-line message explaining the event |
| `error.stack`        | `string` | The stack trace or the complementary information about the error |

Typical integrations relying on these attributes are: *Java*, *NodeJs*, *.NET*, *Golang*, *Python*, etc.

### Database

Database related attributes are prefixed by `db`.

| **Fullname**   | **Type** | **Description**                                                                                                                       |
|:---------------|:---------|:--------------------------------------------------------------------------------------------------------------------------------------|
| `db.instance`  | `string` | Database instance name. E.g., in Java, if `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, the instance name is `customers`.       |
| `db.statement` | `string` | A database statement for the given database type. E.g., for mySQL: `"SELECT * FROM wuser_table";` for Redis: `"SET mykey 'WuValue'"`. |
| `db.operation` | `string` | The operation that was performed ("query", "update", "delete",...).                                                                   |
| `db.user`      | `string` | User that performs the operation.                                                                                                     |

Typical integrations relying on these attributes are: [Cassandra][9], [MySQL][10], [RDS][11], [Elasticsearch][12], etc.

### Performance

Performance metrics attributes.

| **Fullname** | **Type** | **Description**                                                                                   |
|:-------------|:---------|:--------------------------------------------------------------------------------------------------|
| `duration`   | `number` | A duration of any kind in **nanoseconds**: HTTP response time, database query time, latency, etc. |

Datadog advises you to rely or at least remap on this attribute since Datadog displays and uses it as a default [measure][13] for [trace search][14].

### User related attributes

All attributes and measures are prefixed by `usr`.

| **Fullname** | **Type** | **Description**         |
|:-------------|:---------|:------------------------|
| `usr.id`     | `string` | The user identifier.    |
| `usr.name`   | `string` | The user friendly name. |
| `usr.email`  | `string` | The user email.         |

### Syslog and log shippers

These attributes are related to the data added by a syslog or a log-shipper agent. All fields and metrics are prefixed by `syslog`.

| **Fullname**       | **Type** | **Description**                                                               |
|:-------------------|:---------|:------------------------------------------------------------------------------|
| `syslog.hostname`  | `string` | The hostname                                                                  |
| `syslog.appname`   | `string` | The application name. Generally remapped to the `service` reserved attribute. |
| `syslog.severity`  | `number` | The log severity. Generally remapped to the `status` reserved attribute.      |
| `syslog.timestamp` | `string` | The log timestamp. Generally remapped to the `date` reserved attribute.       |
| `syslog.env`       | `string` | The environment name where the source of logs come from.                      |

Some integrations that rely on these are: [Rsyslog][15], [NxLog][16], [Syslog-ng][17], [Fluentd][18], [Logstash][19], etc.

### DNS

All attributes and measures are prefixed by `dns`.

| **Fullname**         | **Type** | **Description**                                                           |
|:---------------------|:---------|:--------------------------------------------------------------------------|
| `dns.id`             | `string` | The DNS query identifier.                                                 |
| `dns.question.name`  | `string` | The IP address URL that the DNS question wishes to find.                  |
| `dns.question.type`  | `string` | A [two octet code][20] which specifies the DNS question type.             |
| `dns.question.class` | `string` | The class looked up by the DNS question (i.e IN when using the internet). |
| `dns.question.size`  | `number` | The DNS question size in bytes.                                           |
| `dns.answer.name`    | `string` | The queried domain name.                                                  |
| `dns.answer.type`    | `string` | A [two octet code][20] which specifies the DNS answer type.               |
| `dns.answer.class`   | `string` | The class answered by the DNS.                                            |
| `dns.answer.size`    | `number` | The DNS answer size in bytes.                                             |
| `dns.flags.rcode`    | `string` | The DNS reply code.                                                       |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/apache
[2]: /integrations/varnish
[3]: /integrations/amazon_elb
[4]: /integrations/nginx
[5]: /integrations/haproxy
[6]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[7]: /logs/processing/processors/#url-parser
[8]: /logs/processing/processors/#user-agent-parser
[9]: /integrations/cassandra
[10]: /integrations/mysql
[11]: /integrations/amazon_rds
[12]: /integrations/elastic
[13]: /logs/explorer/?tab=measures#setup
[14]: /tracing/app_analytics/search
[15]: /integrations/rsyslog
[16]: /integrations/nxlog
[17]: /integrations/syslog_ng
[18]: /integrations/fluentd
[19]: /integrations/logstash
[20]: https://en.wikipedia.org/wiki/List_of_DNS_record_types
[22]: /logs/explorer/saved_views/
[23]: /logs/explorer/facets/

[24]: /integrations/apache/
[25]: /integrations/amazon_cloudfront/
[26]: /logs/explorer/facets/#aliased-facets
[27]: /logs/explorer/facets/#alias-facets
