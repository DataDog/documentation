Para configurar tu fuente de servidor HTTP/S, introduce lo siguiente:

1. Selecciona tu estrategia de autorización.
1. Selecciona el descodificador que deseas utilizar en los mensajes HTTP. Tus logs de cliente HTTP deben tener este formato. **Nota**: Si seleccionas la decodificación `bytes`, el log sin formato se almacena en el campo `message`.
1. Opcionalmente, alterna al interruptor para activar TLS. Si activas TLS, se requieren los siguientes archivos de certificados y claves.<br>**Nota**: Todas las rutas a los archivos son relativas al directorio de datos de configuración, que es `/var/lib/observability-pipelines-worker/config/` por defecto. Consulta [Configuraciones avanzadas del worker][10172] para obtener más información. El archivo debe ser propiedad del usuario `observability-pipelines-worker group` y `observability-pipelines-worker` o al menos legible por el grupo o usuario.
    - `Server Certificate Path`: la ruta al archivo del certificado que ha sido firmado por el archivo raíz de tu autoridad de certificación (CA) en DER o PEM (X.509).
    - `CA Certificate Path`: la ruta al archivo de certificado que es el archivo raíz de tu autoridad de certificación (CA) en DER o PEM (X.509).
    - `Private Key Path`: la ruta al archivo de clave privada `.key` que pertenece a la ruta de tu certificado de servidor en formato DER o PEM (PKCS #8).

[10172]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
<!-- El enlace 10172 se utiliza en múltiples códigos cortos, de modo de que si cambia, asegúrate de actualizar esos códigos cortos mediante la función de buscar y reemplazar -->
