---
app_id: hivemq
app_uuid: ba1769d1-c71b-4cf1-8169-8ce3b66629dd
assets:
  dashboards:
    HiveMQ: assets/dashboards/hivemq.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hivemq.messages.queued.count
      metadata_path: metadata.csv
      prefix: hivemq.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10101
    source_type_name: HiveMQ
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- iot (internet de las cosas)
- recopilación de logs
- colas de mensajes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hivemq/README.md
display_on_public_website: true
draft: false
git_integration_title: hivemq
integration_id: hivemq
integration_title: HiveMQ
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: hivemq
public_title: HiveMQ
short_description: Monitoriza tus clústeres HiveMQ.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::IoT
  - Categoría::Recopilación de logs
  - Categoría::Colas de mensajes
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza tus clústeres HiveMQ.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/
  support: README.md#Soporte
  title: HiveMQ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

[HiveMQ][1] es una plataforma de mensajería basada en MQTT, diseñada para el movimiento rápido, eficiente y fiable
de datos hacia y desde dispositivos IoT conectados. Es un broker compatible con MQTT v3.1, v3.1.1 y v5.0.

## Configuración

### Instalación

El check de HiveMQ está incluido en el paquete del [Datadog Agent][2].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `hivemq.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del
   directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de HiveMQ.
   Para conocer todas las opciones de configuración disponibles, consulta el [hivemq.d/conf.yaml de ejemplo][1].

   Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica en [la página de estado][2].
   Puedes especificar las métricas que te interesan editando la configuración a continuación.
   Para saber cómo personalizar las métricas que se van a recopilar,, consulta la [documentación de checks de JMX][3] para obtener instrucciones más detalladas.
   Si necesitas monitorizar más métricas, ponte en contacto con el [servicio de asistencia de Datadog][4].

2. [Reinicia el Agent][5].

##### Recopilación de logs

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade el siguiente bloque de configuración a tu archivo `hivemq.d/conf.yaml`. Cambia los valores de los parámetros `path` y `service` en función de tu entorno. Consulta el [hivemq.d/conf.yaml de ejemplo][1] para conocer todas las opciones de configuración disponibles.

   ```yaml
   logs:
     - type: file
       path: /var/log/hivemq.log
       source: hivemq
       service: <SERVICE>
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

3. [Reinicia el Agent][5].

[1]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/es/integrations/java
[4]: https://docs.datadoghq.com/es/help
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### En contenedores

##### Recopilación de métricas

Para obtener información sobre entornos en contenedores, consulta la guía [Autodiscovery con JMX][1].

##### Recopilación de logs

La recopilación de Logs se encuentra deshabilitada por defecto en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de Docker][2].

| Parámetro      | Valor                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hivemq", "service": "<SERVICE_NAME>"}` |

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `hivemq` en la sección **JMXFetch**:

```text
========
JMXFetch
========
  Initialized checks
  ==================
    hivemq
      instance_name : hivemq-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

[1]: https://docs.datadoghq.com/es/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/es/agent/docker/log/
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{< /tabs >}}

## Datos recopilados

### Métricas
{{< get-metrics-from-git "hivemq" >}}


### Checks de servicio
{{< get-service-checks-from-git "hivemq" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Uso de HiveMQ y OpenTelemetry para la monitorización de aplicaciones IoT en Datadog][4]


[1]: https://www.hivemq.com/hivemq/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/help
[4]: https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/