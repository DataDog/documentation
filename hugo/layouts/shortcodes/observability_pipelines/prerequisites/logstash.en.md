To use Observability Pipelines' Logstash source, you need the following information available:

- Logstash address, such as `0.0.0.0:8088`. The Observability Pipelines Worker listens on this bind address to receive logs from your applications. Later on, you configure your applications to send logs to this address.
- The appropriate TLS certificates and the password you used to create your private key, if your forwarders are globally configured to enable SSL.