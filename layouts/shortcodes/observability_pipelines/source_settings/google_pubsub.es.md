1. Introduce el nombre del proyecto fuente.
1. Si tienes un archivo JSON de credenciales, introduce la ruta a tu archivo JSON de credenciales. El archivo de credenciales debe colocarse en `DD_OP_DATA_DIR/config`. También puedes utilizar la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS` para proporcionar la ruta a las credenciales.
    - Si utilizas la [identidad de cargas de trabajo][10021] en Google Kubernetes Engine (GKE), se te proporcionará la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS`.
    - El worker utiliza [métodos de autenticación de Google][10022] estándar.
1. Introduce el nombre de la suscripción.
1. Selecciona el decodificador que deseas utilizar (Bytes, GELF, JSON, syslog).
1. Opcionalmente, alterna al interruptor para activar TLS. Si activas TLS, se requieren los siguientes archivos de certificados y claves.<br>**Nota**: Todas las rutas a los archivos son relativas al directorio de datos de configuración, que es `/var/lib/observability-pipelines-worker/config/` por defecto. Consulta [Configuraciones avanzadas del worker][10172] para obtener más información. El archivo debe ser propiedad del usuario `observability-pipelines-worker group` y `observability-pipelines-worker` o al menos legible por el grupo o usuario.
    - `Server Certificate Path`: La ruta al archivo del certificado que fue firmado por el archivo raíz de tu autoridad de certificación (CA) en formato DER o PEM (X.509).
    - `CA Certificate Path`: La ruta al archivo del certificado que es el archivo raíz de tu autoridad de certificación (CA) en formato DER o PEM (X.509).
    - `Private Key Path`: La ruta al archivo de la clave privada `.key` que pertenece a la ruta de tu certificado de servidor en formato DER o PEM (PKCS #8).

[10172]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
<!-- El enlace 10172 se utiliza en múltiples códigos cortos, de modo de que si cambia, asegúrate de actualizar esos códigos cortos mediante la función de buscar y reemplazar -->
[10021]: https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[10022]: https://cloud.google.com/docs/authentication#auth-flowchart