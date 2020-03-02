## Standard attributes in log configuration

The standard attribute table is available in Log Configuration pages, along with pipelines and other logs intake capabilities such as metrics generation, archives, exclusion filters, etc.

{{< img src="logs/processing/attribute_naming_convention/standard_attribute_config.png" alt="Standard Attributes"  style="width:60%;">}}

### Standard attribute list

The standard attribute table comes with a set of [predefined standard attributes](#default-standard-attribute-list). You can append that list with your own attributes, and edit or delete existing standard attributes:

{{< img src="logs/processing/attribute_naming_convention/edit_standard_attributes.png" alt="Edit standard attributes"  style="width:80%;">}}

## Default standard attribute list

The default standard attribute list is split into 7 functional domains:

- [Network/communications](#network)
- [HTTP Requests](#http-requests)
- [Source code](#source-code)
- [Database](#database)
- [Performance](#performance)
- [User related attributes](#user-related-attributes)
- [Syslog and log shippers](#syslog-and-log-shippers)
- [DNS](#dns)

### Network

The following attributes are related to the data used in network communication. All fields and metrics are prefixed by `network`.

| **Fullname**               | **Type** | **Description**                                                                          |
| :------------------------- | :------- | :--------------------------------------------------------------------------------------- |
| `network.client.ip`        | `string` | The IP address of the client that initiated the TCP connection.                          |
| `network.destination.ip`   | `string` | The IP address the client connected to.                                                  |
| `network.client.port`      | `number` | The port of the client that initiated the connection.                                    |
| `network.destination.port` | `number` | The TCP port the client connected to.                                                    |
| `network.bytes_read`       | `number` | Total number of bytes transmitted from the client to the server when the log is emitted. |
| `network.bytes_written`    | `number` | Total number of bytes transmitted from the server to the client when the log is emitted. |

Typical integrations relying on these attributes include [Apache][6], [Varnish][7], [AWS ELB][8], [Nginx][9], [HAProxy][10], etc.

### Geolocation

The following attributes are related to the geolocation of IP addresses used in network communication. All fields are prefixed by `network.client.geoip` or `network.destination.geoip`.

| **Fullname**                                | **Type** | **Description**                                                                                                                      |
| :------------------------------------------ | :------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `network.client.geoip.country.name`         | `string` | Name of the country                                                                                                                  |
| `network.client.geoip.country.iso_code`     | `string` | [ISO Code][11] of the country (example: `US` for the United States, `FR` for France)                                                  |
| `network.client.geoip.continent.code`       | `string` | ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`)                                                                 |
| `network.client.geoip.continent.name`       | `string` | Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America`, `Oceania`)                    |
| `network.client.geoip.subdivision.name`     | `string` | Name of the first subdivision level of the country (example: `California` in the United States or the `Sarthe` department in France) |
| `network.client.geoip.subdivision.iso_code` | `string` | [ISO Code][11] of the first subdivision level of the country (example: `CA` in the United States or the `SA` department in France)    |
| `network.client.geoip.city.name`            | `String` | The name of the city (example `Paris`, `New York`)                                                                                   |

### HTTP requests

These attributes are related to the data commonly used in HTTP requests and accesses. All attributes are prefixed by `http`.

Typical integrations relying on these attributes include [Apache][6], Rails, [AWS CloudFront][8], web applications servers, etc.

#### Common attributes

| **Fullname**       | **Type** | **Description**                                                                                           |
| :----------------- | :------- | :-------------------------------------------------------------------------------------------------------- |
| `http.url`         | `string` | The URL of the HTTP request.                                                                              |
| `http.status_code` | `number` | The HTTP response status code.                                                                            |
| `http.method`      | `string` | Indicates the desired action to be performed for a given resource.                                        |
| `http.referer`     | `string` | HTTP header field that identifies the address of the webpage that linked to the resource being requested. |
| `http.request_id`  | `string` | The ID of the HTTP request.                                                                               |
| `http.useragent`   | `string` | The User-Agent as it is sent (raw format). [See below for more details](#user-agent-attributes).          |
| `http.version`     | `string` | The version of HTTP used for the request.                                                                 |

#### URL details attributes

These attributes provide details about the parsed parts of the HTTP URL. They are generally generated thanks to the [URL parser][12]. All attributes are prefixed by `http.url_details`.

| **Fullname**                   | **Type** | **Description**                                                                         |
| :----------------------------- | :------- | :-------------------------------------------------------------------------------------- |
| `http.url_details.host`        | `string` | The HTTP host part of the URL.                                                          |
| `http.url_details.port`        | `number` | The HTTP port part of the URL.                                                          |
| `http.url_details.path`        | `string` | The HTTP path part of the URL.                                                          |
| `http.url_details.queryString` | `object` | The HTTP query string parts of the URL decomposed as query params key/value attributes. |
| `http.url_details.scheme`      | `string` | The protocol name of the URL (HTTP or HTTPS)                                            |

#### User-Agent attributes

These attributes provide details about the meanings of user-agents' attributes. They are generally generated thanks to the [User-Agent parser][13]. All attributes are prefixed by `http.useragent_details`.

| **Fullname**                            | **Type** | **Description**                                |
| :-------------------------------------- | :------- | :--------------------------------------------- |
| `http.useragent_details.os.family`      | `string` | The OS family reported by the User-Agent.      |
| `http.useragent_details.browser.family` | `string` | The Browser Family reported by the User-Agent. |
| `http.useragent_details.device.family`  | `string` | The Device family reported by the User-Agent.  |

### Source code

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

### Database

Database related attributes are prefixed by `db`.

| **Fullname**   | **Type** | **Description**                                                                                                                       |
| :------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `db.instance`  | `string` | Database instance name. E.g., in Java, if `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, the instance name is `customers`.       |
| `db.statement` | `string` | A database statement for the given database type. E.g., for mySQL: `"SELECT * FROM wuser_table";` for Redis: `"SET mykey 'WuValue'"`. |
| `db.operation` | `string` | The operation that was performed ("query", "update", "delete",...).                                                                   |
| `db.user`      | `string` | User that performs the operation.                                                                                                     |

Typical integrations relying on these attributes are: [Cassandra][14], [MySQL][15], [RDS][16], [Elasticsearch][17], etc.

### Performance

Performance metrics attributes.

| **Fullname** | **Type** | **Description**                                                                                   |
| :----------- | :------- | :------------------------------------------------------------------------------------------------ |
| `duration`   | `number` | A duration of any kind in **nanoseconds**: HTTP response time, database query time, latency, etc. |

Datadog advises you to [remap][18] any durations within your logs on this attribute since Datadog displays and uses it as a default [measure][19] for [trace search][20].

### User related attributes

All attributes and measures are prefixed by `usr`.

| **Fullname** | **Type** | **Description**         |
| :----------- | :------- | :---------------------- |
| `usr.id`     | `string` | The user identifier.    |
| `usr.name`   | `string` | The user friendly name. |
| `usr.email`  | `string` | The user email.         |

### Syslog and log shippers

These attributes are related to the data added by a syslog or a log-shipper agent. All fields and metrics are prefixed by `syslog`.

| **Fullname**       | **Type** | **Description**                                                               |
| :----------------- | :------- | :---------------------------------------------------------------------------- |
| `syslog.hostname`  | `string` | The hostname                                                                  |
| `syslog.appname`   | `string` | The application name. Generally remapped to the `service` reserved attribute. |
| `syslog.severity`  | `number` | The log severity. Generally remapped to the `status` reserved attribute.      |
| `syslog.timestamp` | `string` | The log timestamp. Generally remapped to the `date` reserved attribute.       |
| `syslog.env`       | `string` | The environment name where the source of logs come from.                      |

Some integrations that rely on these are: [Rsyslog][21], [NxLog][22], [Syslog-ng][23], [Fluentd][24], [Logstash][25], etc.

### DNS

All attributes and measures are prefixed by `dns`.

| **Fullname**         | **Type** | **Description**                                                           |
| :------------------- | :------- | :------------------------------------------------------------------------ |
| `dns.id`             | `string` | The DNS query identifier.                                                 |
| `dns.question.name`  | `string` | The IP address URL that the DNS question wishes to find.                  |
| `dns.question.type`  | `string` | A [two octet code][26] which specifies the DNS question type.             |
| `dns.question.class` | `string` | The class looked up by the DNS question (i.e IN when using the internet). |
| `dns.question.size`  | `number` | The DNS question size in bytes.                                           |
| `dns.answer.name`    | `string` | The queried domain name.                                                  |
| `dns.answer.type`    | `string` | A [two octet code][26] which specifies the DNS answer type.               |
| `dns.answer.class`   | `string` | The class answered by the DNS.                                            |
| `dns.answer.size`    | `number` | The DNS answer size in bytes.                                             |
| `dns.flags.rcode`    | `string` | The DNS reply code.                                                       |



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

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
