---
disable_toc: false
further_reading:
- link: /data_security/
  tag: Documentación
  text: Revise las categorías principales de datos enviados a Datadog
- link: /data_security/pci_compliance/
  tag: Documentación
  text: Configure una organización de Datadog compatible con PCI.
title: Cloud SIEM Data Security
---
<div class="alert alert-info">Esta página trata sobre la seguridad de los datos enviados a Datadog. Si busca productos y funciones de seguridad de la nube y de aplicaciones, consulte la sección <a href="/security/" target="_blank">Security</a>.</div>

## Descripción general {#overview}

Datadog genera una señal de Security cuando al menos una incidencia definida en una regla de detección coincide durante un período de tiempo determinado. Puede personalizar las reglas de detección para proporcionar mensajes de notificación que contengan información específica sobre la señal (por ejemplo, ID de usuario, direcciones IP, etcétera) y los valores de agrupación desencadenantes de la señal. Las reglas de Security también pueden usar webhooks para enviar notificaciones a servicios de terceros.

Debido a que los datos enviados a Datadog pueden contener información confidencial, este documento revisa esas funciones de notificación y qué hacer si no desea que sus usuarios tengan acceso a estas funciones.

## Las reglas de Security pueden usar variables de plantilla de mensaje {#security-rules-can-use-message-template-variables}

Cuando crea una regla de detección, puede personalizar el mensaje de notificación con [variables de notificación][1], lo que agrega información específica relacionada con la señal. Por ejemplo, si el siguiente objeto JSON está asociado con una señal de Security:

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
Al usar `{{@network.client.ip}}` en el mensaje de notificación se mostraría la dirección IP asociada con la señal de Security.

Comuníquese con [soporte][2] si desea evitar que los usuarios agreguen variables de plantilla a los mensajes de notificación.

## Las reglas de Security pueden incluir valores de agrupación desencadenantes en el título de la notificación {#security-rules-can-include-triggering-group-by-values-in-the-notification-title}

En las secciones {{< ui >}}Describe your playbook{{< /ui >}} para [reglas de detección][3], puede agregar valores de agrupación en el título de la notificación. Por ejemplo, si está agrupando por `service`, el nombre del servicio se muestra en el título. Desmarque {{< ui >}}Include triggering group-by values in notification title{{< /ui >}} para evitar que los valores de agrupación aparezcan en el título.

Comuníquese con [soporte][2] si desea eliminar la opción {{< ui >}}Include triggering group-by values in notification title{{< /ui >}}.

## Las reglas de Security pueden usar webhooks {#security-rules-can-use-webhooks}

<div class="alert alert-warning">Si su organización tenía HIPAA habilitado en 2024 o antes, comuníquese con <a href = "https://docs.datadoghq.com/help/">el soporte de Datadog</a> para habilitar webhooks para las reglas de Security.</a></div>

Las notificaciones de Security se pueden enviar a [integraciones][4], como Jira, PagerDuty y [webhooks][5]. Comuníquese con [soporte][2] para evitar que los usuarios envíen notificaciones a servicios de terceros mediante webhooks.

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/notifications/variables/?tab=cloudsiem#template-variables
[2]: /es/help/
[3]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule#describe-your-playbook
[4]: /es/security/notifications/#integrations
[5]: /es/integrations/webhooks/