Opcionalmente, activa el interruptor para habilitar TLS. Si habilitas TLS, se requieren los siguientes archivos de certificado y clave.
   - `Server Certificate Path`: La ruta al archivo del certificado que está firmado por el archivo raíz de la Autoridad de certificación (CA) en formato DER o PEM (X.509).
   - `CA Certificate Path`: La ruta al archivo del certificado que es tu archivo raíz de la Autoridad de certificación (CA) en formato DER o PEM (X.509).
   - `Private Key Path`: La ruta al archivo de clave privada `.key` que pertenece a la ruta de tu certificado de servidor en formato DER o PEM (PKCS#8).

**Nota**: Todas las rutas de archivos se hacen relativas al directorio de datos de configuración, que es `/var/lib/observability-pipelines-worker/config/` por defecto. Consulta [Configuraciones avanzadas del worker][10172] para más información. El archivo debe ser propiedad del usuario `observability-pipelines-worker group` y `observability-pipelines-worker`, o al menos legible por el grupo o usuario.

[10172]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
<!-- El enlace 10172 se utiliza en múltiples códigos cortos, de modo de que si cambia, te aseguras de actualizar esos códigos cortos mediante buscar y reemplazar -->