El procesador de deduplicación elimina las copias de datos para reducir el volumen y el ruido. Almacena en caché 5000 mensajes a la vez y compara el tráfico de tus logs entrantes con los mensajes almacenados en caché. Por ejemplo, este procesador puede usarse para mantener únicamente logs de avisos únicos en el caso de que se envíen varios logs de avisos idénticos de manera sucesiva.

Para configurar el procesador de deduplicación:
1. Define una **consulta de filtro**. Solo se procesan los logs que coinciden con la [consulta de filtro](#filter-query-syntax) especificada. Los logs deduplicados y los que no coinciden con la consulta del filtro se envían al siguiente paso del pipeline.
1. En el menú desplegable **Tipo de deduplicación**, selecciona si deseas activar `Match` o `Ignore` los campos especificados a continuación
   - Si se selecciona `Match`, después de que pase un log, se eliminarán los futuros logs que tengan los mismos valores para todos los campos que especifiques a continuación.
   - Si se selecciona `Ignore`, después de que pase un log, se eliminarán los futuros logs que tengan los mismos valores para todos tus campos, *excepto* los que especifiques a continuación.
1. Introduce los campos en los que deseas que coincidan o se ignoren. Se requiere al menos un campo y puedes especificar un máximo de tres campos.
   - Usa la notación de ruta `<OUTER_FIELD>.<INNER_FIELD>` para coincidir con subcampos. Consulta el [ejemplo de notación de ruta](#path-notation-example) a continuación.
1. Haz clic en **Add field (Añadir campo)** para agregar campos adicionales en los que desees filtrar.

##### Ejemplo de notación de ruta

Para la siguiente estructura de mensajes, usa `outer_key.inner_key.double_inner_key` para referirte a la clave con el valor `double_inner_value`.
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