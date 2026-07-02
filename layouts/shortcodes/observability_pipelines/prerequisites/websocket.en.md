To use Observability Pipelines' WebSocket source, you must have the following information:

- The full WebSocket URI that the Observability Pipelines Worker connects to, such as `wss://example.com/stream`.
- If the endpoint requires authentication, the credentials for your chosen authorization strategy (a username and password, a bearer token, or a custom `Authorization` header value).

The WebSocket source connects the Observability Pipelines Worker as a client to your upstream WebSocket endpoint and ingests the messages it receives as logs. The endpoint must accept WebSocket connections at the URI that you set as an environment variable when you install the Worker.
