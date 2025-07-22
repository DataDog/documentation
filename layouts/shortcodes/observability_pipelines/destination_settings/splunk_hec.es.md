<div class="alert alert-warning">Observability Pipelines comprime los logs con el algoritmo gzip (nivel 6).</div>

Los siguientes campos son opcionales:
1. Introduce el nombre del índice Splunk en el que quieres tus datos. Este tiene que ser un índice permitido para tu HEC. Consulta la [sintaxis de plantillas][10051] si quieres enrutar los logs a diferentes índices basándote en los campos específicos de tus logs.
1.  Elige si la marca de tiempo debe extraerse automáticamente. Si se configura en `true`, Splunk extrae la marca de tiempo del mensaje con el formato esperado de `yyyy-mm-dd hh:mm:ss`.
1. Opcionalmente, configura el `sourcetype` para anular el valor predeterminado de Splunk, que es `httpevent` para los datos HEC. Consulta la [sintaxis de plantillas][10051] si quieres dirigir los logs a diferentes tipos de origen basándote en los campos específicos de tus logs.

[10051]: /observability_pipelines/destinations/#template-syntax