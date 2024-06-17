---
kind: Documentación
title: Monitorización del espacio disponible en disco
---



Una métrica de sistema que habitualmente se monitoriza es el espacio disponible en el disco de un sistema o host determinado. Esta guía te ayuda a crear un monitor que emite alertas cuando el espacio libre en el disco de cualquier host que informa a Datadog cae por debajo del 10%.

Para crear un monitor del espacio disponible en disco:

1. En el menú de navegación, haz clic en **Monitors** (Monitores).
2. Haz clic en **New Monitor** (Nuevo Monitor).
3. Selecciona **Metric** (Métrica) como tipo de monitor.
     1. En la sección **Definir la métrica**, utiliza `system.disk.free` para la métrica y selecciona `host` para **avg by**. Esta es la consulta A.
     2. Haz clic en **Add Query** (Añadir consulta), utiliza `system.disk.total` para la métrica y selecciona `host` para **avg by**. Esta es la consulta B.
     3. En la fórmula que aparece, sustituye `a + b` por `a/b*100`.

         {{< img src="monitors/guide/monitoring_free_disk_space.png" alt="Definición de consulta de system.disk.free y system.disk.total con la fórmula a/b*100" style="width:80%;">}}


     4. En **Evaluation Details** (Detalles de la evaluación), elige el intervalo de evaluación deseado.
5. En **Set alert conditions** (Definir condiciones de alerta), selecciona **below** (por debajo) en las opciones del umbral e introduce `10` en el campo **Alert threshold** (Umbral de alerta).
6. En **Configure notifications & automations** (Configurar notificaciones y automatizaciones), asigna un nombre a tu monitor y luego especifica el mensaje de notificación. Incluye detalles relevantes y una plantilla para mensajes importantes. Por ejemplo

     ```
       {{#is_alert}}Warning: Free disk space is below 10% on {{host.name}}. Free space: {{system.disk.free}} bytes, Total space: {{system.disk.total}} bytes.{{/is_alert}}
     ```

7. Haz clic en **Save* (Guardar) para guardar el monitor.

[1]: https://app.datadoghq.com/monitors/