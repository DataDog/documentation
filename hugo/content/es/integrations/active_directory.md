---
app_id: active-directory
app_uuid: e03a0916-8708-4417-82e4-1f0c7bbee655
assets:
  dashboards:
    Active Directory: assets/dashboards/active_directory.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: active_directory.dra.inbound.objects.persec
      metadata_path: metadata.csv
      prefix: active_directory.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10068
    source_type_name: Active Directory
  monitors:
    LDAP binding duration is high: assets/monitors/ldap_binding.json
    Number of LDAP bindings is anomalous: assets/monitors/ldap_binding_successful.json
    Number of sessions for LDAP clients is anomalous: assets/monitors/ldap_client_sessions.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- windows
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/active_directory/README.md
display_on_public_website: true
draft: false
git_integration_title: active_directory
integration_id: active-directory
integration_title: Active Directory
integration_version: 4.2.0
is_public: true
manifest_version: 2.0.0
name: active_directory
public_title: Active Directory
short_description: Recopilar y representar gráficamente métricas de Microsoft Active
  Directory
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Recopilar y representar gráficamente métricas de Microsoft Active Directory
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Active Directory
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Obtén métricas de Microsoft Active Directory para visualizar y monitorizar su rendimiento.

## Configuración

### Instalación

El check de Active Directory del Agent está incluido en el paquete del [Datadog Agent][1], por lo que no necesitas instalar nada más en tus servidores.

Si instalas el Datadog Agent en un entorno de dominio, consulta [los requisitos de instalación del Agent][2].

### Configuración

#### Recopilación de métricas

1. Edita el archivo `active_directory.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent][3] para comenzar a recopilar tus datos de rendimiento de Active Directory. La configuración por defecto ya debería recopilar métricas para el host local. Consulta el [active_directory.d/conf.yaml de ejemplo][4] para ver todas las opciones disponibles de configuración.

2. [Reinicia el Agent][5]

**Nota**: Las versiones 1.13.0 o posteriores de este check utilizan una nueva implementación para la recopilación de métricas, que requiere Python 3. Para hosts que no puedan utilizar Python 3, o si deseas utilizar una versión legacy de este check, consulta la siguiente [configuración][6].

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `active_directory` en la sección de Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "active-directory" >}}


### Eventos

El check de Active Directory no incluye ningún evento.

### Checks de servicio

El check de Active Directory no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/agent/faq/windows-agent-ddagent-user/#installation-in-a-domain-environment
[3]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/active_directory/datadog_checks/active_directory/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://github.com/DataDog/integrations-core/blob/7.33.x/active_directory/datadog_checks/active_directory/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/active_directory/metadata.csv
[9]: https://docs.datadoghq.com/es/help/