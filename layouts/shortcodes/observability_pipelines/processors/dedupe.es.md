El procesador de deduplicación elimina copias de datos para reducir el volumen y el ruido. Almacena en caché 5000 mensajes a la vez y compara el tráfico entrante de logs con los mensajes almacenados en caché. Por ejemplo, este procesador puede utilizarse para conservar sólo logs de advertencia únicos en el caso de que se envíen varios logs de advertencia idénticos seguidos.

Para configurar el procesador de deduplicación:
1. Define una **consulta de filtro**. Sólo se procesan los logs que coinciden con la [consulta de filtro] especificada (#filter-query-syntax). Todos los logs deduplicados y los logs que no coinciden con la consulta de filtro se envían al siguiente paso del pipeline.
1. En el menú desplegable **Type of deduplication** (Tipo de deduplicación), selecciona si deseas `Match` en o `Ignore` los campos especificados a continuación.
    - Si se selecciona `Match`, después de que pase un log, se eliminarán los futuros logs que tengan los mismos valores para todos los campos que especifiques a continuación.
    - Si se selecciona `Ignore`, después de que pase un log, se eliminarán los futuros logs que tengan los mismos valores para todos los campos, *excepto* los que especifiques a continuación.
1.  Introduce los campos con los que deseas establecer una correspondencia o ignorarlos. Se requiere al menos un campo, y puedes especificar un máximo de tres campos.
    - Utiliza la notación de ruta `<OUTER_FIELD>.<INNER_FIELD>` para hacer coincidir subcampos. Consulta el [Ejemplo de notación de ruta](#path-notation-example) más abajo.
1. Haz clic en **Add field** (Añadir campo) para añadir los campos adicionales que desees filtrar.

##### Ejemplo de notación de ruta

 Para la siguiente estructura de mensajes, utiliza `outer_key.inner_key.double_inner_key` para referirse a la clave con el valor `double_inner_value`.
```json
{
    "outer_key": {
        "inner_key": "inner_value",
            "a": {
                    "double_inner_key": "double_inner_value",
                    "b": "b value"
                },
            "c": "c value"
        },
        "d": "d value"
    }
```