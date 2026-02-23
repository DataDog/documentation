1. Introduce el nombre del contenedor de Azure que has creado anteriormente.
1. Si lo deseas, introduce un prefijo.
    - Los prefijos son útiles para particionar objetos. Por ejemplo, puedes utilizar un prefijo como clave de objeto para almacenar objetos en un directorio concreto. Si se utiliza un prefijo con este fin, debe terminar en `/` para que actúe como una ruta de directorio; no se añade automáticamente un `/` al final.
    - Consulta [sintaxis de plantillas][10051] si deseas dirigir logs a diferentes claves de objeto en función de campos específicos de tus logs.
     - **Nota**: Datadog recomienda empezar los prefijos con el nombre del directorio y sin barra oblicua (`/`). Por ejemplo, `app-logs/` o `service-logs/`.
1. Opcionalmente, activa el interruptor para activar **Buffering Options** (Opciones de almacenamiento en búfer).<br>**Nota**: Las opciones de almacenamiento en búfer están en vista previa. Ponte en contacto con tu gestor de cuenta para solicitar acceso.
    - Si se deja desactivado, el tamaño máximo del búfer es de 500 eventos.
    - Si está activado:
        1. Selecciona el tipo de memoria intermedia que desees configurar (**Memory** (Memoria) o **Disk** (Disco)).
        1. Introduce el tamaño del búfer y selecciona la unidad.

[10051]: /es/observability_pipelines/destinations/#template-syntax