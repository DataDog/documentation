---
disable_toc: false
further_reading:
- link: logs/guide/control-sensitive-logs-data/
  tag: Documentación
  text: Control de datos confidenciales de logs
- link: /sensitive_data_scanner/
  tag: Documentación
  text: Sensitive Data Scanner
title: Borrar logs con datos confidenciales
---

## Información general

Es importante eliminar logs con datos confidenciales para garantizar la seguridad de tus datos. En esta guía se proporciona información sobre cómo:

- Check si los logs con datos confidenciales deben eliminarse por encontrarse dentro del periodo de retención.
- Hacer que logs con datos confidenciales no se puedan consultar.
- Editar datos confidenciales con Sensitive Data Scanner.
- Solicitar la eliminación de logs a soporte técnico de Datadog.

## Check tu periodo de retención de logs 

Datadog elimina automáticamente los logs que superen el periodo de retención más prolongado de tu organización.

Para check o cambiar el periodo de retención de logs:

1. Ve a la página [Índices de logs][1].
1. Consulta el periodo de retención de logs para cada índice en la columna **Retención**.
1. Si deseas que los logs expiren más rápido, haz clic en el ícono **Editar** situado a la derecha del índice.
1. Actualiza el menú desplegable **Configurar retención de índices** a un nuevo periodo de retención.

## Hacer que los logs con datos confidenciales no se puedan consultar

Si Logs contiene datos confidenciales dentro del periodo de conservación de loguear, puede hacer que no se puedan consultar en Datadog's loguear Explorer, dashboards, y Live Tail hasta que caduquen. Logs que no se puedan consultar no están disponibles para su consulta o visualización. Siga estas [instrucciones][2] para desactivar la consulta de Logs con datos confidenciales en Datadog.

## Borrar un índice completo

Para borrar un índice completo:

1. Ve a la página [Índices de logs][1].
1. Haz clic en el ícono **Borrar** situado a la derecha del índice que deseas eliminar.
1. Haz clic en **Confirmar** para eliminar el índice.

**Nota**: El índice se muestra como pendiente de borrado hasta que los logs expiren, tras lo cual el índice se borra por completo y se elimina de la interfaz de usuario.

## Editar datos confidenciales con Sensitive Data Scanner

Utiliza [Sensitive Data Scanner][5] para limitar el riesgo de almacenar datos confidenciales en Datadog. Sensitive Data Scanner es un servicio de concordancia de patrones basado en el flujo (stream) utilizado para identificar, etiquetar y, opcionalmente, editar o convertir los datos confidenciales en hash. Los equipos de seguridad y cumplimiento pueden implementar Sensitive Data Scanner para evitar fugas de datos confidenciales y limitar los riesgos de incumplimiento.

## Enviar una solicitud de eliminación a logs 

<div class="alert alert-danger">
Sólo un administrador de Datadog puede solicitar la eliminación de logs. Si no eres administrador, asegúrate de incluir a un administrador en la solicitud de manera que pueda confirmar la solicitud de eliminación.
</div>

Si las opciones para cambiar el periodo de retención, hacer que los logs no se puedan consultar y editar los datos confidenciales mediante Sensitive Data Scanner no son suficientes para garantizar la seguridad de tus datos, envía una solicitud a [soporte técnico de Datadog][3] para que se eliminen los logs indexados con datos confidenciales. Tu solicitud debe incluir la siguiente información:

1. Confirmación de que los logs con datos confidenciales ya no se envían a Datadog.
1. Si se trata de una solicitud de eliminación selectiva por intervalo de tiempo o de una solicitud de [eliminación de un índice completo](#delete-an-entire-index).
1. El nombre exacto de la organización y el [sitio][4] (por ejemplo, US1) al que se enviaron los datos confidenciales.
1. Si se trata de una solicitud de eliminación selectiva por intervalo de tiempo, el intervalo de tiempo exacto, en formato Epoch o UTC, de los logs que contenían datos confidenciales.
1. El nombre de los índices donde están los datos confidenciales.
1. Confirmación de que comprendes el siguiente requisito:
   <div class="alert alert-warning">
   Datadog deletes logs by time buckets, not by query scope or precise time frame. Therefore, Datadog might have to delete a larger amount of data than your exposed logs. For example. if you need to delete all error logs from <code>service:x</code> that came in between 10:00 a.m. to 12:00 p.m. from <code>index:main</code>, Datadog might have to delete all logs in that index from 1:00 a.m. to 5:00 p.m. Datadog support will work with you to ensure that only the necessary data is deleted.
   </div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /es/logs/guide/control-sensitive-logs-data/#make-sensitive-logs-un-queryable-in-datadog-until-they-age-out
[3]: /es/help/
[4]: /es/getting_started/site/
[5]: https://www.datadoghq.com/product/sensitive-data-scanner/