Este procesador analiza logs mediante las reglas de parseo grok disponibles para un conjunto de orígenes. Las reglas se aplican automáticamente a logs basándose en el origen del log. Por lo tanto, los logs deben tener un campo `source` con el nombre del origen. Si este campo no se añade cuando el log se envía al worker de pipelines de observabilidad, puedes utilizar el procesador **Add field** (Añadir campo) para añadirlo.

Si el campo `source` de un log coincide con uno de los conjuntos de reglas de parseo grok, el campo `message` del log se comprueba con esas reglas. Si una regla coincide, los datos analizados resultantes se añaden al campo `message` como un objeto JSON, sobrescribiendo el `message` original.

Si no hay un campo `source` en el log, o ninguna regla coincide con el log `message`, entonces no se realizan cambios en el log y se envía al siguiente paso del pipeline.


Para configurar el analizador sintáctico grok, define un **filtro de consulta**. Sólo se procesan los logs que coincidan con la [consulta de filtro] especificada (#filter-query-syntax). Todos los logs, independientemente de si coinciden o no con la consulta de filtro, se envían al siguiente paso del pipeline.

Para probar muestras de log para las reglas predefinidas:
1. Haz clic en el botón **Preview Library Rules** (Previsualizar reglas de librería).
1. Busca o selecciona un origen en el menú desplegable.
1. Introduce una muestra de log para probar las reglas de parseo para ese origen.

Para añadir una regla personalizada de parseo:

1. Haz clic en **Add Custom Rule** (Añadir regla personalizada).
1. Si deseas clonar una regla de librería, selecciona **Clone library rule** (Clonar regla de librería) y, a continuación, el origen de librería en el menú desplegable.
1. Si deseas crear una regla personalizada, selecciona **Custom** (Personalizada) y, a continuación, introduce el `source`. Las reglas de parseo se aplican a logs con ese `source`.
1. Introduce muestras de log para probar las reglas de parseo.
1. Introduce las reglas para el parseo de los logs. Consulta [Parseo][10031] para obtener más información sobre la escritura de reglas de parseo.<br>**Nota**: Los filtros `url`, `useragent` y `csv` no están disponibles.
1. Haz clic en **Advanced Settings** (Configuración avanzada) si deseas añadir reglas auxiliares. Consulta [Uso de reglas auxiliares para factorizar varias reglas de parseo][10032] para obtener más información.
1. Haz clic en **Add Rule** (Añadir regla).

[10031]: /es/logs/log_configuration/parsing/
[10032]: /es/logs/log_configuration/parsing/?tab=matchers#using-helper-rules-to-factorize-multiple-parsing-rules
