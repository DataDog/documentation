| OpenTelemetry convention | Datadog convention |
| --- | --- |
| `client.address` | `http.client_ip` | 
| `http.response.body.size` | `http.response.content_length` |
| `http.response.header.<header-name>` | `http.response.headers.<header-name>` |
| `http.response.status_code` | `http.status_code` | 
| `http.request.body.size` | `http.request.content_length` |
| `http.request.header.referrer` | `http.referrer` |
| `http.request.method` | `http.method` |
| `http.route` | `http.route` |
| `network.protocol.version` | `http.version` |
| `server.address` | `http.server_name` |
| `url.full` | `http.url` |
| `user_agent.original` | `http.useragent` |