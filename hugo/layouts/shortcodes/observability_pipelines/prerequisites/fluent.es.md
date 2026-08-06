Para utilizar la fuente FluentD o Fluent Bit de Observability Pipelines, necesitas disponer de la siguiente información:

1. El Observability Pipelines Worker escucha en esta dirección bind para recibir logs de tus aplicaciones. Por ejemplo, `0.0.0.0:8088`. Más adelante, configurarás tus aplicaciones para que envíen logs a esta dirección.
2. Los certificados TLS apropiados y la contraseña que utilizaste para crear tu clave privada si tus forwarders están configurados globalmente para activar SSL.