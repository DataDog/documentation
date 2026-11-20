Para configurar el destino de Google Chronicle del worker:

1. Introduce el ID de cliente de tu instancia de Google Chronicle.
1. Si tienes un archivo JSON de credenciales, introduce la ruta a tu archivo JSON de credenciales. El archivo de credenciales debe colocarse en `DD_OP_DATA_DIR/config`. También puedes utilizar la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS` para proporcionar la ruta a las credenciales.
    - Si utilizas [identidades de carga de trabajo][10004] en Google Kubernetes Engine (GKE), la dirección `GOOGLE_APPLICATION_CREDENTIALS` está a tu disposición.
    - El worker utiliza [métodos de autenticación de Google][10005] estándar.
1. Selecciona **JSON** o **Raw** (Sin formato) en el menú desplegable.
1. Introduce el tipo de log. Consulta la [sintaxis de plantilla][10002] si quieres enviar logs a diferentes tipos de logs en función de campos específicos de tus logs.
1. También puedes activar el interruptor para habilitar **Opciones de almacenamiento en buffer**.<br>**Nota**: Las opciones de almacenamiento en buffer están en vista previa. Ponte en contacto con tu gestor de cuenta para solicitar acceso.
    - Si se deja desactivado, el tamaño máximo del almacenamiento en buffer es de 500 eventos.
    - Si se activa:
        1. Selecciona el tipo de buffer que quieres configurar (**Memoria** o **Disco**).
        1. Introduce el tamaño del buffer y selecciona la unidad.

**Nota**: Los logs enviados al destino de Google Chronicle deben tener etiquetas (labels) de ingesta. Por ejemplo, si los logs proceden de un equilibrador de carga A10, debe tener la etiqueta (label) de ingesta `A10_LOAD_BALANCER`. Consulta [Compatibilidad de tipos de log con un analizador predeterminado][10003] de Google Cloud para obtener una lista de los tipos de log disponibles y sus respectivas etiquetas (labels) de ingesta.

[10002]: /es/observability_pipelines/destinations/#template-syntax
[10003]: https://cloud.google.com/chronicle/docs/ingestion/parser-list/supported-default-parsers#with-default-parser
[10004]:https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[10005]: https://cloud.google.com/docs/authentication#auth-flowchart