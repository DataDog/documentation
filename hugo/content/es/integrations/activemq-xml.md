---
aliases:
- /es/integrations/activemq_xml
app_id: activemq-xml
categories:
- recopilación de logs
- colas de mensajes
custom_kind: integración
description: Recopila métricas para agentes y colas, productores y consumidores, y
  mucho más.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-activemq-metrics-performance
  tag: blog
  text: Blog de ActiveMQ XML
integration_version: 5.1.0
media: []
supported_os:
- linux
- windows
- macos
title: ActiveMQ XML
---
## Información general

Obtén métricas de ActiveMQ XML en tiempo real para:

- Visualizar y monitorizar estados de ActiveMQ XML.
- Recibir notificaciones sobre eventos y conmutaciones por error de ActiveMQ XML.

## Configuración

### Instalación

El check de ActiveMQ XML está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesita instalar nada más en tus servidores.

### Configuración

Sigue las instrucciones de abajo para configurar este check para un Agent que se ejecuta en un host. En el caso de entornos en contenedores, consulta la sección [En contenedores](#containerized).

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita `activemq_xml.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) con tus estadísticas `url`. Consulta el [activemq_xml.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/activemq_xml/datadog_checks/activemq_xml/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   **Nota**: La integración de ActiveMQ XML puede potencialmente emitir [métricas personalizadas](https://docs.datadoghq.com/developers/metrics/custom_metrics/), lo que puede afectar a tu [facturación](https://docs.datadoghq.com/account_management/billing/custom_metrics/). Por defecto, hay un límite de 350 métricas. Si necesitas métricas adicionales, ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `activemq_xml.d/conf.yaml` o `activemq.d/conf.yaml` para empezar a recopilar tus logs de ActiveMQ:

   ```yaml
   logs:
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/activemq.log"
       source: activemq
       service: "<SERVICE_NAME>"
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/audit.log"
       source: activemq
       service: "<SERVICE_NAME>"
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta la guía de [Autodiscovery con JMX](https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent).

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `activemq_xml` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **activemq.queue.consumer_count** <br>(gauge) | Número de consumidores de una cola.|
| **activemq.queue.count** <br>(gauge) | El número de colas.|
| **activemq.queue.dequeue_count** <br>(gauge) | El número total de mensajes enviados a una cola desde el último reinicio.<br>_Se muestra como mensaje_ |
| **activemq.queue.enqueue_count** <br>(gauge) | El número total de mensajes retirados de una cola (reconocidos por el consumidor) desde el último reinicio.<br>_Se muestra como mensaje_ |
| **activemq.queue.size** <br>(gauge) | El tamaño de una cola.|
| **activemq.subscriber.count** <br>(gauge) | El número de suscriptores.|
| **activemq.subscriber.dequeue_counter** <br>(gauge) | Número de mensajes enviados y reconocidos por el cliente.<br>_Se muestra como mensaje_ |
| **activemq.subscriber.dispatched_counter** <br>(gauge) | El número de mensajes enviados al cliente.<br>_Se muestra como mensaje_ |
| **activemq.subscriber.dispatched_queue_size** <br>(gauge) | Número de mensajes enviados que esperan acuse de recibo.<br>_Se muestra como mensaje_ |
| **activemq.subscriber.enqueue_counter** <br>(gauge) | El número de mensajes que coinciden con la suscripción.<br>_Se muestra como mensaje_ |
| **activemq.subscriber.pending_queue_size** <br>(gauge) | El número de mensajes pendientes de entrega.<br>_Se muestra como mensaje_ |
| **activemq.topic.consumer_count** <br>(gauge) | Número de consumidores de un tema.|
| **activemq.topic.count** <br>(gauge) | El número de temas.|
| **activemq.topic.dequeue_count** <br>(gauge) | El número total de mensajes enviados a un tema desde el último reinicio.<br>_Se muestra como mensaje_ |
| **activemq.topic.enqueue_count** <br>(gauge) | El número total de mensajes eliminados de un tema (reconocidos por el consumidor) desde el último reinicio.<br>_Se muestra como mensaje_ |
| **activemq.topic.size** <br>(gauge) | El tamaño de un tema.|

### Eventos

El check de ActiveMQ XML no incluye ningún evento.

### Checks de servicio

El check de ActiveMQ XML no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Monitorizar métricas y rendimiento de ActiveMQ](https://www.datadoghq.com/blog/monitor-activemq-metrics-performance)