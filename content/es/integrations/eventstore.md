---
app_id: eventstore
app_uuid: b0c2527f-671e-4a98-aa74-807d7f1826e3
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: eventstore.proc.mem
      metadata_path: metadata.csv
      prefix: eventstore.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10221
    source_type_name: EventStore
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenamiento en caché
- almacenes de datos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/eventstore/README.md
display_on_public_website: true
draft: false
git_integration_title: eventstore
integration_id: eventstore
integration_title: EventStore
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: eventstore
public_title: EventStore
short_description: Recopilación de métricas de EventStore
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenamiento en caché
  - Categoría::Almacenes de datos
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopilación de métricas de EventStore
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: EventStore
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Obtén métricas de EventStore en tiempo real para:

* Visualizar y monitorizar colas de EventStore
* Captura todas las métricas disponibles en los siguientes endpoints de API: estadísticas, información de nodos, proyecciones no transitorias, suscripciones, gossip de clústeres (la lista de los endpoints susceptibles de scraping es configurable).

## Configuración

El check de EventStore no está incluido en el paquete de [Datadog Agent][1], por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las siguientes instrucciones para instalar el check de EventStore en tu host. Para realizar la instalación con el Docker Agent o con versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][2].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-eventstore==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como una [integración][3] de base.

### Configuración

1. Edita el archivo `eventstore.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][4], para empezar a recopilar tus [métricas](#metrics) de EventStore.
   Consulta el [eventstore.d/conf.yaml de ejemplo][5] para conocer todas las opciones de configuración disponibles.

2. [Reinicia el Agent][6].

### Validación

Ejecuta el [subcomando de estado del Agent][7] y busca `eventstore` en la sección **Checks**.

## Compatibilidad

El check es compatible con las principales plataformas.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "eventstore" >}}


### Eventos

El check de EventStore no incluye eventos.

### Checks de servicios

El check de EventStore no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [encargado de mantenimiento][9] de esta integración.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/es/getting_started/integrations/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/datadog_checks/eventstore/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/eventstore/manifest.json