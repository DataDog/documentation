El procesador de cuotas mide el tráfico de logs para los que coinciden con el filtro que especifiques. Cuando se alcanza la cuota diaria configurada dentro de la ventana móvil de 24 horas, el procesador puede descartar los logs adicionales o enviar una alerta mediante un monitor de Datadog. Puedes configurar el procesador para realizar un seguimiento del volumen total o del número total de eventos. El pipeline usa el nombre de la cuota para identificarla en varias implementaciones de configuración remota del Worker.

Por ejemplo, puedes configurar este procesador para que elimine nuevos logs o active una alerta sin eliminarlos después de que el procesador haya recibido 10 millones de eventos de un servicio determinado en las últimas 24 horas.

Para configurar el procesador de cuotas:
1. Introduce un nombre para el procesador de cuotas.
1. Define una **consulta de filtro**. Solo los logs que coinciden con la [consulta de filtro](#filter-query-syntax) especificada se cuentan para el límite diario.
    - Los logs que coinciden con el filtro de cuota y están dentro de la cuota diaria se envían al siguiente paso del pipeline.
    - Los logs que no coinciden con el filtro de cuota se envían al siguiente paso del pipeline.
1. En el menú desplegable **Unidad para la cuota**, selecciona si deseas medir la cuota por el número de `Events` o por la `Volume` en bytes.
1. Establece el límite de la cuota diaria y selecciona la unidad de magnitud para la cuota deseada.
1. Marca la casilla **Drop Events (Descartar eventos)** si quieres descartar todos los eventos cuando se alcance tu cuota. Déjalo sin marcar si planeas configurar un [monitor][5001] que envíe una alerta cuando se alcance la cuota.
    - Si se reciben logs que coinciden con el filtro de cuota después de haber alcanzado la cuota diaria y se selecciona la opción **Drop Events (Descartar eventos)**, esos logs se descartan. En este caso, solo se envían al siguiente paso del pipeline los logs que no coinciden con la consulta del filtro.
    - Si se reciben logs que coinciden con el filtro de cuota después de alcanzar la cuota diaria y no se ha seleccionado la opción **Drop Events (Descartar eventos)**, esos logs y los que no coinciden con la consulta del filtro se envían al siguiente paso del pipeline.
1. Opcional: Haz clic en **Add Field (Añadir campo)** si quieres establecer una cuota en un campo específico de servicio o región.    a. Introduce el nombre del campo por el que quieres particionar. Consulta el [ejemplo de partición](#partition-example) para obtener más información.        i. Selecciona **Ignorar cuando no se encuentre** si deseas que la cuota se aplique solo a los eventos que coincidan con la partición. Consulta el [ejemplo de Ignorar cuando no se encuentra](#example-for-the-ignore-when-missing-option) para más información.        ii. Opcional: Haz clic en **Overrides (Anulaciones)** si quieres establecer cuotas diferentes para el campo particionado.        - Haz clic en **Download as CSV (Descargar como CSV)** para obtener un ejemplo de cómo estructurar el CSV.        - Arrastra y suelta el archivo CSV de anulaciones para subirlo. También puedes hacer clic en **Examinar** para seleccionar el archivo que deseas subir. Consulta el [Overrides example (ejemplo de anulaciones)](#overrides-example) para más información.    b. Haz clic en **Add Field (Añadir campo)** si quieres añadir otra partición.

#### Ejemplos

##### Ejemplo de partición

Usa **Partition by (Particionar por)** si quieres establecer una cuota en un servicio o una región específicos. Por ejemplo, si quieres establecer una cuota de 10 eventos al día y agrupar los eventos según el campo `service`, introduce `service` en el campo **Partition by (Particionar por)**.

##### Ejemplo de la opción "ignorar cuando no se encuentra"

Selecciona **Ignore when missing (Ignorar cuando no se encuentra)** si quieres que la cuota se aplique solo a los eventos que coincidan con la partición. Por ejemplo, si el Worker recibe el siguiente conjunto de eventos:

```
{"service":"a", "source":"foo", "message": "..."}
{"service":"b", "source":"bar", "message": "..."}
{"service":"b", "message": "..."}
{"source":"redis", "message": "..."}
{"message": "..."}
```

Además, si se selecciona **Ignore when missing (Ignorar cuando no se encuentra)**, entonces el Worker:
- crea un conjunto para los logs con `service:a` y `source:foo`
- crea un conjunto para los logs con `service:b` y `source:bar`
- ignora los últimos tres eventos

La cuota se aplica a los dos conjuntos de logs y no a los últimos tres eventos.

Si no se selecciona **Ignore when missing (Ignorar cuando no se encuentra)**, la cuota se aplica a los cinco eventos.

##### Ejemplo de anulaciones

Si estás particionando por `service` y tienes dos servicios: `a` y `b`, puedes usar anulaciones para aplicarles cuotas diferentes. Por ejemplo, si quieres que `service:a` tenga un límite de cuota de 5000 bytes y `service:b` tenga un límite de 50 eventos, las reglas de anulación se verán así:

| Servicio| Tipo| Límite|
|----------|----------|----------|
| `a`| Bytes| 5000|
| `b`| Eventos| 50|

[5001]: /monitors/types/metric/?tab=threshold
