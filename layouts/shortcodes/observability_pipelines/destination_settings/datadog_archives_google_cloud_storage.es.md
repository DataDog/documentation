<div class="alert alert-warning">El destino de almacenamiento Google Cloud solo admite <a href = "https://cloud.google.com/storage/docs/access-control/lists">Listas de control de acceso</a>.</div>

1. Introduce el nombre del bucket de almacenamiento de Google Cloud que creaste anteriormente.
1. Introduce la ruta al archivo JSON de credenciales que descargaste [anteriormente](#create-a-service-account-to-allow-workers-to-write-to-the-bucket).
1. Selecciona la clase de almacenamiento para los objetos creados.
1. Selecciona el nivel de acceso de los objetos creados.
1. Opcionalmente, introduce el prefijo.
   - Los prefijos son útiles para particionar objetos. Por ejemplo, puedes usar un prefijo como clave de objeto para almacenar objetos en un directorio particula. Si se usa un prefijo con este fin, debe terminar en `/` para que actúe como ruta de directorio; no se añade automáticamente un `/` al final.
   - Consulta la [sintaxis de plantillas][10051] si desea dirigir los logs a diferentes claves de objeto según los campos específicos de tus logs.
1. Opcionalmente, haz clic en **Añadir encabezados** para agregar metadatos.

[10051]: /observability_pipelines/destinations/#template-syntax