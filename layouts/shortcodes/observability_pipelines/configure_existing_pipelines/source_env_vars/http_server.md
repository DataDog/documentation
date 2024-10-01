HTTP/S server address.
- The Observability Pipelines Worker listens to this socket address for logs from the HTTP/S server forwarder. For example, `0.0.0.0:9997`.
- Stored in the environment variable as: `DD_OP_SOURCE_HTTP_SERVER_ADDRESS`.