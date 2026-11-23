---
aliases:
- /es/security_platform/notifications/
further_reading:
- link: /security/notifications/rules/
  tag: Documentación
  text: Cree y configure reglas de notificación
- link: /security/notifications/variables/
  tag: Documentación
  text: Obtenga más información sobre las variables de notificación para personalizar
    las notificaciones
- link: /security/detection_rules/
  tag: Documentación
  text: Explore las reglas de detección de seguridad
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: Notifications
---
{{< product-availability >}}

## Descripción general {#overview}

Las notificaciones le ayudan a mantener a su equipo informado cuando se detecta un hallazgo o una señal de seguridad. Los hallazgos y las señales de seguridad se generan cuando al menos un caso definido en una [regla de detección][2] coincide durante un período de tiempo determinado. Al alertar a su equipo con prontitud, las notificaciones permiten tomar medidas inmediatas para abordar posibles problemas de seguridad, lo que mejora la postura general de seguridad de su organización.

## Tipos de notificaciones {#notification-types}

Las notificaciones se pueden configurar para [reglas de detección](#detection-rules) individuales y también de manera más amplia con [reglas de notificación](#notification-rules).

### Reglas de detección {#detection-rules}

Cuando [crea o modifica una regla de detección][2], puede definir las notificaciones que se envían. Por ejemplo, puede añadir casos de regla para determinar cuándo una regla de detección activa una señal de seguridad. 

También puede personalizar el mensaje de notificación usando Markdown y [variables de notificación][1]. Esto le permite proporcionar detalles adicionales sobre la señal haciendo referencia a sus etiquetas y atributos de evento. También puede añadir etiquetas a la señal generada, por ejemplo, `attack:sql-injection-attempt`.

### Reglas de notificación {#notification-rules}

Las reglas de notificación le permiten establecer preferencias generales de alerta que abarcan múltiples reglas de detección, hallazgos y señales en lugar de tener que configurar preferencias de notificación para reglas de detección individuales. Por ejemplo, puede configurar una regla de notificación para enviar una notificación si se activa cualquier señal de gravedad `CRITICAL` o `HIGH`. Consulte [Notification Rules][3] para obtener más información sobre su preparación y configuración.

## Canales de notificación {#notification-channels}

Las notificaciones se pueden enviar a personas y equipos a través de Slack, Jira, PagerDuty, webhooks, casos, correo electrónico y más. También puede usar [enrutamiento dinámico][6] para entregar automáticamente notificaciones de hallazgos al equipo responsable según la etiqueta `team` adjunta al hallazgo.

### Integrations {#integrations}

{{% notifications-integrations %}}

#### Cree un webhook para la automatización de seguridad {#create-a-webhook-for-security-automation}

Puede usar webhooks para enviar alertas a otras plataformas, como SOAR. Para configurar un webhook:

1. Vaya a la integración [Webhooks][4].
1. Haga clic en {{< ui >}}\+ New{{< /ui >}} en la sección {{< ui >}}Webhooks{{< /ui >}}.
1. Ingrese un nombre para el webhook.
1. Ingrese la URL del webhook.
1. En la sección {{< ui >}}Payload{{< /ui >}}, seleccione {{< ui >}}Security Signal{{< /ui >}}.
  {{< img src="security/security_signal_payload.png" alt="La carga útil de los webhooks para señales de seguridad" style="width:100%;" >}}
1. Consulte la documentación de [integración de Webhooks][5] para obtener más información sobre cómo agregar variables, variables personalizadas, encabezados personalizados y codificación como formulario.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

Para usar el webhook, agregue `@webhook-<WEBHOOK_NAME>` a la sección de notificaciones de la regla.

### Teams {#teams}

{{% notifications-teams %}}

### Incidencias {#cases}

{{% notifications-cases %}}

También puede agregar señales relacionadas a un caso existente, en lugar de crear un caso nuevo para cada señal. Consulte [Agrupar señales en casos][7].

### Correo electrónico {#email}

{{% notifications-email %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/notifications/variables/
[2]: /es/security/detection_rules/#creating-and-managing-detection-rules
[3]: /es/security/notifications/rules/
[4]: https://app.datadoghq.com/integrations/webhooks
[5]: /es/integrations/webhooks/
[6]: /es/security/notifications/rules/#dynamic-routing
[7]: /es/security/cloud_siem/triage_and_investigate/signal_grouping/