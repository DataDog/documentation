## Why a naming convention for attributes?

*In a nutshell:*
- Various technologies tends to use different attribute names for the same meaning
- This tends to generate too many attributes leading to: user confusion and unability to correlate accross sources
- Integrations rely on the following naming convention
- And we advise you to use the following reference when you parse your custom formats & sources

Centralizing logs from various technologies and applications tends to generate tens or hundreds of different attributes on the Log Management enviromnent. Especially when their are many users and usage working on it.

This tends to generate confusion among users as - just to take a simple example - a client ip can be named `clientIP`, `client_ip_address`, `client.ip`, `http.client_ip` and many other combinations are possible...
How do I then know which one corresponds to the http proxy logs I am currently analyzing? And how I am going to correlate this same proxy logs to the web application logs just behind it?

Indeed, while people tend to name things slightly differently a URL, a client ip or a duration as the same meaning for everyone.
This is why Datadog decided while implementing log integrations to rely on a subset of names for attributes that we commonly observe over log sources.

But as integrations are not covering your custom formats and sources, we also decided to make it public to help you decide how to name things in your own parsers.

## Functionnal domains

The following attributes are grouped into a few functional domains:
 

* Network communications
* HTTP Requests
* Source code
* Performance
* User related attributes
* Syslog and log shippers

### Network

Related to the data used in a network communication. All fields and metrics are prefixed by `network`.

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `network.client_ip` | `string` | The IP address of the client which initiated the TCP connection. |
| `network.destination_ip` | `string` | The IP address the client connected to. |
| `network.client_port` | `string` | The port of the client which initiated the connection. |
| `network.destination_port` | `string` | The TCP port the client connected to. |
| `network.bytes_read` | `string` | Total number of bytes transmitted from the client to the server when the log is emitted. |
| `network.bytes_write` | `string` | Total number of bytes transmitted from the server to the client when the log is emitted. |

Typical integrations relying on these: Apache, Varnish, AWS ELB, Nginx, HAPROXY, etc.

### HTTP Requests

Related to the data commonly used in HTTP requests & accesses. All attributes are prefixed by `http`.

Typical integrations relying on these attributes are: Apache, Rails, AWS CloudFront, web applications servers, etc...

#### Common attributes

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `http.url` | `string` | The URL of the HTTP request. |
| `http.status_code` | `number` | The IP address the client connected to. |
| `http.method` | `string` | The HTTP verb of the request.|
| `http.referer` | `string` | The HTTP referer. |
| `http.request_id` | `string` | The HTTP request id. |
| `http.user_agent` | `string` | The User-Agent as it is sent (raw format). See bellow for all details about it. |

#### URL details attributes

Details about the parsed parts of the HTTP url. Generally generated thanks to the [URL parser](https://docs.datadoghq.com/logs/processing/#url-parser).

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `http.url_details.host` | `string` | The HTTP host part of the url. |
| `http.url_details.status_code` | `number` | The HTTP port part of the url. |
| `http.url_details.method` | `string` | The HTTP path part of the url.|
| `http.url_details.queryString` | `Object` | The HTTP query string parts of the url decomposed as query params key/value attributes. |

#### User-Agent attributes

Details about the meanings of user agents attributes. Generally generated thanks to the [User-Agent parser](https://docs.datadoghq.com/logs/processing/#useragent-parser).

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `http.user_agent_details.os.family` | `string` | The OS family reported by the user-agent. |
| `http.user_agent_details.os.family` | `string` | The Browser Family reported by the user-agent. |
| `http.user_agent.device.family` | `string` | The Device family reported by the user-agent.|

### Source code

Related to the data used when a log or an error is generated via a logger in a custom application. All attributes are prefixed either by logger or error.

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `logger.name` | `string` | The name of the logger. |
| `logger.thread_name` | `string` | The name of the current thread when the log is fired. |
| `logger.method_name` | `string` | The class method name.|
| `error.name` | `string` | The error name. |
| `error.kind` | `string` | The error kind (or code is some cases). |
| `error.stack_trace` | `string` | The User-Agent as it is sent (raw format). See bellow for all details about it. |

Typical integrations relying on these attributes are: Java, NodeJs, .NET, Golang, Python, etc.

### Performance

Performance metrics.

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `duration` | `string` | A duration of any kind: HTTP response time, db query time, latency, etc. |

We advise you to rely or at least remap on thes attributes as Datadog displays and uses them in the best way possible.

### User related attribute

All attributes and measures are prefixed by `user`.

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `user.id` | `string` | The user identifier. |
| `user.name` | `string` | The user friendly name. |
| `user.email` | `string` | The user email. |

### Syslog and log shippers

Related to the data added by a syslog or a log-shipper agent. All fields and metrics are prefixed by `syslog`.

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `syslog.hostname` | `string` | The hostname |
| `syslog.appname` | `string` | The application name. Generally remapped to the `service` reserved attribute. |
| `syslog.severity` | `string` | The log severity. Generally remapped to the `status` reserved attribute. |
| `syslog.env` | `string` | The environment name where the source of logs come from. |

Some integrations that rely on these are: *Rsyslog*, *NxLog*, *Syslog-ng*, *Infrastructure*, *Fluentd*, *Logstash*, etc.
