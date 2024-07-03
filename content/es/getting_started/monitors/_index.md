---
aliases:
- /es/getting_started/application/monitors
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: Blog
  text: 'Inicio a la monitorización: alertar sobre lo importante'
- link: https://learn.datadoghq.com/courses/introduction-to-observability
  tag: Centro de aprendizaje
  text: Introducción a la observabilidad
- link: /monitors/types/metric/
  tag: Documentación
  text: Métrica de Monitors
- link: /monitors/notify/
  tag: Documentación
  text: Notificaciones de Monitor
- link: https://dtdg.co/fe
  tag: Habilitar los fundamentos
  text: Participa en una sesión interactiva sobre la creación de monitores eficaces
title: Empezando con Monitors
---

## Información general

Con la función para alertar de Datadog, tienes la capacidad de crear monitores que hagan checks de forma activa de las métricas, la disponibilidad de la integración y los endpoints de red, entre otros. Utiliza monitores para alertar sobre los sistemas que requieren observación, inspección e intervención.

Esta página es una introducción a los monitores y describe las instrucciones para configurar una métrica de Monitor. Una [métrica de Monitor][1] proporciona alertas y notificaciones si una métrica específica está por encima o por debajo de un determinado umbral. Por ejemplo, una métrica de Monitor puede alertarte cuando el espacio en disco es bajo. 

Esta guía aborda lo siguiente:
- Creación y configuración de Monitor
- Configuración de alertas de Monitor 
- Personalización de los mensajes de notificación 
- Permisos de Monitor

## Requisitos previos

Antes de comenzar, necesitas una cuenta de Datadog vinculada a un host con el Datadog Agent instalado. Para obtener más información sobre el Agent, consulta la [guía Empezando con el Agent][2], o navega hasta **[Integration > Agent (Integraciones > Agent)][3]** para ver las instrucciones de instalación.

Para verificar que el Datadog Agent se está ejecutando, comprueba que la [Lista de infraestructura][4] en Datadog está completa.

## Crear un monitor

Para crear un monitor, navega hasta **[Monitors > New Monitor > Metric][5]** (Monitors > Nuevo Monitor > Métrica).

## Configurar

Los principales componentes de la configuración de monitor son:
- **Método de detección**: ¿Cómo se mide lo que se va a alertar? ¿Te preocupa que un valor de métrica supere un umbral, que un cambio en un valor supere un umbral, un valor anómalo o algo más?
- **Definir la métrica**: ¿Qué valor vas a monitorear para alertar? ¿El espacio en disco de tu sistema? ¿El número de errores encontrados red en los inicios de sesión?
- **Condiciones de alerta**: ¿Cuándo hay que despertar a un ingeniero? 
- **Notificación**: ¿Qué información debe figurar en la alerta?

### Elegir el método de detección

Al crear una métrica de Monitor, se selecciona automáticamente **Alerta de umbral** como método de detección. Una alerta de umbral compara los valores de métrica con los umbrales definidos por el usuario. El objetivo de este monitor es alertar sobre un umbral estático, por lo que no es necesario realizar ningún cambio.

### Definir la métrica

Para obtener una alerta de poco espacio en disco, utiliza la métrica `system.disk.in_use` de la [Integración del disco][6] y promedia la métrica contra `host` y `device`:

{{< img src="getting_started/monitors/define_the_metric.png" alt="Defina la métrica para system.disk.in_use avg por host y dispositivo" >}}

### Definir condiciones de alerta

Según la [documentación de integración del disco][6], `system.disk.in_use` es *la cantidad de espacio de disco en uso como fracción del total*. Así, cuando esta métrica tiene un valor de `0.7`, el dispositivo está lleno en un 70%.

Para alertar sobre poco espacio en disco, el monitor debe activarse cuando la métrica esté `above` el umbral. Los valores del umbral se basan en tus preferencias. Para esta métrica, los valores entre `0` y `1` son apropiados:

Establezca los siguientes umbrales:
```
Umbral de alerta: > 0.9
Umbral de alerta: > 0.8
```

Para este ejemplo, deje los demás ajustes de esta sección en los valores predeterminados. Para más detalles, consulte la documentación [métrica monitors][7].

### notificación

Cuando se activa este monitor para alertar, se envía un mensaje de notificación. En este mensaje se pueden incluir valores condicionales, instrucciones para la resolución o un resumen de lo que es la alerta. Como mínimo, una notificación debe tener un título y un mensaje.

#### Título

El título debe ser único para cada monitor. Dado que se trata de un monitor con varias alertas, los nombres están disponibles para cada elemento del grupo (`host` y `device`) con las variables de plantilla de mensaje:
```Texto
El espacio en disco es bajo en {{device.name}}/{{host.name}}
```

#### Mensaje

Utiliza el mensaje para indicar a tu equipo cómo resolver el problema, por ejemplo:
```Texto
Pasos para liberar espacio en disco:
1. Eliminar los paquetes que no utilices
2. Borrar la caché de APT
3. Desinstalar aplicaciones innecesarias
4. Eliminar archivos duplicados
```

Para añadir mensajes condicionales basados en umbrales de alerta o advertencia, consulta las [Variables de notificación][8] disponibles que puedes incluir en tu mensaje.

#### Notificar a servicios y a los miembros de tu equipo

Envía notificaciones a tu equipo a través de Email, Slack, PagerDuty y más. Puedes buscar miembros del equipo y cuentas conectadas con el cuadro desplegable. Cuando se añade una `@notification` a este cuadro, la notificación se añade automáticamente al cuadro de mensaje:

{{< img src="getting_started/monitors/message_notify.png" alt="Mensaje con variables condicionales y @notification" style="width:90%;" >}}

Si se quita la `@notification` de una de las secciones, se quita de las dos.

Deja las demás secciones como están. Para obtener más información sobre lo que hace cada opción de Configuración, consulta la documentación de  [Configuración de Monitor][9].

### Permisos

{{< img src="getting_started/monitors/monitor_rbac_restricted.jpg" alt="Monitor restringido para RBAC" style="width:90%;" >}}

Utiliza esta opción para restringir la edición de tu monitor al creador y a roles específicos de tu organización. Para obtener más información sobre los roles, consulta [Control de acceso basado en roles][10].

## Ver Monitors y alertas de triaje en el móvil

Puedes consultar las Vistas guardadas de Monitor desde la pantalla de inicio de tu móvil o ver y silenciar monitores al descargar la [Datadog Mobile App][11], disponible en [Apple App Store][12] y [Google Play Store][13]. Esto te ayudará a clasificar los mensajes cuando estés lejos de tu ordenador portátil o de escritorio.

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Incidencias en Mobile App">}}

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