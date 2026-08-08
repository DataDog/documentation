---
aliases:
- /es/security_platform/guide/automate-the-remediation-of-detected-threats/
- /es/security_platform/cloud_siem/guide/automate-the-remediation-of-detected-threats/
further_reading:
- link: /security/cloud_siem/investigate_security_signals
  tag: Documentación
  text: Comenzar a investigar las señales en el Signals Explorer
title: Automatizar la corrección de las amenazas detectadas con Webhooks
---

## Información general

[Cloud SIEM][1] permite establecer reglas de detección que activan flujos de trabajo de corrección automática. Con [la integración de webhook][2] de Datadog, configura webhooks para entregar cargas útiles a los servicios que desees automatizar cada vez que se active una [Regla de detección][3]. Cada carga útil de webhook contiene información sobre el evento desencadenante y un mensaje personalizado que se puede utilizar para iniciar servicios descendentes. Automatiza comandos para cualquier servicio que tenga una URL de webhook. Las herramientas de orquestación de seguridad y respuesta de automatización aceptan solicitudes HTTP entrantes y estos webhooks inician cualquier flujo de trabajo que hayas definido.

Elige un escenario de seguridad a continuación para empezar a automatizar la corrección.

## Eliminar grupos de seguridad mal configurados

En un entorno en la nube, es importante eliminar un recurso mal configurado en cuanto se crea. En este escenario, puedes configurar una [integración de webhook][2] para enviar un [webhook][2] al servicio de gestión de API de tu proveedor de nube.

{{< img src="security/security_monitoring/guide/automate-the-remediation-of-detected-threats/automation-diagram.png" alt="Un diagrama para un webhook enviado a una API de proveedor en la nube" >}}

Una vez configurado, si un usuario de AWS crea un recurso mal configurado (por ejemplo, un grupo de seguridad o rol de usuario demasiado permisivo) dentro de tu entorno de AWS, Datadog Log Management ingiere el log relacionado, lo que activa una Regla de detección basada en el grupo de seguridad. Este proceso envía automáticamente la carga útil JSON del webhook a la URL designada de Amazon API Gateway, que a su vez activa una función de AWS Lambda que elimina automáticamente el recurso peligroso.

## Prohibir una dirección IP sospechosa

Un inicio de sesión desde una dirección IP no reconocida podría representar a un atacante manipulando las credenciales de un usuario de confianza, con las que podría acceder a tus datos y ganar persistencia en tu entorno.

Para combatir este tipo de ataque, puedes utilizar el [método de detección de nuevos valores][4], que analiza los datos históricos de tu cuenta durante un periodo elegido y alerta sobre valores no vistos anteriormente en tu logs en la nube.

En primer lugar, configura una [nueva regla de detección][5] utilizando el método de detección Nuevo valor.

A continuación, configura un [webhook][2] que envíe una carga útil al servicio de Identity and Access Management (IAM) de tu nube para prohibir la IP desconocida cuando se active esta regla.

{{< img src="security/security_monitoring/guide/automate-the-remediation-of-detected-threats/webhook-ip.png" alt="Un nuevo webhook que prohibe una dirección IP desconocida" >}}

El siguiente ejemplo ilustra el aspecto que podría tener la carga útil del webhook correspondiente cuando se produce una señal de seguridad a través de Datadog:

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

## Uso indebido y fraude en la aplicación

Con Datadog Cloud SIEM, puedes descubrir patrones de [uso indebido o fraude][6] en tu aplicación. Por ejemplo, configura una [Regla de detección][7] que se active cuando un usuario intente repetidamente comprar algo en tu aplicación con datos de tarjeta de crédito no válidos. A continuación, configura un webhook que envíe una carga útil con instrucciones de corrección a un servicio que desactivará las credenciales del usuario.

El siguiente ejemplo ilustra el aspecto que podría tener la carga útil del webhook correspondiente cuando se produce una señal de seguridad a través de Datadog:

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

Datadog genera la Señal de seguridad, que detalla el delito así como la información del usuario sospechoso, como su dirección IP y su ID de usuario, y la carga útil del webhook envía instrucciones de corrección a un servicio para desactivar las credentidades del usuario.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/
[2]: https://app.datadoghq.com/account/settings#integrations/webhooks
[3]: /es/security/detection_rules/
[4]: https://www.datadoghq.com/blog/new-term-detection-method-datadog/
[5]: /es/security/cloud_siem/log_detection_rules/?tab=threshold#new-value
[6]: https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/
[7]: /es/security/cloud_siem/log_detection_rules/?tab=threshold#define-a-search-query