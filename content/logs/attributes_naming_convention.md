## Why a naming convention for attributes?

*In a nutshell:*
- Various technologies tends to use different attribute names for the same meaning
- This usually generates too many attributes which can lead to: user confusion and unability to correlate accross sources
- Integrations rely on the following naming convention
- We also advise you to use the following reference when you parse your custom formats & sources

Centralizing logs from various technologies and applications tends to generate tens or hundreds of different attributes on the Log Management enviromnent. Especially when their are many users and usage working on it.

This tends to generate confusion among users as - just to take a simple example - a client ip can be named `clientIP`, `client_ip_address`, `remote_address`, `client.ip`, and many other combinations are possible...
How do I then know which one corresponds to the http proxy logs I am currently analyzing? And how I am going to correlate this same proxy logs to the web application logs just behind it?

Indeed, while people tend to name things slightly differently a URL, a client ip or a duration have the same meaning for everyone.
This is why Datadog decided while implementing log integrations to rely on a subset of names for attributes that we commonly observe over log sources.

But as integrations are not covering your custom formats and sources, we also decided to make it public to help you decide how to name things in your own parsers.

## Functionnal domains

The following attributes are grouped into a few functional domains:

* Network communications
* HTTP Requests
* Source code
* Database
* Performance
* User related attributes
* Syslog and log shippers

### Network

Related to the data used in a network communication. All fields and metrics are prefixed by `network`.

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `network.client.ip` | `string` | The IP address of the client which initiated the TCP connection. |
| `network.destination.ip` | `string` | The IP address the client connected to. |
| `network.client.port` | `string` | The port of the client which initiated the connection. |
| `network.destination.port` | `string` | The TCP port the client connected to. |
| `network.bytes_read` | `number` | Total number of bytes transmitted from the client to the server when the log is emitted. |
| `network.bytes_written` | `number` | Total number of bytes transmitted from the server to the client when the log is emitted. |

Typical integrations relying on these: *Apache*, *Varnish*, *AWS ELB*, *Nginx*, *HAPROXY*, etc.

### HTTP Requests

Related to the data commonly used in HTTP requests & accesses. All attributes are prefixed by `http`.

Typical integrations relying on these attributes are: *Apache*, *Rails*, *AWS CloudFront*, web applications servers, etc...

#### Common attributes

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `http.url` | `string` | The URL of the HTTP request. |
| `http.status_code` | `number` | The IP address the client connected to. |
| `http.method` | `string` | The HTTP verb of the request.|
| `http.referer` | `string` | The HTTP referer. |
| `http.request_id` | `string` | The HTTP request id. |
| `http.useragent` | `string` | The User-Agent as it is sent (raw format). See bellow for all details about it. |

#### URL details attributes

Details about the parsed parts of the HTTP url. Generally generated thanks to the [URL parser](https://docs.datadoghq.com/logs/processing/#url-parser).

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `http.url_details.host` | `string` | The HTTP host part of the url. |
| `http.url_details.port` | `number` | The HTTP port part of the url. |
| `http.url_details.path` | `string` | The HTTP path part of the url. |
| `http.url_details.queryString` | `object` | The HTTP query string parts of the url decomposed as query params key/value attributes. |
| `http.url_details.scheme` | `string` | The protocol name of the URL (http or https)
. |

#### User-Agent attributes

Details about the meanings of user agents attributes. Generally generated thanks to the [User-Agent parser](https://docs.datadoghq.com/logs/processing/#useragent-parser).

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `http.useragent_details.os.family` | `string` | The OS family reported by the user-agent. |
| `http.useragent_details.browser.family` | `string` | The Browser Family reported by the user-agent. |
| `http.useragent_details.device.family` | `string` | The Device family reported by the user-agent.|

### Source code

Related to the data used when a log or an error is generated via a logger in a custom application. All attributes are prefixed either by logger or error.

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `logger.name` | `string` | The name of the logger. |
| `logger.thread_name` | `string` | The name of the current thread when the log is fired. |
| `logger.method_name` | `string` | The class method name.|
| `error.kind` | `string` | The error type or kind (or code is some cases). |
| `error.message` | `string` | A concise, human-readable, one-line message explaining the event |
| `error.stack` | `string` | The stack trace or the complementary information about the error |

Typical integrations relying on these attributes are: *Java*, *NodeJs*, *.NET*, *Golang*, *Python*, etc.

### Database

Database related attributes are prefixed by `db`.

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `db.instance` | `string` | Database instance name. E.g., In java, if the jdbc.url="jdbc:mysql://127.0.0.1:3306/customers", the instance name is "customers". |
| `db.statement` | `string` | A database statement for the given database type. E.g., for db.type="sql", "SELECT * FROM wuser_table"; for db.type="redis", "SET mykey 'WuValue'". |
| `db.operation` | `string` | The operation that was performed (“query”, “update”, “delete”,...). |
| `db.user` | `string` | User that performs the operation. |

Typical integrations relying on these attributes are: *Cassandra*, *MySQL*, *RDS*, *Elasticsearch*, etc.

### Performance

Performance metrics.

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `duration` | `number` | A duration of any kind in nanoseconds: HTTP response time, db query time, latency, etc. |

We advise you to rely or at least remap on thes attributes as Datadog displays and uses them in the best way possible.

### User related attribute

All attributes and measures are prefixed by `usr`.

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `usr.id` | `string` | The user identifier. |
| `usr.name` | `string` | The user friendly name. |
| `usr.email` | `string` | The user email. |

### Syslog and log shippers

Related to the data added by a syslog or a log-shipper agent. All fields and metrics are prefixed by `syslog`.

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `syslog.hostname` | `string` | The hostname |
| `syslog.appname` | `string` | The application name. Generally remapped to the `service` reserved attribute. |
| `syslog.severity` | `string` | The log severity. Generally remapped to the `status` reserved attribute. |
| `syslog.timestamp` | `string` | The log timestamp. Generally remapped to the `date` reserved attribute. |
| `syslog.env` | `string` | The environment name where the source of logs come from. |

Some integrations that rely on these are: *Rsyslog*, *NxLog*, *Syslog-ng*, *Infrastructure*, *Fluentd*, *Logstash*, etc.
