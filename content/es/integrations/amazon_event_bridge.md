---
app_id: amazon_event_bridge
categories:
- AWS
- nube
- notificaciones
custom_kind: integración
description: Un bus de eventos serverless que procesa eventos de servicios AWS, SaaS
  y tus aplicaciones casi en tiempo real.
title: Amazon EventBridge
---
{{< site-region region="gov" >}}

<div class="alert alert-danger">El sitio Datadog para el Gobierno no es compatible con Amazon EventBridge.</div>
{{< /site-region >}}

## Información general

La integración de Datadog con Amazon EventBridge ofrece las siguientes funciones:

- Creación de buses de eventos personalizados en todas tus cuentas integradas AWS 
- Envío de eventos de alertas de notificación a Datadog sobre los buses de eventos de tu elección
- En AWS, configura activadores en tus buses de eventos con servicios como Kinesis, Lambda, etc.
- Utiliza la información contenida en el evento de alerta para ejecutar pipelines y runbooks de autocorrección, ejecutar consultas analíticas, etc.
- Esta integración no es compatible con GovCloud

{{< img src="integrations/amazon_event_bridge/eventbridge_monitor_notification.png" alt="Notificación de monitor siendo enviada a EventBridge" >}}

## Configuración

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Instalación

1. Asegúrate de que la [integración principal de AWS](https://docs.datadoghq.com/integrations/amazon_web_services/) está instalada para cada cuenta de AWS que reciba notificaciones de alerta.
1. Asegúrate de que los siguientes permisos existen en la política de permisos para roles AWS Datadog:
   `events:CreateEventBus` y `events:PutPartnerEvents`.
1. La integración Amazon EventBridge se instala automáticamente con la principal integración AWS.

**Nota**: También puedes utilizar la [API](https://docs.datadoghq.com/api/latest/aws-integration/#create-an-amazon-eventbridge-source) o [Terraform](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_event_bridge) para configurar una fuente de Amazon EventBridge.

### Configuración

`events:CreateEventBus` y `events:PutPartnerEvents` son necesarios para enviar notificaciones de alerta a tus buses de eventos. Si no tienes estos permisos configurados, lee la [documentación de permisos de IAM de Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#datadog-aws-iam-policy) para habilitar los permisos antes de continuar con la configuración.

1. Navega hasta el cuadro de [integración de Datadog y Amazon EventBridge](https://app.datadoghq.com/integrations/amazon-event-bridge) para ver una lista de cuentas de AWS integradas en Datadog donde puedes crear Event Bridges.
1. En la cuenta AWS de tu elección crea un nuevo bus de eventos proporcionando un nombre y seleccionando la región en la que quieres que se encuentre.
1. Dentro de las alertas de Datadog, utiliza la sintaxis `@awseventbridge-<MY_EVENT_BUS>` para enviar notificaciones de alerta a tus buses de eventos.
1. En AWS, conecta tus buses de eventos a destinos como Lambda, Kinesis y [muchos otros servicios](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html) para crear flujos de trabajo basados en eventos.
   **Nota**: Encontrarás ejemplos de casos de uso de Datadog en la página del socio de Datadog en la [consola de AWS](https://console.aws.amazon.com/events/home#/partners/datadoghq.com?page=overview).
1. Después de configurar un bus de eventos en Datadog, navega a la [consola de Amazon EventBridge](https://console.aws.amazon.com/events/) y selecciona `Rules` en el panel de navegación.
1. Selecciona `Create Rule` y añade un nombre y una descripción para tu regla.
1. En **Definir patrón**, selecciona `Event Pattern`. Selecciona `Predefined by service` como **patrón de coincidencia de eventos**. Para el **proveedor del servicio**, selecciona `Service partners`. Para *el *nombre del servicio**, selecciona `Datadog`. Esto rellena los buses de eventos que están en Datadog. Añade información adicional a la regla y luego **Guarda** la regla.
1. Para desconectar un bus de eventos en Datadog, pasa el cursor sobre el bus de eventos de tu elección y pulsa el icono de la papelera.
   **Nota**: Esta acción desconecta el bus de eventos de AWS, pero no borra el propio bus de eventos dentro de AWS.

**Nota**: Las reglas de EventBridge no se importan a Datadog a menos que la regla esté activa y se haya activado.

### Acciones automatizadas

Configura nuevos canales de salida de notificaciones para monitores y snapshots de Datadog con la integración Amazon EventBridge. Con las acciones automatizadas, puedes configurar tus recursos AWS para:

- Reinicia un proceso si el proceso finaliza para la [monitorización de procesos en vivo](https://docs.datadoghq.com/monitors/monitor_types/process/)
- Solicitar reinicios de EC2
- Solicitar tareas ECS (iniciar una nueva tarea cuando termina otra)
- Aplicar un Ansible Playbook (realizar cualquier cambio en los hosts)
- Ejecutar parches remotos
- Ejecutar scripts SSH remotos
- Ejecutar actualizaciones de Windows o instalar aplicaciones

La lista completa de recursos a los que puedes dirigirte está disponible en el [sitio web de AWS](https://docs.aws.amazon.com/eventbridge/latest/userguide/what-is-amazon-eventbridge.html).

## Datos recopilados

### Métricas

La integración Amazon EventBridge no incluye métricas.

### Eventos

La integración Amazon EventBridge no incluye eventos.

### Checks de servicio

La integración Amazon EventBridge no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).