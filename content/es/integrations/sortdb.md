---
app_id: sortdb
app_uuid: 02cd7f3d-5394-4d08-8364-35c9d1af1377
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: sortdb.stats.total_requests
      metadata_path: metadata.csv
      prefix: sortdb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10205
    source_type_name: Sortdb
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: namrata.deshpande4@gmail.com
  support_email: namrata.deshpande4@gmail.com
categories:
- almacenes de datos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sortdb/README.md
display_on_public_website: true
draft: false
git_integration_title: sortdb
integration_id: sortdb
integration_title: Sortdb
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: sortdb
public_title: Sortdb
short_description: Compatibilidad de Datadog con la monitorización de Sortdb
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
  - Categoría::Almacenes de datos
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Compatibilidad de Datadog con la monitorización de Sortdb
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Sortdb
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Obtén métricas del servicio [Sortdb][1] en tiempo real para:

- Visualizar y monitorizar estadísticas de Sortdb.
- Recibir notificaciones sobre conmutaciones por error de Sortdb.
- Comprobar el estado y obtener estadísticas de varias instancias.

## Configuración

El check de Sortdb no está incluido en el paquete del [Datadog Agent][2], por lo que necesitas instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de Sortdb en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-sortdb==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Edita el archivo `sortdb.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][5], para empezar a recopilar tus [métricas](#metrics) de Sortdb. Para conocer todas las opciones de configuración disponibles, consulta el [sortdb.d/conf.yaml de ejemplo][5].

2. [Reinicia el Agent][7].

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `sortdb` en la sección **Checks**.

## Compatibilidad

El check de Sortdb es compatible con las principales plataformas.

## Datos recopilados

### Métricas

Para ver la lista de métricas proporcionadas por esta integración, consulta [metadata.csv][9].

### Checks de servicio
{{< get-service-checks-from-git "sortdb" >}}


## Solucionar problemas

El check de Sortdb no incluye eventos.


[1]: https://github.com/jehiah/sortdb
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://docs.datadoghq.com/es/agent/faq/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/datadog_checks/sortdb/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/faq/agent-commands/#start-stop-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#service-status
[9]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/assets/service_checks.json