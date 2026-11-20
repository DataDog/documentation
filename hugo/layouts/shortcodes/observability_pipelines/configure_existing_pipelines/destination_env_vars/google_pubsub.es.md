Por defecto, el worker envía datos al endpoint global: `https://pubsub.googleapis.com`.

Si tu tema Pub/Sub es específico de una región, configura la URL del endpoint alternativo de Google Pub/Sub con el endpoint regional. Para obtener más información, consulta [Acerca de los endpoints Pub/Sub][10240] para obtener más información.

La variable de entorno por defecto es `DD_OP_DESTINATION_GCP_PUBSUB_ENDPOINT_URL`.

#### TLS (si está activado)

- Frase de contraseña TLS de Google Pub/Sub:
    - La variable de entorno por defecto es `DD_OP_DESTINATION_GCP_PUBSUB_KEY_PASS`.

[10240]: https://cloud.google.com/pubsub/docs/reference/service_apis_overview#pubsub_endpoints