El procesador de reasignación puede agregar, eliminar o renombrar campos dentro de tus datos de log individuales. Usa este procesador para enriquecer tus logs con contexto adicional, eliminar campos de poco valor para reducir el volumen y estandarizar la nomenclatura de los atributos importantes. Selecciona **Add field (añadir campo)**, **Delete field (eliminar campo)** o **Rename field (renombrar campo)** en el menú desplegable para comenzar.

##### Añadir campo
Utiliza **Add field (añadir campo)** para añadir un nuevo campo clave-valor a tu log.

Para configurar el procesador de Añadir campo:
1. Define una **consulta de filtro**. Solo se procesan los logs que coinciden con la [consulta de filtro](#filter-query-syntax) especificada. Todos los logs, sin importar si coinciden o no con la consulta del filtro, se envían al siguiente paso del pipeline.
1. Introduce el campo y el valor que deseas añadir. Para especificar un campo anidado para tu clave, usa la [notación de ruta](#path-notation-example-remap): `<OUTER_FIELD>.<INNER_FIELD>`. Todos los valores se guardan como cadenas.
    **Nota**: Si el campo que quieres añadir ya existe, el Worker genera un error y el campo existente permanece sin cambios.

##### Eliminar campo

Usa **Drop field (eliminar campo)** para descartar un campo de los datos de log que coincida con el filtro que especifiques a continuación Puede eliminar objetos, así que puedes usar el procesador para descartar claves anidadas.

Para configurar el procesador de Elmiminar campo:
1. Define una **consulta de filtro**. Solo se procesan los logs que coinciden con la [consulta de filtro](#filter-query-syntax) especificada. Todos los logs, sin importar si coinciden o no con la consulta del filtro, se envían al siguiente paso del pipeline.
1. Introduce la clave del campo que deseas eliminar. Para especificar un campo anidado para tu clave especificada, usa la [notación de ruta](#path-notation-example-remap): `<OUTER_FIELD>.<INNER_FIELD>`.
    **Nota**: Si la clave especificada no existe, tu log no se verá afectado.

##### Renombrar campo

Usa **Rename field (renombrar campo)** para renombrar un campo dentro de tu log.

Para configurar el procesador de Renombrar campo:
1. Define una **consulta de filtro**. Solo se procesan los logs que coinciden con la [consulta de filtro](#filter-query-syntax) especificada. Todos los logs, sin importar si coinciden o no con la consulta del filtro, se envían al siguiente paso del pipeline.
2. Introduce el nombre del campo que deseas renombrar en el **Campo de origen**. Para especificar un campo anidado para tu clave, usa la [notación de ruta](#path-notation-example-remap): `<OUTER_FIELD>.<INNER_FIELD>`. Una vez renombrado, el campo original se elimina a menos que actives la casilla **Preserve source tag (Conservar etiqueta de origen)** que se describe a continuación.<br>**Nota**: Si la clave de origen que especificas no existe, se aplicará un valor predeterminado `null` a tu destino.
3. En el **campo de destino**, introduce el nombre al que deseas renombrar el campo de origen. Para especificar un campo anidado para tu clave especificada, usa la [notación de ruta](#path-notation-example-remap): `<OUTER_FIELD>.<INNER_FIELD>`.<br>**Nota**: Si el campo de destino que especificas ya existe, el Worker genera un error y no sobrescribe el campo de destino existente.
4. Opcionalmente, considera marcar la casilla **Conservar etiqueta de origen** si deseas conservar el campo de origen original y duplicar la información de tu clave de origen en la clave de destino especificada. Si esta casilla no está marcada, la clave de origen se elimina después de ser renombrada.

##### Ejemplo de notación de ruta {#path-notation-example-remap}

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