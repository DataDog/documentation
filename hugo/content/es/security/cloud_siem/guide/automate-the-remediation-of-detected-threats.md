---
aliases:
- /es/security_platform/guide/automate-the-remediation-of-detected-threats/
- /es/security_platform/cloud_siem/guide/automate-the-remediation-of-detected-threats/
further_reading:
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: Documentación
  text: Comience a investigar señales en Signals Explorer
- link: https://learn.datadoghq.com/courses/cloud-siem-automated-remediation
  tag: Centro de aprendizaje
  text: Automatice la investigación y remediación de amenazas con flujos de trabajo
    de seguridad
title: Automatice la remediación de amenazas detectadas con Webhooks
---
## Descripción general {#overview}

[Cloud SIEM][1] le permite configurar Detection Rules que activan flujos de trabajo de autorremediación. Con la [integración de webhook][2] de Datadog, configure webhooks para enviar cargas útiles a los servicios que desea automatizar cada vez que se active una [Detection Rule][3]. Cada carga útil de webhook contiene información sobre el evento desencadenante y un mensaje personalizado que se puede utilizar para iniciar servicios posteriores. Automatice comandos para cualquier servicio que tenga una URL de webhook. Las herramientas de orquestación y automatización de seguridad aceptan solicitudes HTTP entrantes y estos webhooks inician cualquier flujo de trabajo que haya definido.

Elija un escenario de seguridad a continuación para comenzar a automatizar la remediación.

{{% sec-hipaa-limits %}}

## Eliminar grupos de seguridad mal configurados {#delete-misconfigured-security-groups}

En un entorno de nube, es importante eliminar un recurso mal configurado tan pronto como se crea. En este escenario, puede configurar una [integración de webhook][2] para enviar un [webhook][2] al servicio de administración de API de su proveedor de nube.

{{< img src="security/security_monitoring/guide/automate-the-remediation-of-detected-threats/automation-diagram.png" alt="Un diagrama para un webhook enviado a la API de un proveedor de nube" >}}

Una vez configurado, si un usuario de AWS crea un recurso mal configurado (por ejemplo, un grupo de seguridad o un rol de usuario excesivamente permisivo) dentro de su entorno de AWS, Datadog Log Management ingiere el registro relacionado, lo que activa una Detection Rule basada en grupos de seguridad. Este proceso envía automáticamente la carga útil JSON del webhook a la URL de Amazon API Gateway designada, la cual a su vez activa una función de AWS Lambda que elimina automáticamente el recurso infractor.

## Bloquear una dirección IP sospechosa {#ban-a-suspicious-ip-address}

Un inicio de sesión desde una dirección IP no reconocida podría representar a un atacante manipulando las credenciales de un usuario de confianza, con las cuales puede acceder a sus datos y obtener persistencia en su entorno.

Para combatir este tipo de ataque, puede utilizar el [método de detección New Value][4], que analiza los datos históricos de su cuenta durante un período de tiempo elegido y alerta sobre valores no vistos anteriormente en sus registros de nube.

Primero, configure una [nueva Detection Rule][5] mediante el método de detección New Value.

Luego, configure un [webhook][2] que envíe una carga útil al servicio de administración de identidad y acceso (IAM) de su nube para bloquear la IP desconocida cuando se active esta regla.

{{< img src="security/security_monitoring/guide/automate-the-remediation-of-detected-threats/webhook-ip.png" alt="Un nuevo webhook que bloquea una dirección IP desconocida" >}}

El siguiente ejemplo ilustra cómo podría verse la carga útil del webhook relevante cuando Datadog genera una señal de seguridad:

{{< code-block lang="json" filename="webhook-payload.json" >}}
{
  "SECURITY_RULE_NAME": "Request from unexpected IP address",
  "SECURITY_SIGNAL_ID": "abcd1234",
  "SECURITY_SIGNAL_ATTRIBUTES": {
    "network": {
      "client": {
        "ip": [
          "1.2.3.4"
        ]
      }
    }
  }
}
{{< /code-block >}}

## Abuso y fraude de aplicaciones {#application-abuse-and-fraud}

Con Datadog Cloud SIEM, puede descubrir patrones de [abuso o fraude][6] en toda su aplicación. Por ejemplo, configure una [Detection Rule][7] que se active cuando un usuario intente repetidamente comprar algo en su aplicación con datos de tarjeta de crédito no válidos. Luego, configure un webhook que envíe una carga útil con instrucciones de remediación a un servicio que deshabilitará las credenciales del usuario.

El siguiente ejemplo ilustra cómo podría verse la carga útil del webhook relevante cuando Datadog genera una señal de seguridad:

{{< code-block lang="json" filename="webhook-payload.json" >}}
{
  "SECURITY_RULE_NAME": "Fraudulent Credit Card Authorizations",
  "SECURITY_SIGNAL_ID": "efgh5678",
  "SECURITY_SIGNAL_ATTRIBUTES": {
    "usr": {
      "id": "john.doe@your_domain.com"
    },
    "evt": {
      "name": "credit_card_authorization",
      "outcome": "fail"
    },
    "network": {
      "client": {
        "ip": [
          "1.2.3.4"
        ]
      }
    }
  }
}
{{< /code-block >}}

Datadog genera la Security Signal, que detalla la infracción y la información del usuario sospechoso, como su dirección IP y su ID de usuario, y la carga útil del webhook envía instrucciones de remediación a un servicio para deshabilitar las credenciales del usuario.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/
[2]: https://app.datadoghq.com/account/settings#integrations/webhooks
[3]: /es/security/detection_rules/
[4]: https://www.datadoghq.com/blog/new-term-detection-method-datadog/
[5]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/?cloud_siem_detection_rule_detection_method=new_value
[6]: https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/
[7]: /es/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/#define-your-search-query