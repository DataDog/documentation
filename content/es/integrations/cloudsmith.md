---
app_id: cloudsmith
app_uuid: 92b5a159-e5e9-4e38-a4d4-b987cd03b7a1
assets:
  dashboards:
    Cloudsmith: assets/dashboards/cloudsmith_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cloudsmith.bandwidth_used
      metadata_path: metadata.csv
      prefix: cloudsmith.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10208
    source_type_name: Cloudsmith
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Cloudsmith
  sales_email: ccarey@cloudsmith.io
  support_email: ccarey@cloudsmith.io
categories:
- nube
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/README.md
display_on_public_website: true
draft: false
git_integration_title: cloudsmith
integration_id: cloudsmith
integration_title: Cloudsmith
integration_version: 0.0.2
is_public: true
manifest_version: 2.0.0
name: cloudsmith
public_title: Cloudsmith
short_description: Monitorizar las métricas de Cloudsmith
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Configuración
  description: Monitorizar las métricas de Cloudsmith
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Cloudsmith
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza [Cloudsmith][1] a través del Datadog Agent.
- Monitoriza el almacenamiento, el ancho de banda y el uso de tokens en tu cuenta de Cloudsmith.


## Configuración

El check de Cloudsmith no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de Cloudsmith en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-cloudsmith==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Edita el archivo `cloudsmith.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu Cloudsmith. Para conocer todas las opciones de configuración disponibles, consulta el [cloudsmith.d/conf.yaml de ejemplo][5].

2. [Reinicia el Agent][6].

### Validación

[Ejecute el subcomando de estado de Agent][7] y busque `cloudsmith` en la sección checks sección.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "cloudsmith" >}}


### Eventos

Todos los eventos relacionados con Cloudsmith que se recopilan aparecen en el flujo de eventos de Datadog con la propiedad `source:cloudsmith`. Se recopilan cada cinco minutos para reducir la cantidad de solicitudes enviadas a la API de Cloudsmith.

Existen dos tipos de eventos:

- Evento de exploración de seguridad
- Evento de logs de auditoría

Son accesibles con las claves de agregación: `@aggregation_key:audit_log` y `@aggregation_key:vulnerabilities`.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Cloudsmith][10].

[1]: https://cloudsmith.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/datadog_checks/cloudsmith/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/cloudsmith/assets/service_checks.json
[10]: https://help.cloudsmith.io/docs/contact-us#live-chat-via-intercom