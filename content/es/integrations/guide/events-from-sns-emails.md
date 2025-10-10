---
description: Pasos para enviar eventos a Datadog con correos electrónicos de Amazon
  SNS
further_reading:
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: Documentación
  text: Integración de AWS
- link: https://docs.datadoghq.com/integrations/amazon_sns/#overview
  tag: Documentación
  text: Integración de SNS
- link: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
  tag: Blog
  text: Monitorización serverless de Datadog para Amazon API Gateway, SQS, Kinesis
    y más.
title: Crear eventos de Datadog a partir de correos electrónicos de Amazon SNS
---

## Información general

Puedes crear eventos de Datadog con correos electrónicos enviados desde un tema de Amazon SNS. Utiliza esta guía para suscribir tu cuenta de Datadog a tu tema de SNS y confirmar la suscripción.

## Configuración

1. Crea una dirección de correo electrónico dedicada desde Datadog siguiendo las instrucciones de configuración de la guía [Eventos con correo electrónico][1]. Copia la dirección de correo electrónico generada en el portapapeles.
2. En el tema de SNS al que deseas suscribirte, haz clic en **Create subscription** (Crear suscripción) y selecciona `Email` como protocolo. Pega la dirección de correo electrónico del paso 1 en el campo `Endpoint`, configura otros ajustes según desees y haz clic en **Create subscription** (Crear suscripción).
3. En el Datadog [Events Explorer][2], busca un evento con el asunto `AWS Notification - Subscription Confirmation`. Copia la URL proporcionada para confirmar.

{{< img src="integrations/guide/events_from_sns_emails/events_from_sns_emails.png" alt="El Datadog Events Explorer que muestra una vista de detalles de un evento con el asunto 'Notificación de AWS: confirmación de la suscripción' y una URL resaltada al lado del texto Confirmar suscripción" >}}

4. Abre una nueva pestaña en tu navegador y pega la URL en la barra de direcciones. La suscripción se confirma cuando el navegador abre la URL.

### Validación

Vuelve a tu tema de SNS en la consola de AWS y asegúrate de que el estado de la suscripción es `Confirmed`. Los nuevos mensajes publicados en el tema crean eventos en Datadog.

## Utilizar los eventos en Datadog

Configura alertas basadas en los correos electrónicos de tu tema de SNS con un [monitor de eventos][3]. Busca y filtra los eventos en el [Events Explorer][4], o utiliza un [dashboard][5] para analizar más a fondo o mostrar los eventos.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/events/guides/email/
[2]: https://app.datadoghq.com/event/explorer
[3]: /es/monitors/types/event/
[4]: /es/events/explorer/
[5]: /es/dashboards/
