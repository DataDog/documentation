Este procesador analiza los logs con las reglas de análisis de grok disponibles para un conjunto de fuentes. Las reglas se aplican automáticamente a los logs según su fuente. Por lo tanto, los logs deben tener un campo `source` con el nombre de la fuente. Si este campo no se añade cuando el log se envía al Observability Pipelines Worker, puedes usar el procesador **Añadir campo** para agregarlo.

Si el campo `source` de un log coincide con uno de los conjuntos de reglas de análisis sintáctico de grok, se verifica el campo `message` del registro con esas reglas. Si una regla coincide, los datos analizados resultantes se añaden en el campo `message` como un objeto JSON, sobrescribiendo el original `message`.

Si no hay un campo `source` en el log o ninguna regla coincide con este `message`, entonces no se realizan cambios en el log y se envía al siguiente paso del pipeline.


Para configurar el parseo grok, define una **consulta de filtro**. Solo se procesan los logs que coinciden con la [consulta de filtro](#filter-query-syntax) especificada. Todos los logs, independientemente de si coinciden con la consulta del filtro o no, se envían al siguiente paso del pipeline.

Para probar las muestras del log con reglas predefinidas:
1. Haz clic en el botón **Preview Library Rules (Reglas de la biblioteca de vista previa)**.
1. Busca o selecciona un origen en el menú desplegable.
1. Introduce una muestra del log para probar las reglas de parseo para ese origen.

Para añadir una regla personalizada de parseo:

1. Haz clic en **Añadir regla personalizada**.
2. Si quieres clonar una regla de biblioteca, selecciona **Clonar regla de biblioteca** y luego el origen de la biblioteca en el menú desplegable.
3. Si quieres crear una regla personalizada, selecciona **Personalizada** y luego introduce el `source`. Las reglas de análisis se aplican a los logs con `source`.
4. Introduce muestras de log para probar las reglas de parseo.
5. Introduce las reglas para analizar los logs. Consulta [Análisis][10031] para obtener más información sobre cómo escribir reglas de análisis.<br>**Nota**: Los filtros `url`, `useragent` y `csv` no están disponibles.
6. Haz clic en **Advanced Settings (Configuración avanzada)** si quieres añadir reglas auxiliares. Consulta [Uso de reglas auxiliares para factorizar múltiples reglas de análisis][10032] para obtener más información.
7. Haz clic en **Add Rule (Añadir regla)**.

[10031]: /logs/log_configuration/parsing/
[10032]: /logs/log_configuration/parsing/?tab=matchers#using-helper-rules-to-factorize-multiple-parsing-rules