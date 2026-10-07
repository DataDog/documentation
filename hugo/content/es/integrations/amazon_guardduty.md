---
categories:
- cloud
- aws
- log collection
- security
custom_kind: integración
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/amazon_guardduty.md
description: Recopila tus logs de Amazon GuardDuty.
doc_link: /integrations/amazon_guardduty/
has_logo: true
integration_id: amazon-guardduty
integration_title: Amazon GuardDuty
is_public: true
name: amazon_guardduty
public_title: Integración de Datadog y Amazon GuardDuty
short_description: Recopila tus logs de Amazon GuardDuty.
version: '1.0'
---

## Información general

Datadog se integra con Amazon GuardDuty a través de una función de Lambda que envía los hallazgos de GuardDuty a la solución de Log Management de Datadog.

## Configuración

### Recopilación de logs

#### Activar logging

1. Si aún no lo has hecho, configura la [función de Lambda de Datadog Forwarder][1].

2. Crea una nueva regla en [Amazon EventBridge][2]. Dale un nombre a la regla y selecciona **Rule with an event pattern** (Regla con un patrón de eventos). Haz clic en **Next** (Siguiente).

3. Crea el patrón de eventos para que coincida con tus hallazgos de GuardDuty. En la sección **Event source** (Fuente del evento), selecciona `AWS events or EventBridge partner events`. En la sección **Event pattern** (Patrón de eventos), especifica `AWS services` para la fuente, `GuardDuty` para el servicio y `GuardDuty Finding` como el tipo. Haz clic en **Next** (Siguiente).

4. Selecciona el Datadog Forwarder como destino. Establece `AWS service` como tipo de destino, `Lambda function` como destino y elige Datadog Forwarder en el menú desplegable `Function`. Haz clic en **Next** (Siguiente).

5. Configura las etiquetas (tags) deseadas y haz clic en **Create rule** (Crear regla).

#### Enviar tus logs a Datadog

1. En la consola de AWS, ve a **Lambda**.

2. Haz clic en **Functions** (Funciones) y selecciona Datadog Forwarder.

3. En la sección Function Overview (Información general de la función), haz clic en **Add Trigger** (Añadir activador). Selecciona **EventBridge (CloudWatch Events)** (EventBridge [Eventos de CloudWatch]) en el menú desplegable y especifica la regla creada en la sección [enable logging (habilitar registro)](#enable-logging).

4. Consulta los nuevos hallazgos de GuardDuty en el [Datadog Log Explorer][3].

[1]: /es/logs/guide/forwarder/
[2]: https://console.aws.amazon.com/events/home
[3]: https://app.datadoghq.com/logs