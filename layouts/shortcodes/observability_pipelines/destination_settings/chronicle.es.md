Para autenticar el Observability Pipelines Worker para Google Chronicle, considera ponerte en contacto con tu representante de operaciones de seguridad de Google para obtener una credencial de cuenta de servicio de desarrollador de Google. Este archivo de credenciales JSON debe colocarse en `DD_OP_DATA_DIR/config`. Consulta [Credenciales de autenticación de API][10001] para más información.

Para configurar el destino de Google Chronicle del Worker:

1. Introduce el ID de cliente de tu instancia de Google Chronicle.
1. Introduce la ruta al archivo JSON de credenciales que descargaste anteriormente.
1. Selecciona **JSON** o **Raw** como formato de codificación en el menú desplegable.
1. Introduce el tipo de log. Consulta la [sintaxis de plantillas][10002] si quieres dirigir los logs a diferentes tipos de log basándote en campos específicos de tus logs.

**Nota**: Los logs enviados al destino de Google Chronicle deben llevar etiquetas de ingesta. Por ejemplo, si los logs son de un equilibrador de carga A10, deben tener la etiqueta de ingestión `A10_LOAD_BALANCER`. Consulta [Tipos de logs compatibles con un analizador predeterminado][10003] de Google Cloud para ver una lista de los tipos de logs disponibles y sus respectivas etiquetas de ingestión.

[10001]: https://cloud.google.com/chronicle/docs/reference/ingestion-api#getting_api_authentication_credentials
[10002]: /observability_pipelines/destinations/#template-syntax
[10003]: https://cloud.google.com/chronicle/docs/ingestion/parser-list/supported-default-parsers#with-default-parser