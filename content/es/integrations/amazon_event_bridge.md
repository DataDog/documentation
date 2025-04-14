---
categories:
- AWS
- nube
- notificaciones
custom_kind: integración
dependencies: []
description: Un bus de eventos serverless que procesa eventos de servicios AWS, SaaS
  y tus aplicaciones casi en tiempo real.
doc_link: https://docs.datadoghq.com/integrations/amazon_event_bridge/
draft: false
git_integration_title: amazon_event_bridge
has_logo: true
integration_id: ''
integration_title: Amazon EventBridge
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_event_bridge
public_title: Integración de Amazon EventBridge con Datadog
short_description: Un bus de eventos serverless que procesa eventos de servicios AWS,
  SaaS y tus aplicaciones casi en tiempo real.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< site-region region="gov" >}}
<div class="alert alert-warning">El sitio Datadog para el Gobierno no es compatible con Amazon EventBridge.</div>
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

Si aún no lo has hecho, configura la [integración Amazon Web Services][1].

### Instalación

1. Asegúrate de que la principal [integración AWS][1] está instalada para cada cuenta AWS que recibe notificaciones de alerta.
2. Asegúrate de que los siguientes permisos existen en la política de permisos para roles AWS Datadog:
   `events:CreateEventBus` y `events:PutPartnerEvents`.
3. La integración Amazon EventBridge se instala automáticamente con la principal integración AWS.

**Nota**: Para configurar una fuente de Amazon EventBridge, también puedes utilizar la [API][2] o [Terraform][3]. 

### Configuración

Los permisos `events:CreateEventBus` y `events:PutPartnerEvents` son necesarios para enviar notificaciones de alerta a tus buses de eventos. Si no tienes estos permisos configurados, consulta la [documentación de permisos IAM Datadog][4] para habilitar los permisos antes de continuar con la configuración.

1. Ve al cuadro [Datadog - Integración Amazon EventBridge][5] para ver una lista de cuentas AWS integradas en Datadog donde puedes crear puentes de eventos.
2. En la cuenta AWS de tu elección crea un nuevo bus de eventos proporcionando un nombre y seleccionando la región en la que quieres que se encuentre.
3. Dentro de las alertas de Datadog, utiliza la sintaxis `@awseventbridge-<MY_EVENT_BUS>` para enviar notificaciones de alerta a tus buses de eventos.
4. En AWS, conecta tus buses de eventos a destinos como Lambda, Kinesis y [muchos otros servicios][6] para crear flujos (flows) de trabajo en función de eventos.
    **Nota**: Puedes encontrar ejemplos de casos de uso de Datadog en la página de socios de Datadog en la [consola de AWS][7].
5. Después de configurar un bus de eventos en Datadog, ve a la [consola de Amazon EventBridge][8] y selecciona `Rules` en el panel de navegación.
6. Selecciona `Create Rule` y añade un nombre y una descripción para tu regla.
7. En **Definir patrón**, selecciona `Event Pattern`. Selecciona `Predefined by service` como **patrón de coincidencia de eventos**. Para el **proveedor del servicio**, selecciona `Service partners`. Para *el *nombre del servicio**, selecciona `Datadog`. Esto rellena los buses de eventos que están en Datadog. Añade información adicional a la regla y luego **Guarda** la regla.
8. Para desconectar un bus de eventos en Datadog, pasa el cursor sobre el bus de eventos de tu elección y pulsa el icono de la papelera.
    **Nota**: Esta acción desconecta el bus de eventos de AWS, pero no lo elimina en AWS.

**Nota**: Las reglas de EventBridge no se importan a Datadog a menos que la regla esté activa y se haya activado. 

### Acciones automatizadas

Configura nuevos canales de salida de notificaciones para monitores y snapshots de Datadog con la integración Amazon EventBridge. Con las acciones automatizadas, puedes configurar tus recursos AWS para:

* Reiniciar un proceso, si el proceso finaliza para la [monitorización de procesos en vivo][9]
* Solicitar reinicios de EC2
* Solicitar tareas ECS (iniciar una nueva tarea cuando termina otra)
* Aplicar un Ansible Playbook (realizar cualquier cambio en los hosts)
* Ejecutar parches remotos
* Ejecutar scripts SSH remotos
* Ejecutar actualizaciones de Windows o instalar aplicaciones

La lista completa de los recursos que puedes elegir como destino está disponible en el [sitio web AWS][10].

## Datos recopilados

### Métricas

La integración Amazon EventBridge no incluye métricas.

### Eventos

La integración Amazon EventBridge no incluye eventos.

### Checks de servicio

La integración Amazon EventBridge no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][11].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/es/api/latest/aws-integration/#create-an-amazon-eventbridge-source
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_event_bridge
[4]: https://docs.datadoghq.com/es/integrations/amazon_web_services/?tab=allpermissions#datadog-aws-iam-policy
[5]: https://app.datadoghq.com/integrations/amazon-event-bridge
[6]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html
[7]: https://console.aws.amazon.com/events/home#/partners/datadoghq.com?page=overview
[8]: https://console.aws.amazon.com/events/
[9]: https://docs.datadoghq.com/es/monitors/monitor_types/process/
[10]: https://docs.aws.amazon.com/eventbridge/latest/userguide/what-is-amazon-eventbridge.html
[11]: https://docs.datadoghq.com/es/help/