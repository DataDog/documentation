Para utilizar la fuente del cliente HTTP/S de Observability Pipelines, necesitas disponer de la siguiente información:

1. La ruta completa del endpoint del servidor HTTP del que el Observability Pipelines Worker recopila eventos de logs. Por ejemplo, `https://127.0.0.8/logs`.
2. El token o la contraseña de autenticación HTTP.

La fuente del cliente HTTP/S extrae datos de tu servidor HTTP ascendente. Tu servidor HTTP debe admitir solicitudes GET para la URL del endpoint del cliente HTTP que configuraste como variable de entorno al instalar el Worker.
