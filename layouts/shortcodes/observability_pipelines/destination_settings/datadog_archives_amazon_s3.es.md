1. Introduce el nombre del bucket de S3 que creaste anteriormente.
1. Introduce la región AWS en la que se encuentra el bucket de S3.
1. Introduce el prefijo de la clave.
   - Los prefijos son útiles para particionar objetos. Por ejemplo, puedes usar un prefijo como clave de objeto para almacenar objetos en un directorio particula. Si se usa un prefijo con este fin, debe terminar en `/` para que actúe como ruta de directorio; no se añade automáticamente un `/` al final.
   - Consulta la [sintaxis de plantillas][10051] si desea dirigir los logs a diferentes claves de objeto según los campos específicos de tus logs.
1. Selecciona la clase de almacenamiento para tu bucket de S3 en el menú desplegable **Storage Class (Clase de almacenamiento)**.

Tu ID de clave de acceso AWS y tu clave de acceso secreta AWS estarán configurados como variables de entorno cuando instales el Worker más tarde.

[10051]: /observability_pipelines/destinations/#template-syntax