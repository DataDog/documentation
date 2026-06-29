---
disable_toc: false
further_reading:
- link: /data_security/
  tag: Documentación
  text: Revisar las principales categorías de datos enviados a Datadog
- link: /data_security/pci_compliance/
  tag: Documentación
  text: Establecer una organización de Datadog que cumpla con el estándar PCI
title: Cloud SIEM Data Security
---

<div class="alert alert-info">En esta página hablamos sobre la seguridad de los datos que se envían a Datadog. Si estás buscando productos y funciones para proteger las aplicaciones y las soluciones en la nube, consulta la sección <a href="/security/" target="_blank">Seguridad</a>.</div>

## Información general

Datadog genera una señal de seguridad cuando al menos un case (incidencia) definido en una regla de detección coincide durante un periodo de tiempo determinado. Puedes personalizar las reglas de detección para que proporcionen mensajes de notificación que contengan información específica sobre la señal (por ejemplo, ID de usuario, direcciones IP, etc.) y los valores por grupo de activación de la señal. Las reglas de seguridad también pueden utilizar webhooks para enviar notificaciones a servicios de terceros.

Dado que los datos enviados a Datadog pueden contener información confidencial, este documento repasa esas funciones de notificación y qué hacer si no deseas que tus usuarios tengan acceso a ellas.

## Las reglas de seguridad pueden utilizar variables de plantilla de mensajes

Al crear una regla de detección, puedes personalizar el mensaje de notificación con [variables de notificación][1], que añade información específica relacionada con la señal. Por ejemplo, si el siguiente objeto JSON está asociado a una señal de seguridad:

```
{
  "network": {
    "client": {
      "ip": "1.2.3.4"
    }
  },
  "user": {
    "id": "user@domain.com"
  },
  "used_mfa": "false"
}
```
Con `{{@network.client.ip}}` en el mensaje de notificación se mostraría la dirección IP asociada a la señal.

Ponte en contacto con [asistencia técnica][2] si deseas evitar que los usuarios añadan variables de plantilla a los mensajes de notificación.

## Las reglas de seguridad pueden incluir valores de activación por grupo en el título de la notificación

En las secciones **Describe tu playbook** para [reglas de detección][3], puedes añadir valores de por grupo en el título de la notificación. Por ejemplo, si estás agrupando por `service`, el nombre del servicio se muestra en el título. Desactiva la casilla **Incluir valores por grupo de activación en el título de la notificación** para evitar que los valores por grupo aparezcan en el título.

Ponte en contacto con [asistencia técnica][2] si deseas eliminar la opción **Incluir valores de activación por grupo en el título de la notificación**.

## Las reglas de seguridad pueden utilizar webhooks

<div class="alert alert-warning">Si tu organización tenía activada la HIPAA en 2024 o antes, ponte en contacto con <a href = "https://docs.datadoghq.com/help/">el servicio de asistencia de Datadog </a> para activar los webhooks para las reglas de seguridad.</a></div>

Las notificaciones de seguridad se pueden enviar a [integraciones][4], como Jira, PagerDuty y [webhooks][5]. Ponte en contacto con [asistencia técnica][2] para evitar que los usuarios envíen notificaciones a servicios de terceros mediante webhooks.

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/notifications/variables/?tab=cloudsiem#template-variables
[2]: /es/help/
[3]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/real_time_rule?tab=threshold#describe-your-playbook
[4]: /es/security/notifications/#integrations
[5]: /es/integrations/webhooks/