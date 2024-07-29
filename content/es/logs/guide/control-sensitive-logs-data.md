---
aliases:
- /es/logs/guide/restrict-access-to-sensitive-data-with-rbac
further_reading:
- link: /logs/guide/logs-rbac/
  tag: Documentación
  text: Establecer controles de acceso basados en roles (RBAC) para Log Management
- link: /agent/logs/advanced_log_collection
  tag: Documentación
  text: Filtra y redacta logs con la recopilación avanzada de logs
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Excluir contenedores de la recopilación de log con Autodiscovery
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Incrementa el cumplimiento, la gobernabilidad y la transparencia en todos
    tus equipos con Datadog Audit Trail
kind: guía
title: Control de datos de logs confidenciales
---

## Información general

Los logs pueden contener datos confidenciales y deben tratarse con cuidado. Si estás ingiriendo datos confidenciales en Datadog, ten en cuenta lo siguiente:

- Si has configurado intencionadamente tus logs para que tengan datos confidenciales con fines legítimos de solucionar problemas y hacer auditorías, utiliza el **Control de acceso basado en roles** para asegurarte de que has configurado las restricciones adecuadas, de modo que solo los usuarios autorizados que tengan acceso a tu cuenta de Datadog puedan acceder a estos datos. Para obtener más información, consulta la [Guía del usuario del Control de acceso basado en roles de logs (RBAC)][1] para aprender cómo configurarlo para tu organización.
- Haz frente a cualquier registro involuntario de datos confidenciales para abordar preventivamente cualquier preocupación en el futuro. Sigue leyendo esta guía para obtener más información.

Controlar todos tus datos puede ser un reto, especialmente en una plataforma grande y colaborativa. Esta guía te orienta a través de las diferentes opciones para descubrir y gestionar los datos confidenciales que se ingieren en Datadog.

## Sensitive Data Scanner

[Sensitive Data Scanner][2] es un servicio de búsqueda de patrones basado en flujos (stream) que puedes utilizar para identificar, etiquetar y, opcionalmente, redactar o extraer datos confidenciales. Con esta función, tus equipos de seguridad y cumplimiento pueden introducir una línea de defensa para evitar que los datos confidenciales se filtren fuera de tu organización. Sensitive Data Scanner está disponible en tus [Parámetros de organización][3].

Si ya has indexado logs que contienen datos confidenciales, sigue estos tres pasos:

1. [Determina el contexto de los datos que se envían](#determine-the-scope-of-the-data-being-sent)
2. [Fija el origen ascendente de los datos](#fix-the-source-of-the-data-upstream)
3. [Maneja datos ya enviados a Datadog](#handle-data-already-sent-to-and-indexed-in-datadog)

## Determinar el contexto de los datos que se envían

### ¿Qué consulta de log define los datos confidenciales?

En primer lugar, define una consulta que resuma los datos confidenciales. Esa consulta devolverá todos los logs con datos confidenciales.

Lo más probable es que consultas como `version:x.y.z source:python status:debug` se ajusten a esa expectativa. Consulta la documentación [Sintaxis de búsqueda de log][4] si necesitas utilizar operadores más avanzados (comodines, operadores booleanos, etc.).

Esta guía se refiere a este ejemplo de consulta como **consulta de esquema confidencial**.

### ¿Dónde se encuentran los datos confidenciales en Datadog?

Una vez que los datos confidenciales de logs se envían a la plataforma de Datadog, pueden existir en varios lugares. En consecuencia, comprueba cada uno de los siguientes lugares (ordenados de más probable a menos probable que contengan datos confidenciales):

* [Índices][5] de Datadog es donde se almacenan los logs en Datadog hasta que caducan de acuerdo con la retención de índices. Debes centrarte en los índices de Datadog, ya que es menos probable que otras localizaciones tengan un problema de cumplimiento. Comprueba los [filtros de índices][6] y [filtros de exclusión][7] para ver si los logs con datos confidenciales están indexados.

* [Archivos][8] de log, que es donde Datadog envía logs para que se almacenen. Configura Filtros de archivo para ver si tu archivo contiene logs confidenciales.

* [Métricas generadas a partir de logs][9], que almacenan métricas agregadas. Los datos confidenciales pueden haber sido descartados con este proceso. Comprueba los filtros de métricas personalizadas si se procesan logs con datos confidenciales.

* Notificaciones de [monitores de log][10] cuando incluyen [muestras de log][11]. Comprueba específicamente los monitores activados durante el periodo en el que se enviaban datos confidenciales.

* [Live Tail][12], donde los usuarios de tu organización consultan logs en tiempo real. No hay persistencia más allá de 50 logs almacenados en caché en los navegadores, y para consultas más amplias, el resultado puede ser muy muestreado.

## Fijar el origen ascendente de los datos

### Redactar datos confidenciales en logs de transmisión utilizando Sensitive Data Scanner

Utiliza reglas preestablecidas o personalizadas para [identificar y redactar otros tipos de datos confidenciales][2] que sigan entrando en tus logs.

### Detener la indexación de logs confidenciales

Si no utilizas Sensitive Data Scanner, determina si deseas excluir por completo de la indexación cualquier log nuevo que contenga datos confidenciales. De todas formas, tendrás que tratar los logs que contengan datos confidenciales ya indexados en Datadog.

* Averigua qué índices contienen logs con datos confidenciales.
* Para cada índice, añade un filtro de exclusión basado en la consulta de esquema confidencial.

{{< img src="logs/guide/sensitive/sensitive_exclusion-filters.png" alt="Filtros de exclusión de datos confidenciales" style="width:80%;" >}}

### Dejar de enviar datos confidenciales a Datadog

Si se prohíbe que determinados tipos de datos confidenciales salgan de entorno y se ingieran en Datadog, añade reglas de limpieza en la recopilación de origen.

Si tienes forma de cambiar los propios registradores, Datadog te ofrece soluciones para evitar que los datos confidenciales desde el punto de vista del cumplimiento se envíen fuera de tu plataforma cuando utilices [Datadog Agent ][13] para la recopilación de logs:

* [Limpia los datos confidenciales][14] de tus logs antes de enviarlos a Datadog.
* Alternativamente, utiliza [Autodiscovery][15] para añadir controles precisos para la recopilación de logs de contenedores.

Existen capacidades de limpieza similares para el [Serverless Forwarder][16].

## Manejar los datos ya enviados e indexados en Datadog

Sigue los siguientes pasos de acuerdo con tus requisitos de cumplimiento. Puede que no sea necesario completar todos los pasos.

### Hacer que los logs confidenciales no se puedan consultar en Datadog (hasta que caduquen)

Este paso hace que los logs con datos confidenciales, tanto logs que ya se enviaron como logs que podrían seguir llegando, no se puedan consultar en Datadog (Explorer, Dashboards y Livetail).

Utiliza la [página de configuración de acceso a datos][17] y una consulta de esquema confidencial para definir una [restricción][18] que se aplique a todas las personas de tu organización. Por ejemplo, la consulta mencionada anteriormente: `version:x.y.z source:python status:debug`.

**Nota:** El uso de **NOT** en la consulta de esquema confidencial restringe a los usuarios la posibilidad de ver cualquier cosa que NO coincida con logs.

{{< img src="logs/guide/sensitive/sensitive_data_access.png" alt="Acceso a datos confidenciales" style="width:80%;" >}}

### Parchear tus archivos

Si tienes que parchear tus archivos para eliminar datos confidenciales, consulta la documentación sobre el [formato de archivos][19] generado por Datadog.

## Soporte

Si tienes alguna pregunta específica sobre el cumplimiento de la normativa o necesitas ayuda, ponte en contacto con el [soporte][20] de Datadog. Para contactar con el servicio de soporte, te resultará útil disponer de la siguiente información:

* La consulta de esquema confidencial o cualquier cosa que pueda definir datos confidenciales como un rango temporal, un servicio, o un entorno.
* Si utilizas [Sensitive Data Scanner][21].
* Si los datos confidenciales se siguen enviando a Datadog.
* Si los datos confidenciales han sido indexados (en qué índices) o convertidos en métricas.
* Si ya has hecho que los datos confidenciales no se puedan consultar.


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/guide/logs-rbac/
[2]: /es/sensitive_data_scanner/
[3]: /es/account_management/org_settings/
[4]: /es/logs/search_syntax/
[5]: /es/logs/indexes
[6]: /es/logs/indexes#indexes-filters
[7]: /es/logs/indexes#exclusion-filters
[8]: /es/logs/archives
[9]: /es/logs/logs_to_metrics/
[10]: /es/monitors/types/log/
[11]: /es/monitors/types/log/#notifications
[12]: /es/logs/explorer/live_tail/
[13]: /es/agent/
[14]: /es/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[15]: /es/agent/guide/autodiscovery-management/?tab=containerizedagent
[16]: /es/serverless/forwarder#log-forwarding-optional
[17]: https://app.datadoghq.com/logs/pipelines/data-access
[18]: /es/account_management/rbac/permissions/?tab=ui#logs_read_data
[19]: /es/logs/archives/?tab=awss3#format-of-the-archives
[20]: /es/help/
[21]: https://www.datadoghq.com/blog/sensitive-data-scanner/