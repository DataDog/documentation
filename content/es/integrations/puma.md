---
app_id: puma
app_uuid: c517e801-0fa5-4f5e-8175-a7d5d48a8131
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: puma.workers
      metadata_path: metadata.csv
      prefix: puma.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10126
    source_type_name: Puma
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: justin.morris@ferocia.com.au
  support_email: justin.morris@ferocia.com.au
categories:
- métricas
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/puma/README.md
display_on_public_website: true
draft: false
git_integration_title: puma
integration_id: puma
integration_title: Puma
integration_version: 1.2.1
is_public: true
manifest_version: 2.0.0
name: puma
public_title: Puma
short_description: Servidor web rápido y simultáneo para Ruby y Rack
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Categoría::Métricas
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Servidor web rápido y simultáneo para Ruby y Rack
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Puma
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza [Puma][1] a través del Datadog Agent con el endpoint de métricas de Puma proporcionado por el servidor de [control y estado][2].

## Configuración

El check de Puma no está incluido en el paquete del [Datadog Agent][3], por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de Puma en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][4].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-puma==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][5] de base.

### Configuración

1. Edita el archivo `puma.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de tu Puma. Para conocer todas las opciones de configuración disponibles, consulta el [puma.d/conf.yaml de ejemplo][6].

2. [Reinicia el Agent][7].

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `puma` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "puma" >}}


### Eventos

Puma no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "puma" >}}


## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].


[1]: https://puma.io/
[2]: https://github.com/puma/puma#controlstatus-server
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/es/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/puma/datadog_checks/puma/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/puma/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/puma/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/