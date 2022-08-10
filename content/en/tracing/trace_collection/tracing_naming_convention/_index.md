---
title: Span Tags Semantics
kind: documentation
further_reading:
    - link: 'logs/log_configuration/attributes_naming_convention'
      tag: 'Documentation'
      text: 'Learn more about standard attributes for Log Management'
    - link: '/real_user_monitoring/browser/data_collected'
      tag: 'Documentation'
      text: 'Data collected for RUM Browser'
    - link: '/tracing/trace_explorer/query_syntax/'
      tag: 'Documentation'
      text: 'Learn how to explore your traces'
---

## Overview
[Datadog tracing libraries][1] provide out-of-the-box support for instrumenting a variety of libraries.
These instrumentations generate spans to represent logical units of work in distributed systems.
Each span consists of [span tags][2] to provide additional information on the unit of work happening in the system. The naming convention describes the name and content that can be used in span events.

## Span tag naming convention
### Core
The following span tags are the core concepts for describing the instrumentation used and the kind of operation performed:

| **Name**    | **Type** | **Description**                                                                                                                                                                                                                                                                   |
|-------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `language`  | `string` | The client SDK language used to generate the span. It can be one of the following: `cpp`, `dotnet`, `go`, `jvm`, `javascript`, `php`, `python`, `ruby`.                                                                                                                                                                                                                                 |
| `env`       | `string` | The value of `DD_ENV` environment variable or user defined `env` for the running process.                                                                                                                                                                                            |
| `version`   | `string` | The value of `DD_VERSION` environment variable or user defined `version` for the running process.                                                                                                                                                                                      |
| `span.kind` | `string` | The string representing the type of work unit handled by the span. It can be one of the following: `server`, `client`, `producer`, `consumer` or `internal`.<br>More information in the [OpenTelemetry SpanKind documentation][3]. |
| `component` | `string` | The name of the library/integration that created the span.                                                                                                                                                                                                                        |

### Network communications
The following span tags can be used to describe work units corresponding to network communications:

| **Name**                    | **Type** | **Description**                                                           |
|---------------------------------|----------|---------------------------------------------------------------------------|
| `network.client.ip`             | `string` | The IP address of the client that initiated the inbound connection.        |
| `network.destination.ip`        | `string` | The IP address to where the outbound connection is being made.             |
| `network.host.ip`               | `string` | The local host IP address.                                                     |
| `network.client.port`           | `number` | The port of the client that initiated the connection.                      |
| `network.destination.port`      | `number` | The remote port number of the outbound connection.                             |
| `network.client.name`           | `string` | The hostname of the client that initiated the inbound connection.          |
| `network.destination.name`      | `string` | The remote hostname or similar to where the outbound connection is being made. |
| `network.host.name`             | `string` | The local hostname.                                                            |
| `network.client.transport`      | `string` | The transport protocol used to make the inbound connection.                    |
| `network.destination.transport` | `string` | The transport protocol used to make the outbound connection.                   |

### HTTP requests
The following span tags can be used to describe the HTTP client and server spans:

| **Name**                                | **Description**                                                                                                                                                                                                              |
|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `http.status_code`                          | Type: `string` <br> The HTTP response status code.                                                                                                                                                                                                |
| `http.url`                                  | Type: `string` <br>  The URL of the HTTP request, including the obfuscated query string. For more information on obfuscation, see [Configure Data Security][4].                                                         |
| `http.version`                              | Type: `string` <br>  The version of HTTP used for the request.                                                                                                                                                                                     |
| `http.method`                               | Type: `string` <br>  The port of the client that initiated the connection.                                                                                                                                                                         |
| `http.route`                                | Type: `string` <br>  The matched route (path template).<br>Example: `/users/:userID`                                                                                                                                                              |
| `http.client_ip`                            | Type: `string` <br>  The IP address of the original client behind all proxies, if known. Discovered from headers such as `X-Forwarded-For`.                                                                                                        |
| `http.useragent`                            | Type: `string` <br>  The user agent header received with the request.                                                                                                                                                                              |
| `http.request.content_length`               | Type: `number` <br>  The size of the request payload body in bytes.                                                                                                                                                                                |
| `http.response.content_length`              | Type: `number` <br> The size of the request payload body in bytes.                                                                                                                                                                                |
| `http.request.content_length_uncompressed`  | Type: `number` <br> The size of the uncompressed request payload body after transport decoding.                                                                                                                                                   |
| `http.response.content_length_uncompressed` | Type: `number` <br> The size of the uncompressed response payload body after transport decoding.                                                                                                                                                  |
| `http.request.headers.*`                    | Type: `string` <br> The request HTTP headers. None are collected by default, but can be optionally configured with `DD_TRACE_HEADER_TAGS`.<br>To learn more about how to collect headers, see the corresponding [Library configuration][5].  |
| `http.response.headers.*`                   | Type: `string` <br> The response HTTP headers. None are collected by default, but can be optionally configured with `DD_TRACE_HEADER_TAGS`.<br>To learn more about how to collect headers, see the corresponding [Library configuration][5]. |

### Database
The following span tags can be used to describe database spans:

| **Name**           | **Type** | **Description**                                                                                              |
|------------------------|----------|--------------------------------------------------------------------------------------------------------------|
| `db.system`            | `string` | Identifier for the database management system (DBMS product being used).                                       |
| `db.connection_string` | `string` | The connection string used to connect to the database.                                                        |
| `db.user`              | `string` | The username that accessed the database                                                                          |
| `db.instance`          | `string` | The name of the database being connected to.                                                                  |
| `db.statement`         | `string` | The database statement being executed.                                                                        |
| `db.operation`         | `string` | The name of the operation being executed. <br>Examples: `SELECT`, `findAndModify`, `HMSET`                     |
| `db.sql.table`         | `number` | The name of the primary table that the operation is acting upon, including the database name (if applicable). |
| `db.row_count`         | `number` | The number of rows/results from the query or operation.                                                      |

Additional attributes for specific database technologies will use the prefix `db.<db.system>`.

### Message Queue
The following span tags can be used to describe spans corresponding to messaging systems:

| **Name**                     | **Type** | **Description**                                                                                                                                                                                                                  |
|----------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `messaging.system`               | `string` | The identifier of the messaging system.                                                                                                                                                                                               |
| `messaging.destination`          | `string` | The message destination name.                                                                                                                                                                                                     |
| `messaging.destination_kind`     | `string` | The kind of message destination.                                                                                                                                                                                                  |
| `messaging.protocol`             | `string` | The name of the transport protocol.                                                                                                                                                                                               |
| `messaging.protocol_version`     | `string` | The version of the transport protocol.                                                                                                                                                                                            |
| `messaging.url`                  | `string` | The connection string to the messaging system.                                                                                                                                                                                    |
| `messaging.message_id`           | `string` | The name of the primary table that the operation is acting upon, including the database name (if applicable).                                                                                                                     |
| `messaging.conversation_id`      | `string` | The number of rows/results from the query or operation.                                                                                                                                                                          |
| `messaging.message_payload_size` | `number` | The size of the uncompressed message payload in bytes.                                                                                                                                                                            |
| `messaging.operation`            | `string` | A string identifying the kind of message consumption. <br>Examples: `send` (a message sent to a producer), `receive` (a message is received by a consumer), or `process` (a message previously received is processed by a consumer). |
| `messaging.consumer_id`          | `string` | The identifier for the consumer receiving a message.                                                                                                                                                                              |

Additional attributes for specific database technologies will use the prefix `messaging.<messaging.system>`.

### Remote procedure calls
The following span tags can be used to describe spans corresponding to remote procedure calls such as RMI or gRPC:

| **Name**  | **Type** | **Description**                      |
|---------------|----------|--------------------------------------|
| `rpc.system`  | `string` | The identifier of the remote system.    |
| `rpc.service` | `string` | The name of the service being called. |
| `rpc.method`  | `string` | The name of the method being called.  |

### Errors
The following span tags can be used to describe errors associated with spans:

| **Name**    | **Type** | **Description**                                                  |
|-----------------|----------|------------------------------------------------------------------|
| `error.message` | `string` | The error type or kind (or code in some cases).                  |
| `error.type`    | `string` | A concise, human-readable, one-line message explaining the event. |
| `error.stack`   | `string` | The stack trace or the complementary information about the error. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup_overview/
[2]: /tracing/visualization/#span-tags
[3]: https://opentelemetry.io/docs/reference/specification/trace/api/#spankind
[4]: /tracing/setup_overview/configure_data_security/
[5]: /tracing/trace_collection/library_config/
