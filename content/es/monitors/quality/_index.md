---
disable_toc: false
further_reading:
- link: https://app.datadoghq.com/monitors/quality
  tag: Aplicación
  text: Datadog Monitor Quality
- link: /monitors/
  tag: Documentación
  text: Más información sobre monitores Datadog
title: Monitor Quality
---

## Información general

La función Monitor Quality de Datadog identifica los errores habituales de configuración de la monitorización, como alertas silenciadas durante más de 60 días o monitores sin destinatarios designados. Permite a los equipos mantener los estándares de las alertas y evitar que se pierdan alertas críticas. Utiliza Monitor Quality para identificar y resolver los errores de configuración de monitores en la misma página.

## Monitores incorrectamente configurados

Desde la página [**Gestionar monitores**][8], haz clic en la pestaña [**Monitor Quality**][7] para acceder a lista de monitores que necesitan mejoras. Datadog activa automáticamente esta función después de que creas tu primer monitor. 

Filtra y visualiza la [página de Monitor Quality][7] en función de los equipos, creadores, servicios, o entornos para organizar y gestionar la lista. 

{{< img src="monitors/quality/filter_monitor_quality.png" alt="Filtrar las opciones desplegables para creadores, equipos, servicios y entornos disponibles en la página de Monitor Quality" style="width:100%;" >}}

## Sumar mejoras en monitores y seguir las prácticas recomendadas

Monitor Quality muestra tus monitores que presentan los siguientes problemas de calidad:
- [Silenciado durante más de 60 días](#muted-for-over-60-days)
- [Faltan destinatarios](#monitors-are-missing-recipients)
- [Falta un retraso](#missing-a-delay)
- [Los canales de notificación están incorrectamente configurados](#misconfigured-notification-channels)
- [En los monitores compuestos faltan componentes](#composite-monitors-are-missing-constituents)
- [Bloqueado en estado de alerta](#stuck-in-alert-state)

### Silenciado durante más de 60 días

[Los tiempos de inactividad][1] son útiles para silenciar las alertas durante el mantenimiento programado, las interrupciones planificadas o los cierres del sistema, o para detener las alertas durante los fines de semana y las noches. Sin embargo, los monitores que han estado silenciados durante un periodo prolongado (más de 60 días) pueden indicar una omisión. Puedes anular el silencio de estos monitores para reanudar las alertas y garantizar una completa cobertura de la monitorización.

Ver qué monitores no emiten alertas debido a configuraciones erróneas de los tiempos de inactividad y anular su silencio.

### En los monitores faltan destinatarios

Cuando un monitor activa una alerta o notificación, quieres que las alertas lleguen al equipo o a la persona que puede resolverlas y tomar medidas. Si no se añaden destinatarios a la [notificación del monitor][2], se reduce la proactividad de los servicios. Utiliza la página de Monitor Quality para revisar los monitores que están configurados sin destinatarios.

### Falta un retraso

Los datos de las integraciones en la nube (como AWS, Azure o Google Cloud) se extraen de las API respectivas mediante un crawler. Estas métricas llegan con un retraso, que puedes considerar en la configuración de tu monitor. Los monitores con datos en la nube que no tienen un [retraso de evaluación][3] pueden alertar sobre falsos positivos.

Consulta todos los monitores que están rastreando datos en la nube pero a los que les falta el retraso recomendado. Para obtener más información sobre los datos rastreados, consulta la página [Retraso de métricas en la nube][4].

### Canales de notificación incorrectamente configurados

[`@notifications`][5] te permiten personalizar tus monitores para que las alertas se reenvíen a integraciones, flujos de trabajo o casos Datadog. Si las `@notifications` están incorrectamente configuradas, las alertas esperadas no se envían a los canales adecuados.

Comprueba qué monitores tienen canales de notificación incorrectamente configurados y modifícalos si es necesario.

### En los monitores compuestos faltan componentes

Los [monitores compuestos][6] evalúan el estado combinado de varios submonitores (componentes), siguiendo la lógica definida por el usuario. Los monitores compuestos que hacen referencia a componentes eliminados no se evalúan ni notifican. Identifica los monitores compuestos inactivos y elimínalos. 

### Bloqueado en estado de alerta

Los monitores en estado de `ALERT` indican un problema en tu servicio, lo que requiere tu atención. Cuando hay varios monitores en estado de `ALERT` constante, se desvía la atención de los problemas que realmente podrían necesitar tu atención. Investiga por qué estos monitores están bloqueados en un estado de alerta y modifica tu configuración en consecuencia.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/downtimes/
[2]: /es/monitors/notify/
[3]: /es/monitors/configuration/?tab=thresholdalert#evaluation-delay
[4]: /es/integrations/guide/cloud-metric-delay/
[5]: /es/monitors/notify/#notifications
[6]: /es/monitors/types/composite/
[7]: https://app.datadoghq.com/monitors/quality
[8]: https://app.datadoghq.com/monitors/manage