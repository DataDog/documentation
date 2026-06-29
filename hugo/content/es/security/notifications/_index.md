---
aliases:
- /es/security_platform/notifications/
further_reading:
- link: /security/notifications/rules/
  tag: Documentación
  text: Establecer y configurar reglas de notificación
- link: /security/notifications/variables/
  tag: Documentación
  text: Más información sobre las variables de notificación para personalizar las
    notificaciones
- link: /security/detection_rules/
  tag: Documentación
  text: Explorar las reglas de detección de seguridad
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security Management
  url: /security/cloud_security_management/
- icon: app-sec
  name: Application Security Management
  url: /security/application_security/
title: Notificaciones
---

{{< product-availability >}}

## Información general

Las notificaciones te permiten mantener informado a tu equipo cuando se genera una señal de seguridad. Una señal de seguridad se genera cuando al menos un caso definido en una [regla de detección][2] coincide en un periodo determinado.

## Tipos de notificación

Las notificaciones pueden configurarse para [reglas de detección] individuales(#detection-rules) y también de forma más amplia con [reglas de notificación](#notification-rules).

### Normas de detección

Cuando [creas o modificas una regla de detección][2], puedes definir las notificaciones que se envían. Por ejemplo, puedes añadir casos de reglas para determinar cuándo una regla de detección activa una señal de seguridad. También puedes personalizar el mensaje de notificación en la sección [**Di lo que está pasando**](#say-whats-happening).

#### Di lo que está pasando

Utiliza la sección **Di lo que está pasando** para personalizar el mensaje de notificación con Markdown y [variables de notificación][1]. Esto te permite proporcionar detalles adicionales sobre la señal haciendo referencia a sus atributos de etiquetas (tags) y evento. También puedes añadir etiquetas a la señal generada, por ejemplo, `attack:sql-injection-attempt`.

### Reglas de notificación

Las reglas de notificación te permiten establecer preferencias generales de alerta que incluyen múltiples reglas de detección y señales en lugar de tener que establecer preferencias de notificación para reglas de detección individuales. Por ejemplo, puedes configurar una regla de notificación para que envíes una notificación si se activa cualquier señal de gravedad `CRITICAL` o `HIGH`. Consulta [Reglas de notificación][3] para obtener más información sobre la configuración.

## Canales de notificación

Las notificaciones pueden enviarse a individuos y equipos a través de correo electrónico, Slack, Jira, PagerDuty, webhooks, etc.

### Correo electrónico

{{% notifications-email %}}

### Integraciones

{{% notifications-integrations %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/notifications/variables/
[2]: /es/security/detection_rules/#creating-and-managing-detection-rules
[3]: /es/security/notifications/rules/