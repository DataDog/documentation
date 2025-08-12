---
app_id: emqx
app_uuid: fa40ec7e-e8f6-4c4b-a675-31716b23a9df
assets:
  dashboards:
    EMQX Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/Configuración/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - emqx.cluster.nodes_running
      metadata_path: metadata.csv
      prefix: emqx.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6726047
    source_type_name: emqx
author:
  homepage: https://www.emqx.com/en
  name: EMQX
  sales_email: contact@emqx.io
  support_email: contact@emqx.io
categories:
- métricas
- iot
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/emqx/README.md
display_on_public_website: true
draft: false
git_integration_title: emqx
integration_id: emqx
integration_title: EMQX
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: emqx
public_title: EMQX
short_description: Recopila rendimiento, datos de estado, rendimiento de los mensajes
  y latencia de los mensajes en los brokers de MQTT, etc.
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Metrics
  - Category::IoT
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Recopila rendimiento, datos de estado, rendimiento de los mensajes
    y latencia de los mensajes en los brokers de MQTT, etc.
  media:
  - caption: Métricas de EMQX Broker en el dashboard(1) de Datadog
    image_url: images/emqx-overview-1.png
    media_type: imagen
  - caption: Métricas de EMQX Broker en el dashboard(2) de Datadog
    image_url: images/emqx-overview-2.png
    media_type: imagen
  - caption: Métricas de EMQX Broker en el dashboard(3) de Datadog
    image_url: images/emqx-overview-3.png
    media_type: imagen
  - caption: Métricas de EMQX Broker en el dashboard(4) de Datadog
    image_url: images/emqx-overview-4.png
    media_type: imagen
  - caption: Métricas de EMQX Broker en el dashboard(5) de Datadog
    image_url: images/emqx-overview-5.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: EMQX
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general

[EMQX][1] es un broker de MQTT de código abierto altamente escalable, diseñado para IoT (Internet de las cosas). MQTT es la sigla de Message Queuing Telemetry Transport, un protocolo ligero de red de publicación y suscripción que transporta mensajes entre dispositivos.

**Principales funciones de EMQX
- Escalabilidad: EMQX puede manejar millones de conexiones concurrentes de MQTT, lo que lo hace adecuado para aplicaciones de IoT que requieren manejar un gran número de dispositivos.
- Fiabilidad: Proporciona una entrega de mensajes estable y fiable, garantizando que los datos se transfieran correctamente entre dispositivos y servidores.
- Baja latencia: Diseñado para escenarios que requieren una comunicación de baja latencia.
- Alto rendimiento: Capaz de procesar un gran volumen de mensajes de forma eficiente.
- Agrupación en clústeres: EMQX puede desplegarse en un clúster distribuido para mejorar el rendimiento y la fiabilidad.


La integración de EMQX con Datadog enriquece las capacidades de monitorización, proporcionando información valiosa sobre el rendimiento y el estado de los brokers de MQTT. Esto es especialmente beneficioso en aplicaciones de IoT en las que es fundamental una transmisión de datos eficiente, fiable y en tiempo real.

**Tipos de datos enviados a Datadog:**
- Métricas: Esto incluye métricas del rendimiento como el rendimiento de los mensajes (mensajes enviados/recibidos por segundo), el número de clientes conectados y más.

- Rendimiento de los nodos: Monitorización del rendimiento de los nodos individuales en un clúster, como latencia, carga y métricas operativas.

- Estado operativo: Datos sobre el estado del broker de MQTT, incluidas tasas de errores y otros indicadores críticos.


## Configuración

### Instalación

Instala manualmente el check de EMQX (ten en cuenta que las [instrucciones pueden cambiar en función de tu entorno][2]):

Ejecuta `datadog-agent integration install -t datadog-emqx==1.1.0`.

### Configuración

1. Edita el archivo `emqx/conf.yaml`, situado en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent, para empezar a recopilar los datos del rendimiento de EMQX.

2. [Reinicia el Agent][3].

### Validación

[Ejecuta el subcomando de estado del Agent][4] y busca `emqx` en la sección de Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "emqx" >}}


### Eventos

EMQX no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [soporte técnico de EMQXt][7].

[1]: https://github.com/emqx/emqx
[2]: https://docs.datadoghq.com/es/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-extras/blob/master/emqx/metadata.csv
[6]: https://github.com/DataDog/integrations-extras/blob/master/emqx/assets/service_checks.json
[7]: https://www.emqx.com/en/support