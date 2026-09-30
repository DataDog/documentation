Para utilizar la fuente Logstash de Observability Pipelines, necesitas disponer de la siguiente información:

- La dirección de Logstash, como por ejemplo `0.0.0.0:8088`. El Worker de Observability Pipelines escucha en esta dirección bind para recibir logs de tus aplicaciones. Más tarde, podrás configurar tus aplicaciones para enviar logs a esta dirección.
- Los certificados TLS apropiados y la contraseña que utilizaste para crear tu clave privada, si tus forwarders están configurados globalmente para activar SSL.