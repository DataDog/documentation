---
app_id: unifi-console
app_uuid: 224a050d-7ed3-4e7a-ada6-410f61393fc0
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: unifi_console.device.status
      metadata_path: metadata.csv
      prefix: unifi_console.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10298
    source_type_name: Consola Unifi
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: antonin.bruneau@gmail.com
  support_email: antonin.bruneau@gmail.com
categories: []
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/unifi_console/README.md
display_on_public_website: true
draft: false
git_integration_title: consola_unifi
integration_id: unifi-console
integration_title: Consola Unifi
integration_version: 1.2.0
is_public: true
manifest_version: 2.0.0
name: consola_unifi
public_title: Consola Unifi
short_description: Este check recopila métricas del controlador Unifi
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Este check recopila métricas del controlador Unifi
  media: []
  overview: README.md#Información general
  support: README.md#Solucionar problemas
  title: Consola Unifi
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza la [consola Unifi][1] a través del Datadog Agent.

## Configuración

El check Unifi no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check Unifi en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   sudo -u dd-agent -- datadog-agent integration install -t datadog-unifi_console==1.2.0
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Edita el archivo `unifi_console.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de tu consola Unifi. Para conocer todas las opciones de configuración disponibles, consulta el [unifi_console.d/conf.yaml de ejemplo][5].

2. [Reinicia el Agent][6].

### Validación

[Ejecuta el subcomando del estado del Agent][7] y busca `unifi_console` en la sección de checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "unifi-console" >}}


### Eventos

La integración de la consola Unifi no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "unifi-console" >}}



## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://ui.com/consoles
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/unifi_console/datadog_checks/unifi_console/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/unifi_console/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/unifi_console/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/