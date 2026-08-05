Para utilizar la fuente Syslog de Observability Pipelines, tus aplicaciones deben enviar datos en uno de los siguientes formatos: [RFC 6587][9071], [RFC 5424][9072], [RFC 3164][9073]. También debes disponer de la siguiente información:

1. La dirección bind en la que tu Observability Pipelines Worker (OPW) escuchará para recibir logs de tus aplicaciones. Por ejemplo, `0.0.0.0:8088`. Más adelante, configurarás tus aplicaciones para que envíen logs a esta dirección.
2. Los certificados TLS apropiados y la contraseña que utilizaste para crear tu clave privada si tus forwarders están configurados globalmente para activar SSL.

[9071]: https://datatracker.ietf.org/doc/html/rfc6587
[9072]: https://datatracker.ietf.org/doc/html/rfc5424
[9073]: https://datatracker.ietf.org/doc/html/rfc3164