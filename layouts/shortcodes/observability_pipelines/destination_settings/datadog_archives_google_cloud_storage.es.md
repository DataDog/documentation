1. Introduce el nombre de tu bucket de almacenamiento de Google Cloud. Si configuraste archivos de logs, es el bucket que creaste anteriormente.
1. Si tienes un archivo JSON de credenciales, introduce la ruta de acceso a tu archivo JSON de credenciales. Si configuraste archivos de logs, son las credenciales que descargaste [anteriormente](#create-a-service-account-to-allow-workers-to-write-to-the-bucket). El archivo de credenciales debe colocarse en `DD_OP_DATA_DIR/config`. Alternativamente, puedes utilizar la variable de entorno `GOOGLE_APPLICATION_CREDENTIALS` para proporcionar la ruta de acceso a credenciales.
    - Si utilizas [identidad de carga de trabajo][10053] en Google Kubernetes Engine (GKE), la dirección `GOOGLE_APPLICATION_CREDENTIALS` está a tu disposición.
    - El Worker utiliza [métodos de autenticación de Google][10052] estándar.
1. Selecciona la clase de almacenamiento para los objetos creados.
1. Selecciona el nivel de acceso de los objetos creados.
1. Opcionalmente, introduce el prefijo.
    - Los prefijos son útiles para particionar objetos. Por ejemplo, puedes utilizar un prefijo como clave de objeto para almacenar objetos en un directorio concreto. Si se utiliza un prefijo con este fin, debe terminar en `/` para que actúe como una ruta de directorio; no se añade automáticamente un `/` al final.
    - Consulta [sintaxis de plantillas][10051] si deseas dirigir logs a diferentes claves de objeto en función de campos específicos de tus logs.
     - **Nota**: Datadog recomienda empezar los prefijos con el nombre del directorio y sin barra oblicua (`/`). Por ejemplo, `app-logs/` o `service-logs/`.
1. Si lo deseas, haz clic en **Add Header** (Añadir encabezado) para añadir metadatos.
1. Opcionalmente, activa el interruptor para activar **Buffering Options** (Opciones de almacenamiento en búfer).<br>**Nota**: Las opciones de almacenamiento en búfer están en vista previa. Ponte en contacto con tu gestor de cuenta para solicitar acceso.
    - Si se deja desactivado, el tamaño máximo del búfer es de 500 eventos.
    - Si está activada:
        1. Selecciona el tipo de memoria intermedia que desees configurar (**Memory** (Memoria) o **Disk** (Disco)).
        1. Introduce el tamaño del búfer y selecciona la unidad.

[10051]: /es/observability_pipelines/destinations/#template-syntax
[10052]: https://cloud.google.com/docs/authentication#auth-flowchart
[10053]: https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity