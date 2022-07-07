### Default standard attribute list

// TODO

#### General

// TODO
| **Name**    | **Type** | **Description**                                                                                                                                                                                                                                                                   |
|-------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `language`  | `string` | The client SDK language used to generate the span. Can be one of `cpp`, `dotnet`, `go`, `jvm`, `javascript`, `php`, `python`, `ruby`                                                                                                                                                                                                                                 |
| `env`       | `string` | Value of `DD_ENV` environment variable or user defined `env` for the running process.                                                                                                                                                                                            |
| `version`   | `string` | Value of `DD_VERSION` environment variable or user defined `version` for the running process                                                                                                                                                                                      |
| `span.kind` | `string` | String representing the type of work unit handled by the span. Can be one of `server`, `client`, `producer`, `consumer` or `internal`.<br>More information from [OpenTelemetry SpanKind documentation][1] |
| `component` | `string` | The name of the library/integration which created the span                                                                                                                                                                                                                        |

#### Network communications
// TODO
| **Fullname**                    | **Type** | **Description**                                                           |
|---------------------------------|----------|---------------------------------------------------------------------------|
| `network.client.ip`             | `string` | The IP address of the client that initiated the inbound connection        |
| `network.destination.ip`        | `string` | The IP address where the outbound connection is being made to             |
| `network.host.ip`               | `string` | Local host IP address                                                     |
| `network.client.port`           | `number` | The port of the client that initiated the connection                      |
| `network.destination.port`      | `number` | Remote port number of the outbound connection                             |
| `network.client.name`           | `string` | The hostname of the client that initiated the inbound connection          |
| `network.destination.name`      | `string` | Remote hostname or similar where the outbound connection is being made to |
| `network.host.name`             | `string` | Local hostname                                                            |
| `network.client.transport`      | `string` | Transport protocol used to make the inbound connection                    |
| `network.destination.transport` | `string` | Transport protocol used to make the outbound connection                   |

#### HTTP requests

| **Fullname**                                | **Type** | **Description**                                                                                                                                                    |
|---------------------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `http.status_code`                          | `string` | The HTTP response status code                                                                                                                                      |
| `http.url`                                  | `string` | The URL of the HTTP request, including the obfuscated query string. For more informations on obfuscation refer to [Data security][2] |
| `http.version`                              | `string` | The version of HTTP used for the request                                                                                                                           |
| `http.method`                               | `string` | The port of the client that initiated the connection                                                                                                               |
| `http.route`                                | `string` | The matched route (path template).<br>Example: `/users/:userID`                                                                                                    |
| `http.client_ip`                            | `string` | The IP address of the original client behind all proxies, if known. Discovered from headers such as `X-Forwarded-For`                                              |
| `http.request.content_length`               | `number` | The size of the request payload body in bytes                                                                                                                      |
| `http.response.content_length`              | `number` | The size of the request payload body in bytes                                                                                                                      |
| `http.request.content_length_uncompressed`  | `number` | The size of the uncompressed request payload body after transport decoding                                                                                         |
| `http.response.content_length_uncompressed` | `number` | The size of the uncompressed response payload body after transport decoding                                                                                        |
| `http.request.headers.*`                    | `string` | The request HTTP headers. None are collected by default but can optionally be configured with `DD_TRACE_HEADER_TAGS`.                                              |
| `http.response.headers.*`                   | `string` | The response HTTP headers. None are collected by default but can optionally be configured with `DD_TRACE_HEADER_TAGS`.                                             |


#### Database & Cache

// TODO

| **Fullname**           | **Type** | **Description**                                                                                              |
|------------------------|----------|--------------------------------------------------------------------------------------------------------------|
| `db.system`            | `string` | Identifier for the database management system (DBMS product being used                                       |
| `db.connection_string` | `string` | The connection string used to connect to the database                                                        |
| `db.user`              | `string` | Username for accessing the database                                                                          |
| `db.instance`          | `string` | The name of the database being connected to                                                                  |
| `db.statement`         | `string` | The database statement being executed                                                                        |
| `db.operation`         | `string` | The name of the operation being executed<br>Examples: `SELECT`, `findAndModify`, `HMSET`                     |
| `db.sql.table`         | `number` | The name of the primary table that the operation is acting upon, including the database name (if applicable) |
| `db.row_count`         | `number` | The number of rows/results from the query or operation.                                                      |

Additional attributes for specific database technologies will use the prefix `db.<db.system>`.

#### Message Queue

// TODO

| **Fullname**                     | **Type** | **Description**                                                                                                                                                                                                                  |
|----------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `messaging.system`               | `string` | Identifier of the messaging system                                                                                                                                                                                               |
| `messaging.destination`          | `string` | The message destination name                                                                                                                                                                                                     |
| `messaging.destination_kind`     | `string` | The kind of message destination                                                                                                                                                                                                  |
| `messaging.protocol`             | `string` | The name of the transport protocol                                                                                                                                                                                               |
| `messaging.protocol_version`     | `string` | The version of the transport protocol                                                                                                                                                                                            |
| `messaging.url`                  | `string` | The connection string to the messaging system                                                                                                                                                                                    |
| `messaging.message_id`           | `string` | The name of the primary table that the operation is acting upon, including the database name (if applicable)                                                                                                                     |
| `messaging.conversation_id`      | `string` | The number of rows/results from the query or operation.                                                                                                                                                                          |
| `messaging.message_payload_size` | `number` | The size of the uncompressed message payload in bytes                                                                                                                                                                            |
| `messaging.operation`            | `string` | A string identifying the kind of message consumption<br>Examples: `send` (a message sent to a producer), `receive` (a message is received by a consumer) or `process` (a message previously received is processed by a consumer) |
| `messaging.consumer_id`          | `string` | The identifier for the consumer receiving a message                                                                                                                                                                              |

Additional attributes for specific database technologies will use the prefix `messaging.<messaging.system>`.

#### Remote procedure calls

// TODO

| **Fullname**  | **Type** | **Description**                      |
|---------------|----------|--------------------------------------|
| `rpc.system`  | `string` | Identifier of the remoting system    |
| `rpc.service` | `string` | The name of the service being called |
| `rpc.method`  | `string` | The name of the method being called  |


#### Errors

// TODO

| **Fullname**    | **Type** | **Description**                                                  |
|-----------------|----------|------------------------------------------------------------------|
| `error.message` | `string` | The error type or kind (or code in some cases).                  |
| `error.type`    | `string` | A concise, human-readable, one-line message explaining the event |
| `error.stack`   | `string` | The stack trace or the complementary information about the error |


[1]: https://opentelemetry.io/docs/reference/specification/trace/api/#spankind
[2]: /tracing/setup_overview/configure_data_security/
