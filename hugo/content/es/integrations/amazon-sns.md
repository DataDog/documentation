---
aliases:
- /es/integrations/amazon_sns
app_id: amazon-sns
categories:
- nube
- notificaciones
- aws
- recopilación de logs
- gestión de eventos
custom_kind: integración
description: Amazon Simple Notification Service (SNS)
media: []
title: Amazon SNS
---
![Dashboard de SNS](images/snsdashboard.png)

## Información general

Conecta Amazon Simple Notification Service (SNS) a Datadog para:

- Visualizar mensajes SNS como eventos en tu Explorador de eventos 
- Enviar alertas y notificaciones de eventos a SNS

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `SES` está habilitado en la pestaña `Metric Collection`.

1. Añade los siguientes permisos a tu [política de IAM de Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para poder recopilar métricas de Amazon SNS. Para obtener más información, consulta las [Políticas de SNS](https://docs.aws.amazon.com/sns/latest/dg/sns-using-identity-based-policies.html) en el sitio web de AWS.

   | Permiso de AWS   | Descripción                                             |
   | ---------------- | ------------------------------------------------------- |
   | `sns:ListTopics` | Se utiliza para enumerar los temas disponibles.                          |
   | `sns:Publish` | Se utiliza para publicar notificaciones (monitores o feed de eventos). |

1. Instala la [integración de Datadog y Amazon SNS](https://app.datadoghq.com/integrations/amazon-sns).

### Recopilación de eventos

#### Recepción de mensajes SNS

Puedes recibir mensajes SNS en el Datadog Event Explorer a través de los protocolos `HTTPS` y `Email`. El uso del protocolo `HTTPS` permite confirmar automáticamente la suscripción con una URL de webhook.

El uso del protocolo `Email` requiere un paso de confirmación manual para la dirección de correo electrónico que Datadog genera automáticamente para este fin. Lee la guía [Crear eventos de Datadog a partir de correos electrónicos de Amazon SNS](https://docs.datadoghq.com/integrations/guide/events-from-sns-emails/) para obtener más información.

Para recibir mensajes SNS en el Explorador de eventos de Datadog a través de `HTTPS`:

1. En la sección **Temas** de la consola de gestión de SNS, selecciona el tema deseado y haz clic en **Create Subscription** (Crear suscripción).

1. Selecciona `HTTPS` como protocolo e introduce la siguiente URL de webhook, sustituyendo `<API_KEY>` por el valor de cualquier clave de API Datadog válida:

   ```text
   ## Datadog US site
   https://app.datadoghq.com/intake/webhook/sns?api_key=<API_KEY>

   ## Datadog EU site
   https://app.datadoghq.eu/intake/webhook/sns?api_key=<API_KEY>
   ```

1. Deja sin marcar la casilla **Habilitar la entrega de mensajes sin procesar**.

1. Haz clic en **Create Subscription** (Crear suscripción).

#### Envío de notificaciones SNS

Para enviar notificaciones SNS desde Datadog:

1. Configura la cuenta AWS que está asociada a un servicio SNS en la página de la integración AWS.
1. Instala la [integración de SNS](https://app.datadoghq.com/integrations/amazon-sns).
1. A continuación, Datadog detecta los temas SNS configurados y habilita @notificaciones, por ejemplo: `@sns-topic-name`.

### Recopilación de logs

SNS no proporciona logs. Procesa los logs y los eventos que transitan por SNS.

#### Enviar logs a Datadog

1. Configurar una nueva suscripción SNS.
1. Selecciona el tema del que proceden los mensajes.
1. Para el protocolo, selecciona **AWS Lambda**.
1. Para el Endpoint, introduce el ARN de tu función Lambda del Datadog Forwarder.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.sns.dwell_time** <br>(gauge) | Tiempo esperado por un mensaje antes de ser entregado.<br>_Se muestra como milisegundo_ |
| **aws.sns.number_of_messages_published** <br>(count) | Número de mensajes publicados.<br>_Se muestra como mensaje_ |
| **aws.sns.number_of_notifications_delivered** <br>(count) | Número de mensajes entregados con éxito.<br>_Se muestra como mensaje_ |
| **aws.sns.number_of_notifications_failed** <br>(count) | Número de mensajes que el SNS no ha podido entregar.<br>_Se muestra como mensaje_ |
| **aws.sns.number_of_notifications_filtered_out** <br>(count) | Número de mensajes rechazados por las políticas de filtrado de suscripciones. Una política de filtrado rechaza un mensaje cuando los atributos del mensaje no coinciden con los atributos de la política.<br>_Se muestra como mensaje_ |
| **aws.sns.number_of_notifications_filtered_out_invalid_attributes** <br>(count) | Número de mensajes rechazados por las políticas de filtrado de suscripciones porque los mensajes no tienen atributos.<br>_Se muestra como mensaje_ |
| **aws.sns.number_of_notifications_filtered_out_no_message_attributes** <br>(count) | Número de mensajes rechazados por las políticas de filtrado de suscripciones. Una política de filtrado rechaza un mensaje cuando los atributos del mensaje no coinciden con los atributos de la política.<br>_Se muestra como mensaje_ |
| **aws.sns.publish_size** <br>(gauge) | Tamaño de los mensajes publicados.<br>_Se muestra como byte_ |
| **aws.sns.smssuccess_rate** <br>(gauge) | El porcentaje de sms entregados con éxito.<br>_Se muestra como porcentaje_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, incluidos, entre otros, el nombre del host y los grupos de seguridad.

### Eventos

La integración Amazon SNS incluye eventos para suscripciones a temas. Consulta el siguiente ejemplo de evento:

![Eventos de Amazon SNS](images/aws_sns_event.png)

### Checks de servicio

La integración Amazon SNS no incluye checks de servicios.

## Solucionar problemas

Datadog no admite notificaciones SNS de Datadog a temas en China.

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).