To use Observability Pipelines's Fluentd or Fluent Bit source, you need the following information available:

1. The Observability Pipelines Worker listens on this bind address to receive logs from your applications. For example, `0.0.0.0:8088`. Later on, you configure your applications to send logs to this address.
2. The appropriate TLS certificates and the password you used to create your private key if your forwarders are globally configured to enable SSL.