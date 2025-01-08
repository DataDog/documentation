---
app_id: bind9
app_uuid: b37533b0-6f0e-4259-9971-083f08086fac
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: bind9.nsstat_AuthQryRej
      metadata_path: metadata.csv
      prefix: bind9.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10222
    source_type_name: BIND 9
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: ashuvyas45@gmail.com
  support_email: ashuvyas45@gmail.com
categories:
- la red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/bind9/README.md
display_on_public_website: true
draft: false
git_integration_title: bind9
integration_id: bind9
integration_title: bind9
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: bind9
public_title: bind9
short_description: Una integración de Datadog para recopilar métricas del servidor
  bind9
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Network
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Una integración de Datadog para recopilar métricas del servidor bind9
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: bind9
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Obtén métricas del servidor DNS Bind9.

- Visualizar y monitorizar estadísticas de bind9

![Snap][1]

## Configuración

El check Bind9 no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para versiones 7.21/6.21 o posteriores del Agent, sigue las siguientes instrucciones para instalar el check Bind9 en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-bind9==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Edita el archivo `bind9.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][5], para empezar a recopilar tus [métricas](#metrics) de Bind9. Para conocer todas las opciones de configuración disponibles, consulta el [bind9.d/conf.yaml de ejemplo][6].

   ```yaml
   init_config:

   instances:
     - url: "<BIND_9_STATS_URL>"
   ```

2. [Reinicia el Agent][7]

### Validación

[Ejecuta el subcomando `status` del Agent][8] y busca `bind9` en la sección Checks.

## Compatibilidad

El check es compatible con las principales plataformas.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "bind9" >}}


### Eventos

El check bind9_check no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "bind9" >}}


## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bind9/images/snapshot.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/bind9/datadog_checks/bind9/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/bind9/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/bind9/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help