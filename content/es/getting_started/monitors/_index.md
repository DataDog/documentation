---
aliases:
- /es/arranque_de_la_aplicación/monitors
further_reading:
- link: https://www.datadoghq.com/blog/monitorización-101-Alertar/
  tag: Blog
  text: 'monitorización 101: Alertar en lo que importa'
- link: https://learn.datadoghq.com/courses/introduction-to-observability
  tag: Centro de aprendizaje
  text: Introducción a la observabilidad
- link: /monitors/types/metric/
  tag: Documentación
  text: métrica monitors
- link: /monitors/notify/
  tag: Documentación
  text: Notificaciones de los monitores
- link: https://dtdg.co/fe
  tag: Habilitar los fundamentos
  text: Participe en una sesión interactiva sobre la creación de monitors eficaces
kind: documentación
title: Empezando con monitors
---

## Información general

Con Datadog Alertar, usted tiene la capacidad de crear monitores que activamente check métricas, integración disponibilidad, red puntos finales, y más. Utilice monitores para llamar la atención sobre los sistemas que requieren observación, inspección e intervención.

Esta página es una introducción a monitors y describe las instrucciones para configurar una métrica monitor. Una [métrica monitor][1] proporciona alertas y notificaciones si una métrica específica está por encima o por debajo de un determinado umbral. Por ejemplo, una métrica monitor puede alertarle cuando el espacio en disco es bajo. 

Esta guía cubre:
- monitor creación y Configuración
- Configuración de alertas en monitor 
- Personalización de los mensajes notificación 
- monitor permisos

## Requisitos previos

Antes de Empezando, necesita una cuenta Datadog vinculada a un host con Datadog Agent instalada. Para obtener más información sobre Agent, consulte la guía [Empezando con la Agent][2], o navegue hasta **[integraciones > Agent][3]** para ver las instrucciones de instalación.

Para verificar que el Datadog Agent se está ejecutando, check que su [infraestructura lista][4] en Datadog está poblado.

## Crear un monitor

Para crear un monitor, navegue hasta **[monitors > Nuevo monitor > métrica][5]**.

## Configurar

Los principales componentes de monitor Configuración son:
- **Método de detección**: ¿Cómo se mide lo que se va a alertar? ¿Le preocupa que un valor de métrica supere un umbral, que un cambio en un valor supere un umbral, un valor anómalo o cualquier otra cosa?
- **Defina el métrica**: ¿Qué valor <txprotected>monitorización</txprotected> alertar? ¿El espacio en disco de su sistema? ¿El número de errores encontradosred en los inicios de sesión?
- **Condiciones de alerta**: ¿Cuándo hay que despertar a un ingeniero? 
- **notificación**: ¿Qué información debe figurar en la alerta?

### Elegir el método de detección

Al crear una métrica monitor, se selecciona automáticamente **Alerta de umbral** como método de detección. Una alerta de umbral compara los valores de métrica con los umbrales definidos por el usuario. El objetivo de este monitor es alertar sobre un umbral estático, por lo que no es necesario realizar ningún cambio.

### Definir la métrica

Para obtener una alerta de poco espacio en disco, utilice el `system.disk.in_use` métrica del [Disco integración][6] y promedie la métrica sobre `host` y `device`:

{{< img src="getting_started/monitors/define_the_metric.png" alt="Define the métrica for system.disk.in_use avg by host and device" >}}

### Definir tus condiciones de alerta

Según la [documentación de Disk integración][6], `system.disk.in_use` es *la cantidad de espacio de disco en uso como fracción del total*. Así, cuando esta métrica está reportando un valor de `0.7`, el dispositivo está lleno en un 70%.

Para alertar sobre poco espacio en disco, el monitor debe activarse cuando la métrica es `above` el umbral. Los valores del umbral se basan en sus preferencias. Para esta métrica, valores entre `0` y `1` son apropiados:

Establece los siguientes umbrales:
```
Umbral de alerta: > 0.9
Umbral de alerta: > 0.8
```

Para este ejemplo, deje los demás ajustes de esta sección en los valores predeterminados. Para más detalles, consulte la documentación [métrica monitors][7].

### notificación

Cuando se activa este monitor alerta, se envía un mensaje notificación. En este mensaje se pueden incluir valores condicionales, instrucciones para la resolución o un resumen de lo que es la alerta. Como mínimo, una notificación debe tener un título y un mensaje.

#### Título

El título debe ser único para cada monitor. Dado que se trata de una alerta múltiple monitor, los nombres están disponibles para cada elemento del grupo (`host` y `device`) con el mensaje Variables de plantilla:
```Texto
El espacio en disco es bajo en {{device.name}} / {{host.name}}
```

#### Mensaje

Utilice el mensaje para indicar a su equipo cómo resolver el problema, por ejemplo:
```Texto
Pasos para liberar espacio en disco:
1. Elimine los paquetes que no utilice
2. Borrar la caché de APT
3. Desinstalar aplicaciones innecesarias
4. Eliminar archivos duplicados
```

Para añadir mensajes condicionales basados en umbrales de alerta o advertencia, consulte las [notificación Variables][8] disponibles que puede incluir en su mensaje.

#### Notifíquelo a servicios y a los miembros de su equipo

Envía notificaciones a tu equipo a través de Email, Slack, PagerDuty y más. Puede Buscar para los miembros del equipo y las cuentas conectadas con el cuadro desplegable. Cuando se añade un `@notification` a este cuadro, la notificación se añade automáticamente al cuadro de mensaje:

{{< img src="getting_started/monitors/message_notify.png" alt="Message with conditional variables and @notificación" style="width:90%;" >}}

Si se quita el `@notification` de una de las secciones, se quita de las dos.

Deje las demás secciones como están. Para más información sobre lo que hace cada opción de Configuración, consulte la documentación [monitor Configuración][9].

### Permisos

{{< img src="getting_started/monitors/monitor_rbac_restricted.jpg" alt="RBAC Restricted monitor" style="width:90%;" >}}

Utilice esta opción para restringir la edición de su monitor a su creador y a funciones específicas de su organización. Para obtener más información sobre las funciones, consulte [Control de acceso basado en funciones][10].

## Ver monitors y alertas de triaje en el móvil

Puede consultar monitor Vistas guardadas desde la pantalla de inicio de su móvil o ver y silenciar monitors descargando la [Datadog Mobile App][11], disponible en [Apple App Store][12] y [Google Play Store][13]. Esto le ayudará a clasificar los mensajes cuando esté lejos de su ordenador portátil o de sobremesa.

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Incidents on Mobile App">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/metric/
[2]: /es/getting_started/agent/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://app.datadoghq.com/infrastructure
[5]: https://app.datadoghq.com/monitors#create/metric
[6]: /es/integrations/disk/
[7]: /es/monitors/types/metric/?tab=threshold#set-alert-conditions
[8]: /es/monitors/notify/variables/
[9]: /es/monitors/configuration/?tab=thresholdalert#alert-grouping
[10]: /es/account_management/rbac/
[11]: /es/service_management/mobile/
[12]: https://apps.apple.com/app/datadog/id1391380318
[13]: https://play.google.com/store/apps/details?id=com.datadog.app