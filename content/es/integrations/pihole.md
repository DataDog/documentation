---
app_id: pihole
app_uuid: 008d006b-6390-4b93-9302-dc37d9625b18
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: pihole.clients_ever_seen
      metadata_path: metadata.csv
      prefix: pihole.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10169
    source_type_name: pihole
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: monganai@tcd.ie
  support_email: monganai@tcd.ie
categories:
- red
- recopilación de logs
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/pihole/README.md
display_on_public_website: true
draft: false
git_integration_title: pihole
integration_id: pihole
integration_title: Pi-hole
integration_version: 3.14.1
is_public: true
manifest_version: 2.0.0
name: pihole
public_title: Pi-hole
short_description: Integración para la recopilación de métricas de Pi-hole predeterminadas
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
  - Categoría::Red
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Integración para la recopilación de métricas de Pi-hole predeterminadas
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Pi-hole
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza [Pi-hole][1] a través del Datadog Agent.

## Configuración

El check de Pi-hole no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para versiones 7.21/6.21 o posteriores del Agent, sigue las siguientes instrucciones para instalar el check de Pi-hole en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   sudo -u dd-agent -- datadog-agent integration install -t datadog-pihole==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Edita el archivo `pihole.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de tu Pi-hole. Para conocer todas las opciones de configuración disponibles, consulta el [pihole.d/conf.yaml de ejemplo][5].

2. [Reinicia el Agent][6].

### Validación

Ejecuta el [subcomando de estado del Agent][7] y busca `pihole` en la sección Checks.

### Recopilación de logs

Habilita la recopilación de logs para el Datadog Agent en `/etc/datadog-agent/datadog.yaml` en plataformas Linux. En otras plataformas, consulta la [guía Archivos de configuración del Agent][8] para ver la ubicación de tu archivo de configuración:

```yaml
logs_enabled: true
```

- Habilita este bloque de configuración en tu archivo `pihole.d/conf.yaml` para empezar a recopilar logs:
    ```yaml
    logs:
      - type: file
        path: /var/log/pihole.log
        source: pihole
    ```

## Datos recopilados

### Métricas
{{< get-metrics-from-git "pihole" >}}


### Eventos

Pi-hole no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "pihole" >}}


## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].


[1]: https://pi-hole.net/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/pihole/datadog_checks/pihole/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/
[9]: https://github.com/DataDog/integrations-extras/blob/master/pihole/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/pihole/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/