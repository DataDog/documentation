Los siguientes campos son opcional:

1. Introduce el nombre del índice de Elasticsearch. Consulta [sintaxis de plantillas][10051] si deseas dirigir logs a diferentes índices en función de campos específicos de tus logs.
1. Introduce la versión de Elasticsearch.
1. Opcionalmente, activa el interruptor para activar **Buffering Options** (Opciones de almacenamiento en búfer).<br>**Nota**: Las opciones de almacenamiento en búfer están en vista previa. Ponte en contacto con tu gestor de cuenta para solicitar acceso.
    - Si se deja desactivado, el tamaño máximo del búfer es de 500 eventos.
    - Si está activado:
        1. Selecciona el tipo de búfer que desees configurar (**Memory** (Memoria) o **Disk** (Disco)).
        1. Introduce el tamaño del búfer y selecciona la unidad.

[10051]: /es/observability_pipelines/destinations/#template-syntax