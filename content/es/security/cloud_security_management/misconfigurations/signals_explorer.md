---
aliases:
- /security_platform/cspm/signals_explorer
- /security/cspm/signals_explorer
- /security/misconfigurations/signals_explorer
further_reading:
- link: security/default_rules
  tag: Documentación
  text: Explorar las reglas de cumplimiento predeterminadas de configuración en la
    nube
- link: security/cspm/frameworks_and_benchmarks
  tag: Documentación
  text: Conocer los marcos y las referencias del sector
- link: https://www.datadoghq.com/blog/datadog-csm-windows/
  tag: Blog
  text: Protección de tus cargas de trabajo en Windows con Datadog Cloud Security
    Management
title: Explorador de señales
---

## Información general

Además de revisar y corregir errores de configuración en la nube directamente en la [página del Explorador de errores de configuración][1], puedes configurar notificaciones para los errores de configuración fallidos y configurar señales para correlacionar y clasificar los errores de configuración en el mismo lugar que las amenazas en tiempo real que generan [Cloud SIEM][2] y [CSM Threats][3].

## Reducción de la fatiga de las alertas con señales de postura de seguridad

Las señales son alertas de seguridad que Datadog genera y muestra en el [Explorador de señales][4]. Las señales de postura de seguridad se activan cuando Datadog genera errores de configuración `evaluation:fail` para una regla de configuración de una nube o infraestructura.

Una selección de reglas que tienen un nivel de gravedad "alto" o "crítico" están habilitadas para generar señales por defecto. Para las reglas de cumplimiento de menor gravedad, selecciona el conmutador *Trigger a security signal* (Activar una señal de seguridad) para comenzar a generar señales. También puedes utilizar este conmutador para impedir que las reglas de cumplimiento generen señales en cualquier momento.

{{< img src="security/cspm/signals_explorer/Notifications.png" style="width:100%;">}}

Para consumir los errores de configuración en agrupaciones lógicas y mitigar la posible fatiga de las alertas, tienes total flexibilidad para cambiar la forma en cómo se activan las señales para cada recurso individual, como cada vez que un recurso falla para una regla en una nueva cuenta en la nube o cada vez que un recurso está mal configurado en un servicio. También puedes activarlas mediante cualquier faceta de Datadog. Independientemente de la lógica de agrupación que elijas para la generación de señales, al abrir una señal siempre se muestra la lista actualizada de los errores de configuración erróneas que están fallando para esta regla.

{{< img src="security/cspm/signals_explorer/Signals.png" style="width:100%;">}}

Haz clic en cualquier señal de postura de seguridad para abrir un panel lateral con más detalles:

{{< img src="security/cspm/signals_explorer/Sidepanel.png" style="width:75%;">}}

La parte superior del panel lateral de errores de configuración muestra información clave sobre dónde se están produciendo los errores de configuración: en un recurso individual, en un servicio o en una cuenta de nube completa.

{{< img src="security/cspm/signals_explorer/Top.png" style="width:75%;">}}

A continuación se muestra el mensaje de la regla, que incluye una descripción del error de configuración e instrucciones para corregir el problema.

{{< img src="security/cspm/signals_explorer/Message.png" style="width:75%;">}}

La siguiente pestaña en la sección inferior del panel lateral muestra todos los errores de configuración que están activando esta señal. Esta lista siempre muestra el estado actual de tu infraestructura, lo que significa que si has arreglado 3 de 10 grupos de seguridad incorrectamente configurados desde que la señal fue activada por primera vez, Datadog mostrará 7 grupos de seguridad fallidos, en lugar de mostrar los errores de configuración que ya no están en violación.

{{< img src="security/cspm/signals_explorer/Findings.png" style="width:75%;">}}

**Nota**: Si se utiliza una agrupación distinta del ID de recurso, la señal se activa la primera vez que un error de configuración cumple los criterios de agrupación y no se vuelve a activar cada vez que un nuevo recurso de esta misma agrupación (por ejemplo, el mismo servicio o cuenta) incumple esta regla. Esto se hace intencionadamente para evitar que se vuelvan a activar las señales cada vez que un nuevo recurso en la nube incumple una regla. Si quieres recibir una alerta cada vez que un recurso en la nube incumple una regla, cambia la regla *agrupar por* de la regla a `@resource_type`.

La pestaña de problemas relacionados muestra otras reglas de cumplimiento que han activado señales en la misma agrupación lógica. el mismo recurso, servicio, o cuenta en la nube y tipo de recurso (por ejemplo, grupo de seguridad).

{{< img src="security/cspm/signals_explorer/Related.png" style="width:75%;">}}

En la parte superior del panel lateral, puedes configurar la regla o enviar una notificación a tus compañeros por correo electrónico, Slack, Microsoft Teams, PagerDuty, ServiceNow, Jira, webhooks, etc.

{{< img src="security/cspm/signals_explorer/Final.png" style="width:75%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/misconfigurations/findings/
[2]: /es/security/cloud_siem/
[3]: /es/security/threats/
[4]: https://app.datadoghq.com/security