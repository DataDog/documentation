To use Observability Pipelines's Syslog source, your applications must be sending data in one of the following formats: [RFC 6587][9071], [RFC 5424][9072], [RFC 3164][9073]. You also need to have the following information available:

1. The bind address that your Observability Pipelines Worker (OPW) will listen on to receive logs from your applications. For example, `0.0.0.0:8088`. Later on, you configure your applications to send logs to this address.
2. The appropriate TLS certificates and the password you used to create your private key if your forwarders are globally configured to enable SSL.

[9071]: https://datatracker.ietf.org/doc/html/rfc6587
[9072]: https://datatracker.ietf.org/doc/html/rfc5424
[9073]: https://datatracker.ietf.org/doc/html/rfc3164