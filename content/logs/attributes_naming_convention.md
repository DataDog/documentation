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
* Infrastructure metrics
* User related attributes
* Syslog and log shippers

### Network

Related to the data used in a network communication. All fields and metrics are prefixed by `network`.

|                                                 |                                     |                          |           
| :---                                            | :---                                 | :----                    |         
| **Fullname**                                     | **Type**                           | **Description**|
| `network.client_ip` | `string` | The IP address of the client which initiated the TCP connection. |


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
